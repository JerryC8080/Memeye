
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

# Introduction

Memeye is a lightweight NodeJS process monitoring tool that provides data visualization of process memory, V8 heap space memory, and operating system memory.    
The front part, with [Vue2](https://github.com/vuejs/vue) and [ChartJS](https://github.com/chartjs/Chart.js), provides a nice dynamic dashboard.    
Memeye in the host process, only the implantation of a simple data collector, the other work is to start a child-process, by the child-process to carry out.    
This will minimize the impact of Memeye's code on the host process to ensure the authenticity of the data.    

### Feature
- Lightweight
- Simple
- For development
- Visualization


*Note: Memeye only support a single process, NodeJS distributed process is not applicable, it is not recommended in the product environment。*

# Motivation
As we all know, NodeJS is very sensitive to memory.     
In April last year I used NodeJS to build a marketing project, on the day of project online PV broke one million.    
Which is showing a continuous upward trend in memory, in the process of troubleshooting problems, i want to find a lightweight, as long as the visual display of the use of memory tools, but no result.    
Then there is the idea of this project, but at that time because of the busy only made a simple Demo to use (Memeye v0.0.3).    
Recently there is time, once again turned out to reorganize and revision, add more type of the data display.    


# Demo
[See preview demo](http://jerryc8080.github.io/Memeye/)

# Compatibility
- Node v7.x
- Node v6.x

# Install & Usage

For install simply run : 

```
npm install memeye --save-dev
```

Then require it in your nodejs application

```
const memeye = require('memeye');
memeye();
```

Then open your browser and load address: 

```
http://localhost:23333  //23333 port by default.
```

That's it! No more options, no more config, just so easy.

# How it works

Memeye has three core concept: Collector, Indicator and Dashboard.    
While Collector runing in your nodejs process, Indicators and Dashboard runing on the child-process, in this way Memeye will make as little influence as possible to your nodejs process.    

## Collector
Collector will wathching and collecting data from the host node process、v8 heap and operrating system ，then send the datas to dashboard process with IPC communication channel.    

## Indicator
Indicator like a state machine . When attribute changed, the instance of Indicator will emit an event. So we can use it to handle our indicators data of process, v8 heap and OS.    

## Dashboard

The dashboard , will calling at the child process way. It will create an Indicator instance and start a http server which provide a socket.io instance.     
Then bind the indicator with process IPC channel, to recive massage from parent process.     
And then bind the indicator with socket.io, to send messages while indicator attrbutes changed.    

## The commication between Collector, Indicator and Dashboard

![commication.jpeg](https://raw.githubusercontent.com/JerryC8080/figure-bed/master/img/20190717214117.jpg)

# Test
Simply run:

```
npm test
``` 

# Some feature may be
- [ ] Mutil process support
- [ ] Report export

# License

[MIT License](LICENSE)

Copyright (c) 2016-2017 JerryC
