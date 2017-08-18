/**
 * Created by tianzhw on 2017/7/12.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text}
from 'react-native';
import Utils from '../utils/utils';
export default class item extends Component{
    constructor(props){
        super(props);
        this._rowHeard.bind(this);
        this._rowFoot.bind(this);
        this._rowContent.bind(this);
    }
    render(){
        //获取数据
        const itemData = this.props.data;
        //判断是否存在图片集合  集合可能为空 最多三张图片
        const isHaveImages = itemData.images.length > 0 ? true : false;

        //根据是否有图来控制row的高度
        let rowHeight = 0;

        const header = this._rowHeard();
        const foot = this._rowFoot();
        const content = this._rowContent(itemData);
        return(
            <View style={{marginTop:8, backgroundColor:'#fff'}}>
                {header}
                {content}
                {foot}
            </View>
        );
    }

    //提供统一的头部视图
    _rowHeard(){
        return(
            <View>
                <View style={{padding:5, flexDirection:'row', alignItems:'center'}}>
                    <Image style={{width:30, height:30, marginRight:5}} source={{uri:'http://101.201.142.49:8010/zhishi/static/newzhishi/images/tou4.png'}}/>
                    <View>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}><Text>协和营养师</Text><Text>进入圈子&gt</Text></View>
                        <View><Text>26分钟前</Text></View>
                    </View>
                </View>
                <Text style={{padding:5}}>您的BMI是：91.2，您的体重是：理想的。32%的与您同女</Text>
            </View>
        );
    }

    _rowFoot(){
        return(
            <View style={{padding:5,borderTopWidth: 1 * Utils.pixel, borderColor:'#a9a9a9', flexDirection:'row', marginTop:4}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', flex:1}}>
                    <Image style={{width:30 * Utils.pixel, height:30 * Utils.pixel, marginRight:10, resizeMode:'contain'}} source={require('./../../images/xh.png')}/><Text>34872873</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', flex:1, borderLeftWidth: 1 * Utils.pixel, borderRightWidth: 1 * Utils.pixel, borderColor:'#a9a9a9'}}>
                    <Image style={{width:30 * Utils.pixel, height:30 * Utils.pixel, marginRight:10, resizeMode:'contain'}} source={require('./../../images/tw.png')}/><Text>34872873</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', flex:1}}>
                    <Image style={{width:30 * Utils.pixel, height:30 * Utils.pixel, marginRight:10, resizeMode:'contain'}} source={require('./../../images/share.png')}/><Text>34872873</Text>
                </View>
            </View>
        );
    }


    _rowContent(data){

        let views = [];

        data.images.map((it)=>{

            const path = './../../images/' + it;

            views.push(
                <View key={it} style={{width:Utils.size.width/3, justifyContent:'center', alignItems:'center'}}>
                    <Image style={{width:100, height:100}} source={require('./../../images/can3.jpg')} />
                </View>
            );
        });


        return(
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                {views}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item:{
        height : 150
    }
});