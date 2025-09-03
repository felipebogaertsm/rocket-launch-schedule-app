import EmptyState from '@/components/EmptyState';
import ErrorView from '@/components/ErrorView';
import LaunchCard from '@/components/LaunchCard';
import Loading from '@/components/Loading';
import { fetchUpcomingLaunches } from '@/services/launches';
import type { LL2Launch } from '@/types/launches';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

type Page = { next: string | null; items: LL2Launch[] };

export default function LaunchesScreen() {
  const [page, setPage] = useState<Page>({ next: null, items: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (nextUrl?: string | null) => {
    try {
      setError(null);
      const res = await fetchUpcomingLaunches({ nextUrl });
      setPage((prev) => ({
        next: res.next,
        items: nextUrl ? [...prev.items, ...res.results] : res.results,
      }));
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load launches');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // initial
  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load(undefined); // reset
  };

  const onEndReached = () => {
    if (page.next && !loading && !refreshing && !error) {
      load(page.next);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorView message={error} onRetry={() => load()} />;

  return (
    <View style={{ flex: 1, backgroundColor: '#0b0b0c' }}>
      <FlatList
        data={page.items}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={{ borderBottomColor: '#1b1b1d', borderBottomWidth: 1 }}>
            <LaunchCard launch={item} />
          </View>
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<EmptyState hint="Try pulling to refresh." />}
        contentContainerStyle={{ paddingBottom: 12 }}
      />
    </View>
  );
}
