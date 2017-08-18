/**
 * Created by tianzhw on 2017/7/13.
 * 登陆界面
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    Keyboard
} from 'react-native';
import Utils from '../utils/utils';
import Toast from '../component/android/ToastAndroid';//Android原生调用
export default class login extends Component{
    static navigationOptions = {
        header:null,
    };

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            pwd:'',
            viewTop : Utils.size.height * .55,
            clickText:'获取验证码',
            isClick:false
        };

        this._validatemobile.bind(this);
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentWillUnmount () {
        this.timer && clearTimeout(this.timer);
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow (e) {

        this.setState({
            viewTop: this.state.viewTop - e.endCoordinates.height < 20 ? 20 : this.state.viewTop - e.endCoordinates.height
        });

    }

    _keyboardDidHide (e) {
        this.setState({
            viewTop: Utils.size.height * .55
        });
    }


    render(){
        const screenWidth = Utils.size.width;
        const screenHeight = Utils.size.height;

        //设置图片高度占屏幕高度65%
        const imageStyle = {
            width:screenWidth,
            height: 360,
            resizeMode:'cover'
        }

        return(
            <View style={styles.container}>
                <Image resizeMode="cover" style={imageStyle}  source={require('./../../images/loginBanner.jpg')}/>
                <View style={{position:'absolute',top:this.state.viewTop
                            ,width:screenWidth, height:screenHeight * .3}}>
                    <View style={{width:screenWidth*0.85,height:screenHeight * .3 , backgroundColor:'#fff'
                    ,marginLeft:screenWidth*.075,marginRight:screenWidth*.075, elevation:40,
                    borderWidth:1, borderColor:'#98d9cb',borderRadius:20, justifyContent:'center', alignItems:'center' }}>
                        <View style={{width:screenWidth*.85*.85, height: 40,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Image resizeMode="cover"  style={{width:13, height:19, marginRight:5, resizeMode:'contain'}} source={require('./../../images/phone.png')}></Image>
                            <TextInput placeholder="手机号" keyboardType="numeric" underlineColorAndroid='transparent' style={{width:200, height:40, fontSize:14, borderBottomWidth: 1 * Utils.pixel, borderColor:'#E1E1E1'}} onChangeText={(text)=>{
                               this.setState({
                                   phone:text
                               });

                            }
                            }></TextInput>
                        </View>
                        <View style={{width:screenWidth*.85*.85, height: 40,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Image resizeMode="cover"  style={{width:13, height:19, marginRight:5, resizeMode:'contain'}} source={require('./../../images/key.png')}></Image>
                            <TextInput placeholder="验证码" keyboardType="numeric" underlineColorAndroid='transparent' style={{width:110, height:40,fontSize:14, borderBottomWidth: 1 * Utils.pixel, borderColor:'#E1E1E1'}} onChangeText={(text)=>{
                                this.setState({
                                    pwd: text
                                });

                            }}></TextInput>
                            <TouchableHighlight onPress={()=>{
                                //判断当前是否已经执行发送短信
                                if (!this.state.isClick){
                                    const phone = this.state.phone;
                                    //校验手机号符合格式
                                    if (this._validatemobile(phone)){

                                        let ti = 60;
                                        //开始定时器

                                        this.timer =  setInterval(()=>{
                                                ti--;
                                                if(ti > 0){
                                                   this.setState({
                                                        clickText:ti + '秒',
                                                        isClick: true
                                                    });
                                                }else{
                                                     this.timer && clearTimeout(this.timer);
                                                    this.setState({
                                                        clickText:'获取验证码',
                                                        isClick: false
                                                    });
                                                }
                                         },1000);


                                        Utils.get(Utils.baseNet + Utils.sendMessage + phone, (data)=>{

                                        }, (e)=>{

                                        });
                                    }
                                }


                            }} style={{width:90, height: 25, borderColor:'#98d9cb',borderWidth:1*Utils.pixel,justifyContent:'center',alignItems:'center',
                                borderRadius:10}} >
                                <Text style={{color:'#666666',fontSize:10}}>{this.state.clickText}</Text>
                            </TouchableHighlight>
                        </View>
                        <TouchableHighlight style={{marginTop:15,width:screenWidth*.85*.5, height: 30, backgroundColor:'#98d9cb',justifyContent:'center',alignItems:'center',
                        borderRadius:16}} onPress={this.login.bind(this)}>
                            <Text style={{color:'#fff', fontSize:16}}>登陆</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }

    login(){



        const phone = this.state.phone;


        if (this._validatemobile(phone) && this.state.pwd && this.state.pwd.length > 0){
           Utils.get(Utils.baseNet + Utils.smsValidate + "phone=" + phone + "&" + "code=" + this.state.pwd, (data)=>{
               if (data.state == '1'){
                   store.save({
                       key:'userState',
                       data:{
                           userId:phone,
                           userToken:data.userToken
                           // userPwd:this.state.pwd
                       }
                   }).then(()=>{
                       user.userToken = data.userToken;
                       this.props.navigation.goBack();
                       this.props.navigation.state.params.call();
                       this._loginOk();


                   }).catch((e)=>{

                       console.log(e.toString());

                       // Toast.show('登陆异常', Toast.SHORT);
                   });
               }
           }, (e)=>{

           });
        }
    }


    _loginOk(){
        store.load({
            key:'navigation'
        }).then(data=>{
            if (!data.isUpdate){
                //上传
                this._addUser(data);
            }
        }).catch((e=>{

        }));
    }

    _addUser(data){
        Utils.post(Utils.baseNet + Utils.addFailmy, user.userToken, data, data=>{
            data.isUpdate = true;
            store.save({
                key:'navigation',
                data: data
            })
        }, e=>{

        });
    }

    /**
     * 验证手机号
     * @param mobile
     * @returns {boolean}
     */
    _validatemobile(mobile)
    {



        if (!mobile){
            alert('请输入手机号码！');
            return false;
        }

        if(mobile.length==0)
        {
            alert('请输入手机号码！');
            return false;
        }
        if(mobile.length!=11)
        {
            alert('请输入有效的手机号码！');
            return false;
        }

        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test(mobile))
        {
            return false;
        }
        return true;
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        backgroundColor:'#fff'
    }
});