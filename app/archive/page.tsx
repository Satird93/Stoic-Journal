'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { H1, Body, Small } from '@/components/ui/Typography'
import { Card } from '@/components/ui/Card'
import { getEntriesSorted } from '@/lib/storage'
import { getQuoteForDate } from '@/lib/quotes'
import { Entry } from '@/lib/types'
import { Calendar } from 'lucide-react'

export default function ArchivePage() {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    setEntries(getEntriesSorted())
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (entries.length === 0) {
    return (
      <div className="space-y-xl">
        <H1>Архив записей</H1>
        <Card padding="lg">
          <div className="text-center space-y-md py-xl">
            <Calendar size={48} className="mx-auto text-text-secondary" />
            <Body className="text-text-secondary">
              У тебя пока нет записей. Начни вести дневник сегодня!
            </Body>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <H1>Архив записей</H1>
        <Small className="text-text-secondary">
          {entries.length} {entries.length === 1 ? 'запись' : 'записей'}
        </Small>
      </div>

      <div className="space-y-lg">
        {entries.map((entry) => {
          const quote = getQuoteForDate(new Date(entry.date))
          return (
            <Card key={entry.id} hover padding="lg">
              <div className="space-y-md">
                <div className="flex items-center justify-between">
                  <Small className="font-medium">{formatDate(entry.date)}</Small>
                  <Small className="text-text-secondary uppercase tracking-wider">
                    {quote.theme}
                  </Small>
                </div>

                <blockquote className="text-base italic text-text-secondary border-l-3 border-accent pl-md">
                  {quote.text}
                </blockquote>

                <Body className="line-clamp-3 text-text-secondary">
                  {entry.content}
                </Body>

                <div className="pt-md border-t border-border">
                  <Small className="text-text-secondary">
                    — {quote.author}
                  </Small>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
