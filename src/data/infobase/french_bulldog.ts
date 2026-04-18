/**
 * INFO BASE: FRENCH BULLDOG
 * Applies to: French Bulldog (Frenchie)
 * Info base ID: 'french_bulldog'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'french_bulldog'.
 *
 * Sources: French Bulldog Club of America, Merck Vet Manual,
 * Evans & Adams 2010 (81.3% C-section rate),
 * Frontiers in Veterinary Science 2022 (hemivertebrae prevalence),
 * PubMed PMC9577459 (congenital malformations in brachycephalics),
 * Cornell CVM, VCA Animal Hospitals, AKC,
 * Cambridge BOAS functional grading scheme.
 *
 * ⚠️⚠️ HIGHEST-RISK BREED IN THE APP ⚠️⚠️
 * - 81.3% C-section rate — elective C-section is STANDARD OF CARE
 * - BOAS: majority clinically affected
 * - Hemivertebrae: 75–93% prevalence (most subclinical)
 * - Cleft palate elevated
 * - Neonates need constant airway monitoring
 * - Heat intolerance: ambient temperature above 24°C is dangerous
 * - Elective C-section timing: Day 61 post-ovulation
 */

export const FRENCH_BULLDOG_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 2, max: 4, typical: 3 },
  newborn_weight_grams: { min: 180, max: 360, typical: 270 },
  adult_weight_kg: {
    male:   { min: 10, max: 12.7 },
    female: { min: 8,  max: 11   },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'medium' as const,
  singleton_risk: true,
  csection_rate_percent: 81,   // Evans & Adams 2010
  brachycephalic: true,        // SEVERE brachycephalic

  weight_targets: {
    birth:  { min: 180, max: 360,  typical: 270  },
    day_7:  { min: 340, max: 630,  typical: 485  },
    day_14: { min: 490, max: 875,  typical: 683  },
    week_3: { min: 690, max: 1240, typical: 965  },
    week_4: { min: 970, max: 1740, typical: 1355 },
    week_6: { min: 1620, max: 2900, typical: 2260 },
    week_8: { min: 2160, max: 3900, typical: 3030 },
  },

  daily_gain_minimum_grams: 12,
  daily_gain_target_grams: 22,
  daily_gain_percent_bodyweight: 7,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 4,  max: 8,  per_100g_body_weight: 1.5 },
    week_2: { min: 7,  max: 12, per_100g_body_weight: 1.8 },
    week_3: { min: 10, max: 17, per_100g_body_weight: 2.0 },
    week_4: { min: 15, max: 25, per_100g_body_weight: 2.5 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 5,
  max_stomach_capacity_ml_per_100g: 4,

  // ⚠️ BRACHYCEPHALIC: Keep whelping area COOL
  whelping_box_temp_celsius: {
    week_1:      { min: 28, max: 30, ideal: 29   },  // Lower than standard — BOAS heat risk
    week_2:      { min: 25, max: 28, ideal: 26   },
    week_3:      { min: 22, max: 25, ideal: 24   },
    week_4_plus: { min: 20, max: 22, ideal: 21   },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 36.1, danger_below: 34.5 },
    day_5_14:    { min: 35.0, max: 37.0, danger_below: 35.5 },
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

export const FRENCH_BULLDOG_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Frenchie puppies. Weigh each puppy before dosing.',
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
      plain_english: 'First vaccination at 6–8 weeks. CRITICAL for Frenchies: keep the puppy cool throughout the vet visit. Keep ambient temperature below 22°C. Have a cool damp cloth available. Monitor breathing closely — any laboured breathing at the clinic = alert vet immediately.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'Second vaccination. Discuss Lepto scheduling with vet — consider separate visit to reduce anaesthetic/stress load.',
      vet_required: true,
      critical: true,
    },
    {
      week: 14,
      label: 'Third vaccination',
      vaccine: 'DHPP #3 + Rabies',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'],
      plain_english: 'Third vaccination series plus Rabies. Morning appointment in cooler part of day.',
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
      label: '⚠️ Post-C-section dam check — BRACHYCEPHALIC ANAESTHETIC RECOVERY',
      urgency: 'within_12_hours',
      plain_english: 'With 81% C-section rate, your Frenchie dam almost certainly had a C-section. Monitor for brachycephalic post-anaesthetic complications: upper airway obstruction, aspiration pneumonia, regurgitation, slow recovery. Stay at the vet clinic for at least 2 hours post-op. Any laboured breathing, blue gums, or extreme distress after returning home = emergency vet immediately.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Assess dam recovery. Confirm all puppies gaining weight. Monitor for breathing difficulties in any puppy — cleft palate and BOAS can affect neonates.',
      critical: true,
    },
    {
      week: 6,
      label: '⚠️ Puppy wellness — BOAS and cleft palate assessment',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. CRITICAL: request BOAS assessment — evaluate nares (nostril opening), soft palate length, tonsils, and breathing sounds. Any puppy with severely stenotic nares should have surgical correction discussed. Cardiac auscultation. Check for any cleft palate signs that were missed at birth.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming check + heat protocol in writing',
      urgency: 'before_leaving',
      plain_english: 'Final check. Every Frenchie new owner MUST receive in writing: heat intolerance protocol, BOAS warning signs (blue gums = emergency), harness only always, no exercise above 20°C, IVDD awareness, hemivertebrae monitoring.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'BOAS Functional Grading',
      timing: '6 months minimum before any breeding decision',
      method: 'Cambridge BOAS functional grading scheme (or equivalent) by trained assessor',
      plain_english: 'All French Bulldogs have some degree of BOAS. Grade 0–1: may breed with caution. Grade 2–3: should not breed without surgical correction first. FBDCA strongly recommends BOAS assessment before breeding. Dogs with Grade 2–3 BOAS produce puppies with high probability of significant breathing problems.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Spinal (hemivertebrae) X-ray',
      timing: 'Recommended at 18–24 months before breeding',
      method: 'Spinal radiograph read by radiologist',
      plain_english: 'Hemivertebrae (wedge-shaped vertebrae) are present in 75–93% of French Bulldogs. Most are subclinical. However, severe hemivertebrae cause spinal cord compression, pain, and paralysis. Spinal X-ray before breeding identifies dogs with severe malformation that should not be bred.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'Hip dysplasia occurs in French Bulldogs due to their conformation. OFA certification recommended.',
      mandatory_for_breeding: false,
    },
  ],
};

