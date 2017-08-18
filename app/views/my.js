/**
 * Created by tianzhw on 2017/7/11.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,Image,TouchableOpacity,ScrollView,Dimensions,StatusBar,ActivityIndicator
} from 'react-native';
//import ViewPager from 'react-native-viewpager';//轮播视图
import Utils from '../utils/utils';
import { StackNavigator } from 'react-navigation';
import familyList from './familyList';//家庭管理界面
import editSex from './editSex';//添加成员设置性别
import editPhone from './editPhone';//添加成员设置手机号
import editHW from './editHW';//添加成员编辑身高和体重
import editBirthday from './editBirthday';//添加成员编辑出生年月日P
import personalInformation from './personalInformation';//个人信息
import questionnaire from './questionnaire';//个人问卷
import setting from './setting';//设置界面
import Row from '../component/horizontalItemRow';
import CutOffRule from '../component/cutOffRule';//分割线
import About from './about';//关于我们
import FeedBack from './feedback';//意见反馈
import HelpCenter from './HelpCenter';//帮助中心
import editInfromation from './EditInfromation';//修改信息

import emption from './emption';

import CashCouponView from './CashCouponView';
import NewsList from './NewsList';
import AlertComponent from './../component/AlertComponent';

const screenWidth= Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class my extends Component{

    static navigationOptions = {
        header:null,
        // tabBarLabel: '我的',
        // tabBarIcon: ({tintColor, focused }) => (
        //     <View>
        //         <Image
        //             source={focused ? require('./../../images/jyz_mine.png') : require('./../../images/mine.png')}
        //             style={styles.icon}
        //         />
        //     </View>
        // ),

    };
    constructor(props){
        super(props);
        this.state={
            superNavigator: this.props.superNavigator,
            familyList : [],
            alterMessage:''
        }
        this._SwitchIcon.bind(this);

        this._renderHeard.bind(this);
    }
    // render(){
    //     const screenWidth = Utils.size.width;
    //     const screenHeight = Utils.size.height;
    //     return(
    //         <ScrollView style={styles.container}>
    //             <View style={{height:screenHeight*.45, backgroundColor:'#fff'}}>
    //                 <View style={{height: screenHeight*.45 - 120, alignItems:'center', justifyContent:'center'}}>
    //                 </View>
    //                 <View style={{height:1 * Utils.pixel, backgroundColor:'#000'}}></View>
    //                 <View style={{height: 100, flexDirection:'row', paddingTop:4}}>
    //                     <View style={{flex:1, alignItems:'center'}}>
    //                         <View style={{position:'absolute',top:10,borderWidth:1, borderColor:'#808080', width:100, height:100, borderRadius:50}}></View>
    //                         <View style={{alignItems:'center',position:'absolute',width:40, height:40,backgroundColor:'#fff' }}>
    //                             <Image style={{position:'absolute',width:30, height:30,backgroundColor:'#fff',resizeMode:'contain' }} source={require('./../../images/health.png')} />
    //                         </View>
    //                         <View style={{position:'absolute',top:10, height:100, alignItems:'center', justifyContent:'center'}}>
    //                             <Text>90%</Text>
    //                             <Text>健康指数</Text>
    //                         </View>
    //                     </View>
    //                     <View style={{flex:1, alignItems:'center'}}>
    //                         <View style={{position:'absolute',top:10,borderWidth:1, borderColor:'#808080', width:100, height:100, borderRadius:50}}></View>
    //                         <View style={{alignItems:'center',position:'absolute',width:40, height:40,backgroundColor:'#fff' }}>
    //                             <Image style={{position:'absolute',width:30, height:30,backgroundColor:'#fff',resizeMode:'contain' }} source={require('./../../images/day.png')} />
    //                         </View>
    //                         <View style={{position:'absolute',top:10, height:100, alignItems:'center', justifyContent:'center'}}>
    //                             <Text>1234</Text>
    //                             <Text>完成天数</Text>
    //                         </View>
    //                     </View>
    //                     <View style={{flex:1, alignItems:'center'}}>
    //                         <View style={{position:'absolute',top:10,borderWidth:1, borderColor:'#808080', width:100, height:100, borderRadius:50}}></View>
    //                         <View style={{alignItems:'center',position:'absolute',width:40, height:40,backgroundColor:'#fff' }}>
    //                             <Image style={{position:'absolute',width:30, height:30,backgroundColor:'#fff',resizeMode:'contain' }} source={require('./../../images/proportion.png')} />
    //                         </View>
    //                         <View style={{position:'absolute',top:10, height:100, alignItems:'center', justifyContent:'center'}}>
    //                             <Text>60%</Text>
    //                             <Text>完成度</Text>
    //                         </View>
    //                     </View>
    //                 </View>
    //             </View>
    //             <View style={{backgroundColor:'#fff', flex:1, marginTop:5}}>
    //                 <Row imageStyle={{width:38 * 2 * Utils.pixel, height:34 * 2 * Utils.pixel, marginRight:8}} icon={require('./../../images/member.png')} name="家庭成员" click={()=>{
    //                     this.props.navigation.navigate('FamilyList');
    //                 }}/>
    //                 <CutOffRule />
    //                 <Row imageStyle={{width:35 * 2 * Utils.pixel, height:34 * 2 * Utils.pixel, marginRight:8}} icon={require('./../../images/aount.png')} name="账户余额" click={()=>{
    //
    //
    //                 }}/>
    //                 <CutOffRule />
    //                 <Row imageStyle={{width:37 * 2 * Utils.pixel, height:35 * 2 * Utils.pixel, marginRight:8}} icon={require('./../../images/buy.png')} name="以购买" click={()=>{
    //
    //                 }}/>
    //                 <CutOffRule />
    //                 <Row imageStyle={{width:37 * 2 * Utils.pixel, height:41 * 2 * Utils.pixel, marginRight:8}} icon={require('./../../images/ask.png')} name="问答" click={()=>{
    //
    //                 }}/>
    //                 <CutOffRule />
    //                 <Row imageStyle={{width:32 * 2 * Utils.pixel, height:35 * 2 * Utils.pixel, marginRight:8}} icon={require('./../../images/question.png')} name="问卷调查" click={()=>{
    //
    //                 }}/>
    //                 <CutOffRule />
    //                 <Row imageStyle={{width:39 * 2 * Utils.pixel, height:41 * 2 * Utils.pixel, marginRight:8}} icon={require('./../../images/news.png')} name="消息" click={()=>{
    //
    //                 }}/>
    //                 <CutOffRule />
    //                 <Row imageStyle={{width:38 * 2 * Utils.pixel, height:38 * 2 * Utils.pixel, marginRight:8}} icon={require('./../../images/set.png')} name="设置" click={()=>{
    //
    //                 }}/>
    //                 <CutOffRule />
    //             </View>
    //         </ScrollView>
    //     );
    // }

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
    //头部View
    _renderHeard(){

        let leftIcon = require('./../../images/mama.png');
        let icon = require('./../../images/mama.png');
        let riginIcon = require('./../../images/mama.png');

        for (let i = 0; i < this.state.familyList.length; i++){
            let data = this.state.familyList[i];
            if (i == 0){
                icon = this._SwitchIcon(data.roleName);
            }else if(i == 1){
                leftIcon = this._SwitchIcon(data.roleName);
            }else if(i == 2){
                riginIcon = this._SwitchIcon(data.roleName);
            }
        }
        return(
            <View style={{position:'absolute',height: screenHeight*.3}}>
                <View style={{position:'absolute', height:screenHeight*.15, backgroundColor:"#99D9CB", width:screenWidth,justifyContent:'flex-end', flexDirection:'row', paddingRight: 8}}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('NewsList');
                    }}>
                        <Image style={{width:24, height:24}} source={require('./../../images/nnew.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{position:'absolute',alignItems:'center'}}>
                    <View style={{height:screenHeight*.17, backgroundColor:"#fff", width:screenWidth - 20,
                                marginLeft:10, marginRight:10, top:60, borderRadius:16}}>
                    </View>

                    <Image style={{position:'absolute',width:60, height:60, borderRadius:30, top:30, left:screenWidth/2-70}} source={leftIcon}/>
                    <Image style={{position:'absolute',width:60, height:60, borderRadius:30, top:30, right:screenWidth/2-70}} source={riginIcon}/>
                    <Image style={{position:'absolute',width:80, height:80, borderRadius:40, top:20}} source={icon}/>
                    <Text style={{position:'absolute', top:105}}>{this.state.familyList[0] ? this.state.familyList[0].alias : ""}</Text>
                    <TouchableOpacity style={{marginTop:24, backgroundColor:'#ff8c00', borderRadius:10, padding:4, width: Utils.size.width / 3, alignItems:'center', justifyContent:'center'}}
                        onPress={
                            ()=>{
                               this.props.navigation.navigate('FamilyList',{familyList: this.state.familyList});
                            }
                        }>
                        <Text style={{color:'#fff'}}>+添加家庭成员</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    render() {
        const heardView = this._renderHeard();

        return (
            <View style={styles.contain}>
                <StatusBar backgroundColor="#99D9CB" />
                {heardView}

                    <ScrollView style={{marginTop:screenHeight*.285, backgroundColor:'#FAFAFA'}}>
                        <AlertComponent ref="progress" mode="progress"/>

                        <AlertComponent ref="alert" title="提示" message={this.state.alterMessage} mode="alert"  click={()=>{
                        nav.navigate('Home');

                        {/*console.log(nav)*/}

                    }}/>
                        <Row imageStyle={{width:24, height:24, marginRight:8}} icon={require('./../../images/edit.png')} name="修改信息" click={()=>{
                        this.props.navigation.navigate('EditInfromation',{familyList: this.state.familyList});
                    }}/>
                        <CutOffRule />

                        <Row imageStyle={{width:24, height:24, marginRight:8}} icon={require('./../../images/member.png')} name="家庭成员" click={()=>{
                        this.props.navigation.navigate('FamilyList',{familyList: this.state.familyList});
                    }}/>
                        <CutOffRule />

                        {/*<View style={{width: Utils.size.width,height:10, backgroundColor:'#FAFAFA'}}></View>*/}
                        <Row imageStyle={{width:24, height:24, marginRight:8}} icon={require('./../../images/coupon.png')} name="我的优惠券" click={()=>{
                        this.props.navigation.navigate('CashCouponView');
                    }}/>
                        <CutOffRule />
                        {/*<Row imageStyle={{width:35 * 2 * Utils.pixel, height:34 * 2 * Utils.pixel, marginRight:8}} icon={require('./../../images/aount.png')} name="账户余额" click={()=>{*/}


                        {/*}}/>*/}
                        {/*<CutOffRule />*/}
                        <Row imageStyle={{width:24, height:24, marginRight:8}} icon={require('./../../images/buy.png')} name="已购买" click={()=>{
                            this.props.navigation.navigate('Emption');
                    }}/>
                        <CutOffRule />
                        {/*<Row imageStyle={{width:37 * 2 * Utils.pixel, height:41 * 2 * Utils.pixel, marginRight:8}} icon={require('./../../images/ask.png')} name="问答" click={()=>{*/}

                        {/*}}/>*/}
                        {/*<CutOffRule />*/}
                        {/*<Row imageStyle={{width:32 * 2 * Utils.pixel, height:35 * 2 * Utils.pixel, marginRight:8}} icon={require('./../../images/question.png')} name="问卷调查" click={()=>{*/}

                        {/*}}/>*/}
                        {/*<CutOffRule />*/}
                        {/*<Row imageStyle={{width:24, height:24, marginRight:8}} icon={require('./../../images/news.png')} name="消息" click={()=>{*/}

                        {/*}}/>*/}
                        <CutOffRule />
                        <Row imageStyle={{width:24, height:24, marginRight:8}} icon={require('./../../images/set.png')} name="设置" click={()=>{
                        this.props.navigation.navigate('Setting');
                    }}/>
                        <CutOffRule />


                    </ScrollView>


            </View>
        );
    }



    componentDidMount(){
        this.refs.progress.show();
        Utils.get(Utils.baseNet + Utils.familyList + user.userToken, (data)=>{
            console.log('data', data);
            this.setState({
               familyList:data
            });
            this.refs.progress.hide();
        }, (e)=>{
            console.log('e', e);
            this.refs.progress.hide();
            this.refs.alert.show('提示', '服务器有点忙!!!');
        });
    }
}




const styles = StyleSheet.create({
    icon:{
        width:23,
        height:23
    },
    container:{
        flex:1,
        backgroundColor:'#FAFAFA'
    }
});

const MyStackNavigator = StackNavigator({
    Home:{screen:my},
    FamilyList:{screen:familyList},//家庭成员
    editSex:{screen:editSex},//添加成员 选择性别
    editPhone:{screen:editPhone},//添加成员 添加手机号和姓名
    editHW:{screen:editHW},//添加成员，编辑身高和体重
    editBirthday:{screen:editBirthday},//编辑出生年月日
    PersonalInformation:{screen:personalInformation},//个人信息
    Questionnaire:{screen:questionnaire},//个人问卷
    Setting:{screen: setting},//设置界面
    About:{screen: About},//关于我们
    FeedBack:{screen:FeedBack},//意见反馈
    HelpCenter:{screen:HelpCenter},//帮助中心
    EditInfromation:{screen: editInfromation},//修改个人信息
    Emption:{screen:emption},//已购买列表页
    CashCouponView:{screen:CashCouponView},//优惠券
    NewsList:{screen:NewsList},//消息列表
},{
    initialRouteName: 'Home',
});

export default MyStackNavigator;