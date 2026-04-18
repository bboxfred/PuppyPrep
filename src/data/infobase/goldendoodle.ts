/**
 * INFO BASE: GOLDENDOODLE
 * Applies to: Goldendoodle (Golden Retriever × Standard, Medium, or Mini Poodle)
 *             F1, F1b, F2, and multigenerational
 * Info base ID: 'goldendoodle'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'goldendoodle'.
 *
 * Sources: GANA (Goldendoodle Association of North America),
 * UC Davis VGL (GR-PRA1 SLC4A3, GR-PRA2 TTC8, prcd-PRA, NEwS, Ichthyosis),
 * Bellumori 2013 JAVMA PubMed 23683021 (hybrid vigor — NOT demonstrated),
 * Bryson/O'Neill 2024 PLOS ONE "Doodle Dilemma" (86.6% no significant difference),
 * Labadie PLOS ONE 2022 PMC9182714 (Golden cancer),
 * Morris Animal Foundation GRLS (Golden 60–65% cancer deaths),
 * Pedersen UC Davis 2015 PMC4579369 (Std Poodle bottleneck — Addison's fixed),
 * iHeartDogs/GANA size standards, Cornell CVM, Merck Vet Manual.
 *
 * ⚠️ DATA QUALITY NOTE:
 * - HIGH confidence: DNA panel requirements, parent-breed disease inheritance,
 *   coat genetics (RSPO2/KRT71/FGF5)
 * - MODERATE confidence: size-specific birth weights, C-section rates (EXTRAPOLATED)
 * - LOW confidence: Goldendoodle-specific cancer rates (no peer-reviewed data)
 *
 * ⚠️ CRITICAL FLAGS:
 * - HYBRID VIGOR IS NOT DEMONSTRATED for Goldendoodles in peer-reviewed literature
 *   Bellumori 2013: 13/24 disorders no difference; Bryson 2024: 86.6% no difference
 *   Do NOT present this as a health benefit
 * - THREE PRA mutations required (prcd, GR-PRA1, GR-PRA2) — not just one
 * - NEwS (fatal neonatal seizures) — Standard Poodle bottleneck — DNA test mandatory
 * - GANA does NOT accept Embark linkage test for CDDY — requires direct-mutation lab
 * - Size is HIGHLY unpredictable in F1 litters (documented 17–52 lb in one litter)
 *   F1b and multigen are significantly more predictable
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE — uses Standard Goldendoodle as default (most common)
// Size variants noted where they differ significantly
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDENDOODLE_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 3, max: 10, typical: 6 },   // Standard avg ~6; Mini avg 4–5
  newborn_weight_grams: {
    standard: { min: 350, max: 550, typical: 450 },
    medium:   { min: 250, max: 400, typical: 325 },
    mini:     { min: 200, max: 350, typical: 275 },
    // All EXTRAPOLATED — no peer-reviewed Goldendoodle-specific birth weight data
  },
  // Default profile uses Standard values
  newborn_weight_grams_default: { min: 350, max: 550, typical: 450 },
  adult_weight_kg: {
    standard: { min: 23, max: 41 },
    medium:   { min: 16, max: 23 },
    mini:     { min: 12, max: 16 },
    petite:   { min: 7,  max: 11 },
  },
  size_category: 'large' as const,   // Standard; override for mini/medium in registry
  hypoglycemia_risk: 'low' as const,  // Standard; Mini/Petite = MEDIUM or HIGH
  singleton_risk: false,
  csection_rate_percent: 8,   // EXTRAPOLATED from parent breeds; Mini likely higher
  brachycephalic: false,

  weight_targets: {
    // Standard Goldendoodle
    birth:  { min: 350, max: 550,  typical: 450  },
    day_7:  { min: 650, max: 990,  typical: 820  },
    day_14: { min: 935, max: 1400, typical: 1170 },
    week_3: { min: 1340, max: 2010, typical: 1675 },
    week_4: { min: 1900, max: 2850, typical: 2375 },
    week_6: { min: 3150, max: 4750, typical: 3950 },
    week_8: { min: 4250, max: 6400, typical: 5325 },
  },

  daily_gain_minimum_grams: 25,
  daily_gain_target_grams: 45,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.5, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 8,  max: 13, per_100g_body_weight: 1.8 },
    week_2: { min: 12, max: 19, per_100g_body_weight: 2.0 },
    week_3: { min: 18, max: 26, per_100g_body_weight: 2.5 },
    week_4: { min: 25, max: 38, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 8,    // Standard; Mini/Petite use French 5
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
    small_litter: { w: 120, d: 120 },
    large_litter:  { w: 150, d: 150 },
    pig_rail_height_cm: 10,
    wall_height_cm: 50,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDENDOODLE_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Goldendoodle puppies. Weigh each puppy individually before dosing — F1 litters can have extreme size variation. A well-known documented case showed 17–52 lb adults from a single F1 Mini Goldendoodle litter, meaning even at 2 weeks the weight spread can be significant.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Use the current weight on the day of treatment.',
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
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. Standard protocol applies. For Mini Goldendoodle puppies: feed before the vet visit to reduce hypoglycemia risk.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2 + Leptospirosis #1',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'],
      plain_english: 'Second vaccination plus first Lepto dose.',
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
      label: 'CRITICAL: Final parvo booster',
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
      plain_english: 'Vet check within 48 hours. Goldendoodles are generally good whelpers. Confirm all placentas passed and milk supply is adequate for litter size.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm all puppies gaining weight. With F1 size variation, watch for the smaller puppies in the litter — puppies <25% of litter average weight are at significantly elevated risk for hypoglycemia, hypothermia, and sepsis (PMC11096582).',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + DNA panel review + cancer awareness',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. Discuss DNA test panel results if done. Discuss SAS (subaortic stenosis) — request cardiac auscultation for any murmur. Brief new owners on Golden Retriever cancer prevalence that is relevant to this breed.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. Provide all DNA test results in writing. Coat genetics result if done (RSPO2, KRT71, FGF5). Honest discussion with new owners: shedding expectations based on coat DNA, adult size estimates with honest uncertainty ranges, cancer awareness from Golden line.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: '⚠️ THREE PRA mutations — all required (not just prcd)',
      timing: 'Test BOTH parents before breeding',
      method: 'DNA test: prcd-PRA + GR-PRA1 (SLC4A3) + GR-PRA2 (TTC8) — three separate tests via UC Davis VGL',
      plain_english: 'Golden Retrievers have TWO unique PRA mutations NOT covered by the standard prcd-PRA test. GR-PRA1 (SLC4A3) is present in ~5% of Golden carriers; GR-PRA2 (TTC8) ~3%. Testing only prcd-PRA misses these Golden-specific mutations. ALL THREE tests are mandatory per UC Davis VGL for Golden Retriever and Goldendoodle breeding. GANA requires the full panel.',
      mandatory_for_breeding: true,
    },
    {
      name: 'NEwS (Neonatal Encephalopathy with Seizures)',
      timing: 'DNA test — ATF2 gene — test both parents (Standard Poodle lineage)',
      method: 'DNA test (UC Davis VGL)',
      plain_english: 'NEwS is a fatal neonatal seizure disorder from the Standard Poodle bottleneck. Autosomal recessive. Affected puppies die by Week 6. Test both parents if Standard Poodle is in the line. Carrier × carrier = 25% affected litter. GANA requires NEwS testing for Standard Goldendoodle breeding stock.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months; PennHIP from 16 weeks',
      method: 'OFA radiograph or PennHIP (preferred)',
      plain_english: 'Golden Retrievers have ~20% OFA-abnormal rate (unbiased study suggests 53–73% with radiographic signs). Standard Poodle ~12% OFA-abnormal. Both parent lines contribute hip dysplasia risk. GANA Gold/Silver requires OFA or PennHIP.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Cardiac clearance — SAS (Subaortic Stenosis)',
      timing: 'Annual cardiologist auscultation; echo if murmur detected',
      method: 'Board-certified cardiologist auscultation + echo as needed',
      plain_english: 'SAS is heritable in Golden Retrievers. Annual cardiologist clearance required for GANA Gold/Silver standard.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Ichthyosis (ICT-A/PNPLA1)',
      timing: 'DNA test — test Golden parent',
      method: 'DNA test via UC Davis VGL or equivalent',
      plain_english: 'Ichthyosis causes fish-scale skin condition. Common in Golden Retrievers. DNA test the Golden parent. Affected dogs have a manageable skin condition but it is lifelong.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Sebaceous Adenitis — watch from Standard Poodle line',
      timing: 'OFA skin biopsy from age 2 for Standard Poodle parents',
      method: 'OFA registered skin punch biopsy',
      plain_english: 'SA is a Standard Poodle bottleneck condition. OFA skin biopsy for the Standard Poodle parent from age 2. Goldendoodles with Std Poodle parentage carry elevated SA risk.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Eye certification (CAER)',
      timing: 'Annual CAER from age 1',
      method: 'CAER ophthalmologist exam',
      plain_english: 'Annual CAER certification required for GANA Gold/Silver standard.',
      mandatory_for_breeding: true,
    },
    {
      name: 'EIC CLARIFICATION — DO NOT TEST',
      timing: 'NOT applicable to Goldendoodles',
      method: 'N/A',
      plain_english: 'EIC (Exercise Induced Collapse, DNM1 mutation) is a Labrador Retriever and Flat-Coated Retriever disease. It does NOT occur in Golden Retrievers or Standard Poodles. Do NOT test Goldendoodles for EIC. Clients frequently confuse Golden Retrievers with Labradors in this regard.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDENDOODLE_PREGNANCY_EVENTS = [
  {
    id_suffix: 'gd_preg_news_test',
    day_offset: -42,
    title: '⚠️ NEwS DNA test — confirm both parents tested (Standard Poodle line)',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'NEwS (Neonatal Encephalopathy with Seizures) is a fatal condition from the Standard Poodle line. Any Goldendoodle breeding from a Standard Poodle parent must test for NEwS.',
    detail: 'NEwS is an autosomal recessive condition caused by a mutation in the ATF2 gene — present in the Standard Poodle population due to a genetic bottleneck.\n\nAffected puppies: normal at birth, develop fatal seizures in Weeks 1–6. No treatment. Humane euthanasia is recommended for confirmed affected puppies.\n\nParent genotype implications:\n✅ Both parents N/N (clear): No affected puppies possible\n⚠️ One parent N/NEwS (carrier): 50% of puppies are carriers — unaffected but may pass to offspring\n🔴 Both parents N/NEwS: 25% of puppies statistically NEwS/NEwS (affected, fatal)\n\nIf the Standard Poodle parent has not been tested: order UC Davis VGL test now.\nIf using a Mini Poodle parent: NEwS is in the Standard Poodle line — check the Mini Poodle\'s lineage. If there is Standard Poodle ancestry in recent generations, test.\n\nWATCH all puppies from birth through 6 weeks for any seizure activity. Any neonate with seizures = emergency vet + DNA test.',
    call_vet_if: 'Any puppy has a seizure from birth through 6 weeks — EMERGENCY',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'gd_preg_size_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Especially important for Mini Goldendoodles',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. Mini Goldendoodle size unpredictability means individual puppy sizes may be very uneven.',
    detail: 'Pre-whelping X-ray at Day 55–58 for all Goldendoodles.\n\nFor Mini Goldendoodles specifically: F1 litters are notoriously size-variable — a documented case shows 17–52 lb adults from a single litter. This means at birth, individual puppy sizes may be very uneven.\n\n- Confirm exact puppy count\n- Look for any notably large foetuses relative to dam pelvis (Mini dam + Golden-sized puppy = dystocia risk)\n- Mini Goldendoodle C-section risk is elevated vs Standard due to size mismatch potential\n\nFor Standard Goldendoodles: confirm count and presentation. Generally good whelpers.',
  },
  {
    id_suffix: 'gd_preg_honest_shedding',
    day_offset: -21,
    title: 'Coat genetics: Test now so you can inform buyers honestly',
    category: 'health' as const,
    priority: 'recommended' as const,
    is_free: false,
    description: 'Goldendoodle coat genetics are testable — furnishing gene (RSPO2) determines whether puppies will shed or not. Know your results before taking deposits.',
    detail: 'The Goldendoodle coat myth: "all Goldendoodles are hypoallergenic and non-shedding." This is FALSE for some F1 litters.\n\nThe RSPO2 (Furnishings) gene:\n- Poodles are F/F (two furnishing copies) — wirehaired face, non-shedding body coat\n- Golden Retrievers are IC/IC (no furnishings) — smooth face, shedding coat\n\nF1 offspring (Poodle F/F × Golden IC/IC):\n- ALL F1 pups are F/IC — furnished (Doodle face) but may still shed\n- If Poodle is F/IC instead of F/F: 50% of F1 pups will be IC/IC — SHED LIKE A GOLDEN\n\nHow to know: DNA test your Poodle parent for RSPO2 (UC Davis VGL offers furnishing test).\n\nF1b (F1 × Poodle F/F): ~50% F/F (very low shedding), ~50% F/IC (low shedding) — most reliably non-shedding generation.\n\nF2: 25% of puppies may be IC/IC (shed like Goldens).\n\nInform every new owner honestly about the coat test results. Never promise "hypoallergenic" — no dog coat is fully hypoallergenic.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDENDOODLE_NEONATAL_EVENTS = [
  {
    id_suffix: 'gd_neo_news_watch',
    day_offset: 0,
    title: 'Days 0–42: NEwS seizure watch — any neonate seizure is an emergency',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'NEwS-affected puppies appear normal at birth then develop fatal seizures. Monitor all puppies from birth through 6 weeks.',
    detail: 'If NEwS carrier status of either parent is not confirmed CLEAR:\n\nWatch every puppy from birth through Week 6 for:\n- Seizure activity: paddling, muscle rigidity, loss of consciousness\n- Abnormal tremors at rest\n- Failure to develop alongside littermates\n- Unusual neurological behaviour\n\nNEwS seizures typically begin Week 1–3 and progress rapidly to fatal.\n\nAny neonate seizure = EMERGENCY VET + NEwS DNA test immediately.\n\nHumane euthanasia is the compassionate recommendation for confirmed NEwS-affected puppies — no treatment available.',
    call_vet_if: 'Any puppy has a seizure or tremors — emergency vet',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'gd_neo_size_variation_management',
    day_offset: 0,
    title: 'Day 0: F1 litter size variation — small puppies need priority management',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'F1 Goldendoodle litters can have extreme size variation. Puppies <25% of litter average weight are at high risk.',
    detail: 'F1 Goldendoodle litters, especially Mini Goldendoodles, can have significant birth weight variation within the same litter.\n\nAt birth:\n1. Weigh every puppy\n2. Calculate the litter average weight\n3. Identify any puppy that is <75% of the litter average (i.e., more than 25% lighter than average)\n\nPuppies <25% of litter average have significantly elevated risk for:\n- Hypoglycemia (PMC11096582)\n- Hypothermia\n- Sepsis\n- Failure to compete for teats\n\nFor any puppy below this threshold from Day 1:\n- Priority teat placement for every nursing session\n- Check rectal temperature before every feed\n- Begin supplemental tube feeding if not gaining\n- Weigh twice daily (not once)\n\nA puppy that is the smallest in the litter is not inevitably going to fail — but it needs active management, not the "survival of the fittest" approach.',
    call_vet_if: 'Any puppy is below 75% of litter average weight at birth or is not gaining by Day 3',
  },
  {
    id_suffix: 'gd_neo_grooming_critical',
    day_offset: 21,
    title: 'Week 3: Grooming desensitization is mandatory for all Goldendoodles',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Goldendoodle coats require professional grooming every 6–8 weeks for life. Begin desensitization from Week 3.',
    detail: 'Regardless of coat type (wavy F1 or curlier F1b), Goldendoodle coats require:\n- Brushing 3–4 times weekly minimum\n- Professional grooming every 6–8 weeks\n- Ear hair removal (Poodle-type ear canals grow hair — infection risk)\n- Dental hygiene from puppyhood\n\nFrom Week 3:\n1. Daily soft brush from head to tail, 3–5 minutes per puppy\n2. Ear handling and inspection\n3. Clipper sound desensitization at a distance\n4. Face and muzzle handling for trim preparation\n5. Paw handling for nail trims\n\nGoldendoodles not grooming-desensitized as puppies develop matting, anxiety at the groomer, and require sedation — an expensive welfare issue.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDENDOODLE_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'gd_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Friendly and social — broad exposure reinforces this',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Goldendoodles inherit sociability from both parent breeds. The socialization window maximises this natural temperament.',
    detail: 'Goldendoodles are naturally social and people-oriented from both the Golden Retriever and Poodle sides. Good socialization in the critical window creates the friendly, adaptable companion the breed is known for.\n\nFrom Week 3:\n- Daily handling by 8+ different people\n- Children — Goldendoodles are popular family dogs, child exposure is essential\n- Novel environments from Week 4\n- Brief separations from Week 5 — Goldendoodles can develop separation anxiety\n\nInform new owners: enrol in puppy class immediately, continue socialising through 12–16 weeks, and consider ongoing training for mental stimulation.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDENDOODLE_TRAINING_EVENTS = [
  {
    id_suffix: 'gd_training_week5',
    day_offset: 35,
    title: 'Begin formal training Week 5: Goldendoodles are highly trainable',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Goldendoodles inherit trainability from both parent breeds. Begin formal training from Week 5.',
    detail: 'Golden Retrievers and Standard Poodles are both among the top 5 most trainable breeds. Goldendoodles typically inherit this trainability.\n\nFrom Week 5:\n- Sit, down, stay, come — positive reinforcement\n- Name recognition\n- Loose-leash walking from Week 6\n- Recall — extremely important given their size and curiosity\n\nInform new owners: Goldendoodles thrive with positive reinforcement, daily training, and mental enrichment. They do not respond well to harsh methods. Enrol in puppy class from 12 weeks.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDENDOODLE_HEALTH_RISKS = [
  {
    condition: 'NEwS (Neonatal Encephalopathy with Seizures)',
    timing: 'Fatal — neonatal period, typically Weeks 1–6',
    risk_level: 'critical' as const,
    signs: [
      'Seizures in a puppy under 6 weeks — paddling, rigidity, loss of consciousness',
      'Progressive neurological deterioration',
      'Failure to develop alongside littermates',
    ],
    immediate_action: 'Emergency vet + DNA test immediately. Humane euthanasia recommended for confirmed affected puppies.',
    vet_decision: 'Emergency vet for any neonatal seizure.',
    note: 'From Standard Poodle genetic bottleneck. Test both parents. Entirely preventable through DNA testing.',
  },
  {
    condition: 'PRA (Progressive Retinal Atrophy) — THREE mutations possible',
    timing: 'prcd: blindness 3–5+ years; GR-PRA1/2: similar adult onset',
    risk_level: 'high' as const,
    signs: [
      'Night blindness — hesitating or bumping into things in dim light',
      'Dilated pupils in normal light',
      'Gradual loss of day vision',
      'Eventual total blindness',
    ],
    immediate_action: 'Book ophthalmologist exam. DNA test if not done. No cure — manage environment for vision impairment.',
    vet_decision: 'Call vet for ophthalmology referral.',
    note: 'Three separate PRA mutations (prcd, GR-PRA1, GR-PRA2) must all be tested in both parents. Testing only prcd misses Golden Retriever-specific mutations.',
  },
  {
    condition: "Addison's Disease (Hypoadrenocorticism)",
    timing: 'Peak 4–7 years; can occur from 6 months',
    risk_level: 'high' as const,
    signs: [
      'Waxing and waning episodes of vomiting and weakness',
      'Lethargy that partially resolves then returns',
      'Weight loss over time',
      "Addisonian crisis: sudden collapse, severe weakness — EMERGENCY",
    ],
    immediate_action: "Addisonian crisis = EMERGENCY VET. Routine signs = vet within 24 hours.",
    vet_decision: 'Crisis = emergency. Routine signs = urgent appointment.',
    note: 'From Standard Poodle genetic bottleneck (Pedersen 2015). ACTH stimulation test is diagnostic. Lifelong management with excellent prognosis.',
  },
  {
    condition: 'Hip and Elbow Dysplasia',
    timing: 'Symptoms from 4 months; OFA confirmation at 24 months',
    risk_level: 'high' as const,
    signs: [
      'Limping or uneven gait after exercise',
      'Stiffness rising from rest',
      'Reluctance to exercise',
      'Bunny-hopping gait',
    ],
    immediate_action: 'Book vet within a week of persistent lameness. Maintain lean body weight.',
    vet_decision: 'Call vet within a week. Orthopaedic referral for surgical candidates.',
    note: 'Both parent lines contribute risk. Lean weight management is the most impactful intervention.',
  },
  {
    condition: 'Cancer — Golden Retriever hereditary risk',
    timing: 'Peak 5–10 years; some cancers from 3 years',
    risk_level: 'high' as const,
    signs: [
      'Unexplained weight loss',
      'Palpable lumps or swellings',
      'Lethargy and decreased appetite',
      'Sudden collapse (hemangiosarcoma — internal bleeding)',
    ],
    immediate_action: 'Sudden collapse with pale gums = EMERGENCY. Unexplained lumps = vet within a week. Annual wellness exams from age 5.',
    vet_decision: 'Emergency for collapse. Urgent for any unexplained mass.',
    note: '60–65% of Golden Retriever deaths are cancer-related (GRLS/Morris Animal Foundation). No peer-reviewed Goldendoodle cancer rate published — assume intermediate risk. Peer-reviewed hybrid vigor benefit for cancer NOT demonstrated (Bellumori 2013, Bryson 2024).',
  },
];
