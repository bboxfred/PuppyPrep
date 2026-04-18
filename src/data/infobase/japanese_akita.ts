/**
 * INFO BASE: JAPANESE AKITA (Akita Inu)
 * Applies to: Japanese Akita Inu (FCI #255), purebred Japanese lines
 * Info base ID: 'japanese_akita'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'japanese_akita'.
 * This file is SEPARATE from american_akita.ts due to different conformation,
 * health profile, and registry requirements.
 *
 * Sources: FCI Standard #255, Japanese Akita Club of America (JACA),
 * Kennel Club UK (AI/FEH DNA scheme since October 2020),
 * Angles et al. 2005 PubMed 16305682 (VKH DLA-DQA1*00201, OR ~15.3),
 * Glickman et al. 2000 PubMed 10638316 (Akita ~25 GDV cases/1000 dog-years),
 * Reichler et al. 2001 PubMed 11906649 (SA in Akitas 24%),
 * Merck Vet Manual, Cornell CVM, VCA Animal Hospitals, AKC.
 *
 * ⚠️ CRITICAL FLAGS:
 * - VKH (Vogt-Koyanagi-Harada / Uveodermatologic Syndrome): Akitas ~80% of all
 *   canine UDS cases; up to 4.1% of Akitas affected (JAVMA 2018)
 *   DLA-DQA1*00201 marker (OR ~15.3); no validated commercial DNA test
 * - Familial Enamel Hypoplasia (AI/FEH): UK KC DNA scheme since 2020 — MANDATORY
 * - Sebaceous Adenitis: 24% of Akitas showed SA in histologic study
 * - GDV: high-risk breed (~25 cases/1,000 dog-years — 4th highest breed)
 * - Dense double coat: whelping environment cooler than standard
 * - Japanese lines ~15–25% lighter than American Akita — do NOT use American
 *   Akita weight references for growth targets
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const JAPANESE_AKITA_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 3, max: 9, typical: 6 },
  newborn_weight_grams: { min: 380, max: 600, typical: 490 },  // Japanese lines ~15–25% lighter than AA
  adult_weight_kg: {
    male:   { min: 32, max: 45 },   // JACA/FCI reference
    female: { min: 23, max: 34 },
  },
  size_category: 'large' as const,
  hypoglycemia_risk: 'low' as const,
  singleton_risk: false,
  csection_rate_percent: 10,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 380, max: 600,  typical: 490  },
    day_7:  { min: 700, max: 1080, typical: 890  },
    day_14: { min: 1010, max: 1530, typical: 1270 },
    week_3: { min: 1440, max: 2200, typical: 1820 },
    week_4: { min: 2050, max: 3100, typical: 2575 },
    week_6: { min: 3400, max: 5200, typical: 4300 },
    week_8: { min: 4600, max: 7200, typical: 5900 },
  },

  daily_gain_minimum_grams: 28,
  daily_gain_target_grams: 55,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.5, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 8,  max: 13, per_100g_body_weight: 1.8 },
    week_2: { min: 13, max: 20, per_100g_body_weight: 2.0 },
    week_3: { min: 19, max: 28, per_100g_body_weight: 2.5 },
    week_4: { min: 27, max: 40, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 8,
  max_stomach_capacity_ml_per_100g: 4,

  // ⚠️ DOUBLE-COATED BREED: Keep 1–2°C cooler than standard; provide dam cooling area
  whelping_box_temp_celsius: {
    week_1:      { min: 28, max: 31,   ideal: 29.5 },
    week_2:      { min: 25.5, max: 28, ideal: 27   },
    week_3:      { min: 23,   max: 26, ideal: 24.5 },
    week_4_plus: { min: 20,   max: 23, ideal: 21.5 },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 37.2, danger_below: 35.0 },
    day_5_14:    { min: 35.0, max: 37.2, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 120, d: 120 },
    large_litter:  { w: 150, d: 150 },
    pig_rail_height_cm: 10,
    wall_height_cm: 50,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const JAPANESE_AKITA_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Japanese Akita puppies. Weigh each puppy before dosing — Japanese Akita puppies at 2 weeks weigh 700–1000g, which is significantly less than American Akita puppies from the same age. Use the actual weight on the day.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Use current weight on the day of treatment.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment — Panacur for 3 consecutive days.',
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
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth. A Japanese Akita dam weighs 23–34 kg — calculate dose from confirmed current weight.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. Japanese Akitas have elevated immune-mediated condition rates from reduced DLA diversity. Monitor for post-vaccination reactions (fever, injection site swelling, lethargy) and report to vet promptly. Keep the whelping area cool during handling — double-coated breed.',
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
      plain_english: 'Do not skip.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check — double coat overheating',
      urgency: 'within_48_hours',
      plain_english: 'Vet check within 48 hours. Check dam carefully for overheating — a double-coated Akita dam nursing in a warm environment can overheat without obvious signs. Provide a cool area adjacent to the whelping box where she can retreat. Confirm all placentas passed and milk supply adequate.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm all puppies gaining at minimum 28g per day. Monitor dam body temperature — double coat breeds can run warmer.',
      critical: true,
    },
    {
      week: 6,
      label: '⚠️ Puppy wellness + AI/FEH DNA + GDV prevention briefing',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. CRITICAL: discuss AI/FEH (Familial Enamel Hypoplasia) DNA test — UK KC scheme since 2020; required for all Japanese Akita Inu litters under KC registration in UK. Also discuss GDV prevention protocol with new owners.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check. AI/FEH DNA status disclosure to all new owners. VKH awareness briefing. GDV prevention protocol in writing. SA monitoring instructions. IMPORTANT: Akita serum potassium is falsely elevated on standard blood panels due to high-potassium erythrocytes — inform new owners so future vets are not misled by apparent hyperkalaemia.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'AI/FEH — Familial Enamel Hypoplasia — DNA test',
      timing: 'KC DNA scheme since October 2020 — test BOTH parents before breeding',
      method: 'DNA test (Kennel Club approved scheme — Animal Health Trust / Laboklin)',
      plain_english: 'Familial Enamel Hypoplasia (also called Amelogenesis Imperfecta) causes abnormal tooth enamel formation — teeth appear brown, pitted, and worn severely. Puppies are affected from the moment permanent teeth erupt. Autosomal recessive. UK KC requires DNA result to register Japanese Akita Inu litters since October 2020. Test both parents.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months; PennHIP from 16 weeks',
      method: 'OFA radiograph or PennHIP',
      plain_english: 'Hip dysplasia is elevated in Akitas (breed average above general population). OFA hip certification required for JACA CHIC. Note: all published OFA Akita data combines Japanese and American lines — no Japanese-specific split is available.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Eye certification — CAER annual',
      timing: 'Annual CAER exam from age 1',
      method: 'CAER ophthalmologist exam',
      plain_english: 'Annual CAER eye certification required for JACA CHIC. Covers PRA (prcd offered but no single confirmed primary mutation for Japanese Akita), progressive retinal atrophy, and other ocular conditions.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Thyroid screening',
      timing: 'Annual thyroid panel from age 2',
      method: 'OFA thyroid panel with TgAA (anti-thyroglobulin antibody)',
      plain_english: 'Autoimmune thyroiditis occurs in the Akita breed. Annual thyroid screening including TgAA recommended for breeding stock.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Sebaceous Adenitis — OFA skin biopsy',
      timing: 'OFA skin biopsy from age 2 for breeding stock',
      method: 'OFA registered skin punch biopsy',
      plain_english: 'SA affects 24% of Akitas in histologic study (Reichler 2001). Autoimmune destruction of sebaceous glands. Annual skin biopsy punch test from age 2 for breeding stock. SA is manageable but not curable.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const JAPANESE_AKITA_PREGNANCY_EVENTS = [
  {
    id_suffix: 'ja_preg_gdv_prevention',
    day_offset: -28,
    title: '⚠️ GDV prevention protocol starts today — Japanese Akitas are high risk',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Akitas are among the top 5 GDV-risk breeds (~25 cases/1,000 dog-years, 4th highest — Glickman 2000). Pregnancy increases this risk further.',
    detail: 'Gastric Dilatation-Volvulus (GDV/Bloat) is a life-threatening emergency where the stomach fills with gas and twists. Glickman et al. 2000 documented Akitas at approximately 25 cases per 1,000 dog-years — the 4th highest of all breeds surveyed.\n\nFROM TODAY — implement permanently:\n1. Feed 3–4 small meals daily — never one large meal\n2. No exercise for 1 full hour before and 2 full hours after eating\n3. Do NOT use elevated food bowls — evidence shows these INCREASE GDV risk\n4. Keep feeding calm and unhurried\n5. Slow-feeder bowl if the dam eats quickly\n\nGDV EMERGENCY SIGNS (fatal within 1–2 hours without surgery):\n🔴 Unproductive retching — trying to vomit with nothing coming up\n🔴 Abdomen visibly distended and drum-hard\n🔴 Extreme restlessness — cannot settle\n🔴 Pale or white gums\n\nDrive to emergency vet immediately. Do not call — drive.\n\nDiscuss prophylactic gastropexy with your vet — it can be done at time of spay and eliminates the fatal torsion component of GDV for life.',
    call_vet_if: 'Any GDV signs — EMERGENCY, drive immediately',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'ja_preg_temperature_double_coat',
    day_offset: -21,
    title: 'Whelping environment: Double coat means cooler whelping area required',
    category: 'environment' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Japanese Akita dams have a thick double undercoat. Standard whelping temperatures will cause the dam to overheat. Maintain a cooler environment with a warm zone for puppies.',
    detail: 'The Japanese Akita\'s dense double coat means the dam retains significantly more body heat than single-coated breeds.\n\nWhelping area setup:\n1. Keep the whelping box ambient temperature at 28–31°C (not the standard 29.5–32°C)\n2. Provide a cooler adjacent area (24–26°C) where the dam can retreat between nursing sessions\n3. Keep the whelping room well-ventilated — air flow without cold draughts\n4. Have cold fresh water available for the dam at all times\n\nSigns the dam is overheating:\n- Heavy, prolonged panting beyond normal labour exertion\n- Moving away from the puppies and lying in cooler spots\n- Dark red gums or gums that go from pink to deep red\n- Weakness or wobbling\n\nIf overheating is suspected: wet towels on neck, armpits, and groin of the dam. Move to cooler area. Emergency vet if gums go grey or dam collapses.',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'ja_preg_ai_feh_check',
    day_offset: -42,
    title: '⚠️ AI/FEH DNA test — confirm both parents tested (UK KC mandatory since 2020)',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Familial Enamel Hypoplasia (AI/FEH) is a mandatory KC DNA scheme for Japanese Akita Inu breeders in the UK since October 2020.',
    detail: 'Familial Enamel Hypoplasia (Amelogenesis Imperfecta) is an autosomal recessive condition causing malformed tooth enamel in Japanese Akita Inus.\n\nAffected dogs: permanent teeth are brown, pitted, and severely worn from the moment they erupt. Dental disease begins at tooth eruption (4–6 months). Pain from dental hypersensitivity is significant.\n\nDNA test status guide:\n✅ Both parents CLEAR: No affected puppies possible\n⚠️ One parent CARRIER: 50% of puppies will be carriers (unaffected, but should not be bred to another carrier)\n🔴 Both parents CARRIERS: 25% of puppies will be affected\n\nIf parents are untested: order the KC-approved DNA test immediately. Results in 1–2 weeks.\n\nAll new owners must receive AI/FEH DNA status in writing.',
  },
  {
    id_suffix: 'ja_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Confirm count and presentation',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58. Japanese Akita litters of 5–7 need accurate count.',
    detail: 'Pre-whelping X-ray at Day 55–58:\n\n- Confirm exact puppy count — tape to whelping box\n- Check foetal presentation — Akitas have large foetuses relative to some breeds\n- Note any single oversized puppy\n\nWith ~10% C-section rate: confirm vet emergency availability for whelping date. Ensure vet is familiar with double-coated breed anaesthesia (overheating risk during preparation).',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const JAPANESE_AKITA_NEONATAL_EVENTS = [
  {
    id_suffix: 'ja_neo_temperature_double_coat',
    day_offset: 0,
    title: 'Days 0–28: Whelping box temperature LOWER than standard — double coat insulation',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Japanese Akita puppies begin developing their double coat from birth. Temperature monitoring is more critical, not less.',
    detail: 'From birth, Japanese Akita puppies develop insulating undercoat faster than single-coated breeds. The whelping box temperature targets are 1–2°C lower than the general breed standard.\n\nWeek 1 target: 28–31°C (vs standard 29.5–32°C)\n\nSigns temperature is too HIGH in Akita puppies:\n- Puppies spread to the edges of the box, away from the dam and each other\n- Excessive crying when full\n- Panting (unusual in healthy neonates)\n\nSigns temperature is too LOW:\n- Puppies piled on top of each other in the centre\n- Cold to the touch\n- Crying, weak suckling\n\nAlways use rectal temperature as primary guide — target 35–37°C in Week 1. Adjust ambient temperature based on puppy behaviour and rectal readings.',
    call_vet_if: 'Any puppy has rectal temperature below 35°C or above 39°C',
  },
  {
    id_suffix: 'ja_neo_microcytosis_normal',
    day_offset: 28,
    title: 'Week 4: Brief new owners on Akita microcytosis — do not misinterpret',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Akitas have naturally small red blood cells (microcytosis) and high-potassium RBCs — normal findings in this breed that look like disease on standard blood panels.',
    detail: 'Two Akita-specific blood findings that are NORMAL must be disclosed to every new owner and their vet:\n\n1. MICROCYTOSIS: Akitas have genetically smaller red blood cells (MCV lower than breed average). If a vet sees microcytosis on a CBC, they may investigate for iron deficiency or liver shunt. In Akitas, this is a normal breed variant — NOT a disease.\n\n2. HIGH SERUM POTASSIUM: Akitas have high-potassium erythrocytes (HK phenotype). When a blood sample sits or undergoes any in-tube hemolysis, potassium leaks from the cells into the serum. This creates FALSELY ELEVATED serum potassium on the result. A reading of K+ 6–8 mmol/L in an Akita that appears well is almost certainly artifactual — not real hyperkalaemia.\n\nConsequences of not knowing this: vets unfamiliar with Akitas may treat for iron deficiency or cardiac hyperkalaemia — both treatments could harm a healthy dog.\n\nGive every new Akita owner a printed note to hand to any new vet: "This is an Akita. Microcytosis is normal. Elevated serum potassium is likely artifactual (HK erythrocytes). Please run PCV, reticulocytes, and repeat potassium on fresh sample before treating."',
  },
  {
    id_suffix: 'ja_neo_vkh_awareness',
    day_offset: 35,
    title: 'Week 5: VKH awareness — brief every new Akita owner before they leave',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Uveodermatologic Syndrome (VKH-like) is the most distinctive and serious immune-mediated condition in Japanese Akitas. Early recognition saves vision.',
    detail: 'Vogt-Koyanagi-Harada-like Syndrome (Uveodermatologic Syndrome / UDS) is an immune-mediated condition where the immune system attacks melanocytes — cells that produce pigment in the eye, skin, and hair.\n\nAkitas account for approximately 80% of all reported canine UDS cases. Prevalence in Akitas is estimated up to 4.1% (JAVMA 2018). DLA-DQA1*00201 is a known risk marker (OR ~15.3, Angles 2005).\n\nSigns — typically onset 1.5–4 years of age:\n- EYES: sudden redness and pain in one or both eyes; squinting; light sensitivity; progressive loss of vision — can blind within days\n- SKIN: progressive depigmentation (whitening) of nose, lips, eyelids, footpads\n- The skin changes often begin at the nose and spread outward\n- Both eye and skin signs may occur together or separately\n\nThis is an URGENT condition:\n- Eye involvement = URGENT ophthalmologist within 24–48 hours — uveitis causes rapid, permanent blindness without treatment\n- Skin depigmentation alone = vet within a week\n\nTreatment: lifelong immunosuppression (prednisolone ± cyclosporine ± azathioprine). Prognosis for vision depends entirely on how quickly treatment begins.\n\nThere is no validated commercial DNA test. Annual CAER eye exams and owner awareness are the only current tools.',
    call_vet_if: 'Any eye redness, squinting, or light sensitivity in an Akita — ophthalmologist urgently',
    emergency_contact_recommended: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const JAPANESE_AKITA_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'ja_social_week3_strong_willed',
    day_offset: 21,
    title: 'Socialization Week 3: Strong-willed and dominant — structured handling from Day 21',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Japanese Akitas are strong-willed, territorial, and dominant by nature. The socialization window is critical for managing these traits safely.',
    detail: 'Japanese Akitas are working dogs bred for guarding and hunting. They are naturally dominant, territorial, reserved with strangers, and prone to same-sex dog aggression.\n\nFrom Week 3:\n- Daily calm, structured handling by 8+ different people\n- Children — an Akita that is not comfortable with children is dangerous at adult size\n- Varied demographics — men, different physical appearances, different voices\n- Handle from ground level — never hold an Akita puppy off the ground unless necessary\n- Touch exercises: paws, ears, mouth, tail — vet visits require this tolerance\n\nThe goal is not submission — it is a dog that trusts humans and defers to appropriate guidance.',
  },
  {
    id_suffix: 'ja_social_week4_dog_aggression',
    day_offset: 28,
    title: 'Socialization Week 4: Same-sex dog aggression — address in the critical window',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Japanese Akitas are known for same-sex dog aggression. Extensive dog-to-dog socialisation during the critical window is the single best preventive measure.',
    detail: 'Japanese Akita same-sex aggression is a breed characteristic, not a training failure — but it can be significantly modulated by early socialisation.\n\nFrom Week 4:\n- Supervised play with at least 5 different calm dogs per week\n- Include dogs of the same sex — especially male-to-male for male puppies\n- Include large and small breeds\n- Introduce one-on-one before group settings\n\nInform new owners absolutely:\n- Adult Akitas should NEVER be in off-lead dog parks with unknown dogs — the risk of a dog fight is too high and the outcome at 30–40 kg is serious\n- Two intact male Akitas in the same household often cannot coexist\n- Lifelong management of dog introductions is required for this breed\n- Early extensive socialisation reduces but does not eliminate same-sex aggression',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const JAPANESE_AKITA_TRAINING_EVENTS = [
  {
    id_suffix: 'ja_training_week5',
    day_offset: 35,
    title: 'Begin formal training Week 5: Respect-based positive training',
    category: 'training' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Akitas are intelligent and capable but not inherently obedient. Training must establish respectful leadership through positive methods.',
    detail: 'Japanese Akitas are intelligent but independent. They will comply when they understand and respect the reasoning — not simply because they\'re told to.\n\nFrom Week 5:\n- Sit, down, wait, come — positive reinforcement with high-value food\n- "Place" — a specific mat or spot where the dog settles — critical for management at adult size\n- Lead manners from the first session — a pulling 35 kg Akita cannot be walked by anyone\n\nInform new owners:\n- Physical dominance methods cause Akitas to escalate. Never use alpha rolls or physical corrections\n- Positive reinforcement with high-value rewards is both more humane and more effective\n- Akitas thrive with an owner who provides clear, consistent guidance. They deteriorate with inconsistent or harsh handlers\n- Enrol in puppy class immediately with a trainer experienced with large, dominant breeds',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const JAPANESE_AKITA_HEALTH_RISKS = [
  {
    condition: 'VKH / Uveodermatologic Syndrome (UDS)',
    timing: 'Typically 1.5–4 years; can occur at any age',
    risk_level: 'critical' as const,
    signs: [
      'Eye: sudden redness and visible pain in one or both eyes',
      'Eye: squinting and sensitivity to light',
      'Eye: rapid progressive vision loss — can blind in days',
      'Skin: progressive depigmentation (whitening) of nose, starting at nostrils',
      'Skin: whitening of lips, eyelids, footpads — spreading over time',
      'Eye and skin signs may occur together or months apart',
    ],
    immediate_action: 'Eye involvement = URGENT ophthalmologist within 24–48 hours. Uveitis blinds permanently within days without treatment. Skin depigmentation alone = vet within a week.',
    vet_decision: 'Ophthalmologist urgently for any eye signs. Urgent vet for skin depigmentation alone.',
    note: 'Akitas account for ~80% of all canine UDS cases. No DNA test available. Lifelong immunosuppression required. Prognosis for vision entirely depends on speed of treatment.',
  },
  {
    condition: 'GDV (Gastric Dilatation-Volvulus)',
    timing: 'Any age — highest risk after large single meals',
    risk_level: 'critical' as const,
    signs: [
      'Unproductive retching — trying to vomit with nothing coming up',
      'Abdomen visibly distended and drum-hard',
      'Extreme restlessness — cannot lie down and settle',
      'Pale or white gums',
      'Rapid deterioration',
    ],
    immediate_action: 'EMERGENCY VET IMMEDIATELY. Do not call — drive. Fatal within 1–2 hours without surgery.',
    vet_decision: 'Emergency surgical facility — do not go to a clinic that cannot operate tonight.',
    note: '~25 cases per 1,000 dog-years (Glickman 2000 — 4th highest breed). Prophylactic gastropexy at spay/neuter prevents torsion for life.',
  },
  {
    condition: 'Sebaceous Adenitis',
    timing: 'Typically signs from 1–5 years; OFA biopsy from age 2',
    risk_level: 'high' as const,
    signs: [
      'Progressive hair loss beginning on the back and sides',
      'Dry, silvery scales at the base of hair shafts',
      'Dull, brittle coat that lacks normal shine',
      'Musty skin odour',
      'Secondary bacterial infections in severe cases',
    ],
    immediate_action: 'Book vet for skin punch biopsy to confirm. Not an emergency — requires ongoing management.',
    vet_decision: 'Call vet within a week of coat or skin changes.',
    note: 'SA affects 24% of Akitas in histologic study (Reichler 2001). OFA skin biopsy from age 2 for breeding stock. Managed with medicated shampoos, omega-3 fatty acids, and cyclosporine for severe cases.',
  },
  {
    condition: 'Familial Enamel Hypoplasia (AI/FEH)',
    timing: 'Visible when permanent teeth erupt at 4–6 months',
    risk_level: 'high' as const,
    signs: [
      'Brown or yellow permanent teeth — not from staining',
      'Pitted or rough surface on tooth enamel',
      'Severely worn teeth despite normal diet and chew habits',
      'Apparent dental sensitivity — reluctance to chew hard items',
    ],
    immediate_action: 'Book vet for dental assessment. Not an emergency — requires ongoing dental management and pain management for affected dogs.',
    vet_decision: 'Call vet within a week of noticing abnormal teeth at 4–6 months.',
    note: 'KC mandatory DNA scheme since October 2020. Test both parents. Affected dogs require lifelong dental care and management.',
  },
];
