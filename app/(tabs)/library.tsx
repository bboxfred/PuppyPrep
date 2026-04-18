/**
 * LIBRARY HOME — Field Journal editorial grid (full-bleed artwork cards)
 *
 * Each section card uses the Nano Banana linework sketch as a FULL-BLEED
 * background image. Title + subtitle overlay on a warm paper gradient from
 * the bottom so text is legible against the sketch.
 *
 * "FREE" / "ALWAYS FREE" eyebrows removed — everything is free.
 */
import { useState, useMemo } from 'react';
import { View, TextInput, FlatList, Pressable, Image, StyleSheet, type ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Fonts, FontSizes } from '@/constants/design-system';

interface LibSection {
  id: string;
  icon: ImageSourcePropType;
  title: string;
  description: string;
  tags: string[];
  /** Optional per-card image scale. Use >1 to zoom into the subject when
   * the generated sketch framed it too small. 1 = no zoom (default). */
  artScale?: number;
}

// Nano Banana-generated linework icons, loaded as local assets.
const ICONS = {
  birthGuide:  require('../../assets/images/library-birth-guide.png'),
  emergency:   require('../../assets/images/library-emergency-guide.png'),
  pregnancy:   require('../../assets/images/library-pregnancy-care.png'),
  newborn:     require('../../assets/images/library-newborn-care.png'),
  nutrition:   require('../../assets/images/library-nutrition-feeding.png'),
  development: require('../../assets/images/library-development-training.png'),
};

const SECTIONS: LibSection[] = [
  // Emergency + Pregnancy sketches already frame the subject well — no zoom.
  // Development stays at the baseline 1.15 zoom.
  // Birth Guide, Newborn Care, Nutrition got another +10% (1.15 × 1.10 ≈ 1.265)
  // per feedback so the subject reads larger and more centered.
  { id: 'birth-guide', icon: ICONS.birthGuide,  title: 'Birth Guide', description: 'Complete whelping reference from preparation to delivery', tags: ['birth', 'whelping', 'labour', 'delivery', 'preparation'], artScale: 1.27 },
  { id: 'emergency',   icon: ICONS.emergency,   title: 'Emergency Guide', description: '14 emergency scenarios with step-by-step instructions', tags: ['emergency', 'vet', 'crisis', 'bleeding', 'eclampsia'] },
  { id: 'pregnancy',   icon: ICONS.pregnancy,   title: 'Pregnancy Care', description: 'Week-by-week pregnancy guide and what to expect', tags: ['pregnancy', 'gestation', 'prenatal', 'ultrasound'] },
  // Newborn + Nutrition bumped another 10% on top of 1.27 → 1.40.
  { id: 'newborn',     icon: ICONS.newborn,     title: 'Newborn Care', description: 'Days 0–14: the critical neonatal period', tags: ['newborn', 'neonatal', 'colostrum', 'nursing', 'temperature'], artScale: 1.40 },
  { id: 'nutrition',   icon: ICONS.nutrition,   title: 'Nutrition & Feeding', description: 'Formula, weaning, feeding schedules by week', tags: ['feeding', 'formula', 'weaning', 'nutrition', 'milk'], artScale: 1.40 },
  { id: 'development', icon: ICONS.development, title: 'Development & Training', description: 'Socialisation windows, ENS, and early training', tags: ['training', 'socialisation', 'ens', 'development', 'behaviour'], artScale: 1.15 },
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
        <Text style={styles.title}>Library</Text>
        <Text style={styles.subtitle}>Guides, references, and emergency info</Text>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Search size={18} color={Colors.inkFaint} strokeWidth={1.75} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search guides..."
          placeholderTextColor={Colors.inkFaint}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
        />
      </View>

      {/* Grid — artwork fills top 2/3, text below */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePress(item)}
            style={({ pressed }) => [
              styles.card,
              pressed && { opacity: 0.9, transform: [{ scale: 0.985 }] },
            ]}
          >
            <View style={styles.cardArt}>
              <Image
                source={item.icon}
                style={[
                  styles.cardArtImage,
                  item.artScale ? { transform: [{ scale: item.artScale }] } : null,
                ]}
                resizeMode="cover"
              />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptySearch}>
            <Text style={styles.emptyMain}>No results found</Text>
            <Text style={styles.emptyHint}>
              Try checking the Emergency Guide for urgent help
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const CARD_HEIGHT = 240;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.paper },

  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontFamily: Fonts.display, // Young Serif
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -0.5,
    color: Colors.ink,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.inkSoft,
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: Colors.paper,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.rule,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.base,
    color: Colors.ink,
    fontFamily: Fonts.body,
  },

  // Grid
  gridContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing['2xl'] },
  gridRow: { gap: Spacing.sm, marginBottom: Spacing.sm },

  // Card — art on top, text below. Art area is a generous square so the
  // whole sketch is visible (resize cover on a ~160x160 box).
  card: {
    flex: 1,
    height: CARD_HEIGHT,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.rule,
    backgroundColor: Colors.surface,
  },
  cardArt: {
    width: '100%',
    height: 160,
    backgroundColor: Colors.paper, // behind any transparent parts of the sketch
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardArtImage: {
    width: '100%',
    height: '100%',
  },
  cardText: {
    padding: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: Fonts.display,
    fontSize: 15,
    lineHeight: 19,
    color: Colors.ink,
    marginBottom: 3,
  },
  cardDesc: {
    fontFamily: Fonts.body,
    fontSize: 11,
    lineHeight: 15,
    color: Colors.inkSoft,
  },

  emptySearch: { alignItems: 'center', paddingTop: Spacing['2xl'] },
  emptyMain: {
    fontFamily: Fonts.display,
    fontSize: 20,
    color: Colors.inkSoft,
  },
  emptyHint: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.inkFaint,
    marginTop: Spacing.xs,
  },
});
