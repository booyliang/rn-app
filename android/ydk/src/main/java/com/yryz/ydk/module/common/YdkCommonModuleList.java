package com.yryz.ydk.module.common;

import android.content.Context;
import android.graphics.Bitmap;

import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.cache.disk.DiskCacheConfig;
import com.facebook.common.internal.Supplier;
import com.facebook.imagepipeline.core.ImagePipelineConfig;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import com.yryz.ydk.module.MyMainReactPackage;
import com.yryz.ydk.module.bugly.BuglyPackage;
import com.yryz.ydk.module.oss.OssPackage;
import com.yryz.ydk.module.sharesdk.ShareSdkPackage;
import com.yryz.ydk.module.zhugeio.ZhuGeIoPackage;
import com.yryz.ydk.scale.PhotoImageViewPackage;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import com.horcrux.svg.SvgPackage;

import cn.jpush.reactnativejpush.JPushPackage;


/**
 * Created by fanliang on 17/10/19.
 */

public class YdkCommonModuleList {

    private static boolean SHUTDOWN_TOAST = true;
    private static boolean SHUTDOWN_LOG = true;

    private static String channelName;
    private static String versionName;

    private static YdkCommonModuleList instance;
    private static Context mContext;

    public static YdkCommonModuleList getInstance(Context context) {
        mContext = context;
        if (instance == null)
            return new YdkCommonModuleList();
        return instance;
    }


    public YdkCommonModuleList setInfo(String channelName, String versionName) {
        this.channelName = channelName;
        this.versionName = versionName;
        return this;
    }

    public List<ReactPackage> getModuleList() {

        return Arrays.<ReactPackage>asList(
                new MyMainReactPackage(getConfig()), new ShareSdkPackage(), new YdkCommonPackage(channelName, versionName),
                new ZhuGeIoPackage(), new BuglyPackage(), new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
                new OssPackage(), new LottiePackage(), new SvgPackage(), new PhotoImageViewPackage()
        );
    }

    private MainPackageConfig getConfig() {
        MainPackageConfig.Builder builder = new MainPackageConfig.Builder();
        DiskCacheConfig diskCacheConfig = DiskCacheConfig.newBuilder(mContext)
                .setMaxCacheSize(10 * 1024 * 1024)//最大缓存
                .setBaseDirectoryName("imageCache")//子目录
                .setBaseDirectoryPathSupplier(new Supplier<File>() {
                    @Override
                    public File get() {
                        return mContext.getCacheDir();//还是推荐缓存到应用本身的缓存文件夹,这样卸载时能自动清除,其他清理软件也能扫描出来
                    }
                })
                .build();
        ImagePipelineConfig config = ImagePipelineConfig.newBuilder(mContext)
                .setMainDiskCacheConfig(diskCacheConfig)
                .setDownsampleEnabled(true)
                //Downsampling，要不要向下采样,它处理图片的速度比常规的裁剪scaling更快，
                // 并且同时支持PNG，JPG以及WEP格式的图片，非常强大,与ResizeOptions配合使用
                .setBitmapsConfig(Bitmap.Config.RGB_565)
                //如果不是重量级图片应用,就用这个省点内存吧.默认是RGB_888
                .build();
        builder.setFrescoConfig(config);
        return builder.build();
    }
}
