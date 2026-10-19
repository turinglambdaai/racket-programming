const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'content');

function fail(message) {
  console.error(`[content-check] ${message}`);
  process.exitCode = 1;
}

function chapterTitle(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

const main = [];
for (let part = 1; part <= 7; part += 1) {
  const dir = path.join(CONTENT, `part-${part}`);
  for (const name of fs.readdirSync(dir).filter(n => /\.mdx?$/.test(n))) {
    const slug = name.replace(/\.mdx?$/, '');
    main.push({
      part: `part-${part}`,
      slug,
      number: Number(slug),
      title: chapterTitle(path.join(dir, name)),
    });
  }
}
main.sort((a, b) => a.number - b.number);

const appendixDir = path.join(CONTENT, 'appendix');
const appendix = fs.readdirSync(appendixDir)
  .filter(n => /\.mdx?$/.test(n))
  .map(name => {
    const slug = name.replace(/\.mdx?$/, '');
    return {
      part: 'appendix',
      slug,
      number: Number(slug),
      title: chapterTitle(path.join(appendixDir, name)),
    };
  })
  .sort((a, b) => a.number - b.number);

if (main.length !== 60) fail(`expected 60 main chapters, found ${main.length}`);
if (appendix.length !== 3) fail(`expected 3 appendix articles, found ${appendix.length}`);

for (let i = 1; i <= 60; i += 1) {
  if (!main.some(ch => ch.number === i)) fail(`missing main chapter ${i}`);
}
for (let i = 1; i <= 3; i += 1) {
  if (!appendix.some(ch => ch.number === i)) fail(`missing appendix article ${i}`);
}
for (const ch of [...main, ...appendix]) {
  if (!ch.title) fail(`missing H1 title in ${ch.part}/${ch.slug}`);
}

function parseReadmeChapterRows(filename) {
  const text = fs.readFileSync(path.join(ROOT, filename), 'utf8');
  const rows = new Map();
  for (const match of text.matchAll(/^\|\s*(\d+)\s*\|\s*(.*?)\s*\|\s*$/gm)) {
    const n = Number(match[1]);
    if (n >= 1 && n <= 60) rows.set(n, match[2].trim());
  }
  return { text, rows };
}

for (const filename of ['README.md', 'README.zh-CN.md']) {
  const { text, rows } = parseReadmeChapterRows(filename);
  if (!text.includes('60 chapters') && filename === 'README.md') {
    fail(`${filename}: missing 60 chapter summary`);
  }
  if (!text.includes('appendix (3 articles)') && filename === 'README.md') {
    fail(`${filename}: appendix count is not 3`);
  }

  for (const ch of main) {
    const got = rows.get(ch.number);
    if (got !== ch.title) {
      fail(`${filename}: chapter ${ch.number} title mismatch: README=${JSON.stringify(got)} content=${JSON.stringify(ch.title)}`);
    }
  }
}

const validRoutes = new Set([
  ...main.map(ch => `/book/${ch.part}/chapter/${ch.slug}`),
  ...appendix.map(ch => `/book/appendix/chapter/${ch.slug}`),
]);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (/\.(md|mdx)$/.test(entry.name)) out.push(p);
  }
  return out;
}

for (const file of walk(CONTENT)) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/\/book\/(part-\d+|appendix)\/chapter\/([^\s)"'#?]+)\/?/g)) {
    const route = `/book/${m[1]}/chapter/${m[2].replace(/\/$/, '')}`;
    if (!validRoutes.has(route)) {
      fail(`${path.relative(ROOT, file)}: broken internal chapter link ${route}`);
    }
  }
}

if (!process.exitCode) {
  console.log(`[content-check] OK: ${main.length} chapters + ${appendix.length} appendix articles; README titles and internal chapter links are consistent.`);
}
