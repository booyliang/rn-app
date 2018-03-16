//
//  YShareSDK.m
//  yryz_app
//
//  Created by shibo on 2017/10/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "YShareSDK.h"
#import <ShareSDK/ShareSDK.h>
#import <ShareSDKExtension/SSEShareHelper.h>
#import <ShareSDKExtension/SSEThirdPartyLoginHelper.h>


@implementation YShareSDK

RCT_EXPORT_MODULE()

///三方登录
RCT_EXPORT_METHOD(authorizeLogin:(NSString *)key resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {

  if(key){

    [ShareSDKManager loginByPlatform:key success:^(NSDictionary *info) {
      resolve(info);
    } fail:^(NSString *code, NSString *message, NSError *error) {
      reject(code,message,error);
    }];

  }
}

///三方分享
RCT_EXPORT_METHOD(share:(NSString *)key :(NSString *)title :(NSString *)text :(NSString *)url imageUrl:(NSString *)imageUrl resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if(key){
    
    [ShareSDKManager shareByPlatform:key url:url title:title content:text image:imageUrl callBack:^(BOOL isSuccess, NSString *code, NSString *message, NSError *error) {
      if (isSuccess){
        resolve(code);
      }else{
        reject(code,message,error);
      }
    }];

  }
}

///判断是否安装客户端
RCT_EXPORT_METHOD(isClientInstalled:(NSString *)key resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {

  [ShareSDKManager isClientInstalled:key callBack:^(BOOL isSuccess, NSString *code, NSString *message, NSError *error) {
    if (isSuccess) {
      resolve(@(true));
    }else{
      resolve(@(false));
    }
  }];
}


@end
