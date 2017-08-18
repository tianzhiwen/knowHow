/**
 * Created by tianzhw on 2017/7/31.
 * 引导页面2
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Utils from './../utils/utils';
import ScrollSelectView from './../component/ScrollSelectView';
export default class guide2 extends Component {


    constructor(props){
        super(props);
        this.state = {
            cm:50,
            kg:50
        }
    }


    render() {

        let icon;


        switch (this.props.navigation.state.params.sex){
            case 3:
                icon = require('./../../images/n_nvbaobao.png');
                break;
            case 4:
                icon = require('./../../images/n_baobao.png');
                break;
        }


        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View style={{height : Utils.size.height / 3.5, justifyContent:'center', alignItems:'center'}}>
                    <Image style={{width:100, height:100}}  source={icon}/>
                </View>
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                        <View style={{width: 75, justifyContent:'center', alignItems:'center', backgroundColor:'#96D8CA', borderRadius: 10, padding:2}}>
                            <Text style={{color:'#fff'}}>身高</Text>
                        </View>

                        <View style={{width: 75, justifyContent:'center', alignItems:'center', backgroundColor:'#96D8CA', borderRadius: 10, padding:2}}>
                            <Text style={{color:'#fff'}}>体重</Text>
                        </View>

                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                        <ScrollSelectView selectIndex={50} itemHeight={40} startNum={1} endNum={200} width={50} result={data=>{


                            this.setState({
                                cm: data
                            })
                        }}/>

                        <ScrollSelectView selectIndex={50} itemHeight={40} startNum={1} endNum={150} width={50} result={data=>{
                            this.setState({
                                kg: data
                            });


                        }}/>


                        <Text style={{position:'absolute', height:40, width:30, left: Utils.size.width/2 - 60, top: 90, color:'#96D8CA'}}>cm</Text>


                        <Text style={{position:'absolute', height:40, width:30, right:25, top: 90, color:'#96D8CA'}}>kg</Text>
                    </View>

                </View>
                <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>

                    <TouchableOpacity style={{marginBottom:25,width:Utils.size.width*.5,
                            height:30, backgroundColor:'#96D8CA', borderRadius:10, marginTop: 50, elevation:4,
                            alignItems:'center', justifyContent:'center'}} onPress={()=>{

                                 store.save({
                                       key:'navigation',
                                       data:{
                                           isUpdate: false,
                                           phone: '',
                                           alias: this.props.navigation.state.params.sex == 3 ? "女宝宝" : '男宝宝',
                                           height : this.state.cm,
                                           weight: this.state.kg,
                                           sex : this.props.navigation.state.params.sex,
                                           birthday: this.props.navigation.state.params.data,
                                           roleName: this.props.navigation.state.params.sex == 3 ? 'zhishi_user_role_nvbaobao' : 'zhishi_user_role_baobao'
                                       }
                                   }).then(()=>{
                                         nav.navigate('Home');
                                   }).catch((e)=>{

                                   });



                                {/*nav.navigate('Guide3', {image : icon, cm : this.state.cm, kg: this.state.kg, sex : this.props.navigation.state.params.sex});*/}
                            }}>
                        <Text style={{color:'#fff'}}>完成</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}