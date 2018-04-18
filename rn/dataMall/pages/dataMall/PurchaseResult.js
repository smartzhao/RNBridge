/**
 * Created by liwei on 2018/1/2.
 */
import React, { Component } from 'react';
import {Text, View, TouchableOpacity,Image,ScrollView,DeviceEventEmitter,NativeAppEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../styles/dataMall/PurchaseResult'
import Icon from '../../../../node_modules/react-native-vector-icons/Ionicons';
import * as dataMallAction from '../../actions/dataMallAction'
import Awesome from '../../../../node_modules/react-native-vector-icons/FontAwesome';
import native from '../../utils/native'
import LinearGradient from 'react-native-linear-gradient';
import util from '../../utils/util'
import {eventType} from '../../utils/constant'
const headerOptions = {
    headerStyle: { backgroundColor: '#FAFAFA',borderBottomWidth:0},
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerTintColor: '#999',
    headerBackTitle: null,
    headerRight: <View style={{ width: 24 }}/>
};
class PurchaseResult extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        ...headerOptions,
        headerLeft: (<TouchableOpacity onPress={navigation.state.params?navigation.state.params.goBack:null} style={{flex:1,flexDirection:'row',alignItems:'center'}}>
            <Icon name='ios-arrow-back' color={'#666666'}  style={{marginLeft:15,fontSize:25}} />
            <Text style={{fontSize:17,color:'#1A1A1A',marginLeft:10}}>返回</Text>
        </TouchableOpacity>),
        headerRight:(<TouchableOpacity onPress={navigation.state.params?navigation.state.params.complete:null}>
            <Text style={{fontSize:17,color:'#1A1A1A',marginRight:15}}>完成</Text>
        </TouchableOpacity>),
        title:'充值结果'
    });

    constructor(props) {
        super(props);
        this.state = {
            result:'2'
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            goBack:this._goBack,
            complete:this._complete
        });
        if (!util._isIos()) {
            DeviceEventEmitter.addListener(eventType.PAYECO_EVENT,this._receivedPayment);
        }else{
            NativeAppEventEmitter.addListener(eventType.PAYECO_EVENT,this._receivedPayment);
        }
    }

    componentWillUnmount() {
        if (!util._isIos()) {
            DeviceEventEmitter.removeAllListeners([eventType.PAYECO_EVENT]);
        }else{
            NativeAppEventEmitter.removeAllListeners([eventType.PAYECO_EVENT]);
        }
    }

    _receivedPayment = (payInfo) =>{
        /*
        *
        *
        *
        * {
         "MerchOrderId":"1407893794150",
         "Amount":"1.00",
         "Status":"02",
         "respCode":"0000",
         "respDesc":"交易成功"
         }

         map.put("00", "状态未知");
         map.put("01", "未支付");
         map.put("02", "已支付");
         map.put("03", "已退款");
         map.put("04", "已过期");
         map.put("05", "已作废");
         map.put("06", "支付中");
         map.put("07", "退款中");
         map.put("08", "已被商户撤销");
         map.put("09", "已被持卡人撤销");
         map.put("10", "调账-支付成");
         map.put("11", "调账-退款成功");
         map.put("12", "已退货");
         map.put("W101", "支付取消");
        *
        *
        * */
    };

    _goBack = () => {
        const { routes } = this.props;
        this.props.navigation.goBack(routes[2].key);
    };

    _complete = () =>{
        alert('完成');
    };
    _continuePurchase = () =>{
        const { routes } = this.props;
        this.props.navigation.goBack(routes[1].key);
    };

    _payment = () =>{
        let orderInfo = {
            "orderId" : 10,
            "orderNum" : 201709111201469752,
            "description" : '描述',
            "price" : '价格'
        };
        native.pushToNative(orderInfo);
    };

    // 拨打客服电话
    _callHotLine = () =>{
        let url = 'tel:400-111-5555' ;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    };

    // 进入订单页面
    _toOrderList = ()=>{
        this.props.navigation.navigate('OrderList')
    };

    render() {
        const {dataMallData } = this.props;
        switch (this.state.result){
            case '0':
                return (
                    <View style={styles.container}>
                        <Awesome name="frown-o" style={styles.icon}/>
                        <Text style={styles.orderState}>充值失败!</Text>
                        <Text style={styles.orderNo}>订单号: {dataMallData.orderDetail.orderNum}</Text>
                        <Text style={styles.description}>充值出现异常，可能由于网络或其它原因造成，请联系客服</Text>
                        <View style={styles.operateView}>
                            <LinearGradient
                                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                                colors={['#12D8FA', '#1FA2FF']}
                                style={styles.btnGradient}>
                                <TouchableOpacity style={styles.blueBtn}  onPress={()=>{this._callHotLine()}}>
                                    <Text style={{fontSize:17,color:'#fff',backgroundColor:'transparent'}}>联系客服</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>

                );
                break;
            case '1':
                return (
                    <View style={styles.container}>
                        <Icon name="md-checkmark-circle-outline" style={styles.icon}/>
                        <Text style={styles.orderState}>充值成功!</Text>
                        <Text style={styles.orderNo}>订单号: {dataMallData.orderDetail.orderNum}</Text>
                        <Text style={styles.description}>流量会在10分钟内充值到账</Text>
                        <View style={styles.operateView}>
                            <LinearGradient
                                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                                colors={['#12D8FA', '#1FA2FF']}
                                style={styles.btnGradient}>
                                <TouchableOpacity style={styles.whiteBtn}  onPress={this._toOrderList}>
                                    <Text style={{fontSize:17,color:'#000',backgroundColor:'transparent'}}>查看订单</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient
                                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                                colors={['#12D8FA', '#1FA2FF']}
                                style={styles.btnGradient}>
                                <TouchableOpacity style={styles.blueBtn}  onPress={()=>{this._continuePurchase()}}>
                                    <Text style={{fontSize:17,color:'#fff',backgroundColor:'transparent'}}>继续购买</Text>
                                </TouchableOpacity>
                            </LinearGradient>

                        </View>
                    </View>

                );
                break;
            case '2':
                return (
                    <View style={styles.container}>
                        <Awesome name="shopping-bag" style={styles.icon}/>
                        <Text style={styles.orderState}>充值未完成!</Text>
                        <Text style={styles.orderNo}>订单号: {dataMallData.orderDetail.orderNum}</Text>
                        <Text style={styles.description}>流量会在10分钟内充值到账</Text>
                        <View style={styles.operateView}>
                            <LinearGradient
                                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                                colors={['#12D8FA', '#1FA2FF']}
                                style={styles.btnGradient}>
                                <TouchableOpacity style={styles.blueBtn}  onPress={()=>{this._payment()}}>
                                    <Text style={{fontSize:17,color:'#fff',backgroundColor:'transparent'}}>继续支付</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>

                );
                break;
            default :
                return(<View/>)
        }


    }

}
function mapStateToProps(state) {
    const {dataMallData,nav} = state;
    return {
        dataMallData,
        routes:nav.routes
    }
}


export default connect(mapStateToProps)(PurchaseResult);
