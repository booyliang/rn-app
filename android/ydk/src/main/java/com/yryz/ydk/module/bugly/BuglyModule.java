package com.yryz.ydk.module.bugly;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.tencent.bugly.crashreport.CrashReport;
import com.yryz.ydk.BuildConfig;

/**
 * Created by fanliang on 17/10/19.
 */

public class BuglyModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME = "YBugly";

    public BuglyModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }


    public void initCrash() {
//        CrashReport.initCrashReport(getReactApplicationContext(), "75f8d6eb2f", false);
//        String buglyAppid = BuildConfig.BUGLY_APPID;
        String buglyAppid = "75f8d6eb2f";
        CrashReport.initCrashReport(getReactApplicationContext(), buglyAppid, false);
    }
}

