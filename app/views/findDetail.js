/**
 * Created by tianzhw on 2017/7/31.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';
import TitleBar from './../component/titleBar';
export default class findDetail extends Component {

    render() {

        console.log(this.props.navigation.state.params.src);

        return (
            <View style={{flex:1, backgroundColor:'#FAFAFA'}}>
                <TitleBar title={this.props.navigation.state.params.title} iconLeft={require('./../../images/goback.png')} backClick={()=>{
                    this.props.navigation.goBack();
                }} />
                <WebView style={{flex:1, marginTop:10}} source={this.props.navigation.state.params.src}></WebView>
            </View>
        );
    }
}