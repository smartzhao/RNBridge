//
//  RN_TableViewController.m
//  reactNativeTest
//
//  Created by lw on 2017/12/15.
//  Copyright © 2017年 lw. All rights reserved.
//

#import "RN_TableViewController.h"
#import "RN_NavigationController.h"
#import "RNViewController.h"
#import "RNBridge.h"

@interface RN_TableViewController ()

@end

@implementation RN_TableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self.tableView setTableFooterView:[[UIView alloc] initWithFrame:CGRectZero]];
    [[[RN_NavigationController alloc] init] addSwipeRecognizer];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Table view data source

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 2;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = cell = [tableView dequeueReusableCellWithIdentifier:@"cell"];
    
    if (cell==nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@"cell"];
    }
    if (indexPath.row==0) {
        cell.textLabel.text = @"流量商城";
    }else{
        cell.textLabel.text = @"会员中心";
    }
    
    cell.selectionStyle = UITableViewCellSelectionStyleBlue;
    cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    
    NSLog(@"点击了第%zd个section的第%zd行",indexPath.section,indexPath.row);
    
    RNViewController *vc = [RNViewController new];
    self.hidesBottomBarWhenPushed = YES;
    if (indexPath.row==0) {
        vc.bundleName = @"index.dataMall";
    }else{
        vc.bundleName = @"index.VPCenter";
    }
    
    [self.navigationController pushViewController:vc animated:YES];
    self.hidesBottomBarWhenPushed = NO;
//    [NSTimer scheduledTimerWithTimeInterval:3.0 target:self selector:@selector(eventAction) userInfo:nil repeats:YES];

}
-(void)eventAction{
    NSLog(@"进入定时器");
    
    [[NSNotificationCenter defaultCenter] postNotificationName:@"eventTest"
                                                        object:self
                                                      userInfo:[NSDictionary dictionaryWithObject:@"name" forKey:@"lw"]];
}
-(void)dealloc{
    
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    
}

@end
