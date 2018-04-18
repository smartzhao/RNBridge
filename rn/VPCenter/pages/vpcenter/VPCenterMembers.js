/**
 * Created by liwei on 2017/12/21.
 */
import React, { Component } from 'react';
import {  BackAndroid,StyleSheet, ScrollView,Text, View, TouchableOpacity,Platform,BackHandler,NativeModules,Dimensions,Image,ReactElement } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from '../../styles/membershipGrade/styles';
import Swiper from 'react-native-swiper';

import { Heading1, Heading2, Paragraph } from '../../widget/Text'
import { color, DetailCell, NavigationItem, SpacingView } from '../../widget'
import * as VpCenterAction from '../../action/VpCenterAction';
import Icon from '../../../../node_modules/react-native-vector-icons/Ionicons';
import Separator from '../../widget/Separator';
import native from "../../utils/native";
import LoadingView from '../../../dataMall/components/LoadingView'
import * as types from "../../constants/VPCenterActionType";


const headerOptions = {
    headerStyle: { backgroundColor: '#fff' },
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerTintColor: '#999',
    headerBackTitle: null,
    headerRight: <View style={{ width: 24 }}/>
};

class VPCenterMembers extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        ...headerOptions,
        headerLeft: (<TouchableOpacity onPress={navigation.state.params?navigation.state.params.goBack:null} style={{flexDirection:'row',alignItems:'center'}}>
            <Icon name='ios-arrow-back' color={'#666666'}  style={{marginLeft:15,fontSize:17}} />
            <Text style={{fontSize:17,color:'#1A1A1A',marginLeft:10}}>返回</Text>
        </TouchableOpacity>),
        headerRight:<View style={{flexDirection:'row',paddingLeft:15,paddingRight:15}}>
            <TouchableOpacity  onPress={navigation.state.params?navigation.state.params.toIntoduction:null}>
                <Text style={{color:'#1FA2FF',fontSize:18,justifyContent: 'center'}}>等级规则</Text>
            </TouchableOpacity>
        </View>
    });


    componentWillMount() {
        let {dispatch} = this.props;
        dispatch(VpCenterAction.getBanners());
        dispatch({type:types._LOADING,data:true});
        this.props.navigation.setParams({
            goBack:this._goBack,
            toIntoduction:this._toIntoduction
        })
        native.colseHUD();
        if (Platform.OS === 'android') {
            BackHandler.addEventListener("hardwareBackPress", this.onBackAndroid);
        }else {

        }
    }
    componentWillUnmount(){
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener("hardwareBackPress", this.onBackAndroid);
        }
    }
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

    _goBack = () => {
     /*   const { routes } = this.props;
        this.props.navigation.goBack(routes[1].key);*/
        native.goBackNative();
    };

    _toIntoduction=()=>{
        this.props.navigation.navigate('VPInstruction',{detail:'level'})//会员等级承诺书
    };

    _goto=(url)=>{
        console.log('&&&&&&&&&&&&&&&跳跳转',url)
        this.props.navigation.navigate(url)
    };
    renderCells=()=> {
        let cells = []
        let dataList = this.getDataList()
        for (let i = 0; i < dataList.length; i++) {
            let sublist = dataList[i]
            for (let j = 0; j < sublist.length; j++) {
                let data = sublist[j]
                let cell = <DetailCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title} btn_satus={data.btn_satus} goto={this._goto} url={data.url}/>
                cells.push(cell)
            }
            cells.push(<SpacingView key={i} />)
        }

        return (
            <View style={{ flex: 1 }}>
                {cells}
                <View style={{
                    backgroundColor:'white',
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems: 'center',
                    paddingTop:15,
                    marginRight:15,
                    marginLeft:15,
                    borderBottomLeftRadius:10,
                    borderBottomRightRadius:10}}/>
            </View>
        )
    }
    _renderSwiper = () =>{
        console.log('&&&&&&&&&_renderSwiper',this.props.VPCenterData.vpbannerList)
        const {vpbannerList} = this.props.VPCenterData
        return(
            <View style={{height:220}}>
                <Swiper
                    loop={false}
                    index={this.props.VPCenterData.vpbannerList.levelName.substring(1)}
                    showsPagination={true}
                    autoplay={false}
                    autoplayTimeout={2}>
                    {
                        this.props.VPCenterData.vpbannerList.level_list.map((item,index)=>{
                            //console.log('&&&&&&&&&_renderSwiper index',index)

                            let imageNo = (index)%3;
                            console.log('&&&&&&&&&_renderSwiper imageNo',imageNo)

                            return(

                                <View style={styles.banner} key={index}>
                                    <Image  style={styles.bannerImage}
                                            source={{uri: vpbannerList.image[imageNo].image_3x}} />
                                    <View style={{position:'absolute',top:20,left:40,flexDirection:'row',height:40,width:200,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'#fff',fontSize:20}}>
                                            {item.description}
                                        </Text>
                                        <View style={{width:40,height:20}}>
                                            <Image style={{width: 35,
                                                height: 18}} source={require('../../img/center/center_level.png')} />
                                            <Text style={{position:'absolute',right:8}}>{item.name.substring(1)}</Text>
                                        </View>

                                    </View>
                                    {item.growing=='0'?null:<Text style={{
                                        position: 'absolute',
                                        bottom: 40,
                                        right: 40,
                                        color: '#FFFFFF',
                                        fontSize: 12
                                    }}>升级所需{item.growing}成长值</Text>
                                    }
                                </View>
                            )
                        })
                    }

                </Swiper>
            </View>
        )
    };
    renderScore=()=> {
        return (
            <View style={styles.header_vp}>
                <View style={styles.userContainer_vp}>
                    <Image style={styles.avatar_vp} source={require('../../img/center/center_scores.png')} />
                    <TouchableOpacity  onPress={()=>{this._toDetail('MyScores',this.props.VPCenterData.vpbannerList.point)}}>
                    <View>
                        <View style={{ flexDirection: 'row',marginTop:20 }}>
                            <Heading1 style={{color: '#B2B2B2', }}>积分</Heading1>
                        </View>
                        <Paragraph style={{ color: '#666666', marginTop: 5 }}>{this.props.VPCenterData.vpbannerList.point}</Paragraph>
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row',
                    alignItems: 'center',
                    flexGrow:1}}>
                    <View style={{height:20,width:0.5,backgroundColor:'#E2E2E2'}}>
                    </View>
                </View>
                <View style={styles.userContainer_vp}>

                    <Image style={styles.avatar_vp} source={require('../../img/center/center_growth.png')} />
                    <TouchableOpacity  onPress={()=>{this._toDetails('VPGrowthDetails')}}>
                        <View>
                        <View style={{ flexDirection: 'row' ,marginTop:20 }}>
                            <Heading1 style={{color: '#B2B2B2', }}>成长值</Heading1>
                        </View>
                        <Paragraph style={{ color: '#666666', marginTop: 5 }}>{this.props.VPCenterData.vpbannerList.growing_total}</Paragraph>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    renderHeader() {
        return (
            <View style={styles.header_tittle}>
                <Heading2 style={{color: '#1A1A1A',fontSize:20,alignItems: 'center',justifyContent:'center'}}>如何获取成长值</Heading2>
            </View>
        )
    }
    render() {
        if (this.props.VPCenterData.loading){
            return(<LoadingView/>)
        }else {
            return (
                <ScrollView style={styles.container}>
                    <View style={styles.VpTitle}>
                        <Text style={styles.titleText}>会员中心</Text>
                    </View>
                    {this.props.VPCenterData.vpbannerList.hasOwnProperty('image') && this._renderSwiper()}
                    {this.renderScore()}
                    {this.renderHeader()}
                    {this.renderCells()}
                </ScrollView>


            );
        }
    }
    getDataList=()=> {
        let event =this.props.VPCenterData.vpbannerList.event||[];
             console.log("ssss",event)

        let dataList = [

            {
                title: '每日行车',
                subtitle: '车辆每次启动可获得5成长值',
                image: require('../../img/center/center_car.png'),
                btn_satus: 2,
                url: ''
            },
            {
                title: '完成实名认证',
                subtitle: '完成实名认证可获得25成长值',
                image: require('../../img/center/center_author.png'),
                btn_satus: 2,
                url: ''
            },
            {
                title: '完善个人资料',
                subtitle: '首次完善资料可获得20成长值',
                image: require('../../img/center/center_vp.png'),
                btn_satus: 2,
                url: ''
            },
            {
                title: '每日远程操控',
                subtitle: '首次远程操作可获得10成长值',
                image: require('../../img/center/center_control.png'),
                btn_satus: 2,
                url: ''
            }
        ]
        if (this.props.VPCenterData.vpbannerList.event){
            dataList.map((item,index)=>{
                item.btn_satus = event[index].status
            })
        }

            return (
                [
                    dataList

                ]
            )
    }
    // 进入详情页面
    _toDetail=(url,item)=> {
        this.props.navigation.navigate(url,{detail:item})
    }
    _toDetails=(url)=> {
        this.props.navigation.navigate(url);
    }

}
function mapStateToProps(state) {
    const {VPCenterData,nav} = state;
    return {
        VPCenterData,
        routes:nav.routes
    }
}


export default connect(mapStateToProps)(VPCenterMembers);
