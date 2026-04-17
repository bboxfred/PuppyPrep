/**
 * INFO BASE: JRT GROUP
 * Applies to: Jack Russell Terrier, Parson Russell Terrier, Russell Terrier
 * Info base ID: 'jrt'
 *
 * ⚠️ ISOLATION RULE: This file is ONLY imported by the schedule engine
 * when breed.info_base_id === 'jrt'. It must NEVER be mixed with data
 * from other info bases. Each breed that uses this base may have
 * small overrides — see BREED_OVERRIDES at the bottom.
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const JRT_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 4, max: 8, typical: 5 },
  newborn_weight_grams: { min: 180, max: 220, typical: 200 },
  adult_weight_kg: { min: 5.9, max: 7.7 },
  size_category: 'small' as const,
  hypoglycemia_risk: 'high' as const,

  // Growth milestones (grams)
  weight_targets: {
    birth:   { min: 180, max: 220, typical: 200 },
    day_7:   { min: 280, max: 380, typical: 330 },
    day_14:  { min: 360, max: 440, typical: 400 }, // doubled
    week_3:  { min: 540, max: 660, typical: 600 }, // tripled
    week_4:  { min: 450, max: 680, typical: 560 }, // in grams — ~1.2 lbs
    week_6:  { min: 900, max: 1400, typical: 1150 },
    week_8:  { min: 1350, max: 1800, typical: 1550 },
  },

  // Minimum daily weight gain
  daily_gain_minimum_grams: 10,
  daily_gain_target_grams: 20,

  // Feeding — dam during lactation
  dam_lactation_calories_multiplier: { week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.5 },

  // Formula volumes for JRT-sized puppies (mL per feeding)
  formula_volumes_per_feeding_ml: {
    week_1: { min: 2, max: 3, per_100g_body_weight: 1.0 },
    week_2: { min: 3, max: 5, per_100g_body_weight: 1.3 },
    week_3: { min: 5, max: 8, per_100g_body_weight: 1.5 },
    week_4: { min: 8, max: 12, per_100g_body_weight: 2.0 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  // Tube feeding — gavage
  tube_size_french: 5, // French 5 for standard JRT (~200g newborn)
  max_stomach_capacity_ml_per_100g: 4,

  // Temperature requirements
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

  // Whelping box sizing
  whelping_box_cm: {
    small_litter: { w: 71, d: 71 },   // 4–5 puppies
    large_litter: { w: 91, d: 91 },   // 6+ puppies
    pig_rail_height_cm: 10,
    wall_height_cm: 35,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const JRT_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg (puppies under 2.3kg)',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all puppies. Ask your vet for puppy pyrantel drops. Dose by weight — the bottle tells you exactly how much.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Same product as Day 14, same dose by current weight.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur) or Pyrantel',
      dose: 'Fenbendazole: 50 mg/kg daily x 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third worm treatment — switch to Panacur (fenbendazole) if available. Give for 3 days in a row. Covers more worm types than the earlier treatments.',
      vet_required: false,
      critical: true,
    },
    {
      day: 56,
      label: 'Fourth deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily x 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia', 'taenia tapeworms'],
      plain_english: 'Final deworming before puppies go to new homes. Panacur for 3 days in a row.',
      vet_required: false,
      critical: true,
    },
  ],

  // Dam deworming during pregnancy/lactation
  dam_deworming: {
    start_day_of_pregnancy: 40,
    end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)',
    dose: '50 mg/kg daily',
    plain_english: 'Your dog needs daily worm treatment from about 3 weeks before the due date until 2 weeks after birth. This stops worms passing to puppies through her milk. Ask your vet for Panacur.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First set of vaccinations at 6–8 weeks. This is the foundation of their immune protection. Done by your vet.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'Second round of vaccinations. Must be given 2–4 weeks after the first dose.',
      vet_required: true,
      critical: true,
    },
    {
      week: 14,
      label: 'Third vaccination (final puppy dose)',
      vaccine: 'DHPP #3 + Rabies',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'],
      plain_english: 'Final puppy vaccination series. Puppies are NOT fully protected until 2 weeks after this dose (~16 weeks). Avoid dog parks until then.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check',
      urgency: 'within_48_hours',
      plain_english: 'Have your vet check the mother within 48 hours of birth — especially if labour was long or difficult. They will confirm all placentas have passed and check for infection.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam follow-up',
      urgency: 'day_7',
      plain_english: 'One-week check for the mother. Vet will check milk supply, watch for mastitis, and confirm puppies are gaining weight.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness exam + first vaccinations',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit for the puppies. They will get their first vaccinations, be checked for cleft palate, hernias, heart murmurs, and any abnormalities.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check before puppies go to their new homes. Get a written health certificate. Confirm microchipping is done.',
      critical: true,
    },
  ],

  flea_tick_prevention: {
    earliest_age_weeks: 4,
    earliest_weight_kg: 0.9,
    first_safe_product: 'Capstar (nitenpyram) — kills live fleas only, no tick protection',
    plain_english: 'Do not use adult flea/tick products on puppies under 4 weeks. From 4 weeks and over 0.9kg, Capstar is safe. Wait until 8 weeks and 1.8kg for full monthly preventatives. Always ask your vet first — never use dog products on puppies unless labelled safe for their age and weight.',
    critical: true,
  },

  microchipping: {
    recommended_age_weeks: 8,
    minimum_age_weeks: 6,
    plain_english: 'Microchipping is a small chip injected under the skin between the shoulder blades. It takes 10 seconds and gives your puppy a permanent ID number. Done by your vet at the 8-week visit. Register the chip number with your contact details immediately after.',
    critical: false,
  },

  // JRT-specific genetic health monitoring
  genetic_monitoring: [
    {
      condition: 'Congenital Deafness',
      test: 'BAER (Brainstem Auditory Evoked Response)',
      timing: 'weeks_5_to_8',
      plain_english: 'Some JRT puppies are born deaf, especially white-coated ones. A BAER test at 5–8 weeks checks hearing in each ear separately. Ask your vet if they offer this or can refer you. Deaf puppies can live full lives but need special training approaches.',
      breed_specific: true,
    },
    {
      condition: 'Primary Lens Luxation (PLL)',
      test: 'DNA blood test',
      timing: 'any_age',
      plain_english: 'PLL is a genetic condition that can cause sudden painful blindness in adult JRTs. A DNA test tells you if your puppy carries the gene. Not urgent at 8 weeks, but important for puppies going to new homes — tell new owners to test before breeding.',
      breed_specific: true,
    },
    {
      condition: 'Spinocerebellar Ataxia (SCA)',
      test: 'DNA blood test',
      timing: 'any_age',
      plain_english: 'SCA causes wobbling and coordination problems, usually appearing at 2–6 months. About 17% of JRTs carry the gene. Signs: puppy walks wobbly, falls over, can\'t coordinate properly. Contact your vet immediately if you see these signs.',
      breed_specific: true,
      watch_for_signs_from_week: 8,
    },
    {
      condition: 'Patellar Luxation',
      test: 'Physical examination',
      timing: 'first_vet_visit_onwards',
      plain_english: 'The kneecap slipping out of place. Signs: puppy occasionally hops on three legs for a few steps then walks normally again. Ask the vet to check the knees at every visit.',
      breed_specific: true,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS (Day -63 to Day 0)
// ─────────────────────────────────────────────────────────────────────────────

export const JRT_PREGNANCY_EVENTS = [
  {
    day_offset: -63, // Estimated conception
    category: 'development',
    priority: 'recommended',
    title: 'Pregnancy begins',
    description: 'Fertilisation has occurred. No visible signs yet — this is normal.',
    detail: 'Your dog shows no visible signs in the first 2–3 weeks. This is completely normal. Embryos are microscopic and still travelling to the uterus. No special care needed yet beyond her normal routine.',
    is_free: true,
  },
  {
    day_offset: -49, // ~2 weeks before vet can confirm (Day 14 of pregnancy)
    category: 'health',
    priority: 'recommended',
    title: 'Begin prenatal supplements',
    description: 'Start folic acid supplementation if not already begun.',
    detail: 'Ask your vet about folic acid supplementation (2–5mg daily). This is most important during organ development (Days 21–32 of pregnancy) and helps prevent developmental defects. Do NOT supplement with calcium at any point during pregnancy — this dramatically increases the risk of a dangerous condition called eclampsia after birth.',
    is_free: true,
    vet_action: 'Ask about folic acid dose at your next visit',
    call_vet_if: 'She seems unwell, is not eating, or has unusual discharge',
  },
  {
    day_offset: -42, // Day 21 of pregnancy
    category: 'health',
    priority: 'critical',
    title: 'Book vet pregnancy confirmation',
    description: 'Ultrasound can confirm pregnancy from Day 25.',
    detail: 'If you haven\'t had a vet confirm the pregnancy yet, book now. An ultrasound from Day 25 can confirm pregnancy and give an early puppy count. An X-ray from Day 45 gives an accurate puppy count — important so you know when labour is finished.\n\n**Why this matters:** False pregnancies are common in dogs. Your dog may show all the signs of pregnancy without actually being pregnant. Only a vet can tell you for sure.',
    is_free: true,
    vet_action: 'Book ultrasound appointment',
    call_vet_if: 'She has not been seen by a vet yet',
  },
  {
    day_offset: -28, // Day 35 of pregnancy
    category: 'nutrition',
    priority: 'critical',
    title: 'Switch to puppy food',
    description: 'Transition your dog\'s food to high-quality puppy food now.',
    detail: 'From about Day 35 onwards, your dog needs significantly more calories. Switch to a high-quality puppy food (like Royal Canin Mini Starter, Hill\'s Science Diet Puppy, or Purina Pro Plan Puppy — NOT "large breed" puppy food).\n\n**How to transition:** Mix 25% new food + 75% old food for 2 days, then 50/50 for 2 days, then 75% new food for 2 days, then 100% new food. Abrupt food changes cause stomach upset.\n\n**Important:** Start feeding smaller meals more often (3–4 times daily instead of 1–2). As the puppies take up more space, her stomach can\'t hold as much at once.\n\n**NEVER give calcium supplements** during pregnancy.',
    is_free: true,
    call_vet_if: 'She refuses to eat for more than 24 hours',
  },
  {
    day_offset: -21, // Day 42 — X-ray window
    category: 'health',
    priority: 'critical',
    title: 'X-ray to count puppies',
    description: 'Book an X-ray this week to get an accurate puppy count.',
    detail: 'From Day 45 of pregnancy, puppy skeletons are visible on X-ray. This is the most reliable way to count how many puppies to expect.\n\n**Why it matters:** During labour, you need to know when the last puppy has arrived. If you expect 5 puppies and only 4 have been born, you know there\'s still one inside — which could be a life-threatening emergency. Without a count, you won\'t know.\n\n**Action:** Book an X-ray appointment for this week. Mention it\'s for a puppy count.',
    is_free: true,
    vet_action: 'Book X-ray for puppy count',
    call_vet_if: 'You haven\'t had an X-ray and are within 2 weeks of the due date',
  },
  {
    day_offset: -14, // Day 49 — prepare whelping box
    category: 'environment',
    priority: 'critical',
    title: 'Set up the whelping box',
    description: 'Your dog needs to get comfortable with the whelping box NOW — before labour.',
    detail: '**Whelping box size for JRTs:** 71cm × 71cm for a litter of up to 5 puppies, 91cm × 91cm for 6 or more. Sides should be 35cm tall. Install pig rails (a ledge 10cm from the floor all around the inside) — these prevent the mother from accidentally crushing puppies against the walls.\n\n**Temperature:** Place a heat lamp or heating pad over ONE side of the box only — this gives puppies a warm zone and a cooler zone so they can choose. Target: 85–90°F (29.5–32°C) at puppy level.\n\n**Bedding:** Vetbed (vet bedding) is ideal — puppies can grip it, it wicks moisture away, and it\'s washable. Have at least 3 spare pieces.\n\n**Introduce her now:** Put the box in a quiet room and let her sleep in it for 2 weeks before birth. Dogs that know the whelping box before labour are calmer during it.',
    is_free: true,
    call_vet_if: 'She refuses to go near the whelping box — some anxiety is normal but extreme avoidance is worth mentioning',
  },
  {
    day_offset: -14,
    category: 'health',
    priority: 'critical',
    title: 'Start monitoring dam temperature twice daily',
    description: 'Take her rectal temperature every morning and evening. Record it.',
    detail: '**Why:** A dog\'s normal temperature is 38–39.2°C (100.4–102.5°F). In the 24 hours before labour, temperature drops below 37.2°C (99°F) — sometimes as low as 36.1°C (97°F). This temperature drop is the most reliable sign that labour will begin within 12–24 hours.\n\n**How:** Use a digital rectal thermometer. Lubricate gently, insert 2–3cm, wait for the beep. Record the reading and time in a notebook or your phone.\n\n**What to do when you see the drop:** Labour is coming. Prepare everything. Do not leave her alone.',
    is_free: true,
    call_vet_if: 'Temperature drops below 37.2°C (99°F) — note the time and call your vet to alert them',
  },
  {
    day_offset: -7, // Day 56 — final pre-birth week
    category: 'health',
    priority: 'critical',
    title: 'Assemble your whelping kit',
    description: 'Everything you need must be ready before labour starts.',
    detail: '**Essential items — gather these today:**\n- Digital rectal thermometer\n- Kitchen scale (in grams) for weighing puppies\n- Bulb syringe (for clearing airways after birth)\n- Sterile scissors and hemostatic clamps (for cords)\n- Unwaxed dental floss (for tying cords if needed)\n- Betadine/iodine solution (for umbilical cord treatment)\n- Heating pad or heat lamp (already installed in whelping box)\n- Stack of clean towels\n- Puppy milk replacer (Esbilac) — buy in advance just in case\n- Newborn puppy bottles/syringes\n- Disposable gloves\n- Notebook and pen (track time of each birth + placenta)\n- Your vet\'s emergency number WRITTEN DOWN (not just in your phone)',
    is_free: true,
  },
  {
    day_offset: -3, // 3 days before due date
    category: 'environment',
    priority: 'critical',
    title: 'Do not leave her alone',
    description: 'From now until the puppies arrive, check on her every 2 hours.',
    detail: 'Labour can begin any time from now. The most dangerous complications happen fast — a puppy stuck in the birth canal, a placenta that hasn\'t passed, a puppy born not breathing.\n\n**Set a timer** for every 2 hours through the night if needed. You need to be there when it starts.\n\n**Signs labour is starting:** restlessness, panting, refusing food, shivering, nesting behaviour (digging, circling), licking her vulva repeatedly, visible contractions.\n\n**When to call the vet:** If she has been pushing strongly for 30 minutes without a puppy, or if more than 2 hours pass between puppies when more remain.',
    is_free: true,
    call_vet_if: '30 minutes of strong pushing without a puppy, OR 2+ hours between puppies',
    emergency_contact_recommended: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS (Day 0–14)
// ─────────────────────────────────────────────────────────────────────────────

export const JRT_NEONATAL_EVENTS = [

  // ── DAY 0 ─────────────────────────────────────────────────────────────────
  {
    day_offset: 0,
    time_of_day: 'immediately',
    category: 'health',
    priority: 'critical',
    title: 'Check every puppy is breathing',
    description: 'Each puppy must breathe and cry within seconds of birth.',
    detail: 'As each puppy is born, the mother will lick it to stimulate breathing. If she doesn\'t, or if the puppy isn\'t breathing:\n1. Clear fluid from the mouth and nose with a bulb syringe\n2. Rub the puppy vigorously with a clean towel\n3. Hold the puppy face-down and swing it gently downward in a small arc — this uses gravity to clear fluid from the airways\n4. Keep rubbing and stimulating until the puppy cries\n\nA puppy that cries immediately is healthy. A puppy that needs stimulation for more than 1–2 minutes needs urgent vet help.',
    is_free: true,
    emergency_contact_recommended: true,
    call_vet_if: 'Puppy not breathing after 2 minutes of stimulation, or has blue/white gums',
  },
  {
    day_offset: 0,
    time_of_day: 'within_2_hours',
    category: 'nutrition',
    priority: 'critical',
    title: 'Every puppy must nurse colostrum within 2 hours of birth',
    description: 'The first milk (colostrum) gives puppies 90% of their immune protection. The window closes in 12–16 hours.',
    detail: '**Why this is non-negotiable:** Puppies are born with almost no immunity. The first milk (colostrum) contains antibodies that pass through the gut wall into the bloodstream — but ONLY in the first 12–16 hours. After that, the gut wall closes and antibodies can no longer be absorbed. A puppy that misses colostrum has almost no immune protection for the first weeks of life.\n\n**What to do:** Make sure every puppy has latched and nursed within 2 hours of birth. Guide weaker puppies to the nipples. Hold larger puppies back briefly if a weaker one is being pushed off.\n\n**If the mother won\'t let them nurse:** Call your vet immediately. Meanwhile, collect colostrum by hand-milking and syringe-feed it.\n\n**If no colostrum is available:** Call your vet — they may have colostrum supplement or plasma from another vaccinated dog.',
    is_free: true,
    emergency_contact_recommended: true,
    call_vet_if: 'Any puppy has not nursed after 2 hours, or the mother is refusing to let them nurse',
  },
  {
    day_offset: 0,
    time_of_day: 'after_birth',
    category: 'health',
    priority: 'critical',
    title: 'Weigh every puppy and record',
    description: 'Birth weight is the baseline for tracking health every single day.',
    detail: 'Weigh each puppy on a kitchen scale in grams immediately after birth. Record the weight against the puppy\'s ID colour (set up yarn collar ID system now — see below).\n\n**JRT birth weight range:** 180–220g is healthy. Under 150g = runt protocol needed immediately.\n\n**Puppy ID system:** Before you put them down, tie a different-coloured piece of soft wool yarn loosely around each puppy\'s neck. Use one colour per puppy. You need at least two fingers to fit between the yarn and the neck. This lets you track exactly which puppy gained or lost weight every day.\n\n**Record format:** Date, time, each puppy\'s colour code and weight in grams.',
    is_free: true,
  },
  {
    day_offset: 0,
    time_of_day: 'after_birth',
    category: 'health',
    priority: 'critical',
    title: 'Treat umbilical cords with iodine',
    description: 'Treat each cord within 30 minutes of birth to prevent infection.',
    detail: 'Dip or paint the stump of each umbilical cord with Betadine (povidone-iodine) solution. Re-apply 2–3 times daily until the cord falls off (usually 3–5 days).\n\n**What a healthy cord looks like:** Thin, drying out, darkening toward black. Falls off on its own.\n\n**Signs of infection (omphalitis):** Redness or swelling spreading around the navel, pus, heat, puppy seems unwell. This is an emergency — bacteria from an infected cord causes fatal sepsis within hours in newborns.',
    is_free: true,
    call_vet_if: 'Any redness, swelling, pus, or heat around the navel — same day',
    emergency_contact_recommended: true,
  },
  {
    day_offset: 0,
    time_of_day: 'after_birth',
    category: 'health',
    priority: 'critical',
    title: 'Check every puppy for cleft palate',
    description: 'A cleft palate must be identified today — it changes everything about feeding.',
    detail: '**How to check:** Gently open each puppy\'s mouth and look at the roof of the mouth with a small torch. It should be smooth and unbroken. A gap or groove running down the middle = cleft palate.\n\n**After first nursing:** Watch for milk bubbling from the nostrils during or after feeding. Milk from the nose = cleft palate confirmed.\n\n**What it means:** A puppy with a cleft palate cannot create suction to nurse. It will slowly starve or inhale milk into its lungs. Tube feeding every 2–3 hours is required until surgery at 8–12 weeks.\n\n**Talk to your vet today** if you suspect a cleft palate. They will advise on tube feeding and whether surgery is appropriate.',
    is_free: true,
    call_vet_if: 'Any puppy has a visible gap in the roof of the mouth, or milk comes from the nose when nursing',
  },
  {
    day_offset: 0,
    time_of_day: 'throughout',
    category: 'environment',
    priority: 'critical',
    title: 'Whelping box temperature: 29.5–32°C (85–90°F)',
    description: 'Newborn JRT puppies cannot regulate their body temperature. Cold kills within hours.',
    detail: 'This is the single most important environmental task for the first week.\n\n**Why:** Canine Herpesvirus (CHV-1) — present in over 80% of adult dogs — can only replicate at temperatures below 37°C (98.6°F). Keeping puppies warm literally prevents the most common infectious killer of newborn puppies.\n\n**How to check:** Place a thermometer at puppy level (not up high where the lamp is). The reading at puppy level must be 29.5–32°C.\n\n**Heat source:** One side of the box only — so puppies can move away if too hot. Never cover the entire floor with a heating pad.\n\n**Check the temperature every 4 hours this week.**',
    is_free: true,
    emergency_contact_recommended: true,
    call_vet_if: 'Any puppy feels cold to the touch — normal puppy skin should feel warm. Rub cold puppies against your skin immediately.',
  },
  {
    day_offset: 0,
    time_of_day: 'after_each_birth',
    category: 'health',
    priority: 'critical',
    title: 'Count and check placentas',
    description: 'One placenta must be delivered for each puppy.',
    detail: 'Every puppy has one placenta. After each puppy is born, watch for the placenta to follow within 5–15 minutes. Keep count in your notebook.\n\n**Total placentas must equal total puppies.**\n\nA retained placenta causes severe uterine infection (metritis) in the mother — dangerous and potentially fatal.\n\n**The mother will try to eat them** — this is normal. Eating 1–2 is fine. Eating many may cause vomiting. You can remove excess placentas after she\'s seen each one.',
    is_free: true,
    call_vet_if: 'Number of placentas is less than number of puppies at the end of labour',
    emergency_contact_recommended: true,
  },

  // ── DAYS 1–2 ─────────────────────────────────────────────────────────────
  {
    day_offset: 1,
    category: 'health',
    priority: 'critical',
    title: 'Weigh all puppies — up to 10% loss is normal today only',
    description: 'Record each puppy\'s weight. Up to 10% weight loss in the first 24 hours is normal.',
    detail: 'Weigh every puppy at the same time each day. Some weight loss in the first 24 hours is normal as puppies lose fluid. After Day 1, weight must go UP every single day.\n\n**If any puppy loses weight after Day 1:** Increase nursing access and supplement with formula immediately.\n\n**JRT daily weight gain target:** 10–20g per day minimum. Any puppy gaining less than 10g per day needs help.',
    is_free: true,
    call_vet_if: 'Any puppy has lost weight after Day 1, or any puppy weighs less than 150g',
  },
  {
    day_offset: 1,
    category: 'health',
    priority: 'critical',
    title: 'Re-apply iodine to umbilical cords',
    description: 'Second iodine application to all cords.',
    detail: 'Gently apply Betadine to each cord stump again. Do this 2–3 times daily until the cord falls off. Check for any redness or swelling around the navel.',
    is_free: true,
  },
  {
    day_offset: 1,
    category: 'health',
    priority: 'critical',
    title: 'Check dam: discharge, milk, wellbeing',
    description: 'Watch the mother carefully for signs of infection or complications.',
    detail: '**Normal signs:** Dark green to reddish-brown discharge (lochia) for up to 3 weeks — this is normal postpartum discharge. Some panting and restlessness. Eating well and nursing.\n\n**Warning signs — call your vet today:**\n- Foul-smelling discharge\n- Green discharge without a puppy within 15 minutes during labour (if still in labour)\n- Fever (above 39.5°C / 103.1°F)\n- Refusing to eat after 24 hours\n- Refusing to nurse puppies\n- Red, hot, or hard mammary glands (mastitis)\n- Muscle tremors, stiff walking, seizures (eclampsia — emergency)',
    is_free: true,
    call_vet_if: 'Any of the warning signs listed above',
    emergency_contact_recommended: true,
  },

  // ── DAY 3 ─────────────────────────────────────────────────────────────────
  {
    day_offset: 3,
    category: 'development',
    priority: 'critical',
    title: 'Begin Early Neurological Stimulation (ENS)',
    description: 'Start daily ENS exercises today — runs through Day 16.',
    detail: '**What is ENS?** A 5-exercise daily routine developed from military dog training research. Takes 30 seconds per puppy. Proven to produce calmer, more resilient, healthier adult dogs.\n\n**Do this ONCE daily — exactly. Not twice, not zero.**\n\nFor each puppy, perform each exercise for exactly 3–5 seconds:\n1. **Tactile stimulation:** Using a Q-tip, gently tickle between the toes\n2. **Head upright:** Hold puppy vertically, head pointing up\n3. **Head down:** Hold puppy firmly, head pointing down\n4. **Supine position:** Hold puppy on its back, belly facing ceiling\n5. **Thermal stimulation:** Place puppy paws-down on a cool damp towel (refrigerated 5 min)\n\n**Total per puppy: ~30 seconds.**\n\nDo not do more than once daily — over-stimulation is harmful. This continues every day until Day 16.',
    is_free: true,
    repeating: true,
    repeat_until_day: 16,
    repeat_label: 'ENS exercises — Day {current} of 14',
  },

  // ── DAYS 4–6 ─────────────────────────────────────────────────────────────
  {
    day_offset: 4,
    category: 'health',
    priority: 'critical',
    title: 'Daily weight check — target: 10–20g gain per puppy',
    description: 'Weigh every puppy. Any not gaining weight needs immediate help.',
    detail: 'At this stage, healthy JRT puppies gain 10–20g per day. Weigh at the same time daily.\n\n**Runt check:** Is one puppy consistently 20–30% lighter than the others? Follow the runt protocol: always place them on a rear teat (highest milk flow) at every nursing session. Supplement with 1–2mL Esbilac formula after nursing.',
    is_free: true,
    repeating: true,
    repeat_interval: 'daily',
    repeat_until_day: 56,
  },
  {
    day_offset: 5,
    category: 'health',
    priority: 'critical',
    title: 'Reduce whelping box temperature slightly',
    description: 'Adjust box temperature to 27–29°C (80–85°F)',
    detail: 'Puppies begin developing a shivering reflex around Days 5–7. You can begin reducing the box temperature slightly. Still keep one warm zone, one cooler zone. Measure at puppy level.',
    is_free: true,
  },

  // ── DAYS 7–10 ─────────────────────────────────────────────────────────────
  {
    day_offset: 7,
    category: 'development',
    priority: 'critical',
    title: 'Week 1 milestone: puppies should be near double birth weight',
    description: 'Healthy JRT puppies weigh 280–380g at one week.',
    detail: 'A healthy JRT puppy doubles birth weight by approximately Day 10. At Day 7, they should weigh 280–380g. If any puppy is significantly below this, they need supplemental feeding.\n\n**Signs of a healthy 1-week-old:** Warm, round belly, sleeping most of the time (90%), crying only when hungry or cold, crawling actively toward warmth and milk.',
    is_free: true,
  },
  {
    day_offset: 9,
    category: 'development',
    priority: 'recommended',
    title: 'Eyes may begin opening from Day 10',
    description: 'Watch for eyes starting to open — cloudy, blue-grey at first.',
    detail: 'Puppy eyes begin opening between Days 10–14. The eyes will look cloudy and blue-grey initially — this is completely normal. Vision develops gradually over the next few weeks.\n\n**Do NOT force the eyelids open.** If an eye looks swollen or has discharge behind the sealed lids (neonatal ophthalmia), call your vet — it needs to be treated immediately to prevent permanent damage.',
    is_free: true,
    call_vet_if: 'Eyes haven\'t opened by Day 21, or any eye appears swollen or has discharge',
  },

  // ── DAYS 10–14 ───────────────────────────────────────────────────────────
  {
    day_offset: 10,
    category: 'development',
    priority: 'recommended',
    title: 'Hearing begins developing — introduce gentle sounds',
    description: 'Puppies are starting to hear. Begin gentle sound exposure.',
    detail: 'Around Days 14–21, puppy ears open and hearing begins. Start now with very gentle sound exposure:\n- Soft conversation near the box\n- Quiet radio or low music\n- Gentle household sounds from a distance\n\nThis prevents severe noise phobias later in life. Start quiet — loud sounds at this age cause startle and stress.',
    is_free: true,
  },
  {
    day_offset: 14,
    category: 'health',
    priority: 'critical',
    title: '🚨 DEWORMING DAY — First dose due today',
    description: 'Give pyrantel pamoate to all puppies and the mother. Do not skip or delay.',
    detail: '**This is not optional.** All puppies carry roundworm larvae passed from the mother before and after birth. Left untreated, worms cause malnutrition, lung damage, and death in puppies.\n\n**What to use:** Pyrantel pamoate (puppy liquid — NOT adult tablets). Available from your vet or pet pharmacy. Product names vary by country.\n\n**Dose:** 10mg per kg of body weight. Weigh each puppy today and dose accordingly.\n\n**The mother:** Also deworm the mother today.\n\n**How to give it:** Draw up the correct amount in a syringe, place in the corner of the mouth, squirt slowly. Most puppies accept it.\n\n**Next dose:** Day 28.',
    is_free: true,
    emergency_contact_recommended: false,
    call_vet_if: 'Any puppy vomits within 2 hours of the dose, or you are unsure of the correct product',
  },
  {
    day_offset: 16,
    category: 'development',
    priority: 'critical',
    title: 'LAST DAY of ENS exercises',
    description: 'Final day of Early Neurological Stimulation. Do not continue after today.',
    detail: 'Today is the last day of the ENS protocol. Perform the 5 exercises as normal.\n\nDo NOT continue beyond Day 16 — over-stimulation in older puppies has the opposite effect to the intended benefit. The ENS window is Days 3–16 only.\n\nFrom tomorrow, focus on gentle handling, socialisation, and sound exposure.',
    is_free: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRANSITIONAL PERIOD EVENTS (Days 15–21)
// ─────────────────────────────────────────────────────────────────────────────

export const JRT_TRANSITIONAL_EVENTS = [
  {
    day_offset: 16,
    category: 'development',
    priority: 'recommended',
    title: 'First wobbly steps',
    description: 'Puppies will begin attempting to stand and walk around Day 16.',
    detail: 'This is an exciting milestone! First attempts are very wobbly — they\'ll fall over constantly. This is completely normal. Their legs are developing strength rapidly.\n\nProvide gentle traction in the whelping box — Vetbed is ideal. Slippery surfaces (newspaper, plain towels) make walking harder and can cause splayed legs.',
    is_free: true,
  },
  {
    day_offset: 18,
    category: 'development',
    priority: 'recommended',
    title: 'Ears open — hearing is developing',
    description: 'Puppies can now hear. Continue gentle sound habituation.',
    detail: 'The ear canals open around Days 14–21. Hearing develops rapidly — by 3–4 weeks, JRT puppies hear approximately 4× better than humans.\n\nContinue gentle sound exposure. Begin introducing slightly louder everyday sounds: kitchen noise from another room, TV at low volume, doorbell at a distance. The goal is for NO sounds to surprise them later in life.',
    is_free: true,
  },
  {
    day_offset: 21,
    category: 'development',
    priority: 'critical',
    title: 'Week 3: Socialisation window opens',
    description: 'From now until 12 weeks, every experience shapes your puppies for life.',
    detail: 'This week marks the beginning of the most important developmental period in a dog\'s life. Between weeks 3–12, puppies are naturally curious and minimally fearful. Experiences during this period wire faster and deeper than at any other time.\n\n**JRT-specific note:** Early socialisation is even more critical for JRT-type dogs than average breeds. Without it, JRTs are prone to aggression toward other dogs, excessive reactivity, and destructive behaviour.\n\n**This week\'s goals:**\n- Introduce varied surfaces in the box (blanket, rubber mat, towel)\n- Expose to 1–2 new people beyond the caretaker\n- Begin gentle handling: ears, paws, mouth — prepares them for vet visits\n- Introduce a shallow water dish as they start exploring\n\nThe socialisation schedule for weeks 3–8 is in your calendar.',
    is_free: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS (Weeks 3–8)
// ─────────────────────────────────────────────────────────────────────────────

export const JRT_SOCIALIZATION_EVENTS = [
  {
    week_offset: 3,
    category: 'socialization',
    priority: 'critical',
    title: 'Week 3: Varied surfaces + first new people',
    description: 'Add new surfaces and introduce 1–2 new humans this week.',
    detail: 'Surfaces to introduce this week: soft blanket, rubber mat, folded towel. Each surface teaches the puppy that different textures underfoot are normal.\n\n1–2 new people should gently handle each puppy for 5–10 minutes each. Touch ears, paws, between toes, inside the mouth gently. This prevents bite sensitivity at the vet later.',
    is_free: false,
  },
  {
    week_offset: 4,
    category: 'socialization',
    priority: 'critical',
    title: 'Week 4: 2–3 new people daily + surfaces',
    description: 'Expand handling to 2–3 different people every day.',
    detail: 'This week: carpet, tile, grass (if safe), wood floor. Introduce kitchen appliances running (dishwasher, washing machine — from another room). 2–3 different people should handle each puppy each day.\n\n**JRT prey drive:** You may notice puppies fixating on and chasing rolling objects. This is normal. Redirect to appropriate toys.',
    is_free: false,
  },
  {
    week_offset: 5,
    category: 'socialization',
    priority: 'critical',
    title: 'Week 5: 5+ new people + sound habituation',
    description: 'At least 5 different people this week. Begin thunder/firework sound recordings.',
    detail: 'Play thunder recordings and firework sounds at LOW volume while puppies are eating (positive association). Gradually increase volume over days.\n\nSurfaces: concrete, sand, gravel, metal. Novel objects: umbrella opening slowly, brooms, wobble boards. 5+ new people this week — the target is 100 different people before 12 weeks.',
    is_free: false,
  },
  {
    week_offset: 6,
    category: 'socialization',
    priority: 'critical',
    title: 'Week 6: Introduce crate + car + collar',
    description: 'Crate with door open (meals inside), first car ride, lightweight collar.',
    detail: 'Place crate with door open in the puppy area. Feed meals inside. Let them explore freely.\n\nFirst car ride: short, just around the block. Puppy in a secure box or lap. Watch for motion sickness (drooling, vomiting).\n\nLightweight collar: put on for 15 minutes during play. Check you can fit two fingers underneath.',
    is_free: false,
  },
  {
    week_offset: 7,
    category: 'socialization',
    priority: 'critical',
    title: 'Week 7: Each puppy handled by 10+ different people',
    description: 'Ramp up human exposure. Begin individual separation practice.',
    detail: 'Each individual puppy should be handled by at least 10 different people this week — different ages, appearances, voices, clothing styles.\n\nBegin 15–30 minute individual separations from the litter. This builds independence and prevents separation anxiety.\n\nAttach a lightweight leash for supervised 2–3 minute drag sessions.',
    is_free: false,
  },
  {
    week_offset: 8,
    category: 'socialization',
    priority: 'critical',
    title: 'Week 8: First fear period may begin — go gently',
    description: 'Fear period 8–10 weeks. Do NOT push puppies into frightening situations.',
    detail: 'The first fear period often begins at 8–10 weeks. Puppies that were fearless last week may suddenly be wary. This is neurologically normal — do not force interactions.\n\nLet puppies approach new things at their own pace. Remove them from anything frightening. One bad experience during a fear period can create a lifelong phobia.\n\nFocus on calm, positive experiences: gentle handling, familiar people, familiar places.',
    is_free: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// WEANING AND NUTRITION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const JRT_NUTRITION_EVENTS = [
  {
    week_offset: 3.5,
    category: 'nutrition',
    priority: 'critical',
    title: 'Begin weaning — first puppy gruel',
    description: 'Introduce first solid food: very soupy puppy gruel.',
    detail: '**When:** When the first baby teeth start emerging (~3.5–4 weeks).\n\n**Recipe:** Mix 1 part high-quality small-breed puppy kibble + 3 parts warm water + a splash of puppy milk replacer (Esbilac). Blend or mash until very smooth — consistency of thin oatmeal.\n\n**How:** Place in a shallow dish (a plastic container lid works). Put a puppy\'s nose near it. They\'ll investigate and lap at it. Some will walk through it. This is fine.\n\n**This week:** 1–2 gruel "sessions" per day. Still nursing most of the time. This is introduction only.',
    is_free: false,
    call_vet_if: 'Any puppy has persistent diarrhoea after introducing gruel',
  },
  {
    week_offset: 4,
    category: 'nutrition',
    priority: 'critical',
    title: 'Week 4: Thicker gruel, 3–4 times daily',
    description: 'Increase gruel thickness and feeding frequency.',
    detail: 'Thicken the gruel to porridge consistency (less water). Feed 3–4 times daily.\n\nPuppies are still nursing but increasing their solid food intake. Separate them from the mother for 30–60 minutes before gruel feeding so they\'re hungry.\n\nFresh water must be available at all times from this point.',
    is_free: false,
  },
  {
    week_offset: 5,
    category: 'nutrition',
    priority: 'critical',
    title: 'Week 5: Softened food — solid food becomes primary',
    description: 'Reduce liquid, move toward mashed food consistency.',
    detail: 'Soak kibble for 10 minutes in warm water, then mash lightly. Consistency: thick mashed potato. Reduce milk replacer in the mix.\n\nSolid food is becoming the primary nutrition source. Dam will begin spending less time nursing.',
    is_free: false,
  },
  {
    week_offset: 6,
    category: 'nutrition',
    priority: 'critical',
    title: 'Week 6: Mostly solid food, dam managing her own weaning',
    description: 'Four meals daily of softened small-breed puppy kibble.',
    detail: 'Soak kibble for 5–10 minutes only. Still soft but recognisably kibble-shaped. 4 meals daily.\n\nThe mother will naturally start limiting nursing as puppy teeth become uncomfortable. Do not interfere with this natural process. Check her mammary glands daily — firm, hot, red glands = mastitis, call the vet.',
    is_free: false,
  },
  {
    week_offset: 7,
    category: 'nutrition',
    priority: 'recommended',
    title: 'Week 7: Transition to dry kibble',
    description: 'Gradually move to dry or lightly moistened small-breed puppy kibble.',
    detail: 'Offer dry kibble with a small splash of warm water (or lightly moistened). 3 meals daily. Fresh water always available.\n\n**Portion guide for JRT puppies at 7 weeks (~1.2–1.5kg):** Approximately 80–100g of dry food spread across 3 meals daily. Check the packaging of your specific food and adjust by body weight.',
    is_free: false,
  },
  {
    week_offset: 8,
    category: 'nutrition',
    priority: 'critical',
    title: 'Week 8: Fully weaned — 3–4 meals daily',
    description: 'Puppies eating dry small-breed puppy food. Fully weaned from mother.',
    detail: '**Feeding guide at 8 weeks (JRT, ~1.4–1.8kg):** 80–110g dry food daily, split into 3–4 meals.\n\n**Important for new owners:** Send each puppy home with a 1-week supply of the same food. Changing food abruptly causes digestive upset. New owners should transition gradually over 7 days.\n\n**Foods to NEVER give:** Chocolate, grapes, raisins, xylitol (in many peanut butters), onions, garlic, cooked bones, macadamia nuts, alcohol, caffeine.',
    is_free: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING FOUNDATIONS (Weeks 5–8)
// ─────────────────────────────────────────────────────────────────────────────

export const JRT_TRAINING_EVENTS = [
  {
    week_offset: 5,
    category: 'training',
    priority: 'recommended',
    title: 'Week 5: Bite inhibition — let littermates teach',
    description: 'Don\'t separate puppies during play fights — this is how they learn.',
    detail: 'Bite inhibition is learned primarily from littermates. When one puppy bites another too hard, the bitten puppy yelps and play stops. Through thousands of these exchanges, puppies learn to control bite pressure.\n\n**Your role:** When a puppy bites YOU too hard: yelp sharply and immediately stop all interaction for 60 seconds. Consistent, immediate feedback is essential.\n\n**JRT note:** Bite inhibition is even more important for JRTs than average breeds because their adult bite is powerful and they have a tendency toward assertiveness. This foundation prevents injuries later in life.',
    is_free: false,
  },
  {
    week_offset: 6,
    category: 'training',
    priority: 'recommended',
    title: 'Week 6: Introduce name + clicker conditioning',
    description: 'Say each puppy\'s name while delivering treats. Charge the clicker.',
    detail: '**Name recognition:** Say the puppy\'s name clearly, once, when approaching with food. Treat immediately when the puppy looks toward you. Repeat 10× per session, 2–3 sessions daily. By week 8, puppies should respond to their name 80% of the time in calm environments.\n\n**Clicker introduction:** Click, then immediately treat. Repeat 10–15 times until the puppy anticipates the treat at the click sound. JRTs\'s intelligence means they often "get it" very quickly.\n\nKeep all sessions to 2–3 minutes maximum — puppies have very short attention spans.',
    is_free: false,
  },
  {
    week_offset: 7,
    category: 'training',
    priority: 'recommended',
    title: 'Week 7: Potty area preference forming',
    description: 'Puppies are developing substrate preferences. Establish the potty area now.',
    detail: 'Puppies begin showing preference for specific surfaces and locations for elimination around 7 weeks. Whatever surface they consistently use now becomes their preferred surface as adults.\n\n**Indoor target:** Puppy pads or newspaper in a consistent spot, separate from sleeping and eating areas.\n\n**Outdoor target:** If possible, take puppies outside to grass for a few minutes after each meal from week 7. Most will eliminate on the grass.\n\n**JRT note:** JRTs are intelligent enough to understand a designated toilet area early, but they are stubborn — consistency is everything. Every accident that goes uncorrected delays training by days.',
    is_free: false,
  },
  {
    week_offset: 7,
    category: 'training',
    priority: 'recommended',
    title: 'Week 7: Crate acceptance practice',
    description: 'Brief door closures (30 seconds building to 5 minutes).',
    detail: 'The crate has been open with food inside since Week 6. This week:\n1. Close the door for 30 seconds while the puppy eats\n2. Open before any crying\n3. Build to 1 minute, then 2, then 5\n\nGoal by Week 8: each puppy can rest in a closed crate for 5–10 minutes without distress. This dramatically reduces separation anxiety in new homes.',
    is_free: false,
  },
  {
    week_offset: 8,
    category: 'training',
    priority: 'recommended',
    title: 'Week 8: Brief individual separations',
    description: 'Each puppy separated individually for 30–60 minutes daily.',
    detail: 'Individual separation from the litter is critical preparation for going to new homes. Start with 15 minutes in a crate with a towel that smells of the litter. Build to 60 minutes.\n\n**Singleton puppy note:** If there is only one puppy, individual separations have been happening since Week 3. By Week 8 they should be comfortable alone for 2+ hours.',
    is_free: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EMERGENCY REFERENCE (Always free, always accessible)
// ─────────────────────────────────────────────────────────────────────────────

export const JRT_EMERGENCY_GUIDE = {
  call_vet_immediately: [
    { symptom: 'Strong pushing for 30+ minutes without a puppy being born', phase: 'labour' },
    { symptom: 'More than 2 hours between puppies when more remain', phase: 'labour' },
    { symptom: 'Green discharge for 15+ minutes without a puppy following', phase: 'labour' },
    { symptom: 'Any puppy not breathing after 2 minutes of stimulation', phase: 'birth' },
    { symptom: 'Any puppy with blue or white gums at any age', phase: 'any' },
    { symptom: 'Number of placentas delivered is less than number of puppies', phase: 'after_birth' },
    { symptom: 'Mother has foul-smelling vaginal discharge', phase: 'postpartum' },
    { symptom: 'Mother has muscle tremors, stiff walking, or seizures (eclampsia)', phase: 'postpartum', note: 'LIFE-THREATENING — go immediately' },
    { symptom: 'Mother has hot, red, painful, swollen mammary gland (mastitis)', phase: 'postpartum' },
    { symptom: 'Any puppy has not gained weight for 24 hours after Day 1', phase: 'neonatal' },
    { symptom: 'Any puppy is cold to the touch', phase: 'neonatal', note: 'Warm immediately while calling' },
    { symptom: 'Any puppy is making weak or no sounds and not nursing', phase: 'neonatal' },
    { symptom: 'Puppy has watery or bloody diarrhoea', phase: 'any' },
    { symptom: 'Puppy has redness or swelling around the navel', phase: 'neonatal' },
    { symptom: 'Any puppy develops yellow or pale gums at Days 2–5 (possible NI)', phase: 'neonatal', note: 'Remove from mother immediately — do not allow further nursing' },
    { symptom: 'Milk bubbling from a puppy\'s nose during feeding (cleft palate)', phase: 'birth_to_week_2' },
    { symptom: 'Puppy age 2–6 months: wobbly gait, falling over, coordination problems (SCA)', phase: 'weeks_8_to_24' },
  ],

  hypoglycemia_emergency: {
    title: 'Low blood sugar emergency — act within 5 minutes',
    signs: ['Puppy is limp or barely moving', 'Puppy has glassy or unfocused eyes', 'Puppy is not responding to touch', 'Puppy is seizing or convulsing'],
    immediate_action: [
      'Put 1–2 drops of corn syrup or honey on your fingertip',
      'Rub gently on the puppy\'s gums and tongue — do NOT squirt liquid in the mouth',
      'Repeat every 3–5 minutes until the puppy begins to move',
      'Wrap the puppy against your bare skin for warmth simultaneously',
      'Call your vet immediately — IV glucose may be needed',
      'Once the puppy is alert, offer a small amount of formula',
    ],
    prevention: 'Never skip a feeding in Week 1. Maximum gap between feedings: 2 hours.',
  },

  aspiration_emergency: {
    title: 'Formula or milk inhaled — act immediately',
    signs: ['Formula coming from the nose during or after feeding', 'Sudden crackling or gurgling breathing sounds', 'Laboured or rapid breathing after feeding', 'Blue tinge to gums or tongue'],
    immediate_action: [
      'Hold the puppy firmly and lower its head below its body — gravity helps drain fluid',
      'Swing the puppy gently in a downward arc — this helps clear the airway',
      'Wipe the nose clear with a dry cloth',
      'Do NOT give any more food',
      'Call your vet — this is an emergency. Aspiration pneumonia can kill within 24–48 hours',
    ],
  },

  fading_puppy: {
    title: 'Fading puppy — act within hours',
    signs: ['Puppy losing weight or not gaining', 'Constant crying and cannot settle', 'Feeling cold to the touch', 'Not nursing or nursing weakly', 'Crawling away from the litter'],
    immediate_action: [
      'Check the puppy\'s temperature — below 35°C (95°F) is dangerous',
      'Warm the puppy against your bare skin',
      'Give 1–2 drops of corn syrup on the gums (hypoglycaemia prevention)',
      'Try to get the puppy to nurse or tube-feed small amounts of warm formula',
      'Call your vet immediately — fading puppies deteriorate within hours',
    ],
    note: '85% of puppies that die in the first month showed signs less than 5 days before death. Do not wait to see if they improve.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// BREED OVERRIDES
// Parson Russell and Russell Terrier share this info base with minor differences
// ─────────────────────────────────────────────────────────────────────────────

export const BREED_OVERRIDES = {
  parson_russell_terrier: {
    // Slightly longer legs — reaches bowl a few days earlier
    weaning_start_day_offset: 22,       // vs 24 for standard JRT
    additional_genetic_flags: ['late_onset_ataxia'],
    additional_monitoring: {
      condition: 'Late-Onset Ataxia (LOA)',
      watch_from_week: 24,
      sign: 'Progressive loss of coordination in hindquarters',
      action: 'DNA test available. Contact your vet if signs appear.',
    },
  },

  russell_terrier: {
    // Smaller body = higher hypoglycaemia risk
    formula_volumes_per_feeding_ml: {
      week_1: { min: 1.5, max: 2.5, per_100g_body_weight: 1.0 },
      week_2: { min: 2.5, max: 4, per_100g_body_weight: 1.3 },
    },
    feeding_frequency_hours: {
      week_1: 1.5,   // More frequent than standard JRT
      week_2: 2,
      week_3: 2.5,
      week_4: 3,
    },
    hypoglycemia_risk_note: 'Russell Terriers are smaller than Jack Russells — hypoglycaemia risk is higher. Never exceed 2 hours between feedings in Week 1.',
    tube_size_french: 4,  // French 4 instead of 5 for smaller body
  },
};
