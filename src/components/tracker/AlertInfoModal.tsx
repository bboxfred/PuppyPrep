/**
 * ALERT INFO MODAL — Field Journal popup
 *
 * Shown when the user taps the small ⚠️ banner on a puppy card in the
 * weight tracker. Explains what the alert means, why it matters, what to
 * do right now, and when to call the vet.
 *
 * Veterinary reference sources: Cornell CVM small-animal neonatal care,
 * Merck Veterinary Manual (Neonatal Care of Puppies), VCA Animal Hospitals
 * Neonatal Puppy guide, RECOVER 2025 neonatal guidelines.
 */
import { Modal, View, Pressable, ScrollView, StyleSheet } from 'react-native';
import { X, AlertTriangle, Phone } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';
import type { AlertType } from '@/store/usePuppyTrackerStore';

interface AlertDetail {
  label: string;
  headline: string;
  whatItMeans: string;
  whyItMatters: string;
  doNow: string[];
  callVetIf: string;
}

const ALERT_CONTENT: Record<AlertType, AlertDetail> = {
  lost_weight: {
    label: 'Critical',
    headline: 'Your puppy lost weight',
    whatItMeans:
      'The puppy weighed less than at the previous check-in. After Day 1, healthy puppies should gain weight every single day — usually 5–10% of body weight per 24 hours in the first two weeks.',
    whyItMatters:
      'Weight loss in a neonate is an early sign of inadequate nursing, dehydration, or infection. Puppies have almost no energy reserves; even a few hours of weight loss can progress to fading puppy syndrome.',
    doNow: [
      'Move this puppy to the rear nipples — they carry the highest milk flow.',
      'Supplement with warm puppy milk replacer (Esbilac, PetAg) after every nursing session.',
      'Check temperature — a puppy below 34.4 °C (94 °F) cannot digest milk and needs warming first.',
      'Weigh again in 4 hours to check progress.',
    ],
    callVetIf:
      'No weight gain within 6 hours of supplementing, or the puppy becomes cold, limp, or stops crying to nurse.',
  },

  very_slow_gain: {
    label: 'Critical',
    headline: 'Very slow weight gain',
    whatItMeans:
      'This puppy has gained less than 5 g in the last 20+ hours. Small-breed neonates should typically gain 10–20 g per day in Week 1, and healthy littermates usually double their birth weight by Day 7–10.',
    whyItMatters:
      'Slow gain is often the earliest warning sign of a problem — inadequate milk supply, a runt unable to compete at the teat, a latch issue, or early infection.',
    doNow: [
      'Supplement with warm formula after every nursing session (2–4 ml per 100 g of body weight every 2 hours in Week 1).',
      'Rotate this puppy to the back teats before the rest of the litter nurses.',
      'Keep the whelping box at 29–32 °C (85–90 °F) in Week 1.',
      'Weigh again in 4 hours — you want to see steady upward progress.',
    ],
    callVetIf:
      'Still no gain after two consecutive supplemental feedings, or the puppy becomes lethargic, cold, or refuses to latch.',
  },

  below_birth_weight: {
    label: 'Critical',
    headline: 'Weight below birth weight',
    whatItMeans:
      'The puppy\u2019s current weight is more than 10% below its birth weight after Day 1. A small dip in the first 24 hours is normal; anything beyond that is not.',
    whyItMatters:
      'This is a well-documented red flag for imminent fading puppy syndrome, which has an 80%+ mortality rate if not caught early. At this stage, every hour counts.',
    doNow: [
      'Start supplemental feeding immediately — warm formula every 2 hours day and night.',
      'Verify the puppy\u2019s temperature is above 34.4 °C (94 °F) before feeding. If cold, warm slowly against skin for 30 minutes first.',
      'Check for cleft palate, aspiration, diarrhoea, or blood in stool — any of these need the vet.',
      'Keep a strict weight log — weigh every 4 hours until stable gain returns.',
    ],
    callVetIf:
      'No improvement within 4 hours of starting supplementation. Do not delay — call even out-of-hours.',
  },

  runt: {
    label: 'Elevated',
    headline: 'Runt alert — significantly smaller than littermates',
    whatItMeans:
      'This puppy\u2019s latest weight is more than 25% below the heaviest sibling. In most litters a runt will be born smaller and can catch up, but without intervention the gap tends to widen.',
    whyItMatters:
      'Runts typically lose teat competition and under-nurse. They chill faster, dehydrate faster, and are at higher risk of hypoglycaemia. A small intervention window — the first two weeks — prevents most runt-related complications.',
    doNow: [
      'Place this puppy at the REAR nipples first, before the other puppies latch. Rear teats give the most milk.',
      'Supplement with 1–2 ml of warm puppy formula after every nursing session.',
      'Keep a separate, clearly marked towel for this puppy so you can spot it instantly during feeding rotations.',
      'Weigh twice daily; you want to see the gap close, not widen.',
    ],
    callVetIf:
      'Weight gap widens over 2 days despite supplementation, or the puppy becomes inactive, cold, or refuses to nurse.',
  },

  slow_gain: {
    label: 'Elevated',
    headline: 'Slow weight gain trend',
    whatItMeans:
      'This puppy has gained less than 10% of its body weight per day for two consecutive weigh-ins. For a neonate, this is a sustained underperformance pattern — not a one-off dip.',
    whyItMatters:
      'Sustained slow gain during the first two weeks is linked to subtle issues — poor milk transfer, maternal supply problems, or a mild infection. Addressing it early prevents a critical escalation later.',
    doNow: [
      'Supplement with warm puppy formula after every nursing session.',
      'Ensure the puppy gets rear nipples (highest flow) — rotate manually if it\u2019s being pushed off.',
      'Check the dam\u2019s mammary glands for warmth, redness or firmness (possible mastitis).',
      'Weigh every 12 hours to confirm the trend reverses within 24 hours.',
    ],
    callVetIf:
      'No improvement after 24 hours of supplementing, dam shows any mastitis signs, or the puppy becomes noticeably less active.',
  },
};

