/**
 * INFO BASE: SHETLAND SHEEPDOG (SHELTIE)
 * Info base ID: 'shetland_sheepdog'
 *
 * Sources: ASSA CHIC (americanshetlandsheepdogassociation.org),
 * Neff 2004 PNAS [PR] (MDR1 nt230del4 breed distribution, Sheltie allele freq ~17%),
 * Gramer 2011 [PR] (European Sheltie allele frequency ~30%),
 * Asawakarn 2022 PMC8743763 [PR] (heterozygous 16.13% Shelties, homozygous 3.22%),
 * Mealey & Meurs [PR] (WSU-VCPL absolute drug contraindication list),
 * WSU-VCPL vcpl.vetmed.wsu.edu [BC] (current drug list),
 * CEA: NHEJ1 intron-4 deletion; ~15% US lines, 50–72% European lines [PR-cited BC],
 * UC Davis VGL Shetland Sheepdog Health Panel [BC] (6-test panel),
 * Clark/Evans 2017 [PR] (DMS 3 risk loci: PAN2, MAP3K7CL, DLA-DRB1),
 * ASSA 2008 survey vWD-III: 90.3% clear, 9.4% carrier, 0.3% affected [BC],
 * Merck Vet Manual, Cornell CVM, VCA Animal Hospitals.
 *
 * ⚠️ CRITICAL FLAGS — MDR1/ABCB1 IS THE MOST IMPORTANT APP FEATURE FOR THIS BREED:
 * - MDR1 nt230(del4): ~16–19% heterozygous, 3–5% homozygous globally
 *   European lines higher (~30% allele frequency, Gramer 2011)
 * - ABSOLUTE AVOID: loperamide (Imodium), high-dose ivermectin (mange dose),
 *   high-dose milbemycin, moxidectin, selamectin, emodepside
 * - DOSE-REDUCE 25–50%: acepromazine, butorphanol, vincristine, vinblastine,
 *   doxorubicin, paclitaxel, apomorphine, erythromycin
 * - The MDR1 CARD must appear at EVERY vet visit / surgery / parasite treatment
 *   workflow for this breed — no exceptions
 * - CEA: 15% US lines, 50–72% European — mandatory for imports
 * - Dermatomyositis: immune-mediated, onset 7 weeks to 1 year
 * - vWD Type III: SEVERE form (not Type 2) — spontaneous bleeding
 * - PRA: Sheltie-specific CNGA1 (rcd3) — UC Davis VGL test
 */

