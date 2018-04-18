/**
 * Created by liwei on 2017/12/20.
 */
import { StyleSheet} from 'react-native';
import util from '../../utils/util'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: util._isIos()?'#fff':'#FAFAFA'
    },
    leftHeader: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center'
    },
    mallTitle:{
        height:52,
        width:util._window().width,
        backgroundColor: '#fff',
        justifyContent:'center',
        paddingLeft:15,
    },
    titleText:{
        fontSize:34,
        color:'#1A1A1A',
        fontWeight:'bold'
    },

    banner:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImage: {
        height: 150,
        width: util._window().width-30,
        borderRadius:5,
        //marginLeft:15
    },
    customDot: {
        backgroundColor: '#fff',
        height: 4,
        width: 10,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 4,
        borderRadius: 2,
        opacity:0.4
    },
    customActiveDot: {
        backgroundColor: '#1FA2FF',
        height: 4,
        width: 10,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 4,
        borderRadius: 2,
    },



    goodsItem:{
        height:(util._window().width-39)/2+89,
        width:(util._window().width)/2,
        //backgroundColor:'orange'
    },
    goodsItem1:{//显示阴影
        height:(util._window().width-39)/2+79,
        width:(util._window().width-39)/2,
        backgroundColor:'#fff',
        borderRadius:10,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 20
    },
    goodsItem2:{//约束圆角
        height:(util._window().width-39)/2+79,
        width:(util._window().width-39)/2,
        borderRadius:10,
        overflow:'hidden'
    },
    goodsImage:{
        height:(util._window().width-39)/2,
        width:(util._window().width-39)/2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    goodsInfo:{
        flex:1,
        backgroundColor:'white',
        paddingHorizontal:6,
        paddingVertical:7
    },
    InfoView:{
        flex:1,
        justifyContent: 'center',
    },

    nameText:{
        fontSize:16,
        color:'#202020',
    },
    infoText:{
        fontSize:12,
        color:'#bdbdbd',
    },
    priceText:{
        fontSize:18,
        color:'#2ca4fc',
    },





    columnWrapperStyle:{
    }

});

export default styles;