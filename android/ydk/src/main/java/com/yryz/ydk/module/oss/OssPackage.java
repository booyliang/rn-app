package com.yryz.ydk.module.oss;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.yryz.ydk.module.zhugeio.ZhuGeIoModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by fanliang on 17/10/10.
 */

public class OssPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> list = new ArrayList<>();
        list.add(new OssModule(reactContext));
        return list;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
