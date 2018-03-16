package com.yryz.ydk.module.sharesdk;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.support.v4.content.ContextCompat;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.mob.MobApplication;
import com.mob.MobSDK;
import com.mob.commons.SHARESDK;
import com.mob.tools.utils.BitmapHelper;
import com.yryz.ydk.R;
import com.yryz.ydk.constants.CodeStatus;
import com.yryz.ydk.module.sharesdk.inter.ShareTypeInterface;

import java.util.HashMap;

import cn.sharesdk.framework.Platform;
import cn.sharesdk.framework.PlatformActionListener;
import cn.sharesdk.framework.ShareSDK;
import cn.sharesdk.sina.weibo.SinaWeibo;
import cn.sharesdk.tencent.qq.QQ;
import cn.sharesdk.tencent.qzone.QZone;
import cn.sharesdk.wechat.friends.Wechat;
import cn.sharesdk.wechat.moments.WechatMoments;

/**
 * Created by fanliang on 17/10/18.
 */

public class ShareSdk {

    public static final String USERID = "userId";
    public static final String TOKEN = "token";
    private static Bitmap bitmap;

    public static void share(final Context context, String pfName, String title, String text, String url, String imgUrl, final Promise
            promise) {
        Log.d("share", "title = " + title + " / text = " + text + " / url=" + url);
        MobSDK.init(context);
        Platform.ShareParams sp = new Platform.ShareParams();
        sp.setText(text);
        String platformName = "";
        if (pfName.equals(ShareTypeInterface.TYPE_QQ)) {
            platformName = QQ.NAME;
            sp.setTitleUrl(url);
        } else if (pfName.equals(ShareTypeInterface.TYPE_WECHAT)) {
            platformName = Wechat.NAME;
        } else if (pfName.equals(ShareTypeInterface.TYPE_SINAWEIBO)) {
            platformName = SinaWeibo.NAME;
        } else if (pfName.equals(ShareTypeInterface.TYPE_QQZONE)) {
            platformName = QZone.NAME;
            sp.setTitleUrl(url);
            sp.setSite("site");
            sp.setSiteUrl("siteUrl");
        } else if (pfName.equals(ShareTypeInterface.TYPE_WECHAT_MOMENT)) {
            platformName = WechatMoments.NAME;
        }
        sp.setText(text);
        sp.setTitle(title);
        sp.setUrl(url);
        if (TextUtils.isEmpty(imgUrl)) {
            bitmap = BitmapFactory.decodeResource(context.getResources(), R.mipmap.share_logo);
            sp.setImageData(bitmap);
        } else
            sp.setImageUrl(imgUrl);
        sp.setShareType(Platform.SHARE_WEBPAGE);
        Platform platform = ShareSDK.getPlatform(platformName);
        platform.setPlatformActionListener(new PlatformActionListener() {
            @Override
            public void onComplete(Platform platform, int i, HashMap<String, Object> hashMap) {
                Log.d("share", "onComplete");
                if (promise != null)
                    promise.resolve(context.getResources().getString(R.string.share_success));
                recycleBitmap();
            }

            @Override
            public void onError(Platform platform, int i, Throwable throwable) {
                Log.d("share", "onError = " + throwable.getMessage());
                if (promise != null)
                    promise.reject(CodeStatus.JsCode.TYPE_ERROR, context.getResources().getString(R.string.share_error));
                recycleBitmap();
            }

            @Override
            public void onCancel(Platform platform, int i) {
                Log.d("share", "onCancel");
                if (promise != null)
                    promise.reject(CodeStatus.JsCode.TYPE_CANCEL, context.getResources().getString(R.string.cancel_option));
                recycleBitmap();
            }
        }); // 设置分享事件回调
        // 执行图文分享
//        platform.SSOSetting(false);
        platform.share(sp);

    }

    private static void recycleBitmap() {
        if (bitmap != null && !bitmap.isRecycled()) {
            bitmap.recycle();
            bitmap = null;
        }
    }

    public static void authorizeLogin(final Context context, String pfName, final Promise promise) {
        MobSDK.init(context);
        String platformName = "";
        if (pfName.equals(ShareTypeInterface.TYPE_QQ)) {
            platformName = QQ.NAME;
        } else if (pfName.equals(ShareTypeInterface.TYPE_WECHAT)) {
            platformName = Wechat.NAME;
        } else if (pfName.equals(ShareTypeInterface.TYPE_SINAWEIBO)) {
            platformName = SinaWeibo.NAME;
        }
        final Platform platform = ShareSDK.getPlatform(platformName);
        platform.setPlatformActionListener(new PlatformActionListener() {
            @Override
            public void onError(Platform arg0, int arg1, Throwable arg2) {
                arg2.printStackTrace();
                promise.reject(CodeStatus.JsCode.TYPE_ERROR, context.getResources().getString(R.string.not_found_share_app));
            }

            @Override
            public void onComplete(Platform arg0, int arg1, HashMap<String, Object> arg2) {
                //输出所有授权信息
                String userId = arg0.getDb().getUserId();
                String token = arg0.getDb().getToken();
                WritableMap map = Arguments.createMap();
                Log.i("ShareSdk", "userId = " + userId);
                Log.i("ShareSdk", "token = " + token);
                map.putString(TOKEN, token);
                map.putString(USERID, userId);
                promise.resolve(map);
                arg0.removeAccount(true);
            }

            @Override
            public void onCancel(Platform arg0, int arg1) {
                promise.reject(CodeStatus.JsCode.TYPE_CANCEL, context.getResources().getString(R.string.cancel_option));
            }
        });
        platform.authorize();
//        platform.showUser(null);//执行登录，登录后在回调里面获取用户资料
    }
}
