import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import { MapPin, ShieldCheck, ChevronRight, Heart } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';
import 'swiper/css';
import 'swiper/css/effect-cards';

const Home = ({ setSelectedProfile }) => {
  const { t } = useTranslation();

  // ٹیسٹنگ اور خوبصورتی کے لیے کچھ پروفائلز کو تصدیق شدہ (verified) کر دیا گیا ہے
  const demoProfiles = [
    { id: 1, name: 'Aisha Khan', age: 24, jobKey: 'doctor', cityKey: 'lahore', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500', countryKey: 'pakistan', verificationStatus: 'verified' },
    { id: 2, name: 'Sana Ali', age: 26, jobKey: 'designer', cityKey: 'karachi', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500', countryKey: 'pakistan', verificationStatus: 'verified' },
    { id: 3, name: 'Maria Nawaz', age: 22, jobKey: 'engineer', cityKey: 'islamabad', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', countryKey: 'pakistan', verificationStatus: 'unverified' },
    { id: 4, name: 'Zainab Fatima', age: 25, jobKey: 'teacher', cityKey: 'multan', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500', countryKey: 'pakistan', verificationStatus: 'unverified' },
    { id: 5, name: 'Aisha Khan', age: 24, jobKey: 'doctor', cityKey: 'lahore', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500', countryKey: 'pakistan', verificationStatus: 'verified' },
    { id: 6, name: 'Sana Ali', age: 26, jobKey: 'designer', cityKey: 'karachi', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500', countryKey: 'pakistan', verificationStatus: 'verified' },
    { id: 7, name: 'Maria Nawaz', age: 22, jobKey: 'engineer', cityKey: 'islamabad', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', countryKey: 'pakistan', verificationStatus: 'unverified' },
    { id: 8, name: 'Zainab Fatima', age: 25, jobKey: 'teacher', cityKey: 'multan', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500', countryKey: 'pakistan', verificationStatus: 'unverified' }
  ];

  return (
    <div className="flex flex-col gap-8 pb-28 pt-4">
      <div className="px-12 relative h-[400px] flex items-center justify-center">
        <Swiper effect={'cards'} grabCursor={true} centeredSlides={true} modules={[EffectCards, Autoplay]} autoplay={{ delay: 3000 }} className="w-full max-w-[260px] h-[380px]">
          {demoProfiles.map((p) => (
            <SwiperSlide key={p.id} className="rounded-[45px] bg-white shadow-2xl border-[6px] border-white overflow-hidden">
              <div className="relative h-full w-full" onClick={() => setSelectedProfile(p)}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30">
                  <Heart size={16} className="text-white fill-[#D4AF37]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-white p-5 m-2 rounded-[35px] shadow-xl text-center border border-gray-50">
                  {/* نام کے ساتھ تصدیقی نشان یہاں مرج کیا گیا ہے */}
                  <h2 className="text-[#4A0E0E] font-black text-xl tracking-tighter uppercase flex items-center justify-center gap-1">
                    {p.name}
                    <VerifiedBadge status={p.verificationStatus} />
                  </h2>
                  <div className="flex flex-col items-center gap-1 mt-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      {t('age')}: <span className="text-[#4A0E0E]">{p.age}</span> • {t('prof')}: <span className="text-[#4A0E0E]">{t(p.jobKey)}</span>
                    </p>
                    <div className="flex items-center gap-1 text-[9px] font-black text-[#D4AF37] uppercase">
                      <MapPin size={10} /> {t(p.cityKey)}, {t(p.countryKey)}
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
      </div>

      {/* ٹاپ میچز ہوریزنٹل اسکرول لسٹ کا فکسڈ خوبصورت ڈیزائن */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[#4A0E0E] font-black text-xs uppercase tracking-[0.2em]">{t('top_matches', 'معزز رشتے')}</h3>
          <div className="text-[9px] font-bold text-[#D4AF37] flex items-center gap-1 uppercase italic cursor-pointer">{t('explore_all', 'سب دیکھیں')} <ChevronRight size={12} /></div>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 pr-1 snap-x snap-mandatory">
          {demoProfiles.map((p) => (
            <div key={p.id} onClick={() => setSelectedProfile(p)} className="flex flex-col items-center gap-2 flex-shrink-0 snap-start cursor-pointer">
              <div className="relative p-1 rounded-full border-2 border-[#D4AF37] shadow-sm bg-white">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white relative">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </div>
                {/* گول تصویر کے اوپر فکسڈ ویریفائیڈ بیج */}
                {p.verificationStatus === 'verified' && (
                  <div className="absolute bottom-0 right-0 transform translate-x-1 translate-y-1 scale-75">
                    <VerifiedBadge status={p.verificationStatus} />
                  </div>
                )}
              </div>
              <span className="text-[10px] font-black text-[#4A0E0E] uppercase tracking-wider">{p.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* لیبلز ٹرانسلیشن کے فال بیکز کے ساتھ بالکل فعال کر دیے گئے ہیں */}
      <div className="px-6 flex justify-between gap-2">
         <TrustBadge label={t('verified_label', '100% تصدیق شدہ')} sub={t('verified_sub', 'شناختی کارڈ ویریفائیڈ')} />
         <TrustBadge label={t('privacy_label', 'محفوظ پرائیویسی')} sub={t('privacy_sub', 'ڈیٹا مکمل پوشیدہ')} />
         <TrustBadge label={t('serious_label', 'سنجیدہ رشتے')} sub={t('serious_sub', 'صرف فیملی ممبرز')} />
      </div>
    </div>
  );
};

const TrustBadge = ({ label, sub }) => (
  <div className="flex flex-col items-center text-center flex-1 max-w-[110px]">
    <div className="bg-[#F5E6D3] p-2 rounded-xl mb-1.5"><ShieldCheck size={14} className="text-[#4A0E0E]" /></div>
    <h4 className="text-[8px] font-black text-[#4A0E0E] uppercase tracking-wider leading-tight min-h-[12px]">{label}</h4>
    <p className="text-[7px] text-gray-400 font-bold mt-0.5 leading-normal">{sub}</p>
  </div>
);

export default Home;
