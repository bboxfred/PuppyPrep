/**
 * LIBRARY HOME — Grid of info sections with search.
 * Birth Guide and Emergency Guide are always free.
 */
import { useState, useMemo } from 'react';
import { View, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Shadows, FontSizes } from '@/constants/design-system';

interface LibSection {
  id: string;
  emoji: string;
  title: string;
  description: string;
  isFree: boolean;
  accent?: string;
  tags: string[];
}

const SECTIONS: LibSection[] = [
  { id: 'birth-guide', emoji: '🐣', title: 'Birth Guide', description: 'Complete whelping reference from preparation to delivery', isFree: true, tags: ['birth', 'whelping', 'labour', 'delivery', 'preparation'] },
  { id: 'emergency', emoji: '🚨', title: 'Emergency Guide', description: '14 emergency scenarios with step-by-step instructions', isFree: true, accent: '#D4726A', tags: ['emergency', 'vet', 'crisis', 'bleeding', 'eclampsia'] },
  { id: 'pregnancy', emoji: '🤰', title: 'Pregnancy Care', description: 'Week-by-week pregnancy guide and what to expect', isFree: true, tags: ['pregnancy', 'gestation', 'prenatal', 'ultrasound'] },
  { id: 'newborn', emoji: '👶', title: 'Newborn Care', description: 'Days 0–14: the critical neonatal period', isFree: true, tags: ['newborn', 'neonatal', 'colostrum', 'nursing', 'temperature'] },
  { id: 'nutrition', emoji: '🍼', title: 'Nutrition & Feeding', description: 'Formula, weaning, feeding schedules by week', isFree: true, tags: ['feeding', 'formula', 'weaning', 'nutrition', 'milk'] },
  { id: 'development', emoji: '🧠', title: 'Development & Training', description: 'Socialisation windows, ENS, and early training', isFree: true, tags: ['training', 'socialisation', 'ens', 'development', 'behaviour'] },
];

export default function LibraryScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return SECTIONS;
    const q = search.toLowerCase();
    return SECTIONS.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some(t => t.includes(q))
    );
  }, [search]);

  const handlePress = (section: LibSection) => {
    router.push(`/library/${section.id}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="display" weight="heavy" style={styles.title}>Library</Text>
        <Text variant="caption" color={Colors.textSecondary}>
          Guides, references, and emergency info
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Search size={18} color={Colors.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search guides..."
          placeholderTextColor={Colors.textLight}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
        />
      </View>

      {/* Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => handlePress(item)}
              style={({ pressed }) => [
                styles.card,
                item.accent && { borderColor: item.accent + '30' },
                pressed && { transform: [{ scale: 0.97 }], opacity: 0.85 },
              ]}
            >
              <Text style={styles.cardEmoji}>{item.emoji}</Text>
              <Text variant="body" weight="bold" style={styles.cardTitle}>{item.title}</Text>
              <Text variant="caption" color={Colors.textSecondary} numberOfLines={2} style={styles.cardDesc}>
                {item.description}
              </Text>

              {/* Always free badge */}
              {item.isFree && (
                <View style={[styles.freeBadge, item.accent ? { backgroundColor: item.accent + '15' } : {}]}>
                  <Text style={[styles.freeText, item.accent ? { color: item.accent } : {}]}>
                    {item.id === 'emergency' ? 'ALWAYS FREE' : 'FREE'}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptySearch}>
            <Text variant="body" color={Colors.textSecondary}>No results found</Text>
            <Text variant="caption" color={Colors.textLight} style={styles.emptyHint}>
              Try checking the Emergency Guide for urgent help
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  title: { fontSize: 28, marginBottom: 2 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    marginHorizontal: Spacing.lg, marginBottom: Spacing.md,
    backgroundColor: Colors.surface, borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm + 2,
    borderWidth: 1, borderColor: Colors.creamDark,
  },
  searchInput: { flex: 1, fontSize: FontSizes.base, color: Colors.textPrimary, fontFamily: 'Quicksand-Medium' },
  gridContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing['2xl'] },
  gridRow: { gap: Spacing.sm, marginBottom: Spacing.sm },
  card: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.md, borderWidth: 1.5, borderColor: Colors.creamDark,
    position: 'relative', ...Shadows.card,
  },
  lockBadge: {
    position: 'absolute', top: Spacing.sm, right: Spacing.sm,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: Colors.creamDark + '50',
    alignItems: 'center', justifyContent: 'center',
  },
  cardEmoji: { fontSize: 32, marginBottom: Spacing.sm },
  cardTitle: { fontSize: 15, marginBottom: 3 },
  cardDesc: { fontSize: 12, lineHeight: 17 },
  freeBadge: {
    alignSelf: 'flex-start', marginTop: Spacing.sm,
    backgroundColor: Colors.primary + '12',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: Radius.pill,
  },
  freeText: { fontSize: 10, fontFamily: 'Nunito-Bold', color: Colors.primary, letterSpacing: 0.5 },
  emptySearch: { alignItems: 'center', paddingTop: Spacing['2xl'] },
  emptyHint: { marginTop: Spacing.xs },
});
