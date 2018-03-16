package com.yryz.ydk.utils;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

/**
 * Created by heus on 2017/11/14.
 */

public class InstalledUtils {

    private static final String QQ_NAME = "com.tencent.mobileqq";
    private static final String SINA_NAME = "com.sina.weibo";
    private static final String WECHAT_NAME = "com.tencent.mm";

    public static boolean QQInstalled(Context context) {
        return AppInstalled(context, QQ_NAME);
    }

    public static boolean SinaInstalled(Context context) {
        return AppInstalled(context, SINA_NAME);
    }

    public static boolean WeChatInstlled(Context context) {
        return AppInstalled(context, WECHAT_NAME);
    }

    public static boolean AppInstalled(Context context, String packageName) {
        PackageInfo packageInfo;
        try {
            packageInfo = context.getPackageManager().getPackageInfo(packageName, 0);
        } catch (PackageManager.NameNotFoundException e) {
            packageInfo = null;
            e.printStackTrace();
        }
        if (packageInfo == null) {
            return false;
        } else {
            return true;
        }
    }

}
