import { auth, db } from '../utils/firebase';
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

export const AuthService = {
  googleProvider: new GoogleAuthProvider(),

  loginWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, AuthService.googleProvider);
      const user = result.user;
      const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let userData = {
        uid: user.uid,
        displayName: user.displayName || "صارف",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        photoURL: user.photoURL || defaultAvatar,
        verificationStatus: 'verified',
        createdAt: new Date().toISOString()
      };

      if (!userDoc.exists()) {
        await setDoc(userDocRef, userData);
      } else {
        userData = userDoc.data();
        if (!userData.photoURL) {
          userData.photoURL = defaultAvatar;
        }
      }

      localStorage.setItem('user_session', JSON.stringify({ 
        uid: userData.uid, 
        phoneNumber: userData.phoneNumber, 
        displayName: userData.displayName,
        photoURL: userData.photoURL
      }));

      return userData;
    } catch (error) {
      console.error("Google Auth Error:", error);
      throw new Error("گوگل لاگ ان کے دوران خرابی پیش آئی۔");
    }
  },

  setupRecaptcha: (containerId) => {
    if (!window.recaptchaVerifier) {
      const container = document.getElementById(containerId);
      if (!container) return;

      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: (response) => {
          console.log("Recaptcha resolved");
        }
      });
    }
  },

  checkIfPhoneExists: async (phoneNumber) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phoneNumber", "==", phoneNumber));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      return false;
    }
  },

  sendOTP: async (phoneNumber) => {
    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) throw new Error("سیکیورٹی ویریفکیشن فعال نہیں ہو سکی۔");
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      return true;
    } catch (error) {
      throw new Error(error.message || "او ٹی پی بھیجنے میں دشواری پیش آئی۔");
    }
  },

  verifyOTP: async (otpCode) => {
    try {
      const confirmationResult = window.confirmationResult;
      if (!confirmationResult) throw new Error("او ٹی پی کا سیشن ختم ہو چکا ہے۔");
      const result = await confirmationResult.confirm(otpCode);
      return result.user;
    } catch (error) {
      throw new Error("درج کردہ تصدیقی کوڈ غلط ہے۔");
    }
  },

  saveUserToFirestore: async (user, additionalData = {}) => {
    try {
      if (!user) throw new Error("صارف دستیاب نہیں ہے۔");
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

      let userData = {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        photoURL: defaultAvatar,
        verificationStatus: 'verified',
        createdAt: new Date().toISOString(),
        ...additionalData
      };

      if (!userDoc.exists()) {
        await setDoc(userDocRef, userData);
      } else {
        await setDoc(userDocRef, { ...userDoc.data(), ...additionalData }, { merge: true });
        userData = { ...userDoc.data(), ...additionalData };
      }

      localStorage.setItem('user_session', JSON.stringify({ 
        uid: user.uid, 
        phoneNumber: user.phoneNumber, 
        displayName: userData.displayName,
        photoURL: userData.photoURL
      }));
      return userData;
    } catch (error) {
      throw new Error("ڈیٹا بیس میں ریکارڈ محفوظ نہیں ہو سکا۔");
    }
  },

  loginWithPhoneAndPassword: async (phoneNumber, password) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phoneNumber", "==", phoneNumber));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("اس نمبر سے کوئی اکاؤنٹ رجسٹرڈ نہیں ملا۔");
      }

      let foundUser = null;
      querySnapshot.forEach((doc) => {
        foundUser = doc.data();
      });

      if (foundUser && foundUser.customPassword === password) {
        const sessionUser = { 
          uid: foundUser.uid, 
          phoneNumber: foundUser.phoneNumber, 
          displayName: foundUser.displayName,
          photoURL: foundUser.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        };
        localStorage.setItem('user_session', JSON.stringify(sessionUser));
        return foundUser;
      } else {
        throw new Error("درج کردہ پاس ورڈ غلط ہے۔");
      }
    } catch (error) {
      throw new Error(error.message || "لاگ ان کے دوران خرابی پیش آئی۔");
    }
  },

  checkSessionValidity: () => {
    const session = localStorage.getItem('user_session');
    return session ? JSON.parse(session) : null;
  },

  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user_session');
    } catch (error) {
      console.error(error);
    }
  }
};
