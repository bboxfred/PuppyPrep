/**
 * BIRTHING GUIDE — COMPLETE WHELPING REFERENCE
 * File: src/data/infobase/birthing-guide.ts
 *
 * ⚠️  APPLIES TO ALL BREEDS — not breed-specific.
 * Imported by:
 *   1. Schedule engine → pre-birth calendar events (Days -14 to 0)
 *   2. Info Library → "Birth Guide" section
 *   3. Emergency Guide → always free, always accessible, no paywall
 *
 * Sources: Cornell University CVM, Merck Veterinary Manual,
 * VCA Animal Hospitals, RECOVER 2025 neonatal resuscitation guidelines,
 * UC Davis School of Veterinary Medicine, DVM360, PetMD, PDSA,
 * Royal Kennel Club, Purina Pro Club, Revival Animal Health.
 *
 * Content philosophy: zero jargon, plain English, specific numbers
 * everywhere. Written for a first-time owner alone at 2am.
 */

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type UrgencyLevel = 'call_vet' | 'go_immediately' | 'monitor';

export interface EmergencyScenario {
  id: string;
  title: string;
  trigger: string;           // Exact threshold e.g. "30 minutes of straining"
  urgency: UrgencyLevel;
  what_it_looks_like: string;
  do_this_now: string[];     // Numbered steps
  vet_decision: string;
  small_breed_note?: string; // JRT / toy breed specific
}

export interface LibrarySection {
  id: string;
  title: string;
  emoji: string;
  summary: string;           // 1–2 sentences shown in list view
  content: string;           // Full plain-language content shown on detail screen
  is_free: boolean;
  tags: string[];
}

export interface WhelkingKitItem {
  category: string;
  item: string;
  why_needed: string;
  critical: boolean;
}

