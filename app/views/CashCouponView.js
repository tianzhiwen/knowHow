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
    Image
} from 'react-native';
import Utils from './../utils/utils';
export default class CashCouponView extends Component {

    static navigationOptions = {
        title:'优惠券',
    };

    render() {

        let list = [];

        for (let i=0; i< 5; i++){
            list.push(
                this._renderRow(99 + i)
            );
        }

        return (
            <ScrollView style={{marginTop: 10, backgroundColor:'#FAFAFA', paddingBottom: 10}}>
                {list}
            </ScrollView>
        );
    }


    _renderRow(money){
        return(
            <Image key={money} source={require('./../../images/ccbg.png')} style={{width: Utils.size.width - 30, height: 78, marginTop: 15, marginLeft:15, marginRight:15, justifyContent:'center'}}>
                <View style={{flexDirection:'row', paddingLeft: 20}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{color:'#f4532f', fontSize:15, position:'absolute', top:10}}>￥</Text>
                        <Text style={{color:'#f4532f', fontSize:30, marginLeft: 15}}>{money}</Text>
                    </View>
                    <View style={{flex:2, justifyContent:'center'}}>
                        <Text style={{color:'#565656', fontSize: 13, textAlign:'right'}}>个人评测券</Text>
                        <Text style={{color:'#999999', fontSize: 11,marginTop: 8, textAlign:'right'}}>有效期至2017-08-30</Text>
                    </View>
                    <View style={{width: 1 * Utils.pixel, height: 65, backgroundColor:'#E1E1E1', marginLeft: 8}}></View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingRight:20}}>
                        <View style={{ justifyContent:'center', alignItems:'center', padding: 6, borderRadius: 15, backgroundColor:'#99D9CB'}}>
                            <Text style={{color:'#fff', fontSize:12}}>立即使用</Text>
                        </View>
                    </View>
                </View>
            </Image>
        );
    }

}