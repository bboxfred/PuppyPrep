/**
 * INFO BASE: BORDER COLLIE
 * Applies to: Border Collie
 * Info base ID: 'border_collie'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'border_collie'.
 *
 * Sources: Border Collie Society of America (BCSA), Cornell CVM,
 * Merck Vet Manual, ASHGI (MDR1), UC Davis VGL,
 * AKC, OFA, VCA Animal Hospitals.
 *
 * ⚠️ CRITICAL FLAG: MDR1 (ABCB1) drug sensitivity gene present in Border Collies.
 * Test all puppies. Affected dogs can die from standard doses of common drugs.
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const BORDER_COLLIE_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 4, max: 8, typical: 6 },
  newborn_weight_grams: { min: 250, max: 450, typical: 350 },
  adult_weight_kg: {
    male:   { min: 14, max: 20 },
    female: { min: 12, max: 19 },
  },
  size_category: 'medium' as const,
  hypoglycemia_risk: 'low' as const,
  csection_rate_percent: 5,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 250, max: 450, typical: 350 },
    day_7:  { min: 450, max: 700, typical: 580 },
    day_14: { min: 650, max: 1000, typical: 830 },
    week_3: { min: 900, max: 1400, typical: 1150 },
    week_4: { min: 1300, max: 1900, typical: 1600 },
    week_6: { min: 2100, max: 3000, typical: 2550 },
    week_8: { min: 3000, max: 4200, typical: 3600 },
  },

  daily_gain_minimum_grams: 15,
  daily_gain_target_grams: 25,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 5,  max: 10, per_100g_body_weight: 1.8 },
    week_2: { min: 10, max: 15, per_100g_body_weight: 2.0 },
    week_3: { min: 15, max: 22, per_100g_body_weight: 2.5 },
    week_4: { min: 22, max: 32, per_100g_body_weight: 3.0 },
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
    small_litter: { w: 100, d: 100 },
    large_litter: { w: 120, d: 120 },
    pig_rail_height_cm: 10,
    wall_height_cm: 40,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const BORDER_COLLIE_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Border Collie puppies. Weigh each puppy before dosing. Working farm dogs have higher parasite exposure — good deworming practice is especially important.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Use current weight.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment — Panacur for 3 days. Border Collies on farms or in contact with livestock are at higher Giardia and Echinococcus risk.',
      vet_required: false,
      critical: true,
    },
    {
      day: 56,
      label: 'Fourth deworming (pre-rehoming)',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Final deworming before rehoming. Panacur for 3 days.',
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
      plain_english: 'First vaccination at 6–8 weeks.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2 + Leptospirosis #1',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'],
      plain_english: 'Second vaccination plus first Lepto dose. Border Collies working near water or livestock are at elevated Lepto risk.',
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
      plain_english: 'Do not skip. Ensures full parvo protection.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check',
      urgency: 'within_48_hours',
      plain_english: 'Vet check within 48 hours. Border Collies are generally good whelpers. Confirm all placentas passed and dam is recovering normally.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm all puppies are gaining weight.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + vaccinations + MDR1 discussion',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. CRITICAL: discuss MDR1 test with vet. Ideally test all puppies via cheek swab at this visit. Eye exam: CEA (Collie Eye Anomaly) is detected in the "go-normal" window between 6–9 weeks.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final check. Disclose MDR1 status to all new owners. CEA ophthalmologic exam results. Hip OFA discussion for future at 24 months.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'MDR1 (ABCB1) drug sensitivity DNA test',
      timing: 'Any age — cheek swab. Test BEFORE going to new home.',
      method: 'DNA test (WSU VCPL or UC Davis VGL)',
      plain_english: 'MDR1 carriers cannot process certain common drugs and can die from standard doses. Test every Border Collie puppy and disclose status to new owners. This information must reach every vet who treats this dog for life.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CEA (Collie Eye Anomaly) — Choroidal Hypoplasia',
      timing: '6–9 weeks (go-normal window); DNA test any age',
      method: 'Ophthalmologist exam between 6–9 weeks + DNA test for NHEJ1 gene',
      plain_english: 'CEA ranges from mild (choroidal hypoplasia only — may not affect vision) to severe (coloboma, retinal detachment, blindness). The 6–9 week window must be used for ophthalmologic detection before the eye abnormalities normalise on exam. DNA test is definitive.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'Hip dysplasia occurs in Border Collies. OFA certification recommended for breeding stock.',
      mandatory_for_breeding: true,
    },
    {
      name: 'TNS (Trapped Neutrophil Syndrome)',
      timing: 'DNA test any age — test before breeding',
      method: 'DNA test',
      plain_english: 'Fatal immune deficiency — affected puppies (N/N for the mutation) die from infections by 6 months. Carrier × carrier produces 25% affected. Test breeding stock.',
      mandatory_for_breeding: true,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const BORDER_COLLIE_PREGNANCY_EVENTS = [
  {
    id_suffix: 'bc_preg_mdr1_critical',
    day_offset: -42,
    title: '⚠️ MDR1 DNA test — critical before whelping',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'If you have not DNA tested both parents for MDR1, do it now.',
    detail: 'MDR1 (Multi-Drug Resistance 1) gene mutation makes affected dogs unable to safely metabolise common drugs. Standard doses are fatal.\n\nDrugs ABSOLUTELY AVOIDED in MDR1-affected dogs (m/m genotype):\n- Ivermectin at parasiticide doses (>6 µg/kg — standard heartworm dose IS safe)\n- Loperamide (Imodium) — even a single tablet can cause fatal toxicity\n- Selamectin at high doses\n- Milbemycin at high doses\n- Emodepside\n- Apomorphine\n\nDrugs requiring dose REDUCTION in carriers (m/M genotype):\n- Acepromazine (reduce by 25–50%)\n- Butorphanol (reduce by 25–50%)\n- Vincristine, vinblastine, doxorubicin\n\nIf dam is not tested: order cheek swab test NOW. Results in 2–3 weeks.',
    call_vet_if: 'Any puppy or dam requires parasite treatment before MDR1 status is confirmed',
  },
  {
    id_suffix: 'bc_preg_mental_stimulation',
    day_offset: -28,
    title: 'Dam mental stimulation during pregnancy',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Border Collie dams need mental activity throughout pregnancy.',
    detail: 'Border Collies need mental stimulation as much as physical exercise. A bored pregnant Border Collie may become anxious, destructive, or develop obsessive behaviours.\n\nFrom Week 4 of pregnancy, substitute physical exercise with mental:\n- Nose work and scent games\n- Puzzle feeders for all meals\n- Training sessions (5–10 minutes, low physical demand)\n- Tricks and obedience work — sitting, down, paw, names of toys\n- Avoid: herding, agility, jumping, running\n\nA mentally occupied pregnant Border Collie is calmer, less anxious during whelping, and recovers more easily.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const BORDER_COLLIE_NEONATAL_EVENTS = [
  {
    id_suffix: 'bc_neo_mdr1_test_early',
    day_offset: 14,
    title: 'MDR1 test each puppy by Week 2',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Test every puppy for MDR1 before any medical treatment is given.',
    detail: 'Every Border Collie puppy should have an MDR1 DNA test before any treatment that involves sensitive drugs.\n\nTest method: gentle cheek swab (oral mucosa) — can be done from 3–4 weeks when puppies are physically stable.\n\nPending test results: treat ALL puppies as potentially MDR1-affected until confirmed.\n\n- Safe for all MDR1 genotypes: pyrantel pamoate, fenbendazole, praziquantel, standard heartworm prevention doses of ivermectin, vaccines\n- AVOID pending results: loperamide, high-dose ivermectin, selamectin at parasiticide doses\n\nDisclose every puppy\'s MDR1 result to new owners with a written note for their vet file.',
    call_vet_if: 'Any puppy requires drug treatment before MDR1 status is confirmed',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const BORDER_COLLIE_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'bc_social_week3_no_laser',
    day_offset: 21,
    title: 'Socialization Week 3: NEVER use laser pointers',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Laser pointers create compulsive light-chasing disorders in Border Collies. Banned from this breed.',
    detail: 'Border Collies have the strongest herding instinct of any breed. They fixate intensely on moving stimuli. Laser pointers exploit this instinct and create compulsive light/shadow chasing that does not resolve.\n\nAbsolutely NEVER use with Border Collie puppies:\n- Laser pointers\n- Bright flashlights pointed at the floor\n- Shadow games (chasing your shadow)\n- Anything that creates a light/shadow stimulus the dog chases\n\nInstead, appropriate stimulation for Week 3:\n- Daily 5–10 minute handling sessions\n- Novel objects to investigate\n- Sound desensitization\n- Touch work: paws, ears, mouth, tail\n- Begin flirt pole introduction (feather on a string) for appropriate chase outlet',
  },
  {
    id_suffix: 'bc_social_week4_fast_stimuli',
    day_offset: 28,
    title: 'Socialization Week 4: Desensitize to fast-moving stimuli',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Border Collies will attempt to herd bikes, children, cars, and joggers. Desensitize now.',
    detail: 'Border Collies\' herding instinct extends beyond livestock to anything that moves fast — children running, cyclists, joggers, cars, other dogs at play.\n\nFrom Week 4, begin exposure in a controlled setting:\n1. Have someone jog past the puppies at a distance\n2. If any puppy stares, crouches, or tries to follow: interrupt calmly and redirect attention to you\n3. Reward CALM OBSERVATION of moving things\n4. Gradually decrease the distance as puppies show calm responses\n\nThis is the foundation of preventing adult herding behaviour of children and cyclists — one of the most common Border Collie behaviour complaints.',
  },
  {
    id_suffix: 'bc_social_week5_noise',
    day_offset: 35,
    title: 'Socialization Week 5: Sound desensitization',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Border Collies have elevated noise sensitivity. Systematic sound exposure prevents storm phobia.',
    detail: 'Border Collies have disproportionately high rates of noise phobia (thunderstorms, fireworks) compared to many other breeds.\n\nFrom Week 5, begin systematic sound exposure using a sound therapy track (available from sound therapy for pets resources):\n\nWeek 5: household sounds at normal volume (vacuum, dishwasher, washing machine, TV)\nWeek 6: outdoor sounds (traffic, construction, crowds)\nWeek 7: startling sounds at low volume, gradually increasing (fireworks, thunder, gunshots)\n\nCritical rule: if a puppy shows fear response, reduce the volume BELOW the fear threshold and work back up. Never flood with sound.\n\nInform new owners: the single most common serious behavioural problem in adult Border Collies is sound phobia. This week\'s work is disease prevention.',
  },
  {
    id_suffix: 'bc_social_week6_mental',
    day_offset: 42,
    title: 'Socialization Week 6: Mental enrichment begins',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Border Collies need mental stimulation from 6 weeks — without it they become problems.',
    detail: 'Border Collies are the most intelligent dog breed (Coren 2006 — #1 on instinctive and adaptive intelligence). Intelligence without outlet becomes destruction, obsession, and anxiety.\n\nFrom Week 6:\n- Puzzle feeders for all meals (Kongs, snuffle mats, licky mats)\n- Name learning: each puppy responds to its own name\n- Basic obedience: sit and down, 2–3 minute sessions twice daily\n- Object permanence games: hide treats under cups\n\nInform new owners urgently: a Border Collie needs a minimum of 30 minutes of mental exercise AND 60 minutes of physical exercise daily as an adult. Without this, they become destructive, develop compulsive behaviours, and are frequently surrendered. This is not a dog for a casual or sedentary owner.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const BORDER_COLLIE_TRAINING_EVENTS = [
  {
    id_suffix: 'bc_training_herding_redirect',
    day_offset: 28,
    title: 'Herding nip redirection: Begin at Week 4',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Border Collies will nip ankles. This is herding behaviour, not aggression — redirect appropriately.',
    detail: 'Ankle-nipping in Border Collies is herding instinct, not aggression. It must be redirected, not punished.\n\nFrom Week 4:\n1. When a puppy nips at ankles: stop moving immediately (movement triggers the instinct)\n2. Redirect to a toy immediately — tug rope or flirt pole feather\n3. Praise enthusiastically when they engage with the toy\n4. Never run away from a nipping Border Collie — this triggers chase\n\nInform new owners: ankle nipping in children\'s running games is the #1 Border Collie bite report. The solution is never physical punishment — it is exercise, mental stimulation, and consistent redirection. A tired Border Collie does not herd children.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const BORDER_COLLIE_HEALTH_RISKS = [
  {
    condition: 'MDR1 Drug Toxicity',
    timing: 'Any time an affected dog receives a sensitive drug',
    risk_level: 'critical' as const,
    signs: ['Vomiting, diarrhoea after drug administration', 'Tremors or seizures', 'Dilated pupils', 'Incoordination', 'Coma'],
    immediate_action: 'EMERGENCY VET IMMEDIATELY. Bring the packaging of any drug given. Tell the vet "this dog has MDR1 mutation and I believe it has received a toxic dose."',
    vet_decision: 'Emergency vet — no waiting.',
    note: 'Prevention is the only strategy. Test every dog and share results with every vet, groomer, and emergency clinic before any treatment.',
  },
  {
    condition: 'TNS — Trapped Neutrophil Syndrome',
    timing: 'Fatal — symptoms from 4–6 weeks',
    risk_level: 'critical' as const,
    signs: ['Failure to thrive', 'Recurrent infections that do not resolve', 'Stunted growth', 'Abnormal gum colour'],
    immediate_action: 'Emergency vet if any puppy has recurrent unexplained infections and stunted growth by 6 weeks.',
    vet_decision: 'Emergency vet. DNA test to confirm. Currently no treatment — humane euthanasia is recommended.',
    note: 'Test both parents before breeding. Carrier × carrier should not be repeated.',
  },
  {
    condition: 'Noise Phobia',
    timing: 'Develops typically 1–3 years if undertreated sensitisation',
    risk_level: 'high' as const,
    signs: ['Severe trembling during storms or fireworks', 'Destructive behaviour during noise events', 'Refusing to go outside', 'Panting and pacing in anticipation of storms'],
    immediate_action: 'This is a welfare emergency — severe noise phobia causes enormous suffering. Behaviour therapy + medication (trazodone, gabapentin, sileo gel) as needed.',
    vet_decision: 'Call vet at first signs. Early intervention is far more successful than treating established phobia.',
    note: 'Prevention through Week 5 sound desensitisation is the best intervention.',
  },
];
