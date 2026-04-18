/**
 * INFO BASE: BICHON FRISE
 * Applies to: Bichon Frise
 * Info base ID: 'bichon_frise'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'bichon_frise'.
 *
 * Sources: Bichon Frise Club of America (BFCA), Merck Vet Manual,
 * Cornell CVM, VCA Animal Hospitals, AKC.
 *
 * Key risks: atopy (most common health problem), calcium oxalate bladder stones,
 * Legg-Calvé-Perthes, juvenile cataracts, diabetes, medium hypoglycemia risk.
 */

export const BICHON_FRISE_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 3, max: 6, typical: 5 },
  newborn_weight_grams: { min: 150, max: 280, typical: 215 },
  adult_weight_kg: {
    male:   { min: 5, max: 8 },
    female: { min: 5, max: 8 },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const,
  singleton_risk: false,
  csection_rate_percent: 8,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 150, max: 280,  typical: 215  },
    day_7:  { min: 285, max: 490,  typical: 388  },
    day_14: { min: 410, max: 680,  typical: 545  },
    week_3: { min: 580, max: 970,  typical: 775  },
    week_4: { min: 810, max: 1360, typical: 1085 },
    week_6: { min: 1350, max: 2250, typical: 1800 },
    week_8: { min: 1800, max: 3000, typical: 2400 },
  },

  daily_gain_minimum_grams: 10,
  daily_gain_target_grams: 18,
  daily_gain_percent_bodyweight: 7,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 3,  max: 6,  per_100g_body_weight: 1.5 },
    week_2: { min: 5,  max: 9,  per_100g_body_weight: 1.8 },
    week_3: { min: 7,  max: 12, per_100g_body_weight: 2.0 },
    week_4: { min: 11, max: 18, per_100g_body_weight: 2.5 },
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
    week_1:      { min: 29.5, max: 32, ideal: 30.5 },
    week_2:      { min: 27,   max: 30, ideal: 28   },
    week_3:      { min: 25,   max: 27, ideal: 26   },
    week_4_plus: { min: 22,   max: 25, ideal: 23   },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 37.2, danger_below: 35.0 },
    day_5_14:    { min: 35.0, max: 37.2, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 80, d: 80 },
    large_litter: { w: 100, d: 100 },
    pig_rail_height_cm: 8,
    wall_height_cm: 35,
  },
};

export const BICHON_FRISE_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Bichon puppies. Weigh each puppy before dosing.',
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
      label: 'Final parvo booster',
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
      urgency: 'within_48_hours',
      plain_english: 'Vet check within 48 hours. Bichons are generally good whelpers. Confirm all placentas passed.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm all puppies gaining weight normally.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + first vaccinations',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. Ask vet to check: eye clarity (juvenile cataracts can be detected early), patellar palpation, cardiac auscultation.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final check. Inform new owners: atopy is the most common Bichon health issue (itching, skin infections from pollens, dust, food) — discuss hypoallergenic diet and environmental management if symptoms appear.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'Eye certification (juvenile cataracts)',
      timing: 'CAER exam at 6–8 weeks; annual from 1 year',
      method: 'Board-certified ophthalmologist CAER exam',
      plain_english: 'Juvenile cataracts occur in Bichons. Annual CAER certification required for BFCA CHIC.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'OFA hip certification required for BFCA CHIC.',
      mandatory_for_breeding: true,
    },
  ],
};

export const BICHON_FRISE_PREGNANCY_EVENTS = [
  {
    id_suffix: 'bichon_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Confirm count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. Bichon litters of 4–6 require accurate count.',
    detail: 'Pre-whelping X-ray at Day 55–58. Bichons are generally good whelpers with 8% C-section rate. Confirm count so you know when whelping is complete.',
  },
];

export const BICHON_FRISE_NEONATAL_EVENTS = [
  {
    id_suffix: 'bichon_neo_atopy_awareness',
    day_offset: 49,
    title: 'Week 7: Atopy education for new owners',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Atopy (environmental allergy) is the #1 health condition in Bichons. New owners need awareness.',
    detail: 'Atopy is the most common health problem in Bichon Frises — significantly more common than in the general dog population.\n\nSigns (typically develop 1–3 years):\n- Intense scratching, especially face, armpits, paws, groin\n- Paw licking and chewing\n- Recurrent ear infections\n- Recurrent skin infections (red, flaky, smelly skin)\n- Rubbing face on carpet or furniture\n\nManagement:\n- Allergen testing (environmental vs food)\n- Hypoallergenic diet trial (novel protein or hydrolysed protein)\n- Regular bathing with medicated shampoo\n- Apoquel or Cytopoint for itch control\n- Immunotherapy (allergy shots) for long-term management\n\nInform new owners: Bichon Frises with atopy require ongoing veterinary skin management. This is manageable but requires commitment.',
  },
];

