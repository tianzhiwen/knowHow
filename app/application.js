/**
 * Created by tianzhw on 2017/7/11.
 * 项目入口文件
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    BackHandler,
    Platform
} from 'react-native';
import Utils from './utils/utils';
import TargerView from './views/targer';
import FindView from './views/find';
import SelectionView from './views/selection';
import MyView from './views/my';
import { StackNavigator } from 'react-navigation';
//import { TabNavigator } from "react-navigation";
import TabNavigator from 'react-native-tab-navigator';

import Login from './views/login';//登陆界面
import questionnaire from './views/questionnaire';//个人问卷
import PersonalHealthReport from './views/PersonalHealthReport';//个人健康报告
import PersonaDietPlan from './views/PersonaDietPlan';
import familyList from './views/familyList';//家庭管理界面
import editSex from './views/editSex';//添加成员设置性别
import editPhone from './views/editPhone';//添加成员设置手机号
import editHW from './views/editHW';//添加成员编辑身高和体重
import editBirthday from './views/editBirthday';//添加成员编辑出生年月日
import SplashScreen from 'react-native-splash-screen';


import Guide2 from './views/guide2';
import Guide3 from './views/guide3';
import Guide4 from './views/guide4';


import FSub1 from './views/findSub1';
import FSub2 from './views/findSub2';
import FSub3 from './views/findSub3';
import FSub4 from './views/findSub4';
import FSub5 from './views/findSub5';
import FindDetail from './views/findDetail';

import PersonCatering from './views/PersonCatering';


import AlertComponent from './component/AlertComponent';

class TabNavigatorView extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedTab:this.props.selectedTab ? this.props.selectedTab : '目标',
            sex:0,
            isGetOver: false,
            backClick: 0
        }
        this._renderContent.bind(this);
        this._renderInitView.bind(this);
        //全局记录根导航器
        global.nav = this.props.navigation;
    }



     componentWillMount(){
        //坚持APP是否是第一次加载，如果异常那么说明本地展开过引导页
        store.load({
            key:'navigation'
        }).then(data=>{
            global.isInit = true;
            this.setState({
                isGetOver: true
            });

            console.log('data');

        }).catch((e=>{
            global.isInit = false;
            this.setState({
                isGetOver: true
            });
            console.log('e');
        }));
    }

    componentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();

        // Toast.show('测试', Toast.SHORT);


        BackHandler.addEventListener('hardwareBackPress', function() {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.
            //判断联系点击返回退出应用
            if (global.backClick  == 2){
                global.backClick  = 0;
                BackHandler.exitApp();
            }else{
                global.backClick  = global.backClick   + 1;
            }

            //三秒内回复一次
            setTimeout(()=>{
                global.backClick  = 0;
            }, 3000);



            return true;
        });

    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress',()=>{});
        }
    }

    _renderInitView(){

         let clickStyle3 = (this.state.sex == 3) ? {
             borderColor: '#D9EEEC',
             borderWidth: 6,
             borderRadius: 50
         } : {};

        let clickStyle4 = (this.state.sex == 4) ? {
                borderColor: '#D9EEEC',
                borderWidth: 6,
                borderRadius: 50
            } : {};


        return(
            <View style={{flex:1, padding: 10, backgroundColor:'#fff'}}>

                <AlertComponent ref="alert" title="请选择" message='您的宝宝是男孩还是女孩？' mode="alert"  click={()=>{
                   //
                }}/>


                <View style={{flex:1, alignItems:'center'}}>
                    <Text style={{color:'#96D8CA', marginTop: 20, fontSize: 16}}>根据您的宝宝的实际情况填写</Text>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity style={{marginTop:50, alignItems:'center', justifyContent:'center'}} onPress={()=>{
                            this.setState({
                                sex:3
                            })
                        }}>
                            <Image style={[{width:100, height:100}, clickStyle3]}  source={require('./../images/n_nvbaobao.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity style={{marginTop:50, alignItems:'center', justifyContent:'center'}} onPress={()=>{
                            this.setState({
                                sex:4
                            })
                        }}>
                            <Image style={[{width:100, height:100}, clickStyle4]}  source={require('./../images/n_baobao.png')}/>
                        </TouchableOpacity>
                    </View>


                    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>

                        <TouchableOpacity style={{marginBottom:25,width:Utils.size.width*.5,
                            height:30, backgroundColor:'#96D8CA', borderRadius:10, marginTop: 50, elevation:4,
                            alignItems:'center', justifyContent:'center'}} onPress={()=>{

                                if(this.state.sex == 3 || this.state.sex == 4){
                                     nav.navigate('Guide3', {sex: this.state.sex});
                                }else{
                                    this.refs.alert.show();
                                }


                            }}>
                            <Text style={{color:'#fff'}}>下一步</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }
    _renderContent(){
        return(
            <View style={{flex:1}} >
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '目标'}
                        title="目标"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require('./../images/target.png')} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require('./../images/jyz_target.png')} />}
                        onPress={() => this.setState({ selectedTab: '目标' })}>
                        <TargerView navigation={this.props.navigation}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '发现'}
                        title="发现"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require('./../images/find.png')} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require('./../images/jyz_find.png')} />}
                        onPress={() => this.setState({ selectedTab: '发现' })}>
                        <FindView navigation={this.props.navigation}/>
                    </TabNavigator.Item>
                    {/*<TabNavigator.Item*/}
                        {/*selected={this.state.selectedTab === '知食甄选'}*/}
                        {/*title="知食甄选"*/}
                        {/*titleStyle={styles.tabText}*/}
                        {/*selectedTitleStyle={styles.selectedTabText}*/}
                        {/*renderIcon={() => <Image style={styles.icon} source={require('./../images/partner.png')} />}*/}
                        {/*renderSelectedIcon={() => <Image style={styles.icon} source={require('./../images/jyz_partner.png')} />}*/}
                        {/*onPress={() => this.setState({ selectedTab: '知食甄选' })}>*/}
                        {/*<SelectionView navigation={this.props.navigation}/>*/}
                    {/*</TabNavigator.Item>*/}
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '我的'}
                        title="我的"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require('./../images/mine.png') } />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require('./../images/jyz_mine.png') } />}
                        onPress={() => this._clickMy()}>
                        <MyView/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
    render(){
        const contentView = this.state.isGetOver ?  (global.isInit ? this._renderContent() : this._renderInitView()) : this._renderActivityIndicator();
        return(
            <View style={{flex:1}}>
                {contentView}
            </View>

            // <View style={{flex:1}} >
            //     <TabNavigator>
            //         <TabNavigator.Item
            //             selected={this.state.selectedTab === '目标'}
            //             title="目标"
            //             titleStyle={styles.tabText}
            //             selectedTitleStyle={styles.selectedTabText}
            //             renderIcon={() => <Image style={styles.icon} source={require('./../images/target.png')} />}
            //             renderSelectedIcon={() => <Image style={styles.icon} source={require('./../images/jyz_target.png')} />}
            //             onPress={() => this.setState({ selectedTab: '目标' })}>
            //             <TargerView navigation={this.props.navigation}/>
            //         </TabNavigator.Item>
            //         <TabNavigator.Item
            //             selected={this.state.selectedTab === '发现'}
            //             title="发现"
            //             titleStyle={styles.tabText}
            //             selectedTitleStyle={styles.selectedTabText}
            //             renderIcon={() => <Image style={styles.icon} source={require('./../images/find.png')} />}
            //             renderSelectedIcon={() => <Image style={styles.icon} source={require('./../images/jyz_find.png')} />}
            //             onPress={() => this.setState({ selectedTab: '发现' })}>
            //             <FindView navigation={this.props.navigation}/>
            //         </TabNavigator.Item>
            //         <TabNavigator.Item
            //             selected={this.state.selectedTab === '知食甄选'}
            //             title="知食甄选"
            //             titleStyle={styles.tabText}
            //             selectedTitleStyle={styles.selectedTabText}
            //             renderIcon={() => <Image style={styles.icon} source={require('./../images/partner.png')} />}
            //             renderSelectedIcon={() => <Image style={styles.icon} source={require('./../images/jyz_partner.png')} />}
            //             onPress={() => this.setState({ selectedTab: '知食甄选' })}>
            //             <SelectionView navigation={this.props.navigation}/>
            //         </TabNavigator.Item>
            //         <TabNavigator.Item
            //             selected={this.state.selectedTab === '我的'}
            //             title="我的"
            //             titleStyle={styles.tabText}
            //             selectedTitleStyle={styles.selectedTabText}
            //             renderIcon={() => <Image style={styles.icon} source={require('./../images/mine.png') } />}
            //             renderSelectedIcon={() => <Image style={styles.icon} source={require('./../images/jyz_mine.png') } />}
            //             onPress={() => this._clickMy()}>
            //             <MyView/>
            //         </TabNavigator.Item>
            //     </TabNavigator>
            // </View>
        );
    }


    _renderActivityIndicator(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator color="#96D8CA"
                                   style={[{height: 80}]}
                                   size="large"/>
            </View>
        );
    }

    _clickMy(){
        //判断是否登陆
        if (!user.userToken){
            const navigate = this.props.navigation.navigate;
            navigate('Login', {
                call: () =>
                    this._toMyView()
            });
        }else{
            this._toMyView();
        }
    }

    _toMyView(){
        this.setState({ selectedTab: '我的' });
    }
}
let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        color: "#000000",
        fontSize: 13
    },
    selectedTabText: {
        color: "#afeeee",
        fontSize: 13
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode:'contain'
    }
});


