const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content');
const outputFile = path.join(process.cwd(), 'lib', 'content-data.json');

// Seven volumes + appendix. Single source of truth for part metadata.
const PARTS_META = [
  { id: 'part-1', number: 1, title: '起点：编程与计算的本质', subtitle: 'Foundations',
    description: '回答"编程是什么、计算是什么、Racket 值不值得学"。全书的地基——零基础读者从这里建立直觉，有经验读者从这里对齐认知。' },
  { id: 'part-2', number: 2, title: '基础：用 Racket 写点什么', subtitle: 'Basics',
    description: '回答"用 Racket 写点什么，最少要知道什么"。从括号的含义到数据、列表、结构体、函数，建立 Racket 代码的基本形状。' },
  { id: 'part-3', number: 3, title: '函数式：不动状态的计算', subtitle: 'Functional',
    description: '回答"不动用状态，怎么完成计算"。从高阶函数、递归到 λ 演算、Y-Combinator、迷你解释器——Racket 的核心范式。' },
  { id: 'part-4', number: 4, title: '命令式与状态', subtitle: 'State',
    description: '回答"状态随时间怎么改变"。异常、资源管理（Custodian）、状态机实战，最后用枢纽章把命令式、GUI、Web 串成一条线。' },
  { id: 'part-5', number: 5, title: '对象与界面', subtitle: 'Objects & GUI',
    description: '回答"对象怎么组织、界面怎么搭"。从 class 系统到第一个 GUI、控件、自定义绘制、声明式 GUI、后台任务。' },
  { id: 'part-6', number: 6, title: '语言设计与计算模型', subtitle: 'Language Design',
    description: '回答"语言本身是怎么造出来的"。宏、延续、generator、模块机制、惰性求值、DSL，最后亲手造一门 #lang 语言。' },
  { id: 'part-7', number: 7, title: '走向生产：工程化与实战', subtitle: 'Production',
    description: '回答"读完这本书，我能用 Racket 做什么"。工具链、打包分发、数据库、Web 实战、工业级案例，对标 Core Python Applications Programming。' },
  { id: 'appendix', number: 8, title: '附录', subtitle: 'Appendix',
    description: 'Noise 嵌入式运行时精读（Racket 能打工业级的核心证据链）、Racket 编译完全指南、Racket 语言实现剖析。' },
];

// Chapter slug is a plain numeric string (global chapter number for the book,
// or 1..N within appendix). Sort numerically.
function chapterOrder(slug) {
  return parseInt(slug, 10) || 0;
}

function getChapters(partId) {
  const partDir = path.join(contentDir, partId);
  if (!fs.existsSync(partDir)) return [];
  return fs.readdirSync(partDir)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => {
      const slug = f.replace(/\.(mdx|md)$/, '');
      const content = fs.readFileSync(path.join(partDir, f), 'utf-8');
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const descMatch = content.match(/^>\s+(.+)$/m);
      return {
        slug,
        title: titleMatch ? titleMatch[1].trim() : slug,
        description: descMatch ? descMatch[1].trim() : '',
      };
    })
    .sort((a, b) => chapterOrder(a.slug) - chapterOrder(b.slug));
}

function getAllChapterPaths() {
  const paths = [];
  for (const part of PARTS_META) {
    const partDir = path.join(contentDir, part.id);
    if (!fs.existsSync(partDir)) continue;
    for (const f of fs.readdirSync(partDir)) {
      if (f.endsWith('.mdx') || f.endsWith('.md')) {
        paths.push({ part: part.id, slug: f.replace(/\.(mdx|md)$/, '') });
      }
    }
  }
  return paths;
}

const partsData = PARTS_META.map(p => ({ ...p, chapters: getChapters(p.id) }));
const data = { parts: partsData, paths: getAllChapterPaths() };

fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
console.log(`Content data generated: ${outputFile} (${partsData.length} parts, ${data.paths.length} chapters)`);
