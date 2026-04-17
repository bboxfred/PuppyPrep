/**
 * INFO BASE: MINIATURE PINSCHER
 * Applies to: Miniature Pinscher (Min Pin)
 * Info base ID: 'miniature_pinscher'
 *
 * ⚠️ ISOLATION RULE: Do NOT mix with any other info base.
 *
 * Min Pins are the most HIGH-RISK breed in the JRT group due to:
 * - Very small body size (3.6–4.5kg adult)
 * - HIGHEST hypoglycaemia risk of all terrier-type dogs
 * - Most cold-sensitive — whelping temperature even more critical
 * - Small litters (2–5) — singleton very common
 * - Smaller tube size (French 3–4)
 * - Legg-Calvé-Perthes very common (60–70% of cases by 3–6 months)
 * - MORE frequent feeding required than JRT
 */

export const MIN_PIN_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 2, max: 5, typical: 3 },
  newborn_weight_grams: { min: 100, max: 160, typical: 130 }, // Much smaller than JRT
  adult_weight_kg: { min: 3.6, max: 4.5, typical: 4.0 },
  size_category: 'toy' as const,
  hypoglycemia_risk: 'high' as const, // HIGHEST in this group

  weight_targets: {
    birth:  { min: 100, max: 160, typical: 130 },
    day_7:  { min: 160, max: 240, typical: 200 },
    day_14: { min: 200, max: 320, typical: 260 },
    week_3: { min: 300, max: 480, typical: 390 },
    week_6: { min: 600, max: 900, typical: 750 },
    week_8: { min: 900, max: 1300, typical: 1100 },
  },

  daily_gain_minimum_grams: 7,   // Lower absolute number but proportionally same
  daily_gain_target_grams: 13,

  // MORE FREQUENT and SMALLER volumes than JRT — critical safety difference
  formula_volumes_per_feeding_ml: {
    week_1: { min: 1, max: 2, per_100g_body_weight: 1.0 },
    week_2: { min: 1.5, max: 2.5, per_100g_body_weight: 1.3 },
    week_3: { min: 2.5, max: 4, per_100g_body_weight: 1.5 },
    week_4: { min: 4, max: 7, per_100g_body_weight: 2.0 },
  },

  // KEY DIFFERENCE: More frequent than JRT
  feeding_frequency_hours: {
    week_1: 1.5,  // Every 90 minutes — not 2 hours
    week_2: 2,
    week_3: 2.5,
    week_4: 3,
  },

  // SMALLER tube — critical safety difference
  tube_size_french: 3, // French 3 for Min Pin newborns (vs French 5 for JRT)
  tube_note: 'Use French 3 tube ONLY for Min Pin newborns. French 5 (used for JRT) is too large and can cause injury.',
  max_stomach_capacity_ml_per_100g: 4,

  // WARMER environment required than JRT
  whelping_box_temp_celsius: {
    week_1: { min: 31, max: 33, ideal: 32 }, // 1–2°C warmer than JRT
    week_2: { min: 28, max: 31, ideal: 29.5 },
    week_3: { min: 25, max: 28, ideal: 27 },
    week_4_plus: { min: 22, max: 25, ideal: 23.5 },
  },

  puppy_rectal_temp_celsius: {
    day_1_4:   { min: 34.4, max: 37.2, danger_below: 35.0 },
    day_5_14:  { min: 35.0, max: 37.2, danger_below: 35.5 },
    week_3_4:  { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 61, d: 61 },  // Smaller box for smaller dog
    large_litter: { w: 71, d: 71 },
    pig_rail_height_cm: 8,
    wall_height_cm: 30,
  },

  cold_sensitivity_warning: 'Miniature Pinschers are significantly more cold-sensitive than JRTs. Their thin coat and small body size mean they lose body heat extremely fast. Check whelping box temperature every 2 hours in the first week. ANY drop below 30°C is an emergency.',
};

