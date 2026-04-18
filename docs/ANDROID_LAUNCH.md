# Android-Only Launch Path

Strategy: ship to Google Play first at **S$35 one-time cost**. Prove revenue. Add iOS later once the Apple Developer Program fee is justified.

---

## Current state ✅

- [x] Expo account: `bboxfred`
- [x] Google Play Console: signed up
- [x] `app.json`: Android package `com.puppycarecompass.app`, owner `bboxfred`
- [x] `eas.json`: Android preview + production profiles configured
- [x] Play Store icon: 512 × 512 at `assets/store/android/play-icon-512.png`
- [x] Feature graphic: 1024 × 500 at `assets/store/android/feature-graphic-1024x500.png`
- [x] Privacy policy + Terms drafted at `docs/privacy/` + `docs/terms/`
- [x] `expo-updates` wired for OTA

## Still to do (in this order)

### 🟦 Step 1 — Push to GitHub + enable Pages (15 min, free)

Privacy URL is mandatory for Play Store submission.

```bash
cd /Users/freddylimgx/puppycare-compass
gh repo create bboxfred/puppycare-compass --public --source=. --remote=origin --push
```

Then:
1. Open `https://github.com/bboxfred/puppycare-compass/settings/pages`
2. Source: **Deploy from branch**, Branch: **main**, Folder: **/docs**
3. Click **Save**
4. Wait ~45 seconds, then confirm `https://bboxfred.github.io/puppycare-compass/privacy/` returns HTTP 200

### 🟦 Step 2 — Link project to EAS cloud (2 min)

```bash
cd /Users/freddylimgx/puppycare-compass
npx eas login                           # paste your Expo password
npx eas init                            # auto-fills extra.eas.projectId in app.json
npx eas update:configure                # auto-fills updates.url in app.json
```

After `eas init`, commit the updated `app.json` so the project ID is under source control.

### 🟦 Step 3 — Generate Android signing keystore (3 min)

```bash
npx eas credentials
# → select: Android → Keystore → Set up a new keystore
# EAS will generate + store a production keystore for you
# DO NOT lose this keystore — it's required for every future update
```

EAS stores this in the cloud. You can download a backup via `eas credentials:configure`.

### 🟦 Step 4 — First Android build (preview APK, 15–25 min)

```bash
npx eas build --profile preview --platform android
```

Produces a `.apk` you can download from the EAS dashboard and sideload onto any Android device for real-world testing. Not for Play Store submission yet — just for internal verification.

**Smoke test checklist:**
- [ ] Install the APK on your phone (allow "install from unknown sources" when prompted)
- [ ] Complete onboarding for 3 different breeds: Chihuahua (toy), Golden Retriever (large), Boston Terrier (brachycephalic)
- [ ] Verify the calendar generates with reasonable events
- [ ] Open the library — confirm markdown renders properly
- [ ] Purchase the paywall (use Play Store test account — details below)
- [ ] Record a screen recording for your own QA — helps spot anything weird

### 🟦 Step 5 — Take Play Store screenshots (30–60 min)

Follow `docs/SCREENSHOT_GUIDE.md` for the 8 required scenes. Capture on any Android device/emulator at 1080×1920 minimum.

```bash
# After you have raw screenshots:
node scripts/frame-screenshots.mjs \
  --input screenshots/raw/android-phone/ \
  --device pixel-8-pro \
  --output assets/store/android/screenshots/
```

You need at least 2 screenshots for Play. 8 is better for conversion.

### 🟦 Step 6 — Build production AAB (15–25 min)

```bash
npx eas build --profile production --platform android
```

Produces a `.aab` (Android App Bundle) — Play Store's preferred upload format.

### 🟦 Step 7 — Create Play Store app listing

In Play Console:

1. **Main store listing**:
   - App name: **Puppy Prep**
   - Short description: from `docs/STORE_LISTING.md`
   - Full description: from `docs/STORE_LISTING.md`
   - App icon: `assets/store/android/play-icon-512.png`
   - Feature graphic: `assets/store/android/feature-graphic-1024x500.png`
   - Phone screenshots: 2–8 from `assets/store/android/screenshots/`

