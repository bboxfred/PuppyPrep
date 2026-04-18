/**
 * INFO BASE: DACHSHUND
 * Applies to: Dachshund (Standard and Miniature, all coat types)
 * Info base ID: 'dachshund'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'dachshund'.
 *
 * Sources: Dachshund Club of America (DCA), Dachshund Health UK,
 * Merck Vet Manual, Cornell CVM, UC Davis VGL (CDDY/CDPA),
 * VCA Animal Hospitals, AKC, maraboonvet.com.au (IVDD).
 *
 * ⚠️ CRITICAL FLAGS — THE MOST IMPORTANT BREED-SPECIFIC RULES IN THE APP:
 * - IVDD: 19–25% lifetime risk. #1 cause of disability and death under 5 years
 * - NO JUMPING ON/OFF ANYTHING — EVER. This is a permanent life rule.
 * - NO STAIRS if avoidable. RAMPS EVERYWHERE.
 * - HARNESS ONLY — never collar
 * - LEAN BODY CONDITION is the most important preventive factor
 * - CDDY: virtually universal in breed
 * - Grade V IVDD surgery must happen within 24 hours for best outcome
 */

export const DACHSHUND_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },

  // Standard Dachshund values — Miniature overrides noted where different
  avg_litter_size: { min: 3, max: 8, typical: 5 },
  newborn_weight_grams: {
    standard: { min: 150, max: 280, typical: 215 },
    miniature: { min: 80,  max: 160, typical: 120 },
  },
  adult_weight_kg: {
    standard:  { min: 7.3, max: 15 },
    miniature: { min: 2.5, max: 5 },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const,  // higher in Miniature
  singleton_risk: false,
  csection_rate_percent: 10,  // Standard ~10%, Miniature ~5%
  brachycephalic: false,

  weight_targets: {
    // Standard values — Miniature will be approximately 50% of these
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

  tube_size_french: 5,          // Standard; French 3.5 for Miniature
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
    small_litter: { w: 80,  d: 80  },
    large_litter:  { w: 100, d: 100 },
    pig_rail_height_cm: 8,
    wall_height_cm: 35,
  },
};

export const DACHSHUND_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Dachshund puppies. Weigh precisely — Miniature Dachshunds at 2 weeks may weigh only 200g. Use a 1 cc syringe for Miniature puppies.',
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
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth. Extra caution during pregnancy — do not allow the dam to jump on/off anything.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. For Miniature Dachshund puppies: feed before the visit and keep warm — moderate hypoglycemia risk.',
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
      plain_english: 'Vet check within 48 hours. Standard Dachshunds: 10% C-section rate. Confirm all placentas passed. Assess dam\'s back — whelping can stress the chondrodystrophic spine.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. All puppies gaining weight. Dam back health — no signs of disc pain (reluctance to move, hunched posture).',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + IVDD protocol briefing',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. CRITICAL: give every new owner the IVDD prevention protocol at this appointment. Ask vet to reinforce it. Discuss ramp purchase, harness fitting, and body weight management starting now.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming — IVDD protocol and ramp requirements in writing',
      urgency: 'before_leaving',
      plain_english: 'Final check. EVERY Dachshund owner must receive the IVDD prevention protocol in writing before this puppy leaves. No exceptions. This information prevents disability. Also disclose: Lafora disease (wirehair), PRA-cord1 DNA status, diabetes risk.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'CDDY/CDPA (IVDD genetic awareness)',
      timing: 'Breed-wide — virtually universal in Dachshunds',
      method: 'DNA test available (UC Davis VGL) but near-universal in breed; radiographic disc calcification scoring more useful for individual risk',
      plain_english: 'Virtually every Dachshund carries CDDY — this is a breed characteristic, not a screening result to act on individually. What matters is prevention: no jumping, ramps, harness, lean weight for life. Radiographic calcification scoring (available in UK/Europe) identifies highest-risk individuals for prophylactic disc surgery.',
      mandatory_for_breeding: false,
    },
    {
      name: 'PRA-cord1 DNA test',
      timing: 'Any age — DNA test',
      method: 'DNA test for RPGRIP1 mutation',
      plain_english: 'Progressive retinal atrophy type cord1 causes progressive vision loss. Test breeding stock. Annual CAER eye exam recommended.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Lafora Disease (Wirehaired Dachshunds only)',
      timing: 'DNA test any age',
      method: 'DNA test for EPM2B (malin) gene',
      plain_english: 'Lafora disease causes progressive epilepsy in Wirehaired Dachshunds — myoclonic seizures triggered by visual stimuli (flickering lights). Progressive and ultimately fatal. DNA test Wirehaired Dachshund breeding stock.',
      mandatory_for_breeding: true,
    },
  ],
};

