import React, { useState } from 'react';
import { Send, ArrowRight } from 'lucide-react';

const ChatWindow = ({ activeChat, onBack }) => {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'السلام علیکم! کیا آپ بات کرنے کے لیے دستیاب ہیں؟', sender: 'them', time: '02:15 PM' }
  ]);

  const send = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'me', time: 'ابھی' }]);
    setMsg('');
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* ہیڈر */}
      <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ArrowRight className="w-5 h-5 text-gray-600" />
        </button>
        <span className="font-bold text-gray-800">{activeChat?.fullName || 'عائشہ خان'}</span>
        <div className="w-8"></div>
      </div>

      {/* پیغامات */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col justify-end">
        {messages.map(m => (
          <div 
            key={m.id} 
            className={`max-w-[75%] p-3 rounded-2xl text-xs ${
              m.sender === 'me' 
                ? 'bg-rose-500 text-white self-end rounded-tr-none' 
                : 'bg-white text-gray-700 self-start rounded-tl-none border border-gray-100'
            }`}
          >
            <p className="text-right">{m.text}</p>
            <span className={`block text-[9px] mt-1 text-right ${m.sender === 'me' ? 'text-white/80' : 'text-gray-400'}`}>
              {m.time}
            </span>
          </div>
        ))}
      </div>

      {/* ان پٹ */}
      <form onSubmit={send} className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <button type="submit" className="p-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all">
          <Send className="w-4 h-4 rotate-180" />
        </button>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="پیغام لکھیں..."
          className="flex-1 bg-gray-50 text-right px-4 py-2 rounded-xl text-xs focus:outline-none border border-transparent focus:border-rose-300 focus:bg-white"
        />
      </form>
    </div>
  );
};

export default ChatWindow;
