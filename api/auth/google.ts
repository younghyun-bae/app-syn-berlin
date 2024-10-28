import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';
import { AuthRequest, AuthSessionResult } from 'expo-auth-session';
import { 
  GoogleAuthProvider, 
  signInWithCredential, 
} from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

interface UseGoogleAuthReturnType {
  request: AuthRequest | null;
  response: AuthSessionResult | null;
  googlePromptAsync: () => Promise<AuthSessionResult | null>;
}

export const useGoogleAuth = (): UseGoogleAuthReturnType => {
  const [request, response, googlePromptAsync] = Google.useAuthRequest({
    iosClientId: '',
    androidClientId: '',
  });

  useEffect(() => {
    const signInWithGoogle = async (): Promise<void> => {
      if (response?.type === "success" && response.params.id_token) {
        const credential = GoogleAuthProvider.credential(response.params.id_token);
        try {
          const googleUserCredential = await signInWithCredential(auth, credential);
          console.log('Google User: ', googleUserCredential.user);
        } catch(error) {
          console.error('Failed Google credential:', error);
        }
      }
    };
    signInWithGoogle();
  }, [response]);

  return { request, response, googlePromptAsync };
};