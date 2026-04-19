package expo.modules.widgetpin

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

/**
 * Thin wrapper around AppWidgetManager to expose two essential APIs
 * to the React Native side:
 *
 *   1. isPinSupported()       — does this launcher allow programmatic pin?
 *   2. isWidgetPlaced(class)  — is the widget already on the home screen?
 *   3. requestPin(class)      — show the native pin dialog
 *
 * All three are Android-only. API 26+ (Android 8.0) is required for
 * requestPinAppWidget; older Android falls back to false.
 */
class ExpoWidgetPinModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoWidgetPin")

    /**
     * Does the current default launcher support programmatic widget
     * pinning? Android 8.0+ only; some custom launchers may still
     * return false.
     */
    Function("isPinSupported") {
      if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return@Function false
      val context = appContext.reactContext ?: return@Function false
      AppWidgetManager.getInstance(context).isRequestPinAppWidgetSupported
    }

    /**
     * Returns true if at least one instance of the widget whose provider
     * class matches `widgetClassName` is currently placed on the user's
     * home screen.
     *
     * `widgetClassName` is the fully qualified provider class name,
     * e.g. "com.puppyprep.app.widget.TodayCalendar".
     */
    Function("isWidgetPlaced") { widgetClassName: String ->
      val context = appContext.reactContext ?: return@Function false
      val manager = AppWidgetManager.getInstance(context)
      val component = ComponentName(context.packageName, widgetClassName)
      val ids = manager.getAppWidgetIds(component)
      ids.isNotEmpty()
    }

    /**
     * Shows the native widget-pinning dialog. Returns true if the
     * launcher accepted the request (the dialog was shown); returns
     * false if pinning isn't supported on this Android version / launcher.
     *
     * The actual placement is asynchronous and user-driven — the launcher
     * presents "Add to home screen?" and the user taps OK / Cancel. We
     * don't wait for that outcome here. Callers should poll
     * isWidgetPlaced() after a short delay (or on app foreground) to
     * detect successful placement.
     */
    AsyncFunction("requestPin") { widgetClassName: String ->
      if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return@AsyncFunction false
      val context = appContext.reactContext ?: return@AsyncFunction false
      val manager = AppWidgetManager.getInstance(context)
      if (!manager.isRequestPinAppWidgetSupported) return@AsyncFunction false
      val component = ComponentName(context.packageName, widgetClassName)
      try {
        manager.requestPinAppWidget(component, null, null)
      } catch (_: Exception) {
        false
      }
    }
  }
}
