import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useSearchTranslator } from '../hooks/useSearchTranslator';
import { initialProfiles } from '../utils/seedData'; // نام درست کر دیا گیا (demoProfiles -> initialProfiles)

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [firebaseUsers, setFirebaseUsers] = useState([]);
  const { matchProfile, normalizeText } = useSearchTranslator();

  // ۱۔ فائر بیس سے لائیو ڈیٹا حاصل کرنا
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersList = [];
      snapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() });
      });
      setFirebaseUsers(usersList);
    }, (error) => {
      console.error("Firebase fetch error in search:", error);
    });

    return () => unsubscribe();
  }, []);

  // ۲۔ تمام ڈیٹا ذرائع (فائر بیس لائیو + ڈیمو ڈیٹا) کو یکجا کرنا
  const getAllProfiles = () => {
    const combined = [...firebaseUsers];
    
    initialProfiles.forEach(demo => {
      // ڈپلیکیٹس کو روکنے کے لیے چیک کریں کہ آئی ڈی پہلے سے موجود نہ ہو
      const isDuplicate = combined.some(user => 
        (user.uid && user.uid === demo.uid) || 
        (user.id && user.id === demo.id) || 
        (user.email && user.email === demo.email)
      );
      if (!isDuplicate) {
        combined.push(demo);
      }
    });
    return combined;
  };

  // ۳۔ سرچ فلٹر کی مرکزی لاجک
  const getFilteredResults = () => {
    const allData = getAllProfiles();
    const query = normalizeText(searchQuery);

    if (!query) return allData;

    return allData.filter(profile => {
      const basicMatch = matchProfile(profile, searchQuery);
      const bioMatch = profile.bio ? normalizeText(profile.bio).includes(query) : false;
      const statusMatch = profile.status ? normalizeText(profile.status).includes(query) : false;

      return basicMatch || bioMatch || statusMatch;
    });
  };

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      filteredResults: getFilteredResults(),
      allProfiles: getAllProfiles()
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
