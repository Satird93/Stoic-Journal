'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { H2 } from './ui/Typography'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b-3 border-border bg-surface">
      <div className="container mx-auto px-lg py-lg max-w-4xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <H2>Stoic Journal</H2>
          </Link>
          <nav className="flex gap-lg">
            <Link
              href="/"
              className={cn(
                'text-base font-medium transition-colors',
                pathname === '/' ? 'text-text border-b-3 border-accent pb-1' : 'text-text-secondary hover:text-text'
              )}
            >
              Today
            </Link>
            <Link
              href="/archive"
              className={cn(
                'text-base font-medium transition-colors',
                pathname === '/archive' ? 'text-text border-b-3 border-accent pb-1' : 'text-text-secondary hover:text-text'
              )}
            >
              Archive
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
