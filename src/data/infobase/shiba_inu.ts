/**
 * INFO BASE: SHIBA INU
 * Applies to: Shiba Inu
 * Info base ID: 'shiba_inu'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'shiba_inu'.
 *
 * Sources: Shiba Inu Club of America (NSCA), AKC Shiba Standard,
 * UC Davis VGL (GM1 gangliosidosis GLB1 gene, vgl.ucdavis.edu/test/gm1-shiba-inu),
 * Uddin et al. 2013 BMC Vet Res (Japan carrier frequency 1.02%, n=590),
 * Kato et al. 2006 PubMed 16497230 (Shiba = 33% of canine glaucoma cases),
 * PMC9478343 (C-section rate study — small litters 36.5% dystocia),
 * Norwegian Vet School litter size data, iHeartDogs growth charts.
 *
 * ⚠️ CRITICAL FLAGS:
 * - GM1 Gangliosidosis: fatal lysosomal storage disease — Shiba-specific GLB1 mutation
 *   DNA test via UC Davis VGL MANDATORY for all breeding stock
 *   Carrier frequency 1.02% in Japan (n=590); affected puppies die 12–18 months
 * - Primary glaucoma: Shiba = 33% of canine glaucoma cases in Japanese studies
 *   Gonioscopy pre-breeding; CAER annual
 * - Patellar luxation: up to 35% prevalence in Japanese studies
 * - Hip dysplasia: ~7.6% OFA abnormal
 * - Shiba vocalization (Shiba scream) under stress — whelping environment must be calm
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const SHIBA_INU_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 2, max: 5, typical: 3 },
  newborn_weight_grams: { min: 180, max: 410, typical: 280 },
  adult_weight_kg: {
    male:   { min: 8.2, max: 10.9 },   // AKC Standard preferred; broader: 10.4–13.6 kg
    female: { min: 6.8, max: 9.1 },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const,   // neonates 180–410 g carry standard neonatal risk
  singleton_risk: true,                    // small litters common; singletons occur
  csection_rate_percent: 12,               // not a high-dystocia breed; elevated for <3-pup litters
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 180, max: 410,  typical: 280  },
    day_7:  { min: 340, max: 740,  typical: 520  },
    day_14: { min: 490, max: 1050, typical: 750  },
    week_3: { min: 700, max: 1450, typical: 1075 },
    week_4: { min: 950, max: 2000, typical: 1475 },
    week_6: { min: 1600, max: 3200, typical: 2400 },
    week_8: { min: 2200, max: 4500, typical: 3350 },
  },

  daily_gain_minimum_grams: 10,
  daily_gain_target_grams: 20,
  daily_gain_percent_bodyweight: 7,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 3,  max: 7,  per_100g_body_weight: 1.8 },
    week_2: { min: 6,  max: 11, per_100g_body_weight: 2.0 },
    week_3: { min: 9,  max: 16, per_100g_body_weight: 2.5 },
    week_4: { min: 12, max: 22, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

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
    large_litter:  { w: 100, d: 100 },
    pig_rail_height_cm: 7,
    wall_height_cm: 35,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const SHIBA_INU_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Shiba Inu puppies. With typical litters of 2–4 puppies and wide weight variation, weigh each puppy individually before dosing. A 200g Shiba puppy at 2 weeks needs a tiny precise dose — use a 1 cc syringe, not a kitchen spoon.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Weigh each puppy on the day of treatment — Shiba puppies are fast-moving at 4 weeks, weigh them before morning feeding for accuracy.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment — Panacur for 3 consecutive days. Shiba puppies are energetic explorers from Week 6 — broader spectrum coverage as environmental parasite exposure increases.',
      vet_required: false,
      critical: true,
    },
    {
      day: 56,
      label: 'Fourth deworming (pre-rehoming)',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Final deworming before rehoming. Panacur for 3 days.',
      vet_required: false,
      critical: true,
    },
  ],

  dam_deworming: {
    start_day_of_pregnancy: 40,
    end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)',
    dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth. A Shiba dam at 8–10 kg needs precise dosing — confirm weight before calculating.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. Keep the whelping area calm before and after — Shiba Inus are sensitive dogs and the "Shiba scream" stress response can be triggered by handling in unfamiliar environments. Keeping puppies warm and feeding them before the vet visit reduces stress.',
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
      plain_english: 'Do not skip. Final dose ensures complete parvo protection after maternal antibodies have waned.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check',
      urgency: 'within_48_hours',
      plain_english: 'Vet check within 48 hours. Shiba Inus are described by the NSCA as "excellent mothers and easy, natural whelpers." With small typical litters of 2–4, confirm all foetuses delivered — a retained puppy in a small litter can be less obvious than in a large one. Confirm milk supply and dam recovery.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm all puppies are gaining at least 10g per day. With only 2–4 puppies, each individual matters enormously — any one puppy falling behind needs supplemental Esbilac immediately.',
      critical: true,
    },
    {
      week: 6,
      label: '⚠️ Puppy wellness + GM1 + glaucoma discussion',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. CRITICAL: discuss GM1 gangliosidosis DNA test — if parents have not been tested, arrange cheek swab for all puppies now. Also request patellar palpation and gonioscopy discussion for future screening.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. GM1 DNA status disclosure to all new owners in writing. Glaucoma emergency signs briefing. Patellar luxation monitoring instructions. OFA hip/patella at 24 months recommendation.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'GM1 Gangliosidosis — DNA test MANDATORY',
      timing: 'Test BOTH parents before breeding. Test all puppies before rehoming.',
      method: 'DNA test (UC Davis VGL — GLB1 c.1668delC mutation)',
      plain_english: 'GM1 Gangliosidosis is a fatal lysosomal storage disease specific to Shiba Inus. The GLB1 enzyme is absent, causing toxic molecule accumulation in nerve cells. Carrier frequency ~1.02% in Japan (Uddin 2013, n=590). Affected puppies appear normal at birth but develop progressive neurological deterioration from ~5–6 months, dying by 12–18 months. There is no treatment. DNA test available via UC Davis VGL. Results: N/N (clear), N/GM1 (carrier — no disease, passes to offspring), GM1/GM1 (affected — will die). Do not breed carrier × carrier. Disclose carrier status to all new owners in writing.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Patellar luxation — OFA grading',
      timing: 'OFA grading from 12 months; clinical assessment every puppy visit',
      method: 'OFA patellar evaluation',
      plain_english: 'Japanese studies document up to 35% patellar luxation prevalence in Shiba Inus. OFA grading before breeding. Grade I–II: monitor and restrict jumping. Grade III–IV: surgical correction before breeding. Palpate patellae at every puppy wellness visit.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia — OFA radiograph',
      timing: 'OFA at 24 months; PennHIP from 16 weeks',
      method: 'OFA radiograph',
      plain_english: 'OFA abnormal rate ~7.6% (NSCA historical data, n=889). OFA hip certification required for NSCA CHIC.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Primary Glaucoma — gonioscopy + annual CAER',
      timing: 'Gonioscopy at 1–2 years before breeding; annual CAER exam',
      method: 'Gonioscopy (pectinate ligament dysplasia assessment) + CAER ophthalmologist exam',
      plain_english: 'Shiba Inus represent 33% of canine glaucoma cases in Japanese studies (Kato 2006, n=114) while being only ~2.7% of the dog population. Primary angle-closure glaucoma — polygenic (SRBD1 gene association). Gonioscopy is the only pre-clinical screen. Annual CAER for breeding stock.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Eye certification (CAER)',
      timing: 'Annual from age 1',
      method: 'CAER ophthalmologist exam',
      plain_english: 'Annual CAER eye certification required for NSCA CHIC. Covers glaucoma, PRA, and other ocular conditions.',
      mandatory_for_breeding: true,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const SHIBA_INU_PREGNANCY_EVENTS = [
  {
    id_suffix: 'shiba_preg_gm1_check',
    day_offset: -42,
    title: '⚠️ GM1 Gangliosidosis DNA test — confirm both parents tested',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'GM1 Gangliosidosis is fatal in affected Shiba Inu puppies. DNA testing has been available from UC Davis VGL for years. No Shiba Inu should be bred without confirmed GM1 status.',
    detail: 'GM1 Gangliosidosis is caused by a GLB1 gene mutation (c.1668delC) specific to Shiba Inus. Carrier frequency ~1.02% in Japan (Uddin 2013, n=590 Shibas).\n\nGenotype implications for this litter:\n✅ Both parents N/N (clear): No affected or carrier offspring possible from this mutation\n⚠️ One parent N/GM1 (carrier): 50% of offspring will be carriers — asymptomatic, can live normal lives, should not be bred to another carrier\n🔴 Both parents N/GM1 (carrier × carrier): 25% of litter statistically GM1/GM1 (affected) — these puppies will develop progressive neurological disease and die by 12–18 months\n\nAffected puppies show:\n- Normal appearance at birth through ~5–6 months\n- Progressive cerebellar signs from 5–6 months: ataxia (wobbly gait), intention tremor\n- Loss of learned behaviours\n- Difficulty standing and walking — progressive\n- Fatal by 12–18 months with no treatment available\n\nIf either parent has not been tested: order UC Davis VGL test immediately. Cheek swab. Results in approximately 2 weeks.\n\nFor affected puppies: humane euthanasia is the compassionate choice. Some breeders choose to place affected puppies with fully informed owners who understand the prognosis — this is a personal ethical decision but requires complete disclosure.',
    call_vet_if: 'Either parent is GM1/GM1 (affected) or both are N/GM1 (carrier × carrier breeding)',
  },
  {
    id_suffix: 'shiba_preg_small_litter_planning',
    day_offset: -14,
    title: 'Small litter planning: Shiba typical litter is 2–4 puppies',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Pre-whelping X-ray is especially important for Shiba Inus due to small litter sizes and singleton risk.',
    detail: 'Pre-whelping X-ray at Day 55–58. With Shiba typical litters of 2–4 puppies:\n\n- Confirm exact count — a retained singleton in a small litter is life-threatening and less obvious than in a large litter\n- Check foetal size relative to dam pelvic canal — singleton pups grow larger and carry higher dystocia risk\n- Norwegian Vet School data: litters of 1–2 pups had 36.5% C-section rate vs average for small litters (PMC9478343)\n\nIf X-ray shows a singleton:\n1. Discuss with vet: elective C-section vs monitored natural labour\n2. A single oversized Shiba puppy relative to the dam\'s moderate pelvis is a significant obstruction risk\n3. Have vet emergency contact confirmed and tested before the due date\n\nShibas are natural whelpers in normal litters — the primary risk is the singleton or very small litter.',
  },
  {
    id_suffix: 'shiba_preg_quiet_environment',
    day_offset: -21,
    title: 'Whelping environment: Calm is critical for Shiba Inus',
    category: 'environment' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Shiba Inus are sensitive, independent dogs. A calm, private whelping environment reduces the risk of stressed or distressed whelping behaviour.',
    detail: 'Shiba Inus have a breed-characteristic stress response: the "Shiba scream" — a loud, high-pitched vocalisation triggered by restraint, handling under stress, or unfamiliar environments.\n\nA stressed Shiba dam during whelping may:\n- Pace and resist nesting\n- Show reluctance to nurse initially\n- Become avoidant of their own puppies under stress\n\nBefore the due date:\n1. Establish the whelping box in a quiet, low-traffic area of the home\n2. The dam should be using and resting in the box by Day 58–60\n3. Limit visitors during and for 48 hours after whelping\n4. Keep the environment familiar — no major household changes in the final week\n\nThe NSCA notes that Shibas are "exceptionally clean" whelpers with strong maternal instincts when their environment is calm and private. Trust the dam to manage; intervene only when genuinely needed.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const SHIBA_INU_NEONATAL_EVENTS = [
  {
    id_suffix: 'shiba_neo_gm1_test_early',
    day_offset: 14,
    title: 'Week 2: GM1 DNA test each puppy if parent status uncertain',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'If either parent\'s GM1 status is unknown, test all puppies by Week 2 so you can disclose accurate status before rehoming.',
    detail: 'Collect a gentle cheek swab from each puppy from Day 14 when puppies are physically stable enough.\n\nSend to UC Davis VGL for GM1 Gangliosidosis (GLB1) test.\n\nResults:\n- N/N (Clear): No GM1 risk; not a carrier\n- N/GM1 (Carrier): Will not develop disease; passes gene to offspring — disclose in writing to new owner; should not be bred to another carrier\n- GM1/GM1 (Affected): Will develop progressive neurological disease by 5–6 months and die by 12–18 months\n\nFor GM1/GM1 affected puppies: consult with vet about humane euthanasia. If a new owner wants to proceed despite knowing the prognosis, full written disclosure of expected disease progression and timeline is your ethical obligation.\n\nAll new owners must receive the GM1 DNA result for their puppy in writing before the puppy leaves.',
    call_vet_if: 'Any puppy tests as GM1/GM1 (affected) — vet consultation on management',
  },
  {
    id_suffix: 'shiba_neo_small_litter_weight',
    day_offset: 0,
    title: 'Day 0: Small litter weight tracking is life-critical',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'With only 2–4 Shiba puppies, each individual must be tracked from birth. No puppy is expendable.',
    detail: 'With typical Shiba litters of 2–4, you have fewer puppies to track but each one matters individually.\n\nAt birth:\n1. Weigh each puppy within 1 hour of birth\n2. Assign a colour ID (coloured yarn collar)\n3. Record weight in grams\n4. Weigh again at 12 hours and 24 hours\n\nAcceptable: up to 10% weight loss in the first 24–48 hours\nAct immediately: any puppy not gaining by Day 3 = add supplemental Esbilac\n\nWith singletons: the single puppy may be larger than average and nurse comfortably — but also has no competition and can gain well. Monitor for over-feeding signs (distended abdomen, crying after feeds).\n\nA singleton Shiba puppy that gains well from Day 1 is on track. One that stagnates needs supplementation immediately — you have no other puppies to dilute the risk.',
    call_vet_if: 'Any puppy has not returned to birth weight by Day 4',
  },
  {
    id_suffix: 'shiba_neo_independence_early',
    day_offset: 21,
    title: 'Week 3: Independence training starts now — Shibas are not velcro dogs',
    category: 'socialization' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Shiba Inus are independent by nature. Socialisation must be broad but the approach differs from velcro breeds.',
    detail: 'Unlike Vizslas or Cavaliers, Shibas are not prone to separation anxiety — they are independent and can cope with time alone better than most breeds. However, they still need extensive socialisation to become manageable.\n\nFrom Week 3:\n- Daily handling sessions of 5–10 minutes per puppy\n- Multiple handlers: not just the breeder\n- Touch: entire body including paws, ears, mouth — essential for grooming and vet visits\n- Calm, matter-of-fact handling — Shibas respond best to confident, unhurried handling\n- Begin very brief separations from the litter from Week 5\n\nShiba-specific note: the Shiba scream occurs when the dog is handled roughly, rushed, or frightened. Gentle, confident handling from Week 3 significantly reduces adult stress responses.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const SHIBA_INU_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'shiba_social_week3_independent',
    day_offset: 21,
    title: 'Socialization Week 3: Independent and cat-like — broad exposure needed',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Shibas are alert, independent, and naturally reserved. Under-socialised Shibas become reactive, difficult to handle, and hard to manage in public.',
    detail: 'Shiba Inus are the smallest of the six original Japanese spitz breeds and are described as "cat-like" — independent, aloof with strangers, self-cleaning, and opinionated. Under-socialisation amplifies these traits into problematic behaviour.\n\nFrom Week 3:\n- Handle daily: paws, ears, mouth, tail, belly — essential for a breed that can resist grooming\n- 8+ different people handle each puppy per week\n- Include: men (Shibas can be wary of men without early exposure), children, people in hats\n- Reward all calm interactions with food\n- Never force a stressed puppy into contact — this creates lasting negative associations',
  },
  {
    id_suffix: 'shiba_social_week4_prey_drive',
    day_offset: 28,
    title: 'Socialization Week 4: HIGH prey drive — small animal exposure critical',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Shibas have significant prey drive. Early exposure to cats, small animals, and running children reduces adult predatory behaviour.',
    detail: 'Shiba Inus were originally bred for hunting small game and birds in dense Japanese terrain. The prey drive is real and strong.\n\nFrom Week 4:\n- Introduce cats safely behind a barrier — reward calm observation\n- Small animals in cages for visual desensitization\n- Children running at a distance — redirect any chasing impulse before it becomes habitual\n- Bicycles and scooters passing — calm observation rewarded\n\nInform new owners strongly:\n- Shibas should NEVER be trusted off-lead around small animals unless extensively trained\n- A securely fenced garden (minimum 1.8m high) is essential — Shibas are athletic escape artists\n- Cat introduction in an adult Shiba that never met cats as a puppy is very difficult\n- Off-lead recall in Shibas is notoriously unreliable — the Shiba will make its own decisions',
  },
  {
    id_suffix: 'shiba_social_week5_dog_dog',
    day_offset: 35,
    title: 'Socialization Week 5: Dog-to-dog — same-sex aggression risk',
    category: 'socialization' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Shibas can have same-sex dog aggression issues if not exposed to diverse dogs during the critical window.',
    detail: 'Shibas can be selective about other dogs and have a reputation for same-sex aggression, particularly between intact males.\n\nFrom Week 5:\n- Supervised play with 5+ known, calm dogs of various sizes and sexes\n- Include male dogs — most important demographic for male Shiba puppies\n- Include larger dogs — a Shiba that fears large dogs will be reactive for life\n- Puppy class attendance from 12 weeks strongly recommended\n\nInform new owners:\n- Shibas may not be suitable for dog parks with unknown dogs\n- Dog-to-dog relationships are best one-on-one, on neutral territory\n- Early neutering may reduce but does not eliminate same-sex aggression',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const SHIBA_INU_TRAINING_EVENTS = [
  {
    id_suffix: 'shiba_training_week5_positive_only',
    day_offset: 35,
    title: 'Begin formal training Week 5: Positive reinforcement only — Shibas shut down under pressure',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Shibas are intelligent but highly independent. Positive reinforcement is the only effective approach.',
    detail: 'Shiba Inus are intelligent and capable of learning, but they are not people-pleasers. They respond to training on their terms — what\'s in it for them matters.\n\nFrom Week 5:\n- Sit, down, come — positive food lure, mark and reward\n- Recall: Shibas only come to you if they want to. High-value rewards (chicken, cheese) ONLY for recall — never for anything else\n- "Leave it" — crucial for a prey-driven breed\n- End sessions on success, keep them short (3–5 minutes)\n\nPhysical correction, raised voices, or frustrated repetition cause Shibas to either shut down completely or escalate to the Shiba scream. Patience and positive reinforcement get results that no other approach does.\n\nInform new owners: Shibas can learn anything — but on the understanding that it is a partnership, not compliance. Enrol in puppy class immediately and choose a trainer experienced with independent breeds.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const SHIBA_INU_HEALTH_RISKS = [
  {
    condition: 'GM1 Gangliosidosis',
    timing: 'Normal at birth; neurological signs from 5–6 months; fatal by 12–18 months',
    risk_level: 'critical' as const,
    signs: [
      'Progressive ataxia (wobbly, uncoordinated gait) from 5–6 months',
      'Intention tremor — shaking when trying to do a precise movement',
      'Loss of learned behaviours — forgetting commands they knew',
      'Difficulty standing and maintaining balance',
      'Progressive deterioration to inability to walk',
    ],
    immediate_action: 'Urgent vet for neurological assessment. GLB1 DNA test to confirm. No treatment available — palliative supportive care only. Discuss euthanasia timeline with vet to prevent suffering.',
    vet_decision: 'Urgent vet referral to neurologist for any Shiba showing cerebellar signs under 2 years.',
    note: 'Carrier frequency ~1.02% in Japan (n=590). DNA test via UC Davis VGL prevents affected litters. Test ALL breeding Shibas.',
  },
  {
    condition: 'Primary Glaucoma',
    timing: 'Can occur any age from 2–8 years; acute attack is an emergency',
    risk_level: 'critical' as const,
    signs: [
      'Red, bloodshot eye — especially if one eye looks redder than the other',
      'Squinting or keeping one eye partially closed',
      'Eye appears enlarged or more prominent than usual',
      'Cloudy or bluish cornea',
      'Apparent pain — head shy near the affected eye',
      'Rapid, irreversible vision loss in the affected eye',
    ],
    immediate_action: 'EMERGENCY VET WITHIN 2–4 HOURS. Glaucoma causes permanent blindness within 24–72 hours of acute onset. Do not wait until tomorrow.',
    vet_decision: 'Emergency vet — same day. Ophthalmologist referral for long-term management.',
    note: 'Shiba Inus represent 33% of canine glaucoma cases in Japanese studies (Kato 2006) despite being ~2.7% of the dog population. Annual CAER eye exams and gonioscopy pre-breeding.',
  },
  {
    condition: 'Patellar Luxation',
    timing: 'Detectable from first puppy visit; symptoms from 4 months onwards',
    risk_level: 'high' as const,
    signs: [
      'Occasional "skipping" gait — lifting one hindleg for a few steps then resuming normal gait',
      'Intermittent yelping without clear cause',
      'Hindleg held up for a brief period then back to normal',
      'Grade III–IV: persistent abnormal gait, difficulty rising',
    ],
    immediate_action: 'Book vet for grading. Grade I–II: conservative management (weight control, no jumping, ramps). Grade III–IV: surgical correction.',
    vet_decision: 'Call vet within a week of first episode. Not an emergency unless dog cannot bear weight.',
    note: 'Up to 35% prevalence in Japanese studies. OFA patellar grading before breeding. Surgical correction is curative for Grade III–IV.',
  },
];
