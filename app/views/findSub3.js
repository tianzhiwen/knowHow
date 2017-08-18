/**
 * Created by tianzhw on 2017/7/31.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import Utils from './../utils/utils';
import TitleBar from './../component/titleBar';
import Alert from './../component/AlertComponent';
export default class findSub3 extends Component {

    constructor(props){
        super(props)
        this.state = {
            pageIndex : 1, //当前页码
            pageSize : 15, //每页数据
            dataList : [], //数据集合
            isLoading: false, //是否加载数据
            isLastPage: false,//是否是最后一页
        }
    }



    render() {

        let views = [];

        this.state.dataList.map(it=>{
            views.push(
                this._renderItem(it)
            );
        })

        return (
            <View style={{flex:1, backgroundColor:'#FAFAFA', padding: 4}}>
                <TitleBar title="餐盘里" iconLeft={require('./../../images/goback.png')} backClick={()=>{
                    this.props.navigation.goBack();
                }} />

                <Alert ref="progress" mode="progress"/>
                <Alert ref="alert" mode="alert" title="提示"/>


                <ScrollView onMomentumScrollEnd = {this._contentViewScroll.bind(this)}>
                    <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:10}}>
                        {views}
                    </View>
                </ScrollView>
            </View>
        );
    }


    _renderItem(i){
        return (
            <TouchableOpacity key={i.id} style={{width:Utils.size.width / 3 - 3, alignItems:'center', backgroundColor:'#fff', marginTop:10 , marginBottom:10, padding:4}} onPress={()=>{
                                 nav.navigate('FindDetail',{title:'餐盘里', src:{uri:Utils.findDetail + i.id}});
            }}>
                <Image style={{width:100, height:100}} source={{uri:Utils.imageBaseUrl + "/" + i.cover}} />
                <Text>{i.heading}</Text>
            </TouchableOpacity>
        );
    }


    componentDidMount(){
        this._getDataList();
    }

    _contentViewScroll(e){
        if (!this.state.isLastPage){
            var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
            var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
            var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
            if (offsetY + oriageScrollHeight >= contentSizeHeight){
                this.state.pageIndex ++;
                this._getDataList();
            }
        }else{
            this.refs.alert.show('提示', '没有更多啦');
        }

    }

    _getDataList(){
        this.refs.progress.show();

        Utils.get(Utils.baseNet + Utils.getFindTypeList + "zhishi_cmd_dinner_plate&pageNO=" + this.state.pageIndex + "&pageSize=" + this.state.pageSize,
            data=>{
                console.log(data);
                if (data.state == 1){

                    this._success(data.data.list)

                    this.setState({
                        isLastPage : data.data.lastPage
                    });
                    console.log("12312313");
                    this.refs.progress.hide();
                }else{
                    this.refs.progress.hide();
                    this.refs.alert.show('提示', '网络有点延迟，请稍后再试');
                }
            },e=>{
                console.log(e);
                this.refs.progress.hide();
                this.refs.alert.show('提示', '服务器比较忙，请稍再试');
            });
    }

    _success(data){
        data.map(it=>{
            this.state.dataList.push(it);
        })
    }
}