import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import CircularDiscovery from '../components/CircularDiscovery';
import { X, Heart } from 'lucide-react';

// Swiper CSS لازمی ہے ورنہ کارڈز بکھر جائیں گے
import 'swiper/css';
import 'swiper/css/effect-cards';

const Discover = ({ profiles, onProfileClick }) => {
  const [rotation, setRotation] = useState(0);

  const handleSlideChange = (swiper) => {
    setRotation(swiper.activeIndex * (360 / 12));
  };

  return (
    <div className="flex flex-col items-center px-6 relative min-h-[600px]">
      {/* 1. کارڈ اسٹیک (Front Layer) */}
      <div className="w-full max-w-[300px] h-[400px] z-20 mt-10">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          onSlideChange={handleSlideChange}
          className="h-full"
        >
          {profiles.slice(0, 10).map((p) => (
            <SwiperSlide key={p.id} className="rounded-[40px] shadow-2xl overflow-hidden bg-white border border-white/20">
              <div className="relative h-full" onClick={() => onProfileClick(p)}>
                <img src={p.profileImg} className="w-full h-full object-cover" alt="" />
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-[#4A0E0E] via-black/20 to-transparent text-white text-right" dir="rtl">
                  <h3 className="text-2xl font-bold">{p.fullName}, {p.age}</h3>
                  <p className="text-sm opacity-80">{p.profession}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. سرکلر ڈسکوری (Back Layer - Positioned exactly like the image) */}
      <div className="absolute top-[280px] z-10 w-full flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
           <CircularDiscovery profiles={profiles} rotation={rotation} onSelect={onProfileClick} />
        </div>
      </div>

      {/* 3. ایکشن بٹنز */}
      <div className="fixed bottom-28 flex items-center gap-8 z-30">
        <button className="p-4 bg-white rounded-full shadow-xl text-red-500 border border-gray-100 active:scale-90 transition-transform">
          <X size={30} />
        </button>
        <button className="p-[18px] bg-gradient-to-br from-[#4A0E0E] to-[#631212] rounded-full shadow-2xl text-[#D4AF37] active:scale-90 transition-transform">
          <Heart size={32} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default Discover;
