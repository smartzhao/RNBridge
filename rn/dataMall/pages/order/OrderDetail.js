/**
 * Created by liwei on 2018/1/11.
 */
import React, { Component } from 'react';
import {Text, View, TouchableOpacity,Image,ScrollView,ActivityIndicator,Linking } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../styles/order/OrderDetail'
import Icon from '../../../../node_modules/react-native-vector-icons/Ionicons';
import * as orderAction from '../../actions/orderAction'
import LinearGradient from 'react-native-linear-gradient';
import util from '../../utils/util'


const headerOptions = {
    headerStyle: { backgroundColor: '#FAFAFA',borderBottomWidth:0 },
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerTintColor: '#999',
    headerBackTitle: null,
    headerRight: <View style={{ width: 24 }}/>
};


class OrderDetail extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        ...headerOptions,
        headerLeft: (<TouchableOpacity onPress={navigation.state.params?navigation.state.params.goBack:null} style={{flex:1,flexDirection:'row',alignItems:'center'}}>
            <Icon name='ios-arrow-back' color={'#666666'}  style={{marginLeft:15,fontSize:25}} />
            <Text style={{fontSize:17,color:'#1A1A1A',marginLeft:10}}>返回</Text>
        </TouchableOpacity>)
    });

    constructor(props) {
        super(props);
        this.state = {
            carInfo: {carNo:'浙A10R46',carModel:'吉利博越 NL-3'},
            payList:[{name:'Ecar pay'}],
            isPaying:false
        };
    }

    componentDidMount() {

        let {dispatch,navigation} = this.props;
        dispatch(orderAction.getOrderDetail(navigation.state.params.detail.orderId));

        this.props.navigation.setParams({
            goBack:this._goBack
        })
    }
    _goBack = () => {
        this.props.navigation.goBack();
    };



    //渲染充值车辆信息
    _renderCarInfo = (carInfo,status) =>{
        //const {detail} = this.props.navigation.state.params;
        return(
            <View style={styles.purchaseResult}>
                <View style={styles.purchaseState}>
                    <Text style={styles.purchaseStateText1}>{status=='已完成'?'交易成功':'交易关闭'}</Text>
                    <Text style={styles.purchaseStateText2}>{status=='已完成'?'感谢您的选择，期待为您再次服务':'交易失败'}</Text>
                </View>
                <View style={styles.carInfo}>
                    <Text style={styles.carInfo_title}>充值对象</Text>
                    <View style={styles.carInfo_bottom}>
                        <LinearGradient
                            start={{x: 1.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                            colors={['#12D8FA', '#1FA2FF']}
                            style={styles.carInfo_icon}>
                            <Icon name="md-car" style={{color:'#f0fbfe',fontSize:38,backgroundColor:'transparent'}}/>
                        </LinearGradient>
                        <View style={styles.carInfo_Right}>
                            {util._isNotNull(carInfo.plateNo)?<Text style={styles.carInfo_text1}>{carInfo.plateNo}</Text>:<Text style={styles.carInfo_text3}>无车牌信息</Text>}
                            <Text style={styles.carInfo_text2}>{carInfo.modelName}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    };

    //渲染商品信息
    _renderGoodsInfo = (products) =>{

        let  detail = {},sub_total='',total='';
        if (products&&products.length>0){
            detail = products[0];
        }
        if (util._isNotNull(this.props.orderData.orderDetail.totals)){
            this.props.orderData.orderDetail.totals.map((item)=>{
                if (item.code=='sub_total'){
                    sub_total = item.text
                }
                if (item.code=='total'){
                    total = item.text
                }
            })
        }
        //console.log('this.props.orderData.orderDetail',this.props.orderData.orderDetail)
        return(
            <View style={styles.goodsInfo}>
                <Text style={styles.item_title}>商品信息</Text>
                <View style={styles.item_bottom}>
                    <Image style={styles.goodsInfo_image} source={{uri: detail.image}} resizeMode="stretch"/>
                    <View style={styles.goodsInfo_bRight}>
                        <Text style={styles.goodsInfo_text1} numberOfLines={1}>{detail.name}</Text>
                        {util._isNotNull(detail.attributeGroups)&&<Text style={styles.goodsInfo_text2} numberOfLines={2}>{detail.attributeGroups.FlowAttr}/{detail.attributeGroups.FlowExpiry}/{detail.attributeGroups.FlowType}/{detail.attributeGroups.FlowSys}</Text>}
                        <Text style={styles.goodsInfo_text3} numberOfLines={1}>{detail.price}</Text>
                    </View>
                </View>
                <View style={styles.priceView}>
                    <Text style={styles.price_text}>商品总额：{sub_total}</Text>
                    <Text style={styles.price_text2}>实付款：
                        <Text style={styles.price_text3}>{total}</Text>
                    </Text>
                </View>
            </View>
        )
    };

    // 渲染订单信息
    _renderOrderInfo = (detail) =>{
        return(
            <View style={styles.orderInfo}>
                <Text style={styles.orderInfo_title}>订单信息</Text>
                <Text style={styles.orderInfo_text}>订单编号：
                    <Text style={styles.orderInfo_color}>{detail.orderNum}</Text>
                </Text>
                <Text style={styles.orderInfo_text}>支付方式：
                    <Text style={styles.orderInfo_color}>{detail.paymentMethod}</Text>
                </Text>
                <Text style={styles.orderInfo_text}>下单时间：
                    <Text style={styles.orderInfo_color}>{detail.dateAdded}</Text>
                </Text>

            </View>
        )
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

    render() {
        const { orderDetail} = this.props.orderData;
        //const {detail} = this.props.navigation.state.params;
        //console.log('this.props.navigation.state.params',this.props.navigation.state.params.detail);
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollview}>
                    <View style={styles.orderTitle}>
                        <Text style={styles.titleText}>订单详情</Text>
                    </View>
                    {util._isNotNull(orderDetail)&&this._renderCarInfo(orderDetail.carInfo,orderDetail.status)}
                    {util._isNotNull(orderDetail)&&this._renderGoodsInfo(orderDetail.products)}
                    {util._isNotNull(orderDetail)&&this._renderOrderInfo(orderDetail)}
                </ScrollView>

                <TouchableOpacity style={styles.hotLine} onPress={()=>{this._callHotLine()}}>
                    <View style={styles.hotLineView}>
                        <Icon name="ios-call" style={{color:'#1FA2FF',fontSize:18}}/>
                        <Text style={{fontSize:16,color:'#666666'}}>客服热线 </Text>
                    </View>

                </TouchableOpacity>
            </View>
        );
    }

}
function mapStateToProps(state) {
    const {orderData,nav} = state;
    return {
        orderData,
        routes:nav.routes
    }
}


export default connect(mapStateToProps)(OrderDetail);
