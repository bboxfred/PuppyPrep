/**
 * INFO BASE: MALTIPOO
 * Applies to: Maltipoo (Maltese × Toy or Miniature Poodle)
 * Info base ID: 'maltipoo'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'maltipoo'.
 *
 * DATA QUALITY NOTE: Maltipoo has the WEAKEST breed-specific data of all breeds
 * in this database. Most clinical values are EXTRAPOLATED from parent breeds.
 * All extrapolations are flagged. Where values are especially uncertain, err on
 * the side of the more conservative/safer parent breed protocol.
 *
 * Sources: American Maltese Association (AMA), Poodle Club of America,
 * PMC11096582 (neonatal hypoglycemia risk thresholds — <75g small, <200g medium),
 * VIN/Veterinary Partner (toy breed hypoglycemia named Maltipoo explicitly),
 * PMC10747490 (patellar luxation OR 7.05 in Toy Poodles),
 * PMC6483903 (patellar luxation 38.1% in Toy Poodles, 20.3% overall),
 * Cornell TC (tracheal collapse — Toy Poodle, Maltese explicitly listed),
 * Tisdall PSS (Maltese 20× higher risk than other breeds),
 * VCA Animal Hospitals, Merck Vet Manual, FirstVet.
 *
 * ⚠️ CRITICAL FLAGS:
 * - HIGHEST hypoglycemia risk — Maltese AND Toy/Mini Poodle both predisposed
 *   Feed every 90 MINUTES in Week 1 for all Maltipoos
 *   Karo syrup must be within reach at all times
 * - PSS (Portosystemic Shunt): Maltese 20× higher risk; Toy Poodles also elevated
 *   Maltipoos BILATERALLY predisposed — elevated PSS risk
 * - White Shaker Syndrome: Maltese + Toy/Mini Poodle both listed — BILATERALLY predisposed
 * - Tracheal Collapse: BOTH parent breeds predisposed — HIGH RISK
 *   HARNESS ONLY — never a neck collar
 * - Patellar Luxation: Toy Poodle 38.1% prevalence (PMC6483903)
 * - PRA-prcd: Poodle side — DNA test mandatory
 * - Dental crowding: Maltese predisposed — daily brushing from 8 weeks
 * - TUBE SIZE: 3.5 Fr for <150g; 5 Fr for 150–250g
 * - HYBRID VIGOR NOT DEMONSTRATED for Maltipoos (no peer-reviewed data)
 */

export const MALTIPOO_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 2, max: 5, typical: 3 },    // EXTRAPOLATED from parent breed data
  newborn_weight_grams: { min: 85, max: 170, typical: 130 },   // EXTRAPOLATED (Maltese ref 113g, Toy Poodle 90–180g)
  adult_weight_kg: {
    toy_maltipoo:  { min: 2.3, max: 4.5 },
    mini_maltipoo: { min: 3.6, max: 9   },
  },
  size_category: 'toy' as const,
  hypoglycemia_risk: 'high' as const,    // BOTH parent breeds toy/small — HIGHEST risk
  singleton_risk: true,
  csection_rate_percent: 15,    // EXTRAPOLATED — toy-breed bitches frequently require surgical delivery
  brachycephalic: false,        // Maltese slightly shortened muzzle — NOT clinically brachycephalic

  weight_targets: {
    // EXTRAPOLATED from Maltese growth charts (AMA ref)
    birth:  { min: 85,  max: 170,  typical: 130  },
    day_7:  { min: 160, max: 310,  typical: 235  },
    day_14: { min: 240, max: 440,  typical: 340  },
    week_3: { min: 340, max: 620,  typical: 480  },
    week_4: { min: 475, max: 875,  typical: 675  },
    week_6: { min: 790, max: 1450, typical: 1120 },
    week_8: { min: 1050, max: 1950, typical: 1500 },
  },

  daily_gain_minimum_grams: 5,
  daily_gain_target_grams: 10,
  daily_gain_percent_bodyweight: 8,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 2.5, week_5: 2.0,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 1.0, max: 2.5, per_100g_body_weight: 1.5 },
    week_2: { min: 2.0, max: 4.0, per_100g_body_weight: 1.8 },
    week_3: { min: 3.0, max: 6.0, per_100g_body_weight: 2.0 },
    week_4: { min: 5.0, max: 9.0, per_100g_body_weight: 2.5 },
  },

  // ⚠️ ALL MALTIPOOS: Feed every 90 MINUTES in Week 1 — HIGH hypoglycemia risk
  feeding_frequency_hours: {
    week_1: 1.5,   // 90 MINUTES — non-negotiable for this breed
    week_2: 2,
    week_3: 2.5,
    week_4: 3,
  },

  tube_size_french: 3.5,   // 3.5 Fr for <150g; 5 Fr for 150g+ — measure puppy
  max_stomach_capacity_ml_per_100g: 4,

  whelping_box_temp_celsius: {
    week_1:      { min: 30, max: 32, ideal: 32   },   // Higher than medium breeds
    week_2:      { min: 28, max: 30, ideal: 29   },
    week_3:      { min: 26, max: 28, ideal: 27   },
    week_4_plus: { min: 23, max: 26, ideal: 24   },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 36.1, danger_below: 34.5 },
    day_5_14:    { min: 35.0, max: 37.0, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 60, d: 60 },
    large_litter:  { w: 75, d: 75 },
    pig_rail_height_cm: 5,
    wall_height_cm: 25,
  },
};

