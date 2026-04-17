/**
 * SELECTION CARD — Premium with animated entrance and selection feedback
 */
import { Pressable, View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, FadeInRight } from 'react-native-reanimated';
import { Text } from '@/components/ui/Text';
import { Colors, Radius, Spacing, Shadows } from '@/constants/design-system';

interface SelectionCardProps {
  emoji?: string;
  title: string;
  description?: string;
  selected?: boolean;
  onPress: () => void;
  accentColor?: string;
  /** Stagger index for entrance animation */
  index?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function SelectionCard({
  emoji,
  title,
  description,
  selected = false,
  onPress,
  accentColor = Colors.primary,
  index = 0,
}: SelectionCardProps) {
  const checkAnim = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(selected ? 1 : 0, { damping: 12, stiffness: 200 }) }],
  }));

  const borderAnim = useAnimatedStyle(() => ({
    borderColor: withSpring(selected ? accentColor : '#E8DDD3', { damping: 20 }) as unknown as string,
  }));

  return (
    <AnimatedPressable
      entering={FadeInRight.delay(100 + index * 80).duration(400).springify().damping(16)}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && { borderColor: accentColor, backgroundColor: Colors.creamLight },
        pressed && { transform: [{ scale: 0.97 }] },
      ]}
    >
      {/* Emoji in gradient circle */}
      {emoji && (
        <View style={[styles.emojiCircle, selected && { backgroundColor: accentColor + '20' }]}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
      )}

      {/* Text */}
      <View style={styles.textCol}>
        <Text variant="body" weight={selected ? 'bold' : 'medium'} color={Colors.textPrimary}>
          {title}
        </Text>
        {description && (
          <Text variant="caption" color={Colors.textSecondary} style={styles.desc}>
            {description}
          </Text>
        )}
      </View>

      {/* Animated check circle */}
      <View style={[styles.checkOuter, selected && { borderColor: accentColor }]}>
        <Animated.View style={[styles.checkInner, { backgroundColor: accentColor }, checkAnim]}>
          <Text style={styles.checkMark}>✓</Text>
        </Animated.View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E8DDD3',
    ...Shadows.card,
  },
  emojiCircle: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: Colors.cream + '80',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  emoji: { fontSize: 24 },
  textCol: { flex: 1 },
  desc: { marginTop: 3, fontSize: 13, lineHeight: 19 },
  checkOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2.5,
    borderColor: Colors.creamDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  checkInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { color: '#FFF', fontSize: 10, fontWeight: '800' },
});
