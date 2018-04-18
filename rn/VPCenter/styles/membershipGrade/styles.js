/**
 * Created by zhaochong on 2017/12/21.
 */
import { StyleSheet} from 'react-native';
import util from "../../../VPCenter/utils/util";
import color from "../../../VPCenter/widget/color";

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: color.background,
        },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#fff',
    },
    banner:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        borderRadius:10,
        overflow:'hidden',

        //backgroundColor:'orange'
    },
    bannerImage: {
        height: 200,
        overflow:'hidden',
        resizeMode:'stretch',
        width: util._window().width-50,
        borderRadius:10,
    },
    header_vp: {
        paddingBottom: 20,
        paddingLeft:60,
        marginLeft:20,
        flexDirection:'row',
        justifyContent:'center',
    },
    header_tittle: {
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        paddingTop:20,
        marginRight:15,
        marginLeft:15,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    icon_vp: {
        width: 5,
        height: 5,
    },
    userContainer_vp: {
        flexDirection: 'row',
        alignItems: 'center',
        // flex:1,
        flexGrow:1
    },
    avatar_vp: {
       /* width: 50,
        height: 50,*/
        marginRight: 10,
        borderColor: '#51D3C6'
    },

    button: {
        width: 200,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    wrapper: {
        height:125
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    VpTitle:{
        height:52,
        width:util._window().width,
        backgroundColor: '#f3f3f3',
        justifyContent:'center',
        padding:15
    },
    titleText:{
        fontSize:34,
        color:'#1A1A1A'
    },
});

export default styles;