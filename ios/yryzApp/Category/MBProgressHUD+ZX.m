//
//  MBProgressHUD+ZX.m
//  YJProgressHUD
//
//  Created by Mrs_zhang on 16/11/14.
//  Copyright © 2016年 zyyj. All rights reserved.
//

#import "MBProgressHUD+ZX.h"

@implementation MBProgressHUD (ZX)

+ (void)showSuccess:(NSString *)success {
    [self show:success view:nil ImageName:@"hud_success"];
}

+ (void)showSuccess:(NSString *)success toView:(UIView *)view {
    [self show:success view:view ImageName:@"hud_success"];
}

+ (void)showError:(NSString *)error {
    [self show:error view:nil ImageName:@"hud_error"];
}

+ (void)showError:(NSString *)error toView:(UIView *)view {
    [self show:error view:view ImageName:@"hud_error"];
}

+ (void)showWarning:(NSString *)warning {
    [self show:warning view:nil ImageName:@"hud_warning"];
}

+ (void)showWarning:(NSString *)warning toView:(UIView *)view {
    [self show:warning view:view ImageName:@"hud_warning"];
}

+ (void)show:(NSString *)text view:(UIView *)view ImageName:(NSString *)imageName {
    UIImageView *showImageView = [[UIImageView alloc] init];
    showImageView.image = [UIImage imageNamed:imageName];
    if (view == nil)  view = [UIApplication sharedApplication].keyWindow;
    
    MBProgressHUD *hud = [MBProgressHUD showHUDAddedTo:view animated:YES];
    hud.userInteractionEnabled = NO;
//    if (kDevice_Is_iPhone5 && text.length > 16) {
//        hud.label.font = [UIFont systemFontOfSize:13];
//    }
    hud.label.text = text;
    hud.mode = MBProgressHUDModeCustomView;
//    hud.square = YES;
    hud.bezelView.style = MBProgressHUDBackgroundStyleSolidColor;
    hud.bezelView.color = [UIColor colorWithWhite:0.f alpha:.7f];
    hud.customView = showImageView;
    hud.animationType = MBProgressHUDAnimationZoomOut;
    hud.contentColor = kHUDTextColor;
    hud.removeFromSuperViewOnHide = YES;
    hud.margin = kHUDMargin;
    [hud hideAnimated:YES afterDelay:1.0];
}

+ (void)showLoading:(NSString *)loading Progress:(CGFloat)progress {
    UIView *view = [UIApplication sharedApplication].keyWindow;
    view.frame = CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height);
    [self showLoading:loading Progress:progress toView:view];
}

+ (void)showLoading:(NSString *)loading Progress:(CGFloat)progress toView:(UIView *)view{
    MBProgressHUD *hud = [MBProgressHUD showHUDAddedTo:view animated:YES];
    hud.label.text = loading;
    hud.bezelView.style = MBProgressHUDBackgroundStyleSolidColor;
    hud.bezelView.color = [UIColor colorWithWhite:0.f alpha:.7f];
    hud.contentColor = kHUDTextColor;
    hud.mode = MBProgressHUDModeIndeterminate;
    hud.progress = progress;
    hud.animationType = MBProgressHUDAnimationZoomOut;
    hud.removeFromSuperViewOnHide = YES;
}

// loading + button（可用取消按钮）
+ (void)showLoading:(NSString *)loading buttonTitle:(NSString *)title target:(id)target action:(SEL)action {
    UIView *view = [UIApplication sharedApplication].keyWindow;
    view.frame = CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height);
    [self showLoading:loading toView:view buttonTitle:title target:target action:action];
}

+ (void)showLoading:(NSString *)loading toView:(UIView *)view buttonTitle:(NSString *)title target:(id)target action:(SEL)action {
    MBProgressHUD *hud = [MBProgressHUD showHUDAddedTo:view animated:YES];
    hud.label.text = loading;
    hud.bezelView.style = MBProgressHUDBackgroundStyleSolidColor;
    hud.bezelView.color = [UIColor colorWithWhite:0.f alpha:.7f];
    hud.contentColor = kHUDTextColor;
    hud.mode = MBProgressHUDModeIndeterminate;
    hud.animationType = MBProgressHUDAnimationZoomOut;
    hud.removeFromSuperViewOnHide = YES;
    [hud.button setTitle:title forState:UIControlStateNormal];
    [hud.button addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
}

+ (void)showMessage:(NSString *)message {
    UIView *view = [UIApplication sharedApplication].keyWindow;
    view.frame = CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height);
    [self showMessage:message toView:view];
}

+ (void)showMessage:(NSString *)message toView:(UIView *)view {
    MBProgressHUD *hud = [MBProgressHUD showHUDAddedTo:view animated:YES];
    hud.userInteractionEnabled = NO;
//    if (kDevice_Is_iPhone5 && message.length > 16) {
//        hud.label.font = [UIFont systemFontOfSize:13];
//    }
    hud.label.text = message;
    hud.mode = MBProgressHUDModeText;
    hud.bezelView.style = MBProgressHUDBackgroundStyleSolidColor;
    hud.bezelView.color = [UIColor colorWithWhite:0.f alpha:.7f];
    hud.contentColor = kHUDTextColor;
    hud.margin = kHUDMargin;
    hud.animationType = MBProgressHUDAnimationZoomOut;
    hud.removeFromSuperViewOnHide = YES;
    [hud hideAnimated:YES afterDelay:1.0];
}

+ (void)hideHUD {
    [self hideHUDForView:nil];
}

+ (void)hideHUDForView:(UIView *)view {
    if (view == nil) view = [UIApplication sharedApplication].keyWindow;
    [self hideHUDForView:view animated:YES];
}

@end
