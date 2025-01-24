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
        <Stack.Screen 
          name="eachUser" 
          options={{ 
            presentation: 'modal',
            gestureDirection: 'vertical',
            headerShown: false,
            headerTitle: "user[i]"
          }} 
      />
    </Stack>
  );
};

export default Tab2Layout;
