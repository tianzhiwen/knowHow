/**
 * Created by tianzhw on 2017/8/1.
 * 已购买列表
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';
import Utils from './../utils/utils';
import CutOffRule from './../component/cutOffRule';
export default class emption extends Component {

    static navigationOptions = {
        title:'已购买',
        headerTitleStyle:{alignSelf:'center'},
        headerRight: <View style={{width:30, height:30,marginRight:10}}></View>
    };


    render() {

        let views = [];

        for (let i=0; i< 16; i++){
            views.push(
                this._renderRow(i)
            );
        }


        return (
            <View style={{flex:1, backgroundColor:'#FAFAFA'}}>

                <ScrollView style={{backgroundColor:'#fff', marginTop:10}}>
                    {views}
                </ScrollView>
            </View>
        );
    }

    _renderRow(i){
        return(
            <View key={i}>
                <View  style={{flexDirection:'row', padding: 8, alignItems:'center', height: 71}}>
                    <Image source={require('./../../images/findBanner5.jpg')} style={{width: 40, height: 40 , borderRadius: 20 }}/>
                    <View style={{padding: 4}}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', width: Utils.size.width - 58}}><Text style={{fontSize: 15, color:'#333333'}}>12999</Text><Text style={{fontSize: 10, color:'#999999'}}>17-08 12:12</Text></View>
                        <View style={{flex:1}}><Text style={{fontSize: 12, color:'#666666', marginTop:8}}>个人方案购买</Text></View>
                    </View>
                </View>
                <CutOffRule/>
            </View>

        );
    }
}