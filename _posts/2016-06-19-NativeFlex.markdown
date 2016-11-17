---
layout:     post
title:      "NativeFlex"
subtitle:   "ReactNative"
date:       2016-06-19
author:     "WYY"
header-img: "img/Coder.jpg"
catalog: true
tags:
    - JavaScript
    - ReactNative
    - flex
---

# React-Native Flex 布局基础

```
import React, {Component} from 'react';
import {AppRegistry,View,StyleSheet} from 'react-native';

class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state={
           color:'red',
        }
    }

    render() {
        return (
            <View style={Styles.container}>
                {
                    /*  <View style={[Styles.test2,Styles.test2]}></View>  可以通过这样的方式实现多种样式，但是React-Native 会对多种样式中相同的属性进行合并，后者会覆盖前面的内容*/
                }
               <View style={[Styles.test2,Styles.test2]}></View>
                {
                    /*<View style={{color:this.state.color}}></View>*/
                }
               <View style={Styles.test2}></View>
                {
                    /*<View style={{color:this.state.color}}></View>*/
                }
               <View style={[Styles.test2,{
                    backgroundColor:this.state.color
               }]}></View>
            </View>
        );
    }
}

let Styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'green',
        flexDirection:'column',//让组件以列的形式排列 (默认的是列排序)
        //flexDirection:'row',//让组件以行的形式排列
        //flexWrap:'wrap',//可以换行显示
        flexWrap:'wrap',//不换行显示
        //justifyContent:'flex-start',//沿着flexDirection 定义的方向，如果是row 就是从左边开始 如果是column 就是从上边开始
        //justifyContent:'flex-end',//沿着flexDirection 定义的方向，如果是row 就是从右边开始 如果是column 就是从下边开始
        //justifyContent:'center',//沿着flexDirection 定义的方向 居中显示
        //justifyContent:'space-between',//沿着flexDirection 定义的方向 分开布满 整行贴边
        justifyContent:'space-around',//沿着flexDirection 定义的方向 平均分成每个对应块，然后在每块中居中
        //alignItems:'flex-start',//沿着flexDirection的垂直方向 上方对齐 (如果flexDirection 设置的为row的时候 是向上对齐，果flexDirection 设置的为column的时候是向左对齐)
        //alignItems:'flex-end',//沿着flexDirection的垂直方向 下方对齐 (如果flexDirection 设置的为row的时候 是向下对齐，果flexDirection 设置的为column的时候是向右对齐)
        //alignItems:'center',//沿着flexDirection的垂直方向 居中显示
        //alignItems:'stretch',//沿着flexDirection的垂直方向 全部铺满
    	//alignSelf:['flex-start','flex-end','center','stretch','auto'][0],//沿着flexDirection的垂直方向，忽略alignItems 设置的值使用alignSelf 设置的值进行对应的布局，如果使用auto 的值的话会自动沿用alignItems 的值

    },
    test2:{
        width:40,
        height:40,
        backgroundColor:'blue',//设置当前View 的背景颜色
        borderWidth:5, //设置上下左右的边框值
        //borderBottomWidth:10, //设置下边框值[borderTopWidth,borderBottomWidth,borderLeftWidth,borderRightWidth]可以使用这四个值来设置不同方向的边框大小
        borderColor:'white',//设置边框颜色
        padding:5,//设置整个组件的内边距
        paddingHorizontal:5,//设置对水平方向的边距
        paddingVertical:5,//设置垂直方向的边距
        paddingTop:5,//单独设置设置上边框值 同事也可以使用后面数组中任意一个值。来设置上下左右的中的任意一个边框的宽['paddingTop','paddingBottom','paddingLeft','paddingRight'][0]
        margin:5,//margin用法跟padding 完全一致只是不同的原因是一个是内边距，一个是外边距
    }
})

AppRegistry.registerComponent('AwesomeProject', () => MyApp);
```