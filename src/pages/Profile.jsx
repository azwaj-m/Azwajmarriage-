import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, ArrowLeft, Send } from 'lucide-react';

const Profile = ({ profile, onBack }) => {
  const { t } = useTranslation();
  
  if (!profile) return null;

  // رابطہ کرنے کا ایکٹو ہینڈلر جو اسکرین کو صاف کر کے ایکشن لے گا
  const handleConnectAction = () => {
    const name = profile.displayName || profile.name || t('user', 'صارف');
    alert(`${name} کے ساتھ رابطہ قائم کیا جا رہا ہے...`);
    
    // سب سے اہم فکس: اگلا ویو کھولنے سے پہلے موجودہ فل اسکرین پروفائل کو ہٹائیں
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#FDFCFB] z-[100] overflow-y-auto pb-20 animate-in slide-in-from-bottom duration-300 shadow-2xl" dir="rtl">
      {/* ہیڈر امیج اور بیک بٹن */}
      <div className="relative h-[45vh] w-full">
        <img 
          src={profile.photoURL || profile.img || 'https://via.placeholder.com/500'} 
          className="w-full h-full object-cover" 
          alt={profile.name || 'Profile'} 
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500'; }}
        />
        <button 
          type="button"
          onClick={onBack} 
          className="absolute top-6 right-6 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-white active:scale-90 transition-transform z-50"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* پروفائل تفصیلات کا ڈیٹا */}
      <div className="px-6 -mt-10 relative bg-[#FDFCFB] rounded-t-[50px] pt-8 shadow-inner">
        <h2 className="text-3xl font-black text-[#4A0E0E] tracking-tighter mb-2">
          {profile.displayName || profile.name}
        </h2>
        
        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm mb-6 uppercase">
          <MapPin size={16} /> {t(profile.cityKey || 'karachi')}, {t(profile.countryKey || 'pakistan')}
        </div>
        
        {/* معلومات گریڈ */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-transparent p-4 rounded-3xl border border-gray-100 shadow-xs">
             <p className="text-gray-400 text-[10px] uppercase font-bold">{t('age', 'عمر')}</p>
             <p className="text-[#4A0E0E] font-black mt-0.5">{profile.age || 'N/A'}</p>
          </div>
          <div className="bg-transparent p-4 rounded-3xl border border-gray-100 shadow-xs">
             <p className="text-gray-400 text-[10px] uppercase font-bold">{t('prof', 'پیشہ')}</p>
             <p className="text-[#4A0E0E] font-black mt-0.5">{t(profile.jobKey || 'designer')}</p>
          </div>
        </div>

        {/* 🚀 فکسڈ ایکشن بٹن: کلک ہوتے ہی پروفائل بند ہوگی اور مینیو کھل جائے گا */}
        <button 
          type="button"
          onClick={handleConnectAction}
          className="w-full bg-[#4A0E0E] text-[#D4AF37] hover:bg-[#3d0a0a] py-5 rounded-[25px] mt-8 font-black text-sm shadow-2xl active:scale-95 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-2"
        >
          <Send size={16} />
          {t('connect', 'رابطہ قائم کریں')}
        </button>
      </div>
    </div>
  );
};

export default Profile;
