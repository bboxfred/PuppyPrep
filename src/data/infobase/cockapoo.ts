/**
 * INFO BASE: COCKAPOO
 * Info base ID: 'cockapoo'
 *
 * Sources: O'Neill 2021 Canine Med Genet 8:7 [PR] (otitis OR 2.22),
 * Bryson & O'Neill 2024 PLOS ONE "Doodle Dilemma" [PR]
 *   (n=1,856 Cockapoos included; 86.6% no significant disorder difference;
 *    hybrid vigor NOT demonstrated at population level),
 * Smith/Stedman/Giger 1996 J Biol Chem [PR] (PFK deficiency PFKM c.2228G>A),
 * Davidson 2007 JVIM [PR] (Familial Nephropathy COL4A4 c.115A>T),
 * Cockapoo Club GB (CCGB) health requirements [BC],
 * American Cockapoo Club (ACC) health requirements [BC],
 * UC Davis VGL prcd-PRA, RSPO2 furnishings test,
 * Parker 2009 [PR] (RSPO2 furnishings genetics),
 * Merck Vet Manual, Cornell CVM, VCA Animal Hospitals.
 *
 * ⚠️ CRITICAL DISTINCTION — English vs American Cocker parent:
 * Different health profiles and different mandatory DNA tests:
 * - English Cocker parent: Familial Nephropathy (COL4A4) MANDATORY
 * - American Cocker parent: PFK Deficiency (PFKM) MANDATORY (~10% carrier)
 * Both: prcd-PRA MANDATORY from both Cocker AND Poodle sides
 *
 * ⚠️ CRITICAL FLAGS:
 * - Otitis externa: OR 2.22 vs crossbreeds (O'Neill 2021) — weekly ear care mandatory
 * - Hybrid vigor NOT demonstrated (Bryson 2024) — do NOT advertise health advantages
 * - prcd-PRA: highest-priority test — present on BOTH parent sides
 * - RSPO2 coat genetics: F2 litters risk 25% IC/IC (shedding improper coat)
 * - Hypoglycemia risk: HIGH for Toy Cockapoo (<5.5kg parent); MEDIUM for Mini
 * - Litter size and reproductive data: ALL [EXT] — no peer-reviewed Cockapoo data
 */

export const COCKAPOO_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 3, max: 8, typical: 5 },   // [EXT from parent breed averages]
  newborn_weight_grams: {
    toy:  { min: 100, max: 180, typical: 140 },       // [EXT — Toy Poodle parent]
    mini: { min: 150, max: 280, typical: 215 },       // [EXT — Mini Poodle parent]
  },
  newborn_weight_grams_default: { min: 130, max: 250, typical: 190 }, // [EXT]
  adult_weight_kg: {
    toy_cockapoo:  { min: 2.5, max: 5.5 },
    mini_cockapoo: { min: 5.5, max: 11  },
  },
  size_category: 'small' as const,
  // Hypoglycemia: Toy parent = HIGH; Mini parent = MEDIUM — default to MEDIUM
  hypoglycemia_risk: 'medium' as const,
  singleton_risk: true,
  csection_rate_percent: 10, // [EXT — no peer-reviewed Cockapoo data]
  brachycephalic: false,

  weight_targets: {
    // Mini Cockapoo values — most common
    birth:  { min: 130, max: 280,  typical: 205  },
    day_7:  { min: 240, max: 510,  typical: 370  },
    day_14: { min: 345, max: 720,  typical: 530  },
    week_3: { min: 490, max: 1030, typical: 760  },
    week_4: { min: 700, max: 1460, typical: 1080 },
    week_6: { min: 1160, max: 2430, typical: 1795 },
    week_8: { min: 1560, max: 3270, typical: 2415 },
  },
  daily_gain_minimum_grams: 7,
  daily_gain_target_grams: 13,
  daily_gain_percent_bodyweight: 7,
  dam_lactation_calories_multiplier: { week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0 },
  formula_volumes_per_feeding_ml: {
    week_1: { min: 2,  max: 5,  per_100g_body_weight: 1.5 },
    week_2: { min: 3,  max: 7,  per_100g_body_weight: 1.8 },
    week_3: { min: 5,  max: 10, per_100g_body_weight: 2.0 },
    week_4: { min: 7,  max: 14, per_100g_body_weight: 2.5 },
  },
  feeding_frequency_hours: { week_1: 2, week_2: 2.5, week_3: 3, week_4: 4 },
  tube_size_french: 5,   // 3.5 Fr for Toy Cockapoo under 150g
  max_stomach_capacity_ml_per_100g: 4,
  whelping_box_temp_celsius: {
    week_1:      { min: 29.5, max: 32,   ideal: 31   },
    week_2:      { min: 27,   max: 29.5, ideal: 28.5 },
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
    small_litter: { w: 80, d: 80 },
    large_litter:  { w: 95, d: 95 },
    pig_rail_height_cm: 7,
    wall_height_cm: 32,
  },
};

