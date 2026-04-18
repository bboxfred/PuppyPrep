/**
 * INFO BASE: SHIH TZU
 * Applies to: Shih Tzu
 * Info base ID: 'shih_tzu'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'shih_tzu'.
 *
 * Sources: American Shih Tzu Club, Merck Vet Manual,
 * Cornell CVM, VCA Animal Hospitals, AKC,
 * Rajaei 2024 (Shih Tzu corneal ulcer prevalence).
 *
 * ⚠️ CRITICAL FLAGS:
 * - BOAS (brachycephalic) — moderate severity
 * - Elevated C-section rate
 * - Renal dysplasia — most common breed affected
 * - Corneal ulcers — can perforate in 24 hours
 * - Proptosis risk — eye pops out of socket from trauma
 * - IVDD risk
 * - Medium hypoglycemia risk
 * - HARNESS ONLY — never collar (BOAS + proptosis)
 */

export const SHIH_TZU_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 2, max: 6, typical: 4 },
  newborn_weight_grams: { min: 100, max: 220, typical: 160 },
  adult_weight_kg: {
    male:   { min: 4, max: 7 },
    female: { min: 4, max: 7 },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const,
  singleton_risk: false,
  csection_rate_percent: 22,
  brachycephalic: true,

  weight_targets: {
    birth:  { min: 100, max: 220,  typical: 160  },
    day_7:  { min: 190, max: 380,  typical: 285  },
    day_14: { min: 280, max: 530,  typical: 405  },
    week_3: { min: 400, max: 750,  typical: 575  },
    week_4: { min: 560, max: 1050, typical: 805  },
    week_6: { min: 940, max: 1750, typical: 1345 },
    week_8: { min: 1250, max: 2300, typical: 1775 },
  },

  daily_gain_minimum_grams: 8,
  daily_gain_target_grams: 15,
  daily_gain_percent_bodyweight: 8,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 2.0, max: 4.0, per_100g_body_weight: 1.5 },
    week_2: { min: 3.5, max: 6.0, per_100g_body_weight: 1.8 },
    week_3: { min: 5.0, max: 9.0, per_100g_body_weight: 2.0 },
    week_4: { min: 8.0, max: 14,  per_100g_body_weight: 2.5 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 5,
  max_stomach_capacity_ml_per_100g: 4,

  whelping_box_temp_celsius: {
    week_1:      { min: 29.5, max: 32, ideal: 31 },
    week_2:      { min: 27,   max: 30, ideal: 28 },
    week_3:      { min: 25,   max: 27, ideal: 26 },
    week_4_plus: { min: 22,   max: 25, ideal: 23 },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 36.1, danger_below: 34.5 },
    day_5_14:    { min: 35.0, max: 37.0, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 75, d: 75 },
    large_litter: { w: 90, d: 90 },
    pig_rail_height_cm: 7,
    wall_height_cm: 30,
  },
};

export const SHIH_TZU_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Shih Tzu puppies. Weigh each puppy before dosing.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second treatment. Use current weight.',
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
      plain_english: 'First vaccination at 6–8 weeks. Keep Shih Tzu puppies cool before and after — heat intolerance from brachycephalic airway. Never leave in a warm car.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2 + Leptospirosis #1',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'],
      plain_english: 'Second vaccination plus Lepto.',
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
      label: 'Final parvo booster',
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
      label: 'Post-whelping dam check — BOAS recovery',
      urgency: 'within_24_hours',
      plain_english: 'If C-section was performed, monitor dam closely for brachycephalic anaesthetic recovery — Shih Tzus have elevated airway complications under anaesthesia. Check within 24 hours.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Check each puppy\'s weight gain and confirm no breathing difficulty.',
      critical: true,
    },
    {
      week: 6,
      label: '⚠️ Puppy wellness + renal screening + eye check',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Request: urine specific gravity and protein check (renal dysplasia screening — Shih Tzu is #1 breed affected), eye exam for corneal health, BUN/creatinine/SDMA in bloodwork. Any puppy that appears stunted or is PU/PD (urinating and drinking excessively) is urgent — juvenile renal disease.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final check. HARNESS ONLY instructions in writing. Teach new owners: corneal ulcer signs (squinting, pawing at eye = emergency vet within hours), BOAS heat protocol, no neck collar ever.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'Renal dysplasia screening',
      timing: '6–8 weeks (urine + blood), then every 6 months until 2 years',
      method: 'Urinalysis (specific gravity, protein), BUN, creatinine, SDMA',
      plain_english: 'Renal dysplasia (abnormal kidney development) is more common in Shih Tzus than any other breed. Affected puppies show poor growth, excessive urination/thirst, and progressive kidney failure from 6 months to 3 years. Screen at 6 weeks. If SDMA is elevated: urgent nephrology referral.',
      mandatory_for_breeding: false,
    },
    {
      name: 'BOAS assessment',
      timing: '6 months minimum; breathing evaluation before any breeding',
      method: 'BOAS Functional Grading (Cambridge scheme) or equivalent respiratory assessment',
      plain_english: 'All Shih Tzus have some degree of BOAS. Grade before breeding. Grade 2–3 dogs should not be bred until surgical correction (stenotic nares, elongated soft palate surgery).',
      mandatory_for_breeding: true,
    },
  ],
};

