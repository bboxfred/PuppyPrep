/**
 * INFO BASE: DOBERMAN PINSCHER
 * Applies to: Doberman Pinscher, Dobermann
 * Info base ID: 'doberman_pinscher'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'doberman_pinscher'.
 *
 * Sources: DPCA (Doberman Pinscher Club of America), Cornell CVM,
 * Merck Vet Manual, Meurs DCM studies, VCA Animal Hospitals,
 * NC State CVM vWD/von Willebrand disease resources.
 *
 * ⚠️ CRITICAL FLAG: Doberman whelping carries vWD (von Willebrand disease)
 * bleeding risk. Cryoprecipitate must be prepared before whelping.
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const DOBERMAN_PINSCHER_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 6, max: 10, typical: 8 },
  newborn_weight_grams: { min: 350, max: 550, typical: 450 },
  adult_weight_kg: {
    male:   { min: 34, max: 45 },
    female: { min: 27, max: 41 },
  },
  size_category: 'large' as const,
  hypoglycemia_risk: 'low' as const,
  csection_rate_percent: 12,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 350, max: 550, typical: 450 },
    day_7:  { min: 650, max: 950, typical: 800 },
    day_14: { min: 900, max: 1300, typical: 1100 },
    week_3: { min: 1400, max: 2000, typical: 1700 },
    week_4: { min: 2000, max: 2800, typical: 2400 },
    week_6: { min: 3200, max: 4500, typical: 3800 },
    week_8: { min: 4500, max: 6500, typical: 5500 },
  },

  daily_gain_minimum_grams: 25,
  daily_gain_target_grams: 50,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 8,  max: 13, per_100g_body_weight: 1.8 },
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
    wall_height_cm: 50,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const DOBERMAN_PINSCHER_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all puppies. Weigh each puppy on the day of treatment — do not use birth weight. Doberman puppies grow rapidly.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Always use current weight.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment — Panacur for 3 days in a row. Broader spectrum coverage.',
      vet_required: false,
      critical: true,
    },
    {
      day: 56,
      label: 'Fourth deworming (pre-rehoming)',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Final deworming before puppies go to new homes. Panacur for 3 days.',
      vet_required: false,
      critical: true,
    },
  ],

  dam_deworming: {
    start_day_of_pregnancy: 40,
    end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)',
    dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth. Reduces worm transmission to puppies through milk.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. Dobermans are generally robust but the full booster series is essential.',
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
      plain_english: 'Do not skip. This dose closes any gaps in parvo immunity after maternal antibodies have fully waned.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: '⚠️ Post-whelping dam check — vWD BLEEDING RISK',
      urgency: 'within_24_hours',
      plain_english: 'Check dam within 24 hours of whelping. CRITICAL: Doberman dams with vWD Type I (>70% carrier rate) have elevated postpartum bleeding risk. Monitor vulvar discharge — normal postpartum discharge is dark red/green and decreasing. Bright red ongoing bleeding = emergency vet immediately.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Monitor dam\'s recovery — Dobermans with vWD can have delayed healing of any whelping injuries. Confirm all puppies gaining weight normally.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + vaccinations + colour check',
      urgency: 'week_6_to_8',
      plain_english: 'First puppy vet visit. Vaccinations, full exam. For blue and fawn coloured puppies: inform vet, discuss colour dilution alopecia (CDA) monitoring — skin and coat condition checks needed as they age. For all puppies: vWD DNA test recommended before any puppy goes to a new home.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. Disclose vWD status to all new owners — they must inform every vet who touches this dog. Inform new owners about DCM screening from age 3, narcolepsy signs (onset 4–32 weeks), and copper hepatitis monitoring.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'vWD — von Willebrand Disease Type I',
      timing: 'Any age — DNA test via cheek swab. Test BEFORE breeding.',
      method: 'DNA test + BMBT (buccal mucosal bleeding time) + vWF:Ag assay for confirmation',
      plain_english: 'Over 70% of Dobermans carry vWD Type I. Affected dogs bleed excessively from minor injuries, vaccinations, or surgery. Test all breeding stock. Disclose status to all new puppy owners — this information must reach every vet who treats this dog for life.',
      mandatory_for_breeding: true,
    },
    {
      name: 'DCM — Dilated Cardiomyopathy screening',
      timing: 'Annual echo + 24-hour Holter from age 3',
      method: 'Board-certified cardiologist echocardiogram + 24-hour Holter monitor',
      plain_english: 'DCM is the leading cause of death in Dobermans. The PDK4 and TTN gene mutations have significant penetrance but do not account for all cases. Annual Holter from age 3 — more than 300 VPCs (ventricular premature contractions) in 24 hours indicates occult DCM requiring treatment. Sudden death can be the first visible sign.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hypothyroidism screening',
      timing: 'Annual thyroid panel from age 2',
      method: 'OFA thyroid panel (Total T4, Free T4, TSH)',
      plain_english: 'Dobermans have elevated hypothyroidism rates. Affects coat, weight, energy, and reproductive performance.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const DOBERMAN_PINSCHER_PREGNANCY_EVENTS = [
  {
    id_suffix: 'dobe_preg_vwd_critical',
    day_offset: -42,
    title: '⚠️ CRITICAL: vWD bleeding protocol — prepare NOW',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Over 70% of Dobermans carry vWD Type I. Whelping carries serious bleeding risk. Prepare before the due date.',
    detail: 'Von Willebrand Disease (vWD) Type I is present in over 70% of Dobermans — more than any other single-breed condition in veterinary medicine.\n\nFor the whelping:\n1. Contact your vet THIS WEEK about having cryoprecipitate or fresh frozen plasma available\n2. Know your dam\'s vWD status — if untested: test now (cheek swab DNA test)\n3. Prepare your vet for potential bleeding during whelping\n4. Know the location of your nearest 24-hour emergency vet with blood product capability\n\nDRUGS TO COMPLETELY AVOID in any vWD Doberman (significantly worsen bleeding):\n- NSAIDs (aspirin, ibuprofen, meloxicam, carprofen)\n- Sulfonamide antibiotics (trimethoprim-sulfa)\n- Antihistamines\n- Estrogen-containing medications\n- Heparin\n- Any drug with anti-platelet effects\n\nIf any surgical procedure is planned: alert the vet to vWD status BEFORE any anaesthetic is given.',
    call_vet_if: 'Dam has not been tested for vWD and is about to whelp',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'dobe_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Puppy count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. Essential for confirming count and presentation.',
    detail: 'Doberman litters average 8 puppies. Pre-whelping X-ray at Day 55–58:\n\n- Confirm exact count\n- Check presentation\n- Identify any malpresented puppies that may require assistance\n\nWith 12% C-section rate: confirm your vet\'s emergency surgical availability for the whelping period. Dobermans with vWD need a vet team specifically aware of the bleeding risk before any anaesthetic.',
  },
  {
    id_suffix: 'dobe_preg_dcm_exercise',
    day_offset: -28,
    title: 'DCM precaution: Reduce intense exercise from Week 5',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'If dam has known DCM or arrhythmia, modify exercise from mid-pregnancy.',
    detail: 'Doberman dams with occult or known DCM have reduced cardiac reserve, which is further stressed by pregnancy.\n\nFrom Week 5 of pregnancy:\n- Moderate leash walks are beneficial and appropriate\n- Avoid: extended fast-paced walks, running, excitement-based play, heat exposure\n- If dam has known Holter abnormalities (>300 VPCs): check in with cardiologist before whelping\n- Monitor resting respiratory rate daily (should be <30 breaths/minute at rest)\n\nSleeping respiratory rate above 30/min = call vet within 24 hours.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const DOBERMAN_PINSCHER_NEONATAL_EVENTS = [
  {
    id_suffix: 'dobe_neo_bleeding_watch',
    day_offset: 0,
    title: '⚠️ Day 0: Monitor all puppies for bleeding (vWD)',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Doberman neonates from vWD-positive dams must be monitored for umbilical cord bleeding.',
    detail: 'After birth, monitor each puppy\'s umbilical cord:\n\n- Normal: umbilical cord stops bleeding within 5–10 minutes of birth\n- Abnormal: bleeding continues past 15 minutes = potential vWD expression in puppy\n\nIf prolonged umbilical bleeding:\n1. Apply firm pressure with sterile gauze for 5 minutes\n2. Check again after pressure release\n3. If still bleeding: contact vet immediately for emergency plasma treatment\n\nAlso monitor during:\n- Tail docking (if performed — umbilical bleed time is a predictor of docking bleed risk)\n- Any injury, even minor scratches\n- Dewclaw removal\n\nNote: vWD Type I is autosomal and not sex-linked in Dobermans — both male and female puppies can be affected.',
    call_vet_if: 'Any puppy has umbilical cord bleeding past 20 minutes',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'dobe_neo_colour_dilution',
    day_offset: 7,
    title: 'Identify blue/fawn puppies: Colour dilution alopecia risk',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Blue and fawn Doberman puppies carry colour dilution alopecia risk.',
    detail: 'Colour Dilution Alopecia (CDA) affects:\n- ~93% of blue (dilute black) Dobermans\n- ~75% of fawn (dilute red) Dobermans\n\nSigns (develop from 4 months to 3 years):\n- Patchy hair loss beginning on the back and sides\n- Dry, scaly, itchy skin\n- Recurrent skin infections\n- Progressive thinning to near baldness in severe cases\n\nNo cure. Management:\n- Medicated shampoos\n- Omega-3 fatty acid supplementation\n- Antibiotics for secondary bacterial infections\n- Sun protection (sunscreen for dogs in exposed areas)\n\nInform new owners of blue/fawn puppies: this is highly likely and they should monitor skin and coat from 4 months onwards.',
  },
  {
    id_suffix: 'dobe_neo_narcolepsy',
    day_offset: 28,
    title: 'Narcolepsy: Watch from 4–32 weeks',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Doberman narcolepsy/cataplexy typically presents between 4 weeks and 8 months.',
    detail: 'Doberman narcolepsy is caused by a mutation in the HCRTR2 gene (hypocretin receptor). It\'s autosomal recessive.\n\nSigns:\n- Sudden muscle paralysis and collapse, especially during excitement (eating, play, being petted)\n- Dog is CONSCIOUS during episodes — eyes open, aware\n- Episodes last seconds to minutes\n- Dog recovers completely and acts normally immediately after\n- NOT painful\n\nTypical onset: 4 weeks to 8 months, with peak episodes from 10–32 weeks.\n\nThis is NOT an emergency in isolated episodes. Inform new owners:\n- Video an episode if possible and send to vet\n- Do not startle the dog during an episode\n- DNA test is available (HCRTR2)\n- Management: avoid triggers (high excitement feeding), maintain calm routine\n- Most Dobermans learn to live with this condition normally',
    call_vet_if: 'Any puppy has a collapse episode lasting more than 5 minutes, or more than 3 episodes per day',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const DOBERMAN_PINSCHER_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'dobe_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Velcro dog — independence training starts now',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Dobermans are extremely people-bonded. Separation anxiety prevention starts at Week 3.',
    detail: 'Dobermans are nicknamed "velcro dogs" — they bond intensely with their person and can develop crippling separation anxiety if not trained for independence from an early age.\n\nFrom Week 3:\n1. Begin brief separations from littermates: 5 minutes alone in a crate/pen with a food puzzle\n2. Increase to 15 minutes by Week 5, 30 minutes by Week 7\n3. Reward calm behaviour when separated — not return to crate when crying\n4. Handle by many different people — not just the breeder\n\nA Doberman that goes to a new home having never been separated is extremely prone to destructive separation anxiety. This is one of the leading reasons Dobermans are surrendered.',
  },
  {
    id_suffix: 'dobe_social_week4_strangers',
    day_offset: 28,
    title: 'Socialization Week 4: Neutral stranger response',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Dobermans have natural guarding instincts — extensive neutral-stranger exposure is critical.',
    detail: 'Dobermans have a working dog heritage with protective instincts. Without extensive socialisation, this manifests as inappropriate guarding of family and home.\n\nWeek 4 targets:\n- 10+ different people handle each puppy — specifically including strangers\n- Instruct handlers: approach calmly, let puppy initiate contact, no reaching over the puppy\n- Varied demographics: men, children, uniforms, delivery people scenario\n- Short car trips to varied environments\n\nA well-socialised Doberman: confident, friendly with strangers, responds to owner\'s cues about appropriate behaviour\nA poorly socialised Doberman: suspicious of anyone new, reactive, difficult to manage in public — at 35 kg this is a serious problem',
  },
  {
    id_suffix: 'dobe_social_week5_dog_contact',
    day_offset: 35,
    title: 'Socialization Week 5: Dog-to-dog — same-sex aggression risk',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Dobermans, especially males, have same-sex aggression risk. Target dog diversity now.',
    detail: 'Doberman same-sex dog aggression is a real risk, particularly between intact males.\n\nThis week:\n- Expose each puppy to at least 5 different dogs of varying sizes and breeds\n- Include other intact male dogs if available (most important demographic)\n- Include small dogs — Dobermans should learn small dogs are not prey\n- Supervised play with known-safe adult dogs of both sexes\n\nInform new owners:\n- Puppy class with 8–10 other puppies is strongly recommended\n- 50+ positive dog encounters by 12 weeks is the goal\n- Do not skip dog-dog socialisation because Dobermans "seem fine" with other dogs — complacency at this stage creates adult reactivity',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const DOBERMAN_PINSCHER_TRAINING_EVENTS = [
  {
    id_suffix: 'dobe_training_obedience',
    day_offset: 35,
    title: 'Formal obedience: Begin at Week 5',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Dobermans are the #5 most intelligent breed. Formal training from Week 5.',
    detail: 'Dobermans are exceptionally trainable and need mental stimulation to prevent destructive behaviour.\n\nFrom Week 5, teach:\n1. Sit — lure with food, mark with "yes", reward\n2. Down — from sit, lower treat toward floor\n3. Name recognition — say name, reward eye contact\n4. Come — squat down, say name, reward heavily when they arrive\n\nSession length: 3–5 minutes maximum at this age. End on success.\n\nInform new owners: Dobermans excel at and enjoy obedience, IPO/Schutzhund, agility, and nosework. A Doberman without a job or training is a destructive Doberman. Mental exercise matters as much as physical exercise for this breed.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const DOBERMAN_PINSCHER_HEALTH_RISKS = [
  {
    condition: 'vWD — von Willebrand Disease Type I',
    timing: 'Present from birth; discovered at injury or surgery',
    risk_level: 'critical' as const,
    signs: ['Prolonged bleeding from minor cuts', 'Bleeding that does not clot normally', 'Bruising easily', 'Post-surgical bleeding'],
    immediate_action: 'Never proceed with surgery without informing the vet of vWD status. Emergency vet for significant bleeding. Fresh frozen plasma or cryoprecipitate is the treatment.',
    vet_decision: 'Any significant bleeding = emergency vet.',
    note: 'Avoid NSAIDs, sulfonamides, antihistamines, estrogen, heparin. Disclose status to every vet, groomer, daycare provider.',
  },
  {
    condition: 'DCM — Dilated Cardiomyopathy',
    timing: 'Typically develops 3–8 years; sudden death can be first sign',
    risk_level: 'critical' as const,
    signs: ['Exercise intolerance', 'Coughing at night or after activity', 'Difficulty breathing', 'Fainting or collapse', 'Resting respiratory rate above 30/min'],
    immediate_action: 'Resting respiratory rate above 30 breaths per minute or any difficulty breathing = emergency vet. Annual Holter from age 3.',
    vet_decision: 'Breathing difficulty = emergency vet. Annual cardiac screening is routine.',
    note: 'Start annual echo + Holter from age 3. >300 VPCs/24h on Holter = treat with antiarrhythmic.',
  },
  {
    condition: 'Narcolepsy/Cataplexy',
    timing: 'Onset 4 weeks to 8 months; peaks 10–32 weeks',
    risk_level: 'high' as const,
    signs: ['Sudden collapse during excitement', 'Dog is conscious during episode', 'Lasts seconds to minutes', 'Complete recovery immediately after'],
    immediate_action: 'Video the episode. Do not startle the dog. Episode >5 minutes = call vet.',
    vet_decision: 'Call vet for first episode. Manage ongoing episodes with lifestyle modification.',
  },
];
