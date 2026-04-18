/**
 * INFO BASE: CAVAPOO
 * Applies to: Cavapoo (Cavalier King Charles Spaniel × Toy or Miniature Poodle)
 * Info base ID: 'cavapoo'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'cavapoo'.
 *
 * Sources: cavalierhealth.org (MVD Breeding Protocol — MANDATORY for CKCS parent),
 * Beardow/Buchanan/Luis Fuentes/Keene/Swenson 1996/1998 MVD Protocol,
 * Madsen 2016 PMC4913653 (73% murmur reduction in 8-10 years from Danish protocol),
 * PMC8065390 (100% CKCS MVD by age 8 by echo — peer-reviewed),
 * Parker/Knowler 2011 PubMed 21672954 (SM 25% at 12 mo, 70% at 72+ mo),
 * Thøfner 2015 PMC4858089 (symptomatic SM 15.4%),
 * Limpens 2024 PMC10859423 (breeding two SM-affected triples offspring odds),
 * Gill 2012 PMC3898273 (EFS BCAN gene, carrier 12.9–19.1%),
 * O'Neill 2021 VetCompass (otitis externa OR 1.92),
 * Bryson/O'Neill 2024 PLOS ONE (hybrid vigor NOT demonstrated),
 * Baltutis et al. Clinical Theriogenology (CKCS gestation 62.8 ± 2.0 days),
 * Cornell CVM, Merck Vet Manual, VCA Animal Hospitals.
 *
 * ⚠️ CRITICAL FLAGS:
 * - MVD (Mitral Valve Disease): CKCS parent — 50% murmur by 5, 100% by 8 (PMC8065390)
 *   Cavapoo INHERITS MVD risk from BOTH parents (CKCS + Poodle both predisposed)
 *   MVD BREEDING PROTOCOL IS MANDATORY — applies to Cavapoo breeding (cavalierhealth.org)
 *   No peer-reviewed evidence hybrid vigor reduces MVD — do NOT claim it does
 * - Syringomyelia: CKCS 25% at 12 mo, 70% at 72+ mo; passes to Cavapoos
 * - EFS (Episodic Falling Syndrome): BCAN gene — CKCS carrier 12.9–19.1%
 * - CCS/Dry Eye (FAM83H): CKCS carrier 10.8%, severe phenotype
 * - CKCS gestation SHORTER: 62.8 ± 2.0 days — elective C-sections earlier (day 60–62)
 * - Hypoglycemia risk depends on Poodle parent: Toy Poodle parent = HIGH; Mini = MEDIUM
 * - Otitis externa: OR 1.92 (O'Neill 2021)
 */

