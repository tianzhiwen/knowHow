/**
 * Created by tianzhw on 2017/7/21.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Utils from './../utils/utils';
import Row from '../component/horizontalItemRow';
import CutOffRule from '../component/cutOffRule';//分割线
import EditButton from '../component/editButton';
import AlertComponent from './../component/AlertComponent';
export default class setting extends Component{

    static navigationOptions = {
        title:'设置'
    };


    render(){

        let data = [ {key:'HelpCenter', title:'帮助中心', src:{uri: 'http://101.201.142.49:8010/zhishi/a/newZhiShiMine/help', title:'帮助中心'}},  {key:'FeedBack', title:'意见反馈', src:{}},
            {key:'3', title:'清除缓存', src:{}},{key:'About', title:'关于我们', src:{}}];

        let views = [];

        data.map((it)=>{
            views.push(this._renderRow(it, ''));
        });

        return(
            <View style={styles.contain}>

                <AlertComponent ref="alert" title="提示" message='确定退出登陆?' mode="confirm"  click={()=>{
                   nav.navigate('Home');
                }}/>

                {views}
                <View style={{marginTop: 30}}>
                    <EditButton text="退出登陆" click={()=>{
                        this.refs.alert.show();
                }}/>
                </View>

            </View>
        );
    }

    _renderRow(title, str){
        return (
            <TouchableOpacity key={title.key} onPress={()=>{
                 this.props.navigation.navigate(title.key, title.src);
            }}>
                <View style={{height:60, flexDirection:'row', padding:8, alignItems:'center', justifyContent:'space-between', width:Utils.size.width}}>
                    <Text>{title.title}</Text>
                    <Image style={{width:16 * Utils.pixel * 3, height:31 * Utils.pixel * 3, resizeMode:'contain'}} source={require('./../../images/list.png')} />
                </View>
                <CutOffRule />
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    contain:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    row:{
        height: 60,
        justifyContent:'center',
    }
});