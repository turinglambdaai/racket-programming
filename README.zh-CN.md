# Racket 编程入门

《Racket 编程入门——从零基础到独立开发应用》——一本关于 Racket 编程语言的在线书籍。从计算的第一性原理出发，经函数式与命令式编程、面向对象的 GUI、用宏和 `#lang` 做语言设计，一路走到工程化与上线实战。使用 Next.js 与 MDX 构建。

🌐 在线阅读：<https://racket.jrtx.site>

![MDX](https://img.shields.io/badge/MDX-1B1C1D?logo=mdx&logoColor=white) [![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[English](README.md) · **中文**

## 全书结构

七卷正文（60 章）+ 附录（11 篇）。叙事弧线：朴素困惑入口 → 理论根基 → 实战落地。

### 起点：编程与计算的本质

回答"编程是什么、计算是什么、Racket 值不值得学"。全书的地基——零基础读者从这里建立直觉，有经验读者从这里对齐认知。

| 章 | 标题 |
|----|------|
| 1 | 写几行文字，电脑就会动 |
| 2 | 两种回答——图灵机与λ演算 |
| 3 | Racket 不是教学语言 |
| 4 | 装好 Racket，认出 DrRacket 的两扇窗 |
| 5 | 导读——为什么学、怎么读 |

### 基础：用 Racket 写点什么

回答"用 Racket 写点什么，最少要知道什么"。从括号的含义到数据、列表、结构体、函数，建立 Racket 代码的基本形状。

| 章 | 标题 |
|----|------|
| 6 | 括号不是负担——Racket 的结构之美 |
| 7 | Racket 的数据——原子与复合 |
| 8 | 列表——Racket 的主力数据结构 |
| 9 | 结构体——给数据一个明确的形状 |
| 10 | 函数与闭包——Racket 里动作如何成为值 |
| 11 | 符号表达式——Lisp 元编程的根基 |
| 12 | 从嵌套到管道——Racket 函数组合的两种方向 |
| 13 | 告别循环——map、filter 与 fold 的列表处理 |

### 函数式：不动状态的计算

回答"不动用状态，怎么完成计算"。从高阶函数、递归到 λ 演算、Y-Combinator、迷你解释器——Racket 的核心范式。

| 章 | 标题 |
|----|------|
| 14 | 递归——Racket 处理列表与树的方式 |
| 15 | 柯里化——把多参数函数拆成一串小函数 |
| 16 | 三种局部绑定——let 的并行、顺序与递归 |
| 17 | let-values——一次接收函数的多个返回值 |
| 18 | case-lambda——按参数个数分派一个函数 |
| 19 | 模式匹配——用形状拆解数据 |
| 20 | Lambda 演算——用函数表达一切计算 |
| 21 | Y-Combinator——递归从哪里来 |
| 22 | 写一个迷你解释器——递归遍历语法树 |

### 命令式与状态

回答"状态随时间怎么改变"。异常、资源管理（Custodian）、状态机实战，最后用枢纽章把命令式、GUI、Web 串成一条线。

| 章 | 标题 |
|----|------|
| 23 | 异常处理——把错误当控制流 |
| 24 | Custodian——Racket 资源的生命周期管家 |
| 25 | 红绿灯状态机——状态、转移与驱动 |
| 26 | 从状态到世界——为什么会有命令式、GUI、Web |

### 对象与界面

回答"对象怎么组织、界面怎么搭"。从 class 系统到第一个 GUI、控件、自定义绘制、声明式 GUI、后台任务。

| 章 | 标题 |
|----|------|
| 27 | 面向对象——Racket 的 class 与对象 |
| 28 | 第一个 GUI——窗口、按钮与点击计数器 |
| 29 | 为什么 Racket GUI 写不出"现代界面" |
| 30 | 8 种控件覆盖九成场景——按语义选 Racket GUI 控件 |
| 31 | Racket GUI 控件清单——内置库一次看全 |
| 32 | 自定义控件——子类化 canvas 自己画 |
| 33 | gui-easy——声明式写 Racket GUI |
| 34 | GUI 不卡顿——把耗时任务挪到后台线程 |

### 语言设计与计算模型

回答"语言本身是怎么造出来的"。宏、延续、generator、模块机制、惰性求值、DSL，最后亲手造一门 #lang 语言。

| 章 | 标题 |
|----|------|
| 35 | 宏——让 Racket 语言自己长出来的方式 |
| 36 | 延续——Racket 里的时间旅行 |
| 37 | generator——用延续造出来的迭代器 |
| 38 | 语言声明与 require——Racket 的模块机制 |
| 39 | include——源码级引入，不是模块 |
| 40 | 惰性求值——按需才算 |
| 41 | 造一个 DSL——Racket 让你设计自己的语言 |
| 42 | 写你自己的 lang——从内部 DSL 到一门独立语言 |

### 走向生产：工程化与实战

回答"读完这本书，我能用 Racket 做什么"。工具链、打包分发、数据库、Web 实战、工业级案例，对标 Core Python Applications Programming。

| 章 | 标题 |
|----|------|
| 43 | 打印函数——给人看还是给程序读 |
| 44 | 三种执行方式——同一份代码为何表现不同 |
| 45 | REPL——边想边跑的开发方式 |
| 46 | 读懂 Racket 官方文档——Guide、Reference 与 contract |
| 47 | Racket 工程工具 raco 全面指南：从包管理到应用发布 |
| 48 | Racket 包开发实战：手把手教你发布符合官方标准的 Racket 包 |
| 49 | Racket 开发者必看：如何将应用打包成 Windows macOS Linux 安装包 |
| 50 | Racket 结构化编辑解决方案 |
| 51 | Racket 编码规范：提升 Lisp 代码的可维护性实践 |
| 52 | 数据库是什么——从 Excel 到 SQL |
| 53 | 从零开始用 Racket 写一个 Web Server |
| 54 | 深入理解 Racket Web Server 的工作方式 |
| 55 | 用 Koyo 构建 Web 应用：Racket 爱好者的现代开发工具箱 |
| 56 | 如何让 Racket Web 程序稳定上线Nginx 反向代理部署指南 |
| 57 | 还在用字符串写 HTMLRacket xexpr 让你像写代码一样构建页面 |
| 58 | 还在为 Racket 与 C 交互发愁一文搞定 FFI 调用、内存管理与常见陷阱 |
| 59 | 一个 Racket 程序员的工具箱 |
| 60 | 如何构建和运行 ActivityLog2 |

### 附录

Noise 嵌入式运行时精读（Racket 能打工业级的核心证据链）、Racket 编译完全指南、Racket 语言实现剖析。

| 篇 | 标题 |
|----|------|
| 1 | Noise 精读（一）：三层架构与异步模型 |
| 2 | Noise 精读（二）：Racket 嵌入 Swift 应用的底层机制 |
| 3 | Noise 精读（三）：XCFramework 的作用 - 多平台二进制框架分发 |
| 4 | Noise 精读（四）：如何为 Noise 编译 Racket - 多平台构建指南 |
| 5 | Noise 精读（六）：编译背后的 ctool - Racket 代码的 C 工具链依赖 |
| 6 | Noise 精读（七）：Racket DSL 的设计与实现 - 宏系统与代码生成 |
| 7 | Noise 精读（八）：DSL 快速入门指南 - 定义记录、枚举与 RPC |
| 8 | Noise 精读（九）：使用 Noise 库进行跨语言开发完整指南 |
| 9 | Noise 精读（十）：实战：从零构建 Swift + Racket 计算器应用 |
| 10 | Racket 编译完全指南 |
| 11 | Racket 语言实现剖析 |

## 技术栈

- **框架**：Next.js 14（App Router，静态导出）
- **样式**：Tailwind CSS
- **内容**：MDX
- **代码高亮**：rehype-highlight

## 快速开始

### 1. 克隆

```bash
git clone https://github.com/turinglambdaai/racket-programming.git
cd racket-programming
```

### 2. 安装并运行

```bash
npm install
npm run dev
```

开发服务器启动在 `http://localhost:3000`。

### 3. 构建

```bash
npm run build
```

在 `dist/` 目录生成静态站点。

## 项目结构

```
racket-programming/
├── app/            # Next.js App Router 页面与布局
│   └── book/[part]/chapter/[slug]/   # 动态章节路由
├── components/     # React 组件
├── content/        # 章节正文 MDX（part-1 ... part-7、appendix）
├── public/images/  # 章节引用的图片
├── lib/            # 辅助函数（内容索引等）
├── scripts/        # build-content.js 生成 lib/content-data.json
├── next.config.js
└── package.json
```

## 新增 / 编辑章节

章节放在 `content/<part-id>/` 下。构建步骤（`scripts/build-content.js`，`dev`/`build` 时自动执行）扫描各 part 目录，重新生成 `lib/content-data.json`。

1. 在 `content/part-N/`（或 `content/appendix/`）下新建或编辑 `.mdx` 文件
2. 第 1 行 `# 标题` 作为章节标题
3. 第一个 blockquote 行 `> 摘要` 作为章节描述
4. 文件名的数字前缀决定在所在 part 内的排序

## 许可证

基于 [MIT License](LICENSE) 发布。
