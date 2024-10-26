import { initializeApp } from 'firebase/app';
import {
  initializeAuth, 
  getReactNativePersistence 
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  REACTNATIVE_FIREBASE_WEB_API_KEY,
  REACTNATIVE_FIREBASE_AUTH_DOMAIN,
  REACTNATIVE_FIREBASE_DATABASE_URL,
  REACTNATIVE_FIREBASE_PROJECT_ID,
  REACTNATIVE_FIREBASE_STORAGE_BUCKET,
  REACTNATIVE_FIREBASE_MESSAGING_SENDER_ID,
  REACTNATIVE_FIREBASE_APP_ID,
  REACTNATIVE_FIREBASE_MEASUREMENT_ID,
} from '@env';

const firebaseConfig = {
  apiKey: REACTNATIVE_FIREBASE_WEB_API_KEY,
  authDomain: REACTNATIVE_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACTNATIVE_FIREBASE_DATABASE_URL,
  projectId: REACTNATIVE_FIREBASE_PROJECT_ID,
  storageBucket: REACTNATIVE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACTNATIVE_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACTNATIVE_FIREBASE_APP_ID,
  measurementId: REACTNATIVE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, app };