import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/app/mdx-components'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

export const metadata = {
  title: '写在前面 | Racket 编程入门',
}

const prefacePath = path.join(process.cwd(), 'content', 'preface.mdx')

export default function PrefacePage() {
  const content = fs.readFileSync(prefacePath, 'utf-8')

  return (
    <article>
      <div className="mb-8 pb-4 border-b border-sand-200">
        <p className="text-xs tracking-widest uppercase text-sand-500">
          正文之前 · Preface
        </p>
      </div>
      <div className="prose max-w-none">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeHighlight],
            },
          }}
        />
      </div>
      <div className="mt-12 pt-8 border-t border-sand-200">
        <Link
          href="/book/part-1/chapter/1"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sand-900 text-sand-50 rounded-lg text-sm font-medium hover:bg-sand-800 transition-colors"
        >
          从第 1 章开始
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  )
}
