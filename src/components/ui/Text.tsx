import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { Colors, Fonts, FontSizes } from '@/constants/design-system';

type TextVariant = 'display' | 'heading' | 'subheading' | 'body' | 'caption' | 'mono';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy';
  color?: string;
}

/**
 * Field Journal typography:
 *   display/heading → Young Serif (serif, literary)
 *   subheading/body/caption → DM Sans (clean, modern)
 *   Never mix: serif only on titles, sans only on body.
 *
 * Young Serif only ships as 400 Regular, so weight prop is ignored for display/heading
 * (serif weight variance comes from size, not font file).
 */
const variantMap: Record<TextVariant, { fontFamily: string; fontSize: number; color: string; isSerif: boolean }> = {
  display:    { fontFamily: Fonts.display,    fontSize: FontSizes['3xl'], color: Colors.textPrimary,   isSerif: true  },
  heading:    { fontFamily: Fonts.heading,    fontSize: FontSizes.xl,     color: Colors.textPrimary,   isSerif: true  },
  subheading: { fontFamily: Fonts.bodySemi,   fontSize: FontSizes.lg,     color: Colors.textPrimary,   isSerif: false },
  body:       { fontFamily: Fonts.body,       fontSize: FontSizes.base,   color: Colors.textPrimary,   isSerif: false },
  caption:    { fontFamily: Fonts.caption,    fontSize: FontSizes.sm,     color: Colors.textSecondary, isSerif: false },
  mono:       { fontFamily: Fonts.mono,       fontSize: FontSizes.sm,     color: Colors.textPrimary,   isSerif: false },
};

/** Map weight names to DM Sans file names. Young Serif ignores weight (only ships Regular). */
const dmSansWeight: Record<string, string> = {
  regular:  'DMSans-Regular',
  medium:   'DMSans-Medium',
  semibold: 'DMSans-SemiBold',
  bold:     'DMSans-Bold',
  heavy:    'DMSans-Bold',
};

function resolveFont(variant: TextVariant, weight?: string): string {
  const base = variantMap[variant];
  if (base.isSerif) return base.fontFamily; // Young Serif has only Regular
  if (!weight) return base.fontFamily;
  return dmSansWeight[weight] ?? base.fontFamily;
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
