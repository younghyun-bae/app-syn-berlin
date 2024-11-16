process.env.EXPO_OS = 'android';

import '@testing-library/jest-native';

// Firebase mocking
const mockPersistence = {
  type: 'asyncStorage',
  storage: {}
};

const mockAuth = {
  currentUser: null,
  signOut: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn()
};

// firebase/auth module mocking
const getReactNativePersistence = (asyncStorage) => mockPersistence;

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    getAuth: jest.fn(() => mockAuth),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    initializeAuth: jest.fn(() => mockAuth),
    getReactNativePersistence,
  };
});

// firebase/app 
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
  getApp: jest.fn(() => ({}))
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(),
    })),
    doc: jest.fn(),
    setDoc: jest.fn(),
    getDoc: jest.fn()
  }))
}));

// expo-modules-core mock
jest.mock('expo-modules-core', () => ({
  Platform: {
    OS: 'android'
  },
  requireNativeModule: jest.fn(),
  EventEmitter: jest.fn()
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn()
}));