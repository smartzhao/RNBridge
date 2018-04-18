import React, {
    Dimensions,
    StyleSheet
} from 'react-native';
import theme from '../Theme'
import util from '../../utils/util'


var styles = StyleSheet.create({
    nav: {
        width: util._window().width,
        paddingTop: util._isIos() ? theme.statusBarHeight :0,   // 处理iOS状态栏
        //paddingTop:  theme.statusBarHeight,
        height: util._isIos() ? theme.statusBarHeight+theme.navHeight : theme.navHeight,   // 处理iOS状态栏
        backgroundColor:'#f7f7f7',
        borderBottomColor: 'rgba(0,0,0,0.03)',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position:"relative"
    },
    navContainer:{
        height: util._isIos() ? theme.statusBarHeight+theme.navHeight : theme.navHeight,
        flexDirection: 'row',
        alignItems:'center'
    },
    navLeft: {
        color: '#28a4f7',
        textAlign: 'left',
        paddingLeft: 15,
        flex: 1,
    },
    navIconLeft: {
        height: util._isIos() ? theme.statusBarHeight+theme.navHeight : theme.navHeight,
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 15,
        width:50

    },
    navRight: {
        color: '#28a4f7',
        textAlign: 'right',
        paddingRight: 15,
        flex: 1
    },
    navIconRight: {
        height: util._isIos() ? theme.statusBarHeight+theme.navHeight : theme.navHeight,
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 15,
        width:50
    },
    navCenter: {
        textAlign: 'center',
        color: '#000000',
        flex:1,
        fontSize:theme.fontSize32,
        //width:util._window().width/2
    },
    icon: {
        fontSize:theme.fontSize30
    },
    navIconTextLeft: {
        height: util._isIos() ? theme.statusBarHeight+theme.navHeight : theme.navHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        width:50
    }
})

export default styles;
