import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// براہ راست فائر بیس کنفیگریشن (ورسکل اور لوکل دونوں کے لیے فیل سیف گارڈ کے ساتھ)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA-Direct-Key-Backup-If-Env-Fails",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "azwaj-app.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://azwaj-app-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "azwaj-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "azwaj-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234:web:abcd",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXX"
};

// فائر بیس انیشیالائز کرنا (بغیر کریش سیفٹی چیک کے)
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);

export default app;
