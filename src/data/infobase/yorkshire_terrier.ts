/**
 * INFO BASE: YORKSHIRE TERRIER
 * Applies to: Yorkshire Terrier (Yorkie)
 * Info base ID: 'yorkshire_terrier'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'yorkshire_terrier'.
 *
 * Sources: Yorkshire Terrier Club of America (YTCA), Merck Vet Manual,
 * Cornell CVM, Tobias PSS prevalence study (36× breed risk),
 * VCA Animal Hospitals, AKC.
 *
 * ⚠️ CRITICAL FLAGS:
 * - PSS (portosystemic shunt): 36× HIGHER risk than general dog population
 * - Mandatory bile acid test at 8–16 weeks
 * - HIGH hypoglycemia risk — feeding every 90 minutes in Week 1
 * - Tracheal collapse: harness only, never collar
 * - NEVER use neck collar
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const YORKSHIRE_TERRIER_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 2, max: 5, typical: 3 },
  newborn_weight_grams: { min: 80, max: 150, typical: 115 },
  adult_weight_kg: {
    male:   { min: 2.0, max: 3.2 },
    female: { min: 2.0, max: 3.2 },
  },
  size_category: 'toy' as const,
  hypoglycemia_risk: 'high' as const,
  singleton_risk: true,
  csection_rate_percent: 15,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 80,  max: 150,  typical: 115 },
    day_7:  { min: 160, max: 260,  typical: 210 },
    day_14: { min: 230, max: 360,  typical: 295 },
    week_3: { min: 330, max: 520,  typical: 425 },
    week_4: { min: 460, max: 730,  typical: 595 },
    week_6: { min: 770, max: 1200, typical: 990 },
    week_8: { min: 1000, max: 1600, typical: 1300 },
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

export const YORKSHIRE_TERRIER_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg — use 1 cc syringe for precision',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Yorkie puppies. At 2 weeks a Yorkie puppy may weigh only 200g — you need a 1 cc syringe to measure this dose accurately. Never estimate.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Weigh each puppy on the day. Use current weight.',
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
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth. Calculate dose precisely for a tiny Yorkie dam.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. ALWAYS feed the puppy within 1–2 hours BEFORE the vet visit. Have Karo syrup on hand. Keep the puppy warm throughout. A stressed or cold Yorkie at the vet can crash into hypoglycemia within 30 minutes.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'Second vaccination. Note: discuss Lepto vaccine timing with vet — separate from DHPP for tiny Yorkies to reduce reaction risk.',
      vet_required: true,
      critical: true,
    },
    {
      week: 14,
      label: 'Third vaccination',
      vaccine: 'DHPP #3 + Rabies',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'],
      plain_english: 'Third vaccination series plus Rabies. Feed before visit.',
      vet_required: true,
      critical: true,
    },
    {
      week: 18,
      label: 'CRITICAL: Final parvo booster',
      vaccine: 'DHPP #4 (final)',
      covers: ['Distemper', 'Parvovirus'],
      plain_english: 'Do not skip. Full parvo protection.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check',
      urgency: 'within_24_hours',
      plain_english: 'Vet check within 24 hours. With small Yorkie litters, confirm all foetuses delivered. Check dam for uterine infection.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Every Yorkie puppy must show weight gain. Even a 5g loss is significant in a 100g puppy.',
      critical: true,
    },
    {
      week: 6,
      label: '⚠️ Puppy wellness + vaccinations + PSS screening',
      urgency: 'week_6_to_8',
      plain_english: 'CRITICAL: Request bile acid test at this visit for any puppy showing signs of PSS (stunted, post-meal lethargy, seizures, unusual behaviour). All Yorkie owners should be educated about PSS signs at this visit.',
      critical: true,
    },
    {
      week: 8,
      label: '⚠️ Pre-rehoming check + PSS bile acid test recommendation',
      urgency: 'before_leaving',
      plain_english: 'YORKSHIRE TERRIER CLUB OF AMERICA recommends bile acid stimulation test at 8–16 weeks for ALL Yorkie puppies due to the 36× elevated PSS risk. Ensure new owners understand this test and arrange it with their vet within the first month of ownership.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: '⚠️ PSS (Portosystemic Shunt) — Bile Acid Test',
      timing: '8–16 weeks — MANDATORY for Yorkshire Terrier breed',
      method: 'Pre- and post-prandial bile acid stimulation test (fasted blood draw, feed protein meal, 2-hour post-prandial blood draw)',
      plain_english: 'Yorkshire Terriers have 36 TIMES the normal dog population risk of portosystemic shunt (PSS). PSS is an abnormal blood vessel that bypasses the liver — causing brain toxicity from ammonia. Bile acid test at 8–16 weeks: fast 12 hours, draw blood, feed a protein meal, draw blood 2 hours later. Any post-prandial result above 100 µmol/L is strongly suggestive of PSS. Surgical correction is available. Without surgery, medical management with lactulose and restricted protein can extend life. Untreated: typically fatal by 1–2 years.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Tracheal collapse monitoring',
      timing: 'Any visit — watch for honking cough from 6 months',
      method: 'Clinical exam; fluoroscopy for confirmation',
      plain_english: 'Tracheal collapse is extremely common in Yorkshire Terriers. Signs: honking cough, especially when pulling on lead or excited. Management: harness only, weight control, environmental management. Severe cases: silicone tracheal stent or surgical correction.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Legg-Calvé-Perthes Disease',
      timing: 'Watch for hindlimb lameness 4–12 months',
      method: 'Radiograph of hip joint',
      plain_english: 'Avascular necrosis of the femoral head — reduced blood supply causes the hip joint to collapse. Yorkies are predisposed. Signs: progressive hindlimb lameness from 4–12 months. Surgical treatment (FHO — femoral head ostectomy) is curative.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const YORKSHIRE_TERRIER_PREGNANCY_EVENTS = [
  {
    id_suffix: 'yorkie_preg_supplies',
    day_offset: -14,
    title: 'Toy breed supplies: Order now',
    category: 'environment' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Yorkie neonates require specific tiny supplies.',
    detail: 'Order before birth:\n- French 3.5 feeding tube\n- 1 cc syringes × 20\n- Karo light corn syrup — on the counter, not the cupboard\n- Digital scale accurate to 1 gram\n- Whelping box 60 × 75 cm\n- Heating pad + thermometer\n- Esbilac puppy milk replacer\n\nYorkie births are manageable but the neonatal period requires precision that larger breed supplies cannot provide.',
  },
  {
    id_suffix: 'yorkie_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Confirm puppy count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'With small Yorkie litters, confirm the exact count before whelping.',
    detail: 'Pre-whelping X-ray at Day 55–58. Yorkie litters average 3 puppies.\n\n- Confirm the count — a retained puppy is life-threatening\n- Check for any puppy in an abnormal position\n- With singleton pregnancies: discuss elective C-section with vet',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const YORKSHIRE_TERRIER_NEONATAL_EVENTS = [
  {
    id_suffix: 'yorkie_neo_pss_watch_early',
    day_offset: 28,
    title: 'Week 4: Watch for early PSS signs in any puppy',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'PSS signs can appear from 4 weeks when puppies start eating protein.',
    detail: 'Portosystemic shunt (PSS) often shows its first signs when puppies begin eating solid food (Week 3–4), as protein in food produces ammonia that a normal liver handles — but a shunted liver cannot.\n\nWatch from Week 4 for:\n- One puppy that is significantly smaller than littermates\n- Post-meal lethargy — puppy eats then becomes sleepy, wobbly, or "drunk-looking"\n- Hypersalivation (drooling) after eating\n- Any seizure activity\n- Reduced interest in play relative to littermates\n\nAny of these signs in a Yorkie puppy from Week 4: URGENT vet referral for bile acid testing.\n\nNote: PSS puppies often appear normal between meals — symptoms are triggered by protein ingestion. Watch specifically in the 1–3 hours after eating.',
    call_vet_if: 'Any puppy shows post-meal lethargy, wobbly gait, or seizures from Week 4',
  },
  {
    id_suffix: 'yorkie_neo_hypoglycemia_protocol',
    day_offset: 0,
    title: '⚠️ Hypoglycemia protocol: Same as Chihuahua — 90-min feeds in Week 1',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Yorkie neonates have the same hypoglycemia risk as Chihuahuas. Feed every 90 minutes in Week 1.',
    detail: 'HYPOGLYCEMIA EMERGENCY PROTOCOL — YORKIE VERSION\n\nWeek 1 feeding: every 90 MINUTES, around the clock. This is non-negotiable.\n\nSigns of hypoglycemia:\n- Sudden weakness or lethargy\n- Trembling\n- Pale or white gums\n- Seizure\n\nImmediate action:\n1. WARM FIRST — cold puppy cannot absorb glucose\n2. Rub Karo corn syrup or honey on gums — do not pour down throat\n3. Once warm and responsive: small amount of Esbilac\n4. Emergency vet within 30 minutes regardless of recovery\n\nDo NOT honey in puppies under 4 weeks (botulism concern) — use Karo corn syrup or Nutri-Cal instead.',
    call_vet_if: 'Any hypoglycemia symptoms — emergency vet within 30 minutes',
    emergency_contact_recommended: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const YORKSHIRE_TERRIER_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'yorkie_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Bold but fragile',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Yorkies are bold terriers in tiny bodies. Socialise to prevent fear-aggression.',
    detail: 'Yorkshire Terriers have terrier temperament — bold, confident, tenacious. Poorly socialised Yorkies become fear-aggressive, snap readily, and are difficult to manage.\n\nWeek 3 handling rules:\n- Always support the full body weight — never dangle\n- Handle from ground level or seated position only\n- 5–10 minutes per puppy of varied handling\n- Touch: paws, ears, mouth — essential for adult grooming (Yorkies need intensive grooming)\n- Introduce grooming tools early: soft brush against coat from Week 3',
  },
  {
    id_suffix: 'yorkie_social_week5_grooming',
    day_offset: 35,
    title: 'Socialization Week 5: Grooming desensitization is critical',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Yorkies require intensive grooming as adults. Grooming desensitization starts now.',
    detail: 'Yorkshire Terriers have a long silky coat that requires:\n- Daily brushing and combing\n- Regular baths (every 2–3 weeks)\n- Professional grooming every 6–8 weeks\n- Face cleaning daily\n\nA Yorkie that was never desensitised to grooming as a puppy snaps during every grooming session as an adult — a welfare issue for the dog and a practical problem for every groomer.\n\nFrom Week 5:\n1. Daily soft brush strokes — 2 minutes per puppy\n2. Face wiping with a damp cloth\n3. Gentle combing of ears and tail\n4. Paw holding and individual toe manipulation\n5. Tooth brushing introduction (finger brush with puppy paste)\n\nInform new owners: daily grooming practice before 12 weeks makes adult grooming a bonding experience rather than a battle.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const YORKSHIRE_TERRIER_TRAINING_EVENTS = [
  {
    id_suffix: 'yorkie_training_harness',
    day_offset: 35,
    title: 'HARNESS ONLY — critical for Yorkies',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Tracheal collapse and PSS risk make neck collars dangerous for Yorkies.',
    detail: 'NEVER use a neck collar on a Yorkshire Terrier for walking or restraint. Two reasons:\n\n1. Tracheal collapse: Yorkies are highly predisposed. Any collar pressure accelerates collapse.\n\n2. PSS: a dog with undiagnosed PSS that pulls and gags on a collar raises intracranial pressure — increasing risk of neurological crisis.\n\nFrom Week 5: introduce a soft H-shaped or Y-shaped harness.\nAllow puppies to wear it for 10 minutes at a time.\nBuild positive association: treats and play while wearing.\n\nInform new owners IN WRITING: harness only, for the dog\'s entire life.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const YORKSHIRE_TERRIER_HEALTH_RISKS = [
  {
    condition: 'Portosystemic Shunt (PSS)',
    timing: 'Signs often emerge 4 weeks–6 months when protein intake begins',
    risk_level: 'critical' as const,
    signs: ['Stunted growth compared to littermates', 'Post-meal lethargy or disorientation', 'Hypersalivation after eating', 'Seizures', 'Circling', 'Blindness episodes'],
    immediate_action: 'Urgent vet. Bile acid stimulation test required. Do not feed protein until vet consulted. Seizures = emergency vet immediately.',
    vet_decision: 'Urgent vet within 24 hours. Emergency vet for seizures.',
    note: '36× higher risk than average dog. Surgical correction is available and curative in most cases.',
  },
  {
    condition: 'Hypoglycemia',
    timing: 'Birth through 12 weeks highest risk; can occur throughout life',
    risk_level: 'critical' as const,
    signs: ['Lethargy', 'Trembling', 'Pale gums', 'Seizure', 'Unresponsive'],
    immediate_action: 'Warm first. Rub Karo on gums. Emergency vet within 30 minutes.',
    vet_decision: 'Emergency vet every time.',
    note: 'Feed every 90 min in Week 1, every 2 hrs Week 2, 4 meals/day until 12 weeks. Never fast under 4 months.',
  },
  {
    condition: 'Tracheal Collapse',
    timing: 'Can develop from 6 months; worsens with age',
    risk_level: 'high' as const,
    signs: ['Honking or goose-honk cough', 'Coughing when excited or pulling on lead', 'Gagging', 'Breathing difficulty in severe cases'],
    immediate_action: 'Harness immediately. Weight management. Avoid triggers (excitement, heat, irritants). Severe episode = call vet.',
    vet_decision: 'Call vet for ongoing coughing. Emergency vet if respiratory distress.',
    note: 'Prevention: harness only from puppy stage, maintain healthy weight, avoid smoke/dusty environments.',
  },
];