export const FRENCH_BULLDOG_PREGNANCY_EVENTS = [
  {
    id_suffix: 'frenchie_preg_csection_mandatory',
    day_offset: -42,
    title: '⚠️ PLAN YOUR C-SECTION NOW — 81.3% of Frenchies require one',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'French Bulldog C-section is not a contingency — it is the standard delivery method. Book it now.',
    detail: '81.3% of French Bulldog litters are delivered by C-section (Evans & Adams 2010). The breed\'s wide head and narrow pelvis make natural delivery mechanically difficult.\n\nACTION — do these things NOW:\n1. Call your vet this week and book an ELECTIVE C-section\n2. Optimal timing: Day 61 post-ovulation confirmed by progesterone testing (when progesterone drops below 2 ng/mL)\n3. Confirm your vet has brachycephalic anaesthesia experience — this is critical. Frenchies are among the highest-risk breeds for anaesthetic complications.\n4. Pre-operative protocol: pre-oxygenation for 3+ minutes before induction, use of propofol over ketamine, minimal-dose anaesthesia\n5. Have your emergency vet number confirmed in case the C-section cannot wait\n\nDo NOT plan a natural birth unless you have strong evidence from progesterone monitoring that it is safe. A failed natural birth in a French Bulldog becomes an emergency C-section under worse conditions.',
    call_vet_if: 'Any contractions begin before planned C-section date — emergency surgery',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'frenchie_preg_heat_critical',
    day_offset: -42,
    title: '⚠️ HEAT IS LIFE-THREATENING for pregnant Frenchies',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'A French Bulldog dam in heat above 24°C risks heatstroke and foetal loss. Manage temperature now.',
    detail: 'French Bulldogs cannot thermoregulate effectively due to BOAS. Pregnancy makes this dramatically worse — the foetuses generate additional heat while the dam\'s airway remains restricted.\n\nIMPORTANT RULES from today through the end of lactation:\n1. Indoor temperature MUST stay below 24°C / 75°F at all times\n2. NO exercise outdoors above 20°C / 68°F\n3. NEVER leave a pregnant Frenchie in a car — even 2 minutes can be fatal\n4. Air conditioning is not optional in warm climates — it is a medical necessity\n5. Cool water always available\n6. If dog begins panting heavily at rest: cool immediately with damp towels on neck, groin, paws; fan aimed at dog; call vet\n\nHEATSTROKE EMERGENCY SIGNS:\n🔴 Panting that sounds laboured or noisy\n🔴 Gums going pink→red→purple\n🔴 Drooling excessively\n🔴 Staggering or collapsing\n\n= EMERGENCY VET IMMEDIATELY while cooling en route',
    emergency_contact_recommended: true,
  },
];

