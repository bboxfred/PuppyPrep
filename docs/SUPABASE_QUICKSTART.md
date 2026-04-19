# Supabase Quickstart — from "project created" to "ready to sign in"

You've created a Supabase project called **PuppyPrep**. Here's every remaining
step, in order, to get Google sign-in + cloud sync + promo codes live.

**Total time:** ~20 minutes. **Cost:** free.

---

## Step 1 — Get your project URL + anon key (2 min)

1. Open your project: **https://supabase.com/dashboard/projects** → click PuppyPrep
2. **Left sidebar → Project Settings → API** (the gear icon at the very bottom, then "API")
3. Copy these two values:
   - **Project URL** — looks like `https://abcd1234efgh.supabase.co`
   - **Project API keys → `anon` `public`** — a long JWT starting with `eyJhbG...`
4. Open your `.env` file in `/Users/freddylimgx/puppycare-compass/.env` and replace:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://abcd1234efgh.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
5. **Save** — that's it for this step.

---

## Step 2 — Create the database tables (3 min)

1. Supabase dashboard → **Left sidebar → SQL Editor** (looks like `</>` icon)
2. Click **+ New query** (top right)
3. Open `docs/SUPABASE_SCHEMA.sql` in your editor, copy the **entire file**
4. Paste into the SQL Editor
5. Click **Run** (or press Cmd+Enter / Ctrl+Enter)
6. You should see **"Success. No rows returned"** at the bottom
7. Repeat for `docs/SUPABASE_PROMO_CODES.sql`:
   - New query → paste entire file → Run
8. Verify: **Table Editor** in the sidebar. You should now see:
   - `user_data`
   - `promo_codes`
   - `user_pro_entitlements`

---

## Step 3 — Allow-list the redirect URL (2 min)

The app comes back from Google with `puppyprep://auth/callback`. Supabase
needs to know this URL is safe.

1. Supabase dashboard → **Authentication → URL Configuration**
2. Under **Redirect URLs**, click **Add URL**, paste this, click Save:
   ```
   puppyprep://auth/callback
   ```
3. Click **Add URL** again, paste this (for Expo Go dev testing), save:
   ```
   exp://auth/callback
   ```
4. **Site URL** (top of the same page): leave as-is or set to your GitHub Pages URL

---

## Step 4 — Create a Google Cloud OAuth client (10 min)

This is the longest step. Google needs to know your app is legitimate before
it will let users sign in with their Google accounts through Supabase.

### 4a. Create or pick a Google Cloud project

1. Open **https://console.cloud.google.com**
2. Top bar → **project dropdown → New Project**
3. **Name:** PuppyPrep — **Organization:** No organization. Click Create.
4. Wait ~10 sec for it to provision, then switch to the new project
   (top bar dropdown again).

### 4b. Set up the OAuth consent screen

1. Left sidebar → **APIs & Services → OAuth consent screen**
2. User Type: **External** → Click **Create**
3. On the **App information** page:
   - App name: `Puppy Prep`
   - User support email: your email
   - App logo: upload `assets/images/app-icon.png` from your repo
   - Application home page: `https://bboxfred.github.io/PuppyPrep/`
   - Application privacy policy link: `https://bboxfred.github.io/PuppyPrep/privacy/`
   - Application terms of service link: `https://bboxfred.github.io/PuppyPrep/terms/`
   - Authorized domains: add **`supabase.co`** (the redirect URL's domain)
   - Developer contact email: your email
4. **Save and continue**
5. **Scopes** page: click **Add or remove scopes**, check the three defaults:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
   **Update → Save and continue**
6. **Test users** page: add YOUR OWN Gmail (and anyone testing the APK with you).
   While the app is in "Testing" status only listed accounts can sign in.
   **Save and continue** → **Back to dashboard**

### 4c. Create the OAuth client ID

1. Left sidebar → **APIs & Services → Credentials**
2. Top: **+ Create Credentials → OAuth client ID**
3. Application type: **Web application**
4. Name: `PuppyPrep Supabase`
5. Under **Authorized redirect URIs**, click **Add URI** and paste:
   ```
   https://<YOUR_PROJECT>.supabase.co/auth/v1/callback
   ```
   Replace `<YOUR_PROJECT>` with YOUR actual Supabase subdomain from Step 1.
6. Click **Create**
7. A modal pops up with **Client ID** and **Client secret**. **Copy both.**
   (You can also retrieve these later from the Credentials list.)

### 4d. Paste Client ID + Secret into Supabase

1. Back in Supabase dashboard → **Authentication → Providers**
2. Scroll to **Google** → Toggle it **ON**
3. Paste:
   - **Client ID (for OAuth):** your Google Client ID from 4c
   - **Client Secret (for OAuth):** your Google Client Secret from 4c
4. Leave **Skip nonce check** OFF
5. Leave **Authorized Client IDs** BLANK (for now — only used if we add native Google Sign-In later)
6. **Save**

---

## Step 5 — Test it (1 min)

You won't be able to fully test this until the next APK build. But you can
verify the config by doing a dry run in the Supabase dashboard:

1. Supabase dashboard → **Authentication → Users**
2. It should be empty — that's fine, no one has signed in yet
3. **Authentication → Providers → Google** should show a green ✓ next to Enabled

---

## ✅ Done

When all five steps pass, you can build the next APK. The first time
a user opens the app:
1. They'll land on the login screen
2. Tap **Continue with Google** → in-app browser opens
3. Google's consent screen appears — they grant access
4. They're redirected back to the app, already signed in
5. The onboarding flow begins; everything they enter auto-syncs to Supabase

---

## 🆘 Common issues

| Problem | Fix |
|---|---|
| **"redirect_uri_mismatch"** on Google | In step 4c, the redirect URI must be EXACTLY `https://<your>.supabase.co/auth/v1/callback` (no trailing slash, correct subdomain). |
| **"access_denied" / "app not verified"** | Only happens while OAuth consent is in Testing. Either (a) add that user's email to Test Users in 4b, or (b) hit "Publish App" in 4b when ready for public launch. |
| **Stays on login screen after Google flow** | In step 3, you likely forgot to add `puppyprep://auth/callback` to Supabase redirect URLs. |
| **"Invalid API key"** in app | The anon key in `.env` is wrong or truncated. Re-copy from step 1.4. |

---

## 🎁 Bonus: promo code setup

Already done if you ran `docs/SUPABASE_PROMO_CODES.sql` in step 2. To create
your first code:

1. Supabase dashboard → **Table Editor → promo_codes → + Insert**
2. code: `TESTER90` — days: `90` — notes: `First test code`
3. Save. **Users can redeem it now from Settings → Redeem a code.**

See `docs/PROMO_CODES_ADMIN.md` for the full admin playbook.
