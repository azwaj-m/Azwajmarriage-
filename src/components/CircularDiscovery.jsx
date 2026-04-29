import React from 'react';
import { motion } from 'framer-motion';

const CircularDiscovery = ({ profiles, onSelect, rotation }) => {
  const limitedProfiles = profiles.slice(0, 12);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <motion.div
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        className="relative w-[380px] h-[380px] rounded-full border border-[#D4AF37]/10"
      >
        {limitedProfiles.map((profile, i) => {
          const angle = (i * 360) / limitedProfiles.length;
          return (
            <div
              key={profile.id}
              className="absolute w-16 h-16 rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-2xl bg-[#4A0E0E] cursor-pointer"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${angle}deg) translate(190px) rotate(-${angle}deg)`,
                marginLeft: "-32px",
                marginTop: "-32px"
              }}
              onClick={() => onSelect(profile)}
            >
              <img src={profile.profileImg} className="w-full h-full object-cover" alt="" />
            </div>
          );
        })}
      </motion.div>

      {/* مرکزی لوگو جو تصویر کے مطابق ہلکا نظر آئے گا */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <h2 className="text-6xl font-serif font-bold text-[#4A0E0E]">AZWAJ</h2>
      </div>
    </div>
  );
};

export default CircularDiscovery;
