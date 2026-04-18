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
import { MarkdownText } from '@/components/library/MarkdownText';
import { Colors, Spacing, Radius } from '@/constants/design-system';
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
import {
  JRT_NEONATAL_EVENTS,
  JRT_TRANSITIONAL_EVENTS,
  JRT_NUTRITION_EVENTS,
  JRT_TRAINING_EVENTS,
  JRT_SOCIALIZATION_EVENTS,
  JRT_HEALTH_SCHEDULE,
  JRT_PREGNANCY_EVENTS,
} from '@/data/infobase/jrt';

// Known routes that have dedicated screens
const DEDICATED_ROUTES = ['birth-guide', 'emergency'];

// Build a "Why" + "How" section block from an infobase event template.
// Keeps content readable and consistent across generated articles.
function eventBlock(e: any): string {
  const lines = [`## ${e.title}`, '', e.description ?? ''];
  if (e.detail) lines.push('', e.detail);
  if (e.call_vet_if) {
    lines.push('', `**🚨 Call your vet if:** ${e.call_vet_if}`);
  }
  return lines.filter(Boolean).join('\n');
}

// Dynamically compose long-form content per section from the infobase.
// This keeps the library automatically in sync with the calendar events —
// no duplicate copy to maintain. Breed-specific data uses JRT as the
// canonical reference (mirrors the knowledge base sources).
function buildPregnancyContent(): string {
  const weeks = [
    {
      range: 'Weeks 1–3 (Days 0–21)',
      body: [
        'The puppies are implanting and early organs are forming. You may not notice any outward change in your dog yet.',
        '',
        '**Feeding:** Continue her regular adult food at normal volumes — there is no benefit to increasing calories this early.',
        '**Exercise:** Normal walks and play are fine. Avoid rough play with other dogs.',
        '**No medications** without vet approval — many common dewormers, flea treatments, and antibiotics cross the placenta and can harm embryos.',
      ].join('\n'),
    },
    {
      range: 'Weeks 4–5 (Days 22–35)',
      body: [
        'Organ development accelerates. An ultrasound from Day 25 can confirm pregnancy and give a puppy count estimate.',
        '',
        '**Weight gain:** She may show 5–10% weight gain. Nipples enlarge and darken.',
        '**Food:** Switch gradually (over 5–7 days) to a high-quality puppy food — she needs the extra calcium, protein, and DHA for fetal brain development.',
        '**Walks:** Continue daily walks but avoid agility, rough terrain, or jumping. Keep her routine as boring as possible.',
      ].join('\n'),
    },
    {
      range: 'Weeks 6–7 (Days 36–49)',
      body: [
        'Puppies are now clearly identifiable on ultrasound. Bones begin calcifying — an X-ray from Day 45 can give an exact puppy count.',
        '',
        '**Feed 3–4 smaller meals per day** instead of 2 large ones. The growing uterus leaves little room for a full stomach.',
        '**Start dam deworming** on Day 40 with fenbendazole (Panacur) 50mg/kg daily, continuing through Day 14 post-birth. This prevents worms passing to puppies through the milk.',
        '**Nesting behaviour** may start — she shreds bedding and searches for quiet corners. Allow and encourage this.',
      ].join('\n'),
    },
    {
      range: 'Week 8 (Days 50–56)',
      body: [
        'Puppies can now be felt moving under her flank if she lies on her side. Milk production may start — you may see a drop of clear fluid from her nipples.',
        '',
        '**Whelping box** must be set up NOW. Place it in a warm, quiet, dim corner she already likes. Let her sleep in it for a week before labour.',
        '**Temperature monitoring** starts on Day 55–56. Take her rectal temperature twice daily. Normal is 38.0–39.2°C (100.4–102.5°F). A drop below 37.2°C (99°F) = labour within 12–24 hours.',
        '**Build the whelping kit** — see the Birth Guide for the full checklist (clean towels, bulb syringe, dental floss, iodine, scale, thermometer, emergency vet number).',
      ].join('\n'),
    },
    {
      range: 'Week 9 (Days 57–63)',
      body: [
        'Labour can begin any day from Day 58 onwards. Do not leave her alone overnight from Day 58.',
        '',
        '**Early labour signs** (Stage 1, 6–12 hours):',
        '• Refuses food, restless, repeatedly nesting',
        '• Panting, shivering, pacing, digging at bedding',
        '• Soft contractions — belly flank rises and falls',
        '• Clear or pink-tinged vaginal discharge',
        '',
        '**Active labour** (Stage 2): First puppy should arrive within 30 minutes of strong, visible pushing. If she pushes strongly for 60+ minutes without producing a puppy → emergency vet NOW.',
      ].join('\n'),
    },
  ];
  const header = [
    'A complete week-by-week guide to your dog\'s 63-day pregnancy, with specific dates to watch for and vet checkpoints.',
    '',
    'Gestation in dogs averages 63 days from conception (±2 days). Use the **mating date** if known or the **vet\'s estimated due date** if not. Every recommendation below is anchored to that single day.',
  ].join('\n');
  return [header, ...weeks.map(w => `## ${w.range}\n\n${w.body}`)].join('\n\n');
}

