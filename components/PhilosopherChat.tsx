'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { Modal } from './ui/Modal'
import { Button } from './ui/Button'
import { Quote } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface PhilosopherChatProps {
  isOpen: boolean
  onClose: () => void
  quote: Quote
  userEntry?: string
}

export function PhilosopherChat({ isOpen, onClose, quote, userEntry }: PhilosopherChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Приветственное сообщение при открытии
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = userEntry
        ? `Приветствую! Я вижу, ты размышлял над цитатой ${quote.author}. Что тебя беспокоит в этих мыслях?`
        : `Приветствую! Хочешь обсудить слова ${quote.author}: "${quote.text}"?`

      setMessages([{ role: 'assistant', content: greeting }])
    }
  }, [isOpen, quote, userEntry])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')

    // Добавляем сообщение пользователя
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          quote,
          entry: userEntry,
        }),
      })

      if (!response.ok) {
        throw new Error('Ошибка при получении ответа')
      }

      const data = await response.json()
      setMessages([...newMessages, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Прости, произошла ошибка. Попробуй еще раз.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setMessages([])
    setInput('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Беседа с философом">
      <div className="flex flex-col h-[60vh]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-md mb-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'p-md border-3 border-border',
                message.role === 'user' ? 'bg-bg ml-lg' : 'bg-surface mr-lg shadow-brutal-sm'
              )}
            >
              <p className="text-sm font-medium mb-sm">
                {message.role === 'user' ? 'Ты' : quote.author}
              </p>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="p-md border-3 border-border bg-surface mr-lg shadow-brutal-sm flex items-center gap-md">
              <Loader2 className="animate-spin" size={20} />
              <p className="text-text-secondary">Философ размышляет...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-md">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Задай вопрос философу..."
            className="flex-1 px-md py-md border-3 border-border bg-surface focus:border-accent outline-none transition-colors"
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!input.trim() || isLoading}
            className="flex items-center gap-sm"
          >
            <Send size={18} />
            Отправить
          </Button>
        </form>
      </div>
    </Modal>
  )
}
