
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ChatMessage } from '../types';
import { Author } from '../types';
import { chatSession } from '../services/geminiService';
import Message from './Message';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      author: Author.BOT,
      text: '안녕하세요! 한류 챗봇입니다. K-팝, 드라마, 영화 등 무엇이든 물어보세요!',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim()) return;

    const newUserMessage: ChatMessage = { author: Author.USER, text: messageText };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const stream = await chatSession.sendMessageStream({ message: messageText });
      
      let botResponse = '';
      setMessages(prev => [...prev, { author: Author.BOT, text: '' }]);

      for await (const chunk of stream) {
        botResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { author: Author.BOT, text: botResponse };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      const errorMessage: ChatMessage = {
        author: Author.BOT,
        text: '죄송합니다, 메시지를 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-white/50 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
      <div ref={chatContainerRef} className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
      <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatWindow;
