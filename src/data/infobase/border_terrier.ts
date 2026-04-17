/**
 * INFO BASE: BORDER TERRIER
 * Applies to: Border Terrier
 * Info base ID: 'border_terrier'
 *
 * ⚠️ ISOLATION RULE: Do NOT mix with any other info base.
 *
 * Border Terriers differ from JRT group in:
 * - Generally calmer temperament — lower reactivity
 * - Double wiry coat — grooming desensitisation important
 * - Unique condition: Canine Epileptoid Cramping Syndrome (CECS/"Spike's Disease")
 * - Pulmonic stenosis (heart defect) more common than in JRT
 * - More adaptable — socialisation still critical but lower natural reactivity
 */

export const BORDER_TERRIER_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 59, max: 67 },
  avg_litter_size: { min: 4, max: 6, typical: 5 },
  newborn_weight_grams: { min: 190, max: 250, typical: 220 },
  adult_weight_kg: { min: 5.0, max: 7.1, typical: 6.0 },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const,

  weight_targets: {
    birth:  { min: 190, max: 250, typical: 220 },
    day_7:  { min: 300, max: 400, typical: 350 },
    day_14: { min: 380, max: 500, typical: 440 },
    week_3: { min: 570, max: 750, typical: 660 },
    week_6: { min: 1000, max: 1450, typical: 1225 },
    week_8: { min: 1500, max: 2000, typical: 1750 },
  },

  daily_gain_minimum_grams: 11,
  daily_gain_target_grams: 21,

  formula_volumes_per_feeding_ml: {
    week_1: { min: 2, max: 3, per_100g_body_weight: 1.0 },
    week_2: { min: 3, max: 5, per_100g_body_weight: 1.3 },
    week_3: { min: 5, max: 8, per_100g_body_weight: 1.5 },
    week_4: { min: 8, max: 12, per_100g_body_weight: 2.0 },
  },

  feeding_frequency_hours: { week_1: 2, week_2: 2.5, week_3: 3, week_4: 4 },
  tube_size_french: 5,

  whelping_box_temp_celsius: {
    week_1: { min: 29.5, max: 32, ideal: 30.5 },
    week_2: { min: 27, max: 29.5, ideal: 28 },
    week_3: { min: 24, max: 27, ideal: 26 },
    week_4_plus: { min: 22, max: 24, ideal: 23 },
  },

  whelping_box_cm: {
    small_litter: { w: 71, d: 71 },
    large_litter: { w: 81, d: 81 },
    pig_rail_height_cm: 10,
    wall_height_cm: 35,
  },
};

export const BORDER_TERRIER_HEALTH_SCHEDULE = {

  deworming: [
    { day: 14, drug: 'Pyrantel pamoate', dose: '10 mg/kg', critical: true,
      plain_english: 'Worm treatment Day 14. Use puppy pyrantel liquid drops, dose by weight.' },
    { day: 28, drug: 'Pyrantel pamoate', critical: true,
      plain_english: 'Second worm treatment Day 28.' },
    { day: 42, drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg x 3 days', critical: true,
      plain_english: 'Third worm treatment — Panacur for 3 consecutive days.' },
    { day: 56, drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg x 3 days', critical: true,
      plain_english: 'Final worm treatment before rehoming.' },
  ],

  vaccinations: [
    { week: 6, vaccine: 'DHPP #1', critical: true },
    { week: 10, vaccine: 'DHPP #2', critical: true },
    { week: 14, vaccine: 'DHPP #3 + Rabies', critical: true },
  ],

  // Border Terrier-specific genetic conditions
  genetic_monitoring: [
    {
      condition: 'Canine Epileptoid Cramping Syndrome (CECS) — "Spike\'s Disease"',
      test: 'Clinical diagnosis (no DNA test available)',
      timing: 'from_3_months_onward',
      urgency: 'critical',
      plain_english: 'CECS is unique to Border Terriers. Episodes look like a slow-motion seizure — the dog becomes unable to walk normally, stumbles, makes chewing motions, and may seem distressed. Episodes last 2–30 minutes and the dog recovers completely.\n\nIt is NOT a true seizure and is NOT treated with anti-epileptic drugs.\n\nIf you see this: stay calm, keep the dog safe, record the episode on video if possible, and contact your vet. CECS is managed with diet changes (gluten-free diet is often effective) and lifestyle adjustments.',
      breed_unique: true,
    },
    {
      condition: 'Pulmonic Stenosis',
      test: 'Cardiac auscultation + echocardiogram',
      timing: 'first_vet_visit_listen_for_murmur',
      plain_english: 'A narrowing of the pulmonic valve in the heart. Your vet will listen for a heart murmur at the first exam. Mild cases need no treatment. Severe cases need intervention. All Border Terrier puppies should have their hearts checked.',
    },
    {
      condition: 'Hip Dysplasia',
      test: 'X-ray (OFA or BVA scheme)',
      timing: 'from_2_years',
      plain_english: 'Abnormal hip formation. More relevant for breeding stock than pet puppies. Signs: difficulty rising, reluctance to run.',
    },
    {
      condition: 'Progressive Retinal Atrophy (PRA)',
      test: 'DNA test + annual eye exams',
      timing: 'from_1_year',
      plain_english: 'Gradual vision loss. Annual eye checks from age 1. DNA test available.',
    },
  ],

  heart_check_note: 'Ask your vet to listen to the heart at the 6-week puppy exam. Border Terriers have a higher rate of pulmonic stenosis (a heart valve issue) than most terriers. A heart murmur does not always mean a serious problem, but it needs to be assessed.',
};

// Border Terrier coat care
export const BORDER_TERRIER_COAT_EVENTS = [
  {
    week_offset: 3,
    category: 'training',
    priority: 'recommended',
    title: 'Begin grooming desensitisation — double coat',
    description: 'Border Terriers have a wiry double coat that needs regular attention.',
    detail: 'Border Terriers have a coarse outer coat and soft undercoat. They require hand-stripping twice yearly and regular brushing.\n\nFrom Week 3: gentle all-over touching, including along the spine, flanks, and ears.\nFrom Week 4: soft brush for 30–60 seconds during calm moments.\nFrom Week 6: metal comb introduction.\n\nTell new owners: Border Terriers should NEVER be clipped — it ruins the coat texture permanently. They need hand-stripping by a specialist groomer.',
    applies_to: 'border_terrier',
  },
];

// Border Terrier temperament notes for training events
export const BORDER_TERRIER_TRAINING_NOTES = {
  vs_jrt: 'Border Terriers are generally calmer, more adaptable, and less reactive than Jack Russells. They still have terrier independence and prey drive, but training sessions are often more productive because they are less likely to get overstimulated.',
  cecs_training_note: 'If a puppy shows CECS-like episodes during or after exercise, stop the session immediately and let them rest. Do not push them when they seem "off". Contact your vet.',
  diet_note: 'Some Border Terriers with CECS respond well to a gluten-free diet. If any puppy is diagnosed with CECS, transition to a gluten-free food and tell new owners.',
};
