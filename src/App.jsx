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
  
  // پروفائل ڈیٹا سٹیٹ
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Ayesha", age: 24, edu: "Masters in Psychology", loc: "Lahore", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
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
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-hidden font-sans shadow-2xl transition-all duration-500" dir="ltr">
      
      {/* 1. Functional Sidebar */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 bg-black/70 z-[100] backdrop-blur-md" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 left-0 bottom-0 w-[80%] bg-[#4A0E0E] z-[101] p-8 shadow-2xl border-r border-[#D4AF37]/30">
              <div className="flex flex-col h-full text-[#D4AF37]">
                <div className="flex justify-between items-center mb-10">
                  <img src="/images/Logo.png" className="h-10" alt="Logo" />
                  <X className="cursor-pointer" onClick={() => setIsDrawerOpen(false)} />
                </div>
                <nav className="space-y-8 flex-grow font-medium">
                  <div className="flex items-center gap-5 text-xl active:scale-95 transition"><User className="text-[#D4AF37]" size={24}/> My Profile</div>
                  <div className="flex items-center gap-5 text-xl active:scale-95 transition" onClick={() => { setIsUploadOpen(true); setIsDrawerOpen(false); }}><Plus size={24}/> Add Match</div>
                  <div className="flex items-center gap-5 text-xl active:scale-95 transition"><Settings size={24}/> Settings</div>
                </nav>
                <div className="flex items-center gap-5 text-red-400 mt-auto pt-8 border-t border-[#D4AF37]/10"><LogOut size={24}/> Logout</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. Header */}
      <header className="bg-gradient-to-b from-[#4A0E0E] to-[#631212] p-5 pb-24 rounded-b-[60px] relative z-10 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <Menu className="text-[#D4AF37] cursor-pointer" onClick={() => setIsDrawerOpen(true)} />
          <div className="flex flex-col items-center">
             <span className="text-[#D4AF37] text-[14px] font-black tracking-[0.2em] uppercase">AZWAJ</span>
          </div>
          <div className="relative">
            <Bell className="text-[#D4AF37]" />
            <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full border-2 border-[#4A0E0E]"></span>
          </div>
        </div>
        <div className="relative bg-white/95 rounded-full flex items-center p-1 shadow-2xl">
          <Search className="text-gray-400 ml-4" size={18} />
          <input type="text" placeholder="Find your perfect match..." className="flex-grow p-3 text-sm outline-none bg-transparent text-gray-800" />
        </div>
      </header>

      {/* 3. Main Cards */}
      <main className="relative -mt-16 px-6 z-30">
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-[300px] h-[400px]">
          {profiles.map(user => (
            <SwiperSlide key={user.id} className="rounded-[40px] bg-white border-8 border-white shadow-2xl overflow-hidden relative">
              <img src={user.img} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-6 flex flex-col justify-end text-white text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                   <h3 className="text-2xl font-bold">{user.name}, {user.age}</h3>
                   <CheckCircle size={20} className="text-[#D4AF37]" fill="currentColor" />
                </div>
                <p className="text-sm opacity-80">{user.edu} • {user.loc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      {/* 4. High-Speed Circular Carousel */}
      <div className="relative h-72 -mt-24 z-20 flex justify-center items-center overflow-visible">
        {members.map((img, i) => {
          const angle = (i * (360 / members.length)) + rotation;
          const radiusX = 175; // گھیرا بڑا کر دیا گیا
          const radiusY = 80;
          const x = Math.sin(angle * (Math.PI / 180)) * radiusX;
          const y = Math.cos(angle * (Math.PI / 180)) * radiusY; 
          const isBack = y < 0;

          return (
            <motion.div
              key={i}
              onPan={(e, info) => setRotation(prev => prev + info.delta.x * 0.8)} // سپیڈ 0.8 کر دی گئی (تیز رسپانس)
              animate={{ x, y, scale: isBack ? 0.7 : 1.4, opacity: isBack ? 0.2 : 1, zIndex: isBack ? 5 : 40 }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }} // ہموار اور فوری موومنٹ
              className="absolute cursor-grab active:cursor-grabbing"
            >
              <img src={img} className="w-20 h-20 rounded-full border-4 border-[#D4AF37] object-cover shadow-[0_15px_35px_rgba(0,0,0,0.4)]" alt="" />
            </motion.div>
          );
        })}
      </div>

      {/* 5. Upload Profile Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30 }} className="fixed inset-0 bg-white z-[200] p-8 flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-[#4A0E0E]">Add Profile</h2>
              <X onClick={() => setIsUploadOpen(false)} className="text-gray-400 bg-gray-100 p-2 rounded-full w-10 h-10 cursor-pointer" />
            </div>
            <div className="space-y-5 overflow-y-auto pb-10 flex-grow no-scrollbar text-right" dir="rtl">
              <div className="h-44 bg-gray-50 rounded-[35px] border-4 border-dashed border-[#D4AF37]/30 flex flex-col items-center justify-center text-[#D4AF37] group active:bg-gray-100 transition">
                <Camera size={48} className="mb-2 opacity-50" />
                <p className="text-sm font-bold">اپ لوڈ کریں</p>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="مکمل نام" className="w-full p-5 bg-gray-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#D4AF37]/20 text-lg" />
                <input type="number" placeholder="عمر" className="w-full p-5 bg-gray-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#D4AF37]/20 text-lg" />
                <input type="text" placeholder="تعلیم / پیشہ" className="w-full p-5 bg-gray-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#D4AF37]/20 text-lg" />
                <input type="text" placeholder="شہر" className="w-full p-5 bg-gray-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#D4AF37]/20 text-lg" />
              </div>
              <button onClick={() => setIsUploadOpen(false)} className="w-full bg-[#4A0E0E] text-[#D4AF37] py-6 rounded-[30px] text-xl font-black shadow-2xl active:scale-95 transition mt-8">محفوظ کریں</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gradient-to-t from-[#4A0E0E] to-[#631212] p-4 flex justify-around items-center z-[100] rounded-t-[45px] shadow-[0_-15px_45px_rgba(0,0,0,0.3)]">
        <Home className="text-[#D4AF37]" size={26} />
        <Heart className="text-[#D4AF37]/30" size={26} />
        <motion.div whileTap={{ scale: 0.85 }} onClick={() => setIsUploadOpen(true)} className="bg-gradient-to-b from-[#D4AF37] to-[#B6912A] p-4 rounded-full -mt-14 border-[8px] border-[#FDF5F5] shadow-[0_15px_30px_rgba(212,175,55,0.4)]">
          <Plus size={32} className="text-[#4A0E0E]" />
        </motion.div>
        <MessageSquareHeart className="text-[#D4AF37]/30" size={26} />
        <UserCircle className="text-[#D4AF37]/30" size={26} />
      </footer>
    </div>
  );
};

export default App;
