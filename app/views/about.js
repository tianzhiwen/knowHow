/**
 * Created by tianzhw on 2017/7/21.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,Image,
    TouchableOpacity
} from 'react-native';
import Utils from './../utils/utils';
import Check from './../component/android/CheckVersion';
import Alert from './../component/AlertComponent';
export default class about extends Component {

    static navigationOptions = {
        title:'关于我们',
    };

    render() {
        let screenWidth = Utils.size.width;
        return (
            <View style={{flex:1, backgroundColor:'#FAFAFA'}}>

                <Alert ref="progress" mode="progress" />

                <View style={{marginTop:15, backgroundColor:'#fff', alignItems:"center", justifyContent:'center', padding:10}}>
                    <Image style={{width:86, height:86, resizeMode:'contain'}} source={require('./../../images/logoSize.png')} />
                    <Text style={{fontSize: 10, color:'#999999',marginTop:8}}>版本：1.0.0</Text>
                    <TouchableOpacity style={{margin:8, backgroundColor:'#99D9CB', borderRadius: 10, width:124, height: 32, justifyContent:'center', alignItems:'center'}} onPress={()=>{
                            this._checkVersion();
                    }}>
                        <Text style={{fontSize: 15, color:'#fff'}}>版本更新</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop:15, backgroundColor:'#fff', padding:10, flex:1}}>
                    <View style={{height:55, flexDirection:'row', paddingLeft:5, paddingRight:5, justifyContent:'space-between',
                    borderBottomWidth:1 * Utils.pixel, borderColor:'#000', alignItems:'center'}}>
                        <Text style={{fontSize:14, color:'#333333'}}>客服电话</Text><Text style={{fontSize:14, color:'#666666'}}>010-58470113</Text>
                    </View>
                    <View style={{height:55, flexDirection:'row', paddingLeft:5, paddingRight:5, justifyContent:'space-between',
                    borderBottomWidth:1 * Utils.pixel, borderColor:'#000', alignItems:'center'}}>
                        <Text style={{fontSize:14, color:'#333333'}}>E-mail:</Text><Text style={{fontSize:14, color:'#666666'}}>help@newzhishi.com‍</Text>
                    </View>
                    <TouchableOpacity style={{height:55, flexDirection:'row', paddingLeft:5, paddingRight:5, justifyContent:'space-between',
                    borderBottomWidth:1 * Utils.pixel, borderColor:'#000',  alignItems:'center'}} onPress={()=>{

                        nav.navigate('FindDetail',{src: {uri: 'http://101.201.142.49:8010/zhishi/a/newZhiShiMine/Agreement'}, title:'服务协议'});
                        {/*this.props.navigation.navigate("HelpCenter", {src: {uri: 'http://101.201.142.49:8010/zhishi/a/newZhiShiMine/Agreement', title:'服务协议'}});*/}
                    }}>
                        <Text style={{fontSize:14, color:'#333333'}}>服务协议</Text>
                        <Image style={{width:16 * Utils.pixel * 2,height:31 * Utils.pixel * 2}} source={require('./../../images/list.png')}></Image>
                    </TouchableOpacity>
                    <View style={{ flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                        <Text style={{color:'#999999', fontSize:10}}>北京识物科技有限公司</Text>
                        <Text style={{color:'#999999', fontSize:10}}>Beijing knowledge content Technology Co., Ltd</Text>
                    </View>

                </View>
            </View>
        );
    }


    _checkVersion(){
        this.refs.progress.show();
      Check.checkVersion().then(ref=>{
          console.log('1', ref);
          Utils.get(Utils.baseNet + Utils.updateUrl, data=>{
              console.log('2', data);
              if (data.state == 1){
                  if (data.data.appVersion != ref){
                      //发起更新
                      console.log('3', data);
                      let url = 'http://gdown.baidu.com/data/wisegame/41e4d8d8127bb502/baidushoujizhushou_16793302.apk';

                      Check.downLoadAPK(data.downPath);
                      this.refs.progress.hide();
                  }else{
                      //不需要更新
                      this.refs.progress.hide();
                  }
              }else{
                  this.refs.progress.hide();
              }
          }, e=>{
              this.refs.progress.hide();
          });

      }).catch(e=>{
          console.log('version', e);
          this.refs.progress.hide();
      });

    }
}