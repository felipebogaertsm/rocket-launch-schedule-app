import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name='index' options={{title: "Home"}}/>
        <Stack.Screen name='launches/index' options={{title: "Launches"}}/>
      </Stack>
    </QueryClientProvider>
  );
}