export const MIN_PIN_HEALTH_SCHEDULE = {

  deworming: [
    { day: 14, drug: 'Pyrantel pamoate', dose: '10 mg/kg', critical: true,
      plain_english: 'Worm treatment Day 14. Because Min Pins are very small, use puppy liquid drops and calculate dose carefully by exact weight in grams. Ask your vet to confirm the dose.' },
    { day: 28, drug: 'Pyrantel pamoate', critical: true,
      plain_english: 'Second worm treatment. Re-weigh each puppy — dose changes as they grow.' },
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

  genetic_monitoring: [
    {
      condition: 'Legg-Calvé-Perthes Disease (LCP)',
      test: 'Physical exam + X-ray',
      timing: 'from_3_months',
      urgency: 'critical',
      prevalence: 'very_common',
      plain_english: 'LCP affects the ball of the hip joint — the bone begins to die and crumble. This is VERY COMMON in Min Pins, affecting a significant proportion of the breed.\n\nSigns appear at 3–6 months: the puppy starts favouring one back leg, then gradually becomes unable to use it without pain. The leg muscle wastes away.\n\nTreatment is surgery (FHO — femoral head ostectomy). Outcomes are good if caught early.\n\nMonitor every Min Pin puppy from 3 months. Any limping = vet appointment within 48 hours.',
      watch_from_month: 3,
    },
    {
      condition: 'Progressive Retinal Atrophy (PRA)',
      test: 'DNA test + annual eye exam',
      timing: 'from_1_year',
      plain_english: 'Gradual vision loss leading to blindness. DNA test available. Annual eye checks from age 1.',
    },
    {
      condition: 'Patellar Luxation',
      test: 'Physical examination',
      timing: 'from_first_vet_visit',
      plain_english: 'Kneecap slipping. Common in toy breeds. Watch for three-legged hopping at any age.',
    },
    {
      condition: 'Mucopolysaccharidosis (MPS VI)',
      test: 'DNA test',
      timing: 'any_age',
      plain_english: 'A rare storage disease in Min Pins. DNA test available. Discuss with vet if considering breeding.',
    },
    {
      condition: 'Hypothyroidism',
      test: 'Blood thyroid panel',
      timing: 'from_2_years',
      plain_english: 'Low thyroid hormone production. Signs: weight gain despite normal eating, hair loss, lethargy. Blood test at first annual exam from age 2.',
    },
  ],

  singleton_note: 'Min Pin litters average 2–3 puppies. Single-puppy litters are common. Singleton socialisation protocol is likely needed — see your calendar.',
};

// Critical safety warnings specific to Min Pins
export const MIN_PIN_SAFETY_WARNINGS = {
  hypoglycemia_critical: {
    title: '⚠️ HIGHEST HYPOGLYCAEMIA RISK',
    message: 'Min Pin newborns are at greater risk of low blood sugar than any other breed in this group. A puppy that misses even ONE feeding in Week 1 can develop a hypoglycaemic crisis within 60–90 minutes.\n\nDo NOT miss ANY overnight feeding in Week 1. Set an alarm. Every 90 minutes.',
  },
  temperature_critical: {
    title: '⚠️ COLD SENSITIVITY',
    message: 'Min Pins lose body heat faster than JRTs due to their thin coat and tiny body. The whelping box must be 31–33°C in Week 1 (compared to 29.5–32°C for JRTs). Check temperature every 2 hours.',
  },
  tube_size_critical: {
    title: '⚠️ TUBE SIZE DIFFERENCE',
    message: 'If tube feeding is needed, use French 3 (not French 5 which is used for JRTs). Using the wrong tube size on a Min Pin newborn can cause injury.',
  },
};

export const MIN_PIN_TRAINING_NOTES = {
  temperament: 'Min Pins are bold, fearless, and highly independent — "King of Toys" for a reason. They will test boundaries repeatedly. Early, consistent, positive-reinforcement training from Week 6 is essential. They do not respond well to any form of punishment and will become defensive.',
  cold_note: 'Min Pin puppies are cold-sensitive their entire lives. New owners should know: no outdoor exposure in temperatures below 15°C without a dog coat. This is not a breed that tolerates cold climates.',
};
