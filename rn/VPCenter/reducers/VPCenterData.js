/**
 * Created by liwei on 2017/12/15.
 */
import * as types from "../constants/VPCenterActionType";
const initialState = {
    vpbannerList:{},
/*    goodDetail:{},*/
    growthDetail:[],
    loading:true,
    vpinstructionDetail:{},

};

export default function VPCenterData(state = initialState,action){

    switch (action.type){
        case types.VPCENTER_BANNER:
            console.log('^^^^^^^^^^^333333',action.data);
            return Object.assign({},state,{vpbannerList:action.data,loading:false});
        case types.VPCENTER_VPGROWTHDETAILSLIST:
            return Object.assign({},state,{growthDetail:action.data,loading:false});
        case types.VPCENTER_VPINSTRUCTION:
            return Object.assign({},state,{vpinstructionDetail:action.data,loading:false});
        case types._LOADING://loading页面控制
            return Object.assign({},state,{loading:action.data,loading:false});
        default:
            return state;
    }
}
