/**
 * Created by liwei on 2017/12/20.
 */
import { StyleSheet} from 'react-native';
import util from '../../utils/util'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        //height:util._window().height,
        //width:util._window().width
    },
    scrollView:{},
    button: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#bdbdbd',
        backgroundColor: '#000',
        position:'absolute',
        top:26,
        left:15,
        borderRadius:16,
        zIndex:10,
        opacity:0.5
    },
    banner:{
        height: util._window().width,
        width: util._window().width,
        //backgroundColor:'orange'
    },
    bannerImage: {
        height: util._window().width,
        width: util._window().width,
        //borderRadius:5,
        //marginLeft:15
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 16,
        right: 15,
        backgroundColor:'#000',
        width:40,
        height:20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        opacity:0.3
    },
    paginationText: {
        color: 'white',
        fontSize: 14
    },




    buyBtn:{
        width: util._window().width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#2ca4fc',
        position:'absolute',
        bottom:0,
        zIndex:10
    },
    buyBtnGradient:{
        width: util._window().width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buyText:{
        color:'white',
        backgroundColor:'transparent'
    },
    info: {
        width:util._window().width,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        color: '#1A1A1A',
    },
    infoDesc: {
        fontSize: 14,
        color: '#B2B2B2',
        lineHeight: 20,
    },
    price: {
        fontSize: 20,
        lineHeight: 30,
        color: '#1FA2FF',
    },
    description: {
        backgroundColor: '#fff',
        paddingBottom: 50,
    },
    titleBox: {
        flex: 1,
        height: 50,
        paddingLeft: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    titleLine: {
        width: 4,
        height: 16,
        backgroundColor: '#1FA2FF',
        marginRight: 6,
        borderRadius: 10,
    },
    descTitle: {
        fontSize: 16,
        color: '#1A1A1A',
    },
    descImgList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    descImg:{
        height: util._window().width/1200*500,
        width: util._window().width,
    }

});

export default styles;