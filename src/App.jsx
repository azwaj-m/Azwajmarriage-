import React, { useState, useEffect } from 'react';
import { db, auth } from './utils/firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Search, Heart, MessageCircle, User, Home, Bell, Settings, Mic, Lock, ShieldAlert } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛡️ سیکیورٹی: سکرین شاٹ اور رائٹ کلک بلاک کرنا
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    
    // سکرین شاٹ روکنے کے لیے ایک سادہ CSS ٹرک (صرف موبائل براؤزر پر اثر انداز ہوتا ہے)
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "profiles"));
      const unsubscribeData = onSnapshot(q, (snap) => {
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProfiles(data.length > 0 ? data : getDummyData());
      });
      return () => unsubscribeData();
    }
  }, [user]);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const handleProfileClick = () => {
    // 🔗 دوسری ریپوزٹری (TezroWeb) کے رجسٹریشن فارم پر بھیجنا
    const returnUrl = window.location.href;
    window.location.href = `https://tezroweb.vercel.app/register?return=${encodeURIComponent(returnUrl)}`;
  };

  const getDummyData = () => [
    {id:"1", name:"عائشہ خان", city:"لاہور", age:"28", profession:"Doctor", img:"https://images.unsplash.com/photo-1594744803329-e58b31de8bf5"},
    {id:"2", name:"سارہ احمد", city:"کراچی", age:"26", profession:"Teacher", img:"https://images.unsplash.com/photo-1567532939604-b6b5b0db2604"}
  ];

  // 🚪 لاگ ان صفحہ
  if (!user && !loading) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#4A0E0E] flex flex-col justify-center items-center p-8 text-[#D4AF37]">
        <img src="/images/Logo.png" className="w-32 mb-8 animate-pulse" alt="Logo" />
        <h1 className="text-3xl font-black italic mb-2">AZWAJ LOGIN</h1>
        <p className="text-xs opacity-60 mb-10 text-center font-bold">محفوظ ازدواجی سفر کا آغاز یہاں سے کریں</p>
        
        <button 
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6" />
          Google کے ساتھ لاگ ان کریں
        </button>
        
        <div className="mt-6 text-[10px] text-center opacity-40">
          <ShieldAlert size={12} className="inline mx-1" />
          سیکیورٹی کی وجہ سے سکرین شاٹ لینا منع ہے
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-28 relative select-none">
      {/* سکرین شاٹ پروٹیکشن اوورلے (کچھ براؤزرز کے لیے) */}
      <div className="fixed inset-0 pointer-events-none z-[999] border-[10px] border-[#4A0E0E]/5 print:hidden"></div>

      {/* Header */}
      <div className="bg-[#4A0E0E] p-6 pb-20 rounded-b-[60px] shadow-2xl relative border-b-2 border-[#D4AF37]/50">
        <div className="flex justify-between items-center mb-6">
           <img src="/images/Logo.png" alt="Logo" className="h-10" />
           <button onClick={() => auth.signOut()} className="text-[#D4AF37] text-[10px] font-bold border border-[#D4AF37]/30 px-3 py-1 rounded-full">LOGOUT</button>
        </div>
        <div className="relative">
          <input type="text" placeholder="تلاش کریں..." className="w-full p-4 pr-12 rounded-full bg-white/10 border border-[#D4AF37]/20 text-white outline-none" />
          <Mic className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={20} />
        </div>
      </div>

      {/* Cards */}
      <div className="px-6 -mt-12 z-10 relative h-[480px]">
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-full h-full">
          {profiles.map((p) => (
            <SwiperSlide key={p.id} onClick={handleProfileClick} className="bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-100 p-2 cursor-pointer">
              <div className="relative h-2/3">
                <img src={p.img} className="h-full w-full object-cover rounded-[40px]" />
                <div className="absolute top-4 left-4 bg-red-600 p-2 rounded-2xl flex items-center gap-1 shadow-lg">
                  <Lock size={12} className="text-white" />
                  <span className="text-white text-[8px] font-bold tracking-widest">TAP TO REGISTER</span>
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-extrabold text-[#4A0E0E] text-xl tracking-tighter uppercase">{p.name}</h3>
                <p className="text-gray-400 text-[10px] font-bold mt-1">{p.age} سال • {p.city}</p>
                <div className="mt-4 bg-[#4A0E0E] text-[#D4AF37] py-3 rounded-2xl font-black text-sm">مزید معلومات کے لیے کلک کریں</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl border border-[#D4AF37]/30 z-[100]">
        <Home className="text-[#D4AF37]" size={24}/>
        <MessageCircle className="text-[#D4AF37]/40" size={24}/>
        <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5] shadow-lg"><Heart size={28} fill="#4A0E0E" /></div>
        <Settings className="text-[#D4AF37]/40" size={24}/>
        <User className="text-[#D4AF37]/40" size={24}/>
      </div>
    </div>
  );
};

export default App;
