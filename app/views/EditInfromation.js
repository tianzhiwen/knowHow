/**
 * Created by tianzhw on 2017/7/26.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,DeviceEventEmitter
} from 'react-native';
import Utils from './../utils/utils';
import EditPhoneView from '../component/editPhoneView';
import CutOffRule from '../component/cutOffRule';//分割线
import EditButton from '../component/editButton';
import SwitchUser from '../component/switchUser';

import AlertComponent from './../component/AlertComponent';

let that;

export default class EditInfromation extends Component {

    static navigationOptions = {
        title:'修改个人信息',
        headerTitleStyle:{alignSelf:'center'},
        headerRight: <TouchableOpacity onPress={() => {
                that.menuShow();
        }}><Image
            style={{width:30, height:30, resizeMode:'contain', marginRight:10}}
            source={require('./../../images/reportmore.png')}
        /></TouchableOpacity>
    };

    constructor(props){
        super(props);
        this.state={
            listData:this.props.navigation.state.params ? this.props.navigation.state.params.familyList : [],//当前家庭列表
            data:this.props.navigation.state.params ? this.props.navigation.state.params.familyList[0] : {},//家庭成员第一个人 默认选中
            alterMessage:''
        }
        this._SwitchIcon.bind(this);
        this._renderRow.bind(this);
        this.menuShow.bind(this);
        that = this;
    }




    menuShow(){
        this.refs.switchUser._setModalVisible(true);
    }

    render() {

        const icon = this._SwitchIcon(this.state.data.roleName);
        const name = this.state.data.alias;

        let roleName
        switch (this.state.data.roleName){
            case 'zhishi_user_role_baobao':
                roleName ='宝宝';
                break
            case 'zhishi_user_role_nvbaobao':
                roleName = '女宝宝';
                break
            case 'zhishi_user_role_baba':
                roleName = '爸爸';
                break
            case 'zhishi_user_role_mama':
                roleName = '妈妈';
                break
        }

        // const roleView = this._renderRow('角色类别',name);
        const weightView = this._renderRow('体重',this.state.data.weight, ()=>{

            let temp = this.state.data;
            temp.type = 'update';
            temp.callback = (data)=>{
                // this.state.data = data
                this.setState({
                    data:data
                });

            }
            this.props.navigation.navigate('editHW',temp);

        });
        const heightView  = this._renderRow('身高',this.state.data.heigth, ()=>{
            let temp = this.state.data;
            temp.type = 'update';
            temp.callback = (data)=>{
                // this.state.data = data
                this.setState({
                    data:data
                });

            }
            this.props.navigation.navigate('editHW',temp);
        });
        const birthday  = this._renderRow('出生年月日',this.state.data.birthday, ()=>{
            let temp = this.state.data;
            temp.type = 'update';
            temp.callback = (data)=>{
                // this.state.data = data
                this.setState({
                    data:data
                });

            }
            this.props.navigation.navigate('editBirthday',temp);
        });

        return (
            <ScrollView style={styles.container} >

                <AlertComponent ref="alert" title="提示" message={this.state.alterMessage} mode="alert"  click={()=>{
                   //this.props.navigation.goBack();
                }}/>

                <SwitchUser ref="switchUser"  list={this.state.listData} switchClick={(it)=>{
                    this.setState({
                        data:it
                    });
                }}/>
                <EditPhoneView icon={icon} name={name} phone={this.state.data.phone} nameChange={(name)=>{
                    this.state.data.alias = name
                }} phoneChange={(phone)=>{
                    this.state.data.phone = phone
                }}/>
                <View style={styles.viewStyle}>
                    <View style={{height:60, flexDirection:'row', justifyContent:'space-between', padding:5, backgroundColor:'#fff'}}>
                        <View style={{height:60 , justifyContent:'center'}}>
                            <Text>角色类别</Text>
                        </View>
                        <View style={{height:60 , justifyContent:'center'}}>
                            <Text>{roleName}</Text>
                        </View>
                    </View>
                    <CutOffRule/>
                    {weightView}
                    <CutOffRule/>
                    {heightView}
                    <CutOffRule/>
                    {birthday}
                    <CutOffRule/>
                </View>
                <View style={{ alignItems:'center', marginTop:15}}>
                    <EditButton text="修改信息" click={()=>{
                        this._netUpdateData()
                }}/>
                </View>
            </ScrollView>
        );
    }

    _renderRow(title, value, click){
        return(
            <TouchableOpacity style={{height:60, flexDirection:'row', justifyContent:'space-between', padding:5, backgroundColor:'#fff'}} onPress={()=>{
                click();
            }}>
                <View style={{height:60 , justifyContent:'center'}}>
                    <Text>{title}</Text>
                </View>
                <View style={{height:60 , justifyContent:'center'}}>
                    <Text>{value}</Text>
                </View>
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


   _netUpdateData(){

        if (Utils.checkPhone(this.state.data.phone)){
            let request = {
                dataType:'modifyMemberOfFamily',
                userToken: user.userToken,
                data:[this.state.data]
            }

            Utils.post(Utils.baseNet + Utils.addFailmy, user.userToken, request, (data)=>{
                console.log('error', data);
                if (data[0].state > 0){
                    this.refs.alert.show('提示', '更新成功');
                }else{
                    this.refs.alert.show('提示', '服务器有卡了，在更新一次');
                }
            }, (e)=>{
                console.log('error', e);
                this.refs.alert.show('提示', '服务器有点忙，稍后再试');
            });
        }

   }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FAFAFA",
    },
    viewStyle:{
        marginTop:10,
        backgroundColor:'#fff'
    }
});