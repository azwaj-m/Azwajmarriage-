import { 
  auth, db, storage 
} from '../utils/firebase';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  OAuthProvider
} from 'firebase/auth';
import { 
  doc, getDoc, setDoc, updateDoc, increment 
} from 'firebase/firestore';
import { 
  ref, uploadBytes, getDownloadURL 
} from 'firebase/storage';

const SESSION_LIMIT_DAYS = 30; // ڈیوائس پر لاگ ان محفوظ رکھنے کی حد (30 دن)
const MAX_FAILED_ATTEMPTS = 5;  // مشکوک لاگ ان کی حد

export const AuthService = {
  // ۱۔ گوگل میل کے ذریعے لاگ ان اور فائر اسٹور/اسٹوریج پروفائل اپڈیٹ
  loginWithGoogle: async (file = null) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // فائر اسٹور اور سیشن ہینڈلنگ
      const userDoc = await AuthService.syncUserProfile(user, file);
      await AuthService.handleUserSession(user);

      return { success: true, user: userDoc };
    } catch (error) {
      console.error("Google Auth Error:", error);
      return { success: false, error: error.message };
    }
  },

  // ۲۔ آئی فون (Apple Id) کے ذریعے لاگ ان اور پروفائل مطابقت
  loginWithApple: async (file = null) => {
    const provider = new OAuthProvider('apple.com');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // فائر اسٹور اور سیشن ہینڈلنگ
      const userDoc = await AuthService.syncUserProfile(user, file);
      await AuthService.handleUserSession(user);

      return { success: true, user: userDoc };
    } catch (error) {
      console.error("Apple Auth Error:", error);
      return { success: false, error: error.message };
    }
  },

  // ۳۔ ای میل اور پاس ورڈ لاگ ان (مشکوک آئی ڈی پروٹیکشن اور پروفائل سنک کے ساتھ)
  loginWithEmail: async (email, password) => {
    const userDocRef = doc(db, 'users_security', email);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      
      // اگر اکاؤنٹ پہلے ہی لاک ہو چکا ہو
      if (data.isLocked) {
        const lockTime = data.lockedUntil?.toDate();
        if (lockTime && lockTime > new Date()) {
          throw new Error("مشکوک سرگرمی کی وجہ سے آپ کا اکاؤنٹ عارضی طور پر لاک ہے۔ براہ کرم کچھ دیر بعد کوشش کریں۔");
        } else {
          // لاک کا وقت ختم ہونے پر ان لاک کرنا
          await updateDoc(userDocRef, { isLocked: false, failedAttempts: 0 });
        }
      }
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      // کامیاب لاگ ان پر فیلڈ اٹیمپٹس صفر کر دیں
      await setDoc(userDocRef, {
        failedAttempts: 0,
        isLocked: false,
        lastLogin: new Date()
      }, { merge: true });

      // فائر اسٹور یوزرز کلیکشن میں ڈیٹا سنک کرنا
      const syncedUser = await AuthService.syncUserProfile(user);
      await AuthService.handleUserSession(user);

      return { success: true, user: syncedUser };
    } catch (error) {
      // غلط پاس ورڈ پر اٹیمپٹ بڑھانا
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        await setDoc(userDocRef, {
          failedAttempts: increment(1),
          lastAttempt: new Date()
        }, { merge: true });

        const updatedDoc = await getDoc(userDocRef);
        const attempts = updatedDoc.data().failedAttempts;

        if (attempts >= MAX_FAILED_ATTEMPTS) {
          const lockDuration = new Date(Date.now() + 15 * 60 * 1000); // 15 منٹ کا عارضی لاک
          await updateDoc(userDocRef, {
            isLocked: true,
            lockedUntil: lockDuration
          });
          throw new Error("مسلسل غلط کوششوں کی وجہ سے آئی ڈی لاک کر دی گئی ہے۔ 15 منٹ بعد دوبارہ کوشش کریں۔");
        }
      }
      throw error;
    }
  },

  // ۴۔ فائر اسٹور میں پروفائل ڈیٹا کو اسٹوریج امیج کے ساتھ سنک کرنے کا ہیلپر فنکشن
  syncUserProfile: async (user, file = null) => {
    let photoURL = user.photoURL;
    
    // اگر امیج فائل فراہم کی گئی ہے تو اسٹوریج میں اپلوڈ کریں
    if (file && file instanceof File) {
      const storageRef = ref(storage, `profiles/${user.uid}`);
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);
    }

    const userDoc = {
      uid: user.uid,
      displayName: user.displayName || user.email.split('@')[0],
      email: user.email,
      photoURL: photoURL || '',
      lastSeen: new Date(),
      updatedAt: new Date()
    };

    // "users" کلیکشن میں مرج سیٹ اپ
    await setDoc(doc(db, "users", user.uid), userDoc, { merge: true });
    return userDoc;
  },

  // ۵۔ صرف پروفائل ڈیٹا اپڈیٹ کرنے کے لیے (بغیر ری-لاگ ان)
  updateUserProfile: async (userId, data) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error("Update Error:", error);
      return { success: false, error: error.message };
    }
  },

  // ۶۔ سیشن لیمٹ ہینڈلر (ڈیوائس پر لاگ ان محفوظ رکھنے کا کنٹرول)
  handleUserSession: async (user) => {
    const sessionData = {
      uid: user.uid,
      email: user.email,
      loginTime: Date.now(),
      expiryTime: Date.now() + SESSION_LIMIT_DAYS * 24 * 60 * 60 * 1000 // 30 دن کی لمٹ
    };
    localStorage.setItem('azwaj_user_session', JSON.stringify(sessionData));
  },

  // ۷۔ لاگ ان سیشن چیکر (ایپ لوڈ ہونے پر رن ہوگا)
  checkSessionValidity: () => {
    const sessionStr = localStorage.getItem('azwaj_user_session');
    if (!sessionStr) return null;

    const session = JSON.parse(sessionStr);
    if (Date.now() > session.expiryTime) {
      // اگر 30 دن پورے ہو چکے ہوں تو سیشن خود بخود ایکسپائر کر دیں
      AuthService.logout();
      return null;
    }
    return session;
  },

  // لاگ آؤٹ
  logout: async () => {
    await signOut(auth);
    localStorage.removeItem('azwaj_user_session');
  }
};
