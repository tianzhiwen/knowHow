/**
 * Created by tianzhw on 2017/7/11.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,Image, ScrollView
} from 'react-native';
import Utils from './../utils/utils';
export default class selection extends Component{

    static navigationOptions = {
        header:null,
        // tabBarLabel: '知食甄选',
        // tabBarIcon: ({tintColor, focused }) => (
        //     <View>
        //         <Image
        //             style={styles.icon}
        //             source={focused ? require('./../../images/jyz_partner.png') : require('./../../images/partner.png')}
        //         />
        //     </View>
        // ),
    };

    render(){
        return(
            <ScrollView ref="scrollView" showsHorizontalScrollIndicator={false} horizontal={true}>
                {/*<View style={{width: Utils.size.width, backgroundColor:'red'}}></View>*/}
                {/*<View style={{width: Utils.size.width , backgroundColor:'back'}}></View>*/}
                {/*<View style={{width: Utils.size.width , backgroundColor:'blue'}}></View>*/}
                {/*<View style={{width: Utils.size.width , backgroundColor:'red'}}></View>*/}
            </ScrollView>
        );

    }


    componentDidMount(){
        setTimeout(()=>{
            this.refs.scrollView.scrollTo({x: 120, animated:true});
        }, 1000);
    }

}

const styles = StyleSheet.create({
    icon:{
        width:20,
        height:20,
    }
});