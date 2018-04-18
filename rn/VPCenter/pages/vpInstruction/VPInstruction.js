/**
 * Created by zhaochong on 2018/1/4.
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, BackHandler, Platform,FlatList} from 'react-native';
import { connect } from 'react-redux';
import Icon from '../../../../node_modules/react-native-vector-icons/Ionicons';
import styles from '../../styles/vpinstruction/styles';
import native from "../../utils/native";
import * as VpCenterAction from "../../action/VpCenterAction";
import {Heading1, Heading2, HeadingBig, Paragraph} from '../../widget/Text';
import ImageViewer from 'react-native-image-zoom-viewer';

const headerOptions = {
    headerStyle: { backgroundColor: '#fff' },
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerTintColor: '#999',
    headerBackTitle: null,
    headerRight: <View style={{ width: 24 }}/>
};
class VPInstruction extends Component {


    static navigationOptions = ({ navigation, screenProps }) => ({
        ...headerOptions,
        headerLeft: (<TouchableOpacity onPress={navigation.state.params?navigation.state.params.goBack:null} style={{flexDirection:'row',alignItems:'center'}}>
            <Icon name='ios-arrow-back' color={'#666666'}  style={{marginLeft:15,fontSize:17}} />
            <Text style={{fontSize:17,color:'#1A1A1A',marginLeft:10}}>返回</Text>
        </TouchableOpacity>)
    });


    componentDidMount() {
        let {dispatch} = this.props;
        dispatch(VpCenterAction.getVPInstructions({type:this.props.navigation.state.params.detail}));
        this.props.navigation.setParams({
            goBack:this._goBack
        })
    }
     _goBack=()=> {
         const { routes } = this.props;
          this.props.navigation.goBack(routes[1].key);
     }

    // 每行之间间隔
    _separator = () => {
        return <View style={{height:10}}/>;
    };

    // 渲染每条cell
    _renderItem = ({item,index}) =>{
        console.log('渲染每条cell',item)
        return(
                <View style={styles.goodsInfo}>
                    <View style={styles.InfoView}>
                        <Text style={styles.infoText} >{item.text}</Text>
                    </View>

                    <View style={{
                        flex:1,
                        marginTop:10,
                        justifyContent: 'center',
                        alignItems: 'center',}}>
                        {item.images.length>0&&<Image style={{
                            height:141,
                            width:305,
                        }}
                               resizeMode="stretch"
                               source={{uri: item.images[index]}} />}
                    </View>
                </View>
        )
    };
    renderHeader() {
        return (
            <View style={styles.header_tittle}>
                <Heading2 style={{color: '#1A1A1A',fontSize:20,alignItems: 'center',justifyContent:'center'}}>{this.props.VPCenterData.vpinstructionDetail.title}</Heading2>
            </View>
        )
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.renderHeader()}
                <FlatList
                    style={{flex:1}}
                    columnWrapperStyle={styles.columnWrapperStyle}
                    keyExtractor={(item, index) => index}
                   /* ItemSeparatorComponent={this._separator}*/
                    data={this.props.VPCenterData.vpinstructionDetail.rules}
                    renderItem={this._renderItem}
                />
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
            </ScrollView>
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

export default connect(mapStateToProps)(VPInstruction);
