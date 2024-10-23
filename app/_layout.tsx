import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
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
  );
};

export default RootLayout;
