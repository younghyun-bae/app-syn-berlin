import React from 'react';
import styled from 'styled-components/native';

const Header = () => {
  return <WelcomeText>Welcome, you talent</WelcomeText>;
};

const WelcomeText = styled.Text`
  font-size: 18px;
  font-family: 'DMSans_700Bold_Italic';
  font-weight: bold;
  margin-bottom: 20px;
`;

export default Header;
