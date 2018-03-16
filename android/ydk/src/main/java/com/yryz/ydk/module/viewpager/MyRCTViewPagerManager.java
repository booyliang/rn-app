package com.yryz.ydk.module.viewpager;

import android.view.View;

import com.facebook.react.views.viewpager.ReactViewPager;
import com.facebook.react.views.viewpager.ReactViewPagerManager;

import java.util.List;

/**
 * Created by heus on 2017/12/27.
 */

public class MyRCTViewPagerManager extends MyReactViewPagerManager{
    static final String REACT_CLASS = ReactViewPagerManager.REACT_CLASS;

    @Override
    public void addViews(ReactViewPager parent, List<View> views) {
        parent.setViews(views);
    }

    @Override
    public void removeAllViews(ReactViewPager parent) {
        parent.removeAllViewsFromAdapter();
    }
}
