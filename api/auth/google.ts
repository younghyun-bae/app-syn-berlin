import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth } from '../firebase';

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, provider);
    // console.log("Google User: ", result.user);
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("Google User: ", result.user);
      return result.user;
    }
  } catch (error) {
    console.error("Google login error", error);
    throw error;
  }
};