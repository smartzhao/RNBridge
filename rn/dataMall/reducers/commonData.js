/**
 * Created by liwei on 2018/1/4.
 */
import * as types from "../constants/commonDataActionType";

const initialState = {
    authInfo:{},
    carInfo:{},
    Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDAwMDgwIiwiYXVkIjoiYnJvd3NlciIsImlhdCI6MTUxNDI3NTE0MSwibmJmIjoxNTE0Mjc1MTQxLCJleHAiOjE1MjIwNTExNDEsImlzcyI6ImVjYXJ4IiwianRpIjoxNTE0Mjc1MTQxLCJjbGllbnRJZCI6ImJyb3dzZXIiLCJ1aWQiOiIxMDAwMDgwIiwiZW52IjoidGVzdGluZyJ9.XxKP0LqTLa1tUeoCu7TNipr01W_KaK_AXtCutrSri-o'
};

export default function commonData(state = initialState,action){

    switch (action.type){
        case 'commonData':
            return Object.assign({},state,{Authorization:action.data});
        case types.AUTH_INFO:
            console.log('AUTH_INFO',action.data);
            return Object.assign({},state,{authInfo:action.data});
        case types.CAR_INFO:
            console.log('CAR_INFO',action.data);
            return Object.assign({},state,{carInfo:action.data});

        default:
            return state;
    }
}