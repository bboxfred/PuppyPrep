import { BREEDS, getBreedById, validateBreed } from '../src/data/breeds/registry';

console.log('Total breeds:', BREEDS.length);
console.log('Available:', BREEDS.filter(b => b.available).length);

const NEW = [
  'golden_retriever', 'labrador_retriever',
  'german_shepherd', 'border_collie', 'australian_shepherd', 'doberman_pinscher',
  'chihuahua', 'yorkshire_terrier', 'pomeranian', 'maltese',
  'toy_poodle', 'miniature_poodle', 'standard_poodle',
  'bichon_frise', 'cavalier_kcs', 'shih_tzu', 'dachshund', 'pembroke_corgi',
  'french_bulldog', 'english_bulldog', 'boxer',
  'rottweiler', 'great_dane', 'siberian_husky', 'beagle',
];
let ok = 0; const miss: string[] = [];
for (const id of NEW) {
  const b = getBreedById(id);
  if (!b) { miss.push(`MISSING ${id}`); continue; }
  try { validateBreed(b); if (!b.available) miss.push(`${id}: unavailable`); else ok++; }
  catch (e: any) { miss.push(`${id}: ${e.message}`); }
}
console.log(`\n${ok}/${NEW.length} breeds OK`);
if (miss.length) console.log('Issues:', miss);

const flags: Array<[string, string]> = [
  ['chihuahua', 'no-collar-ever'],
  ['dachshund', 'ivdd-risk'],
  ['pembroke_corgi', 'ivdd-risk'],
  ['pembroke_corgi', 'vwd-risk'],
  ['border_collie', 'mdr1-risk'],
  ['australian_shepherd', 'mdr1-risk'],
  ['australian_shepherd', 'double-merle-risk'],
  ['doberman_pinscher', 'vwd-risk'],
  ['french_bulldog', 'csection-likely'],
  ['english_bulldog', 'csection-likely'],
  ['golden_retriever', 'large-litter'],
  ['great_dane', 'gdv-risk'],
  ['great_dane', 'giant-breed'],
  ['standard_poodle', 'gdv-risk'],
  ['boxer', 'heat-intolerant'],
];
let fOk = 0; const fMiss: string[] = [];
for (const [id, flag] of flags) {
  const b = getBreedById(id);
  if (b?.special_care_flags?.includes(flag)) fOk++;
  else fMiss.push(`${id} missing ${flag}`);
}
console.log(`\nFlags: ${fOk}/${flags.length}`);
if (fMiss.length) fMiss.forEach(m => console.log('  ' + m));

const hypoCheck: Array<[string, 'high' | 'medium' | 'low']> = [
  ['chihuahua', 'high'], ['yorkshire_terrier', 'high'], ['pomeranian', 'high'],
  ['maltese', 'high'], ['toy_poodle', 'high'],
  ['shih_tzu', 'medium'], ['bichon_frise', 'medium'], ['cavalier_kcs', 'medium'],
  ['miniature_poodle', 'medium'], ['dachshund', 'medium'], ['pembroke_corgi', 'medium'],
  ['golden_retriever', 'low'], ['labrador_retriever', 'low'], ['german_shepherd', 'low'],
];
let hOk = 0; const hMiss: string[] = [];
for (const [id, expected] of hypoCheck) {
  const b = getBreedById(id);
  if (b?.hypoglycemia_risk === expected) hOk++;
  else hMiss.push(`${id}: expected ${expected}, got ${b?.hypoglycemia_risk}`);
}
console.log(`\nHypoglycemia: ${hOk}/${hypoCheck.length}`);
if (hMiss.length) hMiss.forEach(m => console.log('  ' + m));

// Pembroke corgi: user said medium. Check
console.log('\npembroke_corgi hypoglycemia_risk:', getBreedById('pembroke_corgi')?.hypoglycemia_risk);

process.exit((miss.length + fMiss.length + hMiss.length) > 0 ? 1 : 0);
