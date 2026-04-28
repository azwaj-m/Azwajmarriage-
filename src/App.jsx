import React, { useState, useEffect } from 'react';
import { db } from './utils/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Discover from './pages/Discover';
import { Bell, Menu, Compass, Heart, MessageCircle, User, Search, SlidersHorizontal } from 'lucide-react';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "profiles"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProfiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#4A0E0E]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#D4AF37]"></div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-x-hidden font-sans pb-24">
      {/* Premium Header Background Area */}
      <div className="absolute top-0 left-0 right-0 h-[280px] bg-gradient-to-b from-[#4A0E0E] to-[#631212] rounded-b-[60px] shadow-2xl z-0"></div>

      <header className="relative z-10 p-6 flex items-center justify-between">
        <Menu className="text-white" />
        <div className="flex flex-col items-center">
           <img src="/images/Logo.png" alt="Azwaj" className="h-16 drop-shadow-xl" />
           <h1 className="text-4xl font-serif font-bold text-[#D4AF37] -mt-2 drop-shadow-md">Azwaj</h1>
        </div>
        <div className="relative">
          <Bell className="text-white" />
          <span className="absolute -top-1 -right-1 bg-yellow-500 w-2.5 h-2.5 rounded-full border-2 border-[#4A0E0E]"></span>
        </div>
      </header>

      <div className="relative z-10 px-6 mt-4 mb-10">
        <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-3.5 shadow-lg group focus-within:bg-white/20 transition-all">
          <Search size={20} className="text-yellow-500" />
          <input type="text" placeholder="Search by name, city or profession..." className="bg-transparent w-full px-3 outline-none text-white placeholder-gray-300 text-sm" />
          <SlidersHorizontal size={20} className="text-yellow-500 cursor-pointer" />
        </div>
      </div>

      <Discover profiles={profiles} rotation={rotation} setRotation={setRotation} />

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t flex justify-around p-4 z-50 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col items-center gap-1 group cursor-pointer">
          <Compass className="text-[#4A0E0E]" />
          <span className="text-[10px] font-bold text-[#4A0E0E]">Discover</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
          <Heart className="text-gray-600" />
          <span className="text-[10px] font-bold">Matches</span>
        </div>
        <div className="bg-[#4A0E0E] p-3.5 rounded-full -mt-10 border-4 border-[#FDF5F5] text-[#D4AF37] shadow-xl active:scale-90 transition-transform">
          <Heart fill="currentColor" size={28} />
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
          <MessageCircle className="text-gray-600" />
          <span className="text-[10px] font-bold">Messages</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
          <User className="text-gray-600" />
          <span className="text-[10px] font-bold">Profile</span>
        </div>
      </nav>
    </div>
  );
};

export default App;
