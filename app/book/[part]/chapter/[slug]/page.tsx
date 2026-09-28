import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getParts, getAllChapterPaths } from '@/lib/content'
import { getChapterContent } from '@/lib/content-server'
import { mdxComponents } from '@/app/mdx-components'
import ChapterNav from '@/components/ChapterNav'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import type { PluggableList } from 'unified'
// highlight.js ships no racket grammar; scheme shares the s-expression shape.
import scheme from 'highlight.js/lib/languages/scheme'

const mdxPlugins: PluggableList = [rehypeSlug, [rehypeHighlight, { languages: { racket: scheme } }]]

export function generateStaticParams() {
  return getAllChapterPaths().map(p => ({ part: p.part, slug: p.slug }))
}

export function generateMetadata({ params }: { params: { part: string; slug: string } }) {
  const part = getParts().find(p => p.id === params.part)
  const chapter = part?.chapters.find(c => c.slug === params.slug)
  if (!part || !chapter) return { title: '章节未找到' }
  return { title: `${chapter.title} | 第 ${part.number} 部分 · ${part.title}` }
}

export default async function ChapterPage({ params }: { params: { part: string; slug: string } }) {
  const part = getParts().find(p => p.id === params.part)
  const chapter = part?.chapters.find(c => c.slug === params.slug)

  if (!part || !chapter) notFound()

  const content = getChapterContent(params.part, params.slug)
  if (!content) notFound()

  return (
    <article>
      <div className="mb-8 pb-4 border-b border-sand-200">
        <p className="text-xs tracking-widest uppercase text-sand-500">
          第 {part.number} 部分 · {part.title}
        </p>
      </div>
      <div className="prose max-w-none">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: mdxPlugins,
            },
          }}
        />
      </div>
      <ChapterNav currentPart={params.part} currentSlug={params.slug} />
    </article>
  )
}
