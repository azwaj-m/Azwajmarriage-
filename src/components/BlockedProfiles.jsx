import React, { useState } from 'react';
import { ArrowRight, ShieldAlert, UserCheck, UserX } from 'lucide-react';

const BlockedProfiles = ({ onBack }) => {
  // ٹیسٹنگ اور خوبصورت ڈیمو کے لیے فرضی بلاک شدہ صارفین کی لسٹ
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 'b1', name: 'عمران خان', photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80' },
    { id: 'b2', name: 'سائرا علی', photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80' }
  ]);

  // ان بلاک کرنے کا ہینڈلر
  const handleUnblock = (id, name) => {
    setBlockedUsers(prev => prev.filter(user => user.id !== id));
    alert(`${name} کو کامیابی سے ان بلاک کر دیا گیا ہے!`);
  };

  return (
    <div className="w-full min-h-screen bg-[#FFFDF9] text-[#4A0E0E] flex flex-col relative overflow-x-hidden" dir="rtl">
      
      {/* 👑 پریمیم سب ہیڈر بار */}
      <header className="bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] p-5 rounded-b-[35px] shadow-xl flex items-center gap-4 sticky top-0 z-50 border-b border-[#D4AF37]/20">
        <button 
          type="button" 
          onClick={onBack} 
          className="text-[#D4AF37] p-2 hover:bg-white/10 rounded-full transition-all active:scale-90"
        >
          <ArrowRight size={20} />
        </button>
        <div>
          <h2 className="text-sm font-black text-[#D4AF37] tracking-tight">بلاک شدہ پروفائلز مینیجر</h2>
          <p className="text-[9px] text-gray-300 font-bold mt-0.5">ان اکاؤنٹس کی فہرست جنہیں آپ نے بلاک کیا ہے</p>
        </div>
      </header>

      {/* 📜 مین کنٹینٹ لسٹ */}
      <div className="px-5 py-6 space-y-4 flex-1 overflow-y-auto no-scrollbar">
        
        {blockedUsers.length === 0 ? (
          /* خالی لسٹ کا خوبصورت پریمیم ویو */
          <div className="flex flex-col items-center justify-center p-12 bg-white border border-gray-100 rounded-[30px] shadow-xl text-center my-10 animate-fadeIn">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4 text-green-600 border border-green-100">
              <UserCheck size={26} />
            </div>
            <h4 className="text-xs font-black text-[#4A0E0E]">کوئی بلاک شدہ پروفائل موجود نہیں ہے</h4>
            <p className="text-[10px] text-gray-400 font-bold mt-1 max-w-[200px]">آپ کا اکاؤنٹ بالکل محفوظ ہے اور تمام صارفین فعال ہیں۔</p>
          </div>
        ) : (
          /* بلاک شدہ صارفین کی لسٹ */
          <div className="space-y-3">
            <p className="text-[10px] font-black text-gray-400 mb-2 px-1">کل بلاک شدہ افراد: ({blockedUsers.length})</p>
            
            {blockedUsers.map((user) => (
              <div 
                key={user.id} 
                className="bg-white border border-gray-100 p-3.5 rounded-2xl shadow-md flex items-center justify-between transition-all hover:border-red-100 animate-fadeIn text-right"
              >
                {/* بائیں طرف: تصویر اور نام */}
                <div className="flex items-center gap-3">
                  <img 
                    src={user.photoURL} 
                    alt={user.name} 
                    className="w-11 h-11 rounded-xl object-cover border border-[#D4AF37]/20 shadow-xs" 
                  />
                  <div>
                    <h4 className="font-black text-[#4A0E0E] text-xs">{user.name}</h4>
                    <p className="text-[9px] text-red-500 font-bold flex items-center gap-0.5 mt-0.5">
                      <UserX size={10} /> بلاک شدہ ممبر
                    </p>
                  </div>
                </div>

                {/* دائیں طرف: پریمیم ان بلاک بٹن */}
                <button 
                  type="button"
                  onClick={() => handleUnblock(user.id, user.name)}
                  className="text-[10px] font-black bg-[#F5E6D3]/40 hover:bg-[#4A0E0E] text-[#4A0E0E] hover:text-[#D4AF37] px-4 py-2 rounded-xl transition-all border border-[#D4AF37]/20 shadow-xs active:scale-95"
                >
                  ان بلاک کریں
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 🛡️ پرو ٹپ الرٹ کارڈ */}
        <div className="p-4 bg-amber-50/50 border border-amber-200/40 rounded-2xl flex items-start gap-3 mt-6 text-right">
          <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-[11px] font-black text-amber-800">حفاظتی مینو</h5>
            <p className="text-[9px] font-bold text-amber-700/80 leading-relaxed mt-0.5">
              کسی بھی پروفائل کو ان بلاک کرنے کے بعد وہ دوبارہ آپ کو ہوم اسکرین پر نظر آنے لگیں گے اور آپ کو پیغامات بھیج سکیں گے۔
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlockedProfiles;
