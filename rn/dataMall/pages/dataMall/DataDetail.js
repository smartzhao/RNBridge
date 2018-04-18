/**
 * Created by liwei on 2017/12/15.
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../styles/dataMall/DataDetail'
import Icon from '../../../../node_modules/react-native-vector-icons/Ionicons';
import * as dataMallAction from '../../actions/dataMallAction'
import Swiper from 'react-native-swiper';
import DataPurchase from './DataPurchase'
import LoadingView from '../../components/LoadingView'
import * as types from "../../constants/dataMallActionType";
import LinearGradient from 'react-native-linear-gradient';
import util from '../../utils/util'

class DataMallDetail extends Component {
    static navigationOptions = {
        header:null
    };
    componentDidMount() {

        let {dispatch,navigation} = this.props;
        dispatch({type:types.DATAMALL_LOADING,data:true});
        dispatch(dataMallAction.getGoodsDetail(navigation.state.params.detail.productId));
    }
    _goBack() {
        const { routes } = this.props;
        this.props.navigation.goBack();
    }

    _renderPagination = (index, total, context) => {
        return (
            <View style={styles.paginationStyle}>
                <Text style={styles.paginationText}>
                    <Text style={styles.paginationText}>{index + 1}</Text>/{total}
                </Text>
            </View>
        )
    }
    _renderSwiper = () =>{
        return(
            <View style={styles.banner}>
                {this.props.dataMallData.goodDetail.images&&this.props.dataMallData.goodDetail.images.length>0&& <Swiper
                    loop={true}
                    showsPagination={false}
                    autoplay={true}
                    showsPagination={true}
                    renderPagination={this._renderPagination}
                    autoplayTimeout={2}>
                    {
                        this.props.dataMallData.goodDetail.images.map((item,index)=>{
                            return(
                                <View style={styles.banner} key={index}>
                                    <Image  style={styles.bannerImage}
                                            resizeMode="stretch"
                                            source={{uri: item.image}} />
                                </View>
                            )
                        })
                    }

                </Swiper>}
            </View>
        )
    };

    _renderInfo = () => {
        return (
            <View style={styles.info}>
                <Text style={styles.name}>{this.props.dataMallData.goodDetail.name}</Text>
                <Text style={styles.infoDesc}>{this.props.dataMallData.goodDetail.infoDescription}</Text>
                <Text style={styles.price}>{this.props.dataMallData.goodDetail.price}</Text>
            </View>
        )
    };
    _renderDescription = () => {
        let descImgList = [];
        if(this.props.dataMallData.goodDetail.description){
            let imageStr = this.props.dataMallData.goodDetail.description;
            let imgReg = /<img.*?(?:>|\/>)/gi;
            let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
            let arr = String(imageStr).match(imgReg);
            for (let i = 0; i < arr.length; i++) {
              let src = arr[i].match(srcReg);
              if(src[1]){
                descImgList.push(src[1]);
              }
            }
            //console.log('descImgList：',descImgList);
        }
        return (
            <View style={styles.description}>
                <View style={styles.titleBox}>
                    <View style={styles.titleLine}></View>
                    <View><Text style={styles.descTitle}>商品详情</Text></View>
                </View>
                <View style={styles.descImgList}>
                    {
                        descImgList.map((item,index) => {
                            return  <Image style={styles.descImg} resizeMode="contain" source={{uri: item}} key={index}/>
                        })   
                    }
                </View>
            </View>
        )
    };

    _toPurchase(item) {
        this.props.navigation.navigate('DataPurchase',{detail:this.props.dataMallData.goodDetail})
    }
    render() {
        const { routes,dataMallData } = this.props;
        //console.log('^^^^^^',dataMallData.goodDetail)

        if (dataMallData.loading){
            return(<LoadingView/>)
        }else {
            return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={this._goBack.bind(this)}>
                        <Icon name='ios-arrow-back' color={'#fff'} style={{fontSize:25}}/>
                    </TouchableOpacity>
                    <ScrollView bounces={false}>
                        {
                            this._renderSwiper()
                        }
                        {
                            this._renderInfo()
                        }
                        {
                            this._renderDescription()
                        }
                    </ScrollView>

                    <TouchableOpacity activeOpacity={0.8} style={styles.buyBtn} onPress={()=>{this._toPurchase()}}>
                        <LinearGradient
                            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                            colors={['#12D8FA', '#1FA2FF']}
                            style={styles.buyBtnGradient}>
                            <Text style={styles.buyText}>立即购买</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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


export default connect(mapStateToProps)(DataMallDetail);