export const CAVAPOO_PROFILE = {
  gestation_days_typical: 62,    // CKCS-specific: Baltutis et al. 62.8 ± 2.0 days
  gestation_days_range: { min: 58, max: 66 },
  avg_litter_size: { min: 2, max: 6, typical: 4 },    // EXTRAPOLATED from parent breed averages
  newborn_weight_grams: {
    toy_cavapoo:  { min: 100, max: 180, typical: 140 },   // Toy Poodle parent — EXTRAPOLATED
    mini_cavapoo: { min: 150, max: 250, typical: 200 },   // Mini Poodle parent — EXTRAPOLATED
  },
  newborn_weight_grams_default: { min: 120, max: 230, typical: 175 },
  adult_weight_kg: {
    toy_cavapoo:  { min: 3.2, max: 6.3 },
    mini_cavapoo: { min: 4.5, max: 9   },
  },
  size_category: 'small' as const,
  // Hypoglycemia risk: TOY parent = 'high'; MINI parent = 'medium'
  // Default to 'medium' — app should override based on known Poodle parent type
  hypoglycemia_risk: 'medium' as const,
  singleton_risk: true,    // Small breed with singleton risk
  csection_rate_percent: 18,   // EXTRAPOLATED; elevated for singletons/small litters
  brachycephalic: true,        // CKCS mildly brachycephalic; flag for anaesthesia

  weight_targets: {
    // Mini Cavapoo values (most common)
    birth:  { min: 120, max: 250,  typical: 185  },
    day_7:  { min: 220, max: 450,  typical: 335  },
    day_14: { min: 320, max: 635,  typical: 480  },
    week_3: { min: 450, max: 910,  typical: 680  },
    week_4: { min: 640, max: 1280, typical: 960  },
    week_6: { min: 1060, max: 2130, typical: 1595 },
    week_8: { min: 1430, max: 2870, typical: 2150 },
  },

  daily_gain_minimum_grams: 8,
  daily_gain_target_grams: 15,
  daily_gain_percent_bodyweight: 7,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 2.0, max: 4.5, per_100g_body_weight: 1.5 },
    week_2: { min: 3.5, max: 7.5, per_100g_body_weight: 1.8 },
    week_3: { min: 5.0, max: 11,  per_100g_body_weight: 2.0 },
    week_4: { min: 8.0, max: 16,  per_100g_body_weight: 2.5 },
  },
  // For Toy Cavapoo <150g birth weight: q1.5–2h (90-min interval appropriate)
  // For Mini Cavapoo ≥150g: standard q2h
  feeding_frequency_hours: {
    week_1: 2,      // Use 1.5h if Toy Cavapoo or any puppy under 120g
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 5,    // 3.5 Fr for Toy Cavapoo pups <150g; 5 Fr for Mini Cavapoo
  max_stomach_capacity_ml_per_100g: 4,

  whelping_box_temp_celsius: {
    week_1:      { min: 29.5, max: 32, ideal: 30.5 },
    week_2:      { min: 27,   max: 30, ideal: 28.5 },
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
    small_litter: { w: 75, d: 75 },
    large_litter:  { w: 90, d: 90 },
    pig_rail_height_cm: 6,
    wall_height_cm: 30,
  },
};

