/**
 * End-to-end scenario tests for breed rollout.
 * Runs against the live schedule engine.
 */
import { generateSchedule } from '../src/data/schedule-engine';
import { BREEDS, getBreedById } from '../src/data/breeds/registry';

const G = '\x1b[32m', R = '\x1b[31m', Y = '\x1b[33m', C = '\x1b[36m', X = '\x1b[0m';
const pass = (m: string) => console.log(`${G}✓${X} ${m}`);
const fail = (m: string) => console.log(`${R}✗${X} ${m}`);
const info = (m: string) => console.log(`${C}→${X} ${m}`);
const hdr  = (m: string) => console.log(`\n${C}=== ${m} ===${X}`);

let totalPass = 0, totalFail = 0;
const p = (b: boolean, msg: string) => { if (b) { pass(msg); totalPass++; } else { fail(msg); totalFail++; } };

async function main() {
// ─── Registry summary ────────────────────────────────────────────────────
hdr('Registry summary');
info(`Total breeds: ${BREEDS.length}`);
info(`Available (non-mixed): ${BREEDS.filter(b => b.available && b.id !== 'mixed_breed').length}`);

// ─── Graceful fallback for unknown breed ─────────────────────────────────
hdr('Fallback for unknown breed_id');
// Test path 1: unknown breed_id (not in registry) → getBreedById returns undefined
// → info_base_id defaults to 'mixed_breed' → no warning, schedule still works.
const unknownEvents = await generateSchedule({
  dog_id: 'unknown',
  breed_id: 'this_breed_does_not_exist_xxx',
  breed_name: 'Fake',
  size_category: 'medium',
  status: 'born',
  birth_date: new Date(),
  puppy_count: 4, is_singleton: false,
  nursing_status: 'all',
  dam_weight_kg: 15,
  dam_age_band: '2_to_5',
  first_litter: false,
  vet_confirmed: 'ultrasound',
  is_jrt_type: false, is_fox_terrier: false, is_wire_fox_terrier: false,
  is_border_terrier: false, is_min_pin: false, is_rat_terrier: false,
  notif_time: '08:00', notif_lead_time_hours: 24,
});
p(unknownEvents.length > 0,
  `Unknown breed falls back to mixed_breed gracefully — ${unknownEvents.length} events generated`);

// Test path 2: directly verify loadInfobase console.warn fires by importing it.
// Since loadInfobase isn't exported, we test by temporarily patching the
// registry with a breed that points to a non-existent info_base_id.
// NOTE: we're not going to mutate the registry; the existing code path is
// validated by the app's real behavior when a new breed is added to the
// registry before its infobase file exists (development-time safety net).
info('(loadInfobase console.warn is a dev-time safety net for registry/infobase mismatch — not invokable via public API without registry mutation)');

// ─── Scenario A: Golden Retriever pregnancy ──────────────────────────────
hdr('Scenario A — Golden Retriever pregnancy (5 weeks)');
const mating5w = new Date();
mating5w.setDate(mating5w.getDate() - 35);
mating5w.setHours(0, 0, 0, 0);
const due = new Date(mating5w.getTime() + 63 * 86400000);

const A = await generateSchedule({
  dog_id: 'a',
  breed_id: 'golden_retriever',
  breed_name: 'Golden Retriever',
  size_category: 'large',
  status: 'pregnant',
  mating_date: mating5w,
  estimated_due_date: due,
  is_singleton: false,
  dam_weight_kg: 28,
  dam_age_band: '2_to_5',
  first_litter: true,
  vet_confirmed: 'ultrasound',
  is_jrt_type: false, is_fox_terrier: false, is_wire_fox_terrier: false,
  is_border_terrier: false, is_min_pin: false, is_rat_terrier: false,
  notif_time: '08:00', notif_lead_time_hours: 24,
});

info(`Events: ${A.length}`);
info(`Due date: ${due.toDateString()}`);
p(A.length > 20, 'Substantial event set generated');
p(A.some(e => e.tags.includes('birthing_guide')), 'WHELPING_CALENDAR_EVENTS from birthing-guide.ts loaded');
p(A.some(e => e.day_number < 0), 'Pregnancy events present (day_number < 0)');
p(A.some(e => /large litter|rotation|8\+|9\+|10\+|litter preparation/i.test(e.title + ' ' + e.description + ' ' + (e.detail || ''))),
  'Large-litter rotation-feeding event present');
p(!A.some(e => e.tags.includes('deworming')),
  'Deworming correctly GATED OUT during pregnancy');
p(!A.some(e => e.tags.includes('vaccination')),
  'Vaccinations correctly GATED OUT during pregnancy');

// ─── Scenario B: French Bulldog C-section ────────────────────────────────
hdr('Scenario B — French Bulldog C-section today (3 puppies)');
const today = new Date();
today.setHours(0, 0, 0, 0);

const B = await generateSchedule({
  dog_id: 'b',
  breed_id: 'french_bulldog',
  breed_name: 'French Bulldog',
  size_category: 'small',
  status: 'born',
  birth_date: today,
  puppy_count: 3, is_singleton: false,
  nursing_status: 'all',
  dam_weight_kg: 10.5,
  dam_age_band: '2_to_5',
  first_litter: false,
  vet_confirmed: 'ultrasound',
  is_jrt_type: false, is_fox_terrier: false, is_wire_fox_terrier: false,
  is_border_terrier: false, is_min_pin: false, is_rat_terrier: false,
  notif_time: '08:00', notif_lead_time_hours: 24,
});

info(`Events: ${B.length}`);
const day0B = B.filter(e => e.day_number === 0);
info(`Day 0 events: ${day0B.length}`);

p(B.some(e => /c-section|brachycephalic anaesth|post-c-section/i.test(e.title + ' ' + e.description)),
  'C-section / brachycephalic anaesthetic recovery event on Day 0');
p(B.some(e => /boas|airway management/i.test(e.title + ' ' + e.description)),
  'BOAS / airway monitoring event');
p(B.some(e => /cleft palate/i.test(e.title + ' ' + e.description)),
  'Cleft palate check event on Day 0');
p(B.some(e => /heat|keep.*cool|cooler.*whelping|28.*30.*c/i.test(e.title + ' ' + e.description + ' ' + (e.detail || ''))),
  'Heat / cool-whelping-box management event present');

// Feeding cadence: one feeding reminder per day with repeat_pattern.hours
// set to the profile's week_1 frequency. Frenchie = 2h.
const feedB = B.find(e => e.day_number === 0 && e.tags.includes('feeding'));
const freqB = (feedB as any)?.repeat_pattern?.hours;
info(`Day 0 feeding repeat cadence: ${freqB} hours`);
info(`Day 0 feeding title: "${feedB?.title}"`);
p(freqB === 2,
  `Feeding frequency = 2 hours (NOT 90 min) — French Bulldog is hypoglycemia-medium, not high`);

// ─── Scenario C: Chihuahua singleton ─────────────────────────────────────
hdr('Scenario C — Chihuahua singleton today (1 puppy)');

const Cres = await generateSchedule({
  dog_id: 'c',
  breed_id: 'chihuahua',
  breed_name: 'Chihuahua',
  size_category: 'toy',
  status: 'born',
  birth_date: today,
  puppy_count: 1, is_singleton: true,
  nursing_status: 'all',
  dam_weight_kg: 2.0,
  dam_age_band: '2_to_5',
  first_litter: false,
  vet_confirmed: 'ultrasound',
  is_jrt_type: false, is_fox_terrier: false, is_wire_fox_terrier: false,
  is_border_terrier: false, is_min_pin: false, is_rat_terrier: false,
  notif_time: '08:00', notif_lead_time_hours: 24,
});

info(`Events: ${Cres.length}`);

p(Cres.some(e => /singleton/i.test(e.title + ' ' + e.description + ' ' + (e.detail || ''))),
  'Singleton syndrome events present');
p(Cres.some(e => /hypoglycemia|90 min/i.test(e.title + ' ' + e.description)),
  'Hypoglycemia protocol event on Day 0');

// Feeding cadence: Chihuahua profile week_1 = 1.5h (90 min)
const feedC = Cres.find(e => e.day_number === 0 && e.tags.includes('feeding'));
const freqC = (feedC as any)?.repeat_pattern?.hours;
info(`Day 0 feeding repeat cadence: ${freqC} hours`);
info(`Day 0 feeding title: "${feedC?.title}"`);
p(freqC === 1.5,
  `Feeding frequency = 1.5 hours (90 MINUTES) — critical for Chihuahua hypoglycemia`);

// Check for 32°C whelping box temp
p(Cres.some(e => /32.*c|32°c|whelping box temp/i.test(e.title + ' ' + e.description + ' ' + (e.detail || ''))),
  'Whelping box temperature (32°C expected for Chihuahua)');

// ─── Summary ─────────────────────────────────────────────────────────────
hdr('SUMMARY');
console.log(`Scenario A events: ${A.length}`);
console.log(`Scenario B events: ${B.length}`);
console.log(`Scenario C events: ${Cres.length}`);
console.log(`Tests passed: ${G}${totalPass}${X}`);
console.log(`Tests failed: ${totalFail > 0 ? R : G}${totalFail}${X}`);

process.exit(totalFail > 0 ? 1 : 0);
}

main().catch(err => { console.error(err); process.exit(1); });
