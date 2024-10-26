import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';



const firebaseConfig = {
  apiKey: process.env.REACTNATIVE_PUBLIC_FIREBASE_API_KEY || 'mock_key',
  authDomain: process.env.REACTNATIVE_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACTNATIVE_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.REACTNATIVE_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACTNATIVE_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACTNATIVE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACTNATIVE_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.REACTNATIVE_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// const db = getFirestore(app);

export { auth, app };