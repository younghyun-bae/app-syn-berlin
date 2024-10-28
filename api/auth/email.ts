import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
} from 'firebase/auth';



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