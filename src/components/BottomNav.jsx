import React from 'react';
import { Home, Heart, MessageCircle, User, Bell, Crown } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab, setCurrentView }) => {
  const tabs = [
    { id: 'home', label: 'ہوم', icon: Home },
    { id: 'discover', label: 'تلاش', icon: Heart },
    { id: 'chat', label: 'چیٹ', icon: MessageCircle },
    { id: 'notifications', label: 'سرگرمی', icon: Bell },
    { id: 'profile', label: 'پروفائل', icon: User },
  ];

  const handlePress = (id) => {
    setActiveTab(id);
    setCurrentView('main');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] max-w-md mx-auto" dir="rtl">
      {/* 👑 مین نیویگیشن بار */}
      <nav className="bg-[#2b000d]/95 backdrop-blur-md py-1.5 px-3 border-t-2 border-[#D4AF37]/30 flex justify-between items-end rounded-t-[30px] shadow-[0_-8px_30px_rgba(0,0,0,0.4)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.id === 'chat') {
            return (
              <div key={tab.id} className="flex-1 flex justify-center relative -top-6">
                <button
                  onClick={() => handlePress(tab.id)}
                  className={`p-4 rounded-full border-4 shadow-2xl transition-all duration-300 transform active:scale-90 ${
                    isActive ? 'bg-[#D4AF37] border-[#2b000d]' : 'bg-[#2b000d] border-[#D4AF37]'
                  }`}
                >
                  <Icon size={24} className={isActive ? 'text-[#1a0007]' : 'text-[#D4AF37]'} />
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-[#2b000d]"></span>
                </button>
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => handlePress(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 pb-1 transition-all ${
                isActive ? 'text-[#D4AF37]' : 'text-[#D4AF37]/40'
              }`}
            >
              <Icon size={isActive ? 22 : 18} strokeWidth={isActive ? 3 : 2} />
              <span className="text-[8px] font-black uppercase tracking-tighter">{tab.label}</span>
              {isActive && <span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-0.5 animate-pulse"></span>}
            </button>
          );
        })}
      </nav>

      {/* 📊 پریمیم لائیو اسٹیٹس بار (وہی میرون شیڈ) */}
      <div className="bg-[#1a0007] py-1 px-4 flex justify-between items-center text-[7px] text-white/80 font-bold tracking-widest border-t border-[#D4AF37]/10">
          <div className="flex items-center gap-1">
            <Crown size={10} className="text-[#D4AF37]" />
            <span className="text-[#D4AF37]">PREMIUM MEMBER</span>
          </div>
          <div className="flex gap-3 opacity-60">
            <span>25 EXCLUSIVE</span>
            <span>|</span>
            <span>88 VIEWED</span>
          </div>
      </div>
    </div>
  );
};

export default BottomNav;
