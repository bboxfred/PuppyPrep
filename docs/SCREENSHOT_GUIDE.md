# Screenshot Capture Guide

Store-ready screenshots for App Store + Google Play. You'll capture **the same 8 scenes** in each required device size, then optionally run `scripts/frame-screenshots.mjs` to add device bezels.

---

## The 8 scenes to capture (in this order, same content across device sizes)

| # | Screen | Setup state | Caption idea |
|---|---|---|---|
| 1 | **Dashboard — pregnant** | Complete onboarding as Golden Retriever, mating date 3 weeks ago. Dashboard shows countdown, gold "Puppies arrived?" card, today's tasks. | "Your dog is pregnant. Now you have a plan." |
| 2 | **Dashboard — born, Week 1** | Onboard as Chihuahua, born 3 days ago, 3 puppies. Shows Day 3 tasks, feeding card, critical alerts. | "Day 3 of 56. Every critical window, on your screen." |
| 3 | **Q1 Breed picker** | Q1 with dropdown open, search "terrier", 5 results visible. | "42 breeds. Each with its own care protocol." |
| 4 | **Calendar month view** | Calendar tab with dots across multiple days, one day tapped showing bottom sheet. | "The whole 8 weeks at a glance." |
| 5 | **Library — Birth Guide** | Open the Birth Guide with the 3 numbers card and section list. | "The full library — free forever." |
| 6 | **Emergency Guide** | Open Emergency Guide, one scenario expanded. | "Emergency guidance when you need it most." |
| 7 | **Weight Tracker** | Tracker with 4 puppies set up, one showing a weight gain chart. | "Track every puppy, catch problems early." |
| 8 | **Settings / Pro paywall** | Paywall screen showing the gold hero + "Complete Info Library — every guide, every article" in the always-free list. | "The library stays free. Always." |

Keep the content **identical** across device sizes — don't mix and match scenes.

---

## Required device sizes

### iOS — App Store Connect requires these exact sizes:

| Device | Dimensions (pixels) | Minimum screenshots | Status |
|---|---|---|---|
| iPhone 15/16 Pro Max (6.7") | **1290 × 2796** | 3 | Required |
| iPhone 11 Pro Max / 14 Plus (6.5") | **1242 × 2688** or **1284 × 2778** | 3 | Required (uploaded when 6.7" unavailable for your app) |
| iPhone 8 Plus (5.5") | **1242 × 2208** | 3 | Optional but recommended for broader device reach |
| iPad Pro 12.9" | **2048 × 2732** | 3 | Required (you set `supportsTablet: true`) |
| iPad Pro 12.9" (2nd gen) | **2048 × 2732** | 3 | Accepts the same image as above |

### Android — Google Play Console:

| Asset | Dimensions | Required? |
|---|---|---|
| Phone screenshots | At least 1080 × 1920 | 2 minimum, 8 max |
| Feature graphic | **1024 × 500** exactly | **Mandatory** |
| 7" tablet | 1200 × 1920 | Optional |
| 10" tablet | 1600 × 2560 | Optional |

---

## Capture method 1 — iOS Simulator (easiest, zero cost)

```bash
# Pick each device size from Xcode's simulator list:
open -a Simulator                         # macOS
# File → New Simulator → iPhone 15 Pro Max
# File → New Simulator → iPhone 14 Plus
# File → New Simulator → iPad Pro 12.9" (6th gen)
# File → New Simulator → iPhone 8 Plus

# In the project:
cd /Users/freddylimgx/puppycare-compass
npx expo start
# Press `i` to launch in simulator
# On each simulator, run through the 8 scenes above
# Cmd+S on each scene to save — macOS drops the file on your Desktop

# Default filenames look like:
# "Simulator Screenshot - iPhone 15 Pro Max - 2026-04-18 at 12.34.56.png"
```

Put each device's captures into its own folder:

```
screenshots/
  raw/
    iphone-67/          # iPhone 15 Pro Max captures (1290 × 2796)
    iphone-65/          # iPhone 14 Plus (1284 × 2778)
    iphone-55/          # iPhone 8 Plus (1242 × 2208)
    ipad-129/           # iPad Pro 12.9" (2048 × 2732)
    android-phone/      # Android captures (1080 × 2340 typical)
```

## Capture method 2 — Android emulator

```bash
# Open Android Studio → Device Manager → Create Device:
# Pixel 8 Pro (1344×2992, 6.7") — or any 1080p+ phone

# Launch emulator, then in project:
npx expo start
# Press `a` to launch on Android

# In the emulator, use the camera button on the right sidebar toolbar
# to capture (saves to ~/Pictures by default)
```

---

## Capture method 3 — Physical device (iOS + Android)

**iPhone:** Side button + Volume Up simultaneously. Screenshots save to Photos.
**Android:** Power + Volume Down. Screenshots save to Photos → Screenshots folder.

Transfer via AirDrop / Google Drive / cable.

---

## Frame screenshots with device bezels (optional but looks professional)

After you've captured the raw screenshots, run the framing tool:

```bash
node scripts/frame-screenshots.mjs \
  --input screenshots/raw/iphone-67/ \
  --device iphone-15-pro-max \
  --output screenshots/framed/iphone-67/
```

The framed versions can go straight into App Store Connect.

The tool downloads open-source device bezel PNGs from GitHub's device-mockup-assets repo on first run (cached). See `scripts/frame-screenshots.mjs` for all supported devices.

---

## Feature graphic (Google Play — mandatory)

Play Console won't accept your submission without a 1024×500 "feature graphic". Options:

1. **Quickest** — take your best hero screenshot, crop to 1024×500, add text overlay:
   - Background: the dashboard with countdown card
   - Overlay: "Puppy Prep" (Young Serif, forest green) + "From bump to bark" (DM Sans italic, cream)
2. **Polished** — design a dedicated graphic in Figma / Canva / Pencil (already configured in your MCP).

Save as `assets/store/play-feature-graphic.png` (1024 × 500, PNG or JPG, no alpha).

---

## Final folder layout (ready to upload)

```
assets/store/
  ios/
    1290x2796/           # 6.7" — 3 to 10 PNGs
    1284x2778/           # 6.5" — 3 PNGs minimum
    1242x2208/           # 5.5" — 3 PNGs minimum (optional)
    2048x2732/           # iPad 12.9" — 3 PNGs minimum
  android/
    phone/               # 2–8 PNGs, at least 1080 × 1920
    feature-graphic.png  # 1024 × 500 — mandatory
  shared/
    app-icon-1024.png    # (already exists at assets/images/app-icon.png)
    app-icon-512.png     # Play Store icon — downscale from 1024
```

---

## Tip — capture with realistic data

Real breeder names, realistic litter sizes, believable puppy names. Reviewers and users notice lorem-ipsum. Use data like:

- Dam: "Rosie" — Golden Retriever, 28kg, 2-to-5 years old
- Puppies: "Luna", "Max", "Bella", "Pip" with real yarn colours
- Birth weights: 420g, 465g, 390g, 445g (realistic Golden puppy weights)
