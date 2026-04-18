/**
 * INFO BASE: MINIATURE SCHNAUZER
 * Info base ID: 'miniature_schnauzer'
 *
 * Sources: AMSC Health Statement 07/09/2024 [BC],
 * Mizukami 2024 Sci Rep 14:10346 [PR] (CARD9 c.493_495del — MAC, Mini Schnauzer exclusive),
 * Bhalerao/Rajpurohit/Vite/Giger 2002 AJVR [PR] (CLCN1 myotonia congenita),
 * UPenn Giger 2001 unpublished report [PR-cited] (>10% carriers in ~400 Mini Schnauzers),
 * Xenoulis 2007 JVIM [PR] (32.8% of healthy Minis hypertriglyceridemia),
 * Xenoulis 2011 [PR] (pancreatitis 4.51× risk),
 * Kaukonen 2020 PLoS Genet [PR] (HIVEP3 PRA Type B),
 * Lulich 1991 AJVR [PR] (CaOx 11.8× odds vs other breeds),
 * Wu 2009 [PR] (AMHR2 PMDS ~25% carrier),
 * Merck Vet Manual, Cornell CVM, VCA Animal Hospitals.
 *
 * ⚠️ CRITICAL FLAGS:
 * - MAC (Mycobacterium Avium Complex): CARD9 — Miniature Schnauzer EXCLUSIVE
 *   All clinically affected dogs homozygous. Fatal/severe. Zoonotic risk.
 *   Test: PennGen + Laboklin. AMSC 2024 recommends DNA test.
 * - Myotonia Congenita: CLCN1 — >10% carriers (Giger 2001, n=~400)
 *   Signs visible at first walking 2–3 weeks ("swimmer puppy" + stiffness)
 * - Primary Hypertriglyceridemia: 32.8% of healthy Minis; pancreatitis 4.51×
 *   High-fat diets contraindicated for this breed
 * - PRA Type B: HIVEP3 — NOT Type A (rare in breed); AMSC 2024 specifies HIVEP3
 * - Urolithiasis: CaOx 11.8× odds (Lulich 1991); struvite also elevated
 * - PMDS: AMHR2 ~25% carrier; XY males retain uterus; Sertoli cell tumour risk
 */

export const MINIATURE_SCHNAUZER_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 2, max: 8, typical: 5 },
  newborn_weight_grams: { min: 115, max: 255, typical: 185 }, // [EXT from small breed norms]
  adult_weight_kg: {
    male:   { min: 5, max: 8 },
    female: { min: 4.5, max: 7 },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const,
  singleton_risk: true,
  csection_rate_percent: 10, // [EXT — not elevated breed; singleton risk higher]
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 115, max: 255,  typical: 185  },
    day_7:  { min: 215, max: 460,  typical: 335  },
    day_14: { min: 305, max: 650,  typical: 480  },
    week_3: { min: 435, max: 930,  typical: 680  },
    week_4: { min: 615, max: 1315, typical: 965  },
    week_6: { min: 1020, max: 2190, typical: 1605 },
    week_8: { min: 1375, max: 2940, typical: 2155 },
  },
  daily_gain_minimum_grams: 7,
  daily_gain_target_grams: 14,
  daily_gain_percent_bodyweight: 7,
  dam_lactation_calories_multiplier: { week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0 },
  formula_volumes_per_feeding_ml: {
    week_1: { min: 2,  max: 5,  per_100g_body_weight: 1.8 },
    week_2: { min: 3,  max: 7,  per_100g_body_weight: 2.0 },
    week_3: { min: 5,  max: 10, per_100g_body_weight: 2.5 },
    week_4: { min: 8,  max: 14, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: { week_1: 2, week_2: 2.5, week_3: 3, week_4: 4 },
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
    small_litter: { w: 80,  d: 80  },
    large_litter:  { w: 100, d: 100 },
    pig_rail_height_cm: 7,
    wall_height_cm: 35,
  },
};

