import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = ({ }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <WelcomeText>Welcom, you talent</WelcomeText>
      <AuthContainer>
        <AuthButton>
          <FontAwesomeIcon icon={faFacebook} size={24} color="#232323" />
        </AuthButton>
        <AuthButton>
          <FontAwesomeIcon icon={faGoogle} size={24} color='#232323'/>
        </AuthButton>
      </AuthContainer>
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
              size={24}
              color='#5A5A5F'
            />
          </EyeIconContainer>
        </View>
        <SubmitButton onPress={() => console.log('Login!')}>
          <SubmitButtonText>Log In</SubmitButtonText>
        </SubmitButton>
      </EmailContainer>
      <JoinText>Don't hvae an account?</JoinText>
      <TouchableOpacity onPress={() => console.log('Join!')}>
        <Text style={styles.linkText}>Join Berlin's Creative Hub</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  linkText: {
    color: '#007bff',
    marginTop: 5,
  },
});

const WelcomeText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const AuthContainer = styled.View`
  margin-bottom: 20px;
`;

const AuthButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const AuthButtonText = styled.Text`
  font-size: 16px;
  color: #212121;
  margin-right: 8px;
`;

const EmailContainer = styled.View`
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const EyeIconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 12px;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #212121;
  padding: 10px;
  align-items: center;
  border-radius: 5px;
`;

const SubmitButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const JoinText = styled.Text`
  margin-top: 10px;
`;


export default LoginScreen;