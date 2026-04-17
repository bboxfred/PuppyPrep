/**
 * SCHEDULE ENGINE SCENARIO TESTS
 * Tests all 5 scenarios from CLAUDE.md Section 17.
 *
 * Run with: npx ts-node --esm src/tests/schedule-scenarios.ts
 * Or import and call runAllScenarios() from a screen.
 */
import { generateSchedule } from '../data/schedule-engine';
import type { CalendarEvent } from '../data/schedule-engine/event-builder';

interface ScenarioResult {
  name: string;
  passed: boolean;
  totalEvents: number;
  freeEvents: number;
  paidEvents: number;
  criticalEvents: number;
  anchorDate: string;
  firstEventDate: string;
  lastEventDate: string;
  duplicateIds: string[];
  issues: string[];
}

function checkDuplicates(events: CalendarEvent[]): string[] {
  const seen = new Set<string>();
  const dupes: string[] = [];
  for (const e of events) {
    if (seen.has(e.id)) dupes.push(e.id);
    seen.add(e.id);
  }
  return dupes;
}

function checkDay0Events(events: CalendarEvent[]): string[] {
  const day0 = events.filter(e => e.day_number === 0);
  const issues: string[] = [];
  if (day0.length === 0) issues.push('No Day 0 events found');
  const hasCritical = day0.some(e => e.priority === 'critical');
  if (!hasCritical) issues.push('No CRITICAL events on Day 0');
  return issues;
}

function checkFreeTierGating(events: CalendarEvent[]): string[] {
  const issues: string[] = [];
  // Day 0-7 events should all be free
  const earlyEvents = events.filter(e => e.day_number >= 0 && e.day_number <= 7);
  const earlyPaid = earlyEvents.filter(e => !e.is_free);
  if (earlyPaid.length > 0) {
    issues.push(`${earlyPaid.length} paid events in Day 0-7 range (should be free)`);
  }
  // Day 8+ should have some paid events
  const lateEvents = events.filter(e => e.day_number > 14);
  const latePaid = lateEvents.filter(e => !e.is_free);
  if (lateEvents.length > 0 && latePaid.length === 0) {
    issues.push('No paid events after Day 14 — free tier gating may not be working');
  }
  return issues;
}

function summarizeResult(result: ScenarioResult): void {
  const icon = result.passed ? '✅' : '❌';
  console.log(`\n${icon} Scenario: ${result.name}`);
  console.log(`   Total: ${result.totalEvents} | Free: ${result.freeEvents} | Paid: ${result.paidEvents} | Critical: ${result.criticalEvents}`);
  console.log(`   Anchor: ${result.anchorDate}`);
  console.log(`   Range:  ${result.firstEventDate} → ${result.lastEventDate}`);
  if (result.duplicateIds.length > 0) {
    console.log(`   ⚠️ ${result.duplicateIds.length} duplicate IDs`);
  }
  if (result.issues.length > 0) {
    result.issues.forEach(i => console.log(`   ⚠️ ${i}`));
  }
}

async function runScenario(name: string, input: Parameters<typeof generateSchedule>[0]): Promise<ScenarioResult> {
  try {
    const events = await generateSchedule(input);
    const sorted = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
    const dupes = checkDuplicates(events);
    const day0Issues = input.status === 'born' ? checkDay0Events(events) : [];
    const gatingIssues = checkFreeTierGating(events);
    const allIssues = [...day0Issues, ...gatingIssues];
    if (dupes.length > 0) allIssues.push(`${dupes.length} duplicate event IDs`);

    return {
      name,
      passed: allIssues.length === 0 && events.length > 0,
      totalEvents: events.length,
      freeEvents: events.filter(e => e.is_free).length,
      paidEvents: events.filter(e => !e.is_free).length,
      criticalEvents: events.filter(e => e.priority === 'critical').length,
      anchorDate: sorted[0]?.date.toDateString() ?? 'none',
      firstEventDate: sorted[0]?.date.toDateString() ?? 'none',
      lastEventDate: sorted[sorted.length - 1]?.date.toDateString() ?? 'none',
      duplicateIds: dupes,
      issues: allIssues,
    };
  } catch (err) {
    return {
      name,
      passed: false,
      totalEvents: 0, freeEvents: 0, paidEvents: 0, criticalEvents: 0,
      anchorDate: 'ERROR', firstEventDate: 'ERROR', lastEventDate: 'ERROR',
      duplicateIds: [],
      issues: [`CRASHED: ${err instanceof Error ? err.message : String(err)}`],
    };
  }
}

