export interface Quote {
  id: number
  date: string // "MM-DD"
  text: string
  author: string
  source?: string
  theme: string
}

export interface Entry {
  id: string
  date: string // ISO date "YYYY-MM-DD"
  quoteId: number
  content: string
  createdAt: number
  updatedAt: number
}
