/**
 * TEMPERATURE MONITORING — log readings, show alert when drop detected.
 * Only relevant when status = 'pregnant'.
 */
import { useState, useMemo } from 'react';
import { View, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Thermometer } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { useTempLogStore } from '@/store/useTempLogStore';

const NORMAL_MIN = 37.8;
const NORMAL_MAX = 39.2;
const LABOUR_THRESHOLD = 37.2;

export default function TemperatureScreen() {
  const router = useRouter();
  const readings = useTempLogStore((s) => s.readings);
  const addReading = useTempLogStore((s) => s.addReading);
  const [tempInput, setTempInput] = useState('');
  const [showInput, setShowInput] = useState(false);

  const latestReading = readings[0];
  const isLabourAlert = latestReading && latestReading.tempCelsius < LABOUR_THRESHOLD;

  const handleAdd = () => {
    const temp = parseFloat(tempInput);
    if (isNaN(temp) || temp < 30 || temp > 42) return;
    addReading(temp);
    setTempInput('');
    setShowInput(false);
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate()}/${d.getMonth() + 1} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <ArrowLeft size={22} color={Colors.textPrimary} strokeWidth={2.5} />
        </Pressable>
        <Text variant="heading" weight="bold">🌡️ Temperature Log</Text>
      </View>

      <FlatList
        data={readings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Labour alert */}
            {isLabourAlert && (
              <Card style={styles.alertCard}>
                <Text variant="heading" weight="bold" color="#D4726A">
                  🚨 Temperature drop detected
                </Text>
                <Text variant="body" color={Colors.textPrimary} style={styles.alertText}>
                  Last reading: {latestReading.tempCelsius}°C — below 37.2°C (99°F).
                  Labour likely within 12–24 hours. Prepare everything now.
                </Text>
                <Text variant="caption" weight="bold" color="#D4726A">
                  Do not leave her alone. Alert your vet.
                </Text>
              </Card>
            )}

            {/* Normal range reference */}
            <Card style={styles.rangeCard}>
              <Text variant="caption" weight="bold" color={Colors.primary}>Normal range</Text>
              <View style={styles.rangeBar}>
                <View style={styles.rangeTrack}>
                  <View style={styles.rangeFill} />
                </View>
                <View style={styles.rangeLabels}>
                  <Text style={styles.rangeLabel}>37.2°C</Text>
                  <Text style={styles.rangeLabel}>38.6°C</Text>
                  <Text style={styles.rangeLabel}>39.2°C</Text>
                </View>
              </View>
              <Text variant="caption" color={Colors.textSecondary}>
                Below 37.2°C = labour signal. Above 39.4°C = fever — call vet.
              </Text>
            </Card>

            {/* Add reading */}
            {showInput ? (
              <Card style={styles.inputCard}>
                <Text variant="body" weight="bold">New reading</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.tempInputField}
                    value={tempInput}
                    onChangeText={setTempInput}
                    keyboardType="decimal-pad"
                    placeholder="38.5"
                    placeholderTextColor={Colors.textLight}
                    autoFocus
                  />
                  <Text variant="body" color={Colors.textSecondary}>°C</Text>
                </View>
                <View style={styles.inputActions}>
                  <Pressable onPress={() => setShowInput(false)}>
                    <Text variant="caption" color={Colors.textSecondary}>Cancel</Text>
                  </Pressable>
                  <Button title="Save" onPress={handleAdd} style={styles.saveBtn} />
                </View>
              </Card>
            ) : (
              <Pressable onPress={() => setShowInput(true)} style={styles.addBtn}>
                <Plus size={18} color={Colors.primary} />
                <Text variant="body" weight="semibold" color={Colors.primary}>Log temperature</Text>
              </Pressable>
            )}

            {readings.length > 0 && (
              <Text variant="body" weight="bold" style={styles.historyTitle}>History</Text>
            )}
          </>
        }
        renderItem={({ item }) => {
          const isLow = item.tempCelsius < LABOUR_THRESHOLD;
          const isHigh = item.tempCelsius > 39.4;
          return (
            <View style={[styles.readingRow, isLow && styles.readingLow, isHigh && styles.readingHigh]}>
              <Thermometer size={16} color={isLow ? '#D4726A' : isHigh ? '#D4726A' : Colors.primary} />
              <Text variant="body" weight="bold" color={isLow || isHigh ? '#D4726A' : Colors.textPrimary}>
                {item.tempCelsius}°C
              </Text>
              <Text variant="caption" color={Colors.textSecondary} style={styles.readingTime}>
                {formatTime(item.date)}
              </Text>
              {isLow && <Text style={styles.alertBadge}>LABOUR SIGNAL</Text>}
              {isHigh && <Text style={styles.alertBadge}>FEVER</Text>}
            </View>
          );
        }}
        ListEmptyComponent={
          <Text variant="caption" color={Colors.textLight} style={styles.emptyText}>
            No readings yet. Start logging twice daily from Day 55.
          </Text>
        }
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
  listContent: { padding: Spacing.lg, paddingBottom: Spacing['2xl'] },
  alertCard: { marginBottom: Spacing.lg, backgroundColor: '#D4726A10', borderWidth: 2, borderColor: '#D4726A30' },
  alertText: { marginVertical: Spacing.sm, lineHeight: 22 },
  rangeCard: { marginBottom: Spacing.lg },
  rangeBar: { marginVertical: Spacing.sm },
  rangeTrack: { height: 8, backgroundColor: Colors.creamDark + '30', borderRadius: 4, overflow: 'hidden' },
  rangeFill: { position: 'absolute', left: '25%', right: '15%', height: 8, backgroundColor: Colors.primary + '30', borderRadius: 4 },
  rangeLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  rangeLabel: { fontSize: 11, fontFamily: 'DMSans-Medium', color: Colors.textSecondary },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    backgroundColor: Colors.primary + '08', borderRadius: Radius.md,
    paddingVertical: Spacing.md, marginBottom: Spacing.lg,
    borderWidth: 1, borderColor: Colors.primary + '20', borderStyle: 'dashed',
  },
  inputCard: { marginBottom: Spacing.lg },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.sm },
  tempInputField: {
    flex: 1, backgroundColor: Colors.background, borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    fontSize: 24, fontFamily: 'YoungSerif-Regular', color: Colors.textPrimary, textAlign: 'center',
    borderWidth: 1, borderColor: Colors.creamDark,
  },
  inputActions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: Spacing.lg, marginTop: Spacing.md },
  saveBtn: { height: 40, paddingHorizontal: Spacing.lg },
  historyTitle: { marginBottom: Spacing.sm },
  readingRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.surface, borderRadius: Radius.sm,
    padding: Spacing.sm + 4, marginBottom: 6,
    borderWidth: 1, borderColor: Colors.creamDark,
  },
  readingLow: { borderColor: '#D4726A40', backgroundColor: '#D4726A06' },
  readingHigh: { borderColor: '#D4726A40', backgroundColor: '#D4726A06' },
  readingTime: { flex: 1 },
  alertBadge: { fontSize: 9, fontFamily: 'YoungSerif-Regular', color: '#D4726A', backgroundColor: '#D4726A15', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  emptyText: { textAlign: 'center', marginTop: Spacing.xl },
});
