/**
 * ONBOARDING SCREEN — Field Journal editorial layout
 *
 * Paper background throughout. No gradient hero, no translucent bubble.
 * Optional top illustration (brand mascot) sits directly on the paper.
 * Title in Young Serif, subtext in DM Sans italic lede. Body content is a
 * simple flowing column with dot-rule separation where needed.
 *
 * Props and behaviour are unchanged from the previous visual design so every
 * existing caller works without edits. Only the rendering changes.
 */
import { View, ScrollView, Pressable, Image, StyleSheet, type ImageSourcePropType } from 'react-native';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Shadows, Fonts } from '@/constants/design-system';

interface OnboardingScreenProps {
  headline: string;
  subtext: string;
  children: React.ReactNode;
  skipLabel?: string;
  onSkip?: () => void;
  /** Emoji string for legacy / simple screens (Field Journal direction hides emojis) */
  illustration?: string;
  /** Full illustration image. Use require('../../assets/images/...') */
  illustrationImage?: ImageSourcePropType;
  /**
   * Per-screen scale override for the illustration. Default = 1.25.
   * Use values <1 to shrink, >1 to zoom in further. Useful when a specific
   * image has unusual composition (lots of whitespace, or subject is
   * naturally oversized).
   */
  illustrationScale?: number;
  /**
   * Per-screen frame height override. Default = 200. Bump to allow a taller
   * illustration area without clipping.
   */
  illustrationFrameHeight?: number;
  /** @deprecated Field Journal has a single paper canvas — this prop is ignored. */
  heroColor?: string;
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  hideBottomBar?: boolean;
}

