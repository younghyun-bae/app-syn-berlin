import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <WelcomeText>Welcome, you talent</WelcomeText>
            <AuthContainer>
                <AuthButton>
                    <AuthIconContainer>
                        <FontAwesomeIcon icon={faFacebook} size={32} color="#ffffff" />
                    </AuthIconContainer>
                </AuthButton>
                <AuthButton>
                    <AuthIconContainer>
                        <FontAwesomeIcon icon={faGoogle} size={32} color='#ffffff'/>
                    </AuthIconContainer>
                </AuthButton>
            </AuthContainer>
            <Divider />
            <Text> Or continue with Email</Text>
            <EmailContainer>
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
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
            <SubmitButton onPress={() => router.push('/(tabs)')}>
                <SubmitButtonText>Log In</SubmitButtonText>
            </SubmitButton>
            </EmailContainer>
            <JoinText>Don't have an account?</JoinText>
            <JoinLink onPress={() => console.log('Join!')}>
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

    const SubmitButton = styled.TouchableOpacity`
        background-color: #212121;
        padding: 12px;
        align-items: center;
        border-radius: 30px;
        margin-top: 20px;
        width: 100%;
    `;

    const SubmitButtonText = styled.Text`
        color: white;
        font-size: 16px;
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