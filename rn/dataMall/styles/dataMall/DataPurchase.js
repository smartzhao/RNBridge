/**
 * Created by liwei on 2017/12/29.
 */
import { StyleSheet} from 'react-native';
import util from '../../utils/util'
import theme from '../../styles/Theme'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    purchaseTitle:{
        height:52,
        width:util._window().width,
        backgroundColor: '#FAFAFA',
        justifyContent:'center',
        paddingLeft:15,
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
    carInfo:{
        height:137,
        width:util._window().width-30,
        marginHorizontal:15,
        borderRadius:8,
        backgroundColor:'#fff',
        justifyContent:'center',
        marginBottom:20,
        marginTop:10,
        paddingLeft:20,
        //elevation: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 20
    },
    item_title:{
        height:28,
        fontSize:20,
        marginTop:12
    },
    item_bottom:{
        flex:1,
        paddingTop:15,
        paddingBottom:20,
        flexDirection:'row'
    },
    carInfo_icon:{
        height:62,
        width:62,
        borderRadius:31,
        //backgroundColor:'#12D8FA',
        justifyContent:'center',
        alignItems:'center'
    },
    carInfo_bRight:{
        flex:1,
        paddingLeft:15
    },
    carInfo_text:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    carInfo_text1:{
        fontSize:16,
        color:'#666666'
    },
    carInfo_text2:{
        fontSize:16,
        color:'#1a1a1a'
    },
    goodsInfo:{
        height:165,
        width:util._window().width-30,
        marginHorizontal:15,
        borderRadius:8,
        backgroundColor:'#fff',
        justifyContent:'center',
        marginBottom:20,
        paddingLeft:20,
        //elevation: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 20
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
    paySelect:{
        height:261,
        width:util._window().width-30,
        marginHorizontal:15,
        borderRadius:8,
        backgroundColor:'#fff',
        justifyContent:'center',
        marginBottom:20,
        paddingLeft:20
    },

    payBtn:{
        width: util._window().width,
        height: 50,
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        zIndex:10,
        //borderTopColor:'#cccccc',
        //borderTopWidth:0.5
        //elevation: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 20
    },
    payTextView1:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#fff',
        flexDirection:'row'
    },
    payTextView2:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        //backgroundColor:'#2ca4fc',

    },
    payTextView2Gradient:{
        width: util._window().width/2,
        height: 50,
        justifyContent: 'center',
        alignItems:'center',
        //backgroundColor:'#2ca4fc',

    }




});

export default styles;