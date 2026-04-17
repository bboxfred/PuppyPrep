import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkv-storage';
import type { CalendarEvent } from '@/data/schedule-engine/event-builder';

interface CalendarState {
  // Generated events
  events: CalendarEvent[];
  generatedAt: string | null;  // ISO timestamp of last generation

  // Actions
  setEvents: (events: CalendarEvent[]) => void;
  markCompleted: (eventId: string) => void;
  markUncompleted: (eventId: string) => void;
  snoozeEvent: (eventId: string, until: string) => void;
  clearSnooze: (eventId: string) => void;
  clearAll: () => void;

  // Selectors (computed from events)
  getEventsForDay: (dateStr: string) => CalendarEvent[];
  getTodayEvents: () => CalendarEvent[];
  getUpcomingCritical: (limit: number) => CalendarEvent[];
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      events: [],
      generatedAt: null,

      setEvents: (events) =>
        set({ events, generatedAt: new Date().toISOString() }),

      markCompleted: (eventId) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === eventId
              ? { ...e, completed: true, completed_at: new Date() }
              : e
          ),
        })),

      markUncompleted: (eventId) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === eventId
              ? { ...e, completed: false, completed_at: undefined }
              : e
          ),
        })),

      snoozeEvent: (eventId, until) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === eventId
              ? { ...e, snoozed_until: new Date(until) }
              : e
          ),
        })),

      clearSnooze: (eventId) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === eventId
              ? { ...e, snoozed_until: undefined }
              : e
          ),
        })),

      clearAll: () =>
        set({ events: [], generatedAt: null }),

      getEventsForDay: (dateStr) => {
        return get().events.filter((e) => {
          const eventDate = new Date(e.date);
          const y = eventDate.getFullYear();
          const m = String(eventDate.getMonth() + 1).padStart(2, '0');
          const d = String(eventDate.getDate()).padStart(2, '0');
          return `${y}-${m}-${d}` === dateStr;
        });
      },

      getTodayEvents: () => {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        return get().getEventsForDay(`${y}-${m}-${d}`);
      },

      getUpcomingCritical: (limit) => {
        const now = new Date();
        return get()
          .events.filter(
            (e) =>
              e.priority === 'critical' &&
              !e.completed &&
              new Date(e.date) >= now
          )
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, limit);
      },
    }),
    {
      name: 'calendar-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
