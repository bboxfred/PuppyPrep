/**
 * USE NOTIFICATIONS HOOK
 *
 * Handles permission requests, scheduling, cancelling, and rescheduling
 * push notifications for calendar events.
 *
 * Limits: Expo allows max 200 scheduled local notifications.
 * Strategy: schedule CRITICAL first, then HIGH (30 days), then RECOMMENDED (14 days).
 */
import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useUserStore } from '@/store/useUserStore';
import type { CalendarEvent } from '@/data/schedule-engine/event-builder';

const MAX_SCHEDULED = 200;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

// ─────────────────────────────────────────────────────────────────────────────
// PERMISSION
// ─────────────────────────────────────────────────────────────────────────────

async function requestPermissionsAsync(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  if (!Device.isDevice) {
    console.warn('[Notifications] Must use physical device for push notifications');
    return false;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// ─────────────────────────────────────────────────────────────────────────────
// NOTIFICATION CONTENT BUILDER
// ─────────────────────────────────────────────────────────────────────────────

function buildNotificationContent(event: CalendarEvent): Notifications.NotificationContentInput {
  const firstSentence = event.description.split(/[.!?]/)[0] + '.';

  const prefixMap: Record<string, string> = {
    critical: '🔴',
    high: '🟡',
    recommended: '📅',
  };
  const prefix = prefixMap[event.priority] ?? '📅';

  return {
    title: `${prefix} ${event.title}`,
    body: firstSentence,
    sound: event.priority === 'recommended' ? undefined : 'default',
    badge: event.priority === 'critical' ? 1 : undefined,
    data: {
      eventId: event.id,
      priority: event.priority,
      category: event.category,
      deepLink: `/event/${event.id}`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// TRIGGER TIME CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────

function getNotificationTriggerDate(
  eventDate: Date,
  notifTime: string, // 'HH:MM'
  leadTimeHours: number // 0 = morning of, 24 = day before
): Date {
  const [hours, minutes] = notifTime.split(':').map(Number);
  const trigger = new Date(eventDate);

  // Subtract lead time
  trigger.setTime(trigger.getTime() - leadTimeHours * 60 * 60 * 1000);

  // Set to user's preferred time
  trigger.setHours(hours, minutes, 0, 0);

  return trigger;
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIORITIZED EVENT SELECTION (fits within 200 limit)
// ─────────────────────────────────────────────────────────────────────────────

function selectEventsToSchedule(events: CalendarEvent[]): CalendarEvent[] {
  const now = new Date();
  const in30Days = new Date(now.getTime() + 30 * MS_PER_DAY);
  const in14Days = new Date(now.getTime() + 14 * MS_PER_DAY);

  // Only future, incomplete events
  const upcoming = events.filter(e => !e.completed && new Date(e.date) > now);

  // Priority buckets
  const critical = upcoming.filter(e => e.priority === 'critical');
  const high = upcoming.filter(e => e.priority === 'high' && new Date(e.date) <= in30Days);
  const recommended = upcoming.filter(e => e.priority === 'recommended' && new Date(e.date) <= in14Days);

  // Combine, respecting 200 limit
  const selected: CalendarEvent[] = [];
  for (const bucket of [critical, high, recommended]) {
    for (const event of bucket) {
      if (selected.length >= MAX_SCHEDULED) break;
      selected.push(event);
    }
    if (selected.length >= MAX_SCHEDULED) break;
  }

  if (upcoming.length > selected.length) {
    console.warn(
      `[Notifications] ${upcoming.length} events to schedule but limit is ${MAX_SCHEDULED}. ` +
      `Scheduled ${selected.length} (${critical.length} critical, ${high.length} high, ${recommended.length} recommended).`
    );
  }

  return selected;
}

// ─────────────────────────────────────────────────────────────────────────────
// SPECIAL NOTIFICATIONS (not tied to a calendar event)
// ─────────────────────────────────────────────────────────────────────────────

export const SPECIAL_NOTIFICATIONS = {
  temperatureDrop: {
    title: '🌡️ Temperature drop detected',
    body: 'Labour may begin within 12–24 hours. Prepare your whelping kit now.',
    deepLink: '/library/temperature',
  },
  dueDateApproaching: (daysLeft: number) => ({
    title: `🐶 Due date in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`,
    body: 'Make sure your whelping kit is ready and your vet is on standby.',
    deepLink: '/library/birth-guide',
  }),
  eclampsiaRisk: {
    title: '⚠️ Eclampsia risk period begins today',
    body: 'Small breeds are at highest risk weeks 2–5. Know the signs: trembling, stiff gait, seizures = emergency vet now.',
    deepLink: '/library/emergency',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────────────────────────────────────

export function useNotifications() {
  const [isLoading, setIsLoading] = useState(false);
  const notifTime = useUserStore((s) => s.notifTime);
  const notifLeadTimeHours = useUserStore((s) => s.notifLeadTimeHours);
  const tier = useUserStore((s) => s.subscriptionTier);

  /** Request notification permissions — only call after Pro upgrade */
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    return requestPermissionsAsync();
  }, []);

  /** Schedule a single event notification */
  const scheduleEventNotification = useCallback(async (event: CalendarEvent): Promise<string | null> => {
    if (Platform.OS === 'web') return null;
    if (tier === 'free') return null; // Free tier: no notifications

    const triggerDate = getNotificationTriggerDate(
      new Date(event.date),
      notifTime,
      notifLeadTimeHours
    );

    // Don't schedule if trigger is in the past
    if (triggerDate <= new Date()) return null;

    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: buildNotificationContent(event),
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
        identifier: `event_${event.id}`,
      });
      return id;
    } catch (err) {
      console.warn(`[Notifications] Failed to schedule ${event.id}:`, err);
      return null;
    }
  }, [notifTime, notifLeadTimeHours, tier]);

  /** Schedule notifications for all events (priority-limited to 200) */
  const scheduleAllNotifications = useCallback(async (events: CalendarEvent[]): Promise<number> => {
    if (Platform.OS === 'web') return 0;
    if (tier === 'free') return 0;

    setIsLoading(true);
    try {
      // Cancel existing first
      await Notifications.cancelAllScheduledNotificationsAsync();

      const selected = selectEventsToSchedule(events);
      let scheduled = 0;

      for (const event of selected) {
        const id = await scheduleEventNotification(event);
        if (id) scheduled++;
      }

      console.log(`[Notifications] Scheduled ${scheduled}/${selected.length} notifications`);
      return scheduled;
    } finally {
      setIsLoading(false);
    }
  }, [tier, scheduleEventNotification]);

  /** Cancel a specific event's notification */
  const cancelNotification = useCallback(async (eventId: string) => {
    if (Platform.OS === 'web') return;
    try {
      await Notifications.cancelScheduledNotificationAsync(`event_${eventId}`);
    } catch {
      // Notification may not exist — that's fine
    }
  }, []);

  /** Cancel all scheduled notifications */
  const cancelAllNotifications = useCallback(async () => {
    if (Platform.OS === 'web') return;
    await Notifications.cancelAllScheduledNotificationsAsync();
  }, []);

  /** Reschedule all — cancel then reschedule with current preferences */
  const rescheduleAll = useCallback(async (events: CalendarEvent[]): Promise<number> => {
    return scheduleAllNotifications(events);
  }, [scheduleAllNotifications]);

  /** Schedule a special (non-event) notification */
  const scheduleSpecialNotification = useCallback(async (
    content: { title: string; body: string; deepLink: string },
    triggerDate?: Date
  ): Promise<string | null> => {
    if (Platform.OS === 'web') return null;
    if (tier === 'free') return null;

    try {
      const trigger = triggerDate && triggerDate > new Date()
        ? { type: Notifications.SchedulableTriggerInputTypes.DATE as const, date: triggerDate }
        : null; // null = immediate

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: content.title,
          body: content.body,
          sound: 'default',
          data: { deepLink: content.deepLink, priority: 'critical' },
        },
        trigger,
      });
      return id;
    } catch (err) {
      console.warn('[Notifications] Failed to schedule special notification:', err);
      return null;
    }
  }, [tier]);

  /** Get all currently scheduled notifications (for debugging) */
  const getScheduledNotifications = useCallback(async () => {
    if (Platform.OS === 'web') return [];
    return Notifications.getAllScheduledNotificationsAsync();
  }, []);

  return {
    isLoading,
    requestPermissions,
    scheduleEventNotification,
    scheduleAllNotifications,
    cancelNotification,
    cancelAllNotifications,
    rescheduleAll,
    scheduleSpecialNotification,
    getScheduledNotifications,
  };
}
