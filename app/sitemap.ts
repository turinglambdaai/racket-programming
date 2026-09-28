import type { MetadataRoute } from 'next'
import { getParts, getPreface } from '@/lib/content'

const BASE = 'https://racket.jrtx.site'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [{ url: BASE }]

  const preface = getPreface()
  if (preface) entries.push({ url: `${BASE}${preface.href}` })

  for (const part of getParts()) {
    entries.push({ url: `${BASE}/book/${part.id}` })
    for (const ch of part.chapters) {
      entries.push({ url: `${BASE}/book/${part.id}/chapter/${ch.slug}` })
    }
  }
  return entries
}
