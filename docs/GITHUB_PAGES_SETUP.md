# GitHub Pages — Deploy privacy policy + terms

These URLs are REQUIRED by both stores before submission. GitHub Pages is free.

## Option A: `username.github.io/repo-name` (free, zero config)

1. **Push this repo to GitHub** (if not already):
   ```bash
   gh repo create bboxfred/PuppyPrep --public --source=. --remote=origin --push
   ```

2. **Enable Pages**:
   - Go to `https://github.com/bboxfred/PuppyPrep/settings/pages`
   - Under "Build and deployment":
     - **Source:** "Deploy from a branch"
     - **Branch:** `main`
     - **Folder:** `/docs`
   - Click **Save**.

3. **Wait 30–60 seconds.** Your pages will be live at:
   - **Home:** `https://bboxfred.github.io/PuppyPrep/`
   - **Privacy:** `https://bboxfred.github.io/PuppyPrep/privacy/`
   - **Terms:** `https://bboxfred.github.io/PuppyPrep/terms/`
   - **Support:** `https://bboxfred.github.io/PuppyPrep/support/`

4. **Use these URLs in the stores.**

## Option B: Custom domain `puppyprep.app` (S$15/year)

If you own the `puppyprep.app` domain (or want to buy it):

1. **Buy the domain** — Namecheap, Cloudflare Registrar, or Porkbun.

2. **Add `CNAME` file** to `docs/` (already created — see `docs/CNAME`).

3. **Configure DNS** at your registrar:
   - Add 4 `A` records for apex:
     ```
     @  A  185.199.108.153
     @  A  185.199.109.153
     @  A  185.199.110.153
     @  A  185.199.111.153
     ```
   - Add 1 `CNAME` for `www`:
     ```
     www  CNAME  bboxfred.github.io
     ```

4. **In GitHub Pages settings**: type `puppyprep.app` under "Custom domain", click Save, wait for DNS check, then enable "Enforce HTTPS".

5. **Live URLs**:
   - `https://puppyprep.app/`
   - `https://puppyprep.app/privacy/`
   - `https://puppyprep.app/terms/`
   - `https://puppyprep.app/support/`

## Verify before submitting to stores

```bash
curl -I https://YOUR_PAGES_URL/privacy/
# Should return: HTTP/2 200
```

If stores reject your submission because "privacy URL not accessible", it usually means:
- DNS hasn't propagated yet (wait up to 24 hours for apex records)
- HTTPS isn't enforced (toggle in GitHub Pages settings)
- The URL path is wrong (must be the exact URL you typed in App Store Connect)

## What to update before going public

Both `privacy/index.html` and `terms/index.html` have placeholder text:

- `[YYYY-MM-DD]` — replace with actual dates
- `[YOUR ADDRESS]` — your Singapore mailing address
- `[YOUR LEGAL NAME OR COMPANY]` — your legal data-controller name

Search both files for `[` to find every placeholder.
