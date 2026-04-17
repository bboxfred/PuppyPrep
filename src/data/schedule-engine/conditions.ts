/**
 * CONDITIONS CHECKER
 * File: src/data/schedule-engine/conditions.ts
 *
 * All conditional branching logic lives here.
 * The schedule engine calls these functions to decide which extra
 * event blocks to add or modify for each user's specific situation.
 *
 * RULE: Each function returns a CalendarEvent[] (possibly empty).
 * The engine adds all returned events to the master list.
 * Empty array = condition not met, nothing added.
 */

import { CalendarEvent, addDays, addWeeks, toDateString } from './event-builder';
import {
  expandSingletonProtocol,
  expandLargeLitterEvents,
} from './repeating-events';

// ─────────────────────────────────────────────────────────────────────────────
// SCHEDULE INPUT — the full set of answers from onboarding
// ─────────────────────────────────────────────────────────────────────────────

export interface ScheduleInput {
  // Identity
  dog_id: string;
  breed_id: string;
  breed_name: string;
  size_category: 'toy' | 'small' | 'medium' | 'large' | 'giant';

  // Status
  status: 'pregnant' | 'born';

  // Dates
  mating_date?: Date;
  estimated_due_date?: Date;      // Set if mating_date known OR vet gave estimate
  birth_date?: Date;              // Set if status = 'born'
  date_is_estimated?: boolean;    // true = vet estimate, not exact mating date

  // Puppy facts (if born)
  puppy_count?: number;
  is_singleton: boolean;          // puppy_count === 1
  nursing_status?: 'all' | 'some' | 'none_or_unsure';

  // Dam facts
  dam_weight_kg: number;
  dam_age_band: 'under_1' | '1_to_2' | '2_to_5' | '5_to_7' | 'over_7';
  first_litter: boolean;
  vet_confirmed: 'ultrasound' | 'exam_only' | 'not_yet';

  // Breed-specific flags (populated from registry.ts)
  is_jrt_type: boolean;           // JRT, Parson Russell, Russell Terrier
  is_fox_terrier: boolean;
  is_wire_fox_terrier: boolean;   // Subset of fox_terrier — adds coat events
  is_border_terrier: boolean;
  is_min_pin: boolean;
  is_rat_terrier: boolean;
  rat_terrier_variety?: 'miniature' | 'standard';

  // Notification preferences
  notif_time: string;             // 'HH:MM' e.g. '08:00'
  notif_lead_time_hours: number;  // 24 = 1 day before

