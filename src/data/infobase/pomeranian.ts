/**
 * INFO BASE: POMERANIAN
 * Applies to: Pomeranian
 * Info base ID: 'pomeranian'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'pomeranian'.
 *
 * Sources: American Pomeranian Club, Merck Vet Manual,
 * Cornell CVM, VCA Animal Hospitals, AKC,
 * Canine Journal (Pomeranian health), PDSA.
 *
 * ⚠️ CRITICAL FLAGS:
 * - HIGH hypoglycemia risk — 90-minute feeds in Week 1
 * - PDA (patent ductus arteriosus) — auscultate every puppy
 * - Alopecia X — coat/skin condition in adults
 * - NEVER use neck collar — tracheal collapse risk
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const POMERANIAN_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 1, max: 4, typical: 3 },
  newborn_weight_grams: { min: 80, max: 160, typical: 120 },
  adult_weight_kg: {
    male:   { min: 1.9, max: 3.5 },
    female: { min: 1.9, max: 3.5 },
  },
  size_category: 'toy' as const,
  hypoglycemia_risk: 'high' as const,
  singleton_risk: true,
  csection_rate_percent: 18,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 80,  max: 160,  typical: 120  },
    day_7:  { min: 160, max: 280,  typical: 220  },
    day_14: { min: 240, max: 380,  typical: 310  },
    week_3: { min: 340, max: 540,  typical: 440  },
    week_4: { min: 480, max: 760,  typical: 620  },
    week_6: { min: 800, max: 1250, typical: 1025 },
    week_8: { min: 1050, max: 1700, typical: 1375 },
  },

  daily_gain_minimum_grams: 5,
  daily_gain_target_grams: 10,
  daily_gain_percent_bodyweight: 10,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 1.0, max: 2.5, per_100g_body_weight: 1.5 },
    week_2: { min: 2.0, max: 3.5, per_100g_body_weight: 1.8 },
    week_3: { min: 3.0, max: 5.0, per_100g_body_weight: 2.0 },
    week_4: { min: 5.0, max: 8.0, per_100g_body_weight: 2.5 },
  },
  feeding_frequency_hours: {
    week_1: 1.5,    // 90 MINUTES
    week_2: 2,
    week_3: 2.5,
    week_4: 3,
  },

  tube_size_french: 3.5,
  max_stomach_capacity_ml_per_100g: 4,

  whelping_box_temp_celsius: {
    week_1:      { min: 30, max: 32, ideal: 32 },
    week_2:      { min: 28, max: 30, ideal: 29 },
    week_3:      { min: 26, max: 28, ideal: 27 },
    week_4_plus: { min: 23, max: 26, ideal: 24 },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 36.1, danger_below: 34.5 },
    day_5_14:    { min: 35.0, max: 37.0, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 60, d: 60 },
    large_litter: { w: 75, d: 75 },
    pig_rail_height_cm: 5,
    wall_height_cm: 25,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const POMERANIAN_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg — 1 cc syringe required for accuracy',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Pomeranian puppies. These tiny puppies require very small doses — measure with a 1 cc syringe, not a kitchen teaspoon.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second treatment. Weigh each puppy on the day of treatment.',
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
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. Feed the puppy within 1–2 hours BEFORE the vet visit. Keep warm throughout. Have Karo syrup on hand in case of stress hypoglycemia.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'Second vaccination. Discuss Lepto scheduling with vet — consider separate visit for tiny Pomeranians.',
      vet_required: true,
      critical: true,
    },
    {
      week: 14,
      label: 'Third vaccination',
      vaccine: 'DHPP #3 + Rabies',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'],
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
      label: 'Post-whelping dam check',
      urgency: 'within_24_hours',
      plain_english: 'Vet check within 24 hours. Confirm all foetuses delivered.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Verify weight gain.',
      critical: true,
    },
    {
      week: 6,
      label: '⚠️ Puppy wellness + PDA cardiac check',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. CRITICAL: specifically request cardiac auscultation for PDA murmur. A "machinery" murmur (continuous murmur heard under the left armpit) at the first puppy visit is a PDA until proven otherwise. Early surgical ligation (12–16 weeks) has excellent outcomes.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. Harness only instructions to new owners. Hypoglycemia protocol in writing. Alopecia X awareness. Tracheal collapse prevention.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'PDA — Patent Ductus Arteriosus (cardiac)',
      timing: 'First puppy vet visit at 6–8 weeks — listen for continuous murmur',
      method: 'Cardiac auscultation — "machinery murmur" heard continuously. Echocardiogram confirms.',
      plain_english: 'PDA is a significant congenital cardiac defect in Pomeranians. A continuous "machinery" murmur under the left shoulder blade is characteristic. Early surgical ligation at 12–16 weeks has excellent outcomes. Left untreated, PDA causes progressive heart failure.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Alopecia X monitoring',
      timing: 'Watch from 4 months to 3 years',
      method: 'Clinical diagnosis after ruling out hypothyroidism and Cushing\'s disease',
      plain_english: 'Alopecia X (Black Skin Disease) causes progressive hair loss starting on the back and sides. The skin darkens. Not painful or dangerous — cosmetic. Management: melatonin 3–6 mg q12h, deslorelin implant, or trilostane. Inform new owners so they recognise it and are not alarmed.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const POMERANIAN_PREGNANCY_EVENTS = [
  {
    id_suffix: 'pom_preg_singleton_plan',
    day_offset: -14,
    title: 'Singleton risk: Discuss C-section planning with vet',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Pomeranians frequently have small litters of 1–2. Singleton Pom pregnancies commonly require C-section.',
    detail: 'Singleton Pomeranian puppies grow large relative to the dam\'s small pelvis — making natural birth risky.\n\nIf X-ray shows 1–2 puppies:\n1. Discuss with your vet now: elective C-section vs close monitoring during natural labour\n2. Have the emergency vet number confirmed and tested\n3. Know the dystocia triggers (see Emergency Guide)\n\nPomeranian C-section rate is approximately 18% overall — higher for singletons.',
    call_vet_if: 'No puppy after 2 hours of strong contractions',
    emergency_contact_recommended: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const POMERANIAN_NEONATAL_EVENTS = [
  {
    id_suffix: 'pom_neo_hypoglycemia_90min',
    day_offset: 0,
    title: '⚠️ Week 1: Feed every 90 MINUTES',
    category: 'nutrition' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Pomeranian neonates need the same 90-minute feeding schedule as all toy breeds.',
    detail: 'Week 1 feeding protocol for Pomeranian neonates:\n- Every 90 MINUTES, around the clock\n- Volume: 1.5 ml per 100g body weight per feed\n- Formula warmed to 38°C / 100°F\n- NEVER feed a cold puppy — warm first\n\nSigns of hypoglycemia: lethargy, trembling, pale gums, seizure.\nAction: warm first, Karo on gums, emergency vet within 30 minutes.\n\nFrom Week 2: every 2 hours\nFrom Week 3: every 2.5 hours',
    call_vet_if: 'Any hypoglycemia symptoms — emergency within 30 minutes',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'pom_neo_coat_care_start',
    day_offset: 21,
    title: 'Week 3: Begin coat desensitization',
    category: 'socialization' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Pomeranians have a double coat requiring intensive grooming. Desensitize to handling from Week 3.',
    detail: 'The Pomeranian double coat requires:\n- Daily brushing (especially during shedding)\n- Baths every 3–4 weeks\n- Professional grooming every 6–8 weeks\n- Careful drying after baths (Poms can overheat under a dryer)\n\nFrom Week 3:\n- Soft brush strokes daily, 2 minutes per puppy\n- Face and ear handling\n- Paw and nail handling\n- Hair dryer at low heat at a distance (to desensitize the sound)\n\nA Pomeranian that was never accustomed to grooming fights every session as an adult — causing stress to both dog and groomer.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const POMERANIAN_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'pom_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Confident, not yappy',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Pomeranians can become excessive barkers without good socialization. Address now.',
    detail: 'Pomeranians are alert, vocal dogs. Without socialization, this becomes reactive, anxious barking at everything.\n\nFrom Week 3:\n- Diverse handling by 8–10 different people\n- Varied sounds at moderate volume\n- Multiple environments from Week 4\n\nSpecifically: desensitize to doorbell sounds. A Pom that barks at every doorbell is the most common complaint from new owners. Play a doorbell recording at low volume, reward calm behaviour. Gradually increase volume over weeks.',
  },
  {
    id_suffix: 'pom_social_week4_big_dogs',
    day_offset: 28,
    title: 'Socialization Week 4: Safe large dog exposure',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Pomeranians are at physical risk from large dogs. Positive exposure reduces panicked responses.',
    detail: 'A Pomeranian that panics when encountering a large dog may run erratically — triggering a prey response from the large dog. Controlled positive early exposure reduces this risk.\n\nProtocol — same as Chihuahua:\n- Known calm large dog at distance\n- Reward calm observation\n- Gradually decrease distance\n- Never allow overwhelming close contact in early weeks\n\nInform new owners: Pomeranians must always be on a lead in areas with unleashed large dogs — physical size means an accidental collision or predatory response can be fatal.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const POMERANIAN_TRAINING_EVENTS = [
  {
    id_suffix: 'pom_training_harness_only',
    day_offset: 35,
    title: 'HARNESS ONLY — Pomeranian tracheal collapse risk',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Neck collars worsen tracheal collapse in Pomeranians. Harness only, from Week 5.',
    detail: 'Pomeranians are highly prone to tracheal collapse — the cartilage rings of the trachea weaken and the airway collapses during breathing or excitement.\n\nNever use a neck collar for walking. Introduce a soft harness from Week 5:\n1. Place harness on puppy for 10 minutes while feeding a treat\n2. Build to 30 minutes\n3. Short lead attached from Week 6\n\nInform new owners: harness only, for life. Signs of tracheal collapse: honking cough when excited or pulling. Management: weight control, avoid dust/smoke, harness only, anti-tussive medication if needed.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const POMERANIAN_HEALTH_RISKS = [
  {
    condition: 'Hypoglycemia',
    timing: 'Birth through 12 weeks highest risk',
    risk_level: 'critical' as const,
    signs: ['Lethargy', 'Trembling', 'Pale gums', 'Seizure', 'Unresponsive'],
    immediate_action: 'Warm first. Karo on gums. Emergency vet within 30 minutes.',
    vet_decision: 'Emergency vet every time.',
  },
  {
    condition: 'PDA (Patent Ductus Arteriosus)',
    timing: 'Congenital — detected at 6–8 week puppy visit',
    risk_level: 'high' as const,
    signs: ['Continuous "machinery" murmur at first vet visit', 'Exercise intolerance as puppy grows', 'Coughing', 'Failure to thrive'],
    immediate_action: 'Cardiologist referral for echocardiogram. Surgical ligation at 12–16 weeks has excellent outcomes.',
    vet_decision: 'Call vet to arrange cardiac referral if murmur detected.',
    note: 'Early surgical treatment is curative. Untreated PDA causes progressive heart failure.',
  },
  {
    condition: 'Alopecia X (Black Skin Disease)',
    timing: '4 months to 3 years typically',
    risk_level: 'high' as const,
    signs: ['Progressive hair loss on back and sides', 'Skin darkening', 'Coat becomes thin then absent'],
    immediate_action: 'Book vet to rule out hypothyroidism and Cushing\'s before diagnosing Alopecia X.',
    vet_decision: 'Call vet within 2 weeks of noticing coat changes.',
    note: 'Cosmetic condition — not painful. Manageable. Inform new owners so they recognise it.',
  },
  {
    condition: 'Tracheal Collapse',
    timing: 'Can develop from 6 months; progressive',
    risk_level: 'high' as const,
    signs: ['Honking cough', 'Coughing when excited', 'Gagging'],
    immediate_action: 'Harness only immediately. Weight management. Vet appointment for diagnosis.',
    vet_decision: 'Call vet for persistent coughing.',
    note: 'Prevention: harness only from Day 1. Never pull on a neck collar.',
  },
];
