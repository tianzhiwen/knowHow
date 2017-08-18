/**
 * Created by tianzhw on 2017/7/17.
 * 添加成员下一步和完成按钮
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Utils from '../utils/utils';

export default class EditButton extends Component{

    constructor(props){
        super(props);
        this.state={
            text: this.props.text,
            click: this.props.click
        }
    }


    render(){
        return(
            <TouchableOpacity style={{marginBottom:25,width:163,
                height:40, backgroundColor:'#99D9CB', borderRadius:20,
                alignItems:'center', justifyContent:'center'}} onPress={this.state.click}>
                <Text style={{color:'#fff', fontSize:15}}>{this.state.text}</Text>
            </TouchableOpacity>
        );
    }
}