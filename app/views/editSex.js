/**
 * Created by tianzhw on 2017/7/14.
 * 完善信息 编辑男女
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
}from 'react-native';
import Utils from '../utils/utils';
import EditButton from '../component/editButton';
import AlertComponent from './../component/AlertComponent';
export default class editSex extends Component{
    static navigationOptions = {
        title:'完善信息',
    };

    constructor(props){
        super(props);
        this.state={
            sex: -1,
            baba:false,
            mama:false,
            baobao:false,
            nvbaobao:false,
            alertMessage:''
        }
    }

    render(){
        const screenWidth = Utils.size.width;
        const screenHeight = Utils.size.height;


        let babaImage = this.state.baba ? <Image style={[{width:20, height:20, position:'absolute', bottom: 10, right:20}]}  source={require('./../../images/select.png')} /> : null;
        let mamaImage = this.state.mama ? <Image style={[{width:20, height:20, position:'absolute', bottom: 10, right:20}]}  source={require('./../../images/select.png')} /> : null;
        let nvbaobaoImage = this.state.nvbaobao ? <Image style={[{width:20, height:20, position:'absolute', bottom: 10, right:20}]}  source={require('./../../images/select.png')} /> : null;
        let baobao = this.state.baobao ? <Image style={[{width:20, height:20, position:'absolute', bottom: 10, right:20}]}  source={require('./../../images/select.png')} /> : null;

        return(
            <View style={styles.container}>

                <AlertComponent ref="alert" title="提示" message={this.state.alertMessage} mode="alert"  click={()=>{
                   //
                }}/>

                <View style={styles.rowStyle}>
                    <TouchableOpacity style={styles.subItemStyle} onPress={()=>{
                        this.setState({
                            sex:1,
                            baba:true,
                            mama:false,
                            baobao:false,
                            nvbaobao:false,
                        });
                    }}>
                        <Image style={styles.subItemStyleImage} source={require('./../../images/baba.png')}/>
                        <Text>爸爸</Text>
                        {babaImage}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subItemStyle} onPress={()=>{
                        this.setState({
                            sex:2,
                           baba:false,
                            mama:true,
                            baobao:false,
                            nvbaobao:false,
                        });
                    }}>
                        <Image style={styles.subItemStyleImage} source={require('./../../images/mama.png')} />
                        <Text>妈妈</Text>
                        {mamaImage}
                    </TouchableOpacity>
                </View>
                <View style={styles.rowStyle}>
                    <TouchableOpacity style={styles.subItemStyle} onPress={()=>{
                        this.setState({
                            sex:3,
                            baba:false,
                            mama:false,
                            baobao:false,
                            nvbaobao:true,
                        });
                    }}>
                        <Image style={styles.subItemStyleImage} source={require('./../../images/nvbaobao.png')}/>
                        <Text>女宝宝</Text>
                        {nvbaobaoImage}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subItemStyle} onPress={()=>{
                        this.setState({
                            sex:4,
                             baba:false,
                            mama:false,
                            baobao:true,
                            nvbaobao:false,
                        });
                    }}>
                        <Image style={styles.subItemStyleImage} source={require('./../../images/baobao.png')} />
                        <Text>男宝宝</Text>
                        {baobao}
                    </TouchableOpacity>
                </View>

                <View style={{flex:1, alignItems:'center', marginTop:35}}>
                    <EditButton text="下一步" click={()=>{
                     if(this.state.sex == -1){
                        this.refs.alert.show('提示', '请选择性别');
                    }else{
                         let content = {
                             roleName: this._sexToTag(this.state.sex)
                         }
                         //返回数据
                         let data = {
                             sex:this.state.sex,
                             dataType:'addMemberOfFamily',
                             data:[content]
                         };

                        this.props.navigation.navigate('editPhone',data);
                    }
                }}/>
                </View>
            </View>
        );
    }

    _sexToTag(sex){
        let result = '';
        switch (sex){
            case 1:
                result = 'zhishi_user_role_baba';
                break;
            case 2:
                result = 'zhishi_user_role_mama';
                break;
            case 3:
                result = 'zhishi_user_role_nvbaobao';
                break;
            case 4:
                result = 'zhishi_user_role_baobao';
                break;
        }

        return result;
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        paddingTop:20
    },
    rowStyle:{
        flexDirection:'row',
        paddingTop:8,
    },
    subItemStyle : {
        width:Utils.size.width / 2,
        justifyContent:'center',
        alignItems:'center'
    },
    subItemStyleImage : {
        width:Utils.size.width / 3 - 10,
        height: Utils.size.width / 3 - 10,
        marginBottom:10
    }
});