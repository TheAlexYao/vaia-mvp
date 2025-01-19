import fetch from 'node-fetch'

const API_URL = 'http://localhost:3000/api/tts'

interface TTSResponse {
  success?: boolean
  error?: string
  audioBase64?: string
  contentType?: string
}

describe('TTS API', () => {
  it('should handle valid request', async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Hello',
        language: 'th-TH'
      })
    })
    const data = await response.json() as TTSResponse
    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.audioBase64).toBeDefined()
    expect(data.contentType).toBe('audio/mp3')
  })

  it('should reject invalid language code', async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Hello',
        language: 'invalid'
      })
    })
    const data = await response.json() as TTSResponse
    expect(response.status).toBe(400)
    expect(data.error).toContain('Invalid language code')
  })

  it('should reject empty text', async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: '   ',
        language: 'th-TH'
      })
    })
    const data = await response.json() as TTSResponse
    expect(response.status).toBe(400)
    expect(data.error).toBe('Missing text parameter')
  })
}) 