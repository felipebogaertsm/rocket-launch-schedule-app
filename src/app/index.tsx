import { useInfiniteQuery, type QueryKey } from '@tanstack/react-query';
import { FlatList, RefreshControl, View } from 'react-native';

import ErrorView from '@/components/ErrorView';
import Loading from '@/components/Loading';
import { fetchUpcomingLaunches } from '@/services/launches';
import type { LL2Launch, LL2Paginated } from '@/types/launches';
import { EmptyState, LaunchCard } from './_components';

export default function HomeScreen() {
  const limit = 20;

  const {
    data: items,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    LL2Paginated<LL2Launch>,
    Error,
    LL2Launch[],
    QueryKey,
    string | null
  >({
    queryKey: ['launches', 'upcoming', { limit }],
    initialPageParam: null,
    queryFn: ({ pageParam }) =>
      pageParam
        ? fetchUpcomingLaunches({ nextUrl: pageParam })
        : fetchUpcomingLaunches({ limit }),
    getNextPageParam: (lastPage) => lastPage.next,
    staleTime: 60_000,
    select: (infinite) => infinite.pages.flatMap((p) => p.results),
  });

  if (isLoading) return <Loading />;
  if (isError)
    return <ErrorView message={error.message} onRetry={() => refetch()} />;

  return (
    <View style={{ flex: 1, backgroundColor: '#0b0b0c' }}>
      <FlatList
        data={items ?? []}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => refetch()}
          />
        }
        renderItem={({ item }) => (
          <View style={{ borderBottomColor: '#1b1b1d', borderBottomWidth: 1 }}>
            <LaunchCard launch={item} />
          </View>
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<EmptyState hint="Try pulling to refresh." />}
        ListFooterComponent={isFetchingNextPage ? <Loading /> : null}
        contentContainerStyle={{ paddingBottom: 12 }}
      />
    </View>
  );
}
