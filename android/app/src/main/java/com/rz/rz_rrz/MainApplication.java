package com.rz.rz_rrz;

import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.support.multidex.MultiDexApplication;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.core.ImagePipelineConfig;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.tencent.bugly.Bugly;
import com.umeng.analytics.MobclickAgent;
import com.umeng.commonsdk.UMConfigure;
import com.yryz.ydk.module.common.YdkCommonModuleList;
import com.yryz.ydk.oss.OssManager;

import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return YdkCommonModuleList.getInstance(getApplicationContext()).setInfo(getChannelName(), BuildConfig.VERSION_NAME)
                    .getModuleList();
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        initOSS();
        initBugly();
        initUmeng();
        configFresco();
        fitFont();
    }

    /**
     * 防止字体大小被修改
     */
    private void fitFont() {
        Resources resources = getResources();
        Configuration config = new Configuration();
        config.setToDefaults();
        resources.updateConfiguration(config, resources.getDisplayMetrics());
    }

    private void initOSS() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                OssManager.initUpload(MainApplication.this);
            }
        }).start();
    }

    private void initBugly() {
        Bugly.init(this, BuildConfig.BuglyKey, BuildConfig.DEBUG);
    }

    private void initUmeng() {
        MobclickAgent.setScenarioType(this, MobclickAgent.EScenarioType.E_UM_NORMAL);
        UMConfigure.init(this,UMConfigure.DEVICE_TYPE_PHONE,"yryz");
        UMConfigure.setLogEnabled(BuildConfig.DEBUG);
    }

    private void configFresco() {
        ImagePipelineConfig config = ImagePipelineConfig.newBuilder(getApplicationContext())
                .setDownsampleEnabled(true)
                //Downsampling，要不要向下采样,它处理图片的速度比常规的裁剪scaling更快，
                // 并且同时支持PNG，JPG以及WEP格式的图片，非常强大,与ResizeOptions配合使用
                .setBitmapsConfig(Bitmap.Config.RGB_565)
                //如果不是重量级图片应用,就用这个省点内存吧.默认是RGB_888
                .build();
        Fresco.initialize(getApplicationContext(), config);

    }


    public String getChannelName(){
        String channelName = "";
        try {
           channelName =  this.getPackageManager().getApplicationInfo(getPackageName(), PackageManager.GET_META_DATA).metaData.getString("UMENG_CHANNEL","");
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return channelName;
    }

}
