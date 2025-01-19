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
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  const update = req.body
  if (!update?.message?.chat?.id) {
    return res.status(200).send('Invalid payload')
  }

  const text = update.message.text || ''
  const message = text === '/start' 
    ? "Welcome to VAIA! Tap the button below to start chatting:"
    : "Type /start or tap the button above to open VAIA Chat."

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: update.message.chat.id,
      text: message,
      reply_markup: KEYBOARD_MARKUP
    })
  })

  return res.status(200).send('ok')
}