export interface CalendarEventTemplate {
  id_suffix: string;
  day_offset: number;        // Negative = before due date
  title: string;
  description: string;
  detail: string;
  category: 'health' | 'environment' | 'nutrition' | 'development';
  priority: 'critical' | 'high' | 'recommended';
  is_free: boolean;
  call_vet_if?: string;
  emergency_contact_recommended?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// WHELPING KIT CHECKLIST
// ─────────────────────────────────────────────────────────────────────────────

export const WHELPING_KIT: WhelkingKitItem[] = [

  // ── DELIVERY AND MEDICAL ──────────────────────────────────────────────────
  {
    category: 'Delivery & Medical',
    item: 'Digital rectal thermometer',
    why_needed: 'Track temperature twice daily from Day 55. The drop below 99°F (37.2°C) predicts labour within 12–24 hours. Never use a glass thermometer — breakage risk.',
    critical: true,
  },
  {
    category: 'Delivery & Medical',
    item: 'Water-based lubricant (KY Jelly)',
    why_needed: 'Lubricates the thermometer and the vulva area if you need to assist a stuck puppy.',
    critical: true,
  },
  {
    category: 'Delivery & Medical',
    item: 'Two hemostats (3.5–4.5 inch, one curved, one straight)',
    why_needed: 'Clamping umbilical cords before cutting. Sterilise in rubbing alcohol between puppies.',
    critical: true,
  },
  {
    category: 'Delivery & Medical',
    item: 'Round-tipped or children\'s safety scissors',
    why_needed: 'Cutting umbilical cords after clamping. Sterilise before use.',
    critical: true,
  },
  {
    category: 'Delivery & Medical',
    item: 'Bulb syringe',
    why_needed: 'Suctioning fluid from a puppy\'s nose and mouth if it is born with fluid in the airways. Squeeze before inserting, release to draw fluid out — mouth first, then nostrils.',
    critical: true,
  },
  {
    category: 'Delivery & Medical',
    item: 'Unwaxed dental floss',
    why_needed: 'Tying umbilical cords before cutting to prevent bleeding.',
    critical: true,
  },
  {
    category: 'Delivery & Medical',
    item: 'Povidone-iodine 10% solution (Betadine or Breeder\'s Edge Clean Cut Iodine)',
    why_needed: 'Treating umbilical cord stumps to prevent infection. The navel is a direct route to the bloodstream — infection can kill a puppy within 24–48 hours.',
    critical: true,
  },
  {
    category: 'Delivery & Medical',
    item: 'Disposable gloves (latex or nitrile)',
    why_needed: 'Hygiene when assisting with births or handling newborns.',
    critical: true,
  },
  {
    category: 'Delivery & Medical',
    item: 'Rubbing alcohol + alcohol wipes',
    why_needed: 'Sterilising scissors and hemostats between puppies.',
    critical: true,
  },
  {
    category: 'Delivery & Medical',
    item: 'Size-8 feeding tube + 12cc syringe',
    why_needed: 'Emergency tube feeding if a puppy cannot nurse. French 5 for JRT-sized puppies. A puppy that misses colostrum in the first 12–16 hours has almost no immune protection.',
    critical: true,
  },

  // ── NUTRITION AND SUPPLEMENTATION ─────────────────────────────────────────
  {
    category: 'Nutrition & Supplementation',
    item: 'Oral calcium gel (Breeder\'s Edge Oral Cal Plus or equivalent)',
    why_needed: 'Given by mouth when active contractions begin — absorbed within seconds. Supports uterine contractions and prevents eclampsia. NEVER supplement calcium during pregnancy itself — this increases eclampsia risk by suppressing the parathyroid gland.',
    critical: true,
  },
  {
    category: 'Nutrition & Supplementation',
    item: 'Puppy milk replacer (Esbilac or equivalent) + nursing bottle kit',
    why_needed: 'Emergency backup if the dam cannot nurse or if a puppy cannot latch. Always have this ready before birth — you will not have time to shop at 3am.',
    critical: true,
  },
  {
    category: 'Nutrition & Supplementation',
    item: 'Nutri-Cal or honey',
    why_needed: 'Energy support for the dam during long labours. Also used on puppy gums for emergency hypoglycaemia first aid.',
    critical: false,
  },

  // ── BEDDING AND CLEANING ──────────────────────────────────────────────────
  {
    category: 'Bedding & Cleaning',
    item: 'At least 12 clean towels (hand-towel and bath-towel sizes)',
    why_needed: 'Hand towels for rubbing newborns to stimulate breathing (replaces the mother\'s licking). Bath towels for bedding. You will go through them fast — have more than you think you need.',
    critical: true,
  },
  {
    category: 'Bedding & Cleaning',
    item: 'Waterproof whelping pads',
    why_needed: 'Absorbent, waterproof-backed pads line the whelping box floor. Avoid loose blankets during birth — newborns can become trapped underneath.',
    critical: true,
  },
  {
    category: 'Bedding & Cleaning',
    item: 'Newspaper',
    why_needed: 'Layer under whelping pads for easy disposal. Cheap and effective.',
    critical: false,
  },

  // ── MONITORING AND RECORD-KEEPING ────────────────────────────────────────
  {
    category: 'Monitoring & Records',
    item: 'Digital gram scale (accurate to 1g)',
    why_needed: 'Weigh every puppy at birth and twice daily for the first week. Failure to gain 10% of body weight per day after the first 24 hours signals a problem that needs immediate action.',
    critical: true,
  },
  {
    category: 'Monitoring & Records',
    item: 'Notebook and pen',
    why_needed: 'Record the time of every contraction, birth, and placenta delivery. You must know how many placentas have passed — one retained placenta can kill the dam.',
    critical: true,
  },
  {
    category: 'Monitoring & Records',
    item: 'Puppy ID system (coloured yarn, rickrack ribbon, or nail polish)',
    why_needed: 'Identify individual puppies for accurate weight tracking. Without IDs, you cannot tell which puppy is not gaining weight.',
    critical: true,
  },
  {
    category: 'Monitoring & Records',
    item: 'Clock visible from whelping area',
    why_needed: 'Time every event. The difference between "20 minutes of straining" and "35 minutes of straining" determines whether you call the vet.',
    critical: true,
  },

  // ── WARMTH ────────────────────────────────────────────────────────────────
  {
    category: 'Warmth',
    item: 'Cardboard box (puppy holding box) with towel-wrapped warm water bottle',
    why_needed: 'Hold earlier-born puppies safely at 85–90°F (29–32°C) while the dam continues delivering. Never leave newborns unsupported in an open area — they lose body heat in minutes.',
    critical: true,
  },
  {
    category: 'Warmth',
    item: 'Heat lamp with adjustable clamp',
    why_needed: 'Suspended above ONE end of the whelping box. Provides a warm zone while allowing puppies to crawl to a cooler zone. Target: 85–90°F (29–32°C) at puppy level in Week 1.',
    critical: true,
  },
  {
    category: 'Warmth',
    item: 'Room thermometer',
    why_needed: 'Measure temperature at puppy level — not up near the ceiling. Puppies cannot regulate their own body temperature for the first 2.5–4 weeks.',
    critical: true,
  },

  // ── EMERGENCY READINESS ───────────────────────────────────────────────────
  {
    category: 'Emergency Readiness',
    item: 'Vet\'s phone number + nearest 24-hour emergency vet number',
    why_needed: 'Written on paper taped to the wall above the whelping box AND saved in your phone. You cannot search for a number while managing a birth emergency.',
    critical: true,
  },
  {
    category: 'Emergency Readiness',
    item: 'Full tank of fuel in your vehicle',
    why_needed: 'You may need to leave for the emergency vet at 3am. Do not let fuel be the reason you are delayed.',
    critical: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TEMPERATURE MONITORING GUIDE
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPERATURE_GUIDE = {
  when_to_start: 'Day 55–56 of pregnancy. Take temperature twice daily (morning and evening) at the same times each day.',

  how_to_take: [
    'Use a digital rectal thermometer lubricated with water-based lubricant or petroleum jelly.',
    'Have a helper hold or distract the dog. She should be standing or lying on her side.',
    'Lift the tail gently.',
    'Insert the thermometer tip 1 inch (2.5 cm) into the anus, angled slightly toward the rectal wall.',
    'Hold it in place — do not let go — until it beeps (30–60 seconds).',
    'Remove, read, and record the result with the time and date in your notebook.',
    'Clean the thermometer with an alcohol wipe after each use.',
  ],

  normal_range_celsius: { min: 37.8, max: 39.2, typical: 38.6 },
  normal_range_fahrenheit: { min: 100.0, max: 102.5, typical: 101.5 },

  pre_labour_drop_celsius: { typical: 37.1, range_min: 36.7, range_max: 37.8 },
  pre_labour_drop_fahrenheit: { typical: 98.8, range_min: 98.1, range_max: 100.0 },

  action_threshold_celsius: 37.2,
  action_threshold_fahrenheit: 99.0,

  action_when_drop_detected: 'Labour will begin within 12–24 hours. Prepare the whelping area completely. Alert your vet. Begin 24-hour monitoring. Do not leave her alone.',

  important_caveat: 'In 35% of dogs, no clear temperature drop occurs. What matters most is a fall from YOUR dog\'s individual baseline over the past several days — not just the absolute number. This is why consistent daily recording matters.',

  what_to_record_each_time: 'Date, time, temperature reading, and any observations (nesting behaviour, restlessness, discharge, appetite changes).',
};

// ─────────────────────────────────────────────────────────────────────────────
// STAGE 1 LABOUR GUIDE
// ─────────────────────────────────────────────────────────────────────────────

export const STAGE_1_GUIDE = {
  what_is_happening: 'The cervix is dilating and the uterus is contracting internally. No visible abdominal pushing or straining should be seen. This stage is entirely behavioural — you see the signs in how she acts, not in her body.',

  normal_duration_hours: { min: 6, max: 24, first_time_mothers_max: 36 },

  call_vet_if_exceeds_hours: 24,

  signs_by_phase: [
    {
      phase: 'Early Stage 1 (Hours 0–4)',
      signs: [
        'Restlessness — pacing, circling, unable to settle',
        'Loss of appetite confirmed',
        'Mild panting begins',
        'Nesting intensifies — scratching at bedding, rearranging blankets, seeking enclosed spaces. JRTs may dig furiously at carpet or bark at the whelping box.',
      ],
    },
    {
      phase: 'Mid Stage 1 (Hours 4–8)',
      signs: [
        'Panting becomes pronounced and nearly continuous',
        'Shivering or trembling — THIS IS NORMAL (hormonal)',
        'May vomit once or twice — also normal',
        'Clear, watery vaginal discharge may appear',
        'Looks at her flanks and abdomen repeatedly',
        'May urinate and defecate frequently — take her out briefly on a lead',
      ],
    },
    {
      phase: 'Late Stage 1 (Hours 8–24)',
      signs: [
        'Panting and trembling intensify significantly',
        'May refuse water',
        'Dilated pupils, distant "glazed" expression',
        'Some dogs become very clingy; others want complete solitude — respect both',
        'The transition to Stage 2 is marked by the first VISIBLE abdominal contraction — the whole belly tightens purposefully',
      ],
    },
  ],

  normal_vs_alarming: {
    normal: [
      'Panting, shivering, occasional vomiting (1–2 times)',
      'Restlessness and food refusal',
      'Clear watery vaginal discharge',
      'Nesting of any intensity',
    ],
    call_vet: [
      'Green or blood-tinged discharge BEFORE any puppy is born',
      'Foul-smelling discharge at any point',
      'Stage 1 lasting more than 24 hours without visible straining',
      'Temperature dropped more than 24 hours ago with no labour',
      'Extreme lethargy or collapse',
      'Fever above 103°F (39.4°C)',
    ],
  },

  whether_to_stay_or_leave: 'Stay nearby but not intrusive. Sit quietly in the same room or just outside with the door ajar. Terrier breeds can stall labour if overstimulated. Offer calm reassurance if she seeks you; give her space if she retreats.',

  first_timer_vs_experienced: 'First-time mothers often have longer labours (up to 36 hours), more dramatic signs, and are more likely to ignore newborns after delivery. Be fully prepared to remove sacs, cut cords, and stimulate breathing yourself. First-time dams may not produce milk until the actual moment of delivery.',
};

// ─────────────────────────────────────────────────────────────────────────────
// STAGE 2 LABOUR GUIDE — PUPPIES ARRIVING
// ─────────────────────────────────────────────────────────────────────────────

export const STAGE_2_GUIDE = {

  what_a_contraction_looks_like: 'The dam\'s flank area tightens visibly — the entire abdomen contracts inward. She bears down like she is straining to defecate. She usually lies on her side or squats, arches her back, and tucks her chin. On a small 5–8 kg terrier, the abdominal tensing is very easy to see. Between contractions she may pant, circle, or rest.',

  amniotic_sac_description: 'The first thing you may see at the vulva is a translucent, clear-to-white, glistening, fluid-filled bubble about the size of a golf ball to a small egg. This is the outer water sac. It may rupture on its own releasing clear fluid. The puppy itself is encased in a thinner inner membrane. If the puppy is born inside an unbroken membrane, break it immediately.',

  presentations: [
    {
      name: 'Anterior (head-first)',
      frequency_percent: 60,
      description: 'You see the nose and front paws first, the head resting on extended forelegs in a diving position. The easiest delivery.',
      normal: true,
      action: 'No assistance needed unless the puppy stalls for more than 10 minutes.',
    },
    {
      name: 'Posterior (hind-feet-first)',
      frequency_percent: 40,
      description: 'You see the hind paws and tail first, hind legs extended straight back. Normal in dogs — not a risk factor for stillbirth.',
      normal: true,
      action: 'Assist promptly if she stalls — the umbilical cord may compress before the head clears.',
    },
    {
      name: 'True breech (rump-first, legs tucked forward)',
      frequency_percent: 5,
      description: 'You see only the tail and rump — no feet visible. Tucked legs create a larger diameter that may obstruct passage.',
      normal: false,
      action: 'Call your vet immediately if you see a tail with no feet.',
    },
    {
      name: 'Transverse (sideways)',
      frequency_percent: 1,
      description: 'A visible bulge behind the vulva but no head, feet, or tail emerging. Dam strains repeatedly with no progress.',
      normal: false,
      action: 'GO TO EMERGENCY VET IMMEDIATELY. Cannot be delivered vaginally.',
    },
  ],

  pushing_time_thresholds: {
    normal_max_minutes: 30,
    call_vet_at_minutes: 20,
    emergency_at_minutes: 30,
    note: 'The first puppy may take up to 1–2 hours from onset of Stage 2. After that, 20–30 minutes per puppy is normal.',
  },

  how_to_assist_stuck_puppy: {
    when_to_intervene: 'A puppy is partially visible and the dam has been straining unproductively for more than 10 minutes.',
    steps: [
      'Put on gloves. Apply water-based lubricant generously around the vulva and the visible portion of the puppy.',
      'Wrap the visible part of the puppy in a clean dry towel for grip — newborns are extremely slippery.',
      'Grasp the puppy by the shoulders, hips, or legs — NEVER by the head, and NEVER by the umbilical cord.',
      'Apply gentle, steady traction at a downward arc — pull toward the dam\'s hocks (approximately 45 degrees downward from straight out).',
      'Pull WITH contractions for the strongest effect, but maintain light constant traction between contractions.',
      'A very slight quarter-turn rotation while pulling can free stuck shoulders or hips.',
      'If the puppy does not move with moderate traction within a few minutes, or the dam appears in extreme pain, STOP immediately and go to the emergency vet.',
    ],
    never_do: [
      'Never use forceps, pliers, or any instrument',
      'Never pull forcefully or yank',
      'Never pull straight out — always at a downward angle',
      'Never grasp the head or neck',
      'Never grasp the umbilical cord',
    ],
  },

  timing_between_puppies: {
    normal_min_minutes: 5,
    normal_max_minutes: 120,
    safe_max_hours: 4,
    total_whelping_max_hours: 24,
    note: 'Puppies often arrive from alternate uterine horns — you may see two quickly, then a longer pause. This is normal.',
  },

  resting_phase_vs_stalled_labour: {
    normal_rest: 'Dam stops straining, appears calm and comfortable, nurses and grooms existing puppies, may drink or rest. Can last minutes to 4 hours. She is NOT distressed.',
    stalled_labour: 'Dam appears exhausted and weak. Excessive panting and trembling without productive contractions. She ignores existing puppies. Green discharge continues without a puppy following. More than 4 hours since the last puppy. Call the vet.',
  },

  discharge_guide: {
    green_before_first_puppy: 'EMERGENCY. A puppy has lost its oxygen supply. A live puppy MUST follow within 15 minutes. Call the vet immediately.',
    green_after_first_puppy: 'Normal. Multiple placentas are separating. Expected throughout delivery.',
    blood_normal: 'Small amounts of blood-tinged fluid during delivery are normal — a few teaspoons for a small-breed dam.',
    blood_emergency: 'Active, flowing, bright-red blood that pools or soaks towels. Check gum colour — white or pale pink gums mean shock. Emergency vet immediately.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// NEWBORN FIRST 10 MINUTES PROTOCOL
// ─────────────────────────────────────────────────────────────────────────────

export const NEWBORN_PROTOCOL = {

  healthy_puppy_signs: [
    'Tongue and gums are PINK',
    'Wriggles actively when touched',
    'Begins whimpering or crying within 1–2 minutes of birth',
    'Breathing is regular at 10–18 breaths per minute',
    'Heart rate approximately 200 beats per minute',
  ],

  unwell_puppy_signs: [
    'Tongue and gums are grey-blue, white, or purple (cyanosis)',
    'Limp and floppy with minimal or no movement',
    'Silent at birth or makes only weak gasping sounds',
    'Breathing is absent, irregular, or raspy/gurgling (fluid in airways)',
    'Heart rate below 150 bpm',
  ],

  if_mother_does_not_remove_sac: {
    time_allowance_seconds: 60,
    steps: [
      'TEAR the membrane at the face using a clean fingertip — pinch and tear over the nose and mouth. Do not use scissors (risk of cutting the puppy).',
      'PEEL the membrane backward from the face — clear the nostrils and mouth first, then peel over the head and body.',
      'WIPE the face with clean gauze or a soft cloth, clearing all fluid from the nostrils and mouth.',
      'SUCTION with a bulb syringe if needed — squeeze before inserting, mouth first, then nostrils.',
      'STIMULATE — rub vigorously with a dry towel (see breathing stimulation below).',
    ],
  },

  breathing_stimulation: {
    method: 'Vigorous towel rubbing — the single most important resuscitation skill.',
    steps: [
      'Place the puppy in a clean dry warm towel.',
      'Rub VIGOROUSLY but not roughly over the back and chest — brisk, firm strokes like towel-drying yourself after a shower.',
      'Rub AGAINST the direction of the fur on the lumbar region (lower back) — this specifically stimulates crying and aids airway clearance.',
      'Also rub the genital and umbilical region — this induces reflex respiration.',
      'Tilt the puppy so its hindquarters are SLIGHTLY raised and its head is slightly lower — no more than 15–20 degrees. This drains fluid from the airway by gravity.',
      'Continue until breathing and crying begins. Do NOT stop for at least 10–15 minutes if the puppy is not responding.',
      'Replace wet towels with fresh dry ones as you work — the rubbing simultaneously dries the coat (preventing hypothermia), stimulates breathing, and promotes circulation.',
    ],
  },

  airway_clearance_2025: {
    swing_method_retired: true,
    swing_method_reason: 'The swing method is PERMANENTLY RETIRED as of RECOVER 2025 guidelines. A published case report documented fatal brain damage in a puppy swung by an experienced attendant — equivalent to shaken baby syndrome. Do not swing puppies under any circumstances.',
    approved_methods: [
      'Vigorous towel rubbing (primary method)',
      'Gentle gravity-assisted positioning: head 15–20 degrees lower than hindquarters — NEVER more. Support the head and neck at all times.',
      'Bulb syringe suction: mouth first, then nostrils',
      'For non-breathing puppies: cover the puppy\'s mouth and nose with your mouth and deliver very small, gentle puffs — NOT full breaths (the lungs are tiny). Aim for 15–30 rescue breaths per minute (one every 2–4 seconds). Watch for slight chest rise.',
    ],
  },

  if_no_heartbeat: {
    chest_compression_technique: 'Place thumb and forefinger around the chest just behind the elbows. Compress to one-third to one-half of the chest width.',
    rate_per_minute: 150,
    ratio: '4 compressions to 1 breath (RECOVER 2025 neonatal protocol)',
    continue_for_minutes: 15,
    stop_when: 'No heartbeat detected after 10 minutes of full CPR. Prognosis at that point is very poor.',
  },

  revival_time: {
    minimum_minutes: 15,
    maximum_minutes: 20,
    note: 'Keep going for at least 10–15 minutes. Neonates survive hypoxic states longer than adults. Do not give up too early.',
  },

  getting_puppy_nursing: 'Once breathing, dried, and pink, place the puppy at the dam\'s nipple immediately. Colostrum must be received in the first hours of life. If the puppy has trouble latching, rub its muzzle SIDEWAYS across the nipple. The rear nipples (between the hind legs) are typically the most productive. Colostrum window: 12–16 hours maximum. After that, the gut wall closes and antibodies can no longer be absorbed.',

  holding_box: {
    temperature_celsius: { min: 29, max: 32 },
    temperature_fahrenheit: { min: 85, max: 90 },
    setup: 'Cardboard box lined with towels over a warm (not hot) water bottle or Snuggle Safe disc. NEVER use an electric heating pad directly under puppies — they cannot move away and can be burned.',
    why_critical: 'Puppies cannot regulate their own body temperature for the first 2.5–4 weeks. A hypothermic puppy cannot nurse or digest food. Cold kills newborns within hours.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PLACENTA MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

export const PLACENTA_GUIDE = {
  expected_timing_after_puppy_minutes: { min: 5, max: 15 },
  description: 'A greenish-black, liver-like tissue mass roughly the same size as the puppy but flatter. Connected to the puppy via the umbilical cord.',

  counting_rule: 'One placenta per puppy. There must NEVER be fewer placentas than puppies. Write each in your notebook as it appears. This is not optional — a retained placenta can kill the dam.',

  eating_placentas: {
    allow_max: 2,
    reason_to_limit: 'Eating more than 1–2 placentas — especially for a JRT with 4–8 puppies — will almost certainly cause significant vomiting and diarrhoea.',
    how_to_remove: 'Discreetly remove excess placentas while the dam is focused on a newborn.',
  },

  retained_placenta: {
    signs: [
      'Placenta count is less than puppy count',
      'Persistent greenish or foul-smelling discharge (24–48 hours post-whelping)',
      'Fever above 103°F (39.4°C)',
      'Lethargy and poor appetite in the dam',
      'Reduced milk production and maternal behaviour',
    ],
    timeline: 'Signs appear within 24–48 hours of birth. Call the vet within 24 hours of delivery if your count does not match. Go to the vet if the dam develops fever, foul discharge, or lethargy.',
    treatment: 'IV oxytocin to stimulate uterine contractions (within 24 hours). Beyond 24 hours: prostaglandins or surgery may be needed.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// UMBILICAL CORD PROTOCOL
// ─────────────────────────────────────────────────────────────────────────────

export const UMBILICAL_CORD_PROTOCOL = {

  if_mother_bites_cord: {
    normal_length_cm: { min: 1.3, max: 2.5 },
    if_too_short: 'Less than 1.3 cm from the belly: apply gentle finger pressure to stop bleeding, dab iodine on the stump. Monitor for herniation.',
    if_too_long: 'More than 5 cm: trim to 2.5 cm using the cutting technique below.',
  },

  if_mother_does_not_bite: {
    wait_before_cutting_minutes: 3,
    why_wait: 'Blood in the cord reabsorbs into the puppy during this time — providing extra oxygen and nutrients.',
    steps: [
      'Wait approximately 2–3 minutes after birth before cutting.',
      'Tie the FIRST knot using unwaxed dental floss at 1 inch (2.5 cm) from the puppy\'s belly. Use a square knot (right over left, then left over right). Firm enough to close the vessel but not cut through the tissue.',
      'Tie a SECOND knot 0.25 inch (6 mm) further from the first — farther from the puppy\'s body, closer to the placenta.',
      'CUT between the two knots with sterilised scissors. Cut on the placenta side so the tied stump remains on the puppy.',
      'The remaining stump on the puppy should be 0.5–1 inch (1.3–2.5 cm) long.',
    ],
  },

  if_cord_bleeds_after_cutting: [
    'Apply gentle finger pressure to the stump for 15–30 seconds.',
    'If bleeding continues, tie another knot just behind the first one.',
    'Bleeding should stop within 1 hour of proper tying.',
    'A small smear of blood over the next several hours is normal.',
    'If active bleeding persists, contact your vet.',
  ],

  iodine_application: {
    product: 'Povidone-iodine 10% solution (Betadine or equivalent)',
    technique: [
      'Turn the puppy belly-down. Place the bottle opening over the cord stump and press gently against the belly to seal.',
      'Tip the puppy and bottle belly-up so the solution covers the stump completely.',
      'Hold for 15–20 seconds of contact.',
      'Return to belly-down. Wait 20–30 seconds for the solution to air-dry before returning puppy to the dam.',
      'Re-apply on Day 3 for additional protection during healing.',
    ],
    frequency: 'Day 0 (at birth) and Day 3.',
  },

  healing_by_day: [
    { day: 0, appearance: 'Wet, soft stump, freshly iodine-stained' },
    { day: 1, appearance: 'Stump begins to dry, shrivel, and darken' },
    { day: 2, appearance: 'Continuing to dry. Iodine colour may fade — normal.' },
    { day: 3, appearance: 'Dry and leathery. Re-apply iodine today.' },
    { day: '3–5', appearance: 'Falls off naturally. A small flat scar (the belly button) remains.' },
    { day: '5–7', appearance: 'Most stumps have detached.' },
    { day: 10, appearance: 'If the cord has not detached by now, consult your vet.' },
  ],

  infected_cord_warning_signs: {
    at_stump: [
      'Redness or swelling spreading around the navel',
      'Warmth to the touch',
      'Pus or oozing discharge',
      'Foul odour',
      'Persistent bleeding beyond 48 hours',
    ],
    in_puppy: [
      'Fever',
      'Lethargy and decreased nursing',
      'Poor weight gain',
      'Pale or bluish gums',
      'Excessive crying',
      'Bloated belly',
    ],
    action: 'An infected navel can kill a puppy within 24–48 hours. Contact your vet IMMEDIATELY if you see any of these signs.',
  },

  umbilical_hernia: {
    description: 'A soft swelling beneath the skin at the belly button. Protrudes when the puppy stands, cries, or strains.',
    small_hernia_cm: 1,
    small_hernia_action: 'Hernias smaller than 1 cm often close on their own by 3–4 months.',
    large_hernia_cm: 2.5,
    large_hernia_action: 'Hernias larger than 2.5 cm typically require surgical repair at spay/neuter age (4–6 months).',
    emergency_signs: 'Area becomes hot, red, firm, larger than before, and painful. Puppy is depressed, vomiting, or shows abdominal pain. A previously reducible hernia cannot be pushed back in. THIS IS A SURGICAL EMERGENCY — go to the vet immediately.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// POST-WHELPING GUIDE (After All Puppies Are Born)
// ─────────────────────────────────────────────────────────────────────────────

export const POST_WHELPING_GUIDE = {

  confirming_labour_is_finished: {
    gold_standard: 'Pre-whelping X-ray puppy count. If expected puppies = born puppies = counted placentas, whelping is complete.',
    physical_signs: [
      'Dam stops straining entirely',
      'Becomes calm and relaxed',
      'Focuses on nursing and grooming her puppies',
      'May eat, drink, or rest comfortably',
    ],
    monitoring_period: 'Stay with her for at least 4 hours after the last puppy to confirm no further contractions.',
    if_uncertain: 'Call your vet — a post-whelping X-ray or ultrasound can confirm.',
  },

  checking_the_dam: {
    discharge: {
      immediately_post_birth: 'Greenish-black, odourless. Should decrease significantly within 24–48 hours.',
      lochia_normal: {
        colour_progression: ['Dark green / greenish-black', 'Reddish-brown / brick red', 'Brown', 'Clear / light pink'],
        odour: 'Odourless at all times',
        duration_weeks: { typical: 3, max: 8 },
        volume: 'Substantial in first 24 hours, then progressively diminishing.',
      },
      abnormal_call_vet: [
        'Foul or fetid odour',
        'Bright-red heavy bleeding returning after initial decrease',
        'Yellow or purulent (pus-like) discharge',
        'Discharge that increases in volume rather than decreasing',
        'Blood clots or chunks of tissue',
      ],
    },
    temperature: 'A mild fever lasting 24–48 hours after delivery can be normal. Fever beyond 48 hours, especially with foul-smelling discharge, suggests metritis — call the vet.',
    mammary_glands: 'Should be moderately firm, symmetrical, not hot, red, hard, or tender. Express a small amount of milk — it should be grey-white and watery. Bloody, yellowish, or thick discharge from the nipples is abnormal.',
  },

  first_nursing_check: 'Verify that EVERY single puppy has nursed within the first 2–3 hours. Colostrum is not just nutrition — it contains the dam\'s antibodies that the puppies\' immature immune systems depend on entirely. Colostrum window: 12–16 hours after birth.',

  dam_care_first_24_hours: {
    food: 'She may not eat immediately — this is normal. She should eat within 24 hours. Feed high-quality puppy food in 3–4 small meals per day. During peak lactation she will need 2–4 times her normal calorie intake. Bring food and water to her in the whelping box.',
    water: 'Fresh, clean water available at all times, within reach of the whelping box.',
    toilet: 'Gently encourage her to go outside briefly. She may be reluctant to leave the puppies — keep trips short and supervised.',
    bathing: 'No full bath for 10–14 days. Use warm damp cloths for spot cleaning.',
    environment: 'Keep visitors away. No strangers, no other pets, minimal noise for the first 2 weeks.',
  },

  puppy_weighing: {
    frequency: 'Twice daily for the first week.',
    normal_first_day: 'Slight weight loss in the first 24 hours is normal.',
    daily_gain_target_percent: 10,
    action_if_failing: 'Any weight loss or failure to gain 10% daily after Day 1 signals inadequate nutrition. Supplement immediately with Esbilac formula after nursing sessions.',
    normal_rectal_temp_week1: { celsius: { min: 35, max: 37.2 }, fahrenheit: { min: 95, max: 99 } },
  },

  postpartum_complications: [
    {
      condition: 'Metritis (uterine infection)',
      onset: '2–3 days postpartum',
      signs: ['Foul-smelling purulent discharge', 'Fever', 'Loss of appetite', 'Lethargy', 'Decreased milk production', 'Loss of maternal instinct'],
      action: 'Call the vet — nursling-safe antibiotics required.',
    },
    {
      condition: 'Eclampsia (milk fever)',
      onset: 'Anytime from delivery to 5 weeks postpartum — PEAK at 2–3 weeks',
      signs: ['Restlessness', 'Panting', 'Muscle tremors', 'Stiff stilted gait', 'Seizures'],
      action: 'GO TO EMERGENCY VET IMMEDIATELY — can be fatal within 30–60 minutes.',
    },
    {
      condition: 'Mastitis (mammary infection)',
      onset: 'Peaks at 3–4 weeks postpartum',
      signs: ['One or more glands swollen, red, hot, hard, and painful', 'Milk is bloody or yellowish', 'Dam may refuse to nurse', 'Puppies crying constantly and not gaining weight'],
      action: 'Call the vet for nursling-safe antibiotics.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// EMERGENCY SCENARIOS
// ─────────────────────────────────────────────────────────────────────────────

export const EMERGENCY_SCENARIOS: EmergencyScenario[] = [
  {
    id: 'stuck_puppy',
    title: 'Puppy stuck in birth canal',
    trigger: 'A puppy is visible at the vulva for more than 10 minutes without progressing despite active straining.',
    urgency: 'go_immediately',
    what_it_looks_like: 'Head, feet, or tail visible but not advancing. The dam strains intensely and may cry out.',
    do_this_now: [
      'Apply lubricant around vulva and visible portion of the puppy.',
      'Wrap exposed portion in a dry towel for grip.',
      'Grasp shoulders, hips, or legs — NEVER the head or umbilical cord.',
      'Apply gentle steady downward traction (45 degrees) WITH contractions.',
      'A slight quarter-turn rotation may free stuck shoulders.',
      'If no movement after a few minutes, STOP.',
    ],
    vet_decision: 'Call vet immediately. Go to emergency vet if traction fails or dam is in extreme distress.',
  },
  {
    id: 'straining_no_puppy',
    title: 'Strong straining — no puppy for 30 minutes',
    trigger: '20–30 minutes of vigorous abdominal contractions with no puppy appearing.',
    urgency: 'go_immediately',
    what_it_looks_like: 'Dam is bearing down hard, may vocalise, clearly distressed with no result.',
    do_this_now: [
      'Check for a visible sac or puppy at the vulva.',
      'If you can see or feel nothing, do not attempt manual intervention.',
      'Keep her calm and note the exact time.',
    ],
    vet_decision: 'Call vet at 20 minutes. GO TO EMERGENCY VET at 30 minutes.',
    small_breed_note: 'JRTs and small terriers have relatively low dystocia rates. If a puppy was X-rayed and is present but not appearing after 30 minutes, emergency C-section is likely needed.',
  },
  {
    id: 'green_before_puppy',
    title: 'Green discharge before first puppy',
    trigger: 'Greenish-black vaginal discharge appears BEFORE the first puppy has been born.',
    urgency: 'go_immediately',
    what_it_looks_like: 'Dark green to black mucous discharge at the vulva, sometimes mixed with fluid.',
    do_this_now: [
      'Note the EXACT time of the discharge.',
      'Watch for a puppy to follow within 15 minutes.',
      'Call the vet immediately — do not wait for 15 minutes to pass before calling.',
    ],
    vet_decision: 'Call the vet immediately. GO TO EMERGENCY VET if no puppy within 15 minutes.',
  },
  {
    id: 'between_puppies_too_long',
    title: 'More than 2–4 hours between puppies',
    trigger: 'More than 2 hours since the last puppy with no active straining. More than 4 hours in a resting phase.',
    urgency: 'call_vet',
    what_it_looks_like: 'Dam may be resting comfortably (normal) or may be lethargic and ignoring existing puppies (stalled).',
    do_this_now: [
      'Check if she is calm and nursing (normal rest) or exhausted and distressed (stalled).',
      'If resting comfortably, monitor closely — allow up to 4 hours.',
      'Offer a small amount of honey on the gums for energy.',
      'If exhausted or green discharge is continuing, act sooner.',
    ],
    vet_decision: 'Call vet at 2 hours if any concerning signs. Go to vet at 4 hours regardless if more puppies are expected.',
  },
  {
    id: 'puppy_not_breathing',
    title: 'Puppy born not breathing',
    trigger: 'A puppy is delivered and is limp, silent, blue/grey, and not breathing.',
    urgency: 'call_vet',
    what_it_looks_like: 'Puppy is limp and floppy, no movement, no crying, blue or grey gums.',
    do_this_now: [
      'Clear the airway immediately — remove sac, suction with bulb syringe (mouth first, then nostrils).',
      'Rub vigorously with a warm dry towel — back, chest, lumbar region, genital area — against the grain of the fur.',
      'Tilt the puppy with the head slightly lower (15–20 degrees maximum). DO NOT SWING.',
      'If still not breathing after 30–60 seconds: cover mouth and nose and deliver very small gentle puffs (15–30 per minute). Watch for slight chest rise.',
      'If no heartbeat: compress chest behind elbows at 150 bpm, 4 compressions to 1 breath.',
      'Continue for minimum 10–15 minutes.',
    ],
    vet_decision: 'Call vet for guidance if no response after 5 minutes. Continue resuscitation while on the phone.',
  },
  {
    id: 'born_in_sac',
    title: 'Puppy born inside unbroken sac — mother not responding',
    trigger: 'Puppy delivered inside intact amniotic membrane and dam ignores it. Approximately 60 seconds before suffocation.',
    urgency: 'call_vet',
    what_it_looks_like: 'A glistening wet bubble containing a puppy — no opening in the membrane.',
    do_this_now: [
      'Tear the membrane over the nose and mouth with your fingertip — pinch and tear.',
      'Peel it backward from the face.',
      'Wipe nostrils and mouth clear.',
      'Suction with bulb syringe.',
      'Rub vigorously with a dry towel until the puppy coughs, sneezes, and begins crying.',
    ],
    vet_decision: 'Not needed unless puppy fails to breathe after sac removal — proceed to full revival protocol.',
  },
  {
    id: 'cord_around_neck',
    title: 'Umbilical cord wrapped around puppy\'s neck',
    trigger: 'Cord is looped around the puppy\'s neck during or after delivery.',
    urgency: 'call_vet',
    what_it_looks_like: 'The umbilical cord is coiled around the puppy\'s neck, potentially compressing.',
    do_this_now: [
      'Try to gently slip the cord over the puppy\'s head.',
      'If too tight to slip, clamp the cord in two places and cut between the clamps immediately.',
      'Then complete the normal cord-tying protocol.',
    ],
    vet_decision: 'Not typically needed if you can free the puppy promptly.',
  },
  {
    id: 'dam_collapses',
    title: 'Mother collapses or becomes unresponsive during labour',
    trigger: 'Dam becomes limp, loses consciousness, or cannot stand.',
    urgency: 'go_immediately',
    what_it_looks_like: 'White or very pale pink gums (shock), unresponsive to voice or touch, rapid shallow breathing.',
    do_this_now: [
      'Check gum colour — white or very pale pink means severe shock.',
      'Keep her airway clear and keep her warm.',
      'Secure any born puppies in the warm holding box.',
      'Do not attempt to deliver puppies from an unconscious dam.',
    ],
    vet_decision: 'GO TO EMERGENCY VET IMMEDIATELY. Bring all puppies.',
  },
  {
    id: 'eclampsia',
    title: 'Eclampsia (milk fever) — muscle tremors, stiff gait, seizures',
    trigger: 'Acute calcium deficiency. Most common 1–5 weeks postpartum. Can be fatal within 30–60 minutes if untreated.',
    urgency: 'go_immediately',
    what_it_looks_like: 'Signs in order: restlessness → panting → drooling → face rubbing → STIFF STILTED GAIT → MUSCLE TREMORS → fever → disorientation → seizures → death.',
    do_this_now: [
      'Remove ALL puppies from the dam immediately — stop all nursing.',
      'Minimise stress and stimulation.',
      'Do NOT attempt to give oral calcium if she is trembling or seizing — aspiration risk.',
      'Transport to emergency vet immediately.',
    ],
    vet_decision: 'GO TO EMERGENCY VET IMMEDIATELY. This is not a "call and wait" situation.',
    small_breed_note: 'Small breeds under 20 kg with large litters (4+) are at the highest risk. JRTs are in the highest-risk category. This is one of the most dangerous postpartum conditions for this breed.',
  },
  {
    id: 'profuse_bleeding',
    title: 'Profuse bright-red bleeding',
    trigger: 'Active flowing or pooling bright-red blood from the vulva. Any bleeding that does not stop within 5 minutes.',
    urgency: 'go_immediately',
    what_it_looks_like: 'Blood soaking towels or pooling beneath the dam. Blood that spurts indicates arterial haemorrhage.',
    do_this_now: [
      'Check gum colour — white or very pale pink means shock.',
      'Keep the dam warm and calm.',
      'Apply gentle pressure with a clean pad if external bleeding is visible.',
      'Do not delay transport.',
    ],
    vet_decision: 'GO TO EMERGENCY VET IMMEDIATELY.',
  },
  {
    id: 'uterine_inertia',
    title: 'Labour stopped — uterine inertia',
    trigger: 'Primary: uterus fails to initiate contractions at all, dam is calm past due date. Secondary: contractions began but exhaustion has stopped them with more puppies remaining.',
    urgency: 'call_vet',
    what_it_looks_like: 'Primary: no contractions despite temperature drop and due date passing. Secondary: dam delivered some puppies but has stopped contracting — exhausted, possibly ignoring puppies.',
    do_this_now: [
      'Note time and last contraction.',
      'Count puppies born vs X-ray count.',
      'If more than 4 hours since last puppy, call the vet.',
    ],
    vet_decision: 'Call immediately. Most dams with complete primary inertia require emergency C-section — oxytocin will not work. Secondary inertia: medical management success rate is 20–40%. Do not delay — stillbirth rates rise significantly when dystocia continues beyond 4.5–6 hours.',
  },
  {
    id: 'retained_placenta',
    title: 'Retained placenta',
    trigger: 'Placenta count does not match puppy count. Signs appear 24–48 hours after delivery.',
    urgency: 'call_vet',
    what_it_looks_like: 'Persistent greenish or foul-smelling discharge, fever, lethargy, poor appetite, reduced maternal behaviour — 24–48 hours after the last puppy.',
    do_this_now: [
      'Keep counting placentas as they arrive throughout labour.',
      'If count doesn\'t match at the end, note it and monitor closely.',
      'If dam develops fever, foul discharge, or lethargy — call immediately.',
    ],
    vet_decision: 'Call vet within 24 hours if count doesn\'t match and dam is otherwise well. Go to vet if dam develops fever, foul discharge, or lethargy.',
  },
  {
    id: 'cleft_palate',
    title: 'Puppy born with cleft palate',
    trigger: 'A gap or groove is visible in the roof of the puppy\'s mouth, OR milk comes from the nose during nursing.',
    urgency: 'call_vet',
    what_it_looks_like: 'Opening along the hard or soft palate visible with a torch. Milk bubbling from both nostrils when the puppy attempts to nurse.',
    do_this_now: [
      'Check every puppy\'s palate at birth — open the mouth and look inside with a small torch.',
      'If milk comes from the nose during nursing, this confirms a cleft palate.',
      'Do NOT attempt bottle feeding — aspiration risk.',
      'Begin tube feeding immediately (every 2–3 hours) and call your vet.',
    ],
    vet_decision: 'Call within 24 hours for tube feeding guidance and surgical prognosis. JRT-sized puppies have reasonable surgical outcomes at 8–12 weeks of age.',
  },
  {
    id: 'mother_rejecting_puppies',
    title: 'Mother attacking or rejecting puppies',
    trigger: 'Dam ignores, pushes away, growls at, or attacks her puppies immediately after birth.',
    urgency: 'call_vet',
    what_it_looks_like: 'Growling, snapping, or biting at puppies when they approach. Walking away or lying on them. Complete indifference.',
    do_this_now: [
      'Remove threatened puppies to the warm holding box immediately.',
      'Check the dam for mastitis, pain, or fever.',
      'Create a calm, quiet environment — remove all visitors.',
      'Attempt supervised reintroduction: stroke the dam, speak softly, place one puppy near her while she is calm.',
      'Rub a towel on the dam then on the puppies to transfer scent.',
      'If aggression continues, muzzle the dam during supervised nursing sessions.',
      'If the dam remains aggressive, commit to hand-rearing with Esbilac every 2–3 hours around the clock.',
    ],
    vet_decision: 'Call for guidance. Vet may administer oxytocin to stimulate maternal behaviour, especially after C-section.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// VET DECISION TREE
// ─────────────────────────────────────────────────────────────────────────────

export const VET_DECISION_TREE = {

  call_vet_situations: [
    'Stage 1 labour exceeding 24 hours without visible straining',
    'Temperature drop occurred more than 24 hours ago with no onset of labour',
    'Weak, intermittent contractions for 1–2 hours with no puppy',
    'More than 2 hours between puppies with the dam resting comfortably',
    'A single episode of moderate bleeding that stops within 5 minutes',
    'Retained placenta suspected but dam is eating, alert, and comfortable',
    'A puppy is not nursing or is losing weight after the first 24 hours',
    'Mild mammary redness or warmth without systemic signs',
    'Umbilical stump redness without discharge or systemic puppy illness',
    'You are unsure whether labour is finished',
    'Puppy born not breathing — no response after 5 minutes of resuscitation',
    'Suspected cleft palate',
  ],

  go_immediately_situations: [
    'Green discharge before the first puppy with no delivery within 15 minutes',
    'Strong straining for 30+ minutes with no puppy',
    'Puppy stuck in birth canal and unresponsive to gentle traction',
    'More than 4 hours between puppies when more are expected',
    'Transverse presentation — sideways puppy, no head or feet visible, only a bulge',
    'Active bright-red haemorrhage that pools or does not stop within 5 minutes',
    'White or very pale gums on the dam — hypovolaemic shock',
    'Dam collapse or loss of consciousness',
    'Eclampsia signs — muscle tremors, stiff gait, seizures, fever above 104°F (40°C)',
    'Fever above 103°F (39.4°C) combined with foul-smelling discharge',
    'Puppy not breathing — no response after 10+ minutes of full resuscitation',
  ],

  information_to_have_ready: [
    'Breed, age, and weight of the dam',
    'Whether this is her first litter',
    'Breeding dates and expected due date',
    'Number of puppies expected from X-ray',
    'Number of puppies born so far and their times of birth',
    'Number of placentas counted',
    'Time the temperature drop was detected',
    'Time Stage 1 began (nesting, panting)',
    'Time Stage 2 began (first visible contraction)',
    'Time of last puppy born',
    'Current status: straining, resting, exhausted, or collapsed?',
    'Colour and amount of discharge',
    'Current temperature of the dam if measured',
    'Status of born puppies: breathing, nursing, active, warm?',
    'Any interventions attempted',
    'Diet and any supplements given during pregnancy',
  ],

  what_to_bring_to_vet: [
    'The dam on a blanket or in her whelping box if portable',
    'All born puppies in a separate warm container — maintained at 85–90°F (29–32°C)',
    'Clean towels and whelping pads',
    'Heating source for puppies',
    'Notebook with full whelping timeline',
    'Dam\'s medical records and vaccination history',
    'Any medications she takes',
    'Bulb syringe and clean towels for any deliveries during transport',
  ],

  transporting_in_active_labour: [
    'Call the emergency vet BEFORE you leave so they can prepare staff and operating room.',
    'If possible, carry her in her whelping box directly to the vehicle.',
    'Born puppies travel in their own warm box — NOT loose with the dam.',
    'Have a second person ride in back to attend to dam and puppies.',
    'Keep her head level, avoid twisting, speak calmly throughout.',
    'If she delivers during transport, the back-seat assistant performs sac removal and stimulation.',
    'Drive steadily — no sudden stops, no unnecessary delay.',
    'If the dam is seizing: minimise stimulation, keep her in a padded area, do NOT put anything in her mouth.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// WHELPING BOX SETUP GUIDE
// ─────────────────────────────────────────────────────────────────────────────

export const WHELPING_BOX_GUIDE = {

  size_by_breed: {
    jrt_5_8kg: {
      interior_cm: { min: 71, max: 87 },
      wall_height_cm: { min: 48, max: 51 },
      calculation_rule: 'Minimum 1.5× the dam\'s body length in each direction. A JRT\'s body length is 46–55 cm, so 71–87 cm interior.',
    },
    small_breed_under_10kg: {
      interior_cm: { min: 71, max: 91 },
      wall_height_cm: 48,
    },
    medium_breed_10_25kg: {
      interior_cm: { min: 91, max: 122 },
      wall_height_cm: 61,
    },
  },

  pig_rails: {
    description: 'Ledges protruding approximately 5 cm from each wall, positioned 5–10 cm above the floor.',
    why_critical: 'Prevents the dam from accidentally crushing puppies against the sides — a leading cause of neonatal death in the first week.',
    when_to_remove: 'Once puppies are mobile at approximately 7–10 days.',
  },

  temperature: {
    target_at_puppy_level_celsius: { min: 29.5, max: 32 },
    target_at_puppy_level_fahrenheit: { min: 85, max: 90 },
    heat_source_position: 'Above ONE end of the box only. Always leave an unheated zone so puppies can crawl away from the warmth. Puppies cannot regulate their own body temperature and will not cry if overheating.',
    never_do: 'Never place an electric heating pad directly under puppies — they cannot move away from it and can be burned.',
    check_frequency: 'Every 4 hours in the first week using a thermometer placed at floor level.',
  },

  introduce_to_dam: 'Set up the box 10–14 days before the due date for a first-time mother (7 days minimum for experienced dams). Let her sleep in it. Familiarity before labour reduces anxiety and reduces the risk of her choosing to whelp somewhere unsuitable.',

  location: 'Quiet, low-traffic, draft-free room away from air vents, windows, and other pets. Room temperature approximately 21°C (70°F).',

  bedding: 'Line the floor with newspaper topped by waterproof whelping pads. Have at least 3 spare sets ready. Avoid loose blankets or towels during the actual birth — newborns can become trapped beneath fabric.',
};

// ─────────────────────────────────────────────────────────────────────────────
// CALENDAR EVENTS — Pre-birth preparation (Days -14 to 0)
// Used by schedule-engine to populate calendar when status = 'pregnant'
// ─────────────────────────────────────────────────────────────────────────────

export const WHELPING_CALENDAR_EVENTS: CalendarEventTemplate[] = [
  {
    id_suffix: 'xray_puppy_count',
    day_offset: -18,
    title: '🏥 Book vet: X-ray for puppy count',
    description: 'An X-ray from Day 45 of pregnancy gives an accurate puppy count. This is non-negotiable — you need to know how many puppies to expect.',
    detail: 'Call your vet today and book an abdominal X-ray for around Day 55–58 of pregnancy. This tells you exactly how many puppies to expect.\n\n**Why it\'s critical:** Without a count, you cannot know when labour is finished. A puppy retained inside the uterus after birth is a life-threatening emergency that you will not detect without this information.\n\n**What to tell the vet:** "I need a puppy count X-ray for my pregnant dog. She is due around [date]."',
    category: 'health',
    priority: 'critical',
    is_free: true,
    call_vet_if: 'You cannot get an appointment within the next 5 days',
    emergency_contact_recommended: false,
  },
  {
    id_suffix: 'assemble_whelping_kit',
    day_offset: -14,
    title: 'Assemble your whelping kit today',
    description: 'Every item must be ready BEFORE labour starts. You will not have time to shop at 3am.',
    detail: 'Go through the complete whelping kit checklist and confirm you have every critical item.\n\n**Critical items you might not have:** digital rectal thermometer, hemostats, bulb syringe, unwaxed dental floss, iodine solution, oral calcium gel, puppy milk replacer, gram scale, coloured yarn for puppy ID.\n\n**Store everything in one container beside the whelping box.** Write your vet\'s phone number and the nearest 24-hour emergency vet number on paper and tape it to the wall above the whelping box.',
    category: 'environment',
    priority: 'critical',
    is_free: true,
  },
  {
    id_suffix: 'whelping_box_setup',
    day_offset: -14,
    title: 'Set up the whelping box',
    description: 'Set up now so she has 2 weeks to get comfortable with it before labour begins.',
    detail: 'Install the whelping box in a quiet room today.\n\n**For a JRT (5–8 kg):** 71 × 71 cm minimum interior, 48 cm walls. Install pig rails (ledges 5 cm from the floor, 5–10 cm above floor level) — these prevent her from crushing puppies against the walls.\n\n**Temperature:** Hang a heat lamp above ONE end of the box only. Target 85–90°F (29.5–32°C) at floor level in Week 1. Place a thermometer at floor level to verify.\n\n**Bedding:** Newspaper topped by waterproof whelping pads. Have at least 3 spare sets.\n\n**Introduce her now:** Let her sleep in the box. A dam that knows her whelping box labours more calmly.',
    category: 'environment',
    priority: 'critical',
    is_free: true,
  },
  {
    id_suffix: 'temp_monitoring_start',
    day_offset: -8,
    title: 'Start taking her temperature twice daily',
    description: 'Morning and evening from today. The drop below 99°F (37.2°C) means labour within 12–24 hours.',
    detail: 'Begin taking her rectal temperature every morning and evening at the same times.\n\n**How:** Digital rectal thermometer, insert 1 inch (2.5 cm), hold until it beeps (30–60 seconds). Record the reading with time and date in a notebook.\n\n**Normal range:** 100–102.5°F (37.8–39.2°C).\n\n**The pre-labour drop:** Temperature falls below 99°F (37.2°C) in the 12–24 hours before labour. Confirm with a second reading. When you see the drop: prepare everything, alert your vet, do not leave her alone.',
    category: 'health',
    priority: 'critical',
    is_free: true,
    call_vet_if: 'Temperature drops below 99°F (37.2°C) — note the time and alert your vet',
    emergency_contact_recommended: false,
  },
  {
    id_suffix: 'prep_vehicle',
    day_offset: -7,
    title: 'Fill your car with fuel — keep it full until after whelping',
    description: 'Emergency vet visits happen at 3am. A full tank is one less problem.',
    detail: 'Fill your vehicle with fuel today and keep it above half-full until the puppies are at least 2 weeks old. Confirm the address of your nearest 24-hour emergency veterinary hospital. Drive there now if you have never been — do not rely on GPS in a real emergency.',
    category: 'environment',
    priority: 'high',
    is_free: true,
  },
  {
    id_suffix: 'pre_whelp_vet_discussion',
    day_offset: -7,
    title: 'Call your vet — discuss whelping plan',
    description: 'Your vet needs to know you are planning a home birth and needs to be available for emergencies.',
    detail: 'Call your vet today and have this conversation:\n\n1. Tell them you are planning to whelp at home\n2. Give them the breed, dam\'s age and weight, litter number, number of puppies expected\n3. Ask: "Can I call you at any hour during labour?"\n4. Ask: "What signs mean I should go to the emergency vet immediately?"\n5. Confirm whether they offer out-of-hours cover or whether you should go directly to an emergency hospital\n6. Get the number of the nearest 24-hour emergency vet and save it on your phone',
    category: 'health',
    priority: 'critical',
    is_free: true,
  },
  {
    id_suffix: 'holding_box_setup',
    day_offset: -3,
    title: 'Set up the puppy holding box',
    description: 'Warm container for earlier-born puppies while birth continues.',
    detail: 'Prepare a small cardboard box lined with towels over a warm (not hot) water bottle or Snuggle Safe disc. Target temperature: 85–90°F (29–32°C) inside the box.\n\n**This is not optional.** When Puppy #1 is born and the dam is still delivering Puppies #2, #3, and #4, Puppy #1 needs a safe warm place. Newborns lose body heat within minutes and a hypothermic puppy cannot nurse or digest food.',
    category: 'environment',
    priority: 'critical',
    is_free: true,
  },
  {
    id_suffix: 'do_not_leave_alone',
    day_offset: -3,
    title: 'Do not leave her alone from today',
    description: 'Labour can begin any time now. Check on her every 2 hours.',
    detail: 'From today until the puppies arrive, check on her at least every 2 hours — including through the night. Set an alarm if needed.\n\n**Signs labour is starting:** restlessness, panting, refusing food, shivering, intense nesting, licking her vulva repeatedly, visible contractions.\n\n**Emergency trigger:** If she has been pushing strongly for 30 minutes without a puppy, or if green discharge appears before any puppy is born — call the vet immediately.',
    category: 'health',
    priority: 'critical',
    is_free: true,
    call_vet_if: '30 minutes of strong pushing without a puppy, OR green discharge before any puppy is born',
    emergency_contact_recommended: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LIBRARY SECTIONS — for the Birth Guide tab in the app
// ─────────────────────────────────────────────────────────────────────────────

export const BIRTH_GUIDE_LIBRARY_SECTIONS: LibrarySection[] = [
  {
    id: 'birth_preparation',
    title: 'Preparing for the Birth',
    emoji: '📦',
    summary: 'What to buy, how to set up the whelping box, and how to track her temperature in the 2 weeks before birth.',
    content: 'See WHELPING_KIT, WHELPING_BOX_GUIDE, and TEMPERATURE_GUIDE for full content.',
    is_free: true,
    tags: ['preparation', 'whelping_box', 'kit', 'temperature'],
  },
  {
    id: 'stage_1_labour',
    title: 'Stage 1: The Waiting Phase',
    emoji: '⏳',
    summary: 'What Stage 1 labour looks like, how long it lasts, and when you should be worried.',
    content: 'See STAGE_1_GUIDE for full content.',
    is_free: true,
    tags: ['stage_1', 'labour', 'panting', 'nesting'],
  },
  {
    id: 'stage_2_labour',
    title: 'Stage 2: Puppies Arriving',
    emoji: '🐣',
    summary: 'What contractions look like, the different puppy positions, how to help a stuck puppy, and discharge colours.',
    content: 'See STAGE_2_GUIDE for full content.',
    is_free: true,
    tags: ['stage_2', 'delivery', 'contractions', 'stuck_puppy'],
  },
  {
    id: 'first_ten_minutes',
    title: 'The First 10 Minutes After Each Puppy',
    emoji: '👶',
    summary: 'How to break the sac, stimulate breathing, revive a non-breathing puppy, and get the puppy nursing. Includes the 2025 updated resuscitation protocol.',
    content: 'See NEWBORN_PROTOCOL for full content.',
    is_free: true,
    tags: ['newborn', 'resuscitation', 'sac', 'breathing', 'colostrum'],
  },
  {
    id: 'umbilical_cord',
    title: 'Umbilical Cord Care',
    emoji: '🔗',
    summary: 'How and when to cut the cord, how to tie it off, iodine application, and what a healing cord looks like day by day.',
    content: 'See UMBILICAL_CORD_PROTOCOL for full content.',
    is_free: true,
    tags: ['umbilical_cord', 'cord_care', 'iodine', 'infection'],
  },
  {
    id: 'placenta_management',
    title: 'Managing Placentas',
    emoji: '🔢',
    summary: 'Why placenta counting is non-negotiable, what a retained placenta looks like, and what to do about it.',
    content: 'See PLACENTA_GUIDE for full content.',
    is_free: true,
    tags: ['placenta', 'retained_placenta', 'counting', 'metritis'],
  },
  {
    id: 'after_whelping',
    title: 'After All Puppies Are Born',
    emoji: '✅',
    summary: 'How to confirm labour is finished, what to check on the mother, and what to watch for in the first 24 hours.',
    content: 'See POST_WHELPING_GUIDE for full content.',
    is_free: true,
    tags: ['post_whelping', 'lochia', 'dam_care', 'nursing_check'],
  },
  {
    id: 'emergency_guide',
    title: '🚨 Emergency Guide',
    emoji: '🚨',
    summary: '14 emergency situations with exact time thresholds and step-by-step instructions. Always free, always accessible.',
    content: 'See EMERGENCY_SCENARIOS and VET_DECISION_TREE for full content.',
    is_free: true,
    tags: ['emergency', 'vet', 'critical', 'dystocia', 'eclampsia'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// THREE NUMBERS TO MEMORISE
// Display prominently in the Birth Guide header and Emergency Guide
// ─────────────────────────────────────────────────────────────────────────────

export const THREE_NUMBERS_TO_MEMORISE = {
  fifteen_minutes: {
    number: 15,
    unit: 'minutes',
    rule: 'If green discharge appears BEFORE any puppy is born, a live puppy must follow within 15 minutes. If it doesn\'t — emergency vet immediately.',
  },
  thirty_minutes: {
    number: 30,
    unit: 'minutes',
    rule: 'If she has been pushing hard for 30 minutes with no puppy — emergency vet immediately.',
  },
  ten_to_fifteen_minutes: {
    number: '10–15',
    unit: 'minutes',
    rule: 'Minimum resuscitation time for a non-breathing puppy before considering it non-viable. Do not give up before 10 minutes.',
  },
};
