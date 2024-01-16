// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD9Y6c-y_uaueU_OsCVFhVHSM0sMDzwd0o',
  authDomain: 'pawtales-86bbb.firebaseapp.com',
  projectId: 'pawtales-86bbb',
  storageBucket: 'pawtales-86bbb.appspot.com',
  messagingSenderId: '435684730064',
  appId: '1:435684730064:web:bea724dbd9b5bec728aad5',
  measurementId: 'G-HN9WTNEV37',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const perf = getPerformance(app);
export const firestore = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Create a GoogleAuthProvider instance
export const googleProvider = new GoogleAuthProvider();

export default app;
