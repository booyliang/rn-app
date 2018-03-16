package com.yryz.ydk.utils;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import java.lang.reflect.Field;

import me.leolin.shortcutbadger.ShortcutBadger;

/**
 * Created by rzw2 on 2017/1/21.
 */

public class BadgeUtil {
    /**
     * Set badge count
     * <p>
     * 针对 Samsung / xiaomi / sony 手机有效
     *
     * @param context The context of the application package.
     * @param count   Badge count to be set
     */
    public static void setBadgeCount(Context context, int count) {
            if (count <= 0) {
                count = 0;
            } else {
                count = Math.max(0, Math.min(count, 99));
            }
            ShortcutBadger.applyCount(context, count);

    }



}
