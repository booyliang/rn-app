package com.yryz.ydk.module.oss;

import android.text.TextUtils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.yryz.ydk.R;
import com.yryz.ydk.constants.CodeStatus;
import com.yryz.ydk.oss.OssManager;
import com.yryz.ydk.oss.UploadPicManager;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by heus on 2017/11/1.
 */

public class OssModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME = "YOSS";

    public OssModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void requestOSS(ReadableArray array, String ossDir, Promise promise) {
        processOss(array, ossDir, promise);
    }


    private void processOss(ReadableArray array, String ossDir, final Promise promise) {
        if (array == null || array.size() == 0) {
            promise.reject(CodeStatus.JsCode.TYPE_ERROR, getReactApplicationContext().getString(R.string.choose_pic_hint));
            return;
        }
        List<UploadPicManager.UploadInfo> uploadInfoList = new ArrayList<>();
        for (int i = 0; i < array.size(); i++) {
            String path = array.getString(i);
            if (path != null && path.startsWith("file://")) {
                path = path.replace("file://", "");
            }
            UploadPicManager.UploadInfo uploadInfo = new UploadPicManager.UploadInfo();
            uploadInfo.tag = i;
            uploadInfo.fileSavePath = path;
            uploadInfoList.add(uploadInfo);
        }
        if (uploadInfoList.size() == 0) {
            promise.reject(CodeStatus.JsCode.TYPE_ERROR, getReactApplicationContext().getString(R.string.choose_pic_hint));
            return;
        }
        UploadPicManager uploadPicManager = new UploadPicManager(new UploadPicManager.OnUploadCallback() {
            @Override
            public void onResult(boolean result, List<UploadPicManager.UploadInfo> resultList) {
                if (!result) {
                    promise.reject(CodeStatus.JsCode.TYPE_ERROR, getReactApplicationContext().getString(R.string.upload_pic_fail_hint));
                    return;
                }
                WritableArray resultArray = Arguments.createArray();
                for (int i = 0; i < resultList.size(); i++) {
                    resultArray.pushString(resultList.get(i).fileSavePath);
                }
                promise.resolve(resultArray);
            }
        });
        //oss上传图片
        uploadPicManager.compressAndUploads(getReactApplicationContext(), uploadInfoList, TextUtils.isEmpty(ossDir) ? OssManager
                .objectNameCircle : ossDir);
    }
}
