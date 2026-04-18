/**
 * INFO BASE: LABRADOODLE
 * Applies to: Labradoodle (Labrador × Standard/Mini Poodle)
 *             AND Australian Labradoodle (distinct — includes Cocker Spaniel)
 * Info base ID: 'labradoodle'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'labradoodle'.
 *
 * ⚠️ CRITICAL DISTINCTION IN THIS FILE:
 * Standard Labradoodle: Labrador × Poodle ONLY
 * Australian Labradoodle (ALAA/WALA): Labrador + Poodle + American Cocker Spaniel
 *   + English Cocker Spaniel + Irish Water Spaniel + Curly-Coated Retriever
 * The ALD has ADDITIONAL health risks from Cocker Spaniel ancestry (PFK, otitis).
 * This file covers both with explicit flags where they differ.
 *
 * Sources: ALAA (australianlabradoodleassoc.org.au), WALA (walalabradoodle.com),
 * Raffan 2016 Cell Metab PubMed 27157046 (POMC 14-bp deletion, 25% Lab carriers),
 * Patterson 2008 Nat Genet (EIC DNM1), Minor 2011 Vet J PubMed 21782486,
 * Bryson/O'Neill 2024 PLOS ONE (Doodle Dilemma — Labradoodle elevated Addison's OR ~7.4),
 * O'Neill 2021 VetCompass otitis externa (Labradoodle OR 2.95),
 * Pedersen 2015 PMC4579369 (Std Poodle Addison's bottleneck),
 * Animal Genetics (PFK 10% carrier rate), UC Davis VGL,
 * Cornell CVM, Merck Vet Manual.
 *
 * ⚠️ CRITICAL FLAGS:
 * - EIC (Exercise Induced Collapse): Lab-only DNM1 mutation — DNA test mandatory
 * - POMC gene: ~25% of Labs carry obesity mutation — may transfer to F1 Labradoodles
 * - CNM (Centronuclear Myopathy): Lab-line, fatal — DNA test mandatory
 * - Addison's: Bryson 2024 found ELEVATED risk in Labradoodles (OR ~7.4 vs progenitors)
 * - PFK deficiency: ALD ONLY (Cocker Spaniel ancestry) — DNA test for ALD breeders
 * - Otitis externa: Labradoodle OR 2.95 (highest of all designer breeds — O'Neill 2021)
 * - HYBRID VIGOR NOT DEMONSTRATED: Bryson 2024 showed 86.6% no significant difference
 */

export const LABRADOODLE_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 4, max: 10, typical: 7 },    // Lab avg 7 (Okkens PubMed 11787149)
  newborn_weight_grams: {
    standard: { min: 350, max: 550, typical: 450 },    // EXTRAPOLATED
    medium:   { min: 250, max: 400, typical: 325 },    // EXTRAPOLATED
    mini:     { min: 150, max: 280, typical: 215 },    // EXTRAPOLATED
  },
  newborn_weight_grams_default: { min: 350, max: 550, typical: 450 },
  adult_weight_kg: {
    standard: { min: 23, max: 35 },
    medium:   { min: 13, max: 20 },
    mini:     { min: 7,  max: 13 },
  },
  size_category: 'large' as const,
  hypoglycemia_risk: 'low' as const,   // Standard; Mini = MEDIUM
  singleton_risk: false,
  csection_rate_percent: 7,            // EXTRAPOLATED from parent breeds
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 350, max: 550,  typical: 450  },
    day_7:  { min: 650, max: 990,  typical: 820  },
    day_14: { min: 935, max: 1400, typical: 1170 },
    week_3: { min: 1340, max: 2010, typical: 1675 },
    week_4: { min: 1900, max: 2850, typical: 2375 },
    week_6: { min: 3150, max: 4750, typical: 3950 },
    week_8: { min: 4250, max: 6400, typical: 5325 },
  },

  daily_gain_minimum_grams: 25,
  daily_gain_target_grams: 45,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.5, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 8,  max: 13, per_100g_body_weight: 1.8 },
    week_2: { min: 12, max: 19, per_100g_body_weight: 2.0 },
    week_3: { min: 18, max: 26, per_100g_body_weight: 2.5 },
    week_4: { min: 25, max: 38, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 8,
  max_stomach_capacity_ml_per_100g: 4,

  whelping_box_temp_celsius: {
    week_1:      { min: 29.5, max: 32,   ideal: 30.5 },
    week_2:      { min: 27,   max: 29.5, ideal: 28   },
    week_3:      { min: 24,   max: 27,   ideal: 26   },
    week_4_plus: { min: 21,   max: 24,   ideal: 22   },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 37.2, danger_below: 35.0 },
    day_5_14:    { min: 35.0, max: 37.2, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 120, d: 120 },
    large_litter:  { w: 150, d: 150 },
    pig_rail_height_cm: 10,
    wall_height_cm: 50,
  },
};

