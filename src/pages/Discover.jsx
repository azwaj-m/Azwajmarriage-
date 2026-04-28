import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Heart, X, Star, CheckCircle, SlidersHorizontal, Settings } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';

const Discover = ({ profiles = [], onProfileClick }) => {
  const [rotation, setRotation] = useState(0);
  const validProfiles = profiles.filter(p => p && p.id);

  const CircleProfile = ({ p, style, isLeft }) => (
      <motion.div
        className="absolute w-14 h-14 rounded-full border-[3px] border-[#D4AF37] overflow-hidden shadow-lg bg-white cursor-pointer"
        style={style}
        animate={{ rotate: isLeft ? -10 : 10 }}
        onClick={() => onProfileClick(p)}
      >
        <img src={p.profileImg || "/images/Logo.png"} className="w-full h-full object-cover opacity-80" alt="" />
      </motion.div>
  );

  return (
    <div className="w-full flex flex-col items-center relative z-20">
      
      {/* Circular Swiper Background Area */}
      <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[340px] h-[340px] border-2 border-dashed border-[#D4AF37]/30 rounded-full opacity-60 z-0 pointer-events-none"></div>

      {/* Decorative Side Circles */}
      <div className="absolute top-[80px] inset-0 h-[200px] pointer-events-none z-10">
        {validProfiles.slice(0, 8).map((p, i) => {
          const isLeft = i < 4;
          const index = isLeft ? i : i - 4;
          const xPos = isLeft ? -150 : 150;
          const yPos = index * 60;
          const angle = isLeft ? -150 + index * 30 : 30 - index * 30; // Half circle logic
          return (
            <div key={`side-${p.id}`} className="absolute left-1/2" style={{ x: `${xPos}px`, y: `${yPos}px`, transform: 'translateX(-50%)' }}>
                <CircleProfile p={p} isLeft={isLeft} style={{ transform: `rotate(${angle}deg)` }}/>
            </div>
          );
        })}
      </div>

      {/* Control Buttons (Filters/Preferences) */}
      <div className="w-full flex justify-between px-8 mb-4 relative z-20">
          <button className="flex items-center gap-2 bg-[#4A0E0E] text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-lg border border-[#D4AF37]/30">
            <Settings size={14} className="text-yellow-500" /> Preferences
          </button>
          <button className="flex items-center gap-2 bg-[#4A0E0E] text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-lg border border-[#D4AF37]/30">
            <SlidersHorizontal size={14} className="text-yellow-500" /> Filters
          </button>
      </div>

      {/* Main Card Stack */}
      <main className="relative flex justify-center mb-8 z-20 cursor-grab group">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="w-[300px] h-[390px]"
          onProgress={(s) => setRotation(s.progress * 20)}
          onClick={(s) => onProfileClick(validProfiles[s.activeIndex])}
        >
          {validProfiles.map((user) => (
            <SwiperSlide key={user.id} className="rounded-[45px] bg-white border-[8px] border-white shadow-2xl overflow-hidden relative active:border-[#D4AF37]">
              <img src={user.profileImg || "https://via.placeholder.com/400"} className="w-full h-full object-cover" alt={user.fullName} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 p-8 flex flex-col justify-end text-white text-right" dir="rtl">
                <div className="flex items-center gap-2 mb-2">
                   <h3 className="text-2xl font-bold">{user.fullName}, {user.age || '24'}</h3>
                   {user.verificationStatus && <CheckCircle size={18} className="text-yellow-500 fill-yellow-500/20" />}
                </div>
                <div className="space-y-1 opacity-90 text-xs">
                  <p>🎓 {user.profession || user.education || 'Member'}</p>
                  <p>📍 {user.city || 'Lahore, Pakistan'}</p>
                  <p>🌙 {user.religion || 'Muslim'}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      {/* Action Buttons */}
      <div className="flex items-center gap-8 mb-10 z-20">
          <div className="flex flex-col items-center gap-2.5">
            <button className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-red-600 border border-gray-100 hover:scale-105 active:scale-95 transition-all">
              <X size={34} strokeWidth={3}/>
            </button>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Pass</span>
          </div>

          <div className="flex flex-col items-center gap-2.5">
            <button className="w-22 h-22 rounded-full bg-gradient-to-br from-[#4A0E0E] to-[#631212] shadow-2xl flex items-center justify-center text-[#D4AF37] border-4 border-[#D4AF37]/30 hover:scale-105 active:scale-95 transition-all">
              <Heart size={44} fill="currentColor"/>
            </button>
            <span className="text-[10px] font-bold text-[#4A0E0E] uppercase tracking-tighter">Like</span>
          </div>

          <div className="flex flex-col items-center gap-2.5">
            <button className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-yellow-600 border border-gray-100 hover:scale-105 active:scale-95 transition-all">
              <Star size={34} fill="currentColor"/>
            </button>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Super Like</span>
          </div>
      </div>

      {/* Feature Icons Banner */}
      <div className="grid grid-cols-4 gap-2 bg-white/90 backdrop-blur-sm mx-6 p-5 rounded-[30px] border border-white shadow-xl w-[90%] mb-10 z-20">
        {[
          { icon: <CheckCircle size={20} className="text-yellow-600"/>, label: "Verified Profiles" },
          { icon: "🔒", label: "Private & Secure" },
          { icon: <Heart size={20} className="text-yellow-600"/>, label: "Serious Matches" },
          { icon: "💬", label: "Meaningful Connections" }
        ].map((item, idx) => (
          <div key={idx} className={`flex flex-col items-center text-center gap-1`}>
            <div className="h-8 flex items-center justify-center text-yellow-600">{item.icon}</div>
            <span className="text-[8px] font-bold leading-tight text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Discover;
