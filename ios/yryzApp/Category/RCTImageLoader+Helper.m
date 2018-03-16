//
//  RCTImageLoader+Helper.m
//  yryzApp
//
//  Created by shibo on 2017/11/16.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTImageLoader+Helper.h"

@implementation RCTImageLoader (Helper)

static const NSUInteger RCTMaxCachableDecodedImageSizeInBytes = 1048576; // 1MB

static NSString *RCTCacheKeyForImage(NSString *imageTag, CGSize size, CGFloat scale,
                                     RCTResizeMode resizeMode, NSString *responseDate)
{
  return [NSString stringWithFormat:@"%@|%g|%g|%g|%zd|%@",
          imageTag, size.width, size.height, scale, resizeMode, responseDate];
}

- (void)addImageToCache:(UIImage *)image
                 forKey:(NSString *)cacheKey
{
  if (!image) {
    return;
  }
  CGFloat bytes = image.size.width * image.size.height * image.scale * image.scale * 4;
  if (bytes <= RCTMaxCachableDecodedImageSizeInBytes) {
    NSCache *_decodedImageCache = [self valueForKey:@"_decodedImageCache"];
    [_decodedImageCache setObject:image
                           forKey:cacheKey
                             cost:bytes];
  }
}

- (UIImage *)imageForUrl:(NSString *)url
                    size:(CGSize)size
                   scale:(CGFloat)scale
              resizeMode:(RCTResizeMode)resizeMode
            responseDate:(NSString *)responseDate{

  NSCache *_decodedImageCache = [self valueForKey:@"_decodedImageCache"];
  NSString *cacheKey = RCTCacheKeyForImage(url, size, scale, resizeMode, @"yryz");
  return [_decodedImageCache objectForKey:cacheKey];
}

- (void)addImageToCache:(UIImage *)image
                    URL:(NSString *)url
                   size:(CGSize)size
                  scale:(CGFloat)scale
             resizeMode:(RCTResizeMode)resizeMode
           responseDate:(NSString *)responseDate{

  NSString *cacheKey = RCTCacheKeyForImage(url, size, scale, resizeMode, @"yryz");
  return [self addImageToCache:image forKey:cacheKey];
}


@end
