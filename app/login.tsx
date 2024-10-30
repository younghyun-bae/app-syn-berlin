import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';

import { useGoogleAuth } from '../src/api/auth/google';
import { useFacebookAuth } from '../src/api/auth/facebook';
import { loginWithEmail, emailResister } from '../src/api/auth/email';

import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

const LoginScreen = () => {
    const { googlePromptAsync } = useGoogleAuth();
    const { facebookPromptAsync } = useFacebookAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

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
            Alert.alert("Google Login failed", "An error occurred.\nPlease reopen the app and try again.");
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
                Alert.alert("Facebook Login Failed", "Login was cancelled or failed.\nPlease try again.")
            }
        } catch (error) {
            console.error("Failed to login with Facebook", error);
            Alert.alert("Facebook Login failed", "An error occurred.\nPlease reopen the app and try again.");
        } finally {
            setIsFacebookLoading(false);
        }
    };

    const handleEmailLogin = async () => {
        try {
            await loginWithEmail(email, password);
            router.push('/(tabs)');
        } catch (error) {
            console.error("Failed to login with Email", error);
            Alert.alert("Email Login failed", "Please check your email address and password are correct, and try again.");
        }
    };

    const handleEmailRegister = async () => {
        try {
            await emailResister(email, password);
            console.log("Registration successful, redirecting to login...");
            setIsRegistering(false);
            Alert.alert("Sign Up success", "Please Login with your registerd Email.");
        } catch (error) {
            console.error("Failed to register with Email", error);
            Alert.alert("Sign Up Failed", "An error occurred during email registeration. Please try again or use a different method.");
        }
    };    

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    return (
        <View style={styles.container}>
            <WelcomeText style={{ letterSpacing: -0.5 }}>
                Welcome, you talent
            </WelcomeText>

            <AuthContainer>
                <AuthButton onPress={handleFacebookLogin} disabled={isFacebookLoading}>
                    <AuthIconContainer>
                        <FontAwesomeIcon icon={faFacebook} size={32} color="#ffffff" />
                    </AuthIconContainer>
                </AuthButton>
                <AuthButton onPress={handleGoogleLogin} disabled={isGoogleLoading}>
                    <AuthIconContainer>
                        <FontAwesomeIcon icon={faGoogle} size={32} color='#ffffff'/>
                    </AuthIconContainer>
                </AuthButton>
            </AuthContainer>
            <OrText style={{ letterSpacing: -0.5 }}>
                Choose your account
            </OrText>
            <Divider />
            <OrText style={{ letterSpacing: -0.5 }}>
                Or continue with Email
            </OrText>
            <EmailContainer>
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <View>
                    <Input 
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    />
                    <EyeIconContainer onPress={toggleShowPassword}>
                        <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            size={20}
                            color='#5A5A5F'
                        />
                    </EyeIconContainer>
                </View>
                <EmailLoginButton onPress={handleEmailLogin}>
                    <SubmitButtonText style={{ letterSpacing: -0.5 }}>
                        Log In
                    </SubmitButtonText>
                </EmailLoginButton>
            </EmailContainer>
            <JoinText>Don't have an account?</JoinText>
            <JoinLink onPress={handleEmailRegister}>
                Join Berlin's Creative Hub
            </JoinLink>
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
    passwordContainer: {
        position: 'relative',
        width: 420,
    },
    orText: {
        marginVertical: 20,
    },
    joinContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    });

    const WelcomeText = styled.Text`
        font-size: 18px;
        font-family: 'DMSans_700Bold_Italic';
        font-weight: bold;
        margin-bottom: 20px;
    `;

    const AuthContainer = styled.View`
        flex-direction: row;
        margin-bottom: 20px;
    `;

    const AuthButton = styled.TouchableOpacity`
        margin: 0 10px;
        background-color: #232323;
        padding: 10px;
        border-radius: 50px;
    `;

    const AuthIconContainer = styled.View`
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
    `;

    const Divider = styled.View`
    height: 1px;
    background-color: #232323;
    width: 80%;
    margin: 20px 0;
    `;

    const OrText = styled.Text`
        font-family: 'DMSans_500Medium';
    `;

    const EmailContainer = styled.View`
        width: 320px;
    `;

    const Input = styled.TextInput`
        border: 1px solid #232323;
        background-color: #ffffff;
        padding: 10px;
        margin-top: 10px;
        border-radius: 30px;
        width: 100%;
    `;

    const EyeIconContainer = styled.TouchableOpacity`
        position: absolute;
        right: 4%;
        top: 39%;
    `;

    const EmailLoginButton = styled.TouchableOpacity`
        background-color: #212121;
        padding: 12px;
        align-items: center;
        border-radius: 30px;
        margin-top: 20px;
        width: 100%;
    `;

    const SubmitButtonText = styled.Text`
        font-family: 'DMSans_700Bold';
        color: white;
        font-size: 18px;
    `;

    const JoinText = styled.Text`
        margin-top: 10px;
    `;

    const JoinLink = styled.Text`
        color: #9082C3;
        margin-top: 5px;
        font-weight: bold;
    `;

export default LoginScreen;