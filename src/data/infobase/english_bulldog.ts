/**
 * INFO BASE: ENGLISH BULLDOG
 * Applies to: English Bulldog (British Bulldog)
 * Info base ID: 'english_bulldog'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'english_bulldog'.
 *
 * Sources: Bulldog Club of America, UFAW (English Bulldog dystocia),
 * Evans & Adams 2010 (86.1% C-section rate),
 * PMC9577459 (congenital malformations — anasarca prevalence),
 * Merck Vet Manual, Cornell CVM, VCA Animal Hospitals, AKC.
 *
 * ⚠️⚠️ HIGHEST C-SECTION RATE OF ALL BREEDS: 86.1% ⚠️⚠️
 * - C-section is not contingency — it is REQUIRED management
 * - BOAS: near-universal — the most severe of all brachycephalic breeds
 * - Anasarca (fluid-filled "walrus" puppies): breed-specific neonatal emergency
 * - Cleft palate: significantly elevated
 * - Ambient temperature above 22°C is dangerous for dam and pups
 * - Heat intolerance: extreme
 */

export const ENGLISH_BULLDOG_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 3, max: 6, typical: 4 },
  newborn_weight_grams: { min: 280, max: 500, typical: 390 },
  adult_weight_kg: {
    male:   { min: 22.7, max: 25 },
    female: { min: 18.1, max: 22.7 },
  },
  size_category: 'medium' as const,
  hypoglycemia_risk: 'medium' as const,
  singleton_risk: false,
  csection_rate_percent: 86,   // Evans & Adams 2010
  brachycephalic: true,        // MOST SEVERE brachycephalic

  weight_targets: {
    birth:  { min: 280, max: 500,  typical: 390  },
    day_7:  { min: 530, max: 875,  typical: 703  },
    day_14: { min: 755, max: 1215, typical: 985  },
    week_3: { min: 1070, max: 1730, typical: 1400 },
    week_4: { min: 1500, max: 2420, typical: 1960 },
    week_6: { min: 2500, max: 4040, typical: 3270 },
    week_8: { min: 3300, max: 5400, typical: 4350 },
  },

  daily_gain_minimum_grams: 18,
  daily_gain_target_grams: 32,
  daily_gain_percent_bodyweight: 7,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 6,  max: 10, per_100g_body_weight: 1.5 },
    week_2: { min: 9,  max: 15, per_100g_body_weight: 1.8 },
    week_3: { min: 13, max: 21, per_100g_body_weight: 2.0 },
    week_4: { min: 19, max: 30, per_100g_body_weight: 2.5 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 8,
  max_stomach_capacity_ml_per_100g: 4,

  // ⚠️ BRACHYCEPHALIC: Keep whelping area COOL
  whelping_box_temp_celsius: {
    week_1:      { min: 26, max: 29, ideal: 28   },  // Lower than standard
    week_2:      { min: 24, max: 27, ideal: 25   },
    week_3:      { min: 22, max: 24, ideal: 23   },
    week_4_plus: { min: 20, max: 22, ideal: 21   },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 36.1, danger_below: 34.5 },
    day_5_14:    { min: 35.0, max: 37.0, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 100, d: 100 },
    large_litter: { w: 120, d: 120 },
    pig_rail_height_cm: 10,
    wall_height_cm: 40,
  },
};

export const ENGLISH_BULLDOG_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Bulldog puppies. Weigh each puppy before dosing.',
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
      plain_english: 'First vaccination at 6–8 weeks. Morning appointment. Bring a cool pack. Keep ambient temperature below 20°C throughout. Monitor breathing continuously. Any laboured breathing = alert vet immediately.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'Second vaccination. Discuss Lepto scheduling with vet — separate from core vaccines.',
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
      label: '⚠️ BRACHYCEPHALIC C-SECTION RECOVERY — stay at clinic',
      urgency: 'same_day',
      plain_english: 'With 86.1% C-section rate, your English Bulldog dam had a C-section. This is one of the highest-risk breeds for post-anaesthetic complications:\n- Airway obstruction during recovery\n- Aspiration pneumonia from regurgitation\n- Laryngeal/palatal swelling post-intubation\n\nStay at the vet clinic for minimum 3 hours post-op. Any breathing difficulty, regurgitation, or deterioration after returning home = emergency vet immediately, no waiting.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Check dam recovery. All puppies gaining weight. Breathing assessment for every puppy — flag any wheezing at rest.',
      critical: true,
    },
    {
      week: 6,
      label: '⚠️ Puppy wellness — BOAS + anasarca follow-up',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. Request BOAS functional assessment. Any puppy with severely stenotic nares: discuss early surgical correction at 8–16 weeks. Check all surviving puppies from any anasarca litter for subclinical oedema.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming check',
      urgency: 'before_leaving',
      plain_english: 'Final check. Every new owner receives in writing: temperature limit protocol (<22°C for exercise), harness only, BOAS crisis plan, daily fold cleaning, no exercise in heat, cherry eye watch.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'BOAS Functional Grading — MANDATORY before breeding',
      timing: '12–18 months minimum before breeding decision',
      method: 'BOAS functional grading by trained assessor',
      plain_english: 'English Bulldogs have the most severe BOAS of all breeds. Breeding dogs with Grade 2–3 BOAS perpetuates suffering in offspring. Grade 0–1 with surgical correction: may breed. Grade 2–3: should not breed without surgical correction and reassessment. Bulldog Club of America supports BOAS assessment before breeding.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip and elbow dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'Hip dysplasia is common in English Bulldogs due to conformation. OFA certification recommended.',
      mandatory_for_breeding: false,
    },
  ],
};