export const SHETLAND_SHEEPDOG_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 2, max: 8, typical: 5 },
  newborn_weight_grams: { min: 120, max: 220, typical: 170 }, // [EXT from small-medium breed]
  adult_weight_kg: {
    male:   { min: 7, max: 12 },
    female: { min: 6, max: 10 },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const,
  singleton_risk: true,
  csection_rate_percent: 8, // [EXT — not an elevated-dystocia breed]
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 120, max: 220,  typical: 170  },
    day_7:  { min: 220, max: 400,  typical: 310  },
    day_14: { min: 320, max: 565,  typical: 440  },
    week_3: { min: 455, max: 810,  typical: 630  },
    week_4: { min: 645, max: 1145, typical: 895  },
    week_6: { min: 1075, max: 1905, typical: 1490 },
    week_8: { min: 1445, max: 2560, typical: 2000 },
  },
  daily_gain_minimum_grams: 8,
  daily_gain_target_grams: 14,
  daily_gain_percent_bodyweight: 7,
  dam_lactation_calories_multiplier: { week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0 },
  formula_volumes_per_feeding_ml: {
    week_1: { min: 2,  max: 4.5, per_100g_body_weight: 1.8 },
    week_2: { min: 3,  max: 7,   per_100g_body_weight: 2.0 },
    week_3: { min: 5,  max: 10,  per_100g_body_weight: 2.5 },
    week_4: { min: 7,  max: 14,  per_100g_body_weight: 3.0 },
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
    small_litter: { w: 90,  d: 90  },
    large_litter:  { w: 110, d: 110 },
    pig_rail_height_cm: 7,
    wall_height_cm: 35,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MDR1 DRUG CARD — Surface at every vet/surgery/parasite workflow for Shelties
// ─────────────────────────────────────────────────────────────────────────────
export const SHELTIE_MDR1_DRUG_CARD = {
  breed_warning: 'SHETLAND SHEEPDOG — MDR1/ABCB1 nt230(del4) DRUG SENSITIVITY',
  prevalence: '~16–19% heterozygous, 3–5% homozygous in global Sheltie population. European lines higher (~30% allele frequency). All Shelties should be treated as potentially MDR1-affected until DNA-tested.',
  absolute_avoid: [
    'Loperamide (Imodium) — severe neurological toxicity even at OTC dose',
    'Ivermectin at MANGE DOSE (300–600 µg/kg) — heartworm prevention dose (6 µg/kg) is safe',
    'Milbemycin at high dose',
    'Moxidectin at high dose',
    'Selamectin at high dose',
    'Emodepside (Profender)',
  ],
  dose_reduce_25_to_50_percent: [
    'Acepromazine — increased depth and duration of sedation (Gramer 2011)',
    'Butorphanol',
    'Vincristine',
    'Vinblastine',
    'Doxorubicin',
    'Paclitaxel',
    'Apomorphine',
    'Erythromycin',
  ],
  monitor_closely: ['Cyclosporine'],
  safe_at_normal_dose: ['Heartgard (ivermectin 6 µg/kg)', 'Sentinel', 'Interceptor', 'Revolution (selamectin at heartworm dose)', 'Simparica', 'NexGard', 'Bravecto'],
  dna_test: 'Washington State University VCPL (vcpl.vetmed.wsu.edu) or UC Davis VGL Sheltie Health Panel',
  source: 'WSU-VCPL vcpl.vetmed.wsu.edu; Mealey & Meurs; Neff 2004 PNAS; Gramer 2011',
};

export const SHETLAND_SHEEPDOG_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, label: 'First deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Worm treatment. Pyrantel is safe for MDR1-affected Shelties at this dose.', vet_required: false, critical: true },
    { day: 28, label: 'Second deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Second treatment.', vet_required: false, critical: true },
    { day: 42, label: 'Third deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg × 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Panacur 3 days — safe for MDR1-affected Shelties.', vet_required: false, critical: true },
    { day: 56, label: 'Fourth deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg × 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Final deworming.', vet_required: false, critical: true },
  ],
  dam_deworming: {
    start_day_of_pregnancy: 40, end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur Day 40 through 14 days post-whelp. Fenbendazole is safe regardless of MDR1 status.', critical: true,
  },
  vaccinations: [
    { week: 6,  label: 'First vaccination', vaccine: 'DHPP #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'Standard first vaccination. Note MDR1 status in vet records from first visit.', vet_required: true, critical: true },
    { week: 10, label: 'Second vaccination', vaccine: 'DHPP #2 + Leptospirosis #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'], plain_english: 'Second vaccination plus Lepto.', vet_required: true, critical: true },
    { week: 14, label: 'Third vaccination', vaccine: 'DHPP #3 + Leptospirosis #2 + Rabies', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis', 'Rabies'], plain_english: 'Third series plus Rabies.', vet_required: true, critical: true },
    { week: 18, label: 'Final parvo booster', vaccine: 'DHPP #4', covers: ['Distemper', 'Parvovirus'], plain_english: 'Do not skip.', vet_required: true, critical: true },
  ],
  vet_visits: [
    { day: 0,   label: 'Post-whelping dam check', urgency: 'within_48_hours', plain_english: 'Vet check within 48h. Note: if C-section required, MDR1 drug card must be given to the surgical team — acepromazine dose must be reduced 25–50% in MDR1-affected dogs. Confirm all placentas passed.', critical: true },
    { week: 1,  label: 'Dam and litter check', urgency: 'day_7', plain_english: 'All pups gaining ≥8g per day. Watch for any signs of dermatomyositis in the coming weeks (onset from 7 weeks).', critical: true },
    { week: 6,  label: '⚠️ MDR1 drug card given to new owners + CEA + DMS watch', urgency: 'week_6_to_8', plain_english: 'CRITICAL: every new Sheltie owner must receive the MDR1 drug card at this visit. Vaccinations, full physical. Watch for dermatomyositis skin lesions beginning from Week 7. CEA DNA results if done.', critical: true },
    { week: 8,  label: 'Pre-rehoming check', urgency: 'before_leaving', plain_english: 'MDR1 drug card in writing to every single new owner — non-negotiable. CEA DNA status disclosed. vWD-III status disclosed. DMS watch instructions.', critical: true },
  ],
  breed_specific_screenings: [
    {
      name: '⚠️ MDR1/ABCB1 DNA test — ALL Shelties',
      timing: 'Test both parents. DNA-test all puppies before rehoming (WSU-VCPL or UC Davis VGL).',
      method: 'WSU VCPL or UC Davis VGL Sheltie Health Panel',
      plain_english: 'MDR1 nt230(del4) — ~16–19% Shelties heterozygous, 3–5% homozygous globally. European lines ~30% allele frequency. The mutation disables P-glycoprotein BBB drug efflux, causing severe neurological toxicity from many common medications at normal doses. ABSOLUTE CONTRAINDICATIONS: loperamide (Imodium — OTC anti-diarrhoeal commonly given by owners), high-dose ivermectin. DOSE-REDUCE 25–50%: acepromazine (standard pre-anaesthetic). Every Sheltie should be DNA-tested. Every Sheltie owner must carry the MDR1 drug card and present it to every vet.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CEA — Collie Eye Anomaly (NHEJ1)',
      timing: 'DNA test both parents before breeding',
      method: 'DNA test — NHEJ1 intron-4 deletion. UC Davis VGL Sheltie Health Panel.',
      plain_english: '~15% of US Sheltie lines carry CEA; up to 50–72% in European lines (mandatory testing for any dog imported from Europe). CEA causes abnormal development of the choroid and can lead to retinal detachment and blindness in severe cases. Many affected dogs have only mild abnormalities with minimal vision impact.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Sheltie-type PRA (rcd3) — CNGA1',
      timing: 'DNA test both parents',
      method: 'UC Davis VGL Sheltie Health Panel — CNGA1',
      plain_english: 'Sheltie-specific PRA caused by CNGA1 mutation (rcd3). Progressive blindness. UC Davis VGL test included in Sheltie Health Panel.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Dermatomyositis (DMS) — 3 loci',
      timing: 'DNA test both parents. Watch puppies from 7 weeks.',
      method: 'UC Davis VGL Sheltie Health Panel — PAN2, MAP3K7CL, DLA-DRB1 loci (Clark/Evans 2017)',
      plain_english: 'DMS is an immune-mediated skin and muscle disease exclusive to Shelties and Collies. Onset 7 weeks to 1 year. Ulcerating skin lesions on muzzle, face, and limb tips; muscle atrophy in severe cases. DNA panel scores cumulative haplotype risk. High-risk haplotype combinations should not be bred.',
      mandatory_for_breeding: true,
    },
    {
      name: 'vWD Type III — severe bleeding disorder',
      timing: 'DNA test both parents',
      method: 'UC Davis VGL Sheltie Health Panel',
      plain_english: 'SEVERE form of vWD (spontaneous bleeding, not just surgical). ASSA 2008 survey: 9.4% carriers, 0.3% affected. Affected dogs require plasma products for any bleeding event. Carrier × carrier should not be repeated.',
      mandatory_for_breeding: true,
    },
    {
      name: 'OFA Hips or PennHIP',
      timing: 'OFA ≥24mo or PennHIP from 16wk',
      method: 'OFA radiograph or PennHIP',
      plain_english: 'Required ASSA CHIC. Hips at ≥24 months.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CAER eye exam — annual',
      timing: 'Annual from age 1',
      method: 'Board-certified ACVO ophthalmologist',
      plain_english: 'Annual CAER required ASSA CHIC.',
      mandatory_for_breeding: true,
    },
  ],
};

