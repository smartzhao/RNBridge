/**
 * Created by zhaochong on 2018/1/4.
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, BackHandler, Platform,FlatList} from 'react-native';
import { connect } from 'react-redux';
import Icon from '../../../../node_modules/react-native-vector-icons/Ionicons';
import styles from '../../styles/myscores/styles';
import native from "../../utils/native";
import * as VpCenterAction from "../../action/VpCenterAction";
import {Heading1, Heading2, HeadingBig, Paragraph} from '../../widget/Text';
import Separator from '../../widget/Separator'
import SpacingView from "../../widget/SpacingView";
import { color, DetailCell, NavigationItem } from '../../widget';


const headerOptions = {
    headerStyle: { backgroundColor: '#fff' },
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerTintColor: '#999',
    headerBackTitle: null,
    headerRight: <View style={{ width: 24 }}/>
};
class MyScores extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        ...headerOptions,
        headerLeft: (<TouchableOpacity onPress={navigation.state.params?navigation.state.params.goBack:null} style={{flexDirection:'row',alignItems:'center'}}>
            <Icon name='ios-arrow-back' color={'#666666'}  style={{marginLeft:15,fontSize:17}} />
            <Text style={{fontSize:17,color:'#1A1A1A',marginLeft:10}}>返回</Text>
        </TouchableOpacity>),
        headerRight:<View style={{flexDirection:'row',paddingLeft:15,paddingRight:15}}>
            <TouchableOpacity  onPress={navigation.state.params?navigation.state.params.toIntoduction:null}>
                <Text style={{color:'#1FA2FF',fontSize:18,justifyContent: 'center'}}>积分规则</Text>
            </TouchableOpacity>
        </View>
    });

    componentDidMount() {
        let {dispatch} = this.props;
        dispatch(VpCenterAction.getVpGrowthDetails({type:2}));
        this.props.navigation.setParams({
            goBack:this._goBack,
            toIntoduction:this._toIntoduction
        })
    }
    _goBack=()=> {
        const { routes } = this.props;
        this.props.navigation.goBack(routes[1].key);
    }
    _toIntoduction=()=>{
        this.props.navigation.navigate('VPInstruction',{detail:'points'})//积分说明
    };

    // 每行之间间隔
    _separator = () => {
        return <View style={{height:10}}/>;
    };

    renderCells() {
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
                <View style={{alignItems: 'center',
                    backgroundColor:'#fff',
                    flex:1,
                     marginLeft:15,
                     marginRight:15,
                     borderBottomLeftRadius:10,
                     borderBottomRightRadius:10
                }}>
                    <TouchableOpacity style={styles.whiteBtn}  onPress={()=>{this._goto('VPScores')}}>
                        <Text style={{fontSize:12,color:'#B2B2B2'}}>点击查看积分明细</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // 渲染每条cell
    _renderItem = ({item,index}) =>{
        return(
            <TouchableOpacity style={styles.goodsItem}>
                <View style={styles.goodsInfo}>
                    <View style={styles.InfoView}>
                        <Text style={styles.nameText} numberOfLines={1}>{item.event}</Text>
                    </View>
                    <View style={styles.InfoView}>
                        <Text style={styles.infoText} numberOfLines={1}>{item.date_added}</Text>
                    </View>
                    <View style={styles.InfoView}>
                        <Text style={styles.priceText} numberOfLines={1}>{item.number}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };
    _renderShop=()=>{
        return (
            <TouchableOpacity  onPress={()=>{this._goto('Scoresshop')}}>
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' ,borderRadius:10,paddingLeft:15,paddingRight:15,paddingTop:15,overflow:'hidden'}}>
                <View style={{
                    backgroundColor:'white',
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems: 'center',
                    paddingTop:10,
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10}}/>
                <View style={{  backgroundColor: '#FFFFFF',
                    paddingLeft: 15,
                    paddingRight: 10,
                    flexDirection:'row',
                    paddingBottom:10,
                    paddingTop:10}}>
                    <Image style={styles.shop_icon} source={require('../../img/Myscores/myscores_shop.png')} />
                    <View style={{  height: 44,
                        alignItems: 'flex-start',
                        paddingLeft: 15,
                        paddingRight: 10,
                        flex:1,
                        marginTop:10,
                        borderRadius:10
                    }}>
                        <Paragraph style={{   justifyContent: 'flex-start',fontSize:14 }}>好礼随心换</Paragraph>
                        <View style={{ flex: 1, backgroundColor: 'blue' }} />
                        <Text style={{   justifyContent: 'flex-start',color: '#666666',fontSize:20 }}>积分商城</Text>
                    </View>

                        <Image style={styles.datamall} source={require('../../img/Public/cell_arrow.png')} />

                </View>

                <View style={{
                    backgroundColor:'white',
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems: 'center',
                    paddingTop:10,
                    borderBottomLeftRadius:10,
                    borderBottomRightRadius:10}}/>
                <Separator />
            </View>
            </TouchableOpacity>
        )
    };
    renderHeader() {
        return (
            <View style={styles.header_tittle}>
                <Heading2 style={{color: '#1A1A1A',fontSize:20,alignItems: 'center',justifyContent:'center'}}>如何获取积分</Heading2>
            </View>
        )
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.VpTitle}>
                    <Text style={styles.titleText}>我的积分</Text>
                </View>
                <View style={styles.VpTitle}>
                 <View style={{flexDirection:'row',flex:1}}>
                    <Paragraph style={{fontSize:16}} >当前积分</Paragraph>
                     <Image style={styles.score} source={require('../../img/Myscores/myscores_number.png')} />
                 </View>
                </View>
                <View style={{ justifyContent:'center', alignItems: 'center',}}>
                <Text  style={{ fontSize:64,color:'#60BAFF'}}> { this.props.navigation.state.params.detail}</Text>
                    <Image style={styles.score_shadow} source={require('../../img/Myscores/mycore_shadow.png')} />
                </View>
                {this._renderShop()}
                <View style={{flexDirection: 'row',
                    alignItems: 'center',
                    flexGrow:1}}>
                    <View style={{height:20,backgroundColor:'#E2E2E2'}}>
                    </View>
                </View>
                {this.renderHeader()}
                {this.renderCells()}

                <View style={{flexDirection: 'row',
                    alignItems: 'center',
                    flexGrow:1}}>
                    <View style={{height:20,backgroundColor:'#E2E2E2'}}>
                    </View>
                </View>
              {/*  <FlatList
                    style={{flex:1}}
                    columnWrapperStyle={styles.columnWrapperStyle}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this._separator}
                    data={this.props.VPCenterData.growthDetail}
                    renderItem={this._renderItem}
                />*/}
            </ScrollView>
        );
    }
    _goto=(url)=>{
        console.log('&&&&&&&&&&&&&&&跳跳转',url)
        this.props.navigation.navigate(url)
    };
    getDataList() {
        return (
            [
                [
                    {   title: '购买付费流量',
                        subtitle: '每购买100M流量可获得2积分',
                        image: require('../../img/Myscores/myscores_phone.png'),
                        btn_satus:2,
                        url:''
                    },
                    {
                        title: '参加服务号举行的活动',
                        subtitle: '参加各项活动',
                        image: require('../../img/Myscores/myscores_active.png'),
                        btn_satus:2,
                        url:''
                    },
                    {
                        title: '关注GNETLINK服务号',
                        subtitle: '成功关注服务号可获得20积分',
                        image: require('../../img/Myscores/myscore_gnetlinkicon.png'),
                        btn_satus:2,
                        url:''
                    }
                ]

            ]
        )
    }

}
function mapStateToProps(state) {
    const {VPCenterData,nav} = state;
    return {
        VPCenterData,
        routes:nav.routes
    }
}

export default connect(mapStateToProps)(MyScores);
