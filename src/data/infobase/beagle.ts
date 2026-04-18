/**
 * INFO BASE: BEAGLE
 * Applies to: Beagle (13" and 15" varieties)
 * Info base ID: 'beagle'
 *
 * ⚠️ ISOLATION RULE: Only imported when breed.info_base_id === 'beagle'.
 *
 * Sources: National Beagle Club of America, Merck Vet Manual,
 * Cornell CVM, Embark (Factor VII prevalence), VCA Animal Hospitals, AKC.
 *
 * Key risks: Factor VII deficiency (bleeding disorder DNA test),
 * epilepsy, hypothyroidism, obesity, IVDD (CDDY — 14.1% at-risk),
 * cherry eye. Generally easy whelpers.
 */

export const BEAGLE_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 4, max: 8, typical: 6 },
  newborn_weight_grams: { min: 200, max: 380, typical: 290 },
  adult_weight_kg: {
    male:   { min: 9,  max: 13.5 },
    female: { min: 9,  max: 11   },
  },
  size_category: 'small' as const,
  hypoglycemia_risk: 'low' as const,
  singleton_risk: false,
  csection_rate_percent: 5,
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 200, max: 380,  typical: 290  },
    day_7:  { min: 380, max: 660,  typical: 520  },
    day_14: { min: 550, max: 920,  typical: 735  },
    week_3: { min: 780, max: 1300, typical: 1040 },
    week_4: { min: 1100, max: 1820, typical: 1460 },
    week_6: { min: 1830, max: 3000, typical: 2415 },
    week_8: { min: 2450, max: 4000, typical: 3225 },
  },

  daily_gain_minimum_grams: 15,
  daily_gain_target_grams: 25,
  daily_gain_percent_bodyweight: 5,

  dam_lactation_calories_multiplier: {
    week_1: 1.5, week_2: 2.0, week_3_4: 3.0, week_5: 2.5,
  },

  formula_volumes_per_feeding_ml: {
    week_1: { min: 5,  max: 9,  per_100g_body_weight: 1.8 },
    week_2: { min: 8,  max: 14, per_100g_body_weight: 2.0 },
    week_3: { min: 12, max: 20, per_100g_body_weight: 2.5 },
    week_4: { min: 18, max: 30, per_100g_body_weight: 3.0 },
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
    week_1:      { min: 29.5, max: 32, ideal: 30.5 },
    week_2:      { min: 27,   max: 30, ideal: 28   },
    week_3:      { min: 25,   max: 27, ideal: 26   },
    week_4_plus: { min: 22,   max: 25, ideal: 23   },
  },
  puppy_rectal_temp_celsius: {
    day_1_4:     { min: 34.4, max: 37.2, danger_below: 35.0 },
    day_5_14:    { min: 35.0, max: 37.2, danger_below: 35.5 },
    week_3_4:    { min: 36.1, max: 37.8, danger_below: 36.0 },
    week_5_plus: { min: 37.5, max: 39.2, danger_below: 37.0 },
  },

  whelping_box_cm: {
    small_litter: { w: 90, d: 90 },
    large_litter: { w: 110, d: 110 },
    pig_rail_height_cm: 8,
    wall_height_cm: 40,
  },
};

