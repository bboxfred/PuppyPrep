import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors, Radius } from '@/constants/design-system';

interface ProgressBarProps {
  progress: number;
  color?: string;
  trackColor?: string;
  height?: number;
}

export function ProgressBar({
  progress,
  color = Colors.primary,
  trackColor = Colors.primary + '15',
  height = 4,
}: ProgressBarProps) {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${clampedProgress * 100}%`, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    }),
  }));

  return (
    <View style={[styles.track, { height, backgroundColor: trackColor, borderRadius: height }]}>
      <Animated.View
        style={[
          styles.fill,
          { height, backgroundColor: color, borderRadius: height },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {},
});
