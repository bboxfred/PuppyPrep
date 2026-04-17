/**
 * BIRTH GUIDE — Complete whelping reference.
 * Uses BIRTH_GUIDE_LIBRARY_SECTIONS and THREE_NUMBERS_TO_MEMORISE.
 * Always free — no paywall ever.
 */
import { View, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { BIRTH_GUIDE_LIBRARY_SECTIONS, THREE_NUMBERS_TO_MEMORISE } from '@/data/infobase/birthing-guide';

export default function BirthGuideScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <ArrowLeft size={22} color={Colors.textPrimary} strokeWidth={2.5} />
        </Pressable>
        <Text variant="heading" weight="bold">🐣 Birth Guide</Text>
        <View style={styles.freePill}>
          <Text style={styles.freeLabel}>ALWAYS FREE</Text>
        </View>
      </View>

      <FlatList
        data={BIRTH_GUIDE_LIBRARY_SECTIONS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          /* THREE NUMBERS TO MEMORISE — always visible at top */
          <Card style={styles.numbersCard}>
            <Text variant="heading" weight="bold" color="#D4726A" style={styles.numbersTitle}>
              3 numbers that save lives
            </Text>

            <View style={styles.numberRow}>
              <View style={[styles.numberBadge, { backgroundColor: '#D4726A' }]}>
                <Text style={styles.numberText}>{THREE_NUMBERS_TO_MEMORISE.fifteen_minutes.number}</Text>
                <Text style={styles.numberUnit}>min</Text>
              </View>
              <Text variant="body" style={styles.numberRule}>
                {THREE_NUMBERS_TO_MEMORISE.fifteen_minutes.rule}
              </Text>
            </View>

            <View style={styles.numberRow}>
              <View style={[styles.numberBadge, { backgroundColor: '#D4A84B' }]}>
                <Text style={styles.numberText}>{THREE_NUMBERS_TO_MEMORISE.thirty_minutes.number}</Text>
                <Text style={styles.numberUnit}>min</Text>
              </View>
              <Text variant="body" style={styles.numberRule}>
                {THREE_NUMBERS_TO_MEMORISE.thirty_minutes.rule}
              </Text>
            </View>

            <View style={styles.numberRow}>
              <View style={[styles.numberBadge, { backgroundColor: '#D4726A' }]}>
                <Text style={styles.numberText}>{THREE_NUMBERS_TO_MEMORISE.ten_to_fifteen_minutes.number}</Text>
                <Text style={styles.numberUnit}>min</Text>
              </View>
              <Text variant="body" style={styles.numberRule}>
                {THREE_NUMBERS_TO_MEMORISE.ten_to_fifteen_minutes.rule}
              </Text>
            </View>
          </Card>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/library/article-${item.id}` as any)}
            style={({ pressed }) => [styles.sectionCard, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.sectionEmoji}>{item.emoji}</Text>
            <View style={styles.sectionText}>
              <Text variant="body" weight="bold">{item.title}</Text>
              <Text variant="caption" color={Colors.textSecondary} numberOfLines={2}>{item.summary}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.creamDark + '20',
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' },
  freePill: { marginLeft: 'auto', backgroundColor: Colors.primary + '12', paddingHorizontal: 10, paddingVertical: 3, borderRadius: Radius.pill },
  freeLabel: { fontSize: 10, fontFamily: 'Nunito-Bold', color: Colors.primary, letterSpacing: 0.5 },
  listContent: { padding: Spacing.lg },

  // Three numbers card
  numbersCard: {
    marginBottom: Spacing.lg, padding: Spacing.lg,
    backgroundColor: '#D4726A08', borderWidth: 1, borderColor: '#D4726A20',
  },
  numbersTitle: { fontSize: 18, marginBottom: Spacing.md },
  numberRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, marginBottom: Spacing.md },
  numberBadge: {
    minWidth: 52, height: 52, borderRadius: 16,
    paddingHorizontal: 8,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  numberText: { fontFamily: 'Nunito-ExtraBold', fontSize: 18, color: '#FFF', lineHeight: 22 },
  numberUnit: { fontFamily: 'Quicksand-Medium', fontSize: 10, color: '#FFFFFFC0' },
  numberRule: { flex: 1, fontSize: 14, lineHeight: 21 },

  // Section cards
  sectionCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.sm,
    borderWidth: 1, borderColor: Colors.creamDark,
  },
  sectionEmoji: { fontSize: 28, marginRight: Spacing.md },
  sectionText: { flex: 1 },
});
