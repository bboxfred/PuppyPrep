/**
 * WIDGET SETUP CARD
 *
 * One-time card shown on the dashboard after onboarding, guiding the
 * user to add the Puppy Prep widget to their home screen. Dismissed
 * when the user confirms they've added it.
 *
 * Tech note: Android does support programmatic widget pinning via
 * `AppWidgetManager.requestPinAppWidget()`, but the library we use
 * (`react-native-android-widget`) does not expose this API. A real
 * one-tap pin flow would require a custom Expo module (~50 lines of
 * Kotlin + a config plugin). For v1 we show a guided-placement
 * experience with illustrated steps — visually clean, low friction,
 * and upgradable to true one-tap later without changing this card.
 */
import { useState } from 'react';
import { View, Pressable, StyleSheet, Platform, Linking } from 'react-native';
import { LayoutGrid, X } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';
import { WidgetSetupModal } from './WidgetSetupModal';
import { useUserStore } from '@/store/useUserStore';
import { useWidgetStatus } from '@/hooks/useWidgetStatus';

export function WidgetSetupCard() {
  const dismissed = useUserStore((s) => s.widgetSetupDismissed);
  const setDismissed = useUserStore((s) => s.setWidgetSetupDismissed);
  const [modalOpen, setModalOpen] = useState(false);
  const { isPlaced, canPin, requestPin } = useWidgetStatus();

  // Not Android → hide entirely (widget only exists on Android)
  if (Platform.OS !== 'android') return null;
  // Widget is already placed → hide (no need to prompt)
  if (isPlaced) return null;
  // User explicitly dismissed the card → hide
  if (dismissed) return null;

  const handlePress = async () => {
    // Fast path: native pin is available — trigger the Android system
    // dialog directly. User gets a one-tap "Add" confirmation.
    if (canPin) {
      try {
        const ok = await requestPin();
        if (ok) return; // success — useWidgetStatus will auto-detect placement
      } catch { /* fall through to guided modal */ }
    }
    // Slow path: older Android or custom launcher that rejects pin —
    // open the visual step-by-step guide instead.
    setModalOpen(true);
  };

  return (
    <>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}
      >
        <View style={styles.iconWrap}>
          <LayoutGrid size={22} color={Colors.forest} strokeWidth={1.75} />
        </View>
        <View style={styles.textCol}>
          <Text style={styles.title}>Add Puppy Prep to your home screen</Text>
          <Text style={styles.sub}>
            See today's tasks + the whole 6-week calendar at a glance. Takes 10 seconds.
          </Text>
        </View>

        {/* Dismiss (don't nag) */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation?.();
            setDismissed(true);
          }}
          hitSlop={10}
          style={styles.dismissBtn}
        >
          <X size={16} color={Colors.inkSoft} strokeWidth={1.75} />
        </Pressable>
      </Pressable>

      <WidgetSetupModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          setDismissed(true);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.forest + '30',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  iconWrap: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.forest + '12',
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  textCol: { flex: 1, gap: 2 },
  title: {
    fontFamily: Fonts.display,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.ink,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.inkSoft,
  },
  dismissBtn: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
});
