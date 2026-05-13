import React from 'react';
import { ShieldCheck } from 'lucide-react';

const VerifiedBadge = ({ status }) => {
  // اگر اسٹیٹس تصدیق شدہ (verified) نہ ہو تو کچھ بھی رینڈر نہیں ہوگا
  if (status !== 'verified') return null;

  return (
    <div 
      className="inline-flex items-center justify-center bg-gradient-to-br from-[#D4AF37] via-[#AA8928] to-[#9A7B1C] p-1 rounded-lg border border-white/40 shadow-[0_2px_8px_rgba(212,175,55,0.4)] transition-all hover:scale-110"
      title="Verified Account"
    >
      {/* پریمیم شیلڈ آئیکن جو آپ کے ڈیزائن کی عکاسی کرتا ہے */}
      <ShieldCheck 
        size={12} 
        className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" 
        strokeWidth={3}
      />
    </div>
  );
};

export default VerifiedBadge;
