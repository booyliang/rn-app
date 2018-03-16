//
//  OSSUploadManager.m
//  yryz_app
//
//  Created by shibo on 2017/11/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "OSSUploadManager.h"
#import <AliyunOSSiOS/OSSService.h>
#import "NSString+Additions.h"

//阿里云终端地址
#define EndPoint @"http://oss-cn-hangzhou.aliyuncs.com"
//阿里云图片文件保存目录
#define PicFilePath @"pic/opus"

@implementation OSSUploadManager

//配置阿里云oss
+ (OSSClient *)setAliyunOssConfig {
  //自实现签名，可以用本地签名也可以远程加签
  id<OSSCredentialProvider> credential1 = [[OSSCustomSignerCredentialProvider alloc] initWithImplementedSigner:^NSString *(NSString *contentToSign, NSError *__autoreleasing *error) {
    NSString *signature = [OSSUtil calBase64Sha1WithData:contentToSign withSecret:OSS_SECRETACCESSKEY];
    return [NSString stringWithFormat:@"OSS %@:%@", OSS_ACCESSKEYID, signature];
  }];

  OSSClientConfiguration * conf = [OSSClientConfiguration new];
  conf.maxRetryCount = 5;
  conf.timeoutIntervalForRequest = 30;
  conf.timeoutIntervalForResource = 24 * 60 * 60;
  OSSClient *ossClient = [[OSSClient alloc] initWithEndpoint:EndPoint credentialProvider:credential1 clientConfiguration:conf];

  return ossClient;
}
+ (void)uploadImageToSever:(NSArray *)uploadArray filePath:(NSString *)filePath SuccessBlock:(SuccessBlock)successBlock FailBlock:(FailBlock)failBlock {
  [self uploadImageToSever:uploadArray FilePath:[NSString stringWithFormat:@"pic/%@",filePath] SuccessBlock:successBlock FailBlock:failBlock joinSize:NO];
}

+ (void)uploadImageToSever:(NSArray*)uploadArray FilePath:(NSString *)filePath SuccessBlock:(SuccessBlock)successBlock FailBlock:(FailBlock)failBlock joinSize:(BOOL)join{

  OSSClient *ossClient = [OSSUploadManager setAliyunOssConfig];
  __block NSInteger successUploadPicNum = 0;
  for (NSDictionary *imageDic in uploadArray) {
    NSString *path = [imageDic objectForKey:@"imagePath"];
    UIImage *image = [UIImage imageWithContentsOfFile:path];

    NSString *imageName = [imageDic objectForKey:@"imageName"];
    OSSPutObjectRequest * put = [OSSPutObjectRequest new];
    // 必填字段
    put.bucketName = [NSString getOSSBucktName];
    put.objectKey = [NSString stringWithFormat:@"%@%@_iOS.jpg%@", filePath, imageName, join ? [NSString stringWithFormat:@"?w=%.0f&h=%.0f", image.size.width, image.size.height] : @""];
    NSString  *filePath = [path stringByReplacingOccurrencesOfString:@"file://" withString:@""];

    put.uploadingFileURL = [NSURL fileURLWithPath:filePath];
    OSSTask * putTask = [ossClient putObject:put];
    [putTask continueWithBlock:^id(OSSTask *task) {
      if(!task.error) {
        successUploadPicNum += 1;
        if (successUploadPicNum == uploadArray.count) {
          if (successBlock) {
            dispatch_async(dispatch_get_main_queue(), ^{
              successBlock();
            });
          }
        }
      } else {
        if (failBlock) {
          dispatch_async(dispatch_get_main_queue(), ^{
            successBlock();
          });
        }
      }
      return nil;
    }];
  }
}

@end
