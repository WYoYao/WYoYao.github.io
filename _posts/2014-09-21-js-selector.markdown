---
layout:     post
title:      "DOM元素获取"
subtitle:   "DOM元素获取"
date:       2014-09-21
author:     "WYY"
header-img: "img/post-bg-js-version.jpg"
catalog: true
tags:
    - JavaScript
    - DOM
---


# DOM元素  

### 获取元素的方法


> 选择器方法

方法 | 作用 | 适用于普通DOM | IE678
---|---|---|---
getElementById | 根据元素ID获取元素 |false | true
getElementsByName | 根据元素Name 获取元素，IE在表单中只对form表单中的元素起作用 | false | true
document.documentElement| 获取body | false | false
document.body | 获取body | false | true
getElementsByTagName | 把指定容器中的指定标签类型的元素全部获取到 | true | true
getElementsByClassName | 把制定容器中制定样式的元素获取到 | true | false
querySelector | 使用CSS中的选择器获取一个对应的元素 | true | false
querySelectorAll | 使用CSS中的选择器获取全部对应的元素 | true | false


### 元素之间的关系方法

方法 | 作用 | IE678
---|---|---
childNodes | 1.文本 2.元素 （标准浏览器中会把空格换行注释都当成文本元素） | true
children | 获取元素,在选取结果的时候标准浏览器与非标注你的浏览器获取的内容可能不一致 | false
parentNode |获取父级元素|true
previousSibling | 返回元素的前一个上一个Node 节点 | false
previousElementSibling | 回元素的前一个上一个Node 节点 | false
nextSibling | 返回元素的前一个下一个Node 节点 | false
previousElementSibling | 回元素的前一个下一个Node 节点 | false
firstChild | 获取元素的第一个子节点 | true
firstElementChild | 获取元素的第一个子节点 | false
lastChild | 获取元素的第一个子节点 | true
lastElementChild | 获取元素的最后一个子节点 | false

### DOM的增加

方法 | 作用
---|---
createElement|创建一个元素
createDocumentFragment|创建一个文本碎片
appendChild|最后面添加一个元素节点
insertBefore|在一个元素之前添加一个元素节点
document.cloneNode(true/false)|true 属性全部克隆，false只克隆标签 
replaceChild|替换节点
removeChild|删除节点
get/setAttribute|设置删除熟悉


### 常用的NodeType

NodeType| Named Constant
---|---
1| ELEMENT_NODE
2| ATTRIBUTE_NODE
3| TEXT_NODE
9| DOCUMENT_NODE