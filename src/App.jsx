import React, { useState, useEffect } from 'react';
import { Menu, Bell, X, Plus, User, LogOut, Heart, Home, MessageSquareHeart, CheckCircle, Search, SlidersHorizontal } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { db } from './utils/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Discover from './pages/Discover';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [profiles, setProfiles] = useState([]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "profiles"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(data.length > 0 ? data : [
        { id: '1', fullName: "Ayesha", dob: '2000-01-01', education: "Psychologist", city: "Lahore", profileImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400", verificationStatus: true }
      ]);
    });
    return () => unsubscribe();
  }, []);

  const navItems = [
    { key: 'discover', label: 'Discover', icon: Home },
    { key: 'matches', label: 'Matches', icon: Heart },
    { key: 'messages', label: 'Messages', icon: MessageSquareHeart },
    { key: 'profile', label: 'Profile', icon: UserCircle },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-hidden font-sans" dir="ltr">
      
      {/* Royal Header Section */}
      <header className="bg-gradient-to-b from-[#4A0E0E] to-[#631212] pt-12 pb-24 rounded-b-[70px] relative z-10 shadow-2xl border-b-[6px] border-[#D4AF37]/50">
        <div className="flex justify-between items-center px-6 mb-8 relative z-20 text-[#D4AF37]">
          <Menu className="cursor-pointer active:scale-95 transition-transform" onClick={() => setIsDrawerOpen(true)} />
          <Bell className="cursor-pointer active:scale-95 transition-transform" />
        </div>
        
        <div className="flex flex-col items-center relative z-20 mb-6">
          <img src="/logo_new.png" alt="Azwaj Royal Logo" className="h-20 mb-3" />
          <h1 className="text-[#D4AF37] text-4xl font-serif font-black tracking-tighter italic uppercase">Azwaj</h1>
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-3 shadow-xl"></div>
        </div>

        {/* Search Bar - Professional Placement */}
        <div className="px-6 relative group z-30">
          <input 
            type="text" 
            placeholder="Search by name, city or profession..." 
            className="w-full bg-white/95 py-4.5 pr-14 pl-14 rounded-full shadow-inner outline-none focus:ring-4 ring-[#D4AF37]/20 text-gray-800 text-sm placeholder:text-gray-400 border border-gray-100"
          />
          <Search className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4A0E0E]" size={20} />
          <SlidersHorizontal className="absolute left-10 top-1/2 -translate-y-1/2 text-[#4A0E0E] cursor-pointer hover:rotate-90 transition-transform" size={20} />
        </div>
      </header>

      {/* Main Discover Component - Correctmodular usage */}
      <main className="relative -mt-14 z-30 flex justify-center pb-20">
         <Discover profiles={profiles} rotation={rotation} setRotation={setRotation} />
      </main>

      {/* Modern, Animated Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gradient-to-t from-[#4A0E0E] to-[#631212] py-4 px-6 flex justify-around items-center z-50 rounded-t-[40px] shadow-[0_-15px_30px_rgba(0,0,0,0.3)] border-t-2 border-[#D4AF37]/20">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          return (
            <React.Fragment key={item.key}>
              {index === 2 && ( // Center Heart Button
                <motion.div whileTap={{ scale: 0.8 }} className="p-3 bg-gradient-to-b from-[#D4AF37] to-[#C99C1E] rounded-full -mt-12 border-[8px] border-[#FDF5F5] shadow-[0_10px_30px_rgba(212,175,55,0.5)] cursor-pointer">
                  <Heart size={32} className="text-[#4A0E0E]" fill="#4A0E0E" />
                </motion.div>
              )}
              <motion.button 
                onClick={() => setActiveTab(item.key)} 
                whileTap={{ y: 2 }}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-[#D4AF37]/40 hover:text-[#D4AF37]'}`}
              >
                <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
              </motion.button>
            </React.Fragment>
          );
        })}
      </footer>
    </div>
  );
};

const UserCircle = ({ size, ...props }) => <User size={size} {...props} />

export default App;