export const FRENCH_BULLDOG_NEONATAL_EVENTS = [
  {
    id_suffix: 'frenchie_neo_airway_at_birth',
    day_offset: 0,
    title: '⚠️ Day 0: Aggressive airway management for every Frenchie puppy',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'French Bulldog neonates have compromised airways from birth. Aggressive clearing is mandatory.',
    detail: 'Every French Bulldog puppy delivered (especially by C-section) needs immediate aggressive airway management:\n\n1. Suction mouth and nose immediately with a bulb syringe or neonatal suction device\n2. Hold puppy firmly with head DOWN — gravity drains fluid\n3. Rub vigorously with a warm, dry towel — stimulates breathing\n4. Check nares (nostrils) — Frenchie nostrils should have some opening. Pinhole nostrils = breathing emergency\n5. Listen for clear breathing within 60 seconds\n\nC-section neonates have additional risk because they have not gone through the birth canal compression that naturally expels lung fluid.\n\nFor every C-section Frenchie birth:\n- Have an extra person dedicated to resuscitating each puppy as it comes out\n- Each puppy must be cleared and stable before attention is divided\n- Have an oxygen source (Oxymask or similar) available\n\n🔴 If any puppy has purple/blue gums or makes no effort to breathe within 2 minutes: begin CPR — 100–120 compressions/minute with two fingers on the chest, 1 breath per 5 compressions via a tiny mask or cupped hand over the face.',
    call_vet_if: 'Any puppy has no respiratory effort within 2 minutes of birth — emergency resuscitation',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'frenchie_neo_cleft_palate_day0',
    day_offset: 0,
    title: 'Day 0: Cleft palate check — elevated in French Bulldogs',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Cleft palate is elevated in brachycephalic breeds. Check every Frenchie puppy at birth.',
    detail: 'Before placing any French Bulldog puppy on the dam, check for cleft palate:\n\n1. Open mouth under good lighting with head tilted back\n2. Look at the hard palate — should be a smooth, complete arch\n3. Run a finger from front to back of the palate\n4. Check the soft palate — should be smooth without a cleft\n\nSigns of cleft palate:\n- Visible gap or split in the hard palate\n- Milk appearing from the nose during nursing\n- Bubbling from nose when puppy breathes\n\nCleft palate puppies cannot nurse — they aspirate milk into the lungs. Tube feeding required until surgical repair at 3–5 months.',
    call_vet_if: 'Any puppy has visible palate gap or milk from nose during feeding',
  },
  {
    id_suffix: 'frenchie_neo_cool_whelping_box',
    day_offset: 0,
    title: '⚠️ KEEP WHELPING BOX COOLER THAN STANDARD — 28–30°C maximum',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Frenchie whelping box temperature is LOWER than standard breeds due to BOAS heat risk.',
    detail: 'Standard breed whelping box guidance of 29.5–32°C (85–90°F) is DANGEROUS for French Bulldog neonates.\n\nFrench Bulldog whelping box temperatures:\n- Week 1: 28–30°C (82–86°F) — NOT above 30°C\n- Week 2: 25–28°C (77–82°F)\n- Week 3: 22–25°C (72–77°F)\n- Week 4+: 20–22°C (68–72°F)\n\nBrachycephalic puppies overheat faster than other breeds because their airway restricts panting.\n\nProvide thermal gradient — warm zone at one end, cool zone at other. Watch that dam is not overheating. If dam is panting heavily in the whelping box, the temperature is too high for her.',
  },
  {
    id_suffix: 'frenchie_neo_boas_monitoring',
    day_offset: 7,
    title: 'Week 1–2: Monitor every puppy\'s breathing daily',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'BOAS affects Frenchie neonates. Daily breathing assessment is mandatory.',
    detail: 'Normal Frenchie puppy breathing:\n- Regular rate of 15–40 breaths per minute\n- Quiet — you should not hear breathing from across the room\n- Rhythmic and unlaboured\n\n🔴 Abnormal — call vet same day:\n- Audible wheezing, snoring, or stertor at rest\n- Laboured breathing with chest and belly moving excessively\n- Open-mouth breathing at rest\n- Any cyanosis (blue tinge to gums or tongue)\n\nSome noisy breathing in brachycephalic puppies is normal and will be present their whole lives. The distinction is: noisy but unlaboured breathing = acceptable. Laboured breathing with signs of distress = urgent vet.\n\nAny puppy with pinhole nostrils (nares that are nearly completely closed) should have surgical nares correction at 8–16 weeks — this is simple, low-risk, and dramatically improves quality of life.',
    call_vet_if: 'Any puppy shows laboured breathing, open-mouth breathing at rest, or blue gums',
    emergency_contact_recommended: true,
  },
];