export const LABRADOODLE_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, label: 'First deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Give worm treatment to all Labradoodle puppies. Weigh each puppy individually before dosing — with litters of 6–8, individual weights vary.', vet_required: false, critical: true },
    { day: 28, label: 'Second deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Second treatment. Use current weight on the day.', vet_required: false, critical: true },
    { day: 42, label: 'Third deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily x 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Third treatment — Panacur for 3 days.', vet_required: false, critical: true },
    { day: 56, label: 'Fourth deworming (pre-rehoming)', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily x 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Final deworming. Panacur for 3 days.', vet_required: false, critical: true },
  ],
  dam_deworming: {
    start_day_of_pregnancy: 40, end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth.',
    critical: true,
  },
  vaccinations: [
    { week: 6,  label: 'First vaccination',  vaccine: 'DHPP #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'First vaccination at 6-8 weeks.', vet_required: true, critical: true },
    { week: 10, label: 'Second vaccination', vaccine: 'DHPP #2 + Leptospirosis #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'], plain_english: 'Second vaccination plus Lepto. Labradoodles used outdoors near water have elevated Lepto exposure risk.', vet_required: true, critical: true },
    { week: 14, label: 'Third vaccination',  vaccine: 'DHPP #3 + Leptospirosis #2 + Rabies', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis', 'Rabies'], plain_english: 'Third vaccination series plus Rabies.', vet_required: true, critical: true },
    { week: 18, label: 'Final parvo booster', vaccine: 'DHPP #4 (final)', covers: ['Distemper', 'Parvovirus'], plain_english: 'Do not skip.', vet_required: true, critical: true },
  ],
  vet_visits: [
    { day: 0,   label: 'Post-whelping dam check', urgency: 'within_48_hours', plain_english: 'Vet check within 48 hours. Labradoodles are generally good whelpers. Confirm all placentas passed. Large litters of 7+ need rotation nursing planning.', critical: true },
    { week: 1,  label: 'Dam and litter check', urgency: 'day_7', plain_english: 'One-week check. Puppies <25% of litter average weight are high risk — track individually.', critical: true },
    { week: 6,  label: 'Puppy wellness + EIC + PFK (ALD) discussion', urgency: 'week_6_to_8', plain_english: 'First vet visit. Vaccinations, full physical. CRITICAL: discuss EIC DNA test results. If ALD: discuss PFK test. Ear assessment — Labradoodles have the highest otitis risk of all designer breeds (O\'Neill 2021 OR 2.95). Brief new owners on ear care from Day 1.', critical: true },
    { week: 8,  label: 'Pre-rehoming health check', urgency: 'before_leaving', plain_english: 'Final check. All DNA results in writing to new owners. EIC status critically important for any owner planning vigorous exercise or swimming. Ear care routine in writing — weekly cleaning mandatory. POMC obesity awareness for Labs-heavy lines.', critical: true },
  ],
  breed_specific_screenings: [
    {
      name: 'EIC — Exercise Induced Collapse (DNM1)',
      timing: 'Test BOTH parents if Lab lineage present. DNA test any age.',
      method: 'DNA test (UC Davis VGL — DNM1 c.767G>T)',
      plain_english: 'EIC causes sudden collapse and leg weakness during or after intense exercise. Lab carrier frequency ~17.9–38%; 83.6% of EIC/EIC dogs collapse by age 4 (Minor 2011). UC Davis VGL explicitly offers this test for Labradoodles and Australian Labradoodles. EIC/EIC affected dogs must avoid intensive swimming, fetch, and prolonged high-intensity exercise. Test the Lab parent — if carrier, EIC risk passes to F1 Labradoodles.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CNM — Centronuclear Myopathy (PTPLA)',
      timing: 'DNA test — test Lab parent before breeding',
      method: 'DNA test (UC Davis VGL — PTPLA SINE insertion)',
      plain_english: 'CNM is a progressive fatal muscle disease in Labradors. Onset 2–5 months. Affected puppies have exercise intolerance, abnormal gait, muscle wasting. No treatment. DNA test the Lab parent — carrier × carrier = 25% affected litter.',
      mandatory_for_breeding: true,
    },
    {
      name: '⚠️ PFK Deficiency — Australian Labradoodle ONLY',
      timing: 'Test BOTH parents if ALD (Cocker Spaniel ancestry)',
      method: 'DNA test (VetGen, Animal Genetics)',
      plain_english: 'PFK Deficiency (phosphofructokinase) is present ONLY in Australian Labradoodles due to Cocker Spaniel ancestry — NOT in standard Labradoodles. ~10% of Cockers are obligate carriers. Affected dogs: haemolytic anaemia, exercise intolerance, dark urine after exertion. Omit this test for standard (non-ALD) Labradoodles.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months; PennHIP from 16 weeks',
      method: 'OFA radiograph or PennHIP',
      plain_english: 'Both Lab (~11.7% OFA dysplastic) and Standard Poodle (~12.2%) contribute hip dysplasia risk. OFA/PennHIP for both parents required per ALAA standard.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Elbow dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'Lab ~10.5% OFA-abnormal. Elbow certification for both parents.',
      mandatory_for_breeding: true,
    },
    {
      name: 'PRA — prcd and Poodle-side mutations',
      timing: 'DNA test both parents',
      method: 'DNA test (prcd-PRA; additional tests if ALD adds Cocker contribution)',
      plain_english: 'prcd-PRA from Poodle side. ALD adds Cocker Spaniel PRA contribution — test both sources. Clear × clear mandatory.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Sebaceous Adenitis (Standard Poodle ancestry)',
      timing: 'OFA skin biopsy from age 2',
      method: 'OFA registered skin punch biopsy',
      plain_english: 'SA risk from Standard Poodle genetic bottleneck (Pedersen 2015). OFA biopsy for Standard Poodle parent from age 2.',
      mandatory_for_breeding: false,
    },
  ],
};

