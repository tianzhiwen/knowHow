/**
 * Created by tianzhw on 2017/7/24.
 * 个人健康报告
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import TitleBar from './../component/titleBar';
import Utils from './../utils/utils';
import Echarts from 'native-echarts';
import SwitchUser from '../component/switchUser';
import AlertComponent from './../component/AlertComponent';
export default class PersonalHealthReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            apple:[0, 0, 7],
            listData:[],//人员列表集合
            reportData: '',//个人健康报告数据
            person:'',//选择人员

            isLoading : true,

            title1IsShow: false,
            title2IsShow: false,
            title3IsShow: false,
            title4IsShow: false,
            title5IsShow: false,
            title6IsShow: false,
            title7IsShow: false,

            alterMessage:'',
        }


    }

    /**
     * 获取报告信息
     * @data 家庭成员集合
     * index
     */
    _getReport(params){

        console.log('Person', params);

        //家庭成员必须大约1个人
        if (this.state.listData.length > 0){
             let person = params;
             this.state.person = person;

            let reportUrl = Utils.baseNet + Utils.getReport + '&userToken=' + user.userToken + '&myMemberOfFamilyId' + person.id;

            Utils.get(reportUrl, (result)=>{
                console.log('res:' , result);

                if (result.state > 0){
                    this.setState({
                        reportData: result.data,
                        isLoading: false,
                    });
                }else{
                    this.setState({
                        alterMessage: result.message,
                        isLoading: true,
                    });

                    this.refs.alert.show();
                }
            },(e)=>{
                this._renderErrorMessage('数据获取异常，请稍后再试');
            });

        }else{
            this._renderErrorMessage('未添加家庭成员');
        }
    }

    _renderErrorMessage(message){
        this.setState({
            isLoading: true,
        });
        this.refs.alert.show('提示', message);
    }

    /**
     * 获取家庭成员集合
     * @private
     */
    _getFamilyList(){
        Utils.getFamilyList(data=>{
            //更新数据不更新UI
            this.state.listData = data;
            this._getReport(this.state.listData[0]);
        },e=>{
            this._renderErrorMessage('数据获取异常，请稍后再试');
        });
    }



    componentDidMount(){
        this._getFamilyList();
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

    _renderReportView(){

        const date = new Date();
        let age = date.getFullYear() - parseInt(this.state.person.birthday.split('-')[0]);

        let scrollViewHeight = Utils.size.height - 105;

        let icon = null;
        let name = null;
        switch (this.state.person.roleName){
            case 'zhishi_user_role_baba':
                icon = require('./../../images/baba.png');
                name = '爸爸';
                break;
            case 'zhishi_user_role_mama':
                icon = require('./../../images/mama.png');
                name = '妈妈';
                break;
            case 'zhishi_user_role_nvbaobao':
                icon = require('./../../images/nvbaobao.png');
                name = '女宝宝';
                break;
            case 'zhishi_user_role_baobao':
                icon = require('./../../images/baobao.png');
                name = '男宝宝';
                break;
        }



        let title1 = this._renderSelectTitle('BMI评估',true, require('./../../images/reporticon1.png'), this.state.title1IsShow, this.state.reportData.BMI评估 == '未填写' ? false : true, ()=>{
            this.setState({
                title1IsShow: !this.state.title1IsShow
            });
        });

        let title1View = this.state.title1IsShow ? this._renderTitle1View() : null;


        let title2 = this._renderSelectTitle('腰臀比评估',false, require('./../../images/reporticon2.png'), this.state.title2IsShow,this.state.reportData.腰臀比评估 == '未填写' ? false : true,  ()=>{
            this.setState({
                title2IsShow: !this.state.title2IsShow
            });
        });

        let title2View = this.state.title2IsShow ?  this._renderTitle2View(): null;

        let title3 = this._renderSelectTitle('饮食评估',false, require('./../../images/reporticon3.png'), this.state.title3IsShow,true,  ()=>{
            this.setState({
                title3IsShow: !this.state.title3IsShow
            });
        });

        let title3View = this.state.title3IsShow ? this._renderTitle3View() : null;


        let title4 = this._renderSelectTitle('身体活动评估',false, require('./../../images/reporticon4.png'), this.state.title4IsShow, this.state.reportData.身体活动评估 == '未填写' ? false : true,  ()=>{
            this.setState({
                title4IsShow: !this.state.title4IsShow
            });
        });

        let title4View = this.state.title4IsShow ? this._renderTitle4View() : null;


        let title5 = this._renderSelectTitle('排便情况评估',false, require('./../../images/reporticon5.png'), this.state.title5IsShow, this.state.reportData.排便情况评估 == '未填写' ? false : true,  ()=>{
            this.setState({
                title5IsShow: !this.state.title5IsShow
            });
        });

        let title5View = this.state.title5IsShow ? this._renderTitle5View() : null;


        let title6 = this._renderSelectTitle('睡眠时间评估',false, require('./../../images/reporticon6.png'), this.state.title6IsShow,this.state.reportData.睡眠时间 == '未填写' ? false : true,  ()=>{
            this.setState({
                title6IsShow: !this.state.title6IsShow
            });
        });

        let title6View = this.state.title6IsShow ? this._renderTitle6View() : null;

        let title7 = this._renderSelectTitle('压力评估',false, require('./../../images/reporticon7.png'), this.state.title7IsShow,this.state.reportData.压力评估 == '未填写' ? false : true,  ()=>{
            this.setState({
                title7IsShow: !this.state.title7IsShow
            });
        });

        let title7View = this.state.title7IsShow ? this._renderTitle7View() : null;
        return(
            <View style={styles.contain}>
                <SwitchUser ref="switchUser" list={this.state.listData} switchClick={(it)=>{
                    this._getReport(it);
                }}/>
                <TitleBar title="个人健康报告" iconLeft={require('./../../images/goback.png')} backClick={()=>{
                    this.props.navigation.goBack();
                }} iconRight={require('./../../images/reportmore.png')} rightClick={()=>{
                    this.refs.switchUser._setModalVisible(true);
                }}/>
                <View style={{height: scrollViewHeight}}>
                    <ScrollView>
                        <View style={styles.viewSub1}>
                            <View style={{alignItems:'center', justifyContent:'center', marginTop:10, flexDirection:'row'}}>
                                <Text style={{color:'#939393'}}>健康危险项</Text><Text style={{color:'#F58482'}}>2项</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:8,padding:8}}>
                                <View style={{position:'relative',flex:1,alignItems:'flex-end', justifyContent:'center'}}>
                                    <Image style={{width:100, height:100}} source={icon}></Image>
                                    <View style={{padding:4,position:'absolute', bottom:0,alignItems:'center', justifyContent:'center', backgroundColor:'#db7093',
                                borderRadius:10, width: 100}}>
                                        <Text style={{color:'#fff'}} >{this.state.person.alias}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <View style={{flexDirection:'row',alignItems:'center', marginLeft:10, height:35}}>
                                        <View style={{width:10, height:10, borderRadius: 5, backgroundColor:'#D6D7DC'}}></View>
                                        <Text style={{marginLeft:10, marginRight:10,color:'#484848'}}>年龄</Text>
                                        <Text style={{color:'#B5B5B5'}}>{age}岁</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center', marginLeft:10, height:35}}>
                                        <View style={{width:10, height:10, borderRadius: 5, backgroundColor:'#D6D7DC'}}></View>
                                        <Text style={{marginLeft:10, marginRight:10,color:'#484848'}}>身高</Text>
                                        <Text style={{color:'#B5B5B5'}}>{this.state.person.heigth}cm</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center', marginLeft:10, height:35}}>
                                        <View style={{width:10, height:10, borderRadius: 5, backgroundColor:'#D6D7DC'}}></View>
                                        <Text style={{marginLeft:10, marginRight:10,color:'#484848'}}>体重</Text>
                                        <Text style={{color:'#B5B5B5'}}>{this.state.person.weight}kg</Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <View style={styles.viewSub2}>

                            {title1}

                            {title1View}

                        </View>

                        <View style={styles.viewSub2}>
                            {title2}
                            {title2View}
                        </View>

                        <View style={styles.viewSub2}>
                            {title3}
                            {title3View}
                            {/*<View style={{alignItems:'center', justifyContent:'center'}}>*/}
                            {/*<Image style={{width:30, height:30}} source={require('./../../images/reportimg1.png')} />*/}
                            {/*<Text>您每天进食的食物种类太少啦，每天至少12种食物的摄入才能有助于膳食均衡，预防慢性病。您的的饮水量太少啦，每天1700ml以上的饮水量有助于新陈代谢、排毒养颜。</Text>*/}
                            {/*</View>*/}
                            {/*<View style={{alignItems:'center', justifyContent:'center'}}>*/}
                            {/*<Image style={{width:30, height:30}} source={require('./../../images/reportimg2.png')} />*/}
                            {/*<Text>您每天进食的食物种类太少啦，每天至少12种食物的摄入才能有助于膳食均衡，预防慢性病。您的的饮水量太少啦，每天1700ml以上的饮水量有助于新陈代谢、排毒养颜。</Text>*/}
                            {/*</View>*/}
                            {/*<View style={{alignItems:'center', justifyContent:'center'}}>*/}
                            {/*<Image style={{width:30, height:30}} source={require('./../../images/reportimg3.png')} />*/}
                            {/*<Text>您每天进食的食物种类太少啦，每天至少12种食物的摄入才能有助于膳食均衡，预防慢性病。您的的饮水量太少啦，每天1700ml以上的饮水量有助于新陈代谢、排毒养颜。</Text>*/}
                            {/*</View>*/}
                        </View>

                        <View style={styles.viewSub2}>
                            {title4}
                            {title4View}
                        </View>

                        <View style={styles.viewSub2}>

                            {title5}
                            {title5View}
                            {/*<View style={{flexDirection:'row', alignItems:'center'}}>*/}
                            {/*<Image style={{width:30, height:30}} source={require('./../../images/reporticon4.png')} />*/}
                            {/*<Text style={{width:100, marginLeft:8}}>睡眠时间评估</Text>*/}
                            {/*</View>*/}

                        </View>


                        <View style={styles.viewSub2}>
                            {title6}
                            {title6View}
                            {/*<View style={{flexDirection:'row', alignItems:'center'}}>*/}
                            {/*<Image style={{width:30, height:30}} source={require('./../../images/reporticon5.png')} />*/}
                            {/*<Text style={{width:100, marginLeft:8}}>排便情况评估</Text>*/}
                            {/*</View>*/}
                            {/*<View style={{flexDirection:'row', alignItems:'center'}}>*/}
                            {/*<Image style={{width:100, height:100 , resizeMode:'contain'}} source={require('./../../images/reportimg5.png')} />*/}
                            {/*<Text style={{flex:1}}>如果确实是长期便秘，可能的原因有富含膳食纤维的蔬果和粗粮吃的少/饮水不足/食量太小营养不良 /轻度的细菌性肠胃炎等相关，需要调整饮食适量运动来改善便秘。</Text>*/}
                            {/*</View>*/}
                        </View>

                        <View style={styles.viewSub2}>
                            {title7}
                            {title7View}
                            {/*<View style={{flexDirection:'row', alignItems:'center'}}>*/}
                            {/*<Image style={{width:30, height:30}} source={require('./../../images/reporticon6.png')} />*/}
                            {/*<Text style={{width:100, marginLeft:8}}>排便情况评估</Text>*/}
                            {/*</View>*/}
                            {/*<View style={{flexDirection:'row', alignItems:'center'}}>*/}
                            {/*<Image style={{width:100, height:100, resizeMode:'contain'}} source={require('./../../images/reportimg6.png')} />*/}
                            {/*<Text style={{flex:1}}>适度的压力可以激发我们的潜能，所以掌握一定的情绪梳理方法对于压力缓解至关重要，建议提升自我笑对压力。</Text>*/}
                            {/*</View>*/}
                        </View>
                    </ScrollView>
                </View>
                <View style={{flex:1,backgroundColor:'#98d9cb',flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={()=>{
                          global.nav.navigate('Questionnaire',{data: this.state.person});
                    }}>
                        <Text style={{color:'#fff'}}>重新评测</Text>
                    </TouchableOpacity>
                    <View style={{backgroundColor:'#fff', width:1 * Utils.pixel, marginTop:8, marginBottom:8}}></View>
                    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={()=>{
                        global.nav.navigate('Questionnaire',{data: this.state.person});
                    }}>
                        <Text style={{color:'#fff'}}>继续评测</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    render() {


        let contentView = this.state.isLoading ? this._readerActivityIndicatorView() : this._renderReportView();


        return (
            <View style={{flex:1}}>

                <AlertComponent ref="alert" title="提示" message={this.state.alterMessage} mode="alert"  click={()=>{
                   this.props.navigation.goBack();
                }}/>

                {contentView}
            </View>
        );
    }


    _renderSelectTitle(title,tag, image, isShow,isTest, click){
        let _tag =  tag ? <Image style={{width:13 * Utils.pixel, height:27 * Utils.pixel, position:'absolute',left:95,top:0}} source={require('./../../images/lei.png')} /> : null;
        let _test = isTest ? <Image style={{width: 31 * Utils.pixel, height: 16 * Utils.pixel}}  source={isShow ? require('./../../images/up.png') : require('./../../images/down.png') } /> : <Text style={{color:'#AFAFAF'}}>未评测</Text>
        return(

                <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} onPress={()=>{
                    isTest ? click() : '';
                }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image style={{width:30, height:30}} source={image} />
                        <Text style={{width:100, marginLeft:8, color:'#1D1D1D'}}>{title}</Text>
                        {_tag}
                    </View>

                    <View>
                        {_test}
                    </View>
                </TouchableOpacity>

        );

    }

    _renderTitle1View(){

        const option = {
            title:{
                show:false
            },
            //点击某一个点的数据的时候，显示出悬浮窗
            tooltip : {
                trigger: 'axis'
            },
            //可以手动选择现实几个图标
            // legend: {
            //     data:['苹果']
            // },
            // //各种表格
            // toolbox: {
            //     //改变icon的布局朝向
            //     //orient: 'vertical',
            //     show : true,
            //     showTitle:true,
            //     feature : {
            //         //show是否显示表格，readOnly是否只读
            //         dataView : {show: true, readOnly: false},
            //         magicType : {
            //             //折线图  柱形图    总数统计 分开平铺 'line', 'bar','stack','tiled'
            //             type: ['line'],
            //         },
            //
            //     }
            // },
            xAxis : [
                {
                    //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                    boundaryGap:false,
                    type : 'category',
                    data : ['Mon','Tues','Wed','Thur','Fri','Sat','Sub']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : ''
                }
            ],
            //图形的颜色组
            color:['#98d9cb'],
            //需要显示的图形名称，类型，以及数据设置
            series : [
                {
                    name:'BMI',
                    //默认显
                    type:'line',
                    data:this.state.apple
                }
            ]
        };

        return(
            <View>
                <Echarts option={option} height={250} width={Utils.size.width}/>
                <Text style={{color:'#676767', fontSize: 12}}>
                    {this.state.reportData.BMI评估}
                </Text>
            </View>
        );
    }

    _renderTitle2View(){
        return(
            <View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image style={{width:100, height:100}} source={require('./../../images/tun.png')} />
                    <Text style={{flex:1,color:'#676767', fontSize: 12}}>您的腰臀比值为，已经超出健康范围，可诊断为中心型肥胖（腹型肥胖）,建议通过饮食调整和运动达到改善腰臀比，预防慢性病的目的</Text>
                </View>
            </View>
        );
    }

    _renderTitle3View(){
        return(
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <Image style={{width:32, height:32}} source={require('./../../images/reportimg1.png')} />
                <Text style={{color:'#676767', fontSize: 12}}>您每天进食的食物种类太少啦，每天至少12种食物的摄入才能有助于膳食均衡，预防慢性病。您的的饮水量太少啦，每天1700ml以上的饮水量有助于新陈代谢、排毒养颜。</Text>
            </View>
        );
    }

    _renderTitle4View(){
        return(
            <View style={{marginTop:8}}>
                <View style={{height:20, borderWidth:1 * Utils.pixel, borderRadius: 10, padding:2,borderColor:'#98d9cb', flexDirection:'row'}}>
                    <View style={{flex:1, backgroundColor:'#98d9cb', borderTopLeftRadius:10, borderBottomLeftRadius:10}}></View>
                    <View style={{flex:1, backgroundColor:'#98d9cb'}}></View>
                    <View style={{flex:1}}></View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'#f57d7e', fontSize: 11}}>偏少区</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center', borderLeftWidth:1*Utils.pixel, borderColor:'#98d9cb', borderRightWidth:1*Utils.pixel}}>
                        <Text style={{color:'#f57d7e', fontSize: 11}}>适中区</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'#f57d7e', fontSize: 11}}>充足区</Text>
                    </View>
                </View>
                <View>
                    <Text style={{color:'#676767', fontSize: 12}}>您的腰臀比值为 ，已超出健康范围，可诊断为中心型肥胖（腹型肥胖），建议通过饮食调整和运动塑性达到改善腰臀比，预防慢性病的目的。</Text>
                </View>
            </View>
        );
    }


    _renderTitle5View(){
        return(
            <View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Image style={{width:40, height:40}} source={require('./../../images/reportimg4.png')}/>
                    <Text  style={{color:'#f57d7e', fontSize: 11, marginLeft:10}}>8小时以下</Text>
                </View>
                <View>
                    <Text style={{color:'#676767', fontSize: 12}}>偶尔的熬夜可以理解，但持续晚睡带来的乏力、皮肤变差、视力降低、肥胖等问题不容小觑，建议您把睡觉当成任务在23点前完成。</Text>
                </View>
            </View>
        );
    }

    _renderTitle6View(){
        return(
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image style={{width:100, height:100 , resizeMode:'contain'}} source={require('./../../images/reportimg5.png')} />
                <Text style={{flex:1,color:'#676767', fontSize: 12}}>如果确实是长期便秘，可能的原因有富含膳食纤维的蔬果和粗粮吃的少/饮水不足/食量太小营养不良 /轻度的细菌性肠胃炎等相关，需要调整饮食适量运动来改善便秘。</Text>
            </View>
        );
    }

    _renderTitle7View(){
        return(
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image style={{width:100, height:100, resizeMode:'contain'}} source={require('./../../images/reportimg6.png')} />
                <Text style={{flex:1, color:'#676767', fontSize: 12}}>适度的压力可以激发我们的潜能，所以掌握一定的情绪梳理方法对于压力缓解至关重要，建议提升自我笑对压力。</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor:'#FAFAFA'
    },
    viewSub1:{
        marginTop:10,
        backgroundColor:'#fff'
    },
    viewSub2:{
        marginTop:10,
        backgroundColor:'#fff',
        padding:8
    }
});