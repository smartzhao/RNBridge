/**
 * Created by fenghaoman on 2018/01/11.
 */
'use strict'
import * as types from "../constants/orderActionType";
import request from '../utils/request'

//获取订单列表
export function getOrderList(params){
	return dispatch =>{
		return  request.get(`order`,{params:params})
			.then(data=>{
				console.log('orderdata',data)

				if (params.page<2){
					console.log('首次请求params',params)
					dispatch({type:types.ORDER_ORDERLIST, data:data.orders, totalPage:data.link.page||0, currentPage:data.link.current||1});
				}else {
					console.log(params.page,'请求params',params)
					dispatch({type:types.ORDER_MOREORDERLIST,data:data.orders||[],  currentPage:data.link.current||1});
				}
			})
			.catch(response =>{
				console.log('catch',response)
				if(response){
					alert(response)
				}
			});
	}
}

//获取订单详情
export function getOrderDetail(oid){
	return dispatch =>{
		return  request.get(`order/`+oid)
			.then(data=>{
				dispatch({type:types.ORDER_ORDERDETAIL,data:data});
			})
			.catch(response =>{
				if(response){
					alert(response)
				}
			});
	}
}