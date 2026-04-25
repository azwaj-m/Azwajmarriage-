import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from './utils/firebase';
import { ref, push, onValue, serverTimestamp, set } from 'firebase/database';
import { MessageCircle, ShieldAlert, Send, X } from 'lucide-react';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [activeChat, setActiveChat] = useState(null); // Selected profile for chat

  // نامناسب الفاظ کی لسٹ (Admin Monitoring)
  const forbiddenWords = ['بدتمیز', 'گالی', 'فراڈ', 'نمبر دو'];

  useEffect(() => {
    if (activeChat && auth.currentUser) {
      const chatId = [auth.currentUser.uid, activeChat.id].sort().join('_');
      const chatRef = ref(db, 'chats/' + chatId + '/messages');
      
      // میسجز کو ریئل ٹائم سنک کرنا
      const unsubscribe = onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMessages(Object.values(data));
        }
      });

      // چیک کریں کہ کیا ایڈمن نے بلاک تو نہیں کیا
      const blockRef = ref(db, 'blocked_users/' + auth.currentUser.uid);
      onValue(blockRef, (snap) => setIsBlocked(snap.exists()));

      return () => unsubscribe();
    }
  }, [activeChat]);

  const sendMessage = async () => {
    if (input.trim() === '' || isBlocked) return;

    // خودکار نگرانی (Auto-Monitoring)
    const hasViolation = forbiddenWords.some(word => input.includes(word));
    const chatId = [auth.currentUser.uid, activeChat.id].sort().join('_');

    const newMessage = {
      text: input,
      sender: auth.currentUser.uid,
      senderName: auth.currentUser.displayName || "User",
      timestamp: serverTimestamp(),
      flagged: hasViolation // اگر غلط لفظ ہو تو فلیگ کر دیں
    };

    if (hasViolation) {
      alert("تنبیہ: آپ کا پیغام نامناسب الفاظ کی وجہ سے ایڈمن کو رپورٹ کر دیا گیا ہے!");
      // ایڈمن الرٹ سسٹم میں ڈیٹا بھیجنا
      await set(ref(db, 'alerts/' + Date.now()), {
        user: auth.currentUser.uid,
        content: input,
        type: 'inappropriate_language'
      });
    }

    await push(ref(db, 'chats/' + chatId + '/messages'), newMessage);
    setInput('');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 font-sans" dir="rtl">
      {/* اگر چیٹ ایکٹیو ہو تو یہ ونڈو کھلے گی */}
      {activeChat && (
        <div className="fixed inset-0 z-[700] bg-white flex flex-col">
          {/* Chat Header */}
          <div className="bg-[#4A0E0E] p-4 text-[#D4AF37] flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <img src={activeChat.img} className="w-10 h-10 rounded-full border border-[#D4AF37]" />
              <div>
                <p className="font-bold">{activeChat.nickName}</p>
                <p className="text-[10px] text-green-400">آن لائن</p>
              </div>
            </div>
            <X onClick={() => setActiveChat(null)} className="cursor-pointer" />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDF5F5]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === auth.currentUser?.uid ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                  m.flagged ? 'bg-red-100 border border-red-300 text-red-800' : 
                  m.sender === auth.currentUser?.uid ? 'bg-[#4A0E0E] text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'
                }`}>
                  <p className="text-sm">{m.text}</p>
                  {m.flagged && <span className="text-[9px] flex items-center gap-1 mt-1"><ShieldAlert size={10}/> ایڈمن کی زیر نگرانی</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t flex gap-2">
            <input 
              disabled={isBlocked}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isBlocked ? "آپ کو بلاک کر دیا گیا ہے" : "پیغام لکھیں..."} 
              className="flex-1 p-3 bg-gray-100 rounded-xl outline-none text-sm"
            />
            <button 
              onClick={sendMessage}
              disabled={isBlocked}
              className="bg-[#4A0E0E] text-[#D4AF37] p-3 rounded-xl active:scale-95 transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
      
      <div className="p-10 text-center">
        <h1 className="text-[#4A0E0E] font-bold">براہ کرم کسی پروفائل پر ڈبل کلک کریں</h1>
        <p className="text-xs text-gray-500 mt-2">چیٹ سسٹم اب ایڈمن پینل (دوسری ریپو) سے منسلک ہے</p>
      </div>
    </div>
  );
};

export default App;
