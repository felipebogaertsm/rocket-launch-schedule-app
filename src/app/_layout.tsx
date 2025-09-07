import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';

function makeClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 min: data considered “fresh”
        gcTime: 30 * 60 * 1000, // 30 min: keep cache to avoid re-hits
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: (failures, err: any) => {
          // Don’t retry on 4xx / 429 to respect rate limits
          const status = err?.status ?? err?.response?.status;
          if (status && (status < 500 || status === 429)) return false;
          return failures < 2; // at most 2 retries on 5xx/timeouts
        },
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000), // bounded backoff
      },
    },
  });
}

export default function RootLayout() {
  const [queryClient] = useState(makeClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ title: 'Rocket Launch Schedule' }} />
    </QueryClientProvider>
  );
}
