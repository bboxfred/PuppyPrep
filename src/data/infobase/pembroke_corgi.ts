/**
 * INFO BASE: PEMBROKE WELSH CORGI
 * Applies to: Pembroke Welsh Corgi
 * Info base ID: 'pembroke_corgi'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'pembroke_corgi'.
 *
 * Sources: Pembroke Welsh Corgi Club of America (PWCCA),
 * Merck Vet Manual, Cornell CVM, UC Davis VGL,
 * OFA, Embark (CDDY, DM, vWD prevalence).
 *
 * ⚠️ CRITICAL FLAGS:
 * - CDDY: 96.1% of Pembrokes carry ≥1 CDDY allele — IVDD risk near-universal
 * - DM (Degenerative Myelopathy): 52.7% at-risk genotype (SOD1A)
 * - X-SCID: Fatal immune deficiency in males
 * - vWD Type I carrier rate elevated
 * - Chondrodystrophic physique — no jumping/stairs rules are breed-wide
 */

export const PEMBROKE_CORGI_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 4, max: 8, typical: 6 },
  newborn_weight_grams: { min: 250, max: 400, typical: 325 },
  adult_weight_kg: {
    male:   { min: 11, max: 14 },
    female: { min: 10, max: 13 },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'low' as const,
  singleton_risk: false,
  csection_rate_percent: 12,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 250, max: 400,  typical: 325  },
    day_7:  { min: 475, max: 700,  typical: 585  },
    day_14: { min: 680, max: 975,  typical: 828  },
    week_3: { min: 960, max: 1390, typical: 1175 },
    week_4: { min: 1350, max: 1950, typical: 1650 },
    week_6: { min: 2250, max: 3200, typical: 2725 },
    week_8: { min: 3000, max: 4300, typical: 3650 },
  },

  daily_gain_minimum_grams: 15,
  daily_gain_target_grams: 25,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 5,  max: 9,  per_100g_body_weight: 1.8 },
    week_2: { min: 9,  max: 14, per_100g_body_weight: 2.0 },
    week_3: { min: 13, max: 20, per_100g_body_weight: 2.5 },
    week_4: { min: 19, max: 29, per_100g_body_weight: 3.0 },
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
    small_litter: { w: 90, d: 90 },
    large_litter: { w: 110, d: 110 },
    pig_rail_height_cm: 8,
    wall_height_cm: 40,
  },
};

export const PEMBROKE_CORGI_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Corgi puppies. Weigh before dosing.',
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
      plain_english: 'Second vaccination plus Lepto.',
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
      plain_english: 'Vet check within 48 hours. Corgis have 12% C-section rate — confirm recovery if C-section occurred. Check all placentas passed.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm all puppies gaining weight. Check for any male puppies that seem unusually susceptible to infection — X-SCID watch.',
      critical: true,
    },
    {
      week: 6,
      label: '⚠️ Puppy wellness + X-SCID watch + IVDD briefing',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. Critical: any male puppy with recurrent infections, failure to thrive, or absent lymph nodes needs urgent immunology workup for X-SCID. Also discuss IVDD prevention protocol with all new owners at this visit — ramps not stairs, no jumping, harness not collar.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check — IVDD protocol in writing',
      urgency: 'before_leaving',
      plain_english: 'Final check. Every Corgi new owner must receive IVDD prevention protocol in writing: no jumping on/off furniture or cars, ramps everywhere, no stairs, harness only, lean body condition. DM DNA test status disclosure. vWD status if tested.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'CDDY (Chondrodystrophy) / IVDD awareness',
      timing: 'Breed-wide — 96.1% of Pembrokes carry ≥1 CDDY allele',
      method: 'DNA test available (UC Davis VGL) but near-universal prevalence makes prevention the primary approach',
      plain_english: 'Virtually every Pembroke Welsh Corgi carries the CDDY mutation which causes early disc degeneration and IVDD (intervertebral disc disease). This is a breed characteristic, not a defect in one dog. The appropriate response is lifelong IVDD prevention: no jumping, ramps everywhere, harness only, lean weight. Radiographic disc calcification scoring can identify highest-risk individuals.',
      mandatory_for_breeding: false,
    },
    {
      name: 'DM — Degenerative Myelopathy (SOD1A)',
      timing: 'Any age — DNA test. Adult onset disease (8–14 years)',
      method: 'DNA test for SOD1A mutation',
      plain_english: 'DM is common in Corgis — 52.7% carry the at-risk genotype. Causes progressive hind-limb paralysis from age 8–14. Past normal breeding age. Inform new owners so they watch for early signs (toe-dragging, hind-limb weakness) from age 7.',
      mandatory_for_breeding: true,
    },
    {
      name: 'vWD Type I',
      timing: 'DNA test any age',
      method: 'DNA test',
      plain_english: 'Elevated in Pembroke Corgis. Test breeding stock. Disclose status to new owners and every vet who treats this dog.',
      mandatory_for_breeding: true,
    },
    {
      name: 'PRA-rcd3 (Progressive Retinal Atrophy)',
      timing: 'DNA test any age; annual CAER exam',
      method: 'DNA test + CAER ophthalmologist exam',
      plain_english: 'rcd3-PRA causes progressive blindness. DNA test breeding stock. Annual eye certification required for PWCCA CHIC.',
      mandatory_for_breeding: true,
    },
  ],
};

