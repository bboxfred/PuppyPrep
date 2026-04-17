/**
 * INFO BASE: MIXED BREED / UNKNOWN BREED
 * Applies to: Mixed Breed, unknown breeds, Phase 2+ breeds without info bases
 * Info base ID: 'mixed_breed'
 *
 * Generic fallback using size-category-based care guidelines.
 * All values are conservative middle-ground estimates.
 */

export const MIXED_BREED_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 4, max: 8, typical: 6 },
  newborn_weight_grams: { min: 150, max: 350, typical: 250 },
  adult_weight_kg: { min: 5, max: 30 },
  size_category: 'medium' as const,
  hypoglycemia_risk: 'medium' as const,

  weight_targets: {
    birth:   { min: 150, max: 350, typical: 250 },
    day_7:   { min: 250, max: 500, typical: 375 },
    day_14:  { min: 350, max: 700, typical: 500 },
    week_3:  { min: 500, max: 1050, typical: 750 },
    week_6:  { min: 900, max: 2500, typical: 1500 },
    week_8:  { min: 1300, max: 3500, typical: 2200 },
  },

  daily_gain_minimum_grams: 10,
  daily_gain_target_grams: 25,

  formula_volumes_per_feeding_ml: {
    week_1: { min: 2, max: 5, per_100g_body_weight: 1.0 },
    week_2: { min: 3, max: 7, per_100g_body_weight: 1.3 },
    week_3: { min: 5, max: 10, per_100g_body_weight: 1.5 },
    week_4: { min: 8, max: 15, per_100g_body_weight: 2.0 },
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
    week_1: { min: 29.5, max: 32, ideal: 30.5 },
    week_2: { min: 27, max: 29.5, ideal: 28 },
    week_3: { min: 24, max: 27, ideal: 26 },
    week_4_plus: { min: 22, max: 24, ideal: 23 },
  },
};

export const MIXED_BREED_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, drug: 'Pyrantel pamoate', dose: '10 mg/kg', critical: true,
      plain_english: 'Give all puppies worm treatment today. Use puppy pyrantel liquid drops. Dose by current weight.' },
    { day: 28, drug: 'Pyrantel pamoate', critical: true,
      plain_english: 'Second worm treatment. Same product, dose by current weight.' },
    { day: 42, drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily x 3 days', critical: true,
      plain_english: 'Third worm treatment — Panacur for 3 consecutive days.' },
    { day: 56, drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily x 3 days', critical: true,
      plain_english: 'Final worm treatment before rehoming. Panacur for 3 days in a row.' },
  ],

  vaccinations: [
    { week: 6, vaccine: 'DHPP #1', critical: true,
      plain_english: 'First vaccinations at 6-8 weeks. Must be done by your vet.' },
    { week: 10, vaccine: 'DHPP #2', critical: true,
      plain_english: 'Second vaccinations. 2-4 weeks after first dose.' },
    { week: 14, vaccine: 'DHPP #3 + Rabies', critical: true,
      plain_english: 'Final puppy vaccination series.' },
  ],

  genetic_monitoring: [],
};
