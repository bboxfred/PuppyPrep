/**
 * INFO BASE: CAVALIER KING CHARLES SPANIEL
 * Applies to: Cavalier King Charles Spaniel (CKCS)
 * Info base ID: 'cavalier_kcs'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'cavalier_kcs'.
 *
 * Sources: Cavalier Health (cavalierhealth.org), CKCSC-USA,
 * Merck Vet Manual, Birkegård 2016 MVD breeding protocol study,
 * Cornell CVM, VCA Animal Hospitals, AKC.
 *
 * ⚠️ CRITICAL FLAGS:
 * - MVD (Mitral Valve Disease): 20× general dog population. 50% have murmur by 5, ~100% by 10.
 * - MVD BREEDING PROTOCOL: Mandatory cardiologist clearance before breeding
 * - Syringomyelia: MRI protocol, phantom scratching, harness only
 * - Episodic Falling Syndrome: EFS DNA test
 * - Mild brachycephalic considerations
 * - HARNESS ONLY — never collar (SM/CM neck pain risk)
 * - Sleeping respiratory rate monitoring
 */

export const CAVALIER_KCS_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 2, max: 6, typical: 4 },
  newborn_weight_grams: { min: 150, max: 280, typical: 215 },
  adult_weight_kg: {
    male:   { min: 5.9, max: 8.2 },
    female: { min: 5.9, max: 8.2 },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const,
  singleton_risk: false,
  csection_rate_percent: 18,
  brachycephalic: true,   // mild

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

export const CAVALIER_KCS_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Cavalier puppies. Weigh each puppy before dosing.',
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
      plain_english: 'Vet check within 48 hours. Cavalier dams are generally good mothers. Confirm all placentas passed and milk supply is adequate.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm all puppies gaining weight.',
      critical: true,
    },
    {
      week: 6,
      label: '⚠️ Puppy wellness — cardiac auscultation CRITICAL',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. CRITICAL: request careful cardiac auscultation at every puppy visit from this point forward. While a murmur in a 6-week puppy suggests congenital disease (not MVD), any murmur found warrants investigation. Begin the pattern of annual cardiac monitoring that will continue for this dog\'s entire life.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check + cardiac and SM briefing',
      urgency: 'before_leaving',
      plain_english: 'Final check. CRITICAL owner education at rehoming: (1) Annual cardiac auscultation by cardiologist from age 1. (2) Monitor sleeping respiratory rate at home — should be <30 breaths/minute. (3) Harness only — never collar. (4) Know syringomyelia signs (phantom scratching at neck/shoulder). (5) EFS DNA test if not done.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: '⚠️ MVD BREEDING PROTOCOL — MANDATORY',
      timing: 'Both parents MUST meet protocol requirements before breeding',
      method: 'Board-certified cardiologist auscultation + echocardiogram',
      plain_english: 'The MVD Breeding Protocol (1998, peer-reviewed) requires: both parents must be at least 2.5 years old with no heart murmur, AND both maternal and paternal grandparents must have been murmur-free at age 5. Following this protocol produced a 71% reduction in early-onset MVD in Denmark (Birkegård 2016). This is the single most important intervention for Cavalier health. Without this, you are producing puppies with high probability of heart disease by age 5.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Syringomyelia / Chiari Malformation MRI',
      timing: 'BVA/KC CM/SM Scheme: MRI at ≥12 months, ideally ≥2.5 years for breeding',
      method: 'MRI by CKCSC-approved scanner',
      plain_english: 'Syringomyelia (fluid-filled cavities in the spinal cord) and Chiari-like Malformation are common in Cavaliers. Breeding protocol: MRI at ≥12 months (grade A or B for breeding). Inform new owners of all puppy signs: phantom scratching at neck/shoulder without skin contact, yelping when collar touched, head-shy behaviour, reluctance to jump.',
      mandatory_for_breeding: true,
    },
    {
      name: 'EFS DNA test (Episodic Falling Syndrome)',
      timing: 'Any age — cheek swab DNA test',
      method: 'DNA test for BCAN gene mutation',
      plain_english: 'EFS causes sudden muscle stiffness and falling during exercise or excitement — the dog appears to be in a "prayer position." The dog is fully conscious. Autosomal recessive — two copies required for disease. DNA test parents. Inform new owners of affected or carrier puppies.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'OFA hip certification recommended for CKCSC CHIC.',
      mandatory_for_breeding: false,
    },
  ],
};

