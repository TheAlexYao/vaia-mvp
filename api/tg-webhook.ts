// file: /api/tg-webhook.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import OpenAI from "openai"

// If you need your GPT logic, import or define it here.
// Or call your existing /api/ask-ai endpoint directly with fetch.

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN // from BotFather

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  const update = req.body

  // Basic check: did user send a message?
  if (!update.message) {
    return res.status(200).send('No message payload')
  }

  const chatId = update.message.chat.id
  const userText = update.message.text || ''

  // 1. (Optional) we can store chat_id -> thread_id in a map or DB if we want multi-turn context
  // For MVP, let's ignore or do ephemeral.

  // 2. Get AI response
  const botReply = await getChatResponse(userText)

  // 3. Send reply back to Telegram
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: botReply,
    })
  })

  return res.status(200).send('ok')
}

// Example AI logic (for MVP)
async function getChatResponse(userText: string): Promise<string> {
  // EITHER (A) direct call to GPT, or (B) call your ask-ai endpoint
  // Example B:
  try {
    const askAiRes = await fetch('https://yourvercelappurl.com/api/ask-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage: userText })
    })
    const data = await askAiRes.json()
    return data.aiText || "Hmm, I couldn't parse that..."
  } catch (err) {
    console.error("Error calling /api/ask-ai:", err)
    return "Something went wrong!"
  }
}
