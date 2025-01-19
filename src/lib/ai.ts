import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export async function callGpt4o(messages: Array<{ role: string; content: string }>) {
  const response = await openai.createChatCompletion({
    model: "gpt-4o",
    messages,
    temperature: 0.7
  });
  return response.data.choices[0].message?.content;
}