export const SHIH_TZU_PREGNANCY_EVENTS = [
  {
    id_suffix: 'shihtzu_preg_csection_plan',
    day_offset: -21,
    title: '⚠️ C-section planning — Shih Tzu 22% rate',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Shih Tzu brachycephalic anatomy increases both whelping and anaesthetic risk. Plan now.',
    detail: 'Shih Tzus have a 22% C-section rate — higher than many non-brachycephalic breeds.\n\nCritical planning:\n1. Confirm your vet has brachycephalic anaesthesia experience — BOAS dogs are high anaesthetic risk\n2. Pre-oxygenation before induction is standard for brachycephalic breeds\n3. Confirm emergency surgical availability\n4. Keep the dam cool throughout labour — overheating a Shih Tzu in labour is dangerous\n\nFor the whelping environment:\n- Keep room below 22°C / 72°F\n- Fan available if needed\n- Monitor dam\'s breathing throughout — heavy panting beyond normal labour = cool immediately',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'shihtzu_preg_heat_protocol',
    day_offset: -28,
    title: 'Heat management protocol for Shih Tzu dams',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Shih Tzu dams are heat-intolerant. This worsens significantly with pregnancy.',
    detail: 'Exercise only in temperatures below 22°C / 72°F.\nNo exercise in humidity above 60%.\nShort gentle walks only from Week 6.\nAlways provide shade and water.\n\nDanger signs: purple/grey gums during panting = emergency cooling and emergency vet.',
  },
];

export const SHIH_TZU_NEONATAL_EVENTS = [
  {
    id_suffix: 'shihtzu_neo_cleft_palate',
    day_offset: 0,
    title: 'Day 0: Check every puppy for cleft palate — elevated in brachycephalics',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Cleft palate is elevated in brachycephalic breeds including Shih Tzu.',
    detail: 'Before placing any Shih Tzu puppy on the dam, check for cleft palate:\n\n1. Hold puppy with head tilted back under good lighting\n2. Open mouth and look at the roof of the mouth — should be a complete smooth arch\n3. Run a clean finger along the full length of the hard palate\n\nSigns of cleft palate:\n- Visible gap or split in the hard palate\n- Milk coming out of the nose during nursing\n- Gurgling sounds when feeding\n- Failure to nurse effectively\n\nA cleft palate puppy cannot nurse without aspiration. Tube feeding is required immediately. Surgical repair is possible at 3–5 months.',
    call_vet_if: 'Any puppy has a visible gap in the palate or milk appears from the nose',
  },
  {
    id_suffix: 'shihtzu_neo_eye_daily_check',
    day_offset: 14,
    title: 'Week 2: Begin daily eye checks — corneal ulcer risk starts as eyes open',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Shih Tzu corneal ulcers are the most common eye emergency in the breed. Daily eye checks from eye opening.',
    detail: 'As eyes open (Days 10–14), begin daily eye inspection for every Shih Tzu puppy:\n\nNormal:\n- Clear, moist eyes\n- No discharge or only a small amount of clear fluid\n- Puppy does not paw at eyes\n\n🔴 Abnormal — EMERGENCY VET WITHIN 2–4 HOURS:\n- Squinting or keeping one eye closed\n- Pawing at the eye\n- Watery or mucoid discharge from one eye\n- Cloudiness or blue tint on the cornea\n- Visible scratch or opaque spot on the eye surface\n\nCorneal ulcers in Shih Tzus can perforate (the eye ruptures) within 24 hours. This is not a "call the vet tomorrow" situation. Squinting eye = emergency vet today.',
    call_vet_if: 'ANY puppy squints or paws at an eye — emergency vet within 2–4 hours',
    emergency_contact_recommended: true,
  },
];

