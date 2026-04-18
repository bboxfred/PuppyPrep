/**
 * INFO BASE: HAVANESE
 * Info base ID: 'havanese'
 *
 * Sources: Havanese Club of America CHIC (havanese.org / havaneseclubofamerica.org),
 * HCA Health Statement 2025 [BC],
 * Borge et al. (Norwegian Vet School) [PR-cited via BC] (litter avg 4, range 1–9, n=73),
 * Birth weight 195g avg, range 165–215g, n=37 [PR-cited via BC],
 * Brown/Bannasch 2017 PNAS [PR] (FGF4 retrogene CDDY — OR 51.2 IVDD),
 * Parker 2009 [PR] (FGF4L1 CFA18 — CDPA near-fixed in Havanese),
 * Paw Print Genetics [BC] (~95% Havanese homozygous CDPA),
 * Bellamy 2023 Canine Med Genet [PR] (hereditary cataract NOT HSF4 in Havanese;
 *   two loci CFA20 + CFA21 posterior polar),
 * OFA data: hips 10.8% abnormal [BC],
 * HCA CHIC update May 2022 (BAER removed from required list),
 * Merck Vet Manual, Cornell CVM, VCA Animal Hospitals.
 *
 * ⚠️ CRITICAL FLAGS:
 * - CDPA + CDDY/IVDD: ~95% of Havanese homozygous CDPA (near-fixed)
 *   FGF4 retrogene — Hansen Type I IVDD; OR 51.2
 *   Counsel all owners: no jumping from furniture
 * - Hereditary cataract: NOT HSF4 in Havanese (Bellamy 2023)
 *   Two loci CFA20 + CFA21 — annual CAER required
 * - Hip dysplasia: OFA 10.8% abnormal — notably high for a toy breed
 * - Hypoglycemia risk: HIGH — toy breed neonates 165–215g birth weight
 * - BAER removed from CHIC required May 2022 (still recommended)
 * - Litter size small (avg 4): singleton risk elevated
 */

export const HAVANESE_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 1, max: 9, typical: 4 }, // [PR via BC — n=73 litters]
  newborn_weight_grams: { min: 165, max: 215, typical: 195 }, // [PR via BC — n=37]
  adult_weight_kg: {
    male:   { min: 3.2, max: 5.9 },
    female: { min: 3.2, max: 5.9 },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'high' as const, // Toy breed, 165–215g birth weight
  singleton_risk: true,
  csection_rate_percent: 12, // [EXT — small breed singleton risk elevated]
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 165, max: 215,  typical: 195  },
    day_7:  { min: 305, max: 390,  typical: 350  },
    day_14: { min: 435, max: 555,  typical: 495  },
    week_3: { min: 620, max: 790,  typical: 705  },
    week_4: { min: 880, max: 1120, typical: 1000 },
    week_6: { min: 1460, max: 1860, typical: 1660 },
    week_8: { min: 1960, max: 2500, typical: 2230 },
  },
  daily_gain_minimum_grams: 8,
  daily_gain_target_grams: 12,
  daily_gain_percent_bodyweight: 7,
  dam_lactation_calories_multiplier: { week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0 },
  formula_volumes_per_feeding_ml: {
    week_1: { min: 2,   max: 4,  per_100g_body_weight: 1.5 },
    week_2: { min: 3,   max: 6,  per_100g_body_weight: 1.8 },
    week_3: { min: 4.5, max: 8,  per_100g_body_weight: 2.0 },
    week_4: { min: 6,   max: 11, per_100g_body_weight: 2.5 },
  },
  // 90-min week-1 cadence matches the other HIGH-hypoglycaemia-risk breeds
  // (Chihuahua, Yorkie, Pom, Maltese, Toy Poodle). Havanese neonates at
  // 165–215g birth weight cannot safely go 2h between feeds in Week 1.
  feeding_frequency_hours: { week_1: 1.5, week_2: 2, week_3: 2.5, week_4: 3 },
  tube_size_french: 5,   // 3.5 Fr for any neonate under 150g
  max_stomach_capacity_ml_per_100g: 4,
  whelping_box_temp_celsius: {
    week_1:      { min: 30, max: 32,   ideal: 31   }, // Slightly higher for toy breed
    week_2:      { min: 27, max: 30,   ideal: 28.5 },
    week_3:      { min: 25, max: 27,   ideal: 26   },
    week_4_plus: { min: 22, max: 25,   ideal: 23   },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 37.2, danger_below: 35.0 },
    day_5_14:    { min: 35.0, max: 37.2, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },
  whelping_box_cm: {
    small_litter: { w: 70, d: 70 },
    large_litter:  { w: 85, d: 85 },
    pig_rail_height_cm: 6,
    wall_height_cm: 30,
  },
};

