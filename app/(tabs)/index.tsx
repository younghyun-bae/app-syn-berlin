import React from 'react';
import HomeScreen from '../../src/components/home/HomeScreen';
import { Text, View } from 'react-native';
import { useAuth } from 'src/api/context/AuthContext';

const Intro = () => {
  const { state } = useAuth();
  const { user } = state;

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (  
    <>
      <Text>
        Welcome, {user.displayName || 'User'}
      </Text>
      <HomeScreen />
    </>
  )

};

export default Intro;
