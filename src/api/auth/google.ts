import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';
import { AuthRequest, AuthSessionResult } from 'expo-auth-session';
import { 
  GoogleAuthProvider, 
  signInWithCredential, 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useEffect } from 'react';
import { 
  EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID 
} from '@env';

WebBrowser.maybeCompleteAuthSession();

interface UseGoogleAuthReturnType {
  request: AuthRequest | null;
  response: AuthSessionResult | null;
  googlePromptAsync: () => Promise<AuthSessionResult | null>;
}

export const useGoogleAuth = (): UseGoogleAuthReturnType => {
  const [request, response, googlePromptAsync] = Google.useAuthRequest({
    iosClientId: EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    const signInWithGoogle = async (): Promise<void> => {
      if (response?.type === "success" && response.params.id_token) {
        const credential = GoogleAuthProvider.credential(response.params.id_token);

        try {
          const googleUserCredential = await signInWithCredential(auth, credential);

          const user = googleUserCredential.user;
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (!userDoc.exists()) {
            // Create a new user profile if none exists
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || user.email,
            });
          }

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