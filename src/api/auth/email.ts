import * as WebBrowser from 'expo-web-browser';
import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

WebBrowser.maybeCompleteAuthSession();

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const emailUserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = emailUserCredential.user;
      console.log("Email User: ", user);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Email login error", error);
      throw new Error(error.message);
    } else {
      throw new Error('An unkown error occurred')
    }
  }
};

export const emailResister = async (email: string, password: string) => {
  try {
    const emailUserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = emailUserCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      disPlayName: user.email,
    });

    console.log("User registered with email: ", user);
    return user;
  } catch (error) {
    console.error("Email register error", error);
    throw error;
  }
};