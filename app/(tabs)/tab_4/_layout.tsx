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
      <Stack.Screen 
        name="settings"
        options={{               
          presentation: 'modal',
          gestureDirection: 'horizontal',
          headerShown: true,
          headerTitle: "Settings"
        }}
      />
      <Stack.Screen 
        name="editProfile" 
        options={{ 
          presentation: 'modal',
          gestureDirection: 'vertical',
          headerShown: true,
          headerTitle: "Edit Profile"
        }} 
      />
    </Stack>
  );
};

export default Tab4Layout;
