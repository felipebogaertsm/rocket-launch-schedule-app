import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { InfoRow } from '@/components';
import { fetchLaunchById } from '@/services/launches';

export default function LaunchDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['launch', id],
    queryFn: () => fetchLaunchById(id!),
    enabled: !!id,
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.muted}>Loading launch…</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Couldn’t load this launch.</Text>
        <Text style={styles.muted}>
          {(error as Error)?.message ?? 'Unknown error'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: data.name ?? 'Launch' }} />

      {data.image ? (
        <Image
          source={{ uri: data.image }}
          style={styles.banner}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.banner, styles.bannerFallback]}>
          <Text style={styles.muted}>No image</Text>
        </View>
      )}

      <InfoRow label="Status" value={data.status?.name ?? 'Unknown'} />
      <InfoRow
        label="Window start"
        value={data.net ? new Date(data.net).toLocaleString() : 'TBD'}
      />
      <InfoRow
        label="Pad"
        value={
          [data.pad?.name, data.pad?.location?.name]
            .filter(Boolean)
            .join(' · ') || 'Unknown'
        }
      />

      {data.mission?.name ? (
        <View style={{ marginTop: 16 }}>
          <Text style={styles.h2}>{data.mission.name}</Text>
          <Text style={styles.body}>
            {data.mission.description ?? 'No description available.'}
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  muted: { color: '#666', marginTop: 8 },
  error: { color: '#c00', fontWeight: '600', marginTop: 8 },

  container: { padding: 16, gap: 16 },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  bannerFallback: { alignItems: 'center', justifyContent: 'center' },

  h2: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  body: { fontSize: 15, color: '#333', lineHeight: 20 },
});
