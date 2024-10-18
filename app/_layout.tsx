import { Stack } from 'expo-router';
import { FC } from 'react';

const RootLayout: FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
