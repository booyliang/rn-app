package com.yryz.ydk.module.sharesdk;

import android.Manifest;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yryz.ydk.R;
import com.yryz.ydk.constants.CodeStatus;
import com.yryz.ydk.module.sharesdk.inter.ShareTypeInterface;
import com.yryz.ydk.utils.InstalledUtils;

import host.exp.expoview.Exponent;

/**
 * Created by fanliang on 17/10/19.
 */

public class ShareSdkModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME = "YShareSDK";

    public ShareSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void share(String pfName, String title, String text, String url, String imgUrl, final Promise promise) {
        ShareSdk.share(getReactApplicationContext(), pfName, title, text, url, imgUrl, promise);
    }

    @ReactMethod
    public void authorizeLogin(String pfName, final Promise promise) {
        ShareSdk.authorizeLogin(getReactApplicationContext(), pfName, promise);
    }

    @ReactMethod
    public void isClientInstalled(String key, Promise promise) {
        if (TextUtils.isEmpty(key)) {
            promise.resolve(false);
            return;
        }
        boolean isInstalled = false;
        switch (key) {
            case ShareTypeInterface.TYPE_QQ:
                isInstalled = InstalledUtils.QQInstalled(getReactApplicationContext());
                break;
            case ShareTypeInterface.TYPE_WECHAT:
                isInstalled = InstalledUtils.WeChatInstlled(getReactApplicationContext());
                break;
            case ShareTypeInterface.TYPE_SINAWEIBO:
                isInstalled = InstalledUtils.SinaInstalled(getReactApplicationContext());
                break;
        }
        promise.resolve(isInstalled);
    }
}
