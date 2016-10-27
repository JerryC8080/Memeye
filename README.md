# Memeye 
The eye of memory, 一个提供可视化数据的内存监控器。

# 快速上手

## install
```
npm install memeye --save-dev
```

## run
```
const memeye = require('memeye');
memeye(options);
```

# 预览

![dashboard](./client/images/image.jpeg)

# TODO
## V0.1.0
- [ ] 可配置项，遵循DRY原则
- [ ] Little Fix
  - [ ] memory chart provide hour option
  - [ ] log level, 产品环境下不打印debug信息
- [ ] eslint, 使用airbnb的风格
- [ ] 持续集成
  - [ ] 单元测试
  - [ ] eslint检测
  - [ ] 检测与生成覆盖率
  - [ ] 自动部署和发布
  
## v0.2.0
- [ ] Pipe Chart for memory, 显示heapTotal, heapUsed, heapFree的比例
- [ ] 监控OS的数据
- [ ] 监控V8的内存组成

## v0.3.0
- [ ] 数据持久化，可以考虑配置到把数据输出到指定目录中
- [ ] 数据保存，生成数据。考虑程序重启情况
- [ ] 多线程支持，通过配置，接收monitor输出数据的client

## v0.3.1
- [ ] DOC
  - [ ] Quick Start
  - [ ] How it work
  - [ ] Config
  - [ ] About Project
    - [ ] Project Structure
    - [ ] How to pull request
