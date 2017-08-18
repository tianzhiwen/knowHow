/**
 * Created by tianzhw on 2017/7/13.
 * 家庭管理页面  加添成员列表
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Utils from '../utils/utils';
export default class familyList extends Component{

    static navigationOptions = {
        title:'家庭成员',
    };

    constructor(props){
        super(props);
        this.state={
            familyList:this.props.navigation.state.params.familyList
        }
        this._SwitchIcon.bind(this);
    }
    _SwitchIcon(roleName){
        let icon = require('./../../images/mama.png');
        switch (roleName){
            case 'zhishi_user_role_baobao':
                icon = require('./../../images/baobao.png');
                break
            case 'zhishi_user_role_nvbaobao':
                icon = require('./../../images/nvbaobao.png');
                break
            case 'zhishi_user_role_baba':
                icon = require('./../../images/baba.png');
                break
            case 'zhishi_user_role_mama':
                icon = require('./../../images/mama.png');
                break
        }
        return icon;
    }
    render(){



        const screenWidth = Utils.size.width;
        const screenHeight = Utils.size.height;


        let row = [];
        this.state.familyList.map((data)=>{
            row.push(
                <TouchableOpacity key={data.id} style={styles.subItemStyle} onPress={()=>{
                         this.props.navigation.navigate('PersonalInformation',{sex:this._SwitchIcon(data.roleName), data: data});
                    }}>
                    <Image style={styles.subItemStyleImage} source={this._SwitchIcon(data.roleName)}/>
                    <Text style={{height:25}}>{data.alias}</Text>

                </TouchableOpacity>
            );
        });
        row.push(
            <TouchableOpacity key={-1} style={styles.subItemStyle} onPress={()=>{

                            this.props.navigation.navigate('editSex',{});

                    }}>
                <Image style={styles.subItemStyleImage} source={require('./../../images/add.png')} />
                <Text style={{height:25}}></Text>
            </TouchableOpacity>
        );

        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.rowStyle}>
                        {row}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    rowStyle:{
        flexDirection:'row',
        paddingTop:8,
        flexWrap:'wrap'
    },
    subItemStyle : {
        marginTop:8,
        width:Utils.size.width / 3,
        justifyContent:'center',
        alignItems:'center'
    },
    subItemStyleImage : {
        width:(Utils.size.width / 3 - 20),
        height: (Utils.size.width / 3 - 20)
    }
});