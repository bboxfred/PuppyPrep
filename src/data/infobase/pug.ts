/**
 * INFO BASE: PUG
 * Info base ID: 'pug'
 *
 * Sources: Evans & Adams 2010 JSAP [PR] (C-section 27.3% — NOT 60–86%)
 * O'Neill 2017 Vet Record [PR] (dystocia OR 11.3 — justifies elective C-section)
 * O'Neill 2022 VetCompass 4,308 Pugs [PR] (BOAS OR 53.92, corneal ulcer OR 13.01)
 * Liu 2017 Cambridge BOAS plethysmography [PR] (Pug most severely affected)
 * Ryan 2017 Vet J n=68 neurologically normal Pugs [PR] (17.6% HV, 38.2% spina bifida)
 * Wachowiak 2023 JVIM [PR] (Pug Myelopathy constrictive, T10–T13)
 * Greer 2010 Tissue Antigens [PR] (DLA CFA12 NME/PDE — S/S OR 12.75)
 * UC Davis VGL PDE susceptibility test (vgl.ucdavis.edu/test/pde-susceptibility)
 * Levine 2008 [PR] (~1.2% of Pugs die from NME; S/S freq 6–18%)
 * OFA data: Pug hip dysplasia rank #2 of ~187 breeds, ~60–70% dysplastic [BC]
 * PDCA CHIC (pugdogclub.org)
 * Merck Vet Manual, Cornell CVM, VCA Animal Hospitals.
 *
 * ⚠️ C-SECTION RATE CORRECTION:
 * Pug C-section rate = 27.3% per Evans & Adams 2010 [PR]
 * NOT 60–86% (that range applies to English Bulldog 86%, French Bulldog 81%)
 * Clinical justification for elective C-section: O'Neill 2017 dystocia OR 11.3
 * — Pugs are 11× more likely to experience dystocia than crossbreeds
 * → Elective planned C-section at Day 63 is standard of care
 *
 * ⚠️ CRITICAL FLAGS:
 * - BOAS: OR 53.92 (O'Neill 2022) — #1 BOAS breed globally
 *   Severe brachycephalic protocol for ALL procedures
 * - Pug Myelopathy (PDM): near-exclusive to Pugs; progressive paraparesis
 * - PDE/NME: S/S haplotype OR 12.75; ~1.2% die from it; S/S freq 6–18%
 *   DNA test via UC Davis VGL — MANDATORY for all breeding Pugs
 * - PKDef: fatal <4yr; UC Davis bundles with PDE test
 * - Hip dysplasia: #2 of ~187 breeds, ~60–70% dysplastic
 * - Corneal ulcers: OR 13.01 (O'Neill 2022) — highest prevalence breed
 * - Hemivertebrae: 17.6% HV in neurologically NORMAL Pugs (Ryan 2017)
 */

