import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchTranslator } from '../hooks/useSearchTranslator';
import { Search } from 'lucide-react';

const Discover = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const { matchProfile } = useSearchTranslator();

  // ڈیمو یا ڈیٹا بیس سے آنے والے پروفائلز کا ڈیٹا
  // (یقینی بنائیں کہ ان میں cityKey, countryKey اور jobKey موجود ہوں)
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Sana Ali",
      age: "26",
      cityKey: "karachi",
      countryKey: "pakistan",
      jobKey: "designer",
      photoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      id: 2,
      name: "Sana Ali",
      age: "26",
      cityKey: "karachi",
      countryKey: "pakistan",
      jobKey: "designer",
      photoURL: "https://www.alamy.com/stock-photo-imran-khan-september-2007-dubai-uae-111688822.html"
    },
    {
      id: 3,
      name: "Sana Ali",
      age: "26",
      cityKey: "karachi",
      countryKey: "pakistan",
      jobKey: "designer",
      photoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      id: 4,
      name: "Sana Ali",
      age: "26",
      cityKey: "karachi",
      countryKey: "pakistan",
      jobKey: "designer",
      photoURL: "https://www.alamy.com/london-uk-19-feb-2023-pictured-jemima-goldsmith-attends-the-ee-british-academy-film-awards-2023-arrivals-at-royal-festival-hall-southbank-londo-image567750616.html"
    },
    {
      id: 5,
      name: "Zainab",
      age: "24",
      cityKey: "lahore",
      countryKey: "pakistan",
      jobKey: "doctor",
      photoURL: "https://share.google/Iz3ok4UpLkcohAIXN"
    }
  ]);

  // ہر لفظ اور ہر زبان کے حساب سے فلٹر کرنا
  const filteredProfiles = profiles.filter((profile) =>
    matchProfile(profile, searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#FDF5F5] pb-24">
      {/* سرچ بار انٹرفیس */}
      <div className="p-4 max-w-md mx-auto">
        <div className="relative flex items-center bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-1">
          <Search size={20} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder={t('search_placeholder', 'Search by country, name, age...')}
            className="w-full bg-transparent py-3 text-xs font-bold outline-none text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* فلٹر شدہ پروفائلز کی لسٹ */}
      <div className="max-w-md mx-auto px-4 grid grid-cols-2 gap-4">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div key={profile.id} className="bg-white p-4 rounded-[30px] shadow-sm border border-gray-100 text-center">
              <img 
                src={profile.photoURL} 
                alt={profile.name} 
                className="w-20 h-20 rounded-full mx-auto object-cover mb-2 border-2 border-[#D4AF37]"
              />
              <h3 className="font-black text-[#4A0E0E] text-xs uppercase">{profile.name}</h3>
              <p className="text-[10px] text-gray-500 font-bold">
                {profile.age} • {t(profile.jobKey)}
              </p>
              <p className="text-[9px] text-[#D4AF37] font-black uppercase mt-1">
                {t(profile.cityKey)}, {t(profile.countryKey)}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 text-gray-400 text-xs font-bold">
            کوئی نتیجہ نہیں ملا!
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