export const COCKAPOO_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, label: 'First deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Worm treatment. Toy Cockapoo at 2 weeks: ~240g — use 1 cc syringe. Mini Cockapoo: ~350–500g — still use syringe, not estimation.', vet_required: false, critical: true },
    { day: 28, label: 'Second deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Second treatment.', vet_required: false, critical: true },
    { day: 42, label: 'Third deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg × 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Panacur 3 days.', vet_required: false, critical: true },
    { day: 56, label: 'Fourth deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg × 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Final deworming.', vet_required: false, critical: true },
  ],
  dam_deworming: {
    start_day_of_pregnancy: 40, end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur Day 40 through 14 days post-whelp.', critical: true,
  },
  vaccinations: [
    { week: 6,  label: 'First vaccination', vaccine: 'DHPP #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'First vaccination. Feed before visit. For Toy Cockapoos: Karo syrup in bag.', vet_required: true, critical: true },
    { week: 10, label: 'Second vaccination', vaccine: 'DHPP #2 + Leptospirosis #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'], plain_english: 'Second vaccination plus Lepto.', vet_required: true, critical: true },
    { week: 14, label: 'Third vaccination', vaccine: 'DHPP #3 + Rabies', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'], plain_english: 'Third series plus Rabies.', vet_required: true, critical: true },
    { week: 18, label: 'Final parvo booster', vaccine: 'DHPP #4', covers: ['Distemper', 'Parvovirus'], plain_english: 'Do not skip.', vet_required: true, critical: true },
  ],
  vet_visits: [
    { day: 0,   label: 'Post-whelping dam check', urgency: 'within_48_hours', plain_english: 'Vet check within 48h. Confirm all placentas passed and milk supply starting.', critical: true },
    { week: 1,  label: 'Dam and litter check', urgency: 'day_7', plain_english: 'All pups gaining ≥7g per day. Toy Cockapoo pups: watch for hypoglycemia — supplemental feeding if any pup not gaining by day 2.', critical: true },
    { week: 6,  label: 'Puppy wellness + ear protocol + DNA results review', urgency: 'week_6_to_8', plain_english: 'Vaccinations, full physical. CRITICAL: review prcd-PRA and lineage-appropriate DNA results (FN or PFK). Begin weekly ear cleaning protocol — Cockapoo has highest designer-breed otitis risk of those in O\'Neill 2021. Brief new owners on ear care in writing.', critical: true },
    { week: 8,  label: 'Pre-rehoming check', urgency: 'before_leaving', plain_english: 'All DNA results in writing. Ear care protocol in writing. Coat genetics result if done (RSPO2). Honest shedding expectations based on F1/F1b/F2 generation.', critical: true },
  ],
  breed_specific_screenings: [
    {
      name: '⚠️ prcd-PRA — MANDATORY (both sides)',
      timing: 'DNA test BOTH parents before breeding',
      method: 'Direct mutation DNA test — UC Davis VGL or PawPrints (NOT Embark linkage test)',
      plain_english: 'prcd-PRA is present on BOTH the Cocker AND Poodle sides of Cockapoo parentage — this is the single highest-priority Cockapoo test. CCGB mandatory: at least one parent DNA-clear for prcd-PRA. Use a direct-mutation lab (UC Davis VGL, PawPrints Genetics, GenSol) — NOT Embark linkage-based testing which had poor accuracy vs direct-mutation in Toy Poodles. Clear × clear mandatory.',
      mandatory_for_breeding: true,
    },
    {
      name: '⚠️ Familial Nephropathy — COL4A4 (English Cocker parent ONLY)',
      timing: 'DNA test if English Cocker Spaniel is in the parentage — mandatory for F2+ CCGB registration',
      method: 'DNA test — COL4A4 c.115A>T',
      plain_english: 'FATAL juvenile kidney disease from English Cocker ancestry. Onset 6 months to 2 years. Both kidneys fail. This test applies ONLY to English Cocker × Poodle crosses. CCGB mandatory for any breeding using English Cocker lineage. Do NOT test if American Cocker parent only.',
      mandatory_for_breeding: true,
    },
    {
      name: '⚠️ PFK Deficiency — PFKM c.2228G>A (American Cocker parent ONLY)',
      timing: 'DNA test if American Cocker Spaniel is in the parentage (~10% carrier)',
      method: 'DNA test — PFKM c.2228G>A. PennGen, VetGen, Paw Print.',
      plain_english: 'PFK Deficiency causes exercise- and heat-triggered haemolytic anaemia with characteristic brownish urine. ~10% of American Cockers are carriers. Autosomal recessive. This test applies ONLY to American Cocker × Poodle crosses. Carrier × carrier = 25% affected litter.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip and elbow dysplasia',
      timing: 'OFA/PennHIP both parents ≥24mo',
      method: 'OFA radiograph or PennHIP',
      plain_english: 'Both Cocker Spaniels (~15% OFA dysplastic) and Poodles (~12%) contribute hip risk. OFA/PennHIP for both parents per ACC standard.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CAER eye exam — annual',
      timing: 'Annual from age 1',
      method: 'Board-certified ACVO ophthalmologist',
      plain_english: 'Annual CAER both parents required CCGB/ACC.',
      mandatory_for_breeding: true,
    },
    {
      name: 'RSPO2 coat genetics — inform buyers honestly',
      timing: 'Test the Poodle parent for furnishings (F/F vs F/IC)',
      method: 'UC Davis VGL or equivalent RSPO2 test',
      plain_english: 'F1 Cockapoos are F/IC — furnished face, may still shed. F1b (backcross to Poodle F/F) = 50% F/F low-shed, 50% F/IC. F2 Cockapoos: 25% risk IC/IC — sheds like a Cocker. Test the Poodle parent. Never promise "hypoallergenic" — no dog coat is fully allergen-free.',
      mandatory_for_breeding: false,
    },
  ],
};

