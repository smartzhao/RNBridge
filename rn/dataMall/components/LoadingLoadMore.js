/**
 * Created by liwei on 2018/1/4.
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
import util from '../utils/util'
class LoadingLoadMore extends Component {
    render() {
        if (this.props.LoadMoreText){
            return (
                <View style={ styles.loading }>
                    <Text style={ styles.loadingText }>{this.props.LoadMoreText}</Text>
                </View>
            );
        }else {
            if (Platform.OS === 'android') {
                return (
                    <View style={ styles.loading }>
                        <ActivityIndicator styleAttr='Inverse' color='#3e9ce9' />
                        <Text style={ styles.loadingText }>数据加载中...</Text>
                    </View>
                );
            } else {
                return (
                    <View style={ styles.loading }>
                        <ActivityIndicator size='small' />
                        <Text style={ styles.loadingText }>数据加载中...</Text>
                    </View>
                );
            }
        }
    }
}

let styles = StyleSheet.create({
    loading: {
        flexDirection:'row',
        width:util._window().width,
        height:60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        marginLeft: 10,
        textAlign: 'center',
        color:'#B2B2B2'
    }
})

export default LoadingLoadMore;