export const LABRADOODLE_PREGNANCY_EVENTS = [
  {
    id_suffix: 'ld_preg_eic_pomc_check',
    day_offset: -42,
    title: 'Confirm EIC and POMC DNA test status on Lab parent before whelping',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'EIC (Exercise Induced Collapse) and POMC (obesity gene) are Labrador-specific mutations that pass to Labradoodle offspring. Test now if not done.',
    detail: 'Two Labrador-specific genetic conditions must be addressed before this litter goes to new homes:\n\n1. EIC (Exercise Induced Collapse — DNM1 gene):\nLab carrier frequency ~17.9–38%. EIC causes sudden muscle weakness and collapse during intense exercise in affected dogs (DNM1/DNM1). 83.6% of affected dogs collapse by age 4.\nAffected Labradoodles must avoid: intense swimming, competitive fetch, sustained runs in heat.\nDNA test the Lab parent — if carrier, F1 Labradoodle puppies may be carriers or affected.\n\n2. POMC obesity mutation:\n~25% of Labradors carry the 14-bp POMC deletion (Raffan 2016). Carriers have ~25% lower resting metabolic rate and significantly elevated food drive. F1 Labradoodles with a carrier Lab parent have an approximately 12.5% chance of inheriting one copy.\nAffected puppies need lifelong strict portion control and are prone to obesity-related joint disease.\n\nIf either parent not tested: order DNA tests now. Results in 1–2 weeks.',
  },
  {
    id_suffix: 'ld_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Large litter confirmation',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. Labradoodles average 7 puppies — accurate count is essential.',
    detail: 'Pre-whelping X-ray at Day 55–58:\n- Confirm exact puppy count\n- Check foetal presentation\n- With large litters of 8+: plan warming station and rotation nursing\n\nLabradoodles are generally good whelpers with ~7% C-section rate. Have vet emergency contact confirmed.',
  },
];