  // Computed by engine before conditions run
  anchor_date: Date;              // birth_date OR estimated_due_date
  feeding_frequency_hours: { week_1: number; week_2: number; week_3: number; week_4: number };
  hypoglycemia_risk: 'low' | 'medium' | 'high';
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITION: VET NOT YET CONFIRMED
// ─────────────────────────────────────────────────────────────────────────────

export function checkVetNotConfirmed(
  input: ScheduleInput
): CalendarEvent[] {
  // Only relevant for pregnant dogs — if born, pregnancy is obviously confirmed
  if (input.status === 'born') return [];
  if (input.vet_confirmed !== 'not_yet') return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return [{
    id: `${input.breed_id}_vet_urgent_${toDateString(today)}`,
    dog_id: input.dog_id,
    title: '🔴 URGENT: Book a vet appointment today',
    date: today,
    day_number: -999,
    category: 'health',
    priority: 'critical',
    description: 'The pregnancy has not been confirmed by a vet. This is your most urgent task.',
    detail: 'A vet visit is essential before birth to:\n\n1. Confirm she is actually pregnant\n2. Get an accurate puppy count\n3. Identify any complications early\n4. Ensure you have the vet\'s emergency number\n\n**What to tell the vet:** "My dog is pregnant, I need a confirmation visit and puppy count."',
    is_free: true,
    is_repeating: false,
    completed: false,
    emergency_contact_recommended: true,
    vet_action: 'Book appointment for pregnancy confirmation and puppy count',
    call_vet_if: 'You cannot get an appointment within 48 hours',
    tags: ['vet', 'urgent', 'pregnancy_confirmation'],
    category_color: '#E63946',
    priority_badge_color: '#E63946',
  }];
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITION: HIGH-RISK DAM AGE
// ─────────────────────────────────────────────────────────────────────────────

export function checkDamAge(input: ScheduleInput): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const isHighRisk =
    input.dam_age_band === 'under_1' ||
    input.dam_age_band === '1_to_2' ||
    input.dam_age_band === '5_to_7' ||
    input.dam_age_band === 'over_7';

  if (!isHighRisk) return [];

  const anchor = input.anchor_date;
  const isYoung = input.dam_age_band === 'under_1' || input.dam_age_band === '1_to_2';
  const isOld   = input.dam_age_band === '5_to_7' || input.dam_age_band === 'over_7';

  const eventDate = input.status === 'pregnant'
    ? addDays(anchor, -7)  // 1 week before due date
    : new Date();          // Today for born puppies

  eventDate.setHours(0, 0, 0, 0);

  // Different content for pregnant vs born
  if (input.status === 'pregnant') {
    events.push({
      id: `${input.breed_id}_age_risk_vet_standby_${toDateString(eventDate)}`,
      dog_id: input.dog_id,
      title: isYoung
        ? '⚠️ Young dam: Have vet on standby for labour'
        : '⚠️ Older dam: Discuss C-section risk with vet',
      date: eventDate,
      day_number: -7,
      category: 'health',
      priority: 'critical',
      description: isYoung
        ? 'Dogs under 2 years often have longer labours. Your vet needs to know.'
        : 'Dogs over 5 years have increased C-section risk. Plan ahead.',
      detail: isYoung
        ? 'Young mothers are more likely to experience longer labour, uterine inertia, and difficulty nursing.\n\n**Action:** Call your vet and tell them your dog is pregnant and under 2 years old. Ask them to be reachable during labour.'
        : 'Older dams face higher risks including weaker contractions, slower recovery, and eclampsia.\n\n**Action:** Discuss with your vet whether a C-section is safer. Ensure you have 24-hour emergency vet access.',
      is_free: true,
      is_repeating: false,
      completed: false,
      emergency_contact_recommended: true,
      vet_action: isYoung ? 'Notify vet of young dam' : 'Discuss C-section with vet',
      call_vet_if: 'Any labour complication — do not wait with a young or older dam',
      tags: ['age_risk', 'vet', isYoung ? 'young_dam' : 'older_dam'],
      category_color: '#E63946',
      priority_badge_color: '#E63946',
    });
  } else {
    // Born — postpartum monitoring for at-risk age groups
    events.push({
      id: `${input.breed_id}_age_risk_postpartum_${toDateString(eventDate)}`,
      dog_id: input.dog_id,
      title: isYoung
        ? '⚠️ Young dam: Monitor nursing and recovery closely'
        : '⚠️ Older dam: Watch for slow recovery',
      date: eventDate,
      day_number: 0,
      category: 'health',
      priority: 'high',
      description: isYoung
        ? 'Young mothers may have difficulty nursing. Watch that all puppies are feeding.'
        : 'Older dams recover slower and are at higher risk of eclampsia (milk fever).',
      detail: isYoung
        ? 'Young mothers (under 2) may:\n- Not produce milk immediately\n- Be confused or fearful of puppies initially\n- Need help guiding puppies to nurse\n\n**Watch for:** puppies crying constantly, not gaining weight, dam ignoring puppies.'
        : 'Older dams (5+) are at elevated risk for:\n- Eclampsia (weeks 2–5 postpartum) — watch for trembling, stiff gait, seizures\n- Mastitis — check mammary glands daily\n- Slower milk production\n\n**Watch for:** any trembling, stumbling, or refusal to nurse.',
      is_free: true,
      is_repeating: false,
      completed: false,
      emergency_contact_recommended: isOld,
      call_vet_if: isOld ? 'Any trembling, stiff gait, or seizure-like signs — eclampsia can be fatal within 30 minutes' : undefined,
      tags: ['age_risk', isYoung ? 'young_dam' : 'older_dam', 'postpartum'],
      category_color: '#E63946',
      priority_badge_color: '#F4A261',
    });
  }

  return events;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITION: FIRST LITTER
// ─────────────────────────────────────────────────────────────────────────────

export function checkFirstLitter(input: ScheduleInput): CalendarEvent[] {
  if (!input.first_litter) return [];
  // Reassurance events reference puppies, nursing, eyes opening — only for born status
  if (input.status !== 'born') return [];

  const events: CalendarEvent[] = [];
  const anchor = input.anchor_date;

  // Extra reassurance events in weeks 1–2
  const reassuranceWeeks = [
    {
      day: 3,
      title: 'First litter: Is this normal? Week 1 guide',
      detail: 'First-time breeders commonly worry about things that are completely normal. Here\'s what IS normal in week 1:\n\n✅ Puppies crying — normal when hungry or cold. Should stop once nursing.\n✅ Mother eating placentas — normal, natural behaviour.\n✅ Greenish-black discharge from mother for 24–48 hours — normal (it\'s the last placentas clearing).\n✅ Puppies twitching and jerking during sleep — this is "activated sleep", normal neurological development.\n✅ Puppies piling on top of each other — normal warmth-seeking behaviour.\n✅ Mother seeming possessive or growling when you approach — normal protective instinct.\n\n🔴 NOT normal: persistent crying with no pause, cold puppies, weight loss after Day 1, green discharge continuing past 48 hours.',
    },
    {
      day: 10,
      title: 'First litter: Eyes opening — what to expect',
      detail: 'Eyes open between Days 10–14. What first-time breeders often worry about:\n\n✅ Eyes look cloudy or blue-grey — this is NORMAL. Clear vision develops over weeks.\n✅ Eyes open slightly differently for each puppy — normal.\n✅ Eyes look a bit gunky as they first open — wipe gently with a warm damp cloth.\n\n🔴 Call your vet if: Any eye appears swollen, has obvious discharge behind a still-closed lid, or any puppy hasn\'t opened their eyes by Day 21.',
    },
  ];

  for (const r of reassuranceWeeks) {
    const eventDate = addDays(anchor, r.day);
    const dateStr = toDateString(eventDate);

    events.push({
      id: `${input.breed_id}_first_litter_${r.day}_${dateStr}`,
      dog_id: input.dog_id,
      title: r.title,
      date: eventDate,
      day_number: r.day,
      category: 'development',
      priority: 'recommended',
      description: 'Guidance for first-time breeders — what\'s normal vs what needs attention.',
      detail: r.detail,
      is_free: true,
      is_repeating: false,
      completed: false,
      emergency_contact_recommended: false,
      tags: ['first_litter', 'reassurance', `day_${r.day}`],
      category_color: '#74C69D',
      priority_badge_color: '#2D6A4F',
    });
  }

  return events;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITION: SINGLETON PUPPY
// ─────────────────────────────────────────────────────────────────────────────

export function checkSingleton(input: ScheduleInput): CalendarEvent[] {
  if (!input.is_singleton) return [];

  const anchor = input.anchor_date;
  const events: CalendarEvent[] = [];

  // Day 0 warning
  const day0 = new Date(anchor);
  day0.setHours(0, 0, 0, 0);

  events.push({
    id: `${input.breed_id}_singleton_warning_${toDateString(day0)}`,
    dog_id: input.dog_id,
    title: '⚠️ Single puppy — singleton protocol starts Week 3',
    date: day0,
    day_number: 0,
    category: 'socialization',
    priority: 'high',
    description: 'One puppy means no littermates. Without intervention, this puppy will develop serious behavioural problems. Your calendar has weekly instructions from Week 3.',
    detail: 'A single puppy raised alone will miss the most critical social learning of their life:\n\n- **Bite inhibition** — learned entirely from littermate feedback. Without it, this dog will bite too hard for their whole life.\n- **Frustration tolerance** — learned from competing for teats and resources. Without it, this dog cannot cope with not getting what they want.\n- **Social signals** — play bows, yelps, body language. Without it, this dog will misread other dogs and trigger conflicts.\n\n**What you will do from Week 3:** Deliberate rough play, controlled frustration training, finding a play partner, crate independence building. All of this is in your calendar week by week.\n\nThis is not optional. Singleton syndrome is the leading reason single-puppy litters are rehomed or euthanised as adults.',
    is_free: true,
    is_repeating: false,
    completed: false,
    emergency_contact_recommended: false,
    tags: ['singleton', 'behavior', 'critical_alert'],
    category_color: '#457B9D',
    priority_badge_color: '#F4A261',
  });

  // Add weekly singleton protocol events
  const singletonEvents = expandSingletonProtocol(anchor, input.dog_id, input.breed_id);
  events.push(...singletonEvents);

  return events;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITION: LARGE LITTER (8+)
// ─────────────────────────────────────────────────────────────────────────────

export function checkLargeLitter(input: ScheduleInput): CalendarEvent[] {
  if (!input.puppy_count || input.puppy_count < 8) return [];

  return expandLargeLitterEvents(
    input.anchor_date,
    input.dog_id,
    input.breed_id,
    input.puppy_count
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITION: WIRE FOX TERRIER (coat care)
// ─────────────────────────────────────────────────────────────────────────────

export function checkWireFoxTerrier(input: ScheduleInput): CalendarEvent[] {
  if (!input.is_wire_fox_terrier) return [];

  const anchor = input.anchor_date;
  const events: CalendarEvent[] = [];

  const coatWeeks = [
    {
      week: 3,
      title: 'Wire coat: Begin grooming desensitisation',
      description: 'Wire Fox Terriers need early positive associations with being touched and brushed.',
      detail: 'Wire Fox Terriers have a dense wiry double coat that needs regular grooming throughout their life. If puppies are not desensitised early, they will resist grooming for life — making every future grooming session a battle.\n\n**This week:** Run your fingers firmly along the puppies\' backs, flanks, and ears during handling sessions. They should accept being touched all over without flinching. 5–10 minutes per session.',
    },
    {
      week: 4,
      title: 'Wire coat: Introduce soft brush',
      description: 'First brush experience — gentle strokes along the back.',
      detail: 'Use a very soft baby brush or soft slicker brush. Gentle strokes along the back and sides while the puppy is calm (after a feeding, sleepy). 30–60 seconds maximum. Immediately reward with gentle praise and a tiny treat if weaning has started.',
    },
    {
      week: 6,
      title: 'Wire coat: Introduce metal comb',
      description: 'Metal greyhound comb — the main adult grooming tool.',
      detail: 'Introduce a metal rat-tail or greyhound comb through the wiry coat. Brief sessions only (1–2 minutes). The puppy should learn that this sensation is normal and non-threatening.\n\n**Important note for new owners:** Wire Fox Terriers must NEVER be clipped. Clipping ruins the wire coat texture permanently. They need hand-stripping by a specialist groomer every 3–4 months. Tell new owners this before they go home.',
    },
  ];

  for (const w of coatWeeks) {
    const eventDate = addWeeks(anchor, w.week);
    const dateStr = toDateString(eventDate);

    events.push({
      id: `${input.breed_id}_wire_coat_week${w.week}_${dateStr}`,
      dog_id: input.dog_id,
      title: w.title,
      date: eventDate,
      day_number: w.week * 7,
      category: 'training',
      priority: 'recommended',
      description: w.description,
      detail: w.detail,
      is_free: false,
      is_repeating: false,
      completed: false,
      emergency_contact_recommended: false,
      tags: ['wire_coat', 'grooming', `week_${w.week}`],
      category_color: '#6A4C93',
      priority_badge_color: '#2D6A4F',
    });
  }

  return events;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITION: FOX TERRIER (hearing check — BAER test)
// ─────────────────────────────────────────────────────────────────────────────

export function checkFoxTerrier(input: ScheduleInput): CalendarEvent[] {
  if (!input.is_fox_terrier) return [];
  if (input.status !== 'born') return [];

  const anchor = input.anchor_date;
  const events: CalendarEvent[] = [];

  // BAER hearing test recommendation at week 5-6
  const hearingDate = addWeeks(anchor, 5);
  events.push({
    id: `${input.breed_id}_baer_hearing_test_${toDateString(hearingDate)}`,
    dog_id: input.dog_id,
    title: 'Fox Terrier: Book BAER hearing test',
    date: hearingDate,
    day_number: 35,
    category: 'health',
    priority: 'high',
    description: 'Fox Terriers have higher rates of congenital deafness, especially white-coated puppies. A BAER test at 5–8 weeks checks hearing in each ear.',
    detail: 'Deafness is more common in Fox Terriers than average. The BAER (Brainstem Auditory Evoked Response) test checks hearing in each ear separately.\n\n**When:** 5–8 weeks of age\n**Ask your vet:** "Can you perform BAER testing or refer us to a facility that can?"\n\n**Why it matters:** Deaf puppies can live full happy lives but need training adaptations. New owners need to know before taking a puppy home.\n\n**Quick home check at Week 4:** Clap behind the puppy when it cannot see you. No ear movement or startle response = possible deafness.',
    is_free: true,
    is_repeating: false,
    completed: false,
    emergency_contact_recommended: false,
    vet_action: 'Book BAER hearing test for Fox Terrier puppies at 5–8 weeks',
    tags: ['fox_terrier', 'hearing', 'baer', 'genetic', 'week_5'],
    category_color: '#D4726A',
    priority_badge_color: '#D4A84B',
  });

  return events;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITION: BORDER TERRIER (CECS + heart check)
// ─────────────────────────────────────────────────────────────────────────────

export function checkBorderTerrier(input: ScheduleInput): CalendarEvent[] {
  if (!input.is_border_terrier) return [];

  const anchor = input.anchor_date;
  const events: CalendarEvent[] = [];

  // Week 6 vet visit — add heart murmur check request
  const vetVisitDate = addWeeks(anchor, 6);
  events.push({
    id: `${input.breed_id}_border_heart_check_${toDateString(vetVisitDate)}`,
    dog_id: input.dog_id,
    title: 'Border Terrier: Ask vet to check hearts at 6-week visit',
    date: vetVisitDate,
    day_number: 42,
    category: 'health',
    priority: 'high',
    description: 'Border Terriers have higher rates of pulmonic stenosis (heart valve issue). Ask the vet to specifically listen to each puppy\'s heart today.',
    detail: 'Pulmonic stenosis is a narrowing of the pulmonary valve, present from birth. Border Terriers have a higher incidence than most breeds.\n\nAt today\'s 6-week vet visit, specifically ask: "Can you listen for heart murmurs in each puppy? Border Terriers have elevated risk of pulmonic stenosis."\n\nA murmur does not automatically mean a serious problem. Grading:\n- Grade 1–2: Often monitored only\n- Grade 3–4: Echocardiogram recommended\n- Grade 5–6: Likely to need intervention\n\nTell new owners so they can monitor and get annual checks.',
    is_free: false,
    is_repeating: false,
    completed: false,
    emergency_contact_recommended: false,
    vet_action: 'Ask vet to auscultate each puppy\'s heart specifically for murmurs',
    tags: ['border_terrier', 'heart', 'pulmonic_stenosis', 'vet_week6'],
    category_color: '#E63946',
    priority_badge_color: '#F4A261',
  });

  // CECS monitoring reminder — from month 3
  const cecsMilestone = addDays(anchor, 84); // ~3 months
  events.push({
    id: `${input.breed_id}_cecs_monitoring_${toDateString(cecsMilestone)}`,
    dog_id: input.dog_id,
    title: 'Border Terrier: Watch for CECS ("Spike\'s Disease") from now',
    date: cecsMilestone,
    day_number: 84,
    category: 'health',
    priority: 'high',
    description: 'Canine Epileptoid Cramping Syndrome is unique to Border Terriers. Symptoms typically appear from 3 months.',
    detail: 'CECS (Canine Epileptoid Cramping Syndrome), also called "Spike\'s Disease", is unique to Border Terriers. It is NOT a true epileptic seizure.\n\n**What an episode looks like:**\n- Dog suddenly cannot walk normally\n- Slow, stumbling movement or unable to stand\n- Retching, gulping, or chewing motions\n- Episode lasts 2–30 minutes\n- Dog recovers completely and seems normal afterwards\n\n**What to do if you see this:**\n1. Stay calm — the dog is not in pain and will recover\n2. Keep the dog safe (away from stairs, water)\n3. Record the episode on video if possible\n4. Contact your vet — describe what you saw\n\n**CECS is NOT treated with anti-epileptic drugs.** Treatment is usually a gluten-free diet and lifestyle management.\n\n**Tell new owners** this is a breed-specific condition to watch for.',
    is_free: false,
    is_repeating: false,
    completed: false,
    emergency_contact_recommended: false,
    call_vet_if: 'Any puppy shows sudden inability to walk or strange movement — describe it fully',
    tags: ['border_terrier', 'cecs', 'spikes_disease', 'month_3'],
    category_color: '#E63946',
    priority_badge_color: '#F4A261',
  });

  return events;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITION: MINIATURE PINSCHER (elevated risk protocols)
// ─────────────────────────────────────────────────────────────────────────────

export function checkMinPin(input: ScheduleInput): CalendarEvent[] {
  if (!input.is_min_pin) return [];

  const anchor = input.anchor_date;
  const events: CalendarEvent[] = [];

  // Day 0 — tube size warning
  const day0 = new Date(anchor);
  day0.setHours(0, 0, 0, 0);

  events.push({
    id: `${input.breed_id}_minpin_tube_warning_${toDateString(day0)}`,
    dog_id: input.dog_id,
    title: '⚠️ Min Pin: Use French 3 tube if tube feeding needed',
    date: day0,
    day_number: 0,
    category: 'health',
    priority: 'critical',
    description: 'If any puppy needs tube feeding, use French 3 ONLY — not French 5.',
    detail: 'Miniature Pinscher newborns are significantly smaller than JRTs. If tube feeding becomes necessary:\n\n**Use French 3 feeding tube — NOT French 4 or French 5.**\n\nUsing the wrong tube size can cause trauma to the oesophagus or trachea. French 3 is the correct size for Min Pin newborns.\n\nFor tube insertion depth: measure from the puppy\'s mouth to their last rib. For a 130g Min Pin newborn, this is typically 2.5–3cm. Mark the tube and do not insert past this point.',
    is_free: true,
    is_repeating: false,
    completed: false,
    emergency_contact_recommended: false,
    tags: ['min_pin', 'tube_feeding', 'critical_safety'],
    category_color: '#E63946',
    priority_badge_color: '#E63946',
  });

  // Legg-Calvé-Perthes monitoring from month 3
  const lcpDate = addDays(anchor, 84);
  events.push({
    id: `${input.breed_id}_minpin_lcp_${toDateString(lcpDate)}`,
    dog_id: input.dog_id,
    title: 'Min Pin: Watch for Legg-Calvé-Perthes from now',
    date: lcpDate,
    day_number: 84,
    category: 'health',
    priority: 'high',
    description: 'LCP is very common in Min Pins. Signs appear at 3–6 months: progressive hind leg lameness.',
    detail: 'Legg-Calvé-Perthes Disease (LCP) affects the head of the femur (hip ball joint) — the bone begins to lose blood supply and crumble. It is very common in Miniature Pinschers.\n\n**Signs (appearing 3–6 months):**\n- Gradually stops using one back leg\n- Muscle of the affected leg visibly wastes (becomes thinner than the other)\n- Pain on manipulation of the hip\n- Reluctance to jump, run, or use stairs\n\n**Treatment:** Surgery (FHO — femoral head ostectomy). Outcomes are excellent if caught early. Most dogs return to full activity.\n\n**Action from today:** Check both hind legs weekly. Watch the puppy walk. Any favouring of one leg = vet appointment within 48 hours.\n\nTell all new owners — this is a breed priority.',
    is_free: false,
    is_repeating: false,
    completed: false,
    emergency_contact_recommended: false,
    call_vet_if: 'Any limping or reluctance to use a back leg — within 48 hours',
    tags: ['min_pin', 'lcp', 'hip', 'month_3'],
    category_color: '#E63946',
    priority_badge_color: '#F4A261',
  });

  return events;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITION: MINIATURE RAT TERRIER
// ─────────────────────────────────────────────────────────────────────────────

export function checkMiniatureRatTerrier(input: ScheduleInput): CalendarEvent[] {
  if (!input.is_rat_terrier || input.rat_terrier_variety !== 'miniature') return [];

  const anchor = input.anchor_date;
  const day0 = new Date(anchor);
  day0.setHours(0, 0, 0, 0);

  return [{
    id: `${input.breed_id}_mini_rt_hypoglycemia_warning_${toDateString(day0)}`,
    dog_id: input.dog_id,
    title: '⚠️ Miniature Rat Terrier: 90-min feedings in Week 1',
    date: day0,
    day_number: 0,
    category: 'health',
    priority: 'critical',
    description: 'Miniature Rat Terrier newborns have very small fat reserves. Feed every 90 minutes in Week 1 — not every 2 hours.',
    detail: 'Miniature Rat Terrier puppies (100–180g at birth) have proportionally less fat and glycogen stored than standard-sized Rat Terriers or JRTs. A missed feeding in Week 1 can trigger hypoglycaemia within 60–90 minutes.\n\n**Week 1 feeding schedule:** Every 90 minutes, including through the night.\n**Week 2:** Every 2 hours.\n**Week 3:** Every 2.5 hours.\n\nIf any puppy seems limp, glassy-eyed, or unresponsive:\n1. Rub corn syrup or honey on the gums immediately\n2. Warm the puppy against your bare skin\n3. Call your vet\n\nDo not wait to see if they improve.',
    is_free: true,
    is_repeating: false,
    completed: false,
    emergency_contact_recommended: true,
    tags: ['miniature_rat_terrier', 'hypoglycemia', 'critical'],
    category_color: '#E63946',
    priority_badge_color: '#E63946',
  }];
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITION: RAT TERRIER ALLERGY WATCH AT WEANING
// ─────────────────────────────────────────────────────────────────────────────

export function checkRatTerrierAllergy(input: ScheduleInput): CalendarEvent[] {
  if (!input.is_rat_terrier) return [];

  const weaningDate = addDays(input.anchor_date, 24); // ~3.5 weeks

  return [{
    id: `${input.breed_id}_rt_allergy_watch_${toDateString(weaningDate)}`,
    dog_id: input.dog_id,
    title: 'Rat Terrier: Single-protein food at weaning — allergy watch',
    date: weaningDate,
    day_number: 24,
    category: 'nutrition',
    priority: 'high',
    description: 'Rat Terriers are more allergy-prone than other terriers. Introduce one protein at a time when weaning.',
    detail: 'Rat Terriers have a higher-than-average predisposition to atopic dermatitis (skin allergies). When introducing solid food:\n\n1. **Use a single-protein puppy food only** (e.g. chicken only, or lamb only — not mixed proteins)\n2. **Watch for reactions in the first 3 days:** redness between toes, itching, licking paws, skin rash, loose stools\n3. **If reactions occur:** switch to a different single protein and note which one caused the reaction\n4. **Do not introduce multiple new foods in the same week**\n\nTell new owners: Rat Terriers may benefit from a limited ingredient diet. Any persistent itching, paw licking, or skin issues from 6 months onward = vet allergy assessment.',
    is_free: false,
    is_repeating: false,
    completed: false,
    emergency_contact_recommended: false,
    call_vet_if: 'Any puppy develops significant redness, swelling, rash, or severe itching within 3 days of a new food',
    tags: ['rat_terrier', 'allergy', 'weaning', 'nutrition'],
    category_color: '#F4A261',
    priority_badge_color: '#F4A261',
  }];
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITION: NURSING ISSUES (emergency triage)
// ─────────────────────────────────────────────────────────────────────────────

export function checkNursingStatus(input: ScheduleInput): CalendarEvent[] {
  if (
    input.status !== 'born' ||
    !input.nursing_status ||
    input.nursing_status === 'all'
  ) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isNone = input.nursing_status === 'none_or_unsure';

  return [{
    id: `${input.breed_id}_nursing_alert_${toDateString(today)}`,
    dog_id: input.dog_id,
    title: isNone
      ? '🚨 EMERGENCY: No puppies nursing — act now'
      : '⚠️ URGENT: Some puppies not nursing',
    date: today,
    day_number: 0,
    category: 'health',
    priority: 'critical',
    description: isNone
      ? 'No puppy has nursed yet. This is an emergency — colostrum window closes in 12 hours.'
      : 'One or more puppies are not latching. They must receive colostrum within the next few hours.',
    detail: isNone
      ? '**Every minute counts.** Puppies that do not receive colostrum in the first 12–16 hours have almost no immune protection.\n\n**Do these steps right now:**\n1. Check the mother — is she allowing the puppies near her nipples?\n2. Check each puppy — are they strong enough to latch and suckle?\n3. If the mother is allowing nursing but puppies can\'t latch: hand-express colostrum into a syringe and carefully drip it onto each puppy\'s tongue\n4. If the mother is refusing to nurse: call your vet immediately\n5. Have Esbilac (puppy milk replacer) ready as emergency backup\n\n**Call your vet NOW** if no puppy has nursed 2 hours after birth.'
      : '**Act immediately.** For each puppy not latching:\n1. Check their mouth for cleft palate (finger sweep along roof of mouth)\n2. Check they are warm — cold puppies can\'t nurse properly. Warm them first.\n3. Physically guide the puppy\'s mouth onto a nipple and hold them in place\n4. Try the rear-most teats — highest milk flow\n5. If still not latching after 30 minutes: begin tube or bottle feeding with Esbilac\n\n**Call your vet** if any puppy has not nursed within 2 hours of birth.',
    is_free: true,
    is_repeating: false,
    completed: false,
    emergency_contact_recommended: true,
    call_vet_if: 'Any puppy has not nursed within 2 hours of birth',
    tags: ['nursing', 'emergency', 'colostrum'],
    category_color: '#E63946',
    priority_badge_color: '#E63946',
  }];
}

// ─────────────────────────────────────────────────────────────────────────────
// MASTER CONDITIONS RUNNER
// Called by schedule-engine.ts — runs all checks and returns all extra events
// ─────────────────────────────────────────────────────────────────────────────

export function runAllConditions(input: ScheduleInput): CalendarEvent[] {
  const allEvents: CalendarEvent[] = [];

  allEvents.push(...checkVetNotConfirmed(input));
  allEvents.push(...checkDamAge(input));
  allEvents.push(...checkFirstLitter(input));
  allEvents.push(...checkSingleton(input));
  allEvents.push(...checkLargeLitter(input));
  allEvents.push(...checkFoxTerrier(input));
  allEvents.push(...checkWireFoxTerrier(input));
  allEvents.push(...checkBorderTerrier(input));
  allEvents.push(...checkMinPin(input));
  allEvents.push(...checkMiniatureRatTerrier(input));
  allEvents.push(...checkRatTerrierAllergy(input));
  allEvents.push(...checkNursingStatus(input));

  return allEvents;
}
