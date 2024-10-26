import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';
import { 
  GoogleAuthProvider, 
  signInWithCredential, 
} from 'firebase/auth';
import { auth } from '../firebase';
import {
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID
} from '@env';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export const loginWithGoogle = () => {

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    const handleGoogleSignIn = async () => {
      if (response?.type === "success") {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
      }
    }
    handleGoogleSignIn();
  }, [response]);
};