export const HAVANESE_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, label: 'First deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Worm treatment. Havanese pups at 2 weeks weigh 305–390g — use 1 cc syringe for precision. With typical litters of 4, individual weight variation matters.', vet_required: false, critical: true },
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
    { week: 6,  label: 'First vaccination', vaccine: 'DHPP #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'First vaccination. Feed 1–2 hours before — HIGH hypoglycemia risk. Keep puppy warm. Karo syrup in bag.', vet_required: true, critical: true },
    { week: 10, label: 'Second vaccination', vaccine: 'DHPP #2', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'Second vaccination. Discuss Lepto timing with vet.', vet_required: true, critical: true },
    { week: 14, label: 'Third vaccination', vaccine: 'DHPP #3 + Rabies', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'], plain_english: 'Third series plus Rabies.', vet_required: true, critical: true },
    { week: 18, label: 'Final parvo booster', vaccine: 'DHPP #4', covers: ['Distemper', 'Parvovirus'], plain_english: 'Do not skip.', vet_required: true, critical: true },
  ],
  vet_visits: [
    { day: 0,   label: 'Post-whelping dam check', urgency: 'within_24_hours', plain_english: 'Vet check within 24h. With avg litters of 4, a retained puppy is easy to miss. Confirm milk supply starting — high hypoglycemia risk with small neonates.', critical: true },
    { week: 1,  label: 'Dam and litter check', urgency: 'day_7', plain_english: 'All pups gaining ≥8g per day. Each pup in a small litter matters individually — any below 75% of litter average needs supplemental feeding immediately.', critical: true },
    { week: 6,  label: 'Puppy wellness + hip discussion + IVDD briefing', urgency: 'week_6_to_8', plain_english: 'Vaccinations, full physical. Discuss CDDY/CDPA IVDD risk — no-jumping protocol for every new owner. OFA hip recommendation at 24 months. Annual CAER from age 1.', critical: true },
    { week: 8,  label: 'Pre-rehoming check', urgency: 'before_leaving', plain_english: 'All DNA results in writing. IVDD no-jumping protocol in writing. Hypoglycemia emergency protocol for new owners. Harness recommended (not required, no SM risk, but protects neck).', critical: true },
  ],
  breed_specific_screenings: [
    {
      name: 'Hip dysplasia — OFA required (≥24mo)',
      timing: 'OFA ≥24mo — required HCA CHIC',
      method: 'OFA radiograph',
      plain_english: 'OFA 10.8% abnormal — notably high for a toy breed. Required HCA CHIC from age 24 months.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Patellar luxation — OFA required (≥12mo)',
      timing: 'OFA from 12 months — required HCA CHIC',
      method: 'OFA patellar grading',
      plain_english: 'Required HCA CHIC from 12 months. Repeat annually.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CAER eye exam — annual required',
      timing: 'Annual CAER from age 1',
      method: 'Board-certified ACVO ophthalmologist',
      plain_english: 'Annual CAER required HCA CHIC. Havanese hereditary cataract is NOT HSF4 (Bellamy 2023) — caused by two loci on CFA20 and CFA21 (posterior polar cataract). No DNA test currently available. Annual CAER is the only screening tool.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CDDY/CDPA (IVDD risk) — DNA test strongly recommended',
      timing: 'Test both parents before breeding',
      method: 'DNA test — UC Davis VGL FGF4 retrogene',
      plain_english: 'Paw Print Genetics data suggests ~95% of Havanese are homozygous for CDPA (near-fixed in the breed — Parker 2009). The CDDY locus (FGF4 retrogene CFA12) confers Hansen Type I IVDD with OR 51.2 (Brown/Bannasch 2017 PNAS). All Havanese owners should be briefed: no jumping from furniture, ramps/stairs instead of jumping off beds/sofas. DNA test identifies CDDY status for more precise risk counselling.',
      mandatory_for_breeding: false,
    },
    {
      name: 'prcd-PRA — DNA test',
      timing: 'DNA test both parents',
      method: 'UC Davis VGL or equivalent direct-mutation test',
      plain_english: 'prcd-PRA on HCA recommended panel. Carrier rate not published breed-wide. Clear × clear mandatory.',
      mandatory_for_breeding: false,
    },
    {
      name: 'BAER — optional (removed from required CHIC May 2022)',
      timing: 'Once at ≥35 days (optional)',
      method: 'Brainstem Auditory Evoked Response',
      plain_english: 'HCA removed BAER from required CHIC on 25 May 2022. OFA data shows 99.7% normal in tested Havanese. Still recommended optionally — test once at ≥35 days.',
      mandatory_for_breeding: false,
    },
  ],
};

