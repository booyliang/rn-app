//
//  NSString+Additions.h
//  yryz_app
//
//  Created by shibo on 2017/11/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (Additions)

///获取 ip 地址
+ (NSString *)getIPAddress:(BOOL)preferIPv4;

///获取 OSSBucktName
+ (NSString *)getOSSBucktName;

///获取 OSSUrl
+ (NSString *)getOSSUrl;

///获取缓存文件路径
+ (NSString *)getCachesPath;

///计算缓存文件的大小，多少M
+ (double)fileSizeAtPath:(NSString *)cachPath;

+ (void)cleanCacheWithCompletionBlock:(void(^)(BOOL success))completion;

@end
