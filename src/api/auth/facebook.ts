import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from 'expo-web-browser';
import { AuthRequest, AuthSessionResult } from 'expo-auth-session';
import { 
  FacebookAuthProvider, 
  signInWithCredential 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useEffect } from 'react';
import { EXPO_PUBLIC_FACEBOOK_APP_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

interface UseFacebookAuthReturnType {
  request: AuthRequest | null;
  response: AuthSessionResult | null;
  facebookPromptAsync: () => Promise<AuthSessionResult | null>;
}

export const useFacebookAuth = (): UseFacebookAuthReturnType => {
  const [request, response, facebookPromptAsync] = Facebook.useAuthRequest({
    clientId: EXPO_PUBLIC_FACEBOOK_APP_ID,
  });

  useEffect(() => {
    const signInWithFacebook = async (): Promise<void> => {
      if (response?.type === "success" && response.params.id_token) {
        const credential = FacebookAuthProvider.credential(response.params.id_token);
        try {
          const facebookUserCredential = await signInWithCredential(auth, credential);

          const user = facebookUserCredential.user;
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (!userDoc.exists()) {
            await setDoc(doc(db, "users", user.uid), {
              uid: user.displayName,
              email: user.email,
              displayName: user.displayName || user.email,
            });
          }

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
