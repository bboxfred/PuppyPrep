/**
 * INFO BASE: CANE CORSO
 * Info base ID: 'cane_corso'
 *
 * Sources: Cane Corso Club of America CHIC (canecorso.org),
 * OFA 2023 statistics: ~37% hip dysplasia, ~21% elbow dysplasia [PR],
 * Loder & Todhunter 2017 [PR] (France cohort 59.7% HD — OFA self-selection bias),
 * Korec 2017 PMC5475242 [PR] (median lifespan 9.29yr, DCM leading cause of death),
 * CCCA CHIC updated 2023 (NCL + DSRA DNA added),
 * Merck Vet Manual, Cornell CVM, VCA Animal Hospitals.
 *
 * ⚠️ CRITICAL FLAGS:
 * - Hip dysplasia OFA 2023: ~37% dysplastic (France cohort 59.7%)
 * - Elbow dysplasia OFA 2023: ~21%
 * - DCM: leading cause of death in breed; annual echo from age 2
 * - GDV: deep-chested giant breed — prophylactic gastropexy strongly recommended
 * - Idiopathic epilepsy: onset 1–5 years — affected dogs should not be bred
 * - Brachycephalic: MILD (BIB classification) — anaesthesia caution but NOT
 *   severe protocol; Swedish Agria data does not rank Cane Corso among
 *   top-risk BIB breeds for URT disease
 * - Large litters 6–10: pig rails mandatory (dam can crush)
 */

export const CANE_CORSO_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 4, max: 12, typical: 8 },
  newborn_weight_grams: { min: 450, max: 700, typical: 575 }, // [EXT from giant breed norms]
  adult_weight_kg: {
    male:   { min: 45, max: 60 },
    female: { min: 40, max: 50 },
  },
  size_category: 'large' as const,
  hypoglycemia_risk: 'low' as const,
  singleton_risk: false,
  csection_rate_percent: 15, // [EXT — not a high-dystocia breed; elevated for singletons]
  brachycephalic: true,      // MILD BIB — anaesthesia caution, not severe protocol

  weight_targets: {
    birth:  { min: 450, max: 700,  typical: 575  },
    day_7:  { min: 835, max: 1260, typical: 1050 },
    day_14: { min: 1200, max: 1800, typical: 1500 },
    week_3: { min: 1710, max: 2580, typical: 2145 },
    week_4: { min: 2430, max: 3660, typical: 3045 },
    week_6: { min: 4050, max: 6100, typical: 5075 },
    week_8: { min: 5450, max: 8200, typical: 6825 },
  },
  daily_gain_minimum_grams: 40,
  daily_gain_target_grams: 75,
  daily_gain_percent_bodyweight: 5,
  dam_lactation_calories_multiplier: { week_1: 1.5, week_2: 2.0, week_3_4: 3.5, week_5: 2.5 },
  formula_volumes_per_feeding_ml: {
    week_1: { min: 10, max: 16, per_100g_body_weight: 1.8 },
    week_2: { min: 15, max: 24, per_100g_body_weight: 2.0 },
    week_3: { min: 22, max: 33, per_100g_body_weight: 2.5 },
    week_4: { min: 32, max: 47, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: { week_1: 2, week_2: 2.5, week_3: 3, week_4: 4 },
  tube_size_french: 10, // Large neonates 450–700g require larger tube from birth
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
    small_litter: { w: 150, d: 150 },
    large_litter:  { w: 180, d: 180 },
    pig_rail_height_cm: 15,   // Larger rail for giant dam
    wall_height_cm: 60,
  },
};

