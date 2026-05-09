import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getDatabase } from "firebase/database";

import { getStorage } from "firebase/storage";



// ورسل (Vite) انوائرمنٹ ویری ایبلز سے کنفیگریشن حاصل کرنا

const firebaseConfig = {

  apiKey: "AIzaSyDathVdr-sROZke1jFMFimH7-RjEOJ8aXs",

  authDomain: "azwaj-marriage.firebaseapp.com",

  projectId: "azwaj-marriage",

  storageBucket: "azwaj-marriage.firebasestorage.app",

  messagingSenderId: "133077457402",

  appId: "1:133077457402:web:0fbf8eec720354fd9c6c43"

};



// فائر بیس انیشیالائز کرنا

const app = initializeApp(firebaseConfig);



// تمام سروسز ایکسپورٹ کرنا تاکہ پورے ایپ میں استعمال ہو سکیں

export const auth = getAuth(app);

export const db = getFirestore(app);

export const rtdb = getDatabase(app); // ریئل ٹائم ڈیٹا بیس (اگر لائیو چیٹ کے لیے ضرورت ہو)

export const storage = getStorage(app);



export default app;

