/**
 * Created by fenghaoman on 2018/01/11.
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Platform,BackHandler,Image,FlatList } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from '../../../../node_modules/react-native-vector-icons/Ionicons';
import styles from '../../styles/order/OrderList'

// import Nav from '../../components/Nav'
import native from '../../utils/native'
// import util from '../../utils/util'
import * as orderAction from '../../actions/orderAction'
import * as types from "../../constants/orderActionType";
import Swiper from 'react-native-swiper';
import LoadingView from '../../components/LoadingView'
import LoadingLoadMore from '../../components/LoadingLoadMore'
import Awesome from '../../../../node_modules/react-native-vector-icons/FontAwesome';



const headerOptions = {
    headerStyle: { backgroundColor: '#fff',borderBottomWidth:0 },
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerTintColor: '#999',
    headerBackTitle: null,
    headerRight: <View style={{ width: 24 }}/>,
    navigationBackGroundColor:'rgba(153,153,153,0)'
};


class OrderList extends Component {

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
            isRefreshing:false,
            scrollEnabled: true,
            isLoadMore:false,
            page:0,
            loadMoreTime:0
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            goBack:this._goBack
        })
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        let {dispatch} = this.props;
        this._loadData();

    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    _goBack = () => {
        this.props.navigation.goBack();
    };

    _loadData = () =>{
        // console.log('_loadData');
        let {dispatch} = this.props;
        dispatch({type:types.ORDER_LOADING,data:true});
        dispatch(orderAction.getOrderList({page:1}));
    };
    onBackAndroid = () => {
        const routers = this.props.routes;
        if (routers.length > 1) {
            this.props.navigation.dispatch(NavigationActions.back());
            return true;
        } else {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。这里退回为原生页面
                return false;
            }
            this.lastBackPressed = Date.now();
            //toastShort('再按一次退出应用');
            return true;
        }
    };
    _renderTitle = () => {
        return (
            <View style={styles.orderTitle}>
                <Text style={styles.titleText}>我的订单</Text>
            </View>
        )
    };

    // 渲染每条cell
    _renderItem = ({item,index}) =>{
        const orderItem = item.products.length?item.products[0]:[{}]
        return(
            <TouchableOpacity onPress={()=>{this._toDetail(item)}}>
                <View style={[styles.orderItem]}>
                    <View style={styles.item_top}>
                        <View style={styles.time}>
                            <Text style={styles.time_title} numberOfLines={1}>下单时间：</Text>
                            <Text style={styles.time_value} numberOfLines={2}>{item.dateAdded}</Text>
                        </View>
                        <View style={styles.status}>
                            <Text style={styles.status_value} numberOfLines={2}>{item.orderStatusId=='1'?'支付失败':'支付成功'}</Text>
                        </View>
                    </View>
                    <View style={styles.item_bottom}>
                        <View style={styles.goodsInfo_imageBox}>
                            <Image style={styles.goodsInfo_image} source={{uri: orderItem.image}} resizeMode="stretch"/>
                        </View>
                        <View style={styles.goodsInfo_bRight}>
                            <Text style={styles.goodsInfo_text1} numberOfLines={1}>{orderItem.name}</Text>
                            <Text style={styles.goodsInfo_text2} numberOfLines={2}>{orderItem.metaDescription}</Text>
                            <Text style={styles.goodsInfo_text3} numberOfLines={1}>{orderItem.price}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    // 进入详情页面
    _toDetail(item) {
        this.props.navigation.navigate('OrderDetail',{detail:item})
    }

    // 每行之间间隔
    _separator = () => {
        return <View style={{height:10}}/>;
    };

    // 下拉刷新
    _onRefresh = () =>{
        let {dispatch} = this.props;
        let params = {page:1};
        dispatch(orderAction.getOrderList(params)).then(()=>{     this.setState({isRefreshing: false}) });
        this.setState({isRefreshing: true,scrollEnabled:true});
    };

    // 上拉加载更多
    _onEndReached = (distanceFromEnd) =>{
        // console.log('this.props>>>>>>>>>>>>',this.props);
        let {dispatch} = this.props;
        const { currentPage, totalPage } = this.props.orderData;

        if(Number(currentPage) >= Number(totalPage)){
            this.setState({scrollEnabled:false});
        }
        // console.log('&&&&&&&&&scrollEnabled',this.state.scrollEnabled,distanceFromEnd,'time',(Date.now()-this.state.loadMoreTime));
        //判断能否进行上拉加载
        if (distanceFromEnd.distanceFromEnd>0&&this.state.scrollEnabled&&(Date.now()-this.state.loadMoreTime)>1000) {
            //console.log('渲染上拉加载时的footer');
            this.setState({isLoadMore:true,loadMoreTime:Date.now()});
            let params = {page:Number(currentPage)+1};
            dispatch(orderAction.getOrderList(params)).then(()=>{
                this.setState({isLoadMore:false})
                //console.log('还有新数据了')
            });
        }
    };

    // 渲染上拉加载时的footer
    _ListFooterComponent = () =>{
        if(this.state.isLoadMore ){

            return <LoadingLoadMore/>
        }else {
            return<LoadingLoadMore LoadMoreText="~没有更多了~"/>
        }
    };
    render() {
        const {orderData} = this.props;
        if (orderData.loading){
            return(<LoadingView/>)
        }else {
            return (
                <View style={styles.container}>
                    <FlatList
                        style={{flex:1}}
                        ListHeaderComponent={this._renderTitle}
                        keyExtractor={(item, index) => index}
                        data={orderData.orderList}
                        renderItem={this._renderItem}
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        onEndReachedThreshold={0.5}
                        onEndReached={(distanceFromEnd)=>{this._onEndReached(distanceFromEnd)}}
                        ListFooterComponent={this._ListFooterComponent}
                    />
                </View>
            );
        }

    }
}
function mapStateToProps(state) {
    const {orderData} = state;
    return {
        orderData
    }
}


export default connect(mapStateToProps)(OrderList);

