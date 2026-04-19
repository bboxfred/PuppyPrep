-- ═══════════════════════════════════════════════════════════════════════════
-- PUPPY PREP — Promo code system (v2, pure SQL rewrite)
-- ═══════════════════════════════════════════════════════════════════════════
--
-- REPLACES the previous plpgsql version which hit repeated "relation X does
-- not exist" errors in Supabase's SQL editor. Root cause: plpgsql locals
-- referenced inside embedded SQL statements confused the editor's static
-- analyzer, which resolved names like `v_code_key` / `_code_text` as
-- relations. Four successive variable-naming attempts failed.
--
-- This file drops plpgsql entirely. The redemption function is written in
-- `language sql` using a single WITH (CTE) chain. Pure-SQL functions have
-- NO local variables — every piece of state flows through a CTE reference
-- like `(select x from cte_name)`. The ambiguity class that bit us before
-- cannot happen in this form.
--
-- Semantics preserved exactly:
--   • Case-insensitive code lookup
--   • Row-level lock via `FOR UPDATE` (prevents concurrent redemption races)
--   • Validation: signed in, code exists, not expired, not exhausted,
--     not already redeemed by this user
--   • On success: extend existing pro_until by N days (or start from now)
--   • Increment the code's current_uses counter
--   • Return JSON with ok/error, days_granted, pro_until
--
-- Paste this entire file into Supabase SQL Editor and run. Safe to re-run.
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── 1. promo_codes table ──────────────────────────────────────────────────
create table if not exists public.promo_codes (
  code         text primary key,                -- the code users type (case-insensitive match below)
  days         int  not null check (days > 0),  -- days of Pro granted per redemption
  notes        text,                            -- free-form for YOUR reference
  max_uses     int  default 1 check (max_uses > 0),
  current_uses int  default 0,
  expires_at   timestamptz,                     -- optional sunset date on the code itself
  created_at   timestamptz default now()
);

create index if not exists promo_codes_created_idx
  on public.promo_codes (created_at desc);


-- ─── 2. user_pro_entitlements table ─────────────────────────────────────────
create table if not exists public.user_pro_entitlements (
  user_id          uuid primary key references auth.users (id) on delete cascade,
  pro_until        timestamptz not null,
  source           text not null check (source in ('promo_code', 'iap', 'comp')),
  source_reference text,                        -- the code string, or an IAP receipt ID
  granted_at       timestamptz default now(),
  updated_at       timestamptz default now()
);


-- ─── 3. Row-level security ─────────────────────────────────────────────────
alter table public.promo_codes            enable row level security;
alter table public.user_pro_entitlements  enable row level security;

-- promo_codes: no direct access for anyone with the anon or authenticated
-- role. The SECURITY DEFINER function below is the only way to read it.
revoke all on public.promo_codes from anon, authenticated;

-- user_pro_entitlements: users can read their own row (app checks Pro status).
-- Writes are restricted to the function (which runs as table owner).
drop policy if exists "users can read own entitlement" on public.user_pro_entitlements;
create policy "users can read own entitlement"
  on public.user_pro_entitlements for select
  using ( auth.uid() = user_id );

grant  select                     on public.user_pro_entitlements to authenticated;
revoke insert, update, delete     on public.user_pro_entitlements from anon, authenticated;


-- ─── 4. redeem_promo_code() — pure SQL function ─────────────────────────────
-- Drop any previous plpgsql version cleanly before re-creating.
drop function if exists public.redeem_promo_code(text);

