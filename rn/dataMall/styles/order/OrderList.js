/**
 * Created by fenghaoman on 2018/01/11.
 */
import { StyleSheet} from 'react-native';
import util from '../../utils/util'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    orderTitle:{
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
    orderItem:{
        width:util._window().width-30,
        marginHorizontal:15,
        borderRadius: 8,
        backgroundColor:'#fff',
        justifyContent:'center',
        marginTop:20,
        //elevation: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 20
    },
    item_top:{
        height:45,
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        paddingLeft:20,
        paddingRight:20,
        borderBottomWidth: 0.5,
        borderBottomColor:'#ccc',
    },
    time:{
        flex:1,
        flexDirection:'row',
    },
    time_title:{
        fontSize:14,
        color: '#B2B2B2',
    },
    time_value:{
        fontSize:14,
        color: '#2A2A2A',
    },
    status_value:{
        fontSize:14,
        color: '#1FA2FF',
    },
    item_bottom:{
        flex:1,
        paddingTop:15,
        paddingLeft:20,
        paddingBottom:20,
        flexDirection:'row'
    },
    goodsInfo_imageBox:{
        height:88,
        width:88,
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: '#F2F2F2',
    },
    goodsInfo_image:{
        height:88,
        width:88,
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
        // height:40,
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

});

export default styles;