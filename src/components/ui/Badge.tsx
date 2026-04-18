import { View, StyleSheet } from 'react-native';
import { PriorityColors, Radius, Spacing, Fonts, type PriorityLevel } from '@/constants/design-system';
import { Text } from './Text';

interface BadgeProps {
  priority: PriorityLevel;
}

/**
 * Field Journal tag/chip:
 *   - Pill shape
 *   - Bg = token color @ ~15% alpha
 *   - Fg = full token color
 *   - Label: DM Sans 9.5/700, 1.4 tracking, uppercase
 */
export function Badge({ priority }: BadgeProps) {
  const config = PriorityColors[priority];
  // 15% alpha of bg color
  const tintBg = hexWithAlpha(config.bg, 0.15);

  return (
    <View style={[styles.badge, { backgroundColor: tintBg }]}>
      <Text color={config.bg} style={styles.label}>
        {config.label}
      </Text>
    </View>
  );
}

function hexWithAlpha(hex: string, alpha: number): string {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `${hex}${a}`;
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: Fonts.bodyBold,
    fontSize: 9.5,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
});
