import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("Email User: ", result.user);
    return result.user;
  } catch (error) {
    console.error("Email login error", error);
    throw error;
  }
};
