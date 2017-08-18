/**
 * Created by tianzhw on 2017/7/21.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,WebView
} from 'react-native';
import Row from '../component/horizontalItemRow';
import CutOffRule from '../component/cutOffRule';//分割线
import Utils from '../utils/utils';
export default class HelpCenter extends Component {
    static navigationOptions = {
        title:'帮助中心'
    };


    render() {

        return (
            <View style={{flex:1, backgroundColor:'#FAFAFA'}}>

                <WebView style={{flex:1, marginTop:10}} source={this.props.navigation.state.params.src}></WebView>
            </View>
        );
        // return (
        //     <View style={{flex:1}}>
        //         <View style={{marginTop:5, backgroundColor:'#fff',flex:1}}>
        //             <Row imageStyle={{width:23, height:23, marginRight:8}} icon={require('./../../images/help.png')} name="完成减肥餐的奖励政策" click={()=>{
        //
        //             }}/>
        //             <CutOffRule />
        //             <Row imageStyle={{width:23, height:23, marginRight:8}} icon={require('./../../images/help.png')} name="完成减肥餐的奖励政策" click={()=>{
        //
        //             }}/>
        //             <CutOffRule />
        //             <Row imageStyle={{width:23, height:23, marginRight:8}} icon={require('./../../images/help.png')} name="完成减肥餐的奖励政策" click={()=>{
        //
        //             }}/>
        //             <CutOffRule />
        //             <Row imageStyle={{width:23, height:23, marginRight:8}} icon={require('./../../images/help.png')} name="完成减肥餐的奖励政策" click={()=>{
        //
        //             }}/>
        //             <CutOffRule />
        //         </View>
        //     </View>
        // );
    }
}