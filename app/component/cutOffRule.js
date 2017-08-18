/**
 * Created by tianzhw on 2017/7/18.
 * 分割线
 */
import React,{Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import Utils from '../utils/utils';

export default class cutOffRule extends Component{
    render(){
        return(
            <View style={{height:1* Utils.pixel, backgroundColor:"#E1E1E1", marginLeft:5}}></View>
        );
    }
}
