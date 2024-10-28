import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from 'expo-web-browser';
import { AuthRequest, AuthSessionResult } from 'expo-auth-session';
import { 
  FacebookAuthProvider, 
  signInWithCredential 
} from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

interface UseFacebookAuthReturnType {
  request: AuthRequest | null;
  response: AuthSessionResult | null;
  facebookPromptAsync: () => Promise<AuthSessionResult | null>;
}

export const useFacebookAuth = (): UseFacebookAuthReturnType => {
  const [request, response, facebookPromptAsync] = Facebook.useAuthRequest({
    clientId: '',
  });

  useEffect(() => {
    const signInWithFacebook = async (): Promise<void> => {
      if (response?.type === "success" && response.params.id_token) {
        const credential = FacebookAuthProvider.credential(response.params.id_token);
        try {
          const facebookUserCredential = await signInWithCredential(auth, credential);
          console.log('Facebook User: ', facebookUserCredential.user);
        } catch(error) {
          console.error('Failed Facebook credential: ', error);
          
        }
      }
    };
    signInWithFacebook();
  }, [response]);

  return { request, response, facebookPromptAsync };
};
