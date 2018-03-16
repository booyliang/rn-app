//
//  OSSUploadManager.h
//  yryz_app
//
//  Created by shibo on 2017/11/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void (^SuccessBlock)();
typedef void (^FailBlock)();

@interface OSSUploadManager : NSObject

///上传多张图片
+ (void)uploadImageToSever:(NSArray *)uploadArray filePath:(NSString *)filePath SuccessBlock:(SuccessBlock)successBlock FailBlock:(FailBlock)failBlock ;

@end
