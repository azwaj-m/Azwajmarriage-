import React from 'react';
import { Heart, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Discover = ({ profiles, rotation, setRotation }) => {
  return (
    <div className="px-6 -mt-16 relative z-30">
      <div className="relative h-[450px] w-full">
        {profiles.map((profile, index) => (
          <motion.div 
            key={profile.id}
            className="absolute inset-0 bg-white rounded-[40px] shadow-2xl overflow-hidden border-2 border-white"
            style={{ zIndex: profiles.length - index }}
          >
            <img src={profile.profileImg} alt={profile.fullName} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-right">
              <h2 className="text-3xl font-bold">{profile.fullName}, {profile.age}</h2>
              <p className="text-yellow-500 font-medium">{profile.education} • {profile.city}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center gap-8 mt-8">
        <button className="p-5 bg-white rounded-full shadow-xl text-red-500 active:scale-90 transition-transform">
          <X size={32} />
        </button>
        <button className="p-5 bg-[#4A0E0E] rounded-full shadow-xl text-yellow-500 active:scale-90 transition-transform">
          <Heart size={32} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default Discover;
