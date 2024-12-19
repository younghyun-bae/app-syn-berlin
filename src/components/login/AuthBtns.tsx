import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

interface AuthButtonsProps {
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
  isGoogleLoading: boolean;
  isFacebookLoading: boolean;
}

const AuthButtons = ({ onGoogleLogin, onFacebookLogin, isGoogleLoading, isFacebookLoading }: AuthButtonsProps) => {
  return (
    <AuthContainer>
      <AuthButton onPress={onFacebookLogin} disabled={isFacebookLoading}>
        <AuthIconContainer>
          <FontAwesomeIcon icon={faFacebook} size={32} color="#ffffff" />
        </AuthIconContainer>
      </AuthButton>
      <AuthButton onPress={onGoogleLogin} disabled={isGoogleLoading}>
        <AuthIconContainer>
          <FontAwesomeIcon icon={faGoogle} size={32} color="#ffffff" />
        </AuthIconContainer>
      </AuthButton>
    </AuthContainer>
  );
};

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

export default AuthButtons;