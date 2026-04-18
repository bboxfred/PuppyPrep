/**
 * INFO BASE: STANDARD POODLE
 * Applies to: Standard Poodle
 * Info base ID: 'standard_poodle'
 *
 * Sources: Poodle Club of America, Merck Vet Manual, Cornell CVM, VCA, AKC, OFA.
 * Key risks: Addison's disease, sebaceous adenitis, GDV, NEwS (fatal neonatal seizures),
 * hip dysplasia, PRA, von Willebrand Type I.
 */

export const STANDARD_POODLE_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 4, max: 9, typical: 6 },
  newborn_weight_grams: { min: 300, max: 550, typical: 420 },
  adult_weight_kg: { male: { min: 20, max: 32 }, female: { min: 18, max: 27 } },
  size_category: 'large' as const,
  hypoglycemia_risk: 'low' as const,
  singleton_risk: false,
  csection_rate_percent: 7,
  brachycephalic: false,
  weight_targets: {
    birth:  { min: 300, max: 550,  typical: 420  },
    day_7:  { min: 560, max: 950,  typical: 755  },
    day_14: { min: 800, max: 1300, typical: 1050 },
    week_3: { min: 1150, max: 1900, typical: 1525 },
    week_4: { min: 1650, max: 2700, typical: 2175 },
    week_6: { min: 2750, max: 4500, typical: 3625 },
    week_8: { min: 3800, max: 6200, typical: 5000 },
  },
  daily_gain_minimum_grams: 20,
  daily_gain_target_grams: 40,
  daily_gain_percent_bodyweight: 5,
  dam_lactation_calories_multiplier: { week_1: 1.5, week_2: 2.0, week_3_4: 3.5, week_5: 2.5 },
  formula_volumes_per_feeding_ml: {
    week_1: { min: 7,  max: 12, per_100g_body_weight: 1.8 },
    week_2: { min: 12, max: 18, per_100g_body_weight: 2.0 },
    week_3: { min: 18, max: 26, per_100g_body_weight: 2.5 },
    week_4: { min: 26, max: 38, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: { week_1: 2, week_2: 2.5, week_3: 3, week_4: 4 },
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
  whelping_box_cm: { small_litter: { w: 120, d: 120 }, large_litter: { w: 150, d: 150 }, pig_rail_height_cm: 10, wall_height_cm: 50 },
};

export const STANDARD_POODLE_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, label: 'First deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Give worm treatment to all Standard Poodle puppies. Weigh each puppy before dosing.', vet_required: false, critical: true },
    { day: 28, label: 'Second deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Second treatment. Use current weight.', vet_required: false, critical: true },
    { day: 42, label: 'Third deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily x 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Third treatment — Panacur for 3 days in a row.', vet_required: false, critical: true },
    { day: 56, label: 'Fourth deworming (pre-rehoming)', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily x 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Final deworming. Panacur for 3 days.', vet_required: false, critical: true },
  ],
  dam_deworming: {
    start_day_of_pregnancy: 40,
    end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)',
    dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth. If dam has Addisons disease: discuss with vet before any protocol change.',
    critical: true,
  },
  vaccinations: [
    { week: 6,  label: 'First vaccination',  vaccine: 'DHPP #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'First vaccination at 6-8 weeks.', vet_required: true, critical: true },
    { week: 10, label: 'Second vaccination', vaccine: 'DHPP #2 + Leptospirosis #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'], plain_english: 'Second vaccination plus first Lepto dose.', vet_required: true, critical: true },
    { week: 14, label: 'Third vaccination',  vaccine: 'DHPP #3 + Leptospirosis #2 + Rabies', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis', 'Rabies'], plain_english: 'Third vaccination series plus Rabies.', vet_required: true, critical: true },
    { week: 18, label: 'Final parvo booster', vaccine: 'DHPP #4 (final)', covers: ['Distemper', 'Parvovirus'], plain_english: 'CRITICAL: Do not skip. Ensures full parvo protection.', vet_required: true, critical: true },
  ],
  vet_visits: [
    { day: 0,   label: 'Post-whelping dam check', urgency: 'within_48_hours', plain_english: 'Vet check within 48 hours. If dam has Addisons disease: monitor for Addisonian crisis signs — weakness, vomiting, collapse. Confirm all placentas passed.', critical: true },
    { week: 1,  label: 'Dam and litter check + NEwS watch', urgency: 'day_7', plain_english: 'One-week check. Any puppy with seizures from birth through 6 weeks needs urgent NEwS investigation — fatal condition in Standard Poodles.', critical: true },
    { week: 6,  label: 'Puppy wellness + SA skin check + GDV prevention', urgency: 'week_6_to_8', plain_english: 'First vet visit. Vaccinations, full physical. Assess skin/coat for early sebaceous adenitis signs. Discuss GDV prevention: meal frequency, no elevated bowls, exercise timing, prophylactic gastropexy.', critical: true },
    { week: 8,  label: 'Pre-rehoming health check', urgency: 'before_leaving', plain_english: 'Final check. Inform new owners: Addisons disease awareness, GDV prevention protocol, SA annual skin biopsy from age 2, PRA DNA test status.', critical: true },
  ],
  breed_specific_screenings: [
    { name: 'NEwS DNA test', timing: 'Test both parents before breeding — fatal neonatal seizures', method: 'DNA test for ATF2 gene mutation', plain_english: 'NEwS causes fatal seizures in Standard Poodle puppies (Week 1-6). Autosomal recessive. Test both parents. Any puppy with neonatal seizures: emergency vet and DNA test immediately.', mandatory_for_breeding: true },
    { name: 'Sebaceous Adenitis (SA)', timing: 'OFA skin biopsy from age 2; watch from 1 year', method: 'OFA registered skin punch biopsy', plain_english: 'SA causes progressive hair loss, silvery scaling, and musty odour. Annual OFA skin biopsy required for responsible breeding. Manageable with medicated shampoos and cyclosporine.', mandatory_for_breeding: true },
    { name: 'Hip dysplasia', timing: 'OFA at 24 months', method: 'OFA radiograph', plain_english: 'OFA hip certification required for PCA CHIC.', mandatory_for_breeding: true },
    { name: 'PRA (prcd-PRA)', timing: 'DNA test any age; annual CAER', method: 'DNA test + CAER ophthalmologist exam', plain_english: 'Progressive retinal atrophy causes blindness. DNA test breeding stock.', mandatory_for_breeding: true },
  ],
};

