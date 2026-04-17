/**
 * LIBRARY ARTICLE — Generic article/section viewer.
 * Routes: /library/birth-guide, /library/emergency, /library/article-{id}
 * All library content is always free.
 */
import { useMemo } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Redirect } from 'expo-router';
import { ArrowLeft, Share2 } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { useCalendarStore } from '@/store/useCalendarStore';
import {
  BIRTH_GUIDE_LIBRARY_SECTIONS,
  WHELPING_KIT,
  TEMPERATURE_GUIDE,
  STAGE_1_GUIDE,
  STAGE_2_GUIDE,
  NEWBORN_PROTOCOL,
  UMBILICAL_CORD_PROTOCOL,
  PLACENTA_GUIDE,
  POST_WHELPING_GUIDE,
} from '@/data/infobase/birthing-guide';

// Known routes that have dedicated screens
const DEDICATED_ROUTES = ['birth-guide', 'emergency'];

// Content for library sections (simplified — full content from infobase files)
const SECTION_CONTENT: Record<string, { title: string; emoji: string; content: string; isFree: boolean; tags: string[] }> = {
  pregnancy: {
    title: 'Pregnancy Care', emoji: '🤰', isFree: false, tags: ['pregnancy'],
    content: 'A complete week-by-week guide to your dog\'s pregnancy.\n\nWeeks 1–3: Early pregnancy. You may not notice any changes yet. Continue normal feeding and exercise.\n\nWeeks 4–5: The puppies\' organs are forming. Your dog may show slight weight gain and increased appetite. Switch to high-quality puppy food.\n\nWeeks 6–7: Puppies are growing rapidly. Your dog\'s belly is visibly larger. Feed 3–4 smaller meals per day instead of 2 large ones. Reduce intense exercise.\n\nWeek 8: The whelping box should be set up. Begin twice-daily temperature monitoring. The puppies can be felt moving.\n\nWeek 9: Labour can begin any day. Do not leave her alone. Watch for nesting behaviour, panting, and loss of appetite.',
  },
  newborn: {
    title: 'Newborn Care (Days 0–14)', emoji: '👶', isFree: false, tags: ['newborn', 'neonatal'],
    content: 'The first two weeks are the most critical period for newborn puppies.\n\nTemperature: Puppies cannot regulate their own body temperature. The whelping box must be 29.5–32°C (85–90°F) at puppy level in Week 1.\n\nFeeding: Puppies should nurse every 2 hours in Week 1. Check that every puppy is nursing by feeling for a full, rounded belly.\n\nWeight: Weigh every puppy weekly. They should gain 10% of their body weight daily after Day 1. Any weight loss after the first 24 hours signals a problem.\n\nUmbilical cord: Apply iodine daily for the first 3 days. The cord falls off naturally in 3–5 days.\n\nENS: Early Neurological Stimulation exercises begin on Day 3 and continue through Day 16. 5 exercises, 3–5 seconds each, once daily.',
  },
  nutrition: {
    title: 'Nutrition & Feeding', emoji: '🍼', isFree: false, tags: ['feeding', 'formula', 'weaning'],
    content: 'Everything about feeding puppies from birth through weaning.\n\nWeek 1–2: Mother\'s milk only (or formula if supplementing). Feed every 2 hours. Formula volume: 1ml per 100g body weight per feeding.\n\nWeek 3: Begin introducing a gruel — mix puppy food with warm water or formula to a porridge consistency. Offer in a flat dish.\n\nWeek 4: Gruel becomes thicker. Puppies begin eating more solid food and nursing less. Feed 4–5 times daily.\n\nWeek 5–6: Transition to moistened puppy kibble. Dam\'s milk production decreases.\n\nWeek 7–8: Fully weaned onto puppy food. Feed 3–4 times daily.',
  },
  development: {
    title: 'Development & Training', emoji: '🧠', isFree: false, tags: ['training', 'socialisation', 'ens'],
    content: 'Critical development windows and early training.\n\nDays 3–16: ENS (Early Neurological Stimulation) — 5 exercises daily for stronger, calmer adult dogs.\n\nDays 10–14: Eyes open. Puppies begin to see but vision is blurry.\n\nDays 14–21: Ears open. First sounds. Startle reflex develops.\n\nWeeks 3–5: Critical socialisation window opens. Introduce gentle handling by different people, new surfaces (carpet, tile, grass), and household sounds.\n\nWeeks 5–8: Peak socialisation period. Expose to as many safe, positive experiences as possible. Begin basic crate training and short separation exercises.',
  },
};