2. **Content rating**:
   - Click "Start questionnaire"
   - Category: **Utility / Productivity**
   - Answer "No" to everything except "Does the app share user-generated content externally?" (No)
   - You should receive "Everyone" / PEGI 3 rating

3. **App category**: **Lifestyle** (primary) + **Pets** tag

4. **Data safety**: use the declaration table in `docs/STORE_LISTING.md` — it maps each question to its answer

5. **Privacy policy URL**: `https://bboxfred.github.io/puppycare-compass/privacy/`
   (or `https://puppyprep.app/privacy/` once the custom domain resolves)

6. **Contact email**: `support@puppyprep.app` (or your preferred)

7. **App access**:
   - "All functionality is available without restrictions" = Yes
   - No login is required to use the app

### 🟦 Step 8 — Upload to Internal Testing track (2 min)

```bash
npx eas submit --profile production --platform android --latest
```

This uses the service-account JSON you'll have set up at `credentials/google-play-service-account.json`. If you haven't done that yet:

1. In Google Cloud Console: create service account `puppyprep-eas`
2. Grant role: "Service Account User"
3. Create JSON key → download → save as `credentials/google-play-service-account.json`
4. In Play Console → Users → invite the service account email → grant "Release manager"

Internal testing goes live in ~15 minutes. You can add up to 100 testers via email.

### 🟦 Step 9 — Promote to Production

Once internal testers confirm no issues for 3–5 days:
- Play Console → Production track → "Create new release"
- Attach the same AAB
- Write release notes (from `docs/STORE_LISTING.md` → "Release Notes")
- Submit for review

**Play Store review time: usually 2–48 hours** (much faster than Apple's 4–48 hours post-TestFlight).

---

## In-app purchases setup (for Puppy Prep Pro)

Before the Production release, set up the IAP:

1. **Play Console → Monetise → Products → In-app products → Create product**:
   - Product ID: `puppyprep_pro_lifetime`
   - Name: **Puppy Prep Pro**
   - Description: *One-time upgrade that unlocks the full care calendar, push reminders, weight tracker, and widget. Library stays free for everyone.*
   - Price: **S$12.99** (auto-converts to other countries)
   - Status: **Active**

2. **Link in-app product to your app build** — the code already references `puppyprep_pro_lifetime`.

3. **Test with a license tester account**:
   - Play Console → Settings → License testing
   - Add your Gmail → test purchases won't be charged

---

## Critical gotchas (learned the hard way)

- **Don't lose your keystore.** EAS stores it, but back up locally via `npx eas credentials` → Download just in case. Without it you can never update the app.
- **versionCode must increment every upload.** `eas.json` has `autoIncrement: true` for production — it handles this automatically. Don't manually set `versionCode` in `app.json` for production builds.
- **First submission often gets rejected for:** missing data safety form, privacy URL not accessible, or screenshots that don't show the app (stock images are rejected).
- **You cannot delete apps from Play Console** — once a package name is used it's gone forever. Make sure `com.puppycarecompass.app` is final before submitting.

---

## Revenue milestones to reconsider iOS

- **At 100 users**: you've proven Android conversion. Apple $128 is still a luxury.
- **At 500 users**: if 5%+ have paid for Pro, Apple fee pays itself back in ~1 month.
- **At 1,000 users**: iOS is a no-brainer — about 50% of first-world dog owners are on iPhone.
- **At first rejection from a user "do you have it on iPhone?"**: that's your trigger.

## Total cost to launch Android

| Item | Cost |
|---|---|
| Google Play Console | S$35 one-time ✅ already paid |
| EAS Build (hobby tier) | Free — 30 builds/month |
| EAS Updates (hobby tier) | Free — 1,000 MAU |
| GitHub Pages | Free |
| Domain `puppyprep.app` (optional) | S$15/year |
| **Total to reach production** | **S$0–15** (already paid the S$35) |
