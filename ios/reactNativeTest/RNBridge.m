//
//  RNBridge.m
//  reactNativeTest
//
//  Created by lw on 2017/12/20.
//  Copyright © 2017年 lw. All rights reserved.
//

#import "RNBridge.h"
#import "RNViewController.h"
@implementation RNBridge
{
    bool hasListeners;
}

+ (instancetype)sharedBridge {
    
    static RNBridge *bridge;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        bridge = [[RNBridge alloc] init];
    });
    
    return bridge;
}
//- (instancetype)init
//{
//    [[NSNotificationCenter defaultCenter] addObserver:self
//                                             selector:@selector(calendarEventReminderReceived:)
//                                                 name:@"eventTest"
//                                               object:nil];
//
//    return [super init];
//}

RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(popBackNative){
    NSLog(@"^^^^^^^^^^^popBackNative");
    dispatch_async(dispatch_get_main_queue(), ^{
//        [[RNViewController shareRNView] popbackNative];
        [[NSNotificationCenter defaultCenter] postNotificationName:@"popbackNative"
                                                            object:self
                                                          userInfo:[NSDictionary dictionaryWithObject:@"name" forKey:@"lw"]];
    });
    
}

RCT_EXPORT_METHOD(pushNativeView:(NSDictionary *)orderInfo){
    NSLog(@"^^^^^^^^^^^pushNativeView%@",orderInfo);
    dispatch_async(dispatch_get_main_queue(), ^{
        [[RNViewController shareRNView] pushNativeView];
    });
    
}


- (NSArray<NSString *> *)supportedEvents
{
    return @[@"receivedMessage"];
}

-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

- (void)calendarEventReminderReceived:(NSNotification *)notification
{
    NSLog(@"进入RNBridge--");
//    NSString *eventName = notification.userInfo[@"name"];
    if (hasListeners) { // Only send events if anyone is listening
        NSLog(@"进入RNBridge++");
        [self sendEventWithName:@"receivedMessage" body:@{@"name": @"333333"}];
    }
}

//- (dispatch_queue_t)methodQueue {
//    return dispatch_get_main_queue();
//}

-(void)dealloc{
    
//    [[NSNotificationCenter defaultCenter] removeObserver:self];
    
}

@end
