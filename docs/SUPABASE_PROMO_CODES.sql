-- ═══════════════════════════════════════════════════════════════════════════
-- PROMO CODE SYSTEM
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Paste this AFTER running SUPABASE_SCHEMA.sql.
--
-- Architecture:
--   promo_codes — YOU manage: create / delete / view. Each row is one code.
--   user_pro_entitlements — one row per user, records whether + until when
--     they have Pro. Can be granted by code redemption OR IAP (future).
--   redeem_promo_code() — SECURITY DEFINER RPC that users call from the app.
--     Prevents users from self-granting Pro by INSERT-ing rows directly.
--
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 1. promo_codes table ──────────────────────────────────────────────────
create table if not exists public.promo_codes (
  code         text primary key,             -- the actual string users type (CASE-INSENSITIVE in the RPC below)
  days         int  not null check (days > 0),  -- how many days of Pro this grants
  notes        text,                         -- free-text for YOUR reference (e.g. "Facebook group launch")
  max_uses     int  default 1 check (max_uses > 0),
  current_uses int  default 0,
  expires_at   timestamptz,                  -- code itself expires (optional — e.g. "only works until 31 Mar")
  created_at   timestamptz default now()
);

-- Useful index for dashboard browsing
create index if not exists promo_codes_created_idx on public.promo_codes (created_at desc);

-- ─── 2. user_pro_entitlements table ─────────────────────────────────────────
create table if not exists public.user_pro_entitlements (
  user_id          uuid primary key references auth.users (id) on delete cascade,
  pro_until        timestamptz not null,     -- Pro access valid until this timestamp
  source           text not null check (source in ('promo_code','iap','comp')),
  source_reference text,                     -- e.g. the code they redeemed, or IAP receipt ID
  granted_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ─── 3. RLS ────────────────────────────────────────────────────────────────
alter table public.promo_codes enable row level security;
alter table public.user_pro_entitlements enable row level security;

-- promo_codes: users can NEITHER read NOR write. Only the SECURITY DEFINER
-- RPC (below) and YOU in the Supabase dashboard can touch this table.
revoke all on public.promo_codes from anon, authenticated;

-- user_pro_entitlements: a user can READ their own row (so the app can
-- check their Pro status). Only the RPC can WRITE — not even the user
-- themselves can INSERT/UPDATE.
drop policy if exists "users can read own entitlement" on public.user_pro_entitlements;
create policy "users can read own entitlement"
  on public.user_pro_entitlements for select
  using ( auth.uid() = user_id );

grant select on public.user_pro_entitlements to authenticated;
revoke insert, update, delete on public.user_pro_entitlements from authenticated, anon;

-- ─── 4. redeem_promo_code() RPC ────────────────────────────────────────────
-- SECURITY DEFINER runs as the table owner, bypassing RLS — this is the
-- ONLY way a user can write to either table. Code validates:
--   1. Code exists and matches case-insensitively
--   2. Code hasn't expired
--   3. Code hasn't exceeded max_uses
--   4. Current user hasn't already redeemed THIS code (one code per user)
-- On success, it adds `days` to the user's pro_until (extending existing
-- Pro or starting fresh from today, whichever is later).
create or replace function public.redeem_promo_code(input_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
-- Force plpgsql to resolve any ambiguous identifier to a LOCAL VARIABLE,
-- never to a column. This is the definitive fix for the repeated
-- "relation does not exist" errors we saw with v_code / v_code_row /
-- v_code_key earlier — the SQL parser inside embedded statements was
-- treating local names as schema.table. With this pragma + underscore-
-- prefixed locals (which can't possibly collide with promo_codes or
-- user_pro_entitlements columns), every identifier resolves correctly.
#variable_conflict use_variable
declare
  _uid             uuid := auth.uid();
  _code_text       text;
  _days_granted    int;
  _expires_at      timestamptz;
  _max_uses        int;
  _current_uses    int;
  _now             timestamptz := now();
  _new_until       timestamptz;
  _current_until   timestamptz;
begin
  if _uid is null then
    return jsonb_build_object('ok', false, 'error', 'not_signed_in');
  end if;

  -- Case-insensitive lookup + row-lock (prevents concurrent redemption races).
  select code, days, expires_at, max_uses, current_uses
    into   _code_text, _days_granted, _expires_at, _max_uses, _current_uses
    from   public.promo_codes
    where  lower(code) = lower(input_code)
    for update;

  if not found then
    return jsonb_build_object('ok', false, 'error', 'code_not_found');
  end if;

  if _expires_at is not null and _expires_at < _now then
    return jsonb_build_object('ok', false, 'error', 'code_expired');
  end if;

  if _current_uses >= _max_uses then
    return jsonb_build_object('ok', false, 'error', 'code_exhausted');
  end if;

  -- One code per user rule — check if this user already redeemed it
  if exists (
    select 1
    from   public.user_pro_entitlements
    where  user_id = _uid
      and  source_reference = _code_text
  ) then
    return jsonb_build_object('ok', false, 'error', 'already_redeemed');
  end if;

  -- Compute new expiry — extend from existing pro_until if still active
  select pro_until
    into _current_until
    from public.user_pro_entitlements
    where user_id = _uid;

  _new_until := greatest(coalesce(_current_until, _now), _now)
                + (_days_granted || ' days')::interval;

  -- Grant entitlement (upsert)
  insert into public.user_pro_entitlements
    (user_id, pro_until, source, source_reference, updated_at)
  values
    (_uid, _new_until, 'promo_code', _code_text, _now)
  on conflict (user_id) do update
    set pro_until        = excluded.pro_until,
        source           = 'promo_code',
        source_reference = excluded.source_reference,
        updated_at       = _now;

  -- Increment the code's use count
  update public.promo_codes
    set current_uses = current_uses + 1
    where code = _code_text;

  return jsonb_build_object(
    'ok',           true,
    'days_granted', _days_granted,
    'pro_until',    _new_until
  );
end;
$$;

-- Allow any authenticated user to call the RPC
grant execute on function public.redeem_promo_code(text) to authenticated;
revoke execute on function public.redeem_promo_code(text) from anon;

-- ─── 5. Helpful view for YOU (the admin) in the dashboard ──────────────────
-- Shows each code with its redemption activity for easy management.
create or replace view public.promo_codes_admin as
  select
    c.code,
    c.days,
    c.notes,
    c.max_uses,
    c.current_uses,
    c.max_uses - c.current_uses as remaining,
    c.expires_at,
    c.created_at
  from promo_codes c
  order by c.created_at desc;

-- RLS does not apply to views; restrict programmatic access via role grants.
revoke all on public.promo_codes_admin from anon, authenticated;
