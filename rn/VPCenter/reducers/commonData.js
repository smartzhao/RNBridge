/**
 * Created by zhaochong on 2018/1/4.
 */
import * as types from "../constants/commonDataActionType";

const initialState = {
    authInfo:{},
};

export default function commonData(state = initialState,action){

    switch (action.type){
        case types.AUTH_INFO:
            console.log('AUTH_INFO',action.data);
            return Object.assign({},state,{authInfo:action.data});

        default:
            return state;
    }
}