/**
 *  选项卡导航
 */
// const zhiShi = TabNavigator(
//     {
//         Tar: {
//             screen: TargerView,
//         },
//         Find:{
//             screen:FindView,
//         },
//         Sel:{
//             screen:SelectionView,
//         },
//         My:{
//             screen:MyView,
//         }
//     },
//     {
//         tabBarOptions: {
//             activeTintColor: '#fff',
//         },
//         lazy: true,
//         //// tabBar 显示的位置 ，android 默认是显示在页面顶端的
//         tabBarPosition: 'bottom',
//         animationEnabled: false, // 切换页面时是否有动画效果
//         swipeEnabled: false, // 是否可以左右滑动切换tab 如果设置这个属性，这事例中下面设置的按钮 Go back home | Go to notifications就不好使了
//         backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
//         //第一次加载时，显示的tab
//         initialRouteName : 'Tar',
//         tabBarOptions: {
//             activeTintColor: '#86CFBC', // 文字和图片选中颜色
//             inactiveTintColor: '#000', // 文字和图片未选中颜色
//             showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
//             showLabel: true, // android 是否展现文字 默认 true
//             upperCaseLabel : false, //android 文字是否需要大写 默认true
//             pressColor : '#86CFBC', // android 按压时显示的颜色
//             scrollEnabled : false,
//             indicatorStyle: {
//                 height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
//             },
//             style: {
//                 backgroundColor: '#fff', // TabBar 背景色
//                 // height: 50,
//             },
//             labelStyle: {
//                 fontSize: 13, // 文字大小
//                 paddingTop:0,
//                 marginTop:0,
//             },
//             tabStyle:{
//                 marginTop:8,
//                 height: 50,
//             },
//         },
//     }
// );


/**
 * 导航页面设置
 */
const application = StackNavigator({
    Home: {screen: TabNavigatorView},//项目首页
    Login:{screen:Login},//登陆
    Questionnaire:{screen:questionnaire},//个人问卷
    PersonalHealthReport:{screen:PersonalHealthReport},//个人健康报告
    PersonaDietPlan:{screen:PersonaDietPlan},
    Guide2:{screen:Guide2},
    Guide3:{screen:Guide3},
    Guide4:{screen:Guide4},
    FSub1:{screen:FSub1},
    FSub2:{screen:FSub2},
    FSub3:{screen:FSub3},
    FSub4:{screen:FSub4},
    FSub5:{screen:FSub5},
    FindDetail:{screen:FindDetail},
    PersonCatering:{screen:PersonCatering}
    // FamilyList:{screen:familyList},//家庭成员
    // editSex:{screen:editSex},//添加成员 选择性别
    // editPhone:{screen:editPhone},//添加成员 添加手机号和姓名
    // editHW:{screen:editHW},//添加成员，编辑身高和体重
    // editBirthday:{screen:editBirthday},//编辑出生年月日
},{
    navigationOptions:{
        header:null
    }
});



export default application;