package com.yryz.ydk.module;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.flat.RCTViewPagerManager;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.views.viewpager.ReactViewPagerManager;
import com.yryz.ydk.module.viewpager.MyRCTViewPagerManager;
import com.yryz.ydk.module.viewpager.MyReactViewPagerManager;

import java.util.List;

/**
 * Created by heus on 2017/12/27.
 */

public class MyMainReactPackage extends MainReactPackage{

    public MyMainReactPackage(MainPackageConfig config) {
        super(config);
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> managerList = super.createViewManagers(reactContext);
        for (ViewManager viewManager : managerList) {
            if (viewManager instanceof RCTViewPagerManager){
                managerList.remove(viewManager);
                managerList.add(new MyRCTViewPagerManager());
                break;
            }else if (viewManager instanceof ReactViewPagerManager){
                managerList.remove(viewManager);
                managerList.add(new MyReactViewPagerManager());
                break;
            }
        }
        return  managerList;
    }
}
