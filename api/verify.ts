import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createHmac } from 'crypto'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { initData } = req.body
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

    const urlParams = new URLSearchParams(initData)
    const hash = urlParams.get('hash')
    urlParams.delete('hash')
    urlParams.sort()
    
    let dataCheckString = ''
    for (const [key, value] of urlParams.entries()) {
      dataCheckString += `${key}=${value}\n`
    }
    dataCheckString = dataCheckString.slice(0, -1)

    const secret = createHmac('sha256', 'WebAppData').update(BOT_TOKEN!)
    const calculatedHash = createHmac('sha256', secret.digest())
      .update(dataCheckString)
      .digest('hex')

    if (hash !== calculatedHash) {
      return res.status(401).json({
        success: false,
        message: 'Invalid InitData'
      })
    }

    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET

    urlParams.append('client_id', clientId!)
    urlParams.sort()

    dataCheckString = ''
    for (const [key, value] of urlParams.entries()) {
      dataCheckString += `${key}=${value}\n`
    }
    dataCheckString = dataCheckString.slice(0, -1)

    const centralSecret = createHmac('sha256', 'WebAppData').update(clientSecret!)
    const centralHash = createHmac('sha256', centralSecret.digest())
      .update(dataCheckString)
      .digest('hex')
    urlParams.append('hash', centralHash)

    return res.json({
      success: true,
      initData: urlParams.toString()
    })
  } catch (error) {
    console.error('Verification error:', error)
    return res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    })
  }
} 