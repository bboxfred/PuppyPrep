/**
 * WIDGET TASK HANDLER
 *
 * react-native-android-widget invokes this handler when Android asks the
 * widget for a fresh render. The three lifecycle events we care about:
 *
 *   - WIDGET_ADDED:      user placed the widget on their home screen
 *   - WIDGET_UPDATE:     Android system requested an update (rare — we
 *                        disabled periodic refresh for battery)
 *   - WIDGET_RESIZED:    user resized the widget
 *   - WIDGET_CLICK:      user tapped inside the widget
 *   - WIDGET_DELETED:    user removed the widget
 *
 * For any render-requiring event we emit the current widget UI built
 * from the live stores.
 */
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { TodayCalendarWidget } from './TodayCalendarWidget';
import { buildWidgetData } from './widget-data';

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const widgetName = widgetInfo.widgetName;

  if (widgetName !== 'TodayCalendar') return;

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED':
    case 'WIDGET_CLICK':
      props.renderWidget(TodayCalendarWidget({ data: buildWidgetData() }));
      break;

    case 'WIDGET_DELETED':
      // Nothing to clean up — data lives in MMKV, not per-widget state
      break;

    default:
      break;
  }
}
