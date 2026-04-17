/**
 * Q1 — BREED SELECTOR
 * 🔴 CRITICAL — No skip. Searchable dropdown. Mixed Breed → size sub-question.
 */
import { useState, useMemo, useCallback } from 'react';
import { View, TextInput, FlatList, Pressable, Modal, StyleSheet } from 'react-native';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { SelectionCard } from '@/components/onboarding/SelectionCard';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Colors, Radius, Spacing, FontSizes } from '@/constants/design-system';
import { useOnboarding } from '@/hooks/useOnboarding';
import { usePuppyStore } from '@/store/usePuppyStore';
import {
  getAvailableBreeds,
  searchBreeds,
  type Breed,
  type SizeCategory,
} from '@/data/breeds/registry';

const SIZE_OPTIONS: { value: SizeCategory; emoji: string; label: string; description: string }[] = [
  { value: 'small', emoji: '🐾', label: 'Small', description: 'Under 10 kg' },
  { value: 'medium', emoji: '🐕', label: 'Medium', description: '10–25 kg' },
  { value: 'large', emoji: '🦮', label: 'Large', description: '25–45 kg' },
  { value: 'giant', emoji: '🐘', label: 'Giant', description: 'Over 45 kg' },
];

export default function Q1Breed() {
  const { goNext, goBack, canGoBack } = useOnboarding();
  const setBreed = usePuppyStore((s) => s.setBreed);
  const setBreedFlags = usePuppyStore((s) => s.setBreedFlags);
  const savedBreedId = usePuppyStore((s) => s.breedId);
  const savedSize = usePuppyStore((s) => s.sizeCategory);

  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(
    savedBreedId ? getAvailableBreeds().find((b) => b.id === savedBreedId) ?? null : null
  );
  const [selectedSize, setSelectedSize] = useState<SizeCategory | null>(savedSize);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');

  const isMixedBreed = selectedBreed?.id === 'mixed_breed';
  const canContinue = selectedBreed && (isMixedBreed ? selectedSize !== null : true);

  const breeds = useMemo(() => {
    if (search.trim()) return searchBreeds(search);
    return getAvailableBreeds();
  }, [search]);

  const handleSelectBreed = useCallback((breed: Breed) => {
    setSelectedBreed(breed);
    setDropdownOpen(false);
    setSearch('');
    if (breed.id !== 'mixed_breed') setSelectedSize(breed.size_category);
    else setSelectedSize(null);
  }, []);

  const handleContinue = useCallback(() => {
    if (!selectedBreed || !canContinue) return;
    const finalSize = isMixedBreed ? selectedSize! : selectedBreed.size_category;
    setBreed(selectedBreed.id, selectedBreed.name, selectedBreed.group_id, finalSize);
    setBreedFlags({
      isJrtType: selectedBreed.info_base_id === 'jrt',
      isFoxTerrier: selectedBreed.info_base_id === 'fox_terrier',
      isWireFoxTerrier: selectedBreed.id === 'wire_fox_terrier',
      isBorderTerrier: selectedBreed.info_base_id === 'border_terrier',
      isMinPin: selectedBreed.info_base_id === 'miniature_pinscher',
      isRatTerrier: selectedBreed.info_base_id === 'rat_terrier',
    });
    goNext('q1-breed');
  }, [selectedBreed, canContinue, isMixedBreed, selectedSize, setBreed, setBreedFlags, goNext]);

  return (
    <OnboardingScreen
      illustration="🐕"
      headline="What breed is your dog?"
      subtext="This changes feeding amounts, health risks, and what to watch for."
      onNext={handleContinue}
      onBack={canGoBack('q1-breed') ? () => goBack('q1-breed') : undefined}
      nextDisabled={!canContinue}
    >
      {/* Dropdown trigger */}
      <Pressable onPress={() => setDropdownOpen(true)} style={styles.dropdownTrigger}>
        {selectedBreed ? (
          <Text variant="body" weight="semibold">{selectedBreed.name}</Text>
        ) : (
          <Text variant="body" color={Colors.textLight}>Tap to select breed...</Text>
        )}
        <Text color={Colors.textSecondary}>▾</Text>
      </Pressable>

      {/* Dropdown modal */}
      <Modal visible={dropdownOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text variant="subheading" weight="bold">Select breed</Text>
              <Pressable onPress={() => { setDropdownOpen(false); setSearch(''); }}>
                <Text variant="body" weight="semibold" color={Colors.primary}>Done</Text>
              </Pressable>
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search breeds..."
              placeholderTextColor={Colors.textLight}
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
            />
            <FlatList
              data={breeds}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelectBreed(item)}
                  style={[styles.dropdownItem, selectedBreed?.id === item.id && styles.dropdownItemSelected]}
                >
                  <Text variant="body" weight={selectedBreed?.id === item.id ? 'bold' : 'regular'}
                    color={selectedBreed?.id === item.id ? Colors.primary : Colors.textPrimary}>
                    {item.name}
                  </Text>
                </Pressable>
              )}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </View>
      </Modal>

      {/* Mixed breed → size + disclaimer */}
      {isMixedBreed && (
        <View style={styles.sizeSection}>
          <Card style={styles.disclaimerCard}>
            <Text variant="caption" weight="semibold" color={Colors.coral}>
              ℹ️  Mixed breed guidelines
            </Text>
            <Text variant="caption" color={Colors.textSecondary} style={styles.disclaimerText}>
              Without knowing the exact breed, we'll use general guidelines based on size. You can update the breed later in Settings.
            </Text>
          </Card>

          <Text variant="subheading" weight="bold" style={styles.sizeHeadline}>How big is she?</Text>
          {SIZE_OPTIONS.map((opt) => (
            <SelectionCard
              key={opt.value}
              emoji={opt.emoji}
              title={opt.label}
              description={opt.description}
              selected={selectedSize === opt.value}
              onPress={() => setSelectedSize(opt.value)}
            />
          ))}
        </View>
      )}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  dropdownTrigger: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.surface, borderRadius: Radius.md, paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md, borderWidth: 2, borderColor: Colors.creamDark,
    marginBottom: Spacing.md,
  },
  triggerContent: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  triggerEmoji: { fontSize: 22 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: Colors.background, borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg, maxHeight: '75%', paddingBottom: Spacing['2xl'],
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.creamDark,
  },
  searchInput: {
    backgroundColor: Colors.surface, borderRadius: Radius.sm, paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4, fontSize: FontSizes.base, color: Colors.textPrimary,
    marginHorizontal: Spacing.md, marginVertical: Spacing.sm, borderWidth: 1, borderColor: Colors.creamDark,
  },
  dropdownItem: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 4, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.creamDark,
  },
  dropdownItemSelected: { backgroundColor: Colors.creamLight },
  dropdownEmoji: { fontSize: 22, marginRight: Spacing.md },
  sizeSection: { marginTop: Spacing.md },
  disclaimerCard: { marginBottom: Spacing.lg, backgroundColor: Colors.creamLight, borderWidth: 1, borderColor: Colors.peach + '30' },
  disclaimerText: { marginTop: Spacing.xs, lineHeight: 20 },
  sizeHeadline: { marginBottom: Spacing.sm },
});
