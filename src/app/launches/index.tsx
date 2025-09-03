import { FlatList, RefreshControl, View } from 'react-native';

import EmptyState from '@/components/EmptyState';
import ErrorView from '@/components/ErrorView';
import LaunchCard from '@/components/LaunchCard';
import Loading from '@/components/Loading';
import { usePaginatedFetch } from '@/hooks/usePaginatedFetch';
import { fetchUpcomingLaunches } from '@/services/launches';
import type { LL2Launch } from '@/types/launches';

export default function LaunchesScreen() {
  const {
    items,
    next,
    loading,
    refreshing,
    error,
    loadMore,
    refresh,
  } = usePaginatedFetch<LL2Launch, { limit?: number; search?: string; nextUrl?: string | null }>(
    fetchUpcomingLaunches,
    { limit: 20 } // base params
  );

  if (loading) return <Loading />;
  if (error) return <ErrorView message={error} onRetry={() => refresh()} />;

  return (
    <View style={{ flex: 1, backgroundColor: '#0b0b0c' }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refresh()} />}
        renderItem={({ item }) => (
          <View style={{ borderBottomColor: '#1b1b1d', borderBottomWidth: 1 }}>
            <LaunchCard launch={item} />
          </View>
        )}
        onEndReached={() => { if (next) loadMore(); }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<EmptyState hint="Try pulling to refresh." />}
        contentContainerStyle={{ paddingBottom: 12 }}
      />
    </View>
  );
}
