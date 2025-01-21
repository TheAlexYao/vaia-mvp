import type { VercelRequest, VercelResponse } from '@vercel/node'
import OpenAI from "openai"

/**
 * OpenAI client initialization with API key
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Expected response format for language learning interactions
 */
export const PHRASE_FORMAT = {
  format: {
    phrase: {
      original: "string",   // Phrase in target language
      romanized: "string",  // Romanized version if needed
      meaning: "string"     // English translation
    },
    locale: "string",       // BCP-47 language code
    culturalTip: "string"   // City-specific cultural context
  }
};

const getInstructions = (city: string, langCode: string) => `You are Vai, a friendly AI companion who specializes in language learning and cultural exchange, currently helping someone in ${city}.

CORE PERSONALITY:
1. Friendly, empathetic, and engaging
2. Knowledgeable but humble - acknowledge limitations when unsure
3. Default language is ${langCode} for teaching, but can discuss in user's preferred language
4. Proactively offer relevant language learning opportunities in natural conversation

INTERACTION STYLE:
1. Conversational Flow:
   - Keep responses concise (2-3 sentences for general chat)
   - Ask thoughtful follow-up questions to maintain engagement
   - Use 1-2 emojis per response to keep it lively, but don't overload
   - Look for opportunities to share relevant cultural/language insights

2. Memory & Context:
   - Reference previous conversations when relevant
   - Remember user's interests and language goals
   - Build on past interactions to personalize responses

RESPONSE FORMATS:

1. FOR LANGUAGE TEACHING (Example in Spanish):
Here's a useful phrase! 🌟

\`\`\`json
{
  "phrase": {
    "original": "¿Cómo estás?",
    "romanized": "same as original for Spanish",
    "meaning": "How are you?"
  },
  "locale": "es-AR",
  "culturalTip": "In Buenos Aires, people often respond with '¡Todo bien!' (All good!)"
}
\`\`\`

2. FOR LANGUAGE TEACHING (Example in Thai):
Here's how to say it! 🌟

\`\`\`json
{
  "phrase": {
    "original": "สบายดีไหม",
    "romanized": "sabai dee mai",
    "meaning": "How are you?"
  },
  "locale": "th-TH",
  "culturalTip": "In Bangkok, people often add 'khrap/kha' at the end to show respect"
}
\`\`\`

3. FOR GENERAL CONVERSATION:
- Engage naturally while maintaining your identity as a language/culture specialist
- Share personal observations and experiences from your knowledge base
- Be genuinely curious about user's thoughts and experiences

CRITICAL RULES:

1. JSON Format Rules:
   - ALWAYS provide JSON snippet when teaching or correcting phrases
   - End response immediately after JSON block for language teaching
   - No triple backticks except for the single JSON block
   - No additional markdown formatting anywhere else
   - Always use correct BCP-47 locale codes (e.g., 'es-AR', 'th-TH', 'ja-JP')

2. Cultural Context Rules:
   - Present cultural information using qualifiers like "often," "some people," or "in many cases"
   - Avoid broad generalizations or stereotypes
   - When uncertain, acknowledge the diversity of practices
   - Present cultural insights as observations rather than absolutes

3. Content Boundaries:
   - Stay within factual knowledge bounds
   - Acknowledge limitations honestly
   - Keep responses helpful and concise
   - Focus on being informative rather than showing off knowledge

Remember: Keep interactions friendly and natural, always looking for opportunities to enhance understanding of language and culture in ${city}, while maintaining clear and consistent formatting.`;

// Helper to cancel existing runs
async function cancelActiveRuns(threadId: string) {
  const runs = await openai.beta.threads.runs.list(threadId);
  const activeRuns = runs.data.filter(run => 
    ['queued', 'in_progress', 'requires_action'].includes(run.status)
  );
  
  await Promise.all(activeRuns.map(run => 
    openai.beta.threads.runs.cancel(threadId, run.id).catch(e => console.warn('Cancel failed:', e))
  ));
}