export const CAVAPOO_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, label: 'First deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg — 1 cc syringe for Toy Cavapoos', targets: ['roundworms', 'hookworms'], plain_english: 'Give worm treatment to all Cavapoo puppies. Toy Cavapoo pups at 2 weeks may weigh only 200–300g — measure dose with a 1 cc syringe for precision. Never estimate.', vet_required: false, critical: true },
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
    { week: 6,  label: 'First vaccination', vaccine: 'DHPP #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'First vaccination 6-8 weeks. Feed before the vet visit — medium/high hypoglycemia risk. Keep warm. Have Karo syrup available.', vet_required: true, critical: true },
    { week: 10, label: 'Second vaccination', vaccine: 'DHPP #2', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'Second vaccination. Discuss Lepto timing — consider separate visit for small Cavapoos.', vet_required: true, critical: true },
    { week: 14, label: 'Third vaccination', vaccine: 'DHPP #3 + Rabies', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'], plain_english: 'Third vaccination series plus Rabies.', vet_required: true, critical: true },
    { week: 18, label: 'Final parvo booster', vaccine: 'DHPP #4 (final)', covers: ['Distemper', 'Parvovirus'], plain_english: 'Do not skip.', vet_required: true, critical: true },
  ],
  vet_visits: [
    { day: 0,   label: 'Post-whelping dam check — CKCS shorter gestation', urgency: 'within_24_hours', plain_english: 'Vet check within 24 hours. CKCS gestation is 62.8 ± 2.0 days — shorter than standard. If elective C-section was performed at day 60–62 per CKCS protocol, monitor dam and puppies carefully for prematurity signs. Confirm all placentas passed, milk supply starting.', critical: true },
    { week: 1,  label: 'Dam and litter check', urgency: 'day_7', plain_english: 'One-week check. Confirm all puppies gaining. Monitor Toy Cavapoo pups for hypoglycemia — feed before and after vet visit.', critical: true },
    { week: 6,  label: 'Puppy wellness + cardiac auscultation + SM awareness', urgency: 'week_6_to_8', plain_english: 'First vet visit. Vaccinations, full physical. REQUEST SPECIFICALLY: cardiac auscultation for murmur (MVD can occasionally be detected early). EFS DNA test results if done. Ear inspection — otitis risk OR 1.92. Brief new owners on MVD Sleeping Respiratory Rate monitoring and SM phantom scratching signs.', critical: true },
    { week: 8,  label: 'Pre-rehoming health check', urgency: 'before_leaving', plain_english: 'Final check. ALL DNA results in writing. CRITICAL: every Cavapoo owner must receive the MVD Sleeping Respiratory Rate monitoring protocol in writing and the SM phantom scratching awareness briefing. Harness only — never collar (SM neck pain). Hypoglycemia protocol for Toy Cavapoo owners.', critical: true },
  ],
  breed_specific_screenings: [
    {
      name: '⚠️ MVD Breeding Protocol — MANDATORY (cavalierhealth.org)',
      timing: 'CKCS parent must be ≥2.5 years, murmur-free by board-certified cardiologist. Both parents of CKCS parent murmur-free at age 5.',
      method: 'Annual cardiologist auscultation; echo from 2.5 years for CKCS parent',
      plain_english: 'The MVD Breeding Protocol (Beardow 1996, Buchanan 1998) is the most evidence-based intervention in Cavalier health. The Danish mandatory scheme achieved a 73% reduction in early-onset MVD in 8–10 years (Madsen 2016, PMC4913653). cavalierhealth.org explicitly states the protocol applies to ANY breeding involving a Cavalier, including Cavapoos. Requirements: CKCS parent must be ≥2.5 years old with no murmur on cardiologist exam; both parents of the CKCS parent must have been murmur-free at age 5. Also require: Poodle parent has normal echo by cardiologist.',
      mandatory_for_breeding: true,
    },
    {
      name: 'SM/CM — BVA/KC MRI scheme',
      timing: 'MRI at ≥3 years for CKCS parent (preferably ≥2.5 years for breeding)',
      method: 'MRI by BVA/KC approved scanner; scheme grade A/B for breeding',
      plain_english: 'Up to 95% of CKCS have Chiari-like Malformation; symptomatic SM 15.4% (Thøfner 2015). Limpens 2024 found breeding two SM-affected dogs triples offspring odds of being affected. MRI both parents where possible — at minimum, the CKCS parent. A/A* grade on KC SM scheme is the target.',
      mandatory_for_breeding: true,
    },
    {
      name: 'EFS — Episodic Falling Syndrome (BCAN)',
      timing: 'DNA test CKCS parent — carrier 12.9–19.1%, affected 3.7%',
      method: 'DNA test (Animal Genetics, CAGT — BCAN 15.7kb deletion)',
      plain_english: 'EFS causes sudden muscle stiffness and collapse during exercise or excitement. The dog is CONSCIOUS during episodes (distinguishes from epilepsy). Autosomal recessive. CKCS carrier rate 12.9–19.1%. DNA test CKCS parent. If Poodle parent has Cavalier-adjacent ancestry (rare), test them too.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CCS/Dry Eye — FAM83H',
      timing: 'DNA test CKCS parent — carrier 10.8%, affected 0.4%',
      method: 'DNA test',
      plain_english: 'Congenital Keratoconjunctivitis Sicca/Ichthyosiform Dermatosis. Severe phenotype: congenital dry eye, rough coat, nail dystrophy. Often fatal/euthanised. DNA test CKCS parent.',
      mandatory_for_breeding: true,
    },
    {
      name: 'prcd-PRA',
      timing: 'DNA test Poodle parent — both parents ideally',
      method: 'DNA test (UC Davis VGL)',
      plain_english: 'PRA from Poodle side. Clear × clear mandatory.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia and Patellar luxation',
      timing: 'OFA/PennHIP at 24 months; patella from 12 months',
      method: 'OFA radiograph + patellar grading',
      plain_english: 'Both CKCS (~15.5% OFA dysplastic) and small Poodles (patellar luxation elevated) contribute orthopaedic risk. OFA hip and patella for both parents.',
      mandatory_for_breeding: true,
    },
  ],
};

