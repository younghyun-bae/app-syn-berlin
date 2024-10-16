import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 16px;
`;

const Title = styled.View`
  margin-bottom: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  resize-mode: contain;
  margin-bottom: 10px;
`;

const IntroCopy = styled.Text`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  background-color: #232323;
  padding-vertical: 12px;
  padding-horizontal: 20px;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const handlePress = () => {
    console.log('Navigate to login');
  };

  return (
    <Container>
      <Title>
        <Logo source={require('../../assets/images/SYN.png')} />
      </Title>
      <IntroCopy>
        Unleash Potential, Connect, and Create in Berlin
      </IntroCopy>
      <Button onPress={handlePress}>
        <ButtonText>Get Started</ButtonText>
      </Button>
    </Container>
  );
};

export default App;