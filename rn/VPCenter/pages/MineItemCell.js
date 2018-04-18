/**
 * Created by zhaochong on 2017/12/28.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heading2, Paragraph } from '../widget/Text'
import Separator from '../widget/SpacingView'
import { screen, system, tool } from '../../common'

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;

class MineItemCell extends Component {
    render() {
        let icon = null;
        if (this.props.img) {
            icon = <Image style={styles.icon} source={this.props.img} />
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={[styles.content, this.props.style]}>
                        {icon}
                        <Heading2>{this.props.title}</Heading2>
                        <View style={{ flex: 1, backgroundColor: 'blue' }} />
                        <Paragraph style={{ color: '#999999' ,flexDirection: 'c'}}>{this.props.subtitle}</Paragraph>
                        {<Image style={styles.arrow} source={require('../img/Mine/icon_mine_aboutmeituan@2x.png')} />}
                    </View>

                    <Separator />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    content: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    arrow: {
        width: 14,
        height: 14,
        marginLeft: 5,
    }
});

export default MineItemCell;