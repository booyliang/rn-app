//
//  PermissionManager.h
//  yryz_app
//
//  Created by shibo on 2017/11/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface PermissionManager : NSObject

///判断相册权限
+ (BOOL)isCanUsePhotos;

///判断相机权限
+ (BOOL)isCanUseCamera;



@end
