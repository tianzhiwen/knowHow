/**
 * Created by tianzhw on 2017/8/3.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,TouchableOpacity
} from 'react-native';
import Utils from './../utils/utils';
import CutOffRule from './../component/cutOffRule';
export default class NewsList extends Component {

    static navigationOptions = {
        title:'消息',
    };

    render() {


        let views = [];

        views.push(
          this._renderRow(1)
        );
        return (
            <ScrollView style={{backgroundColor:'#FAFAFA', paddingTop:10}}>
                {views}
            </ScrollView>
        );
    }

    _renderRow(i){
        return(
            <TouchableOpacity key={i}>
                <View  style={{height: 55, flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding: 8, backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row',  alignItems:'center'}}>
                        <Image style={{width: 4, height:4, marginRight: 8}} source={require('./../../images/dian.png')} />
                        <Text style={{fontSize:14, color:'#333333'}}>完成减肥餐的奖励政策</Text>
                    </View>

                    <View style={{flexDirection:'row',  alignItems:'center'}}>
                        <Text style={{fontSize:12, color:'#999999', marginRight: 8}}>08-26 09:34</Text>
                        <Image style={{width:16 * Utils.pixel,height:31 * Utils.pixel}} source={require('./../../images/list.png')}></Image>
                    </View>
                </View>
                <CutOffRule/>
            </TouchableOpacity>
        );
    }
}