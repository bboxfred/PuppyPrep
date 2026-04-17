/**
 * SCROLL PICKER — Alarm-clock-style scrolling wheel.
 *
 * Each column is a scrollable list of values.
 * The selected value is highlighted in the center.
 * Works on both web and native.
 */
import { useRef, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  type ViewStyle,
} from 'react-native';
import { Text } from './Text';
import { Colors, Spacing, Fonts, FontSizes } from '@/constants/design-system';

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const PADDING = ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2);

interface ScrollColumnProps {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  width?: number;
}

function ScrollColumn({ items, selectedIndex, onSelect, width = 80 }: ScrollColumnProps) {
  const flatListRef = useRef<FlatList>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    if (!isScrolling.current && flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: selectedIndex * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, [selectedIndex]);

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      isScrolling.current = false;
      const y = event.nativeEvent.contentOffset.y;
      const index = Math.round(y / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      if (clamped !== selectedIndex) {
        onSelect(clamped);
      }
      // Snap to position
      flatListRef.current?.scrollToOffset({
        offset: clamped * ITEM_HEIGHT,
        animated: true,
      });
    },
    [items.length, selectedIndex, onSelect]
  );

  const handleScrollBegin = useCallback(() => {
    isScrolling.current = true;
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      const isSelected = index === selectedIndex;
      return (
        <Pressable
          onPress={() => {
            onSelect(index);
            flatListRef.current?.scrollToOffset({
              offset: index * ITEM_HEIGHT,
              animated: true,
            });
          }}
          style={styles.item}
        >
          <Text
            variant="body"
            weight={isSelected ? 'bold' : 'regular'}
            color={isSelected ? Colors.textPrimary : Colors.textSecondary + '60'}
            style={[
              styles.itemText,
              isSelected && styles.itemTextSelected,
            ]}
          >
            {item}
          </Text>
        </Pressable>
      );
    },
    [selectedIndex, onSelect]
  );

  return (
    <View style={[styles.column, { width }]}>
      <FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{ paddingVertical: PADDING }}
        onScrollBeginDrag={handleScrollBegin}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATE PICKER
// ─────────────────────────────────────────────────────────────────────────────

interface DateScrollPickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function DateScrollPicker({ value, onChange, minDate, maxDate }: DateScrollPickerProps) {
  const currentYear = new Date().getFullYear();
  // Always include at least previous year and next year so cross-year dates work
  // e.g. if today is Jan 15 2026 and mating was 90 days ago → Oct 2025
  const minYear = minDate ? Math.min(minDate.getFullYear(), currentYear - 1) : currentYear - 1;
  const maxYear = maxDate ? Math.max(maxDate.getFullYear(), currentYear) : currentYear + 1;

  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => String(minYear + i));
  const days = Array.from(
    { length: getDaysInMonth(value.getFullYear(), value.getMonth()) },
    (_, i) => String(i + 1).padStart(2, '0')
  );

  const yearIndex = value.getFullYear() - minYear;
  const monthIndex = value.getMonth();
  const dayIndex = value.getDate() - 1;

  const handleYearChange = useCallback(
    (index: number) => {
      const newYear = minYear + index;
      const maxDay = getDaysInMonth(newYear, value.getMonth());
      const newDay = Math.min(value.getDate(), maxDay);
      const d = new Date(newYear, value.getMonth(), newDay);
      d.setHours(0, 0, 0, 0);
      onChange(clampDate(d, minDate, maxDate));
    },
    [minYear, value, onChange, minDate, maxDate]
  );

  const handleMonthChange = useCallback(
    (index: number) => {
      const maxDay = getDaysInMonth(value.getFullYear(), index);
      const newDay = Math.min(value.getDate(), maxDay);
      const d = new Date(value.getFullYear(), index, newDay);
      d.setHours(0, 0, 0, 0);
      onChange(clampDate(d, minDate, maxDate));
    },
    [value, onChange, minDate, maxDate]
  );

  const handleDayChange = useCallback(
    (index: number) => {
      const d = new Date(value.getFullYear(), value.getMonth(), index + 1);
      d.setHours(0, 0, 0, 0);
      onChange(clampDate(d, minDate, maxDate));
    },
    [value, onChange, minDate, maxDate]
  );

  return (
    <View style={styles.pickerContainer}>
      {/* Selection highlight band */}
      <View style={styles.selectionBand} pointerEvents="none" />

      <View style={styles.columnsRow}>
        <ScrollColumn items={days} selectedIndex={dayIndex} onSelect={handleDayChange} width={55} />
        <ScrollColumn items={MONTHS} selectedIndex={monthIndex} onSelect={handleMonthChange} width={65} />
        <ScrollColumn items={years} selectedIndex={yearIndex} onSelect={handleYearChange} width={70} />
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TIME PICKER
// ─────────────────────────────────────────────────────────────────────────────

interface TimeScrollPickerProps {
  hour: number;    // 1–12
  minute: number;  // 0–59
  period: 'AM' | 'PM';
  onChangeHour: (hour: number) => void;
  onChangeMinute: (minute: number) => void;
  onChangePeriod: (period: 'AM' | 'PM') => void;
}

const HOURS_12 = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES_5 = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));
const PERIODS: ('AM' | 'PM')[] = ['AM', 'PM'];

export function TimeScrollPicker({
  hour,
  minute,
  period,
  onChangeHour,
  onChangeMinute,
  onChangePeriod,
}: TimeScrollPickerProps) {
  const hourIndex = hour - 1;
  const minuteIndex = Math.round(minute / 5);
  const periodIndex = period === 'AM' ? 0 : 1;

  return (
    <View style={styles.pickerContainer}>
      <View style={styles.selectionBand} pointerEvents="none" />

      <View style={styles.columnsRow}>
        <ScrollColumn
          items={HOURS_12}
          selectedIndex={hourIndex}
          onSelect={(i) => onChangeHour(i + 1)}
          width={50}
        />
        <Text variant="body" weight="bold" style={styles.colon}>:</Text>
        <ScrollColumn
          items={MINUTES_5}
          selectedIndex={minuteIndex}
          onSelect={(i) => onChangeMinute(i * 5)}
          width={50}
        />
        <ScrollColumn
          items={PERIODS}
          selectedIndex={periodIndex}
          onSelect={(i) => onChangePeriod(i === 0 ? 'AM' : 'PM')}
          width={55}
        />
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function clampDate(date: Date, min?: Date, max?: Date): Date {
  if (min && date < min) return new Date(min);
  if (max && date > max) return new Date(max);
  return date;
}

const styles = StyleSheet.create({
  pickerContainer: {
    height: PICKER_HEIGHT,
    overflow: 'hidden',
    borderRadius: 22,
    backgroundColor: Colors.surfaceDark,
    position: 'relative',
    // Depth
    shadowColor: '#1A3C3D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  selectionBand: {
    position: 'absolute',
    top: PADDING,
    left: 12,
    right: 12,
    height: ITEM_HEIGHT,
    backgroundColor: Colors.cream + '25',
    borderRadius: 12,
    zIndex: 1,
  },
  columnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: PICKER_HEIGHT,
    zIndex: 2,
  },
  column: {
    height: PICKER_HEIGHT,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: FontSizes.lg,
    fontFamily: 'Nunito-Bold',
    color: Colors.cream + '50',
  },
  itemTextSelected: {
    fontSize: FontSizes.xl,
    color: Colors.cream,
  },
  colon: {
    fontSize: FontSizes['2xl'],
    fontFamily: 'Nunito-ExtraBold',
    color: Colors.cream,
    marginHorizontal: 2,
    marginTop: -2,
  },
});