export function OnboardingScreen({
  headline,
  subtext,
  children,
  skipLabel,
  onSkip,
  illustration,
  illustrationImage,
  illustrationScale = 1.25,
  illustrationFrameHeight = 200,
  onNext,
  onBack,
  nextDisabled = false,
  nextLabel = 'Next',
  hideBottomBar = false,
}: OnboardingScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Optional illustration — sits directly on paper, no bubble, no gradient.
            Per-screen scale + frame-height overrides so each question can dial in
            its own composition (bell smaller, weigh bigger, etc). */}
        {illustrationImage ? (
          <Animated.View
            entering={FadeIn.delay(80).duration(320)}
            style={[styles.illustrationImageWrap, { height: illustrationFrameHeight }]}
          >
            <Image
              source={illustrationImage}
              style={[styles.illustrationImage, { transform: [{ scale: illustrationScale }] }]}
              resizeMode="contain"
            />
          </Animated.View>
        ) : illustration ? (
          // Legacy emoji — still supported but rendered plain (no bubble).
          <Animated.View entering={FadeIn.delay(80).duration(320)} style={styles.emojiWrap}>
            <Text style={styles.illustrationEmoji}>{illustration}</Text>
          </Animated.View>
        ) : null}

        {/* Headline — Young Serif */}
        <Animated.View entering={FadeInUp.delay(120).duration(360)}>
          <Text style={styles.headline}>{headline}</Text>
        </Animated.View>

        {/* Subtext — DM Sans italic lede */}
        <Animated.View entering={FadeInUp.delay(200).duration(360)}>
          <Text style={styles.lede}>{subtext}</Text>
        </Animated.View>

        {/* Content */}
        <Animated.View entering={FadeInDown.delay(260).duration(400)} style={styles.content}>
          {children}
        </Animated.View>
      </ScrollView>

      {/* BOTTOM BAR
          When a skip label is present we stack it ABOVE the back/next row
          (centered + italic) so it never eats horizontal space from the
          primary actions. When there's no skip, the row is just back+next
          as before. */}
      {!hideBottomBar && (
        <Animated.View entering={FadeIn.delay(320).duration(320)} style={styles.bottomBarWrap}>
          {/* Skip — stacked above the action row so it doesn't squish Next */}
          {skipLabel && onSkip && (
            <Pressable onPress={onSkip} style={styles.skipBtnTop} hitSlop={8}>
              <Text color={Colors.inkFaint} style={styles.skipLabelTop}>{skipLabel}</Text>
            </Pressable>
          )}

          <View style={styles.bottomBar}>
            {/* Back */}
            {onBack ? (
              <Pressable onPress={onBack} style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}>
                <ArrowLeft size={18} color={Colors.forest} strokeWidth={1.75} />
                <Text color={Colors.forest} style={styles.backLabel}>Back</Text>
              </Pressable>
            ) : (
              <View style={{ width: 100 }} />
            )}

            {/* Next — forest primary pill (the ONE shadow allowed).
                Text is forced to a SINGLE LINE with numberOfLines={1} —
                otherwise long labels like "Build my calendar" wrap to two
                lines and the arrow sits next to the multi-line block,
                creating a visual misalignment. adjustsFontSizeToFit lets
                the font shrink on narrow viewports instead of truncating. */}
            {onNext && (
              <Pressable
                onPress={onNext}
                disabled={nextDisabled}
                style={({ pressed }) => [
                  styles.nextBtn,
                  nextDisabled && { opacity: 0.35 },
                  pressed && !nextDisabled && { transform: [{ scale: 0.97 }] },
                ]}
              >
                <View style={styles.nextContent}>
                  <Text
                    color={Colors.paper}
                    style={styles.nextLabel}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.75}
                  >
                    {nextLabel}
                  </Text>
                  <ArrowRight size={18} color={Colors.paper} strokeWidth={1.75} />
                </View>
              </Pressable>
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paper,
  },
  scroll: { flex: 1 },
  scrollContent: {
    // Cap content width on tablet/desktop so forms, inputs, and illustrations
    // stay at a comfortable phone-ish reading width instead of stretching.
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
  },

  // Illustration — paper, no bubble, no shadow. Wrapper has overflow:hidden
  // and the image is scaled 30% so the subject fills the frame and any
  // residual paper margin / vignette is cropped off.
  illustrationImageWrap: {
    width: '100%',
    // height is now overridable per-screen via `illustrationFrameHeight`.
    // Margins tightened from previous (sm + md) to (xs + sm) to reduce
    // dead negative space above and below the subject.
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  illustrationImage: {
    width: 220,
    height: 220,
    // `transform: [{ scale }]` is now applied inline by the component from
    // the `illustrationScale` prop so each screen can override.
  },
  emojiWrap: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  illustrationEmoji: {
    fontSize: 52,
  },

  // Typography
  headline: {
    fontFamily: Fonts.display, // Young Serif
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.4,
    color: Colors.ink,
    marginBottom: Spacing.sm,
  },
  lede: {
    fontFamily: Fonts.display, // Young Serif italic
    fontStyle: 'italic',
    fontSize: 17,
    lineHeight: 26,
    color: Colors.inkSoft,
    marginBottom: Spacing.lg,
  },

  // Body content
  content: {
    marginTop: Spacing.xs,
  },

  // Bottom bar wrap — holds the optional skip row AND the action row together
  // with a single paper background + hairline top border.
  bottomBarWrap: {
    backgroundColor: Colors.paper,
    borderTopWidth: 1,
    borderTopColor: Colors.rule,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    // Slightly tighter top padding when a skip is stacked above
    paddingTop: 10,
    paddingBottom: Spacing.md,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.forest,
    backgroundColor: 'transparent',
    minWidth: 100,
  },
  backLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
  },
  // Skip stacked ABOVE the back/next row — centered and italic, caption size.
  // Tight vertical padding so it sits just above the action row with a
  // small, EQUAL gap top and bottom.
  skipBtnTop: {
    alignSelf: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingHorizontal: Spacing.md,
  },
  skipLabelTop: {
    fontFamily: Fonts.body,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 16,
  },
  // Outer pill — fixed height so centering is deterministic
  nextBtn: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.forest,
    borderRadius: Radius.pill,
    ...Shadows.primaryButton, // the ONE allowed elevation
  },
  // Inner content row — what actually holds the text + arrow. Uses
  // horizontal padding to give the text-arrow pair breathing room; the
  // flex layout guarantees both children center within the pill even when
  // font lineHeight differs between platforms.
  nextContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
  },
  nextLabel: {
    fontFamily: Fonts.display, // Young Serif label per spec
    fontSize: 15,
    lineHeight: 18, // tight lineHeight matches icon visual height (18)
    letterSpacing: 0.2,
    textAlignVertical: 'center',
    includeFontPadding: false,
    flexShrink: 1,
  },
});