export const PEMBROKE_CORGI_PREGNANCY_EVENTS = [
  {
    id_suffix: 'corgi_preg_xscid_awareness',
    day_offset: -42,
    title: '⚠️ X-SCID: Lethal immune deficiency — know the signs',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'X-SCID is a fatal immune deficiency affecting male Corgis. Signs appear from birth.',
    detail: 'X-linked Severe Combined Immunodeficiency (X-SCID) affects male Corgi puppies whose dams carry the mutation.\n\nX-SCID puppies:\n- Have no functional immune system\n- Appear normal at birth but begin failing to thrive by 4–6 weeks\n- Develop recurrent infections that do not respond to antibiotics\n- Have absent or very small lymph nodes\n- Usually die by 4 months despite all treatment\n\nThe condition is X-linked — carrier females are unaffected, affected males die. DNA test female breeding stock.\n\nIf you have a male puppy that fails to thrive, has no lymph nodes you can feel, or has recurrent infections from Week 4: urgent veterinary immunology workup required.',
    call_vet_if: 'Any male puppy has recurrent infections, fails to thrive, or has absent lymph nodes',
  },
  {
    id_suffix: 'corgi_preg_ivdd_dam_care',
    day_offset: -28,
    title: 'IVDD prevention for pregnant Corgi dam',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Pregnant Corgi dams are at elevated IVDD risk. Implement back protection now.',
    detail: 'The extra weight of pregnancy significantly increases spinal stress in a Corgi\'s chondrodystrophic spine.\n\nFrom today, implement:\n1. No jumping on or off furniture — place ramps or steps\n2. No jumping in or out of cars — always lift by supporting both front and back\n3. No stairs if avoidable — carry or use ramps\n4. Harness only — never collar (neck collar pull = spinal stress)\n5. Limit vigorous exercise — leash walks are appropriate, no fetch or rough play\n\nIVDD in a pregnant Corgi dam is a serious emergency — spinal cord injury may require emergency surgery and puts the litter at risk.',
    call_vet_if: 'Dam shows any back pain, hindlimb weakness, or reluctance to move',
    emergency_contact_recommended: true,
  },
];

export const PEMBROKE_CORGI_NEONATAL_EVENTS = [
  {
    id_suffix: 'corgi_neo_ivdd_protocol_written',
    day_offset: 49,
    title: 'Week 7: Write IVDD prevention protocol for every new owner',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Every Corgi owner must have IVDD prevention rules in writing before going home.',
    detail: 'IVDD PREVENTION RULES — every Corgi for life:\n\n1. NO jumping on or off furniture — provide ramps or steps to all surfaces\n2. NO jumping in or out of cars — always lift with two hands supporting the whole body\n3. RAMPS not stairs — if stairs are unavoidable, help the dog up and down\n4. HARNESS only — never a neck collar\n5. LEAN body condition — obesity increases IVDD risk dramatically\n6. NO rough play involving twisting or sudden body rotation\n7. Support both front AND back when lifting the dog\n\nIVDD EMERGENCY SIGNS — CALL VET IMMEDIATELY:\n- Crying when touched on the back\n- Reluctance to move or go up/down stairs\n- Arched hunched back position\n- Hind legs suddenly weak or wobbly\n- Loss of bladder or bowel control\n\nGrade V IVDD (complete hind paralysis with no deep pain) requires surgery within 24 hours for best chance of walking again. Every hour matters.',
  },
];

