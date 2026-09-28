import Link from 'next/link'

export const metadata = {
  title: '页面不存在 | Racket 编程入门',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs tracking-widest uppercase text-sand-500 mb-4">404</p>
      <h1 className="text-3xl font-bold text-sand-900 tracking-tight mb-4">
        这一页不存在
      </h1>
      <p className="text-sand-600 mb-10 max-w-sm leading-relaxed">
        你找的章节可能换了地址，也可能还没写出来。
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2.5 bg-sand-900 text-sand-50 rounded-lg text-sm font-medium hover:bg-sand-800 transition-colors"
        >
          回到首页
        </Link>
        <Link
          href="/book/part-1/chapter/1"
          className="inline-flex items-center px-5 py-2.5 border border-sand-300 text-sand-700 rounded-lg text-sm font-medium hover:bg-sand-100 transition-colors"
        >
          从第 1 章开始
        </Link>
      </div>
    </div>
  )
}
