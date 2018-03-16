//
//  ShareSDKManager.h
//  yryz-search
//
//  Created by shibo on 2017/10/15.
//  Copyright © 2017年 650 Industries, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <ShareSDK/ShareSDK.h>
#import <ShareSDKExtension/SSEShareHelper.h>
#import <ShareSDKExtension/SSEThirdPartyLoginHelper.h>
#import <ShareSDKExtension/ShareSDK+Extension.h>

typedef void (^ LoginSuccess) (NSDictionary *info);
typedef void (^ LoginFail) (NSString *code, NSString *message, NSError *error);
typedef void (^ CallBack) (BOOL isSuccess,NSString *code, NSString *message, NSError *error);



@interface ShareSDKManager : NSObject


///分享
+ (void)shareByPlatform:(NSString *)shareType
          url:(NSString *)url
        title:(NSString *)title
      content:(NSString *)content
        image:(id)image
     callBack:(CallBack)callBack;


///登录
+ (void)loginByPlatform:(NSString *)loginType
                success:(LoginSuccess)success
                   fail:(LoginFail)fail;

///是否安装客户端
+ (void)isClientInstalled:(NSString *)clientType
                 callBack:(CallBack)callBack;



@end
