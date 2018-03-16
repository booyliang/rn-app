package com.yryz.ydk.cache;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * Created by heus on 2017/11/18.
 */

public class YSharedPre {

    private static final String PRES_NAME = "yryz_share";

    private static final String PUSH_REGISTER_ID = "push_register_id";

    private static SharedPreferences getSP(Context context) {
        return context.getSharedPreferences(PRES_NAME, Context.MODE_PRIVATE);
    }

    public static void setPushRegisterId(Context context, String registerId) {
        getSP(context).edit().putString(PUSH_REGISTER_ID, registerId).commit();
    }

    public static String getPushRegisterId(Context context) {
        return getSP(context).getString(PUSH_REGISTER_ID, "");
    }

}
