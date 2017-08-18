/**
 * Created by tianzhw on 2017/7/14.
 * 下一步按钮
 */
import React,{Compnent} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
export default class NextButton extends Component{

    render(){
        return(

                <TouchableOpacity style={{marginTop:30,width:Utils.size.width*.5,
                height:30, backgroundColor:'#ff8c00', borderRadius:10,
                alignItems:'center', justifyContent:'center'}} onPress={this.props.click}>
                    <Text style={{color:'#fff'}}>下一步</Text>
                </TouchableOpacity>

        );
    }
}