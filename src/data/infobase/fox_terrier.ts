/**
 * INFO BASE: FOX TERRIER GROUP
 * Applies to: Smooth Fox Terrier, Wire Fox Terrier
 * Info base ID: 'fox_terrier'
 *
 * ⚠️ ISOLATION RULE: Do NOT mix with JRT or any other info base.
 *
 * Fox Terriers are similar to JRTs but meaningfully different in:
 * - Slightly larger body (7–8.2kg vs 5.9–7.7kg for JRT)
 * - Higher singleton/small litter tendency
 * - Wire coat variant needs specific early handling
 * - Moderately lower hypoglycaemia risk than JRT
 * - Slightly different genetic health priorities
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const FOX_TERRIER_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 59, max: 67 },
  avg_litter_size: { min: 3, max: 6, typical: 4 },
  newborn_weight_grams: { min: 200, max: 260, typical: 230 }, // Slightly heavier than JRT
  adult_weight_kg: { min: 6.4, max: 8.2 },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const, // Lower than JRT due to larger body size

  weight_targets: {
    birth:   { min: 200, max: 260, typical: 230 },
    day_7:   { min: 310, max: 420, typical: 365 },
    day_14:  { min: 400, max: 520, typical: 460 },
    week_3:  { min: 600, max: 780, typical: 690 },
    week_4:  { min: 520, max: 780, typical: 650 },
    week_6:  { min: 1050, max: 1550, typical: 1300 },
    week_8:  { min: 1600, max: 2100, typical: 1850 },
  },

  daily_gain_minimum_grams: 12,
  daily_gain_target_grams: 22,

  dam_lactation_calories_multiplier: { week_1: 1.5, week_2: 2.0, week_3_4: 2.8, week_5: 2.3 },

  // Formula volumes (slightly more than JRT due to larger body)
  formula_volumes_per_feeding_ml: {
    week_1: { min: 2.5, max: 3.5, per_100g_body_weight: 1.0 },
    week_2: { min: 3.5, max: 5.5, per_100g_body_weight: 1.3 },
    week_3: { min: 6, max: 9, per_100g_body_weight: 1.5 },
    week_4: { min: 9, max: 13, per_100g_body_weight: 2.0 },
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
  puppy_rectal_temp_celsius: {
    day_1_4:   { min: 34.4, max: 37.2, danger_below: 35.0 },
    day_5_14:  { min: 35.0, max: 37.2, danger_below: 35.5 },
    week_3_4:  { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 71, d: 71 },
    large_litter: { w: 81, d: 81 },
    pig_rail_height_cm: 10,
    wall_height_cm: 35,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE — same core deworming/vaccine timing as JRT group
// but with Fox Terrier-specific genetic monitoring
// ─────────────────────────────────────────────────────────────────────────────

export const FOX_TERRIER_HEALTH_SCHEDULE = {

  deworming: [
    { day: 14, drug: 'Pyrantel pamoate', dose: '10 mg/kg', critical: true,
      plain_english: 'Give all puppies worm treatment today. Use puppy pyrantel liquid drops. Dose by current weight.' },
    { day: 28, drug: 'Pyrantel pamoate', dose: '10 mg/kg', critical: true,
      plain_english: 'Second worm treatment. Same product, dose by current weight.' },
    { day: 42, drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily x 3 days', critical: true,
      plain_english: 'Third worm treatment — use Panacur this time. Give for 3 consecutive days.' },
    { day: 56, drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily x 3 days', critical: true,
      plain_english: 'Final worm treatment before rehoming. Panacur for 3 days in a row.' },
  ],

  vaccinations: [
    { week: 6, vaccine: 'DHPP #1', critical: true,
      plain_english: 'First vaccinations at 6–8 weeks. Must be done by your vet.' },
    { week: 10, vaccine: 'DHPP #2', critical: true,
      plain_english: 'Second vaccinations. 2–4 weeks after first dose.' },
    { week: 14, vaccine: 'DHPP #3 + Rabies', critical: true,
      plain_english: 'Final puppy vaccination series. Full protection only 2 weeks after this — no dog parks until then.' },
  ],

  // Fox Terrier-specific genetic monitoring — differs from JRT base
  genetic_monitoring: [
    {
      condition: 'Congenital Deafness',
      test: 'BAER test',
      timing: 'weeks_5_to_8',
      urgency: 'critical',
      plain_english: 'Deafness is more common in Fox Terriers than average, especially in white-coated puppies. A BAER test at 5–8 weeks checks hearing in each ear separately. Ask your vet about this before the 6-week visit.',
    },
    {
      condition: 'Lens Luxation',
      test: 'DNA blood test + annual eye exams',
      timing: 'any_age_for_DNA',
      plain_english: 'Lens luxation causes sudden painful blindness in adult dogs. DNA test available for Fox Terriers. Tell new puppy owners to have their dog\'s eyes checked annually from age 3.',
    },
    {
      condition: 'Patellar Luxation',
      test: 'Physical examination',
      timing: 'first_vet_visit_onwards',
      plain_english: 'Kneecap slipping out of place. Watch for occasional three-legged hopping then returning to normal. Ask vet to check knees at every visit.',
    },
    {
      condition: 'Legg-Calvé-Perthes Disease',
      test: 'Physical exam + X-ray',
      timing: 'from_3_months',
      plain_english: 'Affects the hip joint. Signs appear at 3–9 months: progressive hind leg lameness. X-ray diagnosis. Treatment is surgery. Monitor for limping from 3 months.',
    },
  ],

  singleton_protocol_trigger: true, // Fox Terriers often have small litters — singleton protocol likely needed
  singleton_note: 'Fox Terrier litters average 3–4 puppies. Single puppy litters are not uncommon. If there is only one puppy, the singleton socialisation protocol is essential — see your calendar for week-by-week instructions.',
};

// ─────────────────────────────────────────────────────────────────────────────
// WIRE COAT SPECIFIC EVENTS (Wire Fox Terrier only)
// ─────────────────────────────────────────────────────────────────────────────

export const WIRE_FOX_TERRIER_COAT_EVENTS = [
  {
    week_offset: 3,
    category: 'training',
    priority: 'recommended',
    title: 'Wire coat: begin brushing desensitisation',
    description: 'Wire-coated puppies need early positive associations with grooming.',
    detail: 'Wire Fox Terriers have a dense, wiry double coat that requires regular brushing and professional hand-stripping as adults. If puppies aren\'t desensitised to grooming early, they will resist it for life.\n\n**From Week 3:** Touch the puppies all over with your hands, including running fingers along the spine and flanks. This gets them used to being touched in the areas that will be groomed.\n\n**Week 4:** Introduce a very soft baby brush. Gentle strokes along the back for 30–60 seconds while the puppy is calm.\n\n**Week 5–6:** Switch to a slicker brush. Brief sessions only. Always end before the puppy becomes agitated.',
    applies_to: 'wire_fox_terrier',
  },
  {
    week_offset: 7,
    category: 'training',
    priority: 'recommended',
    title: 'Wire coat: first comb experience',
    description: 'Introduce a metal comb through the wiry coat.',
    detail: 'A metal comb (rat-tail or greyhound comb) is the main grooming tool for adult Wire Fox Terriers. Introduce it gently now so puppies are familiar before they go to new homes.\n\nInform new owners: Wire Fox Terriers do not shed like smooth-coated dogs but need hand-stripping (a specialist grooming technique) every 3–4 months. This cannot be replaced by clipping without destroying coat texture.',
    applies_to: 'wire_fox_terrier',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FOX TERRIER SPECIFIC EMERGENCY INFO
// ─────────────────────────────────────────────────────────────────────────────

export const FOX_TERRIER_EMERGENCY_ADDITIONS = {
  singleton_warning: {
    condition: 'Single puppy born',
    immediate_action: 'One puppy with no littermates will miss all critical social learning (bite inhibition, frustration tolerance, social signals). See the Singleton Protocol in your calendar immediately. This is a behavioural emergency, not a medical one — but the consequences last a lifetime.',
  },
  deafness_check: {
    condition: 'Puppy not responding to sounds by Week 4',
    action: 'Check by clapping behind the puppy when it cannot see you. No ear movement or startle response = possible deafness. Book a BAER test. Deaf puppies can live full, happy lives but require training adaptations.',
  },
};
