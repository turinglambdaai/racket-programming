import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getParts } from '@/lib/content'

export default function HomePage() {
  const parts = getParts()

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <header className="max-w-3xl mx-auto px-6 pt-32 pb-20 text-center">
        <p className="text-sm tracking-widest uppercase text-sand-500 mb-6">
          An Online Book
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-sand-900 mb-6 tracking-tight">
          Racket 编程
        </h1>
        <p className="text-lg text-sand-600 max-w-xl mx-auto mb-2 leading-relaxed">
          从核心语言到应用开发，全面掌握 Racket 编程。
        </p>
        <p className="text-base text-sand-500 mb-10">
          吉人 著
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/book/part-1"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-sand-900 text-sand-50 rounded-lg text-sm font-medium hover:bg-sand-800 transition-colors"
          >
            开始阅读
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://racket-lang.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-sand-300 text-sand-700 rounded-lg text-sm font-medium hover:bg-sand-100 transition-colors"
          >
            Racket 官网
          </a>
        </div>
      </header>

      {/* Parts */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="border-t border-sand-200 pt-12">
          <div className="divide-y divide-sand-200">
            {parts.map((part) => (
              <Link
                key={part.id}
                href={`/book/${part.id}`}
                className="group flex items-start justify-between py-6 hover:bg-sand-100/50 -mx-4 px-4 rounded-lg transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-sand-500 tracking-wider uppercase mb-1">
                    第 {part.number} 部分 · {part.subtitle}
                  </p>
                  <h3 className="text-xl font-semibold text-sand-900 mb-2">
                    {part.title}
                  </h3>
                  <p className="text-sm text-sand-600 leading-relaxed">
                    {part.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-sand-400 mt-1 ml-4 shrink-0 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sand-200 py-8">
        <p className="text-center text-xs text-sand-500">
          Racket 编程 · 吉人 · 使用 Next.js 构建
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/wechat-qr.jpg" alt="公众号" width={56} height={56} className="rounded-lg border border-sand-200" />
          <span className="text-xs text-sand-500">扫码关注公众号</span>
        </div>
      </footer>
    </div>
  )
}
