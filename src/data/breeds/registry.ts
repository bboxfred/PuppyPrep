/**
 * BREED REGISTRY
 * Single source of truth for all selectable breeds.
 *
 * LAUNCH STRATEGY:
 *   Phase 1 (now):   JRT Group — 8 breeds with full isolated info bases
 *   Phase 2 (soon):  Retriever Group, Shepherd Group, Toy Group
 *   Phase 3 (later): All remaining breeds
 *
 * Each breed has an `info_base_id` that maps to a separate file in
 * src/data/infobase/{info_base_id}.ts — NEVER mix info bases.
 */

export type SizeCategory = 'toy' | 'small' | 'medium' | 'large' | 'giant';
export type LaunchPhase = 1 | 2 | 3;

export interface BreedGroupMeta {
  id: string;
  label: string;
  description: string;
  emoji: string;
  color: string; // UI accent for this group card
}

export interface Breed {
  id: string;
  name: string;
  group_id: string;
  aliases: string[];           // Search matches
  size_category: SizeCategory;
  avg_weight_kg: { min: number; max: number; typical: number };
  avg_weight_kg_fallback: number; // Used when user says "I don't know weight"
  avg_litter_size: { min: number; max: number; typical: number };
  gestation_days: { min: number; max: number; typical: number };
  info_base_id: string;        // Maps to src/data/infobase/{id}.ts
  launch_phase: LaunchPhase;
  available: boolean;          // false = "Coming soon" in UI
  emoji: string;
  thumbnail_color: string;     // Placeholder color if no photo
  hypoglycemia_risk: 'low' | 'medium' | 'high';
  flat_faced: boolean;         // Brachycephalic — affects whelping risk
  double_coat: boolean;
  high_prey_drive: boolean;
  singleton_prone: boolean;    // Breeds that often have 1-2 puppy litters
  genetic_health_flags: string[];
  /**
   * Care flags that drive app logic. Values drawn from a controlled vocabulary:
   *   'ivdd-risk'        — long spine / chondrodystrophic (Dachshund, Corgi)
   *   'no-collar-ever'   — tracheal / atlantoaxial risk; harness only, for life
   *   'mdr1-risk'        — drug sensitivity; warn on ivermectin/loperamide
   *   'vwd-risk'         — von Willebrand's disease; bleeding risk
   *   'double-merle-risk'— never breed merle × merle
   *   'csection-likely'  — 80%+ C-section rate; plan elective surgery
   *   'large-litter'     — 8+ puppies common; rotation feeding + extra lactation calories
   *   'gdv-risk'         — bloat risk; slow feeding, no exercise after meals
   *   'giant-breed'      — extended growth window; joint / diet management
   *   'heat-intolerant'  — brachycephalic or double-coat heat risk
   *   'otitis-risk'      — floppy-eared breeds prone to chronic ear infections
   *                        (doodles / cockapoos / spaniels) — weekly cleaning routine
   *   'brachycephalic-mild' — mild BOAS (e.g. Cane Corso) — anaesthesia caution,
   *                        not the full C-section / heat-intolerance protocol
   */
  special_care_flags?: string[];
  temperament_summary: string; // 1 sentence, plain English
  key_care_differences: string[]; // vs generic dog care — shown to user
}

// ─────────────────────────────────────────────────────────────────────────────
// BREED GROUPS
// ─────────────────────────────────────────────────────────────────────────────