const BASE_INPUT = {
  dog_id: 'test_dog',
  notif_time: '08:00',
  notif_lead_time_hours: 0,
  is_jrt_type: false,
  is_fox_terrier: false,
  is_wire_fox_terrier: false,
  is_border_terrier: false,
  is_min_pin: false,
  is_rat_terrier: false,
  rat_terrier_variety: undefined,
  nursing_status: undefined,
} as const;

export async function runAllScenarios(): Promise<ScenarioResult[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const threeWeeksAgo = new Date(today);
  threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('🐾 SCHEDULE ENGINE — Scenario Tests');
  console.log('═══════════════════════════════════════════════════════');

  const results: ScenarioResult[] = [];

  // ── Scenario A: JRT, pregnant, knows mating date ──
  const scenarioA = await runScenario('A — JRT pregnant, mating date known', {
    ...BASE_INPUT,
    breed_id: 'jack_russell_terrier',
    breed_name: 'Jack Russell Terrier',
    size_category: 'small',
    status: 'pregnant',
    mating_date: threeWeeksAgo,
    estimated_due_date: new Date(threeWeeksAgo.getTime() + 63 * 24 * 60 * 60 * 1000),
    birth_date: undefined,
    is_singleton: false,
    dam_weight_kg: 6,
    dam_age_band: '2_to_5',
    first_litter: true,
    vet_confirmed: 'ultrasound',
    is_jrt_type: true,
  });
  results.push(scenarioA);
  summarizeResult(scenarioA);

  // ── Scenario B: JRT, born today, 6 puppies ──
  const scenarioB = await runScenario('B — JRT born today, 6 puppies', {
    ...BASE_INPUT,
    breed_id: 'jack_russell_terrier',
    breed_name: 'Jack Russell Terrier',
    size_category: 'small',
    status: 'born',
    birth_date: today,
    mating_date: undefined,
    estimated_due_date: undefined,
    puppy_count: 6,
    is_singleton: false,
    nursing_status: 'all',
    dam_weight_kg: 6,
    dam_age_band: '2_to_5',
    first_litter: true,
    vet_confirmed: 'ultrasound',
    is_jrt_type: true,
  });
  results.push(scenarioB);
  summarizeResult(scenarioB);

  // ── Scenario C: Singleton puppy ──
  const scenarioC = await runScenario('C — Singleton puppy (1 puppy)', {
    ...BASE_INPUT,
    breed_id: 'jack_russell_terrier',
    breed_name: 'Jack Russell Terrier',
    size_category: 'small',
    status: 'born',
    birth_date: today,
    mating_date: undefined,
    estimated_due_date: undefined,
    puppy_count: 1,
    is_singleton: true,
    nursing_status: 'all',
    dam_weight_kg: 6,
    dam_age_band: '2_to_5',
    first_litter: true,
    vet_confirmed: 'ultrasound',
    is_jrt_type: true,
  });
  results.push(scenarioC);
  summarizeResult(scenarioC);

  // ── Scenario D: Unknown mating date (approximate) ──
  const fiveWeeksFromNow = new Date(today);
  fiveWeeksFromNow.setDate(fiveWeeksFromNow.getDate() + 35);

  const scenarioD = await runScenario('D — Unknown mating date (estimated due date)', {
    ...BASE_INPUT,
    breed_id: 'mixed_breed',
    breed_name: 'Mixed Breed',
    size_category: 'medium',
    status: 'pregnant',
    mating_date: undefined,
    estimated_due_date: fiveWeeksFromNow,
    date_is_estimated: true,
    birth_date: undefined,
    is_singleton: false,
    dam_weight_kg: 15,
    dam_age_band: '2_to_5',
    first_litter: false,
    vet_confirmed: 'exam_only',
  });
  results.push(scenarioD);
  summarizeResult(scenarioD);

  // ── Scenario E: Free tier user (check Day 8+ gating) ──
  const scenarioE = await runScenario('E — Free tier user (Day 8+ locked)', {
    ...BASE_INPUT,
    breed_id: 'jack_russell_terrier',
    breed_name: 'Jack Russell Terrier',
    size_category: 'small',
    status: 'born',
    birth_date: today,
    mating_date: undefined,
    estimated_due_date: undefined,
    puppy_count: 5,
    is_singleton: false,
    nursing_status: 'all',
    dam_weight_kg: 6.5,
    dam_age_band: '2_to_5',
    first_litter: true,
    vet_confirmed: 'ultrasound',
    is_jrt_type: true,
  });
  results.push(scenarioE);
  summarizeResult(scenarioE);

  // ── Summary ──
  const passCount = results.filter(r => r.passed).length;
  console.log(`\n═══════════════════════════════════════════════════════`);
  console.log(`Results: ${passCount}/${results.length} passed`);
  console.log(`═══════════════════════════════════════════════════════\n`);

  return results;
}
