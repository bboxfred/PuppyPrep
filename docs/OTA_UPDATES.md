# Over-the-Air (OTA) Updates — EAS Update

Push JS / asset changes to users without a store resubmission.

## What OTA updates CAN do
- Change **JS / TS code** (components, logic, copy).
- Change **assets bundled with assetBundlePatterns** (images, fonts).
- Fix bugs, tweak copy, add non-native features — typically live within 60 seconds of push.

## What OTA updates CANNOT do
- Change **native code** (native modules, plugin changes, `app.json` native config).
- Change **`app.json`** in ways that affect the binary (permissions, icon, splash).
- Adjust **`package.json`** dependencies that pull in new native code.

Any change to the above requires a new store build.

---

## Already configured in `app.json`

```jsonc
"runtimeVersion": { "policy": "appVersion" },
"updates": {
  "url": "https://u.expo.dev/REPLACE_AFTER_EAS_INIT",
  "enabled": true,
  "fallbackToCacheTimeout": 0,
  "checkAutomatically": "ON_LOAD"
}
```

**`runtimeVersion.policy: "appVersion"`** means every new native version (1.0.0 → 1.1.0) creates a fresh OTA channel. Users on v1.0.0 won't receive v1.1.0 JS — they'd need to update via the store first. This is the safest policy: a JS update can't crash because it expects a new native module.

---

## One-time setup (after you've run `eas init`)

```bash
npx eas update:configure
```

This does two things:
1. Generates your project's unique update URL (replaces `REPLACE_AFTER_EAS_INIT` in `app.json`).
2. Enables the EAS Updates service for this project.

Then rebuild at least once so the updated `app.json` ships in the binary:
```bash
npx eas build --profile production --platform all
```

---

## Publishing an OTA update

```bash
# Make your JS changes, then:
npx eas update --branch production --message "Fix deworming date math for leap years"
```

Users on the production channel receive the update the next time they launch the app.

**Channels** match the `channel` field in your `eas.json` build profile:
- `development` — for dev client builds
- `preview` — internal test builds
- `production` — store-released builds (user-facing)

## Rolling back a bad update

```bash
# List recent updates for this branch
npx eas update:list --branch production

# Republish an earlier update (users will roll back on next launch)
npx eas update:republish --group <UPDATE_ID>
```

---

## What a safe OTA release looks like

1. Ship to `preview` channel first:
   ```bash
   npx eas update --branch preview --message "New onboarding copy"
   ```
2. Open the preview build on a test device — verify nothing regressed.
3. Promote to production:
   ```bash
   npx eas update --branch production --message "New onboarding copy"
   ```

## What NEVER to OTA-ship

- A first release — always a store build.
- Anything that touches native code — rebuild and resubmit.
- Large assets added to bundle — they'll balloon download time.

## Cost

- **EAS Updates hobby tier:** 1,000 MAU free.
- **Paid:** US$29/month for 50K MAU, then metered.

For a new app at 100–1,000 users, you stay comfortably in the free tier.
