/**
 * Created by tianzhw on 2017/8/2.
 * 配餐页面
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Utils from './../utils/utils';
import Alert from './../component/AlertComponent';
export default class PersonCatering extends Component {


    constructor(props){
        super(props);
        this.state = {
            data: '',
            isLoading : true
        }
    }


    render() {
        let view = this.state.isLoading ? this._readerProgress() : this._reanderAll();

        return(
            <View style={{flex:1, backgroundColor:'#FAFAFA'}}>
                {view}
            </View>
        );
    }

    _readerProgress(){
        return(

                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator color="#96D8CA"
                                       style={[{height: 80}]}
                                       size="large"/>
                </View>

        );
    }

    _reanderAll(){
        let title = this._renderTitle();

        let top = this._renderTopView();

        let content = [];
        let i =1;
        this.state.data.containers.split(";").map(item=>{
            if (item.endsWith("；&lt") || item.endsWith("。&lt")){
                item = item.replace("；&lt","");
                item = item.replace("。&lt","");
                content.push(
                    this._renderContent(i, item)
                );
                i++;
            }
        });


        return (

                <ScrollView>
                    {title}
                    {top}
                    <View style={{backgroundColor:'#fff', paddingTop:8}}>
                        {content}
                    </View>

                </ScrollView>

        );
    }


    //顶部返回
    _renderTitle(){
        return(
            <View>
                <Image style={{width:Utils.size.width, height:239, resizeMode:'cover'}} source={require('./../../images/findBanner6.jpg')}></Image>

                <TouchableOpacity style={{ position:'absolute', marginTop: 8, marginLeft: 8}} onPress={()=>{
                    this.props.navigation.goBack();
                }}>
                    <Image style={{width:19 * 3 * Utils.pixel, height:18 * 3 * Utils.pixel}} source={require('./../../images/goback.png')}/>
                </TouchableOpacity>

            </View>
        );
    }
    //头部信息部分
    _renderTopView(){


        return(
            <View style={{marginBottom: 10, backgroundColor:'#fff',paddingTop:8}}>
                 <View style={{alignItems:'center'}}>
                     <Text style={{color: "#333333", fontSize:16}}>{this.state.data.name}</Text>
                     <View style={{flexDirection:'row', justifyContent:'center', marginTop:8}}>
                         <Image style={{width: 15, height: 15, marginTop: 4, marginRight: 4}} source={require('./../../images/day.png')} />
                         <Text style={{color: "#999999", fontSize:15}}>30min</Text>
                     </View>

                     <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:8}}>

                         <View style={{width: Utils.size.width / 3, justifyContent:'center' ,alignItems:'center'}}>
                             <Text style={{borderWidth: 1 * Utils.pixel, borderColor:'#98d9cb', padding: 4, fontSize:14}}>{this.state.data.label}</Text>
                         </View>
                         {/*<View style={{width: Utils.size.width / 3, justifyContent:'center' ,alignItems:'center'}}>*/}
                             {/*<Text style={{borderWidth: 1 * Utils.pixel, borderColor:'#98d9cb', padding: 4, fontSize:14}}>营养健康</Text>*/}
                         {/*</View>*/}
                         {/*<View style={{width: Utils.size.width / 3, justifyContent:'center' ,alignItems:'center'}}>*/}
                             {/*<Text style={{borderWidth: 1 * Utils.pixel, borderColor:'#98d9cb', padding: 4, fontSize:14}}>营养健康</Text>*/}
                         {/*</View>*/}

                     </View>


                     <View style={{marginTop:10, borderTopWidth: 1* Utils.pixel, borderTopColor:'#E1E1E1', flexDirection:'row'}}>

                         <View style={{width: Utils.size.width / 4, justifyContent:'center' ,alignItems:'center'}}>
                             <Text style={{color:'#999999', padding: 4, fontSize:13}}>热量</Text>
                             <Text style={{color:'#333333', padding: 4, fontSize:18}}>{this.state.data.totalHeatQuantity}</Text>
                         </View>
                         {/*<View style={{width: Utils.size.width / 4, justifyContent:'center' ,alignItems:'center'}}>*/}
                             {/*<Text style={{color:'#999999', padding: 4, fontSize:13}}>热量</Text>*/}
                             {/*<Text style={{color:'#333333', padding: 4, fontSize:18}}>478cal</Text>*/}
                         {/*</View>*/}
                         {/*<View style={{width: Utils.size.width / 4, justifyContent:'center' ,alignItems:'center'}}>*/}
                             {/*<Text style={{color:'#999999', padding: 4, fontSize:13}}>热量</Text>*/}
                             {/*<Text style={{color:'#333333', padding: 4, fontSize:18}}>478cal</Text>*/}
                         {/*</View>*/}
                         {/*<View style={{width: Utils.size.width / 4, justifyContent:'center' ,alignItems:'center'}}>*/}
                             {/*<Text style={{color:'#999999', padding: 4, fontSize:13}}>热量</Text>*/}
                             {/*<Text style={{color:'#333333', padding: 4, fontSize:18}}>478cal</Text>*/}
                         {/*</View>*/}
                     </View>


                 </View>
            </View>
        );
    }

    //内容部分
    _renderContent(num, text, image){
            return(
                <View key={num} style={{backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row', paddingLeft:8, paddingRight:8}}>
                        <View style={{width: 30, height:30, borderRadius:15, backgroundColor:'#98d9cb', justifyContent:'center',alignItems:'center', marginRight: 10}}>
                            <Text style={{color:'#fff', fontSize: 14}}>{num}</Text>
                        </View>
                        <View style={{justifyContent:'center'}}>
                            <Text style={{color:'#666666', fontSize: 13}}>{text}</Text>
                        </View>

                    </View>
                    <View style={{flexDirection:'row',paddingLeft:8, paddingRight:8}}>
                        <View style={{width: 30,alignItems:'center'}}>
                            <View style={{width: 5, height:190, backgroundColor:'#98d9cb',alignItems:'center'}}></View>
                        </View>
                        <View style={{paddingTop: 8, marginBottom:8}}>
                            <Image style={{height:175, resizeMode:'cover',width:Utils.size.width - 46}} source={require('./../../images/456.png')} />
                        </View>
                    </View>


                </View>

            );
    }


    componentWillMount(){
       Utils.get(Utils.baseNet + Utils.getDietPlanDetail + user.userToken + "&compoundFoodId=" + this.props.navigation.state.params.compoundFoodId, data=>{
            console.log('tianzhw:', data);
           console.log('tianzhw:', data.data);
            if (data.state == 1){

                this.setState({
                    data : data.data,
                    isLoading:false
                });

            }else{

            }

       },e=>{
           console.log('tianzhw:', e);
       });
    }

}