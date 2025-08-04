// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtENw4zeKevZjg4qZ6n4XMdW3QqObg11Y",
  authDomain: "estate-a7141.firebaseapp.com",
  projectId: "estate-a7141",
  storageBucket: "estate-a7141.appspot.com",
  messagingSenderId: "12374332684",
  appId: "1:12374332684:web:65343728ac2df990422529",
  measurementId: "G-C1YL2YFKBQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

// Initialize Analytics (optional, usually only in browser)
export const analytics = getAnalytics(app);
