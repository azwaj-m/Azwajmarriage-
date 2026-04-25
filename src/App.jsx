import React, { useState } from 'react';
import { Menu, Bell, Search, SlidersHorizontal, Heart, X, Star, ShieldCheck, Lock, Users, MessageSquareHeart, Home, UserCircle, CheckCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  const mainCards = [
    { id: 1, name: "Ayesha", age: 24, edu: "Masters in Psychology", loc: "Lahore, Pakistan", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 2, name: "Sarah", age: 27, edu: "Doctor", loc: "Karachi", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
  ];

  const members = [
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100",
    "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=100",
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-hidden font-sans select-none" dir="ltr">
      
      {/* Header */}
      <header className="bg-[#4A0E0E] p-5 pb-20 rounded-b-[50px] relative z-10 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <Menu className="text-[#D4AF37]" onClick={() => setIsDrawerOpen(true)} />
          <div className="flex flex-col items-center">
             <img src="/images/Logo.png" className="h-10" alt="Logo" />
             <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase">Azwaj</span>
          </div>
          <Bell className="text-[#D4AF37]" />
        </div>
        <div className="relative bg-white rounded-full flex items-center p-1 shadow-inner">
          <Search className="text-gray-400 ml-3" size={18} />
          <input type="text" placeholder="Search name, city..." className="flex-grow p-2 text-xs outline-none" />
          <div className="bg-[#4A0E0E] p-2 rounded-full text-[#D4AF37]"><SlidersHorizontal size={16} /></div>
        </div>
      </header>

      {/* Main Swiper Cards */}
      <main className="relative -mt-12 px-6 z-30">
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-[280px] h-[380px]">
          {mainCards.map(user => (
            <SwiperSlide key={user.id} className="rounded-3xl bg-white border-4 border-white shadow-2xl overflow-hidden">
              <img src={user.img} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-5 flex flex-col justify-end text-white text-right">
                <div className="flex items-center gap-2 justify-end">
                   <h3 className="text-xl font-bold">{user.name}, {user.age}</h3>
                   <CheckCircle size={16} className="text-[#D4AF37]" />
                </div>
                <p className="text-[10px] opacity-70">{user.edu} • {user.loc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      {/* Manual Circular Carousel (تصویروں کا گھیر) */}
      <div className="relative h-64 -mt-20 z-20 flex justify-center overflow-visible">
        {members.map((img, i) => {
          const angle = (i * (360 / members.length)) + rotation;
          const radius = 130;
          const x = Math.sin(angle * (Math.PI / 180)) * radius;
          const y = Math.cos(angle * (Math.PI / 180)) * 60; // 60 for elliptical shape
          const isBack = y < 0; // اگر Y منفی ہے تو کارڈ کے پیچھے

          return (
            <motion.img
              key={i}
              src={img}
              animate={{ x, y, scale: isBack ? 0.6 : 1.2, opacity: isBack ? 0.4 : 1, zIndex: isBack ? 5 : 40 }}
              transition={{ type: "spring", stiffness: 100 }}
              onPan={(e, info) => setRotation(prev => prev + info.delta.x * 0.5)}
              className="absolute w-16 h-16 rounded-full border-2 border-[#D4AF37] object-cover shadow-lg cursor-grab active:cursor-grabbing"
            />
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8 -mt-10 mb-20 relative z-40">
          <button className="bg-white p-4 rounded-full shadow-xl text-red-500 active:scale-75 transition"><X size={24}/></button>
          <button className="bg-[#4A0E0E] p-5 rounded-full shadow-xl text-[#D4AF37] border-4 border-white active:scale-75 transition"><Heart size={30} fill="#D4AF37"/></button>
          <button className="bg-white p-4 rounded-full shadow-xl text-[#D4AF37] active:scale-75 transition"><Star size={24}/></button>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#4A0E0E] p-4 flex justify-around items-center z-[100] rounded-t-3xl">
        <Home className="text-[#D4AF37]" size={24} />
        <Heart className="text-[#D4AF37]/50" size={24} />
        <div className="bg-[#D4AF37] p-3 rounded-full -mt-10 border-4 border-[#FDF5F5] shadow-lg">
          <Heart size={28} fill="#4A0E0E" />
        </div>
        <MessageSquareHeart className="text-[#D4AF37]/50" size={24} />
        <UserCircle className="text-[#D4AF37]/50" size={24} />
      </footer>
    </div>
  );
};

export default App;
