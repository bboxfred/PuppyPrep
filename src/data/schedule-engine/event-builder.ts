/**
 * EVENT BUILDER
 * File: src/data/schedule-engine/event-builder.ts
 *
 * Takes a raw event template + an anchor date and produces a fully-formed
 * CalendarEvent with a real calendar date attached.
 *
 * This is the lowest-level building block. The schedule engine calls this
 * for every single event it generates.
 */

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type EventCategory =
  | 'health'
  | 'nutrition'
  | 'socialization'
  | 'training'
  | 'development'
  | 'environment';

export type EventPriority = 'critical' | 'high' | 'recommended';

export type RepeatPattern =
  | { type: 'none' }
  | { type: 'daily'; until_day_offset: number }
  | { type: 'every_n_hours'; hours: number; until_day_offset: number }
  | { type: 'weekly'; until_week_offset: number };

/**
 * Raw event template — what lives inside the infobase files.
 * Has day_offset instead of a real date.
 */
export interface EventTemplate {
  id_suffix: string;              // Unique within the breed's infobase e.g. 'deworm_day14'
  day_offset: number;             // Days from anchor. Negative = before birth (pregnancy).
  week_offset?: number;           // Alternative to day_offset for weekly events
  time_of_day?: string;           // 'morning' | 'evening' | 'immediately' | 'throughout'
  category: EventCategory;
  priority: EventPriority;
  title: string;
  description: string;            // Short — shown in calendar list view (2 lines max)
  detail: string;                 // Full instructions — shown on event detail screen
  is_free: boolean;               // true = visible in free tier
  repeating?: RepeatPattern;
  repeat_label?: string;          // e.g. 'ENS exercises — Day {n} of 14'
  call_vet_if?: string;           // Shown as red callout on event detail
  emergency_contact_recommended?: boolean;
  vet_action?: string;            // 'Book appointment' | 'Ask vet about X' etc.
  tags?: string[];
  applies_to_breed?: string;      // If set, only added for that specific breed_id
  condition_flag?: string;        // If set, only added when that flag is true on ScheduleInput
}

/**
 * Fully resolved CalendarEvent — has a real date and unique ID.
 * This is what gets stored in Supabase and displayed in the UI.
 */
export interface CalendarEvent {
  id: string;                     // '{breed_id}_{id_suffix}_{YYYYMMDD}'
  dog_id: string;                 // Links to the dog profile in Supabase
  title: string;
  date: Date;
  day_number: number;             // Days since birth (0 = birth day). Negative for pregnancy.
  category: EventCategory;
  priority: EventPriority;
  description: string;
  detail: string;
  is_free: boolean;
  is_repeating: boolean;
  repeat_pattern?: RepeatPattern;
  repeat_sequence?: {             // For labelled series like ENS "Day 3 of 14"
    current: number;
    total: number;
    label_template: string;
  };
  completed: boolean;
  completed_at?: Date;
  snoozed_until?: Date;
  call_vet_if?: string;
  emergency_contact_recommended: boolean;
  vet_action?: string;
  tags: string[];
  time_of_day?: string;
  // Metadata for UI
  category_color: string;         // Hex — from CATEGORY_COLORS map
  priority_badge_color: string;   // Hex — from PRIORITY_COLORS map
}

// ─────────────────────────────────────────────────────────────────────────────
// COLOR MAPS (used by UI to render event cards and calendar dots)
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  health:        '#E63946',  // Red
  nutrition:     '#F4A261',  // Amber
  socialization: '#457B9D',  // Blue
  training:      '#6A4C93',  // Purple
  development:   '#74C69D',  // Mint
  environment:   '#95A5A6',  // Grey
};

export const PRIORITY_COLORS: Record<EventPriority, string> = {
  critical:    '#E63946',  // Red
  high:        '#F4A261',  // Amber
  recommended: '#2D6A4F',  // Green
};

// ─────────────────────────────────────────────────────────────────────────────
// DATE UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Add N days to a date. Returns a new Date (does not mutate).
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  result.setHours(0, 0, 0, 0); // Normalise to midnight
  return result;
}

/**
 * Add N weeks to a date.
 */
export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, Math.round(weeks * 7));
}

/**
 * Calculate how many days between two dates.
 */
export function daysBetween(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((b.getTime() - a.getTime()) / msPerDay);
}

/**
 * Format a date as YYYYMMDD string (used in event IDs).
 */
export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

/**
 * Resolve a day_offset OR week_offset to a day_offset number.
 * week_offset takes priority if both are provided.
 */
