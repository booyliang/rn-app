//
//  YZhugeIo.m
//  yryz_app
//
//  Created by shibo on 2017/10/26.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "YZhugeIo.h"
#import <MOBFoundation/MOBFoundation.h>
#import <UMAnalytics/MobClick.h>


@implementation YZhugeIo
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(track:(NSString *)track :(NSDictionary *)properties) {
  [MobClick event:track attributes:properties];
}


@end

