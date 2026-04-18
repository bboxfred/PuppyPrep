/**
 * INFO BASE: GERMAN SHORTHAIRED POINTER (GSP)
 * Info base ID: 'german_shorthaired_pointer'
 *
 * Sources: GSPCA CHIC (gspca.org), UC Davis VGL CNGB3,
 * Sidjanin 2002 Hum Mol Genet [PR] (CNGB3 c.784G>A GSP-specific CD2 variant),
 * Vos-Loohuis 2012 Animal Genetics [PR] (vWD2 ~7.8% carriers in GWP),
 * Martin 1985 JAVMA [PR] (GSP only breed with statistically rising HD 1966–1984),
 * GSPCA CHIC update May 2014 (elbow dysplasia added as required),
 * Evans & Adams 2010 JSAP [PR] (GSP not in top-10 C-section breeds),
 * Merck Vet Manual, Cornell CVM, VCA Animal Hospitals.
 *
 * ⚠️ CRITICAL FLAGS:
 * - Cone Degeneration: CNGB3 c.784G>A (GSP CD2) — day-blindness 8–12 weeks
 *   Test via UC Davis VGL. Only 1 subsequent generation clearable by parentage.
 * - vWD Type 2: DDAVP ineffective; plasma/cryoprecipitate needed
 * - Hip dysplasia: only breed with statistically INCREASING rate 1966–1984
 * - Elbow dysplasia: required GSPCA CHIC from May 2014
 * - Litters 8–12: rotation nursing likely required
 */

export const GERMAN_SHORTHAIRED_POINTER_PROFILE = {
  gestation_days_typical: 63,
  gestation_days_range: { min: 58, max: 68 },
  avg_litter_size: { min: 7, max: 12, typical: 9 },
  newborn_weight_grams: { min: 300, max: 450, typical: 370 }, // [EXT from breed size]
  adult_weight_kg: {
    male:   { min: 25, max: 32 },
    female: { min: 20, max: 27 },
  },
  size_category: 'medium' as const,
  hypoglycemia_risk: 'low' as const,
  singleton_risk: false,
  csection_rate_percent: 6, // [EXT — not in Evans & Adams 2010 top-10]
  brachycephalic: false,

  weight_targets: {
    birth:  { min: 300, max: 450,  typical: 370  },
    day_7:  { min: 560, max: 810,  typical: 680  },
    day_14: { min: 800, max: 1150, typical: 975  },
    week_3: { min: 1150, max: 1650, typical: 1400 },
    week_4: { min: 1630, max: 2330, typical: 1980 },
    week_6: { min: 2700, max: 3850, typical: 3275 },
    week_8: { min: 3600, max: 5200, typical: 4400 },
  },
  daily_gain_minimum_grams: 20,
  daily_gain_target_grams: 38,
  daily_gain_percent_bodyweight: 5,
  dam_lactation_calories_multiplier: { week_1: 1.5, week_2: 2.0, week_3_4: 3.5, week_5: 2.5 },
  formula_volumes_per_feeding_ml: {
    week_1: { min: 6,  max: 10, per_100g_body_weight: 1.8 },
    week_2: { min: 10, max: 16, per_100g_body_weight: 2.0 },
    week_3: { min: 15, max: 23, per_100g_body_weight: 2.5 },
    week_4: { min: 22, max: 32, per_100g_body_weight: 3.0 },
  },
  feeding_frequency_hours: { week_1: 2, week_2: 2.5, week_3: 3, week_4: 4 },
  tube_size_french: 5, // Week 1–2; upgrade to 8 Fr week 3+
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
    large_litter:  { w: 150, d: 150 },
    pig_rail_height_cm: 10,
    wall_height_cm: 50,
  },
};

