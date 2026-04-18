import { View, ViewProps, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing } from '@/constants/design-system';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

/**
 * Field Journal card:
 *   - Surface or paper background
 *   - 1px `rule` hairline border
 *   - Radius 22 (lg)
 *   - NO drop shadow (rules replace shadows for separation)
 */
export function Card({ children, style, ...props }: CardProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.rule,
    padding: Spacing.md,
  },
});
