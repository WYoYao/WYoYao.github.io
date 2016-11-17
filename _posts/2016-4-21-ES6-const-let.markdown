---
layout:     post
title:      "ES6 Let Const"
subtitle:   "ES6学习笔记"
date:       2016-04-21
author:     "WYY"
header-img: "img/post-bg-js-module.jpg"
catalog: true
tags:
    - JavaScript
    - ES6
---


# ES6新特性


### let和Const  的块级作用域

> 首先我们看一下没有块级作用域的时候:  
> 首先下面ES5中没有块级作用域，即使在if{}表达式里面，还是会影响到外部的变量

```
;(function(){
  var n=5;
  if(true){
   var n=10;
  }
  console.log(n);//10
})();
```

>　接下来使用let 声明变量,因为有了块级作用域之后，let n=10 的作用域仅限在if(ture){} 下面，不会影响到外部的变量

```
;(function(){
  let n=5;
  if(true){
   let n=10;
  }
  console.log(n);//5
})();

```

> 当我们使用for 循环的时候总是容易出现这种情况

```
//执行for 循环的时候值会影响外部的i的值
console.log(i);
for (var i = 0; i < 5; i++) {}
console.log(i);

//这个时候用let 就可以完美解决问题，同时还能解决预解释的问题
console.log(x);
for (let index = 0; index < 5; index++) {};
console.log(x);
```

> 还有一个例子可以说明问题

```
//由于没有块状的作用域，所以每次的打印处理啊的结果都是4
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000)
};


//拥有块级作用域，然后每个{} 中间的x 都互不影响，所以打印出来的为0，1，2，3，4
for (let x = 0; x < 5; x++) {
    setTimeout(function() {
        console.log(x);
    }, 1000)
}
```

#### 同一作用域不能重复let 定义变量
> 同时在同一作用域下，不能重复let 一个变量，会直接报错

```
    var a = 1;
    var a = 2;
    let b = 3;
    let b = 4;
```

> 同时也不能在方法中重复的声明,这样也会报错。

```
function fn(a){
    let a=1;
}
```

#### let 对预解释的影响
> let 对于预解释的影响

```
;(function(){
  //因为发生了预解释，所以这个时候答应会打印出undefind
  console.log(n);//undefind
  var n=5;
  //因为let 声明的含有作用域,可以只能像后台语言一样，不会进行提前的预解释（然后就报错了）
   console.log(m);//ReferenceError: m is not defined
  let m=10;
})();
``` 

#### let 暂时性死区

> “暂时性死区”也意味着typeof不再是一个百分之百安全的操作。

```
/*
    在let 之前调用都会出现错误，哪怕的是typeof
    typeof 调用没有声明的变量会返回undefind
    但是调用的let 绑定的变量的时候都会出现错误
    (个人认为机制还是类似的预解释，但是在声明之前的地方调用会抛错)；
*/

var a = 1;
if (true) {
    typeof a;
    let a = 2;
}
```

> 有些“死区”比较隐蔽，不太容易发现。

```
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
```

> 正确的方法

```
function bar(x = 2, y = x) {
    return [x, y];
}

bar(); // 正确
```

### ES6的块级作用域

#### 块级作用域
```
//可以理解为块级作用域
{};
```

```
//块级作用域也可以作为自执行函数进行使用,替代的之前的;(function(){})();
{
    let insane = "Hello World";
    console.log(insane);
}
```

#### 块级作用域与函数声明
> ES5 规定，函数只能在顶部作用域和函数作用域之中声明，不能在块级作用域声明。
> 但是在浏览器中的实现并不是这个样子,仍然可以在块级作用域中实现函数的声明。(不过在严格模式下会报错)

```
// 'use strict'; 在严格模式下会出现报错的情况

if (true) {
    function fn() {};
}



try {
    function fn() {}
} catch (error) {

}
```

> ES6 中引入了块级作用域，明确允许可以在块级作用域中声明函数。
> 同时在块级作用域之中声明的函数的行为类似于let,在块级作用域之外不可引用

> 但是会出现如下问题：

```
function f() {
    console.log('I am outside!');
}
(function() {
    f();
    if (true) {
        // 重复声明一次函数f
        function f() {
            console.log('I am inside!');
        }
    }
}());
```

> 同样的代码在ES5 下面会执行出"I am inside!",因为预解释的原因。
> 但是在ES6 下面的会报错,因为作用域块内的函数声明，类似于let,所以会直接的报错。

> 很显然，这种行为差异会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6在附录B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。

>- 允许在块级作用域内声明函数。
>- 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
>- 同时，函数声明还会提升到所在的块级作用域的头部。
> 注意，上面三条规则只对ES6的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。（但是Chrome浏览器上面运行的时候是按照ES6规范执行的）

> 考虑到环境导致的行为差异太大，因此需要避免在块级作用域中声明函数，如果确实需要可以写成函数表达式

> 可以将上述文章中的内容修改为如下：

```
function f() {
    console.log('I am outside!');
}
(function() {
    f();
    if (true) {
        // 重复声明一次函数f
        let f = function(){
            console.log('I am inside!')
        }

    }
}());
```

> 还有一个需要注意的地方。ES6的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。

```
'use strict';
if (true) {
    function fn() {

    };
}


if (true)
function fx() {};
```

###  Const 定义常量

> const 定义的常量不能够修改

```
const PI = 3.1415;
console.log(PI); // 3.1415
//对const 定义的常量重新赋值后，再次使用的时候会出现抛错
PI = 3;
console.log(PI); // TypeError: "PI" is read-only
```

> 如果const声明的变量不能够改变值，这意味着，const一旦声明变量，就必须初始化，不能等到后面以后赋值。
> 所以如果const 只声明不赋值就会报错

```
const a
// Missing initializer in const declaration
```

> const 的作用域与let 类似，只在所声明的块级作用域内有效。

```
if (true) {
    const a = '3.14';
};

console.log(a);
//a is not defined
```

> const 跟let 一样没有变量提升，同样存在暂时性锁区，只能在声明之后使用。

> 变量提升

```
    console.log(a);
    const a = 3.14;
    //a is not defined
```

> 暂时性锁区

```
var a=3.14;

if(true){
    console.log(a);
    const a=3.14;
}
```

> 如果const 绑定的参数是一个引用类型的值，则const 声明的变量绑定的只是引用类型的地址，不是具体的值。

```
const arr = [];
//不修改引用地址都不会出现错误
arr.push(1);
arr.push(2);
arr.push(3);
//只要修改引用地址就会出现错误
arr = [];

const obj = {};
//不修改引用地址都不会出现错误
obj.props = 123456;
//只要修改引用地址就会出现错误
obj = {};
```

> 如果想使引用类型的值也不能修改可以使用Object.freeze;

```
'use strict';
const a = Object.freeze({
    x: 1,
    y: 2
})
//严格模式下会报错  || 非严格模式下不会修改其属性
a.x = 3;
```

> 但是Objcet.freeze() 只能冻结第一层子元素，如果要冻结全部的元素，需要自己再写一个加强版的方法

```
'use strict';
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach((key, value) => {
        if (typeof obj[key] === 'object') {
            constantize(obj[key]);
        }
    })
}


const a = {
    b: {
        z: 1,
        x: 2
    },
    c: 3
};

constantize(a);

//报错
a.b.z = 2;
```

> ES5只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6一共有6种声明变量的方法。