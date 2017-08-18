/**
 * Created by tianzhw on 2017/7/14.
 * 编辑手机号码
 *
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Utils from '../utils/utils';
import EditPhoneView from '../component/editPhoneView';
import EditButton from '../component/editButton';
import Alert from '../component/AlertComponent';
export default class editPhone extends Component{
    static navigationOptions = {
        title:'家庭成员',
    };

    constructor(props){
        super(props);
        this.state = {
            data : this.props.navigation.state.params,
            name:'',
            phone:''
        }
        this._navigation.bind(this);
    }

    _navigation(){

        let data = this.state.data;

        data.data[0].phone = this.state.phone;
        data.data[0].alias = this.state.name;

        this.props.navigation.navigate('editHW',data);
    }

    render(){
        const sex = this.props.navigation.state.params.sex;
        let icon = null;
        let name = null;
        switch (sex){
            case 1:
                icon = require('./../../images/baba.png');
                name = '爸爸';
                break;
            case 2:
                icon = require('./../../images/mama.png');
                name = '妈妈';
                break;
            case 3:
                icon = require('./../../images/nvbaobao.png');
                name = '女宝宝';
                break;
            case 4:
                icon = require('./../../images/baobao.png');
                name = '男宝宝';
                break;
        }

        this.state.name = name;

        return(
            <View style={styles.container}>

                <Alert ref="alert" mode="alert" title='提示' message="成年人请输入手机号"/>

                <EditPhoneView icon={icon} name={name} nameChange={(text)=>{
                    this.setState({
                        name: text
                    });
                }} phoneChange={(text)=>{
                    this.setState({
                        phone: text
                    });
                }}/>

                <View style={{flex:1, alignItems:'center', marginTop:5}}>

                    <EditButton text="下一步" click={()=>{


                      //如果是孩子 手机号不是必填项
                        if (sex == 3 || sex ==4){
                              this._navigation();
                        }else if (this.state.phone.length > 0){
                              this._navigation();
                        }else{
                            this.refs.alert.show();
                        }
                        }}/>
                </View>

            </View>

        );

        // return(
        //     <View style={styles.container}>
        //         <View style={styles.iconLayout}>
        //             <Image style={styles.icon}  source={icon}></Image>
        //         </View>
        //         <View style={styles.contentLayout}>
        //             <View style={[styles.contentLayoutRow,{borderBottomWidth:1 * Utils.pixel, borderColor:'#808080'}]}>
        //                 <Text style={[styles.contentLayoutRowView]}>昵称</Text>
        //
        //                 <TextInput placeholder={name} underlineColorAndroid="transparent" style={[styles.contentLayoutRowView,{justifyContent:'flex-end'}]}></TextInput>
        //
        //             </View>
        //             <View style={[styles.contentLayoutRow]}>
        //                 <Text style={[styles.contentLayoutRowView]}>手机号码</Text>
        //                 <TextInput placeholder="成人必须输入手机号" underlineColorAndroid="transparent" style={[styles.contentLayoutRowView]}></TextInput>
        //             </View>
        //             <TouchableOpacity style={{marginTop:30,width:Utils.size.width*.5,
        //         height:30, backgroundColor:'#ff8c00', borderRadius:10,
        //         alignItems:'center', justifyContent:'center'}} onPress={()=>{
        //
        //                this.props.navigation.navigate('editHW',this.state);
        //
        //         }}>
        //                 <Text style={{color:'#fff'}}>下一步</Text>
        //             </TouchableOpacity>
        //         </View>
        //
        //
        //
        //     </View>
        // );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:'#fff',
    },
    iconLayout:{
        height:Utils.size.height * .3,
        alignItems:'center',
        justifyContent:'center',
    },
    icon:{
        width: Utils.size.width / 3,
        height:Utils.size.width / 3
    },
    contentLayout:{
        flex:1,
        paddingLeft:5,
        paddingRight:5,
        alignItems:'center'
    },
    contentLayoutRow:{
        flexDirection:'row',
        alignItems:'center'
    },
    contentLayoutRowView:{
        flex:1,

    }
});
