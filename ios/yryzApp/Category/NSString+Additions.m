//
//  NSString+Additions.m
//  yryz_app
//
//  Created by shibo on 2017/11/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "NSString+Additions.h"
#import <CommonCrypto/CommonCrypto.h>
#include <ifaddrs.h>
#include <arpa/inet.h>
#import <sys/utsname.h>

#import <ifaddrs.h>
#import <arpa/inet.h>
#import <net/if.h>


#define IOS_CELLULAR    @"pdp_ip0"
#define IOS_WIFI        @"en0"
#define IOS_VPN         @"utun0"
#define IP_ADDR_IPv4    @"ipv4"
#define IP_ADDR_IPv6    @"ipv6"

@implementation NSString (Additions)
//获取 ip 地址
+ (NSString *)getIPAddress:(BOOL)preferIPv4
{
  NSArray *searchArray = preferIPv4 ?
  @[ IOS_VPN @"/" IP_ADDR_IPv4, IOS_VPN @"/" IP_ADDR_IPv6, IOS_WIFI @"/" IP_ADDR_IPv4, IOS_WIFI @"/" IP_ADDR_IPv6, IOS_CELLULAR @"/" IP_ADDR_IPv4, IOS_CELLULAR @"/" IP_ADDR_IPv6 ] :
  @[ IOS_VPN @"/" IP_ADDR_IPv6, IOS_VPN @"/" IP_ADDR_IPv4, IOS_WIFI @"/" IP_ADDR_IPv6, IOS_WIFI @"/" IP_ADDR_IPv4, IOS_CELLULAR @"/" IP_ADDR_IPv6, IOS_CELLULAR @"/" IP_ADDR_IPv4 ] ;

  NSDictionary *addresses = [self getIPAddresses];
  //    NSLog(@"addresses: %@", addresses);

  __block NSString *address;
  [searchArray enumerateObjectsUsingBlock:^(NSString *key, NSUInteger idx, BOOL *stop)
   {
     address = addresses[key];
     //筛选出IP地址格式
     if([self isValidatIP:address]) *stop = YES;
   } ];
  return address ? address : @"0.0.0.0";
}

+ (BOOL)isValidatIP:(NSString *)ipAddress {
  if (ipAddress.length == 0) {
    return NO;
  }
  NSString *urlRegEx = @"^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\."
  "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\."
  "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\."
  "([01]?\\d\\d?|2[0-4]\\d|25[0-5])$";

  NSError *error;
  NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:urlRegEx options:0 error:&error];

  if (regex != nil) {
    NSTextCheckingResult *firstMatch=[regex firstMatchInString:ipAddress options:0 range:NSMakeRange(0, [ipAddress length])];

    if (firstMatch) {
      // NSRange resultRange = [firstMatch rangeAtIndex:0];
      //  NSString *result=[ipAddress substringWithRange:resultRange];

      return YES;
    }
  }
  return NO;
}

+ (NSDictionary *)getIPAddresses
{
  NSMutableDictionary *addresses = [NSMutableDictionary dictionaryWithCapacity:8];

  // retrieve the current interfaces - returns 0 on success
  struct ifaddrs *interfaces;
  if(!getifaddrs(&interfaces)) {
    // Loop through linked list of interfaces
    struct ifaddrs *interface;
    for(interface=interfaces; interface; interface=interface->ifa_next) {
      if(!(interface->ifa_flags & IFF_UP) /* || (interface->ifa_flags & IFF_LOOPBACK) */ ) {
        continue; // deeply nested code harder to read
      }
      const struct sockaddr_in *addr = (const struct sockaddr_in*)interface->ifa_addr;
      char addrBuf[ MAX(INET_ADDRSTRLEN, INET6_ADDRSTRLEN) ];
      if(addr && (addr->sin_family==AF_INET || addr->sin_family==AF_INET6)) {
        NSString *name = [NSString stringWithUTF8String:interface->ifa_name];
        NSString *type;
        if(addr->sin_family == AF_INET) {
          if(inet_ntop(AF_INET, &addr->sin_addr, addrBuf, INET_ADDRSTRLEN)) {
            type = IP_ADDR_IPv4;
          }
        } else {
          const struct sockaddr_in6 *addr6 = (const struct sockaddr_in6*)interface->ifa_addr;
          if(inet_ntop(AF_INET6, &addr6->sin6_addr, addrBuf, INET6_ADDRSTRLEN)) {
            type = IP_ADDR_IPv6;
          }
        }
        if(type) {
          NSString *key = [NSString stringWithFormat:@"%@/%@", name, type];
          addresses[key] = [NSString stringWithUTF8String:addrBuf];
        }
      }
    }
    // Free memory
    freeifaddrs(interfaces);
  }
  return [addresses count] ? addresses : nil;
}