export const BEAGLE_HEALTH_SCHEDULE = {

  deworming: [
    {
      day: 14,
      label: 'First deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Give worm treatment to all Beagle puppies. Weigh each puppy before dosing. Beagles are scent hounds that will investigate everything on the ground — ongoing parasite exposure is higher than indoor breeds.',
      vet_required: false,
      critical: true,
    },
    {
      day: 28,
      label: 'Second deworming',
      drug: 'Pyrantel pamoate',
      dose: '10 mg/kg',
      targets: ['roundworms', 'hookworms'],
      plain_english: 'Second treatment. Use current weight.',
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
      plain_english: 'Final deworming. Panacur for 3 days. Emphasise to new owners: monthly heartworm prevention covering intestinal worms is essential for Beagles due to outdoor/ground-sniffing lifestyle.',
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
      plain_english: 'First vaccination at 6–8 weeks.',
      vet_required: true,
      critical: true,
    },
    {
      week: 10,
      label: 'Second vaccination',
      vaccine: 'DHPP #2 + Leptospirosis #1',
      covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'],
      plain_english: 'Second vaccination plus Lepto. Beagles that hunt or work outdoors are at higher Lepto risk.',
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
      label: 'Final parvo booster',
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
      label: 'Post-whelping dam check',
      urgency: 'within_48_hours',
      plain_english: 'Vet check within 48 hours. Beagles are excellent whelpers with 5% C-section rate. Standard post-whelping check — confirm all placentas passed.',
      critical: true,
    },
    {
      week: 1,
      label: 'Dam and litter check',
      urgency: 'day_7',
      plain_english: 'One-week check. Confirm all puppies gaining weight.',
      critical: true,
    },
    {
      week: 6,
      label: 'Puppy wellness + Factor VII awareness',
      urgency: 'week_6_to_8',
      plain_english: 'First vet visit. Vaccinations, full physical. Request Factor VII DNA test if parents have not been tested. Any pre-surgical puppy (neuter, hernia repair) with unknown Factor VII status should have BMBT (buccal mucosal bleeding time) checked before any procedure.',
      critical: true,
    },
    {
      week: 8,
      label: 'Pre-rehoming health check',
      urgency: 'before_leaving',
      plain_english: 'Final check. Inform new owners: Factor VII status. Epilepsy awareness from 6 months. Obesity prevention from day 1 — Beagles are food-obsessed and will overeat. Recall limitation — Beagles follow their nose and rarely have reliable off-leash recall.',
      critical: true,
    },
  ],

  breed_specific_screenings: [
    {
      name: 'Factor VII Deficiency DNA test',
      timing: 'Any age — DNA test via cheek swab',
      method: 'DNA test for F7 c.407G>A mutation',
      plain_english: 'Factor VII deficiency is a bleeding disorder — affected dogs bleed excessively after surgery or injury. Embark data: 4.3% of Beagles are affected, 26.8% are carriers. Test both parents. Disclose status to new owners and ensure every vet who treats this dog is informed before any surgery.',
      mandatory_for_breeding: true,
    },
    {
      name: 'Hip dysplasia',
      timing: 'OFA at 24 months',
      method: 'OFA radiograph',
      plain_english: 'OFA hip certification recommended for breeding stock.',
      mandatory_for_breeding: false,
    },
  ],
};

export const BEAGLE_PREGNANCY_EVENTS = [
  {
    id_suffix: 'beagle_preg_factor7',
    day_offset: -42,
    title: 'Factor VII status: Confirm before whelping',
    category: 'health' as const,
    priority: 'high' as const,
    is_free: true,
    description: 'If dam is Factor VII affected, whelping carries bleeding risk.',
    detail: 'If your Beagle dam is F7-affected (homozygous) or has not been tested:\n\n- Inform your vet before whelping\n- Have a plan for managing any postpartum bleeding\n- Avoid unnecessary surgical procedures around whelping time\n- Monitor umbilical cords of neonates from F7-positive parents for extended bleeding\n\nFactor VII-affected dams rarely have serious whelping complications but the risk is elevated compared to clear dogs. Being prepared costs nothing.',
  },
  {
    id_suffix: 'beagle_preg_escape_proof',
    day_offset: -14,
    title: 'Escape-proof the whelping area',
    category: 'environment' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Beagle dams have strong scent-following instincts — secure the whelping area.',
    detail: 'Pregnant Beagle dams near term may wander in search of a denning site following scent trails. Secure the whelping area before Day 58:\n\n- Keep dam in a secured indoor area from Day 58\n- Introduce and positively reinforce the whelping box early\n- Beagles are escape artists — check all fence lines\n\nOnce a Beagle dam chooses her own whelping site, she will defend it. Make the whelping box the obvious choice.',
  },
];

export const BEAGLE_NEONATAL_EVENTS = [
  {
    id_suffix: 'beagle_neo_obesity_prevention',
    day_offset: 21,
    title: 'Week 3: Begin portion discipline — Beagle obesity starts at weaning',
    category: 'nutrition' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Beagles have voracious appetites. Food management must begin at weaning.',
    detail: 'Beagles are driven by food above almost everything else. This makes training easy but obesity extremely common.\n\nFrom the first solid meal:\n- Measured portions only — never free-feed\n- Remove food dishes after 15 minutes\n- Use feeding time as training time (puppies will work for food readily)\n\nInform new owners:\n- Beagles will overeat until sick, every single time\n- Obesity in Beagles dramatically increases IVDD risk, joint disease, and reduces lifespan\n- An overweight Beagle at 2 years is a medical problem\n- Use puzzle feeders to slow eating',
  },
];

