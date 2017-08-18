/**
 * Created by tianzhw on 2017/7/31.
 * 个人饮食计划
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Utils from './../utils/utils';
import TitleBar from './../component/titleBar';
import Alert from './../component/AlertComponent';
export default class PersonaDietPlan extends Component {

    constructor(props){
        super(props);
        const date = new Date();


        this.state = {
            isLeftClick : true, //用来设置是原则还是饮食方案按钮的样式的
            indexPage: (date.getMonth() + 1) + "月-" + date.getDate() + '日',//当前选中的日期
            breakfast: false,//早餐
            lunch:false,//午餐
            dinner:false,//晚餐
            AddAMeal:false,//加餐

            dataSelectIndex: 0,//选中数据项
            data:'',// isLeftClick = true 选中餐谱数据
            dataList:'', // 配餐7天数据组合
            dataRight:'', //isLeftClick = false 方案的数据　

            isLoading: true //是否再加载数据
        }
    }


    render() {



        let content =  this.state.isLoading ? null :  (this.state.isLeftClick ?   this._renderFanAn() : this._renderYuanZhe() );


        return (
            <View style={{flex:1, backgroundColor:'#FAFAFA'}}>
                <TitleBar title="个人饮食计划" iconLeft={require('./../../images/goback.png')} backClick={()=>{
                    this.props.navigation.goBack();
                }} />

                <Alert ref="progress" mode="progress" />


                <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity style={this.state.isLeftClick ? styles.buttonClickLeft : styles.buttonNoClickLeft} onPress={()=>{

                        this._getFanAnData();

                        this.setState({
                            isLeftClick: true
                        });
                    }}>
                        <Text  style={this.state.isLeftClick ? styles.textClick : styles.textNoClick}>饮食方案</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.state.isLeftClick ? styles.buttonNoClickRight : styles.buttonClickRight} onPress={()=>{
                        this._getYuanZe();
                        this.state.isLeftClick = false;
                        // this.setState({
                        //     isLeftClick:false
                        // });
                    }}>
                        <Text style={this.state.isLeftClick ? styles.textNoClick : styles.textClick}>原则</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    {content}
                </ScrollView>
            </View>
        );
    }

    /**
     * 根据日期字符串获取星期几
     * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
     * @returns {String}
     */
    _getWeek(date){
        //var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
        //return "星期" + weeks[date.getDay()];
        return "日一二三四五六".charAt(date.getDay());
    };

    /**
     * 获取当前月份有多少天
     * @param year
     * @param month
     * @returns {number}
     * @private
     */
    _getDaysInMonth(year,month){
        month = parseInt(month,10)+1;
        let temp = new Date(year+"/"+month+"/0");
        return temp.getDate();
    }

    _renderFanAn(){
        let subWidth =  (Utils.size.width - Utils.size.width/3) / 3;
        let scrollViewSubViews = [];

        let dataList = [];

        let d = new Date;
        let w = d.getDay();
        let n = (w == 0 ? 7 : w) - 1;
        d.setDate(d.getDate() - n);
        for(let i=0; i<7; i++) {
            dataList.push({
                date: (d.getMonth()+1) + '月-' + d.getDate() + '日',
                week: d.getDay()
            })
            d.setDate(d.getDate() + 1);
        }


        for (let i=0; i< 7; i++){

            let data = dataList[i];

            scrollViewSubViews.push(
                <TouchableOpacity key={i} style={[{width: subWidth,  height:60, justifyContent:'center', alignItems:'center', borderColor:'#E1E1E1', borderLeftWidth: 1 * Utils.pixel}, this.state.indexPage == data.date ? {backgroundColor:'#96D8CA'}: {}]} onPress={()=>{
                    this.setState({
                        indexPage: data.date,
                        data: this.state.dataList[i]
                    });
                }}>
                    <Text style={this.state.indexPage == data.date ? {color:'#fff', fontSize:13}:{color:'#666666', fontSize:13}}>{data.date}</Text>
                </TouchableOpacity>
            );
        }




///get?infoType=personFoodPlanDetail&userToken=xxx&compoundFoodId=xxx
        let food1 = this._renderFood(this.state.data.breakfast, require('./../../images/breakfast.png'), require('./../../images/b.png'),'(8:00-9:00)','早餐', this.state.breakfast, ()=>{ this.setState({breakfast: !this.state.breakfast})}, ()=>{ global.nav.navigate('PersonCatering',{compoundFoodId: this.state.data.breakfast[0].compoundFoodId});});
        let food2 = this._renderFood(this.state.data.lunch, require('./../../images/lunch.png'), require('./../../images/l.png'),'(11:00-13:00)','午餐', this.state.lunch, ()=>{ this.setState({lunch: !this.state.lunch})}, ()=>{ global.nav.navigate('PersonCatering',{compoundFoodId: this.state.data.lunch[0].compoundFoodId});});
        let food3 = this._renderFood(this.state.data.nightSnack, require('./../../images/AddAMeal.png'), require('./../../images/a.png'),'(15:00-16:00)','加餐', this.state.AddAMeal, ()=>{ this.setState({AddAMeal: !this.state.AddAMeal})}, ()=>{ global.nav.navigate('PersonCatering',{compoundFoodId: this.state.data.nightSnack[0].compoundFoodId});});
        let food4 = this._renderFood(this.state.data.dinner, require('./../../images/dinner.png'), require('./../../images/d.png'),'(18:00-17:00)','晚餐', this.state.dinner, ()=>{ this.setState({dinner: !this.state.dinner})}, ()=>{ global.nav.navigate('PersonCatering',{compoundFoodId: this.state.data.dinner[0].compoundFoodId});});

        return(
            <View>
                <Image style={{width: Utils.size.width, height: 60, resizeMode:'cover'}} source={require('./../../images/fangan.png')} />
                <ScrollView ref="scrollView" style={{borderTopWidth: 1 * Utils.pixel, borderBottomWidth: 1 * Utils.pixel, borderColor: '#E1E1E1'}} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{width: Utils.size.width/3, height:60, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:12, color:'#999999'}}>滑动查看</Text>
                    </View>

                    {scrollViewSubViews}

                    <View style={{width: Utils.size.width/3, height:60, justifyContent:'center', alignItems:'center', borderColor:'#E1E1E1', borderLeftWidth: 1 * Utils.pixel}}>
                        <Text  style={{fontSize:12, color:'#999999'}}>下一阶段</Text>
                    </View>
                </ScrollView>
                <View style={{padding: 6}}>
                    {food1}
                    {food2}
                    {food3}
                    {food4}
                </View>
            </View>
        );
    }
    //方案View
    _renderYuanZhe(){
            let typeView = this._renderFangAnType();
            return (
                <View>
                    <View style={{backgroundColor:"#fff"}}>
                        <View style={{padding:4}}><Text style={{ color:'#333333', fontSize:14}}>全日食材分配</Text></View>
                        {typeView}
                        <View style={{flexDirection:'row', flexWrap: 'wrap', padding: 4}}>
                            <View style={{width: Utils.size.width/2 - 4, padding: 4, justifyContent:'center', alignItems:'center'}}>
                                <Image style={{width: 30, height:30}} source={require('./../../images/reportimg1.png')} />
                                <Text numberOfLines={4} style={{ color:'#666666', fontSize:11, marginTop: 8}}>不和甜饮料/碳酸饮料/杜绝饮酒</Text>
                            </View>
                            <View style={{width: Utils.size.width/2 - 4, padding: 4, justifyContent:'center', alignItems:'center'}}>
                                <Image style={{width: 30, height:30}} source={require('./../../images/reportimg1.png')} />
                                <Text numberOfLines={4} style={{ color:'#666666', fontSize:11, marginTop: 8}}>每天足量饮水，水量多次饮用</Text>
                            </View>
                            <View style={{width: Utils.size.width/2 - 4, padding: 4, justifyContent:'center', alignItems:'center'}}>
                                <Image style={{width: 30, height:30}} source={require('./../../images/reportimg1.png')} />
                                <Text numberOfLines={4} style={{ color:'#666666', fontSize:11, marginTop: 8}}>低油低脂低盐，清淡饮食健康烹调，避免油炸和烧烤</Text>
                            </View>
                            <View style={{width: Utils.size.width/2 - 4, padding: 4, justifyContent:'center', alignItems:'center'}}>
                                <Image style={{width: 30, height:30}} source={require('./../../images/reportimg1.png')} />
                                <Text numberOfLines={4} style={{ color:'#666666', fontSize:11, marginTop: 8}}>三餐定时定量，早餐营养要全面充足</Text>
                            </View>
                            <View style={{width: Utils.size.width/2 - 4, padding: 4, justifyContent:'center', alignItems:'center'}}>
                                <Image style={{width: 30, height:30}} source={require('./../../images/reportimg1.png')} />
                                <Text numberOfLines={4} style={{ color:'#666666', fontSize:11, marginTop: 8}}>合理选择零食，首选奶制品、新鲜水果或原味坚果，零食要适量且不可替代正餐</Text>
                            </View>
                            <View style={{width: Utils.size.width/2 - 4, padding: 4, justifyContent:'center', alignItems:'center'}}>
                                <Image style={{width: 30, height:30}} source={require('./../../images/reportimg1.png')} />
                                <Text numberOfLines={4} style={{ color:'#666666', fontSize:11, marginTop: 8}}>培养健康饮食，不偏食节食暴食</Text>
                            </View>

                        </View>
                    </View>

                    <View style={{backgroundColor:'#fff', marginTop: 10, padding:4}}>
                        {/*<Text style={{ color:'#333333', fontSize:14}}>运动须知</Text>*/}
                        {/*<View style={{flexDirection:'row', alignItems:'center'}}>*/}
                            {/*<Image style={{width: Utils.size.width / 2, height: Utils.size.width / 2 * .75, resizeMode:'contain'}} source={require('./../../images/findBanner3.jpg')} />*/}
                            {/**/}
                            {/*<Text style={{ color:'#666666', fontSize:11}}>运动前应有10-15分钟准备活动，运动后应有5-10分钟的回复活动</Text>*/}
                        {/**/}
                        {/*</View>*/}
                        {/*<View style={{flexDirection:'row', alignItems:'center'}}>*/}
                            {/*<Text style={{width: Utils.size.width / 2, color:'#666666', fontSize:11}}>运动前应有10-15分钟准备活动，运动后应有5-10分钟的回复活动</Text>*/}
                            {/*<Image style={{width: Utils.size.width / 2, height: Utils.size.width / 2 * .75, resizeMode:'contain'}} source={require('./../../images/findBanner3.jpg')} />*/}
                        {/*</View>*/}
                    </View>


                </View>
            );
    }
    //方案圆盘UI
    _renderFangAnType(){
        let contenNum = this.state.dataRight.totalHeatQuantity;//总热量
        let guwu;
        let shiyongyou;
        let nailei;
        let danlei;
        let shuiguolei;
        let shucailei;
        let jianguolei;




        let result = JSON.parse(this.state.dataRight.containers);



        // let result = this.state.dataRight.containers.replace(/ ' /g, "");
        // let result = result.subString(result.length - 1);
        console.log('tianzhw1123123', result);
        //获取食物分类数据
        result.containers.map(it=>{
            switch (it.foodClassify) {
              case '谷薯类':
                guwu = it.recommendEatFood;
                break;
             case '食用油':
                shiyongyou = it.recommendEatFood;
                break;
             case '奶类':
                nailei = it.recommendEatFood;
                break;
             case '蛋类':
                danlei = it.recommendEatFood;
                break;
             case '坚果类':
                jianguolei = it.recommendEatFood;
                break;
              case '鱼肉类':
                yuroulei = it.recommendEatFood;
                break;
              case '蔬菜类':
                shucailei = it.recommendEatFood;
                break;
              case '坚果类':
                jianguolei = it.recommendEatFood;
                break;
            }
        });






        let width2 = 250 / 2;

        return(
            <View style={{padding:6, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
                <Image style={{width:250, height:250, resizeMode:'cover',justifyContent:'center', alignItems:'center'}} source={require('./../../images/123.png')} >
                    <View  style={{justifyContent:'center', alignItems:'center', position: 'relative', top:55}}>
                        <Text>总热量</Text>
                        <Text>{contenNum}</Text>
                    </View>

                    {/*左1*/}
                    <View  style={{justifyContent:'center', alignItems:'center', position: 'relative',bottom: width2 / 2 - 35, right: 23 }}>
                        <Text style={{fontSize:10, color:'#fff'}}>{guwu}</Text>
                    </View>

                    {/*//左2*/}
                    <View  style={{justifyContent:'center', alignItems:'center', position: 'relative', bottom: width2 / 2 - 55, right: 55}}>
                        <Text style={{fontSize:10, color:'#fff'}}>{shiyongyou}</Text>
                    </View>

                    {/*左3*/}
                    <View  style={{justifyContent:'center', alignItems:'center', position: 'relative', bottom: -20, right: width2 /2 - 10 }}>
                        <Text style={{fontSize:10, color:'#fff'}}>{nailei}</Text>
                    </View>


                    {/*左4*/}
                    <View  style={{justifyContent:'center', alignItems:'center', position: 'relative', top: 38, right: 22}}>
                        <Text style={{fontSize:10, color:'#fff'}}>{danlei}</Text>
                    </View>


                    {/*右1*/}
                    <View  style={{justifyContent:'center', alignItems:'center', position: 'relative',bottom: width2  - 42 , left:20}}>
                        <Text style={{fontSize:10, color:'#fff'}}>{shuiguolei}</Text>
                    </View>


                    {/*//右2*/}
                    <View  style={{justifyContent:'center', alignItems:'center', position: 'relative', bottom: width2 - 65, left: 55}}>
                        <Text style={{fontSize:10, color:'#fff'}}>{yuroulei}</Text>
                    </View>


                    {/*右3*/}
                    <View  style={{justifyContent:'center', alignItems:'center', position: 'relative', bottom: 36, left: 53}}>
                        <Text style={{fontSize:10, color:'#fff'}}>{shucailei}</Text>
                    </View>


                    {/*右4*/}
                    <View  style={{justifyContent:'center', alignItems:'center', position: 'relative', bottom: 15, left: 23}}>
                        <Text style={{fontSize:10, color:'#fff'}}>{jianguolei}</Text>
                    </View>
                </Image>
            </View>
        );
    }


    //饮食空界面
    _renderFoodEmpty(){
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center', height: Utils.size.height - 150}}>
                    <Image style={{width: 150, height: 100, resizeMode:'contain'}} source={require('./../../images/findBanner5.jpg')} />
                    <Text style={{marginTop: 5}}>去测评一下获得您的专属方案吧！</Text>
                     <TouchableOpacity style={{width:Utils.size.width*.25,
                            height:30, backgroundColor:'#96D8CA', borderRadius:10, marginTop: 5, elevation:8,marginBottom: 10,
                            alignItems:'center', justifyContent:'center'}} onPress={()=>{

                               // nav.navigate('Guide3', {image : icon, cm : this.state.cm, kg: this.state.kg, sex : this.props.navigation.state.params.sex});
                            }}>
                            <Text style={{color:'#fff'}}>去测评</Text>
                        </TouchableOpacity>
            </View>
        );
    }
    //饮食方案数据UI
    _renderFood(item, image, image2,time,  title,isShow,more,personCatering){
            console.log('item', item);
        //
        let subViews=[];



        let cal = 0;
        item.map(it=>{
            let i = 0;
            if (Array.isArray(it.foodCompositionVOList)){
                it.foodCompositionVOList.map(item=>{
                    subViews.push(
                        this._renderFoodMessage(i, item.name, item.volume)
                    );
                    i++;
                });
            }
        });



        return(
            <View>
                <View style={{width: Utils.size.width - 12, height: 40, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{ flexDirection:'row', alignItems:'center'}}>
                        <Image style={{width: 30 , height: 30 }}  source={image}/>
                        <Text  style={{fontSize:14, color:'#333333', marginLeft: 6}}>{title}</Text>
                    </View>
                    <Text  style={{fontSize:14, color:'#333333'}}>{time}</Text>
                </View>

                <TouchableOpacity onPress={()=>{
                  personCatering();
                }}>
                    <Image style={{width: Utils.size.width, height: 120, resizeMode:'cover'}} source={image2} />
                </TouchableOpacity>

                <TouchableOpacity style={{width: Utils.size.width - 12, height: 45, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} onPress={()=>{
                    more();
                }}>
                    <View style={{ flexDirection:'row', alignItems:'center'}}>
                       <Text  style={{fontSize:13, color:'#333333'}}>食材准备</Text>
                        {/*<Text style={{fontSize:13, color:'#999999'}}>（2333cal）</Text>*/}
                    </View>
                    <Image style={{width: 31 * Utils.pixel, height: 16 * Utils.pixel}}  source={isShow ? require('./../../images/down.png') : require('./../../images/up.png')}/>
                </TouchableOpacity>
                {
                    isShow ? subViews : <View></View>
                }
            </View>
        );
    }

    _renderFoodMessage(i, text, unit){
        return(
            <View key={i} style={{width: Utils.size.width - 12, height: 40, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text  style={{fontSize:12, color:'#666666'}}>{text}</Text>
                <Text  style={{fontSize:12, color:'#333333'}}>{unit}克</Text>
            </View>
        );

    }



    getTime(n){
        var now=new Date();
        var year=now.getFullYear();
        //因为月份是从0开始的,所以获取这个月的月份数要加1才行
        var month=now.getMonth()+1;
        var date=now.getDate();
        var day=now.getDay();
        console.log(date);
        //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
        if(day!==0){
            n=n+(day-1);
        }
        else{
            n=n+day;
        }
        if(day){
        //这个判断是为了解决跨年的问题
            if(month>1){
                month=month;
            }
        //这个判断是为了解决跨年的问题,月份是从0开始的
            else{
                year=year-1;
                month=12;
            }
        }
        now.setDate(now.getDate()-n);
        year=now.getFullYear();
        month=now.getMonth()+1;
        date=now.getDate();
        console.log(n);
        s = year+"年"+(month<10?('0'+month):month)+"月"+(date<10?('0'+date):date)+"日";
        return s;
    }

    componentWillMount(){

        if (this.state.isLeftClick){
            this._getFanAnData();
        }
    }

    _getFanAnData(){
        Utils.get(Utils.baseNet + Utils.getDietPlan + user.userToken, data =>{
            console.log('dietplan', data);

            if (data.state == 1){

                let d = new Date;

                let day1 = {
                    breakfast : data.data.day1Breakfast,
                    lunch : data.data.day1Lunch,
                    nightSnack : data.data.day1NightSnack,
                    dinner : data.data.day1Dinner,

                };

                let day2 = {
                    breakfast : data.data.day2Breakfast,
                    lunch : data.data.day2Lunch,
                    nightSnack : data.data.day2NightSnack,
                    dinner : data.data.day2Dinner,

                };

                let day3 = {
                    breakfast : data.data.day3Breakfast,
                    lunch : data.data.day3Lunch,
                    nightSnack : data.data.day3NightSnack,
                    dinner : data.data.day3Dinner,

                };

                let day4 = {
                    breakfast : data.data.day4Breakfast,
                    lunch : data.data.day4Lunch,
                    nightSnack : data.data.day4NightSnack,
                    dinner : data.data.day4Dinner,
                };

                let day5 = {
                    breakfast : data.data.day5Breakfast,
                    lunch : data.data.day5Lunch,
                    nightSnack : data.data.day5NightSnack,
                    dinner : data.data.day5Dinner
                };

                let day6 = {
                    breakfast : data.data.day6Breakfast,
                    lunch : data.data.day6Lunch,
                    nightSnack : data.data.day6NightSnack,
                    dinner : data.data.day6Dinner
                };

                let day7 = {
                    breakfast : data.data.day7Breakfast,
                    lunch : data.data.day7Lunch,
                    nightSnack : data.data.day7NightSnack,
                    dinner : data.data.day7Dinner
                };

                let tempData = []

                tempData[0] = day1;
                tempData[1] = day2;
                tempData[2] = day3;
                tempData[3] = day4;
                tempData[4] = day5;
                tempData[5] = day6;
                tempData[6] = day7;




                let tempDay = tempData[d.getDay() - 1];

                this.setState({
                    dataList: tempData,
                    data: tempDay,
                    dataSelectIndex : d.getDay(),
                    isLoading: false
                });

            }else{

            }

        }, e=>{
            console.log('dietplan', e);
        });
    }



    _getYuanZe(){
        Utils.get(Utils.baseNet + Utils.getYuanZe + user.userToken, data=>{
            console.log('tianzhw', data);

            if (data.state == 1) {
              //  this.state.dataRight = data.data;

                this.setState({
                  dataRight: data.data
                });

            }else {

            }

        },e=>{
            console.log('tianzhw', e);



        });
    }
}


const styles = StyleSheet.create({
    buttonClickLeft:{
        backgroundColor:'#96D8CA',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent:'center',
        alignItems:'center',
        width: Utils.size.width/ 4,
        padding: 4,
        marginTop: 10,
        marginBottom: 10,
        borderColor:'#96D8CA',
        borderWidth: 1 * Utils.pixel,
    },
    buttonNoClickLeft:{
        backgroundColor:'#fff',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent:'center',
        alignItems:'center',
        width: Utils.size.width/ 4,
        borderColor:'#96D8CA',
        borderWidth: 1 * Utils.pixel,
        padding: 4,
        marginTop: 10,
        marginBottom: 10
    },
    textClick:{
        color:'#fff',
        fontSize:14
    },
    textNoClick:{
        color:'#333333',
        fontSize:14
    },
    buttonClickRight:{
        backgroundColor:'#96D8CA',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent:'center',
        alignItems:'center',
        width: Utils.size.width/ 4,
        padding: 4,
        marginTop: 10,
        marginBottom: 10,
        borderColor:'#96D8CA',
        borderWidth: 1 * Utils.pixel,
    },
    buttonNoClickRight:{
        backgroundColor:'#fff',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent:'center',
        alignItems:'center',
        width: Utils.size.width/ 4,
        borderColor:'#96D8CA',
        borderWidth: 1 * Utils.pixel,
        padding: 4,
        marginTop: 10,
        marginBottom: 10
    }
});