export const SHETLAND_SHEEPDOG_PREGNANCY_EVENTS = [
  {
    id_suffix: 'sheltie_preg_mdr1_surgical_warning',
    day_offset: -14,
    title: '⚠️ MDR1 drug card ready before birth — C-section team must be briefed',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'If C-section is needed, the surgical team must receive the MDR1 drug card before administering pre-anaesthetic medications.',
    detail: 'Shelties have ~16–19% MDR1 heterozygous and ~3–5% homozygous rates globally. The pre-anaesthetic acepromazine is one of the dose-reduction drugs.\n\nPrint the MDR1 drug card now and keep it with the dam\'s vet records. If an emergency C-section is required:\n\n1. Phone ahead and tell the vet: "This is a Shetland Sheepdog — MDR1 drug sensitivity breed. Acepromazine dose must be reduced 25–50%."\n2. Hand the MDR1 card to the surgical team on arrival\n\nIf the dam has been DNA-tested as N/N (clear): she is safe at normal doses, but still carry the card.\nIf the dam is MDR1-positive (+/-) or homozygous (-/-): dose reduction is mandatory.',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'sheltie_preg_dms_early_watch',
    day_offset: 0,
    title: 'From birth: Watch for dermatomyositis — earliest signs from 7 weeks',
    category: 'health' as const, priority: 'high' as const, is_free: false,
    description: 'DMS onset can be as early as 7 weeks. Know the signs.',
    detail: 'Dermatomyositis (DMS) onset: 7 weeks to 1 year. Earlier onset = more severe prognosis.\n\nEARLY SIGNS (from 7 weeks):\n- Small red crusty lesions on the muzzle tip, around the eyes, or on the ear tips\n- Lesions over bony prominences — knuckles, hocks\n- Lesions may ulcerate (open sores)\n\nLATER SIGNS (months):\n- Muscle wasting, especially in chewing muscles (temporal muscle atrophy)\n- Difficulty eating hard food\n\nACTION: Any skin lesion on a Sheltie puppy 7 weeks or older = urgent vet within 24–48 hours for DMS assessment. DMS diagnosis requires biopsy.\n\nManagement: immunosuppression (vitamin E, omega-3, prednisolone, pentoxifylline). Prognosis depends on severity of onset.',
    call_vet_if: 'Any skin lesion on face, muzzle, or limb bony prominences from 7 weeks — urgent vet',
  },
];

