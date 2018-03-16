//
//  YScaleImage.m
//  yryzApp
//
//  Created by sky on 2017/12/19.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "YScaleImage.h"
@interface YPhotoGroupItem()<NSCopying>

@property (nonatomic, readonly) BOOL thumbClippedToTop;

- (BOOL)shouldClipToTop:(CGSize)imageSize forView:(UIView *)view;
@end
@implementation YPhotoGroupItem

- (UIImage *)thumbImage {
  if ([_thumbView respondsToSelector:@selector(image)]) {
    return ((UIImageView *)_thumbView).image;
  }
  return nil;
}

- (BOOL)thumbClippedToTop {
  if (_thumbView) {
    if (_thumbView.layer.contentsRect.size.height < 1) {
      return YES;
    }
  }
  return NO;
}

- (BOOL)shouldClipToTop:(CGSize)imageSize forView:(UIView *)view {
  if (imageSize.width < 1 || imageSize.height < 1) return NO;
  if (view.width < 1 || view.height < 1) return NO;
  return imageSize.height / imageSize.width > view.width / view.height;
}

- (id)copyWithZone:(NSZone *)zone {
  YPhotoGroupItem *item = [self.class new];
  return item;
}

@end

@implementation YScaleImage

- (instancetype)init {
  self = super.init;
  if (!self) return nil;
  self.delegate = self;
  self.bouncesZoom = YES;
  self.maximumZoomScale = 3;
  self.multipleTouchEnabled = YES;
  self.alwaysBounceVertical = NO;
  self.showsVerticalScrollIndicator = YES;
  self.showsHorizontalScrollIndicator = NO;
  self.frame = [UIScreen mainScreen].bounds;

  UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(dismiss)];
  tap.delegate = self;
  [self addGestureRecognizer:tap];

  UITapGestureRecognizer *tap2 = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(doubleTap:)];
  tap2.delegate = self;
  tap2.numberOfTapsRequired = 2;
  [tap requireGestureRecognizerToFail:tap2];
  [self addGestureRecognizer:tap2];

  _imageContainerView = [UIView new];
  _imageContainerView.clipsToBounds = YES;
  [self addSubview:_imageContainerView];

  _imageView = [YYAnimatedImageView new];
  _imageView.clipsToBounds = YES;
  _imageView.backgroundColor = [UIColor colorWithWhite:1.000 alpha:0.500];
  [_imageContainerView addSubview:_imageView];

  _progressLayer = [CAShapeLayer layer];
  _progressLayer.size = CGSizeMake(40, 40);
  _progressLayer.cornerRadius = 20;
  _progressLayer.backgroundColor = [UIColor colorWithWhite:0.000 alpha:0.500].CGColor;
  UIBezierPath *path = [UIBezierPath bezierPathWithRoundedRect:CGRectInset(_progressLayer.bounds, 7, 7) cornerRadius:(40 / 2 - 7)];
  _progressLayer.path = path.CGPath;
  _progressLayer.fillColor = [UIColor clearColor].CGColor;
  _progressLayer.strokeColor = [UIColor whiteColor].CGColor;
  _progressLayer.lineWidth = 4;
  _progressLayer.lineCap = kCALineCapRound;
  _progressLayer.strokeStart = 0;
  _progressLayer.strokeEnd = 0;
  _progressLayer.hidden = YES;
  [self.layer addSublayer:_progressLayer];
  return self;
}

- (void)doubleTap:(UITapGestureRecognizer *)g {

  if (self.zoomScale > 1) {
    [self setZoomScale:1 animated:YES];
  } else {
    CGPoint touchPoint = [g locationInView:self.imageView];
    CGFloat newZoomScale = self.maximumZoomScale;
    CGFloat xsize = self.width / newZoomScale;
    CGFloat ysize = self.height / newZoomScale;
    [self zoomToRect:CGRectMake(touchPoint.x - xsize/2, touchPoint.y - ysize/2, xsize, ysize) animated:YES];
  }
}

- (void)dismiss {

  if (_onPress) {
    _onPress(nil);
  }
//  [self removeAllSubviews];
}

- (void)layoutSubviews {
  [super layoutSubviews];
  _progressLayer.center = CGPointMake(self.width / 2, self.height / 2);
}