export const CANE_CORSO_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, label: 'First deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Worm treatment for all Cane Corso puppies. At 2 weeks pups weigh 800–1,200g — weigh individually. A 1,000g pup needs 10mg pyrantel = a meaningful dose, not a drop.', vet_required: false, critical: true },
    { day: 28, label: 'Second deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Second treatment. Use current weight.', vet_required: false, critical: true },
    { day: 42, label: 'Third deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg × 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Panacur 3 days.', vet_required: false, critical: true },
    { day: 56, label: 'Fourth deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg × 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Final deworming before rehoming.', vet_required: false, critical: true },
  ],
  dam_deworming: {
    start_day_of_pregnancy: 40, end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur Day 40 through 14 days post-whelp. Dam 40–50kg — confirm exact weight before calculating dose.', critical: true,
  },
  vaccinations: [
    { week: 6,  label: 'First vaccination',  vaccine: 'DHPP #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'First vaccination. Cane Corsos have elevated immune-mediated condition rates — monitor for post-vaccination reactions (fever, lethargy, injection-site swelling) for 24 hours.', vet_required: true, critical: true },
    { week: 10, label: 'Second vaccination', vaccine: 'DHPP #2 + Leptospirosis #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'], plain_english: 'Second vaccination plus first Lepto.', vet_required: true, critical: true },
    { week: 14, label: 'Third vaccination',  vaccine: 'DHPP #3 + Leptospirosis #2 + Rabies', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis', 'Rabies'], plain_english: 'Third series plus Rabies.', vet_required: true, critical: true },
    { week: 18, label: 'Final parvo booster', vaccine: 'DHPP #4', covers: ['Distemper', 'Parvovirus'], plain_english: 'Do not skip.', vet_required: true, critical: true },
  ],
  vet_visits: [
    { day: 0,   label: 'Post-whelping dam check', urgency: 'within_48_hours', plain_english: 'Vet check within 48h. Cane Corso is a mild BIB breed — if C-section was required, confirm full recovery from anaesthesia. Count all placentas — with litters of 8+, a retained placenta is easy to miss.', critical: true },
    { week: 1,  label: 'Dam and litter check', urgency: 'day_7', plain_english: 'All pups gaining ≥40g per day. Large litters: if any pup is notably smaller, begin rotation nursing and supplemental feeding.', critical: true },
    { week: 6,  label: 'Puppy wellness + GDV prevention + cardiac discussion', urgency: 'week_6_to_8', plain_english: 'CRITICAL: every new Cane Corso owner must receive the GDV prevention protocol at this visit. Request cardiac auscultation. Discuss prophylactic gastropexy.', critical: true },
    { week: 8,  label: 'Pre-rehoming check', urgency: 'before_leaving', plain_english: 'GDV prevention protocol in writing. DCM awareness — annual echo from age 2. OFA hip/elbow at 24 months recommendation. Entropion/ectropion monitoring 6–12 months.', critical: true },
  ],
  breed_specific_screenings: [
    {
      name: 'Hip dysplasia — OFA MANDATORY',
      timing: 'OFA ≥24mo; PennHIP from 16wk',
      method: 'OFA radiograph or PennHIP (preferred)',
      plain_english: 'OFA 2023: ~37% of tested Cane Corsos dysplastic. France cohort: 59.7% (Loder & Todhunter 2017 — OFA self-selection likely understates true prevalence). PennHIP at 16 weeks preferred for early management planning. Required CCCA CHIC.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Elbow dysplasia — OFA',
      timing: 'OFA ≥24mo',
      method: 'OFA radiograph',
      plain_english: 'OFA 2023: ~21% elbow dysplasia. Required CCCA CHIC.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Cardiac — DCM screening',
      timing: 'Annual cardiologist echo from age 2; echo + Holter at ages 4 and 6',
      method: 'Board-certified cardiologist echocardiogram + Holter monitor',
      plain_english: 'DCM (Dilated Cardiomyopathy) is the leading cause of death in Cane Corsos (Korec 2017). Annual echo from age 2. DCM can be subclinical for years before sudden death or heart failure. Required CCCA CHIC from age 2.',
      mandatory_for_breeding: true,
    },
    {
      name: 'NCL DNA — Neuronal Ceroid Lipofuscinosis',
      timing: 'DNA test both parents before breeding',
      method: 'DNA test — CCCA approved lab',
      plain_english: 'NCL is a progressive fatal neurological storage disease added to CCCA CHIC requirements in 2023. DNA test both parents. Carrier × carrier = 25% affected litter.',
      mandatory_for_breeding: true,
    },
    {
      name: 'DSRA DNA (cerebellar abiotrophy)',
      timing: 'DNA test both parents before breeding',
      method: 'DNA test — CCCA approved lab',
      plain_english: 'DSRA (formerly cerebellar abiotrophy-associated) added to CCCA CHIC 2023. DNA test both parents.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Eye certification — CAER',
      timing: 'Annual CAER exam',
      method: 'Board-certified ACVO ophthalmologist',
      plain_english: 'Annual CAER required CCCA CHIC. Covers entropion/ectropion (surgical correction timing 6–12 months if severe), PRA, and other ocular conditions.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Patellar luxation',
      timing: 'OFA evaluation from 12 months',
      method: 'OFA patellar grading',
      plain_english: 'Required CCCA CHIC. Medial and lateral luxation both occur in large breeds.',
      mandatory_for_breeding: true,
    },
  ],
};

