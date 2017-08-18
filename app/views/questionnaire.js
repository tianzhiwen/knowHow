/**
 * Created by tianzhw on 2017/7/18.
 * 问卷调查界面
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    PixelRatio,
    ListView,
    StyleSheet,
    TextInput,
    Alert,
    Dimensions,
    Modal
} from 'react-native';
import TitleBar from '../component/titleBar';
import Utils from '../utils/utils';

export default class questionnaire extends Component{

    static navigationOptions = {
        title:'个人问卷',
    };

    constructor(props) {
        super(props);
        this.state = {
            listHeight:0,
            obj:{},//当前的问题
            data:[],//问题和回答集合
            inputContentText:'',//输入框文字内容
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            famliyUser: this.props.navigation.state.params.data,

            animationType: 'none',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            selectView:[],

        };
        isClick:false//排除重复点击
        this.listHeight = 0;
        this.footerY = 0;
        this._updateMessageListView.bind(this);
    }

    renderEveryData(eData) {

        var sWidth = Dimensions.get('window').width
        return (
            <View style={eData.isMe==true?styles.everyRowRight:styles.everyRow}>
                <Image
                    source={eData.isMe==true? null:require('./../../images/breakfast1.png')}
                    style={eData.isMe==true?null:styles.talkImg}
                />
                <View style={{width:sWidth - 100}}>
                    <View style={eData.isMe==true?styles.talkViewRight:styles.talkView}>
                        <Text style={eData.isMe==true?styles.talkTextRight:styles.talkText }>
                            {eData.keyName}
                        </Text>
                    </View>
                </View>
                <Image
                    source={eData.isMe==true? require('./../../images/breakfast2.png') :null}
                    style={eData.isMe==true?styles.talkImgRight:null}
                />
            </View>
        );
    }

    myRenderFooter(e){

    }

    pressSendBtn(){
        if(!this.isClick){
            this.isClick = true;
            let text = this.state.inputContentText;

            if (text && text.length > 0){
                let msg = {
                    isMe:true,
                    keyName: text
                }

                this.state.data.push(msg);

                this.setState({
                    dataSource : this.state.dataSource.cloneWithRows(this.state.data),
                    inputContentText:'',
                    modalVisible:false
                });
                //
                this.refs._textInput.clear();
                this.refs._listView.scrollToEnd();
                //
                Utils.get(Utils.baseNet + Utils.answer + "userSurveyUserInfoId=" + this.state.obj.userSurveyUserInfoId
                    + "&surveyBaseId=" + this.state.obj.id + "&keyName=" + this.state.obj.keyName +
                    "&value=" + this.state.obj.contentText + "&sort=" +  this.state.obj.sort + "&surveyUserName=" + this.state.obj.surveyUserName +
                    "&testType=" + this.state.obj.testType + "&myMemberOfFamilyId=" + this.state.famliyUser.id,
                    (ref)=>{
                        if (Array.isArray(ref) && ref.length > 0){
                            this._updateMessageListView(ref);
                        }else if (ref.length == 0){
                            alert('完成了问答');
                            this.props.navigation.goBack();
                        }
                        this.isClick = false;
                        //
                    },(e)=>{
                        this.isClick = false;
                        console.log(e.toString());
                    });

            }
        }


    }

    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={ styles.container }>

                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this._setModalVisible(false) } }
                >
                <TouchableHighlight style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0)',justifyContent:'flex-end'}} onPress={this._setModalVisible.bind(this,false)} >
                        <View style={{flex:1, justifyContent:'flex-end'}}>
                            {this.state.selectView}
                        </View>
                    </TouchableHighlight>
                </Modal>

                <TitleBar title="小知识" iconLeft={require('./../../images/goback.png')} backClick={()=>{
                    this.props.navigation.goBack();
                }}/>
                <ListView
                    enableEmptySections={true}
                    ref='_listView'
                    onLayout={(e)=>{this.state.listHeight = e.nativeEvent.layout.height;}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderEveryData.bind(this)}
                    renderFooter={this.myRenderFooter.bind(this)}
                />
                <View style={styles.bottomView}>
                    <View style={styles.searchBox}>
                        <TextInput underlineColorAndroid="transparent"
                            ref='_textInput'
                            onChangeText={(text) =>{this.state.inputContentText=text;
                            }}
                            placeholder=''
                            returnKeyType='done'
                            style={styles.inputText}

                        />
                    </View>

                        <TouchableHighlight
                            style={{backgroundColor:'#fff', padding:5}}
                            underlayColor={'#ff8c00'}
                            activeOpacity={0.5}
                            onPress={this.pressSendBtn.bind(this)}
                        >
                            <View style={styles.sendBtn}>
                                <Text style={ styles.bottomBtnText }>
                                    发送
                                </Text>
                            </View>
                        </TouchableHighlight>
                </View>
            </View>
        );
    }

    componentDidUpdate(){
        if ((this.state.selectView.length > 0  && !this.state.modalVisible) &&  (this.state.obj.valueType == 'sSelect' ||this.state.obj.valueType == 'sSelectInput')){
            this._setModalVisible(true);
        }

        // if (this.state.selectView.length == 0){
        //     this._setModalVisible(false);
        // }
    }

    componentDidMount(){
        Utils.get(Utils.baseNet + Utils.question + this.state.famliyUser.id,
            (data)=>{
                this._updateMessageListView(data);
            },(e)=>{

            });
    }
    //更新消息和选择Mode内容
    _updateMessageListView(data){
        this.state.selectView = [];
        data.map((it)=>{
            it.isMe = false;
            this.state.obj = it;
            this.state.data.push(it);
        });

        console.log('data',this.state.obj);

        if (this.state.obj.valueType == 'sSelect' || this.state.obj.valueType == 'sSelectInput')//单选
        {
            this.state.obj.value.split(';').map((it)=>{
                this.state.selectView.push(
                    <TouchableHighlight key={it} style={{height:60, backgroundColor:'#fff', justifyContent:'center', alignItems:'center', padding:8}} onPress={()=>{
                        this.state.selectView.length = 0;
                        this._setModalVisible(false);
                        this.state.inputContentText = it;
                        this.pressSendBtn();
                    }}>
                        <View style={{flex:1, width: Utils.size.width - 20,justifyContent:'center', alignItems:'center', borderWidth:2 * Utils.pixel, borderColor:'#99D9CB'}}><Text style={{color:'#99D9CB'}}>{it}</Text></View>
                    </TouchableHighlight>
                );
            });
        }else if(this.state.obj.valueType == '抓取'){
            if(this.state.obj.keyName == '用户姓名'){
                
            }
        }
        else{
            this.state.selectView.length = 0;
        }

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.data)
        });

        this.refs._textInput.clear();
        this.refs._listView.scrollToEnd();
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    },
    topView:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        height: 52,
        padding:5
    },
    bottomView:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        padding:5,
        backgroundColor:'#fff'
    },
    sendBtn: {
        alignItems: 'center',
        backgroundColor: '#ff8c00',
        padding: 10,
        borderRadius:15,
        height:40,
        justifyContent:'center'
    },
    bottomBtnText: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        color:'#fff',
    },
    everyRowRight:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'flex-end',
    },
    everyRow:{
        flexDirection:'row',
        alignItems: 'center',
        marginTop:4
    },
    talkView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        borderRadius:5,
        marginLeft:5,
        marginRight:55,
        marginBottom:10
    },
    talkImg: {
        height: 40,
        width: 40,
        marginLeft:10,
        marginBottom:10
    },
    talkText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    talkViewRight: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#90EE90',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        borderRadius:5,
        marginLeft:55,
        marginRight:5,
        marginBottom:10
    },
    talkImgRight: {
        height: 40,
        width: 40,
        marginRight:10,
        marginBottom:10
    },
    searchBox: {
        height: 40,
        flexDirection: 'row',
        flex:1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
        borderRadius: 5,  // 设置圆角边
        backgroundColor: 'white',
        alignItems: 'center',
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        marginBottom:10,
    },
    inputText: {
        flex:1,
        backgroundColor: 'transparent',
        fontSize: 20,
        marginLeft:5
    },
});