export const MALTIPOO_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, label: 'First deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg — 1 cc syringe required', targets: ['roundworms', 'hookworms'], plain_english: 'Give worm treatment to all Maltipoo puppies. A 130g Maltipoo at 2 weeks needs only 1.3 mg of pyrantel — use a 1 cc syringe for precision. NEVER estimate. Tiny error = significant overdose at this weight.', vet_required: false, critical: true },
    { day: 28, label: 'Second deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Second treatment. Weigh on the day. Use 1 cc syringe.', vet_required: false, critical: true },
    { day: 42, label: 'Third deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily x 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Third treatment — Panacur for 3 days.', vet_required: false, critical: true },
    { day: 56, label: 'Fourth deworming (pre-rehoming)', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily x 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Final deworming. Panacur for 3 days.', vet_required: false, critical: true },
  ],
  dam_deworming: {
    start_day_of_pregnancy: 40, end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth. Maltipoo dams are tiny — calculate dose from confirmed current weight using 1 cc syringe.',
    critical: true,
  },
  vaccinations: [
    { week: 6,  label: 'First vaccination', vaccine: 'DHPP #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'First vaccination at 6-8 weeks. ALWAYS feed 1-2 hours BEFORE the vet visit. Keep puppy warm. Have Karo syrup at the clinic in case of stress-induced hypoglycemia. Have warming pack ready.', vet_required: true, critical: true },
    { week: 10, label: 'Second vaccination', vaccine: 'DHPP #2', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'Second vaccination. Discuss Lepto timing with vet — separate visit preferred for tiny Maltipoos to reduce reaction/stress risk.', vet_required: true, critical: true },
    { week: 14, label: 'Third vaccination', vaccine: 'DHPP #3 + Rabies', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Rabies'], plain_english: 'Third vaccination plus Rabies. Feed before visit.', vet_required: true, critical: true },
    { week: 18, label: 'Final parvo booster', vaccine: 'DHPP #4 (final)', covers: ['Distemper', 'Parvovirus'], plain_english: 'Do not skip.', vet_required: true, critical: true },
  ],
  vet_visits: [
    { day: 0,   label: 'Post-whelping dam check', urgency: 'within_24_hours', plain_english: 'Vet check within 24 hours. Confirm all foetuses delivered — tiny dam with singleton makes retained puppy easy to miss. Check milk supply starting. Dam should be offered food within 4 hours of last puppy born.', critical: true },
    { week: 1,  label: 'Dam and litter check', urgency: 'day_7', plain_english: 'One-week check. Every Maltipoo puppy must be gaining at least 5g per day. A puppy <75% of litter average weight = priority supplemental feeding. Any puppy not regaining birth weight by day 3 = begin Esbilac supplementation immediately.', critical: true },
    { week: 6,  label: 'Puppy wellness + PSS bile acid screen discussion', urgency: 'week_6_to_8', plain_english: 'First vet visit. CRITICAL: discuss PSS (portosystemic shunt) bile acid test with vet. Maltese have 20x higher PSS risk than other breeds; Toy Poodles also elevated. Any Maltipoo puppy that is notably smaller than littermates OR shows post-meal sleepiness should have bile acid stimulation test at this visit. Also: patellar palpation, ear inspection, cardiac auscultation.', critical: true },
    { week: 8,  label: 'Pre-rehoming health check', urgency: 'before_leaving', plain_english: 'Final check. HARNESS ONLY instruction in writing — non-negotiable. Hypoglycemia protocol in writing including feeding schedule. PSS bile acid test recommendation for all Maltipoos at 8-16 weeks. White Shaker Syndrome awareness. Dental brushing routine starts now.', critical: true },
  ],
  breed_specific_screenings: [
    {
      name: 'PSS — Bile Acid Stimulation Test',
      timing: '8-16 weeks — RECOMMENDED for all Maltipoos (EXTRAPOLATED from Maltese 20x risk and Toy Poodle elevated risk)',
      method: 'Pre- and post-prandial bile acid stimulation test',
      plain_english: 'Portosystemic shunt (liver shunt) causes neurological signs from protein ingestion. Maltese have 20× higher risk than other breeds (Tisdall study); Toy and Mini Poodles also on elevated-risk list. Maltipoos are BILATERALLY predisposed — the risk may be additive. Bile acid test at 8-16 weeks is strongly recommended. Any post-prandial result above 100 µmol/L is strongly suggestive of PSS. Surgical correction is available and curative in most cases.',
      mandatory_for_breeding: false,
    },
    {
      name: 'PRA-prcd — DNA test Poodle parent',
      timing: 'DNA test both parents before breeding',
      method: 'DNA test (UC Davis VGL — direct mutation test, NOT Embark linkage)',
      plain_english: 'prcd-PRA from Poodle side causes progressive blindness. Use direct-mutation lab (UC Davis VGL, GenSol, PawPrints) — NOT Embark linkage test which had only 33% accuracy vs direct-mutation in Toy Poodles (UC Davis comparison). Clear parents = no affected offspring.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Patellar Luxation — OFA grading',
      timing: 'From 12 months for breeding; clinical assessment at every puppy visit',
      method: 'OFA patellar evaluation',
      plain_english: 'Toy Poodles have 38.1% patellar luxation prevalence (PMC6483903); Maltese also predisposed. Grade at puppy visits. Grade I-II: conservative management (no jumping, ramps). Grade III-IV: surgical correction.',
      mandatory_for_breeding: false,
    },
    {
      name: 'Tracheal collapse monitoring',
      timing: 'Lifetime — harness from Day 1; watch for honking cough from 6 months',
      method: 'Clinical assessment; fluoroscopy for confirmation if needed',
      plain_english: 'BOTH Maltese and Toy/Mini Poodles are predisposed to tracheal collapse (Cornell; VCA; University of Tennessee). Maltipoos are at HIGH RISK. Honking cough, especially when excited — HARNESS ONLY, weight management, avoid dusty environments.',
      mandatory_for_breeding: false,
    },
  ],
};

export const MALTIPOO_PREGNANCY_EVENTS = [
  {
    id_suffix: 'maltipoo_preg_supplies',
    day_offset: -14,
    title: 'Toy breed supplies: Order precise supplies — Maltipoo neonates are among the smallest',
    category: 'environment' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Maltipoo neonates at 85–170g require the smallest possible feeding equipment. Order now.',
    detail: 'Order before birth:\n\n- French 3.5 feeding tube × 2 (NOT the standard French 8 — verify this size)\n- 1 cc syringes × 30 (for precise tiny doses)\n- Karo light corn syrup — on the counter, not the cupboard. Always within arm\'s reach.\n- Digital scale accurate to ±1 gram (capacity 0–2000g)\n- Whelping box 60 × 75 cm\n- Heating pad + thermometer\n- Small warm box for supplemental puppies while dam rests\n- Esbilac puppy milk replacer\n- Nutri-Cal gel (alternative to Karo, same purpose)\n\nFrench 5 tube can be used if puppies are >150g and feeding well. For very small pups <100g: French 3.5 is essential — a French 5 in a 90g puppy risks trauma.\n\nNOTE: Standard "puppy supplies" from pet stores are sized for medium breeds. Order specifically from veterinary supply companies for toy breed supplies.',
  },
  {
    id_suffix: 'maltipoo_preg_csection_plan',
    day_offset: -21,
    title: 'C-section planning: Toy-breed bitches frequently require surgical delivery',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Maltipoo dams are tiny. Singleton or small-litter Maltipoos are at elevated C-section risk.',
    detail: 'Maltipoo dams can weigh as little as 2–3 kg. At this size:\n\n1. Singleton puppies grow oversized relative to the tiny pelvis — high dystocia risk\n2. Toy-breed bitches with very small pelves "frequently require surgical delivery" (Evans & Adams)\n\nAction NOW:\n1. Call your vet this week to discuss the whelping plan\n2. Confirm they can perform emergency C-section if needed\n3. Ask: "Given this dam\'s size and this litter size, should we plan an elective C-section?"\n4. For singleton Maltipoo litters: discuss elective C-section at Day 63 with vet\n5. Identify nearest 24-hour surgical facility and have number confirmed\n\nDystocia triggers (go immediately):\n- No puppy after 2 hours of strong active contractions\n- Bright green discharge without a puppy within 4 hours\n- 4+ hours between puppies with ongoing labour\n- Dam in extreme distress',
    call_vet_if: 'No puppy after 2 hours of strong contractions',
    emergency_contact_recommended: true,
  },
];

export const MALTIPOO_NEONATAL_EVENTS = [
  {
    id_suffix: 'maltipoo_neo_hypoglycemia_protocol_90min',
    day_offset: 0,
    title: '⚠️ ALL Maltipoos: Feed every 90 MINUTES in Week 1 — highest possible hypoglycemia risk',
    category: 'nutrition' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Maltipoos have the highest hypoglycemia risk of all designer breeds. Both Maltese and Toy/Mini Poodle parent breeds are explicitly named in toy-breed hypoglycemia literature.',
    detail: 'MALTIPOO WEEK 1 FEEDING PROTOCOL:\n\nFeed every 90 MINUTES, around the clock, 24 hours a day.\n\nThis is not optional. Both parent breeds are among the highest-risk breeds for neonatal hypoglycemia. The combination makes this the highest-risk designation.\n\nWhy 90 minutes and not 2 hours:\n- Maltipoos at 85–170g have extremely limited glycogen storage\n- High surface-area-to-body-mass ratio = rapid heat loss = rapid energy consumption\n- Tiny stomach capacity means each feed can only deliver a small amount\n- These three factors combined mean blood glucose drops dangerously within 90 minutes\n\nVOLUME:\n- 1.5 ml per 100g body weight per feed\n- Example: 130g puppy = approximately 2 ml per feed\n- NEVER exceed 4 ml per 100g per feed — overfeeding causes aspiration\n\nTEMPERATURE:\n- Formula warmed to 38°C / 100°F\n- NEVER feed a cold puppy — warm to rectal temperature ≥35°C first\n\nHYPOGLYCEMIA EMERGENCY:\n1. WARM FIRST — cold puppy cannot absorb glucose\n2. Rub Karo corn syrup on gums — do NOT pour down throat\n3. Repeat every 15–20 minutes until puppy is responsive\n4. Emergency vet within 30 minutes regardless of recovery\n\nSigns: lethargy, weakness, trembling, pale gums, seizure, unresponsiveness.\n\nFrom Week 2: every 2 hours.\nFrom Week 3: every 2.5 hours.',
    call_vet_if: 'Any hypoglycemia symptoms — emergency vet within 30 minutes',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'maltipoo_neo_pss_watch',
    day_offset: 28,
    title: 'Week 4: Watch for PSS signs when solid food begins — post-meal neurological signs',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'PSS (portosystemic shunt) typically shows first signs when puppies begin eating protein. Watch from Week 3–4.',
    detail: 'Portosystemic shunt (PSS / liver shunt) bypasses the liver, allowing ammonia from protein digestion to reach the brain.\n\nWatch from Week 4 when protein intake begins:\n\nSigns to watch for (typically in the 1–3 hours AFTER eating):\n- Post-meal lethargy — puppy eats then seems drunk, wobbly, or "glazed"\n- Hypersalivation (drooling) after eating\n- Confusion or disorientation after meals\n- Failure to regain body weight despite nursing\n- Notably smaller than littermates\n- Any seizure activity\n\nPSS puppies often appear completely normal BETWEEN meals — the signs are protein-triggered.\n\nMaltipoos are BILATERALLY predisposed to PSS from both Maltese (20× higher risk than average dog) and Toy Poodle (also elevated). Vigilance from the first protein feeding is essential.\n\nAny of these signs: urgent vet within 24 hours for bile acid stimulation test.',
    call_vet_if: 'Any puppy shows post-meal lethargy, drooling, wobbly gait, or seizures — urgent vet within 24 hours',
  },
  {
    id_suffix: 'maltipoo_neo_new_owner_karo',
    day_offset: 49,
    title: 'Week 7: Hypoglycemia protocol for every new Maltipoo owner — in writing',
    category: 'nutrition' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Every Maltipoo new owner must receive written hypoglycemia instructions. This is your responsibility as a breeder. Without it, puppies die.',
    detail: 'Give every Maltipoo new owner this information IN WRITING and VERBALLY:\n\nFEEDING SCHEDULE:\n- Under 12 weeks: 4–5 meals per day, maximum 4-hour gaps\n- Never fast under 4 months\n- Keep Karo corn syrup / Nutri-Cal gel accessible at all times\n\nHYPOGLYCEMIA SIGNS:\n- Sudden weakness or lethargy\n- Trembling or shaking\n- Pale or white gums\n- Seizure\n- Unresponsive\n\nIMIMEDIATE ACTION:\n1. WARM the puppy first — cold gums cannot absorb glucose\n2. Rub Karo corn syrup on gums and inside cheeks — small amount\n3. Do NOT pour liquid down throat — aspiration risk\n4. Repeat every 15 minutes if no improvement\n5. Emergency vet within 30 minutes regardless\n\nTRIGGERS to watch for:\n- Cold temperatures\n- Missing a meal\n- Stress (new home, vet visit, car trip)\n- Vigorous play without food beforehand\n- Illness\n\nThis information is what stands between your puppy being alive and dead in its first week at home. Provide it as a printed card with the puppy.',
  },
];

export const MALTIPOO_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'maltipoo_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Gentle, curious, and people-oriented',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Maltipoos are people-oriented and curious. Broad socialisation from Week 3 creates the charming, adaptable companion.',
    detail: 'From Week 3:\n- Daily handling by 8+ different people\n- Handle from the ground — these puppies are fragile and fall injuries are serious\n- Touch: paws, ears, mouth, face — essential for dental care and grooming\n- Brief separations from Week 5 — Maltipoos can develop attachment anxiety\n- Grooming desensitization from Week 3: daily gentle brush, hair dryer at distance',
  },
  {
    id_suffix: 'maltipoo_social_week4_large_dogs',
    day_offset: 28,
    title: 'Socialization Week 4: Safe large dog exposure — size creates real danger',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Maltipoos that never meet large dogs become reactive and fearful — and a panicking Maltipoo can be killed by a large dog\'s reflex.',
    detail: 'At 2–5 kg, a Maltipoo can be seriously injured or killed in an incident with a large dog, even a well-meaning one.\n\nFrom Week 4 — controlled large dog exposure:\n- Only known, calm, fully vaccinated large dogs\n- Large dog at a distance of 3–4 metres initially\n- Reward Maltipoo puppy for calm observation\n- Gradually decrease distance over sessions\n- Never allow large dog to approach the puppy\'s face in Week 4\n\nInform new owners:\n- Maltipoos must always be on lead in areas with off-lead large dogs\n- A Maltipoo that is reactive to large dogs due to lack of exposure will panic — and panic in small dogs can trigger prey responses in large dogs\n- Pick up the Maltipoo if an off-lead large dog approaches — this is not coddling, it is safety management',
  },
];

