/**
 * EMERGENCY GUIDE — 14 scenarios + vet decision tree + emergency contacts.
 * Always free. Always accessible. No paywall ever.
 */
import { useState, useCallback } from 'react';
import { View, ScrollView, Pressable, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, ChevronDown, ChevronUp } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import {
  EMERGENCY_SCENARIOS,
  VET_DECISION_TREE,
  THREE_NUMBERS_TO_MEMORISE,
  type EmergencyScenario,
} from '@/data/infobase/birthing-guide';

const VET_CONTACTS = [
  { name: 'Animal Recovery Centre', phone: '+6562680338', display: '+65 6268 0338' },
  { name: 'Mount Pleasant 24hr', phone: '+6562508333', display: '+65 6250 8333' },
  { name: 'The Animal Clinic', phone: '+6563142338', display: '+65 6314 2338' },
];

function ScenarioCard({ scenario }: { scenario: EmergencyScenario }) {
  const [expanded, setExpanded] = useState(false);
  const isGoImm = scenario.urgency === 'go_immediately';

  return (
    <Pressable onPress={() => setExpanded(!expanded)} style={styles.scenarioCard}>
      <View style={styles.scenarioHeader}>
        <View style={[styles.urgencyBadge, { backgroundColor: isGoImm ? '#D4726A' : '#D4A84B' }]}>
          <Text style={styles.urgencyText}>{isGoImm ? 'GO NOW' : 'CALL VET'}</Text>
        </View>
        <View style={styles.scenarioTitleArea}>
          <Text variant="body" weight="bold" style={styles.scenarioTitle}>{scenario.title}</Text>
          <Text variant="caption" color={Colors.textSecondary} numberOfLines={expanded ? undefined : 1}>
            {scenario.trigger}
          </Text>
        </View>
        {expanded ? <ChevronUp size={18} color={Colors.textLight} /> : <ChevronDown size={18} color={Colors.textLight} />}
      </View>

      {expanded && (
        <View style={styles.scenarioBody}>
          <Text variant="caption" weight="bold" color={Colors.textPrimary} style={styles.sectionLabel}>
            What it looks like:
          </Text>
          <Text variant="caption" color={Colors.textSecondary} style={styles.bodyText}>
            {scenario.what_it_looks_like}
          </Text>

          <Text variant="caption" weight="bold" color={Colors.textPrimary} style={styles.sectionLabel}>
            Do this NOW:
          </Text>
          {scenario.do_this_now.map((step, i) => (
            <Text key={i} variant="caption" color={Colors.textPrimary} style={styles.step}>
              {i + 1}. {step}
            </Text>
          ))}

          <Text variant="caption" weight="bold" color="#D4726A" style={styles.sectionLabel}>
            Vet decision:
          </Text>
          <Text variant="caption" color={Colors.textSecondary} style={styles.bodyText}>
            {scenario.vet_decision}
          </Text>

          {scenario.small_breed_note && (
            <View style={styles.smallBreedNote}>
              <Text variant="caption" weight="semibold" color={Colors.primary}>
                Small breed note:
              </Text>
              <Text variant="caption" color={Colors.textSecondary}>{scenario.small_breed_note}</Text>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

export default function EmergencyGuideScreen() {
  const router = useRouter();

  const callVet = useCallback((phone: string) => {
    Linking.openURL(`tel:${phone}`);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <ArrowLeft size={22} color="#FFF" strokeWidth={2.5} />
        </Pressable>
        <Text variant="heading" weight="bold" color="#FFF">🚨 Emergency Guide</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* THREE NUMBERS */}
        <Card style={styles.numbersCard}>
          <Text variant="body" weight="bold" color="#D4726A">3 numbers that save lives</Text>
          <View style={styles.numbersRow}>
            <View style={[styles.numPill, { backgroundColor: '#D4726A' }]}>
              <Text style={styles.numVal}>15</Text>
              <Text style={styles.numLabel}>min</Text>
            </View>
            <View style={[styles.numPill, { backgroundColor: '#D4A84B' }]}>
              <Text style={styles.numVal}>30</Text>
              <Text style={styles.numLabel}>min</Text>
            </View>
            <View style={[styles.numPill, { backgroundColor: '#D4726A' }]}>
              <Text style={styles.numVal}>10-15</Text>
              <Text style={styles.numLabel}>min</Text>
            </View>
          </View>
        </Card>

        {/* SCENARIOS */}
        <Text variant="heading" weight="bold" style={styles.sectionHeading}>
          Emergency Scenarios
        </Text>
        {EMERGENCY_SCENARIOS.map((s) => (
          <ScenarioCard key={s.id} scenario={s} />
        ))}

        {/* VET DECISION TREE */}
        <Text variant="heading" weight="bold" style={styles.sectionHeading}>
          When to call the vet
        </Text>

        <Card style={[styles.decisionCard, { borderColor: '#D4726A30', backgroundColor: '#D4726A08' }]}>
          <Text variant="body" weight="bold" color="#D4726A" style={styles.decisionTitle}>
            🚨 GO IMMEDIATELY
          </Text>
          {VET_DECISION_TREE.go_immediately_situations.map((s, i) => (
            <Text key={i} variant="caption" color={Colors.textPrimary} style={styles.decisionItem}>• {s}</Text>
          ))}
        </Card>

        <Card style={[styles.decisionCard, { borderColor: '#D4A84B30', backgroundColor: '#D4A84B08' }]}>
          <Text variant="body" weight="bold" color="#D4A84B" style={styles.decisionTitle}>
            📞 CALL VET
          </Text>
          {VET_DECISION_TREE.call_vet_situations.map((s, i) => (
            <Text key={i} variant="caption" color={Colors.textPrimary} style={styles.decisionItem}>• {s}</Text>
          ))}
        </Card>

        {/* EMERGENCY CONTACTS */}
        <Text variant="heading" weight="bold" style={styles.sectionHeading}>
          Emergency Vet Contacts (Singapore)
        </Text>
        {VET_CONTACTS.map((vet, i) => (
          <Pressable key={i} onPress={() => callVet(vet.phone)} style={styles.vetContactCard}>
            <Phone size={20} color="#FFF" />
            <View style={styles.vetContactText}>
              <Text variant="body" weight="bold" color="#FFF">{vet.name}</Text>
              <Text variant="caption" color="#FFFFFFB0">{vet.display}</Text>
            </View>
          </Pressable>
        ))}

        <View style={{ height: Spacing['2xl'] }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    backgroundColor: '#D4726A',
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF20', alignItems: 'center', justifyContent: 'center' },
  scrollContent: { padding: Spacing.lg },

  // Three numbers
  numbersCard: { marginBottom: Spacing.lg, borderWidth: 1, borderColor: '#D4726A20', backgroundColor: '#D4726A06' },
  numbersRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md },
  numPill: { flex: 1, alignItems: 'center', paddingVertical: Spacing.sm, borderRadius: Radius.sm },
  numVal: { fontFamily: 'YoungSerif-Regular', fontSize: 22, color: '#FFF' },
  numLabel: { fontFamily: 'DMSans-Medium', fontSize: 10, color: '#FFFFFFC0' },

  // Scenarios
  sectionHeading: { marginBottom: Spacing.md, marginTop: Spacing.sm },
  scenarioCard: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.sm,
    borderWidth: 1, borderColor: Colors.creamDark,
  },
  scenarioHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  urgencyBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, flexShrink: 0, marginTop: 2 },
  urgencyText: { fontSize: 10, fontFamily: 'YoungSerif-Regular', color: '#FFF', letterSpacing: 0.5 },
  scenarioTitleArea: { flex: 1 },
  scenarioTitle: { fontSize: 14, marginBottom: 2 },
  scenarioBody: { marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.creamDark + '50' },
  sectionLabel: { marginTop: Spacing.sm, marginBottom: 4 },
  bodyText: { lineHeight: 20, marginBottom: Spacing.xs },
  step: { lineHeight: 22, paddingLeft: 4, marginBottom: 2 },
  smallBreedNote: {
    marginTop: Spacing.sm, padding: Spacing.sm,
    backgroundColor: Colors.primary + '08', borderRadius: Radius.sm,
  },

  // Decision tree
  decisionCard: { marginBottom: Spacing.md, borderWidth: 1 },
  decisionTitle: { marginBottom: Spacing.sm },
  decisionItem: { lineHeight: 20, marginBottom: 3 },

  // Vet contacts
  vetContactCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: '#D4726A', borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.sm,
  },
  vetContactText: { flex: 1 },
});
