/**
 * Created by Roc on 2017/6/30.
 *React Native相关代码已打包成离线bundle，此处暂时不进行提供代码
 */

import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/createStore';
import AppWithNavigationState from './AppWithNavigationState';

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState params={this.props}/>
            </Provider>
        );
    }
};

AppRegistry.registerComponent('RnBase', () => Root);