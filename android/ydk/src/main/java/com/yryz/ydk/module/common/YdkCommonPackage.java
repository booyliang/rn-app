package com.yryz.ydk.module.common;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import host.exp.exponent.utils.ScopedContext;
import versioned.host.exp.exponent.modules.api.FileSystemModule;
import versioned.host.exp.exponent.modules.api.ImageCropperModule;
import versioned.host.exp.exponent.modules.api.ImagePickerModule;
import versioned.host.exp.exponent.modules.api.PermissionsModule;
import versioned.host.exp.exponent.modules.api.av.AVModule;
import versioned.host.exp.exponent.modules.api.av.video.VideoViewManager;
import versioned.host.exp.exponent.modules.api.components.camera.CameraModule;
import versioned.host.exp.exponent.modules.api.components.camera.CameraViewManager;

/**
 * Created by fanliang on 17/10/10.
 */

public class YdkCommonPackage implements ReactPackage {

    private String channelName;
    private String versionName;

    public YdkCommonPackage(String channelName, String versionName) {
        this.channelName = channelName;
        this.versionName = versionName;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> list = new ArrayList<>();
        YdkCommonModule ydkCommonModule = new YdkCommonModule(reactContext);
        ydkCommonModule.setChannelName(channelName);
        ydkCommonModule.setVersionName(versionName);
        list.add(ydkCommonModule);
        try {
            ScopedContext scopedContext = new ScopedContext(reactContext, URLEncoder.encode("yryz", "UTF-8"));
            list.add(new CameraModule(reactContext, scopedContext));
            list.add(new AVModule(reactContext, scopedContext));
            list.add(new ImagePickerModule(reactContext, scopedContext));
            list.add(new PermissionsModule(reactContext));
            list.add(new FileSystemModule(reactContext, scopedContext));
            list.add(new ImageCropperModule(reactContext));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> viewManagers = new ArrayList<>(Arrays.<ViewManager>asList(
                new VideoViewManager(),
                new CameraViewManager()
        ));

        return viewManagers;
    }
}
