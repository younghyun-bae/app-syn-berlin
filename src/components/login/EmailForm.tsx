import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

interface EmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onEmailLogin: () => void;
}

const EmailForm = ({ email, setEmail, password, setPassword, onEmailLogin }: EmailFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
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
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size={20} color="#5A5A5F" />
        </EyeIconContainer>
      </View>
      <EmailLoginButton onPress={onEmailLogin}>
        <SubmitButtonText>Log In</SubmitButtonText>
      </EmailLoginButton>
    </EmailContainer>
  );
};

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

export default EmailForm;
