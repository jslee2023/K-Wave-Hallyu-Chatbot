
import { GoogleGenAI, Chat } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const createHallyuChat = (): Chat => {
  const systemInstruction = `당신은 한류(K-Wave) 전문가 챗봇입니다. K-팝, K-드라마, 한국 영화, 한국 문화 등 한류에 관련된 모든 질문에 친절하고 상세하게 한국어로 답변해주세요. 사용자가 한국 문화에 대해 더 깊이 이해할 수 있도록 도와주세요.`;
  
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
  return chat;
};

export const chatSession = createHallyuChat();
