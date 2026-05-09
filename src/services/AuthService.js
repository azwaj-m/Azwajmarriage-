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
  // ۱۔ گوگل پرووائیڈر انیشیالائز کرنا
  googleProvider: new GoogleAuthProvider(),

  // ۲۔ گوگل کے ذریعے لاگ ان/سائن اپ کرنا
  loginWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, AuthService.googleProvider);
      const user = result.user;

      // فائر اسٹور میں چیک کریں کہ کیا یوزر کا ڈیٹا پہلے سے موجود ہے
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let userData = {
        uid: user.uid,
        displayName: user.displayName || "صارف",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        photoURL: user.photoURL || "",
        verificationStatus: 'verified',
        createdAt: new Date().toISOString()
      };

      if (!userDoc.exists()) {
        // نیا صارف ہے تو ڈیٹا فائر اسٹور میں محفوظ کریں
        await setDoc(userDocRef, userData);
      } else {
        // پرانا صارف ہے تو سیشن ڈیٹا حاصل کریں
        userData = userDoc.data();
      }

      // لوکل سیشن محفوظ کریں
      localStorage.setItem('user_session', JSON.stringify({ 
        uid: userData.uid, 
        phoneNumber: userData.phoneNumber, 
        displayName: userData.displayName 
      }));

      return userData;
    } catch (error) {
      console.error("Google Auth Error:", error);
      throw new Error(error.message || "گوگل لاگ ان کے دوران خرابی پیش آئی۔");
    }
  },

  // ۳۔ ری کیپچا ویریفائر سیٹ اپ
  setupRecaptcha: (containerId) => {
    if (!window.recaptchaVerifier) {
      const container = document.getElementById(containerId);
      if (!container) return;

      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: (response) => {
          console.log("Recaptcha resolved");
        },
        'expired-callback': () => {
          console.log("Recaptcha expired");
        }
      });
    }
  },

  // ۴۔ چیک کریں کہ نمبر پہلے سے رجسٹرڈ تو نہیں
  checkIfPhoneExists: async (phoneNumber) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phoneNumber", "==", phoneNumber));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Check Phone Error:", error);
      throw new Error("نمبر کی تصدیق کے دوران خرابی پیش آئی۔");
    }
  },

  // ۵۔ موبائل پر OTP کوڈ بھیجنا
  sendOTP: async (phoneNumber) => {
    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error("سیکیورٹی ویریفکیشن سسٹم تیار نہیں ہے۔ پیج ریفریش کریں۔");
      }
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      return true;
    } catch (error) {
      console.error("OTP Sending Error:", error);
      throw new Error(error.message || "او ٹی پی بھیجنے میں دشواری پیش آئی۔");
    }
  },

  // ۶۔ OTP کوڈ کی تصدیق کرنا
  verifyOTP: async (otpCode) => {
    try {
      const confirmationResult = window.confirmationResult;
      if (!confirmationResult) {
        throw new Error("او ٹی پی سیشن ختم ہو چکا ہے۔ دوبارہ کوشش کریں۔");
      }
      const result = await confirmationResult.confirm(otpCode);
      return result.user;
    } catch (error) {
      console.error("OTP Verification Error:", error);
      throw new Error("درج کردہ تصدیقی کوڈ غلط ہے۔");
    }
  },

  // ۷۔ فائر سٹور میں موبائل نمبر والے صارف کا ریکارڈ بنانا / اپ ڈیٹ کرنا
  saveUserToFirestore: async (user, additionalData = {}) => {
    try {
      if (!user) throw new Error("صارف کا عارضی سیشن دستیاب نہیں ہے۔");
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let userData = {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
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
        displayName: userData.displayName 
      }));
      return userData;
    } catch (error) {
      console.error("Save User Info Error:", error);
      throw new Error("پروفائل ڈیٹا بیس میں محفوظ نہیں ہو سکی۔");
    }
  },

  // ۸۔ موبائل نمبر اور پاس ورڈ سے لاگ ان
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
        const sessionUser = { uid: foundUser.uid, phoneNumber: foundUser.phoneNumber, displayName: foundUser.displayName };
        localStorage.setItem('user_session', JSON.stringify(sessionUser));
        return foundUser;
      } else {
        throw new Error("درج کردہ پاس ورڈ غلط ہے۔");
      }
    } catch (error) {
      console.error("Login Query Error:", error);
      throw new Error(error.message || "لاگ ان کے دوران خرابی پیش آئی۔");
    }
  },

  // ۹۔ لوکل سیشن چیکر
  checkSessionValidity: () => {
    const session = localStorage.getItem('user_session');
    if (session) {
      return JSON.parse(session);
    }
    return null;
  },

  // ۱۰۔ لاگ آؤٹ
  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user_session');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }
};
