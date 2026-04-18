/**
 * INFO BASE: SIBERIAN HUSKY
 * Applies to: Siberian Husky
 * Info base ID: 'siberian_husky'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'siberian_husky'.
 *
 * Sources: Siberian Husky Club of America (SHCA), Merck Vet Manual,
 * AKC, VCA Animal Hospitals, UC Davis VGL (XL-PRA),
 * Cornell CVM, OFA.
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const SIBERIAN_HUSKY_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 4, max: 8, typical: 6 },
  newborn_weight_grams: { min: 300, max: 550, typical: 420 },
  adult_weight_kg: {
    male:   { min: 20, max: 27 },
    female: { min: 16, max: 23 },
  },
  size_category: 'medium' as const,
  hypoglycemia_risk: 'low' as const,
  csection_rate_percent: 7,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 300, max: 550, typical: 420 },
    day_7:  { min: 550, max: 850, typical: 700 },
    day_14: { min: 800, max: 1200, typical: 1000 },
    week_3: { min: 1100, max: 1700, typical: 1400 },
    week_4: { min: 1600, max: 2400, typical: 2000 },
    week_6: { min: 2500, max: 3800, typical: 3200 },
    week_8: { min: 3500, max: 5500, typical: 4500 },
  },

  daily_gain_minimum_grams: 15,
  daily_gain_target_grams: 30,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 6,  max: 11, per_100g_body_weight: 1.8 },
    week_2: { min: 11, max: 17, per_100g_body_weight: 2.0 },
    week_3: { min: 17, max: 24, per_100g_body_weight: 2.5 },
    week_4: { min: 24, max: 34, per_100g_body_weight: 3.0 },
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
    small_litter: { w: 110, d: 110 },
    large_litter: { w: 130, d: 130 },
    pig_rail_height_cm: 10,
    wall_height_cm: 45,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const SIBERIAN_HUSKY_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Husky puppies. Weigh each one before dosing.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Use current weight.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment — Panacur for 3 days. Huskies in sled-dog or group environments are at elevated Giardia risk.',
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
      plain_english: 'First vaccination at 6–8 weeks.',
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
      plain_english: 'Do not skip. Ensures complete parvo protection.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check',
      urgency: 'within_48_hours',
      plain_english: 'Vet check within 48 hours of birth. Huskies are generally good whelpers but retained placentas occur — confirm all passed.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm all puppies gaining weight. Assess milk supply.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + vaccinations + eye exam',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. CRITICAL: request ophthalmologic exam — juvenile cataracts can be detected as early as 6–8 weeks. Early detection allows surgical planning.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. Inform new owners: annual CAER eye exams lifelong (cataracts, PRA), zinc-responsive dermatosis awareness, VKH syndrome awareness, off-leash caution (HIGH escape and prey drive), growth plate care until 15–18 months.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'SHCA Eye Certification (juvenile cataracts, PRA)',
      timing: 'Annual CAER exam from 12 months; first exam at 6–8 weeks for cataracts',
      method: 'Board-certified ophthalmologist CAER exam; DNA test for XL-PRA1 (UC Davis VGL)',
      plain_english: 'Juvenile cataracts are a significant health issue in Huskies — surgical phacoemulsification is curative but must be done before vision is severely compromised. XL-PRA1 (X-linked progressive retinal atrophy) causes night blindness in affected males from 2–5 months. Annual eye certification required for SHCA CHIC.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'Hip dysplasia occurs in Huskies. SHCA CHIC requires OFA hip certification.',
      mandatory_for_breeding: true,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const SIBERIAN_HUSKY_PREGNANCY_EVENTS = [
  {
    id_suffix: 'husky_preg_exercise',
    day_offset: -28,
    title: 'Exercise modification from Week 5',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Husky dams in sled work must stop high-intensity exercise by Week 5.',
    detail: 'Siberian Huskies used for sledding or racing must stop high-intensity exercise by the middle of pregnancy:\n\n- Weeks 1–4: normal gentle exercise maintained\n- Week 5 onwards: moderate leash walks only\n- Week 7 onwards: short gentle walks, limited distance\n- Never exercise to the point of heavy panting during pregnancy\n\nHuskies are stoic — they will continue working long past when it is safe. The breeder must impose exercise limits as the dam won\'t self-limit readily.',
  },
  {
    id_suffix: 'husky_preg_escape_proof',
    day_offset: -14,
    title: 'Escape-proof the whelping area before birth',
    category: 'environment' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Husky dams near whelping may attempt to find alternative denning sites.',
    detail: 'Siberian Huskies have strong denning instincts and will seek out enclosed, hidden spaces to whelp. A dam left unsupervised near term may dig under fences, escape through gaps, or hide in unsafe locations.\n\nBefore the due date:\n1. Check all fence lines for gaps or digging opportunities\n2. Block access to unsafe areas (under decks, behind appliances)\n3. Begin confining the dam to a secure indoor area from Day 58–60\n4. Introduce and positively reinforce the whelping box from Day 56 — place bedding inside, feed meals in it\n\nOnce a Husky chooses a whelping spot, it is very difficult to move her. Make the whelping box the most appealing option before she makes her own choice.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const SIBERIAN_HUSKY_NEONATAL_EVENTS = [
  {
    id_suffix: 'husky_neo_zinc_awareness',
    day_offset: 42,
    title: 'Week 6: Zinc-responsive dermatosis awareness',
    category: 'health' as const,
    priority: 'recommended' as const,
    is_free: false,
    description: 'Zinc-responsive dermatosis is a genetic Husky condition. Inform new owners.',
    detail: 'Zinc-responsive Dermatosis Syndrome I is specific to Huskies and Alaskan Malamutes. The breed absorbs zinc poorly from food.\n\nSigns (typically emerge 6 months to 3 years):\n- Crusty, scaly, red skin around the muzzle, eyes, and ear tips\n- Cracking of the foot pads\n- Lesions on pressure points (elbows, hocks)\n\nManagement:\n- Lifelong oral zinc supplementation: 2–3 mg/kg elemental zinc daily (zinc methionine or zinc sulphate)\n- Do NOT use standard high-mineral kibbles — these contain zinc-blockers (phytates)\n- Responds dramatically to correct supplementation\n\nInform new owners now so they recognise early signs. This is a manageable condition when caught early.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const SIBERIAN_HUSKY_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'husky_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Desensitize to restraint',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Huskies are independent and can be escape-oriented. Calm restraint must be learned early.',
    detail: 'Huskies have an independent, wolf-like temperament. They are not naturally submissive to handling. Begin calm restraint practice from Week 3:\n\n- Hold each puppy calmly for 30 seconds — not squirming free\n- Practice gentle body wrapping (towel around the body)\n- Touch: paws, ears, mouth, tail — reward calm acceptance\n- Practice "collar hold" — hold the collar without the puppy pulling away\n\nA Husky that fights restraint as a puppy becomes very difficult to groom, medicate, examine, or handle as an adult. Calm handling now matters enormously.',
  },
  {
    id_suffix: 'husky_social_week4_prey_drive',
    day_offset: 28,
    title: 'Socialization Week 4: Small animal exposure — prey drive management',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Huskies have HIGH prey drive. Early exposure to cats, small animals, and children running reduces adult predatory behaviour.',
    detail: 'Siberian Huskies have significant prey drive — they were bred to hunt in addition to pulling sleds. This shows as chasing running things, killing small animals, and reactivity to cats.\n\nFrom Week 4 — deliberate exposure:\n- Cats (if safely available behind a barrier initially)\n- Small animals in cages for controlled observation\n- Children running — supervise and redirect attention before chasing begins\n- Bicycles and scooters moving past\n\nReward CALM OBSERVATION, not the chase. Every calm response to a moving target is a deposit in the "don\'t chase" bank.\n\nInform new owners absolutely: Huskies should NEVER be off-leash in an unfenced area — their recall is unreliable and they will pursue prey at speed with no regard for roads, distance from home, or owner commands.',
  },
  {
    id_suffix: 'husky_social_week5_independent',
    day_offset: 35,
    title: 'Socialization Week 5: Build independence — prevent separation anxiety',
    category: 'socialization' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Huskies can be destructive when left alone. Crate training and independence start now.',
    detail: 'Huskies are pack animals and do not naturally tolerate being alone. Without preparation, separation causes: howling (Huskies are LOUD), digging, chewing through walls, jumping fences.\n\nFrom Week 5:\n1. Brief separations from littermates: 5 min alone in a pen with a Kong or chew\n2. Crate introduction: feed meals inside crate with door open\n3. By Week 7: 15–20 minutes in closed crate post-meal\n\nInform new owners strongly:\n- Crate training is not optional for Huskies — it is a welfare necessity\n- A Husky alone in a house without crate training will destroy the house\n- The crate is not punishment — build positive association from Week 5',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const SIBERIAN_HUSKY_TRAINING_EVENTS = [
  {
    id_suffix: 'husky_training_recall',
    day_offset: 28,
    title: 'Recall training: Highest priority for Huskies',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Husky recall is notoriously unreliable. Training must begin at Week 4.',
    detail: 'A Husky with a good recall can save its own life. A Husky without one will eventually run into traffic.\n\nRecall foundation from Week 4:\n1. Say the puppy\'s name + "come" in a HIGH, happy voice\n2. SPRINT away from the puppy — they cannot resist chasing\n3. When they reach you: enormous celebration, best treats, party\n4. NEVER call "come" and then do something the dog doesn\'t like (nail clip, bath)\n\nInform new owners:\n- Continue recall training every single day\n- Use the highest-value treats you own for recall\n- Never punish a Husky for coming late — coming slowly is still coming\n- Accept that Huskies will NEVER have reliable off-leash recall in an open area — do not attempt it\n- A 6-foot fence with buried anti-dig barrier and coyote rollers on top is the minimum required containment',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const SIBERIAN_HUSKY_HEALTH_RISKS = [
  {
    condition: 'Juvenile Cataracts',
    timing: 'Can be detected from 6 weeks; typically progress 6–18 months',
    risk_level: 'high' as const,
    signs: ['Cloudy or blue appearance to pupil', 'Bumping into things', 'Reluctance to go in dim light', 'Decreased activity'],
    immediate_action: 'Book ophthalmologist exam immediately. Surgical phacoemulsification is curative — timing is important to preserve vision.',
    vet_decision: 'Call vet within a week of any eye cloudiness. Ophthalmologist referral needed.',
    note: 'Annual CAER eye exams from 12 months. First exam at 6–8 weeks at puppy wellness visit.',
  },
  {
    condition: 'XL-PRA1 (X-linked Progressive Retinal Atrophy)',
    timing: 'Night blindness in affected males from 2–5 months; progresses to total blindness',
    risk_level: 'high' as const,
    signs: ['Night blindness — hesitation or bumping in dim light', 'Dilated pupils in normal light', 'Progressive loss of vision'],
    immediate_action: 'Ophthalmologist exam. DNA test to confirm. Manage environment for vision impairment.',
    vet_decision: 'Call vet within a week of any night blindness symptoms.',
    note: 'DNA test available from UC Davis VGL. X-linked — males affected, females are carriers.',
  },
  {
    condition: 'Uveodermatologic Syndrome (VKH-like)',
    timing: 'Typically 1.5–4 years; any age possible',
    risk_level: 'high' as const,
    signs: ['Eye redness and pain', 'Progressive depigmentation of skin and hair (nose, lips, eyelids, footpads go white)', 'Vision changes'],
    immediate_action: 'URGENT ophthalmologist — uveitis can cause blindness within days without treatment. Lifelong immunosuppression required.',
    vet_decision: 'Urgent vet same day for any eye redness with skin depigmentation.',
  },
  {
    condition: 'Zinc-Responsive Dermatosis',
    timing: 'Typically 6 months to 3 years',
    risk_level: 'high' as const,
    signs: ['Crusty scaly lesions around muzzle and eyes', 'Cracking pads', 'Hair loss at lesion sites'],
    immediate_action: 'Book vet to confirm diagnosis. Oral zinc supplementation is the treatment — specific dose required.',
    vet_decision: 'Call vet within a week. Very treatable when caught early.',
  },
];
