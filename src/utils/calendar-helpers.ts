/**
 * CALENDAR HELPERS
 * Shared utilities for grouping, filtering, and formatting calendar events.
 */
import type { CalendarEvent } from '@/data/schedule-engine/event-builder';

/** Format a Date to 'YYYY-MM-DD' string (used as map keys and calendar markers) */
export function toDateKey(date: Date): string {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Format date for display: "14 Jun 2025" */
export function formatDateDisplay(date: Date): string {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/** Format date for headers: "Monday, 14 June" */
export function formatDateHeader(date: Date): string {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

/** Group events by date key */
export function groupEventsByDate(events: CalendarEvent[]): Map<string, CalendarEvent[]> {
  const map = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const key = toDateKey(new Date(event.date));
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(event);
  }
  return map;
}

/** Sort events by priority: critical → high → recommended */
const PRIORITY_ORDER = { critical: 0, high: 1, recommended: 2 };

export function sortByPriority(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => {
    const pa = PRIORITY_ORDER[a.priority] ?? 2;
    const pb = PRIORITY_ORDER[b.priority] ?? 2;
    return pa - pb;
  });
}

/** Get unique category colors for a day's events (max 3 dots) */
export function getCategoryDots(events: CalendarEvent[]): { key: string; color: string }[] {
  const seen = new Set<string>();
  const dots: { key: string; color: string }[] = [];

  for (const event of events) {
    if (!seen.has(event.category)) {
      seen.add(event.category);
      dots.push({ key: event.category, color: event.category_color });
      if (dots.length >= 3) break;
    }
  }
  return dots;
}

/** Count extra categories beyond the 3 visible dots */
export function getExtraDotCount(events: CalendarEvent[]): number {
  const categories = new Set(events.map(e => e.category));
  return Math.max(0, categories.size - 3);
}

/** Check if a day has incomplete critical events */
export function hasOverdueCritical(events: CalendarEvent[], today: Date): boolean {
  const todayKey = toDateKey(today);
  return events.some(e => {
    const eventKey = toDateKey(new Date(e.date));
    return e.priority === 'critical' && !e.completed && eventKey < todayKey;
  });
}

/** Today's date key */
export function todayKey(): string {
  return toDateKey(new Date());
}