export const PUG_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 67 },
  avg_litter_size: { min: 1, max: 6, typical: 3 }, // Bergström 2006 [PR]: ~3.1 pups
  newborn_weight_grams: { min: 140, max: 210, typical: 175 }, // [EXT from brachycephalic small breed]
  adult_weight_kg: {
    male:   { min: 6.3, max: 8.2 },  // AKC standard; UK VetCompass median 8.95kg
    female: { min: 5.5, max: 7.5 },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'high' as const,   // Small brachycephalic neonates; nursing difficulty
  singleton_risk: true,
  csection_rate_percent: 27,  // [PR] Evans & Adams 2010 — dystocia OR 11.3 (O'Neill 2017)
  brachycephalic: true,       // SEVERE — elective C-section and full BOAS anaesthesia protocol

  weight_targets: {
    birth:  { min: 140, max: 210,  typical: 175  },
    day_7:  { min: 260, max: 380,  typical: 320  },
    day_14: { min: 370, max: 540,  typical: 455  },
    week_3: { min: 530, max: 770,  typical: 650  },
    week_4: { min: 750, max: 1090, typical: 920  },
    week_6: { min: 1245, max: 1815, typical: 1530 },
    week_8: { min: 1675, max: 2440, typical: 2055 },
  },
  daily_gain_minimum_grams: 8,
  daily_gain_target_grams: 13,
  daily_gain_percent_bodyweight: 7,
  dam_lactation_calories_multiplier: { week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0 },
  formula_volumes_per_feeding_ml: {
    week_1: { min: 2,  max: 4,  per_100g_body_weight: 1.5 },
    week_2: { min: 3,  max: 6,  per_100g_body_weight: 1.8 },
    week_3: { min: 4,  max: 8,  per_100g_body_weight: 2.0 },
    week_4: { min: 6,  max: 11, per_100g_body_weight: 2.5 },
  },
  // 90-min week-1 cadence matches every other HIGH-hypoglycaemia-risk
  // breed. Pug neonates (140–210g birth, brachycephalic nursing difficulty)
  // need tighter intervals — standard 2h risks hypoglycaemic collapse in
  // puppies that struggle to latch due to short snout + domed palate.
  feeding_frequency_hours: { week_1: 1.5, week_2: 2, week_3: 2.5, week_4: 3 },
  tube_size_french: 5,
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
    small_litter: { w: 75, d: 75 },
    large_litter:  { w: 90, d: 90 },
    pig_rail_height_cm: 6,
    wall_height_cm: 30,
  },
};

