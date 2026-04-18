/**
 * INFO BASE: GERMAN SHEPHERD DOG
 * Applies to: German Shepherd Dog (GSD), German Shepherd
 * Info base ID: 'german_shepherd'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'german_shepherd'.
 *
 * Sources: GSDCA (German Shepherd Dog Club of America), Cornell CVM,
 * Merck Vet Manual, UC Davis VGL (DM, hemophilia A), OFA,
 * ScienceDirect GSD hereditary disease review.
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREED PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export const GERMAN_SHEPHERD_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 57, max: 67 },
  avg_litter_size: { min: 4, max: 9, typical: 7 },
  newborn_weight_grams: { min: 350, max: 500, typical: 425 },
  adult_weight_kg: {
    male:   { min: 30, max: 40 },
    female: { min: 22, max: 32 },
  },
  size_category: 'large' as const,
  hypoglycemia_risk: 'low' as const,
  csection_rate_percent: 8,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 350, max: 500, typical: 425 },
    day_7:  { min: 650, max: 850, typical: 750 },
    day_14: { min: 900, max: 1100, typical: 1000 },
    week_3: { min: 1300, max: 1700, typical: 1500 },
    week_4: { min: 1800, max: 2400, typical: 2100 },
    week_6: { min: 2800, max: 3600, typical: 3200 },
    week_8: { min: 4000, max: 5200, typical: 4600 },
  },

  daily_gain_minimum_grams: 20,
  daily_gain_target_grams: 40,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 7,  max: 12, per_100g_body_weight: 1.8 },
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
    small_litter: { w: 120, d: 120 },
    large_litter: { w: 150, d: 150 },
    pig_rail_height_cm: 10,
    wall_height_cm: 50,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH SCHEDULE
// ─────────────────────────────────────────────────────────────────────────────

export const GERMAN_SHEPHERD_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all puppies. GSD puppies are highly susceptible to roundworm (Toxocara canis) — passed from mother through milk. Dose by current weight.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second worm treatment. Always re-weigh — GSD puppies grow rapidly and under-dosing means the treatment is ineffective.',
      vet_required: false,
      critical: true,
    },
    {
      day: 42,
      label: 'Third deworming',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Third treatment using Panacur for 3 days in a row. GSD puppies are at higher risk for Giardia if the dam has been kennelled or in a group-dog environment.',
      vet_required: false,
      critical: true,
    },
    {
      day: 56,
      label: 'Fourth deworming (pre-rehoming)',
      drug: 'Fenbendazole (Panacur)',
      dose: '50 mg/kg daily × 3 days',
      targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'],
      plain_english: 'Final deworming. Panacur for 3 days. Inform new owners to continue monthly prevention as GSDs are often in environments (parks, training fields) with higher parasite exposure.',
      vet_required: false,
      critical: true,
    },
  ],

  dam_deworming: {
    start_day_of_pregnancy: 40,
    end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)',
    dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur from Day 40 of pregnancy through 14 days after birth reduces worm transmission to puppies through the milk. Essential for GSD dams.',
    critical: true,
  },

  vaccinations: [
    {
      week: 6,
      label: 'First vaccination',
      vaccine: 'DHPP #1',
      covers: ['Distemper', 'Hepatitis (Adenovirus-2)', 'Parvovirus', 'Parainfluenza'],
      plain_english: 'First vaccination at 6–8 weeks. Done by vet. German Shepherds have normal maternal antibody interference — the full booster series is essential.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2 + Leptospirosis #1',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'],
      plain_english: 'Second vaccination plus first Lepto dose. Lepto is now AAHA core recommendation. GSDs used for tracking/working often encounter wildlife that carry Lepto.',
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
      plain_english: 'Do not skip. This dose ensures parvovirus immunity is complete after maternal antibodies have fully waned. GSDs are frequently in high-exposure environments (training clubs, competition, kennels).',
      vet_required: true,
      critical: true,
    },
  ],

  vet_visits: [
    {
      day: 0,
      label: 'Post-whelping dam check',
      urgency: 'within_48_hours',
      plain_english: 'Vet check within 48 hours of birth. GSDs occasionally have retained fetuses or placentas — critical to confirm the count. Check for signs of uterine infection.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm milk supply, watch for early mastitis, verify all puppies are gaining weight.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + first vaccinations',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. Ask vet to specifically listen to each puppy\'s heart — GSD lines can have SAS and pulmonic stenosis. Discuss EPI and DM awareness for new owners.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final health check, health certificate, microchipping. Inform new owners about hip scoring timeline (OFA at 24 months), DM DNA test, and EPI risk signs to watch for from 6 months.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months; preliminary at 12 months',
      method: 'OFA radiograph or SV (German Shepherd breed club HD score)',
      plain_english: 'Hip dysplasia affects 20–40% of GSDs depending on line. OFA or SV-HD certification is mandatory for responsible breeding. Inform new owners to pursue OFA/PennHIP.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Degenerative Myelopathy (DM) DNA test',
      timing: 'Any age — cheek swab',
      method: 'DNA test for SOD1 gene mutation (UC Davis VGL)',
      plain_english: 'DM is a progressive spinal cord disease causing hind-limb paralysis from age 8–14 years — well past normal breeding age. Test both parents and inform new owners of status. Affected dogs (A/A genotype) will eventually lose use of back legs. This is not a puppy disease — do not alarm new owners, just inform them so they can watch for early signs (hindlimb weakness, toe-dragging) from age 7.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Elbow dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'Elbow dysplasia less common in GSDs than hips but still recommended for breeding stock.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hemophilia A',
      timing: 'Any age — DNA test',
      method: 'DNA test for Factor VIII deficiency (UC Davis VGL)',
      plain_english: 'X-linked bleeding disorder. Affected males bleed excessively from minor injuries or surgery. Carrier females pass it to sons. DNA test female breeding stock. Never neuter or perform surgery on a hemophilic male without blood products available.',
      mandatory_for_breeding: true,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const GERMAN_SHEPHERD_PREGNANCY_EVENTS = [
  {
    id_suffix: 'gsd_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Puppy count',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'Radiograph at Day 55–58 for accurate GSD puppy count.',
    detail: 'GSD litters average 7 puppies. A pre-whelping X-ray ensures you know when labour is truly finished.\n\nWith GSDs specifically: note the size of each foetus relative to the maternal pelvis. GSD dams occasionally have a large single puppy in an unfavourable position — your vet can alert you to this risk.',
    call_vet_if: 'You cannot book within 3 days of the due date',
  },
  {
    id_suffix: 'gsd_preg_gdv_prevention',
    day_offset: -28,
    title: 'GDV prevention: Start feeding protocol now',
    category: 'health' as const,
    priority: 'critical' as const,
    is_free: true,
    description: 'German Shepherds are at elevated GDV (bloat) risk. This worsens during late pregnancy.',
    detail: 'Gastric Dilatation Volvulus (GDV/Bloat) is a life-threatening emergency where the stomach twists. GSD dams in late pregnancy are at higher risk due to the distended abdomen putting pressure on the stomach.\n\nFrom today, implement:\n1. Feed 3–4 small meals per day — NOT one large meal\n2. No vigorous exercise for 1 hour before and 2 hours after eating\n3. Elevated food bowls are NOT recommended — they increase GDV risk\n4. Keep the feeding area calm — eating when excited increases swallowing air\n\nGDV SIGNS (EMERGENCY VET IMMEDIATELY):\n- Unproductive retching or belching\n- Distended, hard, drum-like abdomen\n- Restlessness and pain\n- Pale or grey gums\n- Rapid deterioration\n\nGDV is fatal within 1–4 hours without surgery.',
    call_vet_if: 'EMERGENCY — any of the GDV signs above',
    emergency_contact_recommended: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NEONATAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const GERMAN_SHEPHERD_NEONATAL_EVENTS = [
  {
    id_suffix: 'gsd_neo_epi_awareness',
    day_offset: 42,
    title: 'Week 6: EPI awareness — brief owner education',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Exocrine pancreatic insufficiency — the single most common GSD health issue — typically presents at 6–18 months.',
    detail: 'Exocrine Pancreatic Insufficiency (EPI) is extremely common in GSDs (30× more common than in other breeds). The pancreas stops producing digestive enzymes.\n\nDOES NOT affect puppies under 6 months typically, but inform new owners now:\n\nSigns of EPI (from 6 months onwards):\n- Dramatic weight loss despite eating large amounts\n- Large volume, pale, greasy, foul-smelling stools\n- Voracious appetite (starving despite eating)\n- Sometimes eating faeces or non-food items\n- Flatulence\n\nEPI is manageable with daily pancreatic enzyme powder on food. Diagnosis: TLI blood test (fasted) — below 2.5 µg/L is diagnostic.\n\nThis is NOT a death sentence — inform new owners it is treatable and GSDs with EPI live normal lives on enzyme replacement.',
  },
  {
    id_suffix: 'gsd_neo_panosteitis',
    day_offset: 49,
    title: 'Week 7: Panosteitis awareness for new owners',
    category: 'health' as const,
    priority: 'recommended' as const,
    is_free: false,
    description: 'Growing pains — shifting leg lameness in young GSDs is usually panosteitis.',
    detail: 'Panosteitis ("growing pains") commonly affects GSD puppies from 5–18 months.\n\nSigns:\n- Sudden lameness in one leg with no injury\n- Lameness shifts between different legs over weeks to months\n- Puppy may cry when leg is pressed in the middle of the bone\n- Normal activity levels between episodes\n\nThis is NOT an emergency — it resolves on its own by 18 months. However, new owners should know:\n- ANY lameness in a growing GSD puppy should be examined by a vet (to rule out hip dysplasia, bone infection, fracture)\n- Pain management (brief NSAIDs) helps during episodes\n- Rest during painful periods\n\nWrite "panosteitis" on a note for new owners — they will almost certainly search this term at 3am when their GSD starts limping.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const GERMAN_SHEPHERD_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'gsd_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Build human trust early',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'German Shepherd socialization is MORE critical than most breeds.',
    detail: 'A poorly socialised German Shepherd becomes a serious safety concern. This breed\'s natural protective drive and courage mean an under-socialised adult can be reactive and dangerous to strangers.\n\nWeek 3 essentials:\n- Daily handling by multiple different people (minimum 5 people)\n- Specifically expose to: men with deep voices, people with hats/uniforms, children, elderly people\n- Begin "look at that" training — when puppy notices something novel, immediately reward calm observation\n- Never comfort a fearful reaction — this reinforces fear. Instead: act cheerful and confident to model the correct response',
  },
  {
    id_suffix: 'gsd_social_week4',
    day_offset: 28,
    title: 'Socialization Week 4: Environmental exposure',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'GSD puppies need rich environmental exposure in this window.',
    detail: 'Week 4 environmental targets:\n\n- 8–10 different people of varied demographics handle each puppy\n- Multiple surface types: carpet, tile, concrete, grass, metal (grate), gravel\n- Vehicle ride (crate in car)\n- Sounds: traffic, sirens at low volume, crowd noise, construction sounds\n\nGSD puppies that are raised in quiet, single-owner environments without diverse exposure commonly develop "resource territory" behaviours as adults — they claim their owner and home as their entire world and react defensively to anything outside it.',
  },
  {
    id_suffix: 'gsd_social_week5_stranger',
    day_offset: 35,
    title: 'Socialization Week 5: Neutral stranger interactions',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Teach GSD puppies that strangers are neutral — not threats.',
    detail: 'This week: structured stranger interactions.\n\n- Invite people the puppies have NOT met before\n- Instruct them to: approach calmly, crouch to puppy level, let puppy approach FIRST — do not reach over the puppy\n- Reward puppy for calm, friendly investigation\n- If puppy is hesitant: stranger should ignore the puppy and drop a treat nearby without looking at the puppy\n\nGoal: every GSD puppy approaches strangers with curiosity, not alarm. A GSD that backs away, barks, or raises hackles at calm strangers in Week 5 is already developing a problem pattern and needs more intensive socialisation work.',
  },
  {
    id_suffix: 'gsd_social_week6_dog_contact',
    day_offset: 42,
    title: 'Socialization Week 6: Dog-to-dog interactions',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Introduce GSD puppies to other well-vaccinated adult dogs.',
    detail: 'GSD puppies need early, positive exposure to other dogs of various sizes and breeds.\n\nArrange supervised meetings with:\n- Calm, vaccinated adult dogs known to be good with puppies\n- Dogs of different sizes and breeds\n- Ideally some small dogs (GSDs that grow up without small dog exposure can develop predatory responses)\n\nInform new owners: puppy class from Week 7–8 is strongly recommended. A German Shepherd that attended puppy class and has been to 50+ dogs by 12 weeks is fundamentally different to one that hasn\'t. The former will be manageable at 35 kg. The latter potentially won\'t.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const GERMAN_SHEPHERD_TRAINING_EVENTS = [
  {
    id_suffix: 'gsd_training_crate',
    day_offset: 35,
    title: 'Crate training: Begin at Week 5',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'GSD puppies should begin crate training before going to new homes.',
    detail: 'German Shepherds are prone to separation anxiety — one of the breed\'s most common behavioural problems. Crate training from Week 5 builds independence and prevents separation anxiety.\n\nProtocol:\n1. Place a crate in the whelping area with the door open and a comfortable bed inside\n2. Feed meals inside the crate\n3. From Day 40: close the crate door for 5 minutes while puppies are inside after eating\n4. Gradually increase to 15–20 minutes by Week 7\n\nGoal: every GSD puppy can settle quietly in a crate for 20 minutes before going to new homes. This is a foundation skill that new owners can build on to reach 2+ hours of calm crate time.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC HEALTH RISKS
// ─────────────────────────────────────────────────────────────────────────────

export const GERMAN_SHEPHERD_HEALTH_RISKS = [
  {
    condition: 'GDV (Gastric Dilatation Volvulus / Bloat)',
    timing: 'Any age; higher risk in late pregnancy and adult life',
    risk_level: 'critical' as const,
    signs: ['Unproductive retching', 'Distended hard abdomen', 'Extreme restlessness and distress', 'Pale/grey/white gums', 'Rapid deterioration'],
    immediate_action: 'GO TO EMERGENCY VET IMMEDIATELY. This is fatal within 1–4 hours. Do not wait.',
    vet_decision: 'EMERGENCY — do not call ahead, just go.',
    note: 'Prophylactic gastropexy (stomach tacking) strongly recommended at spay/neuter time. Discuss with vet.',
  },
  {
    condition: 'Exocrine Pancreatic Insufficiency (EPI)',
    timing: 'Typically onset 6 months to 3 years',
    risk_level: 'high' as const,
    signs: ['Dramatic weight loss despite good appetite', 'Large volume pale greasy foul-smelling stools', 'Insatiable hunger', 'Coprophagia (eating faeces)'],
    immediate_action: 'Book a vet appointment — this is not an emergency but needs prompt diagnosis. TLI blood test (fasted) required.',
    vet_decision: 'Call vet within a week of symptoms appearing.',
    note: 'Highly manageable with daily enzyme powder. GSD breed clubs have extensive owner support networks for EPI management.',
  },
  {
    condition: 'Degenerative Myelopathy (DM)',
    timing: 'Adult onset 8–14 years — well past normal breeding age',
    risk_level: 'high' as const,
    signs: ['Progressive hind-limb weakness', 'Toe-dragging on rear feet', 'Stumbling on rear legs', 'Eventually unable to stand'],
    immediate_action: 'This develops slowly over months. Book vet appointment when first signs appear. Physiotherapy and hydrotherapy can slow progression.',
    vet_decision: 'Call vet when first signs appear. No emergency treatment — supportive care only.',
    note: 'DNA test parents before breeding. Inform new owners so they watch for early signs from age 7. A/A dogs (at-risk genotype) will develop DM if they live long enough.',
  },
  {
    condition: 'Hemophilia A',
    timing: 'Present from birth; discovered at first injury or surgery',
    risk_level: 'critical' as const,
    signs: ['Excessive bleeding from minor cuts', 'Spontaneous bruising', 'Bleeding into joints', 'Prolonged bleeding after vaccinations'],
    immediate_action: 'EMERGENCY VET for any significant bleeding. Do not allow any surgery without informing the vet of hemophilia status. Blood products (fresh frozen plasma, cryoprecipitate) must be available.',
    vet_decision: 'Any unusual bleeding = emergency vet immediately.',
    note: 'Males are affected; females are carriers. DNA test breeding stock.',
  },
];
