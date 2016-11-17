---
layout:     post
title:      "ReactComponent生命周期"
subtitle:   "ReactComponent生命周期"
date:       2016-07-06
author:     "WYY"
header-img: "img/Coder.jpg"
catalog: true
tags:
    - JavaScript
    - React
---

# React-Native 组件的生命周期

### 1.1 getInitialState
> 状态初始化调用一次 getInitialState方法
> 这个函数在组件初始化之前调用，他的返回值会成为this.state 的初始值。
> ES5
> ```
> var Video = React.createClass({
>     getInitialState: function() {
>         return {
>             loopsRemaining: 'maxLoops',
>         };
>     },
> })
> ```

> ES6
> ```
> class Video extends React.Component {
>     constructor(props){
>         super(props);
>         this.state = {
>             loopsRemaining: 'maxLoops',
>         };
>     }
> }
> ```

###1.2 getDefaultProps

> 在组件被创建时调用一次 getDefaultProps 返回的值会成为this.props 的初始值。 如果组件制定了props 中的某些值，这些值回合this.props 的初始值合并，如果有相同的键，父组件制定的键值将覆盖初始值中的键。（这个实例在各个实例之间共享，而不是每个实例之间拷贝一份，从而节约资源）

> ES5 语法

>```
>var Video = React.createClass({
>    getDefaultProps: function() {
>        return {
>            autoPlay: false,
>            maxLoops: 10,
>        };
>    },
>  })
>```

> ES6 语法

>```
>class MyApp extends Component {
>  render() {
>   return (
>      <View>
>          <Text>Hello World</Text>
>      </View>
>    );
>  }
>}
>MyApp.defaultProps = {
>   autoPlay: false,
>    maxLoops: 10,
>};
>```

### 2.1 componentWillMount
> 这个函数只会执行一次，他在渲染之前被调用 componentWillMount() ，当它执行完后，render函数会被马上的调用执行。
>- 如果在这个函数中使用setState 函数改变了某些状态机变量的值，React Native 框架不会执行渲染操作，而是等这个函数执行完成才开始渲染操作。
>- React-Native 的子组件也有componetWillMount 函数，并且会在父组件的compoentWDidMount 执行完毕之后被调用。
>- 这个函数不需参数并且不需要任何的返回值
>- 如果开发者需要从本地读取数据用于显示，那么应该在这个函数中进行读取是一个很好的时机。

### 2.2 componentDidMount
> 在React-Native 组件的生命周期中，这个函数只会被调用一次，它在初始渲染执行完成后会马上被调用。
>- 在这个方法执行之后，开发者可以通过子组件的引用来操作任何的子组件(子组件在这个时候已经完全进行加载了)，子组件的componentDidMount 会在父组件的componentDidMount 方法之前被调用。
>- 这个函数无参数并且不需要任何的返回值。
>- 如果以React-Native 应该需要在应用程序显示初始页面之后从网络侧获取数据，那么从网络侧获取的数据的代码需要在这个函数中进行操作。

>- 父组件的componentWillMount被调用
>- 子组件的componentWillMount被调用
>- 子组件的componentDidMount被调用
>- 父组件的componentDidMount被调用

### 3.1 componentWillReceiveProps
> 在React-native 组件初次渲染执行完成后，当React native 组件接收到新的props 时，这个函数将被调用,这个函数将会接受一个Object 的参数，object 里是新的props。
>- 当React Native 初次渲染的时候componentWillReceiveProps 函数并不会执行，这种设计的故意的。
>- 如果新Props会导致页面重新渲染，这个函数将在渲染之前被执行，在函数中中this.props 会是老的props值，新的props 会是在方法中通过参数传入，如果在componentWillReceiveProps 执行完成之后一起渲染。
>- 这个函数不需要返回值

### 3.2 shouldComponentUpdate
> 这个函数的原型是
> ```
> boolean sholudComponentUpdate(object nextProps,object nextState)
> ```
> React Native 初始完成渲染之后，当ReactNative 组件接受到新的state或props 时，这个函数将会被调用，它接收两个Object类型的参数，这个函数返回一个boolean 值，决定组件时候重新被渲染，从而决定componentWillUpdate，componentDidUpdate 是否会被调用，这个方法默认返回的是true ,
>- 通过这个函数来阻止不必要的渲染。
>- 这个函数最好设置返回值，不然会出现提醒。

### 3.3 componentWillUpdate
> 在组件首次渲染成功之后，组件每次重新渲染之前会调用这个方法，可以为渲染的时候后做一些准备工作，但是不能够在这个函数中重新this.setState 再次改变状态的机的值，如果需要改变应该在componentWillReceiveProps 中进行改变。
>- 这个函数不需要多的返回值，
>- 这个函数可以执行类似于loadding 框之类的空间。

### 3.4 ComponentDidUpdate
> 函数的原型为
>
> ```
> componentDidUpdate(object prevProps,object prevState)
> ```
>
> React Native 初次渲染完毕之后，React Native 框架重新渲染React Native 组件完成的后会调用这个函数，传入的两个参数是渲染前的props 和state,这个函数不需要对应的返回值。

### 3.5componentWillUnmount
> 在组件被卸载之前的时候被调用，这个函数没有的参数，也需要返回值，如果React Native 组件中申请了某些资源或订阅了解了某些消息，那么需要在这个函数中释放资源，取消订阅。

> 所有的事件的顺序依次是
>- 父组件的componentWillMount被调用
>- 子组件的componentWillMount被调用
>- 子组件的componentDidMount被调用
>- 父组件的componentDidMount被调用
>- 父组件componentWillReceiveProps被调用
>- 父组件shouldComponentUpdate被调用
>- 父组件componentWillUpdate被调用
>- 子组件componentWillReceiveProps被调用
>- 子组件shouldComponentUpdate被调用
>- 子组件componentWillUpdate被调用
>- 子组件componentDidUpdate被调用
>- 父组件componentDidUpdate被调用