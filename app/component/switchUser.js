/**
 * Created by tianzhw on 2017/7/26.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import Utils from './../utils/utils';
export default class switchUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            animationType: 'none',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
        }
        this._setModalVisible.bind(this);
        this._renderScrollView.bind(this);
        this._renderSubView.bind(this);
        this._SwitchIcon.bind(this);
    }

    _setModalVisible = (visible) => {

        if (this.state.modalVisible){
            this.setState({ modalVisible: false });
        }else{
            this.setState({ modalVisible: true });
        }
    }

    render() {

        let content = this._renderScrollView();
        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => {this.setState({ modalVisible: false }); } }
                >
                <View style={{flex:1}} >
                    <TouchableOpacity style={{backgroundColor:'rgba(0, 0, 0, 0)', height: 60}} onPress={()=>{
                        this.setState({ modalVisible: false });
                        }}>

                    </TouchableOpacity>
                    <View style={{backgroundColor:'#fff', height: 68}}>
                        {content}
                    </View>
                    <TouchableOpacity style={{backgroundColor:'rgba(0, 0, 0, 0.5)', height: 60,flex:1}} onPress={()=>{
                        this.setState({ modalVisible: false });
                        }}>

                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }

    _renderScrollView(){

        const views = [];

        this.props.list.map((data)=>{
            views.push(
               this._renderSubView(data)
            );
        });

        return(
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {views}
            </ScrollView>
        );
    }

    _renderSubView(data){

        const icon = this._SwitchIcon(data.roleName);

        return(
            <TouchableOpacity key={data.id} style={{width:60, margin:4, alignItems:'center'}} onPress={()=>{
                this.setState({ modalVisible: false });
                this.props.switchClick(data);
            }}>
                <Image style={{width:45, height:45}} source={icon}/>
                <Text style={{color:'#999999', fontSize: 10}}>{data.alias}</Text>
            </TouchableOpacity>
        );
    }


    _SwitchIcon(roleName){
        let icon = require('./../../images/mama.png');
        switch (roleName){
            case 'zhishi_user_role_baobao':
                icon = require('./../../images/baobao.png');
                break
            case 'zhishi_user_role_nvbaobao':
                icon = require('./../../images/nvbaobao.png');
                break
            case 'zhishi_user_role_baba':
                icon = require('./../../images/baba.png');
                break
            case 'zhishi_user_role_mama':
                icon = require('./../../images/mama.png');
                break
        }
        return icon;
    }
}