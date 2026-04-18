/**
 * INFO BASE: GOLDEN RETRIEVER
 * Applies to: Golden Retriever
 * Info base ID: 'golden_retriever'
 *
 * ⚠️ ISOLATION RULE: This file is ONLY imported by the schedule engine
 * when breed.info_base_id === 'golden_retriever'. Never mix with other infobases.
 *
 * Sources: GRCA (Golden Retriever Club of America), Cornell CVM,
 * Merck Veterinary Manual, AKC, VCA Animal Hospitals, OFA,
 * UC Davis VGL, Morris Animal Foundation GRLS.
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDEN_RETRIEVER_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 4, max: 12, typical: 8 },
  newborn_weight_grams: { min: 380, max: 550, typical: 460 },
  adult_weight_kg: {
    male: { min: 29.5, max: 34 },
    female: { min: 25, max: 29.5 },
  },
  size_category: 'large' as const,
  hypoglycemia_risk: 'low' as const,
  csection_rate_percent: 3,
  brachycephalic: false,

  // Growth milestones (grams)
  weight_targets: {
    birth:  { min: 380, max: 550, typical: 460 },
    day_7:  { min: 700, max: 900, typical: 800 },
    day_14: { min: 900, max: 1200, typical: 1050 },
    week_3: { min: 1300, max: 1700, typical: 1500 },
    week_4: { min: 1800, max: 2400, typical: 2100 },
    week_6: { min: 2800, max: 3800, typical: 3300 },
    week_8: { min: 4000, max: 5500, typical: 4800 },
  },

  daily_gain_minimum_grams: 25,
  daily_gain_target_grams: 45,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.5, week_5: 2.5,
  },

  // Formula volumes for Golden Retriever puppies
  formula_volumes_per_feeding_ml: {
    week_1: { min: 8,  max: 12, per_100g_body_weight: 1.8 },
    week_2: { min: 12, max: 18, per_100g_body_weight: 2.0 },
    week_3: { min: 18, max: 25, per_100g_body_weight: 2.5 },
    week_4: { min: 25, max: 35, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: {
    week_1: 2,
    week_2: 2.5,
    week_3: 3,
    week_4: 4,
  },

  tube_size_french: 8,       // French 8 for large-breed newborns (>400g)
  max_stomach_capacity_ml_per_100g: 4,

  whelping_box_temp_celsius: {
    week_1:     { min: 29.5, max: 32,   ideal: 30.5 },
    week_2:     { min: 27,   max: 29.5, ideal: 28   },
    week_3:     { min: 24,   max: 27,   ideal: 26   },
    week_4_plus:{ min: 21,   max: 24,   ideal: 22   },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 37.2, danger_below: 35.0 },
    day_5_14:    { min: 35.0, max: 37.2, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 120, d: 120 },
    large_litter: { w: 150, d: 150 },
    pig_rail_height_cm: 10,
    wall_height_cm: 45,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDEN_RETRIEVER_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all puppies today. Ask your vet for puppy pyrantel drops. Dose by each puppy\'s current weight. Golden puppies are particularly exposed to Toxocara canis through the mother\'s milk.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Same product as Day 14. Weigh each puppy again — they have grown significantly and the dose must be updated.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third worm treatment — switch to Panacur (fenbendazole) for 3 days in a row. This covers a wider range of intestinal parasites than pyrantel alone.',
      vet_required: false,
      critical: true,
    },
    {
      day: 56,
      label: 'Fourth deworming (pre-rehoming)',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Final deworming before puppies go to new homes. Panacur for 3 days in a row. Every new puppy owner should continue monthly prevention.',
      vet_required: false,
      critical: true,
    },
  ],

  dam_deworming: {
    start_day_of_pregnancy: 40,
    end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)',
    dose: '50 mg/kg daily',
    plain_english: 'Your Golden needs daily Panacur from Day 40 of pregnancy through 14 days after birth. This dramatically reduces Toxocara canis transmission to puppies through milk — Golden mothers with large litters are high-risk for transmammary transmission.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First puppy vaccinations at 6–8 weeks. Foundation of immune protection. Done by your vet. Golden puppies have normal maternal antibody interference — do not skip any booster in this series.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2 + Leptospirosis #1',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'],
      plain_english: 'Second vaccination plus first Leptospirosis dose. Lepto is now recommended as a core vaccine (AAHA 2024) — Goldens are often outdoors near water and wildlife which increases risk.',
      vet_required: true,
      critical: true,
    },
    {
      week: 14,
      label: 'Third vaccination',
      vaccine: 'DHPP #3 + Leptospirosis #2 + Rabies',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis', 'Rabies'],
      plain_english: 'Third vaccination series including Rabies. Puppies are NOT fully protected until 2 weeks after this dose. Avoid dog parks and unvaccinated dogs until then.',
      vet_required: true,
      critical: true,
    },
    {
      week: 18,
      label: 'CRITICAL: Final parvo booster',
      vaccine: 'DHPP #4 (final)',
      covers: ['Distemper', 'Parvovirus'],
      plain_english: 'IMPORTANT — do not skip this booster. Given at 16–20 weeks to overcome any remaining maternal antibody interference. Goldens with high maternal antibody titres can fail to respond to earlier doses. This booster ensures full protection.',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check',
      urgency: 'within_48_hours',
      plain_english: 'Have your vet check the mother within 48 hours of birth. With large Golden litters (8–12 puppies), confirm all placentas have passed, check for uterine infection, and assess milk supply for the whole litter.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check for mother and puppies. Vet will check milk supply, all puppies are gaining weight, and watch for mastitis — Golden mothers nursing 8+ puppies are at elevated mastitis risk.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + first vaccinations',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit for each puppy. Vaccinations, complete physical exam — specifically listen to the heart (congenital SAS in Golden lines is detectable at this age), check for hernias, undescended testicles, and eye abnormalities.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check before puppies go to new homes. Written health certificate. Confirm microchipping. Discuss hip/elbow screening timeline with new owners (OFA certified at 24 months, PennHIP from 16 weeks).',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'Hip dysplasia screening',
      timing: 'OFA certified at 24 months; PennHIP from 16 weeks',
      method: 'OFA radiograph or PennHIP distraction index',
      plain_english: 'Hip dysplasia affects ~20% of Goldens. GRCA CHIC requires OFA hip clearance before breeding. Inform new owners to get PennHIP early so they can make informed decisions.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Elbow dysplasia screening',
      timing: 'OFA certified at 24 months',
      method: 'OFA radiograph',
      plain_english: 'Elbow dysplasia is common in Goldens. Required for GRCA CHIC certification.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Heart screening (SAS)',
      timing: 'Annual cardiac auscultation; board-certified cardiologist preferred',
      method: 'Auscultation + echocardiogram if murmur detected',
      plain_english: 'Subaortic stenosis (SAS) occurs in Goldens. GRCA requires annual cardiac clearance. A loud ejection murmur at the left heart base in a puppy warrants immediate echo referral.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Eye certification (PRA)',
      timing: 'Annual CAER exam; DNA test for PRA1/PRA2 available',
      method: 'Board-certified ophthalmologist CAER exam + UC Davis VGL DNA test',
      plain_english: 'Progressive retinal atrophy causes blindness — DNA testing identifies carriers and at-risk dogs. Inform new owners to have annual eye exams.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Ichthyosis DNA test',
      timing: 'Any age — cheek swab',
      method: 'DNA test (PNPLA1 mutation)',
      plain_english: 'A skin condition causing excessive scale and dandruff. Mild in most Goldens but worth testing. Inform new owners if puppy carries the gene.',
      mandatory_for_breeding: false,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS (Days -63 to 0)
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDEN_RETRIEVER_PREGNANCY_EVENTS = [
  {
    id_suffix: 'golden_preg_vet_confirm',
    day_offset: -42,
    title: 'Vet visit: Confirm pregnancy + puppy count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Ultrasound to confirm pregnancy and get a puppy count.',
    detail: 'Golden litters average 8 puppies — knowing your count is critical. Ask your vet:\n1. How many puppies?\n2. Do they all look healthy?\n3. Any positioning concerns?\n4. When should I schedule the pre-whelping X-ray?\n\nAlso discuss: your vet\'s availability during labour, nearest 24-hour emergency vet, and whether a C-section might be needed based on dam\'s history.',
    call_vet_if: 'You have not yet had a pregnancy confirmed by a vet',
  },
  {
    id_suffix: 'golden_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Get puppy count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58 gives accurate puppy count.',
    detail: 'With large Golden litters, a pre-whelping X-ray is essential. Without this count, you cannot know when labour is finished — a retained puppy can kill the mother.\n\nSchedule at Day 55–58 (5–8 days before due date). Foetal skeletons are clearly calcified by this point. Bring a notebook — write the exact number on the paper and tape it to the whelping box.',
    call_vet_if: 'You cannot get an appointment within 3 days',
  },
  {
    id_suffix: 'golden_preg_nutrition',
    day_offset: -28,
    title: 'Switch dam to puppy food (Week 5 of pregnancy)',
    category: 'nutrition' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'From Week 5 of pregnancy, transition dam to high-quality puppy/growth food.',
    detail: 'A Golden carrying 8+ puppies needs significantly more calories in the final weeks. Switch to a puppy food (higher calorie density) from Week 5 onwards:\n\nWeek 5: normal amount of puppy food\nWeek 6: +10% above normal\nWeek 7: +20%\nWeek 8–9: up to +25–50% above baseline\n\nFeed 3–4 smaller meals daily rather than one large one — reduces bloat risk and allows more food intake as the puppies compress her stomach.\n\nIMPORTANT: Do NOT supplement calcium during pregnancy — this increases eclampsia risk after birth by suppressing her parathyroid gland.',
  },
  {
    id_suffix: 'golden_preg_large_litter_prep',
    day_offset: -14,
    title: 'Large litter preparation — rotation feeding system',
    category: 'environment' as const,
    priority: 'high' as const,
    is_free: true,
    description: 'With 8+ Golden puppies expected, set up rotation feeding before birth.',
    detail: 'Golden mothers have 8–10 functional teats. With a typical litter of 8+ puppies, rotation feeding from Day 1 prevents stronger puppies from monopolising feeding time.\n\nSet up today:\n1. A warm holding box (85–90°F / 29–32°C) large enough for half the litter\n2. Coloured yarn for each puppy ID\n3. A notebook for tracking which group nurses when\n4. Esbilac formula and bottles — even if dam nurses well, have these ready\n\nPlan to divide the litter into Group A and Group B, rotating every 30 minutes for the first week.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS (Days 0–14)
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDEN_RETRIEVER_NEONATAL_EVENTS = [
  {
    id_suffix: 'golden_neo_colostrum',
    day_offset: 0,
    title: 'Colostrum check: Every puppy must nurse within 2 hours',
    category: 'nutrition' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'With large litters, ensure every single puppy gets colostrum — not just the strongest ones.',
    detail: 'Golden litters of 8+ mean competition for teats is fierce. The strongest puppies will dominate. YOU must ensure every puppy nurses.\n\nSteps:\n1. Once each puppy is cleaned and breathing, place it on a nipple immediately\n2. After 30 minutes of nursing, swap smaller/weaker puppies in\n3. Check every puppy has a rounded, full belly within 2 hours\n4. Any puppy that cannot latch: tube-feed or syringe-feed colostrum immediately\n\nColostrum window closes at 12–16 hours — after this the gut wall closes and antibodies cannot be absorbed. Every puppy that misses colostrum has significantly reduced immune protection for life.',
    call_vet_if: 'Any puppy has not nursed within 2 hours of birth',
    emergency_contact_recommended: true,
  },
  {
    id_suffix: 'golden_neo_large_litter_alert',
    day_offset: 0,
    title: '⚠️ Large litter alert: Set up rotation feeding now',
    category: 'nutrition' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Large Golden litters require active management from Day 1.',
    detail: 'A Golden mother has 10 functional teats but typically has 8–12 puppies. Left unmanaged, the largest puppies will take all the milk and the runts will fail to thrive.\n\nStart rotation feeding TODAY:\n- Divide into two groups mixing large and small puppies\n- Group A nurses for 30 min while Group B stays warm in the holding box\n- Swap groups. Repeat every feeding cycle\n- Weigh EVERY puppy twice daily — any puppy not gaining = move to front of rotation + supplement with Esbilac\n\nA difference of more than 25% between the heaviest and lightest puppy in the litter is a warning sign that supplementation is needed.',
  },
  {
    id_suffix: 'golden_neo_weight_day3',
    day_offset: 3,
    title: 'Weight check: All puppies should be gaining daily',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'By Day 3, every puppy should have recovered birth weight and be gaining.',
    detail: 'Golden puppies typically lose a small amount of weight in the first 24 hours, then regain it by Day 2–3.\n\nBy Day 3:\n✅ Every puppy should be AT or ABOVE birth weight\n✅ Daily gain of 25–50g per day expected\n✅ Belly should feel full and rounded after nursing\n\n🔴 If any puppy is still below birth weight at Day 3: supplement with Esbilac immediately after every nursing session. Do not wait to see if they "catch up on their own".',
    call_vet_if: 'Any puppy is below birth weight at Day 3, or any puppy loses weight on two consecutive days',
  },
  {
    id_suffix: 'golden_neo_eyes_open',
    day_offset: 10,
    title: 'Eyes opening: Days 10–14',
    category: 'development' as const,
    priority: 'recommended' as const,
    is_free: false,
    description: 'Golden puppies begin opening their eyes around Days 10–14.',
    detail: 'Eyes open between Days 10–14 — this is entirely normal to vary across the litter.\n\nWhat you will see:\n✅ Eyes look cloudy, blue-grey, or slightly milky — NORMAL\n✅ Puppies may squint in bright light — NORMAL\n✅ Eyes may open slightly unevenly — NORMAL\n\n🔴 Check with your vet if:\n- No eyes open by Day 21\n- Any eye appears swollen behind a closed lid\n- Yellow or green discharge from any eye\n- Any eye looks sunken or abnormally small\n\nKeep the whelping area at low lighting levels this week — newly opened eyes are sensitive.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NUTRITION EVENTS (Weeks 3–8)
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDEN_RETRIEVER_NUTRITION_EVENTS = [
  {
    id_suffix: 'golden_nutrition_weaning_start',
    day_offset: 21,
    title: 'Begin weaning: Introduce puppy gruel',
    category: 'nutrition' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Start introducing solid food at 3 weeks. Golden puppies are vigorous eaters.',
    detail: 'Begin weaning at Day 21–24:\n\n1. Mix high-quality puppy kibble with warm water or Esbilac into a thin gruel (consistency of porridge)\n2. Place a shallow dish in the whelping box\n3. Let puppies explore and lap at it — they will get more on their faces than in their mouths initially, that\'s fine\n4. Gradually thicken the consistency over 2 weeks until dry kibble by Week 7\n\nGolden puppies eat enthusiastically — they will wean quickly compared to other breeds. Continue allowing nursing on demand throughout.\n\nWith large litters: use multiple feeding dishes so all puppies can access food simultaneously. Remove weaker puppies from competition if needed and feed them separately.',
  },
  {
    id_suffix: 'golden_nutrition_dam_caloric',
    day_offset: 14,
    title: 'Dam nutrition: Peak lactation demand',
    category: 'nutrition' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'A Golden nursing 8+ puppies needs 3–4× her normal daily calories.',
    detail: 'Peak milk production occurs in Weeks 2–4. A Golden nursing a large litter needs extraordinary caloric support.\n\nFeeding guide:\n- Weeks 2–4: 3–4× her pre-pregnancy daily intake\n- Feed 4 small meals per day rather than 2 large ones\n- Puppy food or performance food (higher calorie/protein density than adult food)\n- Fresh water available at all times — lactating Golden mothers drink enormous amounts\n\nSigns of insufficient nutrition:\n- Puppies crying constantly (hunger)\n- Dam losing excessive weight (ribs easily visible and felt)\n- Milk supply declining (puppies not gaining adequately)\n\nIf dam cannot keep up with the litter\'s needs: begin rotating supplemental Esbilac feedings.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS (Weeks 3–8)
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDEN_RETRIEVER_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'golden_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Begin gentle handling',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Start deliberate daily handling of each Golden puppy.',
    detail: 'Week 3 socialization for Golden puppies:\n\n- Handle each puppy for 5–10 minutes daily\n- Touch paws, ears, mouth, tail, belly\n- Expose to your voice, different household sounds\n- Introduce different textures under paws\n\nGoldens are naturally social and people-oriented — this builds on their natural temperament. Their biggest adult risk is resource guarding. Begin "hand-feeding" from a dish from this week — puppies learn human hands are associated with food, not competition.',
  },
  {
    id_suffix: 'golden_social_week4',
    day_offset: 28,
    title: 'Socialization Week 4: Introduce new people',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Expose Golden puppies to a variety of people.',
    detail: 'Week 4 targets for Golden puppies:\n\n- 5+ different people handle each puppy this week\n- Vary: different ages, voices, appearances\n- Brief car rides (a towel-lined cardboard box is fine)\n- Household noises: vacuum, dishwasher, doorbell\n- Mild startle events (keys dropping, sudden loud sounds) — followed immediately by calm, positive handling\n\nGolden retriever retrieving instinct kicks in around week 4. Introduce a soft toy — encourage carry and bring-back behaviour. This is the earliest form of recall training.',
  },
  {
    id_suffix: 'golden_social_week5',
    day_offset: 35,
    title: 'Socialization Week 5: Resource handling',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Critical week for preventing resource guarding in Golden Retrievers.',
    detail: 'Goldens are food-motivated and can develop resource guarding if not managed early.\n\nThis week:\n1. While each puppy is eating, approach and drop a high-value treat next to the bowl (not taking the bowl — adding to it)\n2. Practice "trade up" — gently take a toy and immediately give something better\n3. Touch/handle puppies while eating without causing distress\n\nTarget: every puppy should accept a hand near their food bowl without stiffening, growling, or looking up.\n\nIf any puppy stiffens or growls when approached at food: immediately notify new owners — this needs professional training before rehoming.',
  },
  {
    id_suffix: 'golden_social_week6',
    day_offset: 42,
    title: 'Socialization Week 6: Puppy class preparation',
    category: 'socialization' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Prepare Golden puppies for puppy class starting Week 7–8.',
    detail: 'Golden puppies can attend supervised puppy class from Week 7–8 (7 days after first vaccination). AVSAB confirms benefits of early socialization outweigh infection risk in controlled environments.\n\nThis week:\n- Practice loose-leash walking on a flat collar or harness (not retractable lead)\n- Introduce basic "sit" — Golden puppies learn this readily at 6 weeks\n- Brief exposure to other vaccinated adult dogs if possible\n\nInform new owners: puppy class is strongly recommended. Goldens are biddable and learn quickly at this age. A puppy class-trained Golden at 8 weeks = a much easier adult dog.',
  },
  {
    id_suffix: 'golden_social_week7',
    day_offset: 49,
    title: 'Socialization Week 7: 100-person target begins',
    category: 'socialization' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Each Golden puppy should meet at least 20 people before going home.',
    detail: 'The minimum socialization target for each Golden puppy before rehoming at 8 weeks:\n\n- 20+ different people\n- 10+ different environments (rooms, outdoors, car)\n- 15+ different sounds\n- Multiple surfaces\n\nInform new owners their target is 100 people by 12 weeks and 50+ dogs. Golden retrievers who miss this window can develop fear and anxiety that contradicts everything people expect from the breed.\n\nArrange a puppy viewing event this week if possible — invite neighbours, friends, family. Maximum positive human exposure before going home.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDEN_RETRIEVER_HEALTH_RISKS = [
  {
    condition: 'Large litter management',
    timing: 'Birth through 4 weeks',
    risk_level: 'critical' as const,
    signs: ['Runt not gaining weight', 'Any puppy more than 25% lighter than heaviest littermate', 'Puppies crying constantly after nursing'],
    immediate_action: 'Begin rotation feeding. Weigh every puppy twice daily. Supplement lighter puppies with Esbilac after every nursing session.',
    vet_decision: 'Call if any puppy loses weight on consecutive days or is more than 30% below the heaviest pup by Week 2.',
  },
  {
    condition: 'Eclampsia (milk fever)',
    timing: 'Most common 2–3 weeks after birth; can occur during whelping',
    risk_level: 'critical' as const,
    signs: ['Restlessness progressing to muscle tremors', 'Stiff stilted gait', 'Panting and drooling', 'Fever above 40°C / 104°F', 'Seizures'],
    immediate_action: 'Remove all puppies immediately. Do not give oral calcium if she is trembling. Transport to emergency vet immediately.',
    vet_decision: 'GO TO EMERGENCY VET IMMEDIATELY — do not wait.',
    note: 'Goldens nursing large litters are at elevated eclampsia risk. Never supplement calcium during pregnancy.',
  },
  {
    condition: 'Subvalvular aortic stenosis (SAS)',
    timing: 'Detectable as puppy murmur at 6–8 weeks; congenital',
    risk_level: 'high' as const,
    signs: ['Murmur detected at first vet visit', 'Exercise intolerance in older puppy', 'Fainting'],
    immediate_action: 'Note the murmur grade. Refer for echocardiogram if Grade 3+.',
    vet_decision: 'Call vet to arrange echo at 6-week visit if murmur detected.',
  },
  {
    condition: 'Cancer — long-term awareness',
    timing: 'Primarily adult disease but inform new owners',
    risk_level: 'high' as const,
    signs: ['Lumps or swellings', 'Unexplained weight loss', 'Lethargy', 'Pale gums (internal bleeding from hemangiosarcoma)'],
    immediate_action: 'Inform new owners: 20% of Goldens develop hemangiosarcoma, 6% develop lymphoma. Annual wellness exams from age 6 with CBC and chemistry. Trust your instinct if something seems wrong.',
    vet_decision: 'Any pale gums = emergency vet immediately (possible internal bleeding from spleen).',
    note: 'Morris Animal Foundation Golden Retriever Lifetime Study found cancer rates significantly higher in Goldens than any other breed.',
  },
  {
    condition: 'Hip / elbow dysplasia',
    timing: 'Symptom onset typically 4–18 months; radiographic diagnosis earlier',
    risk_level: 'high' as const,
    signs: ['Puppy appears stiff rising', 'Reluctance to use stairs', 'Bunny-hopping gait', 'Exercise intolerance'],
    immediate_action: 'Restrict high-impact exercise (no jumping, stairs, long runs) until growth plates close at 15–18 months. Lean body condition is the most effective preventive.',
    vet_decision: 'Call vet if any lameness or stiffness from age 4 months. PennHIP available from 16 weeks.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS (Weeks 3–8)
// ─────────────────────────────────────────────────────────────────────────────

export const GOLDEN_RETRIEVER_TRAINING_EVENTS = [
  {
    id_suffix: 'golden_training_retrieve',
    day_offset: 28,
    title: 'Encourage retrieving instinct — Week 4',
    category: 'training' as const,
    priority: 'recommended' as const,
    is_free: false,
    description: 'Golden puppies begin showing retrieving behaviour at 4 weeks.',
    detail: 'Natural retrieval instinct begins at Week 4:\n\n- Roll a soft ball or toy away from the puppy\n- Encourage them to chase and pick it up\n- Crouch down and call them back when they have it\n- Big positive reward when they bring it back (even if they drop it)\n\nDo not chase a puppy who runs away with the toy — this teaches "keep away". Instead, run in the opposite direction — they will follow.\n\nThis is the foundation of recall. Inform new owners: a retrieve-trained Golden from 4 weeks is dramatically easier to recall-train as an adult.',
  },
  {
    id_suffix: 'golden_training_mouthing',
    day_offset: 28,
    title: 'Bite inhibition: Begin immediately at Week 4',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Mouthiness is Golden retriever\'s #1 puppy behaviour complaint.',
    detail: 'Golden puppies have soft mouths by breed instinct, but they still mouth intensely as puppies.\n\nBegin bite inhibition now:\n1. When a puppy mouths too hard: yelp sharply and stop all play for 60 seconds\n2. Resume play\n3. Repeat EVERY time — consistency is everything\n\nNever use physical punishment — Golden puppies that are hit or scruffed develop hand-shy behaviour which contradicts their breed\'s trusting temperament.\n\nInform new owners: mouthiness typically peaks at 10–16 weeks and resolves by 5–6 months with consistent training. Teething is separate — provide appropriate chew toys.',
  },
];
