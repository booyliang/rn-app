package com.yryz.ydk.module.common;

import android.Manifest;
import android.app.WallpaperManager;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.graphics.Bitmap;
import android.os.Build;
import android.system.Os;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.core.ImagePipeline;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.yryz.ydk.cache.YSharedPre;
import com.yryz.ydk.constants.CodeStatus;
import com.yryz.ydk.ui.LoadingPage;
import com.yryz.ydk.utils.BadgeUtil;
import com.yryz.ydk.utils.ClearUtil;
import com.yryz.ydk.utils.DownloadImageUtils;
import com.yryz.ydk.utils.ImageUtils;
import com.yryz.ydk.utils.SystemUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

import cn.jpush.android.api.JPushInterface;
import host.exp.expoview.Exponent;

/**
 * Created by fanliang on 17/10/10.
 */

public class YdkCommonModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "YCommon";

    private String channelName;
    private String versionName = "4.0.0";

    public YdkCommonModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("channel", channelName);
        return constants;
    }

    @ReactMethod
    public void getPackageName() {
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    public void setVersionName(String versionName) {
        this.versionName = versionName;
    }

    @ReactMethod
    public void getDeviceInfo(Promise promise) {
        WritableMap deviceMap = Arguments.createMap();
        deviceMap.putString("appVersion", versionName);
        deviceMap.putString("deviceType", "2");//2 android
        deviceMap.putString("OS", Build.VERSION.SDK_INT + "");
        deviceMap.putString("ip", SystemUtils.getIp(getReactApplicationContext()));
        SystemUtils.getIMEI(getReactApplicationContext(), promise, deviceMap);
    }

    @ReactMethod
    public void getJPushRegisterId(Promise promise) {
        promise.resolve(YSharedPre.getPushRegisterId(getReactApplicationContext()));
    }

    @ReactMethod
    public void closeLoadingPage() {
        LoadingPage.close(getCurrentActivity());
    }


    @ReactMethod
    public void showLoadingPage() {
        LoadingPage.show(getCurrentActivity(), true);
    }

    @ReactMethod
    public void changeBadgeCount(int count) {
        BadgeUtil.setBadgeCount(getReactApplicationContext(), count);

    }

    @ReactMethod
    public void getCacheSize(Promise promise) {
        WritableMap cacheMap = Arguments.createMap();
        long imageCache = Fresco.getImagePipelineFactory().getMainFileCache().getSize();//b
        long totalCacheSize = ClearUtil.getTotalCacheSize(getReactApplicationContext());
        cacheMap.putDouble("cacheSize", (imageCache + totalCacheSize));
        promise.resolve(cacheMap);
    }

    @ReactMethod
    public void clearCache(Promise promise) {
        //清楚图片缓存
        ImagePipeline imagePipeline = Fresco.getImagePipeline();
        imagePipeline.clearMemoryCaches();
        imagePipeline.clearDiskCaches();
        // combines above two lines
        imagePipeline.clearCaches();
        ClearUtil.clearAllCache(getReactApplicationContext());
        promise.resolve(CodeStatus.JsCode.TYPE_SUCCESS);
    }

    @ReactMethod
    public void getStatusBarType(Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP && Build.VERSION.SDK_INT <= Build.VERSION_CODES.M) {
            promise.resolve(CodeStatus.Type.UN_STATUS_BAR);
        } else {
            promise.resolve(CodeStatus.Type.STATUS_BAR);
        }
    }

    @ReactMethod
    public void setMsgToClip(String msg, Promise promise) {
        if (TextUtils.isEmpty(msg)) {
            promise.reject(CodeStatus.JsCode.TYPE_ERROR, "msg empty");
            return;
        }
        ClipboardManager clipboard = (ClipboardManager) getReactApplicationContext().getSystemService(getReactApplicationContext()
                .CLIPBOARD_SERVICE);
        ClipData clip = ClipData.newPlainText("yryz", msg);
        clipboard.setPrimaryClip(clip);
        promise.resolve(CodeStatus.JsCode.TYPE_SUCCESS);
    }


    @ReactMethod
    public void getRigsterId(Promise promise) {
        promise.resolve(JPushInterface.getRegistrationID(getReactApplicationContext()));
    }

    @ReactMethod
    public void saveImage(final ReadableMap map, final Promise promise) {
        if (map == null || !map.hasKey("uri")) {
            promise.reject(CodeStatus.JsCode.TYPE_ERROR, "save image error");
            return;
        }
        Exponent.getInstance().getPermissions(new Exponent.PermissionsListener() {
            @Override
            public void permissionsGranted() {
                DownloadImageUtils downloadImageUtils = new DownloadImageUtils();
                downloadImageUtils.downloadImage(getReactApplicationContext(), map.getString("uri"), new DownloadImageUtils
                        .OnDownloadImageListener() {
                    @Override
                    public void onResult(File bitmapFile, String imgPath) {
                        if (TextUtils.isEmpty(imgPath) || bitmapFile == null) {
                            promise.reject(CodeStatus.JsCode.TYPE_ERROR, "save image error");
                            return;
                        }
                        promise.resolve(imgPath);
                    }
                });
            }

            @Override
            public void permissionsDenied() {
                promise.reject(CodeStatus.JsCode.TYPE_ERROR, "save image error");
            }
        }, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE});

    }

    @ReactMethod
    public void setWallpaper(final ReadableMap map, final Promise promise) {
        if (map == null || !map.hasKey("uri")) {
            promise.reject(CodeStatus.JsCode.TYPE_ERROR, "set wallpaper error");
            return;
        }
        Exponent.getInstance().getPermissions(new Exponent.PermissionsListener() {
            @Override
            public void permissionsGranted() {
                final WallpaperManager wallpaperManager = WallpaperManager.getInstance(getReactApplicationContext());
                DownloadImageUtils downloadImageUtils = new DownloadImageUtils();
                downloadImageUtils.downloadImage(getReactApplicationContext(), map.getString("uri"), new DownloadImageUtils
                        .OnDownloadImageListener() {
                    @Override
                    public void onResult(File bitmapFile, String imgPath) {
                        if (TextUtils.isEmpty(imgPath) || bitmapFile == null) {
                            promise.reject(CodeStatus.JsCode.TYPE_ERROR, "set wallpaper error");
                            return;
                        }
                        try {
                            wallpaperManager.setBitmap(ImageUtils.getImage(bitmapFile.getAbsolutePath()));
                            promise.resolve(imgPath);
                        } catch (IOException e) {
                            e.printStackTrace();
                            promise.reject(CodeStatus.JsCode.TYPE_ERROR, "set wallpaper error");
                        }
                    }
                });
            }

            @Override
            public void permissionsDenied() {
                promise.reject(CodeStatus.JsCode.TYPE_ERROR, "set wallpaper error");
            }
        }, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE});

    }
}
