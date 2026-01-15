import quotesData from '@/data/quotes.json'
import { Quote } from './types'

const quotes = quotesData as Quote[]

/**
 * Get quote for a specific date
 */
export function getQuoteForDate(date: Date): Quote {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dateStr = `${month}-${day}`

  const quote = quotes.find((q) => q.date === dateStr)

  // Fallback to first quote if not found
  return quote || quotes[0]
}

/**
 * Get today's quote
 */
export function getTodaysQuote(): Quote {
  return getQuoteForDate(new Date())
}

/**
 * Get all quotes
 */
export function getAllQuotes(): Quote[] {
  return quotes
}
