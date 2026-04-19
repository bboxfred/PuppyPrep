/**
 * LARGE WIDGET — 4×4 HOME-SCREEN TILE
 *
 * Layout (top to bottom):
 *   1. Dog name + days until due / puppy age
 *   2. Today's top critical task
 *   3. "+ N more tasks" counter (tappable → opens app)
 *   4. 6-week calendar strip with event dots per day
 *
 * Battery-friendly: updatePeriodMillis = 0 in eas widgets config
 * (no scheduled refresh). The widget updates only when:
 *   - User opens / interacts with the app (via requestWidgetUpdate on
 *     dashboard mount + key mutations)
 *   - User taps the widget (opens the app, which then refreshes data)
 *   - A notification fires at the user's chosen reminder time (a separate
 *     background task that ships with the notification will also update
 *     the widget)
 *
 * Widget UI is rendered via react-native-android-widget's <FlexWidget />
 * primitives — they compile to Android Jetpack Glance at build time.
 */
import { FlexWidget, TextWidget } from 'react-native-android-widget';

// react-native-android-widget's ColorProp requires `#RRGGBB` or `#RRGGBBAA`
// literals — it rejects `'transparent'` or CSS keywords. Typing these as
// the template-literal type enforces the format at compile time.
type HexColor = `#${string}`;

const FOREST: HexColor = '#2D4A32';
const PAPER: HexColor = '#F5EDE0';
const INK: HexColor = '#1E2A22';
const INK_SOFT: HexColor = '#5A6B5F';
const RULE: HexColor = '#D8CFBE';
const TERRACOTTA: HexColor = '#C05B3F';
const OCHRE: HexColor = '#C89B4A';
const TRANSPARENT: HexColor = '#00000000';

export interface WidgetData {
  /** "Rosie" or the breed name fallback */
  dogName: string;
  /** "Day 4" or "Due in 18 days" */
  ageOrCountdown: string;
  /** Most critical task title, or "No tasks today" */
  topTaskTitle: string;
  topTaskPriority: 'critical' | 'high' | 'recommended' | 'none';
  /** How many MORE tasks exist today beyond the one shown */
  moreTasksCount: number;
  /** 42-day event dot strip: one entry per day from today−1wk through today+5wks */
  calendarDots: Array<{
    day: number;            // day-of-month number
    isToday: boolean;
    hasCritical: boolean;
    hasHigh: boolean;
    hasRecommended: boolean;
  }>;
  /** ISO of when this snapshot was built — for debug only */
  generatedAt: string;
}

// ─── Color helpers ─────────────────────────────────────────────────────────
function priorityColor(p: WidgetData['topTaskPriority']): HexColor {
  switch (p) {
    case 'critical': return TERRACOTTA;
    case 'high':     return OCHRE;
    case 'recommended': return FOREST;
    default:         return INK_SOFT;
  }
}

// ─── Widget component ──────────────────────────────────────────────────────
export function TodayCalendarWidget({ data }: { data: WidgetData }) {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: PAPER,
        borderRadius: 20,
        padding: 16,
        flexDirection: 'column',
      }}
      clickAction="OPEN_APP"
    >
      {/* Header: dog name + countdown */}
      <FlexWidget
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 'match_parent',
          marginBottom: 6,
        }}
      >
        <TextWidget
          text={data.dogName}
          style={{ fontSize: 16, fontWeight: '700', color: INK }}
          truncate="END"
          maxLines={1}
        />
        <TextWidget
          text={data.ageOrCountdown}
          style={{ fontSize: 13, color: INK_SOFT, fontStyle: 'italic' }}
          truncate="END"
          maxLines={1}
        />
      </FlexWidget>

      {/* Top critical task row */}
      <FlexWidget
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 'match_parent',
          paddingVertical: 8,
          marginBottom: 6,
          borderTopColor: RULE,
          borderTopWidth: 1,
        }}
      >
        <FlexWidget
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: priorityColor(data.topTaskPriority),
            marginRight: 8,
          }}
        />
        <TextWidget
          text={data.topTaskTitle}
          style={{ fontSize: 14, color: INK, fontWeight: '600' }}
          truncate="END"
          maxLines={2}
        />
      </FlexWidget>

      {/* "+ N more" row — only if more than one task today */}
      {data.moreTasksCount > 0 ? (
        <TextWidget
          text={`+ ${data.moreTasksCount} more task${data.moreTasksCount === 1 ? '' : 's'} today`}
          style={{
            fontSize: 12,
            color: FOREST,
            fontWeight: '500',
            marginBottom: 10,
          }}
          clickAction="OPEN_APP"
        />
      ) : (
        <TextWidget
          text=""
          style={{ height: 12 }}
        />
      )}

      {/* Calendar dot strip — 6 rows of 7 days */}
      <FlexWidget
        style={{
          width: 'match_parent',
          height: 'wrap_content',
          flexDirection: 'column',
          borderTopColor: RULE,
          borderTopWidth: 1,
          paddingTop: 10,
        }}
      >
        <TextWidget
          text="Next 6 weeks"
          style={{ fontSize: 10, color: INK_SOFT, marginBottom: 6, letterSpacing: 0.5 }}
        />

        {/* 6 rows × 7 cells */}
        {Array.from({ length: 6 }, (_, weekIdx) => (
          <FlexWidget
            key={weekIdx}
            style={{
              flexDirection: 'row',
              width: 'match_parent',
              justifyContent: 'space-between',
              marginBottom: 4,
            }}
          >
            {data.calendarDots
              .slice(weekIdx * 7, weekIdx * 7 + 7)
              .map((cell, cellIdx) => (
                <FlexWidget
                  key={cellIdx}
                  style={{
                    width: 32,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: cell.isToday ? FOREST : TRANSPARENT,
                    borderRadius: 4,
                  }}
                >
                  <TextWidget
                    text={String(cell.day)}
                    style={{
                      fontSize: 10,
                      color: cell.isToday ? PAPER
                        : cell.hasCritical ? TERRACOTTA
                        : cell.hasHigh ? OCHRE
                        : cell.hasRecommended ? FOREST
                        : INK_SOFT,
                      fontWeight: (cell.hasCritical || cell.isToday) ? '700' : '400',
                    }}
                  />
                </FlexWidget>
              ))}
          </FlexWidget>
        ))}
      </FlexWidget>
    </FlexWidget>
  );
}