export const MINIATURE_SCHNAUZER_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, label: 'First deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Worm treatment. Mini Schnauzer pups at 2 weeks weigh 215–460g — use 1 cc syringe for precision.', vet_required: false, critical: true },
    { day: 28, label: 'Second deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Second treatment. Use current weight.', vet_required: false, critical: true },
    { day: 42, label: 'Third deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg × 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Panacur 3 days.', vet_required: false, critical: true },
    { day: 56, label: 'Fourth deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg × 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Final deworming.', vet_required: false, critical: true },
  ],
  dam_deworming: {
    start_day_of_pregnancy: 40, end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur Day 40 through 14 days post-whelp.', critical: true,
  },
  vaccinations: [
    { week: 6,  label: 'First vaccination',  vaccine: 'DHPP #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'Standard first vaccination. Feed before visit — medium hypoglycemia risk.', vet_required: true, critical: true },
    { week: 10, label: 'Second vaccination', vaccine: 'DHPP #2 + Leptospirosis #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'], plain_english: 'Second vaccination plus first Lepto.', vet_required: true, critical: true },
    { week: 14, label: 'Third vaccination',  vaccine: 'DHPP #3 + Leptospirosis #2 + Rabies', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis', 'Rabies'], plain_english: 'Third series plus Rabies.', vet_required: true, critical: true },
    { week: 18, label: 'Final parvo booster', vaccine: 'DHPP #4', covers: ['Distemper', 'Parvovirus'], plain_english: 'Do not skip.', vet_required: true, critical: true },
  ],
  vet_visits: [
    { day: 0,   label: 'Post-whelping dam check', urgency: 'within_48_hours', plain_english: 'Vet check within 48h. Confirm all placentas passed and milk supply starting.', critical: true },
    { week: 1,  label: 'Dam and litter check', urgency: 'day_7', plain_english: 'All pups gaining ≥7g per day. Check for myotonia signs in any puppy showing stiffness.', critical: true },
    { week: 3,  label: '⚠️ Myotonia Congenita assessment window', urgency: 'week_2_to_4', plain_english: 'CRITICAL: Myotonia signs appear 2–3 weeks when puppies begin walking. Assess all puppies for stiff gait, muscle rigidity, and swimmer posture.', critical: true },
    { week: 6,  label: 'Puppy wellness + lipid diet briefing + DNA panel review', urgency: 'week_6_to_8', plain_english: 'Vaccinations, full physical. Discuss fasting lipid panel for dam (TG + cholesterol) if not done. Review DNA panel results with vet. Brief new owners on low-fat diet — critical for this breed.', critical: true },
    { week: 8,  label: 'Pre-rehoming check', urgency: 'before_leaving', plain_english: 'All DNA results in writing. MAC and myotonia status to new owners. Low-fat diet written instructions. Urolithiasis prevention (water intake, urinalysis from age 3).', critical: true },
  ],
  breed_specific_screenings: [
    {
      name: '⚠️ MAC (Mycobacterium Avium Complex) — CARD9 DNA test',
      timing: 'Test both parents before breeding. AMSC 2024 recommends all breeding stock.',
      method: 'DNA test — CARD9 c.493_495del. PennGen or Laboklin.',
      plain_english: 'MAC susceptibility is EXCLUSIVE to Miniature Schnauzers (Mizukami 2024 Sci Rep). The CARD9 deletion impairs immune response to mycobacterial infection. All clinically affected dogs tested are homozygous. Disease onset 1–4 years: weight loss, generalised lymphadenopathy, hepatosplenomegaly. Fatal or requiring prolonged treatment. ZOONOTIC RISK to immunocompromised humans. AMSC 2024 health statement recommends DNA testing. Carrier × carrier should not be repeated.',
      mandatory_for_breeding: false, // AMSC 2024: "optional but recommended"
    },
    {
      name: '⚠️ Myotonia Congenita — CLCN1 DNA test',
      timing: 'Test both parents before breeding. Signs visible 2–3 weeks in affected pups.',
      method: 'DNA test — CLCN1 c.803C>T. UPenn, Animal Genetics, or equivalent lab.',
      plain_english: 'Autosomal recessive. >10% of Miniature Schnauzers tested by UPenn (Giger 2001, n=~400) were carriers — most traced to a common ancestor. Signs in affected puppies at first walking (2–3 weeks): "swimmer" posture + extreme stiffness, muscle rigidity that worsens with cold and excitement, bunny-hop gait, jaw stiffness, noisy breathing. Stiffness improves with prolonged exercise ("warm-up phenomenon"). DNA test recommended AMSC 2024. Carrier × carrier = 25% affected litter.',
      mandatory_for_breeding: false, // AMSC 2024: "optional but recommended"
    },
    {
      name: '⚠️ PRA Type B — HIVEP3 DNA test',
      timing: 'Test both parents before breeding. AMSC 2024 specifies HIVEP3.',
      method: 'DNA test — HIVEP3. AMSC 2024: "designation of HIVEP3 is crucial for proper PRA DNA test"',
      plain_english: 'PRA Type A (prcd/PRCD) is RARE in Mini Schnauzers. The breed-relevant mutation is PRA TYPE B (HIVEP3 + linked PPT1, Kaukonen 2020). If you test using the wrong test (prcd-only), you will miss the relevant mutation. Ensure the DNA lab tests HIVEP3. AMSC 2024 health statement specifically flags this. Onset 3–5 years, progressive to blindness.',
      mandatory_for_breeding: false, // AMSC 2024: "optional but recommended"
    },
    {
      name: 'CAER eye exam — annual',
      timing: 'Annual CAER from age 1',
      method: 'Board-certified ACVO ophthalmologist',
      plain_english: 'Annual CAER required AMSC CHIC.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Cardiac — annual',
      timing: 'Annual cardiac from age 2',
      method: 'Cardiologist auscultation',
      plain_english: 'Annual cardiac clearance required AMSC CHIC.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Fasting lipid panel — TG + cholesterol',
      timing: 'Before breeding; annual from age 2',
      method: 'Fasting blood panel — triglycerides + total cholesterol',
      plain_english: '32.8% of healthy Miniature Schnauzers have primary hypertriglyceridemia (Xenoulis 2007). Elevated TG = 4.51× pancreatitis risk. Low-fat diet required for affected dogs. CRITICAL dietary instruction for every new owner: no high-fat treats, no fatty table scraps, no high-fat commercial diets.',
      mandatory_for_breeding: false,
    },
  ],
};

