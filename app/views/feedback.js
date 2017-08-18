/**
 * Created by tianzhw on 2017/7/21.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import Utils from './../utils/utils';
export default class feedback extends Component {
    static navigationOptions = {
        title:'意见反馈',
    };
    render() {
        return (
            <View style={styles.container}>
               <View style={styles.viewStyle}>
                   <TextInput style={{fontSize: 14, color:'#999999', height: 225}} underlineColorAndroid="transparent" textAlignVertical='top' multiline={true} placeholder="请输入反馈内容" placeholderTextColor="#AAAAAA"/>

                   <View style={styles.viewStyle1}>
                       <View style={{flex:1,paddingLeft:5}}><Text style={{fontSize:14, color:'#333333'}}>联系方式：(选填)</Text></View>
                       <View style={{flex:1,alignItems:'center',justifyContent:'flex-end'}}><TextInput maxLength={10} underlineColorAndroid="transparent" style={{width:Utils.size.width / 3 + 30, fontSize:12, color:'#999999'}} placeholder="可填写QQ/微信/手机号" placeholderTextColor="#AAAAAA"/></View>
                   </View>
               </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FAFAFA',
        paddingTop:10
    },
    viewStyle:{
        backgroundColor:'#fff',
        flex:1
    },
    viewStyle1:{
        borderWidth: 1 * Utils.pixel,
        borderColor:'#D8D8D8',
        height: 60,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    viewStyle2:{

    }
});
