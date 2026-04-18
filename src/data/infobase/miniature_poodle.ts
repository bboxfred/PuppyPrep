/**
 * INFO BASE: MINIATURE POODLE
 * Applies to: Miniature Poodle
 * Info base ID: 'miniature_poodle'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'miniature_poodle'.
 * See also: standard_poodle.ts and toy_poodle.ts
 *
 * Sources: Poodle Club of America, Merck Vet Manual,
 * Cornell CVM, VCA Animal Hospitals, AKC.
 *
 * Key differences from Standard Poodle:
 * - Medium (not low) hypoglycemia risk
 * - Elevated patellar luxation
 * - Legg-Calvé-Perthes (4–12 months)
 * - Tracheal collapse risk — HARNESS ONLY
 * - PDA risk (less than Toy but present)
 * - No GDV risk (not deep-chested enough at this size)
 * - NEwS: same DNA test as Standard
 */

export const MINIATURE_POODLE_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 3, max: 7, typical: 5 },
  newborn_weight_grams: { min: 150, max: 280, typical: 215 },
  adult_weight_kg: {
    male:   { min: 7, max: 8 },
    female: { min: 7, max: 8 },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const,
  singleton_risk: false,
  csection_rate_percent: 12,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 150, max: 280,  typical: 215  },
    day_7:  { min: 285, max: 490,  typical: 388  },
    day_14: { min: 410, max: 680,  typical: 545  },
    week_3: { min: 580, max: 970,  typical: 775  },
    week_4: { min: 810, max: 1360, typical: 1085 },
    week_6: { min: 1350, max: 2250, typical: 1800 },
    week_8: { min: 1800, max: 3000, typical: 2400 },
  },

  daily_gain_minimum_grams: 10,
  daily_gain_target_grams: 18,
  daily_gain_percent_bodyweight: 7,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 3,  max: 6,  per_100g_body_weight: 1.5 },
    week_2: { min: 5,  max: 9,  per_100g_body_weight: 1.8 },
    week_3: { min: 7,  max: 12, per_100g_body_weight: 2.0 },
    week_4: { min: 11, max: 18, per_100g_body_weight: 2.5 },
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
    week_1:      { min: 29.5, max: 32, ideal: 30.5 },
    week_2:      { min: 27,   max: 30, ideal: 28   },
    week_3:      { min: 25,   max: 27, ideal: 26   },
    week_4_plus: { min: 22,   max: 25, ideal: 23   },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 37.2, danger_below: 35.0 },
    day_5_14:    { min: 35.0, max: 37.2, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 80, d: 80 },
    large_litter: { w: 100, d: 100 },
    pig_rail_height_cm: 8,
    wall_height_cm: 35,
  },
};

export const MINIATURE_POODLE_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Miniature Poodle puppies. Weigh each puppy before dosing.',
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
      plain_english: 'First vaccination at 6–8 weeks. Feed before the visit — medium hypoglycemia risk.',
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
      label: 'Post-whelping dam check',
      urgency: 'within_48_hours',
      plain_english: 'Vet check within 48 hours. Confirm all placentas passed.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. All puppies gaining weight.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + patellar and cardiac check',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. Request: cardiac auscultation (PDA check — continuous murmur = referral), patellar palpation for early luxation detection, NEwS awareness if parents not tested.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final check. Harness only instructions. No jumping protocol. Legg-Calvé-Perthes monitoring from 4 months. PRA-prcd and NEwS DNA status disclosure.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'Patellar luxation',
      timing: 'First puppy vet visit; recheck at 6 months. OFA patellar certification.',
      method: 'Orthopedic palpation by vet',
      plain_english: 'Patellar luxation is very common in Miniature Poodles. Grade 1–2: manage conservatively — restrict jumping, weight control. Grade 3–4: surgical correction recommended.',
      mandatory_for_breeding: false,
    },
    {
      name: 'NEwS DNA test',
      timing: 'Any age — test before breeding',
      method: 'DNA test',
      plain_english: 'NEwS (Neonatal Encephalopathy with Seizures) affects Miniature Poodles as well as Standards. Fatal from 4–6 weeks. Test breeding stock.',
      mandatory_for_breeding: true,
    },
    {
      name: 'PRA-prcd DNA test',
      timing: 'Any age',
      method: 'DNA test + annual CAER eye exam',
      plain_english: 'Progressive retinal atrophy causes progressive blindness. Test before breeding.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'OFA hip certification for PCA CHIC.',
      mandatory_for_breeding: true,
    },
  ],
};

export const MINIATURE_POODLE_PREGNANCY_EVENTS = [
  {
    id_suffix: 'minipoodle_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Confirm count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. Mini Poodle litters of 4–6 need accurate count.',
    detail: 'Pre-whelping X-ray at Day 55–58. Mini Poodles are generally good whelpers with 12% C-section rate. Confirm exact puppy count.',
  },
];

