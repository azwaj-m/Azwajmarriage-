import React, { useState, useEffect } from 'react';
import { auth } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Mail, Settings, Home, Heart, User } from 'lucide-react';
import ProfileSettings from './components/ProfileSettings';

// Swiper imports (yakeen karain ke packages installed hain)
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#4A0E0E] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#4A0E0E] p-8 flex flex-col justify-center items-center text-[#D4AF37]">
        <img src="/images/Logo.png" className="w-24 mb-6" alt="Logo" onError={(e)=>{e.target.src='https://via.placeholder.com/150'}} />
        <h1 className="text-2xl font-black mb-8 italic">AZWAJ SECURE LOGIN</h1>
        <button 
          onClick={() => alert('Login logic here')} 
          className="w-full bg-white/10 p-4 rounded-2xl flex items-center gap-4 border border-[#D4AF37]/20"
        >
          <Mail size={20} /> ای میل سے لاگ ان کریں
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-28 relative overflow-x-hidden">
      <div className="bg-[#4A0E0E] p-6 pb-20 rounded-b-[60px] flex justify-between items-center shadow-xl">
        <img src="/images/Logo.png" className="h-10" alt="Logo" />
        <Settings 
          className="text-[#D4AF37] cursor-pointer hover:rotate-90 transition-transform" 
          onClick={() => setShowSettings(true)} 
        />
      </div>

      <div className="p-10 text-center text-[#4A0E0E]">
        <h2 className="text-xl font-bold italic">خوش آمدید، {user.email?.split('@')[0]}</h2>
        <p className="text-sm opacity-60">آپ کا اکاؤنٹ محفوظ ہے</p>
      </div>

      {showSettings && (
        <div className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-sm flex items-end animate-in fade-in duration-300">
          <div className="w-full bg-white rounded-t-[40px] relative shadow-2xl overflow-hidden">
            <button 
              onClick={() => setShowSettings(false)} 
              className="absolute top-4 left-6 text-gray-400 text-3xl font-light hover:text-red-500"
            > × </button>
            <ProfileSettings userProfile={user} lang="ur" />
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl z-[100]">
        <Home className="text-[#D4AF37]" size={24}/>
        <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5] shadow-lg">
          <Heart size={28} fill="#4A0E0E" />
        </div>
        <User className="text-[#D4AF37]/40" size={24}/>
      </div>
    </div>
  );
};

export default App;
