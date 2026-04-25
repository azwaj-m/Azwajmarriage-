import React, { useState } from 'react';
import { Settings, Home, Heart, User, Lock, CheckCircle } from 'lucide-react';
import ProfileSettings from './components/ProfileSettings';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [isPremium, setIsPremium] = useState(false); // ادائیگی کی صورتحال
  const [activeProfile, setActiveProfile] = useState(null);

  const users = [
    { id: 1, nickName: "سارہ", age: 27, height: "5'4", religion: "اسلام", job: "ٹیچر", district: "کراچی", status: "کنواری", phone: "0300-1234567", realName: "سارہ احمد", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 2, nickName: "عائشہ", age: 28, height: "5'5", religion: "اسلام", job: "ڈاکٹر", district: "لاہور", status: "طلاق یافتہ", phone: "0312-7654321", realName: "عائشہ خان", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
  ];

  const handleDoubleClick = (user) => {
    if (!isPremium) {
      alert("باقی معلومات دیکھنے کے لیے ادائیگی (Premium) لازمی ہے!");
    } else {
      setActiveProfile(user);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-32 relative font-sans text-right" dir="rtl">
      {/* Header */}
      <div className="bg-[#4A0E0E] p-6 pb-20 rounded-b-[50px] flex justify-between items-center shadow-xl">
        <div className="text-[#D4AF37] font-bold italic text-xl">AZWAJ</div>
        <Settings className="text-[#D4AF37] cursor-pointer" onClick={() => setShowSettings(true)} />
      </div>

      {/* Main Swiper Cards */}
      <div className="-mt-12 px-4">
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-[300px] h-[420px]">
          {users.map(u => (
            <SwiperSlide key={u.id} onDoubleClick={() => handleDoubleClick(u)} className="rounded-[30px] bg-white shadow-2xl border-4 border-white overflow-hidden relative">
              <img src={u.img} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 mb-1">
                   <h3 className="text-2xl font-black">{u.nickName}, {u.age}</h3>
                   <CheckCircle size={16} className="text-blue-400" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs opacity-90">
                  <span>ہائٹ: {u.height}</span>
                  <span>مذہب: {u.religion}</span>
                  <span>کاروبار: {u.job}</span>
                  <span>ضلع: {u.district}</span>
                </div>
                <p className="mt-3 text-[10px] text-[#D4AF37]">مزید معلومات کے لیے ڈبل کلک کریں</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Horizontal List of Members */}
      <div className="mt-8 px-6">
        <h4 className="text-[#4A0E0E] font-bold mb-4 border-r-4 border-[#D4AF37] pr-2 text-sm">تمام ممبرز</h4>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {users.map(u => (
            <div key={u.id} className="flex-shrink-0 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] p-0.5">
                <img src={u.img} className="w-full h-full rounded-full object-cover" />
              </div>
              <p className="text-[10px] mt-1 font-bold text-gray-700">{u.nickName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full Profile View (After Double Click & Payment) */}
      {activeProfile && (
        <div className="fixed inset-0 z-[600] bg-white p-8 animate-in fade-in slide-in-from-bottom">
          <button onClick={() => setActiveProfile(null)} className="text-2xl mb-6">×</button>
          <h2 className="text-2xl font-bold text-[#4A0E0E] mb-6">مکمل پروفائل</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
               <p className="text-gray-500 text-xs">اصل نام</p>
               <p className="font-bold">{activeProfile.realName}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
               <p className="text-gray-500 text-xs">فون نمبر</p>
               <p className="font-bold">{activeProfile.phone}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
               <p className="text-gray-500 text-xs">ازواجی حیثیت</p>
               <p className="font-bold">{activeProfile.status}</p>
            </div>
          </div>
          <button className="w-full mt-10 bg-[#4A0E0E] text-[#D4AF37] p-4 rounded-2xl font-bold">رابطہ کریں</button>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl z-[100]">
        <Home className="text-[#D4AF37]" size={24}/>
        <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5] shadow-lg" onClick={()=>setIsPremium(true)}><Heart size={28} fill="#4A0E0E" /></div>
        <User className="text-[#D4AF37]/40" size={24}/>
      </div>

      {showSettings && (
        <div className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-md flex items-end">
          <div className="w-full bg-white rounded-t-[40px] relative">
            <button onClick={() => setShowSettings(false)} className="absolute top-4 left-6 text-2xl text-gray-400">×</button>
            <ProfileSettings />
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
