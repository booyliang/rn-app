// Copyright 2016-present 650 Industries. All rights reserved.
#import <React/RCTBridge.h>
#import <React/RCTBridgeModule.h>


@interface EXUtil : NSObject <RCTBridgeModule>

+ (NSString *)escapedResourceName:(NSString *)name;

@end
