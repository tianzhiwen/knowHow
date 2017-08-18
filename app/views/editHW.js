/**
 * Created by tianzhw on 2017/7/14.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,TouchableOpacity,DeviceEventEmitter
} from 'react-native';
import Utils from '../utils/utils';
import Ruler from '../component/ruler';
import EditButton from '../component/editButton';
import AlertComponent from './../component/AlertComponent';
export default class editHW extends Component{

    static navigationOptions = {
        title:'完善信息',
    };

   constructor(props){
       super(props);
       this.state = {
           data: this.props.navigation.state.params,
           weight: this.props.navigation.state.params.weight ? this.props.navigation.state.params.weight: 0,
           height: this.props.navigation.state.params.heigth ? this.props.navigation.state.params.heigth : 0,
           type: this.props.navigation.state.params.type ? this.props.navigation.state.params.type : "new"
       }
   }

    //
    // componentWillMount(){
    //     global.store.load({
    //         key:'userState'
    //     }).then(data =>{
    //         global.user = data;
    //     }).catch(error=>{
    //     });
    // }


   render(){

       let button = this.state.type == 'new' ? '下一步' : '修改';

       let height = this.props.navigation.state.params.heigth ? this.props.navigation.state.params.heigth : 20 ;
       let weight = this.props.navigation.state.params.weight ? this.props.navigation.state.params.weight : 20;

       return(
           <View style={{flex:1, backgroundColor:'#fff', alignItems:'center'}}>
               <AlertComponent ref="alert" title="提示" message={this.state.alertMessage} mode="alert"  click={()=>{
                   //
                }}/>

               <Ruler index={height} range={[10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200]} unit="身高" type="CM" call={(text)=>{
                   console.log('data', text);
                    this.setState({
                       height: text
                    });
               }}/>

               <Ruler index={weight} range={[10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200]} unit="体重" type="KG" call={(text)=>{
                    console.log('data', text);
                    this.setState({
                        weight:text
                    });
               }}/>




               <View style={{flex:1, alignItems:'center', marginTop:5}}>
                   <EditButton text={button} click={()=>{
                       this._buttonClick()
                }}/>
               </View>
           </View>

       );
   }


   _buttonClick(){
       if (this.state.type == 'new'){
           if (this.state.height > 0 && this.state.weight > 0){
               let data = this.state.data;
               data.userToken = user.userToken
               data.data[0].height = this.state.height;
               data.data[0].weight = this.state.weight;


               this.props.navigation.navigate('editBirthday', data);
           }
       }else{
           let data = this.state.data;

           data.heigth = this.state.height;
           data.weight = this.state.weight;



           let request = {
                dataType:'modifyMemberOfFamily',
                userToken: user.userToken,
                data:[data]
            }

            console.log('send', request);

           // DeviceEventEmitter.emit('changeData', data)//emit('changeAvatar’,avatarUrl);



           Utils.post(Utils.baseNet + Utils.addFailmy, user.userToken, request, (result)=>{

               console.log('tianzhw net ', result);
               if (result[0].state > 0){
                   this.props.navigation.state.params.callback(data);

                   this.props.navigation.goBack();
               }else{
                   this.refs.alert.show('提示', '服务器有点忙，稍后再试');
               }
           }, (e)=>{
                console.log('tianzhw net ', e);
               this.refs.alert.show('提示', '服务器有点忙，稍后再试');
           });
       }
   }

}