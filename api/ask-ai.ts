import type { VercelRequest, VercelResponse } from '@vercel/node'
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

let assistantId: string | null = null;

const EXPECTED_FORMAT = `
Return a JSON object with this EXACT structure:
{
  "phrase": {
    "original": "おはよう",
    "romanized": "ohayou",
    "meaning": "good morning"
  },
  "locale": "ja-JP",  // REQUIRED: Must be BCP-47 format. ALWAYS use JP for Japanese, TH for Thai, etc.
  "culturalTip": "In Japan, this greeting is used in the morning"
}

Examples:
Japanese -> "ja-JP" (not ja-JA)
Thai -> "th-TH"
German -> "de-DE"
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { userMessage, threadId, langCode, city } = req.body;
    
    if (!userMessage || !langCode || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!assistantId) {
      const assistant = await openai.beta.assistants.create({
        name: "Vai Travel Buddy", 
        instructions: `You are Vai, a travel and language companion for someone in ${city} using ${langCode}. For each response:

1. Provide a brief human-readable answer (with emojis)
2. Include cultural context for ${city} when relevant
3. Keep cultural tips relevant to ${city} and concise
4. Never use triple backticks elsewhere
5. If the user asks about language codes, always provide the full BCP-47 format (e.g., "ja-JP" for Japanese)
6. For translations/phrases, append this JSON format:

${EXPECTED_FORMAT}`,
        model: "gpt-4o"
      })
      assistantId = assistant.id
    }

    const currentThread = threadId 
      ? { id: threadId }
      : await openai.beta.threads.create()

    await openai.beta.threads.messages.create(currentThread.id, {
      role: "user",
      content: userMessage
    })

    const run = await openai.beta.threads.runs.create(currentThread.id, {
      assistant_id: assistantId
    })

    let runStatus = await openai.beta.threads.runs.retrieve(currentThread.id, run.id)
    while (runStatus.status !== "completed") {
      if (runStatus.status === "failed") {
        throw new Error("Assistant run failed")
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(currentThread.id, run.id)
    }

    const messages = await openai.beta.threads.messages.list(currentThread.id)
    const assistantResponse = messages.data.find(msg => msg.role === "assistant")
    const fullText = assistantResponse?.content[0]?.type === 'text' 
      ? assistantResponse.content[0].text.value 
      : "No response generated"

    // Parse JSON from response
    let phraseObj = null
    const jsonMatch = fullText.match(/```json\s*({[\s\S]*?})\s*```/)
    if (jsonMatch) {
      try {
        phraseObj = JSON.parse(jsonMatch[1])
      } catch (e) {
        console.error('JSON parse error:', e)
      }
    }

    const aiText = fullText.replace(/```json[\s\S]*?```/g, '').trim()

    // Log response structure
    console.log('API Response Structure:', {
      aiText: aiText.slice(0, 100) + '...', // First 100 chars
      phraseObj: phraseObj ? {
        locale: phraseObj.locale,
        phrase: {
          original: phraseObj.phrase?.original?.slice(0, 50),
          romanized: phraseObj.phrase?.romanized?.slice(0, 50),
          meaning: phraseObj.phrase?.meaning?.slice(0, 50)
        }
      } : null,
      threadId: currentThread.id
    });

    return res.status(200).json({ 
      aiText,
      phraseObj: phraseObj ? {
        ...phraseObj,
        locale: phraseObj.locale || null
      } : null,
      threadId: currentThread.id 
    })

  } catch (error) {
    console.error("OpenAI API error:", error)
    return res.status(500).json({ error: "Failed to get AI response" })
  }
} 