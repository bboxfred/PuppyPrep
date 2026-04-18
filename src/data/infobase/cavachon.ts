/**
 * INFO BASE: CAVACHON
 * Applies to: Cavachon (Cavalier King Charles Spaniel × Bichon Frise)
 * Info base ID: 'cavachon'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'cavachon'.
 *
 * DATA QUALITY NOTE: Cavachon has the WEAKEST breed-specific published data of all
 * breeds in this database. No peer-reviewed Cavachon-specific prevalence studies exist.
 * All health risk levels are EXTRAPOLATED from parent breeds.
 * App should surface a disclaimer where flagged [EXTRAPOLATED].
 *
 * Sources: cavalierhealth.org (MVD Breeding Protocol),
 * PMC8065390 (100% CKCS MVD by age 8 by echo),
 * Parker/Knowler 2011 PubMed 21672954 (SM 25% at 12 mo, 70% at 72+ mo),
 * O'Neill VetCompass PMC9299886 (Bichon Frise Cushing's OR 6.17 — HIGHEST breed),
 * Bichon Frise Club of America (BFCA — Cushing's "principal endocrine disorder"),
 * University of Minnesota Urolith Center (Bichon CaOx >20× general risk, 73% recurrence),
 * Jaeger 2010 multicenter atopy study (CKCS + Bichon both predisposed),
 * Limpens 2024 PMC10859423 (SM breeding from affected parents triples offspring risk),
 * Baltutis et al. Clinical Theriogenology (CKCS gestation 62.8 ± 2.0 days),
 * Bryson/O'Neill 2024 PLOS ONE (hybrid vigor NOT demonstrated),
 * Gill 2012 PMC3898273 (EFS BCAN gene),
 * Cornell CVM, Merck Vet Manual, VCA Animal Hospitals.
 *
 * ⚠️ CRITICAL FLAGS:
 * - MVD: CKCS side — same risk as Cavapoo. MVD Breeding Protocol MANDATORY.
 *   F1 Cavachon may have lower risk than purebred CKCS at a given age — but
 *   NO peer-reviewed evidence confirms this. Do NOT claim hybrid vigor protection.
 * - Cushing's Disease: Bichon Frise has HIGHEST breed OR 6.17 (O'Neill VetCompass)
 *   Cavachon ELEVATED Cushing's risk [EXTRAPOLATED]
 * - Calcium Oxalate bladder stones: Bichon >20× general risk, 73% recurrence
 *   Cavachon ELEVATED CaOx risk, especially in males [EXTRAPOLATED]
 * - Atopy: BOTH CKCS and Bichon are predisposed (Jaeger 2010) — NOT reduced by hybrid vigor
 * - Syringomyelia: CKCS side — lower than purebred CKCS but not eliminated
 * - EFS: CKCS carrier 12.9–19.1% (BCAN gene)
 * - CCS/Dry Eye (FAM83H): CKCS carrier 10.8%
 * - CKCS gestation SHORTER: 62.8 ± 2.0 days — C-section earlier if CKCS is the dam
 * - Hypoglycemia risk: MODERATE-HIGH as puppy under 3 months
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const CAVACHON_PROFILE = {
  gestation_days_typical: 63,
  // If the Cavachon DAM has a CKCS mother (i.e., the Cavachon is being bred):
  // use 62 days as typical based on CKCS data (Baltutis et al.)
  gestation_days_range: { min: 58, max: 66 },
  avg_litter_size: { min: 2, max: 6, typical: 4 },    // EXTRAPOLATED: CKCS 3–5, Bichon 3–5
  newborn_weight_grams: { min: 150, max: 250, typical: 200 },  // EXTRAPOLATED: small companion cross
  adult_weight_kg: {
    typical: { min: 4.5, max: 9 },
    lighter_lines: { min: 3.5, max: 6 },
    heavier_lines: { min: 7,   max: 11 },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const,   // Moderate-high as puppy <3 months
  singleton_risk: true,
  csection_rate_percent: 15,   // EXTRAPOLATED: neither parent breed is high C-section; elevated for singletons
  brachycephalic: true,        // CKCS mildly brachycephalic; Bichon slightly; flag for anaesthesia caution

  weight_targets: {
    // EXTRAPOLATED from small companion breed data
    birth:  { min: 150, max: 250,  typical: 200  },
    day_7:  { min: 275, max: 450,  typical: 360  },
    day_14: { min: 400, max: 640,  typical: 520  },
    week_3: { min: 565, max: 910,  typical: 735  },
    week_4: { min: 800, max: 1280, typical: 1040 },
    week_6: { min: 1330, max: 2130, typical: 1730 },
    week_8: { min: 1800, max: 2870, typical: 2335 },
  },

  daily_gain_minimum_grams: 8,
  daily_gain_target_grams: 14,
  daily_gain_percent_bodyweight: 7,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 2.5, max: 5.0, per_100g_body_weight: 1.5 },
    week_2: { min: 4.0, max: 7.5, per_100g_body_weight: 1.8 },
    week_3: { min: 6.0, max: 11,  per_100g_body_weight: 2.0 },
    week_4: { min: 9.0, max: 16,  per_100g_body_weight: 2.5 },
  },
  feeding_frequency_hours: {
    week_1: 2,      // 2 hours; move to 1.5h if any puppy under 150g or not gaining
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 5,    // 3.5 Fr for any pup under 150g; 5 Fr for 150–250g+
  max_stomach_capacity_ml_per_100g: 4,

  whelping_box_temp_celsius: {
    week_1:      { min: 29.5, max: 32, ideal: 31   },
    week_2:      { min: 27.5, max: 30, ideal: 29   },
    week_3:      { min: 25.5, max: 28, ideal: 27   },
    week_4_plus: { min: 22,   max: 25, ideal: 23.5 },
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

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const CAVACHON_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Cavachon puppies. At 2 weeks, Cavachon puppies typically weigh 275–450g. Use a 1 cc syringe for precise dosing — do not estimate. Weigh each puppy on the morning of treatment.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second treatment. Use current weight on the day of treatment.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment — Panacur for 3 consecutive days.',
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
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth. Cavachon dams are small — confirm exact weight before calculating dose.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. Feed the puppy 1–2 hours before the vet visit — moderate hypoglycemia risk. Keep puppy warm. Have Karo syrup in your bag in case of post-vaccination stress response.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'Second vaccination. Discuss Lepto timing with vet — consider separate visit for small Cavachons to reduce total antigen load.',
      vet_required: true,
      critical: true,
    },
    {
      week: 14,
      label: 'Third vaccination',
      vaccine: 'DHPP #3 + Rabies',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'],
      plain_english: 'Third vaccination plus Rabies.',
      vet_required: true,
      critical: true,
    },
    {
      week: 18,
      label: 'CRITICAL: Final parvo booster',
      vaccine: 'DHPP #4 (final)',
      covers: ['Distemper', 'Parvovirus'],
      plain_english: 'Do not skip. Essential for full parvo protection.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check — CKCS shorter gestation awareness',
      urgency: 'within_24_hours',
      plain_english: 'Vet check within 24 hours. If the Cavachon dam has a CKCS mother: CKCS gestation is 62.8 ± 2.0 days — shorter than standard. Monitor closely from Day 58. Confirm all placentas passed (small litters make retained placenta easy to miss). Confirm milk supply adequate for litter size.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm all puppies gaining at minimum 8g per day. With typical 3–4 puppy Cavachon litters, each puppy matters individually. Any puppy <75% of litter average weight needs supplemental feeding from today.',
      critical: true,
    },
    {
      week: 6,
      label: '⚠️ Puppy wellness + cardiac auscultation + urinalysis (CaOx) discussion',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. CRITICAL: request cardiac auscultation for any murmur — MVD from CKCS side. Discuss urinalysis for early CaOx monitoring (Bichon risk). EFS DNA test results if done on CKCS parent. Brief new owners on SM phantom scratching and MVD SRR monitoring.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. Provide all DNA results in writing. CRITICAL owner briefings: (1) MVD Sleeping Respiratory Rate monitoring protocol, (2) SM phantom scratching signs, (3) harness only — no neck collar, (4) Cushing\'s signs to watch for from age 5–8, (5) male dogs: urinalysis every 6 months from age 3 for CaOx monitoring.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: '⚠️ MVD Breeding Protocol — MANDATORY for CKCS parent',
      timing: 'CKCS parent must be ≥2.5 years, murmur-free by board-certified cardiologist. Both parents of CKCS parent murmur-free at age 5.',
      method: 'Annual cardiologist auscultation; echo for CKCS parent from 2.5 years',
      plain_english: 'MVD (Mitral Valve Disease) is the leading cause of death in Cavalier King Charles Spaniels and passes to Cavachons. The MVD Breeding Protocol (cavalierhealth.org) requires: CKCS parent is ≥2.5 years old at breeding; no murmur detected by board-certified cardiologist; both parents of the CKCS parent were murmur-free at age 5. The Danish mandatory scheme produced 73% reduction in early-onset MVD (Madsen 2016). cavalierhealth.org states this protocol applies to any breeding involving a Cavalier, including Cavachon breeding. Bichon parent should also have cardiac clearance by cardiologist.',
      mandatory_for_breeding: true,
    },
    {
      name: 'SM/CM — MRI scheme for CKCS parent',
      timing: 'MRI at ≥3 years for CKCS parent; BVA/KC scheme Grade A/B for breeding',
      method: 'MRI by BVA/KC approved scanner',
      plain_english: 'Syringomyelia: CKCS 25% at 12 months, 70% by 6 years (Parker/Knowler 2011). Limpens 2024: breeding two SM-affected parents triples offspring odds. MRI screen CKCS parent at ≥3 years. F1 Cavachon SM risk is lower than purebred CKCS due to Bichon outcross, but not zero — particularly where CKCS conformation is strongly inherited.',
      mandatory_for_breeding: true,
    },
    {
      name: 'EFS — Episodic Falling Syndrome (BCAN)',
      timing: 'DNA test CKCS parent — carrier 12.9–19.1%, affected 3.7%',
      method: 'DNA test (Animal Genetics, CAGT — BCAN 15.7kb deletion)',
      plain_english: 'EFS causes sudden muscle rigidity and collapse during exercise or excitement. Dog is CONSCIOUS throughout. Autosomal recessive. CKCS carrier rate 12.9–19.1%. DNA test CKCS parent mandatory.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CCS/Dry Eye — FAM83H',
      timing: 'DNA test CKCS parent — carrier 10.8%, affected 0.4%',
      method: 'DNA test',
      plain_english: 'Congenital dry eye and ichthyosiform dermatosis. Severe, often fatal phenotype. DNA test CKCS parent.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Eye certification — CAER',
      timing: 'Annual from age 1 for Bichon parent (juvenile cataracts); CKCS parent annual from age 1',
      method: 'CAER ophthalmologist exam',
      plain_english: 'Bichon Frise: juvenile cataracts are breed-specific — annual CAER from age 1. CKCS: annual CAER. Both parents certified.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Patellar luxation',
      timing: 'OFA grading from 12 months; clinical assessment every puppy visit',
      method: 'OFA patellar evaluation',
      plain_english: 'Both CKCS and Bichon are small breeds with elevated patellar luxation risk. OFA patellar grading for both parents before breeding.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'CKCS OFA hip dysplasia ~15.5%. Bichon also has hip certification recommendation. OFA both parents.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Urinalysis — CaOx monitoring for breeding Bichon parent',
      timing: 'Annual urinalysis from age 3 for Bichon parent; check for crystalluria',
      method: 'Urinalysis with sediment exam; urine culture if indicated',
      plain_english: 'Bichon Frise has >20× general-breed CaOx bladder stone risk (University of Minnesota). 73% recurrence after cystotomy. Annual urinalysis monitoring for the Bichon parent from age 3.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const CAVACHON_PREGNANCY_EVENTS = [
  {
    id_suffix: 'cavachon_preg_mvd_protocol',
    day_offset: -42,
    title: '⚠️ CRITICAL: Confirm CKCS parent meets MVD Breeding Protocol before whelping',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'MVD is the most important inherited condition in Cavachons from the CKCS side. Breeding protocol compliance must be confirmed before this litter is born.',
    detail: 'MVD (Mitral Valve Disease) — peer-reviewed facts:\n- 50% of CKCS have MVD by age 5\n- 100% of CKCS have MVD by age 8 by echocardiography (PMC8065390)\n- F1 Cavachons MAY have lower MVD risk at a given age than purebred CKCS — but NO peer-reviewed study confirms this\n- Later-generation Cavachons lose any theoretical outcross benefit\n\nMVD Breeding Protocol (cavalierhealth.org) requirements for CKCS parent:\n1. Age ≥2.5 years at time of breeding\n2. Murmur-free on examination by board-certified cardiologist\n3. Both parents of the CKCS parent were murmur-free at age 5\n\nBichon parent:\n- Annual cardiologist auscultation clearance\n- No cardiac abnormalities\n\nDanish mandatory scheme following this protocol: 73% reduction in early-onset MVD in 8–10 years (Madsen 2016, PMC4913653).\n\nGive every new owner the MVD Sleeping Respiratory Rate monitoring protocol in writing at 8 weeks.',
    call_vet_if: 'CKCS parent has a murmur or is on cardiac medication — do not proceed without vet guidance',
  },
  {
    id_suffix: 'cavachon_preg_shorter_gestation',
    day_offset: -10,
    title: 'CKCS dam: Gestation may be shorter — be ready from Day 58',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: true,
    description: 'CKCS gestation documented at 62.8 ± 2.0 days post-ovulation. If the Cavachon dam has CKCS heritage, be prepared earlier.',
    detail: 'Baltutis et al. (Clinical Theriogenology) documented CKCS-specific gestation at 62.8 ± 2.0 days post-ovulation.\n\nIf elective C-section is planned with a CKCS-ancestry dam:\n- Schedule for day 60–62, NOT day 63–65\n- Waiting until Day 63+ in a CKCS-heritage litter may result in inadvertent dystocia from prolonged gestation\n\nFor natural whelping with CKCS-ancestry dam:\n- Be prepared from Day 58 onwards\n- Pre-whelping temperature drop may occur on Day 59–61\n- Do not assume delay at Day 61 — it is on schedule\n\nFor Cavachon × Bichon (no CKCS dam): standard Day 63 timeline applies.',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'cavachon_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Confirm puppy count — singleton risk in small litters',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. Cavachon typical litter is 3–4. Singletons carry elevated dystocia risk.',
    detail: 'Pre-whelping X-ray at Day 55–58:\n\n- Confirm exact puppy count — tape number to whelping box\n- Check foetal presentation\n- Identify any singleton — singleton Cavachon puppies grow large relative to the dam and carry elevated dystocia risk\n\nFor singleton litters: discuss elective C-section planning with vet.\nFor 3–4 puppy litters: confirm vet emergency availability for whelping date.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const CAVACHON_NEONATAL_EVENTS = [
  {
    id_suffix: 'cavachon_neo_hypoglycemia_watch',
    day_offset: 0,
    title: 'Days 0–84: Hypoglycemia risk is MODERATE-HIGH in Cavachon puppies under 3 months',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Both CKCS and Bichon are small companion breeds. Cavachon puppies under 3 months carry moderate-high hypoglycemia risk.',
    detail: 'Cavachon puppies at 150–250g birth weight are in the moderate-high hypoglycemia risk category — not as extreme as Maltipoos or Toy Cavapoos, but not safe to ignore.\n\nWEEK 1:\n- Feed every 2 hours — do not exceed 4 hours between feeds at any time\n- If any puppy is under 150g at birth: feed every 90 minutes\n- Formula: 1.5 ml per 100g body weight per feed\n- Tube size: French 5 for 150–250g; French 3.5 for under 150g\n- ALWAYS warm formula to 38°C\n- NEVER feed a puppy with rectal temperature below 35°C — warm first\n\nKAR0 CORN SYRUP:\n- Keep on the counter — not the cupboard. Always within arm\'s reach.\n- At the first sign of weakness, lethargy, or pale gums: rub small amount on gums\n- Emergency vet within 30 minutes regardless of whether the puppy appears to recover\n\nHYPOGLYCEMIA TRIGGERS for Cavachon puppies:\n- Cold ambient temperature\n- Missing a feed\n- Dam not producing adequate milk\n- Puppy unable to compete at teat with larger littermates\n- Illness\n- Stress from handling\n\nFROM WEEK 2: every 2.5 hours.\nFROM WEEK 3: every 3 hours.',
    call_vet_if: 'Any puppy shows lethargy, trembling, pale gums, or does not respond to Karo within 15 minutes — emergency vet',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'cavachon_neo_mvd_srr_brief',
    day_offset: 42,
    title: 'Week 6: MVD Sleeping Respiratory Rate monitoring — give every owner this protocol',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'MVD from the CKCS side is the most important long-term health concern for Cavachons. SRR monitoring catches early heart failure at home.',
    detail: 'MVD (Mitral Valve Disease) causes heart failure by allowing blood to leak backward through the mitral valve, eventually causing fluid accumulation in the lungs.\n\nThe first home-detectable sign of early heart failure is ELEVATED SLEEPING RESPIRATORY RATE — before the dog shows obvious breathing difficulty.\n\nSLEEPING RESPIRATORY RATE (SRR) MONITORING:\n1. Watch the dog sleeping deeply (not dreaming/REM)\n2. Count the number of times the chest rises in 30 seconds\n3. Multiply by 2 = breaths per minute\n4. Normal: below 30 breaths per minute\n\nACTION THRESHOLDS:\n- Under 30/min: Normal. Monitor weekly from age 4.\n- 30–34/min: Call vet within 24 hours\n- 35+/min: Call vet same day\n- 40+/min: Emergency vet\n- Any breathing difficulty at rest: Emergency vet\n\nWHEN TO START MONITORING:\n- Build the weekly monitoring habit from Day 1 of ownership\n- Start recording results in a notebook or app from age 3–4 years\n- A sustained upward trend is more significant than a single reading\n\nWHY THIS MATTERS:\n- Early detection allows medication (pimobendan, furosemide) to be started before crisis\n- Dogs started on pimobendan at the right stage live significantly longer\n- The window between early heart failure and decompensation can be weeks\n\nProvide this written protocol to every new Cavachon owner — in clear, plain language.',
  },
  {
    id_suffix: 'cavachon_neo_sm_awareness',
    day_offset: 49,
    title: 'Week 7: SM phantom scratching awareness — brief new owners before they leave',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Syringomyelia from the CKCS side is the second most important health concern for Cavachons. F1 Cavachons have lower risk than purebred CKCS but it is not eliminated.',
    detail: 'Syringomyelia (SM) is a fluid-filled cavity within the spinal cord caused by the Chiari-like Malformation — where the CKCS skull shape is too small for the brain, creating back-pressure into the spinal cord.\n\nF1 Cavachon SM risk:\n- Lower than purebred CKCS (70% by age 6, Parker/Knowler 2011)\n- Not zero — CKCS skull conformation can be dominant in F1 offspring\n- Risk varies by individual, particularly how CKCS-like the skull shape is\n\nEARLY SIGNS (brief every new owner):\n\n1. PHANTOM SCRATCHING — the most characteristic early sign:\n   - Dog scratches at neck or shoulder without making skin contact\n   - The paw is directed toward the ear or neck but never touches\n   - Often triggered by excitement, being on a lead, or collar touch\n   - This is pain from spinal cord compression, not an itch\n\n2. Head and neck sensitivity:\n   - Yelps when picked up or when collar touched\n   - Pulls away from neck petting or collar adjustment\n   - Reluctant to eat from a raised bowl\n\n3. Changed posture:\n   - Head carried low\n   - Reluctant to jump or use stairs\n   - Scoliosis (curved spine) in more severe cases\n\nCRITICAL MANAGEMENT POINT:\nSwitch to a HARNESS immediately if any phantom scratching is observed.\nNeck collar pressure directly worsens SM pain. HARNESS for all Cavachons from Day 1 is safest.\n\nTreatment: Gabapentin, omeprazole, NSAIDs — significant pain relief. Surgery for severe cases.',
    call_vet_if: 'Any phantom scratching, yelping when collar touched, or sudden head-shyness',
  },
  {
    id_suffix: 'cavachon_neo_cushings_awareness',
    day_offset: 49,
    title: 'Week 7: Cushing\'s disease awareness — Bichon parent has HIGHEST breed OR (6.17)',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Bichon Frise has the highest Cushing\'s disease OR of any breed (6.17, O\'Neill VetCompass). Cavachons carry elevated Cushing\'s risk [EXTRAPOLATED]. Brief new owners.',
    detail: 'Hyperadrenocorticism (Cushing\'s Disease) is the most important endocrine condition in Bichon Frises — and because Cavachons inherit from a Bichon parent, they carry elevated risk.\n\nPeer-reviewed data:\n- Bichon Frise OR 6.17 (95% CI 4.22–9.00) — HIGHEST breed odds ratio in UK VetCompass (O\'Neill, PMC9299886)\n- BFCA confirms Cushing\'s is the "principal endocrine disorder" in Bichons, presenting as early as 6 years\n- [EXTRAPOLATED]: Cavachon Cushing\'s risk elevated but not quantified\n\nTypical age of onset: 6–12 years in affected dogs.\n\nSIGNS to watch for from middle age (brief new owners):\n- Pot-bellied appearance — enlarged abdomen\n- Increased thirst and urination\n- Increased appetite\n- Thin, fragile skin and coat changes — thinning hair, hyperpigmentation\n- Muscle wasting and weakness — difficulty jumping\n- Lethargy\n- Recurrent skin infections or urinary tract infections\n\nDiagnosis: LDDS (Low-Dose Dexamethasone Suppression) test or ACTH stimulation test.\nTreatment: Trilostane — lifelong management with good quality of life.\n\nInform new owners: any middle-aged Cavachon showing the above signs = vet within a week.',
  },
  {
    id_suffix: 'cavachon_neo_caox_males',
    day_offset: 49,
    title: 'Week 7: Calcium oxalate bladder stone monitoring — especially important for male Cavachons',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Bichon Frise >20× general risk for CaOx bladder stones, 73% recurrence. Male Cavachons carry significantly elevated risk [EXTRAPOLATED].',
    detail: 'Calcium Oxalate (CaOx) urolithiasis — bladder and kidney stones — is a major concern in Bichon Frises that passes to Cavachons.\n\nData (University of Minnesota Urolith Center):\n- Bichon Frise >20× general mixed-breed risk for CaOx uroliths\n- 80% of male Bichon uroliths are CaOx\n- 73% recurrence rate by 3 years after cystotomy (surgical stone removal)\n\n[EXTRAPOLATED]: Male Cavachons carry significantly elevated CaOx risk. Female Cavachons have lower but still elevated risk.\n\nINFORM NEW MALE CAVACHON OWNERS:\n1. Annual urinalysis from age 3 — monitor for CaOx crystals\n2. High-moisture diet (wet food or raw) significantly reduces stone formation risk\n3. Encourage water intake — always fresh water available, consider water fountain\n4. EMERGENCY signs: straining to urinate without producing urine = EMERGENCY VET (urethral obstruction is fatal without intervention)\n5. Signs of stones: straining, bloody urine, frequent small urinations, licking the genital area excessively, yelping when urinating\n\nNote: straining to urinate with no output in a male dog is a life-threatening emergency — the urethra is obstructed. Do not wait.',
    call_vet_if: 'Male dog straining to urinate without producing urine — EMERGENCY VET IMMEDIATELY',
    emergency_contact_recommended: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const CAVACHON_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'cavachon_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Gentle, social, people-bonded — build on natural temperament',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Cavachons inherit CKCS sociability and Bichon playfulness. Broad socialization reinforces the best traits of both breeds.',
    detail: 'Both CKCS and Bichon Frise are companion breeds bred to be people-focused. Cavachons typically inherit an affectionate, playful, gentle temperament.\n\nFrom Week 3:\n- Daily handling by 8+ different people\n- Children — Cavachons are popular family dogs, ensure child exposure\n- Brief separations from Week 5 — both parent breeds can develop attachment anxiety\n- Novel surfaces, sounds, and environments from Week 4\n- Grooming desensitization from Week 3 (see below)\n\nCavachon-specific: Bichon Frises have a playful, clown-like personality — encourage interactive play from early on to develop the typical Cavachon cheerfulness.',
  },
  {
    id_suffix: 'cavachon_social_week3_grooming',
    day_offset: 21,
    title: 'Week 3: Grooming desensitization — Cavachon coats require professional care',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Cavachon coats range from wavy to curly and require regular grooming. Desensitization from Week 3 is essential.',
    detail: 'Cavachon coats are typically soft and wavy to loosely curly — depending on which parent influence is dominant. All coat types require:\n- Brushing 3–4 times per week minimum\n- Professional grooming every 6–8 weeks\n- Regular ear inspection (both parent breeds have pendulous ears)\n- Eye area cleaning daily (tear staining from both sides)\n\nFrom Week 3:\n1. Daily soft brush from head to tail, 3–5 minutes per puppy\n2. Ear folding and inner-ear inspection\n3. Face and muzzle handling\n4. Paw handling for nail trims\n5. Hair dryer at low setting from a distance — desensitize to sound\n\nA Cavachon not groomed from puppyhood will mat badly and require sedation for full-body coat removal — a welfare problem that falls entirely on the new owner.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const CAVACHON_TRAINING_EVENTS = [
  {
    id_suffix: 'cavachon_training_harness_week5',
    day_offset: 35,
    title: 'HARNESS ONLY from Week 5 — SM neck pain risk from CKCS side',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Given SM risk from the CKCS side, neck collars are medically contraindicated for Cavachons. Harness from Week 5.',
    detail: 'Syringomyelia from the CKCS side causes neck pain that is worsened by collar pressure. Even before SM develops, using a harness from puppyhood means you are not teaching a habit that must later be unlearned.\n\nFrom Week 5:\n1. Introduce a soft H-shaped or Y-chest padded harness\n2. Associate harness with meals — put harness on, give food\n3. Short 5-minute indoor lead practice\n4. Never use a flexi-lead — consistent lead manners are built with fixed-length leads\n\nInform every new owner IN WRITING: harness only for life. Never a neck collar for Cavachons.',
  },
  {
    id_suffix: 'cavachon_training_week5_positive',
    day_offset: 35,
    title: 'Begin formal training Week 5: Gentle, intelligent, responds to positive reinforcement',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Cavachons are gentle, intelligent, and people-oriented — they respond well to positive training from Week 5.',
    detail: 'From Week 5:\n- Sit, down, come, stay — positive reinforcement with high-value treats\n- Name recognition\n- Recall — Cavachons are generally responsive; build strong reward history early\n- "Place" — a specific settling spot, important for managing visitors at adult size\n\nInform new owners:\n- Cavachons do not respond well to harsh corrections — they become anxious and shut down\n- Short, positive sessions twice daily from 8 weeks\n- Enrol in puppy class immediately\n- Mental stimulation reduces the mild separation anxiety many Cavachons develop',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const CAVACHON_HEALTH_RISKS = [
  {
    condition: 'MVD (Mitral Valve Disease)',
    timing: 'CKCS: 50% murmur by 5, ~100% by 8. F1 Cavachon risk lower but not zero — no peer-reviewed data.',
    risk_level: 'critical' as const,
    signs: [
      'Murmur detected at routine vet check',
      'Exercise intolerance — tiring quickly on walks',
      'Coughing, especially at night or after activity',
      'Sleeping respiratory rate above 30/min',
      'Breathing difficulty (late-stage heart failure)',
      'Reduced appetite and weight loss',
    ],
    immediate_action: 'Sleeping respiratory rate >30 = call vet within 24 hours. >40 = emergency vet. Breathing difficulty = emergency vet.',
    vet_decision: 'Monitor SRR weekly from age 4. Any sustained elevation = urgent vet.',
    note: 'MVD Breeding Protocol achieves 73% reduction. No peer-reviewed evidence hybrid vigor reduces Cavachon MVD risk. SRR monitoring from Day 1 of ownership.',
  },
  {
    condition: "Cushing's Disease (Hyperadrenocorticism)",
    timing: 'Bichon: OR 6.17 (HIGHEST breed). Typical onset 6–12 years in affected dogs.',
    risk_level: 'high' as const,
    signs: [
      'Pot-bellied, enlarged abdomen',
      'Dramatically increased thirst and urination',
      'Increased appetite',
      'Thin skin and coat — hair thinning, hyperpigmentation',
      'Muscle weakness — difficulty jumping or climbing',
      'Lethargy and reduced activity',
      'Recurrent infections (UTI, skin)',
    ],
    immediate_action: 'Book vet within a week of these signs in a middle-aged Cavachon. LDDS or ACTH stimulation test required.',
    vet_decision: 'Call vet within a week. Not usually an emergency unless concurrent severe infection.',
    note: 'Bichon Frise OR 6.17 — highest breed risk in UK VetCompass (PMC9299886). [EXTRAPOLATED risk for Cavachon]. Trilostane management — good quality of life achievable.',
  },
  {
    condition: 'Calcium Oxalate Bladder Stones',
    timing: 'Bichon >20× general risk; 73% recurrence. Peak adult and senior. Males at highest risk.',
    risk_level: 'high' as const,
    signs: [
      'Straining to urinate — frequent attempts, little output',
      'Blood in urine (pink or red urine)',
      'Frequently licking the genital area',
      'Yelping or showing pain when urinating',
      'Straining without producing ANY urine = EMERGENCY (obstruction)',
    ],
    immediate_action: 'Straining without producing urine = EMERGENCY VET IMMEDIATELY (urethral obstruction in males is fatal without immediate treatment). Bloody urine alone = urgent vet within 4–8 hours.',
    vet_decision: 'No urine production = emergency. Other signs = urgent same day.',
    note: 'Annual urinalysis from age 3. High-moisture diet. Encourage water intake. 73% recurrence after stone removal — prevention is the only sustainable strategy.',
  },
  {
    condition: 'Syringomyelia / Chiari-like Malformation',
    timing: 'CKCS: 25% by 12 mo, 70% by 6 years. F1 Cavachon risk lower but not quantified.',
    risk_level: 'high' as const,
    signs: [
      'Phantom scratching at neck or shoulder without skin contact',
      'Yelping when collar area or body touched',
      'Head-shy behaviour — pulling away from head petting',
      'Reluctance to use stairs or jump',
      'Low head carriage',
    ],
    immediate_action: 'Harness immediately. Urgent vet referral to neurologist. MRI confirms diagnosis.',
    vet_decision: 'Urgent vet within 24 hours.',
    note: 'Harness from Day 1 prevents one major pain trigger. Medical management: gabapentin, omeprazole, NSAIDs.',
  },
  {
    condition: 'Atopy (Environmental Allergies)',
    timing: 'Typically first signs 1–3 years; lifelong condition',
    risk_level: 'high' as const,
    signs: [
      'Persistent itching — paws, face, belly, armpits, ears',
      'Redness and skin irritation in licked/scratched areas',
      'Recurrent ear infections',
      'Foot chewing and licking',
      'Seasonal pattern in some dogs (pollen-driven)',
    ],
    immediate_action: 'Book vet for allergy workup. Not an emergency unless skin is infected.',
    vet_decision: 'Call vet within a week of recurrent itching.',
    note: 'BOTH CKCS and Bichon are listed as atopy-predisposed breeds (Jaeger 2010). Hybrid vigor does NOT reduce atopy in this cross. Management: Apoquel, Cytopoint, ASIT (desensitisation), medicated shampoos.',
  },
  {
    condition: 'EFS — Episodic Falling Syndrome',
    timing: 'Onset typically 14 weeks to 4 years',
    risk_level: 'medium' as const,
    signs: [
      'Sudden muscle stiffness and inability to move — rigid "deer stalking" posture',
      'Dog is FULLY CONSCIOUS during episode',
      'Triggered by exercise or excitement',
      'Complete recovery within minutes',
    ],
    immediate_action: 'Do not restrain. Video the episode. Book vet for BCAN DNA confirmation.',
    vet_decision: 'Call vet for first episode.',
    note: 'CKCS BCAN carrier rate 12.9–19.1%. F1 Cavachon risk lower — carrier Bichon Frise is uncommon. DNA test CKCS parent at breeding.',
  },
];
