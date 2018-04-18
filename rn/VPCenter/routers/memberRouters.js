/**
 * Created by liwei on 2017/12/21.
 */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View,Text } from 'react-native';
//import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import native from '../utils/native'
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';

import VPCenterMembers from '../pages/vpcenter/VPCenterMembers';
import VPGrowthDetails from '../pages/vpgrowthdetails/VPGrowthDetails';
import VPScores from '../pages/vpscores/VPScores';
import VPInstruction from '../pages/vpInstruction/VPInstruction';
import MyScores from '../pages/vpscores/MyScores';
import Scoresshop from '../pages/vpscores/Scoresshop';
/**
 * 路由配置中心
 */
const MemberRouters = StackNavigator({
    VPCenterMembers: { screen: VPCenterMembers},
    VPGrowthDetails: { screen: VPGrowthDetails},
    VPScores: { screen: VPScores},
    VPInstruction: { screen: VPInstruction},
    MyScores: { screen: MyScores},
    Scoresshop: { screen: Scoresshop},

}, {
    headerMode: 'screen',

});

export default MemberRouters;
