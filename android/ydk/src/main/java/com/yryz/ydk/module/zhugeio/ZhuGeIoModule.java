package com.yryz.ydk.module.zhugeio;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.umeng.analytics.MobclickAgent;

import org.json.JSONException;

import java.util.HashMap;

/**
 * Created by fanliang on 17/10/19.
 */

public class ZhuGeIoModule extends ReactContextBaseJavaModule {
    public static final String TAG = ZhuGeIoModule.class.getSimpleName();


    public ZhuGeIoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }


    @Override
    public String getName() {
        return "YZhugeIo";
    }


    @ReactMethod
    public void track(String event, ReadableMap map) throws JSONException {
       HashMap hashMap =  map.toHashMap();
        hashMap.put("app","yryz");
        Log.d("MobclickAgent","event = " + event);
        MobclickAgent.onEvent(getReactApplicationContext(),event,hashMap);
    }

    @ReactMethod
    public void open() {
        Log.d(TAG, "zhugeio open");
    }

    @ReactMethod
    public void close() {
        Log.d(TAG, "zhugeio close");
    }
}
