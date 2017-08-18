/**
 * Created by tianzhw on 2017/8/7.
 * 提示信息组件
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Utils from './../utils/utils';
import EditButton from './../component/editButton';
import CutOffRule from './../component/cutOffRule';
export default class AlertComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            animationType: 'none',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            mode: 'alert', // alert confirm progress
            title: this.props.title,
            message : this.props.message
        }
    }

    show(title, message){

        if (!title && !message){
            this.setState({
                modalVisible:true
            });
        }else if(title && message){
            this.setState({
                message : message,
                title : title,
                modalVisible:true,
            });
        }


    }

    hide(){
        this.setState({
            modalVisible:false
        });
    }

    render() {
        let content = <View></View>;
        let isClick = true;
        switch (this.props.mode){
            case 'alert'://消息提示
                content = this._renderAlertMessage(this.state.title, this.state.message);
                break;
            case 'confirm'://确认取消选择提示
                content = this._renderConfirmView(this.state.title, this.state.message);
                break;
            case 'progress'://网络进度
                isClick = false;
                content = this._readerActivityIndicatorView();
                break;
        }

        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => { isClick ? this.setState({ modalVisible: false }):'' } }
            >
                <TouchableOpacity style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.5)',justifyContent:'center', alignItems:'center'}} onPress={()=>{
                    isClick ? this.setState({ modalVisible: false }):''
                }}>
                    {content}
                </TouchableOpacity>
            </Modal>
        );
    }

    /**
     * 提示信息
     * @returns {XML}
     * @private
     */
    _renderAlertMessage(title, message){
        return(
            <View style={{width: Utils.size.width * .75, height: Utils.size.height * .3, backgroundColor:'#fff', padding: 8, alignItems:'center', borderRadius: 10}}>
                <Text style={{color: '#333333', fontSize: 18, marginBottom: 8}}>{title}</Text>
                <CutOffRule />
                <View style={{height:  Utils.size.height * .15, alignItems: 'center', justifyContent:"center"}}>
                    <Text style={{color: '#666666', fontSize: 16, marginBottom: 8}}>{message}</Text>
                </View>

                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <EditButton click={()=>{
                        this.setState({ modalVisible: false });
                        this.props.click ? this.props.click() : '';
                    }} text="确定" />
                </View>
            </View>
        );
    }


    _readerActivityIndicatorView(){
        return(
            <View style={{width: Utils.size.width , height: Utils.size.height , justifyContent:'center', alignItems:'center'}}>

                <ActivityIndicator color="#96D8CA"
                                   style={[{height: 80}]}
                                   size="large"/>
            </View>
        );
    }


    _renderConfirmView(title, message){
        return(
            <View style={{width: Utils.size.width * .75, height: Utils.size.height * .3, backgroundColor:'#fff', padding: 8, alignItems:'center', borderRadius: 10, borderWidth: 1 * Utils.pixel, borderColor:'#99D9CB'}}>
                <Text style={{color: '#333333', fontSize: 16, marginBottom: 8}}>{title}</Text>
                <CutOffRule />
                <View style={{height:  Utils.size.height * .17, alignItems: 'center', justifyContent:"center"}}>
                    <Text style={{color: '#666666', fontSize: 16, marginBottom: 8}}>{message}</Text>
                </View>

                <View style={{justifyContent:'center', alignItems:'center',flexDirection:'row', padding: 6}}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', flex:1}} onPress={()=>{
                         this.setState({ modalVisible: false });
                    }}>
                        <Text style={{color:'#666666', fontSize: 14}}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', flex:1}}  onPress={()=>{
                        this.setState({ modalVisible: false });
                        this.props.click ? this.props.click() : '';
                    }}>
                        <Text style={{color:'#666666', fontSize: 14}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}