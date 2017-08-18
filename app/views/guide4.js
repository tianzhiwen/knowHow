/**
 * Created by tianzhw on 2017/7/31.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Utils from './../utils/utils';
export default class guide4 extends Component {
    render() {
        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View style={{height : Utils.size.height / 3.5, justifyContent:'center', alignItems:'center'}}>
                    <Image style={{width:100, height:100}}  source={this.props.navigation.state.params.image}/>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={{color:'#96D8CA'}}>给您的宝宝贴标签吧</Text>
                </View>
                <View style={{height: 250, alignItems:'center',justifyContent:'center'}}>

                </View>
                <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>

                    <TouchableOpacity style={{marginBottom:25,width:Utils.size.width*.5,
                            height:30, backgroundColor:'#96D8CA', borderRadius:10, marginTop: 50, elevation:4,
                            alignItems:'center', justifyContent:'center'}} onPress={()=>{

                            //{image : this.props.navigation.state.params.image, cm : this.state.cm, kg: this.state.kg, sex : this.props.navigation.state.params.sex, date: this.state.data}
                            global.isInit = true;
                             nav.navigate('Home');
                            }}>
                        <Text style={{color:'#fff'}}>完成</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}