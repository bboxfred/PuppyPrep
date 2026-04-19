/**
 * WIDGET SETUP MODAL
 *
 * Three clear steps with icons + a "Take me to home screen" button that
 * minimises the app (via Linking.sendIntent when supported), so the user
 * can long-press and add the widget.
 *
 * After placement, they tap "I've added it" to dismiss the setup card.
 */
import { View, Modal, Pressable, ScrollView, StyleSheet, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, LayoutGrid, Hand, Sparkles, ArrowRight, Check } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';

interface WidgetSetupModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function WidgetSetupModal({ visible, onClose, onConfirm }: WidgetSetupModalProps) {
  const goToHomeScreen = async () => {
    // Android: launch the Home intent to minimise the app. User then
    // long-presses the home screen to get to the widget picker.
    if (Platform.OS !== 'android') return;
    try {
      await Linking.sendIntent('android.intent.action.MAIN', [
        { key: 'android.intent.category.HOME', value: 'true' },
      ]);
    } catch {
      // sendIntent can fail on some OEM launchers — harmless, user
      // can manually minimise with the home button.
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={12}>
            <X size={20} color={Colors.ink} strokeWidth={1.75} />
          </Pressable>
          <Text style={styles.headerTitle}>Add widget</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.heroIcon}>
            <LayoutGrid size={36} color={Colors.primary} strokeWidth={1.5} />
          </View>

          <Text style={styles.title}>Keep today's tasks on your home screen</Text>
          <Text style={styles.subtitle}>
            Three quick steps — total time about 10 seconds.
          </Text>

          <View style={styles.steps}>
            <Step n={1} icon={<Hand size={18} color={Colors.primary} strokeWidth={1.75} />}>
              Long-press an empty spot on your home screen
            </Step>
            <Step n={2} icon={<LayoutGrid size={18} color={Colors.primary} strokeWidth={1.75} />}>
              Tap <Text style={styles.emphasised}>Widgets</Text>, scroll to <Text style={styles.emphasised}>Puppy Prep</Text>
            </Step>
            <Step n={3} icon={<Sparkles size={18} color={Colors.primary} strokeWidth={1.75} />}>
              Drag the <Text style={styles.emphasised}>Puppy Prep — Today</Text> widget anywhere you want
            </Step>
          </View>

          <Pressable
            onPress={goToHomeScreen}
            style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.88 }]}
          >
            <Text style={styles.primaryBtnLabel}>Open home screen</Text>
            <ArrowRight size={18} color={Colors.paper} strokeWidth={1.75} />
          </Pressable>

          <Pressable onPress={onConfirm} style={styles.secondaryBtn}>
            <Check size={18} color={Colors.forest} strokeWidth={1.75} />
            <Text style={styles.secondaryBtnLabel}>I've added it</Text>
          </Pressable>

          <Text style={styles.hint}>
            The widget refreshes when you open the app, mark a task done, or tap it directly. It never refreshes in the background — your battery stays untouched.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

function Step({ n, icon, children }: { n: number; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <View style={styles.step}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{n}</Text>
      </View>
      <View style={styles.stepIcon}>{icon}</View>
      <Text style={styles.stepText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.paper },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
  },
  closeBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontFamily: Fonts.display, fontSize: 18, color: Colors.ink },
  scrollContent: { padding: Spacing.xl, alignItems: 'center' },
  heroIcon: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 24,
    color: Colors.ink,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.inkSoft,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  steps: {
    width: '100%',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.rule,
  },
  stepNumber: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  stepNumberText: {
    fontFamily: Fonts.display,
    fontSize: 14,
    color: Colors.paper,
  },
  stepIcon: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.primary + '12',
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  stepText: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
  },
  emphasised: {
    fontFamily: Fonts.bodySemi,
    color: Colors.forest,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    width: '100%',
    backgroundColor: Colors.forest,
    paddingVertical: 16,
    borderRadius: Radius.pill,
    marginBottom: Spacing.sm,
  },
  primaryBtnLabel: {
    fontFamily: Fonts.display,
    fontSize: 16,
    color: Colors.paper,
    letterSpacing: 0.2,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    width: '100%',
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: Colors.forest,
    borderRadius: Radius.pill,
    marginBottom: Spacing.lg,
  },
  secondaryBtnLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 15,
    color: Colors.forest,
  },
  hint: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.inkSoft,
    textAlign: 'center',
  },
});
