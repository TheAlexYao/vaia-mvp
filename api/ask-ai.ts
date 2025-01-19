import type { VercelRequest, VercelResponse } from '@vercel/node'
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

let assistantId: string | null = null;

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
        name: "VAIA Travel Buddy",
        instructions: `You are VAIA, a travel and language companion for someone in ${city} using ${langCode}. For each response:

1. Provide a brief human-readable answer (with emojis)
2. Include location-specific cultural context for ${city} when relevant
3. ONLY if the user asks for a translation or language phrase, append this JSON in triple backticks:
\`\`\`json
{
  "phrase": {
    "original": "string",
    "romanized": "string",
    "meaning": "string"
  },
  "languageCode": "${langCode}",
  "culturalTip": "string (specific to ${city})"
}
\`\`\`

4. If the user did NOT request a translation/phrase, do not output any JSON
5. Never use triple backticks elsewhere in your response
6. Keep cultural tips relevant to ${city} and concise`,
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

    return res.status(200).json({ 
      aiText,
      phraseObj: phraseObj ? {
        ...phraseObj,
        // Ensure languageCode is in correct format (e.g., 'th-TH')
        languageCode: phraseObj.languageCode?.includes('-') 
          ? phraseObj.languageCode 
          : `${phraseObj.languageCode}-${phraseObj.languageCode.toUpperCase()}`
      } : null,
      threadId: currentThread.id 
    })

  } catch (error) {
    console.error("OpenAI API error:", error)
    return res.status(500).json({ error: "Failed to get AI response" })
  }
} 