/**
 * CALENDAR PAGE
 * Google Calendar-style month view with category dots, week strip,
 * and day bottom sheet showing events sorted by priority.
 */
import { useState, useMemo, useCallback } from 'react';
import { View, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Calendar, type DateData } from 'react-native-calendars';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { EventCard } from '@/components/calendar/EventCard';
// DayBottomSheet no longer used — tasks are now shown inline on the calendar page.
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';
import { useCalendarStore } from '@/store/useCalendarStore';
import { sortByPriority, formatDateDisplay } from '@/utils/calendar-helpers';
import {
  toDateKey,
  groupEventsByDate,
  getCategoryDots,
  getExtraDotCount,
  todayKey,
} from '@/utils/calendar-helpers';
import type { CalendarEvent } from '@/data/schedule-engine/event-builder';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function CalendarScreen() {
  const events = useCalendarStore((s) => s.events);
  const markCompleted = useCalendarStore((s) => s.markCompleted);
  const markUncompleted = useCalendarStore((s) => s.markUncompleted);
  const router = useRouter();
  const today = todayKey();

  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Group events by date for the calendar markers
  const eventsByDate = useMemo(() => groupEventsByDate(events), [events]);

  // Build marked dates for react-native-calendars
  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};

    eventsByDate.forEach((dayEvents, dateKey) => {
      const dots = getCategoryDots(dayEvents);
      const extra = getExtraDotCount(dayEvents);
      const hasCriticalOverdue = dayEvents.some(e => e.priority === 'critical' && !e.completed && dateKey < today);

      marks[dateKey] = {
        dots,
        marked: true,
        selected: dateKey === selectedDate,
        selectedColor: Colors.primary + '15',
        selectedTextColor: Colors.primary,
      };
    });

    // Ensure selected date is always marked
    if (!marks[selectedDate]) {
      marks[selectedDate] = {
        selected: true,
        selectedColor: Colors.primary + '15',
        selectedTextColor: Colors.primary,
      };
    }

    // Today ring — the grey highlight already signals "today", so we strip
    // any dots for this date to keep it clean.
    if (!marks[today]) marks[today] = {};
    marks[today].today = true;
    marks[today].dots = [];
    marks[today].marked = false;

    return marks;
  }, [eventsByDate, selectedDate, today]);

  // (selected-day events now computed inline as `selectedDayEvents` below)

  // Month event count
  const monthEventCount = useMemo(() => {
    let count = 0;
    eventsByDate.forEach((dayEvents, dateKey) => {
      if (dateKey.startsWith(currentMonth)) count += dayEvents.length;
    });
    return count;
  }, [eventsByDate, currentMonth]);

  const handleDayPress = useCallback((day: DateData) => {
    setSelectedDate(day.dateString);
  }, []);

  const handleGoToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
    setSelectedDate(today);
  }, [today]);

  // Shift the selected day by ±N days. Also updates currentMonth if we
  // cross a month boundary so the month grid below follows along.
  const shiftDay = useCallback((delta: number) => {
    const current = new Date(selectedDate + 'T00:00:00');
    current.setDate(current.getDate() + delta);
    const newKey = toDateKey(current);
    setSelectedDate(newKey);
    const m = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
    if (m !== currentMonth) setCurrentMonth(m);
  }, [selectedDate, currentMonth]);

  // Events for the selected day, sorted by priority
  const selectedDayEvents = useMemo(
    () => sortByPriority(eventsByDate.get(selectedDate) ?? []),
    [eventsByDate, selectedDate]
  );

  const selectedDateObj = useMemo(
    () => new Date(selectedDate + 'T00:00:00'),
    [selectedDate]
  );

  const handleEventPress = useCallback((eventId: string) => {
    router.push(`/event/${eventId}` as any);
  }, [router]);

  const handleToggleComplete = useCallback((eventId: string, currentlyCompleted: boolean) => {
    if (currentlyCompleted) markUncompleted(eventId);
    else markCompleted(eventId);
  }, [markCompleted, markUncompleted]);

  // Week strip: 7 days — Monday-first (matches month view firstDay={1}).
  // getDay() returns 0=Sun, 1=Mon, ..., 6=Sat. Offset to Monday:
  //   Sunday (0)   → go back 6 days (to previous Monday)
  //   Others (1-6) → go back dayOfWeek - 1 days
  const weekDays = useMemo(() => {
    const center = new Date(selectedDate + 'T00:00:00');
    const dayOfWeek = center.getDay();
    const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const startOfWeek = new Date(center);
    startOfWeek.setDate(center.getDate() - mondayOffset);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const key = toDateKey(d);
      const dayEvents = eventsByDate.get(key) ?? [];
      const dots = getCategoryDots(dayEvents);
      return { date: d, key, dayName: DAYS_SHORT[d.getDay()], dayNum: d.getDate(), dots, isToday: key === today, isSelected: key === selectedDate };
    });
  }, [selectedDate, eventsByDate, today]);

  // Parse month for header
  const [headerYear, headerMonth] = currentMonth.split('-').map(Number);
  const monthName = MONTHS[headerMonth - 1];

  // No events at all
  if (events.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.emptyAll}>
          <Text style={styles.emptyAllEmoji}>📅</Text>
          <Text variant="heading" style={styles.emptyAllTitle}>Your calendar is being built...</Text>
          <Text variant="body" color={Colors.textSecondary} style={styles.emptyAllText}>
            Complete the onboarding to generate your personalised care calendar.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* ── Calendar Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text variant="heading" weight="heavy" style={styles.monthTitle}>
              {monthName} {headerYear}
            </Text>
            {monthEventCount > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{monthEventCount}</Text>
              </View>
            )}
          </View>
          <View style={styles.headerRight}>
            <Pressable onPress={handleGoToToday} style={styles.todayBtn}>
              <CalendarDays size={16} color={Colors.primary} strokeWidth={2} />
              <Text variant="caption" weight="semibold" color={Colors.primary}>Today</Text>
            </Pressable>
          </View>
        </View>

        {/* ── Week Strip ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekStrip} contentContainerStyle={styles.weekStripContent}>
          {weekDays.map((day) => (
            <Pressable
              key={day.key}
              onPress={() => { setSelectedDate(day.key); setSheetOpen(true); }}
              style={[styles.weekDay, day.isSelected && styles.weekDaySelected, day.isToday && !day.isSelected && styles.weekDayToday]}
            >
              <Text variant="caption" color={day.isSelected ? Colors.textOnDark : Colors.textSecondary} style={styles.weekDayName}>
                {day.dayName}
              </Text>
              <Text variant="body" weight={day.isSelected ? 'bold' : 'medium'} color={day.isSelected ? Colors.textOnDark : Colors.textPrimary}>
                {day.dayNum}
              </Text>
              {/* Category dots */}
              <View style={styles.weekDots}>
                {day.dots.map((dot, i) => (
                  <View key={i} style={[styles.weekDot, { backgroundColor: day.isSelected ? '#FFFFFF80' : dot.color }]} />
                ))}
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* ── SELECTED DAY TASK LIST ── */}
        {/* Arrows flank the task area directly. No date header above — the week
            strip already shows which day is selected. Arrows are bare chevrons
            (no circular background) per feedback. */}
        <View style={styles.dayRow}>
          <Pressable onPress={() => shiftDay(-1)} style={styles.arrowBtn} hitSlop={14}>
            <ChevronLeft size={28} color={Colors.forest} strokeWidth={1.75} />
          </Pressable>
          <ScrollView
            style={styles.daySection}
            contentContainerStyle={styles.daySectionContent}
            showsVerticalScrollIndicator={false}
          >
            {selectedDayEvents.length === 0 ? (
              <View style={styles.emptyDayCard}>
                <Text style={styles.emptyDayTitle}>No tasks this day</Text>
                <Text style={styles.emptyDaySub}>Tap the arrows to see another day, or pick a date from the calendar below.</Text>
              </View>
            ) : (
              selectedDayEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => handleEventPress(event.id)}
                  onToggleComplete={() => handleToggleComplete(event.id, event.completed)}
                />
              ))
            )}
          </ScrollView>
          <Pressable onPress={() => shiftDay(1)} style={styles.arrowBtn} hitSlop={14}>
            <ChevronRight size={28} color={Colors.forest} strokeWidth={1.75} />
          </Pressable>
        </View>

        {/* ── Month Calendar — at the bottom, tap any day to select it ── */}
        <View style={styles.calendarWrap}>
        <Calendar
          current={`${currentMonth}-01`}
          onDayPress={handleDayPress}
          onMonthChange={(month) => setCurrentMonth(`${month.year}-${String(month.month).padStart(2, '0')}`)}
          markedDates={markedDates}
          markingType="multi-dot"
          firstDay={1}
          hideArrows={false}
          renderArrow={(direction) => (
            direction === 'left'
              ? <ChevronLeft size={20} color={Colors.textPrimary} />
              : <ChevronRight size={20} color={Colors.textPrimary} />
          )}
          theme={{
            calendarBackground: Colors.surface,
            textSectionTitleColor: Colors.textSecondary,
            selectedDayBackgroundColor: Colors.primary + '15',
            selectedDayTextColor: Colors.primary,
            todayTextColor: Colors.primary,
            todayBackgroundColor: Colors.primary + '08',
            dayTextColor: Colors.textPrimary,
            textDisabledColor: Colors.textLight,
            monthTextColor: Colors.textPrimary,
            textDayFontFamily: 'DMSans-Medium',
            textMonthFontFamily: 'YoungSerif-Regular',
            textDayHeaderFontFamily: 'DMSans-Medium',
            textDayFontSize: 15,
            textMonthFontSize: 0,
            textDayHeaderFontSize: 12,
          }}
          style={styles.calendar}
        />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.surface,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  monthTitle: { fontSize: 22 },
  countBadge: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  countText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  headerRight: { flexDirection: 'row', gap: Spacing.sm },
  todayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary + '08',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },

  // Week strip — compact top-aligned row. Explicit height keeps the
  // horizontal ScrollView from filling the viewport on web.
  weekStrip: {
    height: 74,
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
  },
  weekStripContent: {
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
    gap: 6,
    alignItems: 'flex-start',
  },
  weekDay: {
    width: 48,
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
  },
  weekDaySelected: {
    backgroundColor: Colors.primary,
  },
  weekDayToday: {
    borderWidth: 1.5,
    borderColor: Colors.primary + '30',
  },
  weekDayName: { fontSize: 11, marginBottom: 2 },
  weekDots: { flexDirection: 'row', gap: 3, marginTop: 4, height: 6 },
  weekDot: { width: 5, height: 5, borderRadius: 3 },

  // Day row — arrows flank the task area. `alignItems: 'center'` vertically
  // centers both the arrows and the task content in the available space.
  dayRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.paper,
  },
  arrowBtn: {
    width: 40,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    // No circle, no background, no border — just a bare chevron.
  },
  daySection: {
    flex: 1,
    // Don't let the ScrollView expand to fill height; let the content
    // dictate height so the whole row can be vertically centered by the
    // parent `alignItems: 'center'`.
    maxHeight: '100%',
  },
  daySectionContent: {
    paddingHorizontal: 4,
    paddingVertical: Spacing.xs + 2,
    // flexGrow:1 plus justifyContent:center centers small content vertically
    // when there's only one task card (or the empty-state card).
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyDayCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.rule,
    padding: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  emptyDayTitle: {
    fontFamily: Fonts.display,
    fontSize: 17,
    color: Colors.ink,
    marginBottom: 4,
  },
  emptyDaySub: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.inkSoft,
    textAlign: 'center',
    lineHeight: 19,
  },

  // Month Calendar — now pinned at the bottom of the screen (not flexed).
  calendarWrap: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.rule,
  },
  calendar: {},

  // Empty state (no events at all)
  emptyAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emptyAllEmoji: { fontSize: 56, marginBottom: Spacing.lg },
  emptyAllTitle: { textAlign: 'center', marginBottom: Spacing.sm },
  emptyAllText: { textAlign: 'center', lineHeight: 22 },
});
