import React, { useState } from 'react';
import { Menu, Bell, Search, SlidersHorizontal, Heart, X, Star, ShieldCheck, Lock, Users, MessageSquareHeart, Home, UserCircle, CheckCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [rotation, setRotation] = useState(0);

  const mainCards = [
    { id: 1, name: "Ayesha", age: 24, edu: "Masters in Psychology", loc: "Lahore, Pakistan", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 2, name: "Sarah", age: 27, edu: "Doctor", loc: "Karachi", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
  ];

  const members = [
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150",
    "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150",
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-hidden font-sans select-none" dir="ltr">
      
      {/* Header */}
      <header className="bg-[#4A0E0E] p-5 pb-24 rounded-b-[60px] relative z-10 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <Menu className="text-[#D4AF37]" />
          <div className="flex flex-col items-center">
             <img src="/images/Logo.png" className="h-10" alt="Logo" />
             <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase">Azwaj</span>
          </div>
          <Bell className="text-[#D4AF37]" />
        </div>
        <div className="relative bg-white/95 rounded-full flex items-center p-1 shadow-inner">
          <Search className="text-gray-400 ml-3" size={18} />
          <input type="text" placeholder="Search name, city or profession..." className="flex-grow p-2 text-xs outline-none bg-transparent text-gray-700" />
          <div className="bg-[#4A0E0E] p-2 rounded-full text-[#D4AF37]"><SlidersHorizontal size={16} /></div>
        </div>
      </header>

      {/* Main Swiper Cards */}
      <main className="relative -mt-16 px-6 z-30">
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-[300px] h-[400px]">
          {mainCards.map(user => (
            <SwiperSlide key={user.id} className="rounded-[40px] bg-white border-8 border-white shadow-2xl overflow-hidden relative">
              <img src={user.img} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-6 flex flex-col justify-end text-white text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                   <h3 className="text-2xl font-bold">{user.name}, {user.age}</h3>
                   <CheckCircle size={20} className="text-[#D4AF37]" fill="currentColor" />
                </div>
                <p className="text-xs opacity-80">{user.edu} • {user.loc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      {/* Enhanced Circular Carousel (بڑا اور واضع سرکل) */}
      <div className="relative h-72 -mt-24 z-20 flex justify-center items-center overflow-visible">
        {members.map((img, i) => {
          const angle = (i * (360 / members.length)) + rotation;
          const radiusX = 160; // Horizontal radius increased
          const radiusY = 70;  // Vertical radius for perspective
          const x = Math.sin(angle * (Math.PI / 180)) * radiusX;
          const y = Math.cos(angle * (Math.PI / 180)) * radiusY; 
          const isBack = y < 0; // Behind the card logic

          return (
            <motion.div
              key={i}
              onPan={(e, info) => setRotation(prev => prev + info.delta.x * 0.4)}
              animate={{ x, y, scale: isBack ? 0.7 : 1.3, opacity: isBack ? 0.4 : 1, zIndex: isBack ? 5 : 40 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="absolute cursor-grab active:cursor-grabbing"
            >
              <div className="relative group">
                <img 
                  src={img} 
                  className="w-20 h-20 rounded-full border-4 border-[#D4AF37] object-cover shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-transform duration-300" 
                  alt="Member" 
                />
                {!isBack && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#4A0E0E] text-[8px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    VIEW
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-6 -mt-8 mb-24 relative z-40">
          <button className="bg-white p-4 rounded-full shadow-lg text-gray-400 hover:text-red-500 active:scale-90 transition-all border border-gray-100"><X size={24}/></button>
          <button className="bg-gradient-to-b from-[#4A0E0E] to-[#2D0909] p-6 rounded-full shadow-[0_15px_30px_rgba(74,14,14,0.4)] text-[#D4AF37] border-4 border-white active:scale-95 transition-all"><Heart size={36} fill="#D4AF37"/></button>
          <button className="bg-white p-4 rounded-full shadow-lg text-gray-400 hover:text-[#D4AF37] active:scale-90 transition-all border border-gray-100"><Star size={24}/></button>
      </div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#4A0E0E] p-4 flex justify-around items-center z-[100] rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <Home className="text-[#D4AF37]" size={24} />
        <Heart className="text-[#D4AF37]/40" size={24} />
        <div className="bg-gradient-to-t from-[#D4AF37] to-[#F2D172] p-4 rounded-full -mt-12 border-[6px] border-[#FDF5F5] shadow-2xl active:scale-90 transition-transform">
          <Heart size={30} fill="#4A0E0E" stroke="none" />
        </div>
        <MessageSquareHeart className="text-[#D4AF37]/40" size={24} />
        <UserCircle className="text-[#D4AF37]/40" size={24} />
      </footer>
    </div>
  );
};

export default App;
