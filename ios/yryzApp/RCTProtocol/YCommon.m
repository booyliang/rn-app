//
//  YCommon.m
//  yryz_app
//
//  Created by shibo on 2017/11/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//  js 交互公共方法类

#import "YCommon.h"
#import "YYPhotoGroupView.h"
#import "JPUSHService.h"
#import <Photos/Photos.h>
#import <AssetsLibrary/AssetsLibrary.h>


@implementation YCommon

RCT_EXPORT_MODULE()

///关闭 js 加载时的启动页
RCT_EXPORT_METHOD(closeLoadingPage){
  
  [[NSNotificationCenter defaultCenter] postNotificationName:Notification_CLOSE_SPLASH_SCREEN object:nil];
}

///获取红点数
RCT_EXPORT_METHOD(changeBadgeCount:(NSInteger)count){

  [PrimaryDataManager sharePrimaryData].badgeCount = count;
}

///获取相机权限
RCT_EXPORT_METHOD(getCameraPermission:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){

  if ([PermissionManager isCanUseCamera]) {
    resolve(@(true));
  }else{
    reject(@"-100",@"未开启权限",[NSError errorWithDomain:@"错误" code:1 userInfo:nil]);
  }
}

///获取设备信息
RCT_EXPORT_METHOD(getDeviceInfo:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){

  if ([NSDictionary getDeviceInfo]) {
    resolve([NSDictionary getDeviceInfo]);

  }else{
    reject(@"-100",@"设备信息获取失败",[NSError errorWithDomain:@"错误" code:1 userInfo:nil]);
  }
}

///获取缓存大小
RCT_EXPORT_METHOD(getCacheSize:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){

  NSString *cachePath = [NSString getCachesPath];
  double cacheSize = [NSString fileSizeAtPath:cachePath];
  NSDictionary *cacheDic = @{@"cacheSize":@(cacheSize)};

  if (cacheDic) {
    resolve(cacheDic);
  }else{
    reject(@"-100",@"获取失败",[NSError errorWithDomain:@"错误" code:1 userInfo:nil]);
  }
}

///清除缓存
RCT_EXPORT_METHOD(clearCache:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){

  NSError *error;
  [NSString cleanCacheWithCompletionBlock:^(BOOL success) {
    if (success) {
      resolve(@(true));
    }else{
      reject(@"-100",@"清除失败",error);
    }
  }];
}

///获取 registrationID
RCT_EXPORT_METHOD(getRigsterId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){

  [JPUSHService registrationIDCompletionHandler:^(int resCode, NSString *registrationID) {

    if (resCode == 1011) {
      reject(@"-100",@"获取失败",[NSError errorWithDomain:@"错误" code:1 userInfo:nil]);
    }else{
      resolve(registrationID?:@"");
    }
  }];
}

///保存图片到相册
RCT_EXPORT_METHOD(saveImage:(NSDictionary *)dic resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{

    NSString *url = [dic objectForKey:@"uri"];
  
    NSData *data = [NSData dataWithContentsOfURL:[NSURL  URLWithString:url]];
    UIImage *image = [UIImage imageWithData:data];
  
  __block ALAssetsLibrary *lib = [[ALAssetsLibrary alloc] init];
    [lib writeImageToSavedPhotosAlbum:image.CGImage metadata:nil completionBlock:^(NSURL *assetURL, NSError *error) {

      if(!error){
       resolve(@(true));
     }else{
       reject(@"-100",@"保存失败",[NSError errorWithDomain:@"错误" code:1 userInfo:nil]);
     }
    }];
    
  });

}

///为 js 提供的静态资源
- (NSDictionary<NSString *,id> *)constantsToExport {

  return  [NSDictionary getChannelInfo];
}




@end
