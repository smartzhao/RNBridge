/**
 * Created by liwei on 2018/1/11.
 */
import { StyleSheet} from 'react-native';
import util from '../../utils/util'
import theme from '../Theme'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    orderTitle:{
        height:52,
        width:util._window().width,
        backgroundColor: '#FAFAFA',
        justifyContent:'center',
        paddingLeft:15
        //marginBottom:10
    },
    titleText:{
        fontSize:34,
        color:'#1A1A1A',
        fontWeight:'bold'
    },
    scrollview:{
        marginBottom:50
    },
    purchaseResult:
    {
        height:197,
        width:util._window().width-30,
        backgroundColor:'#fff',
        borderRadius:10,
        marginHorizontal:15,
        marginBottom:20,
        //elevation: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 20
    },
    purchaseState:{
        height:77,
        width:util._window().width-30,
        justifyContent:'center',
        borderBottomColor:'#CCCCCC',
        borderBottomWidth:0.5,
        paddingLeft:20,
        paddingTop:0
    },
    purchaseStateText1:{
        color:'#1FA2FF',
        fontSize:20,
        lineHeight:28,
        fontWeight:'bold'
    },
    purchaseStateText2:{
        color:'#B2B2B2',
        fontSize:14,
        lineHeight:20
    },

    carInfo:{
        height:120,
        width:util._window().width-30,
        justifyContent:'center',
        paddingLeft:20
    },
    carInfo_title:{
        lineHeight:22,
        fontSize:16,
        marginTop:9,
        color:'#1A1A1A'
    },
    carInfo_bottom:{
        flex:1,
        paddingTop:7,
        paddingBottom:20,
        flexDirection:'row'
    },
    carInfo_icon:{
        height:62,
        width:62,
        borderRadius:31,
        justifyContent:'center',
        alignItems:'center'
    },
    carInfo_Right:{
        flex:1,
        paddingLeft:15,
        justifyContent:'center'
    },
    carInfo_text1:{
        fontSize:17,
        color:'#1A1A1A',
        lineHeight:24,
        fontWeight:'bold'
    },
    carInfo_text2:{
        fontSize:14,
        color:'#666666',
        lineHeight:20
    },
    carInfo_text3:{
        fontSize:16,
        color:'#666666',
        lineHeight:22
    },
    // 商品信息
    goodsInfo:{
        width:util._window().width-30,
        marginHorizontal:15,
        borderRadius:10,
        backgroundColor:'#fff',
        justifyContent:'center',
        marginBottom:20,
        //elevation: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 20,
        paddingBottom:11
    },
    item_title:{
        lineHeight:22,
        fontSize:16,
        marginTop:16,
        color:'#1A1A1A',
        paddingLeft:20
    },
    item_bottom:{
        height:108,
        width:util._window().width-30,
        paddingTop:10,
        flexDirection:'row',
        borderBottomColor:'#CCCCCC',
        borderBottomWidth:0.5,
        paddingLeft:20
    },
    goodsInfo_image:{
        height:88,
        width:88,
        borderRadius:4
    },
    goodsInfo_bRight:{
        flex:1,
        paddingLeft:10,
        paddingRight:13
    },
    goodsInfo_text1:{
        height:22,
        fontSize:16,
        color:'#1a1a1a'
    },
    goodsInfo_text2:{
        height:40,
        fontSize:14,
        color:'#666666',
        //backgroundColor:'orange',
        lineHeight:20
    },
    goodsInfo_text3:{
        height:25,
        fontSize:18,
        color:'#2ca4fc'
    },

    priceView:{
        width:util._window().width-30,
        alignItems:'flex-end',
        paddingRight:15,
        marginTop:11
    },
    price_text:{
        lineHeight:20,
        fontSize:14,
        color:'#B2B2B2'
    },
    price_text2:{
        lineHeight:20,
        fontSize:14,
        color:'#1FA2FF',
        paddingTop:2
    },
    price_text3:{
        lineHeight:20,
        fontSize:18,
        color:'#1FA2FF'
    },


    // 订单信息
    orderInfo:{
        width:util._window().width-30,
        marginHorizontal:15,
        borderRadius:10,
        backgroundColor:'#fff',
        justifyContent:'center',
        marginBottom:20,
        //elevation: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 20,
        paddingBottom:10,
        paddingLeft:20,
        paddingTop:10
    },
    orderInfo_title:{
        lineHeight:22,
        fontSize:16,
        color:'#1A1A1A',
        marginBottom:6
    },
    orderInfo_text:{
        lineHeight:20,
        fontSize:14,
        color:'#B2B2B2',
        //marginTop:4
    },
    orderInfo_color:{
        color:'#2A2A2A'
    },


    hotLine:{
        width: util._window().width,
        height: 50,
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        zIndex:10,
        //elevation: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 20
    },
    hotLineView:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#fff',
        flexDirection:'row'
    },





});

export default styles;