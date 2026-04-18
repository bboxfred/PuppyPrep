/**
 * INFO BASE: BOSTON TERRIER
 * Info base ID: 'boston_terrier'
 *
 * Sources: Evans & Adams 2010 JSAP [PR] (C-section 92.3% — rank #1 globally),
 * UFAW boston-terrier-dystocia (confirms 92% + welfare implications),
 * Eneroth 1999 [PR] (flattened pelvic inlet as primary cause),
 * Tomlinson 2024 PLOS ONE PMC11687697 [PR] (BOAS paradox: Boston lowest clinical
 *   burden of 3 screw-tailed breeds despite most extreme CFR),
 * Mellersh 2006/2007 [PR] (HSF4 hereditary cataract autosomal recessive),
 * Mansour 2018 [PR] (DVL2 frameshift fixed in breed → screw-tail + brachycephalic),
 * BTCA CHIC (bostonterrierclubofamerica.org — RFGS adopted 2024),
 * Merck Vet Manual, Cornell CVM, VCA Animal Hospitals.
 *
 * ⚠️ CRITICAL FLAGS:
 * - C-section rate 92.3% [PR Evans & Adams 2010] — #1 globally
 *   ELECTIVE PLANNED C-SECTION AT DAY 62–63 IS THE STANDARD OF CARE
 *   Emergency C-section in BOAS dam = significantly higher risk
 * - BOAS paradox: most extreme craniofacial ratio but LOWEST clinical BOAS burden
 *   of three screw-tailed breeds (Tomlinson 2024) — 37.5% Grade 0
 *   Do NOT downgrade anaesthetic precautions based on this
 * - HSF4 hereditary cataract: autosomal recessive, detectable 12 weeks,
 *   complete bilateral by 2–3 years; DNA test via UC Davis VGL
 * - Hemivertebrae: common in screw-tail breeds, often subclinical
 * - BAER testing: once in lifetime ≥35 days, required for CHIC
 * - Small litters (3–5), singleton risk elevated
 */

export const BOSTON_TERRIER_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 67 },
  avg_litter_size: { min: 1, max: 7, typical: 4 },
  newborn_weight_grams: { min: 200, max: 310, typical: 255 }, // [EXT from brachycephalic small breed]
  adult_weight_kg: {
    male:   { min: 5.9, max: 11.3 },   // AKC three weight classes
    female: { min: 4.5, max: 9.0  },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const,
  singleton_risk: true,
  csection_rate_percent: 92, // [PR] Evans & Adams 2010 — rank #1 globally
  brachycephalic: true,      // SEVERE — elective C-section mandatory standard of care

  weight_targets: {
    birth:  { min: 200, max: 310,  typical: 255  },
    day_7:  { min: 370, max: 560,  typical: 465  },
    day_14: { min: 530, max: 790,  typical: 660  },
    week_3: { min: 750, max: 1130, typical: 940  },
    week_4: { min: 1065, max: 1600, typical: 1330 },
    week_6: { min: 1770, max: 2660, typical: 2215 },
    week_8: { min: 2380, max: 3580, typical: 2980 },
  },
  daily_gain_minimum_grams: 10,
  daily_gain_target_grams: 18,
  daily_gain_percent_bodyweight: 7,
  dam_lactation_calories_multiplier: { week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0 },
  formula_volumes_per_feeding_ml: {
    week_1: { min: 3,  max: 6,  per_100g_body_weight: 1.8 },
    week_2: { min: 5,  max: 9,  per_100g_body_weight: 2.0 },
    week_3: { min: 8,  max: 13, per_100g_body_weight: 2.5 },
    week_4: { min: 11, max: 18, per_100g_body_weight: 3.0 },
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
    small_litter: { w: 80, d: 80 },
    large_litter:  { w: 100, d: 100 },
    pig_rail_height_cm: 7,
    wall_height_cm: 35,
  },
};

