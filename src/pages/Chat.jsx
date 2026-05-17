import React, { useState } from 'react';
import { CheckCheck, Search, SlidersHorizontal, ArrowRight, Send, Phone, Video, Circle } from 'lucide-react';

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null); // null = لسٹ دکھائے گا، profile = پرسنل چیٹ روم کھولے گا
  const [searchQuery, setSearchQuery] = useState('');
  const [typedMessage, setTypedMessage] = useState('');

  // ڈیمو کے لیے واٹس ایپ اسٹائل رائل چیٹ لسٹ ڈیٹا
  const [chats, setChats] = useState([
    { id: 'c1', fullName: 'عائشہ خان', profession: 'ڈاکٹر', age: 28, photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', lastMessage: 'میں نے تفصیلات پڑھ لی ہیں...', time: '09:36 AM', unread: 0, isOnline: true },
    { id: 'c2', fullName: 'فاطمہ احمد', profession: 'ٹیچر', age: 26, photoURL: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', lastMessage: 'کیا آپ کی فیملی اس اتوار کو دستیاب ہے؟', time: '09:38 AM', unread: 2, isOnline: false },
    { id: 'c3', fullName: 'بلال شیخ', profession: 'سافٹ ویئر انجینئر', age: 30, photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', lastMessage: 'جی بہتر، میں شام کو بات کرتا ہوں۔', time: '09:33 AM', unread: 0, isOnline: true },
    { id: 'c4', fullName: 'سائرہ علی', profession: 'بینکر', age: 27, photoURL: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100', lastMessage: 'تصویر شیئر کرنے کا شکریہ۔', time: 'Yesterday', unread: 0, isOnline: false }
  ]);

  // پرسنل چیٹ کے فرضی میسجز کی اسٹیٹ
  const [messages, setMessages] = useState([
    { id: 1, text: 'السلام علیکم، میں نے آپ کی پروفائل دیکھی۔', sender: 'them', time: '09:30 AM' },
    { id: 2, text: 'وعلیکم السلام، جی بہت شکریہ۔ آپ کیا کرتے ہیں؟', sender: 'me', time: '09:32 AM' },
    { id: 3, text: 'میں پروفیشنل ڈاکٹر ہوں کراچی سے۔', sender: 'them', time: '09:35 AM' }
  ]);

  // نیا میسج بھیجنے کا ہینڈلر
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: typedMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    
    // چیٹ لسٹ میں آخری میسج اپڈیٹ کریں
    setChats(prev => prev.map(c => c.id === activeChat.id ? { ...c, lastMessage: typedMessage, time: 'Now' } : c));
    setTypedMessage('');
  };

  // 1️⃣ ویو اے: اگر کسی کی چیٹ اوپن ہو (Personal Chat Screen)
  if (activeChat) {
    return (
      <div className="w-full h-full bg-[#FFFDF9] flex flex-col fixed inset-0 z-50 max-w-md mx-auto" dir="rtl">
        {/* واٹس ایپ اسٹائل پریمیم چیٹ ہیڈر */}
        <header className=" from-[#4A0E0E] to-[#3D0A0A] p-4 flex items-center justify-between border-b border-[#D4AF37]/20 shadow-md">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setActiveChat(null)} className="text-[#D4AF37] p-1 hover:bg-transparent/10 rounded-full">
              <ArrowRight size={22} />
            </button>
            <div className="relative">
              <img src={activeChat.photoURL} alt="" className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/30" />
              {activeChat.isOnline && <Circle size={10} className="absolute bottom-0 right-0 fill-green-500 text-green-500" />}
            </div>
            <div className="text-right">
              <h4 className="text-xs font-black text-[#D4AF37]">{activeChat.fullName}</h4>
              <p className="text-[9px] text-gray-300 font-bold">{activeChat.isOnline ? 'آن لائن' : 'آف لائن'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[#D4AF37]">
            <Phone size={16} className="cursor-pointer active:scale-90" />
            <Video size={17} className="cursor-pointer active:scale-90" />
          </div>
        </header>

        {/* میسجز کی لسٹ اسکرین */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5E6D3]/10 no-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[75%] p-3 rounded-2xl text-xs font-bold shadow-xs relative ${
                msg.sender === 'me' 
                  ? 'bg-[#4A0E0E] text-[#FFFDF9] rounded-tr-none' 
                  : 'bg-transparent text-[#4A0E0E] border border-gray-100 rounded-tl-none'
              }`}>
                <p className="leading-relaxed">{msg.text}</p>
                <div className="text-[8px] mt-1 text-left opacity-70 flex items-center justify-end gap-0.5">
                  {msg.time} {msg.sender === 'me' && <CheckCheck size={10} className="text-[#D4AF37]" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* واٹس ایپ ان پٹ میسج بار */}
        <form onSubmit={handleSendMessage} className="p-3 bg-transparent border-t border-gray-100 flex items-center gap-2 sticky bottom-0">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            placeholder="پیغام ٹائپ کریں..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-[#4A0E0E] font-bold focus:outline-hidden focus:border-[#4A0E0E]"
          />
          <button type="submit" className="p-2.5 bg-[#4A0E0E] text-[#D4AF37] rounded-xl shadow-md active:scale-95 transition-all">
            <Send size={16} className="rotate-180" />
          </button>
        </form>
      </div>
    );
  }

  // 2️⃣ ویو بی: واٹس ایپ چیٹ لسٹ (Main Screen View)
  return (
    <div className="w-full h-full bg-[#FFFDF9] flex flex-col" dir="rtl">
      {/* لائیو چیٹ ٹائٹل بار (ہیڈر ختم کرنے کی وجہ سے اب یہ خود مختار ہے) */}
      <div className="p-5  from-[#4A0E0E] to-[#3D0A0A] rounded-b-[35px] shadow-lg">
        <h2 className="text-center text-sm font-black text-[#D4AF37] tracking-wider uppercase">لائیو بات چیت (Chats)</h2>
      </div>

      {/* سرچ بار اور فلٹر */}
      <div className="px-4 pt-4 flex items-center gap-2">
        <div className="flex-1 bg-transparent border border-gray-100 rounded-xl px-3 py-2 flex items-center gap-2 shadow-xs">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="چیٹ تلاش کریں..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-[#4A0E0E] focus:outline-hidden text-right"
          />
        </div>
        <button type="button" className="p-2.5 bg-transparent border border-gray-100 rounded-xl text-[#4A0E0E] shadow-xs active:scale-95">
          <SlidersHorizontal size={14} />
        </button>
      </div>

      {/* چیٹس لسٹ مینیو */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5 no-scrollbar">
        <h3 className="text-[11px] font-black text-gray-400 px-1 mb-1">حالیہ پیغامات (Chat List)</h3>
        
        {chats.filter(c => c.fullName.includes(searchQuery)).map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            className="bg-transparent border border-gray-50 p-3.5 rounded-2xl shadow-xs flex items-center justify-between cursor-pointer active:scale-99 hover:border-[#D4AF37]/20 transition-all text-right"
          >
            {/* تصویر اور ٹیکسٹ معلومات */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={chat.photoURL} alt="" className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-xs" />
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -left-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white animate-pulse" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-black text-[#4A0E0E] text-xs">{chat.fullName}</h4>
                  <span className="text-[9px] text-gray-400 font-bold">({chat.age} سال • {chat.profession})</span>
                </div>
                <p className="text-[10px] text-gray-500 font-bold mt-1 max-w-[180px] truncate">{chat.lastMessage}</p>
              </div>
            </div>

            {/* ٹائم اور ان ریڈ کاؤنٹ */}
            <div className="flex flex-col items-end gap-2">
              <span className="text-[9px] font-bold text-gray-400">{chat.time}</span>
              {chat.unread > 0 ? (
                <span className="bg-[#4A0E0E] text-[#D4AF37] text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
                  {chat.unread}
                </span>
              ) : (
                <CheckCheck size={12} className="text-gray-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
