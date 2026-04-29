import React from 'react';
import { motion } from 'framer-motion';

const CircularDiscovery = ({ profiles, rotation = 0 }) => {
  const limitedProfiles = profiles.slice(0, 12);
  const radius = 150;

  return (
    <div className="relative w-[360px] h-[360px] flex items-center justify-center pointer-events-none">
      <motion.div
        animate={{ rotate: -rotation }}
        transition={{ type: "spring", stiffness: 50 }}
        className="relative w-full h-full rounded-full border border-[#D4AF37]/10 flex items-center justify-center"
      >
        {limitedProfiles.map((profile, i) => {
          const angle = (i * 360) / limitedProfiles.length;
          return (
            <div
              key={profile.id}
              className="absolute w-12 h-12 rounded-full border border-[#D4AF37]/30 overflow-hidden bg-white shadow-md"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                marginLeft: "-24px",
                marginTop: "-24px"
              }}
            >
              <img src={profile.profileImg} className="w-full h-full object-cover grayscale opacity-60" alt="" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
export default CircularDiscovery;
