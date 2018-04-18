/**
 * Created by liwei on 2017/12/15.
 */
import React, { Component } from 'react';
import {Platform,NativeModules,NativeEventEmitter } from 'react-native';

import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import DataMallRouters from './routers/dataMallRouters';
//import CodePush from "react-native-code-push";

class AppWithNavigationState extends Component {
    componentWillMount(){
        //const { RNBridge } = NativeModules;
        //
        //const calendarManagerEmitter = new NativeEventEmitter(RNBridge);
        //var  RNBridge  = NativeModules.RNBridge;
        //var ManagerEmitter = new NativeEventEmitter(RNBridge);
        //if (Platform.OS==='ios'){
        //    console.log('进入js收到事件')
        //    //this.subscription = ManagerEmitter.addListener('receivedMessage', this._receiveEvent);
        //    this.listener = ManagerEmitter.addListener('receivedMessage', this._receiveEvent.bind(this));
        //
        //}
        //console.log('%%%%%%%%%%%%%',this.props.params,this.props);

        //进入RN界面存下认证等相关信息
        let author = {
            Authorization:this.props.params.accessToken,
            XENVTYPE:this.props.params['X-ENV-TYPE'],
            XAPPID:this.props.params['X-APP-ID']//X-APP-ID headers里面的一个参数,我也不清楚是啥,目前是袁华东告诉我的一个值
        };
        //let carInfo = this.props.params.carInfo;//车辆信息 carInfo: {'msisdn':'','iccid':'','车型':'','车牌号':''}
        this.props.dispatch({type:'AUTH_INFO',data:author});
        //this.props.dispatch({type:'CAR_INFO',data:carInfo});
    }
    componentWillUnmount(){

        //this.listener.remove();

    }
    _receiveEvent = (data) =>{
        console.log('收到事件',data)
    }
    render() {
        const { dispatch, nav,memberNav,params } = this.props;

        return (
            <DataMallRouters navigation={addNavigationHelpers({
                dispatch: dispatch,
                state: nav
            })}
            />
        );


    }
}

function mapStateToProps(state) {
    const {nav,memberNav} = state;
    return {
        nav,
        memberNav
    }
}

export default connect(mapStateToProps)(AppWithNavigationState);
