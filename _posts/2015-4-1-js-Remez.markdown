---
layout:     post
title:      "JavaScript预解释"
subtitle:   "JS基础笔记"
date:       2015-04-01
author:     "WYY"
header-img: "img/post-bg-js-module.jpg"
catalog: true
tags:
    - JavaScript
---


#  JS预解释

### 全局作用域下面执行时候，执行的预解释
#### 全局情况下JS的执行顺序
> 1.首先会进行与预解释
> 2.代码从上到下

> js全局作用域执行执行会对用 var,function 声明的对象执行提前声明  
> 所以执行下面代码
> - 不会执行报错的
> - console.log(num); 因为整个全局执行之前 已经对num进行了声明，所以不会报错 ‘is not defined’
> - 对于声明的变量只会对其进行声明但是不会其进行赋值，所以console.log(num);会打印出undefined
> - 声明的方法会对其声明，同时也对其赋值，所以fn() 写在声明之前的时候，可以得到执行
> - 自执行函数在预加载中不会自动执行
> - 在return 后面声明的变量一会执行预加载，(虽然在代码不会执行到后面的声明，但是已经进行了预加载)。


```
console.log(num);
fn();
console.log(test);
var num=123;
function fn(){
console.log('this is a function');
console.log(he);
return;
var he="hello World";
}
;(function(){
console.log('这是自执行函数');
})();
```

> if while for 中没有执行的到的内容也会执行预加载


```
console.log(test1);
console.log(test2);
console.log(test3);
if (false) {
    var test1 = 'test1';
}

while (false) {
    var test2 = 'test2';
}

for (var i = 0; i > 10; i) {
    var test3 = 'test3';
}
```

> 预加载的时候声明定义function的时候会出现覆盖（因为var 声明的变量只会声明不会定义，所以不会出现覆盖） ,且每个方法在预加载完成定义后，在执行的过程中不会在重新定义


```
fn();
function fn(){console.log(1)};
fn();
function fn(){console.log(2)};
fn();
function fn(){console.log(3)};
fn();
function fn(){console.log(4)};
fn();
```
> 如果想重新的定义方法，修改上面的操作


```
fn()
function fn(){
console.log(0);
}
fn();
var fn=function(){
console.log(1);
}
fn();
var fn=function(){
console.log(2);
}
fn();
var fn=function(){
console.log(3);
}
fn();
```
> var 预解释的变量仅仅只声明，不赋值，undefined是因为没有赋值返回的，不是声明为undefined


```
console.log(fn);
var fn=123;
function fn(){
console.log(789);
}
var fn=321;
```

### 方法执行的时候进行预解释
#### 方法执行时候的顺序
> - 1.如果有形参先给形参赋值
> - 2.对私有作用域进行预解释
> - 3.整个私有作用的代码从上到下依次执行(整个函数中的声明的私有变量和形参都是私有变量，私有变量外界无法访问)；
> 因为整个方法执行之前已经进行了预加载，所以整个函数内容在执行之前已经存在了一个total变量，虽然它的值还是undefined，因为已经存在所以不会向上级查找


```
    console.log(total);
    var total=0;
    function fn(val1,val2){
        console.log(total);
        var total=val1+val2;
        console.log(total);
    };
    fn(100,200);
```
