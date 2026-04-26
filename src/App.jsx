import React, { useState, useEffect } from 'react';
import { Menu, Bell, Heart, MessageCircle, User, Home, Search, Sliders } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { db } from './utils/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Discover from './pages/Discover';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [activeTab, setActiveTab] = useState('discover');

  useEffect(() => {
    const q = query(collection(db, "profiles"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(data.length > 0 ? data : [
        { id: '1', fullName: "Ayesha", age: 24, education: "Masters in Psychology", city: "Lahore", profileImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
        { id: '2', fullName: "Sarah", age: 27, education: "Doctor", city: "Karachi", profileImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" }
      ]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] flex flex-col font-sans relative overflow-hidden" dir="rtl">
      
      {/* Header Section */}
      <header className="bg-[#4A0E0E] pt-12 pb-20 rounded-b-[50px] shadow-2xl relative">
        <div className="flex justify-between items-center px-6 mb-6">
          <Menu className="text-[#D4AF37] cursor-pointer" size={28} />
          <h1 className="text-[#D4AF37] text-3xl font-serif font-bold italic tracking-widest">AZWAJ</h1>
          <div className="relative">
            <Bell className="text-[#D4AF37]" size={28} />
            <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full border-2 border-[#4A0E0E]"></span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 relative group">
          <div className="absolute inset-y-0 right-10 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search by name, city..." 
            className="w-full bg-white/95 py-4 pr-12 pl-12 rounded-full shadow-inner outline-none focus:ring-2 ring-[#D4AF37] text-right"
          />
          <div className="absolute inset-y-0 left-10 flex items-center">
            <Sliders className="text-[#4A0E0E]" size={20} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow -mt-10 relative z-10 px-4">
        <Discover profiles={profiles} />
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 max-w-md w-full bg-[#4A0E0E] py-4 rounded-t-[30px] shadow-[0_-10px_20px_rgba(0,0,0,0.2)] flex justify-around items-center z-50 border-t border-yellow-600/30">
        <button onClick={() => setActiveTab('discover')} className={`flex flex-col items-center ${activeTab === 'discover' ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
          <Home size={24} />
          <span className="text-[10px] mt-1">Discover</span>
        </button>
        <button onClick={() => setActiveTab('matches')} className={`flex flex-col items-center ${activeTab === 'matches' ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
          <Heart size={24} />
          <span className="text-[10px] mt-1">Matches</span>
        </button>
        <div className="bg-white p-3 rounded-full -mt-12 shadow-lg border-4 border-[#4A0E0E]">
          <Heart size={32} className="text-[#4A0E0E]" fill="#4A0E0E" />
        </div>
        <button onClick={() => setActiveTab('messages')} className={`flex flex-col items-center ${activeTab === 'messages' ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
          <MessageCircle size={24} />
          <span className="text-[10px] mt-1">Messages</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
          <User size={24} />
          <span className="text-[10px] mt-1">Profile</span>
        </button>
      </footer>
    </div>
  );
};

export default App;
