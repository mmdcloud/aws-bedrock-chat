import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      setMessages([...messages, prompt]);
      setPrompt('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 py-6 px-4 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <Sparkles className="text-indigo-500 w-6 h-6 mr-2" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Prompter
          </h1>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 flex items-center justify-center p-4 mt-20 mb-24">
        <div className="w-full max-w-4xl">
          {messages.length === 0 ? (
            <div className="text-center space-y-4 py-20">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Prompter</h2>
              <p className="text-lg text-gray-600">
                Start your journey by typing a prompt below
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="message-animation bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <p className="text-gray-800 text-lg">{msg}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Prompt bar */}
      <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm p-4 fixed bottom-0 left-0 right-0 shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type something magical..."
            className="flex-1 px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full hover:opacity-90 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Send size={20} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;