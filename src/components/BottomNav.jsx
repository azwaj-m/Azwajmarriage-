import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Heart, MessageCircle, User, Crown, Bell } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();

  // پراجیکٹ کے RTL فلو کے مطابق دائیں سے بائیں (Right to Left) ترتیب تاکہ فلوٹنگ چیٹ بالکل سینٹر (تیسرے نمبر) پر رہے
  const tabs = [
    { id: 'home', label: t('nav_home', 'Home'), icon: Home },
    { id: 'discover', label: t('nav_matches', 'Matches'), icon: Heart },
    { id: 'chat', label: t('nav_chat', 'Chat'), icon: MessageCircle }, // سینٹرل فلوٹنگ ایکشن
    { id: 'notifications', label: t('nav_activity', 'Activity'), icon: Bell },
    { id: 'profile', label: t('nav_profile', 'Profile'), icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] max-w-md mx-auto" dir="rtl">
      
      {/* 👑 مین پریمیم نیویگیشن بار (لائٹ لگژری گلاس لک) */}
      <nav className="bg-[#F5E6D3]/95 backdrop-blur-md py-1.5 px-3 border-t-2 border-[#D4AF37]/30 flex justify-between items-end rounded-t-[30px] shadow-[0_-8px_30px_rgba(0,0,0,0.15)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          // ۱۔ چیٹ بٹن کو سینٹرل فلوٹنگ لک دی گئی ہے (باقی فائلز سے فلی کنیکٹڈ)
          if (tab.id === 'chat') {
            return (
              <div key={tab.id} className="flex-1 flex justify-center relative -top-5">
                <button 
                  onClick={() => setActiveTab(tab.id)} 
                  className={`p-3 rounded-full border-4 shadow-2xl transition-all duration-300 transform active:scale-90 ${
                    isActive 
                      ? 'bg-[#4A0E0E] border-[#D4AF37] scale-105' 
                      : 'bg-[#4A0E0E] border-[#FFFDF9] hover:border-[#D4AF37]/50'
                  }`}
                  title={tab.label}
                >
                  <Icon size={20} className="text-[#D4AF37] fill-[#D4AF37]/10" strokeWidth={isActive ? 3 : 2} />
                  {/* ان ریڈ میسیج ڈاٹ انڈیکیٹر */}
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#4A0E0E]"></span>
                </button>
              </div>
            );
          }

          // ۲۔ باقی تمام ریگولر ایکٹو ٹیبز
          return (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-300 relative pb-1 ${
                isActive ? 'text-[#4A0E0E] scale-110 font-black' : 'text-gray-400 opacity-80 hover:opacity-100'
              }`}
            >
              {/* آئیکن پلس ایکٹو اسٹیٹ اینیمیشن */}
              <div className="relative p-1">
                <Icon size={19} strokeWidth={isActive ? 3 : 2} className={isActive ? 'text-[#4A0E0E]' : 'text-gray-500'} />
              </div>

              {/* ٹیکسٹ لیبل */}
              <span className={`text-[8px] font-black uppercase tracking-tight text-center ${isActive ? 'text-[#4A0E0E]' : 'text-gray-500/80'}`}>
                {tab.label}
              </span>

              {/* نیچے موجود ایکٹو پریمیم ڈاٹ */}
              {isActive && (
                <span className="w-1.5 h-1.5 bg-[#4A0E0E] rounded-full absolute bottom-[-2px] animate-pulse"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 📊 پریمیم لائیو اسٹیٹس بار (Super Thin Footer - 100% سنکڈ) */}
      <div className="bg-[#4A0E0E] py-1 px-4 flex justify-between items-center text-[7px] text-white/90 font-bold uppercase tracking-widest border-t border-[#D4AF37]/20">
         <div className="flex items-center gap-1 cursor-pointer active:opacity-80">
           <Crown size={9} className="text-[#D4AF37] fill-[#D4AF37]/20" />
           <span className="text-[#D4AF37] font-black">{t('status_premium', 'PREMIUM MEMBER')}</span>
         </div>
         <div className="flex gap-2.5 items-center text-white/70">
           <span>25 {t('status_exclusive', 'Exclusive')}</span>
           <span className="text-[#D4AF37]/30">|</span>
           <span>12 {t('status_inprogress', 'In Progress')}</span>
           <span className="text-[#D4AF37]/30">|</span>
           <span className="text-[#D4AF37]">88 {t('status_viewed', 'Viewed')}</span>
         </div>
      </div>

    </div>
  );
};

export default BottomNav;

