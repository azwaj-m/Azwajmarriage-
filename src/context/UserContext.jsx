import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, getDoc, setDoc } from 'firebase/firestore';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("--- UserContext Listening to Auth State ---");
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          console.log("Firebase Auth detected user:", user.uid);
          const userDocRef = doc(db, 'users', user.uid);
          
          // ریئل ٹائم ڈیٹا سننے کے لیے لسٹنر لگائیں
          const unsubSnapshot = onSnapshot(userDocRef, async (docSnap) => {
            if (docSnap.exists()) {
              setUserData(docSnap.data());
            } else {
              // اگر فائر سٹور میں ڈاکومنٹ نہیں ہے تو عارضی طور پر بنائیں تاکہ کریش نہ ہو
              const defaultData = {
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || user.email?.split('@')[0] || 'User',
                photoURL: user.photoURL || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100',
                verificationStatus: 'unverified',
                createdAt: new Date().toISOString()
              };
              
              await setDoc(userDocRef, defaultData);
              setUserData(defaultData);
            }
            setLoading(false);
          }, (err) => {
            console.error("Firestore Snapshot Error:", err);
            setLoading(false);
          });

          return () => unsubSnapshot();
        } else {
          console.log("No authenticated user found in Firebase.");
          setUserData(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("UserContext Init Error:", error);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  // سیکیورٹی گارڈ: اگر پرووائیڈر لوڈ نہ ہو تو ایپ پھٹے نہیں
  if (context === undefined) {
    return { userData: null, loading: false };
  }
  return context;
};
