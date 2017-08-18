/**
 * Created by tianzhw on 2017/7/21.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';

export default class mine extends Component{
    render() {
        const screenWidth= Dimensions.get("window").width;
        const screenHeight = Dimensions.get("window").height;
        return (
            <View style={styles.contain}>
                <StatusBar backgroundColor="#99D9CB" />
                <View style={{position:'absolute',height: screenHeight*.3}}>
                    <View style={{position:'absolute', height:screenHeight*.15, backgroundColor:"#99D9CB", width:screenWidth}}>
                    </View>
                    <View style={{position:'absolute',alignItems:'center'}}>
                        <View style={{height:screenHeight*.2, backgroundColor:"#fff", width:screenWidth - 20,
                                marginLeft:10, marginRight:10, top:50, borderRadius:16}}>
                        </View>

                        <Image style={{position:'absolute',width:60, height:60, borderRadius:30, top:20, left:screenWidth/2-70}} source={require('./images/baba.png')}/>
                        <Image style={{position:'absolute',width:60, height:60, borderRadius:30, top:20, right:screenWidth/2-70}} source={require('./images/baba.png')}/>
                        <Image style={{position:'absolute',width:80, height:80, borderRadius:40, top:10}} source={require('./images/baba.png')}/>
                        <Text style={{position:'absolute', top:95}}>阿拉蕾</Text>
                        <View>
                            <Text>添加成员</Text>
                        </View>
                    </View>

                </View>
                <View>

                </View>


                <View style={{marginTop:screenHeight*.3, backgroundColor:'#fff', height: screenHeight*.7}}>


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contain:{
        flex:1
    }
});