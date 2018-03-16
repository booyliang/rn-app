//
//  DemoViewController.m
//  yryzApp
//
//  Created by shibo on 2017/10/18.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "DemoViewController.h"
#import "ShareSDKManager.h"
#import "YYPhotoGroupView.h"


@interface DemoViewController ()

@end

@implementation DemoViewController

- (void)viewDidLoad {
    [super viewDidLoad];

  self.view.backgroundColor = [UIColor whiteColor];
  
  UIButton *qqLogin = [UIButton buttonWithType:UIButtonTypeCustom];
  qqLogin.frame = CGRectMake(100, 100, 80, 40);
  [qqLogin setTitle:@"QQ登录" forState:UIControlStateNormal];
  [qqLogin setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
  [self.view addSubview:qqLogin];
  
  UIButton *wechatLogin = [UIButton buttonWithType:UIButtonTypeCustom];
  wechatLogin.frame = CGRectMake(100, CGRectGetMaxY(qqLogin.frame)+30, 80, 40);
  [wechatLogin setTitle:@"微信登录" forState:UIControlStateNormal];
  [wechatLogin setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
  [self.view addSubview:wechatLogin];
  
  UIButton *sinaLogin = [UIButton buttonWithType:UIButtonTypeCustom];
  sinaLogin.frame = CGRectMake(100, CGRectGetMaxY(wechatLogin.frame)+30, 80, 40);
  [sinaLogin setTitle:@"微博登录" forState:UIControlStateNormal];
  [sinaLogin setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
  [self.view addSubview:sinaLogin];
  
  UIButton *qqShare = [UIButton buttonWithType:UIButtonTypeCustom];
  qqShare.frame = CGRectMake(100, CGRectGetMaxY(sinaLogin.frame)+30, 80, 40);
  [qqShare setTitle:@"QQ分享" forState:UIControlStateNormal];
  [qqShare setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
  [self.view addSubview:qqShare];
  
  UIButton *qoneShare = [UIButton buttonWithType:UIButtonTypeCustom];
  qoneShare.frame = CGRectMake(100, CGRectGetMaxY(qqShare.frame)+30, 80, 40);
  [qoneShare setTitle:@"QQ空间分享" forState:UIControlStateNormal];
  [qoneShare setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
  [self.view addSubview:qoneShare];
  
  UIButton *wechatShare = [UIButton buttonWithType:UIButtonTypeCustom];
  wechatShare.frame = CGRectMake(100, CGRectGetMaxY(qoneShare.frame)+30, 80, 40);
  [wechatShare setTitle:@"微信分享" forState:UIControlStateNormal];
  [wechatShare setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
  [self.view addSubview:wechatShare];
  
  UIButton *monentsShare = [UIButton buttonWithType:UIButtonTypeCustom];
  monentsShare.frame = CGRectMake(100, CGRectGetMaxY(wechatShare.frame)+30, 80, 40);
  [monentsShare setTitle:@"微信朋友圈分享" forState:UIControlStateNormal];
  [monentsShare setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
  [self.view addSubview:monentsShare];
  
  UIButton *sinaShare = [UIButton buttonWithType:UIButtonTypeCustom];
  sinaShare.frame = CGRectMake(100, CGRectGetMaxY(monentsShare.frame)+30, 80, 40);
  [sinaShare setTitle:@"微博分享" forState:UIControlStateNormal];
  [sinaShare setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
  [self.view addSubview:sinaShare];
  
  
  qqLogin.tag = 101;
  wechatLogin.tag = 102;
  sinaLogin.tag = 103;
  qqShare.tag = 104;
  qoneShare.tag = 105;
  wechatShare.tag = 106;
  monentsShare.tag = 107;
  sinaShare.tag = 108;

  [qqLogin addTarget:self action:@selector(loginAction:) forControlEvents:UIControlEventTouchUpInside];
  [wechatLogin addTarget:self action:@selector(loginAction:) forControlEvents:UIControlEventTouchUpInside];
  [sinaLogin addTarget:self action:@selector(loginAction:) forControlEvents:UIControlEventTouchUpInside];
  
  [qqShare addTarget:self action:@selector(shareAction:) forControlEvents:UIControlEventTouchUpInside];
  [qoneShare addTarget:self action:@selector(shareAction:) forControlEvents:UIControlEventTouchUpInside];
  [wechatShare addTarget:self action:@selector(shareAction:) forControlEvents:UIControlEventTouchUpInside];
  [monentsShare addTarget:self action:@selector(shareAction:) forControlEvents:UIControlEventTouchUpInside];
  [sinaShare addTarget:self action:@selector(shareAction:) forControlEvents:UIControlEventTouchUpInside];

}


- (void)loginAction:(UIButton *)sender{

  NSInteger index = sender.tag - 100;

}

- (void)shareAction:(UIButton *)sender{

  NSArray *photosURLs = @[@"http://g.hiphotos.baidu.com/image/pic/item/03087bf40ad162d99c14f9d618dfa9ec8b13cd06.jpg",
                          @"http://b.hiphotos.baidu.com/image/pic/item/a08b87d6277f9e2fde991dc21630e924b999f348.jpg"];

  NSMutableArray *items = [NSMutableArray new];

  for (NSUInteger i = 0, max = photosURLs.count; i < max; i++) {

    //    UIView *imgView = cell.picViews[i];

    CGFloat imageWidth = 80;

    NSString *url = [photosURLs objectAtIndex:i];

    NSURL *picUrl = [NSURL URLWithString:url];

    YYPhotoGroupItem *item = [YYPhotoGroupItem new];

    //    item.thumbView = imgView;

    item.largeImageURL = picUrl;

    item.largeImageSize = CGSizeMake(imageWidth, imageWidth);

    [items addObject:item];

    //    if (i == 0) {
    //
    //      fromView = imgView;
    //    }
  }

  YYPhotoGroupView *v = [[YYPhotoGroupView alloc] initWithGroupItems:items];

  UIView *view = [[UIView alloc]initWithFrame:CGRectMake(100, 100, 100, 100)];

  [v presentFromImageView:view toContainer:self.view animated:YES completion:nil];


}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
