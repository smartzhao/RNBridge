//
//  RNBridge.h
//  reactNativeTest
//
//  Created by lw on 2017/12/20.
//  Copyright © 2017年 lw. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import <React/RCTEventEmitter.h>
@interface RNBridge : RCTEventEmitter
+ (instancetype)sharedBridge;

@end