export const SHETLAND_SHEEPDOG_NEONATAL_EVENTS = [
  {
    id_suffix: 'sheltie_neo_mdr1_card_every_owner',
    day_offset: 42,
    title: 'Week 6: MDR1 drug card to EVERY new Sheltie owner — non-negotiable',
    category: 'health' as const, priority: 'critical' as const, is_free: false,
    description: 'The MDR1 drug card is the most important document a Sheltie owner will ever receive. Give it before the puppy leaves.',
    detail: 'Give every new Sheltie owner the MDR1 drug card as a physical printout. Verbally explain the following points:\n\n1. "Your Sheltie may carry the MDR1 gene mutation. Until your puppy is DNA-tested, treat them as MDR1-sensitive."\n\n2. "NEVER give your Sheltie Imodium (loperamide) — it is a common OTC anti-diarrhoeal but causes fatal neurological reactions in MDR1-affected dogs. Do not keep it in your house."\n\n3. "Before ANY vet visit — especially surgery — show the vet this card. Say: My dog is a Shetland Sheepdog and may be MDR1-sensitive."\n\n4. "DNA test your puppy through WSU-VCPL or UC Davis VGL. Results are definitive."\n\nMDR1 drug card format to provide:\n- Header: SHETLAND SHEEPDOG — MDR1 DRUG SENSITIVITY\n- ABSOLUTE AVOID list (loperamide, high-dose ivermectin)\n- DOSE REDUCE list (acepromazine, butorphanol, vinca alkaloids)\n- DNA test lab contact\n\nThis card may save your puppy\'s life. Give it to every single new owner.',
  },
];

