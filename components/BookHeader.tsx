'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Sidebar from './Sidebar'

export default function BookHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-white/90 backdrop-blur-sm border-b border-sand-200 flex items-center px-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -ml-2 rounded-md hover:bg-sand-100 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-sand-700" /> : <Menu className="w-5 h-5 text-sand-700" />}
        </button>
        <Link href="/" className="ml-3 font-bold text-sm text-sand-900">
          Racket 编程入门
        </Link>
      </header>
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 pt-14">
          <div
            className="absolute inset-0 bg-sand-900/10"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-64 h-full bg-white border-r border-sand-200">
            <Sidebar />
          </div>
        </div>
      )}
    </>
  )
}