// Improved run polling with comfortable timeouts
async function waitForRun(threadId: string, runId: string) {
  const MAX_ATTEMPTS = 40;  // 40 attempts * 1s = 40s max
  const INTERVAL = 1000;    // 1 second between checks
  
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    
    switch (runStatus.status) {
      case 'completed':
        return runStatus;
      case 'failed':
        throw new Error(`Run failed: ${runStatus.last_error?.message || 'Unknown error'}`);
      case 'cancelled':
        throw new Error('Run was cancelled');
      case 'expired':
        throw new Error('Run expired');
      default:
        await new Promise(resolve => setTimeout(resolve, INTERVAL));
    }
  }
  throw new Error('Run timed out');
}

/**
 * Main API Handler
 * Endpoint: /api/ask-ai
 * Method: POST
 * 
 * Request Body:
 * {
 *   userMessage: string;    // User's input message
 *   threadId?: string;      // Optional thread ID for conversation continuity
 *   langCode: string;       // BCP-47 language code (e.g., 'es-AR', 'th-TH')
 *   city: string;          // User's selected city for cultural context
 *   assistantId?: string;  // Optional assistant ID for context persistence
 * }
 * 
 * Response:
 * {
 *   aiText: string;        // AI's friendly response
 *   phraseObj?: object;    // Structured language data if applicable
 *   threadId: string;      // Thread ID for conversation continuity
 *   assistantId: string;   // Assistant ID for context persistence
 * }
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { userMessage, threadId, langCode, city, assistantId } = req.body;
    
    if (!userMessage || !langCode || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Handle assistant creation/update
    let currentAssistant: { id: string; city?: string; langCode?: string; };
    
    if (assistantId) {
      try {
        await openai.beta.assistants.update(assistantId, {
          instructions: getInstructions(city, langCode)
        });
        currentAssistant = { id: assistantId, city, langCode };
      } catch (e) {
        console.warn('Assistant not found, creating new one');
        const assistant = await openai.beta.assistants.create({
          name: "Vai Travel Buddy",
          instructions: getInstructions(city, langCode),
          model: "gpt-4o"
        });
        currentAssistant = { id: assistant.id, city, langCode };
      }
    } else {
      const assistant = await openai.beta.assistants.create({
        name: "Vai Travel Buddy",
        instructions: getInstructions(city, langCode),
        model: "gpt-4o"
      });
      currentAssistant = { id: assistant.id, city, langCode };
    }

    // Set longer timeout for request
    res.setTimeout(55000); // 55 seconds to allow for cleanup

    // Create or retrieve thread
    const currentThread = threadId 
      ? { id: threadId }
      : await openai.beta.threads.create();

    if (threadId) {
      // Cancel any existing runs before starting new one
      await cancelActiveRuns(threadId);
    }

    // Create message and run
    await openai.beta.threads.messages.create(currentThread.id, {
      role: 'user',
      content: userMessage
    });

    const run = await openai.beta.threads.runs.create(currentThread.id, {
      assistant_id: currentAssistant.id
    });

    // Wait for completion with improved polling
    await waitForRun(currentThread.id, run.id);

    // Get response
    const messages = await openai.beta.threads.messages.list(currentThread.id);
    const assistantResponse = messages.data.find(msg => msg.role === "assistant");
    const fullText = assistantResponse?.content[0]?.type === 'text' 
      ? assistantResponse.content[0].text.value 
      : "No response generated";

    // Parse JSON from response if present
    let phraseObj = null;
    const jsonMatch = fullText.match(/```json\s*([\s\S]*?)```/);
    if (jsonMatch?.[1]) {
      try {
        const parsed = JSON.parse(jsonMatch[1].trim());
        if (parsed.phrase?.original && parsed.locale) {
          phraseObj = parsed;
        }
      } catch (e) {
        console.error('JSON parse error:', e);
      }
    }

    // Clean response text and remove JSON block
    const aiText = fullText.replace(/```json[\s\S]*?```/g, '').trim();

    return res.status(200).json({ 
      aiText,
      phraseObj,
      threadId: currentThread.id,
      assistantId: currentAssistant.id
    });

  } catch (error) {
    if (error instanceof Error && error.message?.includes('cancelled')) {
      return res.status(409).json({
        error: 'Run cancelled',
        details: 'Previous run was cancelled, please retry'
      });
    }
    console.error("API Error:", error);
    return res.status(
      (error as { status?: number })?.status || 500
    ).json({ 
      error: "Failed to get AI response",
      details: error instanceof Error ? error.message : String(error)
    });
  }
} 