import React from 'react';

const CircularDiscovery = () => {
  return (
    <div className="h-64 flex items-center justify-center relative">
      <div className="w-40 h-40 border-4 border-dashed border-rose-300 rounded-full animate-spin absolute"></div>
      <div className="w-32 h-32 bg-rose-100 rounded-full flex flex-col items-center justify-center text-center p-4 shadow-inner">
        <h4 className="font-bold text-rose-600 text-xs">رشتہ میچنگ</h4>
        <p className="text-[10px] text-gray-500 mt-1">آپ کے متبادل رشتے تلاش کیے جا رہے ہیں</p>
      </div>
    </div>
  );
};

export default CircularDiscovery;
