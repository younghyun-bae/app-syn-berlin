import { jest } from '@jest/globals';

// Firebase mocks
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
  getApp: jest.fn(() => ({}))
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
    signOut: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn()
  })),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn()
}));

jest.mock('firebase/firestore', () => {
  const originalModule = jest.requireActual('firebase/firestore');
  return {
    ...originalModule,
    getFirestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue({
          empty: false,
          docs: Array.from({ length: 100 }, (_, i) => ({
            id: `post-${i}`,
            data: () => ({
              id: `post-${i}`,
              title: `Test Post ${i}`,
              content: `This is test content for post ${i}`,
              likes: Math.floor(Math.random() * 100),
              author: `Author ${i}`,
              createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
              replies: Math.floor(Math.random() * 20),
              likedByUser: false,
            }),
          })),
        }),
      })),
    })),
    collection: jest.fn(),
    getDocs: jest.fn(),
    doc: jest.fn(),
    updateDoc: jest.fn(),
  };
});

// Expo-router mock
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn()
  }),
  Stack: {
    Screen: jest.fn()
  }
}));

// Performance mock
global.performance = {
  now: jest.fn(() => Date.now())
};

// Async Storage Mock
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
}));