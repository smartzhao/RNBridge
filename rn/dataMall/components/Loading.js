/**
 * Created by liwei on 2018/1/2.
 */
'use strict';

import React, { Component } from 'react';
import {
    ActivityIndicator,
    Platform,
    Text,
    StyleSheet,
    View
} from 'react-native';

class Loading extends Component {
    render() {
        return (
            <View style={styles.loading}>
                <View style={styles.loadingView}>
                    <ActivityIndicator styleAttr='LargeInverse' color='#fff' />
                    <Text style={ styles.loadingText }>{this.props.loadingText || '数据加载中...'}</Text>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    loading:{
        flex:1,
        top:0,
        right:0,
        left:0,
        bottom:0,
        position:'absolute',
        //backgroundColor:'orange',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:99
    },
    loadingView:{
        height:120,
        width:120,
        borderRadius:10,
        backgroundColor:'#000',
        opacity:0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 10,
        textAlign: 'center',
        color:'#fff'
    }
});

export default Loading;