function buildNewbornContent(): string {
  // Day 0 + Days 1-3 + Week 1 + Week 2 from the JRT neonatal events
  const keyEvents = JRT_NEONATAL_EVENTS.filter((e: any) =>
    e.day_offset === 0 || e.day_offset === 1 || e.day_offset === 3 ||
    e.day_offset === 7 || e.day_offset === 10 || e.day_offset === 14
  );
  const intro = [
    'The first 14 days are the most fragile period of a puppy\'s life. Almost all neonatal deaths happen in this window, and the majority are preventable with close monitoring.',
    '',
    'Puppies are born blind, deaf, and unable to regulate their own body temperature. They rely entirely on their mother — and on you.',
    '',
    '## The three numbers to memorise',
    '• **2 hours** — maximum time a puppy can go without nursing before hypoglycaemia starts',
    '• **29.5°C / 85°F** — minimum ambient temperature at puppy level (Week 1)',
    '• **10–20g per day** — healthy daily weight gain in Week 1',
  ].join('\n');
  const eventBlocks = keyEvents.slice(0, 12).map((e: any) => eventBlock(e)).join('\n\n---\n\n');
  return `${intro}\n\n---\n\n${eventBlocks}`;
}

function buildNutritionContent(): string {
  const intro = [
    'Everything about feeding your puppies from birth through weaning at 7–8 weeks.',
    '',
    'Getting nutrition wrong is the #1 cause of fading puppy syndrome, aspiration pneumonia, and stunted growth. The good news: if the mother is healthy and nursing, she does nearly all the work for the first 3 weeks.',
  ].join('\n');

  const weekByWeek = [
    `## Week 1 — Colostrum and milk only`,
    [
      '**Colostrum in the first 12–16 hours** is critical. The antibodies in the first milk pass through the puppy\'s gut wall into the bloodstream — but only during this window. After that, the gut closes.',
      '',
      '• Every puppy nurses every 2 hours, day and night',
      '• Check each puppy has a full, rounded belly after feeding',
      '• If the mother has no milk or won\'t nurse — call your vet same-day for colostrum supplement',
      '',
      '**Supplementing with formula (Esbilac):**',
      '• Volume: **1 ml per 100g body weight per feeding**',
      '• Frequency: every 2 hours (Week 1)',
      '• Temperature: exactly 38°C (100°F) — test on wrist',
      '• Position: puppy belly-down, head slightly elevated. NEVER on their back (aspiration risk).',
    ].join('\n'),

    `## Week 2 — Continue nursing, start night stretching`,
    [
      '• Feeding frequency stretches to every 2.5–3 hours',
      '• Puppies should have doubled their birth weight by Day 10',
      '• Weigh every puppy daily at the same time (morning before first feed)',
      '• Watch for runts — any puppy 25%+ below the heaviest needs extra feeds',
    ].join('\n'),

    `## Week 3 — First solids (weaning introduction)`,
    [
      'Around Day 21, puppies\' teeth start to emerge and the mother will begin spending less time in the box.',
      '',
      '**Introduce "puppy gruel":**',
      '1. Soak puppy kibble in warm water or formula until porridge-consistency',
      '2. Mash with a fork until smooth',
      '3. Offer in a flat, heavy dish the whole litter can reach',
      '4. First few times: dip your finger in and let each puppy lick',
      '5. Most will walk into the bowl — this is normal and expected',
      '',
      'Continue nursing between meals. Do NOT withhold the mother.',
    ].join('\n'),

    `## Week 4 — Gruel thickens, solids increase`,
    [
      '• Reduce water in the gruel slightly each day',
      '• Feed 4–5 times per day, each meal about 2 tablespoons of gruel',
      '• Puppies are now eating 30–50% of their calories from solids',
      '• The mother\'s milk production begins to taper',
    ].join('\n'),

    `## Weeks 5–6 — Transition to moistened kibble`,
    [
      '• Gruel becomes thicker — less water, more kibble',
      '• Introduce just-moistened kibble (not soupy)',
      '• The mother spends most of her day away from the puppies by Week 6',
      '• Feed 4 times per day, ad-lib amounts — puppies stop when full',
    ].join('\n'),

    `## Weeks 7–8 — Fully weaned`,
    [
      '• Puppies are eating dry puppy kibble soaked briefly in water',
      '• Feed 3–4 times per day',
      '• Mother may still let them nurse occasionally — this is fine for comfort, not calories',
      '• Fresh water always available in a shallow, heavy dish',
    ].join('\n'),
  ].join('\n\n');

  return `${intro}\n\n${weekByWeek}`;
}

