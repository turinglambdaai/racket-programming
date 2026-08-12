'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { getParts } from '@/lib/content'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const parts = getParts()

export default function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    parts.forEach(p => { initial[p.id] = true })
    return initial
  })

  const togglePart = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside className="w-64 h-screen sticky top-0 overflow-y-auto border-r border-sand-200 bg-white">
      <div className="p-5 border-b border-sand-200">
        <Link href="/" className="text-sand-900 hover:text-accent-500 transition-colors">
          <span className="font-bold text-base tracking-tight">Racket 编程入门</span>
        </Link>
      </div>
      <nav className="p-3">
        {parts.map(part => (
          <div key={part.id} className="mb-1">
            <button
              onClick={() => togglePart(part.id)}
              className={cn(
                'w-full flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                pathname.startsWith(`/book/${part.id}`)
                  ? 'text-sand-900'
                  : 'text-sand-600 hover:text-sand-900 hover:bg-sand-50'
              )}
            >
              {expanded[part.id] ? (
                <ChevronDown className="w-3 h-3 shrink-0 text-sand-400" />
              ) : (
                <ChevronRight className="w-3 h-3 shrink-0 text-sand-400" />
              )}
              <span className="truncate">
                {part.number}. {part.title}
              </span>
            </button>
            {expanded[part.id] && part.chapters.length > 0 && (
              <div className="ml-5 mt-0.5 space-y-0.5 border-l border-sand-200 pl-3">
                {part.chapters.map(ch => (
                  <Link
                    key={ch.slug}
                    href={`/book/${part.id}/chapter/${ch.slug}`}
                    className={cn(
                      'block px-2.5 py-1.5 rounded-md text-sm transition-colors truncate',
                      pathname === `/book/${part.id}/chapter/${ch.slug}`
                        ? 'text-accent-500 font-medium bg-accent-50'
                        : 'text-sand-600 hover:text-sand-900 hover:bg-sand-50'
                    )}
                  >
                    {ch.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
