/**
 * Created by liwei on 2017/12/27.
 */
'use strict'
import * as types from "../constants/dataMallActionType";
import request from '../utils/request'

//获取banner图列表
export function getBanners(){
    return dispatch =>{
        return  request.get(`banner/index`)
            .then(data=>{
                //console.log('^^^^^^^^^^^',data);
                dispatch({type:types.DATAMALL_BANNER,data:data.banners});//
            })
            .catch(response =>{
                console.log('catch',response)
                if(response){
                    alert(response)
                }
            });
    }
}
//获取商品列表
export function getGoodsList(params){
    return dispatch =>{
        return  request.get(`product`,{params:params})
            .then(data=>{

                if (params.page<2){
                    //console.log('首次请求params',params)
                    dispatch({type:types.DATAMALL_GOODSLIST,data:data.products});
                }else {
                    //console.log('二请求params',params)
                    dispatch({type:types.DATAMALL_MOREGOODSLIST,data:data.products||[]});
                }
                //console.log('########',data);

            })
            .catch(response =>{
                console.log('catch',response)
                if(response){

                    alert(response)
                }
            });
    }
}

//获取商品详情
export function getGoodsDetail(pid){
    return dispatch =>{
        return  request.get(`product/`+pid)
            .then(data=>{
                dispatch({type:types.DATAMALL_GOODSDETAIL,data:data});
            })
            .catch(response =>{
                if(response){
                    alert(response)
                }
            });
    }
}

//立即购买
export function orderGoods(params){
    console.log('params',params)
    return dispatch =>{
        return  request.post(`order`,params)
            .then(data=>{
                console.log('立即购买',data)
                dispatch({type:types.DATAMALL_ORDERDETAIL,data:data});
            })
            .catch(response =>{
                if(response){
                    console.log('response',response)
                    alert(response)
                }
            });
    }
}