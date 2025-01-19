import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function demoVaiaAssistant() {
  try {
    // 1. Create the VAIA assistant
    const assistant = await openai.beta.assistants.create({
      name: "VAIA Travel Buddy",
      instructions: `You are VAIA, a travel and language companion. For each response:
        1. Provide the translation or answer
        2. Include a brief cultural context or tip
        3. Keep responses friendly but informative
        4. Format responses clearly with emojis for readability`,
      model: "gpt-4o"
    });

    console.log("🤖 Assistant created:", assistant.id);

    // 2. Create a thread (represents one user's conversation)
    const thread = await openai.beta.threads.create();
    console.log("🧵 Thread created:", thread.id);

    // 3. Add a user message to the thread
    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: "How do I say 'no sugar, please' in Thai?"
      }
    );

    console.log("💬 Added user message");

    // 4. Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(
      thread.id,
      { assistant_id: assistant.id }
    );

    // 5. Wait for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(
      thread.id,
      run.id
    );

    while (runStatus.status !== "completed") {
      if (runStatus.status === "failed") {
        throw new Error("Assistant run failed");
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
    }

    // 6. Get the assistant's response
    const messages = await openai.beta.threads.messages.list(
      thread.id
    );

    // Get the latest assistant message
    const assistantResponse = messages.data
      .filter(msg => msg.role === "assistant")[0];

    console.log("\n🌟 Assistant Response:");
    console.log(
      assistantResponse.content[0].type === 'text' 
        ? assistantResponse.content[0].text.value 
        : "No response generated"
    );

  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the demo
demoVaiaAssistant(); 