export const MINIATURE_POODLE_NEONATAL_EVENTS = [
  {
    id_suffix: 'minipoodle_neo_news_watch',
    day_offset: 28,
    title: '⚠️ Week 4: NEwS watch — same risk as Standard Poodle',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'NEwS affects Miniature Poodles. Seizures begin at 4–6 weeks.',
    detail: 'Neonatal Encephalopathy with Seizures (NEwS) occurs in Miniature Poodles as well as Standards.\n\nSeizures beginning at 4–6 weeks in a Standard or Miniature Poodle puppy must be treated as potentially NEwS until proven otherwise.\n\nAction if seizure occurs:\n1. Immediate vet referral\n2. DNA test puppy and parents\n3. Humane euthanasia for confirmed cases — no treatment available\n\nPrevention: DNA test both parents before breeding.',
    call_vet_if: 'Any puppy seizure at 4–6 weeks of age — urgent vet',
  },
  {
    id_suffix: 'minipoodle_neo_grooming',
    day_offset: 21,
    title: 'Week 3: Grooming desensitization — Poodle coat requires lifelong intensive care',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Miniature Poodle coat needs professional grooming every 6–8 weeks. Desensitize from Week 3.',
    detail: 'Same grooming requirements as Standard Poodle:\n- Daily brushing\n- Bath every 3–4 weeks\n- Professional grooming every 6–8 weeks\n- Ear hair removal\n\nFrom Week 3:\n1. Daily soft brush — 3 minutes per puppy\n2. Ear handling\n3. Paw and nail handling\n4. Hair dryer desensitization\n5. Clipper sound introduction',
  },
];

export const MINIATURE_POODLE_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'minipoodle_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Intelligent and sensitive',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Miniature Poodles share Standard Poodle intelligence and sensitivity.',
    detail: 'Miniature Poodles are just as intelligent as Standards — they need the same mental enrichment and consistent socialisation.\n\nFrom Week 3:\n- Daily handling by 8+ people\n- Novel objects and sounds\n- Brief separations from Week 5 — separation anxiety risk\n- Grooming desensitization daily\n\nInform new owners: Mini Poodles excel at agility, tricks, obedience, and nosework — they need a job.',
  },
];

export const MINIATURE_POODLE_TRAINING_EVENTS = [
  {
    id_suffix: 'minipoodle_training_harness_jump',
    day_offset: 35,
    title: 'HARNESS ONLY + no jumping — patellar and tracheal protection',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Tracheal collapse and patellar luxation require harness and no-jumping rules from Week 5.',
    detail: 'NEVER use a neck collar for a Miniature Poodle:\n1. Tracheal collapse: collar pressure accelerates it\n2. Patellar luxation: neck collar pulling causes reactive jumping that stresses the joint\n\nNo jumping on/off furniture — provide ramps.\nIntroduce soft harness from Week 5.\n\nInform new owners in writing: harness only, ramps not jumps, for life.',
  },
];

export const MINIATURE_POODLE_HEALTH_RISKS = [
  {
    condition: 'Patellar Luxation',
    timing: 'Can be detected from 6–8 weeks; clinical symptoms variable by grade',
    risk_level: 'high' as const,
    signs: ['Intermittent three-legged hopping', 'Yelp and then normal', 'Leg held off ground briefly'],
    immediate_action: 'Vet for grading. Grade 3–4: surgical correction.',
    vet_decision: 'Call vet within a week.',
  },
  {
    condition: 'Legg-Calvé-Perthes Disease',
    timing: '4–12 months',
    risk_level: 'high' as const,
    signs: ['Progressive hindlimb lameness', 'Muscle wasting in one hind leg'],
    immediate_action: 'Vet within a week. FHO surgery curative.',
    vet_decision: 'Call vet within a week.',
  },
  {
    condition: 'Tracheal Collapse',
    timing: 'Any age; worsens over time',
    risk_level: 'high' as const,
    signs: ['Honking cough', 'Coughing when excited or pulling'],
    immediate_action: 'Harness immediately. Vet appointment.',
    vet_decision: 'Call vet for persistent coughing.',
  },
  {
    condition: 'NEwS (Neonatal Encephalopathy with Seizures)',
    timing: 'Seizures begin 4–6 weeks — fatal',
    risk_level: 'critical' as const,
    signs: ['Sudden seizures at 4–6 weeks', 'Neurological deterioration'],
    immediate_action: 'Urgent vet. DNA test. Humane euthanasia for confirmed cases.',
    vet_decision: 'Urgent vet for any puppy seizure.',
    note: 'DNA test both parents before breeding.',
  },
];
