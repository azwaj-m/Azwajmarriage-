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
      reader.onloadend = () => updateProfile(userData.name, reader.result);
      reader.readAsDataURL(file);
    }
  };

  // مینو آئٹمز میں پرائیویسی سیٹنگز (privacy_settings) اور ہیلپ سنٹر (help) کو فعال کر دیا گیا ہے
  const menuItems = [
    { id: 'profile', label: 'میری پروفائل', icon: User, action: () => onEditProfile() },
    { id: 'verification', label: 'شناختی تصدیق (CNIC)', icon: ShieldCheck, action: () => onAction('verification') },
    { id: 'privacy_settings', label: 'پرائیویسی سیٹنگز', icon: Shield, action: () => onAction('privacy_settings') },
    { id: 'discover', label: 'پسندیدہ رشتے', icon: Heart, action: () => onAction('main', 'discover') },
    { id: 'blocked', label: 'بلاک شدہ لسٹ', icon: ShieldAlert, action: () => onAction('blocked') },
    { id: 'premium', label: 'پریمیم ممبرشپ', icon: Crown, action: () => onAction('premium') },
    { id: 'help', label: 'مدد اور سپورٹ', icon: HelpCircle, action: () => onAction('help') }
  ];

  const isRTL = i18n.dir() === 'rtl';

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[150] backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-72 bg-[#FDF5F5] z-[200] transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')}`}>

        <div className="bg-[#4A0E0E] p-8 text-center relative flex-shrink-0">
          <button onClick={onClose} className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} text-[#D4AF37]`}>
            <X size={24} />
          </button>

          <div className="relative inline-block mt-4 group">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            <div
              className="w-24 h-24 rounded-full border-4 border-[#D4AF37] overflow-hidden mx-auto shadow-xl cursor-pointer relative"
              onClick={() => fileInputRef.current.click()}
            >
              <img src={userData?.profileImg || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} alt="User" className="w-full h-full object-cover group-hover:opacity-50" />
              <Camera className="absolute inset-0 m-auto text-white opacity-0 group-hover:opacity-100" size={24} />
            </div>
          </div>
          {/* نام اور ڈائنامک ویریفیکیشن بیج */}
          <h2 className="text-[#D4AF37] mt-4 text-2xl font-black italic flex items-center justify-center gap-1.5">
            {userData?.name || "صارف"}
            <VerifiedBadge status={userData?.verificationStatus} />
          </h2>
          <p className="text-[#D4AF37]/60 text-[8px] uppercase font-bold tracking-widest">
            {userData?.verificationStatus === 'verified' ? 'Verified Account' : 'Verification Required'}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { item.action(); onClose(); }}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#4A0E0E]/5 group transition-colors"
            >
              <div className={`flex items-center gap-4 w-full ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
                 <div className="bg-[#F5E6D3] p-2 rounded-xl text-[#4A0E0E] group-hover:bg-[#4A0E0E] group-hover:text-[#D4AF37]">
                   <item.icon size={20} />
                 </div>
                 <span className={`text-[#4A0E0E] font-bold flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                   {item.label}
                 </span>
              </div>
            </button>
          ))}

          <button
            onClick={() => setIsLangModalOpen(true)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#4A0E0E] text-[#D4AF37] mt-4 shadow-lg"
          >
            <div className={`flex items-center gap-4 w-full ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="bg-[#D4AF37] p-2 rounded-xl text-[#4A0E0E]">
                <Languages size={20} />
              </div>
              <span className="font-bold flex-1 text-xs uppercase tracking-widest text-center">
                {t('select_language', 'زبان تبدیل کریں')}
              </span>
            </div>
          </button>
        </div>

        <div className="bg-[#FDF5F5] border-t border-[#4A0E0E]/10 p-6 text-center flex-shrink-0">
           <button className="flex items-center gap-2 text-red-600 font-black uppercase text-xs mb-4 mx-auto">
             <LogOut size={16} /> لاگ آؤٹ
           </button>
           <p className="text-[8px] text-gray-400 font-bold uppercase">
             Version 2.0.4 • Azwaj Ecosystem
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
