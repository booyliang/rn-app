//
//  YOSS.m
//  yryz_app
//
//  Created by shibo on 2017/11/3.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "YOSS.h"

@implementation YOSS

RCT_EXPORT_MODULE()


///上传图片到 OSS
RCT_EXPORT_METHOD(requestOSS:(NSArray *)paths ossDir:(NSString *)ossDir resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){

  NSMutableArray *imageUrlArray = [NSMutableArray arrayWithCapacity:paths.count];        // 图片URL
  NSMutableArray *imageNameArray = [NSMutableArray arrayWithCapacity:paths.count];    // 唯一标识
  // 上传图片
  for (int i = 0; i < paths.count; i++) {
    CFUUIDRef uuid = CFUUIDCreate(NULL);
    CFStringRef uuidstring = CFUUIDCreateString(NULL, uuid);
    NSString *imageName = [NSString stringWithFormat:@"%@",uuidstring];
    [imageNameArray addObject:@{@"imagePath" : paths[i], @"imageName" : imageName}];
    NSString *imageURI = [NSString stringWithFormat:@"/pic/%@%@_iOS.jpg", ossDir,imageName];
    NSString *imageURL = [[NSString getOSSUrl] stringByAppendingString:imageURI];
    [imageUrlArray addObject:imageURL];
    CFRelease(uuid);
    CFRelease(uuidstring);
  }

  [OSSUploadManager uploadImageToSever:imageNameArray filePath:ossDir SuccessBlock:^{
    resolve(imageUrlArray);
  } FailBlock:^{
    reject(@"-100",@"上传失败",nil);
  }];

}

@end
