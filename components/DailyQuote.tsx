import { Card } from './ui/Card'
import { Quote, Small } from './ui/Typography'
import { Quote as QuoteType } from '@/lib/types'

interface DailyQuoteProps {
  quote: QuoteType
}

export function DailyQuote({ quote }: DailyQuoteProps) {
  return (
    <Card padding="lg" className="mb-xl">
      <div className="space-y-lg">
        <Quote className="text-text">{quote.text}</Quote>
        <div className="flex items-center justify-between pt-md border-t-3 border-border">
          <Small className="font-medium">
            — {quote.author}
            {quote.source && `, ${quote.source}`}
          </Small>
          <Small className="text-text-secondary uppercase tracking-wider">
            {quote.theme}
          </Small>
        </div>
      </div>
    </Card>
  )
}
