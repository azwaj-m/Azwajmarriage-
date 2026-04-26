import React, { useState, useEffect } from 'react';
import { Send, ArrowLeft, MoreVertical } from 'lucide-react';
import { db } from '../utils/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

const ChatWindow = ({ chatId, senderId, recipientName, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("time", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: newMessage,
      senderId,
      time: serverTimestamp()
    });
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 bg-white z-[300] flex flex-col" dir="rtl">
      <header className="bg-[#4A0E0E] p-4 flex items-center justify-between text-[#D4AF37]">
        <div className="flex items-center gap-3">
          <ArrowLeft onClick={onClose} className="cursor-pointer" />
          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]"></div>
          <div><h4 className="font-bold">{recipientName}</h4><p className="text-[10px] opacity-60">آن لائن</p></div>
        </div>
        <MoreVertical size={20} />
      </header>

      <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#FDF5F5]">
        {messages.map((msg) => (
          <div key={msg.id} className={`max-w-[80%] p-3 rounded-2xl ${msg.senderId === senderId ? 'bg-[#4A0E0E] text-white self-start' : 'bg-white text-gray-800 self-end border shadow-sm'}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t flex items-center gap-2">
        <input value={newMessage} onChange={e => setNewMessage(e.target.value)} type="text" placeholder="پیغام لکھیں..." className="flex-grow p-3 bg-gray-50 rounded-full outline-none" />
        <button onClick={handleSend} className="bg-[#4A0E0E] p-3 rounded-full text-[#D4AF37]"><Send size={20} /></button>
      </div>
    </div>
  );
};

export default ChatWindow;
