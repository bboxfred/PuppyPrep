/**
 * ONBOARDING SCREEN — Premium design with depth and animation
 *
 * - Gradient hero with animated illustration bubble
 * - Content card slides up over the hero with rounded corners
 * - Bottom bar with Back + Next (cream pill button)
 * - Staggered entrance animations
 */
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeInUp, FadeIn, ZoomIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Shadows } from '@/constants/design-system';

interface OnboardingScreenProps {
  headline: string;
  subtext: string;
  children: React.ReactNode;
  skipLabel?: string;
  onSkip?: () => void;
  illustration?: string;
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
  heroColor = Colors.primary,
  onNext,
  onBack,
  nextDisabled = false,
  nextLabel = 'Next',
  hideBottomBar = false,
}: OnboardingScreenProps) {
  // Compute gradient colors from hero base
  const gradientDark = heroColor + 'E6';  // slightly transparent
  const gradientLight = heroColor + '99';

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO with gradient ── */}
        <LinearGradient
          colors={[heroColor, gradientLight, heroColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          {/* Decorative floating circles */}
          <View style={[styles.floatCircle, styles.circle1]} />
          <View style={[styles.floatCircle, styles.circle2]} />
          <View style={[styles.floatCircle, styles.circle3]} />

          {/* Animated illustration bubble */}
          {illustration && (
            <Animated.View entering={ZoomIn.delay(150).duration(400).springify()} style={styles.illustrationBubble}>
              <Text style={styles.illustrationEmoji}>{illustration}</Text>
            </Animated.View>
          )}

          {/* Title on hero */}
          <Animated.View entering={FadeInUp.delay(200).duration(500)}>
            <Text style={styles.heroTitle}>{headline}</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(350).duration(500)}>
            <Text style={styles.heroSubtext}>{subtext}</Text>
          </Animated.View>
        </LinearGradient>

        {/* ── CONTENT CARD — overlaps hero ── */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.contentCard}>
          {children}
        </Animated.View>
      </ScrollView>

      {/* ── BOTTOM BAR ── */}
      {!hideBottomBar && (
        <Animated.View entering={FadeIn.delay(500).duration(400)} style={styles.bottomBar}>
          {/* Back */}
          {onBack ? (
            <Pressable onPress={onBack} style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}>
              <ArrowLeft size={18} color={Colors.primary} strokeWidth={2.5} />
              <Text variant="body" weight="semibold" color={Colors.primary}>Back</Text>
            </Pressable>
          ) : (
            <View style={{ width: 80 }} />
          )}

          {/* Skip */}
          {skipLabel && onSkip && (
            <Pressable onPress={onSkip} style={styles.skipBtn}>
              <Text variant="caption" color={Colors.textSecondary}>{skipLabel}</Text>
            </Pressable>
          )}

          {/* Next — cream pill with shadow */}
          {onNext && (
            <Pressable
              onPress={onNext}
              disabled={nextDisabled}
              style={({ pressed }) => [
                styles.nextBtn,
                nextDisabled && { opacity: 0.35 },
                pressed && !nextDisabled && { transform: [{ scale: 0.95 }] },
              ]}
            >
              <Text variant="body" weight="bold" color={Colors.textOnCream}>{nextLabel}</Text>
              <ArrowRight size={18} color={Colors.textOnCream} strokeWidth={2.5} />
            </Pressable>
          )}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: Spacing.xl },

  // ── Hero ──
  hero: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing['2xl'] + Spacing.md,
    paddingHorizontal: Spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  floatCircle: {
    position: 'absolute',
    backgroundColor: '#FFFFFF12',
    borderWidth: 1,
    borderColor: '#FFFFFF08',
  },
  circle1: { width: 200, height: 200, borderRadius: 100, top: -60, right: -40 },
  circle2: { width: 120, height: 120, borderRadius: 60, bottom: 30, left: -30 },
  circle3: { width: 80, height: 80, borderRadius: 40, top: 20, right: 40, backgroundColor: '#FFFFFF08' },

  illustrationBubble: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: '#FFFFFF30',
    borderWidth: 1.5,
    borderColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    // Glass effect shadow
    ...Shadows.glow,
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.15,
  },
  illustrationEmoji: { fontSize: 32 },
  heroTitle: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 27,
    color: '#FFFFFF',
    lineHeight: 35,
    letterSpacing: -0.3,
    marginBottom: Spacing.sm,
  },
  heroSubtext: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 14,
    color: '#FFFFFFB8',
    lineHeight: 22,
  },

  // ── Content card ──
  contentCard: {
    backgroundColor: Colors.surface,
    marginTop: -Spacing.lg,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    paddingTop: Spacing.lg + 4,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    minHeight: 320,
    // Card shadow for depth
    ...Shadows.elevated,
  },

  // ── Bottom bar — two buttons side by side, full width ──
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.creamDark + '50',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    borderWidth: 2,
    borderColor: Colors.creamDark,
    backgroundColor: Colors.surface,
    minWidth: 100,
  },
  skipBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  nextBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.cream,
    paddingVertical: 14,
    borderRadius: Radius.pill,
    ...Shadows.card,
    shadowColor: Colors.peach,
    shadowOpacity: 0.2,
  },
});