export const CAVAPOO_PREGNANCY_EVENTS = [
  {
    id_suffix: 'cavapoo_preg_mvd_protocol_check',
    day_offset: -42,
    title: '⚠️ CRITICAL: Confirm CKCS parent meets full MVD Breeding Protocol',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'MVD is the most important inherited condition in Cavapoos. The breeding protocol requires confirmation now — before this litter is born.',
    detail: 'MVD (Mitral Valve Disease) is the leading cause of death in Cavalier King Charles Spaniels — and because Cavapoos inherit from a CKCS parent, they carry the same risk.\n\nPeer-reviewed facts:\n- 50% of CKCS have MVD by age 5\n- 100% of CKCS have MVD by age 8 by echocardiography (PMC8065390)\n- Both Poodles and CKCS are predisposed to MVD — Cavapoos inherit from BOTH sides\n- NO peer-reviewed evidence that hybrid vigor reduces or delays MVD in Cavapoos\n\nThe MVD Breeding Protocol (cavalierhealth.org):\n1. CKCS parent must be ≥2.5 years old at time of breeding\n2. CKCS parent must be murmur-free on cardiologist auscultation at that age\n3. BOTH parents of the CKCS parent must have been murmur-free at age 5\n4. Poodle parent should also have normal cardiologist echo\n\nDanish mandatory scheme following this protocol produced a 73% reduction in early-onset MVD (Madsen 2016, PMC4913653).\n\nIf CKCS parent has NOT met this protocol: you are producing puppies with significantly elevated MVD risk. This is documented, preventable, and your responsibility as a breeder.\n\nGive every new owner the Sleeping Respiratory Rate monitoring protocol in writing.',
    call_vet_if: 'CKCS parent has a murmur or is on cardiac medication',
  },
  {
    id_suffix: 'cavapoo_preg_shorter_gestation',
    day_offset: -10,
    title: '⚠️ CKCS gestation is SHORTER — elective C-section at Day 60–62, not 63',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'CKCS-specific peer-reviewed data: gestation 62.8 ± 2.0 days post-ovulation. Schedule earlier.',
    detail: 'Baltutis et al. (Clinical Theriogenology) documented CKCS gestation as 62.8 ± 2.0 days post-ovulation — approximately 2 days shorter than the standard canine 64–65 days.\n\nFor Cavapoo dams with a CKCS dam (the Cavapoo dam IS the CKCS × Poodle cross):\n- If elective C-section is planned: schedule for day 60–62 post-ovulation, NOT day 63–65\n- Waiting until Day 63+ in a CKCS-ancestry litter risks inadvertent dystocia from prolonged gestation\n\nFor natural whelping:\n- Be prepared from Day 58 onwards\n- Do not assume whelping is "late" at Day 61 — it is on schedule for this breed combination\n\nThis is the type of breed-specific clinical detail that can prevent unnecessary emergency interventions.',
    emergency_contact_recommended: true,
  },
];

