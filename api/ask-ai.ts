import { VercelRequest, VercelResponse } from '@vercel/node'
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
    // Create assistant only once and reuse ID
    if (!assistantId) {
      const assistant = await openai.beta.assistants.create({
        name: "VAIA Travel Buddy",
        instructions: `You are VAIA, a travel and language companion. For each response:
          1. Provide the translation or answer
          2. Include a brief cultural context or tip
          3. Keep responses friendly but informative
          4. Format responses clearly with emojis for readability`,
        model: "gpt-4o"
      })
      assistantId = assistant.id
    }

    const { userMessage } = req.body
    if (!userMessage) {
      return res.status(400).json({ error: "Missing userMessage" })
    }

    const thread = await openai.beta.threads.create()
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: userMessage
    })

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId
    })

    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    while (runStatus.status !== "completed") {
      if (runStatus.status === "failed") {
        throw new Error("Assistant run failed")
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    }

    const messages = await openai.beta.threads.messages.list(thread.id)
    const assistantResponse = messages.data.find(msg => msg.role === "assistant")
    const content = assistantResponse?.content[0]?.type === 'text' 
      ? assistantResponse.content[0].text.value 
      : "No response generated"

    return res.status(200).json({ aiResponse: content })

  } catch (error) {
    console.error("OpenAI API error:", error)
    return res.status(500).json({ error: "Failed to get AI response" })
  }
} 