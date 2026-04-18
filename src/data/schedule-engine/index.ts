/**
 * SCHEDULE ENGINE — MAIN ORCHESTRATOR
 * File: src/data/schedule-engine/index.ts
 *
 * This is the heart of PuppyCare Compass.
 * It takes the user's 12 onboarding answers and returns a complete,
 * personalised CalendarEvent[] covering pregnancy through 8 weeks.
 *
 * HOW TO USE:
 *   import { generateSchedule } from './schedule-engine';
 *   const events = await generateSchedule(scheduleInput);
 *   // Save events to Supabase, schedule notifications, render calendar
 *
 * BUILD ORDER:
 *   1. Resolve anchor date and feeding frequency
 *   2. Load the correct infobase for the breed
 *   3. Build base events from the infobase templates
 *   4. Expand repeating events
 *   5. Run all conditional checks (breed-specific + situation-specific)
 *   6. Merge, deduplicate, sort
 *   7. Apply free/paid tier gating
 *   8. Return the final array
 */

import {
  CalendarEvent,
  buildEvent,
  buildEvents,
  sortAndDeduplicate,
  addDays,
  addWeeks,
  toDateString,
  EventTemplate,
} from './event-builder';

import {
  UNIVERSAL_REPEATING_GROUPS,
  ENS_REPEATING_GROUP,
  PREGNANCY_TEMP_MONITORING,
  expandRepeatingGroup,
  expandFeedingReminders,
  expandSocializationWeeks,
} from './repeating-events';

import {
  ScheduleInput,
  runAllConditions,
} from './conditions';

import {
  WHELPING_CALENDAR_EVENTS,
  type CalendarEventTemplate as BirthingEventTemplate,
} from '../infobase/birthing-guide';

// ─────────────────────────────────────────────────────────────────────────────
// INFOBASE LOADER
// Dynamically imports the correct infobase file for the breed.
// ISOLATION RULE: Only one infobase is ever loaded per schedule generation.
// ─────────────────────────────────────────────────────────────────────────────

async function loadInfobase(info_base_id: string): Promise<any> {
  switch (info_base_id) {
    case 'jrt':
      return await import('../infobase/jrt');
    case 'fox_terrier':
      return await import('../infobase/fox_terrier');
    case 'rat_terrier':
      return await import('../infobase/rat_terrier');
    case 'border_terrier':
      return await import('../infobase/border_terrier');
    case 'miniature_pinscher':
      return await import('../infobase/miniature_pinscher');
    case 'mixed_breed':
      return await import('../infobase/mixed_breed');
    default:
      console.warn(`WARNING: No infobase found for "${info_base_id}" — falling back to mixed_breed. Add this breed to loadInfobase() in schedule-engine/index.ts.`);
      return await import('../infobase/mixed_breed');
  }
}

/**
 * Validate that a loaded infobase has the minimum required exports.
 * Warns in console if anything is missing — does not throw.
 */
