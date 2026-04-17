/**
 * INFO BASE: RAT TERRIER
 * Applies to: Rat Terrier (Miniature and Standard)
 * Info base ID: 'rat_terrier'
 *
 * ⚠️ ISOLATION RULE: Do NOT mix with JRT, Fox Terrier, or any other info base.
 *
 * Rat Terriers differ meaningfully from the JRT group in:
 * - Two size varieties (miniature 2.3–5kg, standard 5–11kg) — size matters hugely for dosing
 * - More eager to please than JRT — training approach differences
 * - Allergy-prone — requires food introduction caution at weaning
 * - Different primary genetic health concerns (hip dysplasia, PRA vs PLL/SCA)
 * - Generally calmer and less reactive than JRT
 */

export const RAT_TERRIER_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 59, max: 67 },

  // Two varieties — size matters for ALL calculations
  varieties: {
    miniature: {
      adult_weight_kg: { min: 2.3, max: 5.0, typical: 3.6 },
      avg_litter_size: { min: 2, max: 5, typical: 3 },
      newborn_weight_grams: { min: 100, max: 180, typical: 140 },
      hypoglycemia_risk: 'high' as const,
      tube_size_french: 4,
      formula_volumes_week1_ml_per_100g: 1.0,
    },
    standard: {
      adult_weight_kg: { min: 5.0, max: 11.3, typical: 7.0 },
      avg_litter_size: { min: 4, max: 7, typical: 5 },
      newborn_weight_grams: { min: 180, max: 280, typical: 230 },
      hypoglycemia_risk: 'medium' as const,
      tube_size_french: 5,
      formula_volumes_week1_ml_per_100g: 1.0,
    },
  },

  // Ask user which variety at onboarding
  variety_question: 'Is your Rat Terrier the miniature size (under 5kg adult) or standard size (5–11kg adult)?',

  whelping_box_temp_celsius: {
    week_1: { min: 29.5, max: 32, ideal: 30.5 },
    week_2: { min: 27, max: 29.5, ideal: 28 },
    week_3: { min: 24, max: 27, ideal: 26 },
    week_4_plus: { min: 22, max: 24, ideal: 23 },
  },
};

export const RAT_TERRIER_HEALTH_SCHEDULE = {

  deworming: [
    { day: 14, drug: 'Pyrantel pamoate', dose: '10 mg/kg miniature / 5 mg/kg standard', critical: true,
      plain_english: 'Worm treatment Day 14. Dose differs by size — miniature Rat Terriers need the higher dose. Use puppy liquid drops, dose by weight.' },
    { day: 28, drug: 'Pyrantel pamoate', critical: true,
      plain_english: 'Second worm treatment Day 28.' },
    { day: 42, drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily x 3 days', critical: true,
      plain_english: 'Third worm treatment — switch to Panacur. Give for 3 consecutive days.' },
    { day: 56, drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily x 3 days', critical: true,
      plain_english: 'Final worm treatment before rehoming. 3 days in a row.' },
  ],

  vaccinations: [
    { week: 6, vaccine: 'DHPP #1', critical: true },
    { week: 10, vaccine: 'DHPP #2', critical: true },
    { week: 14, vaccine: 'DHPP #3 + Rabies', critical: true },
  ],

  genetic_monitoring: [
    {
      condition: 'Patellar Luxation',
      test: 'Physical examination',
      timing: 'from_first_vet_visit',
      plain_english: 'Kneecap slipping out of place — more common in the miniature variety. Watch for three-legged hopping.',
    },
    {
      condition: 'Hip Dysplasia',
      test: 'X-ray (OFA evaluation)',
      timing: 'from_2_years_for_OFA',
      plain_english: 'Abnormal hip joint formation. More common in standard-sized Rat Terriers. Signs: difficulty rising, reluctance to jump, limping.',
    },
    {
      condition: 'Progressive Retinal Atrophy (PRA)',
      test: 'DNA test + annual eye exams',
      timing: 'from_1_year',
      plain_english: 'Gradual vision loss leading to blindness. DNA test available. Annual eye checks from age 1 recommended.',
    },
    {
      condition: 'Skin Allergies (Atopic Dermatitis)',
      test: 'Clinical + allergy testing',
      timing: 'from_6_months',
      plain_english: 'Rat Terriers are more allergy-prone than most terriers. Signs: itching, licking paws, red skin. May appear when changing foods during weaning. Introduce new proteins slowly.',
    },
  ],
};

// Rat Terrier training differs from JRT — more responsive
export const RAT_TERRIER_TRAINING_NOTES = {
  trainability_vs_jrt: 'Rat Terriers are more eager to please than Jack Russells. They respond to positive reinforcement quickly and are less likely to test boundaries repeatedly. Shorter training sessions are still important (2–3 minutes), but they typically progress faster than JRT puppies.',
  prey_drive_note: 'High prey drive but less intense than JRT. Still redirect any chasing behaviour toward appropriate toys from Week 5.',
  weaning_food_note: 'Introduce new proteins gradually due to allergy risk. Start with single-protein food (chicken or lamb only). Do not mix multiple proteins at first introduction.',
};

// Miniature Rat Terrier specific overrides
export const MINIATURE_RAT_TERRIER_OVERRIDES = {
  hypoglycemia_note: 'Miniature Rat Terriers have very small fat reserves at birth (100–180g). Hypoglycaemia can develop within 1 hour of a missed feeding in Week 1. Maximum feeding gap: 1.5 hours in Week 1. Do not skip overnight feedings.',
  tube_size: 4, // French 4 for miniature
  singleton_prone: true,
  singleton_note: 'Miniature Rat Terrier litters are often 2–3 puppies. Singletons are relatively common. See singleton protocol in calendar.',
  feeding_frequency_override: {
    week_1: 1.5, // Every 90 minutes for miniature
    week_2: 2,
    week_3: 2.5,
    week_4: 3,
  },
};
