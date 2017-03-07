<div align="center">
  <img width="300" heigth="300" src="/assets/memeye-logo.png" alt="memeye logo">
</div>

[![Build Status](https://travis-ci.org/JerryC8080/Memeye.svg?branch=master)](https://travis-ci.org/JerryC8080/Memeye) 
[![npm version](https://badge.fury.io/js/memeye.svg)](https://badge.fury.io/js/memeye) 
[![Package Quality](http://npm.packagequality.com/shield/memeye.svg)](http://packagequality.com/#?package=memeye) 
[![npm](https://img.shields.io/npm/dt/memeye.svg)](https://www.npmjs.com/package/memeye)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/JerryC8080/Memeye/blob/master/LICENSE) 

# Memeye
[中文版](README_zh.md)

# 介绍
Memeye 是一个轻量级的 NodeJS 进程监控工具，它提供 进程内存、V8 堆空间内存、操作系统内存 三大维度的数据可视化展示。
前端部分，借助 [Vue2](https://github.com/vuejs/vue) 和 [ChartJS](https://github.com/chartjs/Chart.js) 提供了一个不错的动态展示面板。    
Memeye 在宿主进程中，只植入了一个简单的数据收集器，其他工作则启动一个子进程，交由子进程来进行。    
这样做能把 Memeye 的代码对宿主进程的影响降到最低，以确保数据的真实性。    

### 特点
- 轻量级
- 简单
- 面向开发环境
- 可视化

*Note: Memeye 暂时只支持单进程，NodeJS 分布式进程还不适用，所以不建议在产品环境使用。*

# 动机
总所周知，NodeJS 对内存是很敏感的。在去年 4 月我用 NodeJS 做的一个营销性的项目，在上线当天 PV 突破了 100W。        
其中内存就呈现出持续上涨趋势，在排查问题的过程中，想寻找一个轻量级的，只要可视化的呈现内存使用情况的工具，无果。        
然后就有了这个项目的想法，但当时由于繁忙只做出了一个 Demo 级别的，简单能用就发布了。    
最近有时间，再次翻出来，重构改版，增加更多维度的数据展示。    

# Demo
[See preview demo](http://jerryc8080.github.io/Memeye/) (也许需要翻墙)

# 兼容性
- Node v7.x
- Node v6.x

# 安装 & 使用

运行下面命令安装 : 

```
npm install memeye --save-dev
```


然后在你的代码中引入

```
const memeye = require('memeye');
memeye();
```

最后打开你的浏览器，输入下面地址：

```
http://localhost:23333  //23333 port by defaul.
```

就这么简单！

# Memeye 是如何工作的

Memeye 有三个核心概念：Collector, Indicators, Dashboard。    
Collector 运行在宿主进程中（你的NodeJS进程），Indicator 和 Dashboard 运行在子进程中，这样可以尽量减少 Memeye 代码对你的宿主进程的影响。    

## Collector
Collector 会监听宿主进程，并且收集数据，然后通过 IPC 通信管道发送数据给子进程，交由子进程处理。    

## Indicator
Indicator 像一个状态机。当它的属性变化的时候，会触发相应事件。所以我们可以用它来处理收集回来的数据。    

## Dashboard
Dashboard 会以子进程的形式唤起。他会创建一个 Indicator 实例，以及启动一个集成 socket.io 的 Http 服务器。    
然后绑定 Indicator 和进程通信管道，以接收父进程发过来的数据。    
最后再绑定 Indicator 和 socket.io，这样可以在 Indicator 属性变化的时候发送数据给前端。    

##Collector, Indicator, Dashboard 之间的通信

![commication.jpeg](http://obxj5yn80.bkt.clouddn.com/61A039DF1C61FEDE7DA26ED0E860C5D1.jpg)


# 测试

```
npm test
```

# 在考虑的功能
- [ ] 支持多进程
- [ ] 支持导出报告

# 许可

[MIT License](LICENSE)

Copyright (c) 2016-2017 JerryC