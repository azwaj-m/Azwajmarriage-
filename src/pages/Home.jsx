import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearch } from '../context/SearchContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import { MapPin, ShieldCheck, ChevronRight, Heart } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';
import 'swiper/css';
import 'swiper/css/effect-cards';

const Home = ({ setSelectedProfile }) => {
  const { t } = useTranslation();
  
  // گلوبل سرچ کانٹیکسٹ سے ڈیٹا اور سرچ اسٹیٹ حاصل کریں
  const { filteredResults, searchQuery } = useSearch();

  return (
    <div className="flex flex-col gap-8 pb-28 pt-4">
      
      {/* سرچ رزلٹ کے اعداد و شمار (صرف اس وقت نظر آئیں گے جب سرچ بار میں کچھ ٹائپ ہو) */}
      {searchQuery && (
        <div className="px-6 text-center -mb-4">
          <h1 className="text-sm font-black text-[#4A0E0E] uppercase tracking-wider">
            {t('search_results', 'تلاش کے نتائج')}
          </h1>
          <p className="text-[10px] text-[#D4AF37] font-bold mt-1">
            "{searchQuery}" کے لیے {filteredResults.length} پروفائلز ملے
          </p>
        </div>
      )}

      {/* ۱۔ مین سوائپر کارڈز سیکشن */}
      <div className="px-12 relative h-[400px] flex items-center justify-center">
        {filteredResults.length > 0 ? (
          <Swiper 
            effect={'cards'} 
            grabCursor={true} 
            centeredSlides={true} 
            modules={[EffectCards, Autoplay]} 
            autoplay={searchQuery ? false : { delay: 3000 }} 
            className="w-full max-w-[260px] h-[380px]"
          >
            {filteredResults.map((p) => (
              <SwiperSlide key={p.uid || p.id} className="rounded-[45px] bg-white shadow-2xl border-[6px] border-white overflow-hidden">
                <div className="relative h-full w-full cursor-pointer" onClick={() => setSelectedProfile(p)}>
                  <img src={p.photoURL || p.img || 'https://via.placeholder.com/500'} alt={p.displayName || p.name} className="w-full h-full object-cover" />
                  
                  {/* پسندیدہ (Heart) آئیکن */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30">
                    <Heart size={16} className="text-white fill-[#D4AF37]" />
                  </div>
                  
                  {/* کارڈ انفارمیشن اوورلے */}
                  <div className="absolute inset-x-0 bottom-0 bg-white p-5 m-2 rounded-[35px] shadow-xl text-center border border-gray-50">
                    <h2 className="text-[#4A0E0E] font-black text-xl tracking-tighter uppercase flex items-center justify-center gap-1">
                      {p.displayName || p.name}
                      <VerifiedBadge status={p.verificationStatus} />
                    </h2>
                    
                    <div className="flex flex-col items-center gap-1 mt-1">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {t('age')}: <span className="text-[#4A0E0E]">{p.age || 'N/A'}</span> • {t('prof')}: <span className="text-[#4A0E0E]">{t(p.jobKey || 'designer')}</span>
                      </p>
                      <div className="flex items-center gap-1 text-[9px] font-black text-[#D4AF37] uppercase">
                        <MapPin size={10} /> {t(p.cityKey || 'karachi')}, {t(p.countryKey || 'pakistan')}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 bg-[#F5E6D3] text-[#4A0E0E] py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest">{t('view_profile')}</button>
                      <button className="flex-1 bg-[#4A0E0E] text-[#D4AF37] py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg">{t('connect')}</button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-20 text-gray-400 text-xs font-bold bg-white rounded-[35px] p-6 shadow-md border max-w-[260px] h-[350px] flex flex-col justify-center items-center">
            <span className="text-lg mb-2">🔍</span>
            افسوس! کوئی مماثلت نہیں ملی۔
          </div>
        )}
      </div>

      {/* ۲۔ ہوریزنٹل اسکرول لسٹ (ٹاپ ورثے / ٹاپ میچز) */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[#4A0E0E] font-black text-xs uppercase tracking-[0.2em]">{t('top_matches', 'معزز رشتے')}</h3>
          <div className="text-[9px] font-bold text-[#D4AF37] flex items-center gap-1 uppercase italic cursor-pointer">
            {t('explore_all', 'سب دیکھیں')} <ChevronRight size={12} />
          </div>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 pr-1 snap-x snap-mandatory">
          {filteredResults.length > 0 ? (
            filteredResults.map((p) => (
              <div 
                key={`scroll-${p.uid || p.id}`} 
                onClick={() => setSelectedProfile(p)} 
                className="flex flex-col items-center gap-2 flex-shrink-0 snap-start cursor-pointer transition-transform active:scale-95"
              >
                <div className="relative p-1 rounded-full border-2 border-[#D4AF37] shadow-sm bg-white">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white relative">
                    <img src={p.photoURL || p.img || 'https://via.placeholder.com/150'} alt={p.displayName || p.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* گول تصویر کے اوپر ویریفائیڈ بیج */}
                  {p.verificationStatus === 'verified' && (
                    <div className="absolute bottom-0 right-0 transform translate-x-1 translate-y-1 scale-75">
                      <VerifiedBadge status={p.verificationStatus} />
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-black text-[#4A0E0E] uppercase tracking-wider">
                  {(p.displayName || p.name).split(' ')[0]}
                </span>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-[10px] font-bold py-4 w-full text-center">
              تلاش کے مطابق کوئی معزز رشتہ دستیاب نہیں
            </div>
          )}
        </div>
      </div>

      {/* ۳۔ ٹرسٹ بیجز (ٹرانسلیشن سپورٹ کے ساتھ) */}
      <div className="px-6 flex justify-between gap-2">
         <TrustBadge label={t('verified_label', '100% تصدیق شدہ')} sub={t('verified_sub', 'شناختی کارڈ ویریفائیڈ')} />
         <TrustBadge label={t('privacy_label', 'محفوظ پرائیویسی')} sub={t('privacy_sub', 'ڈیٹا مکمل پوشیدہ')} />
         <TrustBadge label={t('serious_label', 'سنجیدہ رشتے')} sub={t('serious_sub', 'صرف فیملی ممبرز')} />
      </div>
    </div>
  );
};

// ہیلپر ٹرسٹ بیج کمپوننٹ
const TrustBadge = ({ label, sub }) => (
  <div className="flex flex-col items-center text-center flex-1 max-w-[110px]">
    <div className="bg-[#F5E6D3] p-2 rounded-xl mb-1.5">
      <ShieldCheck size={14} className="text-[#4A0E0E]" />
    </div>
    <h4 className="text-[8px] font-black text-[#4A0E0E] uppercase tracking-wider leading-tight min-h-[12px]">{label}</h4>
    <p className="text-[7px] text-gray-400 font-bold mt-0.5 leading-normal">{sub}</p>
  </div>
);

export default Home;
