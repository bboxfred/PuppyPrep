/**
 * WIDGET DATA BUILDER + UPDATE TRIGGER
 *
 * Pure functions that read the app's stores and produce the exact
 * shape expected by TodayCalendarWidget. Keeping this separate from
 * the widget UI makes the build fast to test and easy to move later
 * if we rework the UI.
 *
 * Battery-friendly update policy:
 *   - NO scheduled periodic refresh (updatePeriodMillis=0 in config).
 *   - `refreshWidget()` is called explicitly from:
 *       1. Dashboard mount (user returns to the app)
 *       2. Event completion/snooze
 *       3. Record-birth modal close
 *       4. Notification handler (when a reminder fires)
 *       5. User taps the widget — which opens the app, which runs #1
 */
import { requestWidgetUpdate } from 'react-native-android-widget';
import { Platform } from 'react-native';
import { TodayCalendarWidget, type WidgetData } from './TodayCalendarWidget';
import { usePuppyStore } from '@/store/usePuppyStore';
import { useCalendarStore } from '@/store/useCalendarStore';

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Build a WidgetData snapshot from current store state.
 */
export function buildWidgetData(): WidgetData {
  const puppy = usePuppyStore.getState();
  const events = useCalendarStore.getState().events;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ── Header: dog name + countdown / age ────────────────────────────────────
  const dogName = puppy.dogName ?? puppy.breedName ?? 'Your dog';
  let ageOrCountdown = '';

  if (puppy.status === 'pregnant' && puppy.estimatedDueDate) {
    const due = new Date(puppy.estimatedDueDate);
    due.setHours(0, 0, 0, 0);
    const d = daysBetween(today, due);
    ageOrCountdown = d < 0 ? `${Math.abs(d)}d overdue` : `Due in ${d}d`;
  } else if (puppy.status === 'born' && puppy.birthDate) {
    const birth = new Date(puppy.birthDate);
    birth.setHours(0, 0, 0, 0);
    const age = daysBetween(birth, today);
    ageOrCountdown = age === 0 ? 'Born today' : `Day ${age}`;
  }

  // ── Today's tasks ─────────────────────────────────────────────────────────
  const todayMs = today.getTime();
  const priorityRank: Record<string, number> = { critical: 0, high: 1, recommended: 2 };
  const todayTasks = events
    .filter(e => {
      const d = new Date(e.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === todayMs && !e.completed;
    })
    .sort((a, b) => (priorityRank[a.priority] ?? 99) - (priorityRank[b.priority] ?? 99));

  const topTask = todayTasks[0];
  const topTaskTitle = topTask?.title ?? 'No tasks today — nice.';
  const topTaskPriority = topTask?.priority ?? 'none';
  const moreTasksCount = Math.max(0, todayTasks.length - 1);

  // ── 6-week dot strip from 7 days before today (Sun-aligned) ───────────────
  // Align to Sunday so the grid is always 7 columns wide starting on a Sunday
  const firstCellDate = new Date(today);
  firstCellDate.setDate(firstCellDate.getDate() - firstCellDate.getDay()); // back to Sunday
  firstCellDate.setDate(firstCellDate.getDate() - 7); // then one week earlier (prev week)

  const calendarDots: WidgetData['calendarDots'] = [];
  for (let i = 0; i < 42; i++) {
    const cellDate = new Date(firstCellDate);
    cellDate.setDate(firstCellDate.getDate() + i);
    cellDate.setHours(0, 0, 0, 0);

    const dayEvents = events.filter(e => {
      const d = new Date(e.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === cellDate.getTime();
    });

    calendarDots.push({
      day: cellDate.getDate(),
      isToday: cellDate.getTime() === todayMs,
      hasCritical: dayEvents.some(e => e.priority === 'critical' && !e.completed),
      hasHigh:     dayEvents.some(e => e.priority === 'high' && !e.completed),
      hasRecommended: dayEvents.some(e => e.priority === 'recommended' && !e.completed),
    });
  }

  return {
    dogName,
    ageOrCountdown,
    topTaskTitle,
    topTaskPriority,
    moreTasksCount,
    calendarDots,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Tell Android to re-render the widget. Safe to call on any platform —
 * it's a no-op on iOS and web. Throttled so rapid back-to-back store
 * mutations don't trigger a storm.
 */
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
export function refreshWidget(): void {
  if (Platform.OS !== 'android') return;
  if (refreshTimer) return; // coalesce — one refresh per 500ms window
  refreshTimer = setTimeout(() => {
    refreshTimer = null;
    try {
      requestWidgetUpdate({
        widgetName: 'TodayCalendar',
        renderWidget: () => TodayCalendarWidget({ data: buildWidgetData() }),
      });
    } catch (err) {
      // Not fatal — widget might not exist yet (user hasn't added it)
      console.warn('[widget] refresh failed:', err);
    }
  }, 500);
}
