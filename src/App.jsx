import React, { useState, useEffect } from 'react';
import { db } from './utils/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Search, Heart, MessageCircle, User, Home, Bell, Settings, Mic, Lock, CreditCard } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true); // عارضی طور پر ٹرو

  // 7 فرضی صارفین کا ڈیٹا
  const dummyData = [
    {id:"1", name:"عائشہ خان", city:"لاہور", age:"28", profession:"Doctor", img:"https://images.unsplash.com/photo-1594744803329-e58b31de8bf5"},
    {id:"2", name:"سارہ احمد", city:"کراچی", age:"26", profession:"Teacher", img:"https://images.unsplash.com/photo-1567532939604-b6b5b0db2604"},
    {id:"3", name:"فاطمہ علی", city:"اسلام آباد", age:"24", profession:"Designer", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330"},
    {id:"4", name:"مریم نواز", city:"سیالکوٹ", age:"27", profession:"Lawyer", img:"https://images.unsplash.com/photo-1544005313-94ddf0286df2"},
    {id:"5", name:"زینب بی بی", city:"ملتان", age:"25", profession:"Nurse", img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce"},
    {id:"6", name:"حرا مانی", city:"پشاور", age:"22", profession:"Student", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"},
    {id:"7", name:"کومل رضوی", city:"کوئٹہ", age:"28", profession:"Engineer", img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
  ];

  useEffect(() => {
    const q = query(collection(db, "profiles"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const firebaseData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // اگر فائر بیس خالی ہے تو فرضی ڈیٹا دکھاؤ، ورنہ فائر بیس کا ڈیٹا
      setProfiles(firebaseData.length > 0 ? firebaseData : dummyData);
    }, (error) => {
      console.log("Firebase Error, showing dummy data");
      setProfiles(dummyData);
    });
    return () => unsubscribe();
  }, []);

  const handleAction = () => setShowPayment(true);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-28 relative font-sans overflow-x-hidden">
      
      {/* Header */}
      <div className="bg-[#4A0E0E] p-6 pb-20 rounded-b-[60px] shadow-2xl relative border-b-2 border-[#D4AF37]/50">
        <div className="flex justify-between items-center mb-6">
           <img src="/images/Logo.png" alt="Logo" className="h-10 drop-shadow-lg" />
           <div className="flex gap-4 text-[#D4AF37]">
              <Bell size={22} />
              <User size={22} />
           </div>
        </div>
        <div className="relative">
          <input type="text" placeholder="تلاش کریں..." className="w-full p-4 pr-12 rounded-full bg-white/10 border border-[#D4AF37]/20 text-white placeholder:text-[#D4AF37]/40 outline-none" />
          <Mic className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={20} />
        </div>
      </div>

      {/* Profile Swiper */}
      <div className="px-6 -mt-12 z-10 relative h-[500px]">
        {profiles.length > 0 ? (
          <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-full h-full">
            {profiles.map((p) => (
              <SwiperSlide key={p.id} className="bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-100 p-2">
                <div className="relative h-2/3">
                  <img src={p.img} className="h-full w-full object-cover rounded-[40px]" alt={p.name} />
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md p-2 rounded-2xl flex items-center gap-1 border border-white/20">
                    <Lock size={12} className="text-[#D4AF37]" />
                    <span className="text-white text-[8px] font-bold">INFO LOCKED</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-extrabold text-[#4A0E0E] text-xl">{p.name}</h3>
                  <p className="text-gray-500 text-xs mt-1 font-bold">{p.age} سال • {p.profession} • {p.city}</p>
                  <div className="flex gap-2 mt-4">
                    <button onClick={handleAction} className="flex-1 bg-gray-100 p-3 rounded-2xl flex justify-center"><MessageCircle size={20} className="text-[#4A0E0E]"/></button>
                    <button onClick={handleAction} className="flex-[3] bg-[#4A0E0E] text-[#D4AF37] font-black rounded-2xl text-sm shadow-lg active:scale-95 transition-all">رابطہ کریں</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center p-20 text-gray-400">ڈیٹا لوڈ ہو رہا ہے...</div>
        )}
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <div className="text-center mb-6">
              <div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#D4AF37]">
                <CreditCard size={30} className="text-[#4A0E0E]" />
              </div>
              <h2 className="text-[#4A0E0E] text-2xl font-black">پریمیم اکاؤنٹ</h2>
              <p className="text-gray-500 text-sm mt-2 font-medium">فون نمبر اور مکمل ایڈریس دیکھنے کے لیے ادائیگی کریں</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-2xl border-2 border-[#D4AF37] flex justify-between items-center">
                <span className="font-bold text-[#4A0E0E]">مخصوص فیس (One Time)</span>
                <span className="text-2xl font-black text-[#D4AF37]">₨ 1,500</span>
              </div>
              <button className="w-full bg-[#4A0E0E] text-[#D4AF37] py-5 rounded-2xl font-black text-lg shadow-xl">کریڈٹ کارڈ سے ادائیگی کریں</button>
              <button onClick={() => setShowPayment(false)} className="w-full py-3 text-gray-400 font-bold text-sm">فی الحال نہیں</button>
            </div>
          </div>
        </div>
      )}

      {/* Nav Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl border border-[#D4AF37]/30 z-[100]">
        <Home className="text-[#D4AF37]" size={24}/>
        <MessageCircle onClick={handleAction} className="text-[#D4AF37]/40" size={24}/>
        <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5] shadow-lg"><Mic size={28} className="text-[#4A0E0E]" /></div>
        <Settings className="text-[#D4AF37]/40" size={24}/>
        <User className="text-[#D4AF37]/40" size={24}/>
      </div>
    </div>
  );
};

export default App;
