import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAriYPcfBwmac72ly8wrDP0DmTXr_eozbo",
  authDomain: "study-tracker-mini.firebaseapp.com",
  projectId: "study-tracker-mini",
  storageBucket: "study-tracker-mini.firebasestorage.app",
  messagingSenderId: "202541857244",
  appId: "1:202541857244:web:ed9fe4cf143f28d3f3b719"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
