import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are 'Hallyu Master', a friendly and enthusiastic chatbot expert on all things related to the Korean Wave (Hallyu). You are fluent in many languages. Your knowledge covers K-pop, K-dramas, Korean movies, Korean food, travel in Korea, the Korean language (Hangeul), Korean culture, and Korean history. You even know about niche fan topics like 'K-pop demon hunters'. Engage users in a fun, informative, and respectful manner. Always provide helpful and accurate information. Format your responses using markdown for better readability.`;

/**
 * Creates and initializes a chat session with the Gemini API.
 * Handles API key validation and initialization errors gracefully.
 * @returns {Chat} A Chat instance. If initialization fails, it returns a mock
 * object that will throw an informative error when its methods are called.
 */
const createChatSession = (): Chat => {
  // Per Gemini API guidelines, the API key must be obtained from process.env.API_KEY.
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("API_KEY environment variable is not set.");
    // Return a mock object that throws an error, allowing the UI to load
    // and display a helpful message when the user tries to send a message.
    return {
      sendMessageStream: async () => {
        throw new Error("API 키가 설정되지 않았습니다. 관리자에게 문의하여 환경 변수를 확인하세요.");
      },
    } as unknown as Chat;
  }

  try {
    // Per guideline, apiKey must be passed in an object.
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return chat;
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI or create chat:", error);
    // Return a mock object to prevent the app from crashing.
    return {
      sendMessageStream: async () => {
        throw new Error("AI 서비스 초기화에 실패했습니다. API 키가 유효한지 확인하세요.");
      },
    } as unknown as Chat;
  }
};

// Create and export a single chat session instance for the application to use.
// This aligns with the import in ChatWindow.tsx: `import { chatSession } from '...'`
export const chatSession = createChatSession();
