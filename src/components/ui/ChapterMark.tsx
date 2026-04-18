/**
 * CHAPTER MARK — Field Journal step indicator
 *
 * Replaces numeric step pills ("3 / 12", progress-dots, etc.) with a serif
 * chapter mark: "Chapter 03 of 12". Terracotta number, inkFaint "of NN".
 *
 * Pure visual swap — the step state machine does NOT change.
 * Callers pass `current` and `total` — same data that backed the old pill.
 */
import { View, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/design-system';
import { Text } from './Text';

interface ChapterMarkProps {
  current: number; // 1-indexed
  total: number;
  /** Optional label — defaults to "Chapter" */
  label?: string;
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function ChapterMark({ current, total, label = 'Chapter' }: ChapterMarkProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.current}>{pad2(current)}</Text>
      <Text style={styles.of}>of {pad2(total)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  label: {
    fontFamily: Fonts.display, // Young Serif
    fontSize: 13,
    color: Colors.inkSoft,
  },
  current: {
    fontFamily: Fonts.display, // Young Serif
    fontSize: 15,
    color: Colors.terracotta,
    letterSpacing: 0.2,
  },
  of: {
    fontFamily: Fonts.display, // Young Serif
    fontSize: 13,
    color: Colors.inkFaint,
  },
});