export const PUG_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, label: 'First deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Worm treatment. Pug pups at 2 weeks typically 260–380g. Use 1 cc syringe.', vet_required: false, critical: true },
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
    { week: 6,  label: 'First vaccination', vaccine: 'DHPP #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'First vaccination. Feed 1–2 hours before — high hypoglycemia risk. Keep warm. Karo syrup available. Minimal stress — BOAS pups are sensitive to handling stress.', vet_required: true, critical: true },
    { week: 10, label: 'Second vaccination', vaccine: 'DHPP #2', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'Second vaccination. Discuss Lepto timing with vet — separate visit preferred.', vet_required: true, critical: true },
    { week: 14, label: 'Third vaccination', vaccine: 'DHPP #3 + Rabies', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'], plain_english: 'Third series plus Rabies.', vet_required: true, critical: true },
    { week: 18, label: 'Final parvo booster', vaccine: 'DHPP #4', covers: ['Distemper', 'Parvovirus'], plain_english: 'Do not skip.', vet_required: true, critical: true },
  ],
  vet_visits: [
    { day: 0,   label: 'Post-C-section: dam + puppies', urgency: 'within_24_hours', plain_english: 'Post-C-section check within 24h. Brachycephalic dam needs EXTENDED anaesthesia recovery monitoring. Keep intubated until swallowing reflex fully returned. Sternal recovery position mandatory. Confirm milk supply starting — flat-faced Pug puppies can struggle to create seal on teat.', critical: true },
    { week: 1,  label: 'Dam and litter check', urgency: 'day_7', plain_english: 'All pups gaining ≥8g per day. Monitor nursing carefully — brachycephalic neonates tire quickly at teat. Supplement any pup not gaining by day 2.', critical: true },
    { week: 6,  label: '⚠️ PDE + PKDef DNA results + BOAS assessment + eye inspection', urgency: 'week_6_to_8', plain_english: 'CRITICAL: PDE and PKDef DNA test results to every new owner in writing. BOAS assessment. Request corneal surface examination — Pugs have highest corneal ulcer incidence of any breed. Vaccinations, full physical.', critical: true },
    { week: 8,  label: 'Pre-rehoming check', urgency: 'before_leaving', plain_english: 'PDE/PKDef DNA in writing. Corneal eye care protocol (daily fold cleaning). BOAS: harness only, never collar. Overheating protocol. Hemivertebrae/Pug Myelopathy awareness from age 3. Weight management absolutely critical for BOAS.', critical: true },
  ],
  breed_specific_screenings: [
    {
      name: '⚠️ C-section planning — dystocia OR 11.3 justifies elective',
      timing: 'Schedule elective C-section at day 63 post-LH surge / progesterone <2 ng/mL',
      method: 'Progesterone testing from Day 55; elective C-section at term',
      plain_english: 'Pug C-section rate is 27.3% (Evans & Adams 2010) — NOT 60–86% which applies to English/French Bulldogs. However, O\'Neill 2017 reports Pug dystocia OR 11.3 vs crossbreeds — Pugs are 11× more likely to experience dystocia. Elective planned C-section at Day 63 is the recommended standard of care. BOAS anaesthesia protocol MANDATORY (see below). Small litters of ~3 and rounded brachycephalic foetal heads contribute to obstruction risk.',
      mandatory_for_breeding: true,
    },
    {
      name: '⚠️ PDE (Pug Dog Encephalitis) / NME — UC Davis VGL DNA MANDATORY',
      timing: 'Test BOTH parents before breeding',
      method: 'UC Davis VGL PDE susceptibility test — DLA CFA12 haplotype (N/S/S scoring)',
      plain_english: 'Necrotizing Meningoencephalitis (NME/PDE) is a fatal autoimmune brain disease. UC Davis VGL data: ~40% of Pugs carry the S allele; ~11% are S/S (homozygous high-risk). S/S dogs are 12.75× more likely to develop NME (OR 12.75, Greer 2010). ~1.2% of Pugs die from it (Levine 2008). S/S haplotype frequency 6–18% across studies. Test results: N/N (low risk), N/S (low risk but carries allele), S/S (12.75× elevated lifetime risk). Breed N/N × N/N or N/N × N/S where possible. Disclose S/S status in writing to every new owner. UC Davis offers a combined PDE + PKDef test at reduced cost.',
      mandatory_for_breeding: true,
    },
    {
      name: '⚠️ PKDef — Pyruvate Kinase Deficiency DNA',
      timing: 'Test both parents — available bundled with PDE at UC Davis',
      method: 'UC Davis VGL PKDef test (PKLR gene)',
      plain_english: 'PKDef causes progressive haemolytic anaemia, bone marrow failure, and liver failure — fatal by age 4. Autosomal recessive. No treatment. UC Davis offers PDE + PKDef bundled for $80 (vs $55 each separately). Test both parents. Carrier × carrier = 25% affected litter.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CAER eye exam — annual',
      timing: 'Annual from age 1',
      method: 'Board-certified ACVO ophthalmologist',
      plain_english: 'Annual CAER required PDCA CHIC. Pugs have the highest corneal ulcer rate of any breed (OR 13.01, O\'Neill 2022; 5.42%/year). Also covers pigmentary keratopathy and KCS.',
      mandatory_for_breeding: true,
    },
    {
      name: 'OFA patellar luxation',
      timing: 'OFA from 12 months',
      method: 'OFA patellar grading',
      plain_english: 'Required PDCA CHIC.',
      mandatory_for_breeding: true,
    },
    {
      name: 'OFA hips — recommended (not required CHIC)',
      timing: 'OFA ≥24mo; PennHIP from 16wk',
      method: 'OFA radiograph or PennHIP',
      plain_english: 'OFA ranks Pug #2 of ~187 breeds for hip dysplasia at ~60–70% dysplastic. PDCA recommends OFA hips for responsible breeding.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Spine radiograph — hemivertebrae',
      timing: 'Thoracic spine radiograph before breeding',
      method: 'Thoracic spine radiograph by veterinarian',
      plain_english: 'Ryan 2017 Vet J: 17.6% hemivertebrae, 38.2% spina bifida, 30.9% transitional T13 in neurologically NORMAL Pugs (n=68). Radiology pre-breeding to document spinal status. Severe hemivertebrae = elevated Pug Myelopathy risk in offspring.',
      mandatory_for_breeding: false,
    },
  ],
};

