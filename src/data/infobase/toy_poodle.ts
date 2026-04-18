/**
 * INFO BASE: TOY POODLE
 * Applies to: Toy Poodle
 * Info base ID: 'toy_poodle'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'toy_poodle'.
 * See also: miniature_poodle.ts and standard_poodle.ts for other sizes.
 *
 * Sources: Poodle Club of America, Merck Vet Manual,
 * Cornell CVM, VCA Animal Hospitals, AKC,
 * All Poodle Info (health problems), UC Davis VGL.
 *
 * ⚠️ CRITICAL FLAGS:
 * - HIGH hypoglycemia risk — 90-minute feeds in Week 1
 * - 20–30% C-section rate
 * - HIGH singleton risk
 * - PDA (patent ductus arteriosus) — auscultate every puppy
 * - PSS (portosystemic shunt) — bile acid screen if signs appear
 * - Legg-Calvé-Perthes disease (4–12 months)
 * - Patellar luxation — common
 * - Tracheal collapse: HARNESS ONLY
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const TOY_POODLE_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 1, max: 3, typical: 2 },
  newborn_weight_grams: { min: 90, max: 180, typical: 135 },
  adult_weight_kg: {
    male:   { min: 2.0, max: 4.0 },
    female: { min: 2.0, max: 4.0 },
  },
  size_category: 'toy' as const,
  hypoglycemia_risk: 'high' as const,
  singleton_risk: true,
  csection_rate_percent: 25,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 90,  max: 180,  typical: 135  },
    day_7:  { min: 180, max: 310,  typical: 245  },
    day_14: { min: 260, max: 430,  typical: 345  },
    week_3: { min: 370, max: 610,  typical: 490  },
    week_4: { min: 520, max: 860,  typical: 690  },
    week_6: { min: 870, max: 1430, typical: 1150 },
    week_8: { min: 1150, max: 1900, typical: 1525 },
  },

  daily_gain_minimum_grams: 7,
  daily_gain_target_grams: 13,
  daily_gain_percent_bodyweight: 10,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 1.5, max: 3.0, per_100g_body_weight: 1.5 },
    week_2: { min: 2.5, max: 4.0, per_100g_body_weight: 1.8 },
    week_3: { min: 3.5, max: 6.0, per_100g_body_weight: 2.0 },
    week_4: { min: 6.0, max: 9.0, per_100g_body_weight: 2.5 },
  },
  feeding_frequency_hours: {
    week_1: 1.5,    // 90 MINUTES
    week_2: 2,
    week_3: 2.5,
    week_4: 3,
  },

  tube_size_french: 3.5,    // French 3.5 for smallest; French 5 for larger Toy Poodles
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

export const TOY_POODLE_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg — 1 cc syringe required',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Toy Poodle puppies. A 135g Toy Poodle puppy needs approximately 1.35 mg of pyrantel — measure with a 1 cc syringe. Never estimate.',
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
      plain_english: 'First vaccination at 6–8 weeks. Feed puppy 1–2 hours BEFORE the vet visit. Keep warm throughout. Have Karo syrup available at the clinic.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'Second vaccination. Discuss Lepto timing with vet — separate visit preferred for Toy Poodles.',
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
      plain_english: 'Check within 24 hours. Toy Poodles have 20–30% C-section rate — if C-section occurred, monitor dam for anaesthetic recovery. Confirm retained foetus check.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. With 1–3 puppies, every single puppy must be gaining at least 7g per day.',
      critical: true,
    },
    {
      week: 6,
      label: '⚠️ Puppy wellness + PDA cardiac check',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. Request SPECIFICALLY: cardiac auscultation for PDA ("machinery murmur" = PDA until proven otherwise). Also: patellar palpation for early luxation detection. Bile acid screen if any puppy appears stunted.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. Harness only instructions. Hypoglycemia protocol in writing. PRA DNA test recommendation for new owners. Inform about Legg-Calvé-Perthes monitoring from 4 months.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'PDA cardiac auscultation',
      timing: 'First puppy vet visit 6–8 weeks',
      method: 'Cardiac auscultation by vet',
      plain_english: 'PDA is elevated in Toy Poodles. The characteristic "machinery murmur" is continuous and heard under the left shoulder blade. Early surgical ligation at 12–16 weeks is curative.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Patellar luxation grading',
      timing: 'First puppy vet visit; recheck at 6 months',
      method: 'Orthopedic palpation by vet',
      plain_english: 'Patellar (kneecap) luxation is very common in Toy Poodles. Grade 1–2: monitor, restrict jumping, weight management. Grade 3–4: surgical correction recommended. OFA patellar certification available.',
      mandatory_for_breeding: false,
    },
    {
      name: 'PRA DNA test (prcd-PRA)',
      timing: 'Any age — DNA test',
      method: 'DNA test (OPTC and other mutations)',
      plain_english: 'Progressive retinal atrophy causes blindness. DNA test before breeding. Test all puppies and disclose status to new owners.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Legg-Calvé-Perthes monitoring',
      timing: 'Watch for hindlimb lameness 4–12 months',
      method: 'Radiograph of hip joint',
      plain_english: 'Avascular necrosis of the femoral head — reduced blood supply causes hip joint collapse. Common in Toy Poodles. Signs: hindlimb lameness from 4–12 months. Surgical treatment (FHO) is curative.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const TOY_POODLE_PREGNANCY_EVENTS = [
  {
    id_suffix: 'toypoodle_preg_csection_plan',
    day_offset: -21,
    title: '⚠️ C-section planning: 20–30% Toy Poodle rate',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Toy Poodle C-section rate is elevated, especially for singletons. Plan accordingly.',
    detail: 'Toy Poodle C-section rate of 20–30% is driven primarily by singleton pregnancies (very common in this breed) — a single large puppy that fails to trigger adequate labour.\n\nIf X-ray at Day 55–58 shows:\n- Singleton: strongly consider elective C-section with vet — discuss now\n- 2 puppies: have vet\'s emergency number confirmed and tested\n- 3 puppies: monitor closely, have emergency plan\n\nElective vs emergency C-section: an elective C-section planned in advance produces better neonatal outcomes than an emergency one after failed labour. Discuss this with your vet before the due date.',
    call_vet_if: 'No puppy within 2 hours of strong active contractions',
    emergency_contact_recommended: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const TOY_POODLE_NEONATAL_EVENTS = [
  {
    id_suffix: 'toypoodle_neo_hypoglycemia_90min',
    day_offset: 0,
    title: '⚠️ Week 1: Feed every 90 MINUTES',
    category: 'nutrition' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Toy Poodle neonates require 90-minute feeding intervals in Week 1.',
    detail: 'Week 1: every 90 MINUTES around the clock.\nVolume: 1.5 ml per 100g body weight per feed.\nWarmed to 38°C / 100°F.\nNEVER feed a cold puppy.\n\nHypoglycemia signs: lethargy, trembling, pale gums, seizure.\nAction: warm first → Karo on gums → emergency vet within 30 min.\n\nFrom Week 2: every 2 hours.',
    call_vet_if: 'Any hypoglycemia symptoms',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'toypoodle_neo_grooming_start',
    day_offset: 21,
    title: 'Week 3: Begin coat care — Poodle grooming starts NOW',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Toy Poodles require intensive professional grooming every 6–8 weeks for life. Desensitize from Week 3.',
    detail: 'The Poodle coat does not shed — it grows continuously and mats without regular care.\n\nToy Poodles need:\n- Full brush and comb daily\n- Professional grooming every 6–8 weeks\n- Ear hair removal (Poodles grow hair in ear canals — increases infection risk if not plucked)\n- Tooth brushing daily\n- Eye cleaning\n\nFrom Week 3:\n1. Daily soft brush, 3 minutes per puppy\n2. Gentle comb through ears and face\n3. Paw holding and individual toe manipulation\n4. Introduce sound of clippers at a distance\n5. Face handling for muzzle trim preparation\n\nA Toy Poodle that was not grooming-desensitized requires chemical sedation at every grooming appointment — expensive, stressful, and a welfare concern.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const TOY_POODLE_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'toypoodle_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Intelligent and sensitive — balance required',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Toy Poodles are extremely intelligent and sensitive. Poor socialisation creates anxious, reactive dogs.',
    detail: 'Toy Poodles are the #2 most intelligent dog breed. They are also highly sensitive to their environment and their owner\'s emotions.\n\nFrom Week 3:\n- Daily handling by 8–10 different people\n- Varied environments from Week 4\n- Novel object investigation — reward curiosity\n- Sound desensitization: Toy Poodles can develop noise sensitivity\n- Brief separations from Week 5 (crate training)\n\nToy Poodles pick up on anxiety in their handlers — if you are nervous when introducing a new experience, the puppy will be too. Model confidence.',
  },
  {
    id_suffix: 'toypoodle_social_week5_mental',
    day_offset: 35,
    title: 'Socialization Week 5: Mental enrichment is urgent',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Toy Poodles need mental exercise as much as physical. Begin enrichment from Week 5.',
    detail: 'Toy Poodles are working-level intelligence in a tiny body. Without mental stimulation:\n- Obsessive behaviours (shadow chasing, spinning)\n- Excessive barking\n- Destructive behaviour\n- Anxiety and hyperattachment\n\nFrom Week 5:\n- Puzzle feeders for meals\n- Name of toys game\n- Sit and down in 2-minute training sessions\n- "Find it" — hide treats under cups\n\nInform new owners: Toy Poodles excel at and genuinely enjoy nosework, tricks, agility (small dog class), and obedience. A 15-minute training session is worth 45 minutes of walking for mental satisfaction. These dogs need a job.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const TOY_POODLE_TRAINING_EVENTS = [
  {
    id_suffix: 'toypoodle_training_harness',
    day_offset: 35,
    title: 'HARNESS ONLY — critical for Toy Poodles',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Tracheal collapse and patellar luxation risk make neck collars and rough handling dangerous.',
    detail: 'NEVER use a neck collar for walking a Toy Poodle.\n\nTwo reasons:\n1. Tracheal collapse: common in Toy Poodles — collar pressure accelerates it\n2. Patellar luxation: a sudden pull on a collar can cause reactive jumping that stresses the patellar joint\n\nFrom Week 5: introduce a soft harness.\nFrom Week 6: short lead practice.\n\nAlso: no jumping on/off furniture or beds — patellar and Legg-Calvé-Perthes risk. Provide puppy ramps from the beginning.\n\nInform new owners in writing: harness only, ramps not jumps, for life.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const TOY_POODLE_HEALTH_RISKS = [
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
    signs: ['Continuous machinery murmur at puppy check', 'Exercise intolerance', 'Coughing', 'Failure to thrive'],
    immediate_action: 'Cardiac referral for echocardiogram. Surgical ligation at 12–16 weeks is curative.',
    vet_decision: 'Call vet for cardiac referral if murmur detected.',
  },
  {
    condition: 'Legg-Calvé-Perthes Disease',
    timing: '4–12 months of age',
    risk_level: 'high' as const,
    signs: ['Progressive hindlimb lameness', 'Muscle wasting in one hind leg', 'Holding leg up when walking'],
    immediate_action: 'Book vet appointment within a week of any hindlimb lameness. Radiograph required.',
    vet_decision: 'Call vet within a week. FHO surgery is curative.',
  },
  {
    condition: 'Patellar Luxation',
    timing: 'Can be detected from 6–8 weeks; symptoms variable by grade',
    risk_level: 'high' as const,
    signs: ['Intermittent three-legged hopping while walking', 'Occasional yelp and then recovery', 'Leg held off ground briefly'],
    immediate_action: 'Book vet for grading. Grade 1–2: manage conservatively. Grade 3–4: surgical correction.',
    vet_decision: 'Call vet within a week for first episode. Not an emergency.',
  },
  {
    condition: 'Progressive Retinal Atrophy (PRA)',
    timing: 'Night blindness typically 3–5 years; progresses to total blindness',
    risk_level: 'high' as const,
    signs: ['Night blindness — hesitation in dim light', 'Dilated pupils', 'Progressive vision loss'],
    immediate_action: 'Book ophthalmologist exam. DNA test to confirm. Manage environment for vision loss.',
    vet_decision: 'Call vet for ophthalmology referral.',
    note: 'DNA test parents and inform new owners of puppy status.',
  },
];