export const PEMBROKE_CORGI_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'corgi_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Herding nip and barking',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Corgis will herd children and bark. Both must be managed from Week 3.',
    detail: 'Pembroke Welsh Corgis have strong herding instinct — they will attempt to herd children, other pets, and anything that moves.\n\nFrom Week 3:\n- Daily handling by 8+ different people including children\n- Begin redirecting any ankle-nip attempt immediately — stop movement, redirect to toy\n- Begin "quiet" cue from Week 3: mark and reward any moment of silence after barking\n\nCorgi ankle-nipping children is the #1 behaviour complaint from Corgi owners. Begin addressing it at Week 3 — it is much easier to prevent than to stop in an adult dog.',
  },
  {
    id_suffix: 'corgi_social_week4_ramp_intro',
    day_offset: 28,
    title: 'Socialization Week 4: Introduce ramps — must be normalised before going home',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Every Corgi must use ramps for life. Introduce them before the puppy leaves.',
    detail: 'Corgis must use ramps instead of jumping for their entire life. A puppy that has never seen a ramp before going home will resist using one.\n\nFrom Week 4:\n1. Place a gentle ramp (10–15° incline) in the whelping area\n2. Put treats at the top and bottom to encourage use\n3. Mark and reward every successful ramp use\n4. By Week 7: every Corgi puppy should use the ramp confidently\n\nInform new owners: they need dog ramps for sofas, beds, and car boots before the puppy arrives home. A Corgi that jumps down from a sofa repeatedly accumulates disc damage from the first day of ownership.',
  },
];

export const PEMBROKE_CORGI_TRAINING_EVENTS = [
  {
    id_suffix: 'corgi_training_herding_redirect',
    day_offset: 28,
    title: 'Herding redirection: Begin Week 4',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Corgi herding nipping is instinct — redirect to appropriate outlets.',
    detail: 'Ankle-nipping and circling in Corgis is herding instinct — not aggression. It must be redirected, not punished.\n\nFrom Week 4:\n1. When ankle-nipping: freeze completely. Do not move away (triggers chase).\n2. Redirect immediately to a tug toy or ball\n3. Praise and play with the toy energetically\n\nAppropriate outlets for herding drive:\n- Treibball (herding large balls)\n- Herding classes (real livestock)\n- Agility — channels the energy appropriately\n\nInform new owners: children running will always trigger the herding instinct. Teach children to "be a tree" (freeze and ignore) when the Corgi circles them.',
  },
];

export const PEMBROKE_CORGI_HEALTH_RISKS = [
  {
    condition: 'IVDD (Intervertebral Disc Disease)',
    timing: 'Lifetime risk — most common 3–6 years but any age',
    risk_level: 'critical' as const,
    signs: ['Back pain — hunched posture, crying when touched', 'Reluctance to move', 'Hind legs wobbly or weak', 'Loss of bladder or bowel control', 'Hind legs dragging (Grade IV–V emergency)'],
    immediate_action: 'Grade I–II (pain only): emergency vet same day, strict crate rest. Grade IV–V (paralysis): EMERGENCY — surgery within 24 hours gives best chance of walking again.',
    vet_decision: 'Any back pain or leg weakness = emergency vet immediately.',
    note: 'Prevention is everything: ramps, no jumping, harness, lean weight — from Day 1 for life.',
  },
  {
    condition: 'X-SCID (X-linked SCID)',
    timing: 'Male puppies — signs from 4–6 weeks',
    risk_level: 'critical' as const,
    signs: ['Male puppy fails to thrive', 'Recurrent infections that do not clear', 'Absent or very small lymph nodes', 'Weight below littermates', 'Progressive deterioration'],
    immediate_action: 'Emergency vet for any male puppy with signs from Week 4. Immunology workup required.',
    vet_decision: 'Emergency vet — humane euthanasia is recommended for confirmed cases. No effective treatment currently available.',
    note: 'DNA test female breeding stock. X-linked — females are carriers, males are affected.',
  },
  {
    condition: 'DM (Degenerative Myelopathy)',
    timing: 'Adult onset 8–14 years — past breeding age',
    risk_level: 'high' as const,
    signs: ['Progressive hind-limb weakness', 'Toe-dragging', 'Stumbling', 'Eventually unable to stand'],
    immediate_action: 'Book vet when first signs appear. Physiotherapy and hydrotherapy slow progression.',
    vet_decision: 'Call vet for first signs. Not an emergency initially — gradual supportive management.',
    note: '52.7% of Pembrokes at-risk genotype. Inform new owners to watch from age 7.',
  },
];
