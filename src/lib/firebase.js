// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa9d4gKdfytIjXZZLSbd5unb7eHFLJ3-E",
  authDomain: "chat-app-3badc.firebaseapp.com",
  projectId: "chat-app-3badc",
  storageBucket: "chat-app-3badc.firebasestorage.app",
  messagingSenderId: "906131017557",
  appId: "1:906131017557:web:ea8c8eed9282d5cd5b69dc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);