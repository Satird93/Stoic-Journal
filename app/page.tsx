'use client'

import { useState, useEffect } from 'react'
import { DailyQuote } from '@/components/DailyQuote'
import { JournalEntry } from '@/components/JournalEntry'
import { Button } from '@/components/ui/Button'
import { H1 } from '@/components/ui/Typography'
import { getQuoteForDate } from '@/lib/quotes'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [quote, setQuote] = useState(() => getQuoteForDate(currentDate))
  const [userEntry, setUserEntry] = useState('')

  useEffect(() => {
    setQuote(getQuoteForDate(currentDate))

    // Загружаем запись пользователя из localStorage
    const dateKey = getISODate(currentDate)
    const entry = localStorage.getItem(`journal_${dateKey}`)
    setUserEntry(entry ? JSON.parse(entry).content : '')
  }, [currentDate])

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const goToNextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const isToday = currentDate.toDateString() === new Date().toDateString()
  const isFuture = currentDate > new Date()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getISODate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <H1>{isToday ? 'Сегодня' : formatDate(currentDate)}</H1>
        {!isToday && (
          <Button variant="secondary" size="sm" onClick={goToToday}>
            Вернуться к сегодня
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between border-t-3 border-b-3 border-border py-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPreviousDay}
          className="flex items-center gap-sm"
        >
          <ChevronLeft size={20} />
          Предыдущий день
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={goToNextDay}
          disabled={isFuture}
          className="flex items-center gap-sm"
        >
          Следующий день
          <ChevronRight size={20} />
        </Button>
      </div>

      <DailyQuote quote={quote} userEntry={userEntry} />

      <JournalEntry
        date={getISODate(currentDate)}
        quoteId={quote.id}
        onSave={(entry) => setUserEntry(entry.content)}
      />
    </div>
  )
}
