/**
 * Created by liwei on 2017/12/15.
 */
import * as types from "../constants/dataMallActionType";
import native from '../utils/native'

const initialState = {
    goodsList:[],
    bannerList:[],
    goodDetail:{},
    loading:true,
    orderDetail:{}
};

export default function dataMallData(state = initialState,action){

    switch (action.type){
        case types.DATAMALL_LOADING://loading页面控制
            return Object.assign({},state,{loading:action.data});
        case types.DATAMALL_GOODSLIST://第一次加载
            return Object.assign({},state,{goodsList:action.data,loading:false});
        case types.DATAMALL_MOREGOODSLIST://商品列表加载更多
            return Object.assign({},state,{goodsList:state.goodsList.concat(action.data)});
        case types.DATAMALL_BANNER://banner条轮播图
            return Object.assign({},state,{bannerList:action.data});
        case types.DATAMALL_GOODSDETAIL://商品详情
            return Object.assign({},state,{goodDetail:action.data,loading:false});
        case types.DATAMALL_ORDERDETAIL://订单详情
            console.log('-----订单详情-----',action.data);
            let orderInfo = {
                "Version":"2.1.0",
                "PayChannelList":"ppi|wx-bc|ali-bc|wx-spd|wx|wallet|wallet-yl|",
                "MerchantNo":"502040000005",
                "MerchantOrderNo":"1523512645361",
                // "Amount":action.data.price,
                "Amount":'0.1',
                "TransDatetime":"20180412135730",
                //"OrderNo":action.data.orderNum,
                "OrderNo":'502018041230804253',
                "Description":'测试商品',
                // "Description":action.data.description,
                "SdkExtData":{"geelyUserId":"001234", "walletUserId":"0315142520",GID:'10001',walletUserType:'UID',walletUserIp:'183.62.242.162',payerId:'10001'},
                "MerName":"吉利收银台",
                "Sign":"12DBF28754F3C9916AAAEA685625F92F"};
            native.goToPayment(orderInfo);
            return Object.assign({},state,{orderDetail:action.data});
        default:
            return state;
    }
}
