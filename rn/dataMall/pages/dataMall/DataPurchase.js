/**
 * Created by liwei on 2017/12/29.
 */
import React, { Component } from 'react';
import {Text, View, TouchableOpacity,Image,ScrollView,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../styles/dataMall/DataPurchase'
import Icon from '../../../../node_modules/react-native-vector-icons/Ionicons';
import * as dataMallAction from '../../actions/dataMallAction'
import Loading from '../../components/Loading'
import LinearGradient from 'react-native-linear-gradient';
import native from '../../utils/native'
import util from '../../utils/util'


const headerOptions = {
    headerStyle: { backgroundColor: '#FAFAFA',borderBottomWidth:0 },
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerTintColor: '#999',
    headerBackTitle: null,
    headerRight: <View style={{ width: 24 }}/>
};


class DataPurchase extends Component {
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
            isPaying:false,
            iccid:''
        };
    }

    componentWillMount() {
        // 获取车辆信息
        native.getCarInfo().then((carInfo)=>{
            //console.log('getCarInfo------',carInfo);
            this.setState({carInfo:{carNo:util._handleData('plateno',carInfo),carModel:util._handleData('modelcode',carInfo)},iccid:util._handleData('iccid',carInfo)})
        })
    };

    componentDidMount() {

        let {dispatch,navigation} = this.props;
        //dispatch(dataMallAction.getGoodsDetail(navigation.state.params.detail.productId));

        this.props.navigation.setParams({
            goBack:this._goBack
        })
    }
    _goBack = () => {
        this.props.navigation.goBack();
    };

    // 付款
    _payment= (detail) =>{
        this.setState({isPaying:true});
        //console.log('_payment',detail)
        let params = {
            "description": detail.name,
            "product": {
                //"msisdn": "XE1107H0AAH3H00260000026",
                "product_id": detail.productId,
                "quantity": "1",
                "iccid": this.state.iccid
            },
            //"shippingAddress": "1",
            //"shippingMethod": "flat.flat"
            //"paymentMethod": "cod",
        };
        this.props.dispatch(dataMallAction.orderGoods(params)).then(()=>{
            this.setState({isPaying: false});
            this.props.navigation.navigate('PurchaseResult',{});
        });

        let orderInfo = {
            "Version":"2.1.0",
            "PayChannelList":"ppi|wx-bc|ali-bc|wx-spd|wx|wallet|wallet-yl|",
            "MerchantNo":"502040000005",
            "MerchantOrderNo":"1523512645361",
            "Amount":"0.1",
            "TransDatetime":"20180412135730",
            "OrderNo":"502018041230804253",
            "Description":"测试商品",
            "SdkExtData":{"geelyUserId":"001234", "walletUserId":"0315142520",GID:'10001',walletUserType:'UID',walletUserIp:'183.62.242.162',payerId:'10001'},
            "MerName":"吉利收银台",
            "Sign":"12DBF28754F3C9916AAAEA685625F92F"};
        //native.goToPayment(orderInfo);
    };

    //渲染车辆信息
    _renderCarInfo = () =>{
        return(
            <View style={styles.carInfo}>
                <Text style={styles.item_title}>充值车辆</Text>
                <View style={styles.item_bottom}>
                    <LinearGradient
                        start={{x: 1.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                        colors={['#12D8FA', '#1FA2FF']}
                        style={styles.carInfo_icon}>
                        <Icon name="md-car" style={{color:'#f0fbfe',fontSize:38,backgroundColor:'transparent'}}/>
                    </LinearGradient>
                    <View style={styles.carInfo_bRight}>
                        <View style={styles.carInfo_text}>
                            <Text style={styles.carInfo_text1}>车牌号: </Text>
                            <Text style={styles.carInfo_text2}>{this.state.carInfo.carNo}</Text>
                        </View>
                        <View style={styles.carInfo_text}>
                            <Text style={styles.carInfo_text1}>车型: </Text>
                            <Text style={styles.carInfo_text2}>{this.state.carInfo.carModel}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    };

    //渲染商品信息
    _renderGoodsInfo = (detail) =>{
        return(
            <View style={styles.goodsInfo}>
                <Text style={styles.item_title}>购买商品</Text>
                <View style={styles.item_bottom}>
                    <Image style={styles.goodsInfo_image} source={{uri: detail.image}} resizeMode="stretch"/>
                    <View style={styles.goodsInfo_bRight}>
                        <Text style={styles.goodsInfo_text1} numberOfLines={1}>{detail.name}</Text>
                        <Text style={styles.goodsInfo_text2} numberOfLines={2}>{detail.infoDescription}</Text>
                        <Text style={styles.goodsInfo_text3} numberOfLines={1}>{detail.price}</Text>
                    </View>
                </View>
            </View>
        )
    };

    render() {
        const { routes,dataMallData } = this.props;
        const {detail} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollview}>
                    <View style={styles.purchaseTitle}>
                        <Text style={styles.titleText}>确认订单</Text>
                    </View>
                    {this._renderCarInfo()}
                    {this._renderGoodsInfo(detail)}
                    {/*<View style={styles.paySelect}>
                        <Text style={styles.titleText}>支付信息</Text>
                    </View>*/}
                </ScrollView>

                <View style={styles.payBtn} onPress={()=>{this._toPurchase()}}>
                    <View style={styles.payTextView1}>
                        <Text style={{fontSize:16,color:'#1A1A1A'}}>合计: </Text>
                        <Text style={{fontSize:16,color:'#2ca4fc'}}>{detail.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.payTextView2}  onPress={()=>{this._payment(detail)}}>
                        <LinearGradient
                            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                            colors={['#12D8FA', '#1FA2FF']}
                            style={styles.payTextView2Gradient}>
                            <Text style={{fontSize:16,color:'#fff',backgroundColor:'transparent'}}>立即付款</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
                {this.state.isPaying&&<Loading loadingText="下单中"/>}
            </View>

        );
    }

}
function mapStateToProps(state) {
    const {dataMallData,nav} = state;
    return {
        dataMallData,
        routes:nav.routes
    }
}


export default connect(mapStateToProps)(DataPurchase);
