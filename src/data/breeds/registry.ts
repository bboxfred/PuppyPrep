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
    available: false,
    emoji: '🐕',
    thumbnail_color: '#F1C40F',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'elbow_dysplasia', 'cancer', 'heart_disease'],
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
    available: false,
    emoji: '🐕',
    thumbnail_color: '#F39C12',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'elbow_dysplasia', 'obesity', 'exercise_induced_collapse'],
    temperament_summary: 'Friendly, outgoing, and highly trainable — one of the most popular family dogs.',
    key_care_differences: [],
  },

  // ── SHEPHERD GROUP (Phase 2 — Coming Soon) ───────────────────────────────

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
    available: false,
    emoji: '🐕‍🦺',
    thumbnail_color: '#2ECC71',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: true,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'elbow_dysplasia', 'degenerative_myelopathy', 'bloat'],
    temperament_summary: 'Highly intelligent, loyal, and protective — requires firm, consistent training.',
    key_care_differences: [],
  },

  // ── TOY GROUP (Phase 2 — Coming Soon) ─────────────────────────────────────

  {
    id: 'chihuahua',
    name: 'Chihuahua',
    group_id: 'toy_group',
    aliases: ['Chi', 'Chiwawa'],
    size_category: 'toy',
    avg_weight_kg: { min: 1.5, max: 3.0, typical: 2.0 },
    avg_weight_kg_fallback: 2.0,
    avg_litter_size: { min: 1, max: 3, typical: 2 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'chihuahua',
    launch_phase: 2,
    available: false,
    emoji: '🐕',
    thumbnail_color: '#9B59B6',
    hypoglycemia_risk: 'high',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['patellar_luxation', 'hydrocephalus', 'hypoglycemia', 'heart_disease', 'molera'],
    temperament_summary: 'Bold and fiercely loyal; tiny but with a big personality.',
    key_care_differences: [],
  },

  {
    id: 'shih_tzu',
    name: 'Shih Tzu',
    group_id: 'toy_group',
    aliases: ['Shih-Tzu', 'Lion Dog', 'Chrysanthemum Dog'],
    size_category: 'toy',
    avg_weight_kg: { min: 4.0, max: 7.3, typical: 5.5 },
    avg_weight_kg_fallback: 5.5,
    avg_litter_size: { min: 2, max: 5, typical: 3 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'shih_tzu',
    launch_phase: 2,
    available: false,
    emoji: '🐩',
    thumbnail_color: '#E91E63',
    hypoglycemia_risk: 'high',
    flat_faced: true,
    double_coat: true,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['brachycephalic_syndrome', 'hip_dysplasia', 'patellar_luxation', 'eye_problems'],
    temperament_summary: 'Friendly, outgoing, and affectionate — bred purely for companionship.',
    key_care_differences: [],
  },

  {
    id: 'maltese',
    name: 'Maltese',
    group_id: 'toy_group',
    aliases: ['Maltie'],
    size_category: 'toy',
    avg_weight_kg: { min: 1.8, max: 3.2, typical: 2.5 },
    avg_weight_kg_fallback: 2.5,
    avg_litter_size: { min: 1, max: 4, typical: 3 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'maltese',
    launch_phase: 2,
    available: false,
    emoji: '🐩',
    thumbnail_color: '#ECF0F1',
    hypoglycemia_risk: 'high',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['patellar_luxation', 'hypoglycemia', 'liver_shunt', 'heart_disease'],
    temperament_summary: 'Gentle, playful, and devoted — very sensitive to harsh handling.',
    key_care_differences: [],
  },

  // ── BULLDOG GROUP (Phase 2 — Coming Soon) ─────────────────────────────────

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
    available: false,
    emoji: '🐶',
    thumbnail_color: '#E74C3C',
    hypoglycemia_risk: 'medium',
    flat_faced: true,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: true,
    genetic_health_flags: ['brachycephalic_syndrome', 'hip_dysplasia', 'spine_problems', 'heat_sensitivity'],
    temperament_summary: 'Playful and adaptable; flat face makes natural birth very risky — C-section almost always required.',
    key_care_differences: [],
  },

  // ── LARGE GROUP (Phase 3 — Coming Soon) ───────────────────────────────────

  {
    id: 'rottweiler',
    name: 'Rottweiler',
    group_id: 'large_group',
    aliases: ['Rottie', 'Rott'],
    size_category: 'large',
    avg_weight_kg: { min: 35, max: 60, typical: 48 },
    avg_weight_kg_fallback: 48,
    avg_litter_size: { min: 6, max: 12, typical: 8 },
    gestation_days: { min: 58, max: 68, typical: 63 },
    info_base_id: 'rottweiler',
    launch_phase: 3,
    available: false,
    emoji: '🦮',
    thumbnail_color: '#1A252F',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: true,
    singleton_prone: false,
    genetic_health_flags: ['hip_dysplasia', 'elbow_dysplasia', 'heart_disease', 'cancer'],
    temperament_summary: 'Confident and loyal; needs early socialisation and firm, experienced handling.',
    key_care_differences: [],
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
    launch_phase: 3,
    available: false,
    emoji: '🦮',
    thumbnail_color: '#3498DB',
    hypoglycemia_risk: 'low',
    flat_faced: false,
    double_coat: false,
    high_prey_drive: false,
    singleton_prone: false,
    genetic_health_flags: ['bloat', 'dilated_cardiomyopathy', 'hip_dysplasia', 'wobbler_syndrome'],
    temperament_summary: 'Gentle giant — calm and friendly but needs careful management of rapid growth.',
    key_care_differences: [],
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
