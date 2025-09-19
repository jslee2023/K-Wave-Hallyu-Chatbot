
import React from 'react';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl h-[90vh] flex flex-col">
        <header className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white shadow-md">🌊 한류 챗봇 (Hallyu Chatbot) 🎤</h1>
          <p className="text-white/90 text-lg mt-1">K-Pop, K-Drama, and more!</p>
        </header>
        <ChatWindow />
      </div>
    </div>
  );
};

export default App;
