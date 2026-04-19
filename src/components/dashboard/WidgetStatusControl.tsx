/**
 * WIDGET STATUS CONTROL
 *
 * Pill-shaped toggle at the bottom of the dashboard showing whether
 * the home-screen widget is currently placed.
 *
 *   ON  state: cream pill, green check, "Home widget — ON"
 *              Tap → explainer modal (user must remove manually on Android)
 *   OFF state: forest pill, plus icon, "Home widget — OFF · tap to add"
 *              Tap → native pin dialog (via custom expo-widget-pin module)
 *                    Fallback to WidgetSetupModal guided flow if native
 *                    pinning isn't available on this launcher / device.
 *
 * Auto-detection: uses useWidgetStatus() which refreshes on app foreground
 * and polls for 4s after a pin request so the UI updates as soon as the
 * user taps "Add" in the launcher's dialog.
 */
import { useState } from 'react';
import { View, Pressable, Alert, StyleSheet, Platform } from 'react-native';
import { LayoutGrid, Check, Plus } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';
import { useWidgetStatus } from '@/hooks/useWidgetStatus';
import { WidgetSetupModal } from './WidgetSetupModal';

export function WidgetStatusControl() {
  const { isPlaced, canPin, requestPin, refresh } = useWidgetStatus();
  const [fallbackOpen, setFallbackOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  // Hide the whole control off-Android — widget doesn't exist on iOS / web
  if (Platform.OS !== 'android') return null;

  const handleTap = async () => {
    if (isPlaced) {
      // Widget is placed — user wants to remove it. We can't do this
      // programmatically on Android (launcher owns widget lifecycle),
      // so we tell them how.
      Alert.alert(
        'Remove widget',
        "Android doesn't let apps remove widgets automatically. To remove the Puppy Prep widget:\n\n" +
          "1. Long-press it on your home screen.\n" +
          "2. Drag it up to ‘Remove’ at the top of the screen.\n\n" +
          "We'll detect it's gone the next time you open the app.",
        [
          { text: 'Got it', style: 'default' },
          { text: 'Refresh status', onPress: refresh },
        ]
      );
      return;
    }

    // Widget is NOT placed — trigger the native pin dialog if supported
    if (canPin) {
      setBusy(true);
      try {
        const ok = await requestPin();
        if (!ok) {
          // Native call returned false — fall back to guided modal
          setFallbackOpen(true);
        }
      } catch {
        setFallbackOpen(true);
      } finally {
        setBusy(false);
      }
    } else {
      // No programmatic pinning on this device / launcher — use guided modal
      setFallbackOpen(true);
    }
  };

  return (
    <>
      <Pressable
        onPress={handleTap}
        disabled={busy}
        style={({ pressed }) => [
          styles.pill,
          isPlaced ? styles.pillOn : styles.pillOff,
          pressed && { opacity: 0.88 },
          busy && { opacity: 0.6 },
        ]}
      >
        <View
          style={[
            styles.iconCircle,
            isPlaced ? styles.iconCircleOn : styles.iconCircleOff,
          ]}
        >
          {isPlaced ? (
            <Check size={16} color={Colors.paper} strokeWidth={2.5} />
          ) : (
            <Plus size={16} color={Colors.paper} strokeWidth={2.5} />
          )}
        </View>

        <View style={styles.textCol}>
          <Text
            style={[
              styles.title,
              isPlaced ? { color: Colors.forest } : { color: Colors.paper },
            ]}
          >
            {isPlaced ? 'Home widget — ON' : 'Home widget — OFF'}
          </Text>
          <Text
            style={[
              styles.sub,
              isPlaced ? { color: Colors.inkSoft } : { color: Colors.paper + 'CC' },
            ]}
          >
            {isPlaced
              ? 'Tap for details or to refresh status'
              : 'Tap to add — takes about 10 seconds'}
          </Text>
        </View>

        <LayoutGrid
          size={20}
          color={isPlaced ? Colors.forest : Colors.paper}
          strokeWidth={1.75}
        />
      </Pressable>

      {/* Guided fallback — only shown when the native pin API is not available */}
      <WidgetSetupModal
        visible={fallbackOpen}
        onClose={() => setFallbackOpen(false)}
        onConfirm={() => { setFallbackOpen(false); refresh(); }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  pillOn: {
    backgroundColor: Colors.surface,
    borderColor: Colors.forest + '40',
  },
  pillOff: {
    backgroundColor: Colors.forest,
    borderColor: Colors.forest,
  },
  iconCircle: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  iconCircleOn: { backgroundColor: Colors.forest },
  iconCircleOff: { backgroundColor: Colors.paper + '28' },
  textCol: { flex: 1, gap: 2 },
  title: {
    fontFamily: Fonts.display,
    fontSize: 15,
    lineHeight: 20,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 16,
  },
});
