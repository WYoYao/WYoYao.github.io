---
layout:     post
title:      "ES6函数式编程"
subtitle:   "ES6函数式编程"
date:       2016-04-30
author:     "WYY"
header-img: "img/post-bg-js-module.jpg"
catalog: true
tags:
    - JavaScript
---

# JavaScript 函数式编程

### 1.纯函数式
> 函数式编程的核心就是借助形式化数学来描述逻辑：lambda 运算。数学家们喜欢将程序描述为数据的变换，这也引入了第一个概念：纯函数。纯函数无副作用，仅仅依赖于函数的输入，并且当输入相同时输出保持一致。


>- 分函数式编程


```
let number = 1;

const increment = () => number += 1;

increment();
```

>- 函数式编程

```
const increment = n => n + 1;

increment(1);
```

### 2.高阶函数
>- 将其他的函数也作为参数进行传递


```
const sum = (x, y) => x + y;

const calculate = (fn, x, y) => fn(x, y);

calculate(sum, 1, 2);
```

>- filter

```
let students=[
	{name: 'Anna', grade: 6},
    {name: 'John', grade: 4},
    {name: 'Maria', grade: 9}
];
const isApproved = student => student.grade >= 6;
students.filter(isApproved);
```
> 对应的ES5代码

```
  var students = [
      {name: 'Anna', grade: 6},
      {name: 'John', grade: 4},
      {name: 'Maria', grade: 9}
  ];

  function fn(student){
      return student.grade >= 6;
  }

  students.filter(fn);
```

>- Map

```
const byName = obj => obj.name;

students.map(byName);
```

>- 链式

```
let students = [
    {name: 'Anna', grade: 6},
    {name: 'John', grade: 4},
    {name: 'Maria', grade: 9}
];

const isApproved = student => student.grade >= 6;

const byName = obj => obj.name;

students.filter(isApproved).map(byName);
// ['Anna', 'Maria']
```

>- Reduce

```
const totalGrades = students.reduce((sum, student) => sum + student.grade, 0);

```

### 3.递归
> 1.递减

```
const countdown = num => {
    if (num > 0) {
        console.log(num);
        countdown(num - 1);
    }
}

countdown(5);
/*
5
4
3
2
1
*/
```

> 2.阶乘

```
const factorial = num => {
    if (num <= 0) {
        return 1;
    } else {
        return (num * factorial(num - 1));
    }
}

factorial(5);
//120
```

### 4.组合

> 传入三个方法之后组合成为新的函数


```
const compose = (f,g) => x => f(g(x));

const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}now`;
const moreExclaim = x => `${x}!!!!!`;
const reallyAngry = compose(exclaim, compose(toUpperCase, moreExclaim));

reallyAngry("stop this");

```

### 5.解构赋值
> 解构赋值


```
const foo = () => [1, 2, 3];

const [a, b] = foo();
console.log(a, b);
// 1 2
```
> 解构赋值

```
const foo = () => [1, 2, 3];
const [a, ...b] = foo();
console.log(a, b);
// 1 [2, 3]
```

> 默认赋值，解构赋值


```
const ajax = ({ url = "localhost", port: p = 80}, ...data)  =>
    console.log("Url:", url, "Port:", p, "Rest:", data);

ajax({ url: "someHost" }, "additional", "data", "hello");
// Url: someHost Port: 80 Rest: [ 'additional', 'data', 'hello' ]

ajax({ }, "additional", "data", "hello");
// Url: localhost Port: 80 Rest: [ 'additional', 'data', 'hello' ]
```

### 6.柯里化
> 1.对象柯里化

```
const student = name => grade => `Name: ${name} | Grade: ${grade}`;

student("Matt")(8);
// Name: Matt | Grade: 8
```

> 加法柯里化


```
const add = x => y => x + y;

const increment = add(1);
const addFive = add(5);

increment(3);
//4

addFive(10);
// 15
```