interface Props {
  visible: boolean;
  alertType: AlertType | null;
  puppyName: string;
  onClose: () => void;
}

export function AlertInfoModal({ visible, alertType, puppyName, onClose }: Props) {
  if (!alertType) return null;
  const info = ALERT_CONTENT[alertType];
  const isCritical = info.label === 'Critical';
  const accent = isCritical ? Colors.critical : Colors.ochre;
  const tint = isCritical ? Colors.criticalBg : Colors.ochreBg;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation?.()}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: tint, borderBottomColor: accent }]}>
            <View style={[styles.iconWrap, { backgroundColor: accent + '22' }]}>
              <AlertTriangle size={20} color={accent} strokeWidth={1.75} />
            </View>
            <View style={{ flex: 1 }}>
              <Text color={accent} style={styles.eyebrow}>{info.label.toUpperCase()}</Text>
              <Text style={styles.title}>{info.headline}</Text>
              <Text style={styles.puppyRef}>for {puppyName}</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
              <X size={18} color={Colors.inkSoft} strokeWidth={1.75} />
            </Pressable>
          </View>

          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
            {/* What it means */}
            <Text style={styles.sectionLabel}>WHAT IT MEANS</Text>
            <Text style={styles.body}>{info.whatItMeans}</Text>

            {/* Why it matters */}
            <Text style={styles.sectionLabel}>WHY IT MATTERS</Text>
            <Text style={styles.body}>{info.whyItMatters}</Text>

            {/* Do now */}
            <Text style={styles.sectionLabel}>DO THIS NOW</Text>
            {info.doNow.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <Text style={styles.stepNumber}>{i + 1}</Text>
                <Text style={styles.stepBody}>{step}</Text>
              </View>
            ))}

            {/* Call vet */}
            <View style={[styles.vetBox, { borderColor: accent, backgroundColor: tint }]}>
              <View style={styles.vetHeader}>
                <Phone size={14} color={accent} strokeWidth={1.75} />
                <Text color={accent} style={styles.vetLabel}>CALL YOUR VET IF</Text>
              </View>
              <Text style={styles.body}>{info.callVetIf}</Text>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#1E2A1F99',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    maxHeight: '90%',
    backgroundColor: Colors.paper,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.rule,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderBottomWidth: 1,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    fontFamily: Fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.4,
    marginBottom: 2,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 18,
    lineHeight: 22,
    color: Colors.ink,
  },
  puppyRef: {
    fontFamily: Fonts.body,
    fontStyle: 'italic',
    fontSize: 12,
    color: Colors.inkSoft,
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  scroll: { maxHeight: 520 },
  scrollContent: { padding: Spacing.md, paddingBottom: Spacing.lg },
  sectionLabel: {
    fontFamily: Fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    color: Colors.terracotta,
    marginTop: Spacing.sm + 2,
    marginBottom: 6,
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  stepNumber: {
    fontFamily: Fonts.display,
    fontSize: 16,
    color: Colors.terracotta,
    width: 18,
    textAlign: 'right',
  },
  stepBody: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
  },
  vetBox: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  vetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  vetLabel: {
    fontFamily: Fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.4,
  },
});
