import { Client } from "@langchain/langgraph-sdk";
const BASE_AI_URL = process.env.NEXT_PUBLIC_ai_api_url;
const API_KEY = process.env.NEXT_PUBLIC_ai_api_key;

export const someFunc = async () => {
  // Initialize the client with remote URL
  const client = new Client({
    apiUrl: BASE_AI_URL,
    apiKey: API_KEY,
  });

  // List all assistants
  const assistants = await client.assistants.search();

  // Get the first assistant
  const agent = assistants[0];

  // Create a new thread
  const thread = await client.threads.create();

  // Start a streaming run
  const input: any = {
    messages: [{ role: "human", content: "hi there" }],
  };

  // Stream the response
  for await (const chunk of client.runs.stream(
    thread.thread_id,
    agent.assistant_id,
    input
  )) {
    console.log(chunk);
  }
};

// Call the main function
someFunc().catch(console.error);
