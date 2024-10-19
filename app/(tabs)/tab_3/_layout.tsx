import { Stack } from 'expo-router';

const Tab3Layout = () => {
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

export default Tab3Layout;
