import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';

import { useGoogleAuth } from '../src/api/auth/google';
import { useFacebookAuth } from '../src/api/auth/facebook';
import { loginWithEmail } from '../src/api/auth/email';

import AuthBtns from '../src/components/login/AuthBtns';
import EmailForm from '../src/components/login/EmailForm';
import Header from '../src/components/login/Header';

const LoginScreen = () => {
  const { googlePromptAsync } = useGoogleAuth();
  const { facebookPromptAsync } = useFacebookAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    if (isGoogleLoading) return;
    setIsGoogleLoading(true);
    try {
      const result = await googlePromptAsync();
      if (result && result.type === 'success') {
        router.push('/(tabs)');
      } else {
        Alert.alert("Google Login Failed", "Login was cancelled or failed.\nPlease try again.");
      }
    } catch (error) {
      console.error("Failed to login with Google", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    if (isFacebookLoading) return;
    setIsFacebookLoading(true);
    try {
      const result = await facebookPromptAsync();
      if (result && result.type === 'success') {
        router.push('/(tabs)');
      } else {
        Alert.alert("Facebook Login Failed", "Login was cancelled or failed.\nPlease try again.");
      }
    } catch (error) {
      console.error("Failed to login with Facebook", error);
    } finally {
      setIsFacebookLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await loginWithEmail(email, password);
      router.push('/(tabs)');
    } catch (error) {
      Alert.alert("Email Login failed", "Please check your credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <AuthBtns
        onGoogleLogin={handleGoogleLogin}
        onFacebookLogin={handleFacebookLogin}
        isGoogleLoading={isGoogleLoading}
        isFacebookLoading={isFacebookLoading}
      />
      <EmailForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onEmailLogin={handleEmailLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#CDDC52',
  },
});

export default LoginScreen;