export const PUG_PREGNANCY_EVENTS = [
  {
    id_suffix: 'pug_preg_csection_plan',
    day_offset: -21,
    title: '⚠️ CRITICAL: Plan elective C-section — dystocia OR 11.3 makes this standard of care',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'Pug C-section rate is 27.3% (not 60–86%), but dystocia OR 11.3 means elective C-section is the safest approach.',
    detail: 'IMPORTANT CORRECTION:\nPug C-section rate = 27.3% (Evans & Adams 2010 JSAP). NOT 60–86% — that applies to English Bulldog (86%), French Bulldog (81%).\n\nHOWEVER: O\'Neill 2017 documents Pug dystocia OR 11.3 — Pugs are 11× more likely to experience dystocia than crossbreeds. Combined with severe BOAS, an emergency C-section in a Pug in prolonged dystocia is high-risk.\n\nELECTIVE C-SECTION PROTOCOL:\n1. Progesterone testing from Day 55 — every 48 hours\n2. Progesterone <2 ng/mL / LH surge + 63 days: schedule surgery\n3. Full BOAS anaesthesia protocol (see below)\n4. Small litters of ~3: every puppy needs immediate stimulation team\n\nBOAS ANAESTHESIA — SEVERE PROTOCOL:\n⚠️ Pre-oxygenate 3–5 minutes before induction\n⚠️ Cuffed ET tube one size SMALLER than expected\n⚠️ Keep intubated as long as possible in recovery\n⚠️ Sternal recovery — NEVER dorsal\n⚠️ Tracheostomy kit on standby\n⚠️ Do not extubate until swallowing reflex fully returned\n\nContact vet now to book date.',
    call_vet_if: 'Any labour signs before scheduled C-section — call immediately',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'pug_preg_pde_pkdef',
    day_offset: -42,
    title: '⚠️ Confirm PDE and PKDef DNA status on both parents',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'PDE is fatal and exclusively affects Pugs. UC Davis bundles PDE + PKDef for $80.',
    detail: 'PDE (NME) HAPLOTYPE GUIDE:\n✅ N/N × N/N: All puppies N/N or N/N — no high-risk S/S offspring possible\n⚠️ N/N × N/S: 50% N/N, 50% N/S — all low risk\n⚠️ N/S × N/S: 25% S/S (high-risk), 50% N/S, 25% N/N\n🔴 S/S × any: 50–100% S/S (depending on partner) — high-risk offspring\n\nS/S dogs are 12.75× more likely to develop fatal NME in their lifetime.\n~1.2% of all Pugs die from NME. S/S frequency in breed: 6–18%.\n\nPKDef: fatal haemolytic anaemia before age 4. Autosomal recessive.\n\nOrder UC Davis PDE + PKDef bundle now (vgl.ucdavis.edu/test/pde-susceptibility). Results in ~2 weeks.',
    call_vet_if: 'Both parents are S/S for PDE — genetic counselling before proceeding with breeding',
  },
];

