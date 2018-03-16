//
//  YPhotoBroswer.h
//  NewProject
//
//  Created by shibo on 2017/11/24.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "YYKit.h"

@interface YPhotoGroupItem : NSObject
@property (nonatomic, strong) UIView *thumbView; ///< thumb image, used for animation position calculation
@property (nonatomic, assign) CGSize largeImageSize;
@property (nonatomic, strong) NSURL *largeImageURL;
@property (nonatomic, strong) UIImage *thumbImage;
@end


@interface YPhotoBroswer : UIScrollView <UIScrollViewDelegate,UIGestureRecognizerDelegate>

@property (nonatomic, strong) UIView *imageContainerView;
@property (nonatomic, strong) YYAnimatedImageView *imageView;
@property (nonatomic, assign) NSInteger page;

@property (nonatomic, assign) BOOL showProgress;
@property (nonatomic, assign) CGFloat progress;
@property (nonatomic, strong) CAShapeLayer *progressLayer;

@property (nonatomic, strong) YPhotoGroupItem *item;
@property (nonatomic, readonly) BOOL itemDidLoad;

///图片url
@property (nonatomic, copy) NSString *uri;
///单击事件
@property (nonatomic, copy) RCTDirectEventBlock onTap;


- (void)resizeSubviewSize;

@end
