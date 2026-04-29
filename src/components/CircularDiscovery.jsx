import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const CircularDiscovery = ({ profiles, onSelect }) => {
  const limitedProfiles = profiles.slice(0, 12);
  const x = useMotionValue(0);
  // ڈریگ کرنے پر روٹیشن خودکار ہوگی
  const rotate = useTransform(x, [-200, 200], [-180, 180]);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center touch-none">
      <motion.div
        drag="x"
        style={{ x, rotate }}
        dragConstraints={{ left: 0, right: 0 }}
        className="relative w-[360px] h-[360px] rounded-full border-2 border-[#D4AF37]/20 flex items-center justify-center"
      >
        {limitedProfiles.map((profile, i) => {
          const angle = (i * 360) / limitedProfiles.length;
          return (
            <motion.div
              key={profile.id}
              whileHover={{ scale: 1.2 }}
              className="absolute w-16 h-16 rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-xl bg-[#4A0E0E] cursor-pointer"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${angle}deg) translate(160px) rotate(-${angle}deg)`,
                marginLeft: "-32px",
                marginTop: "-32px"
              }}
              onClick={() => onSelect(profile)}
            >
              <img src={profile.profileImg} className="w-full h-full object-cover" alt="" />
            </motion.div>
          );
        })}
        {/* مرکزی لوگو */}
        <div className="opacity-10 pointer-events-none select-none">
          <h2 className="text-5xl font-serif font-bold text-[#4A0E0E]">AZWAJ</h2>
        </div>
      </motion.div>
    </div>
  );
};

export default CircularDiscovery;
