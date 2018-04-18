import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import styles from '../styles/components/Nav';
//var Icon = require('react-native-vector-icons/Icommoon');
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';

import theme from '../styles/Theme'


class Nav extends Component {
    constructor(props) {
        super(props)
    }
    _renderNavContent() {
        var navs = this.props.navs || {};

        return ['Left', 'Center', 'Right'].map((position)=> {
            var nav = navs[position];
            let getIconText=()=>{
                if (nav.text&&nav.icon){
                    return(<TouchableOpacity
                            onPress={nav.onPress}
                            style={[styles['navIconText'+position]]}>
                            <Icon name={nav.icon.name} color={'#28a4f7'}  style={styles.icon} />
                            <Text>{nav.text}</Text>
                        </TouchableOpacity>
                    );
                }
                if(nav.text){
                    return( <Text style={[styles['nav'+position],{alignItems:"center"}]} numberOfLines={1}>
                        {nav.text}
                    </Text>);
                }
                if(nav.icon){
                    return(<TouchableOpacity
                            onPress={nav.onPress}
                            style={[styles['navIcon'+position]]}>
                            <Icon name={nav.icon.name} color={'#28a4f7'}  style={styles.icon} />
                        </TouchableOpacity>
                    );
                }
                if(nav.view){
                    return (nav.view);
                }
            };
            if (nav) {
                if(!nav.view){
                    if(position=='Center'){
                        return (
                            <View key={'key'+position} style={[styles['navContainer'],{flex:2}]}>
                                {getIconText()}
                            </View>
                        )
                    }
                    return (
                        <View key={'key'+position} style={[styles['navContainer'],
                             {flex: position=='Center'?2:1,justifyContent:position=='Left'?'flex-start':'flex-end' }]}>
                            {getIconText()}
                        </View>
                    )
                }else{
                    return(<View key={'key'+position}
                                 style={[styles['navContainer'],{flex: position=='Center'?2:1,
                                 justifyContent:'center',alignItems:'center'}]}>
                        {getIconText()}
                    </View>);
                }

            }
            return (
                <Text key={'key'+position} style={[styles.navItem,styles['nav'+position]]} numberOfLines={1}>
                </Text>
            )
        })
    }


    render() {
        return (
            <View
                ref={view=>this.nav=view}
                style={styles.nav}>
                {this._renderNavContent()}
            </View>
        )
    }
}

//module.exports = Nav;
//export default Nav
export default Nav;
