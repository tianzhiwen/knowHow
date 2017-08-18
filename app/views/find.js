/**
 * Created by tianzhw on 2017/7/11.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,Image,TextInput,
    ScrollView,TouchableOpacity,ActivityIndicator
} from 'react-native';
import Alert from './../component/AlertComponent';
import Utils from './../utils/utils';
import TitleBar from './../component/titleBar';
export default class find extends Component{

    static navigationOptions = {
        header:null,

    };


    constructor(props){
        super(props);
        this._renderTitle.bind(this);

        this.state = {
            zhishi_cmd_news:'',//知识实验室  1
            zhishi_cmd_hot_news:'',//辣妈支招 2
            zhishi_cmd_dinner_plate:'',//餐盘里 3
            zhishi_cmd_every_day_news:'',//熊孩子研究所 1
            zhishi_cmd_guess:'',//趣味旅行 2
            isLoading: true
        }

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
        let content = this.state.isLoading ? this._readerActivityIndicatorView() : this._renderContent();
        return(
            <View style={{flex:1}}>
                {content}
            </View>
        );_
    }


    _renderContent(){

        let view1  = this._renderTitle('知食实验室',()=>{
            nav.navigate('FSub1');
        });

        let view2  = this._renderTitle('辣妈支招', ()=>{
            nav.navigate('FSub2');
        });

        let view3  = this._renderTitle('餐盘里', ()=>{
            nav.navigate('FSub3');
        });

        let view4  = this._renderTitle('熊孩子研究所', ()=>{
            nav.navigate('FSub4');
        });

        let view5  = this._renderTitle('趣动旅程', ()=>{
            nav.navigate('FSub5');
        });

        //知食实验室
        let tar1 = this.state.zhishi_cmd_news[0];

        //辣妈支招
        let tar21 = this.state.zhishi_cmd_hot_news[0];
        let tar22 = this.state.zhishi_cmd_hot_news[1];

        //盘子
        let tar31 = this.state.zhishi_cmd_dinner_plate[0];
        let tar32 = this.state.zhishi_cmd_dinner_plate[1];
        let tar33 = this.state.zhishi_cmd_dinner_plate[2];

        //熊孩子
        let tar41 = this.state.zhishi_cmd_every_day_news[0];

        //趣味旅行
        let tar51 = this.state.zhishi_cmd_guess[0];
        let tar52 = this.state.zhishi_cmd_guess[1];

        return(
            <View style={{flex:1, backgroundColor:'#FAFAFA'}}>

                <Alert ref="progress" mode="progress" />

                <TitleBar title="发现"/>
                <ScrollView style={{padding: 4}}>
                    <View>
                        {view1}
                        <TouchableOpacity style={{backgroundColor:'#fff', paddingBottom: 4}} onPress={()=>{
                            nav.navigate('FindDetail',{title:'知食实验室', src:{uri:Utils.findDetail + tar1.id}});
                        }}>
                            <Image style={{flex:1,resizeMode:'cover', width: Utils.size.width - 8, height: 120}} source={{uri:Utils.imageBaseUrl + "/" + tar1.cover}}/>
                            <Text numberOfLines={2} style={{fontWeight : '400', color:'#000'}}>{tar1.heading}</Text>
                            <Text numberOfLines={2} style={{fontSize: 12}}>阅读数：{tar1.read_count}</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        {view2}
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={{flex: 1, backgroundColor:'#fff', marginRight:5}} onPress={()=>{
                                nav.navigate('FindDetail',{title:'辣妈支招', src:{uri:Utils.findDetail + tar21.id}});
                            }}>
                                {/*<View style={{flexDirection:'row', alignItems:'center', padding: 4}}>*/}
                                    {/*<Image style={{width: 40 , height: 40 , borderRadius: 20 , marginRight: 4}} source={require('./../../images/breakfast1.png')}/>*/}
                                    {/*<View>*/}
                                        {/*<Text style={{color:'#000'}}>新知识</Text>*/}
                                        {/*<Text style={{fontSize: 12}}>2小时前</Text>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                                <Image style={{resizeMode:'cover', width: Utils.size.width/2 - 8, height: 120}} source={{uri:Utils.imageBaseUrl + "/" + tar21.cover}}/>
                                <Text numberOfLines={2}>{tar21.heading}</Text>
                            </TouchableOpacity>



                            <TouchableOpacity style={{flex: 1, backgroundColor:'#fff', marginRight:5}} onPress={()=>{
                                nav.navigate('FindDetail',{title:'辣妈支招', src:{uri:Utils.findDetail + tar22.id}});
                            }}>
                                {/*<View style={{flexDirection:'row', alignItems:'center', padding: 4}}>*/}
                                    {/*<Image style={{width: 40 , height: 40 , borderRadius: 20 , marginRight: 4}} source={require('./../../images/findBanner3.jpg')}/>*/}
                                    {/*<View>*/}
                                        {/*<Text style={{color:'#000'}}>新知识</Text>*/}
                                        {/*<Text style={{fontSize: 12}}>2小时前</Text>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                                <Image style={{resizeMode:'cover', width: Utils.size.width/2 - 8, height: 120}} source={{uri:Utils.imageBaseUrl + "/" + tar22.cover}}/>
                                <Text numberOfLines={2}>{tar22.heading}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>


                    <View>
                        {view3}
                        <View style={{ backgroundColor:'#fff', flexDirection:'row'}}>
                            <TouchableOpacity style={{flex:1, alignItems:'center'}} onPress={()=>{
                                 nav.navigate('FindDetail',{title:'餐盘里', src:{uri:Utils.findDetail + tar31.id}});
                            }}>
                                <Image style={{width:100, height:100}} source={{uri:Utils.imageBaseUrl + "/" + tar31.cover}} />
                                <Text numberOfLines={2}>{tar31.heading}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1, alignItems:'center'}} onPress={()=>{
                                 nav.navigate('FindDetail',{title:'餐盘里', src:{uri:Utils.findDetail + tar32.id}});
                            }}>
                                <Image style={{width:100, height:100}} source={{uri:Utils.imageBaseUrl + "/" + tar32.cover}}/>
                                <Text numberOfLines={2}>{tar32.heading}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1, alignItems:'center'}} onPress={()=>{
                                 nav.navigate('FindDetail',{title:'餐盘里', src:{uri:Utils.findDetail + tar33.id}});
                            }}>
                                <Image style={{width:100, height:100}} source={{uri:Utils.imageBaseUrl + "/" + tar33.cover}} />
                                <Text numberOfLines={2}>{tar33.heading}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View>
                        {view4}
                        <TouchableOpacity style={{ backgroundColor:'#fff', flexDirection:'row'}} onPress={()=>{
                                 nav.navigate('FindDetail',{title:'熊孩子研究所', src:{uri:Utils.findDetail + tar41.id}});
                            }}>
                            <Image style={{flex:1,resizeMode:'cover', width: Utils.size.width - 8, height: 120}} source={{uri:Utils.imageBaseUrl + "/" + tar41.cover}}/>
                        </TouchableOpacity>
                    </View>


                    <View>
                        {view5}
                        <View style={{  flexDirection:'row',marginBottom:5, padding: 4}}>
                            <TouchableOpacity style={{backgroundColor:'#fff',flex:1,marginRight:5}} onPress={()=>{
                                 nav.navigate('FindDetail',{title:'趣动旅程', src:{uri:Utils.findDetail + tar51.id}});
                            }}>
                                <Image style={{width:Utils.size.width/2 - 8, height:100}} source={{uri:Utils.imageBaseUrl + "/" + tar51.cover}} />
                                <Text numberOfLines={2}>{tar51.heading}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:'#fff',flex:1, marginLeft:5}} onPress={()=>{
                                 nav.navigate('FindDetail',{title:'趣动旅程', src:{uri:Utils.findDetail + tar52.id}});
                            }}>
                                <Image style={{width:Utils.size.width/2 - 8, height:100}} source={{uri:Utils.imageBaseUrl + "/" + tar52.cover}} />
                                <Text numberOfLines={2}>{tar52.heading}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }

    _renderTitle(title, doit){
        return(
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom: 5, marginTop: 5}} onPress={()=>{
                doit();
            }}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{backgroundColor:'#96D8CA', width: 15 * Utils.pixel, height: 20, marginRight: 4}}></View>
                    <Text style={{fontWeight : '500', color:'#000'}}>{title}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{marginRight: 8}}>查看更多</Text><Image style={{width:16 * Utils.pixel,height:31 * Utils.pixel}} source={require('./../../images/list.png')}></Image>
                </View>
            </TouchableOpacity>
        );
    }


    componentDidMount(){


        Utils.get(Utils.baseNet + Utils.getFind, data=>{
           if (data.state == 1){
                let resultData = data.data;
                console.log('data', resultData);
                this.setState({
                    zhishi_cmd_news: resultData.zhishi_cmd_news,
                    zhishi_cmd_hot_news : resultData.zhishi_cmd_hot_news,
                    zhishi_cmd_dinner_plate : resultData.zhishi_cmd_dinner_plate,
                    zhishi_cmd_every_day_news: resultData.zhishi_cmd_every_day_news,
                    zhishi_cmd_guess: resultData.zhishi_cmd_guess,
                    isLoading:false
                });


           }else{

           }

        }, e=>{

        });
    }
}
