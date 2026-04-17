/**
 * WHELPING KIT CHECKLIST — from WHELPING_KIT in birthing-guide.ts.
 * Grouped by category. Critical items have red dot. Persists to MMKV.
 */
import { useMemo } from 'react';
import { View, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { WHELPING_KIT } from '@/data/infobase/birthing-guide';
import { useChecklistStore } from '@/store/useChecklistStore';

export default function WhelpingKitScreen() {
  const router = useRouter();
  const checkedItems = useChecklistStore((s) => s.checkedItems);
  const toggleItem = useChecklistStore((s) => s.toggleItem);

  const totalItems = WHELPING_KIT.length;
  const checkedCount = useMemo(() =>
    WHELPING_KIT.filter(item => checkedItems[item.item]).length,
    [checkedItems]
  );
  const progress = totalItems > 0 ? checkedCount / totalItems : 0;

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<string, typeof WHELPING_KIT>();
    WHELPING_KIT.forEach(item => {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    });
    return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <ArrowLeft size={22} color={Colors.textPrimary} strokeWidth={2.5} />
        </Pressable>
        <View style={styles.headerText}>
          <Text variant="heading" weight="bold">📦 Whelping Kit</Text>
          <Text variant="caption" color={Colors.textSecondary}>
            {checkedCount} of {totalItems} items ready
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressArea}>
        <ProgressBar progress={progress} height={6} color={Colors.success} trackColor={Colors.creamDark + '40'} />
      </View>

      {/* Grouped checklist */}
      <FlatList
        data={grouped}
        keyExtractor={(item) => item.category}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: group }) => (
          <View style={styles.group}>
            <Text variant="body" weight="bold" style={styles.groupTitle}>{group.category}</Text>
            {group.items.map((item) => {
              const isChecked = !!checkedItems[item.item];
              return (
                <Pressable
                  key={item.item}
                  onPress={() => toggleItem(item.item)}
                  style={[styles.itemRow, isChecked && styles.itemChecked]}
                >
                  <View style={[styles.checkbox, isChecked && styles.checkboxDone]}>
                    {isChecked && <Check size={14} color="#FFF" strokeWidth={3} />}
                  </View>
                  <View style={styles.itemContent}>
                    <View style={styles.itemHeader}>
                      {item.critical && <View style={styles.criticalDot} />}
                      <Text variant="body" weight={isChecked ? 'regular' : 'medium'}
                        color={isChecked ? Colors.textLight : Colors.textPrimary}
                        style={isChecked ? styles.strikethrough : undefined}>
                        {item.item}
                      </Text>
                    </View>
                    {!isChecked && (
                      <Text variant="caption" color={Colors.textSecondary} style={styles.whyText} numberOfLines={2}>
                        {item.why_needed}
                      </Text>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
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
  headerText: { flex: 1 },
  progressArea: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: Colors.surface },
  listContent: { padding: Spacing.lg, paddingBottom: Spacing['2xl'] },
  group: { marginBottom: Spacing.lg },
  groupTitle: { fontSize: 16, marginBottom: Spacing.sm, color: Colors.primary },
  itemRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    backgroundColor: Colors.surface, borderRadius: Radius.sm,
    padding: Spacing.sm + 4, marginBottom: 6,
    borderWidth: 1, borderColor: Colors.creamDark,
  },
  itemChecked: { backgroundColor: Colors.creamLight, borderColor: Colors.creamDark + '50' },
  checkbox: {
    width: 24, height: 24, borderRadius: 8,
    borderWidth: 2.5, borderColor: Colors.creamDark,
    alignItems: 'center', justifyContent: 'center', marginTop: 2,
  },
  checkboxDone: { backgroundColor: Colors.success, borderColor: Colors.success },
  itemContent: { flex: 1 },
  itemHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  criticalDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#D4726A' },
  strikethrough: { textDecorationLine: 'line-through' },
  whyText: { marginTop: 3, lineHeight: 18 },
});
