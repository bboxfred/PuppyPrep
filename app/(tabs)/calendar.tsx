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
import { Text } from '@/components/ui/Text';
import { DayBottomSheet } from '@/components/calendar/DayBottomSheet';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';
import { useCalendarStore } from '@/store/useCalendarStore';
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
  const today = todayKey();

  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [sheetOpen, setSheetOpen] = useState(false);

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

    // Today ring
    if (!marks[today]) marks[today] = {};
    marks[today].today = true;

    return marks;
  }, [eventsByDate, selectedDate, today]);

  // Events for selected day
  const selectedEvents = useMemo(() => {
    return eventsByDate.get(selectedDate) ?? [];
  }, [eventsByDate, selectedDate]);

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
    setSheetOpen(true);
  }, []);

  const handleGoToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
    setSelectedDate(today);
  }, [today]);

  // Week strip: 7 days centered on selected date
  const weekDays = useMemo(() => {
    const center = new Date(selectedDate + 'T00:00:00');
    const dayOfWeek = center.getDay();
    const startOfWeek = new Date(center);
    startOfWeek.setDate(center.getDate() - dayOfWeek);

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

        {/* ── Month Calendar ── */}
        <Calendar
          current={`${currentMonth}-01`}
          onDayPress={handleDayPress}
          onMonthChange={(month) => setCurrentMonth(`${month.year}-${String(month.month).padStart(2, '0')}`)}
          markedDates={markedDates}
          markingType="multi-dot"
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
            textDayFontFamily: 'Quicksand-Medium',
            textMonthFontFamily: 'Nunito-Bold',
            textDayHeaderFontFamily: 'Quicksand-Medium',
            textDayFontSize: 15,
            textMonthFontSize: 0, // Hide built-in month header (we have our own)
            textDayHeaderFontSize: 12,
          }}
          style={styles.calendar}
        />

        {/* ── Day Bottom Sheet ── */}
        <DayBottomSheet
          visible={sheetOpen}
          selectedDate={new Date(selectedDate + 'T00:00:00')}
          events={selectedEvents}
          onClose={() => setSheetOpen(false)}
        />
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

  // Week strip
  weekStrip: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.creamDark + '30',
  },
  weekStripContent: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    gap: 6,
  },
  weekDay: {
    width: 48,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
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

  // Calendar
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.creamDark + '20',
  },

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