export const HAVANESE_PREGNANCY_EVENTS = [
  {
    id_suffix: 'hav_preg_hypoglycemia_prep',
    day_offset: -21,
    title: '⚠️ Prepare HIGH hypoglycemia protocol before whelping',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'Havanese neonates at 165–215g are in the high hypoglycemia risk category. Every piece of equipment must be ready before birth.',
    detail: 'SUPPLIES REQUIRED BEFORE WHELPING:\n- Karo light corn syrup — on the counter, not the cupboard\n- French 5 feeding tube × 2 (3.5 Fr if any pup under 150g)\n- 1 cc syringes × 20 (for tiny precise doses)\n- Digital scale accurate to ±1g\n- Esbilac puppy milk replacer\n- Heating pad\n- Small warm box\n\nHYPOGLYCEMIA EMERGENCY PROTOCOL:\n1. WARM THE PUPPY FIRST — cold gut cannot absorb glucose\n2. Rub Karo corn syrup on the gums — transmucosal absorption, no swallowing needed\n3. Repeat every 15 minutes until responsive\n4. Emergency vet within 30 minutes regardless of apparent recovery\n\nSigns: lethargy, trembling, pale gums, seizure, unresponsiveness.\n\nFEEDING: every 2 hours in Week 1. Never exceed 4 hours between feeds under 8 weeks.',
    call_vet_if: 'Any puppy shows lethargy, trembling, pale gums, or seizure — emergency vet within 30 minutes',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'hav_preg_singleton_csection',
    day_offset: -14,
    title: 'Pre-whelping X-ray Day 55–58: Singleton watch',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'With average litters of 4, singletons are possible. Singleton Havanese puppies carry elevated dystocia risk.',
    detail: 'X-ray Day 55–58. Havanese average 4 puppies (range 1–9).\n\nFor any singleton identified:\n- Discuss elective C-section at Day 63 with vet\n- Single Havanese puppy can grow disproportionately large relative to the tiny dam\n- Have vet emergency contact confirmed and tested before the due date\n\nFor normal litter (3–5): Havanese are generally good whelpers. ~12% C-section rate [EXT]. Vet emergency contact confirmed.',
  },
];

