/**
 * PUPPIES ARRIVED CTA — gold / red hero card with subtle edge glow
 *
 * Shown on the dashboard ONLY when status = 'pregnant'. When the estimated
 * due date is still in the future it renders as a warm GOLD invitation —
 * "Puppies arrived?". Once overdue it flips to a deeper RED urgency variant.
 *
 * Animation is intentionally quiet:
 *   - A soft glowing edge ring breathes around the card every ~3s by fading
 *     an outer border opacity. No sweeping bands, no moving shapes — just a
 *     gentle "this card is alive" signal.
 */
import { useEffect } from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { ArrowRight } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';

const HERO = require('../../../assets/images/puppies-arrived-hero.png');

interface PuppiesArrivedCtaProps {
  /** true when the estimated due date is already in the past */
  isOverdue: boolean;
  onPress: () => void;
}

export function PuppiesArrivedCta({ isOverdue, onPress }: PuppiesArrivedCtaProps) {
  // Edge-glow breathing — a translucent ring around the card fades
  // between 0.4 ↔ 1.0 opacity every ~3s. Much quieter than a sweep band.
  const glow = useSharedValue(0);
  useEffect(() => {
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    );
  }, [glow]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glow.value, [0, 1], [0.35, 0.95]),
  }));

  // Colour palette differs by state
  const palette = isOverdue
    ? {
        bg: '#F5D5CE',         // warm red wash
        border: Colors.critical,
        textTitle: Colors.critical,
        textSub: '#7A2F23',
        glow: Colors.critical,
        arrow: Colors.critical,
      }
    : {
        bg: Colors.ochreBg,    // gold wash
        border: Colors.ochre,
        textTitle: '#6B4A1A',
        textSub: '#8A6A2E',
        glow: Colors.ochre,
        arrow: Colors.ochre,
      };

  const headline = isOverdue
    ? 'Overdue — puppies arrived?'
    : 'Have the puppies arrived?';
  const sub = isOverdue
    ? 'Record the birth now to unlock the full care calendar.'
    : 'Tap the moment they\'re born — we\'ll rebuild your calendar from Day 0.';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.92 }}>
      <View style={styles.glowWrap}>
        {/* Outer glow ring — breathes between 0.35 ↔ 0.95 opacity. Sits
            behind the main card via negative positioning and pointer-events
            disabled so it never interferes with the tap target. */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glowRing,
            { shadowColor: palette.glow, borderColor: palette.glow },
            glowStyle,
          ]}
        />

        <View
          style={[
            styles.card,
            {
              backgroundColor: palette.bg,
              borderColor: palette.border,
            },
          ]}
        >
          {/* Content row */}
          <View style={styles.row}>
            <View style={styles.heroWrap}>
              <Image source={HERO} style={styles.heroImage} resizeMode="contain" />
            </View>

            <View style={styles.textCol}>
              <Text style={[styles.title, { color: palette.textTitle }]}>
                {headline}
              </Text>
              <Text style={[styles.sub, { color: palette.textSub }]}>
                {sub}
              </Text>

              <View style={styles.ctaRow}>
                <Text style={[styles.ctaAction, { color: palette.arrow }]}>
                  Record Birth
                </Text>
                <ArrowRight size={16} color={palette.arrow} strokeWidth={2} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  glowWrap: {
    width: '100%',
    marginBottom: Spacing.lg,
    position: 'relative',
  },
  // Outer ring — slightly larger than the card, absolute so it sits behind.
  // Combines a colored border AND a soft shadow for a halo on native.
  // Opacity is animated.
  glowRing: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: Radius.lg + 3,
    borderWidth: 2,
    // iOS shadow (Android: falls back to the border alone — still reads)
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    // Android elevation is disabled intentionally — we want a colored glow
    // not a grey drop shadow.
  },
  card: {
    width: '100%',
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    zIndex: 1,
  },
  heroWrap: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  heroImage: {
    width: 96,
    height: 96,
  },
  textCol: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: Fonts.display, // Young Serif
    fontSize: 17,
    lineHeight: 22,
    marginBottom: 4,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 17,
    marginBottom: Spacing.sm,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ctaAction: {
    fontFamily: Fonts.bodySemi,
    fontSize: 13,
    letterSpacing: 0.2,
  },
});
