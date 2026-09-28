import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://racket.jrtx.site'),
  title: 'Racket 编程入门',
  description: '从零基础到独立开发应用，全面掌握 Racket 编程。',
  openGraph: {
    type: 'website',
    siteName: 'Racket 编程入门',
    title: 'Racket 编程入门',
    description: '从零基础到独立开发应用，全面掌握 Racket 编程。',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Racket 编程入门' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Racket 编程入门',
    description: '从零基础到独立开发应用，全面掌握 Racket 编程。',
    images: ['/og.jpg'],
  },
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
