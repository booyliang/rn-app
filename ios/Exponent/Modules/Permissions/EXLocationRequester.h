// Copyright 2016-present 650 Industries. All rights reserved.

#import "EXPermissions.h"

@interface EXLocationRequester : NSObject <EXPermissionRequester>

+ (NSDictionary *)permissions;

@end