// Map article-{id} slugs to real Birth Guide content from birthing-guide.ts
function getBirthGuideContent(articleId: string) {
  const section = BIRTH_GUIDE_LIBRARY_SECTIONS.find(s => s.id === articleId);
  if (!section) return null;

  // Pull real detailed content for each section
  const contentMap: Record<string, string> = {
    birth_preparation: [
      'Everything you need to prepare before labour begins.',
      '',
      'Whelping Kit Checklist:',
      ...WHELPING_KIT.filter(i => i.critical).slice(0, 8).map(i => `• ${i.item} — ${i.why_needed}`),
      '',
      'Temperature Monitoring:',
      `Start taking her temperature twice daily from Day 55–56.`,
      `Normal range: ${TEMPERATURE_GUIDE.normal_range_celsius.min}–${TEMPERATURE_GUIDE.normal_range_celsius.max}°C.`,
      `Labour signal: drops below ${TEMPERATURE_GUIDE.action_threshold_celsius}°C — labour within 12–24 hours.`,
      TEMPERATURE_GUIDE.important_caveat,
    ].join('\n'),

    stage_1_labour: [
      STAGE_1_GUIDE.what_is_happening,
      '',
      `Normal duration: ${STAGE_1_GUIDE.normal_duration_hours.min}–${STAGE_1_GUIDE.normal_duration_hours.max} hours (first-time mothers up to ${STAGE_1_GUIDE.normal_duration_hours.first_time_mothers_max} hours).`,
      '',
      ...STAGE_1_GUIDE.signs_by_phase.map(p => `${p.phase}:\n${p.signs.map(s => `• ${s}`).join('\n')}`),
      '',
      'Normal vs alarming:',
      'Normal: ' + STAGE_1_GUIDE.normal_vs_alarming.normal.join(', '),
      '',
      'Call vet if: ' + STAGE_1_GUIDE.normal_vs_alarming.call_vet.join('; '),
      '',
      STAGE_1_GUIDE.whether_to_stay_or_leave,
    ].join('\n'),

    stage_2_labour: [
      STAGE_2_GUIDE.what_a_contraction_looks_like,
      '',
      'Puppy presentations:',
      ...STAGE_2_GUIDE.presentations.map(p => `• ${p.name} (${p.frequency_percent}%): ${p.description} ${p.normal ? '' : '— ABNORMAL, ' + p.action}`),
      '',
      `Pushing time: normal up to ${STAGE_2_GUIDE.pushing_time_thresholds.normal_max_minutes} minutes. Call vet at ${STAGE_2_GUIDE.pushing_time_thresholds.call_vet_at_minutes} minutes. Emergency at ${STAGE_2_GUIDE.pushing_time_thresholds.emergency_at_minutes} minutes.`,
      '',
      `Time between puppies: ${STAGE_2_GUIDE.timing_between_puppies.normal_min_minutes} minutes to ${STAGE_2_GUIDE.timing_between_puppies.safe_max_hours} hours is normal.`,
    ].join('\n'),

    first_ten_minutes: [
      'Healthy puppy signs: ' + NEWBORN_PROTOCOL.healthy_puppy_signs.join(', '),
      '',
      'Unwell puppy signs: ' + NEWBORN_PROTOCOL.unwell_puppy_signs.join(', '),
      '',
      'If mother does not remove the sac (you have 60 seconds):',
      ...NEWBORN_PROTOCOL.if_mother_does_not_remove_sac.steps.map((s, i) => `${i + 1}. ${s}`),
      '',
      'Breathing stimulation:',
      ...NEWBORN_PROTOCOL.breathing_stimulation.steps.map((s, i) => `${i + 1}. ${s}`),
      '',
      'IMPORTANT: The swing method is PERMANENTLY RETIRED (RECOVER 2025). Do NOT swing puppies.',
      'Approved methods: ' + NEWBORN_PROTOCOL.airway_clearance_2025.approved_methods.join('; '),
      '',
      NEWBORN_PROTOCOL.getting_puppy_nursing,
    ].join('\n'),

    umbilical_cord: [
      'If the mother bites the cord:',
      `Normal stump length: ${UMBILICAL_CORD_PROTOCOL.if_mother_bites_cord.normal_length_cm.min}–${UMBILICAL_CORD_PROTOCOL.if_mother_bites_cord.normal_length_cm.max} cm.`,
      '',
      'If the mother does NOT bite the cord:',
      ...UMBILICAL_CORD_PROTOCOL.if_mother_does_not_bite.steps.map((s, i) => `${i + 1}. ${s}`),
      '',
      'Iodine application:',
      ...UMBILICAL_CORD_PROTOCOL.iodine_application.technique.map((s, i) => `${i + 1}. ${s}`),
      `Frequency: ${UMBILICAL_CORD_PROTOCOL.iodine_application.frequency}`,
      '',
      'Healing day by day:',
      ...UMBILICAL_CORD_PROTOCOL.healing_by_day.map(d => `Day ${d.day}: ${d.appearance}`),
      '',
      'Warning signs of infection: ' + UMBILICAL_CORD_PROTOCOL.infected_cord_warning_signs.at_stump.join(', '),
      'Action: ' + UMBILICAL_CORD_PROTOCOL.infected_cord_warning_signs.action,
    ].join('\n'),

    placenta_management: [
      PLACENTA_GUIDE.description,
      '',
      `Counting rule: ${PLACENTA_GUIDE.counting_rule}`,
      '',
      `Allow mother to eat max ${PLACENTA_GUIDE.eating_placentas.allow_max} placentas. ${PLACENTA_GUIDE.eating_placentas.reason_to_limit}`,
      '',
      'Retained placenta signs:',
      ...PLACENTA_GUIDE.retained_placenta.signs.map(s => `• ${s}`),
      '',
      PLACENTA_GUIDE.retained_placenta.timeline,
    ].join('\n'),

    after_whelping: [
      'Confirming labour is finished:',
      `Gold standard: ${POST_WHELPING_GUIDE.confirming_labour_is_finished.gold_standard}`,
      'Physical signs: ' + POST_WHELPING_GUIDE.confirming_labour_is_finished.physical_signs.join(', '),
      `Monitoring period: ${POST_WHELPING_GUIDE.confirming_labour_is_finished.monitoring_period}`,
      '',
      'First nursing check: ' + POST_WHELPING_GUIDE.first_nursing_check,
      '',
      'Dam care first 24 hours:',
      `Food: ${POST_WHELPING_GUIDE.dam_care_first_24_hours.food}`,
      `Water: ${POST_WHELPING_GUIDE.dam_care_first_24_hours.water}`,
      `Environment: ${POST_WHELPING_GUIDE.dam_care_first_24_hours.environment}`,
      '',
      'Postpartum complications to watch for:',
      ...POST_WHELPING_GUIDE.postpartum_complications.map(c =>
        `• ${c.condition} (onset: ${c.onset}): ${c.signs.join(', ')}. Action: ${c.action}`
      ),
    ].join('\n'),

    emergency_guide: 'See the Emergency Guide for all 14 emergency scenarios with step-by-step instructions.',
  };

  return {
    title: section.title, emoji: section.emoji, isFree: true,
    content: contentMap[articleId] ?? section.summary,
    tags: section.tags,
  };
}

