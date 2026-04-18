# CLAUDE.md — PuppyCare Compass 🐾
## AI Development Reference for Claude Code

> This file is the single source of truth for building PuppyCare Compass.
> Read this entire file before writing any code. Refer back to it for every feature.

---

## 1. PROJECT OVERVIEW

**App Name:** PuppyCare Compass
**Tagline:** "From bump to bark — we've got every day covered."
**Target User:** First-time or inexperienced dog owners whose dog is pregnant or has just given birth. Zero prior knowledge assumed.
**Primary Market:** Singapore + English-speaking SEA (launch), global (scale)
**Platform:** iOS + Android (React Native + Expo)
**Core Value Prop:** Answer 12 questions → get a fully populated care calendar with push notifications for every single thing you need to do, day by day, from pregnancy through 8 weeks old.

---

## 2. TECH STACK

| Layer | Technology | Reason |
|---|---|---|
| Framework | React Native + Expo SDK 51+ | Single codebase iOS/Android, widget support, fast dev |
| Language | TypeScript (strict) | Type safety for complex schedule logic |
| Navigation | Expo Router (file-based) | Clean routing, deep links for notifications |
| State Management | Zustand | Lightweight, no boilerplate |
| Backend / Auth | Supabase | Auth, Postgres DB, Edge Functions, real-time |
| Notifications | Expo Notifications | Push + local, works on both platforms |
| Calendar Widget | react-native-widget-extension (iOS) / Glance Widget (Android) | Native widget support |
| Calendar UI | react-native-calendars | Google Calendar-style month view |
| Charts | Victory Native | Weight tracking trend charts |
| Payments | RevenueCat | Handles IAP for both iOS + Android cleanly |
| Analytics | PostHog (self-hosted or cloud) | Privacy-respecting, mobile-friendly |
| Animations | React Native Reanimated 3 | Smooth 60fps animations |
| Icons | Lucide React Native | Consistent icon set |
| Storage (local) | MMKV via zustand-persist | Fast local storage for offline-first |

---

## 3. DESIGN SYSTEM

### Visual Identity
- **Aesthetic:** Warm, organic, trustworthy. NOT clinical. NOT sterile vet-office white.
  Think: soft morning light, a cozy whelping box, warmth and safety.
- **Mood:** Reassuring to a panicking new dog parent at 2am.

### Color Palette
```
Primary:      #2D6A4F  (deep forest green — calm, nature, life)
Secondary:    #74C69D  (sage mint — softness, growth)
Accent:       #F4A261  (warm amber — urgency alerts, CTAs)
Background:   #FAFAF7  (warm off-white, never pure white)
Surface:      #FFFFFF  (cards)
Text Primary: #1A1A2E  (near-black, warm)
Text Secondary: #6B7280
Error/CRITICAL: #E63946
Warning/HIGH:   #F4A261
Success:        #2D6A4F

Calendar Category Colors:
  Health:       #E63946  (red)
  Nutrition:    #F4A261  (amber)
  Socialization: #457B9D (blue)
  Training:     #6A4C93  (purple)
  Development:  #74C69D  (mint)
  Environment:  #95A5A6  (grey)
```

### Typography
```
Display font:  Fraunces (Google Font) — warm serif, feels like a dog-eared guidebook
Body font:     DM Sans — clean, friendly, highly legible on small screens
Mono:          JetBrains Mono — for date/time displays only
```

### Spacing System
```
Base unit: 4px
xs: 4px   sm: 8px   md: 16px   lg: 24px   xl: 32px   2xl: 48px
Border radius: sm=8, md=16, lg=24, pill=999
```

### Component Patterns
- Cards: white surface, 16px radius, subtle shadow (0 2px 12px rgba(0,0,0,0.08))
- Buttons: Primary = filled green, Secondary = outlined, Danger = red filled
- Progress indicators: thin colored line, no chunky progress bars
- Lists: generous spacing (20px between items), never cramped
- Empty states: always include an illustration + helpful action text
- Loading: skeleton screens (not spinners)

---

## 4. APP ARCHITECTURE