export const ENGLISH_BULLDOG_PREGNANCY_EVENTS = [
  {
    id_suffix: 'ebull_preg_csection_book_now',
    day_offset: -42,
    title: '⚠️ BOOK YOUR C-SECTION NOW — 86.1% of English Bulldogs require one',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'English Bulldog C-section is not an option — it is the standard delivery method. Book immediately.',
    detail: '86.1% of English Bulldog litters require C-section — the highest rate of any breed. Natural delivery is attempted by very few English Bulldog breeders and almost always results in emergency surgery anyway.\n\nDO THESE THINGS THIS WEEK:\n1. Book an elective C-section with a vet experienced in brachycephalic breeds\n2. Optimal timing: Day 61 post-ovulation (confirmed by progesterone monitoring)\n3. Confirm your vet has English Bulldog anaesthetic experience — they are among the highest-risk patients in veterinary medicine\n4. Discuss pre-surgical steroids with your vet: dexamethasone 18–24 hours before C-section improves neonatal lung maturity\n5. Plan for dedicated puppy resuscitation team — 4 hands minimum for a litter of 4\n\nEnglish Bulldog C-sections are complex. Work only with a vet who has done many of them.',
    call_vet_if: 'Any contractions begin before scheduled C-section — emergency surgery immediately',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'ebull_preg_heat_extreme',
    day_offset: -42,
    title: '⚠️ TEMPERATURE CONTROL: English Bulldogs cannot survive heat during pregnancy',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'English Bulldogs are the most heat-vulnerable breed. Pregnancy makes this life-threatening.',
    detail: 'English Bulldogs have the most compromised airway of any breed. During pregnancy, this becomes extreme.\n\nNON-NEGOTIABLE RULES from today:\n1. Indoor temperature NEVER above 22°C / 72°F — air conditioning is a medical requirement\n2. NO outdoor exercise when temperature or heat index exceeds 18°C / 64°F\n3. NEVER in a car — even in cool weather, cars heat rapidly\n4. Cool water always available\n5. Cool, damp surface available to lie on\n6. Electric fan minimum if air conditioning unavailable\n\nHEATSTROKE SIGNS — EMERGENCY VET:\n🔴 Panting that sounds very laboured or is audible from several metres away\n🔴 Gums going red → purple → white\n🔴 Excessive drooling\n🔴 Disorientation or collapse\n\nEnglish Bulldogs can die from heat faster than any other breed. This is not exaggeration.',
    emergency_contact_recommended: true,
  },
];

