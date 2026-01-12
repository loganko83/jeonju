import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateSupportResponse } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'USER' | 'BOT';
}

const Support: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', text: '안녕하세요! 전주사랑상품권 AI 상담사입니다. 무엇을 도와드릴까요?', sender: 'BOT' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'USER' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const reply = await generateSupportResponse(input);
    
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: reply, sender: 'BOT' }]);
    setLoading(false);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Bot className="text-teal-600" /> AI 상담
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${
              msg.sender === 'USER' 
                ? 'bg-teal-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-500 rounded-2xl rounded-tl-none p-3 text-sm shadow-sm border border-gray-100 flex gap-1">
               <span className="animate-bounce">●</span>
               <span className="animate-bounce delay-100">●</span>
               <span className="animate-bounce delay-200">●</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100 pb-24">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="궁금한 점을 물어보세요..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-teal-600 text-white p-3 rounded-full hover:bg-teal-700 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;
