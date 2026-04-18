/**
 * Batch 8 smoke test — verify each of the 8 new breeds:
 *   1. Loads its infobase (no fallback warning)
 *   2. Produces a non-empty schedule (no crash)
 *   3. Honours the breed's critical special_care_flags via generated events
 */
import { generateSchedule } from '../src/data/schedule-engine';
import { BREEDS, getBreedById } from '../src/data/breeds/registry';

const G = '\x1b[32m', R = '\x1b[31m', C = '\x1b[36m', X = '\x1b[0m';
const pass = (m: string) => console.log(`${G}✓${X} ${m}`);
const fail = (m: string) => console.log(`${R}✗${X} ${m}`);
const info = (m: string) => console.log(`${C}→${X} ${m}`);
const hdr = (m: string) => console.log(`\n${C}=== ${m} ===${X}`);

let tp = 0, tf = 0;
const p = (b: boolean, m: string) => { b ? (pass(m), tp++) : (fail(m), tf++); };

const BATCH_8 = [
  'german_shorthaired_pointer', 'cane_corso', 'boston_terrier',
  'miniature_schnauzer', 'havanese', 'shetland_sheepdog',
  'cockapoo', 'pug',
];

async function main() {
  hdr('Registry presence');
  info(`Total registry: ${BREEDS.length} breeds`);
  info(`Available: ${BREEDS.filter(b => b.available).length}`);

  for (const id of BATCH_8) {
    const b = getBreedById(id);
    p(!!b && b.available, `${id} registered and available=true`);
  }

  hdr('Schedule generation per Batch 8 breed (born today, 3 pups)');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const breed_id of BATCH_8) {
    const breed = getBreedById(breed_id)!;
    let warnFired = false;
    const origWarn = console.warn;
    console.warn = (m: any) => { if (typeof m === 'string' && m.includes('No infobase found')) warnFired = true; };

    const events = await generateSchedule({
      dog_id: `t_${breed_id}`,
      breed_id,
      breed_name: breed.name,
      size_category: breed.size_category,
      status: 'born',
      birth_date: today,
      puppy_count: 3,
      is_singleton: false,
      nursing_status: 'all',
      dam_weight_kg: breed.avg_weight_kg.typical,
      dam_age_band: '2_to_5',
      first_litter: false,
      vet_confirmed: 'ultrasound',
      is_jrt_type: false, is_fox_terrier: false, is_wire_fox_terrier: false,
      is_border_terrier: false, is_min_pin: false, is_rat_terrier: false,
      notif_time: '08:00', notif_lead_time_hours: 24,
    });
    console.warn = origWarn;

    info(`${breed_id}: ${events.length} events`);
    p(events.length > 20, `  ${breed_id} produces substantial schedule`);
    p(!warnFired, `  ${breed_id} loads without fallback warning`);

    // Breed-specific spot checks
    if (breed_id === 'pug') {
      const hasCsection = events.some(e => /c-section|brachycephalic anaesth/i.test(e.title + e.description));
      p(hasCsection, '  pug: C-section recovery event present (27% rate)');
      const feeding = events.find(e => e.day_number === 0 && e.tags.includes('feeding'));
      const freq = (feeding as any)?.repeat_pattern?.hours;
      p(freq === 1.5, `  pug: feeding = 90min (hypoglycaemia HIGH) — got ${freq}h`);
    }
    if (breed_id === 'boston_terrier') {
      const hasCsection = events.some(e => /c-section|brachycephalic anaesth/i.test(e.title + e.description));
      p(hasCsection, '  boston_terrier: C-section recovery event present (92% rate!)');
    }
    if (breed_id === 'havanese') {
      const feeding = events.find(e => e.day_number === 0 && e.tags.includes('feeding'));
      const freq = (feeding as any)?.repeat_pattern?.hours;
      p(freq === 1.5, `  havanese: feeding = 90min (small breed, low birth wt) — got ${freq}h`);
    }
    if (breed_id === 'shetland_sheepdog') {
      // Sheltie has MDR1 risk — ensure MDR1 / herding-breed guidance surfaces
      const mdr1 = events.some(e => /mdr1|ivermectin|herding breed/i.test(e.title + e.description + (e.detail || '')));
      p(mdr1, '  shetland_sheepdog: MDR1 awareness event present');
    }
    if (breed_id === 'cane_corso') {
      const hasGdv = events.some(e => /bloat|gdv/i.test(e.title + e.description + (e.detail || '')));
      p(hasGdv, '  cane_corso: GDV / bloat monitoring event present');
    }
  }

  hdr('SUMMARY');
  console.log(`Batch 8 breeds: ${BATCH_8.length}`);
  console.log(`Total registry entries: ${BREEDS.length}`);
  console.log(`Tests passed: ${G}${tp}${X}`);
  console.log(`Tests failed: ${tf > 0 ? R : G}${tf}${X}`);
  process.exit(tf > 0 ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(1); });
