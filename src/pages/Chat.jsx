import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Send, Plus, Smile, Phone, MoreVertical, ChevronLeft,
  ShieldCheck, Image, FileText, MapPin, Eye, Trash2, ShieldAlert
} from 'lucide-react';

const Chat = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [message, setMessage] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const chatEndRef = useRef(null);

  // لائیو چیٹ پیغامات کی اسٹیٹ
  const [chatData, setChatData] = useState([
    { id: 1, text: "السلام علیکم! امید ہے آپ خیریت سے ہوں گے۔", time: "09:30 AM", isSender: false, type: 'text' },
    { id: 2, text: "وعلیکم السلام! میں بالکل ٹھیک ہوں، شکریہ۔ آپ سنائیں؟", time: "09:31 AM", isSender: true, type: 'text' },
    { id: 3, text: "الحمدللہ، میں بھی ٹھیک ہوں۔ آپ سے رابطہ کر کے خوشی ہوئی۔", time: "09:32 AM", isSender: false, type: 'text' },
    { id: 4, text: "مجھے بھی بہت خوشی ہوئی۔ کیا آپ میرے بارے میں مزید جاننا چاہیں گی؟", time: "09:33 AM", isSender: true, type: 'text' },
  ]);

  const imageInputRef = useRef(null);
  const docInputRef = useRef(null);

  // لائیو اسکرولنگ گارڈ
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  // پیغام بھیجنے کا فلو
  const handleSend = (textToSend = message, type = 'text', metaData = null) => {
    const trimmed = textToSend?.trim();
    if (!trimmed && !metaData) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: Date.now(),
      text: type === 'text' ? trimmed : '',
      time: currentTime,
      isSender: true,
      type: type,
      ...metaData
    };

    setChatData(prev => [...prev, newMsg]);
    if (type === 'text') setMessage('');
    setShowAttachmentMenu(false);
  };

  // لائیو لوکیشن حاصل کرنا اور بھیجنا
  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert("آپ کا موبائل براؤزر لوکیشن شیئرنگ سپورٹ نہیں کرتا۔");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // نقشے کا یو آر ایل بالکل درست کر دیا گیا ہے
        const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        handleSend("میری موجودہ لوکیشن", 'location', { mapUrl });
      },
      (error) => {
        alert("لوکیشن حاصل کرنے کی اجازت حاصل نہیں ہو سکی۔ برائے مہربانی GPS آن کریں یا موبائل سیٹنگز چیک کریں۔");
      }
    );
  };

  // فائل اور تصویر اٹیچمنٹ کو لوکل لیول پر لائیو کرنا
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'image') {
        handleSend(file.name, 'image', { fileData: reader.result });
      } else {
        handleSend(file.name, 'document', { fileName: file.name, fileSize: (file.size / 1024).toFixed(1) + ' KB' });
      }
    };
    reader.readAsDataURL(file);
  };

  // ہیڈر کے فون اور مینو ایکشنز
  const handlePhoneCall = () => {
    alert("رابطہ نمبر: 0300-1234567\nبراہ راست کال ملانے کے لیے پریمیم ممبرشپ حاصل کریں۔");
  };

  const handleClearChat = () => {
    if (window.confirm("کیا آپ اس چیٹ کی تمام ہسٹری حذف کرنا چاہتے ہیں؟")) {
      setChatData([]);
    }
    setShowHeaderMenu(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#FDF5F5] animate-in fade-in duration-500 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ۱۔ چیٹ ہیڈر */}
      <div className="bg-[#4A0E0E] p-4 flex items-center justify-between shadow-lg z-30 relative flex-shrink-0">
        <div className="flex items-center gap-3">
          <ChevronLeft className={`text-[#D4AF37] cursor-pointer active:scale-90 transition ${isRTL ? 'rotate-180' : ''}`} />
          <div className="relative">
            <div className="w-11 h-11 rounded-full border-2 border-[#D4AF37] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Aisha" className="w-full h-full object-cover" />
            </div>
            <div className={`absolute bottom-0 ${isRTL ? 'left-0' : 'right-0'} w-3 h-3 bg-green-500 border-2 border-[#4A0E0E] rounded-full`}></div>
          </div>
          <div className="text-right">
            <h2 className="text-white font-black text-xs">عائشہ خان (Aisha Khan)</h2>
            <p className="text-[#D4AF37] text-[9px] font-bold">28, ڈاکٹر • لائیو</p>
          </div>
        </div>

        {/* ہیڈر بٹنز اور ایکشن مینو */}
        <div className="flex gap-3 text-[#D4AF37] relative">
          <button 
            onClick={handlePhoneCall} 
            className="p-2 bg-white/10 rounded-full active:scale-95 hover:bg-white/20 transition-all"
          >
            <Phone size={18} />
          </button>
          <button 
            onClick={() => setShowHeaderMenu(!showHeaderMenu)} 
            className="p-2 bg-white/10 rounded-full active:scale-95 hover:bg-white/20 transition-all"
          >
            <MoreVertical size={18} />
          </button>

          {/* ہیڈر مینو پاپ اپ */}
          {showHeaderMenu && (
            <div className={`absolute top-12 ${isRTL ? 'left-0' : 'right-0'} w-44 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 text-right text-xs text-gray-700 animate-in fade-in duration-150`}>
              <button 
                onClick={handleClearChat}
                className="w-full p-2.5 hover:bg-red-50 text-red-600 rounded-xl flex items-center gap-2 justify-end font-bold"
              >
                <span>چیٹ صاف کریں</span>
                <Trash2 size={14} />
              </button>
              <button 
                onClick={() => { alert("پروفائل رپورٹ درج کر دی گئی ہے!"); setShowHeaderMenu(false); }}
                className="w-full p-2.5 hover:bg-gray-50 rounded-xl flex items-center gap-2 justify-end font-bold text-gray-600"
              >
                <span>رپورٹ کریں</span>
                <ShieldAlert size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ۲۔ چیٹ ایریا */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-32">
        
        {/* سیکیورٹی نوٹس */}
        <div className="bg-[#FFF3E0] border border-[#FFE0B2] p-3 rounded-2xl flex items-center gap-3 mx-2 mb-4 shadow-sm text-right">
          <div className="bg-[#4A0E0E] p-2 rounded-xl text-[#D4AF37]">
            <ShieldCheck size={20} />
          </div>
          <p className="text-[10px] text-[#4A0E0E] leading-tight flex-1">
            یہ چیٹ مکمل طور پر محفوظ اور تصدیق شدہ ہے۔ <br />
            <span className="font-bold">برائے مہربانی خوش اخلاقی کا مظاہرہ کریں اور قواعد کا احترام کریں۔</span>
          </p>
        </div>

        <div className="text-center">
          <span className="bg-gray-200/60 text-gray-500 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">آج</span>
        </div>

        {/* لائیو پیغامات کی فہرست */}
        {chatData.map((msg) => {
          const isMe = msg.isSender;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-2`}>
              {!isMe && (
                <div className="w-8 h-8 rounded-full border border-[#D4AF37] overflow-hidden mb-1 flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="avatar" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="max-w-[75%] space-y-1">

                {/* ٹیکسٹ میسیج رینڈر ہونا */}
                {(!msg.type || msg.type === 'text') && (
                  <div className={`p-4 rounded-3xl text-[13px] shadow-sm font-semibold leading-relaxed ${
                    isMe
                    ? 'bg-[#4A0E0E] text-white rounded-br-none text-right'
                    : 'bg-white text-[#4A0E0E] rounded-bl-none border border-gray-100 text-right'
                  }`}>
                    {msg.text}
                  </div>
                )}

                {/* لائیو امیج اٹیچمنٹ رینڈر ہونا */}
                {msg.type === 'image' && (
                  <div className="rounded-3xl overflow-hidden border-4 border-white shadow-md max-w-[220px]">
                    <img src={msg.fileData} alt="Shared attachment" className="w-full h-auto object-cover max-h-60" />
                  </div>
                )}

                {/* پی ڈی ایف دستاویز اٹیچمنٹ رینڈر ہونا */}
                {msg.type === 'document' && (
                  <div className={`p-3 rounded-3xl flex items-center gap-3 border shadow-sm ${
                    isMe ? 'bg-[#4A0E0E] text-white text-right' : 'bg-white text-[#4A0E0E] border-gray-100 text-right'
                  }`} dir="rtl">
                    <div className="bg-[#D4AF37]/20 p-2.5 rounded-2xl text-[#D4AF37]">
                      <FileText size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-black truncate max-w-[120px]">{msg.fileName}</p>
                      <p className="text-[9px] text-gray-400 font-bold">{msg.fileSize}</p>
                    </div>
                  </div>
                )}

                {/* لوکیشن شیئرنگ رینڈر ہونا */}
                {msg.type === 'location' && (
                  <div className={`p-3.5 rounded-3xl border shadow-md flex flex-col gap-2 ${
                    isMe ? 'bg-[#4A0E0E] text-white text-right' : 'bg-white text-[#4A0E0E] text-right'
                  }`} dir="rtl">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-emerald-500" />
                      <span className="text-[11px] font-black">میری موجودہ لوکیشن</span>
                    </div>
                    <a
                      href={msg.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 bg-[#D4AF37] text-[#4A0E0E] py-2 px-4 rounded-2xl text-[9px] font-black tracking-wider shadow-sm hover:opacity-90 active:scale-95 transition"
                    >
                      <Eye size={12} /> نقشہ کھولیں
                    </a>
                  </div>
                )}

                <p className={`text-[9px] text-gray-400 px-2 ${isMe ? 'text-left' : 'text-right'}`}>
                  {msg.time} {isMe && <span className="text-blue-500 ml-1">✓✓</span>}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* ۳۔ ان پٹ بار اور پاپ اپ مینو */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-white border-t border-gray-100 flex flex-col gap-3 shadow-[0_-4px_15px_rgba(0,0,0,0.06)] z-20">
        
        {/* مخفی ان پٹ ایلیمنٹس */}
        <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
        <input type="file" ref={docInputRef} className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={(e) => handleFileChange(e, 'doc')} />

        {/* اٹیچمنٹ پینل (درست شدہ پوزیشننگ اور ہائی زیڈ انڈیکس) */}
        {showAttachmentMenu && (
          <div className="flex justify-around items-center bg-[#FDF5F5] border border-gray-100 p-4 rounded-3xl shadow-inner animate-in slide-in-from-bottom-4 duration-200 z-50" dir="rtl">
            
            {/* گیلری بٹن */}
            <button
              onClick={() => { imageInputRef.current.click(); }}
              className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
            >
              <div className="bg-blue-50 text-blue-500 p-3.5 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Image size={20} />
              </div>
              <span className="text-[9px] font-black text-gray-600">تصویر شیئر کریں</span>
            </button>

            {/* لوکیشن بٹن */}
            <button
              onClick={handleShareLocation}
              className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
            >
              <div className="bg-emerald-50 text-emerald-500 p-3.5 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <MapPin size={20} />
              </div>
              <span className="text-[9px] font-black text-gray-600">لوکیشن بھیجیں</span>
            </button>

            {/* ڈاکومنٹ بٹن */}
            <button
              onClick={() => { docInputRef.current.click(); }}
              className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
            >
              <div className="bg-amber-50 text-amber-500 p-3.5 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <FileText size={20} />
              </div>
              <span className="text-[9px] font-black text-gray-600">دکومنٹ بھیجیں</span>
            </button>
          </div>
        )}

        {/* مرکزی ان پٹ رو */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
            className={`p-2.5 rounded-full active:scale-95 transition-all z-50 ${
              showAttachmentMenu ? 'bg-[#D4AF37] text-[#4A0E0E]' : 'bg-[#4A0E0E] text-[#D4AF37]'
            }`}
          >
            <Plus size={22} className={`transform transition-transform duration-200 ${showAttachmentMenu ? 'rotate-45' : ''}`} />
          </button>

          <div className="flex-1 bg-gray-50 rounded-full flex items-center px-4 border border-gray-200 focus-within:border-[#D4AF37] transition-all">
            <input
              type="text"
              placeholder={isRTL ? "پیغام لکھیں..." : "Type a message..."}
              className="w-full bg-transparent py-3 text-xs font-semibold focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(message, 'text')}
            />
            <button className="text-gray-400 hover:text-[#4A0E0E] p-1">
              <Smile size={18} />
            </button>
          </div>

          <button
            onClick={() => handleSend(message, 'text')}
            className="bg-[#4A0E0E] text-[#D4AF37] p-3 rounded-full shadow-lg active:scale-90 transition-all hover:opacity-95"
          >
            <Send size={18} className={isRTL ? "rotate-180" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

export const sendMessage = (message, senderId, receiverId) => {
  return {
    id: Date.now(),
    text: message,
    senderId,
    receiverId,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'sent'
  };
};

export const getDummyMessages = () => [
  { id: 1, text: "السلام علیکم! کیسے ہیں آپ؟", senderId: 'other', timestamp: '10:00 AM' },
  { id: 2, text: "وعلیکم السلام، میں ٹھیک ہوں۔ آپ سنائیں؟", senderId: 'me', timestamp: '10:01 AM' },
  { id: 3, text: "الحمدللہ، میں نے آپ کا پروفائل دیکھا، کافی متاثر کن ہے۔", senderId: 'other', timestamp: '10:02 AM' },
];
