import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearch } from '../context/SearchContext';
import { ShieldCheck, MapPin } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();
  // اب ڈیٹا لوکل اسٹیٹ سے نہیں بلکہ ہمارے گلوبل سرچ انجن سے آئے گا!
  const { filteredResults, searchQuery } = useSearch();

  return (
    <div className="min-h-screen bg-[#FDF5F5] pb-24">
      {/* ہیرو سیکشن یا ٹائٹل */}
      <div className="p-6 text-center">
        <h1 className="text-xl font-black text-[#4A0E0E] uppercase tracking-wider">
          {searchQuery ? t('search_results', 'تلاش کے نتائج') : t('top_matches', 'TOP VERIFIED MATCHES')}
        </h1>
        {searchQuery && (
          <p className="text-[10px] text-[#D4AF37] font-bold mt-1">
            "{searchQuery}" کے لیے {filteredResults.length} پروفائلز ملے
          </p>
        )}
      </div>

      {/* متحرک لسٹ جو سرچ کے مطابق خود بخود بدلتی ہے */}
      <div className="max-w-md mx-auto px-4 space-y-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((profile) => (
            <div 
              key={profile.uid || profile.id} 
              className="bg-white rounded-[35px] p-5 shadow-md border border-gray-100 flex items-center gap-4 transition-all active:scale-[0.98]"
            >
              <img 
                src={profile.photoURL || 'https://via.placeholder.com/150'} 
                alt={profile.displayName || profile.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h3 className="font-black text-[#4A0E0E] text-sm uppercase">
                    {profile.displayName || profile.name}
                  </h3>
                  {profile.verificationStatus === 'verified' && (
                    <ShieldCheck size={14} className="fill-blue-500 text-white" />
                  )}
                </div>
                <p className="text-[10px] text-gray-500 font-bold mt-0.5">
                  Age: {profile.age || 'N/A'} • {t(profile.jobKey || 'designer')}
                </p>
                <div className="flex items-center gap-0.5 text-[#D4AF37] text-[9px] font-black uppercase mt-1">
                  <MapPin size={10} />
                  <span>{t(profile.cityKey || 'karachi')}, {t(profile.countryKey || 'pakistan')}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400 text-xs font-bold bg-white rounded-[30px] p-6">
            افسوس! آپ کی سرچ سے مطابقت رکھتا ہوا کوئی پروفائل نہیں ملا۔
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
