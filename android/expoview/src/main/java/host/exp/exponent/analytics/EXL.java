// Copyright 2015-present 650 Industries. All rights reserved.

package host.exp.exponent.analytics;

import android.util.Log;

import com.amplitude.api.Amplitude;

import org.json.JSONObject;


// EXpo Log
public class EXL {

  private static final String TAG = EXL.class.getSimpleName();

  public static void d(final String tag, final String msg) {
    Log.d(tag, msg);
  }

  public static void w(final String tag, final String msg) {
    Log.w(tag, msg);
  }

  // TODO send string version of Throwable to Amplitude
  public static void e(final String tag, final Throwable e) {
    Log.e(tag, e.toString());

//    Exponent.logException(e);
  }

  // TODO send to Crashlytics
  public static void e(final String tag, final String msg) {
    Log.e(tag, msg);

    try {
      String stackTrace = Log.getStackTraceString(new Throwable());

      JSONObject eventProperties = new JSONObject();
      eventProperties.put("TAG", tag);
      eventProperties.put("MESSAGE", msg);
      eventProperties.put("STACK_TRACE", stackTrace);
      Amplitude.getInstance().logEvent("LOG_ERROR", eventProperties);
    } catch (Throwable e) {
      Log.e(TAG, e.toString());
    }
  }
}
