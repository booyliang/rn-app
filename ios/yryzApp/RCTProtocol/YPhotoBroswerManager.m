//
//  YPhotoBroswerManager.m
//  NewProject
//
//  Created by shibo on 2017/11/24.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "YPhotoBroswerManager.h"
#import "YPhotoBroswer.h"


@implementation YPhotoBroswerManager
RCT_EXPORT_MODULE()

- (UIView *)view
{
  YPhotoBroswer *broswer = [[YPhotoBroswer alloc] init];
  return broswer;
}

RCT_EXPORT_VIEW_PROPERTY(uri, NSString)
RCT_EXPORT_VIEW_PROPERTY(onTap, RCTDirectEventBlock)



@end
