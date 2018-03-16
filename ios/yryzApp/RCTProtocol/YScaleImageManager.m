//
//  YScaleImageManager.m
//  yryzApp
//
//  Created by sky on 2017/12/19.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "YScaleImageManager.h"
#import "YScaleImage.h"

@implementation YScaleImageManager
RCT_EXPORT_MODULE()

- (UIView *)view
{
  YScaleImage *broswer = [[YScaleImage alloc] init];
  return broswer;
}

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary)
//RCT_EXPORT_VIEW_PROPERTY(onPress, RCTDirectEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)


@end
