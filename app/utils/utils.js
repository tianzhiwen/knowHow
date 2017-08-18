import React, { Component } from 'react';
import {
    PixelRatio,
    Dimensions
} from 'react-native';
/**
 * 帮助
 * @type {{size: {width, height: *}, pixel: number, get: module.exports.get}}
 */
module.exports = {

    styles:{
        mainColor:'#99D9CB',//项目主色  蓝色
        defaultBackgroundColor:'#FAFAFA',//默认背景色
        spacingColor:'#E1E1E1',//f分割线颜色
    },

    size:{
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').height
    },
    pixel : 1 / PixelRatio.get(),
    /**
     * 基于fetch的get方法
     * @method post
     * @param {string} url
     * @param {function} callback 请求成功回调
     */
    get: function(url, successCallback, failCallback){
        console.log("tianzhw", url);
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch(function(err){
                failCallback(err);
            });
    },
    post:function(url,token, params, successCallback, failCallback){
        console.log("tianzhw", url);
         console.log("tianzhw params",  params);

        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            },
            body:'data=' + JSON.stringify(params)
        }).then((response) => response.text())
        .then((responseText) => {
            successCallback(JSON.parse(responseText));
        })
         .catch(function(err){
            failCallback(err);
         });
    },
    //获取家庭成员列表
    getFamilyList:function(successCallback, failCallback){
        store.load({
            key:'userState',
        }).then(ret=>{
            this.get(this.baseNet + this.familyList + ret.userToken, (data)=>{
                successCallback(data);
            }, (e)=>{
                failCallback(e);
            });
        }).catch(e=>{
            failCallback(e);
        });
    },
    checkPhone:function (mobile) {
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
    },
    imageBaseUrl:'http://101.201.142.49:8010/zhishi',
    baseNet:'http://101.201.142.49:8010/zhishi/f/zhishi/app',
    // baseNet:'http://localhost:8080/zhishi/f/zhishi/app',
    sendMessage:'/reSendUserregeditSendSms?phone=',//请求登陆验证码短信
    smsValidate:'/smsValidate?',//验证登陆
    familyList:'/get?infoType=MyMemberOfFamily&userToken=',//获取家庭成员列表
    question:'/testData?myMemberOfFamilyId=',//测试问卷请求问题
    answer:'/saveTestData?',//回答问题的答案
    addFailmy:'/post',//添加人员
    getReport:'/get?infoType=viewMyNewestReport',//获取个人健康报告
    getFind:'/get?infoType=findPage',//发现首页
    updateUrl:'/get?infoType=appVersion',//更新APP 版本检查
    findDetail: 'http://101.201.142.49:8010/zhishi/f/zhishi/news?hiddenTitle=1&id=',//详情页面地址
    getFindTypeList:'/get?infoType=modelNewsList&newsModule=',//发现页面分类集合列表
    getDietPlan:'/get?infoType=personFoodPlan&userToken=',//个人饮食计划方案
    getYuanZe:'/get?infoType=Principle&userToken=',//个人计划原则
    getDietPlanDetail:'/get?infoType=personFoodPlanDetail&userToken=',//个人饮食计划详情
    getTargerList:'/get?infoType=targerIndex',//目标首页数据
}
