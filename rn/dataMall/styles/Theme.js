/**
 * Created by liwei on 2017/12/20.
 */
import { StyleSheet} from 'react-native';
import util from '../utils/util'

let theme={

    backgroundColor:util._isIos()?'#fff':'#FAFAFA',






    tabBottomBarHeight:52,
    statusBarHeight:util._pt(44),//ios 状态栏高度控制
    statusBarHeightAndroid:util._pt(20),//android 状态栏高度控制
    navHeight:util._pt(88), //标题栏高度
    textInputIconHeight:util._pt(92), //带icon图标inputtext高度
    borderRadius:util._pt(10),  //默认圆角（登录按钮，输入框）
    listItemPadding:util._pt(24), //列表项padding默认宽度
    listItemHeight:util._pt(130), //列表项默认高度 (里面多行)
    listItemHeight2:util._pt(110), //列表项默认高度 (里面单行)
    // borderWidth:0.5, //默认边框宽度
    borderWidth:StyleSheet.hairlineWidth, //默认边框宽度
    listItemPaddingTopBottom:util._pt(30), //列表项上下内边距
    textInputHeight:util._pt(90), //inputText高度
    listItemUserIcon:util._pt(72), //列表项中用户图像高宽
    inputPaddingLeft:util._pt(18), //输入框左内边距
    tabBarHeight:util._pt(88),

    realblack:'#000',
    black:'#333333',
    gray:'#3c3d47',   //深灰色（标题栏背景色）
    gray1:'#666666',
    gray2:'#999999',
    gray3:'#cccccc',  //浅灰色 （边框，input默认字体颜色）
    gray4:'rgba(0,0,0,0.42)',
    gray5:'rgba(60,61,71,0.8)',
    gray6:'#cfcfcf',  //浅灰色 （边框，input默认字体颜色）
    white:'#FFFFFF', //白色
    whiteBg:'#f8f8f8',//白色（app背景色）
    blue:'#03a9f4',//蓝色
    blueBorder:'#29A1F7',//边框蓝
    red:'#ff473d',
    black1:'#000000',
    underlayColor:'#F5FCFF', //列表项点击按下背景色
    block:'#000000',
    blue4:'#00aafa',//深蓝色
    whiteRgb:'rgba(0,0,0,0)',//完全透明色
    green:'#5cb95c',//绿色
    yellow:'#fcbb16',//绿色
    listBackgroundColor:"#F8F8F8",
    blue3:'#02acf2',//
    blue5:'#7dd0f6', //消息冒泡颜色


    fontSize40:util._fontSize(40),
    fontSize38:util._fontSize(38),
    fontSize36:util._fontSize(36), //默认图标字体默认大小
    fontSize32:util._fontSize(32),
    fontSize30:util._fontSize(30),
    fontSize28:util._fontSize(28),//中
    fontSize26:util._fontSize(26),//中
    fontSize24:util._fontSize(24),
    fontSize22:util._fontSize(22),
    fontSize20:util._fontSize(20),
    fontSize54:util._fontSize(54),

    container:{
        flex: 1,
        alignItems: 'center',
        width:util._window().width,
        justifyContent:'center'
    },
    badge:{
        height:util._pt(16),
        width:util._pt(16),
        backgroundColor:'#ff473d',
        borderRadius:util._pt(16)/2
    },
    //滑动删除样式
    rowHideBack:{
        alignItems: 'center',
        backgroundColor:'#f8f8f8',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    backRightTouchBtn: {
        justifyContent: 'center',
        alignSelf: 'center',
        width:75,
        height:util._pt(130),
        backgroundColor: 'red',
        right: 0
    },
    backButtonText:{
        color: '#FFF',
        textAlign:'center'
    },
    globalTextColor:'#FFFFFF',
    title: {
        size: 32,
        color: '#FFFFFF'
    },
    content: {
        size: 16,
        color: '#FFFFFF'
    }
}

export default theme;