export const FRENCH_BULLDOG_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'frenchie_social_week3_cool',
    day_offset: 21,
    title: 'Socialization Week 3: Heat-managed socialisation only',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'ALL Frenchie socialisation must occur in cool environments. BOAS heat risk begins at birth.',
    detail: 'All French Bulldog puppy socialisation must occur in environments below 22°C / 72°F. No exceptions.\n\nFrom Week 3:\n- Daily handling by 8+ people in cool indoor environments\n- Face and airway handling — essential for lifelong BOAS management\n- 5-minute play sessions maximum with cool-down periods\n- Introduce grooming: facial fold cleaning, ear cleaning, nail handling\n\nFrench Bulldogs have extensive facial fold cleaning requirements as adults. Begin desensitizing face handling from Week 3.',
  },
  {
    id_suffix: 'frenchie_social_week5_face_care',
    day_offset: 35,
    title: 'Week 5: Daily face cleaning — establish the routine before going home',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Frenchie facial folds require daily cleaning. This is a lifelong health maintenance task.',
    detail: 'French Bulldogs have deep facial folds that trap moisture, creating the perfect environment for bacterial and yeast infections (skin fold dermatitis).\n\nFrom Week 5, every day:\n1. Gently open each facial fold\n2. Wipe inside with a damp cotton ball or Frenchie-specific fold wipe\n3. Dry completely — moisture causes infections\n4. Check for redness, odour, or discharge\n\nAlso clean: under the tail (some Frenchies have tight tail pocket folds), inside the ears weekly.\n\nA Frenchie that was never habituated to face cleaning fights it as an adult — causing daily welfare issues and chronic skin infections.\n\nInform new owners: daily fold cleaning is as routine as feeding. Not optional.',
  },
];

