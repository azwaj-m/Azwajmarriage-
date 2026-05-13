import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import {
  User, Heart, ShieldAlert, Crown, HelpCircle,
  LogOut, X, Languages, Camera, ShieldCheck, Shield
} from 'lucide-react';
import LanguageSelectorModal from './LanguageSelectorModal';
import VerifiedBadge from './VerifiedBadge';

const Sidebar = ({ isOpen, onClose, onAction, onEditProfile }) => {
  const { t, i18n } = useTranslation();
  const { userData, updateProfile } = useUser();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (updateProfile) {
          updateProfile(userData.name, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 👑 سنٹرل برین (App.jsx) کے نئے ایکشنز کے مطابق مینو آئٹمز کی میپنگ اور ایکٹیویشن
  const menuItems = [
    { 
      id: 'profile', 
      label: 'میری پروفائل', 
      icon: User, 
      action: () => {
        // App.jsx میں جا کر 'profile' مینیجر ٹیب اوپن کرے گا
        onAction('main'); 
        setTimeout(() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'profile' })), 50);
      } 
    },
    { 
      id: 'verification', 
      label: 'شناختی تصدیق (CNIC)', 
      icon: ShieldCheck, 
      action: () => {
        alert("شناختی تصدیق کا عمل شروع کیا جا رہا ہے۔ برائے مہربانی اپنا شناختی کارڈ تیار رکھیں۔");
      } 
    },
    { 
      id: 'privacy_settings', 
      label: 'پرائیویسی سیٹنگز', 
      icon: Shield, 
      action: () => {
        onAction('profile'); // پروفائل مینیجر ہینڈلر کو ٹرگر کرے گا
      } 
    },
    { 
      id: 'discover', 
      label: 'پسندیدہ رشتے', 
      icon: Heart, 
      action: () => {
        onAction('main');
        setTimeout(() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'discover' })), 50);
      } 
    },
    { 
      id: 'blocked', 
      label: 'بلاک شدہ لسٹ', 
      icon: ShieldAlert, 
      action: () => {
        // بلاک لسٹ کے پریمیم ویو کو سوئچ کرنے کا کنٹرولر
        onAction('main');
        setTimeout(() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'profile' })), 50);
      } 
    },
    { 
      id: 'premium', 
      label: 'پریمیم ممبرشپ', 
      icon: Crown, 
      action: () => onAction('premium') 
    },
    { 
      id: 'help', 
      label: 'مدد اور سپورٹ', 
      icon: HelpCircle, 
      action: () => onAction('help') 
    }
  ];

  const isRTL = i18n.dir() === 'rtl';

  return (
    <>
      {/* اوورلے (بیک ڈراپ بلر کے ساتھ) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[150] backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* مینو دراز (Drawer) */}
      <div className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-72 bg-[#FFFDF9] z-[200] transform transition-transform duration-300 flex flex-col border-[#D4AF37]/10 shadow-2xl ${isRTL ? (isOpen ? 'translate-x-0' : 'translate-x-full') : (isOpen ? 'translate-x-0' : '-translate-x-full')}`}>

        {/* 👑 شاہی ہیڈر مع اوتار اپلوڈر */}
        <div className="bg-gradient-to-b from-[#4A0E0E] to-[#3D0A0A] p-6 text-center relative flex-shrink-0 rounded-b-[30px] border-b border-[#D4AF37]/20 shadow-lg">
          <button type="button" onClick={onClose} className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} text-[#D4AF37] p-1.5 hover:bg-white/10 rounded-full transition-all active:scale-90`}>
            <X size={20} />
          </button>

          <div className="relative inline-block mt-4 group">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            <div
              className="w-22 h-22 rounded-[25px] border-2 border-[#D4AF37] overflow-hidden mx-auto shadow-xl cursor-pointer relative transition-transform active:scale-95"
              onClick={() => fileInputRef.current.click()}
            >
              <img src={userData?.profileImg || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} alt="User" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
              <Camera className="absolute inset-0 m-auto text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </div>
          </div>
          
          {/* نام اور پریمیم بیج */}
          <h2 className="text-[#D4AF37] mt-3 text-lg font-black tracking-tight flex items-center justify-center gap-1">
            {userData?.name || "شاہ زیب خان"}
            <VerifiedBadge status={userData?.verificationStatus || 'verified'} />
          </h2>
          <p className="text-[#D4AF37]/60 text-[8px] font-bold uppercase tracking-widest mt-0.5">
            {userData?.verificationStatus === 'verified' ? 'Verified Account' : 'Royal Premium Member'}
          </p>
        </div>

        {/* 📜 مینیو لنکس اسکرول ایریا */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { item.action(); onClose(); }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#4A0E0E]/5 group transition-all text-right active:scale-99"
            >
              <div className={`flex items-center gap-3.5 w-full ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
                 <div className="bg-[#F5E6D3]/40 p-2 rounded-xl text-[#4A0E0E] group-hover:bg-[#4A0E0E] group-hover:text-[#D4AF37] transition-all shadow-xs">
                   <item.icon size={16} />
                 </div>
                 <span className={`text-[#4A0E0E] font-black text-xs flex-1 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}>
                   {item.label}
                 </span>
              </div>
            </button>
          ))}

          {/* زبان تبدیل کرنے کا بٹن */}
          <button
            type="button"
            onClick={() => setIsLangModalOpen(true)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] text-[#D4AF37] mt-4 shadow-md border border-[#D4AF37]/20 active:scale-98 transition-all"
          >
            <div className={`flex items-center gap-3.5 w-full ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="bg-[#D4AF37] p-2 rounded-xl text-[#4A0E0E]">
                <Languages size={16} />
              </div>
              <span className="font-black flex-1 text-[10px] uppercase tracking-wider text-center">
                {t('select_language', 'زبان تبدیل کریں (Language)')}
              </span>
            </div>
          </button>
        </div>

        {/* 🚪 لاگ آؤٹ اور ورژن بار */}
        <div className="bg-[#FFFDF9] border-t border-gray-100 p-5 text-center flex-shrink-0">
           <button 
             type="button"
             onClick={() => window.location.reload()} 
             className="flex items-center gap-1.5 text-red-600 font-black text-xs mb-3 mx-auto active:scale-95 transition-all"
           >
             <LogOut size={14} /> سسٹم سے لاگ آؤٹ کریں
           </button>
           <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">
             Version 2.0.4 • Azwaj Royal Ecosystem
           </p>
        </div>
      </div>

      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