export const SHIH_TZU_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'shihtzu_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Heat-aware handling',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Socialise Shih Tzu puppies in cool environments. BOAS heat risk is present from birth.',
    detail: 'All Shih Tzu socialisation must occur in environments below 24°C / 75°F.\n\nFrom Week 3:\n- Daily handling by 8+ different people\n- Face and eye handling — essential for lifelong eye care\n- Coat handling — grooming desensitization from Day 1\n- Harness introduction from Week 5\n- Never allow overexcitement in warm conditions',
  },
  {
    id_suffix: 'shihtzu_social_week4_grooming',
    day_offset: 28,
    title: 'Socialization Week 4: Grooming is life — desensitize now',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Shih Tzus require daily grooming and monthly professional grooming. Begin desensitization immediately.',
    detail: 'Shih Tzu grooming needs:\n- Daily combing and brushing\n- Weekly bath\n- Professional grooming every 4–6 weeks\n- Daily face wiping and eye cleaning\n- Monthly nail trim\n- Ear cleaning weekly\n\nFrom Week 4:\n1. Daily soft brush, 3 minutes per puppy\n2. Face wipe twice daily\n3. Ear handling and gentle cleaning practice\n4. Hair dryer at low heat and distance\n5. Dental brushing introduction\n\nA Shih Tzu that fights grooming as an adult needs sedation for every appointment — a welfare and cost problem.',
  },
];

export const SHIH_TZU_TRAINING_EVENTS = [
  {
    id_suffix: 'shihtzu_training_harness_critical',
    day_offset: 35,
    title: 'HARNESS ONLY — BOAS and proptosis make this life-critical',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Neck collars can cause proptosis (eyeball displacement) and worsen BOAS in Shih Tzus.',
    detail: 'NEVER use a neck collar for a Shih Tzu. Two life-threatening reasons:\n\n1. BOAS: collar pressure on the trachea worsens an already compromised airway\n2. Proptosis: Shih Tzu eyes are already shallow in the socket. A sudden pull on a neck collar can cause the eyeball to pop forward out of the socket (proptosis) — a surgical emergency requiring immediate veterinary tarsorrhaphy\n\nIntroduce a soft H-shaped or Y-shaped harness from Week 5.\nInform every new owner IN WRITING: harness only, for life.',
  },
];

export const SHIH_TZU_HEALTH_RISKS = [
  {
    condition: 'Corneal Ulcer',
    timing: 'Any age — can occur suddenly from minor trauma',
    risk_level: 'critical' as const,
    signs: ['Squinting or holding one eye closed', 'Pawing at eye', 'Watery discharge', 'Cloudiness on eye surface'],
    immediate_action: 'EMERGENCY VET WITHIN 2–4 HOURS. Do not wait until tomorrow. Corneal ulcers can perforate in 24 hours in Shih Tzus.',
    vet_decision: 'Emergency vet same day — no exceptions.',
    note: '#1 eye emergency in Shih Tzus. Keep eyes clean daily. Harness to reduce head jerking.',
  },
  {
    condition: 'Proptosis (Eye Displacement)',
    timing: 'Any trauma — rough handling, collar pull, collision',
    risk_level: 'critical' as const,
    signs: ['Eye visibly displaced forward from the socket', 'Exposed white of eye all around the iris', 'Extreme pain and distress'],
    immediate_action: 'EMERGENCY VET IMMEDIATELY. Keep eye moist with saline or clean water. Do not attempt to push eye back. Cover loosely with damp cloth.',
    vet_decision: 'Emergency vet — no delay. Outcome depends on speed of treatment.',
    note: 'Prevention: harness only, avoid rough play, protect face from collisions.',
  },
  {
    condition: 'BOAS (Brachycephalic Obstructive Airway Syndrome)',
    timing: 'Present from birth — worsens with heat, exercise, stress, obesity',
    risk_level: 'high' as const,
    signs: ['Noisy breathing at rest', 'Exercise intolerance', 'Overheating easily', 'Blue/grey gums during exertion'],
    immediate_action: 'Cool immediately — wet towel on neck and groin. Move to cool area. Emergency vet if gums go grey.',
    vet_decision: 'Emergency vet for blue/grey gums. Elective BOAS surgery (nares, palate) improves quality of life significantly.',
    note: 'Keep weight lean — obesity dramatically worsens BOAS. No exercise above 22°C.',
  },
  {
    condition: 'Renal Dysplasia',
    timing: 'Signs from 6 months to 3 years',
    risk_level: 'high' as const,
    signs: ['Excessive drinking and urination', 'Poor growth', 'Vomiting', 'Weight loss', 'Bad breath (uraemic)'],
    immediate_action: 'Urgent vet within 24 hours. SDMA test to screen. Cannot be cured — managed with diet and supportive care.',
    vet_decision: 'Urgent vet. Not an immediate emergency unless dog is vomiting or collapsed.',
    note: '#1 breed for renal dysplasia. Screen at 6–8 weeks with urine and blood.',
  },
];