export const LABRADOODLE_NEONATAL_EVENTS = [
  {
    id_suffix: 'ld_neo_ear_care_start',
    day_offset: 14,
    title: '⚠️ Week 2: Begin ear handling — Labradoodle has highest designer-breed otitis risk',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Labradoodles have OR 2.95 for otitis externa vs crossbreeds (O\'Neill 2021 VetCompass) — the highest of all designer breeds studied. Ear care from Week 2.',
    detail: 'VetCompass 2021 study (O\'Neill, n=22,333): Labradoodles had the highest otitis externa odds ratio of all designer breeds studied at 2.95 (Cockapoo 2.22, Cavapoo 1.92).\n\nThe combination of: pendulous ears + curly/wavy coat growing into the ear canal + Poodle narrow ear canal anatomy = chronic ear infections without prevention.\n\nFrom Week 2:\n- Daily gentle ear folding and inspection\n- Wipe outer ear with soft damp cloth\n- Begin canal inspection from Week 4\n\nFrom Week 4:\n- Weekly ear cleaning with veterinary ear cleaner\n- Remove excess hair growing into the canal opening — discuss with vet/groomer\n\nInform every new Labradoodle owner IN WRITING: weekly ear cleaning is lifelong. Neglect causes chronic painful ear infections that cost hundreds per treatment and recur endlessly.',
  },
  {
    id_suffix: 'ld_neo_addisons_awareness',
    day_offset: 42,
    title: 'Week 6: Addison\'s disease awareness — elevated in Labradoodles',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Bryson 2024 (Doodle Dilemma) found elevated Addison\'s disease risk in Labradoodles (OR ~7.4 vs progenitors). Brief new owners.',
    detail: 'Addison\'s Disease (Hypoadrenocorticism) — deficient cortisol and aldosterone from the adrenal glands.\n\nBryson/O\'Neill 2024 PLOS ONE found Labradoodles had elevated hypoadrenocorticism risk vs parent breeds — the opposite of hybrid vigor for this condition. The Standard Poodle genetic bottleneck is suspected as the cause (Pedersen 2015 — risk factors are "fixed" in the Std Poodle population).\n\nSigns (typically first episode 4–7 years; waxing and waning nature is the key diagnostic clue):\n- Episodes of vomiting, weakness, inappetence that partially resolve\n- "The dog that waxes and wanes" — good days and bad days without obvious cause\n- Weight loss over months\n- Addisonian crisis: sudden collapse, severe weakness, bradycardia = EMERGENCY VET\n\nInform new owners:\n- Any young adult Labradoodle with recurrent unexplained vomiting and weakness = vet promptly\n- Do not assume it is gastroenteritis without ruling out Addison\'s\n- ACTH stimulation test is diagnostic\n- Lifelong management with excellent prognosis once diagnosed',
    call_vet_if: 'Any dog shows repeated episodes of vomiting plus weakness that partially resolves',
  },
];

export const LABRADOODLE_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'ld_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Friendly and eager — broad exposure reinforces the best traits',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Labradoodles inherit sociability from both Labrador and Poodle lines. Broad socialisation during the critical window creates the friendly, adaptable companion.',
    detail: 'From Week 3:\n- Daily handling by 8+ different people\n- Children — Labradoodles are popular family dogs\n- Water exposure (if weather allows) — Labs love water and this often passes\n- Novel environments from Week 4\n- Brief separations from Week 5\n\nOne specific note: some Labradoodles inherit Lab-level food obsession, especially if the POMC mutation is present. From Week 3, use food primarily as rewards in structured training rather than free-feeding.',
  },
];

