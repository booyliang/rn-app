//
//  AppImportConstants.h
//  yryzApp
//
//  Created by shibo on 2017/11/8.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#ifndef AppImportConstants_h
#define AppImportConstants_h

#import "ThirdPartyConstants.h"
#import <React/RCTViewManager.h>
#import <React/RCTView.h>
#import "NSString+Additions.h"
#import "NSDictionary+Additions.h"
#import "OSSUploadManager.h"
#import "MBProgressHUD+ZX.h"
#import "PermissionManager.h"
#import "ShareSDKManager.h"
#import "PrimaryDataManager.h"
#import "NotificationConstants.h"
#import "APIConstants.h"
#import "RCTWebView+Helper.h"
#import "RCTImageLoader+Helper.h"





//判断设备型号
#define UI_IS_LANDSCAPE         ([UIDevice currentDevice].orientation == UIDeviceOrientationLandscapeLeft || [UIDevice currentDevice].orientation == UIDeviceOrientationLandscapeRight)
#define UI_IS_IPAD              ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad)
#define UI_IS_IPHONE            ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone)
#define UI_IS_IPHONE4           (UI_IS_IPHONE && [[UIScreen mainScreen] bounds].size.height < 568.0)
#define UI_IS_IPHONE5           (UI_IS_IPHONE && [[UIScreen mainScreen] bounds].size.height == 568.0)
#define UI_IS_IPHONE6           (UI_IS_IPHONE && [[UIScreen mainScreen] bounds].size.height == 667.0)
#define UI_IS_IPHONE6PLUS       (UI_IS_IPHONE && [[UIScreen mainScreen] bounds].size.height == 736.0 || [[UIScreen mainScreen] bounds].size.width == 736.0) // Both orientations
#define UI_IS_IPHONEX           (UI_IS_IPHONE && [[UIScreen mainScreen] bounds].size.height == 812.0)

#define UI_IS_IOS9_AND_HIGHER   ([[UIDevice currentDevice].systemVersion floatValue] >= 9.0)
// 当前系统版本
#define SYSTEMVERSION         ([[[UIDevice currentDevice] systemVersion] doubleValue])

#endif /* AppImportConstants_h */
