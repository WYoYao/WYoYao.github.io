---
layout: post
title: Atom-Eommit 初体验
subtitle: 自己的学习笔记
date: 2015-05-01T00:00:00.000Z
author: WYY
header-img: img/post-bg-unix-linux.jpg
catalog: true
tags:
  - Atom
---

# Atom-Eommit 初体验

## html:5 +tab 生成

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>

</body>
</html>
```

## 生成html标签

> 标签名+#id+.class+[属性的名称="值"]+{内容}<br>

> div#test.test{helloWorld}

> ```
> <div id="test" class="test">helloWorld</div>
> ```

> p#test.test{这个就是p标签}

> ```
> <p id="test" class="test">这个就是p标签</p>
> ```

> a#testid.testclass[href='<https://www.baidu.com']{点击去百度}>

```
<a href="https://www.baidu.com" id="testid" class="testclass">点击去百度</a>
```

## 定义标签的同时生成标签中的上下级标签

### 子标签> 同级标签+ 上级标签^

> div#divid.divclass>ul#ulid.ulclass>li#liid.liclass>p#pid.pclass[name='phtml']{这个是P标签里面的内容}

> ```
> <div id="divid" class="divclass">
>   <ul id="ulid" class="ulclass">
>     <li id="liid" class="liclass">
>       <p id="pid" class="pclass" name="phtml">这个是P标签里面的内容</p>
>     </li>
>   </ul>
> </div>
> ```

> div>p+p

> ```
> <div>
>  <p></p>
>  <p></p>
> </div>
> ```

> 这两个生成的html代码是一致的，只过不一个通过向上级查找实现的 div>p>ul>li>^span+b<br>
> div>p>ul>li+span+b

> ```
> <div>
>  <p>
>    <ul>
>      <li></li>
>      <span></span>
>      <b></b>
>    </ul>
>  </p>
> </div>
> ```

### 分组() 乘法* 自增$ 自减$@- 起序$@数字

> div>ul>(li>a)*2

> ```
> <div>
>   <ul>
>     <li><a href=""></a></li>
>     <li><a href=""></a></li>
>   </ul>
> </div>
> ```

> div>h1{增序}+ul>(li>a{$})*3

> ```
> <div>
>   <h1>增序</h1>
>   <ul>
>     <li><a href="">1</a></li>
>     <li><a href="">2</a></li>
>     <li><a href="">3</a></li>
>   </ul>
> </div>
> ```

> div>h1{降序}+ul>(li>a{$@-})*3

> ```
> <div>
>   <h1>降序</h1>
>   <ul>
>     <li><a href="">3</a></li>
>     <li><a href="">2</a></li>
>     <li><a href="">1</a></li>
>   </ul>
> </div>
> ```

> div>h1{起序为4}+ul>(li>a>{$@4})*3

> ```
> <div>
>   <h1>起序为4</h1>
>   <ul>
>     <li><a href="">4</a></li>
>     <li><a href="">5</a></li>
>     <li><a href="">6</a></li>
>   </ul>
> </div>
> ```

## 还不是最后的完整版，后续会更新CSS.

[如果感觉看不明白请点击](http://www.bkjia.com/webzh/1001004.html)