export const MALTIPOO_TRAINING_EVENTS = [
  {
    id_suffix: 'maltipoo_training_harness_critical',
    day_offset: 35,
    title: 'HARNESS ONLY — Tracheal collapse and PSS make this medically critical',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Both parent breeds are predisposed to tracheal collapse. Neck collars accelerate this in Maltipoos. Harness from Week 5.',
    detail: 'NEVER use a neck collar on a Maltipoo. Two reasons:\n\n1. TRACHEAL COLLAPSE: Both Maltese and Toy/Mini Poodles are explicitly listed as predisposed breeds. Collar pressure on the trachea directly triggers and accelerates collapse. Lifelong harness use is the only preventive management available. Cornell, VCA, and University of Tennessee all specifically recommend switching to harness.\n\n2. PSS: If a Maltipoo has undiagnosed PSS, pulling and gagging on a collar raises intracranial pressure, potentially precipitating neurological episodes.\n\nFrom Week 5: introduce a soft H-shaped or Y-chest harness with positive conditioning.\nFrom Week 6: short lead practice while wearing harness.\n\nInform every new owner IN WRITING: harness only, for life. This is non-negotiable medical management.',
  },
];

export const MALTIPOO_HEALTH_RISKS = [
  {
    condition: 'Hypoglycemia (Low Blood Sugar)',
    timing: 'Birth through 12 weeks highest risk; can occur throughout life especially under stress',
    risk_level: 'critical' as const,
    signs: ['Sudden lethargy or weakness', 'Trembling or shaking', 'Pale or white gums', 'Seizure', 'Unresponsive'],
    immediate_action: 'Warm first. Karo on gums. Emergency vet within 30 minutes regardless of recovery.',
    vet_decision: 'Emergency vet every time — never wait to see if it improves.',
    note: 'BOTH parent breeds are in the highest-risk toy breed category. 90-minute feeds in Week 1. 4+ meals daily until 12 weeks. Never fast under 4 months.',
  },
  {
    condition: 'Portosystemic Shunt (PSS)',
    timing: 'Signs typically emerge Week 4–6 months when protein intake begins',
    risk_level: 'critical' as const,
    signs: ['Post-meal lethargy or disorientation', 'Hypersalivation after eating', 'Stunted growth vs littermates', 'Seizures', 'Circling or blindness episodes'],
    immediate_action: 'Urgent vet within 24 hours. Bile acid stimulation test. Seizures = emergency vet immediately.',
    vet_decision: 'Urgent vet within 24 hours. Emergency for seizures.',
    note: 'Maltese 20× higher risk (Tisdall). Toy Poodles also elevated. Maltipoos BILATERALLY predisposed. Bile acid test at 8-16 weeks recommended.',
  },
  {
    condition: 'White Shaker Syndrome / Generalized Tremor Syndrome',
    timing: 'Typically 9 months to 3 years',
    risk_level: 'high' as const,
    signs: ['Whole-body tremors — fine or coarse shaking', 'Unsteady gait', 'Nystagmus (rapid eye movements)', 'Seizures in severe cases'],
    immediate_action: 'Urgent vet within 24 hours. Steroid treatment (prednisolone) is highly effective — most dogs recover fully within 1 week.',
    vet_decision: 'Urgent vet within 24 hours. Not an immediate emergency unless seizuring.',
    note: 'Both Maltese and Poodles are listed as predisposed breeds — Maltipoos are BILATERALLY predisposed. Autoimmune suspected; no DNA test. Excellent prognosis with prednisolone.',
  },
  {
    condition: 'Tracheal Collapse',
    timing: 'Can develop from 6 months; progressive without management',
    risk_level: 'high' as const,
    signs: ['Honking or goose-honk cough', 'Coughing when excited or on lead', 'Gagging', 'Breathing difficulty in severe cases'],
    immediate_action: 'Harness immediately. Weight management. Vet appointment for diagnosis and anti-tussive medication.',
    vet_decision: 'Call vet within a week of persistent honking cough.',
    note: 'Both parent breeds predisposed — HIGH RISK. Prevention only: harness from Day 1, lean body weight, avoid airway irritants.',
  },
  {
    condition: 'Patellar Luxation',
    timing: 'Detectable from first puppy visit; symptoms variable by grade',
    risk_level: 'high' as const,
    signs: ['Intermittent three-legged skipping gait', 'Occasional yelp then recovery', 'Holding leg off ground briefly'],
    immediate_action: 'Book vet for grading. Grade I-II: conservative management. Grade III-IV: surgical correction.',
    vet_decision: 'Call vet within a week. Not an emergency.',
    note: 'Toy Poodle 38.1% prevalence (PMC6483903). Patellar grading at every puppy visit.',
  },
];
