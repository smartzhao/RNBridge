/**
 * Created by zhaochong on 2018/1/1.
 */
'use strict';
import axios from 'axios';
import * as configs from "../constants/configs";
import store from "../../VPCenter/store/createStore";

const httpConfig={
    baseURL:__DEV__? configs.API_DEV:configs.API_PRO,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json;responseformat=3',
        // 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDAwMDgwIiwiYXVkIjoiYnJvd3NlciIsImlhdCI6MTUxNDI3NTE0MSwibmJmIjoxNTE0Mjc1MTQxLCJleHAiOjE1MjIwNTExNDEsImlzcyI6ImVjYXJ4IiwianRpIjoxNTE0Mjc1MTQxLCJjbGllbnRJZCI6ImJyb3dzZXIiLCJ1aWQiOiIxMDAwMDgwIiwiZW52IjoidGVzdGluZyJ9.XxKP0LqTLa1tUeoCu7TNipr01W_KaK_AXtCutrSri-o',
        'X-STORE': 'FLOW',
        'X-ENV-TYPE':__DEV__? configs.ENV_TYPE_DEV:configs.ENV_TYPE_PRO,
        'X-APP-ID':'M820igii5lL4tcy'


    },
    timeout: __DEV__? configs.API_TIMEOUT_DEV:configs.API_TIMEOUT_PRO
};

const request=axios.create(httpConfig);

request.interceptors.request.use(config=>{
    let commonData = store.getState().commonData;
    console.log('---store---',commonData);
    config.headers.Authorization = commonData.authInfo.Authorization;
    return config;
});

request.interceptors.response.use(response=>{
    //console.log("************************",response);
    if(response.status==200){
        return response.data;
    }
    return response;

});


export default request;