export const DACHSHUND_PREGNANCY_EVENTS = [
  {
    id_suffix: 'dachshund_preg_back_protection',
    day_offset: -42,
    title: '⚠️ IVDD pregnancy protocol: No jumping — starts NOW',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'A pregnant Dachshund dam is at highest IVDD risk of her life. Back protection is mandatory from today.',
    detail: 'Pregnancy adds significant weight to a chondrodystrophic spine. A disc incident during pregnancy is a medical emergency threatening both dam and litter.\n\nFROM TODAY — mandatory for the entire pregnancy:\n1. NO jumping on or off any surface — furniture, beds, cars, stairs\n2. NO jumping over any obstacle\n3. RAMPS at every height change — sofa, bed, car boot\n4. LIFT with both hands: one under chest, one under hindquarters — always\n5. HARNESS only — never a neck collar\n6. LEASH WALKS only — no fetch, no rough play, no running\n7. Restrict all stairs — carry if needed\n\nIVDD EMERGENCY SIGNS during pregnancy (RUSH to vet):\n- Dam yelps or cries when touched on back\n- Dam reluctant to move or lies hunched\n- Hind legs suddenly weak or uncoordinated\n- Loss of bladder or bowel control\n\nDachshund IVDD during pregnancy = emergency surgery risk with general anaesthesia considerations for the litter.',
    call_vet_if: 'Any back pain or hind leg weakness — emergency vet',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'dachshund_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Confirm count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. Dachshund litters of 4–6 need accurate count.',
    detail: 'Pre-whelping X-ray at Day 55–58. Dachshund litters average 5 puppies.\n\nWith Standard Dachshunds: 10% C-section rate — confirm presentation and count.\nWith Miniature Dachshunds: 5% — generally easier whelpers.\n\nNote: Miniature Dachshund dams are small — a large Standard-size puppy from an incorrect mating can obstruct. Confirm the sire size matches the dam.',
  },
];

export const DACHSHUND_NEONATAL_EVENTS = [
  {
    id_suffix: 'dachshund_neo_ramp_introduction',
    day_offset: 28,
    title: 'Week 4: Introduce ramps in the whelping area NOW',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Every Dachshund must use ramps for life. This habit must be established before they go home.',
    detail: 'Every Dachshund puppy must learn to use ramps — this is a life skill that directly prevents IVDD disability.\n\nFrom Week 4:\n1. Place a gentle ramp (8–12° incline) in the whelping area\n2. Place treats at both ends to reward use\n3. Mark and reward every successful ramp crossing\n4. Ensure ALL puppies use the ramp, not jump around it\n\nBy Week 7: every puppy must be using ramps confidently before going home.\n\nInform new owners: they need ramps for the sofa, bed, and car boot BEFORE the puppy arrives. A Dachshund that jumps off the sofa once per day for 5 years is significantly more likely to suffer catastrophic disc rupture. The cumulative disc damage from jumping is real and preventable.',
  },
  {
    id_suffix: 'dachshund_neo_ivdd_owner_protocol',
    day_offset: 49,
    title: 'Week 7: IVDD prevention written protocol for every new owner',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'The single most important information any Dachshund owner can receive.',
    detail: 'IVDD PREVENTION PROTOCOL — give to every new owner in writing:\n\nLIFETIME RULES — no exceptions, every day:\n1. NO jumping on/off sofas, beds, chairs — ramps or steps mandatory\n2. NO jumping in/out of cars — always lift, or use a ramp\n3. NO stairs without support or ramps — carry small dogs\n4. HARNESS only — never a neck collar\n5. LEAN body weight — obesity is the most powerful modifiable IVDD risk factor\n6. Lift with both hands: one under chest, one under pelvis. Never by the middle.\n7. No rough twisting play, wrestling, or sudden direction changes\n\nIVDD EMERGENCY SIGNS — CALL VET IMMEDIATELY:\n- Crying when back touched\n- Hunched posture and reluctance to move\n- Hind legs wobbly or dragging\n- Loss of bladder or bowel control\n- ONE EYE partially closed (this can indicate neck disc)\n\nGRADE V IVDD: Complete hind paralysis with loss of deep pain = SURGERY WITHIN 24 HOURS. Deep pain sensation present = 90%+ surgical success. Deep pain absent >48 hours = dramatically reduced prognosis. This is a time-critical emergency.',
  },
];