export const COCKAPOO_PREGNANCY_EVENTS = [
  {
    id_suffix: 'cc_preg_dna_panel_confirm',
    day_offset: -42,
    title: '⚠️ Confirm DNA panel status — prcd-PRA both sides, plus FN or PFK by lineage',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'Cockapoo DNA requirements depend on which Cocker parent is used. Confirm correct tests are done.',
    detail: 'REQUIRED FOR ALL COCKAPOO LITTERS:\n✅ prcd-PRA: at least one parent DNA-clear (CCGB mandatory)\n✅ OFA/PennHIP both parents\n✅ Annual CAER both parents\n\nIF ENGLISH COCKER PARENT:\n✅ COL4A4 Familial Nephropathy — MANDATORY (fatal kidney disease)\n\nIF AMERICAN COCKER PARENT:\n✅ PFKM PFK Deficiency — MANDATORY (~10% carrier rate)\n\nHYBRID VIGOR NOTE:\nBryson & O\'Neill 2024 PLOS ONE analysed 1,856 Cockapoos and found 86.6% of disorder comparisons showed no significant difference vs parent breeds. Hybrid vigor is NOT demonstrated. Do not claim health advantages in breeding advertising.',
  },
  {
    id_suffix: 'cc_preg_xray',
    day_offset: -14,
    title: 'Pre-whelping X-ray: Confirm count and singleton risk',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'X-ray Day 55–58. Average 5 puppies, singletons possible.',
    detail: 'X-ray Day 55–58. Confirm exact count and note any singleton.\n\nFor Toy Cockapoo dams: if singleton or very large foetus detected relative to dam size, discuss elective C-section planning with vet.\n\nData note: All Cockapoo reproductive data (litter size, birth weight, C-section rate) is extrapolated from parent breeds — no peer-reviewed Cockapoo-specific reproductive studies exist as of April 2026.',
  },
];

