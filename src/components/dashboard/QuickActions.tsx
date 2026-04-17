/**
 * QUICK ACTIONS — 4 icon buttons in a row.
 * Calendar, Birth Guide, Emergency (red), Weigh Puppies.
 */
import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { CalendarDays, BookOpen, AlertTriangle, Scale } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Shadows } from '@/constants/design-system';

const ACTIONS = [
  { icon: CalendarDays, label: 'Calendar', route: '/(tabs)/calendar', bg: Colors.primary + '10', color: Colors.primary },
  { icon: BookOpen, label: 'Birth Guide', route: '/(tabs)/calendar', bg: Colors.tealLight + '15', color: Colors.tealLight },
  { icon: AlertTriangle, label: 'Emergency', route: '/(tabs)/calendar', bg: '#D4726A18', color: '#D4726A' },
  { icon: Scale, label: 'Weigh', route: '/(tabs)/calendar', bg: Colors.gold + '15', color: Colors.gold },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="heading" weight="bold" style={styles.title}>Quick Actions</Text>
      <View style={styles.row}>
        {ACTIONS.map((action, i) => (
          <Pressable
            key={i}
            style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] }]}
            onPress={() => router.push(action.route as any)}
          >
            <View style={[styles.iconCircle, { backgroundColor: action.bg }]}>
              <action.icon size={22} color={action.color} strokeWidth={2} />
            </View>
            <Text variant="caption" weight="medium" color={Colors.textSecondary} style={styles.label}>
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.lg },
  title: { marginBottom: Spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { alignItems: 'center', flex: 1 },
  iconCircle: {
    width: 56, height: 56, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
    ...Shadows.card, shadowOpacity: 0.04,
  },
  label: { marginTop: 6, fontSize: 12 },
});
