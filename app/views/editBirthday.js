/**
 * Created by tianzhw on 2017/7/17.
 * 编辑出生年月日
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import Utils from '../utils/utils';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import EditButton from '../component/editButton';

import SelectData from './../component/SelectData';

import ScrollSelectView from './../component/ScrollSelectView';

import AlertComponent from './../component/AlertComponent';

export default class editBirthday extends Component{
    static navigationOptions = {
        title:'完善信息',
    };
    constructor(props){
        super(props);
        const date = new Date();
        this.state={
            data: this.props.navigation.state.params,
            selected:[],
            year : this.props.navigation.state.params.birthday? this.props.navigation.state.params.birthday.split('-')[0] : date.getFullYear(),
            month :  this.props.navigation.state.params.birthday? this.props.navigation.state.params.birthday.split('-')[1]: date.getMonth() + 1,
            day : this.props.navigation.state.params.birthday? this.props.navigation.state.params.birthday.split('-')[2] : date.getDate(),
            type : this.props.navigation.state.params.type ? this.props.navigation.state.params.type : 'new',
            alertMessage:''
        }
        this._postDataToServer.bind(this);
    }



    render(){

        let params = this.state.type == 'new' ? {} : {
                year:this.props.navigation.state.params.birthday.split('-')[0],
                month:this.props.navigation.state.params.birthday.split('-')[1],
                day:this.props.navigation.state.params.birthday.split('-')[2],
            }


        return(
            <View style={{flex:1}}>

                <AlertComponent ref="alert" title="提示" message={this.state.alertMessage} mode="alert"  click={()=>{
                   //
                }}/>

                <View style={{marginTop: 10, backgroundColor:'#fff', paddingBottom:20, paddingTop:10}}>
                    <View style={{alignItems: 'center' }}><Text style={{fontSize: 14, color:'#333333'}}>出生年月日</Text></View>
                    <View style={{alignItems: 'center' }}><Text style={{fontSize: 12, color:'#99D9CB'}}>{this.state.year}年{this.state.month}月{this.state.day}日</Text></View>
                </View>

                <SelectData {...params} result={(year, month, day)=>{

                     this.setState({
                         year: year,
                         month : month,
                         day: day
                     });
                }}/>

                <View style={{alignItems:'center', backgroundColor:'#fff'}}>
                                    <EditButton text="完成" click={()=>{
                                            if (this.state.type == 'new'){
                                                this._postDataToServer();
                                            }else{
                                                this._postUpdate();
                                            }
                                     }}/>
                </View>


            </View>
        );
    }


    // render(){
    //     return(
    //         <View style={{flex:1, backgroundColor:'#fff'}}>
    //             <Calendar
    //                 // 最初可见月份 默认 Date() Initially visible month. Default = Date()
    //                 //current={'2012-03-01'}
    //                 // 最小显示日期 Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
    //                 minDate={'2012-05-10'}
    //                 //选择日事件 Handler which gets executed on day press. Default = undefined
    //                 onDayPress={(day) => {
    //                     this.setState({
    //                         selected:[day.dateString]
    //                     });
    //                 }}
    //                 //选择月事件 Handler which gets executed when visible month changes in calendar. Default = undefined
    //                 onMonthChange={(month) => {
    //                     {/*this.setState({*/}
    //                         {/*selected:[month.dateString]*/}
    //                     {/*});*/}
    //                 }}
    //                 //隐藏月箭头 Hide month navigation arrows. Default = false
    //                 hideArrows={false}
    //                 //不要在月页上显示其他月份的天数。默认值为false Do not show days of other months in month page. Default = false
    //                 hideExtraDays={true}
    //                 // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
    //                 // day from another month that is visible in calendar page. Default = false
    //                 //如果hidearrows =虚假和hideextradays =假不分月当点击灰色
    //                 //从日历页中可见的另一个月份的日期。默认值为false
    //                 disableMonthChange={false}
    //
    //                 selected={this.state.selected}
    //             />
    //             <View style={{alignItems:'center'}}>
    //                 <EditButton text="完成" click={()=>{
    //
    //                     this._postDataToServer();
    //
    //                 }}/>
    //             </View>
    //
    //         </View>
    //     );
    // }

    _postDataToServer(){

            let data = this.state.data;
            const navigate = this.props.navigation.navigate;
            data.data[0].birthday = this.state.year + "-" + this.state.month + "-" + this.state.day;

            console.log('tianzhw', data);

            Utils.post(Utils.baseNet + Utils.addFailmy, user.userToken, data, (data)=>{

                console.log('tianzhw net ', data);

                navigate('Home');
            }, (e)=>{


                console.log('tianzhw net ', e);
                // this.setState({
                //     alertMessage:'服务器有点忙，稍后再试'
                // })

                this.refs.alert.show('提示', '服务器有点忙，稍后再试');
            });




    }


    _postUpdate(){

        this.state.data.birthday = this.state.year + "-" + this.state.month + "-" + this.state.day;

        let request = {
            dataType:'modifyMemberOfFamily',
            userToken: user.userToken,
            data:[this.state.data]
        }

        Utils.post(Utils.baseNet + Utils.addFailmy, user.userToken, request, (data)=>{

            if (data[0].state > 0){
                // this.setState({
                //     alertMessage: '更新成功'
                // })


                this.props.navigation.state.params.callback(this.state.data);
                this.props.navigation.goBack();

            }else{
                // this.setState({
                //     alertMessage: '服务器有卡了下，在更新一次'
                // })

                this.refs.alert.show('提示', '服务器有卡了下，在更新一次');
            }


        }, (e)=>{

            console.log('error', e);

            // this.setState({
            //     alertMessage:'服务器有点忙，稍后再试'
            // })

            this.refs.alert.show('提示', '服务器有点忙，稍后再试');
        });

    }
}