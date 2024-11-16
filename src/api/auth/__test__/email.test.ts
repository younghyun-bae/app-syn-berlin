import { loginWithEmail, emailResister } from '../email';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

jest.mock('expo-web-browser', () => ({
  maybeCompleteAuthSession: jest.fn()
}));

jest.mock('firebase/auth', () => {
  const mockAuth = {
    currentUser: null,
    signOut: jest.fn()
  };

  return {
    getAuth: jest.fn(() => mockAuth),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    initializeAuth: jest.fn(() => mockAuth),
    getReactNativePersistence: jest.fn()
  };
});

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  doc: jest.fn(() => ({})),
  setDoc: jest.fn()
}));

describe('Email Authentication', () => {
  const mockEmail = 'test@example.com';
  const mockPassword = 'testPassword123';
  const mockUser = {
    uid: '12345',
    email: mockEmail,
    displayName: mockEmail,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully log in with email and password', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
    });

    const result = await loginWithEmail(mockEmail, mockPassword);

    expect(result).toEqual(mockUser);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, mockEmail, mockPassword);
  });

  it('should throw an error if login fails', async () => {

    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));
    await expect(loginWithEmail(mockEmail, mockPassword)).rejects.toThrow('Invalid credentials');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, mockEmail, mockPassword);
  });

  it('should successfully register a user with email and password', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
    });

    const result = await emailResister(mockEmail, mockPassword);

    expect(result).toEqual(mockUser);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, mockEmail, mockPassword);
  });

  it('should throw an error if registration fails', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Email already in use'));

    await expect(emailResister(mockEmail, mockPassword)).rejects.toThrow('Email already in use');
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, mockEmail, mockPassword);
  });
});
