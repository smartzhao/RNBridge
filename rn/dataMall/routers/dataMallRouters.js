/**
 * Created by liwei on 2017/12/15.
 */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View,Text } from 'react-native';
//import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import native from '../utils/native'


import DataMall from '../pages/dataMall/DataMall';
import DataDetail from '../pages/dataMall/DataDetail';
import DataPurchase from '../pages/dataMall/DataPurchase'
import PurchaseResult from '../pages/dataMall/PurchaseResult'
import OrderList from '../pages/order/OrderList';
import OrderDetail from '../pages/order/OrderDetail'
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
const DataMallRouters = StackNavigator({
    DataMall: { screen: DataMall},
    DataDetail: { screen: DataDetail},
    DataPurchase: { screen: DataPurchase},
    PurchaseResult: { screen: PurchaseResult},
    OrderList: { screen: OrderList},
    OrderDetail: { screen: OrderDetail},
}, {
    headerMode: 'screen',

});

export default DataMallRouters;





