import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Star, CheckCircle, SlidersHorizontal } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';

const Discover = ({ profiles, rotation, setRotation }) => {
  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Circular Swiper - Positioned above the card stack */}
      <div className="relative w-full h-[80px] mb-6 flex justify-center items-end opacity-70 pointer-events-none z-0">
        {profiles.slice(0, 5).map((p, i) => {
          const angle = (i / (5 - 1)) * Math.PI; // Half circle logic
          const x = Math.cos(angle) * 170;
          const y = Math.sin(angle) * 70;
          return (
            <motion.div 
              key={p.id}
              className="absolute w-14 h-14 rounded-full border-[3px] border-[#D4AF37]/60 overflow-hidden shadow-lg bg-white"
              style={{ transform: `translate(${x}px, ${-y}px) rotate(-${rotation}deg)` }}
            >
              <img src={p.profileImg} className="w-full h-full object-cover" alt="" />
            </motion.div>
          );
        })}
      </div>

      {/* Main Tinder-style Card Stack */}
      <main className="relative z-20 flex justify-center mb-10 group">
        <Swiper 
          effect={'cards'} cardsEffect={{ slideShadows: false, rotate: true, perSlideOffset: 8, perSlideRotate: 2 }} 
          grabCursor={true} 
          modules={[EffectCards]} 
          className="w-[290px] h-[370px]"
          onPan={(swiper) => setRotation(swiper.translate * 0.1)}
        >
          {[...profiles, ...Array(10).fill(profiles[0])].slice(0, 10).map((user, i) => (
            <SwiperSlide key={user.id} className="rounded-[40px] bg-white border-[6px] border-white shadow-2xl overflow-hidden relative group active:border-[#D4AF37]">
              <img src={user.profileImg} className="w-full h-full object-cover group-active:scale-105 transition-transform duration-500" alt={user.fullName} />
              
              {/* Premium Gradient Overlay with Right-to-Left text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 p-6 flex flex-col justify-end text-white text-right" dir="rtl">
                <div className="flex items-center gap-2 mb-2">
                   {user.verificationStatus && <CheckCircle size={18} className="text-yellow-500 fill-yellow-500/20" />}
                   <h3 className="text-2xl font-bold">{user.fullName}, {user.age || '24'}</h3>
                </div>
                <p className="text-sm opacity-90">{user.education || 'Masters in Psychology'}</p>
                <p className="text-xs opacity-80">{user.city || 'Lahore, Pakistan'} • {user.religion || 'Muslim'}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      {/* High-End Action Buttons (Pass, Like, Super Like) */}
      <div className="flex items-center gap-8 mb-12 z-30">
        <div className="flex flex-col items-center gap-2.5">
          <button className="w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center text-red-600 border border-gray-100 active:scale-90 active:bg-gray-50 transition-all">
            <X size={32} strokeWidth={3} />
          </button>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pass</span>
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <button className="w-22 h-22 rounded-full bg-gradient-to-br from-[#4A0E0E] to-[#631212] shadow-[0_15px_40px_rgba(74,14,14,0.4)] flex items-center justify-center text-[#D4AF37] border-4 border-[#D4AF37]/30 active:scale-95 transition-transform">
            <Heart size={44} fill="currentColor" />
          </button>
          <span className="text-[10px] font-bold text-[#4A0E0E] uppercase tracking-widest">Like</span>
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <button className="w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center text-yellow-600 border border-gray-100 active:scale-90 active:bg-gray-50 transition-all">
            <Star size={32} fill="currentColor" />
          </button>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Super Like</span>
        </div>
      </div>

      {/* Feature Icons Banner - Correctmodular placement */}
      <div className="grid grid-cols-4 gap-2 bg-white/80 backdrop-blur-sm mx-6 p-5 rounded-3xl border border-gray-100 shadow-xl mb-12 relative z-0 w-[90%]">
        {[
          { icon: <CheckCircle size={22} />, label: "Verified Profiles" },
          { icon: "🔒", label: "Private & Secure" },
          { icon: <Heart size={22} />, label: "Serious Matches" },
          { icon: "💬", label: "Meaningful Connections" }
        ].map((item, idx) => (
          <div key={idx} className={`flex flex-col items-center text-center ${idx !== 0 ? 'border-l border-gray-200 pl-2' : ''}`}>
            <div className="text-yellow-600 mb-1">{item.icon}</div>
            <span className="text-[8px] font-bold leading-tight">{item.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Discover;
