---
layout:     post
title:      "CSS中的选择器"
subtitle:   "CSS中的选择器"
date:       2015-03-11
author:     "WYY"
header-img: "img/post-bg-alitrip"
catalog: true
tags:
    - CSS
---


# CSS选择器

### 1.基础的选择器

|选择器|含义|示例|
|:---|:---|:---|
|*|通用元素选择器，匹配任何元素| { margin:0; padding:0; }|
|E|标签选择器，匹配所有使用E标签的元素|p { font-size:2em; }|
|.info|class选择器，匹配所有class属性中包含info的元素|.info { background:#ff0; }|
|#info|id选择器，匹配所有id属性等于info的元素|	#info { background:#ff0; }|

### 2.组合选择器

|选择器|含义|示例|
|:---|:---|:---|
|E,F|多元素选择器，同时匹配所有E元素或F元素，E和F之间用逗号分隔|Div,p { color:#f00; }|
|E F|后代元素选择器，匹配所有属于E元素后代的F元素，E和F之间用空格分隔|#nav li { display:inline; },li a { font-weight:bold; }示例|
|E > F|子元素选择器，匹配所有E元素的子元素F|div > strong { color:#f00; }|
|E + F|毗邻元素选择器，匹配所有紧随E元素之后的同级元素F|p + p { color:#f00; }|

### 3. CSS2.1属性选择器

|选择器|含义|示例|
|:---|:---|:---|
|E[att]|匹配所有具有att属性的E元素，不考虑它的值。（注意：E在此处可以省略，比如“[cheacked]”。以下同。）|p[title] { color:#f00; }|
|E[att=val]|匹配所有att属性等于“val”的E元素|div[class=”error”] { color:#f00; }|
|E[att~=val]|匹配所有att属性具有多个空格分隔的值、其中一个值等于“val”的E元素|td[class~=”name”] { color:#f00; }|
|E[att\|=val]|匹配所有att属性具有多个连字号分隔（hyphen-separated）的值、其中一个值以“val”开头的E元素，主要用于lang属性，比如“en”、“en-us”、“en-gb”等等|p[lang\|=en] { color:#f00; }示例|

### 4. CSS2.1中的伪类

|选择器|含义|示例|
|:---|:---|:---|
|E:first-child|	匹配父元素的第一个子元素|p:first-child { font-style:italic;}|
|E:link|匹配所有未被点击的链接|示例|
|E:visited|匹配所有已被点击的链接|示例|
|E:active|匹配鼠标已经其上按下、还没有释放的E元素|示例|
|E:hover|匹配鼠标悬停其上的E元素|input[type=text]:hover { background:#fff; }|
|E:focus|匹配获得当前焦点的E元素|input[type=text]:focus { background:#fff; }|
|E:lang(c)|匹配lang属性等于c的E元素|q:lang(sv) { quotes: “\201D” “\201D” “\2019″ “\2019″; }|

### 5. CSS 2.1中的伪元素

|选择器|含义|示例|
|:---|:---|:---|
|E:first-line|匹配E元素的第一行|p:first-line { font-weight:bold; color;#600; }|
|E:first-letter|匹配E元素的第一个字母|.preamble:first-letter { font-size:1.5em; font-weight:bold; }|
|E:before|在E元素之前插入生成的内容|.cbb:before { content:”"; display:block; height:17px; width:18px; background:url(top.png) no-repeat 0 0; margin:0 0 0 -18px; }|
|E:after|在E元素之后插入生成的内容|a:link:after { content: ” (” attr(href) “) “; }|


### 6. CSS 3的同级元素通用选择器

|选择器|含义|示例|
|:---|:---|:---|
|E ~ F|匹配任何在E元素之后的同级F元素|p ~ ul { background:#ff0; }|

### 7.CSS 3 属性选择器

|选择器|含义|示例|
|:---|:---|:---|
|E[att^=”val”]|属性att的值以”val”开头的元素|div[id^="nav"] { background:#ff0; }|
|E[att$=”val”]|属性att的值以”val”结尾的元素|div[id$="nav"] { background:#ff0; }|
|E[att*=”val”]|属性att的值包含”val”字符串的元素|div[id\*="nav"] { background:#ff0; }|


### 8.CSS 3中与用户界面有关的伪类

|选择器|含义|示例|
|:---|:---|:---|
|E:enabled|匹配表单中激活的元素|input[type="text"]:enabled { background:#ddd;}|
|E:disabled|匹配表单中禁用的元素|input[type="text"]:disabled { background:#ddd;}|
|E:checked|匹配表单中被选中的radio（单选框）或checkbox（复选框）元素|示例|
|E::selection|匹配用户当前选中的元素|示例|

### 9. CSS 3中的结构性伪类

|选择器|含义|示例|
|:---|:---|:---|
|E:root|匹配文档的根元素，对于HTML文档，就是HTML元素|示例|
|E:nth-child(n)|匹配其父元素的第n个子元素，第一个编号为1|p:nth-child(3) { color:#f00; }|
|E:nth-last-child(n)|匹配其父元素的倒数第n个子元素，第一个编号为1|tr:nth-last-child(2) { background:#ff0; }|
|E:nth-of-type(n)|与:nth-child()作用类似，但是仅匹配使用同种标签的元素|示例|
|E:nth-last-of-type(n)|与:nth-last-child() 作用类似，但是仅匹配使用同种标签的元素|示例|
|E:last-child|匹配父元素的最后一个子元素，等同于:nth-last-child(1)|p:last-child { background:#ff0; }|
|E:first-of-type|匹配父元素下使用同种标签的第一个子元素，等同于:nth-of-type(1)|示例|
|E:last-of-type|匹配父元素下使用同种标签的最后一个子元素，等同于:nth-last-of-type(1)|示例|
|E:only-child|匹配父元素下仅有的一个子元素，等同于:first-child:last-child或 :nth-child(1):nth-last-child(1)|示例|
|E:only-of-type|匹配父元素下使用同种标签的唯一一个子元素，等同于:first-of-type:last-of-type或 :nth-of-type(1):nth-last-of-type(1)|示例|
|E:empty|匹配一个不包含任何子元素的元素，注意，文本节点也被看作子元素|示例|

### 10. CSS 3的反选伪类

|选择器|含义|示例|
|:---|:---|:---|
|E:not(s)|匹配不符合当前选择器的任何元素|:not(p) { border:1px solid #ccc; }|

### 11. CSS 3中的 :target 伪类
|选择器|含义|示例|
|:---|:---|:---|
|E:target|匹配文档中特定”id”点击后的效果|示例|



> **选择器的权重相关**
> （表格中的“，” 不代表并集）

类型|值|权重值
--|--|--
通用选择器，子选择器和相邻同胞选择器|*,>,+|特性值为：0
类型选择器,伪元素|H1,::selection|特性值为：1	
类，伪类和属性选择器|.apple,:hover,[attr=”val”]|特性值为：10
ID选择器|\#id316|特性值为：100
内联样式|style='color:red'|特性值为：1000

> 实践的同时发现两个问题，可以做参考
>- 权重总值得计算必须在最高选择器相同的情况下，(11类选择器干不过一个ID选择器)
>- 继承获取的属性干不过选择器获得的属性