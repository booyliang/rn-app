//
//  PermissionManager.m
//  yryz_app
//
//  Created by shibo on 2017/11/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//  权限管理

#import "PermissionManager.h"
#import <AssetsLibrary/AssetsLibrary.h>
#import <AVFoundation/AVCaptureDevice.h>


@implementation PermissionManager

///判断相册权限
+ (BOOL)isCanUsePhotos{

  ALAuthorizationStatus author =[ALAssetsLibrary authorizationStatus];
  if (author == ALAuthorizationStatusRestricted ||
      author ==ALAuthorizationStatusDenied){ //无权限
    return NO;
  }else{
    return YES;
  }
}

///判断相机权限
+ (BOOL)isCanUseCamera{

  AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
  if( authStatus == AVAuthorizationStatusRestricted ||
      authStatus == AVAuthorizationStatusDenied){
    return NO;
  }else{
    return YES;
  }
}

@end
