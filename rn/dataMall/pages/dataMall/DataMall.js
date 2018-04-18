/**
 * Created by liwei on 2017/12/15.
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Platform,BackHandler,Image,FlatList } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from '../../../../node_modules/react-native-vector-icons/Ionicons';
import styles from '../../styles/dataMall/DataMall'
import Nav from '../../components/Nav'
import native from '../../utils/native'
import util from '../../utils/util'
import * as dataMallAction from '../../actions/dataMallAction'
import Swiper from 'react-native-swiper';
import LoadingView from '../../components/LoadingView'
import * as types from "../../constants/dataMallActionType";
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


class DataMall extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        ...headerOptions,
        headerLeft: <TouchableOpacity style={styles.leftHeader} onPress={()=>{native.goBackNative()}}>
            <Icon name='ios-arrow-back' color={'#666666'}  style={{marginLeft:15,fontSize:25}} />
            <Text style={{fontSize:17,color:'#1A1A1A',marginLeft:10}}>返回</Text>
        </TouchableOpacity>,
        headerRight: (<TouchableOpacity onPress={navigation.state.params?navigation.state.params.goOrderList:null}>
            <Text style={{fontSize:17,color:'#1FA2FF',marginRight:15}}>我的订单</Text>
        </TouchableOpacity>),
    });

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing:false,
            scrollEnabled: true,
            isLoadMore:false,
            page:2,
            loadMoreTime:0
        };
    }

    componentWillMount() {
        this.props.navigation.setParams({
            goOrderList:this._toOrderList,
        });
        native.colseHUD();
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        let {dispatch} = this.props;
        dispatch(dataMallAction.getBanners());
        this._loadData();

    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    _loadData = () =>{
        let {dispatch} = this.props;
        dispatch({type:types.DATAMALL_LOADING,data:true});
        dispatch(dataMallAction.getGoodsList({page:1}));
    };

    onBackAndroid = () => {
        const routers = this.props.routes;
        console.log('----routers----',routers);
        if (routers.length > 1) {
            this.props.navigation.dispatch(NavigationActions.back());
            return true;
        } else {
            //if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //    //最近2秒内按过back键，可以退出应用。这里退回为原生页面
            //    return false;
            //}
            //this.lastBackPressed = Date.now();
            //toastShort('再按一次退出应用');
            native.goBackNative();
            return true;
        }
    };

    // 渲染每条cell
    _renderItem = ({item,index}) =>{
        let color = index%2==0?'orange':'gray';
        let margin = index%2==0? 15:4.5;
        return(
            <TouchableOpacity style={styles.goodsItem} onPress={()=>{this._toDetail(item)}}>
                <View style={[styles.goodsItem1,{marginLeft:margin}]}>
                    <View style={styles.goodsItem2}>
                        <Image style={styles.goodsImage} resizeMethod="resize" resizeMode="stretch" source={{uri:item.image,headers: {Pragma: 'no-cache'}}}/>
                        <View style={styles.goodsInfo}>
                            <View style={styles.InfoView}>
                                <Text style={styles.nameText} numberOfLines={1}>{item.name}</Text>
                            </View>
                            <View style={styles.InfoView}>
                                <Text style={styles.infoText} numberOfLines={1}>{item.infoDescription}</Text>
                            </View>
                            <View style={styles.InfoView}>
                                <Text style={styles.priceText} numberOfLines={1}>{item.price}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )
    };

    // 进入详情页面
    _toDetail(item) {
        this.props.navigation.navigate('DataDetail',{detail:item})
    };
    // 进入详情页面
    _toOrderList = ()=>{
        this.props.navigation.navigate('OrderList')
    };
    // 每行之间间隔
    _separator = () => {
        return <View style={{height:10}}/>;
    };

    // 下拉刷新
    _onRefresh = () =>{
        let {dispatch} = this.props;
        let params = {page:1};
        dispatch(dataMallAction.getGoodsList(params)).then(()=>{     this.setState({isRefreshing: false}) });
        this.setState({isRefreshing: true,scrollEnabled:true,page:2});
    };

    // 上拉加载更多
    _onEndReached = (distanceFromEnd) =>{
        let {dispatch} = this.props;
        //console.log('&&&&&&&&&scrollEnabled',this.state.scrollEnabled,distanceFromEnd,'time',(Date.now()-this.state.loadMoreTime));
        //判断能否进行上拉加载
        if (distanceFromEnd.distanceFromEnd>0&&this.state.scrollEnabled&&(Date.now()-this.state.loadMoreTime)>1000) {
            //console.log('渲染上拉加载时的footer');
            this.setState({isLoadMore:true,loadMoreTime:Date.now()});
            let productId = '';
            let goodsList = this.props.dataMallData.goodsList;
            if (goodsList.length>0){
                productId = goodsList[goodsList.length-1].productId
            }
            let params = {page:this.state.page};
            dispatch(dataMallAction.getGoodsList(params)).then(()=>{
                goodsList = this.props.dataMallData.goodsList;
                if(goodsList.length > 0 && productId == goodsList[goodsList.length-1].productId){//无新数据了
                    this.setState({scrollEnabled:false,isLoadMore:false});
                    //console.log('无新数据了')
                }else{
                    this.setState({page:this.state.page+1,isLoadMore:false})
                    //console.log('还有新数据了')
                }
            });
        }
    };

    // 渲染上拉加载时的footer
    _ListFooterComponent = () =>{
        if(this.state.isLoadMore ){

            return <LoadingLoadMore/>
        }else {
            return<LoadingLoadMore LoadMoreText="~我是有底线的~"/>
        }
    };
    _isHttps = (url) =>{
        if (url.indexOf('http')>-1 && url.substring(4,5)==='s'){
            return url
        }else {
            return url.replace('http', 'https')
        }
    };
    _imageOnLoadEnd = (data) =>{
        console.log('imageOnLoadEnd-',data);
    };
    _renderSwiper = () =>{
        const {dataMallData} = this.props;
        return(
            <View style={{height:212}}>
                <View style={styles.mallTitle}>
                    <Text style={styles.titleText}>流量商城</Text>
                </View>
                {dataMallData.bannerList.length>0&&<Swiper
                    loop={true}
                    showsPagination={false}
                    autoplay={true}
                    showsPagination={true}
                    dot={<View style={styles.customDot} />}
                    activeDot={<View style={styles.customActiveDot} />}
                    paginationStyle={{bottom: 10,justifyContent:'flex-end',paddingRight:25 }}
                    autoplayTimeout={4}>
                    {
                        this.props.dataMallData.bannerList.map((item,index)=>{
                            return(
                                <View style={styles.banner} key={index}>
                                    <Image  style={styles.bannerImage}
                                            resizeMethod="resize"
                                            resizeMode="stretch"
                                            source={{uri:item.image,headers: {Pragma: 'no-cache'}}} />
                                </View>
                            )
                        })
                    }
                </Swiper>}
                <View style={{height:10}}/>
            </View>
        )
    };
    render() {
        const {dataMallData} = this.props;
        if (dataMallData.loading){
            return(<LoadingView/>)
        }else {
            return (
                <View style={styles.container}>


                    <FlatList
                        style={{flex:1}}
                        columnWrapperStyle={styles.columnWrapperStyle}
                        ListHeaderComponent={this._renderSwiper}
                        keyExtractor={(item, index) => index}
                        data={dataMallData.goodsList}
                        renderItem={this._renderItem}
                        numColumns={2}
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
    const {dataMallData,nav} = state;
    return {
        dataMallData,
        routes:nav.routes
    }
}


export default connect(mapStateToProps)(DataMall);

