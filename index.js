// Custom app entry point — runs before expo-router so we can wire up
// background handlers (widget task handler) that must be registered at
// module level, not inside a React component.
import 'expo-router/entry';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { widgetTaskHandler } from './src/widgets/widget-task-handler';

registerWidgetTaskHandler(widgetTaskHandler);
