import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Friender' }} />
      <Stack.Screen name="profile" options={{ title: '프로필' }} />
      <Stack.Screen name="friends" options={{ title: '친구 목록' }} />
    </Stack>
  );
}
