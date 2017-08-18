/**
 * Created by tianzhw on 2017/7/18.
 * 自适应高度文本
 */
import React, {Component} from 'react';
import {AppRegistry, Text, StyleSheet} from 'react-native';

export default class AutoExpandingText extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text: '',
            height: 0
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        console.log(event.nativeEvent);
        this.setState({
            text: event.nativeEvent.text,
            height:event.nativeEvent.contentSize.height
        });
    }
    onContentSizeChange(params){
        console.log(params);
    }
    render() {
        return (
            <Text {...this.props}  //将组件定义的属性交给Text
                multiline={true}
                onChange={this.onChange}
                onContentSizeChange={this.onContentSizeChange}
                style={[styles.textInputStyle,{height:Math.max(35,this.state.height)}]}
            >{this.state.text}</Text>
        );
    }
}

const styles = StyleSheet.create({
    textInputStyle: { //文本输入组件样式
        width: 300,
        height: 30,
        fontSize: 20,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: "grey"
    }
});
