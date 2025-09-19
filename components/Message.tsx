
import React from 'react';
import type { ChatMessage } from '../types';
import { Author } from '../types';

interface MessageProps {
  message: ChatMessage;
}

const BotIcon = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
    <span className="text-white text-lg font-bold">AI</span>
  </div>
);

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
    </div>
);


const Message: React.FC<MessageProps> = ({ message }) => {
  const isBot = message.author === Author.BOT;

  return (
    <div className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && <BotIcon />}
      <div
        className={`max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
          isBot
            ? 'bg-white text-gray-800 shadow-md rounded-tl-none'
            : 'bg-purple-600 text-white shadow-md rounded-tr-none'
        }`}
      >
        <p className="text-base whitespace-pre-wrap">{message.text}</p>
      </div>
      {!isBot && <UserIcon />}
    </div>
  );
};

export default Message;
