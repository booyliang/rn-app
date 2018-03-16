//
//  NSDictionary+Additions.m
//  yryz_app
//
//  Created by shibo on 2017/11/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "NSDictionary+Additions.h"
#import "NSString+Additions.h"

@implementation NSDictionary (Additions)

///获取设备信息
+(NSDictionary *)getDeviceInfo{
  NSString *appVersion = [[NSBundle mainBundle].infoDictionary valueForKey:@"CFBundleShortVersionString"];
  NSString *deviceName = [[NSUUID UUID] UUIDString];
  NSString *phoneVersion = [[UIDevice currentDevice] systemVersion];

  NSMutableDictionary *deviceInfo = [NSMutableDictionary dictionary];
  deviceInfo[@"deviceId"] = deviceName ?:@"";
  deviceInfo[@"appVersion"] = appVersion?:@"";
  deviceInfo[@"deviceType"] = @"1";
  deviceInfo[@"OS"] = phoneVersion ?:@"";
  deviceInfo[@"ip"] = [NSString getIPAddress:NO] ?:@"";

  return deviceInfo;
}

///获取渠道信息
+(NSDictionary *)getChannelInfo{

  return  @{@"channel":@"YRYZAPP-AS"};
}

@end
