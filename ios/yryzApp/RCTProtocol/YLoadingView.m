//
//  YLoadingView.m
//  yryzApp
//
//  Created by sky on 2017/12/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "YLoadingView.h"

@implementation YLoadingView

- (instancetype)init{
  
  self = [super init];
  if (self) {
    self.contentMode = UIViewContentModeScaleAspectFit;
    
    NSMutableArray *images = [NSMutableArray array];
    for (int i = 1; i< 25; i++) {
      UIImage *image = [UIImage imageNamed:[NSString stringWithFormat:@"loading_%d",i]?:@""];
      [images addObject:image];
    }
    self.animationImages = images;
    self.animationRepeatCount = 0;
    self.animationDuration = 1;
    [self sizeToFit];
    [self startAnimating];
  }
  return self;
}



@end