export const BOSTON_TERRIER_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, label: 'First deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Give worm treatment. Boston puppies at 2 weeks typically weigh 370–560g. Use a 1 cc syringe for precision. Never estimate.', vet_required: false, critical: true },
    { day: 28, label: 'Second deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Second treatment. Use current weight.', vet_required: false, critical: true },
    { day: 42, label: 'Third deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg × 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Panacur 3 days.', vet_required: false, critical: true },
    { day: 56, label: 'Fourth deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg × 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Final deworming before rehoming.', vet_required: false, critical: true },
  ],
  dam_deworming: {
    start_day_of_pregnancy: 40, end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur Day 40 through 14 days post-whelp.', critical: true,
  },
  vaccinations: [
    { week: 6,  label: 'First vaccination',  vaccine: 'DHPP #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'First vaccination. Feed puppy 1–2 hours before vet visit — medium hypoglycemia risk. Keep warm. Have Karo syrup available.', vet_required: true, critical: true },
    { week: 10, label: 'Second vaccination', vaccine: 'DHPP #2', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'Second vaccination. Discuss Lepto timing with vet — consider separate visit.', vet_required: true, critical: true },
    { week: 14, label: 'Third vaccination',  vaccine: 'DHPP #3 + Rabies', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'], plain_english: 'Third series plus Rabies.', vet_required: true, critical: true },
    { week: 18, label: 'Final parvo booster', vaccine: 'DHPP #4', covers: ['Distemper', 'Parvovirus'], plain_english: 'Do not skip.', vet_required: true, critical: true },
  ],
  vet_visits: [
    { day: 0,   label: 'Post-C-section: dam + puppies check', urgency: 'within_24_hours', plain_english: 'Post-C-section check within 24 hours. Boston dam needs extended anaesthesia monitoring — BOAS means airway complications in recovery are elevated. Confirm milk supply starting and that puppies are suckling. Brachycephalic neonates can struggle to create adequate suction on teats — monitor closely in first 24h.', critical: true },
    { week: 1,  label: 'Dam and litter check', urgency: 'day_7', plain_english: 'All pups gaining ≥10g/day. With small litters of 3–4, each puppy matters individually. Any singleton or weak puppy needs active supplemental management.', critical: true },
    { week: 6,  label: '⚠️ HSF4 cataract discussion + BOAS assessment + vaccinations', urgency: 'week_6_to_8', plain_english: 'CRITICAL: discuss HSF4 hereditary cataract DNA test. Early cataracts can sometimes be detected at 12 weeks by ophthalmologist. BOAS assessment — discuss RFGS grading. Vaccinations, full physical.', critical: true },
    { week: 8,  label: 'Pre-rehoming check', urgency: 'before_leaving', plain_english: 'Final check. HSF4 DNA results in writing to every new owner. BOAS monitoring instructions. Harness only — no neck collar. Overheating protocol in writing.', critical: true },
  ],
  breed_specific_screenings: [
    {
      name: '⚠️ C-section planning — 92.3% rate [PR]',
      timing: 'Schedule elective C-section at day 62–63 post-LH surge / progesterone <2 ng/mL',
      method: 'Progesterone testing from Day 55; elective C-section at term',
      plain_english: 'Boston Terrier has the highest C-section rate of any breed globally at 92.3% (Evans & Adams 2010 JSAP). Cause: flattened pelvic inlet (Eneroth 1999) combined with brachycephalic foetal head. Elective planned C-section at Day 62–63 is the standard of care — it avoids the emergency C-section scenario where a BOAS dam in dystocia requires anaesthesia under severe respiratory stress. Emergency C-section = significantly higher maternal and foetal mortality than elective.',
      mandatory_for_breeding: true,
    },
    {
      name: 'HSF4 Hereditary Cataract — DNA test MANDATORY',
      timing: 'Test BOTH parents before breeding. Test puppies before rehoming.',
      method: 'DNA test — UC Davis VGL HSF4 gene. Results registered OFA.',
      plain_english: 'Autosomal recessive. HSF4 mutation causes cataracts detectable from 12 weeks, bilateral and complete by 2–3 years. Mellersh 2006/2007. Test via UC Davis VGL. Carrier × carrier = 25% affected litter. Affected dogs go blind in early adulthood. Disclose carrier status in writing to every new owner. Never breed carrier × carrier.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Patellar luxation — OFA every 2 years',
      timing: 'OFA patellar evaluation every 2 years, from 12 months',
      method: 'OFA patellar grading',
      plain_english: 'OFA 5.1% patellar luxation prevalence. Required every 2 years for BTCA CHIC.',
      mandatory_for_breeding: true,
    },
    {
      name: 'BAER testing — congenital deafness',
      timing: 'Once in lifetime at ≥35 days of age',
      method: 'Brainstem Auditory Evoked Response (BAER) test',
      plain_english: 'Congenital deafness associated with piebald S-locus. BAER test at ≥35 days required for BTCA CHIC. Tests each ear individually — dogs can be unilaterally deaf. One-time test required for CHIC number.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CAER eye certification — annual',
      timing: 'Annual CAER exam',
      method: 'Board-certified ACVO ophthalmologist',
      plain_english: 'Annual CAER required BTCA CHIC. Covers HSF4 cataracts and other ocular conditions.',
      mandatory_for_breeding: true,
    },
    {
      name: 'BOAS RFGS grading (adopted 2024)',
      timing: 'Voluntarily adopted by BTCA 2024',
      method: 'Respiratory Functional Grading Scheme',
      plain_english: 'BTCA adopted RFGS in 2024. Tomlinson 2024 PLOS ONE: Boston Terriers have lower clinical BOAS burden than French Bulldogs or English Bulldogs despite more extreme craniofacial ratio — 37.5% Grade 0 in Bostons vs 15.2% Bulldogs. This does NOT mean anaesthetic precautions should be reduced — all Bostons should be managed as brachycephalic breeds perioperatively.',
      mandatory_for_breeding: false,
    },
  ],
};

export const BOSTON_TERRIER_PREGNANCY_EVENTS = [
  {
    id_suffix: 'bt_preg_csection_plan',
    day_offset: -21,
    title: '⚠️ CRITICAL: Plan elective C-section NOW — 92.3% C-section rate, #1 globally',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'Boston Terrier has the highest C-section rate of any breed globally at 92.3% (Evans & Adams 2010). Elective planned C-section is the standard of care.',
    detail: 'WHY ELECTIVE IS SAFER THAN EMERGENCY:\nBoston Terriers have an inherited flattened pelvic inlet (Eneroth 1999) + large brachycephalic foetal head. These two factors mean 92.3% of litters cannot be delivered vaginally.\n\nA Boston dam in prolonged dystocia + then requiring emergency anaesthesia is a severely compromised patient:\n- BOAS means restricted airway baseline\n- Labour exhaustion compounds respiratory stress\n- Emergency anaesthesia = higher risk than calm planned induction\n- Foetal distress from prolonged dystocia increases stillbirth rate\n\nELECTIVE C-SECTION PROTOCOL:\n1. Progesterone testing from Day 55 — test every 48 hours\n2. When progesterone drops to <2 ng/mL (or LH detected): schedule surgery for day 62–63\n3. Pre-oxygenate dam for 3–5 minutes before induction\n4. Full BOAS anaesthetic protocol (below)\n5. Have team ready to stimulate, warm, and clear airways of ALL puppies immediately upon delivery\n\nBOAS ANAESTHESIA FOR BOSTON TERRIERS (SEVERE protocol):\n- Pre-oxygenate 3–5 minutes before induction\n- Cuffed endotracheal tube one size SMALLER than expected\n- Keep intubated as long as possible in recovery\n- Sternal recovery position — never dorsal\n- Tracheostomy kit on standby\n- Do not extubate until swallowing reflex fully returned\n\nContact vet NOW to book surgery date.',
    call_vet_if: 'Any vaginal discharge, labour signs, or temperature drop before scheduled C-section — call immediately',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'bt_preg_hsf4_check',
    day_offset: -42,
    title: '⚠️ HSF4 hereditary cataract DNA test — confirm both parents tested',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'HSF4 causes bilateral cataracts by age 2–3. Autosomal recessive. Test both parents.',
    detail: 'Parent genotype implications:\n✅ Both N/N: No affected puppies\n⚠️ One N/HSF4: 50% carriers — no disease, disclose to new owners\n🔴 Both N/HSF4: 25% of litter affected — will develop cataracts 12 weeks–3 years, completely blind by 2–3 years\n\nDNA test: UC Davis VGL. Register results with OFA.\nAll new owners must receive HSF4 status in writing before the puppy leaves.',
  },
  {
    id_suffix: 'bt_preg_singleton_risk',
    day_offset: -14,
    title: 'Pre-whelping X-ray: Confirm count — singleton Boston Terriers have very high dystocia risk',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'X-ray Day 55–58 to confirm count and any singleton situation.',
    detail: 'X-ray Day 55–58. Boston Terriers typical litter 3–5.\n\nSINGLETON ALERT: A single Boston Terrier foetus grows disproportionately large, further increasing the foetal-pelvic disproportion that already causes 92% C-sections in normal litters. Singleton = near-certain C-section required.\n\nConfirm elective C-section appointment is scheduled before leaving this vet visit.',
  },
];

export const BOSTON_TERRIER_NEONATAL_EVENTS = [
  {
    id_suffix: 'bt_neo_csection_stimulation',
    day_offset: 0,
    title: 'Day 0: Post-C-section — immediate puppy stimulation team critical',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'Boston Terrier C-section puppies are delivered quickly and require an experienced team to stimulate, warm, and clear airways simultaneously.',
    detail: 'With 3–5 puppies delivered rapidly by C-section, you need one person per puppy for the first critical minutes.\n\nIMMEDIATE STEPS PER PUPPY:\n1. Remove membranes from face and mouth\n2. Clear fluid from airway — hold puppy head-down, gentle firm swipes downward\n3. Vigorous towel rubbing to stimulate breathing\n4. Check breathing: chest should be moving rhythmically within 30–60 seconds\n5. Place in warming box at 32°C while siblings delivered\n6. Once all delivered and dam in recovery: begin assisted nursing\n\nBRACHYCEPHALIC NEONATES NURSING NOTE:\nFlat-faced Boston puppies can struggle to create a proper seal on the teat. Monitor every nursing session for the first 48 hours. Any puppy not latching or appearing to nurse without getting milk = tube-feed with Esbilac immediately.',
    call_vet_if: 'Any puppy not breathing within 60 seconds of delivery despite stimulation — continue resuscitation and call vet',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'bt_neo_overheating_risk',
    day_offset: 0,
    title: 'Days 0–84: Overheating risk is lifelong for Boston Terriers — start managing now',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'Brachycephalic puppies are at elevated overheating risk from birth. Whelping box temperature management is critical.',
    detail: 'Boston Terrier brachycephalic airways are less efficient at temperature regulation than mesocephalic breeds from birth.\n\nWeek 1 whelping box: 29.5–32°C\nDo NOT exceed 32°C — brachycephalic puppies overheat more easily than non-brachycephalic at the same ambient temperature.\n\nSigns of overheating in neonates:\n- Puppies spreading to the edges of the box, away from each other\n- Panting (unusual in healthy neonates)\n- Excessive crying when their rectal temperature is already adequate\n\nInform all new owners: Boston Terriers must NEVER be exercised in hot weather, left in cars, or exposed to high temperatures. Overheating is life-threatening in this breed at any age.',
  },
  {
    id_suffix: 'bt_neo_hsf4_test_early',
    day_offset: 14,
    title: 'Week 2: Arrange HSF4 DNA test for all puppies if parent status uncertain',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'If either parent\'s HSF4 status is unknown, test all puppies from Week 2.',
    detail: 'Cheek swab from Day 14 when puppies are stable.\n\nSend to UC Davis VGL for HSF4 test.\n\nResults:\n- N/N (Clear): No HSF4 risk\n- N/HSF4 (Carrier): Unaffected, disclose to new owner in writing\n- HSF4/HSF4 (Affected): Will develop cataracts from 12 weeks, fully blind by 2–3 years\n\nAffected puppies: consult with vet. Some breeders place affected puppies with fully informed owners who understand the prognosis — complete written disclosure of cataract timeline is required.\n\nAll new owners must receive HSF4 status in writing.',
    call_vet_if: 'Any puppy tests HSF4/HSF4 affected — vet consultation on management',
  },
];

export const BOSTON_TERRIER_HEALTH_RISKS = [
  {
    condition: 'HSF4 Hereditary Cataract',
    timing: 'Detectable from 12 weeks; complete bilateral cataract by 2–3 years',
    risk_level: 'critical' as const,
    signs: ['Cloudy or whitish appearance developing in one or both eyes', 'Difficulty navigating in dim light (early)', 'Bumping into objects', 'Progressive vision loss to complete blindness by 2–3 years'],
    immediate_action: 'Book ophthalmologist for assessment. Not an emergency — but requires planning for the dog\'s future.',
    vet_decision: 'Ophthalmologist referral for assessment and monitoring. Cataract surgery available but expensive.',
    note: 'Autosomal recessive HSF4. DNA test prevents affected litters. Carrier × carrier should never be repeated.',
  },
  {
    condition: 'BOAS — Brachycephalic Obstructive Airway Syndrome',
    timing: 'Present from birth; worsens with weight gain; crisis in hot weather',
    risk_level: 'critical' as const,
    signs: ['Noisy breathing — snorting, snoring', 'Exercise intolerance — stopping after short walks', 'Open-mouth breathing at rest', 'Cyanotic (blue/purple) gums or tongue — EMERGENCY', 'Fainting or collapse after exertion'],
    immediate_action: 'Blue gums or collapse = EMERGENCY VET. Exercise intolerance = vet within 48 hours. BOAS surgery can significantly improve quality of life.',
    vet_decision: 'Blue gums = emergency. Noisy breathing affecting exercise = urgent vet.',
    note: 'Boston Terriers have LOWER clinical BOAS burden than other screw-tailed breeds (Tomlinson 2024) — 37.5% Grade 0. However, all Bostons need heat avoidance, weight management, and BOAS-aware veterinary care.',
  },
  {
    condition: 'Hemivertebrae',
    timing: 'Present from birth; symptoms variable — often subclinical',
    risk_level: 'medium' as const,
    signs: ['Abnormal tail screw (expected in breed)', 'Wobbling or weakness in hindlimbs (unusual)', 'Difficulty walking straight', 'Incontinence (rare, severe cases)'],
    immediate_action: 'Any neurological signs (weakness, wobbling, incontinence) = vet within 24 hours. Asymptomatic: monitor.',
    vet_decision: 'Neurological signs = urgent vet. No symptoms = monitor at regular wellness exams.',
    note: 'Thoracic hemivertebrae common in screw-tail breeds. Often subclinical. Spine radiograph recommended pre-breeding.',
  },
];
