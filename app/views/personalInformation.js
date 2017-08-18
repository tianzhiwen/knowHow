/**
 * Created by tianzhw on 2017/7/17.
 * 个人信息
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView
}from 'react-native';
import EditPhoneView from '../component/editPhoneView';
import Row from '../component/horizontalItemRow';
import Utils from '../utils/utils';
import CutOffRule from '../component/cutOffRule';//分割线
export default class personalInformation extends Component{
    static navigationOptions = {
        title:'个人信息',
    };

    render(){

        const sex = this.props.navigation.state.params.sex;
        const data = this.props.navigation.state.params.data;


        return(
            <View style={styles.container}>
                <EditPhoneView icon={sex} name={data.alias}/>
                <ScrollView style={styles.layout} showsVerticalScrollIndicator={false}>
                    <Row name="记录体重身高" icon={require('./../../images/mine.png')} click={()=>{
                        alert('记录体重身高');
                    }}/>
                    <CutOffRule/>
                    <Row name="填写问卷" icon={require('./../../images/mine.png')} click={()=>{
                         global.nav.navigate('Questionnaire',{data: data});
                    }}/>
                    <CutOffRule/>
                    <Row name="查看身高体重数据" icon={require('./../../images/mine.png')} click={()=>{
                        alert('查看身高体重数据');
                    }}/>
                    <CutOffRule/>
                    <Row name="查看个人问卷" icon={require('./../../images/mine.png')} click={()=>{
                        alert('查看个人问卷');
                    }}/>
                    <CutOffRule/>
                    <Row name="修改个人信息" icon={require('./../../images/mine.png')} click={()=>{
                        alert('修改个人信息');
                    }}/>
                    <CutOffRule/>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    layout:{
        flex:1,
        marginTop:10,
        backgroundColor:'#fff'
    }
});