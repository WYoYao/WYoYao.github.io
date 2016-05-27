---
layout:     post
title:      "Storage本地存储"
subtitle:   "JS基础笔记"
date:       2016-03-27
author:     "WYY"
header-img: "img/post-bg-js-module.jpg"
catalog: true
tags:
    - JavaScript
---
# HTML5 LocalStorage 本地存储
> 刚开始接触本地存储的时候只能使用cookies，但是其本身有很多缺点，每次进行http请求的时候，都会进行被发送，同时本身大小受限（大概有4k的样子），且每个域名下面支持的cookie 有数量限制
### localStorage和sessionStorage

> html5 中window加入了新的属性
> localStorage和sessionStorage 用于本地存储
> 整个localStorage 和 sessionStorage 整个作用域就是当前整个站点
> 首相两点的不同：
> - localStorage只保存在本地(可以一直保存)
> - sessionStorage，就像session一样，在整个会话结束后就为释放

> 相同点：
>- 写入一个键值对
> setItem('key','value');
>- 读取一个键值对
> getItem('key');
>- 清除一个键值对
> removeItem('key');
>- 清除所有的键值对
> clear();

### sessionStorage的用法


```
if(window.sessionStorage){
	var Storage=window.sessionStorage;
	//获取Key
	Storage[0];
	//写入一个键值对
	Storage.setItem('testKey','testValue');
	Storage.setItem('testKey1','testValue1');
	//获取一个键值对
	console.log(Storage.getItem('testKey'));
	//删除某个键值对
	Storage.removeItem('testKey');
	//删除全部的键值对
	Storage.clear();
}
```
> sessionStorage的值只能当前会话访问，就算同一浏览器多个窗口也不能同时访问，页面关闭以后，值会自动释放。

###  localStorage 的用法
```
if(window.localStorage){
	var Storage=window.localStorage;
	//获取Key
	Storage[0];
	//写入一个键值对
	Storage.setItem('testKey','testValue');
	Storage.setItem('testKey1','testValue1');
	//获取一个键值对
	console.log(Storage.getItem('testKey'));
	//删除某个键值对
	Storage.removeItem('testKey');
	//删除全部的键值对
	Storage.clear();
}
```
> 当整个页面关闭后再打开，还是能够访问到localStorage,(他的作用域根据网站的作用域决定)

### 使用注意的地方

> 以下内容中的Storage代指localStorage和sessionStorage

>- Storage只能保存字符串，任何格式的存储都会被自动转换成为字符串
>- 在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误，这时一般在setItem之前，先removeItem()就ok了。

### Storage 解析
> storage 本身是一个类似Object 类型,其拥有length属性，可以显示其键的数量

### 对Storage中的值进行事件的监听
> 可以通过storage 事件对键值对进行持续的监听，但是这只是不同页面之前的监听，比如另一个页面修改之后，当前页面会触发修改。


```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
<p>You have viewed this page <span id="count">0</span>  time(s).</p>
<p><input type="button" value="changeStorage" onClick="changeS()"/></p>
</body>
<script>
var storage=window.localStorage;
storage.setItem("pageLoadCount",0);
storage.pageLoadCount=(storage.pageLoadCount >>> 0)+1;
document.getElementById('count').innerHTML =storage.pageLoadCount;

window.addEventListener("storage",handle_storage,false);

if(window.addEventListener){
 window.addEventListener("storage",handle_storage,false);
}else if(window.attachEvent){
 window.attachEvent("onstorage",handle_storage);
}

function handle_storage(e) {
  //console.log(e);
  console.log(e.newValue,e.oldValue);
}

function changeS(){
  storage.pageLoadCount++;
}
</script>
```
