import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getParts } from '@/lib/content'

export function generateStaticParams() {
  return getParts().map(p => ({ part: p.id }))
}

export function generateMetadata({ params }: { params: { part: string } }) {
  const part = getParts().find(p => p.id === params.part)
  return { title: part ? `${part.title} | Racket 编程入门` : '未找到' }
}

export default function PartPage({ params }: { params: { part: string } }) {
  const part = getParts().find(p => p.id === params.part)
  if (!part) notFound()

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-sand-500 mb-2">
          第 {part.number} 部分 · {part.subtitle}
        </p>
        <h1 className="text-3xl font-bold text-sand-900 tracking-tight">{part.title}</h1>
        <p className="mt-3 text-sand-600 leading-relaxed">{part.description}</p>
      </div>

      <div className="border-t border-sand-200 pt-6">
        {part.chapters.length === 0 ? (
          <p className="text-sand-500 italic text-sm py-4">章节内容正在编写中...</p>
        ) : (
          <div className="divide-y divide-sand-100">
            {part.chapters.map((ch, i) => (
              <Link
                key={ch.slug}
                href={`/book/${part.id}/chapter/${ch.slug}`}
                className="group flex items-center justify-between py-4 hover:bg-sand-50 -mx-3 px-3 rounded-md transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="text-xs text-sand-400 font-mono mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sand-900 group-hover:text-accent-500 transition-colors">
                      {ch.title}
                    </h3>
                    {ch.description && (
                      <p className="text-sm text-sand-500 mt-0.5 line-clamp-2">{ch.description}</p>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-sand-300 group-hover:text-accent-400 shrink-0 ml-2 transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
