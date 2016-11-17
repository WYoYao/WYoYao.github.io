---
layout:     post
title:      "ReactNative-AsyncStorage"
subtitle:   "ReactNative 本地数据持久化"
date:       2016-07-07
author:     "WYY"
header-img: "img/Coder.jpg"
catalog: true
tags:
    - JavaScript
    - React
---

# React native 数据持久化

### 读取JSON文件

> 在编写代码的时候，需要存储一些较大的，在运行的时候不需要更改的数据，这些数据可以存放在JSON文件中存储这些数据。
> 存放JSON 时候,注意JSON文件的后缀的需要使用小写的。
> 同事编写数据的时候可以使用逗号结尾。

### AsyncStorage

#### setItem 
> 保存对应的键值对 第一个参数为字符类型的键,第二个参数为字符类型的值，第三个为回调函数会返回对应的错误信息。如果没有报错则返回空值。返回一个Promise对象。

>```
>static getItem(key: string, callback?: ?(error: ?Error, result: ?string) => void)
>```

#### getItem

> 读取key字段并将结果作为第二个参数传递给callback。如果有任何错误发生，则会传递一个Error对象作为第一个参数。返回一个Promise对象。

>```
>static getItem(key: string, callback?: ?(error: ?Error, result: ?string) => void) 
>```

#### removeItem

> 删除一个字段。返回一个Promise对象。

>```
>static removeItem(key: string, callback?: ?(error: ?Error) => void)
>```

#### clear 

> 删除全部的AsyncStorage数据，不论来自什么库或调用者。通常不应该调用这个函数——使用removeItem或者multiRemove来清除你自己的key。返回一个Promise对象。

>```
>static getAllKeys(callback?: ?(error: ?Error, keys: ?Array<string>) => void)
>```

#### flushGetRequests
> 清除所有进行中的查询操作。

#### multiGet
> 获取keys所包含的所有字段的值，调用callback回调函数时返回一个key-value数组形式的数组。返回一个Promise对象。

> ```
> static multiGet(keys: Array<string>, callback?: ?(errors: ?Array<Error>, result: ?Array<Array<string>>) => void) 
> ```

>```
>multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
>```

#### multiSet
> multiSet和multiMerge都接受一个与multiGet输出值一致的key-value数组的数组。返回一个Promise对象。

>```
>static multiSet(keyValuePairs: Array<Array<string>>, callback?: ?(errors: ?Array<Error>) => void) 
>```

>```
>multiSet([['k1', 'val1'], ['k2', 'val2']], cb);
>```

#### multiRemove
> 删除所有键在keys数组中的数据。返回一个Promise对象。
>```
>删除所有键在keys数组中的数据。返回一个Promise对象。
>```