export const GERMAN_SHORTHAIRED_POINTER_HEALTH_SCHEDULE = {
  deworming: [
    { day: 14, label: 'First deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Worm treatment for all puppies. Weigh each individually — weight spread in large litters is significant by Week 2.', vet_required: false, critical: true },
    { day: 28, label: 'Second deworming', drug: 'Pyrantel pamoate', dose: '10 mg/kg', targets: ['roundworms', 'hookworms'], plain_english: 'Second treatment. Use weight on the day.', vet_required: false, critical: true },
    { day: 42, label: 'Third deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg × 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Panacur 3 days. GSPs used near water have elevated Giardia risk.', vet_required: false, critical: true },
    { day: 56, label: 'Fourth deworming', drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg × 3 days', targets: ['roundworms', 'hookworms', 'whipworms', 'giardia'], plain_english: 'Final deworming before rehoming.', vet_required: false, critical: true },
  ],
  dam_deworming: {
    start_day_of_pregnancy: 40, end_days_after_birth: 14,
    drug: 'Fenbendazole (Panacur)', dose: '50 mg/kg daily',
    plain_english: 'Daily Panacur Day 40 through 14 days post-whelp.', critical: true,
  },
  vaccinations: [
    { week: 6,  label: 'First vaccination',  vaccine: 'DHPP #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza'], plain_english: 'Standard first vaccination.', vet_required: true, critical: true },
    { week: 10, label: 'Second vaccination', vaccine: 'DHPP #2 + Leptospirosis #1', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis'], plain_english: 'Plus first Lepto — elevated risk for field/water dogs.', vet_required: true, critical: true },
    { week: 14, label: 'Third vaccination',  vaccine: 'DHPP #3 + Leptospirosis #2 + Rabies', covers: ['Distemper', 'Hepatitis', 'Parvovirus', 'Parainfluenza', 'Leptospirosis', 'Rabies'], plain_english: 'Third series plus Rabies.', vet_required: true, critical: true },
    { week: 18, label: 'Final parvo booster', vaccine: 'DHPP #4', covers: ['Distemper', 'Parvovirus'], plain_english: 'Do not skip.', vet_required: true, critical: true },
  ],
  vet_visits: [
    { day: 0,   label: 'Post-whelping dam check', urgency: 'within_48_hours', plain_english: 'Vet check within 48h. Large litter rotation nursing plan. Confirm all placentas passed.', critical: true },
    { week: 1,  label: 'Dam and litter check', urgency: 'day_7', plain_english: 'All pups gaining ≥20g/day. Any pup <75% of litter average = begin supplemental feeding.', critical: true },
    { week: 6,  label: '⚠️ CD assessment window + vaccinations', urgency: 'week_6_to_8', plain_english: 'CRITICAL: assess all puppies outdoors in bright sun for CD signs. Vaccinations, full physical. Discuss vWD-2 disclosure with vet.', critical: true },
    { week: 8,  label: 'Pre-rehoming check', urgency: 'before_leaving', plain_english: 'CD DNA results in writing to every new owner. vWD-2 status disclosure — must be given to every vet this dog ever sees.', critical: true },
  ],
  breed_specific_screenings: [
    {
      name: 'Cone Degeneration (CD) — CNGB3 DNA MANDATORY',
      timing: 'Test both parents before breeding. Assess puppies outdoors 8–12 weeks.',
      method: 'UC Davis VGL — CNGB3 c.784G>A (GSP CD2 variant). Results registered OFA.',
      plain_english: 'Day-blindness from degeneration of cone photoreceptors. GSP variant CNGB3 c.784G>A is distinct from Alaskan Malamute CD1 — ensure GSP-specific test. ERG absent in adults. Autosomal recessive. Only one subsequent generation of two tested parents may be cleared by parentage. Affected dogs live well with management (UV goggles outdoors). Never breed carrier × carrier.',
      mandatory_for_breeding: true,
    },
    {
      name: 'vWD Type 2',
      timing: 'DNA test both parents before breeding',
      method: 'VetGen vWD Type 2 genetic test. Results to OFA.',
      plain_english: 'GSP-specific. More severe than Type 1 — DDAVP largely ineffective. Plasma or cryoprecipitate needed for bleeding episodes. Disclose to every vet and surgical team in writing.',
      mandatory_for_breeding: true,
    },
    { name: 'Hip dysplasia', timing: 'OFA ≥24mo; PennHIP from 16wk', method: 'OFA or PennHIP', plain_english: 'GSP is the only breed with documented statistically increasing HD frequency 1966–1984 (Martin 1985). PennHIP preferred.', mandatory_for_breeding: true },
    { name: 'Elbow dysplasia', timing: 'OFA ≥24mo (required GSPCA CHIC May 2014)', method: 'OFA radiograph', plain_english: 'Added to GSPCA CHIC in May 2014 due to rising sporting breed incidence.', mandatory_for_breeding: true },
    { name: 'Cardiac', timing: 'ACVIM cardiologist ≥24mo', method: 'OFA evaluation by cardiologist', plain_english: 'Annual cardiologist clearance required for GSPCA CHIC.', mandatory_for_breeding: true },
    { name: 'CAER eye exam', timing: 'Annual until age 6, every 2yr after', method: 'Board-certified ACVO ophthalmologist', plain_english: 'Annual CAER until age 6 required for GSPCA CHIC.', mandatory_for_breeding: true },
  ],
};

export const GERMAN_SHORTHAIRED_POINTER_PREGNANCY_EVENTS = [
  {
    id_suffix: 'gsp_preg_cd_vwd',
    day_offset: -42,
    title: '⚠️ Confirm CD and vWD-2 DNA status on both parents',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'CD and vWD-2 are the two most important inherited GSP conditions. Both parents must be tested.',
    detail: 'CONE DEGENERATION (CNGB3 c.784G>A):\n✅ Both N/N: No affected offspring possible\n⚠️ One N/CD: 50% carriers — asymptomatic, no disease\n🔴 Both N/CD: 25% of litter statistically affected — day-blind from 8–12 weeks\n\nNote: Only ONE subsequent generation from two CD-tested parents can be cleared by parentage — the next generation must be individually tested.\n\nvWD TYPE 2:\nDDAPV largely ineffective — plasma or cryoprecipitate needed for bleeding. Test: VetGen.\n\nIf either parent untested: order now. Results 1–2 weeks.',
    call_vet_if: 'Both parents N/CD (carrier × carrier breeding)',
  },
  {
    id_suffix: 'gsp_preg_exercise',
    day_offset: -28,
    title: 'Exercise restriction from Week 5 of pregnancy',
    category: 'health' as const, priority: 'high' as const, is_free: false,
    description: 'GSP dams are high-drive athletes who will not self-limit. Enforce exercise restrictions.',
    detail: 'Weeks 5–7: leash walks only, 20–40 min twice daily. No running, field work, or jumping.\nWeek 7 to birth: gentle 15–20 min walks only.\nGSPs will want to run — you must enforce the limits.',
  },
  {
    id_suffix: 'gsp_preg_xray',
    day_offset: -7,
    title: 'Pre-whelping X-ray: Count all puppies — critical at Day 55–58',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'Average 9 puppies in a GSP litter — accurate count essential.',
    detail: 'X-ray at Day 55–58. Count every foetal skeleton. Tape the number to the whelping box. With 9–12 puppies whelping can take 6–12 hours — have a warming station for early arrivals.',
  },
];

export const GERMAN_SHORTHAIRED_POINTER_NEONATAL_EVENTS = [
  {
    id_suffix: 'gsp_neo_rotation',
    day_offset: 0,
    title: 'Day 0: Rotation nursing mandatory — GSP dam has 8–10 teats, litter may be 12',
    category: 'nutrition' as const, priority: 'critical' as const, is_free: true,
    description: 'With litters potentially exceeding teat count, rotation must start at birth.',
    detail: 'Divide into Group A (larger) and Group B (smaller). Group B nurses FIRST. Swap every 20–30 min. Any puppy that cannot latch: tube-feed 1.8 ml Esbilac per 100g every 2 hours.\n\nWeigh every puppy at birth and at 24 hours. Any puppy losing weight at 24 hours = supplemental feeding every 2 hours until gaining.',
    call_vet_if: 'Any puppy not nursed or tube-fed within 4 hours of birth',
  },
  {
    id_suffix: 'gsp_neo_cd_window',
    day_offset: 42,
    title: '⚠️ Weeks 6–10: Cone Degeneration assessment window — assess all puppies in bright sunlight',
    category: 'health' as const, priority: 'critical' as const, is_free: true,
    description: 'CD symptoms become visible 8–12 weeks. This is the only clinical window before puppies leave.',
    detail: 'Take every puppy outdoors on a genuinely bright day.\n\n✅ NORMAL: Confident movement, no squinting, same as indoors\n🔴 CD-AFFECTED: Squinting in sunlight, hesitant outdoors, bumping objects, immediately normal in shade\n\nCD is NOT painful. Rod vision (dim/night) is unaffected throughout life. Affected dogs can live well with UV goggles and indoor management. Never breed affected dogs.\n\nDisclose CD DNA status in writing to every new owner.',
    call_vet_if: 'Any puppy squints and hesitates in sunlight but is normal in shade — CD DNA test',
  },
];

export const GERMAN_SHORTHAIRED_POINTER_HEALTH_RISKS = [
  {
    condition: 'Cone Degeneration (Day Blindness)',
    timing: 'Visible from 8–12 weeks; stable lifelong (rods unaffected)',
    risk_level: 'high' as const,
    signs: ['Squinting in bright sunlight only', 'Hesitant movement outdoors on sunny days', 'Bumping objects outdoors', 'Immediately normal in shade or indoors', 'Normal night vision throughout life'],
    immediate_action: 'Not an emergency. Arrange CNGB3 DNA test. Ophthalmology referral for ERG. Manage with UV goggles outdoors.',
    vet_decision: 'Call vet for ophthalmology referral.',
    note: 'CNGB3 c.784G>A GSP-specific. Rod vision intact — dogs navigate well in dim light throughout life.',
  },
  {
    condition: 'vWD Type 2',
    timing: 'Present from birth — found at surgery or injury',
    risk_level: 'critical' as const,
    signs: ['Prolonged bleeding from minor wounds', 'Excessive surgical or dental bleeding'],
    immediate_action: 'Active bleeding = EMERGENCY VET. Alert every vet before any procedure — DDAVP ineffective for Type 2, plasma products needed.',
    vet_decision: 'Emergency for significant bleeding.',
    note: 'More severe than Type 1. DNA test all breeding GSPs. Disclose to every vet in writing.',
  },
  {
    condition: 'Hip Dysplasia',
    timing: 'Symptoms from 4 months; OFA confirmation at 24 months',
    risk_level: 'high' as const,
    signs: ['Limping after exercise', 'Stiffness rising from rest', 'Bunny-hopping gait', 'Reluctance to exercise'],
    immediate_action: 'Vet within a week of persistent lameness. Lean body weight is most impactful intervention.',
    vet_decision: 'Call vet within a week.',
    note: 'Only breed with statistically increasing HD frequency 1966–1984 (Martin 1985). PennHIP from 16 weeks preferred.',
  },
];
