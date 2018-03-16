//
//  MBProgressHUD+ZX.h
//  YJProgressHUD
//
//  Created by Mrs_zhang on 16/11/14.
//  Copyright © 2016年 zyyj. All rights reserved.
//

#define kHUDTextColor [UIColor whiteColor]
#define kHUDMargin  10


#import <MBProgressHUD/MBProgressHUD.h>

@interface MBProgressHUD (ZX)

/**加载成功*/
+ (void)showSuccess:(NSString *)success;
+ (void)showSuccess:(NSString *)success toView:(UIView *)view;

/**加载警告*/
+ (void)showWarning:(NSString *)warning;
+ (void)showWarning:(NSString *)warning toView:(UIView *)view;

/**加载中...*/
+ (void)showLoading:(NSString *)loading Progress:(CGFloat)progress;
+ (void)showLoading:(NSString *)loading Progress:(CGFloat)progress toView:(UIView *)view;

// loading + button（可用取消按钮）
+ (void)showLoading:(NSString *)loading buttonTitle:(NSString *)title target:(id)target action:(SEL)action;
+ (void)showLoading:(NSString *)loading toView:(UIView *)view buttonTitle:(NSString *)title target:(id)target action:(SEL)action;

/**加载文字*/
+ (void)showMessage:(NSString *)message;
+ (void)showMessage:(NSString *)message toView:(UIView *)view;

/**隐藏弹框*/
+ (void)hideHUD;
+ (void)hideHUDForView:(UIView *)view;


@end
