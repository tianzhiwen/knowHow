/**
 * Created by tianzhw on 2017/7/10.
 */
import React,{Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity
} from 'react-native';
import Utils from '../utils/utils';
/**
 * 用于现实标题组件
 */
export default class titleBar extends Component{

    constructor(props){
        super(props);
    }


    render(){

        if(this.props.iconRight && this.props.iconLeft){
            return(
                <View style={[styles.container, this.props.style]}>
                    <TouchableOpacity style={styles.titleLeft} onPress={this.props.backClick ? this.props.backClick : ()=>{}}>
                        <Image style={styles.icon2} source={this.props.iconLeft}/>
                    </TouchableOpacity>

                    <View style={styles.titleContent}>
                        <Text style={styles.titleFontStyle}>{this.props.title}</Text>
                    </View>

                    <TouchableOpacity style={styles.titleRight} onPress={this.props.rightClick ? this.props.rightClick : ()=>{}}>
                        <Image style={styles.icon} source={this.props.iconRight}/>
                    </TouchableOpacity>

                </View>
            );
        }else if (!this.props.iconRight && this.props.iconLeft){
            return(
                <View style={[styles.container, this.props.style]}>
                    <TouchableOpacity style={styles.titleLeft}  onPress={this.props.backClick ? this.props.backClick : ()=>{}}>
                        <Image style={styles.icon2} source={this.props.iconLeft}/>
                    </TouchableOpacity>

                    <View style={styles.titleContent}>
                        <Text style={styles.titleFontStyle}>{this.props.title}</Text>
                    </View>

                    <View style={styles.titleRight}>

                    </View>

                </View>
            );
        }else if (this.props.iconRight && !this.props.iconLeft){
            return(
                <View style={[styles.container, this.props.style]}>
                    <View style={styles.titleLeft}>

                    </View>

                    <View style={styles.titleContent}>
                        <Text style={styles.titleFontStyle}>{this.props.title}</Text>
                    </View>

                    <View style={styles.titleRight}>
                        <Image style={styles.icon} source={this.props.iconRight}/>
                    </View>

                </View>
            );
        }else{
            return(
                <View style={[styles.container, this.props.style]}>
                    <View style={styles.titleLeft}>

                    </View>

                    <View style={styles.titleContent}>
                        <Text style={styles.titleFontStyle}>{this.props.title}</Text>
                    </View>

                    <View style={styles.titleRight}>

                    </View>

                </View>
            );
        }


    }
}

const styles = StyleSheet.create({
    container:{
        height:44,
        flexDirection:'row',
        padding:5,
        backgroundColor:"#fff"
    },
    titleLeft:{
        width:Utils.size.width * 0.1,
        justifyContent:'center',
        alignItems:'center',
    },
    titleRight:{
        width:Utils.size.width * 0.1,
        justifyContent:'center',
        alignItems:'center',
    },
    titleContent:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    icon:{
        width:38 * Utils.pixel * 2,
        height:40 * Utils.pixel * 2,
        resizeMode:'contain'
    },
    icon2:{
        width:19 * 3 * Utils.pixel,
        height:18 * 3 * Utils.pixel,
        resizeMode:'contain'
    },
    titleFontStyle:{
        fontSize:17 ,
        fontWeight:'100',
        color:'#333333'
    }
});

