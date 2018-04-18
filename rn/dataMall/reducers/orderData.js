/**
 * Created by liwei on 2017/12/15.
 */
import * as types from "../constants/orderActionType";
const initialState = {
    orderList: [],
    orderDetail: {},
    loading: true,
    currentPage: 1,
    totalPage: 0,
};

export default function dataMallData(state = initialState,action){

    switch (action.type){
        case types.ORDER_LOADING://loading页面控制
            return Object.assign({},state,{loading:action.data});
        case types.ORDER_ORDERLIST://第一次加载
            return Object.assign({},state,{orderList:action.data, totalPage:action.totalPage, currentPage:action.currentPage, loading:false});
        case types.ORDER_MOREORDERLIST://商品列表加载更多
            return Object.assign({},state,{orderList:state.orderList.concat(action.data), currentPage:action.currentPage});
        case types.ORDER_ORDERDETAIL://商品详情
            return Object.assign({},state,{orderDetail:action.data,loading:false});
        default:
            return state;
    }
}