```
app/
├── (auth)/
│   ├── welcome.tsx          # App intro / value prop screen
│   └── sign-in.tsx          # Minimal auth (email magic link)
│
├── (onboarding)/
│   ├── _layout.tsx          # Onboarding shell with progress bar
│   ├── q1-breed.tsx         # Breed selector
│   ├── q2-status.tsx        # Pregnant or puppies born?
│   ├── q3-mating-known.tsx  # Know the mating date?
│   ├── q4-mating-date.tsx   # Date picker (conditional)
│   ├── q5-vet-confirmed.tsx # Vet visit done?
│   ├── q6-first-litter.tsx  # First litter?
│   ├── q7-age.tsx           # Dam age
│   ├── q8-weight.tsx        # Dam weight
│   ├── q9-puppies-born.tsx  # Puppies born? (branches)
│   ├── q10-puppy-count.tsx  # How many puppies?
│   ├── q11-birth-date.tsx   # Birth date
│   ├── q12-notifications.tsx # Notification prefs
│   └── generating.tsx       # "Building your calendar..." animated screen
│
├── (tabs)/
│   ├── _layout.tsx          # Bottom tab bar
│   ├── index.tsx            # Dashboard / Today view
│   ├── calendar.tsx         # Full calendar page
│   ├── library.tsx          # Info library
│   ├── tracker.tsx          # Puppy weight tracker (Litter Pro)
│   └── settings.tsx         # Settings + subscription
│
├── event/[id].tsx           # Event detail page
├── library/[slug].tsx       # Library article page
└── paywall.tsx              # Upgrade screen

src/
├── data/
│   ├── breeds/
│   │   └── registry.ts          # ALL selectable breeds + group metadata + helpers
│   │
│   ├── infobase/                 # ONE FILE PER BREED — NEVER import across files
│   │   ├── jrt.ts                # Jack Russell, Parson Russell, Russell Terrier
│   │   ├── fox_terrier.ts        # Smooth Fox Terrier, Wire Fox Terrier
│   │   ├── rat_terrier.ts        # Rat Terrier (miniature + standard)
│   │   ├── border_terrier.ts     # Border Terrier
│   │   ├── miniature_pinscher.ts # Min Pin — highest-risk breed in JRT group
│   │   ├── mixed_breed.ts        # Generic fallback by size category
│   │   └── birthing-guide.ts     # ⚠️ ALL BREEDS — complete whelping guide
│   │                             #    Populates: Birth Guide library section,
│   │                             #    pre-birth calendar events (Days -14 to 0),
│   │                             #    Emergency Guide (always free, no paywall)
│   │
│   ├── schedule-engine.ts        # Generates CalendarEvent[] from ScheduleInput
│   │                             # Imports ONLY the breed's own infobase file
│   └── library/
│       ├── pregnancy.ts
│       ├── newborn-care.ts
│       ├── health.ts
│       ├── nutrition.ts
│       ├── training.ts
│       └── emergency.ts          # ALWAYS FREE — no paywall ever
│
├── store/
│   ├── useUserStore.ts      # User profile, subscription status
│   ├── usePuppyStore.ts     # Dog/puppy data
│   └── useCalendarStore.ts  # Generated events, completion status
│
├── hooks/
│   ├── useScheduleEngine.ts # Calls schedule engine, returns events
│   ├── useNotifications.ts  # Schedule / cancel push notifications
│   └── useSubscription.ts   # RevenueCat subscription state
│
├── components/
│   ├── ui/                  # Base components (Button, Card, Badge, etc.)
│   ├── onboarding/          # Question screens components
│   ├── calendar/            # CalendarView, EventCard, DayStrip
│   ├── dashboard/           # TodayCard, CountdownBanner, QuickLog
│   ├── tracker/             # WeightChart, PuppyCard, WeightInput
│   └── paywall/             # PaywallModal, FeatureGate
│
└── utils/
    ├── date-helpers.ts
    ├── breed-helpers.ts
    └── schedule-helpers.ts
```

---

## 5. ONBOARDING FLOW — DETAILED SPEC

### Core Philosophy: Lives Are at Stake
This is not a productivity app. Wrong answers or skipped questions lead to missed
deworming, incorrect formula volumes, or undetected fading puppy syndrome.

**Two question tiers govern every screen:**

```
🔴 CRITICAL  — Must be answered. No skip button. No bypass.
               If the user does not know → block and instruct them
               exactly what to do to find out. Calendar stays locked
               until the answer is entered.

🟡 HELPFUL   — Improves personalisation but does not affect safety.
               Can be approximated or skipped. Clearly labelled
               "Optional — you can update this later."
```

**The Blocked State — shown when a CRITICAL answer is missing:**
```
┌──────────────────────────────────────────────┐
│  🔴  We need this to keep your               │
│      puppies safe                            │
│                                              │
│  [Plain-language explanation of WHY          │
│   this specific question matters —           │
│   written for someone with zero              │
│   dog knowledge]                             │
│                                              │
│  Here's what to do right now:               │
│  [Specific, actionable instruction]          │
│                                              │
│  ┌─────────────────────────────────────┐    │
│  │  Once you have the answer, enter    │    │
│  │  it here and we'll continue.        │    │
│  └─────────────────────────────────────┘    │
│                                              │
│  [Find a vet near me →]  (links to maps)    │
└──────────────────────────────────────────────┘
```

No error messages. No red banners. Warm, calm, clear. The app is their
ally — not a form validator.

---

### General Rules
- One question per screen — never combine two questions on one page
- Progress indicator at top: "Question X of 12" with a thin animated progress bar
- Back button always visible (answers are preserved on back-navigation)
- Answers saved to Zustand immediately — survive app close/crash
- Smooth horizontal slide animation between questions
- Each screen: warm illustration + clear headline + plain-language subtext + input control
- CRITICAL questions: no skip button rendered at all
- HELPFUL questions: small "Skip for now" text link at bottom (not a prominent button)

---

### Question Specs

---

**Q1 — Breed** 🔴 CRITICAL

