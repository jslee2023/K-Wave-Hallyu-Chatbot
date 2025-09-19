
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-3 justify-start">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg font-bold">AI</span>
        </div>
        <div className="px-4 py-3 rounded-2xl bg-white shadow-md rounded-tl-none flex items-center space-x-1.5">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
    </div>
  );
};

export default TypingIndicator;
