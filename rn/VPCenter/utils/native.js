/**
 * Created by liwei on 2017/12/15.
 */
import {NativeModules} from 'react-native';
import util from './util'


class native {
    static getDeviceInfo() {

        return 'info'
    }

    static getAuthInfo() {

        return 'info'
    }

    static goBackNative() {

        if (util._isIos()) {
            console.log('返回ios原生页面')
            NativeModules.RNBridge.popBackNative()

        } else {
            console.log('返回android原生页面33')
            NativeModules.commModule.rnCallNativeAction('colse_reactnative')
        }
        return 'info'
    }

    static colseHUD() {
        if (util._isIos()) {
            console.log('返回ios原生页面')
            NativeModules.RNBridge.popBackNative()

        } else {
            console.log('返关闭预加载界面')
            NativeModules.commModule.rnCallNativeAction('dissmiss_progresshud')
        }

    }

}

export default native