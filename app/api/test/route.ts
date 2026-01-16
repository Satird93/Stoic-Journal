import { NextResponse } from 'next/server'

export async function GET() {
  const hasKey = !!process.env.GROQ_API_KEY
  const keyPrefix = process.env.GROQ_API_KEY?.substring(0, 10)

  return NextResponse.json({
    hasKey,
    keyPrefix,
    message: hasKey ? 'API key is set' : 'API key is missing'
  })
}
