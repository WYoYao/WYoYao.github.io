---
layout: post
title: Dos 查看当前端口状态
subtitle: 学习笔记
date: 2015-06-02T00:00:00.000Z
author: WYY
header-img: img/post-bg-unix-linux.jpg
catalog: true
tags:
  - Dos
---

# Dos 命令查看端口占用及关闭进程

## 1.查看端口占用

> 在window 命令行窗口下面执行：

> 查看所有端口的占用情况

> ```
> netstat -a
> ```

> ```
> netstat -n
> ```

> 单独查看某个端口是否被占用

> ```
> netstat -aon|findstr "8080"
> ```

协议  |      本地地址      |   外部地址    |    状态     | PID(进程号)
:-: | :------------: | :-------: | :-------: | :------:
TCP | 127.0.0.1:8080 | 0.0.0.0:0 | LISTENING |   9860

> 上面显示的是被进程号9860的进程所占用了 查找9860进程，到底是个什么东西

```
tasklist|findstr "9860"
```

  映像名称   | PID(进程号) |   会话名   | 会话 |  内存使用
:------: | :------: | :-----: | -- | :----:
node.exe |   9860   | Console | 1  | 52348K

## 关闭进程

> #### 根据进程号关闭进程

```
taskkill /pid 9860
```

> 也可以同时关闭多个进程号

```
taskkill /pid 9860 /pid (进程号)
```

> #### 根据进程的名称关闭进程（关闭在个映像名称占用的所有进程）

```
tasklill /im node.exe
```

> 同时关闭多个映像名称所暂用的进程

```
tasklill /im node.exe /im 映像名称
```

> 如果想要关闭所有进程的时候，可以通过使用通配符的方式实现

```
taskkill /im *.exe
```

> #### 有提示的关闭进程,(避免惨案发生，多一秒真诚)

> ```
> taskkill /t /im node.exe
> taskkill /t /pid 9860
> ```

> #### 强制关闭进程 (有些进程只能强制终止，比如现在提到的node)

```
taskkill /f /im node.exe
taskkill /f /pid 9860
```

## 3.端口状态

> #### 3.1 LISTENING状态

> FTP服务启动后首先处于侦听（LISTENING）状态。3.2 ESTABLISHED状态ESTABLISHED的意思是建立连接。表示两台机器正在通信。

> #### 3.3 CLOSE_WAIT

> 对方主动关闭连接或者网络异常导致连接中断，这时我的状态会变成CLOSE_WAIT 此时我方要调用close()来使得连接正确关闭

> #### 3.4 TIME_WAIT

> 我方主动调用close()断开连接，收到对方确认后状态变为TIME_WAIT。TCP协议规定TIME_WAIT状态会一直持续2MSL(即两倍的分段最大生存期)，以此来确保旧的连接状态不会对新连接产生影响。处于TIME_WAIT状态的连接占用的资源不会被内核释放，所以作为服务器，在可能的情况下，尽量不要主动断开连接，以减少TIME_WAIT状态造成的资源浪费。 目前有一种避免TIME_WAIT资源浪费的方法，就是关闭socket的LINGER选项。但这种做法是TCP协议不推荐使用的，在某些情况下这个操作可能会带来错误。

> #### 3.5 SYN_SENT状态

> SYN_SENT状态表示请求连接，当你要访问其它的计算机的服务时首先要发个同步信号给该端口，此时状态为SYN_SENT，如果连接成功了就变为ESTABLISHED，此时SYN_SENT状态非常短暂。但如果发现SYN_SENT非常多且在向不同的机器发出，那你的机器可能中了冲击波或震荡波之类的病毒了。这类病毒为了感染别的计算机，它就要扫描别的计算机，在扫描的过程中对每个要扫描的计算机都要发出了同步请求，这也是出现许多SYN_SENT的原因。
