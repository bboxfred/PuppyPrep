/**
 * DOT RULE — Field Journal dotted divider
 *
 * Spec: `radial-gradient(circle, rule 1px, transparent 1px)` size 8px 2px, opacity 0.7.
 * React Native has no native gradient, so we simulate with a row of small round dots.
 * Use between vertical stacks of content where a visible separator is needed.
 */
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/design-system';

interface DotRuleProps {
  dotCount?: number;
  gap?: number;
  dotSize?: number;
  opacity?: number;
  marginVertical?: number;
}

export function DotRule({
  dotCount = 40,
  gap = 8,
  dotSize = 2,
  opacity = 0.7,
  marginVertical = 12,
}: DotRuleProps) {
  return (
    <View style={[styles.row, { marginVertical, gap }]}>
      {Array.from({ length: dotCount }).map((_, i) => (
        <View
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: Colors.rule,
            opacity,
          }}
        />
      ))}
    </View>
  );
}

/**
 * HAIRLINE — 1px solid within-card divider.
 * Use inside cards when separation is needed but a full dot rule is too loud.
 */
export function Hairline({ marginVertical = 8 }: { marginVertical?: number } = {}) {
  return <View style={[styles.hairline, { marginVertical }]} />;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  hairline: {
    height: 1,
    backgroundColor: Colors.rule,
    opacity: 0.6,
    width: '100%',
  },
});