export const CAVALIER_KCS_PREGNANCY_EVENTS = [
  {
    id_suffix: 'cav_preg_mvd_dam_check',
    day_offset: -42,
    title: '⚠️ Confirm dam has valid cardiologist clearance',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'A Cavalier dam should not be bred without current cardiologist clearance. Confirm now.',
    detail: 'The MVD Breeding Protocol requires the dam to be:\n- Minimum 2.5 years old\n- Clear of heart murmur on cardiologist auscultation\n- From parents that were murmur-free at age 5\n\nIf the dam has a murmur:\n- Do not breed until cleared or wait until murmur-free at older age\n- A murmuring dam passes accelerated MVD genetics to puppies\n\nAlso confirm: if dam has Stage B2 MVD or higher, she is on pimobendan — discuss impact on pregnancy and lactation with your cardiologist.\n\nIf dam is on pimobendan or other cardiac medication: mandatory cardiologist consultation before proceeding.',
    call_vet_if: 'Dam has a murmur or is on cardiac medication',
  },
  {
    id_suffix: 'cav_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Puppy count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. Cavalier litters of 3–5 need accurate count.',
    detail: 'Pre-whelping X-ray at Day 55–58. Cavaliers have 18% C-section rate. Confirm count and confirm no malpresented puppies.\n\nWith mild brachycephalic features: keep whelping environment cool and confirm vet has brachycephalic anaesthesia experience if C-section is needed.',
  },
];

export const CAVALIER_KCS_NEONATAL_EVENTS = [
  {
    id_suffix: 'cav_neo_sleeping_resp_rate',
    day_offset: 21,
    title: 'Week 3: Teach new owners to monitor sleeping respiratory rate',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Sleeping respiratory rate (SRR) is the earliest home indicator of heart failure in Cavaliers.',
    detail: 'Sleeping Respiratory Rate (SRR) monitoring is the single most important home monitoring tool for Cavalier owners.\n\nHow to measure:\n1. Watch the dog sleeping\n2. Count chest rises for 30 seconds\n3. Multiply by 2 = breaths per minute\n4. Normal: below 30 breaths per minute at rest\n\nAction thresholds:\n- 25–29: normal, continue monitoring weekly\n- 30+: call vet within 24 hours\n- 35+: call vet same day\n- 40+: emergency vet immediately\n\nWhy it matters: When a Cavalier\'s heart starts to fail, fluid accumulates in the lungs. This increases breathing rate during sleep before it is visible to the naked eye. A rising SRR is the first detectable sign of early heart failure — caught early, medication changes can prevent crisis.\n\nGive every new owner this measurement protocol in writing. Encourage weekly SRR checks from the day the puppy goes home — building the habit early.',
  },
  {
    id_suffix: 'cav_neo_sm_early_signs',
    day_offset: 35,
    title: 'Week 5: Educate on syringomyelia early signs',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Syringomyelia signs can begin from 6 months. New owners must know what to watch for.',
    detail: 'Syringomyelia (SM) in Cavaliers typically presents between 6 months and 3 years of age.\n\nEARLY SIGNS — often missed:\n- "Phantom scratching" — dog scratches at neck or shoulder area when on lead, during excitement, or when collar is touched — but there is nothing on the skin. The scratching is pain from spinal cord compression, not an itch.\n- Yelping when picked up around the body\n- Reluctance to be touched around the head, neck, or ears\n- Head-shy or collar-shy behaviour\n- Reluctance to jump up or lie down\n- Walking with a "bunny hop" on the rear legs\n\nInform new owners: a Cavalier that scratches its neck when excited, or yelps when its collar is touched, should be seen by a vet and considered for neurological referral. Harness only eliminates one major SM pain trigger.\n\nMedical management (gabapentin, pregabalin, omeprazole, NSAIDs) can significantly improve quality of life.',
  },
];

