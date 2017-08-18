/**
 * Created by tianzhw on 2017/7/17.
 * 格尺组件
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    Image
} from 'react-native';
import Utils from '../utils/utils';

export default class Ruler extends Component{

    constructor(props){
        super(props);
        this.state={
            tag : 89,
            unit: this.props.unit,// 体重 或身高
            type : this.props.type,// CM Kg
            year:0,
            range:this.props.range //[10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200]
        }

    }

    render(){



        let radii = Utils.size.width / 2 - 80;

        let array = [];
        for(let i=0; i< this.state.range.length; i++){
            array.push(
                <View key={i} style={{flexDirection:'row'}}>
                    <View style={{height:8, width:1, backgroundColor:'#99D9CB', marginRight:7}}></View>
                    <View style={{height:8, width:1, backgroundColor:'#99D9CB', marginRight:7}}></View>
                    <View style={{height:8, width:1, backgroundColor:'#99D9CB', marginRight:7}}></View>
                    <View style={{height:8, width:1, backgroundColor:'#99D9CB', marginRight:7}}></View>
                    <View style={{height:8, width:1, backgroundColor:'#99D9CB', marginRight:7}}></View>
                    <View style={{height:8, width:1, backgroundColor:'#99D9CB', marginRight:7}}></View>
                    <View style={{height:8, width:1, backgroundColor:'#99D9CB', marginRight:7}}></View>
                    <View style={{height:8, width:1, backgroundColor:'#99D9CB', marginRight:7}}></View>
                    <View style={{height:8, width:1, backgroundColor:'#99D9CB', marginRight:7}}></View>
                    <View style={{alignItems:'center'}}>
                        <View style={{height:10, width:1, backgroundColor:'#99D9CB', marginRight:10}}></View>
                        <Text>{this.state.range[i]}</Text>
                    </View>
                </View>
            );
        }


        return(
            <View style={{height: Utils.size.height*.33,backgroundColor:'#fff', alignItems:'center'}}>
                <View style={{width: radii, height:radii, justifyContent:'center',
                alignItems:'center', marginTop:10, borderRadius:radii, borderColor:'#99D9CB', borderWidth:1}}>
                    <Text>{this.state.unit}</Text>
                    <Text>{this._resultText()}{this.state.type}</Text>
                </View>
                <Image style={{width:13 * Utils.pixel, height:40 * Utils.pixel}} source={require('./../../images/indicator.png')}></Image>

                <View style={{height:60}}>
                    <ScrollView ref="scrollView" showsHorizontalScrollIndicator={false}
                                onMomentumScrollEnd={(event)=>{this._handleEndDrag(event);}}
                                horizontal={true} style={{height:60,borderColor:'#99D9CB', borderTopWidth:1, borderBottomWidth:1, }}>
                        <View style={{height:8, width:Utils.size.width/2, marginRight:0}}></View>
                        {array}
                        <View style={{height:8, width:Utils.size.width/2, marginRight:0}}></View>
                    </ScrollView>
                </View>


            </View>
        );
    }


    componentDidMount(){
        setTimeout(()=>{
            if (this.props.index == 0){
                this.refs.scrollView.scrollTo({x:this.state.tag * 2, animated:false});

                this.state.year = this.state.tag * 2;

                let res = (this.state.year/this.state.tag);
                res = res.toFixed(3) * 10;

            }else{


                this.refs.scrollView.scrollTo({x:this.props.index / 10 * this.state.tag, animated:false});


                this.state.year = this.props.index / 10 * this.state.tag;

            }

            this.props.call(this._resultText());
        }, 0);

    }

    _handleEndDrag(event,_scrollView){
        var endposition = event.nativeEvent.contentOffset.x;//取得拖拉后的位置



        this.state.year = endposition;


        this.props.call ? this.props.call(this._resultText()) : '';


    }

    _resultText(){

        let res = (this.state.year/this.state.tag);
        res = res.toFixed(3) * 10;

        return Math.ceil(res);
    }
}