import React from 'react';
import { Heart, X, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Discover = ({ profiles }) => {
  return (
    <div className="px-6 -mt-20 relative z-30">
      <div className="relative h-[500px] w-full">
        {profiles.map((profile, index) => (
          <motion.div 
            key={profile.id}
            className="absolute inset-0 bg-white rounded-[50px] shadow-2xl overflow-hidden border-4 border-white"
            style={{ zIndex: profiles.length - index }}
          >
            <img src={profile.profileImg} alt={profile.fullName} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/20 to-transparent text-white text-right">
              <h2 className="text-3xl font-bold">{profile.fullName}, {profile.age} <span className="text-yellow-500">✔</span></h2>
              <p className="text-gray-300 text-lg">{profile.education} • {profile.city}</p>
              <p className="text-sm text-gray-400 mt-1">☪ Muslim</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <button className="p-4 bg-white rounded-full shadow-lg text-red-500 border border-gray-100"><X size={28} /></button>
        <button className="p-6 bg-[#4A0E0E] rounded-full shadow-2xl text-yellow-500 border-2 border-yellow-600/50"><Heart size={36} fill="currentColor" /></button>
        <button className="p-4 bg-white rounded-full shadow-lg text-yellow-600 border border-gray-100"><Star size={28} /></button>
      </div>
    </div>
  );
};

export default Discover;
