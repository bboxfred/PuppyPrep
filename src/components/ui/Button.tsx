import { Pressable, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing, Shadows, Fonts } from '@/constants/design-system';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

/**
 * Field Journal button rules:
 * - Pill (radius 999)
 * - Primary: forest bg, paper text, serif label, the ONE allowed shadow
 * - Ghost/secondary: 1.5px forest outline, forest label, no shadow
 * - Danger: critical bg, paper text, no shadow
 * - Never terracotta fill.
 */
const variants: Record<ButtonVariant, { bg: string; bgPressed: string; border: string; text: string; borderWidth: number }> = {
  primary: {
    bg:        Colors.forest,
    bgPressed: Colors.forestDeep,
    border:    'transparent',
    text:      Colors.paper,
    borderWidth: 0,
  },
  secondary: {
    bg:        'transparent',
    bgPressed: Colors.forest + '12',
    border:    Colors.forest,
    text:      Colors.forest,
    borderWidth: 1.5,
  },
  danger: {
    bg:        Colors.critical,
    bgPressed: '#7C2C22',
    border:    'transparent',
    text:      Colors.paper,
    borderWidth: 0,
  },
};

export function Button({
  title,
  variant = 'primary',
  onPress,
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const v = variants[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: pressed ? v.bgPressed : v.bg,
          borderColor:  v.border,
          borderWidth:  v.borderWidth,
          opacity:      disabled ? 0.35 : 1,
          transform:    [{ scale: pressed && !disabled ? 0.97 : 1 }],
        },
        variant === 'primary' && Shadows.primaryButton,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.text} size="small" />
      ) : (
        <Text variant="heading" color={v.text} style={styles.label}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  // Serif label, slight tracking, 17/400 per spec.
  label: {
    fontSize: 17,
    fontFamily: Fonts.display,
    letterSpacing: 0.3,
  },
});
