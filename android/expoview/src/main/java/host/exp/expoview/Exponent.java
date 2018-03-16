// Copyright 2015-present 650 Industries. All rights reserved.

package host.exp.expoview;

import android.Manifest;
import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.os.StrictMode;
import android.provider.Settings;
import android.support.v4.content.ContextCompat;
import android.util.Log;

import org.json.JSONArray;
import java.util.ArrayList;
import java.util.List;
import host.exp.exponent.ActivityResultListener;

public class Exponent {

  private static final String TAG = Exponent.class.getSimpleName();
  private static final String PACKAGER_RUNNING = "running";

  private static Exponent sInstance;

  private Context mContext;
  private Application mApplication;
  private Activity mActivity;


  public static void initialize(Context context, Application application) {
    if (sInstance == null) {
      new Exponent(context, application);
    }
  }

  public static Exponent getInstance() {
    return sInstance;
  }

  private Exponent(Context context, Application application) {
    sInstance = this;

    mContext = context;
    mApplication = application;

  }

  public void setCurrentActivity(Activity activity) {
    mActivity = activity;
  }

  public Activity getCurrentActivity() {
    return mActivity;
  }

  public final void runOnUiThread(Runnable action) {
    if (Thread.currentThread() != Looper.getMainLooper().getThread()) {
      new Handler(mContext.getMainLooper()).post(action);
    } else {
      action.run();
    }
  }



  private String mGCMSenderId;
  public void setGCMSenderId(final String senderId) {
    mGCMSenderId = senderId;
  }

  public String getGCMSenderId() {
    return mGCMSenderId;
  }




  public interface PermissionsListener {
    void permissionsGranted();

    void permissionsDenied();
  }

  private PermissionsListener mPermissionsListener;
  private static final int EXPONENT_PERMISSIONS_REQUEST = 13;
  private List<ActivityResultListener> mActivityResultListeners = new ArrayList<>();

  public boolean getPermissionToReadUserContacts(PermissionsListener listener) {
    return getPermissions(listener, new String[]{Manifest.permission.READ_CONTACTS});
  }

  public boolean getPermissions(PermissionsListener listener, String[] permissions) {
    if (mActivity == null) {
      return false;
    }

    // Compiler is dumb and shows error on M api calls if these two ifs are merged.
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
      listener.permissionsGranted();
    }
    // Dumb compiler.
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
      return true;
    }

    boolean isGranted = true;
    List<String> permissionsToRequest = new ArrayList<>();
    List<String> permissionsToExplain = new ArrayList<>();
    for (String permission : permissions) {
      if (ContextCompat.checkSelfPermission(mActivity, permission) != PackageManager.PERMISSION_GRANTED) {
        isGranted = false;
        permissionsToRequest.add(permission);

        if (mActivity.shouldShowRequestPermissionRationale(permission)) {
          permissionsToExplain.add(permission);
        }
      }
    }

    if (isGranted) {
      listener.permissionsGranted();
      return true;
    }

    // TODO: explain why this experience needs permissionsToExplain

    mPermissionsListener = listener;
    mActivity.requestPermissions(permissionsToRequest.toArray(new String[permissionsToRequest.size()]),
        EXPONENT_PERMISSIONS_REQUEST);

    return true;
  }

  public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
    if (requestCode == EXPONENT_PERMISSIONS_REQUEST) {
      if (mPermissionsListener == null) {
        // sometimes onRequestPermissionsResult is called multiple times if the first permission
        // is rejected...
        return;
      }

      boolean isGranted = false;
      if (grantResults.length > 0) {
        isGranted = true;
        for (int result : grantResults) {
          if (result != PackageManager.PERMISSION_GRANTED) {
            isGranted = false;
            break;
          }
        }
      }

      if (isGranted) {
        mPermissionsListener.permissionsGranted();
      } else {
        mPermissionsListener.permissionsDenied();
      }
      mPermissionsListener = null;
    } else {
      if (Build.VERSION.SDK_INT > Build.VERSION_CODES.M) {
        mActivity.onRequestPermissionsResult(requestCode, permissions, grantResults);
      }
    }
  }


  public void addActivityResultListener(ActivityResultListener listener) {
    mActivityResultListeners.add(listener);
  }

  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    for (ActivityResultListener listener : mActivityResultListeners) {
      listener.onActivityResult(requestCode, resultCode, data);
    }
  }

  public Application getApplication() {
    return mApplication;
  }


  public interface StartReactInstanceDelegate {
    boolean isDebugModeEnabled();
    boolean isInForeground();
    void handleUnreadNotifications(JSONArray unreadNotifications);
  }

  private static int currentActivityId = 0;
  public static int getActivityId() {
    return currentActivityId++;
  }

  public boolean shouldRequestDrawOverOtherAppsPermission() {
    return (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(mContext));
  }


}
