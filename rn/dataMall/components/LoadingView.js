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

class LoadingView extends Component {
    render() {
        if (Platform.OS === 'android') {
            return (
                <View style={ styles.loading }>
                    <ActivityIndicator styleAttr='LargeInverse' color='#3e9ce9' />
                    <Text style={ styles.loadingText }>数据加载中...</Text>
                </View>
            );
        } else {
            return (
                <View style={ styles.loading }>
                    <ActivityIndicator size='large' />
                    <Text style={ styles.loadingText }>数据加载中...</Text>
                </View>
            );
        }
    }
}

let styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#fff'
    },
    loadingText: {
        marginTop: 10,
        textAlign: 'center'
    }
})

export default LoadingView;