export const FRENCH_BULLDOG_TRAINING_EVENTS = [
  {
    id_suffix: 'frenchie_training_harness_boas',
    day_offset: 35,
    title: 'HARNESS ONLY — BOAS makes neck collars extremely dangerous',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Neck collar pressure can trigger acute BOAS crisis in French Bulldogs.',
    detail: 'NEVER use a neck collar on a French Bulldog.\n\nBOAS narrows the airway. Any pressure on the trachea from a collar — even from excitement pulling — can trigger acute respiratory distress. A Frenchie can collapse from collar-induced airway obstruction.\n\nSoft H-shaped harness from Week 5.\nShort lead from Week 6.\nAll walks on lead — Frenchies must never run free in heat.\n\nInform every new owner in writing: harness only, for life, no exceptions.',
  },
];

export const FRENCH_BULLDOG_HEALTH_RISKS = [
  {
    condition: 'BOAS (Brachycephalic Obstructive Airway Syndrome)',
    timing: 'Present from birth — worsens with heat, exercise, stress, obesity, age',
    risk_level: 'critical' as const,
    signs: [
      'Noisy breathing at rest (stertor)',
      'Exercise intolerance — 5 minutes of activity causing distress',
      'Overheating easily and rapidly',
      'Open-mouth breathing at rest',
      'Gums going purple/grey',
    ],
    immediate_action: 'Purple/grey gums = EMERGENCY VET IMMEDIATELY. Cool the dog en route — wet towels on neck and groin. Overheating = cool immediately, emergency vet if not improving in 5 minutes.',
    vet_decision: 'Emergency vet for purple gums, collapse, or severe respiratory distress.',
    note: 'BOAS surgery (nares, soft palate, tonsils, saccules) dramatically improves quality of life. Recommended for Grade 2–3 cases before any breeding.',
  },
  {
    condition: 'Heatstroke',
    timing: 'Any exposure to temperatures above 24°C',
    risk_level: 'critical' as const,
    signs: ['Heavy panting for activity level', 'Bright red tongue', 'Purple/grey gums', 'Drooling', 'Staggering', 'Collapse'],
    immediate_action: 'Move to cool area immediately. Wet cool (not ice cold) towels on neck, armpits, groin, paws. Fan directed at dog. Emergency vet while cooling. Do not leave dog alone.',
    vet_decision: 'Emergency vet — heatstroke is fatal without treatment.',
    note: 'Prevention: indoor temperature below 24°C, no exercise above 20°C, never in a car.',
  },
  {
    condition: 'Hemivertebrae / Spinal Cord Compression',
    timing: 'Congenital — symptoms if severe from 4–18 months; monitoring lifelong',
    risk_level: 'high' as const,
    signs: ['Hind leg weakness or wobbling', 'Loss of bladder/bowel control', 'Hunched back', 'Pain on spinal palpation'],
    immediate_action: 'Urgent vet. MRI to assess severity. Severe spinal cord compression may require surgical decompression.',
    vet_decision: 'Urgent vet within 24 hours of any hindlimb weakness.',
    note: '75–93% of Frenchies have hemivertebrae. Most subclinical. Only ~5–10% develop significant neurological signs.',
  },
  {
    condition: 'IVDD (Intervertebral Disc Disease)',
    timing: 'Any age — French Bulldogs are chondrodystrophic',
    risk_level: 'high' as const,
    signs: ['Back pain — hunched posture', 'Hind leg weakness', 'Loss of bladder/bowel control'],
    immediate_action: 'Emergency vet for any hind leg weakness or bladder/bowel loss.',
    vet_decision: 'Emergency vet — Grade IV–V requires surgery within 24 hours.',
    note: 'Prevention: harness only, no jumping, lean weight.',
  },
];
