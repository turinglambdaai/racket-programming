# Racket Programming

**《Racket 编程入门——从零基础到独立开发应用》** — an online book about the Racket programming language, written in Chinese. It runs from the first principles of computation, through functional and imperative programming, object-oriented GUIs and language design with macros and `#lang`, all the way to shipping real applications. Built with Next.js and MDX.

🌐 Live site: <https://racket.jrtx.site>

![MDX](https://img.shields.io/badge/MDX-1B1C1D?logo=mdx&logoColor=white) [![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**English** · [中文](README.zh-CN.md)

## Book Structure

Seven volumes (60 chapters) + appendix (11 articles). The narrative arc goes: plain困惑 entry → theoretical foundations → hands-on practice.

### Part 1: 起点：编程与计算的本质 (Foundations)

| Chapter | Title |
|---------|-------|
| 1 | 写几行文字，电脑就会动 |
| 2 | 两种回答——图灵机与λ演算 |
| 3 | Racket 不是教学语言 |
| 4 | 装好 Racket，认出 DrRacket 的两扇窗 |
| 5 | 导读——为什么学、怎么读 |

### Part 2: 基础：用 Racket 写点什么 (Basics)

| Chapter | Title |
|---------|-------|
| 6 | 括号不是负担——Racket 的结构之美 |
| 7 | Racket 的数据——原子与复合 |
| 8 | 列表——Racket 的主力数据结构 |
| 9 | 结构体——给数据一个明确的形状 |
| 10 | 函数与闭包——Racket 里动作如何成为值 |
| 11 | 符号表达式——Lisp 元编程的根基 |
| 12 | 从嵌套到管道——Racket 函数组合的两种方向 |
| 13 | 告别循环——map、filter 与 fold 的列表处理 |

### Part 3: 函数式：不动状态的计算 (Functional)

| Chapter | Title |
|---------|-------|
| 14 | 递归——Racket 处理列表与树的方式 |
| 15 | 柯里化——把多参数函数拆成一串小函数 |
| 16 | 三种局部绑定——let 的并行、顺序与递归 |
| 17 | let-values——一次接收函数的多个返回值 |
| 18 | case-lambda——按参数个数分派一个函数 |
| 19 | 模式匹配——用形状拆解数据 |
| 20 | Lambda 演算——用函数表达一切计算 |
| 21 | Y-Combinator——递归从哪里来 |
| 22 | 写一个迷你解释器——递归遍历语法树 |

### Part 4: 命令式与状态 (State)

| Chapter | Title |
|---------|-------|
| 23 | 异常处理——把错误当控制流 |
| 24 | Custodian——Racket 资源的生命周期管家 |
| 25 | 红绿灯状态机——状态、转移与驱动 |
| 26 | 从状态到世界——为什么会有命令式、GUI、Web |

### Part 5: 对象与界面 (Objects & GUI)

| Chapter | Title |
|---------|-------|
| 27 | 面向对象——Racket 的 class 与对象 |
| 28 | 第一个 GUI——窗口、按钮与点击计数器 |
| 29 | 为什么 Racket GUI 写不出“现代界面” |
| 30 | 8 种控件覆盖九成场景——按语义选 Racket GUI 控件 |
| 31 | Racket GUI 控件清单——内置库一次看全 |
| 32 | 自定义控件——子类化 canvas 自己画 |
| 33 | gui-easy——声明式写 Racket GUI |
| 34 | GUI 不卡顿——把耗时任务挪到后台线程 |

### Part 6: 语言设计与计算模型 (Language Design)

| Chapter | Title |
|---------|-------|
| 35 | 宏——让 Racket 语言自己长出来的方式 |
| 36 | 延续——Racket 里的时间旅行 |
| 37 | generator——用延续造出来的迭代器 |
| 38 | 语言声明与 require——Racket 的模块机制 |
| 39 | include——源码级引入，不是模块 |
| 40 | 惰性求值——按需才算 |
| 41 | 造一个 DSL——Racket 让你设计自己的语言 |
| 42 | 写你自己的 lang——从内部 DSL 到一门独立语言 |

### Part 7: 走向生产：工程化与实战 (Production)

| Chapter | Title |
|---------|-------|
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

### Appendix (附录)

Noise runtime close-reading (evidence that Racket ships industrial-grade software), a complete guide to compiling Racket from source, and a dissection of Racket's language implementation.

| # | Title |
|---|-------|
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

## Tech Stack

- **Framework**: Next.js 14 (App Router, static export)
- **Styling**: Tailwind CSS
- **Content**: MDX
- **Code Highlighting**: rehype-highlight

## Quick Start

### 1. Clone

```bash
git clone https://github.com/turinglambdaai/racket-programming.git
cd racket-programming
```

### 2. Install & run

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`.

### 3. Build

```bash
npm run build
```

Generates a static site in the `dist/` directory.

## Project Structure

```
racket-programming/
├── app/            # Next.js App Router pages / layouts
│   └── book/[part]/chapter/[slug]/   # Dynamic chapter routes
├── components/     # React components
├── content/        # Book chapters as MDX (part-1 ... part-7, appendix)
├── public/images/  # Figures referenced by chapters
├── lib/            # Helpers (content index, etc.)
├── scripts/        # build-content.js generates lib/content-data.json
├── next.config.js
└── package.json
```

## Adding / Editing a Chapter

Chapters live under `content/<part-id>/`. The build step (`scripts/build-content.js`, runs automatically on `dev`/`build`) scans every part directory and regenerates `lib/content-data.json`.

1. Create or edit a `.mdx` file under `content/part-N/` (or `content/appendix/`)
2. The first line `# Title` becomes the chapter title
3. The first blockquote line `> Summary` becomes the chapter description
4. The filename's numeric prefix controls ordering within the part

## License

Licensed under the [MIT License](LICENSE).
