/**
 * INFO BASE: AUSTRALIAN SHEPHERD
 * Applies to: Australian Shepherd (Aussie)
 * Info base ID: 'australian_shepherd'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'australian_shepherd'.
 *
 * Sources: Australian Shepherd Health & Genetics Institute (ASHGI),
 * USASA (United States Australian Shepherd Association), Cornell CVM,
 * Merck Vet Manual, UC Davis VGL, OFA, ASHGI MDR1 prevalence studies.
 *
 * ⚠️ CRITICAL FLAGS:
 * - MDR1 (ABCB1): ~50% of Aussies carry ≥1 mutant allele (ASHGI data)
 * - CEA (Collie Eye Anomaly): DNA test + ophthalmologic exam at 6–9 weeks
 * - Double merle: NEVER breed merle × merle — produces blind/deaf puppies
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const AUSTRALIAN_SHEPHERD_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 5, max: 8, typical: 7 },
  newborn_weight_grams: { min: 300, max: 500, typical: 390 },
  adult_weight_kg: {
    male:   { min: 23, max: 29 },
    female: { min: 18, max: 25 },
  },
  size_category: 'medium' as const,
  hypoglycemia_risk: 'low' as const,
  csection_rate_percent: 7,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 300, max: 500, typical: 390 },
    day_7:  { min: 500, max: 800, typical: 650 },
    day_14: { min: 750, max: 1100, typical: 930 },
    week_3: { min: 1050, max: 1600, typical: 1320 },
    week_4: { min: 1500, max: 2200, typical: 1850 },
    week_6: { min: 2400, max: 3500, typical: 2950 },
    week_8: { min: 3400, max: 5000, typical: 4200 },
  },

  daily_gain_minimum_grams: 15,
  daily_gain_target_grams: 30,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 6,  max: 10, per_100g_body_weight: 1.8 },
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
    small_litter: { w: 110, d: 110 },
    large_litter: { w: 130, d: 130 },
    pig_rail_height_cm: 10,
    wall_height_cm: 45,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const AUSTRALIAN_SHEPHERD_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Aussie puppies. Weigh each puppy before dosing.',
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
      plain_english: 'Third treatment — Panacur for 3 days in a row.',
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
      plain_english: 'First vaccination at 6–8 weeks.',
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
      plain_english: 'Vet check within 48 hours of birth. Confirm all placentas passed, dam is recovering well.',
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
      label: '⚠️ Puppy wellness + vaccinations + CEA/MDR1 critical window',
      urgency: 'week_6_to_8',
      plain_english: 'CRITICAL WINDOW — do not delay. Vaccinations, full physical. CEA ophthalmologic exam MUST be done between 6–9 weeks before the go-normal phenomenon makes detection impossible. Request MDR1 DNA test cheek swabs for all puppies. Double-merle puppies: check vision and request BAER hearing test.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final check. Disclose MDR1 and CEA status to new owners. Written note for vet file on MDR1 status. Hip OFA at 24 months. Epilepsy awareness.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'MDR1 (ABCB1) DNA test — HIGHEST PRIORITY',
      timing: 'Any age — cheek swab. Approximately 50% of Aussies carry ≥1 mutant allele.',
      method: 'DNA test (WSU VCPL or UC Davis VGL)',
      plain_english: 'MDR1 affects ~50% of Australian Shepherds — much higher than Border Collies. Affected dogs (m/m) can die from standard doses of common drugs. Carriers (m/M) have intermediate risk. Test every puppy. Provide written result to new owners and stress they must share it with every vet, groomer, and emergency clinic the dog ever visits.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CEA (Collie Eye Anomaly)',
      timing: '6–9 weeks ophthalmologic exam (go-normal window); DNA test any age',
      method: 'Board-certified ophthalmologist exam + DNA test for NHEJ1 gene',
      plain_english: 'CEA is common in Aussies. The go-normal window (6–9 weeks) is the only time the ophthalmologic abnormality is detectable before it normalises in appearance. DNA test is definitive for carrier/affected status. Do not miss this window.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hereditary Cataracts (HSF4)',
      timing: 'Annual CAER exam; DNA test any age',
      method: 'CAER ophthalmologist exam + DNA test',
      plain_english: 'Hereditary cataracts are common in Aussies. Annual eye certification required for USASA CHIC.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'Hip dysplasia occurs in Aussies. OFA certification required for USASA CHIC.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Epilepsy — no DNA test available',
      timing: 'Watch for first seizure typically 6 months to 3 years',
      method: 'Clinical diagnosis; MRI to rule out structural causes',
      plain_english: 'Idiopathic epilepsy is elevated in Aussies. No DNA test available. Inform new owners of the breed risk and signs of seizure.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const AUSTRALIAN_SHEPHERD_PREGNANCY_EVENTS = [
  {
    id_suffix: 'aussie_preg_double_merle_check',
    day_offset: -42,
    title: '⚠️ MANDATORY: Merle × merle breeding check',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'If both parents are merle-coloured, you may have double-merle puppies. This causes blindness and deafness.',
    detail: 'Double merle (homozygous merle, M/M) puppies are produced when two merle dogs are bred together.\n\nDouble merle results:\n- 25% of litter will be M/M (double merle)\n- Double merle puppies: primarily white, often blind, commonly deaf, may have microphthalmia (abnormally small eyes)\n\nIF BOTH PARENTS ARE MERLE:\n1. Identify any predominantly white puppies at birth\n2. Schedule ophthalmologic exam at 6 weeks for ALL predominantly white puppies\n3. Schedule BAER (hearing) test at 5–6 weeks at specialist centre\n4. Disclose double-merle status to all new owners of white puppies\n5. Never breed merle × merle again\n\nNOTE: This is an entirely preventable welfare crisis. If parents are merle × merle: consider whether these puppies should have been produced at all and ensure all affected puppies receive appropriate care and disclosure.',
    call_vet_if: 'Predominantly white puppies are born — ophthalmologist and BAER specialist needed',
  },
  {
    id_suffix: 'aussie_preg_mdr1_check',
    day_offset: -42,
    title: '⚠️ MDR1 status check — test now if not done',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: '~50% of Aussies carry MDR1 mutation. Test dam now if status unknown.',
    detail: 'MDR1 (ABCB1) affects approximately 50% of Australian Shepherds. The dam\'s status affects:\n\n1. How she is treated during whelping — she cannot receive ivermectin-based products, certain sedatives at standard doses, or loperamide for diarrhoea\n2. Risk assessment for the litter — her genotype determines what proportion of puppies could be affected\n\nDrug risks for MDR1-affected Aussie dam during pregnancy and whelping:\n- Avoid: ivermectin (parasiticide doses), loperamide, selamectin (high dose)\n- Safe: pyrantel, fenbendazole, vaccines, standard anaesthetics with dose adjustment\n\nIf dam is m/m (affected): TELL EVERY VET. Carry a written card noting the MDR1 status.',
  },
  {
    id_suffix: 'aussie_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Puppy count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. Aussie litters of 5–9 require accurate count.',
    detail: 'Pre-whelping X-ray at Day 55–58:\n- Confirm exact puppy count\n- Assess foetal presentation\n- Note any oversized foetuses\n\nWith 7% C-section rate, Aussies are generally good whelpers — but with high double-merle awareness, knowing the count helps identify if any primarily white puppies are expected.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const AUSTRALIAN_SHEPHERD_NEONATAL_EVENTS = [
  {
    id_suffix: 'aussie_neo_double_merle_check',
    day_offset: 0,
    title: 'Day 0: Identify double merle puppies',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'At birth, identify any primarily white puppies for immediate specialist screening.',
    detail: 'At birth — identify any puppy that is predominantly white, especially with blue or "wall" eyes:\n\n- These puppies may be double merle (M/M genotype)\n- Examine eyes at birth: check for microphthalmia (very small eyes), colobomas (visible structural defects)\n- Any puppy with abnormal eye appearance needs urgent ophthalmologist referral\n\nSchedule at 5–6 weeks:\n- BAER hearing test at specialist centre\n- Full ophthalmologic exam\n\nDisclose to new owners:\n- Unilaterally deaf Aussies can live normal companion lives with appropriate management\n- Bilaterally deaf Aussies require specialised training (hand signals, vibration-based communication)\n- Blind or low-vision Aussies can also adapt well with an appropriate owner',
    call_vet_if: 'Any puppy is born with visibly abnormal eyes or is predominantly white in a merle × merle litter',
  },
  {
    id_suffix: 'aussie_neo_cea_window',
    day_offset: 42,
    title: '⚠️ CRITICAL: CEA exam must happen this week (6–9 week window)',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'The ophthalmologic window for detecting Collie Eye Anomaly closes at 9 weeks. Book NOW.',
    detail: 'Collie Eye Anomaly (CEA) causes lesions in the choroid layer of the eye. These are visible on ophthalmologic exam in young puppies but normalise (appear normal) after 9–12 weeks — a phenomenon called "go-normal."\n\nThis means you have ONE CHANCE to detect CEA ophthalmologically: between 6 and 9 weeks of age.\n\nAction required THIS WEEK:\n1. Book every puppy for a CAER ophthalmologic exam with a board-certified ophthalmologist (not a general vet — this requires specialist equipment)\n2. Exams must be completed before 9 weeks\n3. Document results for every puppy\n4. Disclose results to all new owners\n\nNote: DNA testing (NHEJ1 gene) can be done at any age and is the definitive test for genetic status. But the ophthalmologic severity assessment can only be done in this window.',
    call_vet_if: 'You cannot book a board-certified ophthalmologist exam before the puppies reach 9 weeks of age',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const AUSTRALIAN_SHEPHERD_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'aussie_social_week3_reserved',
    day_offset: 21,
    title: 'Socialization Week 3: Aussies can be stranger-reserved — address now',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Australian Shepherds have a breed-standard tendency to be reserved with strangers. Under-socialisation makes this reactive.',
    detail: 'The Australian Shepherd breed standard describes the breed as "reserved with strangers." In practice, this means an under-socialised Aussie becomes fearful or reactive toward unfamiliar people.\n\nFrom Week 3 — deliberate diverse human exposure:\n- 8–10 different people per puppy this week\n- Varied demographics — specifically target: men, children, people wearing hats or uniforms\n- Instruct handlers: no reaching over the puppy, let the puppy approach first, crouch to their level\n- If any puppy backs away or shows alarm: handler drops a treat nearby without looking at the puppy (treats from the scary person = positive association)\n\nA well-socialised Aussie is confident and approachable despite being discerning. The goal is not friendliness to all — it is absence of fear.',
  },
  {
    id_suffix: 'aussie_social_week4_no_laser',
    day_offset: 28,
    title: 'Socialization Week 4: NO laser pointers — high OCD risk',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Aussies have same laser pointer/shadow compulsion risk as Border Collies. Ban this entirely.',
    detail: 'Australian Shepherds share Border Collies\' vulnerability to compulsive light/shadow chasing triggered by laser pointers.\n\nNEVER use with Aussie puppies:\n- Laser pointers\n- Flashlight games\n- Shadow chasing\n\nAppropriate outlets for the herding instinct:\n- Flirt pole (feather on a wand) — engages chase instinct with a real, catchable object\n- Fetch with a ball — herds the ball back to you\n- Treibball (herding large balls) — appropriate channeling of herding drive\n- Herding sheep (if available) — the ideal outlet\n\nInform new owners: Aussies with compulsive light-chasing disorder are difficult to treat and suffer significant welfare compromise. Prevention is the only reliable approach.',
  },
  {
    id_suffix: 'aussie_social_week5_children',
    day_offset: 35,
    title: 'Socialization Week 5: Child-specific exposure critical',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Aussies may attempt to herd children. Early child exposure changes this pattern.',
    detail: 'Australian Shepherds will attempt to herd children — specifically running or screaming children. This includes ankle nipping and circling.\n\nFrom Week 5:\n1. Introduce children aged 4–12 in controlled settings\n2. Children walk calmly near puppies initially — no running\n3. Gradually introduce children playing normally nearby\n4. When any puppy stares or crouches at a child: interrupt calmly, redirect to toy\n5. Reward calm observation of active children\n\nA bonus: Aussies that have been extensively exposed to children often become extraordinary family dogs — protective, gentle, engaged. The issue is when this hasn\'t happened.',
  },
  {
    id_suffix: 'aussie_social_week6_independence',
    day_offset: 42,
    title: 'Socialization Week 6: Independence training — Aussies are velcro dogs',
    category: 'socialization' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Aussies are intensely bonded to their person and prone to separation anxiety without preparation.',
    detail: 'Australian Shepherds bond intensely with their primary person. Without preparation, this becomes separation anxiety — one of the most common reasons Aussies are surrendered.\n\nFrom Week 6:\n1. Structured alone time: 10 minutes in a pen/crate with a food-stuffed Kong\n2. Increase to 20 minutes by Week 7, 30 by Week 8\n3. Rotate which human the puppy bonds with — all family members, not just one person\n4. Calm departures and arrivals — no dramatic hellos and goodbyes\n\nInform new owners:\n- Crate training is essential before the puppy goes home\n- Practice leaving for 10 minutes, returning calmly, building to hours gradually\n- An Aussie that has never been separated before going home at 8 weeks will have extreme separation anxiety',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const AUSTRALIAN_SHEPHERD_TRAINING_EVENTS = [
  {
    id_suffix: 'aussie_training_work',
    day_offset: 35,
    title: 'Begin structured training: Week 5',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Aussies are the #6 most intelligent breed. Structured training from Week 5 is essential.',
    detail: 'Australian Shepherds need a job. An untrained, understimulated Aussie becomes destructive, obsessive, and hard to live with.\n\nFrom Week 5:\n- Sit (lure with food, mark "yes", reward)\n- Down (from sit, lure to floor)\n- Name recognition\n- Come — always reward with celebration\n- Stay — 2 seconds initially, build to 30 seconds by Week 8\n\nInform new owners:\n- Aussies excel at agility, flyball, herding, nosework, obedience\n- A minimum of 2 hours of exercise and 30 minutes of training DAILY as adult\n- Without this, expect barking, chewing, fence-running, and obsessive behaviours\n- This is not a casual pet — it is a working partner that happens to live in a house',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const AUSTRALIAN_SHEPHERD_HEALTH_RISKS = [
  {
    condition: 'MDR1 Drug Toxicity',
    timing: 'Any time an affected dog receives a sensitive drug',
    risk_level: 'critical' as const,
    signs: ['Tremors or seizures after drug administration', 'Vomiting, diarrhoea', 'Severe incoordination', 'Coma'],
    immediate_action: 'EMERGENCY VET IMMEDIATELY. Bring all drug packaging. State: MDR1 mutation present.',
    vet_decision: 'Emergency vet — no delay.',
    note: '~50% of Aussies carry ≥1 mutant allele. This is the single most important preventive test for the breed.',
  },
  {
    condition: 'Double Merle complications (if applicable)',
    timing: 'Present from birth',
    risk_level: 'critical' as const,
    signs: ['Primarily white coat in merle × merle litter', 'Small or structurally abnormal eyes', 'No response to sound (bilateral deafness)', 'Bumping into objects (vision impairment)'],
    immediate_action: 'Ophthalmologist at 6 weeks, BAER test at 5–6 weeks. Specialist referral for management.',
    vet_decision: 'Book specialist at 5–6 weeks — do not delay.',
    note: 'NEVER breed merle × merle. This is entirely preventable.',
  },
  {
    condition: 'CEA (Collie Eye Anomaly)',
    timing: 'Detectable 6–9 weeks ophthalmologically; DNA test any age',
    risk_level: 'high' as const,
    signs: ['Vision impairment (in severe cases)', 'May show no signs in mild cases (choroidal hypoplasia only)'],
    immediate_action: 'Schedule ophthalmologist exam between 6–9 weeks. DNA test at any age.',
    vet_decision: 'Book within the 6–9 week window. No emergency treatment but early detection guides breeding decisions.',
  },
  {
    condition: 'Epilepsy',
    timing: 'Typically first seizure 6 months to 3 years',
    risk_level: 'high' as const,
    signs: ['Loss of consciousness or muscle control', 'Paddling legs', 'Urination or defecation during episode', 'Confusion after episode (post-ictal phase)'],
    immediate_action: 'Do not put hands near mouth during seizure. Time the seizure. Emergency vet if seizure >5 minutes or multiple seizures in 24 hours.',
    vet_decision: 'Call vet after first seizure. Emergency vet for seizures >5 minutes.',
  },
];
