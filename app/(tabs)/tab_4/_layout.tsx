import { Stack } from 'expo-router';

const Tab4Layout = () => {
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

export default Tab4Layout;
