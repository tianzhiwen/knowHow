/**
 * Created by tianzhw on 2017/8/2.
 * 代金券
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Modal,
    TouchableOpacity
} from 'react-native';
export default class CashCoupon extends Component {

    constructor(props){
        super(props);
        this.state = {
            animationType: 'none',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
        }
    }

    _setModalVisible = (visible) => {

        if (this.state.modalVisible){
            this.setState({ modalVisible: false });
        }else{
            this.setState({ modalVisible: true });
        }
    }

    render() {
        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => {this.setState({ modalVisible: false }); } }
            >
                <TouchableOpacity style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.5)',justifyContent:'center', alignItems:'center'}} onPress={()=>{
                    this.setState({ modalVisible: false });
                }}>
                    <View style={{width: 249}}>
                        <View style={{height:59, backgroundColor:'#f4532f',alignItems:'center', borderTopLeftRadius: 10, borderTopRightRadius: 10,paddingBottom:30}}>
                            <Text style={{color:'#fff', fontSize:16, marginTop:10, marginBottom: 8}}>恭喜您</Text>
                            <Text style={{color:'#fff', fontSize:12,  marginBottom: 8}}>轻松获得3张优惠券</Text>
                        </View>
                        <View style={{ paddingTop:15, paddingBottom:15, backgroundColor:'#fff', borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                            {/*<ScrollView>*/}
                                <View style={{backgroundColor:'#fff', flexDirection:'row', padding: 4, paddingLeft: 25, paddingRight:40, justifyContent:'space-between', alignItems:'center'}}>
                                    <Image style={{marginLeft: 15, marginRight:15, position:'absolute'}} source={require('./../../images/ccbg.png')}/>
                                    <View style={{ flexDirection:'row'}}>
                                        <Text style={{color:'#f4532f', fontSize:10}}>￥</Text><Text style={{color:'#f4532f', fontSize:36}}>50</Text>
                                    </View>
                                    <Text style={{color:'#565656', fontSize:12.5}}>专家圈子券</Text>
                                </View>


                            {/*</ScrollView>*/}
                        </View>

                    </View>

                </TouchableOpacity>
            </Modal>
        );
    }
}