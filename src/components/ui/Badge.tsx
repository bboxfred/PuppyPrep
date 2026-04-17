import { View, StyleSheet } from 'react-native';
import { PriorityColors, Radius, Spacing, type PriorityLevel } from '@/constants/design-system';
import { Text } from './Text';

interface BadgeProps {
  priority: PriorityLevel;
}

export function Badge({ priority }: BadgeProps) {
  const config = PriorityColors[priority];

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text
        variant="caption"
        weight="bold"
        color={config.text}
        style={styles.label}
      >
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs + 1,
    borderRadius: Radius.sm,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
