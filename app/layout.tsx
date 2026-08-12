import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Racket 编程入门',
  description: '从零基础到独立开发应用，全面掌握 Racket 编程。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">{children}</body>
    </html>
  )
}
