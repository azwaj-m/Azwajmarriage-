import React, { useState, useEffect } from 'react';
import { db, auth } from './utils/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Search, Heart, MessageCircle, User, Home, Bell, Settings, CreditCard } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [profiles, setProfiles] = useState([]);
  
  // فرضی 7 صارفین کا ڈیٹا
  const dummyProfiles = [
    {id:"d1", name:"عائشہ خان", city:"لاہور", age:"24", profession:"Doctor", img:"https://images.unsplash.com/photo-1594744803329-e58b31de8bf5"},
    {id:"d2", name:"سارہ احمد", city:"کراچی", age:"26", profession:"Teacher", img:"https://images.unsplash.com/photo-1567532939604-b6b5b0db2604"},
    {id:"d3", name:"فاطمہ علی", city:"اسلام آباد", age:"23", profession:"Designer", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330"},
    {id:"d4", name:"زینب بی بی", city:"ملتان", age:"25", profession:"Nurse", img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce"},
    {id:"d5", name:"مریم نواز", city:"سیالکوٹ", age:"27", profession:"Lawyer", img:"https://images.unsplash.com/photo-1544005313-94ddf0286df2"},
    {id:"d6", name:"حرا مانی", city:"پشاور", age:"22", profession:"Student", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"},
    {id:"d7", name:"کومل رضوی", city:"کوئٹہ", age:"28", profession:"Engineer", img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
  ];

  useEffect(() => {
    const q = query(collection(db, "profiles"));
    const unsubscribe = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setProfiles(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setProfiles(dummyProfiles);
      }
    });
    return () => unsubscribe();
  }, []);

  const handlePayment = () => alert("ادائیگی کا نظام (JazzCash/EasyPaisa) جلد فعال کر دیا جائے گا۔");
  const handleChat = () => alert("چیٹ سسٹم: ابھی اس صارف کو میسج بھیجنے کے لیے اکاؤنٹ اپ گریڈ کریں۔");

  if (!isRegistered) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#4A0E0E] flex flex-col justify-center p-8">
        <img src="/images/Logo.png" alt="Logo" className="w-32 mx-auto mb-6 drop-shadow-xl" />
        <h1 className="text-[#D4AF37] text-3xl font-black text-center mb-8 italic">AZWAJ REGISTRATION</h1>
        <form onSubmit={() => setIsRegistered(true)} className="space-y-4">
          <input type="text" placeholder="مکمل نام" required className="w-full p-4 rounded-2xl bg-white/10 border border-[#D4AF37]/30 text-white outline-none" />
          <input type="text" placeholder="شہر" required className="w-full p-4 rounded-2xl bg-white/10 border border-[#D4AF37]/30 text-white outline-none" />
          <button className="w-full bg-[#D4AF37] text-[#4A0E0E] py-4 rounded-2xl font-black text-lg">داخل ہوں</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-28 relative overflow-hidden">
      {/* Header */}
      <div className="bg-[#4A0E0E] p-6 pb-16 rounded-b-[50px] shadow-2xl relative">
        <div className="flex justify-between items-center mb-6">
          <img src="/images/Logo.png" alt="Logo" className="h-12" />
          <div className="flex gap-4 text-[#D4AF37]">
            <Bell size={22} />
            <User size={22} />
          </div>
        </div>
        <div className="relative">
          <input type="text" placeholder="تلاش کریں..." className="w-full p-4 pl-12 rounded-full bg-white/10 border border-[#D4AF37]/20 text-white" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={18} />
        </div>
      </div>

      {/* Cards Section */}
      <div className="px-6 -mt-10">
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-full h-[480px]">
          {profiles.map((p) => (
            <SwiperSlide key={p.id} className="bg-white rounded-[40px] shadow-2xl border border-gray-100 p-2">
              <img src={p.img} className="h-2/3 w-full object-cover rounded-[35px]" />
              <div className="p-4 text-center">
                <h3 className="font-bold text-[#4A0E0E] text-xl">{p.name}</h3>
                <p className="text-gray-500 text-xs my-1">{p.age} سال • {p.profession} • {p.city}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={handleChat} className="flex-1 bg-gray-100 p-3 rounded-2xl flex justify-center"><MessageCircle size={20} className="text-[#4A0E0E]"/></button>
                  <button onClick={handlePayment} className="flex-[3] bg-[#4A0E0E] text-[#D4AF37] font-bold rounded-2xl text-sm">رابطہ کریں</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Explore Section (Bottom List) */}
      <div className="mt-8 px-6">
        <h4 className="text-[#4A0E0E] font-black text-sm mb-4">نیو ممبرز</h4>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {profiles.map(m => (
            <div key={m.id} className="min-w-[70px] text-center">
              <img src={m.img} className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37] mx-auto" />
              <p className="text-[10px] font-bold mt-1 text-[#4A0E0E]">{m.name.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nav Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl border border-[#D4AF37]/30">
        <Home className="text-[#D4AF37]" size={24}/>
        <MessageCircle onClick={handleChat} className="text-[#D4AF37]/40" size={24}/>
        <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5]"><Heart size={24} fill="#4A0E0E" /></div>
        <CreditCard onClick={handlePayment} className="text-[#D4AF37]/40" size={24}/>
        <Settings className="text-[#D4AF37]/40" size={24}/>
      </div>
    </div>
  );
};

export default App;