export const CANE_CORSO_PREGNANCY_EVENTS = [
  {
    id_suffix: 'cc_preg_gdv_protocol',
    day_offset: -28,
    title: '⚠️ GDV prevention protocol: Starts today — implement permanently',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'Cane Corso is a classic deep-chested GDV-risk breed. Pregnancy increases risk further.',
    detail: 'GDV (Gastric Dilatation-Volvulus) is fatal within 1–2 hours without emergency surgery. Deep-chested giant breeds are at significant risk.\n\nFROM TODAY — permanent protocol:\n1. Feed 3–4 small meals daily — never one large meal\n2. No exercise 1 hour before and 2 hours after eating\n3. Do NOT use elevated food bowls — evidence shows these INCREASE GDV risk\n4. Slow-feeder bowl if dam eats quickly\n\nGDV EMERGENCY SIGNS:\n🔴 Unproductive retching — trying to vomit, nothing comes up\n🔴 Abdomen visibly distended and drum-hard\n🔴 Extreme restlessness — cannot settle\n🔴 Pale/white gums\n\nDrive to emergency vet immediately. Do not call ahead.\n\nDiscuss PROPHYLACTIC GASTROPEXY with your vet — can be performed at spay/neuter, eliminates the fatal torsion component for life.',
    call_vet_if: 'Any GDV signs — EMERGENCY, drive immediately',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'cc_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray Day 55–58: Count every foetus',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'With litters of 6–10+, accurate count is essential. Tape number to whelping box.',
    detail: 'X-ray Day 55–58. Count every foetal skeleton. Note any singleton (higher C-section risk) or malpresented foetus.\n\nCane Corso has ~15% C-section rate [EXT]. Confirm vet emergency availability. If C-section needed: inform vet of mild BIB status — anaesthesia monitoring required, not full severe protocol, but recovery monitoring is extended.',
  },
  {
    id_suffix: 'cc_preg_whelp_box_size',
    day_offset: -21,
    title: 'Whelping box must be 150×150cm minimum — Cane Corso dam is 40–50kg',
    category: 'environment' as const, priority: 'high' as const, is_free: false,
    description: 'A Cane Corso dam can crush puppies if the whelping box is too small or lacks pig rails.',
    detail: 'Minimum box: 150×150cm. Preferred for large litters: 180×180cm.\nPig rails: 15cm off floor, 10cm from wall — mandatory for a breed this size.\nWall height: 60cm minimum.\n\nThe dam will step on, roll onto, or crush puppies in the first 2 weeks if the box is inadequate. Check the box is assembled before Day 58.',
  },
];

export const CANE_CORSO_NEONATAL_EVENTS = [
  {
    id_suffix: 'cc_neo_large_tube',
    day_offset: 0,
    title: 'Day 0: French 10 tube for giant neonates — standard French 5 is too small',
    category: 'nutrition' as const, priority: 'critical' as const, is_free: true,
    description: 'Cane Corso neonates at 450–700g require French 10 feeding tube from birth.',
    detail: 'Standard small-breed tube sizes (French 5) are inadequate for Cane Corso neonates. These puppies are 2–3× the size of small-breed neonates at birth.\n\nFrench 10 tube from birth. Volume: 1.8 ml Esbilac per 100g body weight per feed in Week 1.\nExample: 600g puppy = 10.8 ml per feed.\n\nFeed every 2 hours. If dam has 8+ puppies and only 8–10 functional teats, begin rotation nursing with supplemental tube feeding for puppies displaced from teats.',
  },
  {
    id_suffix: 'cc_neo_dcm_owner_brief',
    day_offset: 42,
    title: 'Week 6: DCM owner briefing — every new Cane Corso owner must understand this',
    category: 'health' as const, priority: 'critical' as const, is_free: false,
    description: 'DCM is the leading cause of death in Cane Corsos. New owners need this information before their puppy leaves.',
    detail: 'Dilated Cardiomyopathy (DCM) causes progressive weakening and enlargement of the heart. The leading cause of death in the breed (Korec 2017).\n\nDCM can be SILENT for years — no symptoms until the heart is severely affected.\n\nWhat new owners must do:\n1. Annual cardiac examination by a board-certified cardiologist from age 2\n2. Echo + Holter monitor at age 2, 4, and 6\n3. Report immediately: reduced exercise tolerance, coughing (especially at night), laboured breathing, fainting, sudden weakness\n\nDCM in Cane Corsos often progresses rapidly once symptoms appear. Annual screening is the only way to catch it early enough for medication to help.',
    call_vet_if: 'Any exercise intolerance, coughing, or breathing difficulty — urgent cardiology referral',
  },
  {
    id_suffix: 'cc_neo_entropion_watch',
    day_offset: 14,
    title: 'Week 2: Begin eyelid monitoring — entropion visible as eyes open',
    category: 'health' as const, priority: 'high' as const, is_free: false,
    description: 'Cane Corsos are predisposed to entropion (inward-rolling eyelid). First visible as eyes open 10–14 days.',
    detail: 'As eyes open at 10–14 days, inspect the eyelid margins of every puppy.\n\nSigns of entropion:\n- Eyelid margin rolls inward toward the eye\n- Eyelashes/hairs touching the cornea\n- Excessive tearing or eye discharge\n- Puppy keeping eye partially closed\n\nMild entropion in puppies sometimes self-corrects as the skull develops. Severe entropion causing corneal contact requires temporary tacking sutures (minor procedure) to protect the cornea until the puppy is old enough for corrective surgery (typically 6–12 months).\n\nBrief every new owner: watch the eyelids as the puppy grows. Corrective surgery before corneal scarring occurs is essential.',
  },
];

