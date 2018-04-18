/**
 * Created by zhaochong on 2018/1/4.
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, BackHandler, Platform,FlatList} from 'react-native';
import { connect } from 'react-redux';
import Icon from '../../../../node_modules/react-native-vector-icons/Ionicons';
import styles from '../../styles/vpgrowthdetails/styles';
import native from "../../utils/native";
import * as VpCenterAction from "../../action/VpCenterAction";
import { Heading1, Heading2, Paragraph } from '../../widget/Text'
import util from "../../utils/util";


const headerOptions = {
    headerStyle: { backgroundColor: '#fff' },
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerTintColor: '#999',
    headerBackTitle: null,
    headerRight: <View style={{ width: 24 }}/>
};
class VPScores extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        ...headerOptions,
        headerLeft: (<TouchableOpacity onPress={navigation.state.params?navigation.state.params.goBack:null} style={{flexDirection:'row',alignItems:'center'}}>
            <Icon name='ios-arrow-back' color={'#666666'}  style={{marginLeft:15,fontSize:17}} />
            <Text style={{fontSize:17,color:'#1A1A1A',marginLeft:10}}>返回</Text>
        </TouchableOpacity>),
        headerTitle:<View style={{alignItems: 'center',flexDirection:'row',paddingLeft:util._window().width/2-100,justifyContent: 'center'}}>
            <Text style={{color:'#1A1A1A',fontSize:18,justifyContent: 'center',
                alignItems: 'center',flex:1}}>积分明细</Text>
        </View>
    });

    componentDidMount() {
        let {dispatch} = this.props;
        dispatch(VpCenterAction.getVpGrowthDetails({type:1}));
        this.props.navigation.setParams({
            goBack:this._goBack
        })
    }
    _goBack=()=> {
        const { routes } = this.props;
        this.props.navigation.goBack();
    }

    // 每行之间间隔
    _separator = () => {
        return <View style={{height:10}}/>;
    };

    // 渲染每条cell
    _renderItem = ({item,index}) =>{
        return(
            <View style={{flexDirection:'row',paddingTop:15,paddingLeft:15}}>
                <View style={{flex:1}}>
                    <Heading2 style={styles.nameText}>{item.event}</Heading2>
                    <Text style={styles.infoText}>{item.date_added}</Text>
                </View>
                <View style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
                    <Text style={{
                        marginLeft: 50,
                        marginTop:20,
                        fontSize:20,
                        flex:1,
                        justifyContent:'flex-end',
                        alignItems:'center'
                    }}>       + {item.number}</Text>
                </View>
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={{flex:1}}
                    columnWrapperStyle={styles.columnWrapperStyle}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this._separator}
                    data={this.props.VPCenterData.growthDetail}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }

}
function mapStateToProps(state) {
    const {VPCenterData,nav} = state;
    return {
        VPCenterData,
        routes:nav.routes
    }
}

export default connect(mapStateToProps)(VPScores);
