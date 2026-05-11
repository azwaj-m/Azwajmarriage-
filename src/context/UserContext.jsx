import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        
        // ریئل ٹائم ڈیٹا بیس لسنر
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            // اگر صارف نیا ہے تو بیسک پروفائل بنائیں
            const newDoc = {
              uid: user.uid,
              displayName: user.displayName || 'صارف',
              email: user.email,
              photoURL: user.photoURL || '',
              verificationStatus: 'unverified',
              blockedUsers: [],
              createdAt: serverTimestamp()
            };
            setDoc(userDocRef, newDoc);
            setUserData(newDoc);
          }
          setLoading(false);
        }, (err) => {
          console.error("Firestore Listen Error:", err);
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