export const BICHON_FRISE_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'bichon_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Cheerful and social by nature',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Bichons are naturally sociable — build on this with diverse exposure.',
    detail: 'Bichon Frises are naturally friendly and adaptable. This makes socialisation easier than many breeds — but still essential.\n\nFrom Week 3:\n- Daily handling by 8+ different people\n- Novel environments from Week 4\n- Sound desensitization\n- Coat desensitization — daily brushing\n- Brief separations from Week 5 (separation anxiety can develop in this breed)\n\nBichons bond intensely with their family. Without independence training, separation anxiety is a significant risk.',
  },
  {
    id_suffix: 'bichon_social_week4_grooming',
    day_offset: 28,
    title: 'Socialization Week 4: Grooming desensitization',
    category: 'socialization' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Bichon coat requires professional grooming every 4–6 weeks. Start desensitizing now.',
    detail: 'The Bichon\'s powder-puff coat needs:\n- Daily brushing and combing (mats form rapidly without it)\n- Bath every 2–3 weeks\n- Professional grooming every 4–6 weeks\n- Ear cleaning weekly\n\nFrom Week 4:\n1. Daily brush, 3 minutes per puppy\n2. Face and ear handling\n3. Hair dryer at low heat from a distance\n4. Clipper sound desensitization\n\nA Bichon that fights grooming as an adult costs its owner significantly more in grooming fees (sedation) and vet visits (matting-related skin infections).',
  },
];

export const BICHON_FRISE_TRAINING_EVENTS = [
  {
    id_suffix: 'bichon_training_recall',
    day_offset: 28,
    title: 'Recall training: Begin Week 4',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Bichons are eager to please — good recall is achievable with early consistent training.',
    detail: 'Bichon Frises are responsive and people-oriented — recall training is generally easier than working breeds.\n\nFrom Week 4:\n1. Say puppy\'s name + "come" in happy voice\n2. Sprint away — they will chase\n3. Big celebration on arrival\n4. Never call "come" for something unpleasant\n\nInform new owners: Bichons can achieve reliable recall with consistent positive training. They respond to praise and play as well as food rewards.',
  },
];

export const BICHON_FRISE_HEALTH_RISKS = [
  {
    condition: 'Atopy (Environmental Allergy)',
    timing: 'Typically develops 1–3 years of age',
    risk_level: 'high' as const,
    signs: ['Intense itching of face, paws, armpits, groin', 'Paw licking', 'Recurrent ear infections', 'Recurrent skin infections'],
    immediate_action: 'Book vet for allergy workup. Not an emergency unless secondary skin infection is severe.',
    vet_decision: 'Call vet within a week of first significant itching episode.',
    note: '#1 health issue in Bichons. Manageable but requires ongoing care.',
  },
  {
    condition: 'Calcium Oxalate Bladder Stones',
    timing: 'Typically middle-aged adults; can occur younger',
    risk_level: 'high' as const,
    signs: ['Straining to urinate', 'Blood in urine', 'Frequent small urinations', 'Male dog unable to urinate = EMERGENCY'],
    immediate_action: 'Male Bichon unable to urinate = EMERGENCY VET IMMEDIATELY (urethral obstruction). Female straining = urgent vet same day.',
    vet_decision: 'Male unable to urinate = emergency. Female straining = urgent.',
    note: 'Prevent with adequate hydration (wet food or water fountain), regular urinalysis from age 3.',
  },
  {
    condition: 'Legg-Calvé-Perthes Disease',
    timing: '4–12 months of age',
    risk_level: 'high' as const,
    signs: ['Progressive hindlimb lameness', 'Muscle wasting', 'Pain on hip manipulation'],
    immediate_action: 'Book vet within a week. Radiograph required. FHO surgery is curative.',
    vet_decision: 'Call vet within a week of any hindlimb lameness.',
  },
];
