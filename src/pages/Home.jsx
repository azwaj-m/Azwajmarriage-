import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearch } from '../context/SearchContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import { MapPin, ShieldCheck, ChevronRight, Heart, User, Send } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';
import 'swiper/css';
import 'swiper/css/effect-cards';

const Home = ({ setSelectedProfile, onAction }) => {
  const { t, i18n } = useTranslation();
  
  // گلوبل سرچ کانٹیکسٹ سے ڈیٹا حاصل کریں
  const { filteredResults = [], searchQuery = '' } = useSearch();

  // ڈیفالٹ اوتار تصویر
  const defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';

  // 🎯 پروفائل اوپن کرنے کا ماسٹر ہینڈلر (جو ہوم پیج کو شفٹ کرے گا)
  const handleProfileOpen = (profile) => {
    if (!profile) return;
    
    // ۱۔ سب سے پہلے منتخب کردہ پروفائل کا ڈیٹا سیٹ کریں
    if (setSelectedProfile) {
      setSelectedProfile(profile);
    }

    // ۲۔ ایپ کے مرکزی برین (App.jsx) کو سگنل دیں کہ وہ پروفائل ویو پر سوئچ کر جائے
    if (onAction) {
      onAction('profile'); 
    } else {
      // اگر onAction دستیاب نہ ہو تو کسٹم ایونٹ کے ذریعے ٹیب سوئچ کریں
      window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'profile' }));
    }
  };

  // لائیو لائک اور کنکٹ ہینڈلرز
  const handleLike = (e, profile) => {
    e.stopPropagation(); // سوائپر کلک ایونٹ کو روکنے کے لیے
    const name = profile?.displayName || profile?.name || t('user', 'صارف');
    alert(`${name} کو آپ کی پسندیدہ لسٹ میں شامل کر دیا گیا ہے!`);
  };

  const handleConnect = (e, profile) => {
    e.stopPropagation();
    const name = profile?.displayName || profile?.name || t('user', 'صارف');
    alert(`${name} کو کنکشن کی درخواست کامیابی سے بھیج دی گئی ہے!`);
  };

  const isRTL = i18n.dir() === 'rtl';

  return (
    <div className="flex flex-col gap-8 pb-4 pt-8 w-full min-h-screen text-right" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* 🔎 سرچ رزلٹ کے اعداد و شمار */}
      {searchQuery && (
        <div className="px-6 text-center -mb-4 animate-fadeIn">
          <h1 className="text-sm font-black text-[#4A0E0E] uppercase tracking-wider">
            {t('search_results', 'تلاش کے نتائج')}
          </h1>
          <p className="text-[10px] text-[#D4AF37] font-bold mt-1">
            "{searchQuery}" کے لیے {filteredResults.length} پروفائلز ملے
          </p>
        </div>
      )}

      {/* ۱۔ مین سوائپر کارڈز سیکشن */}
      <div className="px-12 relative h-[420px] flex items-center justify-center">
        {filteredResults && filteredResults.length > 0 ? (
          <Swiper 
            effect={'cards'} 
            grabCursor={true} 
            centeredSlides={true} 
            modules={[EffectCards, Autoplay]} 
            autoplay={searchQuery ? false : { delay: 3000, disableOnInteraction: false }} 
            className="w-full max-w-[270px] h-[400px]"
          >
            {filteredResults.map((p) => (
              <SwiperSlide 
                key={p?.uid || p?.id || Math.random().toString()} 
                className="rounded-[45px] bg-transparent shadow-[0_0_20px_rgba(212,175,55,0.4)] border-[4px] border-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#AA8928] overflow-hidden relative animate-pulse-slow"
              >
                {/* 🛠️ کلک پر اب handleProfileOpen رن ہوگا */}
                <div className="relative h-full w-full cursor-pointer group" onClick={() => handleProfileOpen(p)}>
                  <img 
                    src={p?.photoURL || p?.img || defaultAvatar} 
                    alt={p?.displayName || p?.name} 
                    className="w-full h-full object-cover rounded-[38px]" 
                    onError={(e) => { e.target.src = defaultAvatar; }}
                  />
                  
                  {/* پسندیدہ (Heart) آئیکن */}
                  <button 
                    type="button"
                    onClick={(e) => handleLike(e, p)}
                    className="absolute top-4 right-4 bg-[#FFFDF9]/30 backdrop-blur-md p-2 rounded-full border border-white/40 shadow-md active:scale-90 transition-all z-10"
                  >
                    <Heart size={16} className="text-white fill-[#D4AF37]" />
                  </button>
                  
                  {/* کارڈ انفارمیشن اوورلے */}
                  <div className="absolute inset-x-0 bottom-0 bg-[#FFFDF9]/95 backdrop-blur-xs p-4 m-2 rounded-[35px] shadow-2xl text-center border border-gray-100/50">
                    <h2 className="text-[#4A0E0E] font-black text-base tracking-tighter uppercase flex items-center justify-center gap-1">
                      {p?.displayName || p?.name || 'مستند صارف'}
                      <VerifiedBadge status={p?.verificationStatus || 'verified'} />
                    </h2>
                    
                    <div className="flex flex-col items-center gap-0.5 mt-1">
                      <p className="text-[9px] font-bold text-[#4A0E0E] font-bold uppercase tracking-widest">
                        {t('age', 'عمر')}: <span className="text-[#4A0E0E]">{p?.age || 'N/A'}</span> • {t('prof', 'پیشہ')}: <span className="text-[#4A0E0E]">{t(p?.jobKey || 'designer', p?.profession || 'ملازمت')}</span>
                      </p>
                      <div className="flex items-center gap-1 text-[9px] font-black text-[#D4AF37] uppercase">
                        <MapPin size={10} className="text-[#4A0E0E]" /> {t(p?.cityKey || 'karachi', p?.city || 'پاکستان')}
                      </div>
                    </div>
                    
                    {/* کنٹرول ایکشن بٹنز */}
                    <div className="flex gap-2 mt-3">
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleProfileOpen(p); }}
                        className="flex-1 bg-[#F5E6D3] text-[#4A0E0E] py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-1"
                      >
                        <User size={10} /> {t('view_profile', 'پروفائل')}
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => handleConnect(e, p)}
                        className="flex-1 bg-[#4A0E0E] text-[#D4AF37] py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1"
                      >
                        <Send size={10} /> {t('connect', 'رابطہ')}
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-20 text-gray-400 text-xs font-bold bg-[#FFFDF9] border border-gray-100 rounded-[45px] p-6 shadow-xl max-w-[260px] h-[380px] flex flex-col justify-center items-center">
            <span className="text-3xl mb-3">🔍</span>
            <p className="text-[#4A0E0E] text-sm font-black">کوئی مماثلت نہیں ملی</p>
          </div>
        )}
      </div>

      {/* ۲۔ ہوریزنٹل اسکرول لسٹ (معزز رشتے) */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#4A0E0E] font-black text-xs uppercase tracking-wider">{t('top_matches', 'معزز رشتے')}</h3>
          <button 
            type="button"
            onClick={() => alert("تمام معزز رشتے لوڈ کیے جا رہے ہیں...")}
            className="text-[9px] font-black text-[#D4AF37] flex items-center gap-0.5 uppercase italic bg-transparent border-none"
          >
            {t('explore_all', 'سب دیکھیں')} <ChevronRight size={12} className={isRTL ? 'rotate-180' : ''} />
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-1 snap-x snap-mandatory">
          {filteredResults && filteredResults.length > 0 ? (
            filteredResults.map((p) => (
              <div 
                key={`scroll-${p?.uid || p?.id || Math.random().toString()}`} 
                onClick={() => handleProfileOpen(p)} 
                className="flex flex-col items-center gap-1.5 flex-shrink-0 snap-start cursor-pointer transition-transform active:scale-95 group"
              >
                <div className="relative p-0.5 rounded-[22px] border-2 border-[#D4AF37] shadow-xl bg-[#2b000d]">
                  <div className="w-20 h-24 rounded-2xl overflow-hidden border border-[#D4AF37]/30 relative">
                    <img 
                      src={p?.photoURL || p?.img || defaultAvatar} 
                      alt={p?.displayName || p?.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { e.target.src = defaultAvatar; }}
                    />
                  </div>
                  {(p?.verificationStatus === 'verified' || !p?.verificationStatus) && (
                    <div className="absolute bottom-0 right-0 transform translate-x-0.5 translate-y-0.5 scale-75">
                      <VerifiedBadge status={p?.verificationStatus || 'verified'} />
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-black text-white mt-1">
                  {(p?.displayName || p?.name || t('user', 'صارف')).split(' ')[0]}
                </span>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-[10px] font-bold py-6 w-full text-center bg-gray-50 rounded-2xl">
              کوئی معزز رشتہ دستیاب نہیں
            </div>
          )}
        </div>
      </div>

      {/* ۳۔ ٹرسٹ بیجز */}
      <div className="px-5 flex justify-between gap-2 mt-2">
         <TrustBadge label={t('verified_label', '100% تصدیق شدہ')} sub={t('verified_sub', 'شناختی کارڈ ویریفائیڈ')} />
         <TrustBadge label={t('privacy_label', 'محفوظ پرائیویسی')} sub={t('privacy_sub', 'ڈیٹا مکمل پوشیدہ')} />
         <TrustBadge label={t('serious_label', 'سنجیدہ رشتے')} sub={t('serious_sub', 'صرف فیملی ممبرز')} />
      </div>
    </div>
  );
};

const TrustBadge = ({ label, sub }) => (
  <div className="flex flex-col items-center text-center flex-1 max-w-[115px] bg-[#FFFDF9] border border-gray-100/70 p-2.5 rounded-[22px] shadow-xs">
    <div className="bg-[#F5E6D3] p-2 rounded-xl mb-1.5 border border-[#D4AF37]/10">
      <ShieldCheck size={14} className="text-[#4A0E0E]" />
    </div>
    <h4 className="text-[8px] font-black text-[#4A0E0E] uppercase tracking-wide leading-tight min-h-[12px]">{label}</h4>
    <p className="text-[7px] text-gray-400 font-bold mt-0.5 leading-normal">{sub}</p>
  </div>
);

export default Home;