export const BEAGLE_SOCIALIZATION_EVENTS = [
  {
    id_suffix: 'beagle_social_week3',
    day_offset: 21,
    title: 'Socialization Week 3: Pack-oriented and vocal',
    category: 'socialization' as const,
    priority: 'critical' as const,
    is_free: false,
    description: 'Beagles are pack animals. Separation anxiety and baying are significant without socialisation.',
    detail: 'Beagles are bred to work in packs and are highly social. Without preparation:\n- Separation anxiety causes persistent loud baying (Beagles are VERY loud)\n- Destructive behaviour when alone\n\nFrom Week 3:\n- Daily handling by 8+ people\n- Brief separations from Week 5 — crate training essential\n- Introduce "quiet" cue from Week 4: when puppy is quiet, mark and reward\n- Multiple handler rotation to prevent single-person attachment',
  },
  {
    id_suffix: 'beagle_social_week4_scent',
    day_offset: 28,
    title: 'Socialization Week 4: Channel scent drive positively',
    category: 'socialization' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Beagle scent drive is irresistible — build on it for mental enrichment.',
    detail: 'The Beagle\'s nose is one of the most powerful in the canine world. This drive can be channelled positively.\n\nFrom Week 4:\n- Introduce basic nose work: hide treats under cups or in a snuffle mat\n- Allow outdoor exploration on lead — let them sniff freely for 50% of the walk\n- Scent games are the best mental exercise for this breed\n\nInform new owners:\n- A Beagle following a scent cannot hear recall commands — this is neurological, not disobedience\n- NEVER off-leash in an unfenced area\n- Nose work classes are ideal mental exercise\n- A tired Beagle from 20 minutes of nose work is calmer than one from 2 hours of walking',
  },
];

export const BEAGLE_TRAINING_EVENTS = [
  {
    id_suffix: 'beagle_training_recall_limitations',
    day_offset: 28,
    title: 'Recall: Establish early — expect limitations lifelong',
    category: 'training' as const,
    priority: 'high' as const,
    is_free: false,
    description: 'Beagle recall is compromised by scent drive. Build the best recall possible but accept its limits.',
    detail: 'Beagle recall in an open area with scent distractions is inherently unreliable — this is breed physiology, not a training failure.\n\nBuild the best possible recall:\n1. High-value treats (cheese, chicken, liver) ONLY for recall — never for anything else\n2. Say name + "come" in high happy voice, sprint away\n3. Enormous celebration on arrival — biggest party the puppy has ever seen\n4. Practice daily with increasing distraction levels\n\nInform new owners:\n- Even a well-trained Beagle will follow a compelling scent off-lead\n- Secure fenced garden is essential\n- Long line (10–15m) for outdoor exercise in non-fenced areas\n- Microchip + GPS tag recommended — Beagles do get lost',
  },
];

export const BEAGLE_HEALTH_RISKS = [
  {
    condition: 'Factor VII Deficiency',
    timing: 'Present from birth; discovered at surgery or significant injury',
    risk_level: 'high' as const,
    signs: ['Prolonged bleeding after minor cuts', 'Excessive surgical bleeding', 'Bleeding into body cavities after trauma'],
    immediate_action: 'Inform every vet before any surgical procedure. Fresh frozen plasma is the treatment for acute bleeding. Non-emergency surgery should be planned in advance with blood products available.',
    vet_decision: 'Significant bleeding = emergency vet. Planned surgery = pre-surgical consultation.',
    note: 'DNA test all breeding stock. Disclose status to new owners in writing.',
  },
  {
    condition: 'Epilepsy',
    timing: 'First seizure typically 6 months to 5 years',
    risk_level: 'high' as const,
    signs: ['Loss of consciousness and muscle control', 'Paddling', 'Urination or defecation', 'Confusion after seizure (post-ictal phase)'],
    immediate_action: 'Time the seizure. Do not restrain. Remove objects that could cause injury. Seizure >5 minutes = emergency vet.',
    vet_decision: 'Call vet after first seizure for workup. Emergency for seizures >5 minutes.',
  },
  {
    condition: 'Obesity',
    timing: 'Can begin at weaning; accelerates after neutering',
    risk_level: 'high' as const,
    signs: ['Cannot feel ribs without pressing', 'No visible waist from above', 'Dog always appears hungry', 'Rapid weight gain'],
    immediate_action: 'Implement strict portion control. Weigh food daily. Remove all extras.',
    vet_decision: 'Call vet if BCS over 6/9 for weight management plan.',
    note: 'Obesity is the most preventable Beagle health problem. Start strict portions at weaning.',
  },
];
