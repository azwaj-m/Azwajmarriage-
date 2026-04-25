import React, { useState } from 'react';
import { Menu, Bell, Search, SlidersHorizontal, Heart, X, Star, MessageSquareHeart, Home, UserCircle, CheckCircle, Plus, Camera, LogOut, Settings, User } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [rotation, setRotation] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Ayesha", age: 24, edu: "Masters in Psychology", loc: "Lahore, Pakistan", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 2, name: "Sarah", age: 27, edu: "Doctor", loc: "Karachi", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
  ]);

  const members = [
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150",
    "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150",
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-hidden font-sans select-none shadow-2xl" dir="ltr">
      
      {/* Sidebar / Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed top-0 left-0 bottom-0 w-3/4 bg-[#4A0E0E] z-[101] p-8 shadow-2xl">
              <div className="flex flex-col h-full text-[#D4AF37]">
                <div className="flex items-center gap-4 mb-12 border-b border-[#D4AF37]/20 pb-8">
                  <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] overflow-hidden"><img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" alt="Admin"/></div>
                  <div><h2 className="font-bold text-lg">Azwaj User</h2><p className="text-xs opacity-60">Premium Member</p></div>
                </div>
                <nav className="space-y-6 flex-grow">
                  <div className="flex items-center gap-4 text-lg"><User size={20}/> My Profile</div>
                  <div className="flex items-center gap-4 text-lg"><Settings size={20}/> Settings</div>
                  <div className="flex items-center gap-4 text-lg" onClick={() => { setIsUploadOpen(true); setIsDrawerOpen(false); }}><Plus size={20}/> Add New Profile</div>
                </nav>
                <div className="flex items-center gap-4 text-red-400 mt-auto border-t border-[#D4AF37]/20 pt-8"><LogOut size={20}/> Sign Out</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-[#4A0E0E] p-5 pb-24 rounded-b-[60px] relative z-10 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => setIsDrawerOpen(true)} className="p-2 bg-[#D4AF37]/10 rounded-xl cursor-pointer">
            <Menu className="text-[#D4AF37]" />
          </motion.div>
          <div className="flex flex-col items-center">
             <div className="bg-[#D4AF37]/20 px-4 py-1 rounded-full mb-1"><span className="text-[#D4AF37] text-[12px] font-bold tracking-widest uppercase">AZWAJ</span></div>
          </div>
          <Bell className="text-[#D4AF37]" />
        </div>
        <div className="relative bg-white/95 rounded-full flex items-center p-1 shadow-inner">
          <Search className="text-gray-400 ml-4" size={18} />
          <input type="text" placeholder="Search matches..." className="flex-grow p-3 text-sm outline-none bg-transparent" />
        </div>
      </header>

      {/* Main Swiper Cards */}
      <main className="relative -mt-16 px-6 z-30">
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-[300px] h-[410px]">
          {profiles.map(user => (
            <SwiperSlide key={user.id} className="rounded-[40px] bg-white border-8 border-white shadow-2xl overflow-hidden relative">
              <img src={user.img} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-6 flex flex-col justify-end text-white text-right">
                <div className="flex items-center gap-2 justify-end">
                   <h3 className="text-2xl font-bold">{user.name}, {user.age}</h3>
                   <CheckCircle size={20} className="text-[#D4AF37]" fill="currentColor" />
                </div>
                <p className="text-sm opacity-80">{user.edu} • {user.loc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      {/* Interactive Circular Carousel */}
      <div className="relative h-72 -mt-24 z-20 flex justify-center items-center overflow-visible">
        {members.map((img, i) => {
          const angle = (i * (360 / members.length)) + rotation;
          const radiusX = 170;
          const radiusY = 75;
          const x = Math.sin(angle * (Math.PI / 180)) * radiusX;
          const y = Math.cos(angle * (Math.PI / 180)) * radiusY; 
          const isBack = y < 0;

          return (
            <motion.div
              key={i}
              onPan={(e, info) => setRotation(prev => prev + info.delta.x * 0.6)} // Speed up response
              animate={{ x, y, scale: isBack ? 0.7 : 1.35, opacity: isBack ? 0.3 : 1, zIndex: isBack ? 5 : 40 }}
              transition={{ type: "spring", stiffness: 150, damping: 25 }} // Better momentum
              className="absolute cursor-grab active:cursor-grabbing"
            >
              <img src={img} className="w-20 h-20 rounded-full border-4 border-[#D4AF37] object-cover shadow-2xl" alt="" />
            </motion.div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-6 -mt-8 mb-24 relative z-40">
          <motion.button whileTap={{ scale: 0.8 }} className="bg-white p-4 rounded-full shadow-lg text-red-500"><X size={24}/></motion.button>
          <motion.button whileTap={{ scale: 0.8 }} className="bg-[#4A0E0E] p-6 rounded-full shadow-xl text-[#D4AF37] border-4 border-white"><Heart size={36} fill="#D4AF37"/></motion.button>
          <motion.button whileTap={{ scale: 0.8 }} className="bg-white p-4 rounded-full shadow-lg text-[#D4AF37]"><Star size={24}/></motion.button>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 bg-white z-[150] p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#4A0E0E]">Create New Profile</h2>
              <X onClick={() => setIsUploadOpen(false)} className="text-gray-400" />
            </div>
            <div className="space-y-6">
              <div className="h-40 bg-gray-100 rounded-3xl border-2 border-dashed border-[#D4AF37] flex flex-col items-center justify-center text-[#D4AF37]">
                <Camera size={40} />
                <p className="text-xs font-bold mt-2">UPLOAD PHOTO</p>
              </div>
              <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 ring-[#D4AF37]" />
              <input type="number" placeholder="Age" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 ring-[#D4AF37]" />
              <input type="text" placeholder="Profession / Education" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 ring-[#D4AF37]" />
              <input type="text" placeholder="City, Country" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 ring-[#D4AF37]" />
              <button onClick={() => setIsUploadOpen(false)} className="w-full bg-[#4A0E0E] text-[#D4AF37] py-5 rounded-3xl font-bold shadow-xl">PUBLISH PROFILE</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#4A0E0E] p-4 flex justify-around items-center z-[100] rounded-t-[40px]">
        <Home className="text-[#D4AF37]" size={24} />
        <Heart className="text-[#D4AF37]/40" size={24} />
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => setIsUploadOpen(true)} className="bg-[#D4AF37] p-4 rounded-full -mt-12 border-[6px] border-[#FDF5F5] shadow-2xl">
          <Plus size={30} className="text-[#4A0E0E]" />
        </motion.div>
        <MessageSquareHeart className="text-[#D4AF37]/40" size={24} />
        <UserCircle className="text-[#D4AF37]/40" size={24} />
      </footer>
    </div>
  );
};

export default App;
