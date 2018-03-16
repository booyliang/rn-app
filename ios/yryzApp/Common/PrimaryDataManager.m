//
//  PrimaryDataManager.m
//  yryzApp
//
//  Created by shibo on 2017/11/6.
//  Copyright © 2017年 Facebook. All rights reserved.
//  基本数据

#import "PrimaryDataManager.h"

@implementation PrimaryDataManager

+ (instancetype)sharePrimaryData{

    static PrimaryDataManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
      manager = [[self alloc] init];
    });
    return manager;
}


@end
