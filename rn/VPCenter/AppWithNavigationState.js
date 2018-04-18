/**
 * Created by zhaochong on 2017/12/15.
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    Platform, NativeModules, NativeEventEmitter, DeviceEventEmitter, ToastAndroid
} from 'react-native';

import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import MemberRouters from './routers/memberRouters'

class AppWithNavigationState extends Component {
    componentWillMount() {
        // ToastAndroid.show("发送成功" +NativeModules.commModule.RNContants, ToastAndroid.SHORT);
        /*  NativeModules.commModule.rnCallNativeFromPromise("zhaochong").then(
              (result) =>{
                  ToastAndroid.show("Promise收到消息:" + result, ToastAndroid.SHORT)
              }
          ).catch((error) =>{console.log(error)});*/

        /* DeviceEventEmitter.addListener('Payeco_Event',(msg)=>{
           let title = "React Native界面,收到数据：会员中心" + msg;
             ToastAndroid.show("发送成功" +title, ToastAndroid.SHORT);
         })*/

      /*  NativeModules.commModule.rnCallNativeFromCallback("zhaochong",(result) => {
            ToastAndroid.show("CallBack收到消息:" + result, ToastAndroid.SHORT);
        })*/

        //进入RN界面存下认证等相关信息
        let author = {
            Authorization: this.props.params.accessToken,
            uId: this.props.params.userId
        }
        console.log('%%%%%%%%%%%%%', this.props.params, this.props);
        this.props.dispatch({type: 'AUTH_INFO', data: author})
        console.log('收到事件', author)
    }


    componentWillUnmount() {

    }


    render() {
        const {dispatch, nav, params} = this.props;
        //console.log('%%%%%%%%%%%%%',nav);
        return (
            <MemberRouters navigation={addNavigationHelpers({
                dispatch: dispatch,
                state: nav
            })}
            />
        );
    }
}

function mapStateToProps(state) {
    const {nav} = state;
    return {
        nav
    }
}

export default connect(mapStateToProps)(AppWithNavigationState);
