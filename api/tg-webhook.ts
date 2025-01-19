// file: /api/tg-webhook.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://vaiaworld.ai"

const KEYBOARD_MARKUP = {
  keyboard: [[{
    text: "Open VAIA Chat",
    web_app: { url: APP_URL }
  }]],
  resize_keyboard: true,
  one_time_keyboard: true
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Received webhook:', req.body)

  if (req.method !== 'POST') {
    console.log('Wrong method:', req.method)
    return res.status(405).send('Method Not Allowed')
  }

  const update = req.body
  if (!update?.message?.chat?.id) {
    console.log('Invalid payload:', update)
    return res.status(200).send('Invalid payload')
  }

  try {
    const text = update.message.text || ''
    const message = text === '/start' 
      ? "Welcome to VAIA! Tap the button below to start chatting:"
      : "Type /start or tap the button above to open VAIA Chat."

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: update.message.chat.id,
        text: message,
        reply_markup: KEYBOARD_MARKUP
      })
    })
    
    console.log('Telegram API response:', await response.text())
    return res.status(200).send('ok')
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).send('Internal error')
  }
}