- (void)setSource:(NSDictionary *)source{

  NSString *uri = [source objectForKey:@"uri"];
  NSURL *url = [NSURL URLWithString:uri];
  @weakify(self);
  [_imageView setImageWithURL:url placeholder:_item.thumbImage options:kNilOptions progress:^(NSInteger receivedSize, NSInteger expectedSize) {
    @strongify(self);
    if (!self) return;
    CGFloat progress = receivedSize / (float)expectedSize;
    progress = progress < 0.01 ? 0.01 : progress > 1 ? 1 : progress;
    if (isnan(progress)) progress = 0;
    self.progressLayer.hidden = NO;
    self.progressLayer.strokeEnd = progress;
  } transform:nil completion:^(UIImage *image, NSURL *url, YYWebImageFromType from, YYWebImageStage stage, NSError *error) {
    @strongify(self);
    if (!self) return;
    self.progressLayer.hidden = YES;
    if (stage == YYWebImageStageFinished) {
      self.maximumZoomScale = 3;
      if (image) {
        self->_itemDidLoad = YES;

        [self resizeSubviewSize];
        [self.imageView.layer addFadeAnimationWithDuration:0.1 curve:UIViewAnimationCurveLinear];
      }
    }

  }];
  [self resizeSubviewSize];


}

/*
 - (void)setItem:(YPhotoGroupItem *)item {
 if (_item == item) return;
 _item = item;
 _itemDidLoad = NO;


 [self setZoomScale:1.0 animated:NO];
 self.maximumZoomScale = 1;

 [_imageView cancelCurrentImageRequest];
 [_imageView.layer removePreviousFadeAnimation];

 _progressLayer.hidden = NO;
 [CATransaction begin];
 [CATransaction setDisableActions:YES];
 _progressLayer.strokeEnd = 0;
 _progressLayer.hidden = YES;
 [CATransaction commit];

 if (!_item) {
 _imageView.image = nil;
 return;
 }

 @weakify(self);
 [_imageView setImageWithURL:item.largeImageURL placeholder:item.thumbImage options:kNilOptions progress:^(NSInteger receivedSize, NSInteger expectedSize) {
 @strongify(self);
 if (!self) return;
 CGFloat progress = receivedSize / (float)expectedSize;
 progress = progress < 0.01 ? 0.01 : progress > 1 ? 1 : progress;
 if (isnan(progress)) progress = 0;
 self.progressLayer.hidden = NO;
 self.progressLayer.strokeEnd = progress;
 } transform:nil completion:^(UIImage *image, NSURL *url, YYWebImageFromType from, YYWebImageStage stage, NSError *error) {
 @strongify(self);
 if (!self) return;
 self.progressLayer.hidden = YES;
 if (stage == YYWebImageStageFinished) {
 self.maximumZoomScale = 3;
 if (image) {
 self->_itemDidLoad = YES;

 [self resizeSubviewSize];
 [self.imageView.layer addFadeAnimationWithDuration:0.1 curve:UIViewAnimationCurveLinear];
 }
 }

 }];
 [self resizeSubviewSize];
 }
 */

- (void)resizeSubviewSize {
  _imageContainerView.origin = CGPointZero;
  _imageContainerView.width = self.width;

  UIImage *image = _imageView.image;
  if (image.size.height / image.size.width > self.height / self.width) {
    _imageContainerView.height = floor(image.size.height / (image.size.width / self.width));
  } else {
    CGFloat height = image.size.height / image.size.width * self.width;
    if (height < 1 || isnan(height)) height = self.height;
    height = floor(height);
    _imageContainerView.height = height;
    _imageContainerView.centerY = self.height / 2;
  }
  if (_imageContainerView.height > self.height && _imageContainerView.height - self.height <= 1) {
    _imageContainerView.height = self.height;
  }
  self.contentSize = CGSizeMake(self.width, MAX(_imageContainerView.height, self.height));
  [self scrollRectToVisible:self.bounds animated:NO];

  if (_imageContainerView.height <= self.height) {
    self.alwaysBounceVertical = NO;
  } else {
    self.alwaysBounceVertical = YES;
  }

  [CATransaction begin];
  [CATransaction setDisableActions:YES];
  _imageView.frame = _imageContainerView.bounds;
  [CATransaction commit];
}

- (UIView *)viewForZoomingInScrollView:(UIScrollView *)scrollView{
  return _imageContainerView;
}

- (void)scrollViewDidZoom:(UIScrollView *)scrollView {
  UIView *subView = _imageContainerView;

  CGFloat offsetX = (scrollView.bounds.size.width > scrollView.contentSize.width)?
  (scrollView.bounds.size.width - scrollView.contentSize.width) * 0.5 : 0.0;

  CGFloat offsetY = (scrollView.bounds.size.height > scrollView.contentSize.height)?
  (scrollView.bounds.size.height - scrollView.contentSize.height) * 0.5 : 0.0;

  subView.center = CGPointMake(scrollView.contentSize.width * 0.5 + offsetX,
                               scrollView.contentSize.height * 0.5 + offsetY);
}



@end
