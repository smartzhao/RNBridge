/**
 * Created by liwei on 2017/12/25.
 */
'use strict';
import axios from 'axios';
import * as configs from "../constants/configs";
import store from '../store/createStore';
import native from './native'
import util from './util'
//配置headers头等通用请求配置
const httpConfig={
    baseURL:__DEV__? configs.API_DEV:configs.API_PRO,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json;responseformat=3',
        'X-STORE': 'FLOW',
        //'X-ENV-TYPE':__DEV__? configs.ENV_TYPE_DEV:configs.ENV_TYPE_PRO,
        //'X-APP-ID':'M820igii5lL4tcy'


    },
    timeout: __DEV__? configs.API_TIMEOUT_DEV:configs.API_TIMEOUT_PRO
};

// 创建axios实例(axios具体了解中文文档:https://www.kancloud.cn/yunye/axios)
const request=axios.create(httpConfig);

//请求拦截器(插入一些请求配置信息)
request.interceptors.request.use(async config=>{
    //let commonData = store.getState().commonData;
    //console.log('---store---',commonData,'----config-----',config);
    //config.headers.Authorization = commonData.authInfo.Authorization;
    //config.headers['X-ENV-TYPE'] = commonData.authInfo.XENVTYPE;
    //config.headers['X-APP-ID'] = commonData.authInfo.XAPPID;
    let token = await native.getToken();

    function handleData(key,data){
        let value = data.filter((item)=>{return item.hasOwnProperty(key)});
        if (value.length>0){
            return value[0][key];
        }else {
            return '';
        }
    }

    console.log('getToken-----',token);
    console.log('token-----',util._handleData('token',token));
    config.headers.Authorization = util._handleData('token',token);
    config.headers['X-ENV-TYPE'] = util._handleData('X_ENV_TYPE',token);
    config.headers['X-APP-ID'] = util._handleData('x_APP_ID',token);
    return config;
});

//响应拦截器(可以做一些通用的响应处理和错误处理)
request.interceptors.response.use(response=>{
    //console.log("************************",response);
    if(response.status==200){
        return response.data;
    }
    return response;

},err=>{
    console.log("*******err.response^^^^^^^",err.response);
    if(err.code&&err.code=='ECONNABORTED'){
        return Promise.reject(new Error('连接超时!'));
    }
    if(err.message&&err.message=='Network Error'){
        return Promise.reject(new Error('网络未连接!'));
    }
    if(err.response.data.message){
        err.message=err.response.data.message;//后端不同这里要单独处理
    }


    return Promise.reject(err);
});


export default request;
