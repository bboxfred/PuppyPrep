/**
 * INFO BASE: LABRADOR RETRIEVER
 * Applies to: Labrador Retriever (Black, Yellow, Chocolate)
 * Info base ID: 'labrador_retriever'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'labrador_retriever'.
 *
 * Sources: Labrador Retriever Club of America, Cornell CVM, Merck Vet Manual,
 * AKC, VCA Animal Hospitals, UC Davis VGL (EIC, CNM, POMC), OFA.
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const LABRADOR_RETRIEVER_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 5, max: 10, typical: 8 },
  newborn_weight_grams: { min: 400, max: 580, typical: 490 },
  adult_weight_kg: {
    male:   { min: 29, max: 36 },
    female: { min: 25, max: 32 },
  },
  size_category: 'large' as const,
  hypoglycemia_risk: 'low' as const,
  csection_rate_percent: 4,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 400, max: 580, typical: 490 },
    day_7:  { min: 750, max: 950, typical: 850 },
    day_14: { min: 1000, max: 1300, typical: 1150 },
    week_3: { min: 1400, max: 1900, typical: 1650 },
    week_4: { min: 2000, max: 2700, typical: 2350 },
    week_6: { min: 3200, max: 4200, typical: 3700 },
    week_8: { min: 4500, max: 6000, typical: 5200 },
  },

  daily_gain_minimum_grams: 30,
  daily_gain_target_grams: 50,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.5, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 9,  max: 14, per_100g_body_weight: 1.8 },
    week_2: { min: 13, max: 20, per_100g_body_weight: 2.0 },
    week_3: { min: 20, max: 28, per_100g_body_weight: 2.5 },
    week_4: { min: 28, max: 40, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 8,
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
    pig_rail_height_cm: 10,
    wall_height_cm: 45,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const LABRADOR_RETRIEVER_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all puppies today. Lab puppies are heavy feeders and grow fast — dose by current weight, not birth weight. Labrador mothers commonly pass Toxocara canis and hookworms through milk.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Lab puppies at 4 weeks weigh significantly more than at birth — always re-weigh before dosing.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment using Panacur (fenbendazole) for 3 days in a row. This covers a wider range of intestinal parasites including Giardia — Labs swimming in water are at higher risk.',
      vet_required: false,
      critical: true,
    },
    {
      day: 56,
      label: 'Fourth deworming (pre-rehoming)',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Final deworming before puppies go to new homes. Panacur for 3 days. Tell new owners to continue monthly heartworm prevention (which covers intestinal worms) from 8 weeks.',
      vet_required: false,
      critical: true,
    },
  ],

  dam_deworming: {
    start_day_of_pregnancy: 40,
    end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)',
    dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth reduces worm transmission to puppies through the milk. Essential for Lab dams.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. Done by your vet. Labs are generally robust but parvovirus can still be severe in unprotected puppies.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2 + Leptospirosis #1',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'],
      plain_english: 'Second vaccination plus first Leptospirosis dose. Labs are often water dogs — Lepto is spread by wildlife urine in standing water and is now a core AAHA recommendation.',
      vet_required: true,
      critical: true,
    },
    {
      week: 14,
      label: 'Third vaccination',
      vaccine: 'DHPP #3 + Leptospirosis #2 + Rabies',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis', 'Rabies'],
      plain_english: 'Third vaccination series plus Rabies. Puppies are fully protected 2 weeks after this dose.',
      vet_required: true,
      critical: true,
    },
    {
      week: 18,
      label: 'CRITICAL: Final parvo booster',
      vaccine: 'DHPP #4 (final)',
      covers: ['Distemper', 'Parvovirus'],
      plain_english: 'Do not skip this booster. Given at 16–20 weeks to ensure full protection after maternal antibody levels drop. This is the dose that closes potential gaps in parvovirus immunity.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check',
      urgency: 'within_48_hours',
      plain_english: 'Vet check for the mother within 48 hours. With large Lab litters, confirm all placentas have passed and check for retained fetuses.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm the mother is producing enough milk for all puppies. Labs nursing 8–10 puppies have high mastitis and exhaustion risk.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + first vaccinations',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit for each puppy. Vaccinations, full physical exam. Ask vet to specifically check for EIC (exercise-induced collapse) risk awareness and discuss PennHIP hip screening timing.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. Written health certificate. Microchipping confirmed. Inform new owners about hip screening (PennHIP from 16 weeks, OFA at 24 months) and EIC DNA testing.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'Hip and elbow dysplasia',
      timing: 'OFA at 24 months; PennHIP from 16 weeks',
      method: 'OFA radiograph or PennHIP distraction index',
      plain_english: 'Hip dysplasia affects 12–25% of Labs depending on line. Elbow dysplasia affects ~15%. Both are required for Labrador Retriever Club of America CHIC certification.',
      mandatory_for_breeding: true,
    },
    {
      name: 'EIC — Exercise-Induced Collapse',
      timing: 'Any age — DNA test via cheek swab',
      method: 'DNA test for DNM1 gene mutation (UC Davis VGL)',
      plain_english: 'EIC affects approximately 5% of Labs. Affected dogs (E/E genotype) collapse after 5–15 minutes of intense exercise — appears dramatic but usually recovers in 5–25 minutes. Rarely fatal. DNA test before breeding and inform new owners of status. Affected dogs should not be used for hunting or intense field work in hot conditions.',
      mandatory_for_breeding: true,
    },
    {
      name: 'CNM — Centronuclear Myopathy',
      timing: 'Any age — DNA test',
      method: 'DNA test for PTPLA gene mutation (UC Davis VGL)',
      plain_english: 'Rare muscle disease causing exercise intolerance, muscle wasting, and abnormal gait from 2–5 months. Fatal or requires euthanasia. Test both parents before breeding.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Progressive Retinal Atrophy (prcd-PRA)',
      timing: 'Any age — DNA test; annual CAER eye exam',
      method: 'DNA test (OPTC mutation) + ophthalmologist CAER exam',
      plain_english: 'PRA causes progressive blindness typically from 3–5 years. DNA test identifies carriers. Breeding two carriers produces 25% affected puppies.',
      mandatory_for_breeding: true,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const LABRADOR_RETRIEVER_PREGNANCY_EVENTS = [
  {
    id_suffix: 'lab_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Puppy count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58 for accurate count. Lab litters of 10+ require this.',
    detail: 'Lab litters commonly reach 10–12 puppies. A pre-whelping radiograph at Day 55–58 is non-negotiable.\n\nWithout the count:\n- You cannot know when labour is finished\n- A retained puppy can kill the mother from infection within 24–48 hours\n\nWrite the number on paper and tape it to the whelping box. Confirm with the vet: any puppies in abnormal positions?',
    call_vet_if: 'You cannot get an appointment within 3 days of the due date',
  },
  {
    id_suffix: 'lab_preg_eic_awareness',
    day_offset: -30,
    title: 'EIC awareness: Reduce exercise intensity now',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'If dam carries EIC (E/E), avoid intense retrieving exercise during pregnancy.',
    detail: 'If your Lab dam has EIC (exercise-induced collapse) status E/E or E/e, avoid intense retrieving sessions, fetch games, or vigorous exercise from mid-pregnancy onwards.\n\nEIC in pregnancy: intense exercise causing collapse poses added risk due to reduced cardiovascular reserve and the potential of the dog falling.\n\nModerate leash walking is appropriate and beneficial throughout pregnancy. Avoid:\n- Retrieves more than 5 repetitions\n- Swimming in hot weather\n- Exercise in temperatures above 24°C / 75°F',
  },
  {
    id_suffix: 'lab_preg_large_litter_setup',
    day_offset: -14,
    title: 'Large litter preparation: Order extra Esbilac now',
    category: 'nutrition' as const,
    priority: 'high' as const,
    is_free: true,
    description: 'Lab litters of 8–10 require supplemental feeding resources ready before birth.',
    detail: 'Order before birth:\n- 2 cans Esbilac (puppy milk replacer) minimum\n- 2 nursing bottle kits or Miracle Nipple set\n- Size-8 French feeding tube (for emergency tube feeding)\n- 10 cc syringes × 10\n- Gram-accurate scale\n- Coloured yarn or ID system for 10–12 puppies\n\nLab mothers are excellent but even the best dam cannot adequately nurse a litter of 10+ without supplemental support. Having these supplies ready before birth means you can act immediately.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const LABRADOR_RETRIEVER_NEONATAL_EVENTS = [
  {
    id_suffix: 'lab_neo_weight_day1',
    day_offset: 1,
    title: 'Weight check: Identify any puppies needing help',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'In large Lab litters, identify runts on Day 1 before they fall behind.',
    detail: 'Weigh every puppy and record with ID colour. In a large Lab litter:\n\n- Any puppy more than 20% lighter than the heaviest = priority nursing placement\n- Move lightest puppies to the most productive rear teats first at each feeding\n- Supplement any puppy that nursed but didn\'t gain after 24 hours\n\nAverage Lab birth weight: 490g. Flag any puppy under 350g — they are at elevated fading puppy risk and need 90-minute feeding intervals rather than 2-hour.',
    call_vet_if: 'Any puppy is under 300g at birth, or any puppy shows no nursing activity in the first 4 hours',
  },
  {
    id_suffix: 'lab_neo_copper_awareness',
    day_offset: 42,
    title: 'Week 6: Watch for copper-related hepatopathy signs',
    category: 'health' as const,
    priority: 'recommended' as const,
    is_free: false,
    description: 'Labs are predisposed to copper storage disease. Monitor at first vet visit.',
    detail: 'Copper-associated hepatitis is a breed predisposition in Labradors. While typically an adult disease (onset 2–7 years), the genetic risk is present from birth.\n\nAt the 6-week vet visit, ask:\n- "Can you include liver enzyme check (ALT, AST) in the puppy wellness bloodwork?"\n\nInform new owners:\n- Avoid copper-rich diets long-term\n- Annual liver enzymes from age 2 in Labs\n- Any jaundice, lethargy, vomiting, weight loss = vet same day',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NUTRITION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const LABRADOR_RETRIEVER_NUTRITION_EVENTS = [
  {
    id_suffix: 'lab_nutrition_obesity_warning',
    day_offset: 35,
    title: 'Week 5: Begin portion management now',
    category: 'nutrition' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Labrador Retrievers carry the POMC gene mutation — they never feel full. Start structured feeding from weaning.',
    detail: 'The POMC gene mutation affecting appetite regulation is found in ~20% of Labradors (higher in Assistance Dog lines). Affected dogs never feel satiated.\n\nStart structured feeding from the beginning:\n- Weigh food portions — do not free-feed\n- Remove food dishes after 15 minutes\n- Use puzzle feeders to slow eating\n- Never feed scraps or treats outside training\n\nInform new owners: Labrador obesity is the #1 preventable health problem in the breed. An overweight Lab at 2 years has dramatically increased risk of hip dysplasia symptoms, cruciate rupture, and reduced lifespan.',
  },
  {
    id_suffix: 'lab_nutrition_weaning',
    day_offset: 21,
    title: 'Begin weaning: Introduce puppy gruel at Week 3',
    category: 'nutrition' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Lab puppies are vigorous and will wean readily from Day 21.',
    detail: 'Begin weaning at Day 21:\n\n1. Blend high-quality large-breed puppy kibble with warm water into a soupy consistency\n2. Serve in shallow dishes — one dish per 2–3 puppies minimum\n3. Labs eat enthusiastically and will compete at the dish — watch that runts get adequate access\n4. Gradually thicken over 2 weeks to dry kibble by Week 7\n\nNote: Labs use the POMC-influenced appetite from their first solid meal. Even at 3 weeks, Lab puppies will overeat if given the chance. Remove food after 15 minutes from this point forward.\n\nUse large-breed puppy food (controlled calcium/phosphorus) — standard puppy food has too high energy density and causes too-rapid growth which increases joint disease risk.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const LABRADOR_RETRIEVER_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'lab_social_week3_handling',
    day_offset: 21,
    title: 'Socialization Week 3: Daily handling',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Begin deliberate daily handling of each Lab puppy.',
    detail: 'Week 3 goals for each Lab puppy:\n\n- 5–10 minutes handling per puppy per day\n- Touch: paws, ears, mouth, tail, belly, between toes\n- Begin "soft mouth" work: let puppy mouth your hand, yelp sharply and withdraw when pressure is too hard\n- Labs mouth intensely — bite inhibition must begin now\n\nLabs are naturally social and people-oriented. They also mouth EVERYTHING. Start distinguishing allowed from not-allowed mouthing from Week 3.',
  },
  {
    id_suffix: 'lab_social_week4_people',
    day_offset: 28,
    title: 'Socialization Week 4: Expose to varied people',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Labs need diverse human exposure in this critical window.',
    detail: 'Week 4 targets:\n\n- 8–10 different people handle each puppy\n- Include children — Labs are popular family dogs, child interaction is essential\n- Vary: hats, beards, uniforms, glasses, walking frames\n- Introduce car travel (towel-lined crate)\n- Household sounds: vacuum, blender, television, washing machine\n\nLab puppies that miss diverse human exposure in Weeks 4–12 can become reactive or fearful despite the breed\'s reputation for friendliness. Their friendliness is not automatic — it is built.',
  },
  {
    id_suffix: 'lab_social_week5_water',
    day_offset: 35,
    title: 'Socialization Week 5: Water introduction (optional but valuable)',
    category: 'socialization' as const,
    priority: 'recommended' as const,
    is_free: false,
    description: 'Labs are water dogs — early positive water experience supports the breed\'s natural instincts.',
    detail: 'A shallow water tray (5 cm deep) in the whelping area from Week 5:\n\n- Most Lab puppies will explore and splash happily\n- This builds confidence with wet surfaces and water sounds\n- Do NOT force any puppy into water\n\nInform new owners: Labs benefit enormously from swimming as low-impact exercise — especially important for dogs with hip dysplasia risk. Starting positive water association early makes adult water work easier.\n\nNever leave puppies unsupervised near water of any depth.',
  },
  {
    id_suffix: 'lab_social_week6_class_prep',
    day_offset: 42,
    title: 'Socialization Week 6: Puppy class preparation',
    category: 'socialization' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Prepare Lab puppies for puppy class at Week 7–8.',
    detail: 'Lab puppies are ready for structured puppy class from Week 7–8 (7 days after first vaccination). AVSAB confirms early puppy class benefits outweigh infection risks in controlled settings.\n\nThis week prepare:\n- Practice "sit" — Labs learn this in days at this age\n- Loose-leash walking (no retractable leads — Labs will pull and teach themselves to pull)\n- Name recognition — call each puppy by name, reward every response\n\nInform new owners strongly: Labs have a manageable window for loose-leash training. A 35 kg Lab that learned to pull as a puppy is very difficult to retrain. Puppy class and immediate harness or front-clip lead is urgent.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const LABRADOR_RETRIEVER_TRAINING_EVENTS = [
  {
    id_suffix: 'lab_training_mouthing',
    day_offset: 21,
    title: 'Bite inhibition: Highest priority for Lab puppies',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Lab mouthiness peaks at 10–16 weeks. Foundation must be laid now.',
    detail: 'Lab puppies mouth everything and everyone. This is normal — but it must be redirected from Week 3 onwards.\n\nProtocol:\n1. When puppy applies too much pressure: sharp yelp + 60-second complete social withdrawal\n2. Never jerk hand away (this triggers chase/bite)\n3. After 60 seconds: return and resume interaction\n4. When puppy uses soft mouth: praise and continue\n\nRepeat every single time — 100% consistency for 4–6 weeks.\n\nLab bite inhibition must be established before 16 weeks — a 35 kg Lab that bites hard is dangerous regardless of intent. Inform new owners this is their single most important early task.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const LABRADOR_RETRIEVER_HEALTH_RISKS = [
  {
    condition: 'Exercise-Induced Collapse (EIC)',
    timing: 'First episode typically 5 months to 3 years',
    risk_level: 'high' as const,
    signs: ['Dog that was running fine suddenly becomes uncoordinated', 'Hind legs collapse while dog is still alert', 'Extreme panting during collapse', 'Full recovery within 5–25 minutes'],
    immediate_action: 'Stop all exercise. Move dog to shade/cool area. Do not force the dog to walk. Keep calm and monitor. Most episodes resolve completely. DO NOT re-exercise that day.',
    vet_decision: 'Call vet for diagnosis. DNA test at first post-collapse appointment. If dog does not recover within 30 minutes — emergency vet.',
    note: 'E/E (affected) dogs should not be used for intensive retrieving work. E/e (carrier) dogs rarely collapse.',
  },
  {
    condition: 'Obesity / POMC gene',
    timing: 'Begins at weaning; accelerates at 6 months',
    risk_level: 'high' as const,
    signs: ['Cannot feel ribs without pressing', 'No visible waist from above', 'Dog always acts hungry regardless of how much eaten', 'Rapid weight gain despite normal portions'],
    immediate_action: 'Implement strict portion control. Weigh food — do not estimate. Remove all food scraps and extra treats. Increase structured exercise.',
    vet_decision: 'Call vet if BCS is over 6/9. Ask about prescription weight management diet.',
  },
  {
    condition: 'Centronuclear Myopathy (CNM)',
    timing: 'Symptoms from 2–5 months of age',
    risk_level: 'critical' as const,
    signs: ['Muscle weakness and wasting from an early age', 'Exercise intolerance', 'Abnormal gait with head bobbing', 'Difficulty swallowing', 'Stunted growth'],
    immediate_action: 'Seek veterinary diagnosis urgently. This condition is rapidly progressive and currently has no cure.',
    vet_decision: 'Emergency vet if symptoms appear before 6 months. This is not a "wait and see" condition.',
  },
  {
    condition: 'Hip/Elbow Dysplasia',
    timing: 'Symptoms typically 4–18 months; radiographic detection earlier',
    risk_level: 'high' as const,
    signs: ['Stiffness getting up, especially after rest', 'Reluctance to climb stairs', 'Bunny-hopping gait with hind legs', 'Reduced exercise tolerance'],
    immediate_action: 'Restrict high-impact exercise (no jumping, rough play on hard surfaces, forced running) until growth plates close at 12–14 months. Maintain lean body weight.',
    vet_decision: 'Call if any lameness from age 4 months.',
  },
];