create function public.redeem_promo_code(input_code text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  with
    -- Calling user's UUID (or NULL if anon)
    me as (
      select auth.uid() as uid
    ),

    -- Look up + lock the candidate code (case-insensitive). NOT MATERIALIZED
    -- is unnecessary here — Postgres always materialises CTEs that have
    -- side effects (FOR UPDATE is one), so the lock is taken exactly once.
    target as (
      select code, days, expires_at, max_uses, current_uses
        from public.promo_codes
        where lower(code) = lower(input_code)
        for update
    ),

    -- All validation failures collapse into a single `error_key` or NULL.
    -- NULL → validation passed, proceed to mutate.
    validation as (
      select case
        when (select uid from me) is null
          then 'not_signed_in'
        when not exists (select 1 from target)
          then 'code_not_found'
        when (select expires_at from target) is not null
             and (select expires_at from target) < now()
          then 'code_expired'
        when (select current_uses from target) >= (select max_uses from target)
          then 'code_exhausted'
        when exists (
          select 1 from public.user_pro_entitlements
            where user_id = (select uid from me)
              and source_reference = (select code from target)
        )
          then 'already_redeemed'
        else null
      end as error_key
    ),

    -- Current pro_until (NULL if no row yet for this user)
    current_entitlement as (
      select pro_until
        from public.user_pro_entitlements
        where user_id = (select uid from me)
    ),

    -- New expiry: extend from current pro_until if still active, else from now
    new_expiry as (
      select greatest(
               coalesce((select pro_until from current_entitlement), now()),
               now()
             ) + ((select days from target) || ' days')::interval as pro_until
    ),

    -- Upsert entitlement — ONLY if validation passed (WHERE guards the SELECT).
    -- RETURNING gives us a row count we can compose back later, though we
    -- don't actually consume it.
    granted as (
      insert into public.user_pro_entitlements
        (user_id, pro_until, source, source_reference, updated_at)
      select
        (select uid from me),
        (select pro_until from new_expiry),
        'promo_code',
        (select code from target),
        now()
      where (select error_key from validation) is null
      on conflict (user_id) do update
        set pro_until        = excluded.pro_until,
            source           = 'promo_code',
            source_reference = excluded.source_reference,
            updated_at       = now()
      returning pro_until
    ),

    -- Increment use count — ONLY if validation passed.
    incremented as (
      update public.promo_codes
        set current_uses = current_uses + 1
        where code = (select code from target)
          and (select error_key from validation) is null
        returning code
    )

  -- Final response — error JSON if validation failed, success JSON otherwise.
  select case
    when (select error_key from validation) is not null then
      jsonb_build_object(
        'ok',    false,
        'error', (select error_key from validation)
      )
    else
      jsonb_build_object(
        'ok',           true,
        'days_granted', (select days from target),
        'pro_until',    (select pro_until from new_expiry)
      )
  end;
$$;

grant  execute on function public.redeem_promo_code(text) to authenticated;
revoke execute on function public.redeem_promo_code(text) from anon;


-- ─── 5. Admin view — browse codes + remaining redemptions ──────────────────
create or replace view public.promo_codes_admin as
  select
    code,
    days,
    notes,
    max_uses,
    current_uses,
    max_uses - current_uses as remaining,
    expires_at,
    created_at
  from public.promo_codes
  order by created_at desc;

revoke all on public.promo_codes_admin from anon, authenticated;


-- ═══════════════════════════════════════════════════════════════════════════
-- OPTIONAL SANITY CHECKS — paste these into a NEW query to verify setup
-- ═══════════════════════════════════════════════════════════════════════════
--
--  1. All three tables present:
--     select tablename from pg_tables
--     where schemaname = 'public'
--       and tablename in ('user_data', 'promo_codes', 'user_pro_entitlements');
--
--  2. Function is callable + returns JSON (not an error):
--     select public.redeem_promo_code('FAKECODE');
--     -- Expected: {"ok": false, "error": "code_not_found"}
--
--  3. RLS is on for both private tables:
--     select tablename, rowsecurity from pg_tables
--     where schemaname = 'public'
--       and tablename in ('promo_codes', 'user_pro_entitlements');
--     -- Expected: both rows show rowsecurity = true
--
-- ═══════════════════════════════════════════════════════════════════════════
