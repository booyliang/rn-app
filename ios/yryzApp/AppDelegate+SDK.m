//
//  AppDelegate+SDK.m
//  yryzApp
//
//  Created by shibo on 2017/11/7.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "AppDelegate+SDK.h"
#import <UMCommon/UMCommon.h>
#import <UMAnalytics/MobClick.h>

#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif

#import <ShareSDK/ShareSDK.h>
#import <ShareSDKConnector/ShareSDKConnector.h>
#import <TencentOpenAPI/TencentOAuth.h>
#import <TencentOpenAPI/QQApiInterface.h>
#import "WXApi.h"
#import "WeiboSDK.h"

#import <Bugly/Bugly.h>

#import "FunctionMonitorView.h"

@implementation AppDelegate (SDK)


///性能监控
- (void)setFunctionMonitorView:(id)jsonObject{

  BOOL showFunctionMonitorView = [[jsonObject objectForKey:IS_SHOWFUNCTIONMONITOR] boolValue];
  if(showFunctionMonitorView){
    FunctionMonitorView *functionV = [[FunctionMonitorView alloc] initWithFrame:CGRectZero];
    [[UIApplication sharedApplication].keyWindow addSubview:functionV];
  }
}


///配置js 加载白屏遮罩
- (void)setAutoSplashScreen{

  [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(closeSplashImage) name:Notification_CLOSE_SPLASH_SCREEN object:nil];
  [self autoSplashScreen];//写在 return YES 之前，其他代码之后
}

-(void)autoSplashScreen{

  if (!self.splashImage) {
    self.splashImage = [[UIImageView alloc]initWithFrame:[UIScreen mainScreen].bounds];
  }

  if (UI_IS_IPHONEX) {
    [self.splashImage setImage:[UIImage imageNamed:@"startImageX"]];
  }else if(UI_IS_IPHONE5){
    [self.splashImage setImage:[UIImage imageNamed:@"startImage5"]];
  }else{
    [self.splashImage setImage:[UIImage imageNamed:@"startImage"]];
  }

  [self.window addSubview:self.splashImage];
}

- (void)closeSplashImage{
  dispatch_sync(dispatch_get_main_queue(), ^{
    [UIView animateWithDuration:0.5 animations:^{
      self.splashImage.alpha = 0;
    } completion:^(BOOL finished){
      [self.splashImage removeFromSuperview];
    }];
  });
}


///配置三方 SDK
- (void)configurationThirdPartySDKWithLaunchOptions:(NSDictionary *)launchOptions
                                         jsonObject:(id)jsonObject{

  [self setShareSDKWithJsonObject:jsonObject];
  [self setJPushWithLaunchOptions:launchOptions JsonObject:jsonObject];

  NSString *umAppKey = [jsonObject objectForKey:UM_APPKEY];
  NSString *buglyAppId = [jsonObject objectForKey:BUGLY_APPID];
  [Bugly startWithAppId:buglyAppId];
  [UMConfigure initWithAppkey:umAppKey channel:@"App Store"];
  [MobClick setScenarioType:E_UM_NORMAL];

}


#pragma mark -- SHARESDK

- (void)setShareSDKWithJsonObject:(id)jsonObject{

  NSArray *platforms = @[@(SSDKPlatformTypeSinaWeibo),
                         @(SSDKPlatformTypeWechat),
                         @(SSDKPlatformTypeQQ)];

  [ShareSDK registerActivePlatforms:platforms onImport:^(SSDKPlatformType platformType) {
    [self registerActiveonImport:platformType];
  } onConfiguration:^(SSDKPlatformType platformType, NSMutableDictionary *appInfo) {
    [self setShareSDKKey:platformType APPInfo:appInfo JsonObject:(id)jsonObject];
  }];

}

- (void)registerActiveonImport:(SSDKPlatformType)platformType{

  switch (platformType) {
    case SSDKPlatformTypeSinaWeibo:
      [ShareSDKConnector connectWeibo:[WeiboSDK class]];
      break;
    case SSDKPlatformTypeWechat:
      [ShareSDKConnector connectWeChat:[WXApi class]];
      break;
    case SSDKPlatformTypeQQ:
      [ShareSDKConnector connectQQ:[QQApiInterface class] tencentOAuthClass:[TencentOAuth class]];
      break;
    default:
      break;
  }
}

- (void)setShareSDKKey:(SSDKPlatformType)platformType APPInfo:(NSMutableDictionary *)appInfo JsonObject:(id)jsonObject{

  NSString *sinaAppKey = [jsonObject objectForKey:SINA_APPKEY];
  NSString *sinaAppSecret = [jsonObject objectForKey:SINA_APPSECRET];
  NSString *sinaRedirectUri = [jsonObject objectForKey:SINA_REDIRECTURI];
  NSString *wechatAppId = [jsonObject objectForKey:WECHAT_APPID];
  NSString *wechatAppSecret = [jsonObject objectForKey:WECHAT_APPSECRET];
  NSString *qqAppKey = [jsonObject objectForKey:QQ_APPKEY];
  NSString *qqAppId = [jsonObject objectForKey:QQ_APPID];

  switch (platformType) {
    case SSDKPlatformTypeSinaWeibo:
      [appInfo SSDKSetupSinaWeiboByAppKey:sinaAppKey
                                appSecret:sinaAppSecret
                              redirectUri:sinaRedirectUri
                                 authType:SSDKAuthTypeBoth];
      break;
    case SSDKPlatformTypeWechat:
      [appInfo SSDKSetupWeChatByAppId:wechatAppId
                            appSecret:wechatAppSecret];
      break;
    case SSDKPlatformTypeQQ:
      [appInfo SSDKSetupQQByAppId:qqAppId
                           appKey:qqAppKey
                         authType:SSDKAuthTypeBoth];
      break;
    default:
      break;
  }
}

#pragma mark -- BUGLY AND ZHUGE

#pragma mark -- JPUSH

- (void)setJPushWithLaunchOptions:(NSDictionary *)launchOptions JsonObject:(id)jsonObject{

  if ([[UIDevice currentDevice].systemVersion floatValue] >= 10.0) {
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
    JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
    entity.types = UNAuthorizationOptionAlert|UNAuthorizationOptionBadge|UNAuthorizationOptionSound;
    [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];

#endif
  } else if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
    [JPUSHService registerForRemoteNotificationTypes:(UIUserNotificationTypeBadge |
                                                      UIUserNotificationTypeSound |
                                                      UIUserNotificationTypeAlert)
                                          categories:nil];
  }
  NSString *jpushAppKey = [jsonObject objectForKey:JPUSH_APPKEY];
  BOOL apsForProduction = [[jsonObject objectForKey:APSFORPRODUCTION] boolValue];
  //NSLog(@"apsForProduction:%d",apsForProduction);
  [JPUSHService setupWithOption:launchOptions appKey:jpushAppKey
                        channel:@"" apsForProduction:apsForProduction];

  NSNotificationCenter *defaultCenter = [NSNotificationCenter defaultCenter];
  [defaultCenter addObserver:self selector:@selector(networkDidReceiveMessage:) name:kJPFNetworkDidLoginNotification object:nil];
}

- (void)networkDidReceiveMessage:(NSNotification *)notification {

  NSString *reId = [JPUSHService registrationID];

}

//通知方法
- (void)networkDidLoginMessage:(NSNotification *)notification {
  //注销通知
  [[NSNotificationCenter defaultCenter] removeObserver:self name:kJPFNetworkDidLoginNotification object:nil];
}


@end
