import React from 'react';
import { AuthProvider } from 'src/api/context/AuthContext';
import { ProfileProvider } from 'src/api/context/ProfileContext';
import { Stack } from 'expo-router';

const RootLayout: React.FC = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="login" 
            options={{ 
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
            }} />
          <Stack.Screen
            name="detail/[itemId]" 
            options={{ 
              presentation: 'modal' ,
            }} 
          />
        </Stack>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default RootLayout;
