/**
 * Created by tianzhw on 2017/7/11.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    ActivityIndicator,Image,TouchableOpacity
} from 'react-native';
//import SplashScreen from 'react-native-splash-screen';
import TitleBar from './../component/titleBar';
import Utils from '../utils/utils'
import {PullList} from 'react-native-pull';//可刷新ListView
//import Swiper from 'react-native-swiper';//轮播视图 这个组件和TabNavgtion有冲突 希望新版本能够解决吧
import ViewPager from 'react-native-viewpager';//轮播视图
import Toast from './../component/android/ToastAndroid';//Android原生调用
//import ImageView from './android/ImageViewAndroid';//Android原生ImageView
import Item from './../component/targerItem';//listview item view 组件
const IMGS = [
    'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
    'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
];

import CashCoupon from './../component/CashCoupon';

export default class targer extends Component{
    static navigationOptions = {
        header:null,
    }
    // static navigationOptions = {
    //     header:null,
    //     tabBarLabel: '目标',
    //     tabBarIcon: ({tintColor, focused }) => (
    //         <View>
    //             <Image resizeMode="stretch"
    //                    source={focused ? require('./../../images/jyz_target.png') : require('./../../images/target.png')}
    //                 style={styles.icon}
    //             />
    //         </View>
    //     ),
    // };

    constructor(props) {
        super(props);
        this.dataSource = [];
        this.state = {
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
            pagerDataSource : new ViewPager.DataSource({
                pageHasChanged: (p1, p2) => p1 !== p2,
            }).cloneWithPages(IMGS),
            isLoading: true
        };
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
        // this.loadMore();
    }


    _readerActivityIndicatorView(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>

                <ActivityIndicator color="#96D8CA"
                                   style={[{height: 80}]}
                                   size="large"/>
            </View>
        );
    }

    render(){
        let views = this.state.isLoading ? this._readerActivityIndicatorView() : this._renderContent();
        return(
            <View style={styles.container}>
                {views}
            </View>
        );
    }

    _renderContent(){


            return(
                <View style={styles.container}>

                    <CashCoupon ref="cc"/>

                    <TitleBar title="目标" />
                    <PullList
                        style={{padding:0, backgroundColor:'#FAFAFA'}}
                        onPullRelease={this.onPullRelease} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}
                        renderHeader={this.renderHeader}
                        dataSource={this.state.list}
                        pageSize={10}
                        initialListSize={10}
                        renderRow={this.renderRow}
                        onEndReached={this.loadMore}
                        onEndReachedThreshold={60}
                        renderFooter={this.renderFooter}
                        renderSeparator={()=>{
                            return(
                                <View style={{height: 1 * Utils.pixel, backgroundColor:'#E1E1E1'}}></View>
                            );
                        }}
                    />
                </View>
            );
    }



    onPullRelease(resolve) {
        //do something
        setTimeout(() => {
            resolve();
        }, 0);
    }
    //顶部指示器 向下不加载数据
    topIndicatorRender(pulling, pullok, pullrelease) {
        return(
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>

            </View>
        );
    }
    _toReport(){
        global.nav.navigate('PersonalHealthReport');
    }

    _toPlan(){
        global.nav.navigate('PersonaDietPlan');
    }

    renderHeader() {


        let subViews = [];

        for (let i =0; i< this.dataSource.new.length; i++){
            subViews.push(
                <TouchableOpacity key={i} style={{backgroundColor:'#fff', width: Utils.size.width / 2 - 10 , marginTop: 5, paddingBottom: 4}} onPress={()=>{
                    let typeName = this._typeClick(this.dataSource.new[i].module);
                    nav.navigate('FindDetail',{title:typeName, src:{uri:Utils.findDetail + this.dataSource.new[i].id}});
                }}>
                    <Image style={{width:Utils.size.width/2 - 20, height:105}} source={{uri:Utils.imageBaseUrl + "/" + this.dataSource.new[i].cover}}/>
                    <Text numberOfLines={1} style={{color:'#666666',fontSize:12, marginTop:10}}>{this.dataSource.new[i].heading}</Text>
                </TouchableOpacity>
            );
        }



        return (
           <View >
               <View style={{height: 145}}>
                   <ViewPager
                       style={styles.viewPager}
                       dataSource={this.state.pagerDataSource}
                       renderPage={this._renderPage}
                       isLoop={true}
                       autoPlay={true}
                       renderPageIndicator={this._renderPageIndicator}/>
               </View>


                   <View style={{backgroundColor:'#fff', flexDirection:'row',paddingTop:15,paddingBottom:15, marginBottom:10, marginTop:9}}>
                       <TouchableOpacity style={{flex:1, justifyContent:'center',alignItems:'center'}} onPress={()=>{
                           console.log(user);
                           if (user.userToken){
                                global.nav.navigate('PersonalHealthReport');
                           }else{
                               global.nav.navigate('Login', {call: () =>this._toReport()});
                        }}}>
                           <Image style={{width:35, height:35, resizeMode:'contain'}} source={require('./../../images/menu1.png')}></Image>
                           <Text style={{fontSize:11,color:'#666666'}}>个人健康报告</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={{flex:1, justifyContent:'center',alignItems:'center'}} onPress={()=>{

                           if (user.userToken){
                                 global.nav.navigate('PersonaDietPlan');
                           }else{
                               global.nav.navigate('Login', {call: () =>this._toPlan()});
                        }



                       }}>
                           <Image style={{width:35, height:35,resizeMode:'contain'}} source={require('./../../images/menu4.png')}></Image>
                           <Text style={{fontSize:11,color:'#666666'}}>个人饮食计划</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={{flex:1, justifyContent:'center',alignItems:'center'}} onPress={()=>{
                                this.refs.cc._setModalVisible(true);
                       }}>
                           <Image style={{width:35, height:35,resizeMode:'contain'}} source={require('./../../images/menu2.png')}></Image>
                           <Text style={{fontSize:11,color:'#666666'}}>家庭健康报告</Text>
                       </TouchableOpacity>
                       <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                           <Image style={{width:35, height:35,resizeMode:'contain'}} source={require('./../../images/menu3.png')}></Image>
                           <Text style={{fontSize:11,color:'#666666'}}>家庭饮食计划</Text>
                       </View>
                   </View>


               <View style={{ alignItems:'center', backgroundColor:'#fff', paddingLeft: 10, paddingRight:10, paddingTop:15}}>
                    <Text style={{color:'#282828', fontSize:15, marginBottom: 15}}>最新推荐</Text>

                   <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                       {subViews}
                   </View>

               </View>
               <View style={{ alignItems:'center', backgroundColor:'#fff', paddingLeft: 10, paddingRight:10, paddingTop:15,marginTop:10}}><Text style={{color:'#282828', fontSize:15, paddingBottom: 15}}>热门推荐</Text></View>

           </View>
        );
    }

    _typeClick(type){
        let typeName = "";
        switch (type){
            case 'zhishi_cmd_hot_news':
                typeName = '知食实验室';
                break;
            case 'zhishi_cmd_every_day_news':
                typeName = '辣妈支招';
                break;
            case 'zhishi_cmd_news':
                typeName = '熊孩子研究所';
                break;
            case 'zhishi_cmd_guess':
                typeName = '趣动旅程';
                break;
            default:
                typeName = '餐盘里';
                break;
        }
        return typeName
    }


    _renderPageIndicator(){
        return(
            <View></View>
        );
    }

    _renderPage(data: Object,
                pageID: number | string){
        return(
            <Image
                source={require('./../../images/target1.jpg')}
                style={styles.slideImg} />
        );
    }


    renderRow(item, sectionID, rowID, highlightRow) {

        return (
            <TouchableOpacity style={{backgroundColor: '#fff', alignItems: 'center', flexDirection:'row', padding: 5}} onPress={()=>{
                let typeName = this._typeClick(item.module);
                nav.navigate('FindDetail',{title:typeName, src:{uri:Utils.findDetail + item.id}});
            }}>
                <Image style={{width: 100, height:70, resizeMode:'contain'}} source={{uri:Utils.imageBaseUrl + "/" + item.cover}}/>
                <View style={{paddingRight:6}}>
                    <View style={{flex:1,paddingLeft: 4, paddingRight:4, width: Utils.size.width - 118}}>
                        <Text numberOfLines={1} style={{color:'#666666',fontSize:13}}>{item.heading}</Text>
                    </View>
                    <View style={{flex:1, alignItems: 'center', flexDirection:'row', justifyContent:'space-between', paddingLeft: 4, paddingRight:4}}>
                        <Text style={{color:'#999999',fontSize:9}}>新知食/07-31</Text>
                        <Text style={{color:'#999999',fontSize:9}}>{item.read_count}阅读</Text>
                    </View>
                </View>
            </TouchableOpacity>
           // <Item data={item}/>
        );
    }

    renderFooter() {
        if(this.state.nomore) {
            return null;
        }
        return (
            <View >
                {/*<ActivityIndicator />*/}
            </View>
        );
    }

    loadMore() {




        // this.dataSource.push({
        //     id: 0,
        //     title: `begin to create data ...`,
        // });
        // for(var i = 0; i < 10; i++) {
        //     this.dataSource.push({
        //         id: i + 1,
        //         title: `this is ${i}`,
        //     })
        // }
        // this.dataSource.push({
        //     id: 11,datadata
        //     title: `finish create data ...`,
        // });
        // setTimeout(() => {
        //     this.setState({
        //         list: this.state.list.cloneWithRows(this.dataSource)
        //     });
        // }, 1000);
    }



    componentWillMount(){
        Utils.get(Utils.baseNet + Utils.getTargerList, data=>{
            console.log('tianzhw', data);

            if (data.state == 1){
                this.dataSource = data.data;
                this.setState({
                    list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource.hot),
                    isLoading:false
                });
            }

        }, e=>{
            console.log('tianzhw123', e);
        });
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    viewPager: {
        flex: 1,
        backgroundColor:'#000',
        height:150
    },
    slide1: {
        flex: 1,
        height:120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    slideImg:{
        flex:1,
        height:150,
        resizeMode:'cover'
    },
    icon:{
        width:25,
        height:25
    }
});