export const PUG_NEONATAL_EVENTS = [
  {
    id_suffix: 'pug_neo_csection_stimulation',
    day_offset: 0,
    title: 'Day 0: C-section puppy stimulation — flat face makes airway clearing critical',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'Brachycephalic Pug neonates need immediate, effective airway clearing and stimulation after C-section delivery.',
    detail: 'Pug neonates delivered by C-section require prompt, effective care.\n\nPER PUPPY IMMEDIATELY:\n1. Remove membranes — pay particular attention to face and flat nostrils\n2. Clear airway — hold pup head-down, firm swipes downward, clear nostrils\n3. Vigorous towel rubbing to stimulate breathing\n4. With flat nostrils: use a small bulb syringe to clear nasal passages if needed\n5. Check breathing: rhythmic chest movement within 30–60 seconds\n6. Warming box at 31°C until all siblings delivered\n\nBRACHYCEPHALIC NURSING NOTE:\nFlat-faced Pug pups struggle to create a seal on the teat more than non-brachycephalic breeds. Monitor every nursing session in the first 48 hours. Any pup nursing vigorously but not getting milk = tube-feed Esbilac immediately.\n\nWith typical litters of only 3 pups, every single puppy is essential. Do not adopt a "wait and see" approach.',
    call_vet_if: 'Any puppy not breathing within 60 seconds despite stimulation',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'pug_neo_eye_fold_cleaning',
    day_offset: 0,
    title: 'Days 0+: Daily facial fold and eye area cleaning — critical from birth',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'Pug facial folds and nasal roll must be cleaned daily from birth. Skin-fold dermatitis and corneal irritation begin in neonates.',
    detail: 'Pug has the highest corneal ulcer rate of any breed (OR 13.01, 5.42%/year; O\'Neill 2022) and the highest skin-fold dermatitis rate (OR 10.98). Both begin in neonates.\n\nDAILY ROUTINE FROM BIRTH:\n1. Gently wipe inside all facial folds with a soft damp cloth — every fold, daily\n2. Pay special attention to the nasal roll (fold above the nose)\n3. Dry thoroughly after cleaning — moisture trapped in folds = yeast + bacterial growth\n4. Inspect eyes at every cleaning: any redness, discharge, or squinting = vet same day\n\nWARNING SIGNS FOR IMMEDIATE VET:\n- Eye is red, swollen, or partially closed\n- Any scratch or opacity on the cornea (cloudiness)\n- Discharge from eye that is yellow or green\n\nInform every new Pug owner: daily fold cleaning is a lifelong non-negotiable routine. Neglect causes chronic painful skin infections and corneal damage.',
    call_vet_if: 'Any eye redness, squinting, or corneal opacity — vet same day (corneal ulcers progress rapidly)',
  },
  {
    id_suffix: 'pug_neo_pde_owner_brief',
    day_offset: 42,
    title: 'Week 6: PDE/NME owner briefing — every new Pug owner must receive this before leaving',
    category: 'health' as const, priority: 'critical' as const, is_free: false,
    description: 'PDE affects ~1.2% of Pugs and is invariably fatal. New owners must know the signs.',
    detail: 'Pug Dog Encephalitis (PDE), also called Necrotizing Meningoencephalitis (NME), is a fatal autoimmune brain disease specific to Pugs.\n\nFACTS FOR NEW OWNERS:\n- ~1.2% of Pugs die from PDE (Levine 2008)\n- Typical onset: 6 months to 3 years; average 18 months\n- S/S haplotype dogs are 12.75× more likely to develop it\n- There is no cure — treatment is palliative only\n\nEARLY SIGNS:\n- Seizures — especially in a young adult Pug (most distinctive warning sign)\n- Circling, head pressing, or disorientation\n- Sudden vision loss or blindness\n- Progressive loss of coordination\n- Behaviour change — sudden aggression or confusion\n\nANY SEIZURE IN A PUG UNDER 7 YEARS = EMERGENCY VET IMMEDIATELY\nDo not wait to see if it happens again. MRI is required for diagnosis.\n\nGive every new owner the PDE/PKDef DNA test results in writing. Disclose S/S status clearly.',
    call_vet_if: 'Any seizure in a Pug — EMERGENCY VET IMMEDIATELY',
    emergency_contact_recommended: true,
  },
];