export const CAVALIER_KCS_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'cav_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Velcro dog — independence is essential',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Cavaliers are bred for constant human companionship. Separation anxiety prevention starts at Week 3.',
    detail: 'Cavalier King Charles Spaniels are the ultimate companion dog — bred specifically to be with their person at all times. This makes them wonderful but also highly prone to separation anxiety.\n\nFrom Week 3:\n- Brief separations: 5 minutes alone with a Kong from Day 21\n- Build to 20 minutes by Week 7\n- Multiple handlers — not just the breeder\n- Calm departures and arrivals — no dramatic goodbyes\n\nInform new owners urgently: a Cavalier that has never been alone before going home will howl, destroy, and be miserable every time the owner leaves. Crate training and graduated alone time before 12 weeks is essential.',
  },
  {
    id_suffix: 'cav_social_week4_people',
    day_offset: 28,
    title: 'Socialization Week 4: People-oriented by nature — build diversity',
    category: 'socialization' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Cavaliers love people. Build on this with diverse exposure.',
    detail: 'Cavaliers are naturally people-oriented — this makes socialisation with humans generally easy. Use the open window to expose to diversity:\n\n- Children (Cavaliers are exceptional family dogs)\n- Elderly people with mobility aids\n- Varied demographics\n- Car travel\n- Novel environments\n\nTarget: 20+ people before going home. Cavaliers that are extensively socialised become the ideal companion dog the breed is known for.',
  },
];

export const CAVALIER_KCS_TRAINING_EVENTS = [
  {
    id_suffix: 'cav_training_harness_sm',
    day_offset: 35,
    title: 'HARNESS ONLY — Syringomyelia neck pain risk',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Neck collars cause pain in Cavaliers with syringomyelia — which may be most of them.',
    detail: 'Cavaliers with syringomyelia experience significant neck and shoulder pain. A neck collar puts direct pressure on the area of pain and can trigger yelping, scratching episodes, and distress.\n\nGiven that syringomyelia affects the majority of Cavaliers to some degree: HARNESS ONLY for every Cavalier, as a breed standard precaution.\n\nIntroduce soft H-harness from Week 5. Pair with positive experiences. Inform every new owner: harness only, for life.',
  },
];

export const CAVALIER_KCS_HEALTH_RISKS = [
  {
    condition: 'MVD (Mitral Valve Disease)',
    timing: '50% of Cavaliers have a murmur by age 5; ~100% by age 10',
    risk_level: 'critical' as const,
    signs: ['Murmur detected at routine check', 'Exercise intolerance', 'Coughing (especially at night)', 'Sleeping respiratory rate above 30/min', 'Breathing difficulty (late heart failure)'],
    immediate_action: 'Sleeping respiratory rate above 30 at rest = call vet within 24 hours. Above 40 = emergency vet. Coughing at night = call vet.',
    vet_decision: 'Monitor SRR weekly. Emergency vet for breathing difficulty.',
    note: 'MVD is the leading cause of death in Cavaliers. EPIC trial: start pimobendan at Stage B2 to delay heart failure by ~15 months.',
  },
  {
    condition: 'Syringomyelia / Chiari-like Malformation',
    timing: 'Typically 6 months to 3 years; can occur at any age',
    risk_level: 'critical' as const,
    signs: ['Phantom scratching at neck/shoulder with no skin contact', 'Yelping when collar or neck area touched', 'Head-shy behaviour', 'Reluctance to jump', 'Bunny-hopping gait'],
    immediate_action: 'Urgent vet — neurological referral for MRI. Harness immediately.',
    vet_decision: 'Urgent vet for first signs. Emergency vet for sudden paralysis.',
    note: 'Harness only eliminates one major pain trigger. Gabapentin, pregabalin, and omeprazole provide significant relief.',
  },
  {
    condition: 'Episodic Falling Syndrome (EFS)',
    timing: 'Typically first episode during exercise or excitement',
    risk_level: 'high' as const,
    signs: ['Sudden "prayer position" posture (front legs out, hindquarters raised)', 'Muscle stiffness', 'Inability to move briefly', 'Dog is fully conscious', 'Resolves completely'],
    immediate_action: 'Do not restrain. Let the episode pass. Book vet for diagnosis. EFS is NOT a seizure — dog is fully aware.',
    vet_decision: 'Call vet for first episode. DNA test to confirm. Not typically an emergency.',
  },
];