export const BREED_GROUPS: BreedGroupMeta[] = [
  {
    id: 'jrt_group',
    label: 'Jack Russell & Terrier Types',
    description: 'Jack Russell, Parson Russell, Fox Terrier, Rat Terrier, and similar small working terriers',
    emoji: '🐾',
    color: '#E67E22',
  },
  {
    id: 'retriever_group',
    label: 'Golden & Labrador Retrievers',
    description: 'Golden Retriever, Labrador Retriever, and similar family dogs',
    emoji: '🐕',
    color: '#F4D03F',
  },
  {
    id: 'shepherd_group',
    label: 'German Shepherd & Working Dogs',
    description: 'German Shepherd, Border Collie, Belgian Malinois',
    emoji: '🐕‍🦺',
    color: '#2ECC71',
  },
  {
    id: 'toy_group',
    label: 'Toy & Small Breeds',
    description: 'Chihuahua, Maltese, Shih Tzu, Pomeranian, and similar small breeds',
    emoji: '🐩',
    color: '#9B59B6',
  },
  {
    id: 'bulldog_group',
    label: 'Bulldogs & Flat-Faced Breeds',
    description: 'French Bulldog, English Bulldog, Pug — special whelping care required',
    emoji: '🐶',
    color: '#E74C3C',
  },
  {
    id: 'large_group',
    label: 'Large & Giant Breeds',
    description: 'Rottweiler, Great Dane, Husky, Boxer, and similar large dogs',
    emoji: '🦮',
    color: '#3498DB',
  },
  {
    id: 'mixed',
    label: 'Mixed Breed / Not Sure',
    description: 'We\'ll use general care guidelines and ask a few extra questions',
    emoji: '🐕',
    color: '#95A5A6',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 BREEDS — JRT GROUP (Full info base available)
// ─────────────────────────────────────────────────────────────────────────────

export const BREEDS: Breed[] = [

  // ── JRT GROUP ──────────────────────────────────────────────────────────────

  {
    id: 'jack_russell_terrier',
    name: 'Jack Russell Terrier',
    group_id: 'jrt_group',
    aliases: ['JRT', 'Jack Russell', 'Jack', 'Jackies'],
    size_category: 'small',
    avg_weight_kg: { min: 5.9, max: 7.7, typical: 6.5 },
    avg_weight_kg_fallback: 6.5,
    avg_litter_size: { min: 4, max: 8, typical: 5 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'jrt',
    launch_phase: 1,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#E67E22',
    hypoglycemia_risk: 'high',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['primary_lens_luxation', 'spinocerebellar_ataxia', 'patellar_luxation', 'deafness', 'legg_calve_perthes'],
    temperament_summary: 'Extremely energetic, intelligent, and stubborn — needs early consistent training.',
    key_care_differences: [
      'Higher hypoglycaemia risk than average — never skip feedings in first 2 weeks',
      'Puppies need intensive early socialisation to prevent aggression toward other dogs',
      'Strong prey drive emerges from week 5 — redirect early',
      'Typical litter size 4–8, but can be up to 12 — large litters common',
    ],
  },

  {
    id: 'parson_russell_terrier',
    name: 'Parson Russell Terrier',
    group_id: 'jrt_group',
    aliases: ['Parson Russell', 'Parson', 'PRT'],
    size_category: 'small',
    avg_weight_kg: { min: 5.0, max: 7.7, typical: 6.0 },
    avg_weight_kg_fallback: 6.0,
    avg_litter_size: { min: 4, max: 8, typical: 5 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'jrt', // Same info base as JRT — nearly identical care
    launch_phase: 1,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#D35400',
    hypoglycemia_risk: 'high',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['primary_lens_luxation', 'late_onset_ataxia', 'patellar_luxation', 'deafness'],
    temperament_summary: 'Similar to JRT but slightly calmer and less vocal; still highly energetic.',
    key_care_differences: [
      'Shares all JRT care protocols — use JRT info base',
      'Slightly longer legs than JRT — reaches feeding bowl slightly earlier',
      'Late-Onset Ataxia (LOA) is specific to Parson Russells — DNA test recommended',
    ],
  },

  {
    id: 'russell_terrier',
    name: 'Russell Terrier',
    group_id: 'jrt_group',
    aliases: ['Mini Jack Russell', 'Short Jack Russell', 'Puddin'],
    size_category: 'small',
    avg_weight_kg: { min: 3.6, max: 7.0, typical: 5.0 },
    avg_weight_kg_fallback: 5.0,
    avg_litter_size: { min: 3, max: 6, typical: 4 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'jrt',
    launch_phase: 1,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#CA6F1E',
    hypoglycemia_risk: 'high',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['primary_lens_luxation', 'spinocerebellar_ataxia', 'patellar_luxation'],
    temperament_summary: 'Compact version of the JRT — same big personality in a smaller frame.',
    key_care_differences: [
      'Smaller body = even higher hypoglycaemia risk than standard JRT',
      'Smaller stomach — requires more frequent small feedings',
      'AKC-recognised as separate breed from Parson Russell Terrier',
    ],
  },

  {
    id: 'smooth_fox_terrier',
    name: 'Smooth Fox Terrier',
    group_id: 'jrt_group',
    aliases: ['Smooth Foxie', 'SFT', 'Fox Terrier Smooth'],
    size_category: 'small',
    avg_weight_kg: { min: 6.4, max: 8.2, typical: 7.0 },
    avg_weight_kg_fallback: 7.0,
    avg_litter_size: { min: 3, max: 6, typical: 4 },
    gestation_days: { min: 59, max: 67, typical: 63 },
    info_base_id: 'fox_terrier',
    launch_phase: 1,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#F39C12',
    hypoglycemia_risk: 'medium',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: true,
    genetic_health_flags: ['patellar_luxation', 'lens_luxation', 'deafness', 'legg_calve_perthes'],
    temperament_summary: 'Alert, energetic, and affectionate — slightly more trainable than JRT.',
    key_care_differences: [
      'Slightly larger than JRT — formula volumes and whelping box sizing differ',
      'More prone to small litters (3–4) — singleton protocol may be needed',
      'Congenital deafness — BAER test recommended at 5–6 weeks',
    ],
  },

  {
    id: 'wire_fox_terrier',
    name: 'Wire Fox Terrier',
    group_id: 'jrt_group',
    aliases: ['Wirehaired Fox Terrier', 'Wire Foxie', 'WFT'],
    size_category: 'small',
    avg_weight_kg: { min: 6.4, max: 8.2, typical: 7.5 },
    avg_weight_kg_fallback: 7.5,
    avg_litter_size: { min: 3, max: 6, typical: 4 },
    gestation_days: { min: 59, max: 67, typical: 63 },
    info_base_id: 'fox_terrier',
    launch_phase: 1,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#E67E22',
    hypoglycemia_risk: 'medium',
    flat_faced: false,
    double_coat: true,  // Wire coat needs specific care
    high_prey_drive: true,
    singleton_prone: true,
    genetic_health_flags: ['patellar_luxation', 'lens_luxation', 'deafness'],
    temperament_summary: 'Energetic and playful; wiry coat needs early brushing desensitisation.',
    key_care_differences: [
      'Wire coat — begin gentle brushing desensitisation from week 3',
      'Same hypoglycaemia and deworming protocols as JRT group',
      'Similar singleton risk to Smooth Fox Terrier',
    ],
  },

  {
    id: 'rat_terrier',
    name: 'Rat Terrier',
    group_id: 'jrt_group',
    aliases: ['Rattie', 'American Rat Terrier'],
    size_category: 'small',
    avg_weight_kg: { min: 4.5, max: 11.3, typical: 7.0 },
    avg_weight_kg_fallback: 7.0,
    avg_litter_size: { min: 4, max: 7, typical: 5 },
    gestation_days: { min: 59, max: 67, typical: 63 },
    info_base_id: 'rat_terrier',
    launch_phase: 1,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#8E44AD',
    hypoglycemia_risk: 'medium',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['patellar_luxation', 'hip_dysplasia', 'allergies', 'pra_progressive_retinal_atrophy'],
    temperament_summary: 'Highly intelligent and trainable — more eager to please than most terriers.',
    key_care_differences: [
      'More size variation than JRT — miniature vs standard affects feeding volumes',
      'Generally easier to train than JRT — responds well to positive reinforcement',
      'Allergy prone — watch for skin reactions when introducing new foods at weaning',
    ],
  },

  {
    id: 'border_terrier',
    name: 'Border Terrier',
    group_id: 'jrt_group',
    aliases: ['Borders', 'BT'],
    size_category: 'small',
    avg_weight_kg: { min: 5.0, max: 7.1, typical: 6.0 },
    avg_weight_kg_fallback: 6.0,
    avg_litter_size: { min: 4, max: 6, typical: 5 },
    gestation_days: { min: 59, max: 67, typical: 63 },
    info_base_id: 'border_terrier',
    launch_phase: 1,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#27AE60',
    hypoglycemia_risk: 'medium',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['canine_epileptoid_cramping_syndrome', 'pulmonic_stenosis', 'hip_dysplasia', 'pra'],
    temperament_summary: 'Affectionate, adaptable, and somewhat easier to manage than JRT — good family dog.',
    key_care_differences: [
      'Canine Epileptoid Cramping Syndrome (CECS) — "Spike\'s Disease" — watch for episodes from 3 months',
      'Double coat — begin brushing desensitisation early (week 3)',
      'Generally calmer temperament — socialisation still critical but slightly lower reactivity risk',
    ],
  },

  {
    id: 'miniature_pinscher',
    name: 'Miniature Pinscher',
    group_id: 'jrt_group',
    aliases: ['Min Pin', 'Zwergpinscher', 'King of Toys'],
    size_category: 'toy',
    avg_weight_kg: { min: 3.6, max: 4.5, typical: 4.0 },
    avg_weight_kg_fallback: 4.0,
    avg_litter_size: { min: 2, max: 5, typical: 3 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'miniature_pinscher',
    launch_phase: 1,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#C0392B',
    hypoglycemia_risk: 'high',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: true,
    genetic_health_flags: ['legg_calve_perthes', 'pra_progressive_retinal_atrophy', 'patellar_luxation', 'thyroid_issues', 'mucopolysaccharidosis'],
    temperament_summary: 'Bold, fearless, and high-energy — independent thinker with a dominant streak.',
    key_care_differences: [
      'Toy size = HIGHEST hypoglycaemia risk — feeding every 2 hours is non-negotiable in week 1',
      'Cold-sensitive — whelping box temperature even more critical than JRT',
      'Small litters common (2–3) — singleton protocol often needed',
      'Puppies are very tiny at birth — use French 3 tube for gavage feeding (not French 5)',
      'Legg-Calvé-Perthes very common — watch for limping from 3 months',
    ],
  },

  // ── RETRIEVER GROUP (Phase 2 — Coming Soon) ───────────────────────────────

  {
    id: 'golden_retriever',
    name: 'Golden Retriever',
    group_id: 'retriever_group',
    aliases: ['Golden', 'Goldie'],
    size_category: 'large',
    avg_weight_kg: { min: 25, max: 34, typical: 30 },
    avg_weight_kg_fallback: 30,
    avg_litter_size: { min: 4, max: 12, typical: 8 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'golden_retriever',
    launch_phase: 2,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#F1C40F',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'elbow_dysplasia', 'cancer', 'heart_disease'],
    special_care_flags: ['large-litter'],
    temperament_summary: 'Gentle, eager to please, and highly trainable — great family dog.',
    key_care_differences: [],
  },

  {
    id: 'labrador_retriever',
    name: 'Labrador Retriever',
    group_id: 'retriever_group',
    aliases: ['Labrador', 'Lab', 'Labbie'],
    size_category: 'large',
    avg_weight_kg: { min: 25, max: 36, typical: 30 },
    avg_weight_kg_fallback: 30,
    avg_litter_size: { min: 5, max: 10, typical: 7 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'labrador_retriever',
    launch_phase: 2,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#F39C12',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'elbow_dysplasia', 'obesity', 'exercise_induced_collapse'],
    special_care_flags: ['large-litter'],
    temperament_summary: 'Friendly, outgoing, and highly trainable — one of the most popular family dogs.',
    key_care_differences: [],
  },

  // ── SHEPHERD / WORKING GROUP ─────────────────────────────────────────────

  {
    id: 'german_shepherd',
    name: 'German Shepherd',
    group_id: 'shepherd_group',
    aliases: ['GSD', 'Alsatian', 'German Shepherd Dog'],
    size_category: 'large',
    avg_weight_kg: { min: 22, max: 40, typical: 32 },
    avg_weight_kg_fallback: 32,
    avg_litter_size: { min: 4, max: 9, typical: 7 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'german_shepherd',
    launch_phase: 2,
    available: true,
    emoji: '🐕‍🦺',
    thumbnail_color: '#2ECC71',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'elbow_dysplasia', 'degenerative_myelopathy', 'bloat'],
    special_care_flags: ['gdv-risk'],
    temperament_summary: 'Highly intelligent, loyal, and protective — requires firm, consistent training.',
    key_care_differences: [],
  },

  {
    id: 'border_collie',
    name: 'Border Collie',
    group_id: 'shepherd_group',
    aliases: ['Collie', 'BC'],
    size_category: 'medium',
    avg_weight_kg: { min: 12, max: 20, typical: 16 },
    avg_weight_kg_fallback: 16,
    avg_litter_size: { min: 4, max: 8, typical: 6 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'border_collie',
    launch_phase: 2,
    available: true,
    emoji: '🐕‍🦺',
    thumbnail_color: '#27AE60',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['collie_eye_anomaly', 'hip_dysplasia', 'epilepsy', 'mdr1_mutation'],
    special_care_flags: ['mdr1-risk'],
    temperament_summary: 'Intensely intelligent, high drive, work-bred — needs constant mental stimulation.',
    key_care_differences: [
      'MDR1 mutation — avoid ivermectin, loperamide, and certain sedatives without vet clearance',
      'Huge mental and physical exercise needs from 8 weeks onward',
    ],
  },

  {
    id: 'australian_shepherd',
    name: 'Australian Shepherd',
    group_id: 'shepherd_group',
    aliases: ['Aussie', 'Aussie Shepherd', 'Mini Aussie'],
    size_category: 'medium',
    avg_weight_kg: { min: 18, max: 29, typical: 23 },
    avg_weight_kg_fallback: 23,
    avg_litter_size: { min: 5, max: 8, typical: 7 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'australian_shepherd',
    launch_phase: 2,
    available: true,
    emoji: '🐕‍🦺',
    thumbnail_color: '#16A085',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['collie_eye_anomaly', 'hip_dysplasia', 'mdr1_mutation', 'epilepsy', 'double_merle_deafness_blindness'],
    special_care_flags: ['mdr1-risk', 'double-merle-risk'],
    temperament_summary: 'Work-bred, loyal, and athletic — requires significant daily physical and mental work.',
    key_care_differences: [
      'NEVER breed merle × merle — produces blind and deaf "double merle" puppies',
      'MDR1 mutation common — screen before prescribing ivermectin or loperamide',
    ],
  },

  {
    id: 'doberman_pinscher',
    name: 'Doberman Pinscher',
    group_id: 'shepherd_group',
    aliases: ['Dobie', 'Doberman', 'Dobe'],
    size_category: 'large',
    avg_weight_kg: { min: 27, max: 45, typical: 36 },
    avg_weight_kg_fallback: 36,
    avg_litter_size: { min: 6, max: 10, typical: 8 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'doberman_pinscher',
    launch_phase: 2,
    available: true,
    emoji: '🐕‍🦺',
    thumbnail_color: '#34495E',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['dilated_cardiomyopathy', 'von_willebrands_disease', 'wobbler_syndrome', 'hip_dysplasia'],
    special_care_flags: ['vwd-risk'],
    temperament_summary: 'Loyal, intelligent, and protective — requires firm, experienced handling from a puppy.',
    key_care_differences: [
      'Von Willebrand\'s disease is common — screen before any surgery including spay/neuter',
      'Dilated cardiomyopathy risk — annual cardiac screening from age 3',
    ],
  },

  {
    id: 'german_shorthaired_pointer',
    name: 'German Shorthaired Pointer',
    group_id: 'shepherd_group',
    aliases: ['GSP', 'Shorthaired Pointer', 'Deutsch Kurzhaar'],
    size_category: 'medium',
    avg_weight_kg: { min: 20, max: 32, typical: 26 },
    avg_weight_kg_fallback: 26,
    avg_litter_size: { min: 7, max: 12, typical: 9 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'german_shorthaired_pointer',
    launch_phase: 2,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#7D6608',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'bloat_gdv', 'entropion', 'lymphedema', 'von_willebrands_disease'],
    special_care_flags: ['gdv-risk', 'large-litter'],
    temperament_summary: 'High-energy versatile hunting dog — athletic, intelligent, and bonded to their person.',
    key_care_differences: [
      'Deep-chested — bloat (GDV) risk, feed twice daily, no exercise 1 hour before/after meals',
      'Huge exercise needs from 8 weeks — mental and physical outlets are non-negotiable',
      'Large litters (7–12) common — rotation feeding likely needed',
    ],
  },

  {
    id: 'shetland_sheepdog',
    name: 'Shetland Sheepdog',
    group_id: 'shepherd_group',
    aliases: ['Sheltie', 'Shetland Collie', 'Dwarf Scotch Shepherd'],
    size_category: 'small',
    avg_weight_kg: { min: 6, max: 12, typical: 9 },
    avg_weight_kg_fallback: 9,
    avg_litter_size: { min: 2, max: 8, typical: 5 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'shetland_sheepdog',
    launch_phase: 2,
    available: true,
    emoji: '🐕‍🦺',
    thumbnail_color: '#A04000',
    hypoglycemia_risk: 'medium',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: true,
    singleton_prone: true,
    genetic_health_flags: ['mdr1_mutation', 'collie_eye_anomaly', 'dermatomyositis', 'hip_dysplasia', 'hypothyroidism'],
    special_care_flags: ['mdr1-risk'],
    temperament_summary: 'Intelligent, sensitive, and devoted — a miniature collie bred for sheep herding on Shetland.',
    key_care_differences: [
      'MDR1 mutation ~15% of breed — NEVER give ivermectin, loperamide, or common sedatives without vet clearance (see SHELTIE_MDR1_DRUG_CARD)',
      'Heavy double coat — regular brushing, never shave',
      'Vocal / barky — early socialisation with noises and visitors essential',
    ],
  },

  // ── TOY / SMALL COMPANION GROUP ──────────────────────────────────────────

  {
    id: 'chihuahua',
    name: 'Chihuahua',
    group_id: 'toy_group',
    aliases: ['Chi', 'Chiwawa'],
    size_category: 'toy',
    avg_weight_kg: { min: 1.5, max: 3.0, typical: 2.0 },
    avg_weight_kg_fallback: 2.0,
    avg_litter_size: { min: 1, max: 4, typical: 3 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'chihuahua',
    launch_phase: 2,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#9B59B6',
    hypoglycemia_risk: 'high',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['patellar_luxation', 'hydrocephalus', 'hypoglycemia', 'heart_disease', 'molera', 'atlantoaxial_instability'],
    special_care_flags: ['no-collar-ever'],
    temperament_summary: 'Bold and fiercely loyal; tiny but with a big personality.',
    key_care_differences: [
      'Highest hypoglycaemia risk of all breeds — feed every 90 minutes in Week 1',
      'Atlantoaxial instability + tracheal collapse — harness only, for life',
      'Up to 30% require C-section — plan elective surgery with vet',
    ],
  },

  {
    id: 'yorkshire_terrier',
    name: 'Yorkshire Terrier',
    group_id: 'toy_group',
    aliases: ['Yorkie', 'Yorkshire'],
    size_category: 'toy',
    avg_weight_kg: { min: 2.0, max: 3.2, typical: 2.5 },
    avg_weight_kg_fallback: 2.5,
    avg_litter_size: { min: 2, max: 5, typical: 3 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'yorkshire_terrier',
    launch_phase: 2,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#8E44AD',
    hypoglycemia_risk: 'high',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['patellar_luxation', 'tracheal_collapse', 'portosystemic_shunt', 'hypoglycemia', 'dental_disease'],
    special_care_flags: ['no-collar-ever'],
    temperament_summary: 'Bold, affectionate, and curious — a small terrier spirit in a tiny package.',
    key_care_differences: [
      'Feed every 90 minutes in Week 1 — hypoglycaemia risk',
      'Tracheal collapse risk — harness only, never collar',
    ],
  },

  {
    id: 'pomeranian',
    name: 'Pomeranian',
    group_id: 'toy_group',
    aliases: ['Pom', 'Spitz', 'Deutscher Spitz'],
    size_category: 'toy',
    avg_weight_kg: { min: 1.9, max: 3.5, typical: 2.7 },
    avg_weight_kg_fallback: 2.7,
    avg_litter_size: { min: 1, max: 4, typical: 3 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'pomeranian',
    launch_phase: 2,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#E67E22',
    hypoglycemia_risk: 'high',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['patellar_luxation', 'tracheal_collapse', 'black_skin_disease', 'dental_disease'],
    special_care_flags: ['no-collar-ever'],
    temperament_summary: 'Lively, bold, and curious — big personality in a tiny body.',
    key_care_differences: [
      'Feed every 90 minutes in Week 1 — hypoglycaemia risk',
      'Tracheal collapse common — harness only, never collar',
    ],
  },

  {
    id: 'maltese',
    name: 'Maltese',
    group_id: 'toy_group',
    aliases: ['Maltie'],
    size_category: 'toy',
    avg_weight_kg: { min: 1.4, max: 3.2, typical: 2.5 },
    avg_weight_kg_fallback: 2.5,
    avg_litter_size: { min: 2, max: 4, typical: 3 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'maltese',
    launch_phase: 2,
    available: true,
    emoji: '🐩',
    thumbnail_color: '#ECF0F1',
    hypoglycemia_risk: 'high',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['patellar_luxation', 'hypoglycemia', 'liver_shunt', 'heart_disease'],
    special_care_flags: ['no-collar-ever'],
    temperament_summary: 'Gentle, playful, and devoted — very sensitive to harsh handling.',
    key_care_differences: [
      'Feed every 90 minutes in Week 1 — hypoglycaemia risk',
      'Harness only — tracheal collapse risk',
    ],
  },

  {
    id: 'toy_poodle',
    name: 'Toy Poodle',
    group_id: 'toy_group',
    aliases: ['Toy Poo', 'Teacup Poodle'],
    size_category: 'toy',
    avg_weight_kg: { min: 2.0, max: 4.0, typical: 3.0 },
    avg_weight_kg_fallback: 3.0,
    avg_litter_size: { min: 1, max: 3, typical: 2 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'toy_poodle',
    launch_phase: 2,
    available: true,
    emoji: '🐩',
    thumbnail_color: '#BDC3C7',
    hypoglycemia_risk: 'high',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['patellar_luxation', 'pra_progressive_retinal_atrophy', 'epilepsy', 'legg_calve_perthes'],
    special_care_flags: ['no-collar-ever'],
    temperament_summary: 'Highly intelligent and lively — the most trainable of the toy breeds.',
    key_care_differences: [
      'Feed every 90 minutes in Week 1 — hypoglycaemia risk',
      'Tracheal collapse risk — harness only, for life',
    ],
  },

  {
    id: 'miniature_poodle',
    name: 'Miniature Poodle',
    group_id: 'toy_group',
    aliases: ['Mini Poodle', 'Miniature Poo'],
    size_category: 'small',
    avg_weight_kg: { min: 7, max: 8, typical: 7.5 },
    avg_weight_kg_fallback: 7.5,
    avg_litter_size: { min: 3, max: 7, typical: 5 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'miniature_poodle',
    launch_phase: 2,
    available: true,
    emoji: '🐩',
    thumbnail_color: '#95A5A6',
    hypoglycemia_risk: 'medium',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: ['pra_progressive_retinal_atrophy', 'epilepsy', 'patellar_luxation', 'legg_calve_perthes'],
    special_care_flags: ['no-collar-ever'],
    temperament_summary: 'Intelligent, lively, and eager to please — excellent family dog.',
    key_care_differences: [
      'Tracheal collapse less common than toys but still recommend harness',
    ],
  },

  {
    id: 'standard_poodle',
    name: 'Standard Poodle',
    group_id: 'shepherd_group',
    aliases: ['Standard Poo', 'Royal Poodle'],
    size_category: 'large',
    avg_weight_kg: { min: 18, max: 32, typical: 25 },
    avg_weight_kg_fallback: 25,
    avg_litter_size: { min: 4, max: 9, typical: 6 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'standard_poodle',
    launch_phase: 2,
    available: true,
    emoji: '🐩',
    thumbnail_color: '#7F8C8D',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'bloat', 'sebaceous_adenitis', 'addisons_disease', 'pra'],
    special_care_flags: ['gdv-risk'],
    temperament_summary: 'Highly intelligent, athletic, and elegant — one of the most trainable large breeds.',
    key_care_differences: [
      'Bloat (GDV) risk — feed twice daily, no exercise 1 hour before/after meals',
    ],
  },

  {
    id: 'bichon_frise',
    name: 'Bichon Frise',
    group_id: 'toy_group',
    aliases: ['Bichon', 'Bich'],
    size_category: 'small',
    avg_weight_kg: { min: 5, max: 8, typical: 6.5 },
    avg_weight_kg_fallback: 6.5,
    avg_litter_size: { min: 3, max: 6, typical: 5 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'bichon_frise',
    launch_phase: 2,
    available: true,
    emoji: '🐩',
    thumbnail_color: '#FDFEFE',
    hypoglycemia_risk: 'medium',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: ['patellar_luxation', 'hip_dysplasia', 'allergies', 'bladder_stones'],
    temperament_summary: 'Cheerful, playful, and affectionate — bred for companionship.',
    key_care_differences: [],
  },

  {
    id: 'cavalier_kcs',
    name: 'Cavalier King Charles Spaniel',
    group_id: 'toy_group',
    aliases: ['Cavalier', 'CKCS', 'King Charles'],
    size_category: 'small',
    avg_weight_kg: { min: 5.9, max: 8.2, typical: 7 },
    avg_weight_kg_fallback: 7,
    avg_litter_size: { min: 2, max: 6, typical: 4 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'cavalier_kcs',
    launch_phase: 2,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#D35400',
    hypoglycemia_risk: 'medium',
    flat_faced: true,  // mild brachycephalic
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: ['mitral_valve_disease', 'syringomyelia', 'chiari_malformation', 'hip_dysplasia'],
    special_care_flags: ['no-collar-ever'],
    temperament_summary: 'Gentle, affectionate, and eager to please — an ideal family companion.',
    key_care_differences: [
      'Mitral valve disease affects the majority by age 10 — annual cardiac auscultation from age 3',
      'Chiari-like malformation / syringomyelia is common — monitor for phantom scratching and pain',
    ],
  },

  {
    id: 'shih_tzu',
    name: 'Shih Tzu',
    group_id: 'toy_group',
    aliases: ['Shih-Tzu', 'Lion Dog', 'Chrysanthemum Dog'],
    size_category: 'small',
    avg_weight_kg: { min: 4.0, max: 7.3, typical: 5.5 },
    avg_weight_kg_fallback: 5.5,
    avg_litter_size: { min: 2, max: 6, typical: 4 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'shih_tzu',
    launch_phase: 2,
    available: true,
    emoji: '🐩',
    thumbnail_color: '#E91E63',
    hypoglycemia_risk: 'medium',
    flat_faced: true,  // brachycephalic
    double_coat: true,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: ['brachycephalic_syndrome', 'hip_dysplasia', 'patellar_luxation', 'eye_problems'],
    special_care_flags: ['no-collar-ever', 'heat-intolerant'],
    temperament_summary: 'Friendly, outgoing, and affectionate — bred purely for companionship.',
    key_care_differences: [
      'Brachycephalic — keep cool (under 24°C), no exercise in heat',
      'Harness only — airway restriction makes neck pressure dangerous',
    ],
  },

  {
    id: 'dachshund',
    name: 'Dachshund',
    group_id: 'toy_group',
    aliases: ['Doxie', 'Sausage Dog', 'Wiener Dog', 'Teckel'],
    size_category: 'small',
    avg_weight_kg: { min: 2.5, max: 15, typical: 9 },
    avg_weight_kg_fallback: 9,
    avg_litter_size: { min: 3, max: 8, typical: 5 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'dachshund',
    launch_phase: 2,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#A04000',
    hypoglycemia_risk: 'medium',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['ivdd_intervertebral_disc_disease', 'cddy_chondrodystrophy', 'patellar_luxation', 'pra'],
    special_care_flags: ['ivdd-risk', 'no-collar-ever'],
    temperament_summary: 'Bold, curious, and stubborn — bred for badger hunting with a huge terrier personality.',
    key_care_differences: [
      'IVDD (slipped disc) risk — 19–25% lifetime prevalence. NO jumping, ramps everywhere',
      'Harness only, for life — collar pressure accelerates spinal injury',
      'Keep lean — obesity is the single biggest IVDD trigger',
    ],
  },

  {
    id: 'pembroke_corgi',
    name: 'Pembroke Welsh Corgi',
    group_id: 'toy_group',
    aliases: ['Corgi', 'Pembroke', 'Welsh Corgi'],
    size_category: 'small',
    avg_weight_kg: { min: 10, max: 14, typical: 12 },
    avg_weight_kg_fallback: 12,
    avg_litter_size: { min: 4, max: 8, typical: 6 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'pembroke_corgi',
    launch_phase: 2,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#CA6F1E',
    hypoglycemia_risk: 'medium',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['ivdd_intervertebral_disc_disease', 'hip_dysplasia', 'degenerative_myelopathy', 'von_willebrands_disease'],
    special_care_flags: ['ivdd-risk', 'no-collar-ever', 'vwd-risk'],
    temperament_summary: 'Bold, intelligent, and affectionate — a working herder in a compact body.',
    key_care_differences: [
      'IVDD risk — avoid jumping, use ramps instead of stairs',
      'Harness only — reduces spinal strain',
      'Von Willebrand\'s disease screening recommended before surgery',
    ],
  },

  {
    id: 'miniature_schnauzer',
    name: 'Miniature Schnauzer',
    group_id: 'toy_group',
    aliases: ['Mini Schnauzer', 'Schnauzer', 'Zwergschnauzer'],
    size_category: 'small',
    avg_weight_kg: { min: 4.5, max: 8, typical: 6 },
    avg_weight_kg_fallback: 6,
    avg_litter_size: { min: 2, max: 8, typical: 5 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'miniature_schnauzer',
    launch_phase: 2,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#626567',
    hypoglycemia_risk: 'medium',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: true,
    singleton_prone: true,
    genetic_health_flags: ['hypertriglyceridemia', 'pancreatitis', 'urolithiasis', 'myotonia', 'diabetes'],
    temperament_summary: 'Spirited, alert, and intelligent — a terrier personality in a hypoallergenic coat.',
    key_care_differences: [
      'Hyperlipidaemia risk — low-fat diet from puppyhood reduces adult pancreatitis risk',
      'Urolithiasis (bladder stones) prone — fresh water always available, diet management from weaning',
    ],
  },

  {
    id: 'havanese',
    name: 'Havanese',
    group_id: 'toy_group',
    aliases: ['Havana Silk Dog', 'Bichon Havanais'],
    size_category: 'small',
    avg_weight_kg: { min: 3.2, max: 5.9, typical: 4.5 },
    avg_weight_kg_fallback: 4.5,
    avg_litter_size: { min: 1, max: 9, typical: 4 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'havanese',
    launch_phase: 2,
    available: true,
    emoji: '🐩',
    thumbnail_color: '#AAB7B8',
    hypoglycemia_risk: 'high',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['hip_dysplasia', 'cataracts', 'legg_calve_perthes', 'chondrodysplasia', 'patellar_luxation'],
    special_care_flags: ['no-collar-ever', 'ivdd-risk'],
    temperament_summary: 'Cheerful, affectionate, and people-oriented — the national dog of Cuba.',
    key_care_differences: [
      'Feed every 90 minutes in Week 1 — small body size + low birth weight (165–215g) = hypoglycaemia risk',
      'Chondrodysplasia risk — avoid jumping, harness only, no high-impact exercise',
      'Silky coat needs daily brushing from Week 5 to prevent matting',
    ],
  },

  {
    id: 'cockapoo',
    name: 'Cockapoo',
    group_id: 'toy_group',
    aliases: ['Cockerpoo', 'Cockapoodle', 'Cock-a-poo'],
    size_category: 'small',
    // Spans toy (2.5kg) to mini (11kg) variant — registry uses the full range
    // with a sensible typical value for default care calculations.
    avg_weight_kg: { min: 2.5, max: 11, typical: 6 },
    avg_weight_kg_fallback: 6,
    avg_litter_size: { min: 3, max: 8, typical: 5 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'cockapoo',
    launch_phase: 2,
    available: true,
    emoji: '🐩',
    thumbnail_color: '#B7950B',
    hypoglycemia_risk: 'medium',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['ear_infections_otitis', 'hip_dysplasia', 'pra_progressive_retinal_atrophy', 'allergies', 'luxating_patella'],
    special_care_flags: ['otitis-risk'],
    temperament_summary: 'Friendly, low-shedding designer cross (Cocker × Poodle) — popular for families with allergies.',
    key_care_differences: [
      'Floppy ears + wavy coat = high otitis externa risk — begin weekly ear cleaning from Week 5',
      'Coat type varies widely across litter — some puppies inherit Poodle\'s non-shed curl, others Cocker\'s wavy shed',
      'Size variation is significant — toy variant under 5kg, mini variant 5–11kg',
    ],
  },

  // ── BULLDOG / BRACHYCEPHALIC GROUP ───────────────────────────────────────

  {
    id: 'french_bulldog',
    name: 'French Bulldog',
    group_id: 'bulldog_group',
    aliases: ['Frenchie', 'French Bull', 'Bouledogue Français'],
    size_category: 'small',
    avg_weight_kg: { min: 8.0, max: 13.0, typical: 10.5 },
    avg_weight_kg_fallback: 10.5,
    avg_litter_size: { min: 2, max: 4, typical: 3 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'french_bulldog',
    launch_phase: 2,
    available: true,
    emoji: '🐶',
    thumbnail_color: '#E74C3C',
    hypoglycemia_risk: 'medium',
    flat_faced: true,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['brachycephalic_syndrome', 'hip_dysplasia', 'spine_problems', 'heat_sensitivity', 'hemivertebrae', 'ivdd'],
    special_care_flags: ['csection-likely', 'heat-intolerant'],
    temperament_summary: 'Playful and adaptable; flat face makes natural birth very risky — C-section almost always required.',
    key_care_differences: [
      '81% C-section rate — plan elective C-section at Day 61',
      'BOAS airway syndrome — keep ambient below 24°C, no exercise above 20°C',
      'Hemivertebrae common — harness only, no jumping',
    ],
  },

  {
    id: 'english_bulldog',
    name: 'English Bulldog',
    group_id: 'bulldog_group',
    aliases: ['British Bulldog', 'Bulldog'],
    size_category: 'medium',
    avg_weight_kg: { min: 18, max: 25, typical: 22 },
    avg_weight_kg_fallback: 22,
    avg_litter_size: { min: 3, max: 6, typical: 4 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'english_bulldog',
    launch_phase: 2,
    available: true,
    emoji: '🐶',
    thumbnail_color: '#C0392B',
    hypoglycemia_risk: 'medium',
    flat_faced: true,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: ['brachycephalic_syndrome', 'hip_dysplasia', 'heat_sensitivity', 'anasarca', 'cherry_eye', 'skin_fold_dermatitis'],
    special_care_flags: ['csection-likely', 'heat-intolerant'],
    temperament_summary: 'Calm, courageous, and friendly; the most severe brachycephalic — C-section essentially universal.',
    key_care_differences: [
      '86% C-section rate — elective surgery is standard of care',
      'Watch for anasarca ("walrus") puppies at birth — breed-specific neonatal emergency',
      'Heat intolerant — indoor temperature below 22°C mandatory',
      'Daily facial fold cleaning from Week 5 onward',
    ],
  },

  {
    id: 'boxer',
    name: 'Boxer',
    group_id: 'bulldog_group',
    aliases: ['German Boxer'],
    size_category: 'medium',
    avg_weight_kg: { min: 22, max: 36, typical: 28 },
    avg_weight_kg_fallback: 28,
    avg_litter_size: { min: 4, max: 8, typical: 6 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'boxer',
    launch_phase: 2,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#B9770E',
    hypoglycemia_risk: 'low',
    flat_faced: true,  // mild-moderate brachycephalic
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['boxer_cardiomyopathy', 'hip_dysplasia', 'cancer', 'brachycephalic_syndrome'],
    special_care_flags: ['heat-intolerant'],
    temperament_summary: 'Athletic, playful, and devoted; puppy-like well into adulthood.',
    key_care_differences: [
      'Brachycephalic — moderate heat intolerance',
      'Boxer cardiomyopathy (ARVC) — annual Holter from age 3',
    ],
  },

  {
    id: 'boston_terrier',
    name: 'Boston Terrier',
    group_id: 'bulldog_group',
    aliases: ['Boston', 'American Gentleman'],
    size_category: 'small',
    avg_weight_kg: { min: 4.5, max: 11.3, typical: 7 },
    avg_weight_kg_fallback: 7,
    avg_litter_size: { min: 1, max: 7, typical: 4 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'boston_terrier',
    launch_phase: 2,
    available: true,
    emoji: '🐶',
    thumbnail_color: '#2C3E50',
    hypoglycemia_risk: 'medium',
    flat_faced: true,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['brachycephalic_syndrome', 'patellar_luxation', 'cherry_eye', 'cataracts', 'hemivertebrae'],
    special_care_flags: ['csection-likely', 'heat-intolerant', 'no-collar-ever'],
    temperament_summary: 'Lively, bright, and affectionate — the "American Gentleman" in a tuxedo coat.',
    key_care_differences: [
      '92% C-section rate — the highest in Evans & Adams 2010; elective surgery is standard of care',
      'SEVERE brachycephalic — keep ambient below 22°C, no exercise above 20°C',
      'Harness only, for life — BOAS makes neck pressure dangerous',
      'Hemivertebrae common (like French Bulldog) — no jumping, ramps everywhere',
    ],
  },

  {
    id: 'pug',
    name: 'Pug',
    group_id: 'bulldog_group',
    aliases: ['Mops', 'Chinese Pug', 'Dutch Bulldog'],
    size_category: 'small',
    avg_weight_kg: { min: 5.5, max: 8.2, typical: 7 },
    avg_weight_kg_fallback: 7,
    avg_litter_size: { min: 1, max: 6, typical: 3 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'pug',
    launch_phase: 2,
    available: true,
    emoji: '🐶',
    thumbnail_color: '#B7950B',
    hypoglycemia_risk: 'high',
    flat_faced: true,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['brachycephalic_syndrome', 'pug_dog_encephalitis_pde', 'eye_prolapse', 'hemivertebrae', 'hip_dysplasia', 'skin_fold_dermatitis'],
    special_care_flags: ['csection-likely', 'heat-intolerant', 'no-collar-ever'],
    temperament_summary: 'Charming, mischievous, and loving — bred purely for companionship.',
    key_care_differences: [
      '27.3% C-section rate (Evans & Adams 2010) — plan surgical backup for every litter',
      'SEVERE brachycephalic — keep ambient below 22°C, heatstroke risk at ≥25°C',
      'Eye prolapse risk — protect face from trauma, never pull a pug by the head or leash-yank',
      'Pug Dog Encephalitis (PDE) is breed-specific and fatal — DNA test available',
      'Daily facial fold cleaning from Week 5 to prevent fungal / bacterial dermatitis',
    ],
  },

  // ── LARGE / GIANT GROUP ──────────────────────────────────────────────────

  {
    id: 'rottweiler',
    name: 'Rottweiler',
    group_id: 'large_group',
    aliases: ['Rottie', 'Rott'],
    size_category: 'large',
    avg_weight_kg: { min: 35, max: 60, typical: 48 },
    avg_weight_kg_fallback: 48,
    avg_litter_size: { min: 6, max: 12, typical: 9 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'rottweiler',
    launch_phase: 2,
    available: true,
    emoji: '🦮',
    thumbnail_color: '#1A252F',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'elbow_dysplasia', 'heart_disease', 'cancer', 'bloat'],
    special_care_flags: ['large-litter', 'gdv-risk'],
    temperament_summary: 'Confident and loyal; needs early socialisation and firm, experienced handling.',
    key_care_differences: [
      'Large litter rotation feeding from Day 0 — typical 8–10 puppies',
      'Bloat (GDV) risk as adult — feed twice daily, elevate bowl NO, no exercise 1hr post-meal',
    ],
  },

  {
    id: 'great_dane',
    name: 'Great Dane',
    group_id: 'large_group',
    aliases: ['Dane', 'Deutsche Dogge'],
    size_category: 'giant',
    avg_weight_kg: { min: 45, max: 90, typical: 65 },
    avg_weight_kg_fallback: 65,
    avg_litter_size: { min: 6, max: 15, typical: 8 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'great_dane',
    launch_phase: 2,
    available: true,
    emoji: '🦮',
    thumbnail_color: '#3498DB',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: ['bloat', 'dilated_cardiomyopathy', 'hip_dysplasia', 'wobbler_syndrome'],
    special_care_flags: ['large-litter', 'gdv-risk', 'giant-breed'],
    temperament_summary: 'Gentle giant — calm and friendly but needs careful management of rapid growth.',
    key_care_differences: [
      'Giant breed — slow controlled growth, low calcium puppy food, no forced exercise until 18 months',
      'Bloat (GDV) is the #1 killer — feed twice daily, gastropexy at spay/neuter strongly recommended',
    ],
  },

  {
    id: 'siberian_husky',
    name: 'Siberian Husky',
    group_id: 'large_group',
    aliases: ['Husky', 'Sibe'],
    size_category: 'medium',
    avg_weight_kg: { min: 16, max: 27, typical: 22 },
    avg_weight_kg_fallback: 22,
    avg_litter_size: { min: 4, max: 8, typical: 6 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'siberian_husky',
    launch_phase: 2,
    available: true,
    emoji: '🦮',
    thumbnail_color: '#5DADE2',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'juvenile_cataracts', 'progressive_retinal_atrophy', 'epilepsy'],
    temperament_summary: 'Athletic, independent, and vocal — bred for endurance work, cold-adapted.',
    key_care_differences: [
      'Heavy double coat — NEVER shave; blow-out in spring and fall',
      'High prey drive — secure fencing essential, not reliable off-leash',
    ],
  },

  {
    id: 'beagle',
    name: 'Beagle',
    group_id: 'large_group',
    aliases: ['Beags'],
    size_category: 'small',
    avg_weight_kg: { min: 9, max: 13.5, typical: 11 },
    avg_weight_kg_fallback: 11,
    avg_litter_size: { min: 4, max: 8, typical: 6 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'beagle',
    launch_phase: 2,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#D68910',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'epilepsy', 'hypothyroidism', 'intervertebral_disc_disease', 'obesity'],
    temperament_summary: 'Friendly, curious, and food-motivated — bred as a pack hound.',
    key_care_differences: [
      'Scent-driven — secure fencing and recall training essential',
      'Obesity-prone — strict meal portioning from puppyhood',
    ],
  },

  {
    id: 'cane_corso',
    name: 'Cane Corso',
    group_id: 'large_group',
    aliases: ['Italian Mastiff', 'Corso', 'Cane Corso Italiano'],
    size_category: 'large',
    avg_weight_kg: { min: 40, max: 60, typical: 50 },
    avg_weight_kg_fallback: 50,
    avg_litter_size: { min: 4, max: 12, typical: 8 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'cane_corso',
    launch_phase: 2,
    available: true,
    emoji: '🦮',
    thumbnail_color: '#212F3D',
    hypoglycemia_risk: 'low',
    flat_faced: true,  // MILD brachycephalic — see 'brachycephalic-mild' flag
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'elbow_dysplasia', 'bloat_gdv', 'entropion', 'eyelid_abnormalities', 'idiopathic_epilepsy'],
    special_care_flags: ['gdv-risk', 'large-litter', 'brachycephalic-mild'],
    temperament_summary: 'Confident, athletic, and protective Italian mastiff — requires experienced, firm handling.',
    key_care_differences: [
      'Mildly brachycephalic — anaesthetic caution (pre-oxygenation, propofol preferred) but NOT full C-section protocol',
      'Bloat (GDV) risk — feed twice daily, gastropexy at spay/neuter strongly recommended',
      'Large litters (typical 8) — rotation feeding from Day 1 for strong even weight gain',
      'Powerful working dog — socialisation window Weeks 3–12 is non-negotiable',
    ],
  },

  // ── MIXED BREED ───────────────────────────────────────────────────────────

  {
    id: 'mixed_breed',
    name: 'Mixed Breed / Not Sure',
    group_id: 'mixed',
    aliases: ['Mutt', 'Mixed', 'Crossbreed', 'Mongrel', 'Rescue', "Don't know"],
    size_category: 'medium',  // Default; overridden by weight input
    avg_weight_kg: { min: 5, max: 30, typical: 15 },
    avg_weight_kg_fallback: 15,
    avg_litter_size: { min: 4, max: 8, typical: 6 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'mixed_breed',
    launch_phase: 1,
    available: true,
    emoji: '🐕',
    thumbnail_color: '#95A5A6',
    hypoglycemia_risk: 'medium',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: [],
    temperament_summary: 'Varies by mix — we\'ll ask a few extra questions to personalise your care plan.',
    key_care_differences: [
      'We\'ll use general guidelines based on your dog\'s size',
      'If you know the likely breed mix, mention it in notes and we\'ll adjust',
    ],
  },

];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Validate a breed record has all required fields.
 * Throws a descriptive error if any are missing.
 * Call this when adding new breeds to catch mistakes at dev time.
 */
export function validateBreed(breed: Partial<Breed>): void {
  const required: (keyof Breed)[] = [
    'id', 'name', 'info_base_id', 'size_category',
    'hypoglycemia_risk', 'avg_weight_kg', 'avg_litter_size', 'gestation_days',
  ];
  const missing = required.filter(field => breed[field] === undefined || breed[field] === null);
  if (missing.length > 0) {
    throw new Error(
      `Breed "${breed.name ?? breed.id ?? 'unknown'}" is missing required fields: ${missing.join(', ')}. ` +
      `All breeds must have: ${required.join(', ')}.`
    );
  }
}

/** Returns only breeds available at launch */
export function getAvailableBreeds(): Breed[] {
  return BREEDS.filter(b => b.available);
}

/** Returns breeds grouped for the selection UI */
export function getBreedsByGroup(): Map<string, Breed[]> {
  const map = new Map<string, Breed[]>();
  BREEDS.forEach(breed => {
    if (!map.has(breed.group_id)) map.set(breed.group_id, []);
    map.get(breed.group_id)!.push(breed);
  });
  return map;
}

/** Full-text search across name and aliases */
export function searchBreeds(query: string): Breed[] {
  const q = query.toLowerCase().trim();
  if (!q) return getAvailableBreeds();
  return BREEDS.filter(b =>
    b.available && (
      b.name.toLowerCase().includes(q) ||
      b.aliases.some(a => a.toLowerCase().includes(q))
    )
  );
}

/** Get breed by ID */
export function getBreedById(id: string): Breed | undefined {
  return BREEDS.find(b => b.id === id);
}

/** Get fallback weight when user says "I don't know" */
export function getFallbackWeight(breedId: string): number {
  const breed = getBreedById(breedId);
  return breed?.avg_weight_kg_fallback ?? 15;
}

/** Resolve size category from actual weight (overrides breed default for mixed breeds) */
export function resolveSizeFromWeight(weight_kg: number): SizeCategory {
  if (weight_kg <= 4)   return 'toy';
  if (weight_kg <= 10)  return 'small';
  if (weight_kg <= 25)  return 'medium';
  if (weight_kg <= 45)  return 'large';
  return 'giant';
}
