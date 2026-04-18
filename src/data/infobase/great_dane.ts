/**
 * INFO BASE: GREAT DANE
 * Applies to: Great Dane
 * Info base ID: 'great_dane'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'great_dane'.
 *
 * Sources: Great Dane Club of America (GDCA), Merck Vet Manual,
 * Cornell CVM, Glickman GDV studies, AKC, OFA, VCA Animal Hospitals.
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const GREAT_DANE_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 5, max: 12, typical: 8 },
  newborn_weight_grams: { min: 500, max: 900, typical: 680 },
  adult_weight_kg: {
    male:   { min: 64, max: 79 },
    female: { min: 50, max: 64 },
  },
  size_category: 'giant' as const,
  hypoglycemia_risk: 'low' as const,
  csection_rate_percent: 20,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 500, max: 900, typical: 680 },
    day_7:  { min: 900, max: 1400, typical: 1150 },
    day_14: { min: 1400, max: 2000, typical: 1700 },
    week_3: { min: 2000, max: 2900, typical: 2450 },
    week_4: { min: 3000, max: 4200, typical: 3600 },
    week_6: { min: 5000, max: 7000, typical: 6000 },
    week_8: { min: 7000, max: 10000, typical: 8500 },
  },

  daily_gain_minimum_grams: 60,
  daily_gain_target_grams: 120,
  daily_gain_percent_bodyweight: 10,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 4.0, week_5: 3.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 12, max: 20, per_100g_body_weight: 1.8 },
    week_2: { min: 20, max: 30, per_100g_body_weight: 2.0 },
    week_3: { min: 30, max: 45, per_100g_body_weight: 2.5 },
    week_4: { min: 45, max: 65, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 12,
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
    small_litter: { w: 150, d: 150 },
    large_litter: { w: 180, d: 180 },
    pig_rail_height_cm: 15,
    wall_height_cm: 60,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const GREAT_DANE_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all puppies. Great Dane puppies grow so fast that their weight changes significantly day to day — always weigh on the day of treatment. With litters of 8–12, work through each puppy systematically using your ID colour system.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. A Great Dane puppy at 4 weeks can weigh 3–4 kg — always use current weight for dosing.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment — Panacur for 3 days. Broader spectrum coverage as puppies begin exploring their environment.',
      vet_required: false,
      critical: true,
    },
    {
      day: 56,
      label: 'Fourth deworming (pre-rehoming)',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Final deworming. At 8 weeks Great Dane puppies already weigh 7–10 kg — calculate carefully. Inform new owners to continue monthly heartworm/intestinal prevention.',
      vet_required: false,
      critical: true,
    },
  ],

  dam_deworming: {
    start_day_of_pregnancy: 40,
    end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)',
    dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth. A Great Dane dam is a large dog with a large dose requirement — confirm the weight and dose with your vet.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. Giant breeds sometimes have concerns about vaccine reactions triggering HOD (hypertrophic osteodystrophy) — discuss with your vet if this is a concern in your lines.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2 + Leptospirosis #1',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'],
      plain_english: 'Second vaccination. Some Great Dane breeders separate Lepto from DHPP by 2–3 weeks to reduce adverse reaction risk — discuss this scheduling with your vet.',
      vet_required: true,
      critical: true,
    },
    {
      week: 14,
      label: 'Third vaccination',
      vaccine: 'DHPP #3 + Leptospirosis #2 + Rabies',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis', 'Rabies'],
      plain_english: 'Third vaccination series plus Rabies. Full protection 2 weeks after this dose.',
      vet_required: true,
      critical: true,
    },
    {
      week: 18,
      label: 'CRITICAL: Final parvo booster',
      vaccine: 'DHPP #4 (final)',
      covers: ['Distemper', 'Parvovirus'],
      plain_english: 'Do not skip. Giant breeds can have high maternal antibody titres that interfere with earlier doses. This 16–20 week dose ensures complete protection.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check — URGENT',
      urgency: 'within_24_hours',
      plain_english: 'Great Dane dams whelping large litters undergo enormous physical stress. Check within 24 hours: all placentas passed, no retained foetuses, uterus contracting normally, milk supply beginning. A Great Dane dam with even a single retained puppy can die from sepsis within 24–48 hours.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'Day 7 check. Great Dane dams nursing 8+ puppies are under enormous caloric and physical demand. Confirm milk supply is adequate for the whole litter. Watch for dam weight loss — she should not be losing excessive condition.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + first vaccinations',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full exam. Specifically: cardiac auscultation (DCM murmur can occasionally be detected in puppies), check for HOD-risk bone tenderness. Discuss gastropexy timing with new owners.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check, health certificate. Inform new owners: large-breed puppy food ONLY (never adult or standard puppy food), no jumping/stairs/hard surfaces until 18 months, OFA hip/elbow at 24 months, annual cardiac echo from age 2, discuss prophylactic gastropexy.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months; PennHIP from 16 weeks',
      method: 'OFA radiograph',
      plain_english: 'Hip dysplasia affects Great Danes. OFA certification required by GDCA CHIC before breeding.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Dilated Cardiomyopathy (DCM) screening',
      timing: 'Annual echocardiogram from age 2; 24-hour Holter monitor recommended',
      method: 'Board-certified cardiologist echo + Holter',
      plain_english: 'DCM is common in Great Danes — the heart muscle becomes weak and enlarged, leading to heart failure or sudden death. GDCA CHIC requires annual cardiac certification from age 2 for breeding stock.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Thyroid screening',
      timing: 'Annual from age 2',
      method: 'OFA thyroid panel',
      plain_english: 'Hypothyroidism is more common in giant breeds. Annual thyroid screening recommended for breeding stock.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const GREAT_DANE_PREGNANCY_EVENTS = [
  {
    id_suffix: 'dane_preg_gdv_emergency_protocol',
    day_offset: -42,
    title: '⚠️ CRITICAL: GDV emergency protocol — know this now',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Great Danes have a 22% lifetime GDV risk. Pregnancy increases the risk further.',
    detail: 'Gastric Dilatation Volvulus (GDV/Bloat) kills more Great Danes than any other single condition. The lifetime risk is 22% — that is nearly 1 in 4 dogs.\n\nDuring pregnancy the risk increases because the foetuses compress the stomach.\n\nFROM TODAY — implement immediately:\n1. Feed 3–4 SMALL meals daily — absolutely no single large meals\n2. No exercise 1 full hour before AND 2 full hours after eating\n3. No elevated food bowls — they INCREASE GDV risk (evidence-based)\n4. No vigorous activity after meals\n5. Keep feeding environment calm — anxious eating causes swallowed air\n\nKNOW THESE EMERGENCY SIGNS:\n🔴 Unproductive retching or attempting to vomit with nothing coming up\n🔴 Abdomen visibly swollen and drum-hard\n🔴 Extreme restlessness and distress\n🔴 Pale or white gums\n🔴 Rapid deterioration in minutes to hours\n\nGDV IS FATAL WITHIN 1–2 HOURS WITHOUT SURGERY. If you see any of these signs: GO TO EMERGENCY VET IMMEDIATELY. Do not call ahead. Drive.',
    call_vet_if: 'Any of the GDV signs above — EMERGENCY, do not wait',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'dane_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Puppy count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. Great Dane litters of 8–12 require accurate count.',
    detail: 'Book your pre-whelping X-ray at Day 55–58 (5–8 days before due date). Great Dane foetuses are large and clearly visible on radiograph by this point.\n\nWith large Dane litters:\n- Confirm exact puppy count\n- Check for any foetuses in abnormal presentation — a malpresented Great Dane puppy is a large obstruction\n- Identify any single oversized foetus that may require C-section assistance\n\nWrite the puppy count on paper and tape it directly to the whelping box. With 20% C-section rate, confirm your vet\'s emergency availability for the whelping date.',
  },
  {
    id_suffix: 'dane_preg_giant_litter_supplies',
    day_offset: -21,
    title: 'Giant litter supplies checklist — order now',
    category: 'environment' as const,
    priority: 'high' as const,
    is_free: true,
    description: 'Great Dane litters of 8–12 require substantial supplemental support resources.',
    detail: 'Order before birth:\n- Esbilac puppy milk replacer × 3 cans minimum\n- French 12 feeding tube × 2 (for emergency tube feeding)\n- 10 cc, 20 cc, 35 cc syringes\n- Gram-accurate scale (capacity to 5 kg minimum for week 8 weights)\n- ID system for 10–12 puppies (coloured yarn)\n- Large warming box: minimum 60 × 60 cm with heat pad and thermometer\n- Two small thermometers — one for puppies, one for the whelping box ambient temperature\n\nGreat Dane dams are excellent mothers but even the best dam cannot simultaneously nurse 10 puppies of this size without supplemental rotation management.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const GREAT_DANE_NEONATAL_EVENTS = [
  {
    id_suffix: 'dane_neo_dam_crushing_risk',
    day_offset: 0,
    title: '⚠️ Dam crushing risk: Highest risk in giant breeds',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Great Dane dams can accidentally crush newborns due to their size. Active supervision is mandatory for the first 2 weeks.',
    detail: 'Great Dane mothers are typically gentle and attentive, but their sheer size means accidental crushing is a real risk — especially in the first 72 hours when newborns are slow-moving.\n\nProtocol:\n1. Pig rails are MANDATORY — 15 cm rails around the inside perimeter of the whelping box prevent the dam from lying directly against the walls and trapping puppies\n2. Supervise every nursing session for the first week\n3. When the dam lies down, ensure all puppies are visible and not pinned underneath\n4. At night: check every 2 hours for the first 5 days\n\nAny puppy that appears flat, cold, or unresponsive after being in the whelping box with the dam = warm immediately and check for injury.',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'dane_neo_hod_awareness',
    day_offset: 35,
    title: 'HOD awareness: Watch from Week 5 in giant breed puppies',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Hypertrophic Osteodystrophy affects giant breed puppies most commonly at 2–5 months.',
    detail: 'Hypertrophic Osteodystrophy (HOD) causes painful bone inflammation at the growth plates, primarily in fast-growing giant breed puppies.\n\nSigns to watch for:\n- Warm, swollen joints at the wrists (front legs most common)\n- Lameness and reluctance to walk\n- Fever (sometimes over 40°C / 104°F)\n- Loss of appetite\n- Crying when limbs are touched\n\nTiming: typically 2–5 months of age.\n\nCauses include over-supplementation of calcium/phosphorus (another reason to avoid calcium supplements and use only large-breed puppy food), and possibly some live vaccines (controversial — discuss with vet).\n\nHOD resolves on its own in most cases with rest and pain management. Severe cases can be debilitating. Inform new owners to watch for limping and joint swelling in the 8–20 week window.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const GREAT_DANE_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'dane_social_week3_no_jump',
    day_offset: 21,
    title: 'Socialization Week 3: NO JUMPING must begin now',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'A Great Dane at 6 months weighs 30–40 kg. No-jumping training must start at 3 weeks.',
    detail: 'The single most important behaviour to establish in Great Dane puppies is NO JUMPING ON PEOPLE.\n\nA Great Dane that jumps on a person can knock down an adult, injure a child, or break bones in an elderly person. This is not a cute puppy behaviour — it is a safety imperative.\n\nFrom Week 3:\n1. Every person who handles a puppy: turns completely away if ANY paw leaves the floor\n2. Four paws on ground = attention and reward\n3. Never reward jumping — not with pushing away (that is play to them), not with any attention whatsoever\n4. Be consistent with every visitor — brief every person before they enter the whelping area\n\nInstruct new owners: this rule is non-negotiable for life. A jumping Great Dane that was allowed to jump "just as a puppy" will jump as a 70 kg adult.',
  },
  {
    id_suffix: 'dane_social_week4_joint_safe',
    day_offset: 28,
    title: 'Socialization Week 4: Joint-protective exposure',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Socialise Great Dane puppies without high-impact movement.',
    detail: 'Great Danes have the most serious growth-plate vulnerability of any breed. Their rapid growth means high-impact socialisation can cause lasting joint damage.\n\nWeek 4 socialisation — ALLOWED:\n- Calm indoor environments\n- People meeting on soft surfaces (carpet, grass)\n- Gentle handling from multiple people\n- Calm car trips in crate\n- Short (5 min) supervised play on grass\n\nWeek 4 socialisation — AVOID:\n- Running on hard surfaces (concrete, tile)\n- Jumping on or off anything\n- Rough tumbling play with other large puppies\n- Stairs (carry them until 4 months)\n- Long distances\n\nGood socialisation for Great Dane puppies is about breadth of calm experience, not intensity or duration.',
  },
  {
    id_suffix: 'dane_social_week5_people',
    day_offset: 35,
    title: 'Socialization Week 5: 20+ people target',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Great Danes need extensive human socialisation — their size makes adult reactivity dangerous.',
    detail: 'Target for each Great Dane puppy by 8 weeks: 20+ different people including:\n- Children (a Dane that is uncertain around children is dangerous at adult size)\n- Elderly people with walking aids\n- People of various demographics\n- Men with deep voices and unfamiliar appearances\n\nGreat Danes are by nature gentle and friendly, but size means any anxiety-based reaction becomes immediately dangerous.\n\nInform new owners: the target is 100 people by 12 weeks. Take the puppy EVERYWHERE during the open window. A social Dane is the most wonderful dog on earth. An under-socialised Dane is a 70 kg problem.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const GREAT_DANE_TRAINING_EVENTS = [
  {
    id_suffix: 'dane_training_leash',
    day_offset: 35,
    title: 'Leash manners: Must start at Week 5',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'A Great Dane that pulls on a lead cannot be safely handled. Begin at 5 weeks.',
    detail: 'Begin loose-leash walking from Week 5 — indoors first.\n\nProtocol:\n1. Attach a lightweight collar or harness\n2. Take 5 steps. The instant there is any tension on the lead: STOP completely\n3. Wait until tension releases, then continue\n4. Reward calm walking with treats and praise\n5. Keep sessions to 3–5 minutes at this age\n\nInform new owners: a front-clip harness or head halter is strongly recommended for Great Danes from the first walk. Do NOT use a slip/choke collar. A Great Dane that pulls at 10 months weighs 50+ kg and can injure its handler.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const GREAT_DANE_HEALTH_RISKS = [
  {
    condition: 'GDV (Gastric Dilatation Volvulus)',
    timing: '22% lifetime risk — highest of any breed',
    risk_level: 'critical' as const,
    signs: ['Unproductive retching', 'Drum-hard distended abdomen', 'Extreme restlessness', 'Pale/white gums', 'Rapid collapse'],
    immediate_action: 'EMERGENCY VET IMMEDIATELY. Delay is fatal. Do not call — drive.',
    vet_decision: 'Rush to nearest emergency vet. GDV kills in 1–2 hours.',
    note: 'Prophylactic gastropexy at spay/neuter eliminates GDV risk for life. STRONGLY recommend for every Great Dane.',
  },
  {
    condition: 'Dilated Cardiomyopathy (DCM)',
    timing: 'Typically develops 2–6 years; sudden death can be first sign',
    risk_level: 'critical' as const,
    signs: ['Exercise intolerance', 'Coughing after exertion', 'Breathing difficulty at rest', 'Fainting', 'Swollen abdomen (fluid)'],
    immediate_action: 'Breathing difficulty or fainting = emergency vet. Routine detection requires annual echo + Holter from age 2.',
    vet_decision: 'Emergency vet for any breathing difficulty. Annual cardiology screening.',
  },
  {
    condition: 'Wobbler Syndrome (Cervical Vertebral Instability)',
    timing: 'Great Dane form typically 3–18 months; second peak in older dogs',
    risk_level: 'high' as const,
    signs: ['Wobbly uncoordinated gait in hind legs', 'Neck pain or stiffness', 'Difficulty going down stairs', 'Front leg weakness'],
    immediate_action: 'Book vet appointment. Avoid high-impact activity. MRI is the diagnostic gold standard.',
    vet_decision: 'Call vet within 24 hours of gait abnormality. Rapid progression = urgent.',
  },
  {
    condition: 'Osteosarcoma',
    timing: 'Peak 5–8 years',
    risk_level: 'high' as const,
    signs: ['Progressive lameness in one limb', 'Bone swelling', 'Pain on bone palpation'],
    immediate_action: 'Urgent vet — do not assume it is arthritis. Radiograph required.',
    vet_decision: 'Call vet within 24 hours of any bone swelling in an adult Great Dane.',
  },
];
