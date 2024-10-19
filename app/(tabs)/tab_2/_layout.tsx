import { Stack } from 'expo-router';

const Tab2Layout = () => {
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

export default Tab2Layout;