export const CANE_CORSO_HEALTH_RISKS = [
  {
    condition: 'GDV — Gastric Dilatation-Volvulus',
    timing: 'Any age — highest risk after large single meals',
    risk_level: 'critical' as const,
    signs: ['Unproductive retching — trying to vomit, nothing comes up', 'Abdomen visibly distended and drum-hard', 'Extreme restlessness — cannot settle or lie down', 'Pale or white gums', 'Rapid deterioration'],
    immediate_action: 'EMERGENCY VET IMMEDIATELY. Do not call — drive. Fatal within 1–2 hours without surgery.',
    vet_decision: 'Emergency surgical facility immediately.',
    note: 'Prophylactic gastropexy at spay/neuter eliminates the torsion component for life. Feed 3–4 small meals daily, never one large meal.',
  },
  {
    condition: 'DCM — Dilated Cardiomyopathy',
    timing: 'Typically develops age 4–8; can be silent until advanced',
    risk_level: 'critical' as const,
    signs: ['Reduced exercise tolerance — tiring faster than before', 'Coughing, especially at night or after activity', 'Laboured breathing', 'Fainting or sudden collapse', 'Unexplained weight loss'],
    immediate_action: 'Breathing difficulty or collapse = EMERGENCY VET. Reduced exercise tolerance or coughing = urgent cardiologist within 24–48 hours.',
    vet_decision: 'Emergency for collapse. Urgent cardiologist for any cardiac signs.',
    note: 'Leading cause of death in breed (Korec 2017). Annual echo from age 2. Medication (pimobendan, ACE inhibitors) can significantly extend quality life when started early.',
  },
  {
    condition: 'Hip Dysplasia',
    timing: 'Symptoms from 4 months; OFA at 24 months',
    risk_level: 'high' as const,
    signs: ['Limping or uneven gait', 'Stiffness rising', 'Reluctance to exercise', 'Bunny-hopping gait'],
    immediate_action: 'Vet within a week. Lean body weight is the most impactful management intervention.',
    vet_decision: 'Call vet within a week.',
    note: 'OFA 2023 ~37% dysplastic; France cohort 59.7%. PennHIP from 16 weeks preferred.',
  },
  {
    condition: 'Idiopathic Epilepsy',
    timing: 'Onset typically 1–5 years',
    risk_level: 'high' as const,
    signs: ['Generalised seizures — paddling, rigidity, loss of consciousness', 'Post-ictal disorientation lasting minutes to hours', 'Cluster seizures (multiple within 24 hours) = emergency'],
    immediate_action: 'Cluster seizures or seizure lasting >5 minutes = EMERGENCY VET. First-time seizure = urgent vet within 24 hours.',
    vet_decision: 'Cluster or prolonged seizure = emergency. First seizure = urgent vet.',
    note: 'No validated DNA test. Phenobarbital or potassium bromide management. Affected dogs should not be bred.',
  },
];
