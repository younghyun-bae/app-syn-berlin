import { FacebookAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../firebase';

export const loginWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithRedirect(auth, provider);
    // console.log("Facebook User: ", result.user);
    // return result.user;
  } catch (error) {
    console.error("Facebook login error", error);
    throw error;
  }
};
