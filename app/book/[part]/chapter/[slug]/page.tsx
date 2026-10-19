import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getParts, getAllChapterPaths } from '@/lib/content'
import { getChapterContent } from '@/lib/content-server'
import { mdxComponents } from '@/app/mdx-components'
import ChapterNav from '@/components/ChapterNav'
import PageFeedback from '@/components/PageFeedback'
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

export async function generateMetadata({ params }: { params: Promise<{ part: string; slug: string }> }) {
  const { part: partId, slug } = await params
  const part = getParts().find(p => p.id === partId)
  const chapter = part?.chapters.find(c => c.slug === slug)
  if (!part || !chapter) return { title: '章节未找到' }
  const partLabel = part.id === 'appendix' ? part.title : `第 ${part.number} 部分 · ${part.title}`
  return { title: `${chapter.title} | ${partLabel}` }
}

export default async function ChapterPage({ params }: { params: Promise<{ part: string; slug: string }> }) {
  const { part: partId, slug } = await params
  const part = getParts().find(p => p.id === partId)
  const chapter = part?.chapters.find(c => c.slug === slug)

  if (!part || !chapter) notFound()

  const content = getChapterContent(partId, slug)
  if (!content) notFound()

  return (
    <article>
      <div className="mb-8 pb-4 border-b border-sand-200">
        <p className="text-xs tracking-widest uppercase text-sand-500">
          {part.id === 'appendix' ? part.title : `第 ${part.number} 部分 · ${part.title}`}
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
      <PageFeedback
        pagePath={`/book/${partId}/chapter/${slug}`}
        pageTitle={chapter.title}
        sourcePath={`content/${partId}/${slug}.mdx`}
        editLabel="编辑本章"
      />
      <ChapterNav currentPart={partId} currentSlug={slug} />
    </article>
  )
}
