import { Entry } from './types'

const STORAGE_KEY = 'stoic-journal-entries'

/**
 * Get all entries from localStorage
 */
export function getEntries(): Entry[] {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Failed to load entries:', error)
    return []
  }
}

/**
 * Get entry for a specific date
 */
export function getEntryByDate(date: string): Entry | null {
  const entries = getEntries()
  return entries.find((e) => e.date === date) || null
}

/**
 * Save or update an entry
 */
export function saveEntry(entry: Partial<Entry> & { date: string; content: string; quoteId: number }): Entry {
  const entries = getEntries()
  const existingIndex = entries.findIndex((e) => e.date === entry.date)

  const now = Date.now()

  if (existingIndex >= 0) {
    // Update existing entry
    const updatedEntry: Entry = {
      ...entries[existingIndex],
      ...entry,
      updatedAt: now,
    }
    entries[existingIndex] = updatedEntry

    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    return updatedEntry
  } else {
    // Create new entry
    const newEntry: Entry = {
      id: crypto.randomUUID(),
      date: entry.date,
      quoteId: entry.quoteId,
      content: entry.content,
      createdAt: now,
      updatedAt: now,
    }
    entries.push(newEntry)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    return newEntry
  }
}

/**
 * Delete an entry
 */
export function deleteEntry(date: string): void {
  const entries = getEntries()
  const filtered = entries.filter((e) => e.date !== date)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

/**
 * Get all entries sorted by date (newest first)
 */
export function getEntriesSorted(): Entry[] {
  const entries = getEntries()
  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
