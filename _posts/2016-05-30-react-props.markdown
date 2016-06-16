---
layout: post
title: React-PropTypes 验证
subtitle: 自己的学习笔记
date: 2016-05-30T00:00:00.000Z
author: WYY
header-img: "img/Coder.jpg"
catalog: true
tags:
  - React
---
# React组件属性部类（propTypes）校验

### 1.测试准备
> 首先写一个小Demo 做测试
> 适用场景：随着应用不断的变大，为了保证组件能够被正常的应用，我们可以引入propTypes，React.PropTypes 给我们提供了很多的valietor 来验证数据传入的有效性，当想props 传入不符合类型的值的时候 控制台会抛出警告，为了性能考虑，建议制造开发环境下验证propsType


```
import React,{Component} from 'react';
import ReactDom,{render} from 'react-dom';
class PropTypeDemo extends Component {
  render(){
    return (
      <div>现在的标题是：{this.props.title}</div>
    )
  }
}

PropTypeDemo.defaultProps={
  title:"默认的标题"
};

PropTypeDemo.propTypes ={
  title: React.PropTypes.string.isRequired
}


render(<PropTypeDemo/>,document.getElementById("app"));

```

### 2. 基础的验证
> 下面的验证都是可传可不传的，如果传了会做对应的验证不传，则不会对其做的对应的验证。

```
import React,{Component} from 'react';
import ReactDom,{render} from 'react-dom';
class PropTypeDemo extends Component {
  render(){
    return (
      <div>现在的标题是：</div>
    )
  }
}

PropTypeDemo.propTypes ={
  optionalArray : React.PropTypes.array,
  optionalBool  : React.PropTypes.bool,
  optionalFunc  : React.PropTypes.func,
  optionalNumber: React.PropTypes.number,
  optionalObject: React.PropTypes.object,
  optionalString: React.PropTypes.string
}

render(<PropTypeDemo/>,document.getElementById("app"));
```

> 上面添加了类型的验证接下来我们尝试传入不同的数据类型

>- 正常格式的值

```
//能正常通过的默认值
PropTypeDemo.defaultProps={
  optionalArray: [],
  optionalBool: true,
  optionalFunc: (x)=> x+1,
  optionalNumber: 123,
  optionalObject: {
    a:1
  },
  optionalString: "this is a string"
};
//控件正常运行没有抛出任何的错误
```

>-  错误类型的值


