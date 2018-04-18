/**
 * Created by liwei on 2017/12/15.
 */
import {NativeModules} from 'react-native';
import util from './util'

import {actionType, paramType} from './constant'

class native {
    static getDeviceInfo() {

        return 'info'
    }

    static getAuthInfo() {

        return 'info'
    }

    // 返回原生页面
    static goBackNative() {

        if (util._isIos()) {
            console.log('返回ios原生页面')
            NativeModules.RNBridge.popBackNative()

        } else {
            console.log('返回android原生页面222')
            NativeModules.commModule.rnCallNativeAction(actionType.closeReactNative)
        }
        return 'info'
    }

    // 跳转到原生界面
    static pushToNative(params) {

        if (util._isIos()) {
            console.log('跳到ios原生页面');
            NativeModules.RNBridge.pushNativeView(params)

        } else {
            console.log('跳到android原生页面')
            NativeModules.commModule.rnCallNativeAction('colse_reactnative')
        }
        return 'info'
    }

    static colseHUD() {
        if (util._isIos()) {
            console.log('返回ios原生页面')
            //NativeModules.RNBridge.popBackNative()

        } else {
            console.log('返关闭预加载界面')
            NativeModules.commModule.rnCallNativeAction('dissmiss_progresshud')
        }

    }

    // 获取车辆信息
    static getCarInfo() {

        let iccid = new Promise(function (resolve, reject) {

            NativeModules.commModule.rnPromise(paramType.iccid).then(
                (result) => {
                    resolve({iccid: result});
                }
            ).catch((error) => {
                console.log(error)
            });
        });
        let modelcode = new Promise(function (resolve, reject) {

            NativeModules.commModule.rnPromise(paramType.modelcode).then(
                (result) => {
                    resolve({modelcode: result});
                }
            ).catch((error) => {
                console.log(error)
            });
        });
        let plateno = new Promise(function (resolve, reject) {

            NativeModules.commModule.rnPromise(paramType.plateno).then(
                (result) => {
                    resolve({plateno: result});
                }
            ).catch((error) => {
                console.log(error)
            });
        });


        return Promise.all([iccid, modelcode, plateno])
    }

    //跳转支付
    static goToPayment(orderInfo) {
        //  NativeModules.commModule.rnCallNativeAction(actionType.toPayeco,JSON.stringify(orderInfo));

        NativeModules.commModule.rnPromiseAddParams(actionType.toPayeco,"{\n" +
            "    \"Version\":\"2.1.0\",\n" +
            "    \"PayChannelList\":\"ppi|wx-bc|ali-bc|wallet-yl\",\n" +
            "    \"MerchantNo\":\"502040000089\",\n" +
            "    \"MerchantOrderNo\":\"1523888209539\",\n" +
            "    \"Amount\":\"0.01\",\n" +
            "    \"TransDatetime\":\"20180416221657\",\n" +
            "    \"OrderNo\":\"502018041601841056\",\n" +
            "    \"Description\":\"测试商品\",\n" +
            "    \"SdkExtData\":{\n" +
            "        \"geelyUserId\":\"001234\",\n" +
            "        \"walletUserId\":\"0315142520\",\n" +
            "        \"GID\":\"10001\",\n" +
            "        \"walletUserType\":\"UID\",\n" +
            "        \"walletUserIp\":\"183.62.242.162\",\n" +
            "        \"payerId\":\"10001\"\n" +
            "    },\n" +
            "    \"MerName\":\"湖北亿咖通科技有限公司(代理商-插件)\",\n" +
            "    \"Sign\":\"6BFB978E3E43097B461F087B454DD4B1\"\n" +
            "}").then(
            (result) => {
             //   resolve({iccid: result});
                console.log('跳转原生页面支付', result)
            }
        ).catch((error) => {
            console.log(error)
        });
    }


    static payecoEvent() {
        DeviceEventEmitter.addListener(eventType.PAYECO_EVENT, (msg) => {
            let title = "React Native界面,收到数据：payeco" + msg;
            console.log(title)
        })

    }

    // 获取headers信息
    static getToken() {

        let token = new Promise(function (resolve, reject) {
            /* NativeModules.commModule.rnPromiseAddParams(paramType.token,'',(result)=>{
                 resolve({token:result});
             })*/
            NativeModules.commModule.rnPromise(paramType.token).then(
                (result) => {
                    resolve({token: result});
                }
            ).catch((error) => {
                console.log(error)
            });
        });
        let appId = new Promise(function (resolve, reject) {
            /*NativeModules.commModule.rnPromiseAddParams(paramType.x_APP_ID,'',(result)=>{
                resolve({x_APP_ID:result});
            })*/
            NativeModules.commModule.rnPromise(paramType.x_APP_ID).then(
                (result) => {
                    resolve({x_APP_ID: result});
                }
            ).catch((error) => {
                console.log(error)
            });
        });
        let envType = new Promise(function (resolve, reject) {
            /*   NativeModules.commModule.rnPromiseAddParams(paramType.X_ENV_TYPE,'',(result)=>{
                   resolve({X_ENV_TYPE:result});
               })*/

            NativeModules.commModule.rnPromise(paramType.X_ENV_TYPE).then(
                (result) => {
                    resolve({X_ENV_TYPE: result});
                }
            ).catch((error) => {
                console.log(error)
            });
        });

        return Promise.all([token, appId, envType])
    }



}

export default native