import { describe, it, expect } from '@jest/globals'

// Extract the message transformation logic to test
const createAIMessage = (aiText: string, phraseObj: any) => ({
  id: expect.any(String),
  sender: 'vai',
  content: aiText,
  ...(phraseObj && {
    phrase: {
      original: phraseObj.phrase.original,
      romanized: phraseObj.phrase.romanized,
      meaning: phraseObj.phrase.meaning
    },
    language: phraseObj.languageCode
  })
})

describe('Chat Logic', () => {
  it('should format phrase messages correctly', () => {
    const result = createAIMessage(
      "Here's how to say hello in Thai:", 
      {
        phrase: {
          original: "สวัสดี",
          romanized: "sawadee",
          meaning: "hello/goodbye (formal)"
        },
        languageCode: "th-TH",
        culturalTip: "Used throughout the day"
      }
    )

    expect(result).toMatchObject({
      sender: 'vai',
      content: "Here's how to say hello in Thai:",
      phrase: {
        original: "สวัสดี",
        romanized: "sawadee",
        meaning: "hello/goodbye (formal)"
      },
      language: "th-TH"
    })
  })

  it('should handle non-phrase messages', () => {
    const result = createAIMessage(
      "Bangkok's weather is tropical year-round.",
      null
    )

    expect(result).toMatchObject({
      sender: 'vai',
      content: "Bangkok's weather is tropical year-round."
    })
    expect(result.phrase).toBeUndefined()
    expect(result.language).toBeUndefined()
  })
}) 