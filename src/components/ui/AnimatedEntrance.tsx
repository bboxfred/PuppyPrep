/**
 * ANIMATED ENTRANCE — Staggered fade+slide for child elements.
 * Wrap content sections for a polished reveal effect.
 */
import { type ReactNode } from 'react';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down';
  distance?: number;
}

export function AnimatedEntrance({
  children,
  delay = 0,
  direction = 'up',
  distance = 20,
}: Props) {
  const entering = direction === 'up'
    ? FadeInUp.delay(delay).duration(500).springify().damping(18)
    : FadeInDown.delay(delay).duration(500).springify().damping(18);

  return (
    <Animated.View entering={entering}>
      {children}
    </Animated.View>
  );
}
