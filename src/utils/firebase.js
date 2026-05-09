
import { initializeApp, getApps, getApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getDatabase } from "firebase/database";

import { getStorage } from "firebase/storage";



const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDathVdr-sROZke1jFMFimH7-RjEOJ8aXs",

  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "azwaj-marriage.firebaseapp.com",

  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://azwaj-app-default-rtdb.firebaseio.com",

  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "azwaj-marriage",

  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "azwaj-marriage.firebasestorage.app",

  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "133077457402",

  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:133077457402:web:0fbf8eec720354fd9c6c43",

  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""

};



// فیل سیف انیشیالائزیشن (ڈبل انیشیالائزیشن سے بچنے کے لیے)

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();



export const auth = getAuth(app);

export const db = getFirestore(app);

export const rtdb = getDatabase(app);

export const storage = getStorage(app);



export default app;

