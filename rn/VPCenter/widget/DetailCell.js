/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */

//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Heading1, Heading2, Paragraph } from './Text'
import Separator from './Separator'
import { screen, system, tool } from '../common'

// create a component
class DetailCell extends PureComponent {
    _onClick = (key) =>{
        this.props.goto(key);

    };
    render() {
        let icon = this.props.image && <Image style={styles.icon} source={this.props.image} />
        let btn_status= this.props.btn_satus;
        let btn_color;
        let btn_content;
        //0 未完成，1 已完成 ，2 隐藏
         if (btn_status==1){
             btn_content='已完成';
         } else if (btn_status==0){
            btn_content='去完善';
             btn_color='#F5A623';
         } else {
             null
         }
        return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3' ,paddingLeft:15,paddingRight:15}}>
            <View style={styles.containers}>
                {icon}
                <View style={[styles.content, this.props.style]}>
                    <Heading2>{this.props.title}</Heading2>
                    <View style={{ flex: 1, backgroundColor: 'blue' }} />
                    <Paragraph style={{   justifyContent: 'flex-start',color: '#999999' }}>{this.props.subtitle}</Paragraph>
                </View>
                {btn_status=='2'?null:<TouchableOpacity style={[styles.whiteBtn,{borderColor:btn_color}]}  onPress={()=>{this._onClick(this.props.url)}}>
                    <Text style={{fontSize:12,color:btn_color,}}>{btn_content}</Text>
                </TouchableOpacity>}
            </View>
        <Separator />
    </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    containers: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 15,
        paddingRight: 10,
        flexDirection:'row',
        paddingBottom:20,
        paddingTop:10,
    },

    content: {
        height: 44,
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingRight: 10,
        flex:1,
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    whiteBtn:{
        margin:10,
        height:19,
        width:61,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:10,
        borderWidth:0.5,
        borderColor:'#D9D9D9',
        marginRight:30

        //backgroundColor:'#fff',
    },
});

//make this component available to the app
export default DetailCell;
