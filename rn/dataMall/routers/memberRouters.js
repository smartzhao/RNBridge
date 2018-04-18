/**
 * Created by liwei on 2017/12/21.
 */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View,Text } from 'react-native';
//import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import native from '../utils/native'


import MembershipGrade from '../pages/membershipGrade/MembershipGrade';

//安卓端需要加上一個headerRight讓title居中
const headerOptions = {
    headerStyle: { backgroundColor: '#fff' },
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerTintColor: '#999',
    headerBackTitle: null,
    headerRight: <View style={{ width: 24 }}/>
};

/**
 * 路由配置中心
 */
const MemberRouters = StackNavigator({
    MembershipGrade: { screen: MembershipGrade, navigationOptions: { headerTitle: '会员中心', ...headerOptions,headerLeft:<Text onPress={()=>{native.goBackNative()}}>返回</Text> } },
}, {
    headerMode: 'screen',

});

export default MemberRouters;
