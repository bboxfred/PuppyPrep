/**
 * Directly test loadInfobase console.warn fallback by mutating a breed
 * in memory to point at a non-existent info_base_id. This verifies the
 * dev-time safety net fires correctly.
 */
import { generateSchedule } from '../src/data/schedule-engine';
import { BREEDS } from '../src/data/breeds/registry';

async function main() {
  // Find any real breed and temporarily redirect its info_base_id
  const breed = BREEDS.find(b => b.id === 'jack_russell_terrier');
  if (!breed) throw new Error('JRT not found');
  const original = breed.info_base_id;
  breed.info_base_id = 'zzz_nonexistent_base';

  let warnFired = false;
  const orig = console.warn;
  console.warn = (m: any) => {
    if (typeof m === 'string' && m.includes('No infobase found')) warnFired = true;
  };

  try {
    await generateSchedule({
      dog_id: 't', breed_id: 'jack_russell_terrier', breed_name: 'JRT',
      size_category: 'small', status: 'born', birth_date: new Date(),
      puppy_count: 3, is_singleton: false, nursing_status: 'all',
      dam_weight_kg: 6.5, dam_age_band: '2_to_5', first_litter: false,
      vet_confirmed: 'ultrasound',
      is_jrt_type: true, is_fox_terrier: false, is_wire_fox_terrier: false,
      is_border_terrier: false, is_min_pin: false, is_rat_terrier: false,
      notif_time: '08:00', notif_lead_time_hours: 24,
    });
  } finally {
    console.warn = orig;
    breed.info_base_id = original;
  }

  if (warnFired) {
    console.log('\x1b[32m✓\x1b[0m loadInfobase console.warn fallback fires for unknown info_base_id');
    process.exit(0);
  } else {
    console.log('\x1b[31m✗\x1b[0m Fallback did NOT fire — bug in loadInfobase default branch');
    process.exit(1);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
