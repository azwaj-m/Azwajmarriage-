import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allProfiles, setAllProfiles] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  // ۱۰ پریمیم ایکٹو ڈیمو پروفائلز کا سیٹ جو ہوم پیج کے پہلے ڈیزائن کے عین مطابق ہے
  const staticFallbackProfiles = [
    { id: 'p1', name: 'Aisha Khan', age: 24, jobKey: 'doctor', cityKey: 'lahore', countryKey: 'pakistan', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500', verificationStatus: 'verified' },
    { id: 'p2', name: 'Sana Ali', age: 26, jobKey: 'designer', cityKey: 'karachi', countryKey: 'pakistan', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500', verificationStatus: 'verified' },
    { id: 'p3', name: 'Maria Nawaz', age: 22, jobKey: 'engineer', cityKey: 'islamabad', countryKey: 'pakistan', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500', verificationStatus: 'unverified' },
    { id: 'p4', name: 'Zainab Fatima', age: 25, jobKey: 'teacher', cityKey: 'multan', countryKey: 'pakistan', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500', verificationStatus: 'verified' },
    { id: 'p5', name: 'Fatima Zahra', age: 23, jobKey: 'manager', cityKey: 'rawalpindi', countryKey: 'pakistan', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500', verificationStatus: 'verified' },
    { id: 'p6', name: 'Amara Yusuf', age: 27, jobKey: 'banker', cityKey: 'faisalabad', countryKey: 'pakistan', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500', verificationStatus: 'unverified' },
    { id: 'p7', name: 'Hania Imran', age: 25, jobKey: 'artist', cityKey: 'peshawar', countryKey: 'pakistan', img: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=500', verificationStatus: 'verified' },
    { id: 'p8', name: 'Rimsha Bi', age: 26, jobKey: 'writer', cityKey: 'quetta', countryKey: 'pakistan', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500', verificationStatus: 'verified' },
    { id: 'p9', name: 'Sadia Malik', age: 24, jobKey: 'nurse', cityKey: 'sialkot', countryKey: 'pakistan', img: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=500', verificationStatus: 'unverified' },
    { id: 'p10', name: 'Tayyaba Noor', age: 28, jobKey: 'consultant', cityKey: 'gujranwala', countryKey: 'pakistan', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500', verificationStatus: 'verified' }
  ];

  // ۱۔ ڈیٹا لوڈنگ ہینڈلر (اگر فائر بیس پراجیکٹ سے لائیو ڈیٹا لانا ہو)
  useEffect(() => {
    // یہاں آپ فائر بیس فائر اسٹور کا کلاؤڈ فیچ بھی لگا سکتے ہیں
    // فی الحال سیف رینڈرنگ کے لیے تمام ۱۰ پروفائلز کو ڈیفالٹ سیٹ کر رہے ہیں
    setAllProfiles(staticFallbackProfiles);
    setFilteredResults(staticFallbackProfiles);
  }, []);

  // ۲۔ لائیو سرچ فلٹرنگ فلو (نام، شہر اور پیشے کے لحاظ سے میچنگ)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredResults(allProfiles);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = allProfiles.filter((profile) => {
      const nameMatch = (profile.displayName || profile.name || '').toLowerCase().includes(query);
      const cityMatch = (profile.cityKey || '').toLowerCase().includes(query);
      const jobMatch = (profile.jobKey || '').toLowerCase().includes(query);
      
      return nameMatch || cityMatch || jobMatch;
    });

    setFilteredResults(filtered);
  }, [searchQuery, allProfiles]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, filteredResults, allProfiles, setAllProfiles }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    // اگر پرووائیڈر لوڈ نہ ہو تو ایپ کریش ہونے کے بجائے خالی فال بیک آبجیکٹ دے گا
    return { searchQuery: '', setSearchQuery: () => {}, filteredResults: [], allProfiles: [] };
  }
  return context;
};
