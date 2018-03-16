//
//  AppDelegate+SDK.h
//  yryzApp
//
//  Created by shibo on 2017/11/7.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "AppDelegate.h"

@interface AppDelegate (SDK)

///性能监控
- (void)setFunctionMonitorView:(id)jsonObject;

///配置js 加载白屏遮罩
- (void)setAutoSplashScreen;

///配置三方 SDK
- (void)configurationThirdPartySDKWithLaunchOptions:(NSDictionary *)launchOptions
                                         jsonObject:(id)jsonObject;



@end
