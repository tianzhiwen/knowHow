/**
 * Created by tianzhw on 2017/7/31.
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
import SelectData from './../component/SelectData';
import Utils from './../utils/utils';
export default class guide3 extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:''
        }
    }

    render() {
        let image;
        if(this.props.navigation.state.params.sex == 3){
            image = require('./../../images/n_nvbaobao.png');
        }else if(this.props.navigation.state.params.sex == 4){
            image = require('./../../images/n_baobao.png');
        }




        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View style={{height : Utils.size.height / 3.5, justifyContent:'center', alignItems:'center'}}>
                    <Image style={{width:100, height:100}}  source={image}/>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={{color:'#96D8CA'}}>宝宝的出生日期</Text>
                </View>
                <View style={{height: 250, alignItems:'center',justifyContent:'center'}}>
                    <SelectData result={(year, month, day)=>{


                        this.setState({
                            data: year + "-" + month + "-" + day
                        })

                    }}/>
                </View>
                <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>

                    <TouchableOpacity style={{marginBottom:25,width:Utils.size.width*.5,
                            height:30, backgroundColor:'#96D8CA', borderRadius:10, marginTop: 50, elevation:4,
                            alignItems:'center', justifyContent:'center'}} onPress={()=>{
                                {/*store.save({*/}
                                       {/*key:'navigation',*/}
                                       {/*data:{*/}
                                           {/*isUpdate: false,*/}
                                           {/*phone: '',*/}
                                           {/*alias: this.props.navigation.state.params.sex == 3 ? "女宝宝" : '男宝宝',*/}
                                           {/*height : this.state.cm,*/}
                                           {/*weight: this.state.kg,*/}
                                           {/*sex : this.props.navigation.state.params.sex,*/}
                                           {/*birthday: this.state.data,*/}
                                           {/*roleName: this.props.navigation.state.params.sex == 3 ? 'zhishi_user_role_nvbaobao' : 'zhishi_user_role_baobao'*/}
                                       {/*}*/}
                                   {/*}).then(()=>{*/}
                                         {/*nav.navigate('Home');*/}
                                   {/*}).catch((e)=>{*/}

                                   {/*});*/}



                                nav.navigate('Guide2', { sex : this.props.navigation.state.params.sex, date: this.state.data});
                            }}>
                        <Text style={{color:'#fff'}}>下一步</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}