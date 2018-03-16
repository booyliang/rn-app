package com.yryz.ydk.module.viewpager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.viewpager.ReactViewPagerManager;

/**
 * Created by heus on 2017/12/27.
 */

public class MyReactViewPagerManager extends ReactViewPagerManager {

    @Override
    protected MyReactViewPager createViewInstance(ThemedReactContext reactContext) {
        return new MyReactViewPager(reactContext);
    }

}
