//
//  RN_NavigationController.m
//  reactNativeTest
//
//  Created by lw on 2017/12/15.
//  Copyright © 2017年 lw. All rights reserved.
//

#import "RN_NavigationController.h"

@interface RN_NavigationController ()

@end

@implementation RN_NavigationController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self.navigationBar setTitleTextAttributes:@{
                                                 NSForegroundColorAttributeName:[UIColor greenColor]
                                                 }];
     [self addSwipeRecognizer];
}

#pragma mark 添加右滑手势
- (void)addSwipeRecognizer
{
    // 初始化手势并添加执行方法
    UISwipeGestureRecognizer *swipeRecognizer = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(return)];
    
    // 手势方向
    swipeRecognizer.direction = UISwipeGestureRecognizerDirectionRight;
    
    // 响应的手指数
    swipeRecognizer.numberOfTouchesRequired = 1;
    
    // 添加手势
    [[self view] addGestureRecognizer:swipeRecognizer];
}

#pragma mark 返回上一级
- (void)return
{
    // 最低控制器无需返回
    if (self.viewControllers.count <= 1) return;
    
    // pop返回上一级
    [self popToRootViewControllerAnimated:YES];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
