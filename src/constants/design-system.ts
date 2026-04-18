/**
 * DESIGN SYSTEM — Field Journal
 *
 * Warm paper backgrounds, serif headlines, dotted rules, chapter-numbered steps.
 * Forest green primary actions. Terracotta is editorial only (never a primary fill).
 *
 * Fonts: Young Serif (display/headings — literary, editorial)
 *        DM Sans (body/UI — clean, data-friendly)
 *
 * Token names are preserved from the previous theme where they map; values
 * have been migrated to Field Journal. Additional semantic tokens (paper, ink,
 * forest, terracotta, rule, ochre, moss, critical) live alongside for clarity.
 */

export const Colors = {
  // ── Primary action / nav active (FOREST — not terracotta) ──
  primary:       '#2D4A32', // forest
  primaryLight:  '#4A6E51', // forestLight
  primaryDark:   '#1E3422', // forestDeep
  primaryDeep:   '#1E3422', // forestDeep (alias)

  // ── Foundation (paper) ──
  paper:         '#F5EDE0',
  paperDark:     '#ECE1CE',
  surface:       '#FCF7EC',
  surfaceAlt:    '#F9F1E0',

  // ── Legacy cream token names — mapped into paper range ──
  cream:         '#F5EDE0',
  creamLight:    '#FCF7EC',
  creamDark:     '#ECE1CE',
  peach:         '#E9B99D', // terracottaSoft
  coral:         '#C05B3F', // terracotta

  gold:          '#C89B4A', // ochre
  tealLight:     '#8FA777', // moss (replaces old teal accent)

  background:    '#F5EDE0', // paper — NEVER pure white
  surfaceTeal:   '#2D4A32', // forest (legacy name)
  surfaceDark:   '#1E3422', // forestDeep

  // ── Ink (text) ──
  ink:           '#1E2A1F',
  inkSoft:       '#4C5A4E',
  inkFaint:      '#8A9489',
  textPrimary:   '#1E2A1F', // ink
  textSecondary: '#4C5A4E', // inkSoft
  textLight:     '#8A9489', // inkFaint
  textOnDark:    '#F5EDE0', // paper on dark
  textOnCream:   '#1E2A1F', // ink on paper

  // ── Forest (primary action family) ──
  forest:        '#2D4A32',
  forestDeep:    '#1E3422',
  forestLight:   '#4A6E51',

  // ── Terracotta (editorial accent — NEVER primary fill) ──
  terracotta:     '#C05B3F',
  terracottaSoft: '#E9B99D',
  terracottaBg:   '#F2D9C6',

  // ── Moss (success, socializing) ──
  moss:          '#8FA777',
  mossLight:     '#B5C79F',
  mossBg:        '#E0E8D1',

  // ── Ochre (warning, nutrition) ──
  ochre:         '#C89B4A',
  ochreBg:       '#EED9AD',

  // ── Critical (error, health) ──
  critical:      '#9E3B2C',
  criticalBg:    '#EED1C4',

  // ── Rules / borders / dividers ──
  rule:          '#C9B896',
  ruleSoft:      '#DCCBA8',
  divider:       '#D4C4A3',

  // ── System aliases (legacy names) ──
  error:         '#9E3B2C', // critical
  warning:       '#C89B4A', // ochre
  success:       '#8FA777', // moss

  category: {
    health:        '#9E3B2C', // critical
    nutrition:     '#C89B4A', // ochre
    socialization: '#8FA777', // moss
    training:      '#6A4A78', // (kept — distinct from other categories; purple range)
    development:   '#6A4A78', // purple (matches tokens.json)
    environment:   '#2D4A32', // forest
  },
} as const;

export type CategoryKey = keyof typeof Colors.category;

// ── TYPOGRAPHY — Young Serif (display) + DM Sans (body/UI) ──
// Token NAMES preserved so screens that reference Fonts.display, Fonts.body etc.
// keep working. Values swapped to new font family.
export const Fonts = {
  display:     'YoungSerif-Regular',     // Serif — titles, chapter marks, ledes
  heading:     'YoungSerif-Regular',     // Serif for all headlines
  subheading:  'DMSans-SemiBold',        // Sans for sub-section headers
  body:        'DMSans-Regular',         // Sans — body, UI labels
  bodyBold:    'DMSans-Bold',            //
  bodyMedium:  'DMSans-Medium',          //
  bodySemi:    'DMSans-SemiBold',        //
  caption:     'DMSans-Regular',         // Sans captions
  eyebrow:     'DMSans-Bold',            // Uppercase eyebrow labels
  mono:        'ui-monospace',
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
  heavy:    '700' as const, // DM Sans caps at 700; alias for compat
};

export const LineHeights = { tight: 1.1, normal: 1.55, relaxed: 1.75 } as const;

// ── SPACING ──
export const Spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64,
} as const;

// ── RADIUS — Field Journal: sm:10 md:16 lg:22 xl:28 pill:999 ──
export const Radius = { sm: 10, md: 16, lg: 22, xl: 28, pill: 999 } as const;

// ── SHADOWS — Field Journal: only primary button is allowed to elevate ──
// Legacy shadow tokens resolve to empty styles so existing consumers don't break.
// Use `Shadows.primaryButton` for the ONE exception (forest pill buttons).
const EMPTY_SHADOW = {
  shadowColor: 'transparent',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
} as const;

export const Shadows = {
  // Primary button gets the one allowed elevation
  primaryButton: {
    shadowColor: '#1E3422', // forestDeep
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 6,
  },
  // Legacy tokens — resolved to no-op to preserve API
  card:     EMPTY_SHADOW,
  elevated: EMPTY_SHADOW,
  glow:     EMPTY_SHADOW,
} as const;

// ── MOTION — Field Journal easing + durations ──
export const Motion = {
  easing: 'cubic-bezier(0.2, 0.6, 0.2, 1)',
  duration: { fast: 180, base: 240, slow: 320 },
} as const;

// Priority label strings PRESERVED from existing theme (no functional copy changes).
// Only colors are updated to Field Journal critical/ochre/moss.
export const PriorityColors = {
  critical:    { bg: '#9E3B2C', text: '#F5EDE0', label: 'CRITICAL' },
  high:        { bg: '#C89B4A', text: '#F5EDE0', label: 'HIGH' },
  recommended: { bg: '#8FA777', text: '#F5EDE0', label: 'Recommended' },
} as const;

export type PriorityLevel = keyof typeof PriorityColors;
