# Auth Setup — Google Sign-In + Supabase

Everything the app code is ready for. You need to configure two dashboards
(Supabase + Google Cloud Console) before the next APK build can actually
authenticate users.

**Total time:** ~25 minutes. **Cost:** free.

---

## 🟦 Phase 1 — Supabase project (10 min)

If you already have a Supabase project for Puppy Prep, skip to step 3.

### 1. Create the project
1. Go to https://supabase.com → sign in / sign up.
2. New Project → Name: **Puppy Prep**. Region: **Southeast Asia (Singapore) — ap-southeast-1**. Password: generate + save in 1Password.
3. Wait ~2 min for provisioning.

### 2. Get URL + anon key
1. In the project dashboard → **Settings → API**
2. Copy:
   - **Project URL** (e.g. `https://abcd1234.supabase.co`)
   - **anon public** key (long JWT)
3. Paste into your local `.env`:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://abcd1234.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   ```

### 3. Apply the schema
1. Supabase dashboard → **SQL Editor → New Query**
2. Paste the entire contents of `docs/SUPABASE_SCHEMA.sql`
3. Click **Run**
4. Verify: **Table Editor** shows a new `user_data` table

---

## 🟦 Phase 2 — Google Cloud OAuth client (10 min)

This gives Supabase permission to verify "sign in with Google" on your behalf.

### 1. Create a Google Cloud project (if none)
1. https://console.cloud.google.com → **Select a project → New Project**
2. Name: **Puppy Prep** — no organisation needed. Create.

### 2. Enable OAuth consent screen
1. **APIs & Services → OAuth consent screen**
2. User type: **External** → Create
3. App information:
   - **App name:** Puppy Prep
   - **User support email:** your email
   - **App logo:** upload `assets/images/app-icon.png`
   - **Application home page:** `https://bboxfred.github.io/PuppyPrep/`
   - **Privacy URL:** `https://bboxfred.github.io/PuppyPrep/privacy/`
   - **Terms URL:** `https://bboxfred.github.io/PuppyPrep/terms/`
4. **Scopes:** add `email`, `profile`, `openid` (the three defaults)
5. **Test users:** add your own Gmail while the app is in "Testing" status
6. Save and exit

### 3. Create the OAuth client ID
1. **APIs & Services → Credentials → Create Credentials → OAuth client ID**
2. **Application type:** Web application
3. **Name:** `puppyprep-supabase`
4. **Authorised redirect URIs** → Add:
   ```
   https://<YOUR-SUPABASE-PROJECT>.supabase.co/auth/v1/callback
   ```
   (Use the URL from your `.env`.)
5. Click Create. Copy the generated **Client ID** and **Client Secret**.

### 4. Paste Client ID + Secret into Supabase
1. Supabase dashboard → **Authentication → Providers**
2. Find **Google** → Toggle **Enabled**
3. Paste:
   - Client ID (for OAuth): your Google client ID
   - Client Secret (for OAuth): your Google client secret
4. **Leave the "Authorized Client IDs" field EMPTY** unless you later add native Google Sign-In
5. **Save**

---

## 🟦 Phase 3 — Add redirect URL to Supabase (2 min)

Supabase needs to allow-list the deep-link scheme `puppyprep://auth/callback`
that the app opens after OAuth completes.

1. Supabase dashboard → **Authentication → URL Configuration**
2. Under **Redirect URLs**, add these two:
   ```
   puppyprep://auth/callback
   exp://auth/callback
   ```
   (The `exp://` entry lets Expo Go test the flow during development.)
3. **Site URL** (optional, for web): leave as default or set to your GH Pages URL
4. **Save**

---

## 🟦 Phase 4 — First test (5 min)

After you've run the next APK build:

1. Install the APK on your phone
2. Tap **Continue with Google**
3. An in-app browser opens the Google consent screen
4. Grant access
5. Browser closes, app redirects to main UI
6. Go to **Settings → Account** — you should see your name + email
7. Kill the app and relaunch → you stay signed in
8. Restart with a new test user on a different device → they get a fresh onboarding

If sign-in fails:
- **"redirect_uri_mismatch"** → you forgot step 3 (allow-list `puppyprep://auth/callback`)
- **"unauthorized_client"** → the Client ID in Supabase doesn't match the one in Google Cloud
- **"access blocked: app not verified"** → expected while the OAuth consent screen is in Testing mode. Add your Gmail to Test Users, or publish the consent screen (Production mode requires a review when you have >100 users).

---

## 🟦 Phase 5 — Going to production (later, when you have real users)

### Publish your OAuth consent screen
Required when you move from internal testing to public Play Store launch:

1. Google Cloud → OAuth consent screen → **Publish App**
2. If you request only `email`, `profile`, `openid` (default scopes), no verification is required and the "app not verified" warning goes away immediately.
3. If you ever add sensitive scopes (Gmail, Drive, etc.), Google requires a formal verification process (~1–2 weeks). You do NOT need this for Puppy Prep.

### RLS policies are already applied
The SQL from `docs/SUPABASE_SCHEMA.sql` enables Row-Level Security on `user_data`. Each authenticated user can only read/write their own row — nobody else's. The anon role has zero permissions on the table. Your data is safe by default.

---

## Summary — what goes where

| Value | Location in YOUR accounts |
|---|---|
| Supabase URL + anon key | `.env` (already in place — verify) |
| Google OAuth Client ID + Secret | Supabase dashboard → Authentication → Providers → Google |
| `puppyprep://auth/callback` redirect URL | Supabase dashboard → Authentication → URL Configuration |
| `user_data` table + RLS policies | Supabase dashboard → SQL Editor (run `SUPABASE_SCHEMA.sql`) |
| Your Gmail as test user | Google Cloud Console → OAuth consent screen |

Everything in the app code is configured. Only these dashboard steps remain.
