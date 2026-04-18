/**
 * INFO BASE: AMERICAN AKITA
 * Applies to: American Akita (AKC "Akita", distinct from Japanese Akita Inu)
 * Info base ID: 'american_akita'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'american_akita'.
 * This file is SEPARATE from japanese_akita.ts.
 * Key differences from Japanese Akita: heavier build (45–59 kg vs 32–45 kg),
 * higher GDV risk (deeper chest), slightly different health priorities,
 * AKC registry (not FCI #255), no AI/FEH KC scheme.
 *
 * Sources: Akita Club of America (ACA), AKC Standard,
 * Glickman et al. 2000 PubMed 10638316 (Akita GDV 25/1000 dog-years, 4th highest),
 * Tufts GDV GWAS PMC7694454 (Akita 9.2% breed prevalence),
 * Angles et al. 2005 PubMed 16305682 (VKH DLA risk marker OR ~15.3),
 * Reichler et al. 2001 PubMed 11906649 (SA 24% in Akitas),
 * Merck Vet Manual, Cornell CVM, VCA Animal Hospitals, AKC.
 *
 * ⚠️ CRITICAL FLAGS:
 * - VKH (Uveodermatologic Syndrome): same as Japanese Akita — ~80% of all canine UDS
 * - GDV: HIGH risk — 9.2% breed prevalence (Tufts GWAS); prophylactic gastropexy
 *   recommended by ACA at spay/neuter
 * - SA (Sebaceous Adenitis): 24% in histologic study — ACA requires OFA skin biopsy
 * - Pemphigus foliaceus: elevated, most common canine autoimmune dermatosis in breed
 * - High-K+ erythrocytes: serum potassium falsely elevated — warn every vet
 * - Microcytosis: normal breed variant — do not treat for iron deficiency
 * - Dense double coat: whelping area cooler than standard
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const AMERICAN_AKITA_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 3, max: 11, typical: 7 },
  newborn_weight_grams: { min: 400, max: 650, typical: 520 },  // heavier than JA
  adult_weight_kg: {
    male:   { min: 45, max: 59 },   // AKC Standard: 100–130 lb
    female: { min: 32, max: 45 },   // AKC Standard: 70–100 lb
  },
  size_category: 'large' as const,
  hypoglycemia_risk: 'low' as const,
  singleton_risk: false,
  csection_rate_percent: 10,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 400, max: 650,  typical: 520  },
    day_7:  { min: 740, max: 1170, typical: 960  },
    day_14: { min: 1060, max: 1680, typical: 1375 },
    week_3: { min: 1510, max: 2410, typical: 1960 },
    week_4: { min: 2150, max: 3420, typical: 2785 },
    week_6: { min: 3600, max: 5700, typical: 4650 },
    week_8: { min: 4850, max: 7700, typical: 6275 },
  },

  daily_gain_minimum_grams: 35,
  daily_gain_target_grams: 65,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.5, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 9,  max: 14, per_100g_body_weight: 1.8 },
    week_2: { min: 14, max: 21, per_100g_body_weight: 2.0 },
    week_3: { min: 21, max: 30, per_100g_body_weight: 2.5 },
    week_4: { min: 30, max: 44, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 10,
  max_stomach_capacity_ml_per_100g: 4,

  // ⚠️ DOUBLE-COATED BREED: Cooler than standard; dam cooling area mandatory
  whelping_box_temp_celsius: {
    week_1:      { min: 28, max: 31,   ideal: 29.5 },
    week_2:      { min: 25.5, max: 28, ideal: 27   },
    week_3:      { min: 23,   max: 26, ideal: 24.5 },
    week_4_plus: { min: 20,   max: 23, ideal: 21.5 },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 37.2, danger_below: 35.0 },
    day_5_14:    { min: 35.0, max: 37.2, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 130, d: 130 },
    large_litter:  { w: 160, d: 160 },
    pig_rail_height_cm: 12,
    wall_height_cm: 55,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const AMERICAN_AKITA_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all American Akita puppies. With litters of 5–10, weights vary significantly by day 14. Weigh each puppy individually before dosing.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second treatment. Use current weight on the day of treatment.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment — Panacur for 3 days.',
      vet_required: false,
      critical: true,
    },
    {
      day: 56,
      label: 'Fourth deworming (pre-rehoming)',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Final deworming. Panacur for 3 days.',
      vet_required: false,
      critical: true,
    },
  ],

  dam_deworming: {
    start_day_of_pregnancy: 40,
    end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)',
    dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth. American Akita dams weigh 32–45 kg — confirm current weight before calculating dose.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. American Akitas have elevated immune-mediated condition rates due to reduced DLA class II diversity. Monitor for reactions post-vaccination and report any to vet. Keep the whelping area cool — double-coated breed.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2 + Leptospirosis #1',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'],
      plain_english: 'Second vaccination plus first Lepto dose.',
      vet_required: true,
      critical: true,
    },
    {
      week: 14,
      label: 'Third vaccination',
      vaccine: 'DHPP #3 + Leptospirosis #2 + Rabies',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis', 'Rabies'],
      plain_english: 'Third vaccination series plus Rabies.',
      vet_required: true,
      critical: true,
    },
    {
      week: 18,
      label: 'CRITICAL: Final parvo booster',
      vaccine: 'DHPP #4 (final)',
      covers: ['Distemper', 'Parvovirus'],
      plain_english: 'Do not skip.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check — double coat overheating',
      urgency: 'within_48_hours',
      plain_english: 'Vet check within 48 hours. American Akita dams with dense double coats are at significant overheating risk in warm whelping environments. Provide cool retreat area adjacent to whelping box. Confirm all placentas passed — with litters of 7, this count matters. Confirm milk supply for litter size.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm all puppies gaining at minimum 35g per day. Monitor dam body temperature — provide cooling access throughout lactation.',
      critical: true,
    },
    {
      week: 6,
      label: '⚠️ Puppy wellness + GDV briefing + VKH awareness',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. CRITICAL: every new American Akita owner must receive the GDV prevention protocol and VKH awareness information at this visit. Discuss prophylactic gastropexy at spay/neuter with all new owners. Also: ACA requires OFA skin biopsy for SA from age 2 — brief new owners.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. GDV prevention protocol in writing for every new owner. VKH awareness briefing. CRITICAL blood panel note: give every new owner written instructions — "Microcytosis is normal in Akitas. Elevated serum potassium is likely artifactual (HK erythrocytes). Please run PCV, reticulocytes, and repeat potassium on fresh sample before treating."',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months; PennHIP from 16 weeks',
      method: 'OFA radiograph or PennHIP',
      plain_english: 'Hip dysplasia rate above breed average. OFA or PennHIP certification required for ACA CHIC. Note: OFA data pools Japanese and American Akita — no separate breakdown available.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Eye certification — CAER annual',
      timing: 'Annual CAER from age 1',
      method: 'CAER ophthalmologist exam',
      plain_english: 'Annual CAER certification required for ACA CHIC. Covers VKH-related ocular changes, PRA, and other ocular conditions.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Thyroid screening',
      timing: 'Annual thyroid panel from age 2',
      method: 'OFA thyroid panel with TgAA',
      plain_english: 'ACA requires annual thyroid panel including anti-thyroglobulin antibody (TgAA) for CHIC. Autoimmune thyroiditis is elevated in Akitas.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Sebaceous Adenitis — OFA skin biopsy',
      timing: 'OFA skin biopsy from age 2',
      method: 'OFA registered skin punch biopsy',
      plain_english: 'ACA requires OFA SA skin biopsy for CHIC. SA affects 24% of Akitas in histologic study (Reichler 2001). Annual biopsy from age 2 for breeding stock.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Cardiac screening',
      timing: 'Cardiologist auscultation annually',
      method: 'Annual cardiologist auscultation',
      plain_english: 'ACA requires annual cardiac clearance for CHIC.',
      mandatory_for_breeding: true,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const AMERICAN_AKITA_PREGNANCY_EVENTS = [
  {
    id_suffix: 'aa_preg_gdv_critical',
    day_offset: -28,
    title: '⚠️ GDV prevention protocol: Starts today — American Akita 9.2% breed prevalence',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'American Akitas have 9.2% lifetime GDV prevalence (Tufts GWAS). Pregnancy increases risk further. ACA recommends prophylactic gastropexy.',
    detail: 'GDV (Gastric Dilatation-Volvulus) is a true life-threatening emergency. Tufts GWAS (PMC7694454) documented 9.2% GDV breed prevalence in Akitas — one of the highest.\n\nFROM TODAY — permanent protocol:\n1. Feed 3–4 small meals daily — never one large meal\n2. No exercise 1 hour before and 2 hours after eating\n3. No elevated food bowls — evidence shows they INCREASE GDV risk\n4. Slow feeder bowls if the dam eats quickly\n5. Keep feeding environment calm\n\nGDV EMERGENCY SIGNS (fatal 1–2 hours without surgery):\n🔴 Unproductive retching — attempting to vomit, nothing comes up\n🔴 Abdomen visibly distended and feels drum-hard\n🔴 Extreme restlessness — cannot settle or lie down comfortably\n🔴 Pale or white gums\n\nDrive to emergency vet immediately — do not call ahead.\n\nACA RECOMMENDATION: prophylactic gastropexy at spay/neuter. This procedure eliminates the fatal torsion component of GDV. Reduces GDV recurrence risk from ~75–80% to <5%. Discuss with your vet before the puppy goes home so new owners understand its value.',
    call_vet_if: 'Any GDV signs — EMERGENCY',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'aa_preg_large_litter_prep',
    day_offset: -21,
    title: 'Large litter preparation: American Akita average litter is 7',
    category: 'environment' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'With average litters of 7 puppies and a 45–59 kg dam, preparation must be proportionate.',
    detail: 'American Akita litters average 7 puppies (range 3–11). Prepare for 10:\n\n- Esbilac puppy milk replacer × 3 cans\n- French 10 feeding tube × 2 (large pups need larger tubes)\n- 10 cc, 20 cc, 35 cc syringes\n- Scale accurate to ±5g (capacity 0–8,000g for week 8)\n- ID system for 10 puppies\n- Warming box minimum 75 × 75 cm\n- LARGE whelping box 160 × 160 cm with 12 cm pig rails\n- Dam cooling mat/cool area adjacent to box\n\nWith a 50 kg dam and 7+ puppies: the dam needs very high caloric intake (3.5× maintenance at peak lactation). Monitor her body condition weekly — an underweight lactating American Akita is at risk for collapse.',
  },
  {
    id_suffix: 'aa_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Confirm count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. American Akita litters of 5–9 need accurate count.',
    detail: 'Pre-whelping X-ray at Day 55–58:\n\n- Confirm exact puppy count — tape to whelping box\n- Check foetal presentation — Akita puppies are large\n- Identify any single oversized puppy relative to the pelvis\n\nWith ~10% C-section rate: confirm vet emergency availability. If C-section required: ensure vet is aware of double-coat overheating risk during pre-surgical preparation and recovery.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const AMERICAN_AKITA_NEONATAL_EVENTS = [
  {
    id_suffix: 'aa_neo_temperature_double_coat',
    day_offset: 0,
    title: 'Days 0–28: Whelping box temperature LOWER than standard — double coat',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'American Akita puppies develop insulating double coats rapidly. Whelping box targets are 1–2°C cooler than standard breed guidance.',
    detail: 'Week 1 whelping box target: 28–31°C (vs standard 29.5–32°C).\n\nThe dam also needs monitoring:\n- Provide a cool retreat area (24–26°C) adjacent to the whelping box\n- Dam should be able to leave the whelping area to cool down between nursing sessions\n- Signs dam is overheating: prolonged heavy panting, dark red gums, moving away from puppies to cooler spots, weakness\n\nPuppy behaviour as temperature guide:\n- Spreading to edges = too hot (reduce temperature)\n- Piled in centre = too cold (increase temperature)\n\nAlways use rectal temperature as primary guide. Target 35–37°C for puppies in Week 1.',
    call_vet_if: 'Any puppy has rectal temperature below 35°C or above 39°C',
  },
  {
    id_suffix: 'aa_neo_blood_panel_warning',
    day_offset: 28,
    title: 'Week 4: Brief new owners on Akita blood panel peculiarities',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Microcytosis and high serum potassium are normal in American Akitas. Uninformed vets will misinterpret and may treat inappropriately.',
    detail: 'Every American Akita new owner needs this information and should hand it to every new vet they visit:\n\n"I have an American Akita. Two normal breed variants will appear on blood panels:\n\n1. MICROCYTOSIS: Small red blood cells (low MCV) is a NORMAL genetic variant in Akitas. Do not investigate or treat for iron deficiency or liver disease without ruling out breed variant first.\n\n2. HIGH SERUM POTASSIUM (hyperkalemia): Akitas have high-potassium erythrocytes (HK phenotype). When blood sits in the tube or haemolyses, potassium leaks from red cells and artificially elevates the serum result. A K+ of 6–8 mmol/L in a well-appearing Akita is almost certainly artifactual. Please repeat on fresh sample run immediately before treating for hyperkalemia."\n\nThis note has prevented unnecessary iron supplementation and cardiac medication in many Akitas. Provide it in writing with the puppy folder.',
  },
  {
    id_suffix: 'aa_neo_vkh_awareness',
    day_offset: 35,
    title: 'Week 5: VKH briefing — the most important Akita health disclosure',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Uveodermatologic Syndrome (VKH-like) is the most distinctive serious condition in American Akitas. Every new owner must receive this information.',
    detail: 'Uveodermatologic Syndrome (UDS/VKH-like) is an immune-mediated disease where the body attacks its own melanocytes (pigment-producing cells) in the eyes, skin, and nervous system.\n\nAmerican Akitas account for approximately 80% of all reported canine UDS cases. Prevalence up to 4.1% in the breed.\n\nTYPICAL ONSET: 1.5–4 years; can occur at any age.\n\nSIGNS TO WATCH FOR:\n\nEYE SIGNS (emergency — act within 24 hours):\n- Sudden redness and visible pain in one or both eyes\n- Squinting and sensitivity to bright light\n- Rapid loss of vision — the dog bumps into things, misses jumps\n- Eye may appear cloudy\n\nSKIN SIGNS (urgent but not emergency):\n- Whitening (depigmentation) beginning at the nose tip\n- Spreads to lips, around the eyes, footpads\n- The dog\'s face may look "frosted" or paler than before\n\nCRITICAL POINT: Uveitis (eye inflammation) can cause permanent blindness within DAYS without treatment. Any Akita with red eyes and squinting = ophthalmologist TODAY.\n\nTREATMENT: Lifelong immunosuppression. Prognosis for vision is good when treated within 24–48 hours of onset. Poor when delayed.',
    call_vet_if: 'Any eye redness, squinting, or vision changes — ophthalmologist urgently within 24 hours',
    emergency_contact_recommended: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const AMERICAN_AKITA_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'aa_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Large, dominant, protective — structured exposure is mandatory',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'An under-socialised American Akita at 50 kg is a public safety problem. The window is now.',
    detail: 'American Akitas at adult size (45–59 kg) are large enough to seriously injure a person or kill another dog. The socialization window is not optional — it is public safety.\n\nFrom Week 3:\n- 10+ different people handle each puppy per week\n- Include: children (mandatory — Akitas must accept children), men, unfamiliar adults\n- Handle firmly but gently — Akitas respect calm confidence\n- Touch every part of the body: paws, ears, mouth, tail\n- Novel environments from Week 4\n\nInform new owners: a well-socialised American Akita can be a loyal, confident, and manageable companion. An under-socialised one is a dangerous liability at this size.',
  },
  {
    id_suffix: 'aa_social_week4_dog_aggression',
    day_offset: 28,
    title: 'Socialization Week 4: Same-sex aggression — address now or manage forever',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'American Akitas have significant same-sex dog aggression. At 50 kg this is a serious management responsibility.',
    detail: 'American Akita same-sex aggression is one of the most serious management challenges in large-breed ownership.\n\nFrom Week 4:\n- Supervised meetings with 5+ calm dogs of various sizes and sexes weekly\n- One-on-one introductions only — no group settings until reliable\n- Male-to-male meetings supervised with ability to separate immediately\n\nInform new owners:\n- Two intact male Akitas in the same household almost never coexist long-term\n- Adult Akitas should NOT be in unsupervised dog parks\n- Dog introductions should always be on neutral territory, on-lead initially\n- An Akita dog fight at this size results in serious injury to all involved\n- This is lifelong management, not a training failure',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const AMERICAN_AKITA_TRAINING_EVENTS = [
  {
    id_suffix: 'aa_training_week5_mandatory',
    day_offset: 35,
    title: 'Formal training Week 5: Non-negotiable at this size and temperament',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'A 50 kg Akita without training is unmanageable. Training from Week 5 is a safety requirement, not optional.',
    detail: 'From Week 5:\n- Sit, down, wait, come — food-based positive reinforcement\n- "Place" or "settle" — a specific location where the dog goes on command (essential for visitor management)\n- Loose-leash walking — a pulling Akita cannot be safely walked by anyone\n- Recall — must be reliable before the puppy has any off-lead time\n\nLead training specifics: use a front-clip harness from the first walk. A pulling Akita on a neck collar is a safety and welfare problem. Begin indoor lead work immediately.\n\nInform new owners:\n- ACA and many trainers recommend not using harsh corrections with Akitas — they can escalate\n- Find a trainer experienced with large, independent, dominant breeds\n- Enrol in puppy class immediately\n- Obedience training is a lifelong practice for this breed, not a one-time exercise',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const AMERICAN_AKITA_HEALTH_RISKS = [
  {
    condition: 'GDV (Gastric Dilatation-Volvulus)',
    timing: 'Any age — highest risk after large single meals',
    risk_level: 'critical' as const,
    signs: [
      'Unproductive retching — trying to vomit with nothing coming up',
      'Abdomen visibly distended and drum-hard',
      'Extreme restlessness — cannot settle or lie down',
      'Pale or white gums',
      'Rapid deterioration over 30–60 minutes',
    ],
    immediate_action: 'EMERGENCY VET IMMEDIATELY. Do not call — drive. Fatal within 1–2 hours without surgery.',
    vet_decision: 'Emergency surgical facility immediately.',
    note: '9.2% breed prevalence (Tufts GWAS). Prophylactic gastropexy at spay/neuter recommended by ACA — eliminates torsion risk for life.',
  },
  {
    condition: 'VKH / Uveodermatologic Syndrome',
    timing: 'Typically 1.5–4 years; can occur at any age',
    risk_level: 'critical' as const,
    signs: [
      'Red, painful eye or eyes — sudden onset',
      'Squinting, sensitivity to light',
      'Rapid vision loss over days',
      'Progressive whitening of nose, lips, eyelids, footpads',
    ],
    immediate_action: 'Eye signs = ophthalmologist within 24 hours. Skin depigmentation alone = vet within a week.',
    vet_decision: 'Eye signs = urgent ophthalmologist. Skin alone = call vet within a week.',
    note: 'Akitas account for ~80% of all canine UDS cases. Treatment: lifelong immunosuppression. Vision prognosis depends entirely on speed of treatment.',
  },
  {
    condition: 'Sebaceous Adenitis',
    timing: 'Signs from 1–5 years; OFA biopsy from age 2',
    risk_level: 'high' as const,
    signs: [
      'Progressive hair loss on back and sides',
      'Silvery scaling at base of hair shafts',
      'Dull, brittle coat texture',
      'Musty skin odour',
      'Secondary bacterial infections',
    ],
    immediate_action: 'Book vet for skin punch biopsy to confirm. Not an emergency — chronic management required.',
    vet_decision: 'Call vet within a week of coat or skin changes.',
    note: 'SA affects 24% of Akitas (Reichler 2001). ACA CHIC requires OFA skin biopsy from age 2.',
  },
  {
    condition: 'Pemphigus Foliaceus',
    timing: 'Can occur any age; more common in middle-aged to older dogs',
    risk_level: 'high' as const,
    signs: [
      'Crusting, pustule-filled, or erosive lesions on face, ears, footpads',
      'Lesions on nose and planum nasale',
      'Possible fever and general malaise in severe cases',
      'Footpads may appear cracked and crusty',
    ],
    immediate_action: 'Book vet within a week. Skin biopsy required for diagnosis. Immunosuppressive treatment required.',
    vet_decision: 'Call vet within a week of facial or footpad skin lesions.',
    note: 'Akitas are among the most common breeds for pemphigus foliaceus — the most common canine autoimmune dermatosis.',
  },
];
