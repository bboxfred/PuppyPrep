/**
 * REPEATING EVENTS EXPANDER
 * File: src/data/schedule-engine/repeating-events.ts
 *
 * Some events repeat — daily weighing, ENS exercises, temperature checks.
 * This file expands a single repeating template into multiple individual
 * CalendarEvents, each with its own real date.
 *
 * UI NOTE: The calendar view GROUPS repeating events visually (shows as one
 * recurring item with a streak counter), but the database stores each
 * individual occurrence so completion can be tracked per-day.
 */

import {
  EventTemplate,
  CalendarEvent,
  RepeatPattern,
  addDays,
  addWeeks,
  buildEvent,
  toDateString,
} from './event-builder';

// ─────────────────────────────────────────────────────────────────────────────
// REPEATING EVENT GROUPS
// These are the repeating patterns used across all breeds.
// Each has a GROUP_ID so the UI can visually group them.
// ─────────────────────────────────────────────────────────────────────────────

export interface RepeatingGroup {
  group_id: string;
  title: string;
  description: string;   // Short — for the "series" card in UI
  category: 'health' | 'nutrition' | 'socialization' | 'training' | 'development' | 'environment';
  priority: 'critical' | 'high' | 'recommended';
  start_day_offset: number;
  end_day_offset: number;
  frequency: 'daily' | 'every_2_days' | 'weekly';
  is_free: boolean;
  streak_label: string;  // e.g. 'Day {n} of {total}' or 'Week {n}'
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIVERSAL REPEATING GROUPS (all breeds, all statuses)
// ─────────────────────────────────────────────────────────────────────────────

export const UNIVERSAL_REPEATING_GROUPS: RepeatingGroup[] = [
  {
    group_id: 'weekly_weigh',
    title: 'Weigh all puppies',
    description: 'Record every puppy\'s weight in grams. Compare against weekly targets to catch any puppy falling behind.',
    category: 'health',
    priority: 'critical',
    start_day_offset: 0,
    end_day_offset: 56,
    frequency: 'weekly',
    is_free: true,
    streak_label: 'Week {n} of 9',
  },
  {
    group_id: 'cord_iodine',
    title: 'Apply iodine to umbilical cords',
    description: 'Dab Betadine on each cord stump 2–3 times daily until they fall off.',
    category: 'health',
    priority: 'critical',
    start_day_offset: 0,
    end_day_offset: 5,
    frequency: 'daily',
    is_free: true,
    streak_label: 'Day {n} of 6',
  },
  {
    group_id: 'temp_check',
    title: 'Check whelping box temperature',
    description: 'Verify temperature at puppy level. Adjust heat source if needed.',
    category: 'environment',
    priority: 'critical',
    start_day_offset: 0,
    end_day_offset: 14,
    frequency: 'daily',
    is_free: true,
    streak_label: 'Day {n} of 15',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ENS REPEATING GROUP (Days 3–16)
// Separate because it has a hard start and end date, and a specific label
// ─────────────────────────────────────────────────────────────────────────────

export const ENS_REPEATING_GROUP: RepeatingGroup = {
  group_id: 'ens_exercises',
  title: 'Early Neurological Stimulation (ENS)',
  description: '5 exercises, 3–5 seconds each, once per day. Proven to produce calmer, healthier adult dogs. Do not skip. Do not do twice.',
  category: 'development',
  priority: 'critical',
  start_day_offset: 3,
  end_day_offset: 16,
  frequency: 'daily',
  is_free: true,
  streak_label: 'Day {n} of 14',
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGNANCY REPEATING GROUP (temperature monitoring pre-birth)
// ─────────────────────────────────────────────────────────────────────────────

export const PREGNANCY_TEMP_MONITORING: RepeatingGroup = {
  group_id: 'dam_temp_monitoring',
  title: 'Take dam\'s temperature (twice daily)',
  description: 'Morning and evening. A drop below 37.2°C (99°F) means labour within 12–24 hours.',
  category: 'health',
  priority: 'critical',
  start_day_offset: -14,  // 2 weeks before due date
  end_day_offset: 0,      // Until birth
  frequency: 'daily',
  is_free: true,
  streak_label: 'Day {n} before due date',
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPANDER FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Expand a RepeatingGroup into individual CalendarEvents.
 *
 * For a group with start=0, end=56, frequency='daily':
 * → Produces 57 individual events, one per day
 *
 * Each event gets:
 * - Its own unique ID (includes the date)
 * - A repeat_sequence field showing position in the series
 * - is_repeating = true
 */
export function expandRepeatingGroup(
  group: RepeatingGroup,
  anchor: Date,
  dog_id: string,
  breed_id: string,
  detailText: string,
  callVetIf?: string,
  tags: string[] = []
): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  // Calculate step size in days
  const stepDays = group.frequency === 'daily' ? 1
    : group.frequency === 'every_2_days' ? 2
    : 7; // weekly

  // Total occurrences in this series
  const total = Math.floor(
    (group.end_day_offset - group.start_day_offset) / stepDays
  ) + 1;

  let sequenceNumber = 1;

  for (
    let dayOffset = group.start_day_offset;
    dayOffset <= group.end_day_offset;
    dayOffset += stepDays
  ) {
    const eventDate = addDays(anchor, dayOffset);
    const dateStr = toDateString(eventDate);
    const label = group.streak_label
      .replace('{n}', String(sequenceNumber))
      .replace('{total}', String(total));

    events.push({
      id: `${breed_id}_${group.group_id}_${dateStr}`,
      dog_id,
      title: group.title,
      date: eventDate,
      day_number: dayOffset,
      category: group.category,
      priority: group.priority,
      description: group.description,
      detail: detailText,
      is_free: group.is_free,
      is_repeating: true,
      repeat_pattern: { type: 'daily', until_day_offset: group.end_day_offset },
      repeat_sequence: {
        current: sequenceNumber,
        total,
        label_template: label,
      },
      completed: false,
      emergency_contact_recommended: false,
      call_vet_if: callVetIf,
      tags: [...tags, group.group_id, `day_${dayOffset}`],
      category_color: getCategoryColor(group.category),
      priority_badge_color: getPriorityColor(group.priority),
    });

    sequenceNumber++;
  }

  return events;
}

// ─────────────────────────────────────────────────────────────────────────────
// BREED-SPECIFIC FEEDING REMINDER EXPANDER
// Generates feeding reminders at the correct interval for each breed
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generates feeding reminder events for the appropriate breed feeding frequency.
 *
 * For JRT: every 2 hours in week 1
 * For Min Pin / miniature Rat Terrier: every 1.5 hours in week 1
 *
 * These are GROUPED in the UI as a single daily reminder card
 * (not 12 separate cards per day), but stored individually for tracking.
 */
export function expandFeedingReminders(
  anchor: Date,
  dog_id: string,
  breed_id: string,
  feedingFrequencyHours: { week_1: number; week_2: number; week_3: number; week_4: number }
): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  const weeklySchedule = [
    { start: 0, end: 6, hours: feedingFrequencyHours.week_1, week: 1 },
    { start: 7, end: 13, hours: feedingFrequencyHours.week_2, week: 2 },
    { start: 14, end: 20, hours: feedingFrequencyHours.week_3, week: 3 },
    { start: 21, end: 28, hours: feedingFrequencyHours.week_4, week: 4 },
  ];

  for (const schedule of weeklySchedule) {
    for (let day = schedule.start; day <= schedule.end; day++) {
      const eventDate = addDays(anchor, day);
      const dateStr = toDateString(eventDate);
      const freqLabel = schedule.hours === 1.5 ? 'every 90 minutes' : `every ${schedule.hours} hours`;

      events.push({
        id: `${breed_id}_feeding_reminder_${dateStr}`,
        dog_id,
        title: `Feeding check — ${freqLabel}`,
        date: eventDate,
        day_number: day,
        category: 'nutrition',
        priority: 'critical',
        description: `Ensure all puppies have nursed or been fed in the last ${schedule.hours === 1.5 ? '90 minutes' : `${schedule.hours} hours`}.`,
        detail: getFeedingReminderDetail(schedule.hours, schedule.week),
        is_free: true,
        is_repeating: true,
        repeat_pattern: {
          type: 'every_n_hours',
          hours: schedule.hours,
          until_day_offset: schedule.end,
        },
        completed: false,
        emergency_contact_recommended: false,
        tags: ['feeding', `week_${schedule.week}`, 'nutrition'],
        category_color: '#F4A261',
        priority_badge_color: '#E63946',
      });
    }
  }

  return events;
}

// ─────────────────────────────────────────────────────────────────────────────
// SOCIALIZATION WEEKLY EXPANDER
// Generates one socialisation task card per week for weeks 3–8
// ─────────────────────────────────────────────────────────────────────────────

export interface SocializationWeekTemplate {
  week_offset: number;
  title: string;
  description: string;
  detail: string;
  people_target: number;
  surfaces: string[];
  sounds: string[];
}

export function expandSocializationWeeks(
  templates: SocializationWeekTemplate[],
  anchor: Date,
  dog_id: string,
  breed_id: string
): CalendarEvent[] {
  return templates.map((t, i) => {
    const eventDate = addWeeks(anchor, t.week_offset);
    const dateStr = toDateString(eventDate);

    return {
      id: `${breed_id}_social_week${t.week_offset}_${dateStr}`,
      dog_id,
      title: t.title,
      date: eventDate,
      day_number: Math.round(t.week_offset * 7),
      category: 'socialization' as const,
      priority: 'critical' as const,
      description: t.description,
      detail: t.detail,
      is_free: false,
      is_repeating: false,
      completed: false,
      emergency_contact_recommended: false,
      tags: ['socialization', `week_${t.week_offset}`, `people_${t.people_target}`],
      category_color: '#457B9D',
      priority_badge_color: '#E63946',
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    health:        '#E63946',
    nutrition:     '#F4A261',
    socialization: '#457B9D',
    training:      '#6A4C93',
    development:   '#74C69D',
    environment:   '#95A5A6',
  };
  return map[category] ?? '#95A5A6';
}

function getPriorityColor(priority: string): string {
  const map: Record<string, string> = {
    critical:    '#E63946',
    high:        '#F4A261',
    recommended: '#2D6A4F',
  };
  return map[priority] ?? '#2D6A4F';
}

function getFeedingReminderDetail(hours: number, week: number): string {
  const interval = hours === 1.5 ? '90 minutes' : `${hours} hours`;

  const weekNotes: Record<number, string> = {
    1: `In Week 1, a puppy that goes longer than ${interval} without feeding can develop dangerously low blood sugar — especially in small and toy breeds. Check that every puppy has a full, rounded belly. If any puppy feels light or hollow, guide them to a rear teat or supplement with formula immediately.`,
    2: `Week 2 feeding check. Puppies are growing rapidly — double birth weight expected by end of this week. Any puppy not keeping pace with the rest needs supplemental feeding after nursing.`,
    3: `Week 3 — weaning begins around Day 24. Some puppies may start exploring the gruel dish. Continue nursing on demand. Ensure the gruel is always fresh and the water dish is accessible.`,
    4: `Week 4 — solid food becoming the primary source. Monitor that all puppies are accessing the food dish. Runts or smaller puppies may be pushed away by larger littermates — feed them separately if needed.`,
  };

  return weekNotes[week] ?? `Check all puppies have been fed within the last ${interval}.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// SINGLETON PROTOCOL EXPANDER
// Generates week-by-week singleton intervention events for weeks 3–8
// ─────────────────────────────────────────────────────────────────────────────

export function expandSingletonProtocol(
  anchor: Date,
  dog_id: string,
  breed_id: string
): CalendarEvent[] {
  const singletonWeeks = [
    {
      week: 3,
      title: 'Singleton: Begin deliberate rough play',
      description: 'No littermates = no natural bite inhibition learning. You must fill this role.',
      detail: 'Gently tumble the puppy, create brief mock competition over a toy, allow them to mouth your hand. When they bite too hard: yelp sharply and stop all interaction for 60 seconds. Consistent, immediate feedback every single session. Target: 10–15 minutes of deliberate interactive play today in addition to normal handling.',
    },
    {
      week: 4,
      title: 'Singleton: Begin controlled frustration sessions',
      description: 'Do not respond to every vocalisation — singletons must learn they are not always the centre of attention.',
      detail: 'Introduce 10–15 minute safe isolation periods from today (puppy secure in a crate or pen, not in distress). Do not respond immediately to crying — wait for a 10-second pause in vocalisation before approaching. This teaches that noise does not equal instant attention. Critical for preventing severe separation anxiety.',
    },
    {
      week: 5,
      title: 'Singleton: Find a play partner this week',
      description: 'Actively seek another puppy of similar age for supervised play.',
      detail: 'Contact breeders of other litters, puppy socialisation classes, or friends with age-appropriate vaccinated puppies. Even ONE 60-minute supervised play session with another puppy this week makes a measurable difference to bite inhibition development. This is not optional for a well-adjusted adult dog.',
    },
    {
      week: 6,
      title: 'Singleton: Isolation time → 30–60 minutes daily',
      description: 'Build independence before rehoming.',
      detail: 'Increase safe crate/pen isolation to 30–60 minutes at least twice daily. Puppy should be able to settle within 5 minutes. If still crying after 10 minutes every time, reduce the duration and build up more gradually. By Week 8, the target is 2 hours of calm independent time.',
    },
    {
      week: 7,
      title: 'Singleton: Vet puppy socialisation class this week',
      description: 'Book and attend a structured puppy class with other puppies.',
      detail: 'Singleton puppies need formal puppy classes earlier and more urgently than litter-raised puppies. Book a puppy socialisation class that starts at Week 8–9. Classes run by qualified trainers provide structured, safe multi-puppy interaction that cannot be replicated at home alone.',
    },
    {
      week: 8,
      title: 'Singleton: Inform new owners — this is critical',
      description: 'New owners of this puppy must be briefed on singleton syndrome before the puppy leaves.',
      detail: 'Before rehoming, have an explicit conversation with the new owner about:\n1. This puppy has poor bite inhibition by default — they MUST attend multiple training classes\n2. This puppy may benefit from a dog companion in the long term\n3. Separation anxiety is a higher risk — crate training is non-negotiable\n4. Continue the rough play + immediate yelp + 60-second pause protocol\n\nProvide this in writing. Singleton syndrome is the leading cause of rehoming for single-puppy litters.',
    },
  ];

  return singletonWeeks.map(w => {
    const eventDate = addWeeks(anchor, w.week);
    const dateStr = toDateString(eventDate);

    return {
      id: `${breed_id}_singleton_week${w.week}_${dateStr}`,
      dog_id,
      title: w.title,
      date: eventDate,
      day_number: w.week * 7,
      category: 'socialization' as const,
      priority: 'high' as const,
      description: w.description,
      detail: w.detail,
      is_free: false,
      is_repeating: false,
      completed: false,
      emergency_contact_recommended: false,
      tags: ['singleton', `week_${w.week}`, 'socialization', 'behavior'],
      category_color: '#457B9D',
      priority_badge_color: '#F4A261',
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// LARGE LITTER EXPANDER (8+ puppies)
// ─────────────────────────────────────────────────────────────────────────────

export function expandLargeLitterEvents(
  anchor: Date,
  dog_id: string,
  breed_id: string,
  puppyCount: number
): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  // Dam fatigue check — daily in first 2 weeks for large litters
  for (let day = 0; day <= 14; day++) {
    const eventDate = addDays(anchor, day);
    const dateStr = toDateString(eventDate);

    events.push({
      id: `${breed_id}_large_litter_dam_check_${dateStr}`,
      dog_id,
      title: 'Large litter: Check dam for exhaustion',
      date: eventDate,
      day_number: day,
      category: 'health',
      priority: 'high',
      description: `With ${puppyCount} puppies, monitor the mother for exhaustion and milk supply strain daily.`,
      detail: `Large litters (8+) place extraordinary demands on the mother. Watch for:\n- Refusing to return to the whelping box\n- Not nursing all puppies equally\n- Weight loss in the dam\n- Mammary glands becoming engorged or uneven\n\nIf you notice any of these: supplement 2–3 puppies with formula after each nursing session, rotating which puppies are supplemented so the dam gets rest.\n\nWeigh the dam weekly — she should maintain weight or gain slightly during lactation.`,
      is_free: false,
      is_repeating: true,
      completed: false,
      emergency_contact_recommended: false,
      call_vet_if: 'Dam loses more than 10% of pre-pregnancy weight, or any mammary gland becomes hot, red, or hard',
      tags: ['large_litter', 'dam_health', `day_${day}`],
      category_color: '#E63946',
      priority_badge_color: '#F4A261',
    });
  }

  // Rotation feeding schedule for large litters
  const rotationDate = addDays(anchor, 0);
  const rotationDateStr = toDateString(rotationDate);

  events.push({
    id: `${breed_id}_large_litter_rotation_${rotationDateStr}`,
    dog_id,
    title: `Large litter (${puppyCount}): Set up rotation feeding`,
    date: rotationDate,
    day_number: 0,
    category: 'nutrition',
    priority: 'critical',
    description: 'With this many puppies, rotation feeding is essential from Day 1.',
    detail: `With ${puppyCount} puppies, not all can nurse simultaneously — JRT-type dogs have only 8–10 functional teats.\n\nSet up a rotation system TODAY:\n1. Divide puppies into Group A and Group B by weight (mix heavy and light in each group)\n2. Allow Group A to nurse for 30 minutes, then swap with Group B\n3. Keep separated groups warm in a box with a heating pad while waiting\n4. Rotate every feeding session\n5. Weigh every puppy daily — any puppy not gaining = move to front of the rotation and supplement\n\nThis system prevents larger puppies from monopolising all nursing time.`,
    is_free: true,
    is_repeating: false,
    completed: false,
    emergency_contact_recommended: false,
    tags: ['large_litter', 'nutrition', 'rotation'],
    category_color: '#F4A261',
    priority_badge_color: '#E63946',
  });

  return events;
}
