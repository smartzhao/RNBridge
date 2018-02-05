//
//  RNViewController.m
//  reactNativeTest
//
//  Created by lw on 2017/12/8.
//  Copyright © 2017年 lw. All rights reserved.
//

#import "RNViewController.h"
#import <React/RCTRootView.h>
#import <CodePush/CodePush.h>
#import "RNBridge.h"
#import "NativeViewController.h"

@interface RNViewController ()

@end

@implementation RNViewController
+(instancetype)shareRNView {
    static RNViewController *RNView;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        RNView = [[RNViewController alloc] init];
    });
    
    return RNView;
}
-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    //设置代理即可
    self.navigationController.delegate = self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(popbackNative)
                                                     name:@"popbackNative"
                                                   object:nil];
    
    // Do any additional setup after loading the view.
//    NSURL *jsCodeLocation = [NSURL
//                             URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];
//    NSURL * jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"index" withExtension:@"jsbundle"];
    
#ifdef DEBUG
    NSURL * jsCodeLocation = [NSURL URLWithString:[NSString stringWithFormat:@"http://localhost:8081/%@.bundle?platform=ios&dev=true",self.bundleName]];
    
//    NSURL * jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"index.dataMall" withExtension:@"jsbundle" subdirectory:@"bundles"];
    
#else
//    NSURL * jsCodeLocation = [CodePush bundleURL];
//    NSURL *jsCodeLocation = [CodePush bundleURLForResource:@"index.dataMall" withExtension:@"jsbundle" subdirectory:@"bundles"];
    
    NSURL * jsCodeLocation = [[NSBundle mainBundle] URLForResource:self.bundleName withExtension:@"jsbundle" subdirectory:@"bundles"];
#endif
    
    NSString *Authorization = @"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDAwNTA0IiwiYXVkIjoiYnJvd3NlciIsImlhdCI6MTUxNTE0Njc4NiwibmJmIjoxNTE1MTQ2Nzg2LCJleHAiOjE1MTUxNTM5ODYsImlzcyI6ImVjYXJ4IiwianRpIjoxNTE1MTQ2Nzg2LCJjbGllbnRJZCI6ImJyb3dzZXIiLCJ1aWQiOiIxMDAwNTA0IiwiZW52IjoidGVzdGluZyJ9.v5qqCgpa9xSh7swUO_Xr5RnIR3sEo2kZcZ0pnJamKxc";
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                         moduleName        : @"RnBase"
                         initialProperties :@{@"View" : @"dataMall",@"author":@{@"Authorization":Authorization}}
                          launchOptions    : nil];
    self.view = rootView;
    
    
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)navigationController:(UINavigationController*)navigationController willShowViewController:(UIViewController*)viewController animated:(BOOL)animated {
    
    if(viewController == self){
        [navigationController setNavigationBarHidden:YES animated:YES];
    }else{
        
        //系统相册继承自 UINavigationController 这个不能隐藏 所有就直接return
        if ([navigationController isKindOfClass:[UIImagePickerController class]]) {
            return;
        }
        
        //不在本页时，显示真正的navbar
        [navigationController setNavigationBarHidden:NO animated:YES];
        //当不显示本页时，要么就push到下一页，要么就被pop了，那么就将delegate设置为nil，防止出现BAD ACCESS
        //之前将这段代码放在viewDidDisappear和dealloc中，这两种情况可能已经被pop了，self.navigationController为nil，这里采用手动持有navigationController的引用来解决
        if(navigationController.delegate == self){
            //如果delegate是自己才设置为nil，因为viewWillAppear调用的比此方法较早，其他controller如果设置了delegate就可能会被误伤
            navigationController.delegate = nil;
        }
    }
}

-(void)popbackNative{
    [self.navigationController popViewControllerAnimated:YES];
}

-(void)pushNativeView{
    
    NativeViewController *vc = [NativeViewController new];
    [self.navigationController pushViewController:vc animated:YES];
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
