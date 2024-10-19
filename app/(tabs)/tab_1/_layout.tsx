import { Stack } from 'expo-router';

const Tab1Layout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
        }} 
      />
    </Stack>
  );
};

export default Tab1Layout;
