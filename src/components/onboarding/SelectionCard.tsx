/**
 * SELECTION CARD — Field Journal
 *
 * LAYOUT NOTE (critical):
 *   - Outer: `Animated.View` for the entrance animation only.
 *   - Middle: plain `Pressable` with flex-row styling. We do NOT use
 *     `Animated.createAnimatedComponent(Pressable)` here because, on React
 *     Native Web, Pressable with a function-style (`({pressed}) => [...]`)
 *     can collapse to vertical stacking under some conditions. A plain
 *     Pressable with object styles is boringly reliable.
 *   - Inner: explicit `View` with `flexDirection: 'row'` wrapping the circle
 *     indicator on the LEFT and the text on the RIGHT. This inner row is
 *     redundantly enforced (width: 100%, flexWrap: nowrap) so no parent
 *     container can accidentally squish it to a column.
 *
 * Unselected: paper bg, 1px `rule` hairline border.
 * Selected:   surface bg, 1.5px `terracotta` border, terracotta check dot.
 */
import { useState, useCallback } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, FadeInRight } from 'react-native-reanimated';
import { Text } from '@/components/ui/Text';
import { Colors, Radius, Spacing, Fonts } from '@/constants/design-system';

interface SelectionCardProps {
  /** Legacy emoji prop — accepted but not rendered (Field Journal hides emoji). */
  emoji?: string;
  title: string;
  description?: string;
  selected?: boolean;
  onPress: () => void;
  /** Legacy accent — Field Journal uses terracotta for selected state. */
  accentColor?: string;
  /** Stagger index for entrance animation */
  index?: number;
}

export function SelectionCard({
  title,
  description,
  selected = false,
  onPress,
  index = 0,
}: SelectionCardProps) {
  const SELECTED_COLOR = Colors.terracotta;
  const [pressed, setPressed] = useState(false);

  const checkAnim = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(selected ? 1 : 0, { damping: 14, stiffness: 220 }) }],
  }));

  const handlePressIn = useCallback(() => setPressed(true), []);
  const handlePressOut = useCallback(() => setPressed(false), []);

  return (
    <Animated.View
      entering={FadeInRight.delay(100 + index * 80).duration(380).springify().damping(16)}
      style={styles.animWrap}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.card,
          selected && {
            borderColor: SELECTED_COLOR,
            borderWidth: 1.5,
            backgroundColor: Colors.surface,
          },
          pressed && { transform: [{ scale: 0.98 }] },
        ]}
      >
        {/* EXPLICIT row layout — guaranteed horizontal on every platform */}
        <View style={styles.row}>
          {/* Check circle — LEFT */}
          <View style={[styles.checkOuter, selected && { borderColor: SELECTED_COLOR }]}>
            <Animated.View
              style={[styles.checkInner, { backgroundColor: SELECTED_COLOR }, checkAnim]}
            />
          </View>

          {/* Text — RIGHT (flex:1 to take remaining space) */}
          <View style={styles.textCol}>
            <Text style={styles.title}>{title}</Text>
            {description ? <Text style={styles.desc}>{description}</Text> : null}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animWrap: {
    width: '100%',
    marginBottom: 10,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.paper,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.rule,
  },
  // Dedicated row — this is the layout authority. flexDirection:row here
  // cannot be overridden by the parent Pressable or Animated wrapper.
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
  },
  textCol: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: Fonts.display, // Young Serif
    fontSize: 17,
    color: Colors.ink,
    lineHeight: 22,
  },
  desc: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.inkSoft,
    marginTop: 3,
  },
  checkOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.rule,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: 24, // explicit basis so flex can't collapse it
  },
  checkInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