- Headline: "What breed is your dog?"
- Subtext: "This changes everything — feeding amounts, health risks, and what to watch for."
- UI: Searchable list grouped by breed type. Breed cards show name + emoji + one-line description.
- "Mixed Breed / Not Sure" IS a valid answer — but selecting it triggers Q1b:
  - Q1b (🔴 CRITICAL): "How big is she?" with four visual size cards:
    - 🐾 Small — under 10kg (like a Beagle or Cocker Spaniel)
    - 🐕 Medium — 10–25kg (like a Labrador or Border Collie)
    - 🦮 Large — 25–45kg (like a German Shepherd or Rottweiler)
    - 🐘 Giant — over 45kg (like a Great Dane)
  - Size is used for all feeding/formula calculations when breed is unknown
- DO NOT allow proceeding without a breed or size selection
- Store: `breed_id`, `breed_name`, `breed_group_id`, `size_category`

---

**Q2 — Current Status** 🔴 CRITICAL

- Headline: "Where are you right now?"
- Subtext: "We'll build a completely different care plan depending on your answer."
- UI: Two large cards — tap to select, no confirm button needed, auto-advance
  - Card A: "🤰 My dog is pregnant — puppies haven't arrived yet"
  - Card B: "🐣 The puppies are already here"
- This answer branches ALL subsequent questions — it is the most important branch point
- Store: `status` = 'pregnant' | 'born'

---

**Q3 — Mating Date (if status = pregnant)** 🔴 CRITICAL

- Headline: "Do you know when she was mated?"
- Subtext: "The mating date lets us calculate your due date and build your entire
  pregnancy timeline. Without it, we can't tell you when to prepare the whelping
  box, when labor is likely, or when to call the vet."
