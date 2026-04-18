/**
 * INFO BASE: ROTTWEILER
 * Applies to: Rottweiler
 * Info base ID: 'rottweiler'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'rottweiler'.
 *
 * Sources: American Rottweiler Club (ARC), Merck Vet Manual,
 * AKC, OFA, Cornell CVM, VCA Animal Hospitals.
 * JLPP (Juvenile Laryngeal Paralysis & Polyneuropathy) — ARC mandatory testing.
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const ROTTWEILER_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 6, max: 12, typical: 9 },
  newborn_weight_grams: { min: 400, max: 650, typical: 525 },
  adult_weight_kg: {
    male:   { min: 50, max: 60 },
    female: { min: 35, max: 48 },
  },
  size_category: 'large' as const,
  hypoglycemia_risk: 'low' as const,
  csection_rate_percent: 17,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 400, max: 650, typical: 525 },
    day_7:  { min: 750, max: 1050, typical: 900 },
    day_14: { min: 1000, max: 1400, typical: 1200 },
    week_3: { min: 1500, max: 2100, typical: 1800 },
    week_4: { min: 2200, max: 3000, typical: 2600 },
    week_6: { min: 3500, max: 5000, typical: 4200 },
    week_8: { min: 5000, max: 7000, typical: 6000 },
  },

  daily_gain_minimum_grams: 35,
  daily_gain_target_grams: 60,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.5, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 10, max: 15, per_100g_body_weight: 1.8 },
    week_2: { min: 15, max: 22, per_100g_body_weight: 2.0 },
    week_3: { min: 22, max: 32, per_100g_body_weight: 2.5 },
    week_4: { min: 32, max: 45, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 10,      // French 10 for large Rottweiler newborns (>500g)
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
    large_litter: { w: 150, d: 150 },
    pig_rail_height_cm: 12,
    wall_height_cm: 50,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const ROTTWEILER_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all puppies. Rottweiler puppies are large and fast-growing — always dose by current weight. With large litters of 9–12 puppies, work through each one systematically with ID verification.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Rottweiler puppies at 4 weeks may already weigh 2+ kg — weigh each puppy and dose accurately.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment using Panacur for 3 days. This broader-spectrum product covers more parasite types as puppies begin exploring and potentially ingesting environmental material.',
      vet_required: false,
      critical: true,
    },
    {
      day: 56,
      label: 'Fourth deworming (pre-rehoming)',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Final deworming before puppies go to new homes. Panacur for 3 days. At 8 weeks, Rottweiler puppies already weigh 5–7 kg — calculate dose carefully.',
      vet_required: false,
      critical: true,
    },
  ],

  dam_deworming: {
    start_day_of_pregnancy: 40,
    end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)',
    dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth. Rottweiler dams nursing large litters have high transmammary parasite transmission risk. This protocol reduces it dramatically.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. CRITICAL for Rottweilers — this breed has well-documented susceptibility to canine parvovirus. Do not delay or skip any dose in the series.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2 + Leptospirosis #1',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'],
      plain_english: 'Second vaccination plus first Lepto dose. Lepto is now AAHA core recommendation.',
      vet_required: true,
      critical: true,
    },
    {
      week: 14,
      label: 'Third vaccination',
      vaccine: 'DHPP #3 + Leptospirosis #2 + Rabies',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis', 'Rabies'],
      plain_english: 'Third vaccination series including Rabies.',
      vet_required: true,
      critical: true,
    },
    {
      week: 18,
      label: '⚠️ CRITICAL ROTTWEILER BOOSTER: Final parvo dose',
      vaccine: 'DHPP #4 (final)',
      covers: ['Distemper', 'Parvovirus'],
      plain_english: 'ESSENTIAL — DO NOT SKIP. Rottweilers have documented genetic susceptibility to parvovirus — they can fail to seroconvert even after 3 doses due to high maternal antibody titres. This 16–20 week booster is the most important single vaccine this breed receives. Rottweiler parvovirus cases in vaccinated dogs almost always involve missing this dose.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check — URGENT',
      urgency: 'within_24_hours',
      plain_english: 'Rottweiler dams should be checked within 24 hours of whelping, not 48. Large litters increase risk of retained placenta, uterine fatigue, and postpartum infection. With 9–12 puppies, the dam has been through significant physical stress.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm all puppies are gaining 35+ grams per day. Assess dam for mastitis — Rottweiler dams with large litters are at elevated mastitis risk. Monitor her weight — she must not be losing excessive condition.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + vaccinations + JLPP DNA test',
      urgency: 'week_6_to_8',
      plain_english: 'First puppy vet visit. Vaccinations, full exam. Request a JLPP DNA test swab at this visit — it is required by the American Rottweiler Club before any Rottweiler litter is sold. Also ask vet to specifically auscultate for cardiac murmurs (SAS in Rottweilers).',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check, health certificate, microchipping. Inform new owners: hip and elbow OFA certification at 24 months, SAS cardiac clearance annually, JLPP test result to disclose, osteosarcoma awareness from age 5.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'JLPP — Juvenile Laryngeal Paralysis & Polyneuropathy',
      timing: 'Any age — DNA test via cheek swab. ARC MANDATES this test for all litters',
      method: 'DNA test',
      plain_english: 'JLPP is a fatal progressive neurological disease causing laryngeal paralysis, exercise intolerance, and death by 12–18 months. It is autosomal recessive — two copies = affected, one copy = carrier. The American Rottweiler Club requires DNA testing of both parents before any litter is sold. If you have not tested, do so immediately.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip and elbow dysplasia',
      timing: 'OFA at 24 months; preliminary at 12 months',
      method: 'OFA radiograph',
      plain_english: 'Hip dysplasia affects ~20% of Rottweilers, elbow dysplasia ~30–50%. ARC CHIC certification requires both OFA hip and elbow clearances before breeding.',
      mandatory_for_breeding: true,
    },
    {
      name: 'SAS — Subaortic Stenosis (cardiac)',
      timing: 'Annual auscultation by board-certified cardiologist; echo if murmur detected',
      method: 'Cardiac auscultation + echocardiogram',
      plain_english: 'SAS occurs at higher rates in Rottweilers than the general dog population. A loud murmur at the left heart base in a young Rottweiler warrants immediate echo. ARC CHIC requires annual cardiac clearance.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Eye certification (CAER)',
      timing: 'Annual CAER exam by board-certified ophthalmologist',
      method: 'CAER ophthalmologic examination',
      plain_english: 'Rottweilers can develop entropion (eyelids rolling inward), ectropion, and cataracts. Annual eye certification is recommended.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const ROTTWEILER_PREGNANCY_EVENTS = [
  {
    id_suffix: 'rott_preg_jlpp_test',
    day_offset: -42,
    title: '⚠️ MANDATORY: JLPP DNA test if not yet done',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'ARC requires JLPP DNA test for both parents before any Rottweiler litter is sold.',
    detail: 'JLPP (Juvenile Laryngeal Paralysis & Polyneuropathy) is a fatal disease in Rottweilers. The American Rottweiler Club mandates DNA testing.\n\nIf you have not tested both parents:\n1. Order a cheek swab DNA test kit immediately\n2. Results typically take 2–3 weeks\n3. If BOTH parents are N/N (clear): litter cannot be affected, though may produce carriers if one parent is N/JLPP\n4. If one parent is N/JLPP (carrier): 25% of puppies will be at-risk — test all puppies before rehoming\n5. Never breed JLPP/JLPP × JLPP/JLPP or N/JLPP × N/JLPP without being prepared to test all offspring\n\nA JLPP-affected puppy will begin showing signs (exercise intolerance, breathing difficulty, weakness) from 2–4 months. Currently no treatment. Euthanasia is humane at that stage.',
    call_vet_if: 'Either parent has not been JLPP tested',
    emergency_contact_recommended: false,
  },
  {
    id_suffix: 'rott_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Puppy count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58 — essential for Rottweiler litters of 9–12.',
    detail: 'Rottweiler litters average 9 puppies with up to 12+ common. A pre-whelping X-ray is essential.\n\nWith large Rottweiler litters:\n- Confirm the count\n- Check for any oversized puppies that may require C-section assistance\n- Confirm presentation — a malpresented large Rottweiler puppy can mean emergency surgery\n\nWith a 17% C-section rate, Rottweiler breeders should always have a 24-hour surgical vet contact confirmed before the due date.',
    call_vet_if: 'You cannot get an appointment within 3 days',
  },
  {
    id_suffix: 'rott_preg_gdv_prevention',
    day_offset: -28,
    title: 'GDV prevention protocol — start now',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Rottweilers are at serious GDV risk. Preventive feeding protocol is mandatory.',
    detail: 'Gastric Dilatation Volvulus (GDV/Bloat) kills Rottweilers. This breed is one of the highest-risk large breeds. Late pregnancy further increases risk as the foetuses compress the stomach.\n\nFrom today:\n1. Feed 3–4 small meals daily — NEVER one large meal\n2. No exercise 1 hour before or 2 hours after eating\n3. Keep feeding calm — excited eating = swallowed air = GDV risk\n4. Do NOT use elevated bowls\n\nDiscuss prophylactic gastropexy with your vet — the stomach is surgically tacked to the abdominal wall. If performed at spay/neuter time, it prevents GDV for life and is the single most important preventive intervention for this breed.\n\nGDV SIGNS — EMERGENCY VET:\n- Unproductive retching\n- Distended hard abdomen\n- Extreme distress\n- Rapid deterioration\n- Pale/grey gums',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'rott_preg_eclampsia_risk',
    day_offset: -14,
    title: 'Eclampsia risk warning: Large Rottweiler litters',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Rottweilers nursing large litters are at elevated eclampsia risk 2–3 weeks post-birth.',
    detail: 'Eclampsia (milk fever / hypocalcaemia) is most common in Weeks 2–3 post-whelping. Rottweiler dams nursing 9–12 puppies are at elevated risk due to the calcium demands of large litter nursing.\n\nIMPORTANT: Do NOT supplement calcium during pregnancy — this INCREASES eclampsia risk by suppressing the parathyroid gland. Calcium supplementation is only appropriate AFTER birth if signs appear.\n\nKnow the signs:\n- Restlessness and panting (early)\n- Muscle tremors\n- Stiff stilted gait\n- Fever above 40°C / 104°F\n- Seizures (late — life-threatening)\n\nIf you see any of these: remove all puppies immediately and GO TO EMERGENCY VET — this is fatal without treatment.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const ROTTWEILER_NEONATAL_EVENTS = [
  {
    id_suffix: 'rott_neo_large_litter_rotation',
    day_offset: 0,
    title: 'Large litter management: Rotation feeding from Day 1',
    category: 'nutrition' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Rottweiler dams with 9+ puppies need rotation feeding from birth.',
    detail: 'A Rottweiler dam has 10 functional teats. With 9–12 puppies, not all can nurse simultaneously. Start rotation feeding immediately.\n\nDivide puppies into two groups mixing large and small:\n- Group A nurses for 30 minutes\n- Group B stays warm in the holding box (85–90°F / 29–32°C)\n- Swap groups. Repeat every feeding cycle.\n\nWeigh every puppy with ID colour collar twice daily for the first 7 days:\n- Any puppy gaining less than 35g/day = move to front of rotation\n- Any puppy showing weight loss = add supplemental Esbilac immediately after nursing\n\nDo not wait to see if a small puppy "catches up" — a day of inadequate nutrition in a Rottweiler puppy sets them significantly behind.',
  },
  {
    id_suffix: 'rott_neo_jlpp_symptoms_watch',
    day_offset: 28,
    title: 'JLPP watch: Signs appear from 2–4 months',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'If JLPP status is unknown, watch for signs from 4 weeks onwards.',
    detail: 'If you have not DNA tested both parents for JLPP, watch for these signs from 4 weeks:\n\nEarly JLPP signs:\n- Noisy breathing during exercise (laryngeal paralysis)\n- Exercise intolerance — puppy tires extremely quickly\n- Regurgitation after eating\n- Weakness in hind legs\n- Slow weight gain relative to littermates\n\nLater JLPP signs (by 3–4 months):\n- Progressive hind-limb weakness\n- Inability to exercise\n- Severe breathing difficulty\n- Megaesophagus\n\nIf ANY puppy shows these signs: DNA test immediately. A confirmed JLPP/JLPP-affected puppy should be humanely euthanised — there is currently no treatment and the disease is fatal within months.',
    call_vet_if: 'Any puppy shows breathing difficulty, exercise intolerance, or hind-leg weakness before 4 months of age',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const ROTTWEILER_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'rott_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: HIGHEST PRIORITY breed',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Rottweiler socialization is the most critical intervention in puppy rearing. An under-socialised adult Rottweiler is a serious liability.',
    detail: 'A Rottweiler can weigh 50–60 kg as an adult. A poorly socialised Rottweiler that is reactive to strangers or other dogs is dangerous and often fatal to the dog (euthanasia after an incident).\n\nFrom Week 3, every day:\n- 5–10 people of varied demographics handle each puppy\n- Touch everything: paws, ears, mouth, tail, belly, between toes\n- Begin "calm response to novelty" — expose to new objects, sounds, surfaces and reward calm investigation with food\n\nThis is not optional. Every Rottweiler breeder is responsible for the safety outcome of their dogs. The socialization you do in Weeks 3–8 determines whether this puppy becomes a safe, confident dog or a liability.',
  },
  {
    id_suffix: 'rott_social_week4',
    day_offset: 28,
    title: 'Socialization Week 4: Men, strangers, children',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Target the specific demographics Rottweilers are statistically most reactive to.',
    detail: 'Research on dog bite statistics shows Rottweilers most commonly react to:\n- Adult men they don\'t know\n- Children (unpredictable movements)\n- Uniformed strangers (mail carriers, delivery drivers)\n\nThis week — deliberately target these:\n1. Have male strangers (not family members the dog knows) visit and handle each puppy\n2. Children aged 5–12 interact with each puppy under close supervision\n3. Someone in uniform or workwear handles each puppy\n4. Delivery driver scenario: person approaches with a box, knocks, leaves\n\nEach positive interaction with these demographics now reduces adult reactivity risk.',
  },
  {
    id_suffix: 'rott_social_week5_impulse',
    day_offset: 35,
    title: 'Socialization Week 5: Begin impulse control',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Rottweiler puppies must learn impulse control before they weigh 50 kg.',
    detail: 'Begin "sit before anything good" from Week 5:\n\n1. Before every meal: puppies must all have four paws on the floor or sit briefly before the bowl goes down\n2. Before being picked up: brief pause and calm before lift\n3. Before any fun activity: one second of stillness\n\nThis seems trivial at 5 weeks. It is not. A Rottweiler that learned as a puppy that impulse control is required for good things becomes an adult that thinks before acting. A Rottweiler that never learned this becomes a dog that demands what it wants immediately — at full adult strength and weight.\n\nInstruct new owners: continue "sit before everything" protocol rigorously through adolescence (6–18 months).',
  },
  {
    id_suffix: 'rott_social_week6_dog_contact',
    day_offset: 42,
    title: 'Socialization Week 6: Dog-to-dog — critical for Rottweilers',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Rottweiler same-sex aggression risk — target diverse dog exposure now.',
    detail: 'Rottweilers, especially males, can develop same-sex dog aggression if not extensively socialised with other dogs during this window.\n\nThis week:\n- At least 5 different dogs of varying breeds and sizes\n- Include small dogs — Rottweilers without small-dog exposure can develop predatory responses\n- Include other intact males if possible — this is the highest-reactivity demographic\n- Supervised off-lead play with known-safe adult dogs\n\nInform new owners strongly: a Rottweiler that attended puppy class with 8–10 other puppies, and continued meeting 3–5 new dogs per week through 6 months, will be fundamentally more manageable than one that didn\'t. Do not breed and sell Rottweiler puppies without this guidance.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const ROTTWEILER_TRAINING_EVENTS = [
  {
    id_suffix: 'rott_training_size_management',
    day_offset: 28,
    title: 'Begin size-management training: Week 4',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'A 6-month Rottweiler weighs 25–35 kg. Loose-leash and no-jumping must be instilled now.',
    detail: 'Rottweilers reach significant size within months. Training that is easy now becomes very difficult once they outweigh a child.\n\nBegin from Week 4:\n1. NO jumping on people — turn away, ignore completely every time a puppy jumps. Four-on-floor gets attention and reward.\n2. Loose-leash principle: movement stops when tension appears on the leash. Begin with collar or harness, short lead, in the whelping area.\n3. Sit before meals — every single meal, every puppy, every time.\n\nInform new owners: these are the three non-negotiable skills a Rottweiler must have before they grow large. A jumping Rottweiler injures people. A Rottweiler that pulls on a lead cannot be safely controlled. A Rottweiler that demands food has an inverted hierarchy.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const ROTTWEILER_HEALTH_RISKS = [
  {
    condition: 'JLPP — Juvenile Laryngeal Paralysis & Polyneuropathy',
    timing: 'Signs from 2–4 months; fatal by 12–18 months',
    risk_level: 'critical' as const,
    signs: ['Noisy breathing during exercise', 'Severe exercise intolerance', 'Regurgitation', 'Progressive hind-leg weakness', 'Inability to walk'],
    immediate_action: 'DNA test immediately if status unknown. Humane euthanasia is recommended for confirmed affected puppies — there is no treatment.',
    vet_decision: 'URGENT VET — any puppy with breathing difficulty under 6 months.',
    note: 'Autosomal recessive. ARC mandates parent testing. Test both parents before any litter is whelped.',
  },
  {
    condition: 'GDV (Gastric Dilatation Volvulus)',
    timing: 'Any age; highest risk in large meals and post-exercise',
    risk_level: 'critical' as const,
    signs: ['Unproductive retching', 'Distended hard abdomen', 'Extreme distress', 'Pale/grey gums', 'Collapse'],
    immediate_action: 'EMERGENCY VET IMMEDIATELY — fatal within 1–4 hours without surgery.',
    vet_decision: 'Rush to emergency vet. Do not wait.',
    note: 'Prophylactic gastropexy at spay/neuter time prevents GDV for life. Strongly recommend for all Rottweilers.',
  },
  {
    condition: 'Osteosarcoma (bone cancer)',
    timing: 'Peak onset 5–8 years of age',
    risk_level: 'high' as const,
    signs: ['Progressive lameness in one limb', 'Swelling over a bone', 'Pain when bone is pressed', 'Reluctance to bear weight'],
    immediate_action: 'Book vet appointment urgently — osteosarcoma progresses rapidly. Do not give NSAIDs and assume it\'s arthritis without ruling out cancer first.',
    vet_decision: 'Call vet within 24 hours of any bone swelling or unexplained lameness in an adult Rottweiler.',
    note: 'Rottweilers have 10–15% lifetime osteosarcoma risk. Inform all new owners.',
  },
  {
    condition: 'Parvovirus (higher susceptibility)',
    timing: 'Unvaccinated period (8–16 weeks)',
    risk_level: 'critical' as const,
    signs: ['Sudden severe vomiting', 'Bloody diarrhoea', 'Lethargy and collapse', 'Not eating', 'Rapid deterioration'],
    immediate_action: 'EMERGENCY VET IMMEDIATELY. Rottweilers die from parvo faster than most breeds. Do not wait.',
    vet_decision: 'Emergency vet — parvo can kill an unprotected Rottweiler puppy within 24 hours.',
    note: 'Rottweilers are documented to have higher parvo susceptibility and mortality. The 18-week booster is NOT optional for this breed.',
  },
];
