import React from 'react';
import { ShieldCheck } from 'lucide-react';

const VerifiedBadge = () => {
  return (
    <div className="inline-flex items-center gap-0.5 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-blue-100">
      <span>تصدیق شدہ</span>
      <ShieldCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />
    </div>
  );
};

export default VerifiedBadge;
