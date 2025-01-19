import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function createAssistant(name: string, instructions: string) {
  return await openai.beta.assistants.create({
    name,
    instructions,
    model: "gpt-4o",
  });
}

export async function createThread() {
  return await openai.beta.threads.create();
}

export async function createMessage(threadId: string, content: string) {
  return await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content,
  });
}

export async function runAssistant(threadId: string, assistantId: string) {
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });
  return run;
}