function validateInfobase(infobase: any, breedName: string): void {
  const missing: string[] = [];

  // Must have a health schedule with deworming + vaccinations
  const healthSchedule =
    infobase.JRT_HEALTH_SCHEDULE ?? infobase.FOX_TERRIER_HEALTH_SCHEDULE ??
    infobase.RAT_TERRIER_HEALTH_SCHEDULE ?? infobase.BORDER_TERRIER_HEALTH_SCHEDULE ??
    infobase.MIN_PIN_HEALTH_SCHEDULE ?? infobase.MIXED_BREED_HEALTH_SCHEDULE;

  if (!healthSchedule) missing.push('health schedule (deworming + vaccinations)');
  else {
    if (!healthSchedule.deworming?.length) missing.push('deworming schedule');
    if (!healthSchedule.vaccinations?.length) missing.push('vaccination schedule');
  }

  // Must have a breed profile with formula volumes
  const profile =
    infobase.JRT_PROFILE ?? infobase.FOX_TERRIER_PROFILE ??
    infobase.RAT_TERRIER_PROFILE ?? infobase.BORDER_TERRIER_PROFILE ??
    infobase.MIN_PIN_PROFILE ?? infobase.MIXED_BREED_PROFILE;

  if (!profile) missing.push('breed profile');
  else {
    if (!profile.formula_volumes_per_feeding_ml) missing.push('formula volumes in breed profile');
    if (profile.tube_size_french === undefined) missing.push('tube size in breed profile');
  }

  if (missing.length > 0) {
    console.warn(`WARNING: Infobase for "${breedName}" is missing: ${missing.join(', ')}. Care information may be incomplete.`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ANCHOR DATE RESOLVER
// Every event date is calculated relative to one anchor date.
// ─────────────────────────────────────────────────────────────────────────────

function resolveAnchorDate(input: Omit<ScheduleInput, 'anchor_date' | 'feeding_frequency_hours' | 'hypoglycemia_risk'>): Date {
  if (input.status === 'born' && input.birth_date) {
    const d = new Date(input.birth_date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  if (input.estimated_due_date) {
    const d = new Date(input.estimated_due_date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  if (input.mating_date) {
    const d = addDays(new Date(input.mating_date), 63);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  // Should never reach here — enforced by onboarding validation
  throw new Error('[ScheduleEngine] Cannot resolve anchor date: no birth_date, estimated_due_date, or mating_date provided.');
}

// ─────────────────────────────────────────────────────────────────────────────
// FEEDING FREQUENCY RESOLVER
// Returns the correct interval (hours) per week based on breed risk level
// ─────────────────────────────────────────────────────────────────────────────

function resolveFeedingFrequency(
  is_min_pin: boolean,
  is_miniature_rat_terrier: boolean
): { week_1: number; week_2: number; week_3: number; week_4: number } {
  // Min Pins and miniature Rat Terriers need more frequent feedings
  if (is_min_pin || is_miniature_rat_terrier) {
    return { week_1: 1.5, week_2: 2, week_3: 2.5, week_4: 3 };
  }
  // Standard for all other JRT-group breeds
  return { week_1: 2, week_2: 2.5, week_3: 3, week_4: 4 };
}

// ─────────────────────────────────────────────────────────────────────────────
// DEWORMING EVENT BUILDER
// Builds the 4 deworming events from the infobase schedule
// ─────────────────────────────────────────────────────────────────────────────

function buildDewormingEvents(
  dewormingSchedule: any[],
  anchor: Date,
  dog_id: string,
  breed_id: string
): CalendarEvent[] {
  return dewormingSchedule.map(d => {
    const eventDate = addDays(anchor, d.day);
    const dateStr = toDateString(eventDate);

    return {
      id: `${breed_id}_deworm_day${d.day}_${dateStr}`,
      dog_id,
      title: `🚨 DEWORMING — ${d.label ?? `Day ${d.day}`}`,
      date: eventDate,
      day_number: d.day,
      category: 'health' as const,
      priority: 'critical' as const,
      description: `Give worm treatment today. Do not skip or delay. Next dose: Day ${d.day + 14}.`,
      detail: d.plain_english,
      is_free: d.day === 14, // First deworming is free tier visible
      is_repeating: false,
      completed: false,
      emergency_contact_recommended: false,
      call_vet_if: 'Puppy vomits within 2 hours of the dose, or you are unsure of the correct product or dose',
      tags: ['deworming', `day_${d.day}`, 'health', d.drug?.toLowerCase().replace(/\s/g, '_') ?? 'dewormer'],
      category_color: '#E63946',
      priority_badge_color: '#E63946',
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// VACCINATION EVENT BUILDER
// ─────────────────────────────────────────────────────────────────────────────

function buildVaccinationEvents(
  vaccinationSchedule: any[],
  anchor: Date,
  dog_id: string,
  breed_id: string
): CalendarEvent[] {
  return vaccinationSchedule.map(v => {
    const eventDate = addWeeks(anchor, v.week);
    const dateStr = toDateString(eventDate);
    const covers = Array.isArray(v.covers)
      ? v.covers.join(', ')
      : 'core puppy diseases';

    return {
      id: `${breed_id}_vaccine_week${v.week}_${dateStr}`,
      dog_id,
      title: `💉 Vet: ${v.label ?? v.vaccine} vaccination`,
      date: eventDate,
      day_number: v.week * 7,
      category: 'health' as const,
      priority: 'critical' as const,
      description: `Book your vet appointment for ${v.vaccine}. Covers: ${covers}.`,
      detail: `${v.plain_english ?? ''}\n\n**What to bring:** Health record card, list of any concerns since the last visit.\n\n**After vaccination:** Monitor for 30 minutes in the car park before driving home. Mild lethargy or reduced appetite for 24 hours is normal. Call the vet if the puppy has a swollen face, difficulty breathing, or collapses.`,
      is_free: v.week === 6, // First vaccine reminder is free
      is_repeating: false,
      completed: false,
      emergency_contact_recommended: false,
      vet_action: `Book ${v.vaccine} vaccination appointment`,
      call_vet_if: 'Puppy has facial swelling, difficulty breathing, or collapse after vaccination — this is a rare but serious allergic reaction',
      tags: ['vaccination', `week_${v.week}`, 'vet', v.vaccine?.toLowerCase().replace(/[^a-z0-9]/g, '_') ?? 'vaccine'],
      category_color: '#E63946',
      priority_badge_color: '#E63946',
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// VET VISIT EVENT BUILDER
// ─────────────────────────────────────────────────────────────────────────────

function buildVetVisitEvents(
  vetVisits: any[],
  anchor: Date,
  dog_id: string,
  breed_id: string
): CalendarEvent[] {
  return vetVisits.map(v => {
    const dayOffset = v.day ?? (v.week ? v.week * 7 : 0);
    const eventDate = addDays(anchor, dayOffset);
    const dateStr = toDateString(eventDate);

    return {
      id: `${breed_id}_vet_${v.label?.replace(/\s/g, '_').toLowerCase() ?? dayOffset}_${dateStr}`,
      dog_id,
      title: `🏥 Vet visit: ${v.label}`,
      date: eventDate,
      day_number: dayOffset,
      category: 'health' as const,
      priority: v.critical ? 'critical' as const : 'high' as const,
      description: (v.plain_english ? v.plain_english.slice(0, 120) + '...' : 'Scheduled vet visit.'),
      detail: v.plain_english ?? '',
      is_free: dayOffset <= 7, // Day 0–7 vet visits are free tier
      is_repeating: false,
      completed: false,
      emergency_contact_recommended: false,
      vet_action: `Schedule: ${v.label}`,
      tags: ['vet_visit', `day_${dayOffset}`, v.urgency ?? 'scheduled'],
      category_color: '#E63946',
      priority_badge_color: v.critical ? '#E63946' : '#F4A261',
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY EVENT BUILDER
// Only added when status = 'pregnant'
// ─────────────────────────────────────────────────────────────────────────────

function buildPregnancyEvents(
  pregnancyTemplates: EventTemplate[],
  anchor: Date,
  dog_id: string,
  breed_id: string,
  vet_confirmed: 'ultrasound' | 'exam_only' | 'not_yet' = 'not_yet',
): CalendarEvent[] {
  // Filter to negative day offsets (before birth) only
  const prebirthTemplates = pregnancyTemplates.filter(t => {
    const offset = t.week_offset !== undefined
      ? Math.round(t.week_offset * 7)
      : (t.day_offset ?? 0);
    if (offset > 0) return false;

    // Skip "Book vet pregnancy confirmation" if a vet has already
    // confirmed via ultrasound or an exam — the reminder is redundant.
    if (vet_confirmed !== 'not_yet' && /book vet pregnancy confirmation/i.test(t.title ?? '')) {
      return false;
    }

    return true;
  });

  return buildEvents(prebirthTemplates, anchor, dog_id, breed_id);
}

// ─────────────────────────────────────────────────────────────────────────────
// BIRTHING GUIDE EVENT BUILDER
// Converts birthing-guide.ts CalendarEventTemplates into CalendarEvents.
// These are universal (all breeds) and cover Days -18 to 0 before due date.
// ─────────────────────────────────────────────────────────────────────────────

function buildBirthingGuideEvents(
  anchor: Date,
  dog_id: string,
  breed_id: string
): CalendarEvent[] {
  return WHELPING_CALENDAR_EVENTS.map(template => {
    const eventDate = addDays(anchor, template.day_offset);
    const dateStr = toDateString(eventDate);

    return {
      id: `birthing_guide_${template.id_suffix}_${dateStr}`,
      dog_id,
      title: template.title,
      date: eventDate,
      day_number: template.day_offset,
      category: template.category as CalendarEvent['category'],
      priority: template.priority as CalendarEvent['priority'],
      description: template.description,
      detail: template.detail,
      is_free: template.is_free,
      is_repeating: false,
      completed: false,
      call_vet_if: template.call_vet_if,
      emergency_contact_recommended: template.emergency_contact_recommended ?? false,
      tags: ['birthing_guide', `day_${template.day_offset}`, template.category],
      category_color: template.category === 'health' ? '#D4726A'
        : template.category === 'environment' ? '#E8A87C'
        : '#5BA3A4',
      priority_badge_color: template.priority === 'critical' ? '#D4726A'
        : template.priority === 'high' ? '#D4A84B'
        : '#3D8B8C',
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// POSTNATAL EVENT BUILDER
// Builds Day 0 through Week 8 events from infobase templates
// ─────────────────────────────────────────────────────────────────────────────

function buildPostnatalEvents(
  neonatalTemplates: EventTemplate[],
  transitionalTemplates: EventTemplate[],
  nutritionTemplates: EventTemplate[],
  trainingTemplates: EventTemplate[],
  anchor: Date,
  dog_id: string,
  breed_id: string
): CalendarEvent[] {
  const all: CalendarEvent[] = [
    ...buildEvents(neonatalTemplates, anchor, dog_id, breed_id),
    ...buildEvents(transitionalTemplates, anchor, dog_id, breed_id),
    ...buildEvents(nutritionTemplates, anchor, dog_id, breed_id),
    ...buildEvents(trainingTemplates, anchor, dog_id, breed_id),
  ];

  return all;
}

// ─────────────────────────────────────────────────────────────────────────────
// FREE TIER GATING
// Events are marked is_free = true/false.
// The UI filters based on subscription status.
// Engine marks consistently:
//   - All Day 0–7 health events = free
//   - All CRITICAL events in Days 0–7 = free
//   - Emergency guide always = free
//   - Everything else = paid
// ─────────────────────────────────────────────────────────────────────────────

function applyFreeTierGating(events: CalendarEvent[]): CalendarEvent[] {
  return events.map(event => {
    // Always free: days 0–7
    if (event.day_number >= 0 && event.day_number <= 7) {
      return { ...event, is_free: true };
    }
    // Always free: critical events up to day 14
    if (event.priority === 'critical' && event.day_number >= 0 && event.day_number <= 14) {
      return { ...event, is_free: true };
    }
    // Always free: emergency events
    if (event.tags.includes('emergency') || event.tags.includes('nursing')) {
      return { ...event, is_free: true };
    }
    // Always free: vet urgent events
    if (event.tags.includes('urgent') || event.id.includes('vet_urgent')) {
      return { ...event, is_free: true };
    }
    // Keep whatever is_free value was already set
    return event;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN GENERATE FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

export async function generateSchedule(
  rawInput: Omit<ScheduleInput, 'anchor_date' | 'feeding_frequency_hours' | 'hypoglycemia_risk'>
): Promise<CalendarEvent[]> {

  // ── Step 1: Resolve computed fields ──────────────────────────────────────
  const anchor_date = resolveAnchorDate(rawInput);

  const is_miniature_rat_terrier =
    rawInput.is_rat_terrier && rawInput.rat_terrier_variety === 'miniature';

  const feeding_frequency_hours = resolveFeedingFrequency(
    rawInput.is_min_pin,
    is_miniature_rat_terrier
  );

  const hypoglycemia_risk =
    rawInput.is_min_pin || is_miniature_rat_terrier ? 'high'
    : rawInput.size_category === 'toy' ? 'high'
    : rawInput.size_category === 'small' ? 'medium'
    : 'low';

  const input: ScheduleInput = {
    ...rawInput,
    anchor_date,
    feeding_frequency_hours,
    hypoglycemia_risk,
  };

  // ── Step 2: Load the breed's isolated infobase ────────────────────────────
  const { getBreedById } = await import('../breeds/registry');
  const breed = getBreedById(rawInput.breed_id);
  const info_base_id = breed?.info_base_id ?? 'mixed_breed';
  const infobase = await loadInfobase(info_base_id);
  validateInfobase(infobase, rawInput.breed_name);

  // ── Step 3: Build base events from infobase templates ────────────────────
  // Helper: resolve event arrays from breed-specific OR JRT_* export names
  // Each infobase may export events as JRT_*, FOX_TERRIER_*, etc.
  // We check all possible prefixes so every breed gets its own events.
  const resolveEvents = (suffix: string): EventTemplate[] | undefined => {
    const prefixes = [
      info_base_id.toUpperCase() + '_',  // e.g. FOX_TERRIER_NEONATAL_EVENTS
      'JRT_',                             // Fallback to JRT exports (shared by JRT group)
    ];
    for (const prefix of prefixes) {
      const key = prefix + suffix;
      if (infobase[key] && Array.isArray(infobase[key])) return infobase[key];
    }
    return undefined;
  };

  const allEvents: CalendarEvent[] = [];

  // Pregnancy events (only if not yet born)
  const pregnancyEvents = resolveEvents('PREGNANCY_EVENTS');
  if (input.status === 'pregnant' && pregnancyEvents) {
    allEvents.push(...buildPregnancyEvents(pregnancyEvents, anchor_date, input.dog_id, input.breed_id, input.vet_confirmed));
  }

  // Birthing guide events (ALL BREEDS, Days -18 to 0, only if pregnant)
  if (input.status === 'pregnant') {
    allEvents.push(...buildBirthingGuideEvents(anchor_date, input.dog_id, input.breed_id));
  }

  // Neonatal / transitional / nutrition / training events (Day 0–56)
  // ALL postnatal — MUST NOT render when status = 'pregnant'. These are
  // anchored to the estimated due date which, if overdue, would incorrectly
  // place Day 0 events in the past even though no puppies exist yet.
  const neonatalEvents = resolveEvents('NEONATAL_EVENTS');
  if (neonatalEvents && input.status === 'born') {
    const postEvents = buildPostnatalEvents(
      neonatalEvents,
      resolveEvents('TRANSITIONAL_EVENTS') ?? [],
      resolveEvents('NUTRITION_EVENTS') ?? [],
      resolveEvents('TRAINING_EVENTS') ?? [],
      anchor_date,
      input.dog_id,
      input.breed_id
    );
    allEvents.push(...postEvents);
  }

  // ── Step 4: Build health schedule events (deworming, vaccines, vet) ──────
  // Resolve health schedule from any breed prefix
  const healthSchedule =
    infobase[info_base_id.toUpperCase() + '_HEALTH_SCHEDULE'] ??
    infobase.JRT_HEALTH_SCHEDULE ??
    infobase.FOX_TERRIER_HEALTH_SCHEDULE ??
    infobase.RAT_TERRIER_HEALTH_SCHEDULE ??
    infobase.BORDER_TERRIER_HEALTH_SCHEDULE ??
    infobase.MIN_PIN_HEALTH_SCHEDULE ??
    infobase.MIXED_BREED_HEALTH_SCHEDULE ??
    null;

  if (healthSchedule && input.status === 'born') {
    // Deworming, vaccinations, and vet visits are ALL postnatal events.
    // They MUST NOT appear when status = 'pregnant' — even if the dog is overdue —
    // because these events are calculated relative to anchor (due date) and would
    // show incorrectly on the calendar before the puppies are born.
    if (healthSchedule.deworming) {
      allEvents.push(...buildDewormingEvents(
        healthSchedule.deworming, anchor_date, input.dog_id, input.breed_id
      ));
    }
    if (healthSchedule.vaccinations) {
      allEvents.push(...buildVaccinationEvents(
        healthSchedule.vaccinations, anchor_date, input.dog_id, input.breed_id
      ));
    }
    if (healthSchedule.vet_visits) {
      allEvents.push(...buildVetVisitEvents(
        healthSchedule.vet_visits, anchor_date, input.dog_id, input.breed_id
      ));
    }
  }

  // ── Step 5: Expand repeating events ────────────────────────────────────────
  // IMPORTANT: Postnatal events (cord, ENS, puppy temp, weighing) only for BORN.
  //            Pregnancy events (dam temperature) only for PREGNANT.

  if (input.status === 'born') {
    // Weekly weighing (Day 0 → Day 56) — BORN ONLY
    const weighGroup = UNIVERSAL_REPEATING_GROUPS.find(g => g.group_id === 'weekly_weigh')!;
    allEvents.push(...expandRepeatingGroup(
      weighGroup, anchor_date, input.dog_id, input.breed_id,
      `Weigh each puppy individually in grams. Record against their ID colour.\n\nTarget gains:\nWeek 1: 10–20g per day\nWeeks 2–4: 15–25g per day\nWeeks 4–8: 20–30g per day\n\nAny puppy not gaining weight: supplement with formula immediately.`,
      'Any puppy loses weight after Day 1, or gains less than 5g in 24 hours'
    ));

    // Cord iodine treatment (Day 0 → Day 5) — BORN ONLY
    const cordGroup = UNIVERSAL_REPEATING_GROUPS.find(g => g.group_id === 'cord_iodine')!;
    allEvents.push(...expandRepeatingGroup(
      cordGroup, anchor_date, input.dog_id, input.breed_id,
      'Apply Betadine (povidone-iodine) to each umbilical cord stump. The cord should be drying, darkening, and shrinking. It falls off on its own in 3–5 days.',
      'Any cord shows redness, swelling, pus, or heat around the navel — same day emergency'
    ));

    // Whelping box temperature check (Day 0 → Day 14) — BORN ONLY
    const tempGroup = UNIVERSAL_REPEATING_GROUPS.find(g => g.group_id === 'temp_check')!;
    allEvents.push(...expandRepeatingGroup(
      tempGroup, anchor_date, input.dog_id, input.breed_id,
      getTempCheckDetail(input.is_min_pin, 0),
      'Temperature at puppy level drops below 27°C (80°F) — adjust heat source immediately'
    ));

    // ENS exercises (Day 3 → Day 16) — BORN ONLY
    allEvents.push(...expandRepeatingGroup(
      ENS_REPEATING_GROUP, anchor_date, input.dog_id, input.breed_id,
      ENS_DETAIL_TEXT, undefined,
      ['ens', 'development', 'neurological']
    ));
  }

  // Pregnancy temperature monitoring — PREGNANT ONLY
  if (input.status === 'pregnant') {
    allEvents.push(...expandRepeatingGroup(
      PREGNANCY_TEMP_MONITORING,
      anchor_date,
      input.dog_id,
      input.breed_id,
      'Use a digital rectal thermometer. Lubricate gently. Record the reading and time in a notebook.\n\nNormal range: 38–39.2°C (100.4–102.5°F).\nLabour signal: drops below 37.2°C (99°F) — labour within 12–24 hours.\n\nIf temperature drops: prepare the whelping box, stay close, alert your vet.',
      'Temperature drops below 37.2°C (99°F) — note the time and call your vet to alert them'
    ));
  }

  // ── Step 6: Feeding reminders ─────────────────────────────────────────────
  if (input.status === 'born') {
    allEvents.push(...expandFeedingReminders(
      anchor_date,
      input.dog_id,
      input.breed_id,
      input.feeding_frequency_hours
    ));
  }

  // ── Step 7: Socialization events (Weeks 3–8) — BORN ONLY ──────────────────
  const socializationEvents = resolveEvents('SOCIALIZATION_EVENTS');
  if (input.status === 'born' && socializationEvents) {
    allEvents.push(...buildEvents(socializationEvents, anchor_date, input.dog_id, input.breed_id));
  }

  // ── Step 8: Run all conditions ────────────────────────────────────────────
  const conditionalEvents = runAllConditions(input);
  allEvents.push(...conditionalEvents);

  // ── Step 9: Apply Parson Russell / Russell Terrier overrides ──────────────
  // Day 168 LOA monitoring is anchored to birth — only render when BORN.
  if (
    input.status === 'born' &&
    (input.breed_id === 'parson_russell_terrier' || input.breed_id === 'russell_terrier') &&
    infobase.BREED_OVERRIDES
  ) {
    const overrideKey = input.breed_id;
    const override = infobase.BREED_OVERRIDES[overrideKey];
    if (override?.additional_monitoring) {
      const monDate = addDays(anchor_date, 168); // ~6 months for LOA
      const dateStr = toDateString(monDate);
      allEvents.push({
        id: `${input.breed_id}_loa_monitoring_${dateStr}`,
        dog_id: input.dog_id,
        title: `${override.additional_monitoring.condition}: Watch from now`,
        date: monDate,
        day_number: 168,
        category: 'health',
        priority: 'high',
        description: override.additional_monitoring.sign,
        detail: `${override.additional_monitoring.condition}\n\nSign to watch for: ${override.additional_monitoring.sign}\n\nAction: ${override.additional_monitoring.action}`,
        is_free: false,
        is_repeating: false,
        completed: false,
        emergency_contact_recommended: false,
        tags: ['genetic_monitoring', 'loa', 'ataxia'],
        category_color: '#E63946',
        priority_badge_color: '#F4A261',
      });
    }
  }

  // ── Step 10: Deduplicate, sort, apply tier gating ─────────────────────────
  const sorted = sortAndDeduplicate(allEvents);
  const gated = applyFreeTierGating(sorted);

  // ── Step 11: Summary log ───────────────────────────────────────────────────
  {
    const freeCount = gated.filter(e => e.is_free).length;
    const paidCount = gated.filter(e => !e.is_free).length;
    const criticalCount = gated.filter(e => e.priority === 'critical').length;
    const sorted2 = [...gated].sort((a, b) => a.date.getTime() - b.date.getTime());
    const firstDate = sorted2[0]?.date;
    const lastDate = sorted2[sorted2.length - 1]?.date;
    const categories: Record<string, number> = {};
    gated.forEach(e => { categories[e.category] = (categories[e.category] || 0) + 1; });

    console.log('\n╔══════════════════════════════════════════════════════');
    console.log('║ 🐾 SCHEDULE ENGINE — Generation Summary');
    console.log('╠══════════════════════════════════════════════════════');
    console.log(`║ Breed:      ${input.breed_name} (${input.breed_id})`);
    console.log(`║ Status:     ${input.status}`);
    console.log(`║ Anchor:     ${anchor_date.toDateString()}`);
    console.log(`║ Dam:        ${input.dam_weight_kg}kg, age ${input.dam_age_band}`);
    console.log('╠──────────────────────────────────────────────────────');
    console.log(`║ Total:      ${gated.length} events`);
    console.log(`║ Free tier:  ${freeCount} | Paid: ${paidCount}`);
    console.log(`║ Critical:   ${criticalCount}`);
    console.log(`║ First event: ${firstDate?.toDateString() ?? 'none'}`);
    console.log(`║ Last event:  ${lastDate?.toDateString() ?? 'none'}`);
    console.log('╠──────────────────────────────────────────────────────');
    Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
      console.log(`║   ${cat}: ${count}`);
    });
    console.log('╚══════════════════════════════════════════════════════\n');
  }

  return gated;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getTempCheckDetail(isMinPin: boolean, _day: number): string {
  const minTemp = isMinPin ? '30°C (86°F)' : '29.5°C (85°F)';
  const idealTemp = isMinPin ? '31–33°C (88–91°F)' : '29.5–32°C (85–90°F)';

  return `Place a thermometer at puppy level inside the whelping box — not near the ceiling or lamp.\n\nTarget temperature: ${idealTemp}\nMinimum: ${minTemp}\n\nAdjust heat source if needed. Remember: one warm zone only. Puppies must be able to crawl away from heat.\n\n${isMinPin ? '⚠️ Min Pin alert: These puppies are more cold-sensitive than other breeds. Temperature monitoring is especially critical.' : ''}`;
}

const ENS_DETAIL_TEXT = `Perform ONCE daily. Never skip, never do twice. Each exercise: exactly 3–5 seconds.

1. **Tactile stimulation:** Use a Q-tip. Gently tickle between the toes on one foot.
2. **Head held erect:** Hold the puppy vertically with head pointing straight up.
3. **Head pointed down:** Hold the puppy firmly, head pointing straight down.
4. **Supine position:** Hold the puppy on its back, belly pointing upward.
5. **Thermal stimulation:** Place the puppy paws-down on a cool damp towel (refrigerated for 5 minutes).

Total time per puppy: ~30 seconds.

Do all 5 exercises in sequence. Do every puppy in the litter.

**Why this works:** Developed from US military "Bio Sensor" research. Produces puppies with stronger hearts, stronger adrenal glands, better stress tolerance, and greater disease resistance. Effects are permanent.

**Caution:** Over-stimulation causes the opposite effect. Once per day only.`;

// ─────────────────────────────────────────────────────────────────────────────
// REGENERATE SCHEDULE
// Called when user updates their dog's information (e.g. confirms birth date)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Regenerates the full schedule when user updates key information.
 * Preserves completed events (does not reset them).
 * Returns the new complete schedule.
 */
export async function regenerateSchedule(
  input: Omit<ScheduleInput, 'anchor_date' | 'feeding_frequency_hours' | 'hypoglycemia_risk'>,
  previousEvents: CalendarEvent[]
): Promise<CalendarEvent[]> {
  const newEvents = await generateSchedule(input);

  // Preserve completion status from previous events
  const completedIds = new Set(
    previousEvents
      .filter(e => e.completed)
      .map(e => e.id)
  );

  return newEvents.map(event => ({
    ...event,
    completed: completedIds.has(event.id),
    completed_at: previousEvents.find(p => p.id === event.id)?.completed_at,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// SCHEDULE SUMMARY
// Returns a simple summary for displaying to the user after generation
// ─────────────────────────────────────────────────────────────────────────────

export interface ScheduleSummary {
  total_events: number;
  critical_events: number;
  first_event_date: Date;
  last_event_date: Date;
  next_critical_event?: CalendarEvent;
  deworming_dates: Date[];
  vaccination_dates: Date[];
  vet_visit_dates: Date[];
}

export function getScheduleSummary(events: CalendarEvent[]): ScheduleSummary {
  const sorted = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = sorted.filter(e => e.date >= today && !e.completed);
  const nextCritical = upcoming.find(e => e.priority === 'critical');

  return {
    total_events: events.length,
    critical_events: events.filter(e => e.priority === 'critical').length,
    first_event_date: sorted[0]?.date ?? today,
    last_event_date: sorted[sorted.length - 1]?.date ?? today,
    next_critical_event: nextCritical,
    deworming_dates: events
      .filter(e => e.tags.includes('deworming'))
      .map(e => e.date),
    vaccination_dates: events
      .filter(e => e.tags.includes('vaccination'))
      .map(e => e.date),
    vet_visit_dates: events
      .filter(e => e.tags.includes('vet_visit'))
      .map(e => e.date),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// DEV HELPER: __DEV__ guard
// ─────────────────────────────────────────────────────────────────────────────
declare const __DEV__: boolean;