export const CAVAPOO_NEONATAL_EVENTS = [
  {
    id_suffix: 'cavapoo_neo_hypoglycemia_toy',
    day_offset: 0,
    title: '⚠️ Toy Cavapoo (<150g): Feed every 90 MINUTES in Week 1',
    category: 'nutrition' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Toy Cavapoo neonates <150g have the same hypoglycemia risk as Chihuahuas. 90-minute feeding is appropriate for this size.',
    detail: 'Feeding frequency depends on puppy size at birth:\n\nTOY CAVAPOO (Toy Poodle parent, birth weight <150g):\n- Feed every 90 MINUTES in Week 1\n- 1.5 ml per 100g body weight per feed\n- Tube size: French 3.5\n- Same hypoglycemia protocol as Chihuahua\n\nMINI CAVAPOO (Mini Poodle parent, birth weight 150–250g):\n- Feed every 2 hours in Week 1\n- Standard small breed protocol\n- Tube size: French 5\n\nHYPOGLYCEMIA EMERGENCY (both sizes):\n1. WARM FIRST — cold puppy cannot absorb glucose\n2. Rub Karo corn syrup on gums — transmucosal absorption, no swallowing needed\n3. Emergency vet within 30 minutes regardless of recovery\n\nSigns: lethargy, trembling, pale gums, seizure.',
    call_vet_if: 'Any hypoglycemia symptoms — emergency vet within 30 minutes',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'cavapoo_neo_mvd_srr_protocol',
    day_offset: 35,
    title: 'Week 5: MVD Sleeping Respiratory Rate monitoring — give every new owner this protocol',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Sleeping Respiratory Rate is the earliest home indicator of early heart failure in Cavapoos — give this protocol to every new owner before they take the puppy home.',
    detail: 'MVD (Mitral Valve Disease) causes heart failure by accumulating fluid in the lungs. The earliest detectable home sign is increased breathing rate during sleep — before it is visible to the naked eye.\n\nSLEEPING RESPIRATORY RATE MONITORING:\n1. Watch the dog sleeping (not dreaming)\n2. Count the number of times the chest rises in 30 seconds\n3. Multiply by 2 = breaths per minute\n4. Normal sleeping rate: below 30 breaths per minute\n\nACTION THRESHOLDS:\n- 25–29/min: Normal. Continue weekly monitoring.\n- 30+/min: Call vet within 24 hours\n- 35+/min: Call vet same day\n- 40+/min: Emergency vet immediately\n\nWhen to start monitoring:\n- Build the weekly habit from Day 1 of ownership\n- The value of this monitoring is catching early heart failure before it becomes crisis\n\nWhy this matters: When a Cavapoo\'s heart starts to fail, fluid builds in the lungs. A rising SRR is the first detectable sign — medication changes at this point can prevent acute heart failure crisis.\n\nProvide this written protocol to every new Cavapoo owner.',
  },
  {
    id_suffix: 'cavapoo_neo_sm_awareness',
    day_offset: 42,
    title: 'Week 6: SM phantom scratching awareness — brief every new owner before they leave',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Syringomyelia is the second most important health concern in Cavapoos after MVD. Early recognition saves pain and improves prognosis.',
    detail: 'Syringomyelia (SM) affects up to 95% of CKCS for Chiari-like Malformation and up to 70% develop SM by 6 years (Parker/Knowler 2011). Cavapoos inherit this risk from the CKCS parent.\n\nSM causes spinal cord compression and significant pain. The most characteristic early sign is PHANTOM SCRATCHING.\n\nEARLY SIGNS (often missed by owners not briefed):\n- Dog scratches at neck or shoulder WITHOUT SKIN CONTACT — the paw is directed at the neck or ear area but never touches. This is pain from spinal cord compression, not an itch.\n- Scratching episodes associated with excitement, being on lead, or touching the collar area\n- Yelping when picked up around the body\n- Reluctance to be touched around the head or neck\n- Head-shy behaviour — pulling away from head petting\n- Reluctance to use stairs or jump\n\nCRITICAL POINT: Replace neck collar with HARNESS IMMEDIATELY. Neck collar pressure directly worsens SM pain and triggers phantom scratching episodes.\n\nManagement: Gabapentin, pregabalin, omeprazole, NSAIDs. Surgery available for severe cases. Most Cavapoos can be managed medically to a good quality of life.\n\nGive every new Cavapoo owner this information in writing and brief them verbally.',
    call_vet_if: 'Any dog shows phantom scratching at neck, yelps when collar touched, or is suddenly head-shy',
  },
];

