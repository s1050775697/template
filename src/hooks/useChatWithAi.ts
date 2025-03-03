import { useLayoutEffect, useState } from "react";
import axios from "axios";
import { Client } from "@langchain/langgraph-sdk";
import { IGetThreadResponse } from "@/typescript/interfaces/ai.interface";
import { extractLocations, getOpenAIEmbedding } from "@/utils/extractLocations";

const API_KEY = process.env.NEXT_PUBLIC_ai_api_key;
const BASE_API_URL = "/api";
console.log("API_KEY :: ", API_KEY);
const useChatWithAi = () => {
  const [thread, setThread] = useState<IGetThreadResponse>();
  const [responses, setResponses] = useState<{ user: string; text: string }[]>(
    []
  );
  const [isAccessingChat, setIsAccessingChat] = useState<boolean>(false);

  useLayoutEffect(() => {
    onCreateNewThread();
  }, []);

  const onCreateNewThread = async () => {
    const headers = {
      "Content-Type": "application/json",
      "X-Api-Key": API_KEY,
    };
    const { status, data } = await axios.post(
      `${BASE_API_URL}/threads`,
      {
        metadata: {},
        if_exists: "raise",
      },
      { headers }
    );

    if (status === 200) {
      console.log("data :: ", data);
      setThread(data);
    }
  };

  const onChatWithAI = async (content: string) => {
    try {
      console.log("content: ", content);
      setResponses((p) => [...p, { user: "you", text: content }]);
      setIsAccessingChat(true);
      console.log("Received here :: ", content);
      const client = new Client({
        apiUrl: `${window.location.origin}/api`,
        apiKey: API_KEY,
      });

      const assistants = await client.assistants.search();
      const agent = assistants[0];
      // If thread is not created yet, create it
      if (!thread) {
        const newThread = await client.threads.create();
        setThread(newThread as IGetThreadResponse);
      }

      const messages = [{ role: "human", content }];
      let aiResponse = ""; // Store the final AI response

      for await (const chunk of client.runs.stream(
        thread?.thread_id || "",
        agent.assistant_id,
        { input: { messages } }
      )) {
        if (chunk.data?.messages?.length > 1) {
          console.log("chunk.data.messages :: ", chunk.data.messages);
          aiResponse =
            chunk.data.messages[chunk.data.messages.length - 1]?.content || "";
        }
      }

      console.log("Received here-------5 ", aiResponse);
      if (aiResponse) {
        console.log("aiResponse :: ", aiResponse);
        setResponses((p) => [...p, { user: "ai", text: aiResponse }]);
        setIsAccessingChat(false);
        // const embedding = await getOpenAIEmbedding(aiResponse);
        // console.log("embedding :: ", embedding);
        // 使用 compromise提取地点（地名和地标），可选
        const locations = extractLocations(aiResponse);
        if (locations.length > 0) {
          console.log("AI detected locations:", locations);
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      setIsAccessingChat(false);
    }
  };

  // const onChatWithAI = async (content: string) => {
  //   try {
  //     console.log("content: ", content)
  //     setResponses((p) => [...p, { user: "you", text: content }]);
  //     setIsAccessingChat(true);

  //     const client = new Client({
  //       apiUrl: `${window.location.origin}/api`,
  //       apiKey: API_KEY,
  //     });

  //     const assistants = await client.assistants.search();
  //     const agent = assistants[0];
  //     const thread = await client.threads.create();
  //     const messages = [{ role: "human", content }];

  //     let aiResponse = ""; // 只存储 AI 的最终响应

  //     for await (const chunk of client.runs.stream(
  //       thread.thread_id,
  //       agent.assistant_id,
  //       { input: { messages } }
  //     )) {
  //       if (chunk.data?.messages?.length > 1) {
  //         aiResponse = chunk.data.messages[1]?.content || "";
  //       }
  //     }

  //     if (aiResponse) {
  //       setResponses((p) => [...p, { user: "ai", text: aiResponse }]);
  //       setIsAccessingChat(false);
  //       const locations = extractLocations(aiResponse);
  //       if (locations.length > 0) {
  //         console.log("AI detected locations:", locations);
  //       }
  //     }
  //   } catch (error: any) {
  //     console.error("Error:", error);
  //     setIsAccessingChat(false);
  //   }
  // };

  return { onChatWithAI, responses, isAccessingChat };
};
export default useChatWithAi;
// const onChatWithAI = async (content: string) => {
//   try {
//     setResponses((p) => [...p, { user: "you", text: content }]);
//     setIsAccessingChat(true);
//     console.log("Using API URL:", `${window.location.origin}/api`);

//     // Initialize the client with remote URL
//     const client = new Client({
//       apiUrl: `${window.location.origin}/api`,
//       apiKey: API_KEY,
//     });

//     // List all assistants
//     const assistants = await client.assistants.search();

//     // Get the first assistant
//     const agent = assistants[0];

//     // Create a new thread
//     const thread = await client.threads.create();

//     // Start a streaming run
//     const messages = [{ role: "human", content }];

//     // Stream the response
//     for await (const chunk of client.runs.stream(
//       thread.thread_id,
//       agent.assistant_id,
//       {
//         input: { messages },
//       }
//     )) {
//       if (chunk.data?.messages?.length > 1) {
//         const aiResponse = chunk?.data?.messages?.[1]?.content;
//         console.log("aiResponse :: ", aiResponse);
//         setResponses((p) => [
//           ...p,
//           { user: "ai", text: aiResponse },
//         ]);
//         setIsAccessingChat(false);

//         // 使用 compromise 提取地名和地标
//         const locations = extractLocations(aiResponse);
//         if (locations.length > 0) {
//           console.log("AI mentioned locations:", locations);
//           // 在这里调用跳转逻辑
//           // locations.forEach(location => onCityDetected(location));
//         }
//       }
//     }
//   } catch (error: any) {
//     console.error("Error details:", {
//       message: error.message,
//       attemptNumber: error.attemptNumber,
//       retriesLeft: error.retriesLeft,
//     });
//     setIsAccessingChat(false);
//     throw error;
//   }
// };