function buildDevelopmentContent(): string {
  const ens = JRT_NEONATAL_EVENTS.find((e: any) => (e.title ?? '').toLowerCase().includes('ens')) as any;

  return [
    'Critical development windows and early training — from closed eyes to confident little dogs.',
    '',
    'Brain development is locked behind specific age windows. A puppy who missed ENS between Days 3–16, or who wasn\'t socialised between Weeks 3–12, will never fully recover the lost ground.',
    '',
    '## The development timeline',
    '',
    '**Neonatal period (Days 0–14):** Eyes and ears closed. Sleeps 90% of the time. Entirely dependent on mother for warmth and waste elimination.',
    '',
    '**Transitional period (Days 14–21):** Eyes open (Day 10–14), ears open (Day 14–17). First wobbly steps. Baby teeth appear. Startle reflex develops.',
    '',
    '**Awareness period (Days 21–28):** Full senses now working. Begins responding to the environment. First play behaviour — chewing, pouncing, wrestling with littermates.',
    '',
    '**Socialisation window (Weeks 3–12):** The single most important period of a dog\'s life. What they are exposed to now shapes their adult personality. **Miss this window and no amount of adult training can replace it.**',
    '',
    '---',
    '',
    '## ENS — Early Neurological Stimulation (Days 3–16)',
    '',
    'Developed from US Military "Bio Sensor" research. Produces puppies with stronger hearts, better adrenal function, greater stress tolerance, and stronger disease resistance. Effects are permanent.',
    '',
    '**Five exercises, 3–5 seconds each, once per day:**',
    '1. **Tactile stimulation** — Q-tip between the toes on one foot',
    '2. **Head held erect** — vertical, nose pointing up',
    '3. **Head pointed down** — vertical, nose pointing down',
    '4. **Supine position** — on their back, belly up',
    '5. **Thermal stimulation** — paws-down on a cool damp towel',
    '',
    'Total time per puppy: ~30 seconds. Do all 5 in sequence on every puppy in the litter.',
    '',
    '**Warning:** Over-stimulation causes the opposite effect. Never more than once per day. Never longer than 5 seconds per exercise.',
    '',
    '---',
    '',
    '## The socialisation checklist (Weeks 3–8)',
    '',
    'The single best predictor of an emotionally healthy adult dog is the number of positive, gentle novel experiences they had between Weeks 3 and 12.',
    '',
    '**Weeks 3–5 — Passive exposure (still in the whelping area):**',
    '• Different voices (male, female, child — recorded is fine if needed)',
    '• Household sounds (vacuum, hairdryer, doorbell, pots clanking, TV)',
    '• Novel surfaces (carpet, tile, wood, grass, cardboard, towels)',
    '• Gentle handling by 3+ different people — 5 minutes each, once daily',
    '',
    '**Weeks 5–7 — Active introduction:**',
    '• Short supervised outings into different rooms',
    '• Meet friendly adult dogs (fully vaccinated, known to be safe)',
    '• Brief car rides (5 minutes, engine off then on)',
    '• Handling feet, ears, mouth — groundwork for vet visits and nail trims',
    '',
    '**Week 8 — New home:**',
    '• Puppies go to their new families between Weeks 8–9',
    '• Send a "transition blanket" rubbed on the mother and siblings home with each puppy',
    '• Provide new owners the socialisation schedule to continue through Week 12',
  ].join('\n');
}