- UI: Two options:
  - ✅ "Yes, I know the date" → advance to Q4 (date picker)
  - ❌ "No, I don't know" → show BLOCKED STATE:

  **Blocked state copy:**
  > "Without a mating date, we can't build a safe timeline for you.
  >
  > Here's what to do RIGHT NOW:
  > Book a vet appointment for an ultrasound or X-ray. An ultrasound from
  > Day 25 can confirm pregnancy AND estimate how far along she is. An X-ray
  > from Day 45 can count the puppies too.
  >
  > Once your vet gives you an estimated due date, come back and enter it here.
  > We'll build your full calendar immediately.
  >
  > [🗺 Find a vet near me]  [📅 Enter vet's estimated due date instead]"

  - If user taps "Enter vet's estimated due date instead" → date picker for due date
    (marks it as estimated, shows ±3 day range on calendar events)
- Store: `mating_date` OR `estimated_due_date` + `date_is_estimated: true`

---

**Q4 — Mating Date Picker (if Q3 = Yes)** 🔴 CRITICAL

- Headline: "When was she mated?"
- Subtext: "Pick the date of mating. If she was mated over multiple days, pick the first day."
- UI: Calendar date picker. Max = today. Min = 90 days ago.
- Show LIVE due date as user scrolls: "📅 Estimated due date: 14 Jun 2025 (in 23 days)"
- If calculated due date is in the past: show warning
  > "That date suggests she would have given birth already. Are the puppies born?
  > [Yes, puppies are here →]  [Let me re-enter the date]"
- Store: `mating_date`, `estimated_due_date` (mating_date + 63 days)

---

**Q5 — Birth Date (if status = born)** 🔴 CRITICAL

- Headline: "When were the puppies born?"
- Subtext: "This is the anchor for everything — deworming starts on Day 14,
  eye-opening happens around Day 12, the first vet visit should be Week 6.
  Getting this wrong means missing critical health windows."
- UI: Date picker. Max = today. Min = 70 days ago.
- If user selects today: confirm prompt — "Born today? Just to confirm — they
  arrived within the last 24 hours?" (prevents accidental wrong date)
- **If user is unsure of exact date:**
  Show this guidance instead of an estimate:
  > "If you're not 100% sure, use the EARLIEST date it could have been.
  > It is always safer to deworm slightly early than to miss the window.
  > Even one day matters. Please check your photos, messages, or vet records
  > before continuing."
  - User must actively tap "I've checked — use this date" to confirm
- Store: `birth_date`

---

**Q6 — Puppy Count (if status = born)** 🔴 CRITICAL

- Headline: "How many puppies are there?"
- Subtext: "We need this to watch for runts and to calculate feeding volumes
  if any puppies need bottle feeding. Count carefully — it matters."
- UI: Large number stepper (1–15) with +/- buttons. Current number displayed large.
- If count = 1: immediately surface singleton warning:
  > "⚠️ One puppy means no littermates. We'll add a special socialisation
  > protocol to your calendar — this is critical for your puppy's behaviour
  > as an adult."
- If count ≥ 10: surface large litter warning:
  > "That's a large litter! We'll add dam fatigue monitoring and extra feeding
  > checks to your calendar."
- Store: `puppy_count`, `is_singleton` (puppy_count === 1)

---

**Q7 — Are All Puppies Nursing? (if status = born)** 🔴 CRITICAL

- Headline: "Are all the puppies nursing?"
- Subtext: "A puppy that isn't nursing within the first few hours is in danger.
  We need to know right now so we can tell you what to do."
- UI: Three options:
  - ✅ "Yes — all puppies are nursing normally"
  - ⚠️ "Most are — one or two aren't latching well"
  - 🚨 "No — none of them are nursing" or "I'm not sure"
- If ⚠️ or 🚨: DO NOT continue onboarding. Show emergency protocol immediately:
  > "Stop — this is urgent.
  >
  > A puppy that hasn't nursed in 2 hours needs help right now.
  > Tap below to see exactly what to do — we'll continue setting
  > up your calendar after you've handled this.
  >
  > [🚨 Show me what to do right now →]"
  - This opens the Emergency Guide (always free, no paywall)
  - After user returns from Emergency Guide, Q7 is re-asked
- Store: `nursing_status`

---

**Q8 — Vet Confirmed? (if status = pregnant)** 🔴 CRITICAL

- Headline: "Has a vet confirmed the pregnancy?"
- Subtext: "Unconfirmed pregnancies can be false pregnancies — your dog shows
  all the signs but isn't actually pregnant. A vet check also tells us if
  there are any complications to watch for."
- UI: Three cards:
  - ✅ "Yes — ultrasound confirmed"
  - ✅ "Yes — vet examined her but no scan"
  - ❌ "Not yet"
- If "Not yet": show urgency message (not a block — but strongly worded):
  > "We strongly recommend booking a vet visit before the puppies arrive.
  > We'll add this as your #1 priority task in the calendar.
  >
  > We can continue building your calendar, but please book the vet
  > appointment today."
  - This is the ONE exception where a CRITICAL question doesn't fully block —
    because the user CAN continue, but the calendar Event #1 becomes
    "🔴 URGENT: Book vet visit today" with a phone/map link
- Store: `vet_confirmed` = 'ultrasound' | 'exam_only' | 'not_yet'

---

**Q9 — First Litter?** 🟡 HELPFUL

- Headline: "Is this her first litter?"
- Subtext: "First-time mums sometimes have longer labours and may need more help.
  We'll add extra guidance if this is her first time."
- UI: Yes / No — two cards
- Skip link: "Not sure / Skip"
- Default if skipped: `true` (safer assumption — treats her as first-time)
- Store: `first_litter`

---

**Q10 — Dam Age** 🔴 CRITICAL

- Headline: "How old is she?"
- Subtext: "Dogs under 2 years or over 6 years have higher pregnancy risks.
  We need to know so we can flag the right warnings."
- UI: Segmented control — 5 bands:
  - Under 1 year
  - 1–2 years
  - 2–5 years (safest range)
  - 5–7 years
  - Over 7 years
- Under 2 years: add high-risk flag + vet-on-standby recommendation
- Over 6 years: add high-risk flag + C-section discussion recommendation
- **If unknown:** Show instruction:
  > "Check her papers, microchip records, or ask your vet.
  > Her age changes what risks we watch for during birth.
  > We'll wait while you check."
  - Small "I genuinely cannot find out" escape hatch → defaults to '2–5 years'
    but adds calendar task: "Confirm dam's age with vet at next visit"
- Store: `dam_age_band`

---

**Q11 — Dam Weight** 🔴 CRITICAL

- Headline: "How much does she weigh?"
- Subtext: "We use this to calculate safe formula volumes if any puppies need
  bottle feeding, and to size the whelping box correctly."
- UI: Number input + kg/lbs toggle. Shows breed average as a reference:
  "A typical Jack Russell weighs 6–8kg"
- **If unknown:** Do NOT estimate. Show instruction:
  > "We can't calculate safe feeding amounts without her weight.
  >
  > Here's how to weigh her right now:
  > 1. Step on bathroom scales and note your weight
  > 2. Pick her up and step on again
  > 3. Subtract — that's her weight
  >
  > Takes 2 minutes. Please do this now and enter it here."
  - App waits. No bypass. No skip.
  - The feeding volume calculations in Week 1 are safety-critical.
- Store: `dam_weight_kg`

---

**Q12 — Notifications** 🟡 HELPFUL

- Headline: "When should we remind you?"
- Subtext: "We'll send you a daily summary and alert you before important events.
  You can change this any time in Settings."
- UI:
  - Time picker: "Daily reminder at [8:00 AM]"
  - Lead time: "Remind me [1 day] before events"
- Skip link: "Use defaults (8am, 1 day before)"
- Permission request shown after selection with explanation:
  > "We'll ask permission to send you notifications. These reminders exist
  > so you don't miss a deworming dose or a critical health window —
  > they're not marketing. You control them completely."
- Store: `notif_time`, `notif_lead_time`

---

## 6. SCHEDULE ENGINE — THE CORE LOGIC

This is the most important part of the app. File: `src/data/schedule-engine.ts`

### Input: `ScheduleInput`
```typescript
interface ScheduleInput {
  breed_id: string;
  size_category: 'toy' | 'small' | 'medium' | 'large' | 'giant';
  mating_date?: Date;
  estimated_due_date?: Date;
  birth_date?: Date;        // null if not yet born
  puppy_count?: number;
  dam_age_category: string;
  dam_weight_kg: number;
  first_litter: boolean;
  vet_confirmed: boolean;
  is_singleton: boolean;
  is_jrt_type: boolean;     // true for JRT + similar terriers
}
```

### Output: `CalendarEvent[]`
```typescript
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  category: 'health' | 'nutrition' | 'socialization' | 'training' | 'development' | 'environment';
  priority: 'critical' | 'high' | 'recommended';
  description: string;           // Plain language, zero jargon
  detail_markdown: string;       // Full instructions shown on event detail page
  is_free_tier: boolean;         // true = visible in free plan
  is_repeating: boolean;
  repeat_interval_hours?: number;
  completed: boolean;
  snoozed_until?: Date;
  tags: string[];                // e.g. ['deworming', 'vet', 'week-2']
  emergency_contact_recommended: boolean;
}
```

### Event Generation Rules

**Anchor: Day 0 = birth date (or estimated birth date)**

Generate events relative to Day 0. If only mating_date is known:
- Estimated birth = mating_date + 63 days
- Show pregnancy events counting DOWN to Day 0
- After birth, show postnatal events counting UP from Day 0

**Free tier events (always visible):**
- Day 0: First nursing / colostrum check
- Day 0: Weigh all puppies
- Day 3: First deworming reminder (upcoming)
- Day 7: Weight check milestone
- Week 3: Weaning introduction reminder
- All CRITICAL priority events in weeks 1–2
- Emergency guide (always fully accessible regardless of tier)

**Pro tier events (full calendar):**
- Everything in the main knowledge base
- All 10 supplement topics
- Complete deworming schedule (Days 14, 28, 42, 56)
- All vaccination events
- All socialization windows
- Daily temperature requirement reminders (week 1)
- ENS exercise reminders (Days 3–16, daily)
- Feeding frequency reminders

**Breed-specific modifiers:**
- JRT / small terrier: Add hypoglycaemia warning events; shorter time-between-feeding alerts; singleton syndrome check
- Large breeds: Add hip/joint monitoring events; different growth milestones
- Giant breeds: Longest growth window; different food transition timing

**Special condition events (added based on Q&A):**
- `is_singleton = true` → Add singleton syndrome protocol events (weeks 3–8)
- `first_litter = true` → Add "first-time mom check-in" events in Stage 1 labor
- `dam_age_category = 'over_6'` → Add extra vet monitoring events
- `vet_confirmed = false` → Event #1 = "Book vet appointment NOW"
- `puppy_count >= 8` → Add "large litter fatigue" monitoring events for dam

---

## 7. CALENDAR PAGE SPEC

### Month View
- Matches Google Calendar visual style (dots under dates with events)
- Color dots = category colors (up to 3 dots per day; overflow shows "+N")
- Tap a day → bottom sheet slides up with that day's events
- Today is always highlighted
- Past days with incomplete critical events: red dot indicator

### Event Cards (in day bottom sheet)
- Category color left border
- Priority badge (🔴 CRITICAL / 🟠 HIGH / 🟢 Recommended)
- Title + short description (2 lines max)
- "Mark Done" checkbox
- Tap → full event detail screen

### Event Detail Screen
- Full instructions in plain language (no jargon)
- "What to look for" section
- "When to call the vet" section (where applicable)
- Link to related library article
- Mark done / Set reminder / Share buttons

### Calendar Widget (native)
- Small (2x2): Today's most critical task + puppy age/days until birth
- Medium (2x4): 7-day strip with event dots
- Large (4x4): Full month mini-calendar with event indicators
- Widget updates every 15 minutes via background fetch

---

## 8. DASHBOARD / TODAY VIEW

### Layout (top to bottom)
1. **Greeting banner**: "Good morning! Rosie is Day 4 🐾" (or "Due in 18 days")
2. **Countdown card**: Big animated number — days until birth OR puppy age in days/weeks
3. **Today's Tasks**: Card list of today's events, sorted by priority (CRITICAL first)
4. **Quick Actions**: [Log Weight] [Mark All Done] [Emergency Guide]
5. **Upcoming**: Next 3 events beyond today
6. **Tip of the Day**: One actionable tip from the knowledge base, rotated daily

### Urgency Logic
- If any CRITICAL event today is not marked done by 6pm → send push notification
- If a CRITICAL event is 3+ days overdue → red banner at top of dashboard

---

## 9. INFO LIBRARY SPEC

### Structure
Six sections (matching knowledge base):
1. 🤰 Pregnancy & Whelping
2. 👶 Newborn Care (Days 0–14)
3. 🏥 Health & Vet Schedule
4. 🍼 Nutrition & Feeding
5. 🎓 Socialization & Training
6. 🚨 Emergency Guide ← ALWAYS FREE, always accessible

### Article Format
- Reading time badge ("~4 min read")
- Plain language — 8th grade reading level maximum
- Callout boxes for CRITICAL warnings (red) and tips (green)
- Tables for schedules and dosing
- "Related events in your calendar" smart link at the bottom
- Bookmarking

### Gating
- Free tier: Article previews (first 40%) + Emergency Guide (100%)
- Pro tier: Full access to all articles

---

## 10. PUPPY TRACKER (LITTER PRO FEATURE)

### Puppy Profiles
- Each puppy gets: name (optional), ID color (matches physical yarn collar system from knowledge base), birth weight, sex
- Cute avatar using the ID color

### Weight Logging
- Log weight for each puppy individually
- Chart shows individual puppy trend AND litter average
- Smart alerts:
  - "Rosie (Red) hasn't gained weight in 24 hours ⚠️"
  - "Pip (Blue) is 30% below litter average — check runt protocol"
  - "All puppies have doubled birth weight! 🎉"

### Feeding Log
- Optional: log each nursing/bottle feeding session per puppy
- Useful for singleton or bottle-fed litters

---

## 11. PAYWALL & MONETIZATION IMPLEMENTATION

### Free Tier Limits
- First 7 days of calendar events visible
- Library articles: previews only (except Emergency Guide)
- No weight tracker
- No widget
- No calendar export

### Paywall Trigger Points (natural, non-intrusive)
- After "Generating your calendar..." when user tries to scroll past Day 7
- When user taps a locked library article
- When user tries to add a puppy to the tracker
- Never interrupt mid-onboarding or mid-task

### Paywall Screen Copy
```
Headline: "Your puppies need you on Day 8 too."
Subhead:  "Unlock the complete care calendar — every deworming, 
           every feeding window, every socialization milestone, 
           from now until they go to their new homes."

Features:
✓ Full calendar: pregnancy through 8 weeks
✓ Push notification reminders
✓ Home screen widget
✓ Complete info library
✓ Export to Google Calendar / Apple Calendar

Price options:
○ PuppyCare Pro — S$12.99 one-time
○ Litter Pro (with weight tracker) — S$18.99 one-time
```

### RevenueCat Products
```
product_id: puppycare_pro_lifetime
product_id: litter_pro_lifetime
product_id: puppycare_pro_annual    (S$5.99/year — fallback for price-sensitive)
```

---

## 12. PUSH NOTIFICATION SYSTEM

### Notification Categories
- `CRITICAL_CARE` — never suppress; health-critical events (deworming, temp checks)
- `DAILY_REMINDER` — morning summary of today's tasks
- `MILESTONE` — puppy developmental milestone reached
- `WEIGHT_ALERT` — weight gain concern detected
- `VET_REMINDER` — upcoming vet appointment

### Scheduling Logic
- All events generated by schedule engine → schedule local notifications at `event.date - notif_lead_time`
- CRITICAL events: always notify at the event time AND 1 day before
- If app opened: refresh all pending notifications (Expo local notifications max 64 scheduled at a time — use rolling schedule, refresh on app open)
- Notification tap → deep link to `event/[id]` screen

### Notification Copy Style
- Warm, never alarming (except true emergencies)
- Example: "🐾 Time to weigh the puppies! Day 7 weight check helps catch any pups who need extra care."
- Emergency: "⚠️ Deworming due today — this is important for your puppies' health. Tap to see how."

---

## 13. DATA MODELS (Supabase Schema)

```sql
-- Users
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  subscription_tier text default 'free', -- 'free' | 'pro' | 'litter_pro'
  created_at timestamptz default now()
);

-- Dog profiles
create table dogs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  name text,
  breed_id text,
  breed_name text,
  size_category text,
  dam_weight_kg decimal,
  dam_age_category text,
  first_litter boolean,
  mating_date date,
  estimated_due_date date,
  birth_date date,
  vet_confirmed boolean default false,
  created_at timestamptz default now()
);

-- Puppies (individual tracking)
create table puppies (
  id uuid primary key default gen_random_uuid(),
  dog_id uuid references dogs(id),
  name text,
  color_id text,  -- 'red','blue','green','yellow','orange','purple','white','pink'
  sex text,
  birth_weight_g decimal,
  is_singleton boolean default false,
  created_at timestamptz default now()
);

-- Weight logs
create table weight_logs (
  id uuid primary key default gen_random_uuid(),
  puppy_id uuid references puppies(id),
  weight_g decimal not null,
  logged_at timestamptz default now(),
  notes text
);

-- Calendar events (generated + stored per dog)
create table calendar_events (
  id uuid primary key default gen_random_uuid(),
  dog_id uuid references dogs(id),
  title text,
  scheduled_date date,
  category text,
  priority text,
  description text,
  detail_markdown text,
  is_free_tier boolean default false,
  is_repeating boolean default false,
  repeat_interval_hours integer,
  completed boolean default false,
  completed_at timestamptz,
  snoozed_until timestamptz,
  tags text[],
  emergency_contact_recommended boolean default false
);
```

---

## 14. BUILD ORDER FOR CLAUDE CODE

Build in this exact order. Each phase should be fully working before moving to the next.

### Phase 1 — Foundation (Do first)
1. Expo project setup with TypeScript, Expo Router, Supabase
2. Design system: colors, typography, spacing constants
3. Base UI components: Button, Card, Badge, ProgressBar
4. Zustand stores: useUserStore, usePuppyStore
5. Supabase auth (magic link email)

### Phase 2 — Onboarding
6. Onboarding shell layout with animated progress bar
7. All 12 question screens (Q1–Q12)
8. Breed database (at minimum: 20 common breeds including JRT and similar)
9. Answer collection → stored in Zustand
10. "Generating your calendar..." animated screen

### Phase 3 — Schedule Engine (Critical)
11. Schedule engine core: `generateSchedule(input: ScheduleInput): CalendarEvent[]`
12. All pregnancy events (if mating date known)
13. All neonatal events (Days 0–14) — sourced from knowledge base
14. All transitional + socialization events (Weeks 2–8)
15. Health events: deworming, vaccines, vet visits
16. Breed-specific and condition-specific modifiers
17. Save generated events to Supabase

### Phase 4 — Calendar
18. Calendar page: react-native-calendars month view with category dots
19. Day bottom sheet with event list
20. Event detail screen with full instructions
21. Mark done / snooze functionality
22. Free tier gating (show only Day 0–7 events without Pro)

### Phase 5 — Dashboard
23. Today view layout
24. Countdown/age card with animation
25. Today's tasks list
26. Quick actions
27. Upcoming events strip

### Phase 6 — Library
28. Library home with 6 sections
29. Article pages with markdown rendering
30. Emergency guide (always free)
31. Free tier preview gating

### Phase 7 — Monetization
32. RevenueCat setup
33. Paywall screen
34. Feature gating throughout the app
35. Restore purchases flow

### Phase 8 — Notifications
36. Expo Notifications setup
37. Permission request flow
38. Schedule notifications for all generated events
39. Deep link handling from notification tap

### Phase 9 — Puppy Tracker (Litter Pro)
40. Puppy profile creation
41. Weight logging UI
42. Victory Native weight charts
43. Weight alerts logic
44. Litter Pro paywall gate

### Phase 10 — Widget + Polish
45. Home screen widget (small, medium, large)
46. Calendar export (Google Calendar / Apple Calendar)
47. Settings screen
48. Onboarding re-run (for new litter)
49. App icon + splash screen
50. Performance audit + Reanimated animations

---

## 15. CONTENT RULES FOR CLAUDE CODE

When writing event descriptions and library content, follow these rules:

1. **Zero jargon.** A person who has never owned a dog must understand every word.
   - ❌ "Apply pyrantel pamoate at 5mg/kg PO"
   - ✅ "Give puppy deworming medicine today. Ask your vet for Drontal or Panacur puppy drops. Dose by weight — the packaging will tell you exactly how much."

2. **Always say WHY.** Never just say what to do. Tell them why it matters.
   - ❌ "Weigh all puppies today."
   - ✅ "Weigh all puppies today — this is the earliest warning system. A puppy that stops gaining weight needs help within hours, not days."

3. **Warmth, not alarm.** Keep the tone supportive. Only use urgent language for genuine emergencies.

4. **When to call the vet** must appear in every health event. Even if the answer is "this is routine — no vet needed today."

5. **Numbers are specific.** Never say "a few hours" — say "within 2 hours." Never say "warm" — say "85–90°F (29–32°C)."

6. **Emergency events** get a red callout box. Copy format:
   ```
   🚨 CALL YOUR VET if: [specific trigger conditions with numbers]
   ```

---

## 16. BREED DATABASE MINIMUM SPEC

Each breed record must include:
```typescript
interface Breed {
  id: string;
  name: string;
  aliases: string[];            // e.g. JRT → ["Jack Russell", "JRT", "Parson Russell"]
  size_category: 'toy' | 'small' | 'medium' | 'large' | 'giant';
  avg_weight_kg: { min: number; max: number };
  avg_litter_size: { min: number; max: number; typical: number };
  gestation_range_days: { min: number; max: number; typical: number };
  genetic_health_risks: string[];   // For calendar event generation
  temperament_notes: string;        // For training events
  hypoglycemia_risk: 'low' | 'medium' | 'high';  // High for toy/small
  singleton_risk: boolean;          // Flag for breeds prone to small litters
  special_care_flags: string[];     // e.g. ['flat-faced', 'double-coat', 'high-prey-drive']
  thumbnail_emoji: string;          // Fallback if no photo available
}
```

Minimum 20 breeds to launch:
Jack Russell Terrier, Golden Retriever, Labrador Retriever, German Shepherd, French Bulldog, Bulldog, Poodle (Standard), Poodle (Miniature), Shih Tzu, Maltese, Chihuahua, Beagle, Corgi (Pembroke), Dachshund, Siberian Husky, Border Collie, Rottweiler, Great Dane, Boxer, Mixed Breed.

---

## 17. TESTING SCENARIOS

Before marking any phase complete, test these scenarios:

**Scenario A — JRT, knows mating date, puppies not yet born:**
- Input: JRT, mating date = 3 weeks ago, first litter, dam weight 6kg, age 3 years
- Expected: Pregnancy events shown, due date calculated, prenatal care events visible, postnatal events show as "upcoming"

**Scenario B — JRT, puppies already born, Day 0:**
- Input: JRT, puppies born today, 6 puppies, all nursing
- Expected: Full postnatal calendar from Day 0; Day 0 events = colostrum check, weigh all puppies, temperature check, umbilical cord care, ENS start reminder (for Day 3)

**Scenario C — Singleton puppy:**
- Input: Any breed, 1 puppy born
- Expected: Singleton syndrome events appear in calendar from Week 3; foster littermate reminder; deliberate rough play instructions

**Scenario D — Unknown mating date:**
- Input: "Approximately 5 weeks pregnant"
- Expected: Estimated due date calculated with ±7 day confidence range; calendar shows range

**Scenario E — Free tier user:**
- Input: Any scenario
- Expected: Only Day 0–7 events visible; Day 8+ events shown as blurred/locked cards; paywall triggered on first tap of locked event

---

## 18. KNOWN CONTENT SOURCES

All calendar event content is sourced from these documents. Do not invent care information:

1. **Main Knowledge Base:** `JRT_Puppy_Care_Knowledge_Base.md` — pregnancy through 6 months, all categories
2. **Supplement A:** `JRT_Newborn_Supplement_A.docx` — 10 critical newborn topics (CHV-1, aspiration pneumonia, tube feeding, hypoglycaemia, NI blood incompatibility, cleft palate, singleton syndrome, runt protocol, ID system, stool guide)
3. **Birthing Guide:** `src/data/infobase/birthing-guide.ts` — complete whelping reference. Sources: Cornell University CVM, Merck Veterinary Manual, VCA Animal Hospitals, RECOVER 2025 neonatal resuscitation guidelines, UC Davis, DVM360, PetMD, PDSA, Royal Kennel Club.

**Birthing Guide usage rules:**
- Applies to ALL breeds — do not vary content by breed (except where breed-specific flags exist in conditions.ts)
- `WHELPING_CALENDAR_EVENTS` → pre-birth calendar events (Days -14 to 0), shown when status = 'pregnant'
- `BIRTH_GUIDE_LIBRARY_SECTIONS` → "Birth Guide" tab in the Info Library
- `EMERGENCY_SCENARIOS` + `VET_DECISION_TREE` → Emergency Guide (always free, always accessible, no paywall)
- `THREE_NUMBERS_TO_MEMORISE` → display prominently in Birth Guide header AND Emergency Guide header
- The swing method for clearing airways is **permanently retired** per RECOVER 2025 — never reference it positively anywhere in the app

When generating event detail copy, pull directly from these sources. Translate clinical language to plain English per Section 15 content rules.

---

## 19. LOCALIZATION NOTES (Singapore Launch)

- Default weight unit: **kg**
- Default temperature unit: **°C**
- Currency: **SGD** (S$12.99 for Pro, S$18.99 for Litter Pro)
- Date format: **DD MMM YYYY** (e.g., "14 Jun 2025")
- Emergency vet resources: Include Singapore 24-hr vet contacts in Emergency Guide
  - Animal Recovery Centre: +65 6268 0338
  - Mount Pleasant Animal Medical Centre (24hr): +65 6250 8333
  - The Animal Clinic (emergency): +65 6314 2338
- App Store region: Start with Singapore, available globally

---

## 20. APP STORE METADATA

**App Name:** PuppyCare Compass
**Subtitle:** Puppy care, day by day
**Category:** Lifestyle / Pets

**Short Description (30 chars):** Puppy care, day by day

**Full Description:**
```
Your dog is pregnant — and you have no idea what to do next.
We've been there. PuppyCare Compass turns anxiety into a plan.

Answer 12 quick questions and we'll build a complete, personalised 
care calendar for your dog — from today through 8 weeks after birth.

Every deworming date. Every feeding window. Every socialisation 
milestone. Every vet visit. On your phone. With reminders.

━━━━━━━━━━━━━━━━━━━━━━
WHAT YOU GET
━━━━━━━━━━━━━━━━━━━━━━
📅 A fully personalised care calendar
🔔 Push reminders before every important event
📱 Home screen widget — see the week at a glance
📚 Complete care library, plain-language guides
🚨 Emergency guide — always free, always accessible
⚖️ Individual puppy weight tracker with trend charts

━━━━━━━━━━━━━━━━━━━━━━
BUILT ON EXPERT KNOWLEDGE
━━━━━━━━━━━━━━━━━━━━━━
Our care schedules are built from veterinary-reviewed sources 
including Cornell University College of Veterinary Medicine, 
VCA Animal Hospitals, the American Kennel Club, Merck 
Veterinary Manual, Royal Canin Academy, and Purina Institute.

Not a replacement for your vet. A tool to make sure you 
never miss what your vet told you to do.

Supports 20+ breeds including Jack Russell Terriers, 
Golden Retrievers, Labradors, French Bulldogs, Poodles, 
and more.
```

---

*End of CLAUDE.md — PuppyCare Compass v1.0*
*Freddy Lim | fred@collecter.club | claudecode.sg*
*Last updated: April 2026*

## Design direction

For any visual or styling work, read `handoff/DESIGN_FIELD_JOURNAL.md` and follow its hard constraints (styling-only; do not change routes, settings, data, flows, functional copy, analytics, or accessibility semantics). Machine-readable tokens live at `handoff/tokens.json`.
