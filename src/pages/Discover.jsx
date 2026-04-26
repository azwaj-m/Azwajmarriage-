import React from 'react';
import { motion } from 'framer-motion';
import { Heart, X, Star } from 'lucide-react';

const Discover = ({ profiles }) => {
  return (
    <div className="flex flex-col items-center">
      
      {/* Circular Profile Swiper (Background Decor) */}
      <div className="relative w-full h-[150px] flex justify-center items-end opacity-80 pointer-events-none">
        {profiles.slice(0, 7).map((p, i) => {
          const angle = (i / (7 - 1)) * Math.PI; // Half circle logic
          const x = Math.cos(angle) * 160;
          const y = Math.sin(angle) * 80;
          return (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute w-14 h-14 rounded-full border-2 border-yellow-500 overflow-hidden shadow-lg bg-white"
              style={{ transform: `translate(${x}px, ${-y}px)` }}
            >
              <img src={p.profileImg} className="w-full h-full object-cover" alt="" />
            </motion.div>
          );
        })}
      </div>

      {/* Main Profile Card */}
      <div className="relative w-full max-w-[320px] aspect-[3/4] -mt-12 group">
        <AnimatePresence>
          {profiles.slice(0, 1).map((profile) => (
            <motion.div
              key={profile.id}
              className="absolute inset-0 bg-white rounded-[40px] shadow-2xl overflow-hidden border-4 border-white cursor-grab active:cursor-grabbing"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <img src={profile.profileImg} className="w-full h-full object-cover" alt={profile.fullName} />
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {profile.fullName}, {profile.age}
                  <span className="bg-yellow-500 w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    <Star size={10} fill="white" className="text-white" />
                  </span>
                </h2>
                <p className="text-gray-200 text-sm mt-1">{profile.education}</p>
                <p className="text-yellow-500 font-medium text-xs mt-1">📍 {profile.city}, Pakistan</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 mt-8 mb-24">
        <button className="bg-white p-4 rounded-full shadow-lg text-red-500 active:scale-90 transition-all border border-gray-100">
          <X size={28} />
        </button>
        <button className="bg-[#4A0E0E] p-6 rounded-full shadow-xl text-[#D4AF37] active:scale-90 transition-all border-2 border-[#D4AF37]">
          <Heart size={36} fill="#D4AF37" />
        </button>
        <button className="bg-white p-4 rounded-full shadow-lg text-yellow-600 active:scale-90 transition-all border border-gray-100">
          <Star size={28} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

const AnimatePresence = ({ children }) => <>{children}</>; // Simple placeholder for framer-motion

export default Discover;
