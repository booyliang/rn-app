//
//  YLoadingViewManager.m
//  yryzApp
//
//  Created by sky on 2017/12/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "YLoadingViewManager.h"
#import "YLoadingView.h"

@interface YLoadingViewManager ()
@property (nonatomic,strong) YLoadingView *loadingView;

@end
@implementation YLoadingViewManager

RCT_EXPORT_MODULE()

- (UIView *)view{

  YLoadingView *loading = [[YLoadingView alloc] init];
  return loading;
}



@end
