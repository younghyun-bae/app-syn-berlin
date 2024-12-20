import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import styled from 'styled-components/native';

import { useGoogleAuth } from '../../api/auth/google';
import { useFacebookAuth } from '../../api/auth/facebook';
import { loginWithEmail, emailResister } from '../../api/auth/email';

import Header from './Header';
import AuthBtns from './AuthBtns';
import EmailForm from './EmailForm';
import JoinLink from './JoinLink';
import Divider from './Divider';


const LoginScreen = () => {
  const { googlePromptAsync } = useGoogleAuth();
  const { facebookPromptAsync } = useFacebookAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

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

  const handleEmailRegister = async () => {
    try {
      await emailResister(email, password);
      setIsRegistering(false);
      Alert.alert("Sign Up success", "Please Login with your registered Email.");
    } catch (error) {
      Alert.alert("Sign Up Failed", "An error occurred during registration.");
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

      <OrText>Choose your account</OrText>
      <Divider />
      <OrText>Or continue with Email</OrText>

      <EmailForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onEmailLogin={handleEmailLogin}
      />
      <JoinLink onPress={() => setIsRegistering(!isRegistering)} />
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

const OrText = styled.Text`
  font-family: 'DMSans_500Medium';
  margin: 10px 0 10px 0;
`;

export default LoginScreen;
