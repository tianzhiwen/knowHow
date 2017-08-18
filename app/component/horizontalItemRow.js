/**
 * Created by tianzhw on 2017/7/17.
 * 左侧图片 后面文字  右侧箭头的一个可点击的item
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Utils from '../utils/utils';

export default class horizontalItemRow extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity style={styles.container} onPress={
                this.props.click
            }>
                <View style={{flexDirection:'row', alignItems:"center", justifyContent:'center'}}>
                    <View style={{alignItems:"center", justifyContent:'center'}}>
                        <Image style={this.props.imageStyle ? this.props.imageStyle : styles.imageStyle} source={this.props.icon}></Image>
                    </View>
                    <View style={{alignItems:"center", justifyContent:'center'}}>
                        <Text style={styles.textStyle}>{this.props.name}</Text>
                    </View>
                    <View style={{alignItems:"center", justifyContent:'center'}}>
                        <Image style={[styles.imageStyle2]} source={require('./../../images/list.png')}></Image>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        height: 54,
        padding:4,
        justifyContent:'center'
    },
    imageStyle:{
        width:85 * Utils.pixel,
        height:85 * Utils.pixel,
        marginRight:8
    },
    textStyle:{
        color:'#282828',
        fontSize:14,
        width: Utils.size.width - 8 - 2 * (75 * Utils.pixel) - 10
    },
    imageStyle2:{
        width:16 * Utils.pixel * 2,
        height:31 * Utils.pixel * 2,
        marginRight:8
    }

});