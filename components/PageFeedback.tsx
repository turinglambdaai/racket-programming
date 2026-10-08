'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Flag, ThumbsUp } from 'lucide-react'

const REPO = 'turinglambdaai/racket-programming'

interface PageFeedbackProps {
  /** Site path of the current page, e.g. /book/part-2/chapter/8 */
  pagePath: string
  /** Page title as shown in the book, used in the prefilled issue title */
  pageTitle: string
  /** Repo-relative source file, e.g. content/part-2/8.mdx */
  sourcePath: string
  /** Label for the edit link, e.g. 编辑本章 / 编辑前言 */
  editLabel: string
}

interface SelectionPill {
  top: number
  left: number
  quote: string
}

function buildIssueUrl(pagePath: string, pageTitle: string, quote?: string) {
  const params = new URLSearchParams()
  params.set('template', 'page-feedback.yml')
  params.set('title', `【反馈】${pageTitle}`)
  params.set('page-url', `https://racket.jrtx.site${pagePath}`)
  if (quote) params.set('quote', `> ${quote}`)
  return `https://github.com/${REPO}/issues/new?${params.toString()}`
}

export default function PageFeedback({ pagePath, pageTitle, sourcePath, editLabel }: PageFeedbackProps) {
  const storageKey = `racket-book:helpful:${pagePath}`
  const [helpful, setHelpful] = useState(false)
  const [pill, setPill] = useState<SelectionPill | null>(null)
  const pillRef = useRef<SelectionPill | null>(null)
  pillRef.current = pill

  useEffect(() => {
    try {
      setHelpful(window.localStorage.getItem(storageKey) === '1')
    } catch {
      /* private mode etc. — feedback box still works, just not remembered */
    }
  }, [storageKey])

  // Floating "反馈这段" pill: appears while the reader has text selected inside the article.
  useEffect(() => {
    let raf = 0

    const update = () => {
      const article = document.querySelector('article')
      const sel = window.getSelection()
      if (!article || !sel || sel.isCollapsed || sel.rangeCount === 0) {
        setPill(null)
        return
      }
      const text = sel.toString().replace(/\s+/g, ' ').trim()
      const node = sel.anchorNode
      if (text.length < 2 || text.length > 500 || !node || !article.contains(node)) {
        setPill(null)
        return
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect()
      if (
        !rect ||
        (rect.width === 0 && rect.height === 0) ||
        // Selection scrolled out of the viewport — nothing to anchor the pill to.
        rect.bottom < 0 ||
        rect.top > window.innerHeight
      ) {
        setPill(null)
        return
      }
      setPill({ top: Math.max(8, rect.top - 44), left: rect.left + rect.width / 2, quote: text })
    }

    // rAF-throttled so dragging a selection doesn't thrash layout.
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    // Keep the pill glued to the selection while scrolling or resizing.
    const reposition = () => {
      if (!pillRef.current) return
      schedule()
    }

    document.addEventListener('selectionchange', schedule)
    window.addEventListener('scroll', reposition, { passive: true })
    window.addEventListener('resize', reposition)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('selectionchange', schedule)
      window.removeEventListener('scroll', reposition)
      window.removeEventListener('resize', reposition)
    }
  }, [])

  const markHelpful = useCallback(() => {
    setHelpful(true)
    try {
      window.localStorage.setItem(storageKey, '1')
    } catch {
      /* ignore */
    }
  }, [storageKey])

  const reportSelection = useCallback(() => {
    const quote = pillRef.current?.quote
    if (!quote) return
    window.open(buildIssueUrl(pagePath, pageTitle, quote), '_blank', 'noopener,noreferrer')
    window.getSelection()?.removeAllRanges()
    setPill(null)
  }, [pagePath, pageTitle])

  const editUrl = `https://github.com/${REPO}/edit/master/${sourcePath}`
  const issuesUrl = `https://github.com/${REPO}/issues?q=${encodeURIComponent('is:issue label:book-feedback')}`

  return (
    <>
      <div className="mt-16 rounded-lg border border-sand-200 bg-sand-50 px-6 py-5">
        {helpful ? (
          <div>
            <p className="text-sm font-medium text-sand-900">谢谢！已记下你的反馈。</p>
            <p className="mt-1 text-sm text-sand-600">
              如果这本书对你有帮助，欢迎到{' '}
              <a
                href={`https://github.com/${REPO}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-500 hover:underline"
              >
                GitHub 点个 Star
              </a>
              ，让更多读者看到它。
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium text-sand-900">这一页读下来还顺利吗？</p>
            <p className="mt-1 text-sm text-sand-600">
              发现错误、没讲清楚、代码跑不起来——都欢迎告诉我们，这本书会持续修订。
            </p>
          </div>
        )}
        {!helpful && (
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={markHelpful}
              className="inline-flex items-center gap-1.5 rounded-md border border-sand-300 bg-white px-3.5 py-1.5 text-sm text-sand-700 hover:border-sand-400 hover:text-sand-900 transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              有帮助
            </button>
            <a
              href={buildIssueUrl(pagePath, pageTitle)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-sand-900 px-3.5 py-1.5 text-sm text-sand-50 hover:bg-sand-800 transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              反馈问题或建议
            </a>
          </div>
        )}
        <div className="mt-4 pt-3 border-t border-sand-200 flex flex-wrap gap-x-4 gap-y-1 text-xs text-sand-500">
          <a href={editUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sand-800 transition-colors">
            在 GitHub 上{editLabel}
          </a>
          <a href={issuesUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sand-800 transition-colors">
            查看读者的反馈
          </a>
        </div>
      </div>
      {pill && (
        <button
          onMouseDown={e => e.preventDefault()}
          onClick={reportSelection}
          style={{ top: pill.top, left: pill.left }}
          className="fixed z-50 -translate-x-1/2 rounded-md bg-sand-900 px-3 py-1.5 text-xs text-sand-50 shadow-lg hover:bg-sand-800 transition-colors"
        >
          反馈这段
        </button>
      )}
    </>
  )
}
