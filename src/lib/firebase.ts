// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// TODO: Replace with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA-8jNH8zbVxun9jilgOu8MG_5A8WDS3r0",
  authDomain: "onekey-c16be.firebaseapp.com",
  projectId: "onekey-c16be",
  storageBucket: "onekey-c16be.firebasestorage.app",
  messagingSenderId: "913046873122",
  appId: "1:913046873122:web:fa152d02ac3edfeef5d67b",
  measurementId: "G-36RVGJ8G5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
