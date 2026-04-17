/**
 * BREED-SPECIFIC WEIGHT TARGETS
 *
 * Sourced DIRECTLY from each breed's infobase profile.
 * These are veterinary reference ranges — do not approximate or guess.
 *
 * Used by the puppy weight tracker to show recommended weight ranges
 * based on the puppy's age and breed.
 */

export interface WeightMilestone {
  dayAge: number;      // Day since birth this milestone applies from
  label: string;       // Human-readable label
  min: number;         // Minimum healthy weight in grams
  max: number;         // Maximum expected weight in grams
  typical: number;     // Typical/average weight in grams
}

// ─────────────────────────────────────────────────────────────────────────────
// BREED WEIGHT TABLES — exact values from infobase files
// ─────────────────────────────────────────────────────────────────────────────

const JRT_TARGETS: WeightMilestone[] = [
  { dayAge: 0,  label: 'Birth',   min: 180, max: 220, typical: 200 },
  { dayAge: 7,  label: 'Day 7',   min: 280, max: 380, typical: 330 },
  { dayAge: 14, label: 'Day 14',  min: 360, max: 440, typical: 400 },
  { dayAge: 21, label: 'Week 3',  min: 540, max: 660, typical: 600 },
  { dayAge: 28, label: 'Week 4',  min: 450, max: 680, typical: 560 },
  { dayAge: 42, label: 'Week 6',  min: 900, max: 1400, typical: 1150 },
  { dayAge: 56, label: 'Week 8',  min: 1350, max: 1800, typical: 1550 },
];

const FOX_TERRIER_TARGETS: WeightMilestone[] = [
  { dayAge: 0,  label: 'Birth',   min: 200, max: 260, typical: 230 },
  { dayAge: 7,  label: 'Day 7',   min: 310, max: 420, typical: 365 },
  { dayAge: 14, label: 'Day 14',  min: 400, max: 520, typical: 460 },
  { dayAge: 21, label: 'Week 3',  min: 600, max: 780, typical: 690 },
  { dayAge: 28, label: 'Week 4',  min: 520, max: 780, typical: 650 },
  { dayAge: 42, label: 'Week 6',  min: 1050, max: 1550, typical: 1300 },
  { dayAge: 56, label: 'Week 8',  min: 1600, max: 2100, typical: 1850 },
];

const BORDER_TERRIER_TARGETS: WeightMilestone[] = [
  { dayAge: 0,  label: 'Birth',   min: 190, max: 250, typical: 220 },
  { dayAge: 7,  label: 'Day 7',   min: 300, max: 400, typical: 350 },
  { dayAge: 14, label: 'Day 14',  min: 380, max: 500, typical: 440 },
  { dayAge: 21, label: 'Week 3',  min: 570, max: 750, typical: 660 },
  { dayAge: 42, label: 'Week 6',  min: 1000, max: 1450, typical: 1225 },
  { dayAge: 56, label: 'Week 8',  min: 1500, max: 2000, typical: 1750 },
];

const MIN_PIN_TARGETS: WeightMilestone[] = [
  { dayAge: 0,  label: 'Birth',   min: 100, max: 160, typical: 130 },
  { dayAge: 7,  label: 'Day 7',   min: 160, max: 240, typical: 200 },
  { dayAge: 14, label: 'Day 14',  min: 200, max: 320, typical: 260 },
  { dayAge: 21, label: 'Week 3',  min: 300, max: 480, typical: 390 },
  { dayAge: 42, label: 'Week 6',  min: 600, max: 900, typical: 750 },
  { dayAge: 56, label: 'Week 8',  min: 900, max: 1300, typical: 1100 },
];

// Rat Terrier — miniature variety (no weight_targets in infobase, derived from newborn_weight + breed profile)
const RAT_TERRIER_MINI_TARGETS: WeightMilestone[] = [
  { dayAge: 0,  label: 'Birth',   min: 100, max: 180, typical: 140 },
  { dayAge: 7,  label: 'Day 7',   min: 160, max: 280, typical: 220 },
  { dayAge: 14, label: 'Day 14',  min: 200, max: 360, typical: 280 },
  { dayAge: 21, label: 'Week 3',  min: 300, max: 540, typical: 420 },
  { dayAge: 42, label: 'Week 6',  min: 600, max: 1100, typical: 850 },
  { dayAge: 56, label: 'Week 8',  min: 900, max: 1500, typical: 1200 },
];

// Rat Terrier — standard variety
const RAT_TERRIER_STD_TARGETS: WeightMilestone[] = [
  { dayAge: 0,  label: 'Birth',   min: 180, max: 280, typical: 230 },
  { dayAge: 7,  label: 'Day 7',   min: 290, max: 440, typical: 365 },
  { dayAge: 14, label: 'Day 14',  min: 360, max: 560, typical: 460 },
  { dayAge: 21, label: 'Week 3',  min: 540, max: 840, typical: 690 },
  { dayAge: 42, label: 'Week 6',  min: 1000, max: 1800, typical: 1400 },
  { dayAge: 56, label: 'Week 8',  min: 1400, max: 2500, typical: 1950 },
];

