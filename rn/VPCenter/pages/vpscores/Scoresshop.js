/**
 * Created by zhaochong on 2018/1/4.
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, BackHandler, Platform,FlatList,WebView,Dimensions} from 'react-native';
import { connect } from 'react-redux';
import Icon from '../../../../node_modules/react-native-vector-icons/Ionicons';
import styles from '../../styles/ScoreShop/styles';
import * as VpCenterAction from "../../action/VpCenterAction";
import {Heading1, Heading2, HeadingBig, Paragraph} from '../../widget/Text';


const headerOptions = {
    headerStyle: { backgroundColor: '#fff' },
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerTintColor: '#999',
    headerBackTitle: null,
    headerRight: <View style={{ width: 24 }}/>
};
class Scoresshop extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        header:null

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
        this.props.navigation.goBack();
    }


    onNavigationStateChange = (navState) => {
        console.log('navState121211',navState)
        if (navState.url.indexOf('close')>0){
            this.props.navigation.goBack()
        }
    };
    //接收HTML发出的数据

    //脚本注入
    injectJS = () => {
        const script = 'document.write("Injected JS ")';  // eslint-disable-line quotes
        if (this.webview) {
            this.webview.injectJavaScript(script);
        }
    }


    renderHeader() {
        let data =this.props.commonData.authInfo
        return (
            <View  style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height, flex:1}}>
                <WebView
                    onNavigationStateChange={this.onNavigationStateChange}
                    source={{uri:'http://scdn.xchanger.cn/ecarx-web/pointStore-beta/index.html?accessToken='+data.Authorization+"&uId="+data.uId}}
                    style={{flex:1}}
                />
            </View>

        )
    }


    render() {
        return (
                this.renderHeader()
        );
    }



}
function mapStateToProps(state) {
    const {VPCenterData,nav,commonData} = state;
    return {
        VPCenterData,
        routes:nav.routes,
        commonData
    }
}

export default connect(mapStateToProps)(Scoresshop);
