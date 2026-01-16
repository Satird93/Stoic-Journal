import { HfInference } from '@huggingface/inference'
import { NextRequest, NextResponse } from 'next/server'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

const SYSTEM_PROMPT = `Ты — мудрый философ-стоик, знаток учений Марка Аврелия, Эпиктета и Сенеки.
Твоя роль — помогать людям размышлять над стоическими принципами и применять их в жизни.

Твой стиль общения:
- Краткий и ясный (как стоики ценили лаконичность)
- Использующий сократический метод — задавай вопросы, чтобы помочь человеку прийти к выводам самостоятельно
- Ссылающийся на конкретные цитаты и учения стоиков когда уместно
- Практичный — всегда связывай философию с реальной жизнью
- Спокойный и рассудительный

Помни ключевые принципы стоицизма:
1. Дихотомия контроля — различай что в твоей власти, а что нет
2. Добродетель как высшее благо
3. Жизнь в согласии с природой и разумом
4. Memento mori — помни о смерти
5. Amor fati — люби свою судьбу

Отвечай на русском языке. Будь мудрым наставником, но не назидательным проповедником.`

export async function POST(req: NextRequest) {
  try {
    const { messages, quote, entry } = await req.json()

    // Добавляем контекст цитаты и записи если они есть
    const contextMessage = quote
      ? `Сегодняшняя цитата: "${quote.text}" — ${quote.author}${
          entry ? `\n\nЗапись пользователя: ${entry}` : ''
        }`
      : ''

    const chatMessages: any[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
    ]

    if (contextMessage) {
      chatMessages.push({
        role: 'system',
        content: `Контекст для обсуждения:\n${contextMessage}`,
      })
    }

    chatMessages.push(...messages)

    // Формируем промпт для textGeneration
    let prompt = SYSTEM_PROMPT + '\n\n'
    if (contextMessage) {
      prompt += `Контекст для обсуждения:\n${contextMessage}\n\n`
    }

    for (const msg of messages) {
      if (msg.role === 'user') {
        prompt += `Человек: ${msg.content}\n`
      } else if (msg.role === 'assistant') {
        prompt += `Философ: ${msg.content}\n`
      }
    }
    prompt += 'Философ:'

    // Используем Qwen через прямой API
    const hfResponse = await fetch(
      'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-0.5B-Instruct',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 250,
            temperature: 0.7,
            return_full_text: false,
            top_p: 0.95,
          },
          options: {
            use_cache: false,
            wait_for_model: true,
          },
        }),
      }
    )

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text()
      throw new Error(`HF API error: ${hfResponse.status} - ${errorText}`)
    }

    const hfData = await hfResponse.json()

    // Обрабатываем разные форматы ответа
    let aiMessage = ''
    if (Array.isArray(hfData) && hfData[0]?.generated_text) {
      aiMessage = hfData[0].generated_text.trim()
    } else if (hfData.generated_text) {
      aiMessage = hfData.generated_text.trim()
    } else if (hfData.error) {
      throw new Error(`HF model error: ${hfData.error}`)
    }

    if (!aiMessage) {
      aiMessage = 'Прости, я не смог сформулировать ответ.'
    }

    return NextResponse.json({ message: aiMessage })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error.message || 'Ошибка при обращении к AI' },
      { status: 500 }
    )
  }
}
