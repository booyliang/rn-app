//
//  ShareSDKManager.m
//  yryz-search
//
//  Created by shibo on 2017/10/15.
//  Copyright © 2017年 650 Industries, Inc. All rights reserved.
//

#import "ShareSDKManager.h"

@implementation ShareSDKManager

/**
 *  分享
 *
 *  @param shareType       类型
 *  @param url             url
 *  @param title           标题
 *  @param content         内容
 *  @param image           图片
 *  @param failure         失败
 *  @param success         成功
 */
+ (void)shareByPlatform:(NSString *)shareType
                    url:(NSString *)url
                  title:(NSString *)title
                content:(NSString *)content
                  image:(id)image
               callBack:(CallBack)callBack{


  SSDKPlatformType type;
  if ([shareType isEqualToString:@"qq"]) { //QQ 分享
    type = SSDKPlatformSubTypeQQFriend;
  }else if ([shareType isEqualToString:@"qZone"]) { // QQ 空间分享
    type = SSDKPlatformSubTypeQZone;
  }else if ([shareType isEqualToString:@"wechat"]) { //微信分享
    type = SSDKPlatformSubTypeWechatSession;
  }else if ([shareType isEqualToString:@"wechatMoment"]) { //朋友圈分享
    type = SSDKPlatformSubTypeWechatTimeline;
  }else if ([shareType isEqualToString:@"sinaWeibo"]) { //微博分享
    type = SSDKPlatformTypeSinaWeibo;
    content = [NSString stringWithFormat:@"%@%@",content,url];
  }else { // 其余 return 掉
    return;
  }


  NSURL *shareUrl = [NSURL URLWithString:url];
  NSURL *imageUrl = [NSURL URLWithString:image];


  NSMutableDictionary *shareParams = [NSMutableDictionary dictionary];
  [shareParams SSDKSetupShareParamsByText:content
                                   images:[image isEqual:@""]?[UIImage imageNamed:@"logo"]:imageUrl
                                      url:shareUrl
                                    title:title
                                     type:SSDKContentTypeAuto];


  [ShareSDK share:type parameters:shareParams onStateChanged:^(SSDKResponseState state, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error) {

    switch (state) {
      case SSDKResponseStateSuccess:  //成功
        callBack(YES,@"100",@"分享成功",error);
        break;
      case SSDKResponseStateFail:  //失败
        callBack(NO,@"-100",@"分享失败",error);
        break;
      case SSDKResponseStateCancel:  //取消
        callBack(NO,@"-101",@"取消分享",error);
        break;
      default:
        break;
    }

  }];

}

///登录
+ (void)loginByPlatform:(NSString *)loginType
                success:(LoginSuccess)success
                   fail:(LoginFail)fail{


  SSDKPlatformType type;
  if ([loginType isEqualToString:@"qq"]) { //QQ 登录
    type = SSDKPlatformSubTypeQQFriend;
  }else if ([loginType isEqualToString:@"wechat"]) { //微信登录
    type = SSDKPlatformSubTypeWechatSession;
  }else if ([loginType isEqualToString:@"sinaWeibo"]) { //微博登录
    type = SSDKPlatformTypeSinaWeibo;
  }else { // 其余 return 掉
    return;
  }

  [SSEThirdPartyLoginHelper loginByPlatform:type onUserSync:^(SSDKUser *user, SSEUserAssociateHandler associateHandler) {
    if (success) {
      NSString *uid = user.credential.uid ? : @"";
      NSString *token = user.credential.token ? : @"";
      NSDictionary *info = @{@"token":token,@"userId":uid};
      success(info);
    }
  } onLoginResult:^(SSDKResponseState state, SSEBaseUser *user, NSError *error) {
    switch (state) {
      case SSDKResponseStateFail:  //失败
        fail(@"-100",@"登录失败",error);
        break;
      case SSDKResponseStateCancel:  //取消
        fail(@"-101",@"取消登录",error);
        break;
      default:
        break;
    }  }];

}

///是否安装客户端
+ (void)isClientInstalled:(NSString *)clientType
                 callBack:(CallBack)callBack{

  SSDKPlatformType type;
  if ([clientType isEqualToString:@"qq"]) { //QQ 登录
    type = SSDKPlatformSubTypeQQFriend;
  }else if ([clientType isEqualToString:@"wechat"]) { //微信登录
    type = SSDKPlatformSubTypeWechatSession;
  }else if ([clientType isEqualToString:@"sinaWeibo"]) { //微博登录
    type = SSDKPlatformTypeSinaWeibo;
  }else { // 其余 return 掉
    callBack(NO,@"-100",@"没有该APP",nil);
    return;
  }
  BOOL isInstall = [ShareSDK isClientInstalled:type];

  if (isInstall) {
    callBack(YES,@"100",@"安装",nil);
  }else{
    callBack(NO,@"-100",@"未安装",nil);
  }
}



@end
