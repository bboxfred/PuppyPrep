/**
 * INFO BASE: CHIHUAHUA
 * Applies to: Chihuahua (smooth coat and long coat)
 * Info base ID: 'chihuahua'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'chihuahua'.
 *
 * Sources: Chihuahua Club of America, Merck Vet Manual,
 * Cornell CVM, VCA Animal Hospitals, AKC,
 * Metropolitan Veterinary Associates (neonatal hypoglycemia protocol),
 * Animal Care Clinic (toy breed hypoglycemia).
 *
 * ⚠️ CRITICAL FLAGS:
 * - HIGHEST hypoglycemia risk of all breeds
 * - ~30% C-section rate
 * - Feeding every 90 MINUTES in Week 1 (not 2 hours)
 * - French 3–5 tube (smallest available)
 * - Whelping box: 32°C / 90°F Week 1
 * - Hydrocephalus risk
 * - Atlantoaxial instability — NEVER use neck collar
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const CHIHUAHUA_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 1, max: 4, typical: 3 },
  newborn_weight_grams: { min: 70, max: 150, typical: 110 },
  adult_weight_kg: {
    male:   { min: 1.5, max: 3.0 },
    female: { min: 1.5, max: 3.0 },
  },
  size_category: 'toy' as const,
  hypoglycemia_risk: 'high' as const,
  singleton_risk: true,
  csection_rate_percent: 30,
  brachycephalic: false,  // Apple-head type has some brachy features; not classified fully

  weight_targets: {
    birth:  { min: 70,  max: 150,  typical: 110  },
    day_7:  { min: 140, max: 250,  typical: 195  },
    day_14: { min: 210, max: 340,  typical: 275  },
    week_3: { min: 300, max: 500,  typical: 400  },
    week_4: { min: 420, max: 700,  typical: 560  },
    week_6: { min: 700, max: 1100, typical: 900  },
    week_8: { min: 900, max: 1500, typical: 1200 },
  },

  daily_gain_minimum_grams: 5,
  daily_gain_target_grams: 10,
  daily_gain_percent_bodyweight: 10,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0,
  },

  // ⚠️ Chihuahua formula volumes — VERY SMALL — do not exceed stomach capacity
  formula_volumes_per_feeding_ml: {
    week_1: { min: 1.0, max: 2.0, per_100g_body_weight: 1.5 },
    week_2: { min: 1.5, max: 3.0, per_100g_body_weight: 1.8 },
    week_3: { min: 2.5, max: 4.5, per_100g_body_weight: 2.0 },
    week_4: { min: 4.0, max: 6.5, per_100g_body_weight: 2.5 },
  },
  // ⚠️ WEEK 1: every 90 MINUTES — not 2 hours
  feeding_frequency_hours: {
    week_1: 1.5,    // 90 MINUTES — critical for hypoglycemia prevention
    week_2: 2,
    week_3: 2.5,
    week_4: 3,
  },

  tube_size_french: 3.5,    // French 3–3.5 for smallest Chihuahuas; 5 for larger pups
  max_stomach_capacity_ml_per_100g: 4,

  // ⚠️ TOY BREED: Higher whelping box temperature required
  whelping_box_temp_celsius: {
    week_1:      { min: 30, max: 32,   ideal: 32   },  // 32°C / 90°F
    week_2:      { min: 28, max: 30,   ideal: 29   },
    week_3:      { min: 26, max: 28,   ideal: 27   },
    week_4_plus: { min: 23, max: 26,   ideal: 24   },
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

export const CHIHUAHUA_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg — dose CAREFULLY at this weight',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Chihuahua puppies. At this size, precise dosing is critical — a 100g puppy needs only 1 mg of pyrantel. Use a 1 ml syringe for accuracy. Never estimate.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Weigh each puppy on the day — they have grown but are still tiny. Use current weight.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment — Panacur for 3 days. At this age Chihuahua puppies weigh approximately 400–600g. Calculate the dose precisely.',
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
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth. Calculate the dose precisely for a small Chihuahua dam — a 2 kg dam needs very small volumes.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. CRITICAL for tiny Chihuahuas: feed the puppy within 1–2 hours BEFORE the vaccination to prevent hypoglycemic stress response. Keep the puppy warm before and after. Have Karo syrup on hand at the clinic in case of stress-induced hypoglycemia.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'Second vaccination. Note: Lepto vaccine is given separately for toy breeds — discuss timing with your vet. Do not combine multiple vaccines at one visit for a Chihuahua under 1 kg.',
      vet_required: true,
      critical: true,
    },
    {
      week: 14,
      label: 'Third vaccination',
      vaccine: 'DHPP #3 + Rabies',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'],
      plain_english: 'Third vaccination series plus Rabies. Feed before the visit. Ask vet to monitor for 20–30 minutes post-vaccination for reaction.',
      vet_required: true,
      critical: true,
    },
    {
      week: 18,
      label: 'CRITICAL: Final parvo booster',
      vaccine: 'DHPP #4 (final)',
      covers: ['Distemper', 'Parvovirus'],
      plain_english: 'Do not skip this final booster. Ensures complete parvo protection.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check — check for retained singleton',
      urgency: 'within_24_hours',
      plain_english: 'With small litters of 1–3 puppies, confirm all have been delivered. Singleton or dual pregnancies can leave a retained foetus that is less obvious to detect. Vet check within 24 hours is especially important for Chihuahua dams.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm every Chihuahua puppy is gaining at least 5g per day. Any puppy that has not doubled its birth weight by Day 10 needs supplemental Esbilac feeding.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + vaccinations',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. Ask vet to check: fontanelle size (molera > 1 cm with neurological signs = hydrocephalus), heart auscultation (pulmonic stenosis is #1 Chihuahua cardiac defect), bile acid test if any puppy seems stunted (PSS screening).',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. Inform new owners: NEVER use a neck collar (atlantoaxial instability risk — use harness only for life), hypoglycemia protocol must be given to new owners in writing, dental care from 8 weeks, no rough handling by children.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'Fontanelle / Hydrocephalus assessment',
      timing: '6–8 weeks and at every vet visit',
      method: 'Clinical exam + transfontal ultrasound if symptomatic',
      plain_english: 'Chihuahuas commonly have a molera (open fontanelle) — this is normal for the breed. However, a molera larger than 1 cm combined with neurological signs (domed skull, large head, seizures, visual impairment, failure to thrive) indicates hydrocephalus. Ultrasound through the open fontanelle can confirm.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Pulmonic stenosis (cardiac)',
      timing: 'Auscultation at 6–8 weeks; echo if murmur detected',
      method: 'Cardiac auscultation by vet at first puppy visit',
      plain_english: 'Pulmonic stenosis is the most common congenital cardiac defect in Chihuahuas. A heart murmur on the right side at the first puppy visit warrants echocardiogram referral.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Bite acid test — PSS screening',
      timing: 'At 8–16 weeks if any puppy shows stunted growth, post-meal lethargy, or abnormal behaviour',
      method: 'Pre- and post-prandial bile acid stimulation test',
      plain_english: 'Portosystemic shunt (PSS/liver shunt) causes abnormal behaviour after eating, stunted growth, and seizures. Screening recommended for any Chihuahua that seems unusually small or lethargic after meals.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const CHIHUAHUA_PREGNANCY_EVENTS = [
  {
    id_suffix: 'chi_preg_csection_plan',
    day_offset: -21,
    title: '⚠️ C-section planning: ~30% of Chihuahuas require one',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Confirm surgical backup for your Chihuahua\'s whelping — not all whelp naturally.',
    detail: 'Approximately 30% of Chihuahua litters require C-section. Common reasons:\n- Large singleton puppy relative to the dam\'s small pelvis\n- Uterine inertia (contractions do not start or stop prematurely)\n- Malpresentation\n\nAction now:\n1. Call your vet this week — confirm they can perform emergency C-section\n2. If your vet is not available 24/7: identify the nearest 24-hour surgical centre\n3. Ask your vet: "Given this dam\'s size and this litter size, should we plan an elective C-section?"\n\nFor singleton Chihuahua pregnancies: a single oversized puppy is the most common cause of fatal dystocia in this breed. Elective C-section at Day 63 is often the right decision.',
    call_vet_if: 'No puppy within 2 hours of strong active contractions',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'chi_preg_singleton_risk',
    day_offset: -7,
    title: 'Singleton risk: Confirm puppy count via X-ray',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Chihuahuas with a single large puppy are at highest dystocia risk.',
    detail: 'Pre-whelping X-ray at Day 55–58 is critical for Chihuahuas.\n\nFor singleton Chihuahua pregnancies specifically:\n- A single puppy grows larger than it would in a litter\n- The singleton\'s size relative to the dam\'s tiny pelvis creates a high obstruction risk\n- The single puppy also does not produce enough cortisol to trigger reliable labour\n\nIf the X-ray shows a singleton: discuss elective C-section at Day 63 with your vet. The majority of singleton Chihuahua births end in emergency C-section anyway.',
  },
  {
    id_suffix: 'chi_preg_supplies',
    day_offset: -14,
    title: 'Toy breed supplies: Order now',
    category: 'environment' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Chihuahua neonates require specific supplies not needed for larger breeds.',
    detail: 'Order before birth:\n- French 3.5 feeding tube (very small — confirm this size, not the standard French 8)\n- 1 cc syringes × 20 (for precise small volumes)\n- Karo light corn syrup — keep on the counter, not in the cupboard\n- Digital scale accurate to 1 gram\n- Small whelping box (60 × 60 cm is appropriate)\n- Heating pad on low setting + digital thermometer\n- Small animal incubator or warming box set to 32°C\n- Esbilac puppy milk replacer\n- Soft absorbent cloths for warming\n\nWith tiny Chihuahua puppies: precise temperature control and precise feeding volumes are the difference between life and death. Standard "puppy supplies" are too large. Order specifically for toy breeds.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS — CRITICAL FOR CHIHUAHUA
// ─────────────────────────────────────────────────────────────────────────────

export const CHIHUAHUA_NEONATAL_EVENTS = [
  {
    id_suffix: 'chi_neo_hypoglycemia_protocol',
    day_offset: 0,
    title: '⚠️ MEMORISE THIS: Chihuahua hypoglycemia emergency protocol',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Hypoglycemia is the #1 killer of Chihuahua neonates. You must know this protocol before birth.',
    detail: 'HYPOGLYCEMIA EMERGENCY PROTOCOL FOR CHIHUAHUA PUPPIES\n\nSigns (act immediately at first sign — do not wait for all signs to appear):\n- Lethargy, weakness, not nursing\n- Muscle tremors or twitching\n- Pale, grey, or white gums\n- Seizure\n- Unresponsive\n\nSTEP 1 — WARM FIRST (non-negotiable):\nA cold puppy cannot absorb glucose. Before anything else, wrap the puppy in warm towels and hold against your skin. Goal: rectal temperature above 35°C / 95°F. Warming takes priority over feeding when the puppy is cold.\n\nSTEP 2 — GLUCOSE IMMEDIATELY:\nRub 0.5–1 ml of Karo corn syrup, honey, or sugar water directly on the gums and under the tongue. Do NOT pour it down the throat — aspiration risk. The gum mucosa absorbs glucose without swallowing.\n\nFor a puppy that cannot swallow: place a small amount of Karo rectally as a last resort.\n\nSTEP 3 — DO NOT STOP:\nRepeat glucose every 15–20 minutes until the puppy is responsive, then feed a small amount of warmed Esbilac.\n\nSTEP 4 — EMERGENCY VET WITHIN 30 MINUTES:\nEven if the puppy recovers, go to the vet. Recurrence is common. Underlying causes (sepsis, PSS, chilling) need addressing.\n\nDO NOT WAIT TO SEE IF THEY IMPROVE ON THEIR OWN. CHIHUAHUA NEONATES DIE FROM HYPOGLYCEMIA WITHIN HOURS.',
    call_vet_if: 'Any puppy shows lethargy, tremors, pale gums, or seizure — EMERGENCY',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'chi_neo_feeding_schedule_90min',
    day_offset: 0,
    title: '⚠️ WEEK 1: Feed every 90 MINUTES — not 2 hours',
    category: 'nutrition' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Chihuahua neonates cannot store glycogen. They must be fed every 90 minutes in Week 1.',
    detail: 'Standard puppy feeding intervals of 2 hours are NOT safe for Chihuahua neonates in Week 1.\n\nChihuahuas have:\n- Extremely low body fat reserves\n- Immature glycogen storage\n- High surface area to volume ratio (lose heat faster)\n- Tiny stomach capacity\n\nThis combination means blood glucose drops dangerously within 90 minutes of the last feed.\n\nWeek 1 feeding schedule:\n- Every 90 minutes, around the clock, 24 hours a day\n- Volume: 1.5 ml per 100g body weight per feed\n- Formula warmed to 38°C / 100°F\n- NEVER feed a cold puppy — warm first\n\nFrom Week 2: every 2 hours\nFrom Week 3: every 2.5 hours\nFrom Week 4: every 3 hours\n\nThis is not optional. A Chihuahua puppy fed every 2 hours in Week 1 WILL develop hypoglycemia.',
  },
  {
    id_suffix: 'chi_neo_colostrum_critical',
    day_offset: 0,
    title: 'Day 0: Colostrum within 12 hours — HIGH priority for small litters',
    category: 'nutrition' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Chihuahua mothers with 1–3 puppies must nurse every puppy within 12 hours.',
    detail: 'With only 1–3 puppies, competition for teats is not the issue — ensuring each puppy actually latches and swallows is.\n\nChihuahua puppies are tiny and can be poor nursers in the first hours:\n1. Place each puppy on a nipple immediately after cleaning\n2. Hold the puppy in position for 10–15 minutes\n3. If not latching: express a drop of colostrum and touch it to the puppy\'s lips\n4. If still not latching after 30 minutes: tube-feed 1 ml of expressed colostrum immediately\n\nColostrum window: 12–16 hours. After this, gut wall closes and passive immunity cannot be absorbed. A Chihuahua puppy that misses colostrum has severely compromised immunity.',
    call_vet_if: 'Any puppy has not nursed within 2 hours of birth',
    emergency_contact_recommended: false,
  },
  {
    id_suffix: 'chi_neo_weight_daily',
    day_offset: 1,
    title: 'Daily weighing: Minimum twice daily in Week 1',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Chihuahua puppies must be weighed twice daily — a 5g loss in a 100g puppy is life-threatening.',
    detail: 'A 5g weight loss in a 100g Chihuahua puppy represents a 5% loss — equivalent to major weight loss in a human infant.\n\nWeigh every puppy:\n- Before first morning feeding\n- Before last evening feeding\n- Record with ID colour\n\nTargets:\n- Birth: 70–150g\n- Should not lose weight after Day 2\n- Should gain minimum 5g per day from Day 3\n- Should double birth weight by Day 10\n\n🔴 Action triggers:\n- Any puppy below birth weight at Day 3 = add supplemental Esbilac\n- Any puppy that loses weight on two consecutive measurements = emergency\n- Any puppy more than 20% lighter than a littermate = priority feeding placement',
    call_vet_if: 'Any puppy loses weight on two consecutive weighings, or is still below birth weight at Day 4',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NUTRITION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const CHIHUAHUA_NUTRITION_EVENTS = [
  {
    id_suffix: 'chi_nutrition_weaning',
    day_offset: 21,
    title: 'Begin weaning at Week 3',
    category: 'nutrition' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Chihuahua puppies begin solid food at 3 weeks. Small portions only.',
    detail: 'Begin weaning at Day 21–24:\n\n1. Very thin gruel — high-quality small-breed puppy kibble soaked until completely soft, blended smooth\n2. Amount: a teaspoon at a time in a tiny shallow dish\n3. Offer 4× daily between nursing sessions\n4. Continue nursing on demand throughout weaning\n\nCritical for Chihuahuas:\n- Never allow the dish to sit out more than 20 minutes (bacterial risk for tiny pups)\n- Introduce small-breed formula only — standard kibble pieces are too large\n- Continue feeding every 2–2.5 hours even during weaning week\n- Any puppy that refuses solid food: continue tube or syringe Esbilac\n\nWeaning typically completes by Week 7–8 for Chihuahuas.',
  },
  {
    id_suffix: 'chi_nutrition_new_owner_hypoglycemia',
    day_offset: 49,
    title: 'Week 7: Give new owners written hypoglycemia protocol',
    category: 'nutrition' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Every Chihuahua new owner must receive written hypoglycemia instructions before they take the puppy home.',
    detail: 'Before any Chihuahua puppy goes to a new home, give the new owner this information IN WRITING:\n\n1. Feed the puppy at least 4 times per day until 12 weeks, then 3 times per day until 6 months\n2. Never let the puppy go more than 4 hours without food\n3. Keep Karo corn syrup or Nutri-Cal paste in the house at ALL times\n4. Know the signs: lethargy, trembling, pale gums, seizure\n5. Emergency response: rub Karo on gums immediately, warm puppy, emergency vet within 30 minutes\n6. Trigger events that cause hypoglycemia: stress, travel, cold, illness, rough play, missing a meal\n\nA Chihuahua puppy that goes to a new home without this knowledge frequently dies in the first week. This is your responsibility as a breeder to ensure.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const CHIHUAHUA_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'chi_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Gentle, careful handling',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Chihuahua socialisation requires the same breadth as large breeds but with physical care.',
    detail: 'Chihuahuas are tiny — but they need the same socialization as large breeds. The difference is physical handling care.\n\nWeek 3 handling rules:\n- Always support the entire body — never dangle by the middle\n- Handle from a seated position or very close to the ground\n- Avoid sudden movements and loud voices near puppies\n- 5–10 minutes per puppy per day\n- Touch: paws, ears, mouth, belly — essential for dental care and nail trims as adults\n\nChihuahuas that are not extensively handled become hand-shy, difficult to groom, and may bite from fear. The breed\'s size means this is often excused — it shouldn\'t be.',
  },
  {
    id_suffix: 'chi_social_week4_big_dog_exposure',
    day_offset: 28,
    title: 'Socialization Week 4: Expose to large dogs safely',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Chihuahuas that never meet large dogs as puppies often become fear-aggressive toward them as adults.',
    detail: 'One of the most important socialisation experiences for a Chihuahua: safe, positive exposure to large dogs.\n\nProtocol:\n- Use only known, calm, well-socialised large dogs\n- Begin with large dog at a distance (3–4 metres) while Chihuahua puppy is on the ground\n- Reward Chihuahua for calm observation\n- Gradually decrease distance as comfort increases\n- Never allow large dogs to put face near the puppy in Week 4 — too overwhelming\n\nA Chihuahua that goes to a new home having never met a large dog will bark, lunge, and snap at every large dog it encounters for life — a behaviour pattern that endangers it (reactive large dogs can kill a Chihuahua). This is largely preventable with early positive exposure.',
  },
  {
    id_suffix: 'chi_social_week5_prevention_small_dog_syndrome',
    day_offset: 35,
    title: 'Socialization Week 5: Prevent Small Dog Syndrome',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Small Dog Syndrome is a training failure, not a breed trait. Prevent it now.',
    detail: '"Small Dog Syndrome" describes a Chihuahua that bosses its owners, snaps when moved, guards resources aggressively, and cannot be handled.\n\nThis is entirely created by how the puppy is treated — not a breed characteristic.\n\nFrom Week 5, all handlers must:\n1. Not carry the puppy as the default — let it walk\n2. Not allow snapping to work (if puppy snaps when handled, do not put it down)\n3. Apply the same rules as large dogs: sit before meals, wait before going through doors\n4. Never give a puppy its way because of growling — this teaches growling works\n\nInform new owners urgently: a Chihuahua that bites because it is tiny is still a dog that bites. The same standards apply. A Chihuahua with proper training is a joy. One without training is a liability.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const CHIHUAHUA_TRAINING_EVENTS = [
  {
    id_suffix: 'chi_training_harness_only',
    day_offset: 35,
    title: 'HARNESS ONLY — never a neck collar for Chihuahuas',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Atlantoaxial instability and tracheal collapse make neck collars dangerous for Chihuahuas for life.',
    detail: 'Chihuahuas should NEVER wear a neck collar for walking or restraint. Two reasons:\n\n1. Atlantoaxial instability: the joint between C1 and C2 vertebrae is unstable in some Chihuahuas. A sudden pull on a collar can cause spinal cord compression — paralysis or death.\n\n2. Tracheal collapse: Chihuahuas are prone to tracheal collapse. Any pressure on the trachea accelerates this.\n\nFrom Week 5 onward: introduce a soft H-shaped or Y-shaped harness. Allow puppies to wear it for 10-minute supervised sessions. This makes harness acceptance normal before going to new homes.\n\nInform every new owner IN WRITING: this dog must never wear a neck collar. Harness only, for life. Not negotiable.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const CHIHUAHUA_HEALTH_RISKS = [
  {
    condition: 'Hypoglycemia (Low Blood Sugar)',
    timing: 'Birth through 12 weeks — highest risk; can occur throughout life in tiny adults',
    risk_level: 'critical' as const,
    signs: ['Lethargy', 'Trembling or shaking', 'Pale or white gums', 'Seizure', 'Unresponsive'],
    immediate_action: 'WARM FIRST. Then rub Karo syrup on gums. Emergency vet within 30 minutes even if puppy recovers.',
    vet_decision: 'Emergency vet within 30 minutes of any hypoglycemic episode.',
    note: 'Prevent by feeding every 90 minutes in Week 1, every 2 hours in Week 2, 4 meals per day until 12 weeks. Never fast a Chihuahua under 4 months for more than 4 hours.',
  },
  {
    condition: 'Hydrocephalus',
    timing: 'Congenital — signs emerge from 4–12 weeks',
    risk_level: 'high' as const,
    signs: ['Dome-shaped skull', 'Very large open fontanelle (>1 cm)', 'Seizures', 'Visual impairment', 'Abnormal behaviour', 'Failure to develop normally'],
    immediate_action: 'Urgent vet referral for diagnosis (transfontal ultrasound). Management with omeprazole, prednisone, furosemide. Severe cases may require VP shunt surgery.',
    vet_decision: 'Urgent vet within a few days. Seizures = emergency vet immediately.',
    note: 'Molera (open fontanelle) alone is NORMAL in Chihuahuas. Only concerning if >1 cm AND neurological signs are present.',
  },
  {
    condition: 'Atlantoaxial Instability',
    timing: 'Congenital — can cause symptoms any time from puppyhood',
    risk_level: 'critical' as const,
    signs: ['Neck pain, yelping when head moved', 'Reluctance to move head', 'Sudden weakness or paralysis', 'Abnormal gait'],
    immediate_action: 'EMERGENCY VET IMMEDIATELY. Do not manipulate the neck. Support the head and neck during transport.',
    vet_decision: 'EMERGENCY — any suspected spinal cord involvement.',
    note: 'Harness only, never collar. No rough handling of head/neck. No jumping from heights.',
  },
  {
    condition: 'Pulmonic Stenosis',
    timing: 'Congenital — detectable at first puppy visit',
    risk_level: 'high' as const,
    signs: ['Murmur on right side of chest at puppy check', 'Exercise intolerance as puppy grows', 'Fainting with activity'],
    immediate_action: 'Refer for echocardiogram if murmur Grade 3+ detected at puppy wellness visit.',
    vet_decision: 'Call vet for cardiac referral. Not an emergency unless dog is fainting.',
  },
];
