'use client'

import { useState, useEffect } from 'react'
import { Card } from './ui/Card'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { H3, Small } from './ui/Typography'
import { saveEntry, getEntryByDate } from '@/lib/storage'
import { Entry } from '@/lib/types'

interface JournalEntryProps {
  date: string // ISO date
  quoteId: number
  onSave?: (entry: Entry) => void
}

export function JournalEntry({ date, quoteId, onSave }: JournalEntryProps) {
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Load existing entry on mount
  useEffect(() => {
    const existingEntry = getEntryByDate(date)
    if (existingEntry) {
      setContent(existingEntry.content)
      setLastSaved(new Date(existingEntry.updatedAt))
    }
  }, [date])

  const handleSave = () => {
    if (!content.trim()) return

    setIsSaving(true)

    // Simulate async save
    setTimeout(() => {
      const entry = saveEntry({
        date,
        quoteId,
        content: content.trim(),
      })

      setLastSaved(new Date())
      setIsSaving(false)

      if (onSave) {
        onSave(entry)
      }
    }, 300)
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Card>
      <div className="space-y-lg">
        <div className="flex items-center justify-between">
          <H3>Твои размышления</H3>
          <Small className="text-text-secondary">{formatDate(date)}</Small>
        </div>

        <Input
          value={content}
          onChange={setContent}
          placeholder="Как эта цитата откликается в тебе сегодня? О чем заставляет задуматься?"
          multiline
          rows={8}
        />

        <div className="flex items-center justify-between">
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!content.trim() || isSaving}
          >
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </Button>

          {lastSaved && (
            <Small className="text-text-secondary">
              Сохранено {lastSaved.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
            </Small>
          )}
        </div>
      </div>
    </Card>
  )
}