export const ENGLISH_BULLDOG_NEONATAL_EVENTS = [
  {
    id_suffix: 'ebull_neo_anasarca_check',
    day_offset: 0,
    title: '⚠️ Day 0: Check every puppy for ANASARCA — English Bulldog breed emergency',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Anasarca (generalised oedema / "walrus puppies") is a breed-specific English Bulldog emergency. Identify immediately at birth.',
    detail: 'Anasarca is a condition where puppies are born filled with fluid — generalised subcutaneous oedema. English Bulldogs account for the majority of anasarca cases in all dogs.\n\nANASARCA IDENTIFICATION AT BIRTH:\nNormal Bulldog puppy: firm body, normal weight for size, skin lies flat\n\nAnasarca puppy:\n- Visibly swollen, puffy, fluid-filled appearance\n- Skin feels like it contains water\n- Significantly heavier than expected for its size\n- Often cannot open eyes (oedematous eyelids)\n- May have laboured breathing\n\nSEVERITY:\n- Mild anasarca: slight puffiness, some survive with intensive tube feeding and diuretics\n- Severe anasarca: grossly swollen, waterlogged — humane euthanasia is appropriate\n\nFor mild anasarca puppies: tube feed every 2 hours, keep warm, consult vet immediately about furosemide (diuretic) dosing. Some puppies drain naturally over 5–7 days and survive to be normal dogs.\n\nFor severe anasarca: humane euthanasia is the kindest option — these puppies cannot live.',
    call_vet_if: 'Any puppy appears swollen, puffy, or fluid-filled — vet consultation same day',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'ebull_neo_csection_puppy_resus',
    day_offset: 0,
    title: 'Day 0: C-section puppy resuscitation — all hands on deck',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'C-section Bulldog puppies need immediate, aggressive resuscitation. Prepare a dedicated team.',
    detail: 'C-section puppies have not gone through the birth canal and have more fluid in their lungs than naturally-born puppies. Bulldog neonates have the additional challenge of brachycephalic airways.\n\nFor each puppy delivered:\n1. Immediately clear airway — bulb syringe mouth and nose aggressively\n2. Rub vigorously with warm dry towel\n3. Hold with head DOWN — gravity drains lung fluid\n4. Check for normal breathing within 60 seconds\n5. If no breathing: 2-finger chest compressions at 100/minute with small breaths\n6. Oxygen mask (cupped hand method or neonatal mask) for weak breathers\n\nWith a typical 4-puppy Bulldog C-section: you need minimum 4 people — one per puppy, each dedicated to resuscitation while the dam is still being closed.\n\nDo not hand a puppy to the dam until it is clearly stable — she cannot help a struggling puppy and may accidentally crush it.',
  },
  {
    id_suffix: 'ebull_neo_cleft_palate',
    day_offset: 0,
    title: 'Day 0: Cleft palate check — significantly elevated in English Bulldogs',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Cleft palate in English Bulldogs: 29% of congenital anomalies in C-section study.',
    detail: 'Cleft palate is significantly more common in English Bulldogs than the general canine population.\n\nCheck every puppy at birth:\n1. Open mouth under good lighting\n2. Look at the hard palate — should be a complete smooth arch\n3. Run a finger from front to back\n4. Check soft palate\n\nSigns of cleft palate:\n- Visible gap or split\n- Milk from the nose during nursing\n- Gurgling or bubbling breathing sounds\n\nManagement: tube feeding until surgical repair at 3–5 months. Not all cleft palate Bulldogs survive — depends on severity and management.',
    call_vet_if: 'Any puppy has palate gap or milk from nose',
  },
  {
    id_suffix: 'ebull_neo_cool_box',
    day_offset: 0,
    title: '⚠️ Whelping box: COOLER than standard — 26–29°C Week 1 maximum',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'English Bulldog neonates overheat at standard whelping temperatures. Keep cooler.',
    detail: 'Standard breed whelping box temperatures (29.5–32°C) are too high for English Bulldog neonates.\n\nEnglish Bulldog whelping box Week 1: 26–29°C (79–84°F)\nWeek 2: 24–27°C\nWeek 3: 22–24°C\nWeek 4+: 20–22°C\n\nProvide a thermal gradient so puppies can move away from heat.\nMonitor dam — if she is visibly panting heavily, reduce temperature immediately.',
  },
];

export const ENGLISH_BULLDOG_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'ebull_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Cool, calm, brief sessions only',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'English Bulldog socialisation must be cool, brief, and calm. BOAS heat risk governs everything.',
    detail: 'English Bulldog socialization rules:\n- All sessions in environments below 20°C / 68°F\n- Maximum 5 minutes of play, then rest\n- No excitement that causes excessive panting\n- No outdoor exposure in warm weather\n\nFrom Week 3:\n- Daily calm handling by 8+ people\n- Face fold handling — daily cleaning desensitization from Week 3\n- Ear and wrinkle handling\n- Brief, positive novelty introduction\n\nFocus: calm confidence, not stimulation overload.',
  },
  {
    id_suffix: 'ebull_social_week4_fold_care',
    day_offset: 28,
    title: 'Week 4: Daily fold cleaning — establish before going home',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'English Bulldogs require daily cleaning of facial folds, nose rope, tail pocket, and vulvar fold.',
    detail: 'English Bulldog fold care is more extensive than any other breed:\n\nDAILY cleaning required:\n1. Nose rope (skin fold over nose): wipe inside with unscented baby wipe, dry completely\n2. Facial folds: open each fold, wipe and dry\n3. Eye folds: gentle cleaning, check for ingrown hairs (entropion risk)\n4. Tail pocket (skin fold surrounding the tail): wipe and dry — infection here causes severe discomfort\n5. Vulvar fold (females): clean and dry\n\nFrom Week 4: daily practice of all fold cleaning on each puppy.\nA Bulldog that fights fold cleaning as an adult is at high risk for painful recurring skin infections.\n\nInform new owners: this is a 10-minute daily health maintenance task for the dog\'s entire life.',
  },
];

