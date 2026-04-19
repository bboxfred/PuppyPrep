# Promo Codes — How to create, view, and delete

Once you've run `docs/SUPABASE_PROMO_CODES.sql` in your Supabase SQL Editor,
you (and only you, using the Supabase dashboard) can manage promo codes.
Users redeem them from Settings → Redeem a code.

---

## ✨ How the system works

```
┌─────────────────────┐       ┌──────────────────────────┐       ┌────────────────┐
│ YOU in dashboard    │       │ Supabase: promo_codes    │       │ User in app    │
│ Insert / delete     │──────▶│  (PROTECTED by RLS)      │◀──────│ Types a code   │
│ rows here           │       │                          │  RPC  │ in Settings    │
└─────────────────────┘       │ user_pro_entitlements    │       └────────────────┘
                              │  (auto-written by RPC)   │
                              └──────────────────────────┘
```

- Users **cannot** see the `promo_codes` table (RLS blocks them).
- Users **cannot** write to `user_pro_entitlements` directly (RLS blocks them).
- The only way Pro gets granted is through the `redeem_promo_code` RPC,
  which checks: code exists, not expired, not used up, user hasn't redeemed
  it already. Then it adds N days to their `pro_until` date.

---

## 🆕 Creating a code

### Option A — Dashboard (no SQL)
1. Supabase dashboard → **Table Editor → `promo_codes`**
2. Click **+ Insert** → **Insert row**
3. Fill in:
   - **code:** whatever string you want (`BREEDER2026`, `LAUNCH90`, `FACEBOOK-GIFT`, etc.)
     Case-insensitive when redeemed — `Launch90` and `LAUNCH90` are the same code.
   - **days:** how many days of Pro this grants (e.g. `90`)
   - **notes** *(optional):* your own reminder ("Facebook group launch Q2 2026")
   - **max_uses** *(default 1):* how many different users can redeem this code
   - **expires_at** *(optional):* leave `NULL` for no expiry, or set a date
4. Save.

### Option B — SQL for batch creation
```sql
-- One single-use code granting 90 days
insert into promo_codes (code, days, notes)
values ('BREEDER2026', 90, 'Q2 newsletter');

-- 10 different codes, each 30 days, bulk insert
insert into promo_codes (code, days, notes) values
  ('SPRING01', 30, 'Spring campaign'),
  ('SPRING02', 30, 'Spring campaign'),
  ('SPRING03', 30, 'Spring campaign'),
  -- ... etc
  ('SPRING10', 30, 'Spring campaign');

-- A code any number of people can use (10 winners), expires in 30 days
insert into promo_codes (code, days, notes, max_uses, expires_at)
values ('CONTEST2026', 60, 'Instagram giveaway', 10, now() + interval '30 days');

-- Free Pro for life (well, 100 years) — for friends + family
insert into promo_codes (code, days, notes, max_uses)
values ('FAMILY', 36500, 'Gift for mom', 5);
```

---

## 👀 Viewing activity

### See all codes with remaining redemptions
Supabase dashboard → **Table Editor → `promo_codes_admin`** (a view I created for you)
```
code       │ days │ notes              │ max │ used │ remaining │ expires_at │ created
SPRING01   │   30 │ Spring campaign    │   1 │    1 │         0 │ NULL       │ 2026-03-04
LAUNCH90   │   90 │ Pre-launch list    │  50 │   12 │        38 │ NULL       │ 2026-03-01
```

### See who redeemed what
```sql
select
  u.email,
  e.source_reference as code_used,
  e.granted_at,
  e.pro_until
from user_pro_entitlements e
join auth.users u on u.id = e.user_id
where e.source = 'promo_code'
order by e.granted_at desc;
```

---

## ❌ Deleting a code

**Deleting a code does NOT take Pro away from users who already redeemed it.**
It only prevents new redemptions.

### Dashboard
**Table Editor → `promo_codes`** → select the row(s) → click the trash icon → Confirm.

### SQL
```sql
delete from promo_codes where code = 'SPRING01';

-- Nuke everything from a campaign
delete from promo_codes where notes = 'Spring campaign';

-- Delete all expired codes
delete from promo_codes where expires_at < now();
```

---

## 🔐 Revoking Pro from a specific user

If you need to pull Pro back from someone (refund requested, abuse, etc.):
```sql
-- Find the user's ID via their email
select id, email from auth.users where email = 'user@example.com';

-- Then revoke
delete from user_pro_entitlements where user_id = '<THE_UUID_FROM_ABOVE>';
```

---

## 🧪 Testing a code before giving it out

1. Sign in as yourself on your phone (or a test device)
2. Settings → **Redeem a code** → type the code
3. You'll see **"🎉 N days of Pro unlocked — valid until..."**
4. To re-test, in Supabase: `delete from user_pro_entitlements where user_id = '<YOUR_UUID>';`
   and reset the code counter: `update promo_codes set current_uses = 0 where code = '<CODE>';`

---

## 📋 Common patterns

| Situation | SQL |
|---|---|
| 100 referral codes, 30d each, single use | `insert into promo_codes(code,days)` + loop |
| Partnership with vet clinic — unlimited code | `max_uses = 1000000` |
| Early-bird campaign expiring in a week | `expires_at = now() + interval '7 days'` |
| Lifetime Pro for a beta tester | `days = 36500, max_uses = 1` |

---

## 🎯 Security notes (for your peace of mind)

- Users **cannot** see the `promo_codes` table — the app calls the RPC only.
- Users **cannot** write directly to `user_pro_entitlements` — RLS blocks it.
- The `redeem_promo_code` function runs as `SECURITY DEFINER`, meaning it
  bypasses RLS to do its job but only performs the exact steps coded in.
  A malicious client cannot inject additional SQL.
- Every code redemption locks the code row (`for update`) to prevent a
  user from redeeming the same code twice in parallel.
