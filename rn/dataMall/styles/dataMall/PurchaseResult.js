/**
 * Created by liwei on 2018/1/2.
 */
import { StyleSheet} from 'react-native';
import util from '../../utils/util'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        alignItems:'center'
    },
    icon:{
        marginTop:90,
        fontSize:55,
        color:'#2ca4fc'
    },
    orderState:{
        fontSize:20,
        color:'#1A1A1A',
        marginTop:15,
    },
    orderNo:{
        fontSize:14,
        color:'#666666',
        marginTop:6,
    },
    description:{
        fontSize:14,
        color:'#666666',
        marginTop:6,
        paddingHorizontal:35,
        lineHeight:20,
        textAlign:'center'
    },
    operateView:{
        marginTop:50,
        flexDirection:'row'
    },
    blueBtn:{
        height:40,
        width:140,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:10,
    },
    whiteBtn:{
        height:39,
        width:139,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:9.5,
        backgroundColor:'#fff'
    },
    btnGradient:{
        height:40,
        width:140,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:10,
        marginRight:30
    }

});

export default styles;