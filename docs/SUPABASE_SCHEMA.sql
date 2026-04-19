-- ═══════════════════════════════════════════════════════════════════════════
-- PUPPY PREP — Supabase schema (v1)
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Paste this into:  Supabase dashboard → SQL Editor → New Query → Run
--
-- Strategy: ONE row per user, snapshot all their stores in JSONB columns.
-- Simple, fast, avoids normalising nested data that's only ever read as a
-- whole. RLS ensures each user can ONLY read/write their own row.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Table ------------------------------------------------------------------
create table if not exists public.user_data (
  user_id uuid primary key references auth.users (id) on delete cascade,

  -- Each JSONB mirrors a client-side Zustand store. Keys match the
  -- persist({ name: ... }) of each store for clarity, not correctness —
  -- the client matches these by position, not by name.
  puppy_store    jsonb default '{}'::jsonb,
  calendar_store jsonb default '{}'::jsonb,
  tracker_store  jsonb default '{}'::jsonb,
  user_prefs     jsonb default '{}'::jsonb,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Update timestamp trigger -----------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists user_data_touch on public.user_data;
create trigger user_data_touch
  before update on public.user_data
  for each row execute function public.touch_updated_at();

-- 3. Row-Level Security (MANDATORY) -----------------------------------------
-- Each auth.uid() can only see + edit its own user_data row. Without
-- these policies, anyone with the anon key could read anyone's data.
alter table public.user_data enable row level security;

drop policy if exists "users can read own row" on public.user_data;
create policy "users can read own row"
  on public.user_data for select
  using ( auth.uid() = user_id );

drop policy if exists "users can insert own row" on public.user_data;
create policy "users can insert own row"
  on public.user_data for insert
  with check ( auth.uid() = user_id );

drop policy if exists "users can update own row" on public.user_data;
create policy "users can update own row"
  on public.user_data for update
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

drop policy if exists "users can delete own row" on public.user_data;
create policy "users can delete own row"
  on public.user_data for delete
  using ( auth.uid() = user_id );

-- 4. Grants -----------------------------------------------------------------
-- Allow authenticated users to use the table; anon users get NOTHING.
grant all on public.user_data to authenticated;
revoke all on public.user_data from anon;