export default function ArticleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const events = useCalendarStore((s) => s.events);

  // Redirect dedicated routes
  if (slug === 'birth-guide') return <Redirect href="/library/birth-guide" />;
  if (slug === 'emergency') return <Redirect href="/library/emergency" />;

  // Resolve content
  const article = useMemo(() => {
    // Check if it's an article-{id} from birth guide
    if (slug?.startsWith('article-')) {
      const articleId = slug.replace('article-', '');
      return getBirthGuideContent(articleId);
    }
    // Check section content
    return SECTION_CONTENT[slug ?? ''] ?? null;
  }, [slug]);

  if (!article) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text variant="heading">Article not found</Text>
          <Button title="Go back" onPress={() => router.back()} style={{ marginTop: Spacing.lg }} />
        </View>
      </SafeAreaView>
    );
  }

  // Related events
  const relatedEvents = useMemo(() => {
    if (!article.tags) return [];
    return events
      .filter(e => e.tags.some(t => article.tags.includes(t)))
      .slice(0, 3);
  }, [events, article.tags]);

  // All content — library is always free
  const paragraphs = article.content.split('\n\n');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <ArrowLeft size={22} color="#FFF" strokeWidth={2.5} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.headerEmoji}>{article.emoji}</Text>
          <Text style={styles.headerTitle}>{article.title}</Text>
        </View>
        <Pressable style={styles.shareBtn}>
          <Share2 size={18} color="#FFFFFF90" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Full content — library is always free */}
        {paragraphs.map((p, i) => (
          <Text key={i} variant="body" style={styles.paragraph}>{p}</Text>
        ))}

        {/* Related events */}
        {relatedEvents.length > 0 && (
          <View style={styles.relatedSection}>
            <Text variant="heading" weight="bold" style={styles.relatedTitle}>Related Calendar Events</Text>
            {relatedEvents.map((e) => (
              <Pressable key={e.id} onPress={() => router.push(`/event/${e.id}`)} style={styles.relatedCard}>
                <View style={[styles.relatedDot, { backgroundColor: e.category_color }]} />
                <Text variant="caption" weight="medium" numberOfLines={1} style={styles.relatedText}>{e.title}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={{ height: Spacing['2xl'] }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.lg,
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF20', alignItems: 'center', justifyContent: 'center' },
  headerText: { flex: 1 },
  headerEmoji: { fontSize: 28, marginBottom: 4 },
  headerTitle: { fontFamily: 'Nunito-Bold', fontSize: 22, color: '#FFF', lineHeight: 28 },
  shareBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF15', alignItems: 'center', justifyContent: 'center' },
  scrollContent: { padding: Spacing.lg },
  paragraph: { lineHeight: 24, marginBottom: Spacing.md },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  // Paywall
  paywallArea: { position: 'relative', marginTop: Spacing.md },
  blurOverlay: { opacity: 0.25 },
  blurredText: { lineHeight: 24, marginBottom: Spacing.md },
  paywallCard: { marginTop: -Spacing.xl, alignItems: 'center', padding: Spacing.xl },
  paywallTitle: { marginBottom: Spacing.sm },
  paywallDesc: { textAlign: 'center', marginBottom: Spacing.lg, lineHeight: 20 },

  // Related events
  relatedSection: { marginTop: Spacing.lg, paddingTop: Spacing.lg, borderTopWidth: 1, borderTopColor: Colors.creamDark + '30' },
  relatedTitle: { marginBottom: Spacing.md },
  relatedCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.creamDark + '20',
  },
  relatedDot: { width: 8, height: 8, borderRadius: 4 },
  relatedText: { flex: 1, fontSize: 13 },
});