export const ENGLISH_BULLDOG_TRAINING_EVENTS = [
  {
    id_suffix: 'ebull_training_harness_critical',
    day_offset: 35,
    title: 'HARNESS ONLY — BOAS makes neck collar pressure potentially fatal',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Neck collars can trigger acute airway obstruction in English Bulldogs.',
    detail: 'NEVER use a neck collar on an English Bulldog. Their airway is already severely compromised. Any pressure on the trachea from a collar can trigger acute upper airway collapse.\n\nSoft padded harness from Week 5.\nShort, cool-environment lead practice only.\n\nInform every new owner: harness only, for life. No exceptions.',
  },
];

export const ENGLISH_BULLDOG_HEALTH_RISKS = [
  {
    condition: 'BOAS (Brachycephalic Obstructive Airway Syndrome)',
    timing: 'Present from birth — most severe form of all brachycephalic breeds',
    risk_level: 'critical' as const,
    signs: ['Noisy breathing at rest — audible from several metres', 'Severe exercise intolerance', 'Heat intolerance', 'Purple/grey gums', 'Collapse'],
    immediate_action: 'Purple gums = EMERGENCY VET IMMEDIATELY. Cool the dog while en route. BOAS surgery dramatically improves quality of life.',
    vet_decision: 'Emergency for respiratory distress. Elective BOAS surgery recommended for all Grade 2–3 dogs.',
    note: 'BOAS surgery: nares, soft palate, everted saccules. Most English Bulldogs benefit from early elective surgery.',
  },
  {
    condition: 'Heatstroke',
    timing: 'Any temperature above 22°C',
    risk_level: 'critical' as const,
    signs: ['Extreme panting', 'Red/purple/white gums', 'Drooling', 'Staggering', 'Collapse'],
    immediate_action: 'Cool immediately — wet towels on neck/groin/paws, fan, emergency vet en route.',
    vet_decision: 'Emergency vet — heatstroke is fatal without treatment.',
    note: 'English Bulldogs are the most heat-vulnerable breed. Indoor temperature limit 22°C.',
  },
  {
    condition: 'Anasarca',
    timing: 'Present at birth — inspect immediately',
    risk_level: 'critical' as const,
    signs: ['Puppy appears swollen and fluid-filled', 'Skin feels like it contains water', 'Much heavier than size suggests', 'May have laboured breathing'],
    immediate_action: 'Vet same day. Mild: tube feed every 2 hours, furosemide with vet guidance. Severe: humane euthanasia.',
    vet_decision: 'Vet same day for any swollen puppy.',
    note: 'English Bulldogs account for most anasarca cases in all dogs. Inspect every puppy at birth.',
  },
  {
    condition: 'Cherry Eye (Third Eyelid Prolapse)',
    timing: 'Any age — common from 4 months to 2 years',
    risk_level: 'high' as const,
    signs: ['Red fleshy lump visible in the inner corner of one or both eyes', 'Eye rubbing or pawing'],
    immediate_action: 'Book vet within a week. Surgical tucking (not removal) is the treatment. Do not allow self-trauma.',
    vet_decision: 'Call vet within a week. Not an emergency unless severely irritated.',
    note: 'Very common in English Bulldogs. Surgical correction recommended — do not remove the gland (causes dry eye).',
  },
  {
    condition: 'Skin Fold Dermatitis',
    timing: 'Any age if folds not cleaned daily',
    risk_level: 'high' as const,
    signs: ['Red, moist, smelly skin inside facial folds or tail pocket', 'Dog rubbing face or scooting', 'Brown/black discharge in folds'],
    immediate_action: 'Clean fold with medicated wipe. Antifungal cream if yeast (brown, moist, sweet smell). Antibiotics if bacterial (red, moist, infected). Vet if not resolving in 3 days.',
    vet_decision: 'Call vet if fold infection does not respond to cleaning within 3 days.',
    note: 'Prevented by daily fold cleaning. A Bulldog that is cleaned daily rarely develops fold dermatitis.',
  },
];