export function resolveOffset(template: EventTemplate): number {
  if (template.week_offset !== undefined) {
    return Math.round(template.week_offset * 7);
  }
  return template.day_offset ?? 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE BUILDER FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build a single CalendarEvent from a template + anchor date.
 *
 * @param template   The raw event template from an infobase file
 * @param anchor     The birth date (or estimated due date for pregnancy events)
 * @param dog_id     The Supabase dog profile ID
 * @param breed_id   Used to namespace the event ID
 * @param overrides  Optional field overrides (e.g. custom title from breed variants)
 */
export function buildEvent(
  template: EventTemplate,
  anchor: Date,
  dog_id: string,
  breed_id: string,
  overrides: Partial<EventTemplate> = {}
): CalendarEvent {
  const merged = { ...template, ...overrides };
  const dayOffset = resolveOffset(merged);
  const eventDate = addDays(anchor, dayOffset);
  const dateStr = toDateString(eventDate);
  const rawSuffix = merged.id_suffix ?? `event_day${dayOffset}`;
  const idSuffix = rawSuffix.replace(/[^a-z0-9_]/gi, '_');

  return {
    id: `${breed_id}_${idSuffix}_${dateStr}`,
    dog_id,
    title: merged.title,
    date: eventDate,
    day_number: dayOffset,
    category: merged.category,
    priority: merged.priority,
    description: merged.description,
    detail: merged.detail,
    is_free: merged.is_free,
    is_repeating: merged.repeating ? merged.repeating.type !== 'none' : false,
    repeat_pattern: merged.repeating,
    completed: false,
    call_vet_if: merged.call_vet_if,
    emergency_contact_recommended: merged.emergency_contact_recommended ?? false,
    vet_action: merged.vet_action,
    tags: merged.tags ?? [],
    time_of_day: merged.time_of_day,
    category_color: CATEGORY_COLORS[merged.category],
    priority_badge_color: PRIORITY_COLORS[merged.priority],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// BATCH BUILDER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build multiple events from a list of templates.
 * Skips templates that have a condition_flag or applies_to_breed
 * that doesn't match — those are handled by conditions.ts.
 */
export function buildEvents(
  templates: EventTemplate[],
  anchor: Date,
  dog_id: string,
  breed_id: string
): CalendarEvent[] {
  if (!Array.isArray(templates)) return [];
  return templates
    .filter(t => t && !t.applies_to_breed && !t.condition_flag)
    .map(t => buildEvent(t, anchor, dog_id, breed_id));
}

// ─────────────────────────────────────────────────────────────────────────────
// DEDUPLICATION + SORT
// ─────────────────────────────────────────────────────────────────────────────

const PRIORITY_ORDER: Record<EventPriority, number> = {
  critical:    0,
  high:        1,
  recommended: 2,
};

const CATEGORY_ORDER: Record<EventCategory, number> = {
  health:        0,
  nutrition:     1,
  environment:   2,
  development:   3,
  socialization: 4,
  training:      5,
};

/**
 * Sort events by date ascending, then by priority, then by category.
 * Removes true duplicates (same id).
 */
/**
 * Normalise a title for duplicate-detection purposes only.
 * - Lowercase
 * - Strip emoji, punctuation, and common filler words ("today", "the", "a", "your")
 * - Collapse whitespace
 *
 * This catches pairs like:
 *   "Set up the whelping box" vs "Set up the whelping box"                → dupe
 *   "Assemble your whelping kit" vs "Assemble your whelping kit today"    → dupe
 *   "Do not leave her alone" vs "Do not leave her alone from today"       → dupe
 *   "🏥 Book vet: X-ray for puppy count" vs "X-ray to count puppies"      → NOT dupe
 *     (different enough wording — engine errs on the side of keeping both)
 */
const FILLER_WORDS = new Set([
  'the', 'a', 'an', 'your', 'today', 'from', 'to', 'of', 'for', 'in',
  'now', 'on', 'at', 'and', 'or', 'but', 'is', 'was', 'are', 'her', 'his',
]);
function normaliseTitleForDedupe(title: string): string {
  return title
    // Strip emoji / non-word characters
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 0 && !FILLER_WORDS.has(w))
    .sort()
    .join(' ');
}

export function sortAndDeduplicate(events: CalendarEvent[]): CalendarEvent[] {
  // PASS 1: dedupe by exact ID (catches event-generator bugs that produce
  // the same event twice).
  const seenId = new Set<string>();
  let unique = events.filter(e => {
    if (seenId.has(e.id)) return false;
    seenId.add(e.id);
    return true;
  });

  // PASS 2: dedupe by (date + normalised title). This catches the
  // case where two separate content sources (breed infobase + birthing-
  // guide, or two different conditional generators) both emit an event
  // for the same thing on the same day — a common content-migration bug.
  // Keep the FIRST occurrence; subsequent duplicates are dropped.
  const seenSignature = new Set<string>();
  unique = unique.filter(e => {
    const day = e.date.toISOString().slice(0, 10); // YYYY-MM-DD
    const sig = `${day}|${normaliseTitleForDedupe(e.title)}`;
    if (seenSignature.has(sig)) return false;
    seenSignature.add(sig);
    return true;
  });

  // Sort: date → priority → category
  return unique.sort((a, b) => {
    const dateDiff = a.date.getTime() - b.date.getTime();
    if (dateDiff !== 0) return dateDiff;

    const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (priorityDiff !== 0) return priorityDiff;

    return CATEGORY_ORDER[a.category] - CATEGORY_ORDER[b.category];
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// OVERRIDE HELPER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Apply breed-specific overrides to an existing CalendarEvent.
 * Used when a breed shares an info base but has minor differences
 * (e.g. Parson Russell Terrier vs Jack Russell Terrier).
 */
export function applyBreedOverride(
  event: CalendarEvent,
  overrides: Partial<CalendarEvent>
): CalendarEvent {
  return { ...event, ...overrides };
}