export const CAVAPOO_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'cavapoo_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Velcro personality — independence training from Day 21',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Cavapoos inherit the Cavalier velcro temperament. Separation anxiety prevention from Week 3.',
    detail: 'CKCS are bred as companion dogs — they follow their person everywhere. Poodles are highly bonded to their family. Cavapoos can be intensely velcro.\n\nFrom Week 3:\n1. Brief separations: 5 minutes alone in a crate/pen with food toy from Day 21\n2. Build to 20 minutes by Week 6, 30–40 by Week 8\n3. Rotate handlers — not just one person\n4. Calm departures and arrivals\n\nInform new owners:\n- Crate training is essential for Cavapoos — it is welfare-protective, not punishment\n- A Cavapoo that has never been alone before going home will be distressed every time the owner leaves\n- Build alone time from Week 8 through 12 weeks, graduating from minutes to hours',
  },
];

export const CAVAPOO_TRAINING_EVENTS = [
  {
    id_suffix: 'cavapoo_training_harness_only',
    day_offset: 35,
    title: 'HARNESS ONLY — SM neck pain makes collar use medically contraindicated',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Given SM risk from the CKCS side, neck collars are medically contraindicated for Cavapoos. Harness from Week 5.',
    detail: 'Neck collars on Cavapoos with syringomyelia cause direct pressure on the pain area and trigger scratching episodes.\n\nGiven that up to 70% of CKCS-descended dogs develop SM by 6 years, EVERY Cavapoo should be managed as if SM is possible — harness from Day 1.\n\nFrom Week 5: introduce a soft H-shaped harness with positive conditioning.\nFrom Week 6: short lead practice.\n\nInform every new owner IN WRITING: harness only, for life. This is not a preference — it is medical management.',
  },
];

export const CAVAPOO_HEALTH_RISKS = [
  {
    condition: 'MVD (Mitral Valve Disease)',
    timing: '50% of CKCS have murmur by 5; ~100% by 8 (PMC8065390). Cavapoos inherit risk from BOTH parents.',
    risk_level: 'critical' as const,
    signs: [
      'Murmur detected at routine vet check',
      'Exercise intolerance developing gradually',
      'Coughing, especially at night or after activity',
      'Sleeping respiratory rate above 30/min at rest',
      'Breathing difficulty (late-stage heart failure)',
    ],
    immediate_action: 'Sleeping respiratory rate >30 = call vet within 24 hours. >40 = emergency vet. Breathing difficulty = emergency vet.',
    vet_decision: 'Monitor SRR weekly. Any sustained elevation = urgent vet.',
    note: 'MVD Breeding Protocol achieves 73% reduction in early-onset MVD. No hybrid vigor benefit demonstrated for Cavapoos. SRR monitoring from Day 1 of ownership.',
  },
  {
    condition: 'Syringomyelia / Chiari-like Malformation',
    timing: 'CM present from birth; SM 25% by 12 months, 70% by 6 years (Parker/Knowler 2011)',
    risk_level: 'critical' as const,
    signs: [
      'Phantom scratching at neck/shoulder without skin contact',
      'Yelping when collar area or neck touched',
      'Head-shy behaviour',
      'Reluctance to use stairs or jump',
      'Scoliosis (spinal curvature) in severe cases',
    ],
    immediate_action: 'Harness immediately — remove collar. Urgent vet for neurological referral. MRI confirms diagnosis.',
    vet_decision: 'Urgent vet within 24 hours. Emergency for sudden paralysis.',
    note: 'HARNESS ONLY prevents one major pain trigger. Gabapentin/pregabalin provide significant relief. Surgery available for severe cases.',
  },
  {
    condition: 'EFS — Episodic Falling Syndrome',
    timing: 'Onset typically 14 weeks to 4 years',
    risk_level: 'high' as const,
    signs: [
      'Sudden muscle stiffness and inability to move — "deer stalking" rigid posture',
      'Dog is FULLY CONSCIOUS during the episode',
      'Often triggered by exercise or excitement',
      'Complete recovery within minutes',
    ],
    immediate_action: 'Do not restrain. Let the episode pass. Video the episode if possible. Book vet for diagnosis.',
    vet_decision: 'Call vet for first episode. BCAN DNA test to confirm.',
    note: 'EFS is NOT a seizure — the dog is aware throughout. DNA test CKCS parent. Management: avoid triggers, reduce excitement-based activity.',
  },
];
