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

    if (assistantId) {
      try {
        await openai.beta.assistants.del(assistantId);
        console.log('Deleted existing assistant');
        assistantId = null;
      } catch (e) {
        console.error('Failed to delete assistant:', e);
      }
    }

    if (!assistantId) {
      const assistant = await openai.beta.assistants.create({
        name: "Vai Travel Buddy",
        instructions: `You are Vai, a travel and language companion for someone in ${city}. For each response:

1. Provide a brief human-readable answer (with emojis)
2. Include cultural context for ${city} when relevant
3. Keep cultural tips focused on ${city} if applicable, or provide general cultural insights if not
4. Never use triple backticks elsewhere

Language Handling:
- If user explicitly asks "How do I say X in [language]?", use that language's BCP-47 code (e.g., "fr-FR" for French)
- Otherwise, default to ${langCode}
- Always ensure the 'locale' field matches the requested or default language code
- Always use standardized codes: "ja-JP" for Japanese, "th-TH" for Thai, "de-DE" for German, etc.

For translations/phrases, append this JSON format:

${EXPECTED_FORMAT}`,
        model: "gpt-4o"
      })
      assistantId = assistant.id
    }

    // Set a longer timeout for the request
    res.setTimeout(30000); // 30 seconds

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

    // Add timeout to the polling loop
    let runStatus = await openai.beta.threads.runs.retrieve(currentThread.id, run.id);
    let attempts = 0;
    const MAX_ATTEMPTS = 20; // Increase max attempts

    while (runStatus.status !== "completed") {
      if (attempts >= MAX_ATTEMPTS) {
        throw new Error("Request timed out");
      }
      if (runStatus.status === "failed") {
        throw new Error("Assistant run failed");
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(currentThread.id, run.id);
      attempts++;
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
      aiText: aiText.slice(0, 100) + '...', 
      phraseObj: phraseObj ? {
        ...phraseObj,  // Show all fields including locale
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
    console.error("API Error:", error);
    // Send a proper error response
    return res.status(
      (error as { status?: number })?.status || 500
    ).json({ 
      error: "Failed to get AI response",
      details: error instanceof Error ? error.message : String(error)
    });
  }
} 