const MIXED_BREED_TARGETS: WeightMilestone[] = [
  { dayAge: 0,  label: 'Birth',   min: 150, max: 350, typical: 250 },
  { dayAge: 7,  label: 'Day 7',   min: 250, max: 500, typical: 375 },
  { dayAge: 14, label: 'Day 14',  min: 350, max: 700, typical: 500 },
  { dayAge: 21, label: 'Week 3',  min: 500, max: 1050, typical: 750 },
  { dayAge: 42, label: 'Week 6',  min: 900, max: 2500, typical: 1500 },
  { dayAge: 56, label: 'Week 8',  min: 1300, max: 3500, typical: 2200 },
];

// ─────────────────────────────────────────────────────────────────────────────
// BREED → TARGETS MAP
// ─────────────────────────────────────────────────────────────────────────────

const BREED_TARGETS: Record<string, WeightMilestone[]> = {
  // JRT group — all use JRT targets (same info_base_id)
  jack_russell_terrier: JRT_TARGETS,
  parson_russell_terrier: JRT_TARGETS,
  russell_terrier: JRT_TARGETS,

  // Fox Terrier group
  smooth_fox_terrier: FOX_TERRIER_TARGETS,
  wire_fox_terrier: FOX_TERRIER_TARGETS,

  // Individual breeds
  border_terrier: BORDER_TERRIER_TARGETS,
  miniature_pinscher: MIN_PIN_TARGETS,

  // Rat Terrier — variety-specific
  rat_terrier_miniature: RAT_TERRIER_MINI_TARGETS,
  rat_terrier_standard: RAT_TERRIER_STD_TARGETS,
  rat_terrier: RAT_TERRIER_STD_TARGETS, // Default to standard if variety unknown

  // Mixed / fallback
  mixed_breed: MIXED_BREED_TARGETS,
};

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the recommended weight range for a puppy at a given age.
 *
 * @param dayAge — days since birth
 * @param breedId — breed_id from registry (e.g. 'jack_russell_terrier')
 * @param ratTerrierVariety — 'miniature' | 'standard' (only for rat_terrier)
 * @returns the milestone bracket this age falls into, or null
 */
export function getBreedWeightTarget(
  dayAge: number,
  breedId: string | null,
  ratTerrierVariety?: 'miniature' | 'standard' | null,
): WeightMilestone | null {
  // Resolve breed key
  let key = breedId ?? 'mixed_breed';
  if (key === 'rat_terrier' && ratTerrierVariety) {
    key = `rat_terrier_${ratTerrierVariety}`;
  }

  const targets = BREED_TARGETS[key] ?? MIXED_BREED_TARGETS;

  // Find the bracket: pick the highest milestone that the puppy has reached
  let best: WeightMilestone | null = null;
  for (const milestone of targets) {
    if (dayAge >= milestone.dayAge) {
      best = milestone;
    }
  }

  // Interpolate between milestones for more accuracy
  if (best && dayAge > best.dayAge) {
    const nextIdx = targets.indexOf(best) + 1;
    if (nextIdx < targets.length) {
      const next = targets[nextIdx];
      const progress = (dayAge - best.dayAge) / (next.dayAge - best.dayAge);
      return {
        dayAge,
        label: `Day ${dayAge}`,
        min: Math.round(best.min + (next.min - best.min) * progress),
        max: Math.round(best.max + (next.max - best.max) * progress),
        typical: Math.round(best.typical + (next.typical - best.typical) * progress),
      };
    }
  }

  return best;
}

/**
 * Evaluate a puppy's weight against breed-specific targets.
 * Returns a status and descriptive message.
 */
export type WeightStatus = 'very_good' | 'good' | 'slightly_underweight' | 'very_underweight' | 'slightly_overweight' | 'very_overweight';

export function evaluateWeight(
  currentWeightG: number,
  dayAge: number,
  breedId: string | null,
  ratTerrierVariety?: 'miniature' | 'standard' | null,
): { status: WeightStatus; target: WeightMilestone | null; label: string } {
  const target = getBreedWeightTarget(dayAge, breedId, ratTerrierVariety);
  if (!target) return { status: 'good', target: null, label: 'Good weight' };

  const ratio = currentWeightG / target.typical;

  // Very underweight: below 85% of minimum
  if (currentWeightG < target.min * 0.85) {
    return { status: 'very_underweight', target, label: 'Very underweight' };
  }
  // Slightly underweight: below minimum but not critical
  if (currentWeightG < target.min) {
    return { status: 'slightly_underweight', target, label: 'Slightly underweight' };
  }
  // Very overweight: more than 15% above maximum
  if (currentWeightG > target.max * 1.15) {
    return { status: 'very_overweight', target, label: 'Very overweight' };
  }
  // Slightly overweight: above maximum
  if (currentWeightG > target.max) {
    return { status: 'slightly_overweight', target, label: 'Slightly overweight' };
  }
  // Within range — check if near typical for "very good" vs "good"
  if (ratio >= 0.9 && ratio <= 1.1) {
    return { status: 'very_good', target, label: 'Very good weight!' };
  }
  return { status: 'good', target, label: 'Good weight' };
}
