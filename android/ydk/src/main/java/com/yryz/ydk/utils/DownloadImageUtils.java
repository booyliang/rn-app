package com.yryz.ydk.utils;

import android.content.Context;
import android.content.Intent;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.provider.MediaStore;

import com.facebook.common.executors.CallerThreadExecutor;
import com.facebook.common.memory.PooledByteBuffer;
import com.facebook.common.memory.PooledByteBufferInputStream;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.BaseDataSubscriber;
import com.facebook.datasource.DataSource;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.core.ImagePipeline;
import com.facebook.imagepipeline.request.ImageRequest;
import com.facebook.imagepipeline.request.ImageRequestBuilder;
import com.yryz.ydk.cache.CachePath;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Created by heus on 2017/12/15.
 */

public class DownloadImageUtils {

    public void downloadImage(final Context context, String url, final OnDownloadImageListener imageListener) {
        ImageRequest imageRequest = ImageRequestBuilder
                .newBuilderWithSource(Uri.parse(url))
                .setProgressiveRenderingEnabled(true)
                .build();
        ImagePipeline imagePipeline = Fresco.getImagePipeline();
        DataSource dataSource = imagePipeline.fetchEncodedImage(imageRequest, context);
        dataSource.subscribe(new BaseDataSubscriber<CloseableReference>() {
            @Override
            protected void onNewResultImpl(DataSource<CloseableReference> dataSource) {
                if (!dataSource.isFinished()) {
                    return;
                }
                CloseableReference reference = dataSource.getResult();
                if (reference != null && reference.get() != null) {
                    PooledByteBuffer result = (PooledByteBuffer) reference.get();
                    savePic(context, result, imageListener);
                }
            }

            @Override
            protected void onFailureImpl(DataSource dataSource) {
                if (imageListener != null) imageListener.onResult(null, "");
            }
        }, CallerThreadExecutor.getInstance());
    }

    private void savePic(Context context, PooledByteBuffer byteBuffer, OnDownloadImageListener imageListener) {
        InputStream is = new PooledByteBufferInputStream(byteBuffer);
        try {
            File appDir = new File(CachePath.SAVE_PIC_PATH);
            if (!appDir.exists()) {
                appDir.mkdirs();
            }
            String fileName = System.currentTimeMillis() + ".jpg";
            File myCaptureFile = new File(appDir, fileName);
            OutputStream os = new FileOutputStream(myCaptureFile);
            int bytesRead = 0;
            byte[] buffer = new byte[8192];
            while ((bytesRead = is.read(buffer, 0, 8192)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
            os.close();
            is.close();
            updateToPictures(context, myCaptureFile, imageListener);
        } catch (Exception e) {
            imageListener.onResult(null, "");
        }

    }

    private void updateToPictures(Context context, File myFile, OnDownloadImageListener imageListener) {
        String filePath;
        try {
            //其次把文件插入到系统图库
            filePath = MediaStore.Images.Media.insertImage(context.getContentResolver(), myFile.getAbsolutePath(), myFile.getName(), null);
            // 通知图库更新
            context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse("file://" + myFile
                    .getAbsolutePath())));
            //4.4
            MediaScannerConnection.scanFile(context, new String[]{myFile.getPath()}, null, null);
        } catch (Exception e) {
            e.printStackTrace();
            //失败后，删除图片文件
            filePath = "";
            if (myFile.exists() && myFile.isFile()) {
                myFile.delete();
            }
        }
        if (imageListener != null)
            imageListener.onResult(myFile, filePath);
    }

    public interface OnDownloadImageListener {
        void onResult(File bitmapFile, String filePath);
    }
}
