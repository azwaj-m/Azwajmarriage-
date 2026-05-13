import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // ایپ کے تھیم کے مطابق ڈیفالٹ یوزر اسٹیٹ (تاکہ نیٹ ورک ڈراپ ہونے پر بھی ڈیٹا نل نہ ہو)
  const [userData, setUserData] = useState({
    uid: 'u101',
    displayName: 'صارف (User)',
    email: 'user@azwaj.com',
    photoURL: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150', // ہارڈکوڈڈ کی جگہ متحرک امیج
    age: 26,
    jobKey: 'developer',
    cityKey: 'lahore',
    premiumStatus: true
  });

  const [loading, setLoading] = useState(false);

  // یہاں فائر بیس آتھینٹیکیشن (onAuthStateChanged) کا رئیل ٹائم ہک جوڑا جا سکتا ہے
  useEffect(() => {
    // فی الحال یہ اسٹیٹ لائیو رینڈرنگ اور ڈیزائن پروٹیکشن کے لیے تیار ہے
    setLoading(false);
  }, []);

  // صارف کا ڈیٹا اپڈیٹ کرنے کا فنکشن (مثال کے طور پر پروفائل تصویر تبدیل کرنے کے لیے)
  const updateProfileData = (newData) => {
    setUserData((prev) => ({
      ...prev,
      ...newData
    }));
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, loading, updateProfileData }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    // پرووائیڈر سے باہر کال ہونے کی صورت میں کریش ہونے کے بجائے ڈیفالٹ فال بیکس فراہم کرے گا
    return {
      userData: {
        photoURL: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150',
        displayName: 'مہمان صارف'
      },
      loading: false,
      updateProfileData: () => {}
    };
  }
  return context;
};
