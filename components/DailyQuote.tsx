'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Card } from './ui/Card'
import { Quote, Small } from './ui/Typography'
import { Button } from './ui/Button'
import { Quote as QuoteType } from '@/lib/types'
import { PhilosopherChat } from './PhilosopherChat'

interface DailyQuoteProps {
  quote: QuoteType
  userEntry?: string
}

export function DailyQuote({ quote, userEntry }: DailyQuoteProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <Card padding="lg" className="mb-xl">
        <div className="space-y-lg">
          <Quote className="text-text">{quote.text}</Quote>
          <div className="flex items-center justify-between pt-md border-t-3 border-border">
            <div className="flex flex-col gap-sm">
              <Small className="font-medium">
                — {quote.author}
                {quote.source && `, ${quote.source}`}
              </Small>
              <Small className="text-text-secondary uppercase tracking-wider">
                {quote.theme}
              </Small>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-sm"
            >
              <MessageCircle size={16} />
              Обсудить
            </Button>
          </div>
        </div>
      </Card>

      <PhilosopherChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        quote={quote}
        userEntry={userEntry}
      />
    </>
  )
}
