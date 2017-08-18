/**
 * Created by tianzhw on 2017/7/17.
 * 公用组件编辑手机号姓名
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
} from 'react-native';
import Utils from '../utils/utils';
import CutOffRule from './cutOffRule';

export default class editPhoneView extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <View style={styles.iconLayout}>
                    <Image style={styles.icon}  source={this.props.icon}></Image>
                </View>

                <View style={{height:60, flexDirection:'row', justifyContent:'space-between', padding:5, backgroundColor:'#fff'}}>
                    <View style={{justifyContent:'center'}}>
                        <Text>昵称</Text>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <TextInput style={{width:140, textAlign:'right'}} placeholder={this.props.name} underlineColorAndroid="transparent" defaultValue={this.props.name}  onChangeText={(text)=>{
                           this.props.nameChange ? this.props.nameChange(text) :''
                        }}></TextInput>
                    </View>
                </View>
                <CutOffRule/>
                <View style={{height:60, flexDirection:'row', justifyContent:'space-between', padding:5, backgroundColor:'#fff'}}>
                    <View style={{justifyContent:'center'}}>
                        <Text>手机号码</Text>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <TextInput style={{width:135,textAlign:'right'}} keyboardType="numeric" placeholder='成人必须输入手机号' underlineColorAndroid="transparent" defaultValue={this.props.phone} onChangeText={(text)=>{
                           this.props.phoneChange ? this.props.phoneChange(text) :''
                        }}></TextInput>
                    </View>
                </View>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconLayout:{
        height:Utils.size.height * .25,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    icon:{
        width: Utils.size.width / 3,
        height:Utils.size.width / 3
    },
    contentLayout:{

        alignItems:'center',
    },
    contentLayoutRow:{
        flexDirection:'row',

        backgroundColor:'#fff',
        padding:5,
        justifyContent:'space-between'

    },
    contentLayoutRowView:{
        flex:1,

    }
});