export const HAVANESE_NEONATAL_EVENTS = [
  {
    id_suffix: 'hav_neo_hypoglycemia_week1',
    day_offset: 0,
    title: '⚠️ Days 0–56: HIGH hypoglycemia risk — feed every 2 hours, never skip',
    category: 'nutrition' as const, priority: 'critical' as const, is_free: true,
    description: 'Havanese neonates are in the high hypoglycemia risk category from birth through 8 weeks.',
    detail: 'Havanese average birth weight is 195g (range 165–215g). This places them firmly in high hypoglycemia risk territory.\n\nWEEK 1 FEEDING:\n- Every 2 hours — 12 feeds per 24 hours\n- 1.5 ml Esbilac per 100g body weight per feed\n- Formula warmed to 38°C\n- NEVER feed a cold puppy — warm to ≥35°C rectal temperature first\n\nHYPOGLYCEMIA TRIGGERS:\n- Cold ambient temperature\n- Missing a feed\n- Dam not producing adequate milk\n- Smallest pup displaced from teats\n- Illness\n\nKaro corn syrup must remain accessible at all times throughout the neonatal period and through 8 weeks of age.',
    call_vet_if: 'Any hypoglycemia symptoms — emergency vet within 30 minutes',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'hav_neo_ivdd_owner_brief',
    day_offset: 42,
    title: 'Week 6: IVDD no-jumping protocol — give every new Havanese owner written instructions',
    category: 'health' as const, priority: 'critical' as const, is_free: false,
    description: '~95% of Havanese carry CDPA (near-fixed in breed). CDDY confers OR 51.2 for Hansen Type I IVDD. Lifetime management starts now.',
    detail: 'Give every new Havanese owner this in writing:\n\n"Your Havanese is a chondrodystrophic breed — approximately 95% of Havanese carry the gene that causes premature disc degeneration (chondrodystrophy). This means the spinal discs can rupture suddenly, causing paralysis.\n\nLIFETIME RULES TO REDUCE IVDD RISK:\n🚫 No jumping off furniture (sofa, bed, chairs)\n🚫 No jumping out of cars\n✅ Use ramps or pet stairs for any surface higher than the dog\'s back\n✅ Lift the dog when getting in/out of cars\n✅ Maintain lean body weight — every gram extra increases disc stress\n\nIVDD EMERGENCY SIGNS (act within hours — not days):\n🔴 Sudden back pain — yelping for no obvious reason\n🔴 Reluctance to move, head held low\n🔴 Weakness in any limb\n🔴 Dragging back legs\n🔴 Loss of bladder/bowel control\n\nAny of these signs = EMERGENCY VET IMMEDIATELY. IVDD is a surgical emergency — the window for successful intervention is narrow."\n\nProvide this as a printed card with the puppy.',
    call_vet_if: 'Any sudden pain, limb weakness, or loss of bladder/bowel control — EMERGENCY VET IMMEDIATELY',
    emergency_contact_recommended: true,
  },
];

export const HAVANESE_HEALTH_RISKS = [
  {
    condition: 'IVDD — Intervertebral Disc Disease (Type I)',
    timing: 'Can occur any age from ~2 years; peak 3–7 years',
    risk_level: 'critical' as const,
    signs: ['Sudden back pain — yelping unexpectedly', 'Reluctance to move, hunched posture', 'Weakness or stumbling in hindlimbs', 'Dragging one or both back legs', 'Loss of bladder or bowel control'],
    immediate_action: 'EMERGENCY VET IMMEDIATELY. The window for surgical intervention that preserves walking ability can be as short as hours. Never wait overnight.',
    vet_decision: 'Emergency vet same hour. CT or MRI for surgical planning.',
    note: '~95% Havanese homozygous CDPA (near-fixed). FGF4 retrogene CDDY — OR 51.2 for Type I IVDD. Ramps, no jumping off furniture, lean weight — the three most important preventive measures.',
  },
  {
    condition: 'Hypoglycemia (Low Blood Sugar)',
    timing: 'Birth through 12 weeks highest risk; can occur throughout adulthood with stress',
    risk_level: 'critical' as const,
    signs: ['Sudden lethargy or weakness', 'Trembling or shaking', 'Pale or white gums', 'Seizure', 'Unresponsive'],
    immediate_action: 'Warm first. Karo on gums. Emergency vet within 30 minutes regardless of apparent recovery.',
    vet_decision: 'Emergency vet every time.',
    note: 'High risk category — 165–215g birth weight. Every 2 hours feeding in Week 1. Karo syrup always accessible through 8 weeks.',
  },
  {
    condition: 'Hip Dysplasia',
    timing: 'Symptoms from 4 months; OFA confirmation at 24 months',
    risk_level: 'high' as const,
    signs: ['Limping or uneven gait', 'Stiffness rising', 'Reluctance to exercise', 'Bunny-hopping'],
    immediate_action: 'Vet within a week of persistent lameness. Lean body weight is the most impactful intervention.',
    vet_decision: 'Call vet within a week.',
    note: 'OFA 10.8% abnormal — unusually high for toy breed. Required CHIC screening.',
  },
];
