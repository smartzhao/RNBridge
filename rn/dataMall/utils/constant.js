/**
 * Created by liwei on 2018/4/12.
 */

//操作
const actionType = {
    closeReactNative: 'colse_reactnative',//关闭rn页面
    dismissProgressHUD: 'dissmiss_progresshud', //关闭UHD
    toPayeco: "toPayeco",//callback
};

//参数
const paramType = {
    token: 'gettoken',
    uid: 'getuid',
    iccid: 'geticcid',
    modelcode: 'getimodelcode',
    imsi: 'getimsi',
    plateno: 'getplateno',
    x_APP_ID: 'X-APP-ID',
    X_ENV_TYPE: 'X-ENV-TYPE',
};
//事件
const eventType = {
    payResp: 'payResp',
    PAYECO_EVENT: 'Payeco_Event'//nativecallrn事件
};
export {actionType,paramType,eventType}