import { Pressable, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing, Shadows } from '@/constants/design-system';
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

const variants: Record<ButtonVariant, { bg: string; bgPressed: string; border: string; text: string }> = {
  primary: {
    bg: Colors.primary,
    bgPressed: Colors.primaryDark,
    border: 'transparent',
    text: '#FFFFFF',
  },
  secondary: {
    bg: 'transparent',
    bgPressed: Colors.primary + '08',
    border: Colors.primary,
    text: Colors.primary,
  },
  danger: {
    bg: Colors.coral,
    bgPressed: '#C06058',
    border: 'transparent',
    text: '#FFFFFF',
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
          borderColor: v.border,
          opacity: disabled ? 0.35 : 1,
          transform: [{ scale: pressed && !disabled ? 0.96 : 1 }],
        },
        variant === 'primary' && Shadows.glow,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.text} size="small" />
      ) : (
        <Text variant="body" weight="bold" color={v.text} style={styles.label}>
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
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    letterSpacing: 0.3,
  },
});
