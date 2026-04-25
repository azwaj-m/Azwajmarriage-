import React, { useState, useRef, useEffect } from 'react';
import { Settings, Home, Heart, User, CheckCircle, MessageCircle, Send, X, Lock } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  // ایپ کی مختلف حالتیں (States)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('home'); 
  const [isPremium, setIsPremium] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);
  const swiperRef = useRef(null);

  // فرضی ڈیٹا (آپ اسے Firebase سے جوڑ سکتے ہیں)
  const users = [
    { id: 0, nickName: "سارہ احمد", age: 27, height: "5'4", religion: "اسلام", job: "ٹیچر", district: "کراچی", status: "کنواری", phone: "0300-1112223", realName: "سارہ احمد", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 1, nickName: "عائشہ خان", age: 28, height: "5'5", religion: "اسلام", job: "ڈاکٹر", district: "لاہور", status: "طلاق یافتہ", phone: "0312-4445556", realName: "عائشہ خان", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" }
  ];

  // لاگ ان اسکرین (اگر یوزر لاگ ان نہ ہو)
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#4A0E0E] flex flex-col items-center justify-center p-8 text-white text-right" dir="rtl">
        <div className="text-5xl mb-8 font-serif italic text-[#D4AF37]">Azwaj</div>
        <h2 className="text-2xl font-bold mb-6">خوش آمدید!</h2>
        <div className="w-full space-y-4">
          <input type="text" placeholder="ای میل یا فون نمبر" className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none" />
          <input type="password" placeholder="پاس ورڈ" className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none" />
          <button onClick={() => setIsLoggedIn(true)} className="w-full bg-[#D4AF37] text-[#4A0E0E] p-4 rounded-2xl font-bold text-lg shadow-lg">لاگ ان کریں</button>
          <p className="text-center text-sm opacity-60">اکاؤنٹ نہیں ہے؟ <span className="text-[#D4AF37] cursor-pointer">سائن اپ کریں</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-32 relative text-right" dir="rtl">
      
      {/* Header */}
      <div className="bg-[#4A0E0E] p-6 pb-20 rounded-b-[50px] flex justify-between items-center shadow-xl">
        <div className="text-[#D4AF37] font-bold italic text-xl">AZWAJ</div>
        <div className="flex gap-4">
          <Heart className={`cursor-pointer ${isPremium ? 'text-red-500' : 'text-[#D4AF37]'}`} onClick={() => setView('subscription')} />
          <Settings className="text-[#D4AF37] cursor-pointer" onClick={() => setView('settings')} />
        </div>
      </div>

      {/* Main Home View */}
      {view === 'home' && (
        <div className="animate-in fade-in">
          <div className="-mt-12 px-4 flex justify-center">
            <Swiper ref={swiperRef} effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-[320px] h-[450px]">
              {users.map(u => (
                <SwiperSlide key={u.id} onDoubleClick={() => setActiveProfile(u)} className="rounded-[40px] bg-white shadow-2xl border-4 border-white overflow-hidden relative">
                  <img src={u.img} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                    <h3 className="text-2xl font-bold mb-1">{u.nickName}, {u.age}</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs opacity-80">
                      <p>قد: {u.height}</p>
                      <p>مذہب: {u.religion}</p>
                      <p>ضلع: {u.district}</p>
                      <p>کاروبار: {u.job}</p>
                    </div>
                    <p className="mt-4 text-[10px] text-[#D4AF37] font-bold border border-[#D4AF37]/30 rounded-full px-3 py-1 w-fit">رابطہ کے لیے ڈبل کلک کریں</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Members List */}
          <div className="mt-10 px-6">
            <h4 className="font-bold text-[#4A0E0E] mb-4">نیو ممبرز</h4>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {users.map((u, i) => (
                <div key={i} onClick={() => swiperRef.current.swiper.slideTo(i)} className="flex-shrink-0 cursor-pointer">
                  <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] p-0.5"><img src={u.img} className="w-full h-full rounded-full object-cover" /></div>
                  <p className="text-[10px] text-center mt-1 font-bold">{u.nickName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subscription / Payment System */}
      {view === 'subscription' && (
        <div className="p-8 animate-in slide-in-from-bottom">
          <h2 className="text-2xl font-bold text-[#4A0E0E] mb-6">پریمیم پلان</h2>
          <div className="bg-white p-6 rounded-3xl border-2 border-[#D4AF37] shadow-lg relative overflow-hidden">
             <div className="absolute top-0 left-0 bg-[#D4AF37] px-4 py-1 text-xs font-bold text-[#4A0E0E] rounded-br-xl">مقبول ترین</div>
             <p className="text-xl font-bold mb-2">گولڈ ممبر شپ</p>
             <p className="text-3xl font-black text-[#4A0E0E] mb-4">Rs. 2,500 <span className="text-sm font-normal">/ ماہانہ</span></p>
             <ul className="space-y-2 text-sm text-gray-600 mb-8">
               <li>✅ تمام پروفائلز کے فون نمبرز دیکھیں</li>
               <li>✅ ان لمیٹڈ پرائیویٹ چیٹ</li>
               <li>✅ پروفائل کو سب سے اوپر دکھائیں</li>
             </ul>
             <button onClick={() => {setIsPremium(true); setView('home'); alert("آپ پریمیم ممبر بن چکے ہیں!")}} className="w-full bg-[#4A0E0E] text-[#D4AF37] p-4 rounded-2xl font-bold">ابھی خریدیں</button>
          </div>
        </div>
      )}

      {/* Profile Detail & Locked Info */}
      {activeProfile && (
        <div className="fixed inset-0 z-[600] bg-white animate-in slide-in-from-bottom">
           <div className="relative h-2/3">
              <img src={activeProfile.img} className="w-full h-full object-cover" />
              <button onClick={() => setActiveProfile(null)} className="absolute top-6 left-6 bg-black/40 text-white p-2 rounded-full"><X/></button>
           </div>
           <div className="p-8 -mt-10 bg-white rounded-t-[40px] relative shadow-2xl">
              <h2 className="text-3xl font-bold text-[#4A0E0E] mb-4">{activeProfile.nickName}</h2>
              {!isPremium ? (
                <div className="bg-gray-100 p-8 rounded-3xl text-center border-2 border-dashed border-gray-300">
                  <Lock className="mx-auto mb-3 text-gray-400" />
                  <p className="font-bold text-gray-600 mb-4 text-sm">اصل نام اور فون نمبر دیکھنے کے لیے ادائیگی لازمی ہے</p>
                  <button onClick={() => {setActiveProfile(null); setView('subscription');}} className="bg-[#4A0E0E] text-[#D4AF37] px-6 py-3 rounded-full text-sm font-bold">پلان چیک کریں</button>
                </div>
              ) : (
                <div className="space-y-4">
                   <div className="p-4 bg-gray-50 rounded-2xl flex justify-between"><span>اصل نام:</span><b>{activeProfile.realName}</b></div>
                   <div className="p-4 bg-gray-50 rounded-2xl flex justify-between font-mono"><span>فون نمبر:</span><b>{activeProfile.phone}</b></div>
                   <button className="w-full bg-green-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 mt-4"><MessageCircle/> چیٹ شروع کریں</button>
                </div>
              )}
           </div>
        </div>
      )}

      {/* Footer Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl z-[100] border border-[#D4AF37]/30">
        <Home className={`cursor-pointer ${view === 'home' ? 'text-[#D4AF37]' : 'text-white/40'}`} onClick={() => setView('home')} size={24}/>
        <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5] shadow-lg cursor-pointer" onClick={() => setView('subscription')}><Heart size={28} fill="#4A0E0E" stroke="#4A0E0E" /></div>
        <User className={`cursor-pointer ${view === 'profile' ? 'text-[#D4AF37]' : 'text-white/40'}`} onClick={() => setView('profile')} size={24}/>
      </div>
    </div>
  );
};

export default App;