export const MINIATURE_SCHNAUZER_PREGNANCY_EVENTS = [
  {
    id_suffix: 'ms_preg_mac_myotonia_check',
    day_offset: -42,
    title: '⚠️ Confirm MAC (CARD9) and Myotonia (CLCN1) DNA status on both parents',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'Both MAC susceptibility and myotonia congenita are exclusive to this breed. Test both parents.',
    detail: 'MAC (CARD9 c.493_495del):\nExclusive to Miniature Schnauzers. All affected dogs homozygous.\n✅ Both N/N: No affected offspring\n⚠️ One N/MAC: 50% carriers\n🔴 Both N/MAC: 25% of litter affected — fatal or severely ill with mycobacterial disease, onset 1–4 years\n\nZoonotic note: MAC-affected dogs shed mycobacteria that can infect immunocompromised humans (HIV, chemotherapy, organ transplant). This is a public health consideration.\n\nMYOTONIA (CLCN1 c.803C>T):\n>10% carrier rate (Giger 2001). Signs at 2–3 weeks.\n🔴 Carrier × carrier: 25% of litter affected — swimmer posture + muscle stiffness from first walking attempts.',
    call_vet_if: 'Either parent is MAC/MAC or CLCN1/CLCN1 (affected)',
  },
  {
    id_suffix: 'ms_preg_low_fat_dam',
    day_offset: -28,
    title: 'Low-fat feeding protocol: Dam diet throughout pregnancy and lactation',
    category: 'nutrition' as const, priority: 'critical' as const, is_free: false,
    description: '32.8% of Mini Schnauzers have primary hypertriglyceridemia. High-fat dietary stress during pregnancy can trigger pancreatitis.',
    detail: 'CRITICAL dietary rule for Mini Schnauzer dam throughout pregnancy and lactation:\n\n- NO high-fat dog foods — choose a food with <15% fat on dry matter basis\n- NO fatty treats — no cheese, no sausage, no high-fat chews\n- NO table scraps\n- Feed 3–4 small meals daily rather than one large meal (also reduces GI stress)\n\nPANCREATITIS EMERGENCY SIGNS:\n🔴 Sudden severe vomiting\n🔴 Hunched posture, guarded abdomen\n🔴 Refusing food\n🔴 Lethargy + fever\n\nPancreatitis in a pregnant Mini Schnauzer = emergency vet immediately.',
    call_vet_if: 'Any vomiting, abdominal pain, or refusal to eat — vet same day',
    emergency_contact_recommended: true,
  },
];

