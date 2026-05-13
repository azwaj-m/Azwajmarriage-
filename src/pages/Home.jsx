import React from 'react';
import { MapPin, Briefcase, GraduationCap, Heart, CheckCircle, Award } from 'lucide-react';

const Home = ({ profiles = [], setSelectedProfile }) => {
  
  // لائک یا فیورٹ کرنے کا سیف ہینڈلر
  const handleLike = (e, fullName) => {
    e.stopPropagation(); // تاکہ پورے کارڈ کا کلک ایونٹ ٹرگر نہ ہو
    alert(`${fullName} کو آپ کی پسندیدہ لسٹ میں شامل کر دیا گیا ہے!`);
  };

  return (
    <div className="w-full min-h-screen bg-[#FFFDF9] text-[#4A0E0E] px-4 py-4" dir="rtl">
      
      {/* 👋 ویلکم سیکشن */}
      <div className="mb-6 text-right animate-fadeIn">
        <h1 className="text-base font-black text-[#4A0E0E] flex items-center gap-1.5">
          بہترین رشتوں کی تلاش 
          <span className="text-sm">✨</span>
        </h1>
        <p className="text-[10px] text-gray-500 font-bold mt-0.5">
          آپ کی ترجیحات کے مطابق تصدیق شدہ پریمیم پروفائلز
        </p>
      </div>

      {/* 📜 پروفائلز گرڈ لسٹ */}
      {profiles.length === 0 ? (
        /* اگر سرچ رزلٹ خالی ہو تو سیف فال بیک ویو */
        <div className="flex flex-col items-center justify-center p-12 bg-white border border-gray-100 rounded-[30px] shadow-xs text-center my-10">
          <div className="w-14 h-14 bg-[#F5E6D3]/40 rounded-2xl flex items-center justify-center mb-3 text-[#4A0E0E]">
            🔎
          </div>
          <h4 className="text-xs font-black text-[#4A0E0E]">کوئی پروفائل نہیں ملی</h4>
          <p className="text-[9px] text-gray-400 font-bold mt-1">براہ کرم سرچ کی ورڈ تبدیل کر کے دوبارہ کوشش کریں۔</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-28">
          {profiles.map((profile) => (
            <div
              key={profile.id || Math.random().toString()}
              onClick={() => setSelectedProfile && setSelectedProfile(profile)}
              className="bg-white border border-gray-100/70 rounded-[32px] p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer active:scale-99 border-r-4 border-r-[#4A0E0E] relative flex flex-col justify-between text-right overflow-hidden group"
            >
              {/* بیک گراؤنڈ لائٹ رائل واٹر مارک */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-[#F5E6D3]/10 rounded-br-full pointer-events-none" />

              <div className="flex items-start gap-4">
                {/* 📸 پروفائل تصویر اور آن لائن بیج */}
                <div className="relative flex-shrink-0">
                  <img
                    src={profile.photoURL || profile.profileImg || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={profile.fullName || 'User'}
                    className="w-20 h-20 rounded-[22px] object-cover border border-[#D4AF37]/20 shadow-xs"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'; // امیج کریش پروٹیکشن
                    }}
                  />
                  {profile.verificationStatus === 'verified' && (
                    <div className="absolute -top-1.5 -right-1.5 bg-[#4A0E0E] text-[#D4AF37] p-1 rounded-full shadow-xs border border-white">
                      <CheckCircle size={10} className="fill-[#D4AF37] text-[#4A0E0E]" />
                    </div>
                  )}
                </div>

                {/* 📝 پروفائل کی تفصیلات */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-black text-[#4A0E0E] text-xs group-hover:text-[#4A0E0E]/80 transition-colors">
                      {profile.fullName || 'صارف'}
                    </h3>
                    <span className="text-[9px] font-black bg-[#F5E6D3] text-[#4A0E0E] px-2 py-0.5 rounded-full">
                      {profile.age || 'N/A'} سال
                    </span>
                  </div>

                  {/* تعلیم یا کاسٹ */}
                  <div className="flex items-center gap-1.5 text-gray-500 font-bold text-[10px]">
                    <GraduationCap size={12} className="text-[#4A0E0E]/60" />
                    <span>{profile.education || profile.religion || 'تعلیم دستیاب نہیں'}</span>
                  </div>

                  {/* پیشہ */}
                  <div className="flex items-center gap-1.5 text-gray-500 font-bold text-[10px]">
                    <Briefcase size={12} className="text-[#4A0E0E]/60" />
                    <span>{profile.profession || 'پیشہ دستیاب نہیں'}</span>
                  </div>

                  {/* شہر / لوکیشن */}
                  <div className="flex items-center gap-1.5 text-gray-600 font-bold text-[10px] pt-0.5">
                    <MapPin size={12} className="text-red-600" />
                    <span className="text-[#4A0E0E]">{profile.city || 'پاکستان'}</span>
                  </div>
                </div>
              </div>

              {/* 👑 نچلی پٹی: ممبرشپ ٹائپ اور انٹرسٹ بٹن */}
              <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[8px] font-black text-[#D4AF37] bg-[#4A0E0E] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs uppercase tracking-wider">
                  <Award size={10} /> پریمیم میچ
                </span>
                
                <button
                  type="button"
                  onClick={(e) => handleLike(e, profile.fullName)}
                  className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-all shadow-xs active:scale-90"
                  title="دلچسپی کا اظہار کریں"
                >
                  <Heart size={14} className="fill-rose-600" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;
