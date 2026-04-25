import React, { useState, useEffect } from 'react';
import { db, auth } from './utils/firebase';
import { 
  signInWithPopup, GoogleAuthProvider, onAuthStateChanged, 
  signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber 
} from 'firebase/auth';
import { Mail, Phone, Settings, Home, Heart, User, ShieldCheck } from 'lucide-react';
import ProfileSettings from './components/ProfileSettings';

import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginMethod, setLoginMethod] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#4A0E0E] flex items-center justify-center text-[#D4AF37]">لوڈ ہو رہا ہے...</div>;

  if (!user) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#4A0E0E] p-8 flex flex-col justify-center items-center text-[#D4AF37]">
        <img src="/images/Logo.png" className="w-24 mb-6" alt="Logo" />
        <h1 className="text-2xl font-black mb-8 italic text-center">AZWAJ SECURE LOGIN</h1>
        <div className="w-full space-y-4">
          <button onClick={() => setLoginMethod('email')} className="w-full bg-white/10 p-4 rounded-2xl flex items-center gap-4 border border-[#D4AF37]/20 hover:bg-white/20">
            <Mail size={20} /> ای میل سے لاگ ان
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-28 relative">
       <div className="bg-[#4A0E0E] p-6 pb-20 rounded-b-[60px] flex justify-between items-center shadow-xl">
          <img src="/images/Logo.png" className="h-10" />
          <div className="flex gap-4">
             <Settings className="text-[#D4AF37] cursor-pointer" onClick={() => setShowSettings(true)} />
          </div>
       </div>

       <div className="p-10 text-center text-[#4A0E0E]">
          <h2 className="text-xl font-bold italic">خوش آمدید</h2>
          <p className="text-sm opacity-60">{user.email}</p>
       </div>

       {showSettings && (
         <div className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-md flex items-end">
            <div className="w-full bg-white rounded-t-[40px] relative">
               <button onClick={() => setShowSettings(false)} className="absolute top-4 right-6 font-bold text-gray-400 text-xl">×</button>
               <ProfileSettings userProfile={{}} lang="ur" />
            </div>
         </div>
       )}

       <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#4A0E0E] p-4 flex justify-around rounded-full shadow-2xl z-[100]">
          <Home className="text-[#D4AF37]" size={24}/>
          <div className="bg-[#D4AF37] p-3 rounded-full -mt-12 border-4 border-[#FDF5F5] shadow-lg"><Heart size={28} fill="#4A0E0E" /></div>
          <User className="text-[#D4AF37]/40" size={24}/>
       </div>
    </div>
  );
};

export default App;
