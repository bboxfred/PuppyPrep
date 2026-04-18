/**
 * INFO BASE: MALTESE
 * Applies to: Maltese
 * Info base ID: 'maltese'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'maltese'.
 *
 * Sources: American Maltese Association, Merck Vet Manual,
 * Cornell CVM, VCA Animal Hospitals, AKC.
 *
 * ⚠️ CRITICAL FLAGS:
 * - HIGH hypoglycemia risk — 90-minute feeds in Week 1
 * - White shaker syndrome (steroid-responsive tremor disorder)
 * - Tracheal collapse: HARNESS ONLY, NEVER collar
 * - PSS risk (liver shunt)
 * - White coat — staining and tear stains are normal, not health emergencies
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const MALTESE_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 2, max: 4, typical: 3 },
  newborn_weight_grams: { min: 80, max: 150, typical: 115 },
  adult_weight_kg: {
    male:   { min: 1.4, max: 3.2 },
    female: { min: 1.4, max: 3.2 },
  },
  size_category: 'toy' as const,
  hypoglycemia_risk: 'high' as const,
  singleton_risk: true,
  csection_rate_percent: 12,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 80,  max: 150,  typical: 115  },
    day_7:  { min: 160, max: 260,  typical: 210  },
    day_14: { min: 240, max: 360,  typical: 300  },
    week_3: { min: 340, max: 510,  typical: 425  },
    week_4: { min: 480, max: 720,  typical: 600  },
    week_6: { min: 800, max: 1200, typical: 1000 },
    week_8: { min: 1050, max: 1600, typical: 1325 },
  },

  daily_gain_minimum_grams: 5,
  daily_gain_target_grams: 10,
  daily_gain_percent_bodyweight: 10,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 1.0, max: 2.5, per_100g_body_weight: 1.5 },
    week_2: { min: 2.0, max: 3.5, per_100g_body_weight: 1.8 },
    week_3: { min: 3.0, max: 5.0, per_100g_body_weight: 2.0 },
    week_4: { min: 5.0, max: 8.0, per_100g_body_weight: 2.5 },
  },
  feeding_frequency_hours: {
    week_1: 1.5,    // 90 MINUTES
    week_2: 2,
    week_3: 2.5,
    week_4: 3,
  },

  tube_size_french: 3.5,
  max_stomach_capacity_ml_per_100g: 4,

  whelping_box_temp_celsius: {
    week_1:      { min: 30, max: 32, ideal: 32 },
    week_2:      { min: 28, max: 30, ideal: 29 },
    week_3:      { min: 26, max: 28, ideal: 27 },
    week_4_plus: { min: 23, max: 26, ideal: 24 },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 36.1, danger_below: 34.5 },
    day_5_14:    { min: 35.0, max: 37.0, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 60, d: 60 },
    large_litter: { w: 75, d: 75 },
    pig_rail_height_cm: 5,
    wall_height_cm: 25,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const MALTESE_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg — use 1 cc syringe',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Maltese puppies. Very small doses required — measure precisely with a 1 cc syringe.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second treatment. Use current weight.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment — Panacur for 3 days.',
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
      plain_english: 'First vaccination at 6–8 weeks. Feed puppy 1–2 hours before visit. Keep warm. Have Karo syrup on hand for hypoglycemia prevention at the clinic.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'Second vaccination. Discuss Lepto scheduling with vet — consider separate visit for Maltese.',
      vet_required: true,
      critical: true,
    },
    {
      week: 14,
      label: 'Third vaccination',
      vaccine: 'DHPP #3 + Rabies',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'],
      plain_english: 'Third vaccination series plus Rabies.',
      vet_required: true,
      critical: true,
    },
    {
      week: 18,
      label: 'CRITICAL: Final parvo booster',
      vaccine: 'DHPP #4 (final)',
      covers: ['Distemper', 'Parvovirus'],
      plain_english: 'Do not skip.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check',
      urgency: 'within_24_hours',
      plain_english: 'Vet check within 24 hours. Maltese dams are generally good mothers but small litters need retained foetus confirmation.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm weight gain in all puppies.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + vaccinations',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. Request heart auscultation (mitral valve disease can have early murmurs), bile acid screen if any puppy is stunted (PSS risk).',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. Harness only instructions in writing. Hypoglycemia protocol in writing. White shaker syndrome awareness. Grooming schedule advice.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'PSS bile acid screen',
      timing: 'If any puppy is stunted, post-meal lethargic, or seizuring — 8–16 weeks',
      method: 'Pre- and post-prandial bile acid stimulation test',
      plain_english: 'Maltese have elevated PSS risk. Any puppy that is significantly smaller than littermates or shows post-meal neurological signs should be screened before rehoming.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Mitral valve disease',
      timing: 'Annual auscultation from age 1',
      method: 'Auscultation by vet',
      plain_english: 'Maltese are predisposed to mitral valve disease (same as Cavalier, but less severe presentation). Annual cardiac auscultation from age 1.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const MALTESE_PREGNANCY_EVENTS = [
  {
    id_suffix: 'maltese_preg_supplies',
    day_offset: -14,
    title: 'Toy breed supplies: Order now',
    category: 'environment' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Maltese neonates require the same precise tiny supplies as other toy breeds.',
    detail: 'Order before birth:\n- French 3.5 feeding tube\n- 1 cc syringes × 20\n- Karo light corn syrup — on the counter\n- Digital scale accurate to 1 gram\n- Whelping box 60 × 75 cm\n- Heating pad + thermometer\n- Esbilac puppy milk replacer\n- Soft white cloths for cleaning (coloured cloths stain the white coat)',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const MALTESE_NEONATAL_EVENTS = [
  {
    id_suffix: 'maltese_neo_hypoglycemia_90min',
    day_offset: 0,
    title: '⚠️ Week 1: Feed every 90 MINUTES',
    category: 'nutrition' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Maltese neonates require 90-minute feeding intervals in Week 1 — same as all toy breeds.',
    detail: 'Week 1 feeding: every 90 MINUTES, around the clock.\nVolume: 1.5 ml per 100g body weight per feed.\nWarmed to 38°C / 100°F.\nNEVER feed a cold puppy.\n\nHypoglycemia emergency:\n1. Warm first\n2. Karo on gums\n3. Emergency vet within 30 minutes\n\nFrom Week 2: every 2 hours.',
    call_vet_if: 'Any hypoglycemia symptoms',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'maltese_neo_coat_white_staining',
    day_offset: 14,
    title: 'Week 2: Tear stains are normal — begin face care routine',
    category: 'health' as const,
    priority: 'recommended' as const,
    is_free: false,
    description: 'The white Maltese coat shows tear staining from the second week. This is cosmetic, not a health problem.',
    detail: 'Maltese tear staining (reddish-brown marks beneath the eyes) is caused by porphyrins in tears — normal pigments that oxidise when exposed to air and light.\n\nBegin face care from Week 2:\n- Wipe beneath each puppy\'s eyes with a soft damp cloth twice daily\n- Keep the area dry between wipes\n- Trim any hair growing toward the eye from Week 4\n\nTear staining is NOT caused by:\n- Infection (unless accompanied by thick yellow/green discharge)\n- Poor food quality (a common internet myth)\n- Dirty water (another common myth)\n\nInform new owners: daily eye wiping is part of Maltese ownership for life. This is cosmetic management, not a medical issue.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const MALTESE_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'maltese_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Begin diverse handling',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Maltese are friendly but can become clingy and anxious without diverse socialisation.',
    detail: 'Maltese are natural companion dogs — they bond intensely with their person. Without diverse socialisation, this becomes separation anxiety and excessive attachment.\n\nFrom Week 3:\n- 8–10 different people handle each puppy per week\n- Include children — Maltese are often placed in family homes\n- Handle from ground level — these puppies are fragile\n- Begin grooming desensitization: daily soft brush from Week 3\n- Brief separations from Week 5: 10 minutes alone with a Kong',
  },
  {
    id_suffix: 'maltese_social_week5_grooming',
    day_offset: 35,
    title: 'Socialization Week 5: Intensive grooming desensitization',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Maltese require the most intensive coat care of any breed. Desensitize thoroughly.',
    detail: 'The Maltese coat is the most high-maintenance of any toy breed — long, silky, single coat that mats easily and requires:\n- Daily brushing and combing\n- Baths every 1–2 weeks\n- Professional grooming every 4–6 weeks\n- Face cleaning twice daily\n- Eye area trimming every 2–3 weeks\n\nFrom Week 5:\n1. Daily full brush and comb, 5 minutes per puppy\n2. Face wipe twice daily\n3. Hair dryer at low heat — desensitize the sound\n4. Gentle eye area trim practice\n5. Tooth brushing with puppy toothpaste\n\nA Maltese that was not grooming-desensitized as a puppy requires sedation for grooming as an adult — a welfare and financial problem for the new owner.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const MALTESE_TRAINING_EVENTS = [
  {
    id_suffix: 'maltese_training_harness_only',
    day_offset: 35,
    title: 'HARNESS ONLY — critical for Maltese',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Tracheal collapse and PSS risk mean neck collars are dangerous for Maltese for life.',
    detail: 'NEVER use a neck collar for walking a Maltese.\n\nFrom Week 5: introduce a soft H-shaped harness.\n- Start with 10-minute sessions wearing the harness\n- Pair with treats and play\n- Short lead from Week 6\n\nInform new owners in writing: harness only, for life. The Maltese\'s delicate trachea and liver make neck collar pressure genuinely dangerous.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const MALTESE_HEALTH_RISKS = [
  {
    condition: 'Hypoglycemia',
    timing: 'Birth through 12 weeks highest risk',
    risk_level: 'critical' as const,
    signs: ['Lethargy', 'Trembling', 'Pale gums', 'Seizure', 'Unresponsive'],
    immediate_action: 'Warm first. Karo on gums. Emergency vet within 30 minutes.',
    vet_decision: 'Emergency vet every time.',
  },
  {
    condition: 'White Shaker Syndrome',
    timing: 'Typically 6 months to 3 years; can occur at any age',
    risk_level: 'high' as const,
    signs: ['Whole-body tremors (shaking)', 'Unsteady gait', 'Rapid eye movements (nystagmus)', 'Seizures in severe cases'],
    immediate_action: 'Urgent vet within 24 hours. Steroid treatment (prednisolone) is highly effective. Most dogs recover completely.',
    vet_decision: 'Urgent vet — not an immediate emergency but requires prompt treatment.',
    note: 'Steroid-responsive tremor disorder. Diagnosis is based on breed, clinical signs, and response to treatment. Most cases respond dramatically to prednisolone within 1 week.',
  },
  {
    condition: 'Portosystemic Shunt (PSS)',
    timing: 'Signs from 4 weeks–6 months',
    risk_level: 'high' as const,
    signs: ['Stunted growth', 'Post-meal lethargy or disorientation', 'Seizures', 'Hypersalivation after eating'],
    immediate_action: 'Urgent vet. Bile acid test. Seizures = emergency vet immediately.',
    vet_decision: 'Urgent vet within 24 hours. Emergency for seizures.',
  },
  {
    condition: 'Tracheal Collapse',
    timing: 'Any age; worsens with age',
    risk_level: 'high' as const,
    signs: ['Honking cough', 'Coughing when excited or pulling'],
    immediate_action: 'Harness immediately. Vet appointment.',
    vet_decision: 'Call vet for ongoing coughing.',
    note: 'Prevention: harness only from puppy stage.',
  },
];
