# Memeye

一个提供可视化数据的内存监控器。

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
