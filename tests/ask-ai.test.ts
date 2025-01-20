import fetch from 'node-fetch'

const API_URL = 'http://localhost:3000/api/ask-ai'

interface AIResponse {
  aiText: string
  phraseObj: {
    phrase: {
      original: string
      romanized: string
      meaning: string
    }
    locale: string
    culturalTip: string
  } | null
  threadId: string
}

describe('Ask AI API', () => {
  // Increase timeout to 15s for OpenAI calls
  jest.setTimeout(15000)

  it('should parse phrase JSON when present', async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userMessage: "How do I say 'hello' in Thai?"
      })
    })
    const data = await response.json() as AIResponse
    
    expect(response.status).toBe(200)
    expect(data.aiText).toBeDefined()
    expect(data.aiText).not.toContain('```')
    expect(data.phraseObj).toMatchObject({
      phrase: {
        original: expect.any(String),
        romanized: expect.any(String),
        meaning: expect.any(String)
      },
      locale: expect.stringMatching(/^th(-TH)?$/), // Accept both 'th' and 'th-TH'
      culturalTip: expect.any(String)
    })
  }, 15000) // Individual test timeout

  it('should handle non-phrase queries without JSON', async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userMessage: "What's the weather like in Bangkok?"
      })
    })
    const data = await response.json() as AIResponse
    
    expect(response.status).toBe(200)
    expect(data.aiText).toBeDefined()
    expect(data.phraseObj).toBeNull()
  }, 15000) // Individual test timeout

  // Cleanup after all tests
  afterAll(done => {
    done()
  })
}) 