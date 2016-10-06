# node-memeye
provide a dashboard to you that show memory usage.

# 目录
```
.
├── LICENSE
├── README.md
├── client // 开发用，前端工程
├── coverage // 单元测试覆盖率
├── index.js // 程序主入口
├── node_modules
├── package.json
├── public  // 数据可视化，前端静态资源
├── src
│   ├── bootstrap.js  // 源码主入口，启动程序
│   ├── config  // 配置
│   ├── dashboard  // Dashboard, 接收monitor返回数据，并通过`socket.io`传递到前端中
|       ├── index.js  // 主入口，接收monitor信息，启动woker，构建可视化服务                                                                                                                               
|       ├── worker.js  // 启动子进程，用于构建可视化前端服务，并调用charts，传递信息
|       └── charts  // 定义页面上每个图表，受dashboard调用，负责处理接收到的信息（持久化、格式化、传递到前端）
│   ├── db  // 历史数据存储
│   ├── lib  // 工具类
│   └── monitor  // Monitor，监听宿主进程的，收集信息。
|       ├── Monitor.js  // 所有monitor都需要继承的接口类，其定义了monitor都需要实现的方法和属性（star(), stop(), name, emit[change, ...]）                                                                                                                     
|       ├── Process.js  // ProcessMonitor, 负责进程信息监听和收集                                                                                                                       
|       ├── System.js  // SystemMonitor, 负责系统信息监听和收集                                                                                                                                  
|       └── index.js  // 主入口
└── test
    ├── run.js // 测试脚本，启动index.js
    └── unit // 单元测试

```