export const STANDARD_POODLE_PREGNANCY_EVENTS = [
  {
    id_suffix: 'stdpoodle_preg_news_test',
    day_offset: -42,
    title: 'WARNING: NEwS DNA test — confirm both parents tested',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'NEwS (fatal neonatal seizures) is preventable with DNA testing. Confirm now.',
    detail: 'NEwS (Neonatal Encephalopathy with Seizures) causes fatal seizures in Standard Poodle puppies (typically Week 1-6).\n\nIf both parents are NEwS carriers (N/NEwS x N/NEwS): 25% of the litter will be affected and will die.\n\nIf you have not tested both parents: order DNA tests immediately — results take 2-3 weeks.\n\nIf either parent is N/NEwS (carrier): watch every puppy for seizures from birth and test urgently if any appear.',
    call_vet_if: 'Any puppy has a seizure from birth through 6 weeks',
  },
  {
    id_suffix: 'stdpoodle_preg_gdv_prevention',
    day_offset: -28,
    title: 'GDV prevention: Feed small meals from today',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Standard Poodles are deep-chested GDV-risk dogs. Pregnancy increases the risk further.',
    detail: 'From today:\n1. Feed 3-4 small meals daily — no single large meals\n2. No exercise 1 hour before or 2 hours after eating\n3. No elevated food bowls\n4. Keep feeding calm\n\nDiscuss prophylactic gastropexy with vet — the most effective GDV prevention available.\n\nGDV EMERGENCY SIGNS: unproductive retching, drum-hard distended abdomen, extreme restlessness, pale gums.\nFATAL WITHIN 1-2 HOURS WITHOUT SURGERY — RUSH TO EMERGENCY VET.',
    emergency_contact_recommended: true,
  },
];

