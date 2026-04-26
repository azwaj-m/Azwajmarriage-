import React, { useState, useEffect } from 'react';
import { Menu, Bell, Search, Home, Heart, MessageCircle, User, Settings2 } from 'lucide-react';
import { db } from './utils/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Discover from './pages/Discover';

const App = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "profiles"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(data.length > 0 ? data : [{
        id: '1', fullName: "Ayesha", age: 24, education: "Masters in Psychology", city: "Lahore", 
        profileImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
      }]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] pb-32 relative font-sans" dir="rtl">
      {/* Premium Header */}
      <header className="bg-[#4A0E0E] pt-12 pb-28 px-6 rounded-b-[60px] shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <Menu className="text-yellow-500" />
          <h1 className="text-yellow-500 text-3xl font-serif font-bold italic">Azwaj</h1>
          <Bell className="text-yellow-500" />
        </div>
        
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute right-4 top-4 text-gray-400" size={20} />
          <input type="text" placeholder="نام، شہر یا پیشہ تلاش کریں..." 
            className="w-full p-4 pr-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white placeholder-gray-400 outline-none" />
          <Settings2 className="absolute left-4 top-4 text-yellow-500" size={20} />
        </div>
      </header>

      <Discover profiles={profiles} />

      {/* Navigation Footer */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#4A0E0E] p-4 flex justify-around items-center rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.3)] z-[100]">
        <Home className="text-yellow-500" />
        <Heart className="text-gray-400" />
        <div className="bg-yellow-500 p-4 rounded-full -mt-12 shadow-xl border-4 border-[#FDF5F5]">
           <Heart className="text-[#4A0E0E]" fill="currentColor" />
        </div>
        <MessageCircle className="text-gray-400" />
        <User className="text-gray-400" />
      </nav>
    </div>
  );
};

export default App;