```
//错误类型的传入值
PropTypeDemo.defaultProps={
  optionalArray: 123,
  optionalBool: 'string',
  optionalFunc: 123,
  optionalNumber: true,
  optionalObject: 123,
  optionalString: 123
};

/*
抛出错误：
warning.js:44Warning: Failed propType: Invalid prop `optionalArray` of type `number` supplied to `PropTypeDemo`, expected `array`.warning @ warning.js:44checkPropTypes @ ReactElementValidator.js:189validatePropTypes @ ReactElementValidator.js:208createElement @ ReactElementValidator.js:242(anonymous function) @ index.js:5474 @ index.js:105__webpack_require__ @ bootstrap b0ce7d3…:500 @ index.js:7__webpack_require__ @ bootstrap b0ce7d3…:50webpackJsonpCallback @ bootstrap b0ce7d3…:21(anonymous function) @ index.js:1
warning.js:44Warning: Failed propType: Invalid prop `optionalBool` of type `string` supplied to `PropTypeDemo`, expected `boolean`.warning @ warning.js:44checkPropTypes @ ReactElementValidator.js:189validatePropTypes @ ReactElementValidator.js:208createElement @ ReactElementValidator.js:242(anonymous function) @ index.js:5474 @ index.js:105__webpack_require__ @ bootstrap b0ce7d3…:500 @ index.js:7__webpack_require__ @ bootstrap b0ce7d3…:50webpackJsonpCallback @ bootstrap b0ce7d3…:21(anonymous function) @ index.js:1
warning.js:44Warning: Failed propType: Invalid prop `optionalFunc` of type `number` supplied to `PropTypeDemo`, expected `function`.warning @ warning.js:44checkPropTypes @ ReactElementValidator.js:189validatePropTypes @ ReactElementValidator.js:208createElement @ ReactElementValidator.js:242(anonymous function) @ index.js:5474 @ index.js:105__webpack_require__ @ bootstrap b0ce7d3…:500 @ index.js:7__webpack_require__ @ bootstrap b0ce7d3…:50webpackJsonpCallback @ bootstrap b0ce7d3…:21(anonymous function) @ index.js:1
warning.js:44Warning: Failed propType: Invalid prop `optionalNumber` of type `boolean` supplied to `PropTypeDemo`, expected `number`.warning @ warning.js:44checkPropTypes @ ReactElementValidator.js:189validatePropTypes @ ReactElementValidator.js:208createElement @ ReactElementValidator.js:242(anonymous function) @ index.js:5474 @ index.js:105__webpack_require__ @ bootstrap b0ce7d3…:500 @ index.js:7__webpack_require__ @ bootstrap b0ce7d3…:50webpackJsonpCallback @ bootstrap b0ce7d3…:21(anonymous function) @ index.js:1
warning.js:44Warning: Failed propType: Invalid prop `optionalObject` of type `number` supplied to `PropTypeDemo`, expected `object`.warning @ warning.js:44checkPropTypes @ ReactElementValidator.js:189validatePropTypes @ ReactElementValidator.js:208createElement @ ReactElementValidator.js:242(anonymous function) @ index.js:5474 @ index.js:105__webpack_require__ @ bootstrap b0ce7d3…:500 @ index.js:7__webpack_require__ @ bootstrap b0ce7d3…:50webpackJsonpCallback @ bootstrap b0ce7d3…:21(anonymous function) @ index.js:1
warning.js:44Warning: Failed propType: Invalid prop `optionalString` of type `number` supplied to `PropTypeDemo`, expected `string`.
*/
```

>- 传入空值的时候

```
PropTypeDemo.defaultProps={
};
//也可以正常的执行通过
```

>  上面的类型验证只是基础的一部分，基础的类型验证有

|类型|值|
|:-:|:-:|
|数组|React.PropTypes.array|
|布尔|React.PropTypes.bool|
|函数|React.PropTypes.func|
|数字|React.PropTypes.number|
|Object|React.PropTypes.object|
|字符串|React.PropTypes.string|
|node元素|React.PropTypes.node|
|element元素|React.PropTypes.element|


### 3.特殊的验证
>Enum 枚举验证 只能是其中的任意一个值

```
optionalEnum:React.PropTypes.oneOf(['News', 'Photos'])
```

> 用 JS 的 instanceof 操作符声明 prop 为类的实例。

```
optionalMessage: React.PropTypes.instanceOf(Message)
```

> 多个对象类型中的一个

```
 optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
 ])
```

> 指定类型的数组

```
optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number)
```

> 指定类型的属性构成的对象

```
optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number)
```

> 指定键值和参数类型的对象

```
optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
})
```

> 验证指定类型不能为空的时候

```
requiredFunc: React.PropTypes.func.isRequired
```

> 不可为空的任意类型

```
requiredAny: React.PropTypes.any.isRequired
```

> 自定义验证器

```
// 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
                customProp: function(props, propName, componentName) {
                  if (!/matchme/.test(props[propName])) {
                    return new Error('Validation failed!');
                  }
                }
```

### 4.默认值

> React 支持以声明式的方式来定义 props 的默认值。
> 在父级没有传入props 的时候需要使用默认值
>- ES5 的写法

```
var ComponentWithDefaultProps = React.createClass({
  getDefaultProps: function() {
    return {
      value: 'default value'
    };
  }
  /* ... */
});
```

>- ES6 的写法

```
PropTypeDemo.defaultProps={
  optionalArray: [],
  optionalBool: true,
  optionalFunc: (x)=> x+1,
  optionalNumber: 123,
  optionalObject: {
    a:1
  },
  optionalString: "this is a string"
};
```