///获取 OSSBucktName
+ (NSString *)getOSSBucktName{

  NSString *filePath = [[ NSBundle mainBundle ] pathForResource:@"app" ofType:@"json"];
  NSData *jdata = [[ NSData alloc ] initWithContentsOfFile:filePath];
  NSDictionary *jsonObject = [ NSJSONSerialization JSONObjectWithData:jdata options:kNilOptions error:nil];
  NSString *build = [jsonObject objectForKey:@"build"];

  NSString *bucktName = @"";
  if ([build isEqualToString:@"mo"] ) {
    bucktName = @"yryz-resources-mo";
  }else{
    bucktName = @"yryz-resources";
  }
  return bucktName;
}

///获取 OSSUrl
+ (NSString *)getOSSUrl{

  NSString *filePath = [[ NSBundle mainBundle ] pathForResource:@"app" ofType:@"json"];
  NSData *jdata = [[ NSData alloc ] initWithContentsOfFile:filePath];
  NSDictionary *jsonObject = [ NSJSONSerialization JSONObjectWithData:jdata options:kNilOptions error:nil];
  NSString *build = [jsonObject objectForKey:@"build"];

  NSString *ossUrl = @"";
  if ([build isEqualToString:@"mo"] ) {
    ossUrl = @"https://cdn-mo.yryz.com";
  }else{
    ossUrl = @"https://cdn.yryz.com";
  }
  return ossUrl;
}

///获取缓存文件路径
+ (NSString *)getCachesPath{
  // 获取Caches目录路径
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
  NSString *cachesDir = [paths objectAtIndex:0];

  //指定文件名
  // NSString *filePath = [cachesDir stringByAppendingPathComponent:@"com.nickcheng.NCMusicEngine"];
  return cachesDir;
}

///计算缓存文件的大小，多少M
+ (double)fileSizeAtPath:(NSString *)cachPath{

  NSFileManager* fileManger = [NSFileManager defaultManager];

  //通过缓存文件路径创建文件遍历器
  NSDirectoryEnumerator * fileEnumrator = [fileManger enumeratorAtPath:cachPath];

  //先定义一个缓存目录总大小的变量
  unsigned long long fileTotalSize = 0;

  for (NSString * fileName in fileEnumrator)
  {
    //拼接文件全路径（注意：是文件）
    NSString * filePath = [cachPath stringByAppendingPathComponent:fileName];

    //获取文件属性
    NSDictionary * fileAttributes = [fileManger attributesOfItemAtPath:filePath error:nil];

    //根据文件属性判断是否是文件夹（如果是文件夹就跳过文件夹，不将文件夹大小累加到文件总大小）
    if ([fileAttributes[NSFileType] isEqualToString:NSFileTypeDirectory]) continue;

    //获取单个文件大小,并累加到总大小
    fileTotalSize += [fileAttributes[NSFileSize] integerValue];
  }

  //float ff = fileTotalSize/1024.0/1024.0; //换算成多少M
  //NSString *size = [NSString stringWithFormat:@"%0.2fM",ff];
  double ff = fileTotalSize; //换算成多少B
//  NSString *size = [NSString stringWithFormat:@"%f",ff];

  return ff;
}

+ (void)cleanCacheWithCompletionBlock:(void(^)(BOOL success))completion {

  dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
  NSString *cacheDirectory = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) firstObject];
  dispatch_async(queue, ^{
    NSError *error;
    NSDirectoryEnumerator *fileEnumeratorCache = [[NSFileManager defaultManager] enumeratorAtPath:[NSString getCachesPath]];
    for (NSString *fileName in fileEnumeratorCache) {
      NSString *filePath = [cacheDirectory stringByAppendingPathComponent:fileName];
      if ([[NSFileManager defaultManager] fileExistsAtPath:filePath]) {
        [[NSFileManager defaultManager] removeItemAtPath:filePath error:&error];
      }
    }

    if (completion) {
      dispatch_async(dispatch_get_main_queue(), ^{
        completion(YES);
      });
    }
  });
}




@end