export const COCKAPOO_NEONATAL_EVENTS = [
  {
    id_suffix: 'cc_neo_ear_care_start',
    day_offset: 14,
    title: '⚠️ Week 2: Begin ear handling — Cockapoo has highest designer-breed otitis risk (OR 2.22)',
    category: 'health' as const, priority: 'critical' as const, is_free: false,
    description: 'O\'Neill 2021 VetCompass: Cockapoos have OR 2.22 for otitis externa vs crossbreeds. Weekly ear care from Week 2.',
    detail: 'O\'Neill 2021 VetCompass (n=22,333 dogs) found Cockapoos with OR 2.22 for otitis externa — elevated risk driven by pendulous ears + curly/wavy coat growing into the ear canal.\n\nFrom Week 2:\n- Daily gentle ear fold and inspection\n- Wipe outer ear canal entrance with soft damp cloth\n\nFrom Week 4:\n- Weekly ear cleaning with veterinary ear cleaner\n- Check for hair growing into the canal — discuss removal with vet/groomer\n\nInform every new Cockapoo owner IN WRITING: weekly ear cleaning for life. Neglect causes chronic painful ear infections that are expensive to treat and recur without prevention.',
  },
  {
    id_suffix: 'cc_neo_grooming_desensitization',
    day_offset: 21,
    title: 'Week 3: Grooming desensitization — Cockapoo coats require professional care every 6–8 weeks',
    category: 'socialization' as const, priority: 'critical' as const, is_free: false,
    description: 'Cockapoo coats require frequent brushing and professional grooming throughout life. Desensitization from Week 3 prevents future welfare issues.',
    detail: 'Regardless of coat type (wavy F1 or curlier F1b), Cockapoo coats require:\n- Brushing 3–4× weekly minimum\n- Professional grooming every 6–8 weeks\n- Ear hair management\n\nFrom Week 3:\n1. Daily soft brush head to tail\n2. Ear handling and inspection\n3. Hair dryer at low setting from distance\n4. Face and muzzle handling\n5. Paw handling for nail trims\n\nA Cockapoo not groomed from puppyhood will mat badly and need sedation for coat removal — a significant welfare and financial problem.',
  },
];

export const COCKAPOO_HEALTH_RISKS = [
  {
    condition: 'Otitis Externa (Ear Infections)',
    timing: 'Any age; highest risk without preventive care — OR 2.22 vs crossbreeds',
    risk_level: 'high' as const,
    signs: ['Head shaking', 'Scratching at ears', 'Brown or dark discharge at ear canal opening', 'Redness and swelling of inner ear flap', 'Unpleasant odour from ear', 'Painful reaction to ear touching'],
    immediate_action: 'Vet within a week for first infection. Recurrent infections: dermatologist referral for culture and targeted treatment.',
    vet_decision: 'Call vet within a week. Recurrent otitis = specialist referral.',
    note: 'OR 2.22 (O\'Neill 2021). Prevention only: weekly ear cleaning for life, dry ears after water exposure, remove canal hair.',
  },
  {
    condition: 'prcd-PRA (Progressive Retinal Atrophy)',
    timing: 'Blindness typically 3–5+ years',
    risk_level: 'high' as const,
    signs: ['Night blindness — hesitating or bumping in dim light', 'Dilated pupils in normal light', 'Gradual loss of day vision', 'Eventually total blindness'],
    immediate_action: 'Book ophthalmologist. DNA test if not done. No cure — manage environment.',
    vet_decision: 'Ophthalmologist referral.',
    note: 'Present on BOTH Cocker AND Poodle sides. Clear × clear parents mandatory. Use direct-mutation DNA test, not Embark linkage.',
  },
  {
    condition: 'Familial Nephropathy (English Cocker line only)',
    timing: 'Fatal kidney failure onset 6 months to 2 years',
    risk_level: 'critical' as const,
    signs: ['Progressive weight loss from 6 months', 'Increased thirst and urination', 'Vomiting and inappetence', 'Rapid deterioration to kidney failure'],
    immediate_action: 'Urgent vet within 24 hours of any of these signs in a young Cockapoo with English Cocker parentage.',
    vet_decision: 'Urgent vet. Supportive care only — no cure.',
    note: 'COL4A4 autosomal recessive. English Cocker lineage ONLY. DNA test prevents affected litters. CCGB mandatory.',
  },
  {
    condition: 'PFK Deficiency (American Cocker line only)',
    timing: 'Episodes any age — triggered by exercise, excitement, heat',
    risk_level: 'high' as const,
    signs: ['Weakness or collapse after exercise or excitement', 'Dark brownish/port-wine coloured urine after exertion', 'Exercise intolerance', 'Pale gums after episode'],
    immediate_action: 'Rest immediately. Emergency vet if collapse or no recovery within 15 minutes.',
    vet_decision: 'Urgent vet for first episode. Emergency if collapse.',
    note: '~10% American Cocker carrier rate. PFKM c.2228G>A. Avoid intense exercise and heat. DNA test American Cocker parent.',
  },
];