export const LABRADOODLE_TRAINING_EVENTS = [
  {
    id_suffix: 'ld_training_week5_pomc',
    day_offset: 35,
    title: 'Begin formal training Week 5 — manage food drive from the start',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Labradoodles are highly trainable but can have intense food motivation from the Lab side — especially if POMC carriers.',
    detail: 'From Week 5:\n- Sit, down, stay, come — positive reinforcement\n- "Leave it" — critically important for a food-motivated breed\n- Loose-leash walking from Week 6\n- Recall — strong reward history builds excellent recall in these breeds\n\nInform new owners: if the puppy is POMC-positive, portion control is lifelong. Use all meals as training opportunities rather than free-feeding. A POMC-positive Labradoodle that free-feeds will be obese by 2 years.',
  },
];

export const LABRADOODLE_HEALTH_RISKS = [
  {
    condition: 'EIC — Exercise Induced Collapse',
    timing: 'First collapse episode typically 5 months to 3 years; 83.6% of affected dogs collapse by age 4',
    risk_level: 'critical' as const,
    signs: [
      'Collapse or severe weakness in hind legs after 5–15 minutes of intense exercise',
      'Dog appears drunk or loses hindlimb coordination after swimming or running',
      'Some dogs collapse completely; most recover within 5–25 minutes',
      'Normal between episodes',
    ],
    immediate_action: 'STOP exercise immediately. Cool the dog. Rest in shade with water. Emergency vet if not recovering within 30 minutes.',
    vet_decision: 'Emergency if collapse persists. Routine vet after first episode for EIC DNA confirmation.',
    note: 'EIC/EIC dogs must avoid intense exercise, sustained swimming, and playing in heat. Moderate exercise is usually fine.',
  },
  {
    condition: 'Otitis Externa (Ear Infections)',
    timing: 'Any age; highest risk without preventive care; OR 2.95 vs crossbreeds',
    risk_level: 'high' as const,
    signs: [
      'Head shaking',
      'Scratching at ears',
      'Brown or dark discharge at ear canal opening',
      'Redness and swelling of inner ear flap',
      'Unpleasant odour from ear',
    ],
    immediate_action: 'Book vet within a week for first infection. Ongoing infections: dermatologist referral for culture and targeted treatment.',
    vet_decision: 'Call vet within a week. Recurrent otitis = specialist referral.',
    note: 'Highest designer-breed otitis risk (OR 2.95, O\'Neill 2021). Prevention only: weekly ear cleaning for life, dry ears after water exposure, remove canal hair.',
  },
  {
    condition: "Addison's Disease",
    timing: 'Peak 4–7 years; elevated risk in Labradoodles vs parent breeds (Bryson 2024)',
    risk_level: 'high' as const,
    signs: [
      'Recurring unexplained vomiting and weakness',
      'Good days and bad days without obvious cause',
      'Weight loss over months',
      'Addisonian crisis: sudden collapse, severe weakness = emergency',
    ],
    immediate_action: 'Crisis = EMERGENCY VET. Routine waxing/waning signs = vet within 24 hours.',
    vet_decision: 'Crisis = emergency. Recurring signs = urgent.',
    note: 'ACTH stimulation test is diagnostic. Excellent prognosis with lifelong fludrocortisone/DOCP management.',
  },
  {
    condition: 'CNM — Centronuclear Myopathy',
    timing: 'Onset 2–5 months',
    risk_level: 'high' as const,
    signs: [
      'Exercise intolerance from young puppyhood',
      'Abnormal gait and muscle weakness',
      'Difficulty rising and climbing stairs',
      'Muscle wasting progressive over months',
    ],
    immediate_action: 'Urgent vet within 24 hours of signs. DNA test to confirm. No treatment — supportive care only.',
    vet_decision: 'Urgent vet within 24 hours.',
    note: 'DNA test Lab parent before breeding. Carrier × carrier breeding should not be repeated.',
  },
];
