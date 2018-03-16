package com.yryz.ydk.module.viewpager;

import android.util.Log;
import android.view.MotionEvent;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.viewpager.ReactViewPager;

/**
 * Created by heus on 2017/12/27.
 */

public class MyReactViewPager extends ReactViewPager{

    public MyReactViewPager(ReactContext reactContext) {
        super(reactContext);
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        try{
           return super.onInterceptTouchEvent(ev);
        } catch(IllegalArgumentException ex) {
            Log.e("yryz",ex.toString());
        }
        return false;
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        try {
            return super.onTouchEvent(ev);
        }catch (IllegalArgumentException ex){
            Log.e("yryz",ex.toString());
        }
        return false;

    }
}