function buildHealthContent(): string {
  return [
    'Vaccinations, deworming, and vet visits — the complete health schedule from Day 0 to Week 16.',
    '',
    'Missing a single deworming dose creates a worm burden that the puppy can\'t clear before going to their new home. Missing vaccinations leaves the puppy vulnerable to parvovirus — which is 80%+ fatal in unvaccinated puppies under 6 months.',
    '',
    '---',
    '',
    '## Deworming schedule',
    '',
    JRT_HEALTH_SCHEDULE.deworming.map((d: any) =>
      `**Day ${d.day} — ${d.label}**\n${d.plain_english}\n*Targets: ${d.targets.join(', ')}.*`
    ).join('\n\n'),
    '',
    '**Why every 14 days?** Dewormers kill adult worms, not eggs. The worm life cycle is 14 days from egg to adult. A second dose 14 days later catches whatever hatched after the first.',
    '',
    '---',
    '',
    '## Dam deworming during pregnancy',
    '',
    JRT_HEALTH_SCHEDULE.dam_deworming.plain_english,
    '',
    `**Drug:** ${JRT_HEALTH_SCHEDULE.dam_deworming.drug}, ${JRT_HEALTH_SCHEDULE.dam_deworming.dose}.`,
    `**Start:** Day ${JRT_HEALTH_SCHEDULE.dam_deworming.start_day_of_pregnancy} of pregnancy.`,
    `**End:** Day ${JRT_HEALTH_SCHEDULE.dam_deworming.end_days_after_birth} after birth.`,
    '',
    '---',
    '',
    '## Vaccination schedule',
    '',
    JRT_HEALTH_SCHEDULE.vaccinations.map((v: any) =>
      `**Week ${v.week} — ${v.label}**\n${v.plain_english}\n*Covers: ${v.covers.join(', ')}.*`
    ).join('\n\n'),
    '',
    '**Critical:** Puppies are NOT fully protected until 2 weeks after the final puppy dose (around Week 16). Avoid dog parks, communal water bowls, and unknown dogs until then.',
    '',
    '---',
    '',
    '## Red flags that need a vet today',
    '',
    '• Any puppy not nursing for 2+ hours',
    '• Weight loss after Day 1',
    '• Diarrhoea — especially bloody, black, or mucousy',
    '• Vomiting more than once',
    '• Lethargy, floppy, or cold to the touch',
    '• Laboured breathing, blue/white gums',
    '• Swelling, heat, or redness around the umbilical cord',
    '• Any seizure activity',
    '',
    'In the first 2 weeks, a puppy can go from "fine" to critical in hours. Trust your gut — if something feels wrong, call.',
  ].join('\n');
}

// Content for library sections — dynamically built from the infobase on first
// access so we never drift from the source of truth.
const SECTION_CONTENT: Record<string, { title: string; emoji: string; content: string; isFree: boolean; tags: string[] }> = {
  pregnancy: {
    title: 'Pregnancy Care', emoji: '🤰', isFree: true, tags: ['pregnancy'],
    content: buildPregnancyContent(),
  },
  newborn: {
    title: 'Newborn Care (Days 0–14)', emoji: '👶', isFree: true, tags: ['newborn', 'neonatal'],
    content: buildNewbornContent(),
  },
  nutrition: {
    title: 'Nutrition & Feeding', emoji: '🍼', isFree: true, tags: ['feeding', 'formula', 'weaning'],
    content: buildNutritionContent(),
  },
  development: {
    title: 'Development & Training', emoji: '🧠', isFree: true, tags: ['training', 'socialisation', 'ens'],
    content: buildDevelopmentContent(),
  },
  health: {
    title: 'Health & Vet Schedule', emoji: '🏥', isFree: true, tags: ['health', 'deworming', 'vaccination', 'vet'],
    content: buildHealthContent(),
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <ArrowLeft size={22} color="#FFF" strokeWidth={2.5} />
        </Pressable>
        <View style={styles.headerText}>
          {/* Field Journal direction: no emoji — title carries the brand alone */}
          <Text style={styles.headerTitle}>{article.title}</Text>
        </View>
        <Pressable style={styles.shareBtn}>
          <Share2 size={18} color="#FFFFFF90" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Markdown-parsed content — headings, bold, lists, separators render
            correctly instead of showing raw markdown characters.
            Related-events section removed: a user reading an article could
            accidentally tap a live event card and mark a task done. */}
        <MarkdownText source={article.content} />

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
  headerText: { flex: 1, justifyContent: 'center' },
  headerTitle: { fontFamily: 'YoungSerif-Regular', fontSize: 22, color: '#FFF', lineHeight: 28 },
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