export const MINIATURE_SCHNAUZER_NEONATAL_EVENTS = [
  {
    id_suffix: 'ms_neo_myotonia_watch',
    day_offset: 14,
    title: '⚠️ Weeks 2–3: Myotonia Congenita assessment — signs appear at first walking',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'Myotonia Congenita in Mini Schnauzers becomes visible at 2–3 weeks when puppies begin walking.',
    detail: 'Myotonia Congenita (CLCN1) affects the chloride channels in skeletal muscle — muscles contract normally but RELAX abnormally slowly.\n\nSIGNS AT 2–3 WEEKS (first walking attempts):\n- "Swimmer" posture — hindlimbs splayed outward, difficulty getting up\n- Stiff, stilted gait when first starting to walk\n- Falls over when trying to navigate\n- Muscle stiffness that improves after a few minutes of movement (classic "warm-up phenomenon")\n- Upper lip twitches or bunches up when tapped (percussion myotonia)\n- Noisy breathing in severe cases\n- Cold or excitement worsens stiffness\n\nNORMAL vs MYOTONIA:\n- Normal puppies: wobbly at first walking but improve rapidly day by day\n- Myotonia-affected: stiff and rigid, improve within a session ("warm up") but stiff again after rest\n\nArrange CLCN1 DNA test for any puppy showing these signs. Myotonia is manageable (mexiletine medication) but significantly limits the dog\'s activities.',
    call_vet_if: 'Any puppy showing stiff gait, swimmer posture, or muscle rigidity at 2–3 weeks — vet within 24 hours',
  },
  {
    id_suffix: 'ms_neo_low_fat_owners',
    day_offset: 42,
    title: 'Week 6: Low-fat diet protocol — give every new owner written instructions',
    category: 'nutrition' as const, priority: 'critical' as const, is_free: false,
    description: '32.8% of Mini Schnauzers have primary hypertriglyceridemia. Every new owner must receive low-fat diet instructions.',
    detail: 'Give every new Mini Schnauzer owner this in writing:\n\n"Your Mini Schnauzer has a 1-in-3 chance of primary hypertriglyceridemia — abnormally high blood fats. This is often silent until it triggers pancreatitis.\n\nFEEDING RULES FOR LIFE:\n✅ Choose dog food with <15% fat (dry matter basis)\n✅ Treats: carrot sticks, rice cakes, plain cooked chicken\n❌ Never: cheese, sausage, fatty chews, table scraps, high-fat kibble\n❌ Never: one large meal — feed 2–3 smaller meals daily\n\nBLOOD TEST: Ask your vet for a fasting triglyceride + cholesterol panel once per year from age 3.\n\nPANCREATITIS WARNING SIGNS (emergency):\n- Sudden vomiting\n- Hunched, tense abdomen\n- Refusing all food\n- Lethargy + fever\n\nIf ANY of these occur: emergency vet same day."',
  },
];

export const MINIATURE_SCHNAUZER_HEALTH_RISKS = [
  {
    condition: 'Pancreatitis (Hypertriglyceridemia-linked)',
    timing: 'Any age — most commonly triggers after high-fat meal',
    risk_level: 'critical' as const,
    signs: ['Sudden vomiting — often severe and repeated', 'Hunched posture — reluctant to move', 'Tense, painful abdomen', 'Refusing food entirely', 'Fever and lethargy'],
    immediate_action: 'Emergency vet SAME DAY. Pancreatitis can escalate to necrotising pancreatitis and death within 24–48 hours. Do not wait overnight.',
    vet_decision: 'Emergency vet. IV fluids and hospitalisation typically required.',
    note: '32.8% of Mini Schnauzers have primary hypertriglyceridemia; 4.51× pancreatitis risk vs other breeds. Lifelong low-fat diet is mandatory prevention.',
  },
  {
    condition: 'MAC — Mycobacterium Avium Complex',
    timing: 'Onset 1–4 years in homozygous dogs',
    risk_level: 'critical' as const,
    signs: ['Progressive weight loss over weeks to months', 'Enlarged lymph nodes — noticeable at neck, armpits, groin', 'Enlarged abdomen (hepatosplenomegaly)', 'Lethargy and reduced appetite', 'Chronic diarrhoea'],
    immediate_action: 'Urgent vet within 24–48 hours for any progressive weight loss + lymphadenopathy in a Mini Schnauzer. Extensive diagnostics required.',
    vet_decision: 'Urgent vet within 24–48 hours.',
    note: 'Exclusive to Mini Schnauzers. CARD9 c.493_495del. Zoonotic risk to immunocompromised owners. DNA test all breeding stock.',
  },
  {
    condition: 'Myotonia Congenita',
    timing: 'Signs visible at 2–3 weeks of age',
    risk_level: 'high' as const,
    signs: ['Stiff, stilted gait especially after rest', 'Muscle stiffness that improves with activity ("warm-up")', 'Difficulty rising from rest', 'Jaw stiffness — difficulty eating hard food', 'Noisy breathing in severe cases'],
    immediate_action: 'Vet within a week of first signs. DNA confirm with CLCN1 test. Mexiletine can significantly improve quality of life.',
    vet_decision: 'Call vet within a week.',
    note: '>10% carrier rate (Giger 2001). DNA test prevents affected litters. Manageable but lifelong condition.',
  },
  {
    condition: 'Calcium Oxalate Bladder Stones',
    timing: 'Peak incidence males >3 years',
    risk_level: 'high' as const,
    signs: ['Straining to urinate', 'Bloody urine', 'Frequent small urinations', 'Male dog straining with no urine output = EMERGENCY (obstruction)'],
    immediate_action: 'Male straining without urine = EMERGENCY VET IMMEDIATELY (fatal without intervention). Bloody urine/straining with some output = urgent vet same day.',
    vet_decision: 'No urine = emergency. Straining with output = urgent same day.',
    note: 'CaOx 11.8× odds vs other breeds (Lulich 1991). High water intake, wet food, and urinalysis from age 3 are key prevention tools.',
  },
];
