// src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

  const firebaseConfig = {
    apiKey: "AIzaSyAKLpM0UfqZTi1MHmUQVc9mACsA04L42XQ",
    authDomain: "samiksha-enterprises-133a0.firebaseapp.com",
    projectId: "samiksha-enterprises-133a0",
    storageBucket: "samiksha-enterprises-133a0.firebasestorage.app",
    messagingSenderId: "917767502016",
    appId: "1:917767502016:web:3ba40238d449d9f2b81525",
    measurementId: "G-HQJ0CDTNN2"
  };

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
