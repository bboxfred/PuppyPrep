import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '@/constants/design-system';

type TextVariant = 'display' | 'heading' | 'subheading' | 'body' | 'caption' | 'mono';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy';
  color?: string;
}

/**
 * Font family mapping — uses loaded Google Fonts.
 * Nunito for display/headings (warm, rounded, distinctive).
 * Quicksand for body/captions (geometric, clean, modern).
 */
const variantMap: Record<TextVariant, { fontFamily: string; fontSize: number; color: string }> = {
  display:    { fontFamily: Fonts.display,    fontSize: FontSizes['3xl'], color: Colors.textPrimary },
  heading:    { fontFamily: Fonts.heading,    fontSize: FontSizes.xl,     color: Colors.textPrimary },
  subheading: { fontFamily: Fonts.subheading, fontSize: FontSizes.lg,     color: Colors.textPrimary },
  body:       { fontFamily: Fonts.body,       fontSize: FontSizes.base,   color: Colors.textPrimary },
  caption:    { fontFamily: Fonts.caption,    fontSize: FontSizes.sm,     color: Colors.textSecondary },
  mono:       { fontFamily: Fonts.mono,       fontSize: FontSizes.sm,     color: Colors.textPrimary },
};

/** Maps weight names to specific font files (Nunito for headings, Quicksand for body) */
const weightToNunito: Record<string, string> = {
  regular: 'Nunito-Regular', medium: 'Nunito-Medium', semibold: 'Nunito-SemiBold',
  bold: 'Nunito-Bold', heavy: 'Nunito-ExtraBold',
};
const weightToQuicksand: Record<string, string> = {
  regular: 'Quicksand-Regular', medium: 'Quicksand-Medium', semibold: 'Quicksand-SemiBold',
  bold: 'Quicksand-Bold', heavy: 'Quicksand-Bold',
};

function resolveFont(variant: TextVariant, weight?: string): string {
  const base = variantMap[variant].fontFamily;
  if (!weight) return base;

  // Determine which family this variant uses
  const isNunito = base.startsWith('Nunito');
  const map = isNunito ? weightToNunito : weightToQuicksand;
  return map[weight] ?? base;
}

export function Text({ variant = 'body', weight, color, style, ...props }: TextProps) {
  const base = variantMap[variant];
  const fontFamily = resolveFont(variant, weight);

  return (
    <RNText
      style={[
        {
          fontFamily,
          fontSize: base.fontSize,
          color: color ?? base.color,
        },
        style,
      ]}
      {...props}
    />
  );
}
