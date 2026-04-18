/**
 * INFO BASE: BOXER
 * Applies to: Boxer
 * Info base ID: 'boxer'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'boxer'.
 *
 * Sources: American Boxer Club, NC State CVM (ARVC/Boxer cardiomyopathy),
 * Merck Vet Manual, PubMed Boxer dystocia survey (27.7% rate),
 * VCA Animal Hospitals, AKC.
 *
 * ⚠️ CRITICAL FLAGS:
 * - 27.7% dystocia rate (Swedish study) — highest non-brachycephalic breed
 * - 23% C-section rate
 * - ARVC (Boxer cardiomyopathy) — STRN/FOS DNA test
 * - Mild brachycephalic — heat intolerance during whelping and exercise
 * - White Boxers: BAER test at 5–6 weeks for deafness
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const BOXER_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 4, max: 8, typical: 6 },
  newborn_weight_grams: { min: 250, max: 450, typical: 350 },
  adult_weight_kg: {
    male:   { min: 29.5, max: 36 },
    female: { min: 22.5, max: 29.5 },
  },
  size_category: 'medium' as const,
  hypoglycemia_risk: 'low' as const,
  csection_rate_percent: 23,
  brachycephalic: true,  // mild-moderate brachycephalic

  weight_targets: {
    birth:  { min: 250, max: 450, typical: 350 },
    day_7:  { min: 480, max: 700, typical: 590 },
    day_14: { min: 700, max: 1000, typical: 850 },
    week_3: { min: 1000, max: 1500, typical: 1250 },
    week_4: { min: 1500, max: 2200, typical: 1850 },
    week_6: { min: 2500, max: 3500, typical: 3000 },
    week_8: { min: 3500, max: 5000, typical: 4200 },
  },

  daily_gain_minimum_grams: 20,
  daily_gain_target_grams: 35,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 6,  max: 10, per_100g_body_weight: 1.8 },
    week_2: { min: 10, max: 15, per_100g_body_weight: 2.0 },
    week_3: { min: 15, max: 22, per_100g_body_weight: 2.5 },
    week_4: { min: 22, max: 32, per_100g_body_weight: 3.0 },
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
    week_1:      { min: 29.5, max: 32,   ideal: 30.5 },
    week_2:      { min: 27,   max: 29.5, ideal: 28   },
    week_3:      { min: 24,   max: 27,   ideal: 26   },
    week_4_plus: { min: 21,   max: 24,   ideal: 22   },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 37.2, danger_below: 35.0 },
    day_5_14:    { min: 35.0, max: 37.2, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 110, d: 110 },
    large_litter: { w: 130, d: 130 },
    pig_rail_height_cm: 10,
    wall_height_cm: 45,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const BOXER_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all puppies. Weigh each puppy before dosing.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Use current weight.',
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
      plain_english: 'Final deworming before rehoming.',
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
      plain_english: 'First vaccination at 6–8 weeks. Keep Boxer puppies cool before and after vaccination — heat intolerance is real even in mild brachycephalics.',
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
      label: 'CRITICAL: Final parvo booster',
      vaccine: 'DHPP #4 (final)',
      covers: ['Distemper', 'Parvovirus'],
      plain_english: 'Do not skip this booster.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check',
      urgency: 'within_24_hours',
      plain_english: 'With 27.7% dystocia and 23% C-section rate, Boxer dams should be checked within 24 hours. If C-section occurred: monitor dam carefully for delayed recovery from anaesthesia — brachycephalics have elevated anaesthetic risk.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Monitor dam\'s recovery from whelping. Confirm all puppies are gaining weight.',
      critical: true,
    },
    {
      week: 5,
      label: '⚠️ BAER test for white Boxer puppies',
      urgency: 'week_5_to_6',
      plain_english: 'Any puppy with predominantly white coat must have BAER (brainstem auditory evoked response) hearing test at 5–6 weeks. Approximately 19% of white Boxers are unilaterally deaf and 2% bilaterally deaf. This test requires specialised equipment — book at a veterinary neurology or audiology centre.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + first vaccinations',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. Specifically: cardiac auscultation (ARVC/SAS murmur), cleft palate check, testicle descent check (9.8% Boxer cryptorchidism rate).',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. Inform new owners about ARVC DNA test (STRN/FOS genes), annual Holter from age 3, heat intolerance protocol, mast cell tumour monitoring from age 5.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'ARVC — Arrhythmogenic Right Ventricular Cardiomyopathy',
      timing: 'Annual 24-hour Holter from age 3; DNA test any age',
      method: 'DNA test for STRN (ARVC1) and FOS (ARVC2) genes; 24-hour Holter monitor',
      plain_english: 'ARVC (Boxer cardiomyopathy) causes sudden death, often without warning. The STRN and FOS gene mutations are partially predictive but not fully. Annual Holter from age 3 is the gold standard for management. American Boxer Club recommends this for all breeding stock.',
      mandatory_for_breeding: true,
    },
    {
      name: 'SAS — Subaortic Stenosis (cardiac)',
      timing: 'Annual cardiologist auscultation; echo if murmur detected',
      method: 'Cardiac auscultation + echocardiogram',
      plain_english: 'SAS occurs in Boxers. Annual cardiac clearance recommended.',
      mandatory_for_breeding: true,
    },
    {
      name: 'BAER test (white puppies)',
      timing: 'Week 5–6',
      method: 'Brainstem Auditory Evoked Response test at specialist centre',
      plain_english: 'Mandatory for all white or predominantly white Boxer puppies. Identifies unilateral and bilateral deafness.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'OFA hip certification required for American Boxer Club CHIC certification.',
      mandatory_for_breeding: true,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const BOXER_PREGNANCY_EVENTS = [
  {
    id_suffix: 'boxer_preg_dystocia_warning',
    day_offset: -21,
    title: '⚠️ HIGH DYSTOCIA RISK: Boxer-specific whelping protocol',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Boxers have the highest documented dystocia rate of non-brachycephalic breeds — 27.7%. Be prepared.',
    detail: 'A 2007 Swedish study documented a 27.7% dystocia rate in Boxers — one of the highest of any non-brachycephalic breed. Of those dystocia cases, 80% required C-section.\n\nBoxer-specific whelping risks:\n- Primary uterine inertia (60% of Boxer dystocia cases)\n- Foetal malpresentation (26%)\n- Large single puppy obstructing\n\nPrepare NOW:\n1. Have your vet\'s emergency number saved and confirmed available\n2. Confirm nearest 24-hour surgical facility\n3. Know the C-section triggers (see Emergency Guide)\n4. Have oxytocin dose confirmed with vet — Boxers with uterine inertia sometimes respond to oxytocin (0.5–1 U/kg IM) but only if obstruction is ruled out\n\nThe mild brachycephalic anatomy also means: keep the whelping area cool (below 22°C / 72°F), have a fan ready, do NOT allow the dam to overheat during labour.',
    call_vet_if: 'Any of the standard dystocia triggers — Boxers have higher probability',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'boxer_preg_heat_protocol',
    day_offset: -28,
    title: 'Heat management protocol for Boxer dams',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Boxer dams are heat-intolerant due to mild brachycephalic anatomy. This worsens with pregnancy.',
    detail: 'Boxer dams should not be exercised in temperatures above 22°C / 72°F during pregnancy.\n\nHeat safety protocol:\n1. Exercise only during coolest parts of the day (early morning or after sunset)\n2. Keep indoor temperature below 24°C / 75°F\n3. Always provide shade and water access\n4. Watch for panting that seems excessive for the activity level\n5. If tongue goes dark purple/grey during panting: emergency cooling and emergency vet\n\nDuring late pregnancy (Week 7+): even mild overheating can trigger premature labour or foetal distress. The foetuses generate heat — combined with reduced airway capacity in a brachycephalic dam, this is a real risk.\n\nNever leave a pregnant Boxer in a car, even with windows cracked.',
  },
  {
    id_suffix: 'boxer_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Puppy count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. With high dystocia risk, knowing the count is critical.',
    detail: 'Boxer litters average 6 puppies. Pre-whelping radiograph at Day 55–58:\n\n- Exact puppy count\n- Check foetal positions — malpresentation accounts for 26% of Boxer dystocia\n- Confirm no single large foetus relative to pelvis size\n\nWith 27.7% dystocia and 23% C-section rate: have your vet\'s emergency number confirmed and tested before the due date.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const BOXER_NEONATAL_EVENTS = [
  {
    id_suffix: 'boxer_neo_brachycephalic_airway',
    day_offset: 0,
    title: 'Day 0: Airway management for Boxer neonates',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Boxer neonates have mild brachycephalic anatomy — airways need active clearing at birth.',
    detail: 'Boxer puppies are mildly brachycephalic — their slightly flat faces mean airways can collect more fluid at birth than in non-brachycephalic breeds.\n\nFor every Boxer puppy at birth:\n1. Clear mouth and nose vigorously with a bulb syringe or gauze\n2. Hold puppy firmly with head lower than body and swing gently in a downward arc to drain fluid from lungs (NOT the violent swing method — use the modified gravity position only)\n3. Rub firmly with a warm dry towel — this stimulates breathing\n4. Listen for clear, unlaboured breathing within 60 seconds\n5. Any gasping, gurgling, or blue-tinged gums = begin resuscitation\n\nNormal vs Abnormal breathing in Boxer neonates:\n✅ Normal: regular rate, clear, quiet\n🔴 Abnormal: gurgling, raspy, laboured — clear airway again immediately',
    call_vet_if: 'Any puppy does not establish clear breathing within 5 minutes of birth',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'boxer_neo_cleft_palate',
    day_offset: 0,
    title: 'Day 0: Check all puppies for cleft palate',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Cleft palate is elevated in brachycephalic breeds including Boxers.',
    detail: 'Before placing any Boxer puppy on the dam to nurse, check for cleft palate:\n\n1. Hold puppy with head tilted back\n2. Open mouth widely under good lighting\n3. Run a clean finger along the roof of the mouth from front to back\n4. The hard palate should be a complete, smooth arch\n\nSigns of cleft palate:\n- Visible gap or opening in the roof of the mouth\n- Milk coming out of the nose when puppy tries to nurse\n- Gurgling sounds during nursing\n- Failure to nurse effectively\n\nA puppy with cleft palate cannot nurse and will aspirate milk into the lungs without palate support. They require immediate tube feeding and a veterinary referral. Surgical repair is possible at 3–5 months in otherwise healthy puppies.',
    call_vet_if: 'Any puppy has a visible gap in the hard palate or milk comes from the nose during nursing',
  },
  {
    id_suffix: 'boxer_neo_white_baer',
    day_offset: 35,
    title: '⚠️ Week 5: BAER test for white Boxer puppies',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'White Boxer puppies must be BAER tested at 5–6 weeks for deafness.',
    detail: 'White or predominantly white Boxer puppies have significant deafness rates:\n- ~19% unilaterally deaf (one ear)\n- ~2% bilaterally deaf (both ears)\n\nBAER (Brainstem Auditory Evoked Response) testing:\n- Requires specialist equipment at a veterinary neurology centre or university hospital\n- Performed at 5–6 weeks when auditory system is sufficiently developed\n- Takes approximately 15–20 minutes per puppy\n- Results are immediate\n\nFor unilaterally deaf puppies: can live normal lives as companions, should not be bred or used in working roles that require binaural hearing\n\nFor bilaterally deaf puppies: can still be wonderful pets with appropriate training (hand signals instead of verbal commands); some breeders choose euthanasia, this is a personal/ethical decision\n\nDo not sell a white Boxer puppy without a BAER test result.',
    call_vet_if: 'BAER test specialist centre cannot be booked within 2 weeks',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const BOXER_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'boxer_social_week3_heat_aware',
    day_offset: 21,
    title: 'Socialization Week 3: Heat-aware handling',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Socialise Boxer puppies in cool environments — heat exposure at this age is dangerous.',
    detail: 'Boxer puppies are heat-sensitive from birth due to brachycephalic anatomy. All socialisation activities must be conducted in cool, ventilated environments.\n\nWeek 3 — indoors, cool:\n- Daily 5–10 minute handling by multiple people per puppy\n- Touch: paws, face, muzzle, ears, tail, belly\n- Varied surfaces (important — Boxers can be surface-sensitive)\n- Keep ambient temperature below 24°C / 75°F during handling sessions\n- Never leave puppies in direct sunlight\n\nHeat warning signs in young Boxer puppies: excessive open-mouth panting, pale gums, lethargy. Cool immediately with damp cloth and move to cooler area.',
  },
  {
    id_suffix: 'boxer_social_week4_people',
    day_offset: 28,
    title: 'Socialization Week 4: People diversity',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Boxers are people-oriented but need diverse exposure.',
    detail: 'Boxers are naturally social and playful — the "clown" of the dog world. This natural friendliness still requires active socialisation.\n\nWeek 4 targets:\n- 10+ new people handle each puppy\n- Children — Boxers are popular family dogs, child exposure is essential\n- Men with deep voices — Boxers sometimes are wary of men if not exposed early\n- Short outdoor trips in a cool carrier\n\nBoxer play style: boisterous, jumping, pawing — begin redirecting from this week. A Boxer that jumps at 6 kg is adorable; at 30 kg it knocks people over.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const BOXER_TRAINING_EVENTS = [
  {
    id_suffix: 'boxer_training_no_jump',
    day_offset: 28,
    title: 'No jumping: Begin at Week 4',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Boxers are enthusiastic jumpers. No-jumping training must start immediately.',
    detail: 'Boxers are famous for jumping on people as a greeting. Cute at 8 weeks. Problematic at 30 kg.\n\nFrom Week 4, absolute rule for every handler:\n1. When any paw leaves the floor: turn completely away, cross arms, no eye contact, no verbal response\n2. When four paws are on the floor: immediate attention, praise, treat\n3. NEVER push a Boxer puppy off — this is play to them and reinforces the behaviour\n\nBoxers are fast learners when training is consistent. If every person who interacts with these puppies follows this rule, jumping will not become an adult problem.\n\nInform new owners: this is the single most important training rule for Boxers. Brief every visitor before they come in.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const BOXER_HEALTH_RISKS = [
  {
    condition: 'ARVC (Boxer Cardiomyopathy)',
    timing: 'Any age; most common 2–8 years',
    risk_level: 'critical' as const,
    signs: ['Fainting or collapse without obvious cause', 'Exercise intolerance', 'Rapid or irregular heartbeat felt through the chest', 'Sudden death'],
    immediate_action: 'Any fainting episode = emergency vet. Annual Holter from age 3 for early detection.',
    vet_decision: 'Emergency vet for any fainting. Annual cardiac Holter is routine.',
    note: 'STRN/FOS DNA test for breeding stock. ARVC is the leading cardiac cause of death in Boxers.',
  },
  {
    condition: 'Mast Cell Tumour',
    timing: 'Peak 8–10 years; can occur from age 5',
    risk_level: 'high' as const,
    signs: ['Skin lump that changes size (grows, shrinks)', 'Itchy lump', 'Lump that is red, swollen, or ulcerated', 'Multiple lumps'],
    immediate_action: 'ANY skin lump on a Boxer = vet within a week. Do not assume it is benign. Fine needle aspirate is the first step.',
    vet_decision: 'Call vet for any skin lump. Mast cell tumours are the most common Boxer cancer.',
    note: 'Boxers are the #1 breed for mast cell tumours. Inform new owners to check for skin lumps monthly.',
  },
  {
    condition: 'Heat intolerance (brachycephalic)',
    timing: 'Year-round risk; worst in summer',
    risk_level: 'high' as const,
    signs: ['Excessive panting for activity level', 'Bright red tongue and gums', 'Uncoordinated movement', 'Purple/grey gums = critical emergency'],
    immediate_action: 'Move to shade immediately. Cool with wet towels on neck, armpits, groin. Offer small amounts of cool water. Emergency vet if gums go grey.',
    vet_decision: 'Purple/grey gums or collapse = EMERGENCY VET IMMEDIATELY.',
    note: 'Never exercise Boxers above 22°C / 72°F. Keep whelping area below 22°C.',
  },
];
