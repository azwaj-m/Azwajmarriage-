import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import { Bell, Menu, Search, Filter } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery, toggleSidebar, onNotificationClick }) => {
  const { t } = useTranslation();
  const { userData } = useUser();

  // لاگ ان صارف کی تصویر کا لائیو فال بیک
  const user = userData || {};
  const userPhoto = user.photoURL || user.img || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100';

  return (
    <header className="bg-[#3D0A0A] pt-2.5 pb-3.5 px-4 rounded-b-[24px] shadow-2xl relative z-50 border-b-2 border-[#D4AF37]/30" dir="rtl">
      
      {/* 👑 ٹاپ رو: پروفائل، برانڈ نام اور بیل آئیکن */}
      <div className="flex justify-between items-center mb-3">
        
        {/* بائیں طرف: لائیو یوزر اوتار (ایکٹو کلک کے ساتھ) */}
        <div 
          className="w-8 h-8 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-white/10 cursor-pointer active:scale-95 transition shadow-md"
          onClick={toggleSidebar}
        >
          <img 
            src={userPhoto} 
            className="w-full h-full object-cover" 
            alt="User Account" 
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100';
            }}
          />
        </div>
        
        {/* درمیان میں: برانڈ نام اور پریمیم جیومیٹرک لوگو ہولڈر */}
        <div className="flex items-center gap-3">
          <div className="text-right leading-none flex flex-col justify-center">
            <h1 className="text-2xl font-black text-[#D4AF37] tracking-tighter uppercase mb-0.5">
              Azwaj
            </h1>
            <p className="text-[9px] font-black text-[#D4AF37]/80 tracking-[0.25em] uppercase text-right">
              {t('marriage', 'MARRIAGE')}
            </p>
          </div>
          
          {/* ۹۰ ڈگری زاویہ برانڈ پریمیم لوگو باکس */}
          <div className="bg-gradient-to-br from-[#D4AF37] to-[#AA8928] p-1.5 rounded-xl rotate-3 shadow-lg border border-white/10">
            <img 
              src="/images/Logo.png" 
              className="w-6 h-6 object-contain brightness-110" 
              alt="Azwaj Logo" 
            />
          </div>
        </div>
        
        {/* دائیں طرف: نوٹیفکیشن ایکشن گھنٹی */}
        <button 
          onClick={onNotificationClick} 
          className="bg-[#D4AF37] p-2 rounded-full shadow-xl relative active:scale-90 transition border border-white/20 text-[#3D0A0A]"
        >
          <Bell size={18} fill="#3D0A0A" stroke="none" />
          {/* ایکٹو ریڈ ڈاٹ انڈیکیٹر */}
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full border border-white"></span>
        </button>
      </div>

      {/* 🔍 باٹم رو: مینو بٹن اور پریمیم راؤنڈڈ ان پٹ سرچ بار */}
      <div className="flex gap-2 items-center">
        {/* مینو ٹوگل بٹن */}
        <button 
          onClick={toggleSidebar} 
          className="bg-[#D4AF37] p-2.5 rounded-2xl shadow-lg text-[#3D0A0A] active:scale-95 transition border border-white/10"
        >
          <Menu size={20} />
        </button>
        
        {/* ان پٹ کنٹینر */}
        <div className="relative flex-1 group">
          <input 
            type="text" 
            placeholder={t('search_placeholder', 'یہاں تلاش کریں...')} 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full bg-[#F5E6D3] border-2 border-[#D4AF37]/20 rounded-2xl py-2 pl-10 pr-10 text-[#3D0A0A] text-right outline-none text-[11px] font-black focus:border-[#D4AF37] transition shadow-inner placeholder:text-[#3D0A0A]/40" 
          />
          {/* سرچ گلاس آئیکن دائیں طرف */}
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D0A0A]/60" />
          {/* فلٹر نوچ آئیکن بائیں طرف */}
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37] cursor-pointer hover:text-[#3D0A0A]" />
        </div>
      </div>

    </header>
  );
};

export default Header;
