import React, { useState, useEffect } from 'react';
import { db, auth } from './utils/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Search, Heart, MessageCircle, User, Home, Bell, Settings, Mic, Languages } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [lang, setLang] = useState('ur'); // Default Urdu
  const [isRegistered, setIsRegistered] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [isListening, setIsListening] = useState(false);

  // زبان کے حساب سے ترجمہ (Urdu, Sindhi, Pashto, Punjabi, English)
  const translations = {
    ur: { welcome: "خوش آمدید", register: "داخل ہوں", search: "تلاش کریں...", connect: "رابطہ کریں", age: "سال", name: "نام" },
    sd: { welcome: "ڀلي ڪري آيا", register: "داخل ٿيو", search: "ڳولا ڪريو...", connect: "رابطو ڪريو", age: "سال", name: "نالو" },
    ps: { welcome: "ښه راغلاست", register: "ننوځئ", search: "لټون...", connect: "اړیکه ونیسئ", age: "کال", name: "نوم" },
    en: { welcome: "Welcome", register: "Enter", search: "Search...", connect: "Connect", age: "Years", name: "Name" }
  };

  const t = translations[lang] || translations.ur;

  // 🎙️ وائس سرچ انجن لاجک
  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("آپ کا براؤزر وائس سرچ کو سپورٹ نہیں کرتا۔");

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'ur' ? 'ur-PK' : 'en-US';
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Voice Input:", transcript);
      alert("تلاش کیا جا رہا ہے: " + transcript);
      // یہاں آپ سرچ فلٹر کا لاجک لگا سکتے ہیں
    };

    recognition.start();
  };

  // 📍 لوکیشن اور زبان کا خودکار انتخاب
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // یہاں ایک ریورس جیو کوڈنگ API (جیسے BigDataCloud) استعمال کی جا سکتی ہے
        // مثال کے طور پر: اگر شہر کراچی ہے تو سندھی آپشن دے
        console.log("Location detected:", pos.coords.latitude, pos.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    const q = query(collection(db, "profiles"));
    const unsubscribe = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setProfiles(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setProfiles([
          {id:"d1", name:"عائشہ خان", city:"لاہور", age:"24", profession:"Doctor", img:"https://images.unsplash.com/photo-1594744803329-e58b31de8bf5"},
          {id:"d2", name:"سارہ احمد", city:"کراچی", age:"26", profession:"Teacher", img:"https://images.unsplash.com/photo-1567532939604-b6b5b0db2604"}
        ]);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!isRegistered) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#4A0E0E] flex flex-col justify-center p-8 text-center" dir={lang === 'en' ? 'ltr' : 'rtl'}>
        <img src="/images/Logo.png" alt="Logo" className="w-24 mx-auto mb-4" />
        <h2 className="text-[#D4AF37] text-2xl font-bold mb-6">{t.welcome}</h2>
        <div className="flex justify-center gap-2 mb-6">
           {['ur', 'sd', 'ps', 'en'].map(l => (
             <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded-lg text-xs ${lang === l ? 'bg-[#D4AF37] text-[#4A0E0E]' : 'bg-white/10 text-white'}`}>
               {l.toUpperCase()}
             </button>
           ))}
        </div>
        <form onSubmit={() => setIsRegistered(true)} className="space-y-4">
          <input type="text" placeholder={t.name} required className="w-full p-4 rounded-2xl bg-white/10 border border-[#D4AF37]/30 text-white outline-none" />
          <button className="w-full bg-[#D4AF37] text-[#4A0E0E] py-4 rounded-2xl font-black text-lg">{t.register}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-28 relative" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      {/* Header with Voice Mic */}
      <div className="bg-[#4A0E0E] p-6 pb-16 rounded-b-[50px] shadow-2xl relative">
        <div className="flex justify-between items-center mb-6">
          <img src="/images/Logo.png" alt="Logo" className="h-10" />
          <div className="flex gap-4 text-[#D4AF37]">
            <Languages size={22} onClick={() => setLang(lang === 'ur' ? 'en' : 'ur')} />
            <Bell size={22} />
          </div>
        </div>
        <div className="relative">
          <input type="text" placeholder={t.search} className="w-full p-4 pr-12 rounded-full bg-white/10 border border-[#D4AF37]/20 text-white outline-none" />
          <Mic 
            onClick={startVoiceSearch} 
            className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer ${isListening ? 'text-red-500 animate-pulse' : 'text-[#D4AF37]'}`} 
            size={22} 
          />
        </div>
      </div>

      {/* Profile Swiper */}
      <div className="px-6 -mt-10">
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-full h-[480px]">
          {profiles.map((p) => (
            <SwiperSlide key={p.id} className="bg-white rounded-[40px] shadow-2xl border border-gray-100 p-2">
              <img src={p.img} className="h-2/3 w-full object-cover rounded-[35px]" />
              <div className="p-4 text-center">
                <h3 className="font-bold text-[#4A0E0E] text-xl">{p.name}</h3>
                <p className="text-gray-500 text-xs my-1">{p.age} {t.age} • {p.city}</p>
                <button onClick={() => alert("Redirecting to Payment...")} className="w-full bg-[#4A0E0E] text-[#D4AF37] py-3 rounded-2xl font-bold mt-2">
                  {t.connect}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Footer Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl border border-[#D4AF37]/30 z-[100]">
        <Home className="text-[#D4AF37]" size={24}/>
        <MessageCircle onClick={() => alert("Chat requires Premium")} className="text-[#D4AF37]/40" size={24}/>
        <div onClick={startVoiceSearch} className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5] shadow-lg">
          <Mic size={28} className={isListening ? 'animate-bounce text-red-600' : 'text-[#4A0E0E]'} />
        </div>
        <Settings className="text-[#D4AF37]/40" size={24}/>
        <User className="text-[#D4AF37]/40" size={24}/>
      </div>
    </div>
  );
};

export default App;
