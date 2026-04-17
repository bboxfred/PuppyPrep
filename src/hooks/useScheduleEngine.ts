/**
 * USE SCHEDULE ENGINE HOOK
 *
 * Wraps generateSchedule() with React state management.
 * Exposes: events, isLoading, error, generate(), regenerate()
 *
 * regenerate() calls regenerateSchedule() which preserves
 * completed event status from the previous generation.
 */
import { useState, useCallback } from 'react';
import { usePuppyStore } from '@/store/usePuppyStore';
import { useUserStore } from '@/store/useUserStore';
import { useCalendarStore } from '@/store/useCalendarStore';
import { generateSchedule, regenerateSchedule, getScheduleSummary, type ScheduleSummary } from '@/data/schedule-engine';
import type { CalendarEvent } from '@/data/schedule-engine/event-builder';

/** Build ScheduleInput from the current Zustand store state */
function buildScheduleInput() {
  const store = usePuppyStore.getState();
  const user = useUserStore.getState();

  return {
    dog_id: store.dogId ?? 'local_dog_1',
    breed_id: store.breedId ?? 'mixed_breed',
    breed_name: store.breedName ?? 'Mixed Breed',
    size_category: store.sizeCategory ?? 'medium' as const,
    status: store.status ?? 'born' as const,
    mating_date: store.matingDate ? new Date(store.matingDate) : undefined,
    estimated_due_date: store.estimatedDueDate ? new Date(store.estimatedDueDate) : undefined,
    birth_date: store.birthDate ? new Date(store.birthDate) : undefined,
    date_is_estimated: store.dateIsEstimated,
    puppy_count: store.puppyCount ?? undefined,
    is_singleton: store.isSingleton,
    nursing_status: store.nursingStatus ?? (store.status === 'born' ? 'all' : undefined),
    dam_weight_kg: store.damWeightKg ?? 6.5,
    dam_age_band: store.damAgeBand ?? '2_to_5' as const,
    first_litter: store.firstLitter ?? true,
    vet_confirmed: store.vetConfirmed ?? (store.status === 'born' ? 'ultrasound' as const : 'not_yet' as const),
    is_jrt_type: store.isJrtType,
    is_fox_terrier: store.isFoxTerrier,
    is_wire_fox_terrier: store.isWireFoxTerrier,
    is_border_terrier: store.isBorderTerrier,
    is_min_pin: store.isMinPin,
    is_rat_terrier: store.isRatTerrier,
    rat_terrier_variety: store.ratTerrierVariety ?? undefined,
    notif_time: user.notifTime,
    notif_lead_time_hours: user.notifLeadTimeHours,
  };
}

export function useScheduleEngine() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<ScheduleSummary | null>(null);

  const events = useCalendarStore((s) => s.events);
  const setEvents = useCalendarStore((s) => s.setEvents);

  /** Generate a fresh schedule from onboarding answers */
  const generate = useCallback(async (): Promise<CalendarEvent[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const input = buildScheduleInput();
      const generated = await generateSchedule(input);
      setEvents(generated);
      setSummary(getScheduleSummary(generated));
      return generated;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Schedule generation failed';
      setError(msg);
      console.error('[useScheduleEngine] Generate failed:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [setEvents]);

  /** Regenerate schedule preserving completed event status */
  const regenerate = useCallback(async (): Promise<CalendarEvent[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const input = buildScheduleInput();
      const previousEvents = useCalendarStore.getState().events;
      const generated = await regenerateSchedule(input, previousEvents);
      setEvents(generated);
      setSummary(getScheduleSummary(generated));
      return generated;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Schedule regeneration failed';
      setError(msg);
      console.error('[useScheduleEngine] Regenerate failed:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [setEvents]);

  return {
    events,
    isLoading,
    error,
    summary,
    generate,
    regenerate,
  };
}
