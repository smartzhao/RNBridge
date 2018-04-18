/**
 * Created by zhaochong on 2018/1/1.
 */

'use strict';

//获取banner图列表
import request from "../api/request";
import * as types from "../../VPCenter/constants/VPCenterActionType";

export function getBanners(){
    console.log('^^^^^1111^^^^^^12122');
    return dispatch =>{
        return  request.get(`user/promotion`)
            .then(data=>{
                console.log('^^^^^^^^^^^12122',data.data.image);
                dispatch({type:types.VPCENTER_BANNER,data:data.data});//
            })
            .catch(response =>{

            });
    }
}
//获取成长值明细
export function getVpGrowthDetails(params){
    return dispatch =>{
        return  request.get(`integration/log`,{params:params})
            .then(data=>{
                console.log('^^^^^^^^^^^',data);
                dispatch({type:types.VPCENTER_VPGROWTHDETAILSLIST,data:data.data});//
            })
            .catch(response =>{

            });
    }
}
//获取会员规则说明
export function getVPInstructions(params){
    return dispatch =>{
        return  request.get(`member/info`,{params:params})
            .then(data=>{
                console.log('^^^^^^^^^^^data.rules',data.rules);
                dispatch({type:types.VPCENTER_VPINSTRUCTION,data:data.data});//
            })
            .catch(response =>{
               /* if(response){
                    alert(response)
                }*/
            });
    }
}