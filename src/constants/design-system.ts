/**
 * DESIGN SYSTEM — Premium teal + cream with custom typography
 *
 * Fonts: Nunito (display/headings — rounded, warm, distinctive)
 *        Quicksand (body — geometric, modern, highly legible)
 */

export const Colors = {
  primary:       '#2C6E6F',
  primaryLight:  '#3D8B8C',
  primaryDark:   '#1F5253',
  primaryDeep:   '#1A3C3D',

  cream:         '#F5E6D3',
  creamLight:    '#FFF3E8',
  creamDark:     '#E8D5BF',
  peach:         '#E8A87C',
  coral:         '#D4726A',

  gold:          '#D4A84B',
  tealLight:     '#5BA3A4',

  background:    '#F5F0EB',
  surface:       '#FFFFFF',
  surfaceTeal:   '#2C6E6F',
  surfaceDark:   '#1A3C3D',

  textPrimary:   '#1A3C3D',
  textSecondary: '#5F7A7B',
  textLight:     '#9AADAE',
  textOnDark:    '#FFFFFF',
  textOnCream:   '#4A3728',

  error:         '#D4726A',
  warning:       '#D4A84B',
  success:       '#3D8B8C',

  category: {
    health:        '#D4726A',
    nutrition:     '#D4A84B',
    socialization: '#5BA3A4',
    training:      '#2C6E6F',
    development:   '#7BC0A3',
    environment:   '#E8A87C',
  },
} as const;

export type CategoryKey = keyof typeof Colors.category;

// ── TYPOGRAPHY — Custom Google Fonts ──
export const Fonts = {
  display:     'Nunito-ExtraBold',     // Rounded, warm — headings
  heading:     'Nunito-Bold',          // Subheadings
  subheading:  'Nunito-SemiBold',
  body:        'Quicksand-Medium',     // Geometric, modern — body text
  bodyBold:    'Quicksand-Bold',
  caption:     'Quicksand-Regular',
  mono:        'monospace',
} as const;

export const FontSizes = {
  xs: 11, sm: 13, base: 15, lg: 17, xl: 20,
  '2xl': 24, '3xl': 32, '4xl': 40,
} as const;

export const FontWeights = {
  regular:  '400' as const,
  medium:   '500' as const,
  semibold: '600' as const,
  bold:     '700' as const,
  heavy:    '800' as const,
};

export const LineHeights = { tight: 1.2, normal: 1.5, relaxed: 1.75 } as const;

// ── SPACING ──
export const Spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64,
} as const;

// ── RADIUS — Extra rounded ──
export const Radius = { sm: 12, md: 18, lg: 28, xl: 36, pill: 999 } as const;

// ── SHADOWS — Colored teal shadows for depth ──
export const Shadows = {
  card: {
    shadowColor: '#1A3C3D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  elevated: {
    shadowColor: '#1A3C3D',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 8,
  },
  glow: {
    shadowColor: '#2C6E6F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;

export const PriorityColors = {
  critical: { bg: '#D4726A', text: '#FFFFFF', label: 'CRITICAL' },
  high:     { bg: '#D4A84B', text: '#FFFFFF', label: 'HIGH' },
  recommended: { bg: '#3D8B8C', text: '#FFFFFF', label: 'Recommended' },
} as const;

export type PriorityLevel = keyof typeof PriorityColors;
