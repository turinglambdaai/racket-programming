# Racket 代码与内容验证报告

> 当前状态：本书正文 60 章，附录 3 篇。验证基线使用 Racket 9.3，并由仓库内的 CI 在 Pull Request 和 `master` push 时执行。

## 1. 历史验证

2026-08-13 曾对当时版本进行三轮一次性代码块检查：

1. 提取全书 `racket` fenced blocks，做 reader/括号级检查。
2. 对可独立运行的纯计算片段执行验证。
3. 区分依赖前文、GUI、Web、FFI 和第三方包等需要环境的示例。

当时仓库仍包含后来移除的 Noise 系列附录，因此历史统计（60 章 + 11 篇附录、457/437 个代码块等）只描述那个快照，**不再代表当前书稿**。

## 2. 当前可重复验证

从 2026-10-19 起，验证逻辑不再只存在于临时脚本，而是进入仓库：

- `scripts/check-content.js`
  - 检查正文恰好 60 章、附录恰好 3 篇；
  - 检查章号连续；
  - 检查每篇存在一级标题；
  - 检查 README / README.zh-CN 的正文标题与 MDX 一致；
  - 检查内部章节链接可以解析到真实章节。
- `scripts/check-racket-syntax.rkt`
  - 提取全部 ```racket` 代码块；
  - 使用 Racket 自己的 reader 检查语法；
  - 对“本章正在定义的自制 #lang、CI 中尚未安装其 reader”这一类块显式标记为 skip，而不是误报成功。
- `tests/web-smoke.rkt`
  - 验证 `response/xexpr`、状态码、URL path 和 query 参数等第 53–57 章关键 Web API 用法。
- TypeScript `tsc --noEmit`。
- Next.js 静态站点生产构建。

对应 workflow：`.github/workflows/verify.yml`。

本地可运行：

```bash
npm ci
npm run check:content
npm run check:racket
racket tests/web-smoke.rkt
npm run typecheck
npm run build
```

## 3. 2026-10-19 事实核查修正

本轮审查另外修正了以下容易产生误导的内容：

- Web servlet 不能把任意字符串/xexpr 直接当默认 response；示例改为显式 response 构造器。
- `url-path` 的元素是 `path/param`，路由示例显式取 `path/param-path`。
- `raco exe` 与 `raco distribute` 的职责边界。
- Package Catalog 的技术最低要求与“推荐的正式包工程基线”不再混为一谈。
- Racket module 不再称为 ordinary first-class value。
- Racket BC / CS 不再扩写成 “Before Chez / Chez Scheme”。
- FFI 中 `(malloc 'raw ...)` 必须使用 `free` 释放；GC 管理的其他 allocation mode 不能手动 `free`。
- Racket FFI 的 `_int` 不再被误写成“会随 32/64 位平台改变大小”。
- Racket CS 嵌入章节按当前 C API 改为 `libracketcs.a`、`chezscheme.h` + `racketcs.h`、`raco ctool --c-mods` 和当前 GC 引用规则。
- Nginx 章节不再无基准地断言 Racket Web Server “不擅长大量并发”。
- Koyo 章节按当前命令行工具调整部署表述。

## 4. 环境相关示例的边界

有些例子天然不适合作为“每个 PR 都完整执行”的单元测试：

- GUI 章节：视觉结果依赖窗口系统、字体、主题与平台。
- FFI：绑定真实第三方 C 库时，需要目标 ABI、动态库与工具链。
- 第三方包：API 会随包版本更新。

这类内容的原则是：

1. 能在无外部服务条件下做 smoke test 的，加入 CI。
2. 需要真实平台/第三方环境的，正文必须避免未经验证的绝对化断言，并以当前官方文档/上游接口为准。
3. 不用伪造“运行截图”证明正确性；截图只是展示素材，不作为技术正确性的验收条件。

## 5. 站点依赖安全基线

站点构建栈在本轮同步升级到 Next.js 16、React 19.2.9、Tailwind CSS 4 和 PostCSS 8.5.30；CI 使用 `npm audit --audit-level=low` 作为合并门禁。间接依赖 `baseline-browser-mapping` 固定到已修复的 2.11.29，避免重新解析到存在 DoS 公告的 2.10.x。

## 6. 结论

当前仓库已经从“一次性人工验证”升级为“持续验证”：章节结构、书目一致性、内部链接、Racket reader 语法、关键 Web API、TypeScript 与静态构建都会在后续改动中自动回归。

这并不意味着一本持续维护的技术书可以宣称“永远零事实错误”，但它把最容易重复出现的回归变成了机器可检查的门禁，并明确了必须依赖真实平台或第三方环境的边界。