export const DACHSHUND_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'dachshund_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Tenacious terrier spirit',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Dachshunds are tenacious hunting dogs in small bodies. Socialise for confidence, not aggression.',
    detail: 'Dachshunds were bred to hunt badgers and have the tenacity to match. Without socialisation, this translates to aggression toward strangers and dogs.\n\nFrom Week 3:\n- Daily handling by 8+ diverse people\n- Sound desensitization — Dachshunds can be reactive barkers\n- Body handling — essential for IVDD management (vet handling, physiotherapy)\n- Begin "quiet" cue from Week 3\n\nA well-socialised Dachshund is confident, bold, and charming. A poorly socialised one is reactive and can bite readily — research suggests Dachshunds bite at higher rates than larger breeds despite size.',
  },
  {
    id_suffix: 'dachshund_social_week4_ramp',
    day_offset: 28,
    title: 'Socialization Week 4: Ramp use must be normal by the time they go home',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Ramp use is not optional for Dachshunds. Build the habit before they leave.',
    detail: 'Ensure all Dachshund puppies use the whelping area ramp daily from Week 4.\n\nBy Week 8: every puppy should prefer the ramp to jumping. This is the most important practical skill any Dachshund can have.',
  },
];

export const DACHSHUND_TRAINING_EVENTS = [
  {
    id_suffix: 'dachshund_training_body_handling',
    day_offset: 21,
    title: 'Body handling: Begin thorough handling from Week 3',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Dachshunds with IVDD require extensive physical handling from vets and physiotherapists. Prepare now.',
    detail: 'Dachshunds with IVDD will require:\n- Frequent back examinations\n- Neurological checks (pressing on spine, testing reflexes)\n- Physiotherapy massages\n- Hydrotherapy support\n\nA Dachshund that tolerates handling of its back, spine, and hindquarters is dramatically easier to treat during a disc incident.\n\nFrom Week 3:\n- Daily back stroking — from base of skull to tail tip\n- Press gently along the spine — puppy should tolerate without flinching\n- Hold hindquarters gently — puppy should not panic\n- Paw handling for all four feet\n\nThis is disease management starting from birth.',
  },
];

export const DACHSHUND_HEALTH_RISKS = [
  {
    condition: 'IVDD (Intervertebral Disc Disease)',
    timing: '19–25% lifetime risk. Most common 3–6 years. Can occur any age.',
    risk_level: 'critical' as const,
    signs: [
      'Grade I: Back pain — hunched posture, crying when touched, reluctance to move',
      'Grade II: Hind leg weakness, wobbling',
      'Grade III: Walking with support only, unable to walk normally',
      'Grade IV: Paralysis, bladder and bowel retention or incontinence',
      'Grade V: Complete paralysis + loss of deep pain sensation — SURGICAL EMERGENCY'
    ],
    immediate_action: 'Any signs: EMERGENCY VET IMMEDIATELY. Do not wait overnight. Do not give pain relief without vet guidance (it may mask worsening). Transport flat in a box or flat surface — do not allow twisting. Grade V requires surgery within 24 hours.',
    vet_decision: 'ANY suspected IVDD = emergency vet same day. Grade V = rush to surgical specialist immediately.',
    note: 'Prevention is the only strategy — ramps, no jumping, harness, lean weight. Cannot be cured after the fact.',
  },
  {
    condition: 'Diabetes Mellitus',
    timing: 'More common in middle-aged and older Dachshunds (5–9 years)',
    risk_level: 'high' as const,
    signs: ['Dramatic increase in thirst and urination', 'Increased appetite with weight loss', 'Cloudy eyes (cataracts)', 'Lethargy'],
    immediate_action: 'Book vet appointment within a week. Fasting blood glucose test required. Manageable with twice-daily insulin injections.',
    vet_decision: 'Call vet within a week of symptoms appearing.',
    note: 'Obesity is a significant risk factor for Dachshund diabetes. Prevention through lean weight management.',
  },
  {
    condition: 'Lafora Disease (Wirehaired Dachshunds)',
    timing: 'Progressive — myoclonic seizures typically appear 5–7 years',
    risk_level: 'high' as const,
    signs: ['Seizures triggered by visual stimuli (flickering lights, patterns)', 'Involuntary muscle jerks', 'Progressive worsening over years'],
    immediate_action: 'Avoid trigger environments (TV close-up, flickering lights). Book vet for seizure management.',
    vet_decision: 'Call vet after first seizure for diagnosis and management plan.',
    note: 'DNA test breeding stock. No cure — managed with anti-epileptic medication.',
  },
];
