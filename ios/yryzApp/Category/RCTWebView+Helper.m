//
//  RCTWebView+Helper.m
//  yryzApp
//
//  Created by shibo on 2017/11/9.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTWebView+Helper.h"

@implementation RCTWebView (Helper)

///重写 webView 加载失败方法,防止 webView 加载部分链接出现加载失败的情况
- (void)webView:(__unused UIWebView *)webView didFailLoadWithError:(NSError *)error{
}

@end
