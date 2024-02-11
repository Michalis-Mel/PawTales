// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY_VERCEL,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN_VERCEL,
  projectId: import.meta.env.FIREBASE_PROJECT_ID_VERCEL,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET_VERCEL,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID_VERCEL,
  appId: import.meta.env.FIREBASE_APP_ID_VERCEL,
  measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID_VERCEL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const perf = getPerformance(app);
export const firestore = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Create a GoogleAuthProvider instance
export const googleProvider = new GoogleAuthProvider();

// Create a AppleAuthProvider instance
export const facebookProvider = new FacebookAuthProvider();

export default app;
