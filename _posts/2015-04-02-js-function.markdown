---
layout:     post
title:      "JS中函数原型"
subtitle:   "JS中函数原型"
date:       2015-04-02
author:     "WYY"
header-img: "img/post-bg-js-version.jpg"
catalog: true
tags:
    - JavaScript
---


# 函数原型DOM

### 函数

> 函数在JS中存在多面性

>- **普通函数**:执行的时候形成私有作用域，形参赋值，预解释，代码执行，之后完后内存可能销毁。
>- **类**:它有自己的实例，也有一个prototype属性是自己的原型，它的实例都指向自己的原型。
>- **普通对象**:本身作为一个普通对象，有自己的私有属性，也可以通过__proto__找到Function.prototype

> 作为类的属性：
>>- protorype:作为类对应的原型

> 作为普通对象的属性：
>>- length:参数的个数
>>- name:方法的名字
>>- __proto__:指向自己的类的原型

### 函数常用方法

>- call: 改变调用方法中的this,然后方法执行，原理大致如下

```
// 这里没做数据类型的判断现在只能使用数字
Function.prototype.myCall=function(obj){
    eval('('+this.toString().replace(/this/g,obj)+')()');
}
```

> 使用一个call 的时候只是替换了原来调用方法的this 然后执行
```
function say(){
    console.log(this);
}

say.call(123);
```

> 使用两个call以上的时候，后面的传入的对象，会将第一个生成方法的this也直接替换，这样的时候后面传入的参数必须是一个方法，不然会报错。

```
function fn1(){
    console.log(1)
}

function fn2(){
    console.log(2)
}

fn1.call(fn2);//1
fn1.call.call(fn2);//2
fn1.call.call.call(fn2);//2
fn1.call.call.call.call(fn2);//2
```

> 如果call 方法中的第一个参数不传任何值，或空值，undefined，在非严格模式下的时候，方法执行的中的this 都window,在严格模式下为空。

```
function fn(){
    console.log(this);
}

fn.call();//window
fn.call(undefined);//window
fn.call(null);//window
```

> 严格模式

```
function fn(){
    console.log(this);
}

fn.call();//undefined
fn.call(undefined);//undefined
fn.call(null);//null
```

- apply

> apply的方法作用和call方法的作用是一模一样的，但是传入参数的方式不是相同的，call方法中的参数是一个一个传入，但是apply 方法的传入参数的格式后面是通过[]的方式进行赋值的。

```
"use strict";

function fn(num,num1){
    console.log(this,num,num1);
}

fn.call({name:'leo'},1,2);
fn.apply({name:'leo'},[1,2]);
```

- bind 
> bind 在IE6-8都不兼容，作用修改方法中的this,然后返回这个方法并不执行。方法使用的时候跟call的方法相同。
> bind方法实现了预处理的思想的，用bind返回之后直接调用就好了。

```
"use strict";

function fn(num,num1){
    console.log(this,num,num1);
}

fn.call({name:'leo'},1,2);
fn.apply({name:'leo'},[1,2]);
var template = fn.bind({name:'leo'},1,2);
template();
```

### call apply 实际运用

> 求数组中的最大(小)值

```
"use strict";
let arr=[2,1,3]
// Math.max的使用方法如下
console.log(Math.max(2,1,3))
// 单数传入的个数可能不定，而且是个数组，这个时候就可以使用apply
console.log(Math.max.apply(null,[2,1,3]));
// 在ES6的语法中可以如下通过... 进行转换
console.log(Math.max.call(null,...[2,1,3]))
```

> 实现数组clone

```
"use strict";

Array.pro

function avg(){
    // arguments 是一个类数组但是不是一个数组，所以不能使用数组的方法，所以我们需要转换arugment成为一个数组，也可以将arguments当作数组的调用数组的方法
    var result=[].reduce.call(arguments,function(content,item){
        content+=item;
        return content;
    },0)/arguments.length;
    // 进行四舍五入
    return result.toFixed(2);
}

```

> 实现类数组转换成为数组

```
// Array 的slice 的方法也是类似于这种的原理，所以可以使用slice来直接将类数组转换成为数组

function Convert(){
   return [].slice.call(arguments)
}

console.log(Convert(2,1,3,4))
```

> 通过call apply 可以借用了相似类的方法，必须满足一些特定的条件才能进行遍历，arugment 科比案例

### try{}catch(e){}finally{}

```
"use strict";

try{
    console.log(num);
}catch(e){
    throw new Error('网络异常');
}finally{
    console.log('咱们继续');
}
```

> 前面通过IE6-8 不支持slice 可以通过try catch 进行全部的兼容

```
"use strict";

function list2Array(){
    var arr=[];
    try{
        arr = [].slice.call(arguments);
    }catch(e){
        for(var i=0;i<arguments.length;i++){
            arr[arr.length]=arguments[i];
        }
    }
    return arr;
}
```

### 详解Sort方法

```
"use strict";
// a,b 数组第n项，和数组的n+1 项'
[4,5,6,7,1,2,3].sort((a,b)=>{
    // b 依次向前面的项进行比对,根据return 返回的参数来决定b是否继续向前进行比对'
    console.log(a,b);
    // 如果a-b为负的时候，两项交换位置，正的时候不交换位置
    return a-b;
})

// 所以也可以来进行反转
"use strict";

[4,5,6,7,1,2,3].sort((a,b)=>{
    // 返回为正数的时候会一直像前比对
    return 1;
})
```

> Object 数组和Number数组排序的区别

```
// 如果的数组的每一项为Object类型的时候,根据数组属性排序
[{age:12,},{age:2,},{age:345,},{age:45,},{age:5,}].sort((a,b)=>a.age-b.age);

// 数组的每一项为Number的时候，可以准确的进行排列'
[12,2,345,45,5].sort((a,b)=>a-b)

// 但是当每一项为Object根据字符串属性进行排序的时候，就会按照这个属性值对应ASCLL表的排序进行排序
[{name:'腾讯'},{name:'百度',},{name:'阿里'},{name:360}].sort((a,b)=>a.name.localeCompare(b.name))
```

### JSON 数据类型的转换

```
"use strict";
// 字符串转JSON
JSON.parse("{\"name\":\"leo\"}")
// JSON 转字符串
JSON.stringify({name:'leo'})
// JSON.parse 在低版本的浏览器中不兼容,可以使用eval进行转换
eval("("+ "{\"name\":\"leo\"}" +")")
// 兼容新老版本的方法
function JSON_Parse(str){
    return 'JSON' in window?JSON.parse(str):eval('('+ str +')')
}
```
