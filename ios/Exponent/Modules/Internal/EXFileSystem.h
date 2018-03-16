// Copyright 2016-present 650 Industries. All rights reserved.

#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

@interface EXFileSystem : RCTEventEmitter<RCTBridgeModule>

@property (nonatomic, readonly) NSString *documentDirectory;
@property (nonatomic, readonly) NSString *cachesDirectory;

+ (BOOL)ensureDirExistsWithPath:(NSString *)path;
+ (NSString *)documentDirectoryForExperienceId:(NSString *)experienceId;
+ (NSString *)cachesDirectoryForExperienceId:(NSString *)experienceId;

@end


