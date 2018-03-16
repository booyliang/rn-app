package com.yryz.ydk.cache;

import android.os.Environment;

import host.exp.expoview.Exponent;

/**
 * Created by heus on 2017/12/18.
 */

public class CachePath {

    public static final String PACKAGE_NAME = Exponent.getInstance().getApplication().getPackageName();

    public static final String OPEN_PATH = Environment.getExternalStorageDirectory().getAbsolutePath()
            + "/Android/data/"
            + PACKAGE_NAME;

    public static final String SAVE_PIC_PATH = OPEN_PATH + "/images";
}