export const SHETLAND_SHEEPDOG_HEALTH_RISKS = [
  {
    condition: 'MDR1 Drug Toxicity',
    timing: 'Can occur at any age with any exposure to contraindicated drugs',
    risk_level: 'critical' as const,
    signs: ['Severe neurological signs after medication: seizures, tremors, disorientation', 'Coma from normal doses of loperamide or high-dose ivermectin', 'Prolonged sedation after acepromazine', 'Vomiting, salivation, abnormal gait after offending drug'],
    immediate_action: 'EMERGENCY VET IMMEDIATELY. Tell them: "This is a Shetland Sheepdog. Possible MDR1 drug reaction. The drug given was [name]." There is no specific antidote — supportive care (IV fluids, seizure management) is the treatment.',
    vet_decision: 'Emergency vet immediately.',
    note: 'Prevention is the only management. DNA test every Sheltie. Never give loperamide (Imodium). Always alert every vet to MDR1 status before any procedure.',
  },
  {
    condition: 'Dermatomyositis (DMS / Sheltie Skin Syndrome)',
    timing: 'Onset 7 weeks to 1 year; earlier onset = more severe',
    risk_level: 'high' as const,
    signs: ['Crusty, ulcerating lesions on muzzle tip, around eyes, ear tips', 'Lesions over bony prominences (knuckles, hocks)', 'Muscle wasting — especially temporal muscles (face looks sunken)', 'Difficulty chewing hard food'],
    immediate_action: 'Urgent vet within 24–48 hours of any facial or extremity skin lesions in a Sheltie under 1 year. Biopsy required for diagnosis.',
    vet_decision: 'Urgent vet within 24–48 hours.',
    note: 'Three risk loci identified (Clark/Evans 2017). UC Davis VGL panel available. Immune-mediated — managed with prednisolone, vitamin E, pentoxifylline. Prognosis variable.',
  },
  {
    condition: 'CEA — Collie Eye Anomaly',
    timing: 'Present from birth; does not progress',
    risk_level: 'high' as const,
    signs: ['Detected by ophthalmologist exam — not visible to owners', 'Severe cases: retinal detachment, blindness', 'Most cases: mild choroidal hypoplasia with minimal vision impact'],
    immediate_action: 'Annual CAER exam. Detected at puppy wellness visit.',
    vet_decision: 'Ophthalmologist referral for any vision concern.',
    note: 'NHEJ1 DNA test available. ~15% US lines affected. European lines much higher. Does not progress — severity at diagnosis is severity for life.',
  },
  {
    condition: 'vWD Type III — Severe Bleeding Disorder',
    timing: 'Present from birth; spontaneous bleeding in affected dogs',
    risk_level: 'critical' as const,
    signs: ['Spontaneous nosebleeds', 'Bleeding gums', 'Blood in urine or stool', 'Prolonged bleeding from minor wounds', 'Joint bleeds (rare)'],
    immediate_action: 'Any spontaneous bleeding = EMERGENCY VET. Plasma transfusion required.',
    vet_decision: 'Emergency for any spontaneous bleeding event.',
    note: 'vWD Type III — most severe form. 9.4% Sheltie carriers, 0.3% affected (ASSA 2008). UC Davis VGL Sheltie Health Panel. Carrier × carrier must not be repeated.',
  },
];
