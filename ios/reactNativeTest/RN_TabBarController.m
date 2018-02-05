//
//  RN_TabBarController.m
//  
//
//  Created by lw on 2017/12/15.
//
//

#import "RN_TabBarController.h"
#import "RN_NavigationController.h"
#import "RN_TableViewController.h"
#import "RNViewController.h"
#import "NativeViewController.h"
@interface RN_TabBarController ()

@end

@implementation RN_TabBarController


- (instancetype)init
{
    self = [super init];
    if (self) {
        [self setupUI];
    }
    return self;
}

- (void)setupUI {
    
    //     self.hidesBottomBarWhenPushed = YES;
    RN_TableViewController *vc1 = [[RN_TableViewController alloc] init];
    
    NativeViewController *vc2 = [[NativeViewController alloc] init];
    
    
    [self addChildViewController:vc1 withTitle:@"第 1 页" withImageName:@""];
    
    
    [self addChildViewController:vc2 withTitle:@"第 2 页" withImageName:@""];
    
    
    
    
}



- (void)addChildViewController:(UIViewController *)childController withTitle:(NSString *)title withImageName:(NSString *)imageName {
    
    RN_NavigationController * nav = [[RN_NavigationController alloc] initWithRootViewController:childController];
    
    childController.title = title;
    
    
    //    [[UITabBarItem appearance] setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:
    //                                                       [UIFont systemFontOfSize:15],NSFontAttributeName,
    //                                                       nil] forState:UIControlStateNormal];
    //
    //
    //    [[UITabBarItem appearance] setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:
    //                                                       [UIFont systemFontOfSize:15],NSFontAttributeName,
    //                                                       nil] forState:UIControlStateSelected];
    //
    childController.tabBarItem.image  = [UIImage imageNamed:imageName];
    
    childController.tabBarItem.selectedImage = [UIImage imageNamed:imageName];
    
    [self addChildViewController:nav];
    
    
}


- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
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
