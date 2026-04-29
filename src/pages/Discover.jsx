import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import CircularDiscovery from '../components/CircularDiscovery';
import { X, Heart, MapPin } from 'lucide-react';

const Discover = ({ profiles, onProfileClick }) => {
  const [rotation, setRotation] = useState(0);

  const handleSlideChange = (swiper) => {
    setRotation(swiper.activeIndex * (360 / Math.min(profiles.length, 12)));
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full relative pt-4 bg-[#FDF5F5]">
      <div className="w-[320px] h-[450px] z-30 mt-4">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          onSlideChange={handleSlideChange}
          className="w-full h-full"
        >
          {profiles.slice(0, 12).map((p) => (
            <SwiperSlide key={p.id} className="rounded-[45px] border-4 border-white shadow-2xl bg-white overflow-hidden">
              <div className="relative w-full h-full cursor-pointer" onClick={() => onProfileClick(p)}>
                <img src={p.profileImg} className="w-full h-full object-cover" alt={p.fullName} />
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-right" dir="rtl">
                  <h3 className="text-2xl font-bold flex items-center justify-end gap-2">
                    {p.fullName}, {p.age}
                  </h3>
                  <div className="flex items-center justify-end gap-1 opacity-90 mt-1">
                    <span className="text-sm">{p.city}</span>
                    <MapPin size={14} />
                  </div>
                  <p className="text-xs opacity-70 mt-1">{p.profession}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute top-[300px] w-full flex justify-center z-10 opacity-40 scale-110">
        <CircularDiscovery profiles={profiles} rotation={rotation} />
      </div>
      <div className="fixed bottom-28 flex items-center gap-8 z-40">
        <button className="p-4 bg-white rounded-full shadow-xl text-gray-400 border border-gray-100 hover:text-red-500 transition-colors">
          <X size={32} strokeWidth={3} />
        </button>
        <button className="p-5 bg-gradient-to-br from-[#4A0E0E] to-[#8B1A1A] rounded-full shadow-[0_10px_25px_rgba(74,14,14,0.3)] text-[#D4AF37] border-2 border-[#D4AF37]/50">
          <Heart size={36} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};
export default Discover;
