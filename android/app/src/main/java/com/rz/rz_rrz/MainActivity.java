package com.rz.rz_rrz;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.umeng.analytics.MobclickAgent;
import com.umeng.analytics.game.UMGameAgent;
import com.yryz.ydk.ui.LoadingPage;
import com.yryz.ydk.utils.StatusBarUtils;

import host.exp.expoview.Exponent;

public class MainActivity extends ReactActivity {

    private String TAG = "MainActivity";

    private int barType;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "yryz_app";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        StatusBarUtils.transparencyBar(this);
        LoadingPage.show(this, true);
        super.onCreate(savedInstanceState);
        barType = StatusBarUtils.setDarkStatusIcon(this, true);
        Exponent.initialize(this, getApplication());
        Log.d(TAG, "onCreate");
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        Exponent.getInstance().onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    protected void onResume() {
        super.onResume();
        Exponent.getInstance().setCurrentActivity(this);
        MobclickAgent.onResume(this);

        Log.d(TAG, "onResume");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d(TAG, "onStart");
//        JPushInterface.init(getApplicationContext());
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(TAG, "onStop");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy");
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
    }

    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
        Log.d(TAG, "onPause");
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Exponent.getInstance().onActivityResult(requestCode, resultCode, data);
        Log.d(TAG, "onActivityResult");
    }
}
