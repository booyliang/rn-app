//
//  PrimaryDataManager.h
//  yryzApp
//
//  Created by shibo on 2017/11/6.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface PrimaryDataManager : NSObject

+ (instancetype)sharePrimaryData;

///红点数量
@property (nonatomic,assign) NSInteger badgeCount;



@end
