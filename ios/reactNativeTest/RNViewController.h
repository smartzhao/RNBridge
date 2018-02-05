//
//  RNViewController.h
//  reactNativeTest
//
//  Created by lw on 2017/12/8.
//  Copyright © 2017年 lw. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface RNViewController : UIViewController<UINavigationControllerDelegate>
@property NSString *bundleName;
+(instancetype)shareRNView;

-(void)popbackNative;
-(void)pushNativeView;
@end