export const PUG_HEALTH_RISKS = [
  {
    condition: 'BOAS — Brachycephalic Obstructive Airway Syndrome',
    timing: 'Present from birth; worsens with weight gain and hot weather',
    risk_level: 'critical' as const,
    signs: ['Noisy breathing — snorting, snoring, wheezing at rest', 'Severe exercise intolerance — stops after brief walks', 'Open-mouth breathing at rest', 'Blue or purple gums — EMERGENCY', 'Fainting or collapse after exertion or in heat'],
    immediate_action: 'Blue gums, collapse, or breathing difficulty = EMERGENCY VET. Exercise intolerance or distress = vet within 24 hours. BOAS surgery can be life-changing.',
    vet_decision: 'Emergency for blue gums/collapse. Urgent for exercise intolerance.',
    note: 'Pug BOAS OR 53.92 — highest of any breed (O\'Neill 2022). Every Pug owner must know: no exercise in heat, no collar (harness only), lean body weight is critical, BOAS surgery available and effective.',
  },
  {
    condition: 'PDE / NME (Pug Dog Encephalitis)',
    timing: 'Onset typically 6 months to 3 years; average 18 months',
    risk_level: 'critical' as const,
    signs: ['Seizures — most common and often first sign', 'Circling or walking in circles', 'Head pressing against walls', 'Sudden vision loss', 'Progressive incoordination', 'Behaviour change — sudden confusion or aggression'],
    immediate_action: 'Any seizure in a Pug under 7 years = EMERGENCY VET IMMEDIATELY. MRI required for diagnosis.',
    vet_decision: 'Emergency vet for any seizure. Urgent vet for other neurological signs.',
    note: '~1.2% of Pugs die from NME. S/S haplotype OR 12.75. DNA test via UC Davis VGL. Fatal — no cure. Palliative immunosuppression can provide weeks to months of quality life.',
  },
  {
    condition: 'Corneal Ulceration',
    timing: 'Any age — most common eye emergency in Pugs (5.42%/year)',
    risk_level: 'critical' as const,
    signs: ['Squinting or keeping one eye partially closed', 'Pawing at the eye', 'Redness around the eye', 'Cloudiness or white/grey spot on the cornea', 'Watery discharge'],
    immediate_action: 'SAME DAY VET. Pug corneal ulcers progress rapidly due to shallow orbits and exposed eye surface — a superficial ulcer can perforate within 24–48 hours.',
    vet_decision: 'Same-day vet for any eye squinting or cloudiness.',
    note: 'OR 13.01, 5.42%/year (O\'Neill 2022). Daily fold cleaning reduces risk. Ophthalmologist referral for deep or non-healing ulcers.',
  },
  {
    condition: 'Pug Myelopathy (PDM — Constrictive Myelopathy)',
    timing: 'Typically age 3–8 years; progressive over months to years',
    risk_level: 'high' as const,
    signs: ['Progressive weakness in both hindlimbs — starts subtle', 'Wobbling or stumbling on back legs', 'Reluctance to climb stairs', 'Incontinence — urinary or faecal', 'Eventually unable to walk'],
    immediate_action: 'Any hindlimb weakness or incontinence in an adult Pug = urgent vet within 24–48 hours. MRI required. Some cases benefit from surgery; others from physiotherapy and supportive care.',
    vet_decision: 'Urgent vet within 24–48 hours for any hind-end weakness.',
    note: 'Near-exclusive to Pugs (Wachowiak 2023). Constrictive myelopathy T10–T13. Associated with caudal articular process dysplasia. Distinct from IVDD. Progressive — management is supportive.',
  },
  {
    condition: 'PKDef — Pyruvate Kinase Deficiency',
    timing: 'Progressive from puppyhood; fatal typically before age 4',
    risk_level: 'critical' as const,
    signs: ['Lethargy and exercise intolerance progressing over months', 'Pale gums', 'Abdominal distension (splenomegaly)', 'Jaundice in advanced disease'],
    immediate_action: 'Urgent vet within 24 hours of any progressive lethargy + pale gums. Blood panel required.',
    vet_decision: 'Urgent vet within 24 hours.',
    note: 'Fatal autosomal recessive. PKLR gene. No treatment. DNA test parents — carrier × carrier produces 25% affected litter. UC Davis bundles PKDef + PDE test.',
  },
];
