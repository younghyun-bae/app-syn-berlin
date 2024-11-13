import { loginWithEmail, emailResister } from '../email';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
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

  // Test loginWithEmail function
  it('should successfully log in with email and password', async () => {
    // Arrange: Mock successful sign in
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
    });

    // Act: Call login function
    const result = await loginWithEmail(mockEmail, mockPassword);

    // Assert: Check that the result matches the mock user
    expect(result).toEqual(mockUser);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, mockEmail, mockPassword);
  });

  it('should throw an error if login fails', async () => {
    // Arrange: Mock failed sign in
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));

    // Act & Assert: Check that error is thrown
    await expect(loginWithEmail(mockEmail, mockPassword)).rejects.toThrow('Invalid credentials');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, mockEmail, mockPassword);
  });

  // Test emailResister function
  it('should successfully register a user with email and password', async () => {
    // Arrange: Mock successful user registration
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
    });

    // Act: Call register function
    const result = await emailResister(mockEmail, mockPassword);

    // Assert: Check that the result matches the mock user
    expect(result).toEqual(mockUser);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, mockEmail, mockPassword);
  });

  it('should throw an error if registration fails', async () => {
    // Arrange: Mock failed user registration
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Email already in use'));

    // Act & Assert: Check that error is thrown
    await expect(emailResister(mockEmail, mockPassword)).rejects.toThrow('Email already in use');
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, mockEmail, mockPassword);
  });
});