export const STANDARD_POODLE_NEONATAL_EVENTS = [
  {
    id_suffix: 'stdpoodle_neo_news_watch',
    day_offset: 0,
    title: 'Days 0-42: NEwS seizure watch — any seizure is an emergency',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'NEwS causes fatal seizures in Standard Poodle puppies. Monitor all puppies from birth.',
    detail: 'Watch every puppy from birth through 6 weeks for:\n- Seizure activity (paddling, muscle rigidity, loss of consciousness)\n- Abnormal tremors\n- Failure to develop alongside littermates\n\nNEwS seizures typically begin Week 1-3 and are progressive.\n\nAny seizure in a neonate = EMERGENCY VET + DNA test immediately.\n\nAffected puppies should be humanely euthanised — no treatment available and progression is fatal.',
    call_vet_if: 'Any puppy has a seizure or tremors — emergency vet',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'stdpoodle_neo_grooming',
    day_offset: 21,
    title: 'Week 3: Grooming desensitization starts now',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Standard Poodles need professional grooming every 6-8 weeks for life. Begin desensitization now.',
    detail: 'From Week 3:\n1. Daily soft brush, 5 minutes per puppy\n2. Ear handling and gentle cleaning\n3. Clipper sound desensitization at distance\n4. Face and muzzle handling\n5. Paw handling for nail trims\n\nA Standard Poodle that was not grooming-desensitized requires sedation at every grooming appointment — expensive and stressful for the dog.',
  },
];

export const STANDARD_POODLE_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'stdpoodle_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Intelligence needs engagement from the start',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Standard Poodles are the #2 most intelligent breed. Mental stimulation from Week 3 prevents obsessive behaviours.',
    detail: 'From Week 3:\n- Daily 5-10 minute handling by diverse people\n- Novel object exploration — reward curiosity\n- Sound desensitization — Poodles can be noise sensitive\n- Brief puzzle feeding from Week 4\n\nInform new owners: Standard Poodles need 30 minutes of training AND 60-90 minutes of exercise daily. They excel at obedience, agility, tracking, and nosework. An unstimulated Standard Poodle becomes anxious and destructive.',
  },
];

export const STANDARD_POODLE_TRAINING_EVENTS = [
  {
    id_suffix: 'stdpoodle_training_formal',
    day_offset: 35,
    title: 'Begin formal training: Week 5',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Standard Poodles typically learn a new command in 5 repetitions. Begin immediately.',
    detail: 'From Week 5:\n- Sit (usually learned in 1-2 sessions)\n- Down\n- Stay (duration before distance)\n- Come\n- Leave it\n\nInform new owners: enrol in puppy class immediately. Standard Poodles thrive with a job. Untrained, understimulated Standard Poodles become anxious and vocal — the complete opposite of their potential.',
  },
];

export const STANDARD_POODLE_HEALTH_RISKS = [
  {
    condition: 'NEwS — Neonatal Encephalopathy with Seizures',
    timing: 'Fatal — typically Week 1-6',
    risk_level: 'critical' as const,
    signs: ['Seizures in puppy under 6 weeks', 'Progressive neurological deterioration', 'Failure to thrive'],
    immediate_action: 'Emergency vet + DNA test immediately. Humane euthanasia recommended — no treatment available.',
    vet_decision: 'Emergency vet for any neonatal seizure.',
    note: 'DNA test both parents. Entirely preventable through breeding decisions.',
  },
  {
    condition: "Addison's Disease",
    timing: 'Peak 4-7 years; can occur from 6 months',
    risk_level: 'critical' as const,
    signs: ['Waxing/waning vomiting and weakness', 'Episodes of lethargy that partially resolve', 'Addisonian crisis: sudden collapse, severe weakness'],
    immediate_action: "Addisonian crisis = EMERGENCY VET IMMEDIATELY. Routine signs: vet within 24 hours.",
    vet_decision: 'Crisis = emergency. Routine signs = urgent appointment.',
    note: 'ACTH stimulation test is diagnostic. Excellent prognosis with lifelong medication.',
  },
  {
    condition: 'GDV (Gastric Dilatation-Volvulus)',
    timing: 'Any age; highest risk with large single meals',
    risk_level: 'critical' as const,
    signs: ['Unproductive retching', 'Drum-hard distended abdomen', 'Extreme distress', 'Pale gums'],
    immediate_action: 'EMERGENCY VET IMMEDIATELY — fatal within 1-2 hours without surgery.',
    vet_decision: 'Emergency vet — do not wait.',
    note: 'Prophylactic gastropexy at spay/neuter prevents GDV for life.',
  },
  {
    condition: 'Sebaceous Adenitis (SA)',
    timing: 'Signs typically 1-5 years',
    risk_level: 'high' as const,
    signs: ['Symmetric hair loss on back and sides', 'Silvery scaling', 'Musty odour', 'Dry brittle coat'],
    immediate_action: 'Book vet for skin punch biopsy to confirm. Chronic management.',
    vet_decision: 'Call vet within a week of coat changes.',
    note: 'OFA skin biopsy annual screening from age 2. Manageable with medicated shampoos and cyclosporine.',
  },
];
