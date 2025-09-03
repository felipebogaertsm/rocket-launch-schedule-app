import { useCallback, useEffect, useRef, useState } from 'react';

export function usePaginatedFetch<T, P extends { nextUrl?: string | null }>(
  fetcher: (params: P) => Promise<{ next: string | null; results: T[] }>,
  baseParams: Omit<P, 'nextUrl'>,
  opts: { auto?: boolean } = { auto: true }
) {
  type Base = Omit<P, 'nextUrl'>;

  const [items, setItems] = useState<T[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!opts.auto);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paramsRef = useRef<Base>(baseParams);
  const reqId = useRef(0);

  const loadInitial = useCallback(async () => {
    const my = ++reqId.current;
    setError(null);
    setLoading(true);
    try {
      const res = await fetcher({ ...(paramsRef.current as Base) } as P);
      if (reqId.current !== my) return;
      setItems(res.results);
      setNext(res.next);
    } catch (e: any) {
      if (reqId.current === my) setError(e?.message ?? 'Failed to load');
    } finally {
      if (reqId.current === my) setLoading(false);
    }
  }, [fetcher]);

  const loadMore = useCallback(async () => {
    if (!next || loading || refreshing || error) return;
    const my = ++reqId.current;
    try {
      const res = await fetcher({ ...(paramsRef.current as Base), nextUrl: next } as P);
      if (reqId.current !== my) return;
      setItems(prev => [...prev, ...res.results]);
      setNext(res.next);
    } catch (e: any) {
      if (reqId.current === my) setError(e?.message ?? 'Failed to load more');
    }
  }, [fetcher, next, loading, refreshing, error]);

  const refresh = useCallback(async (override?: Partial<Base>) => {
    if (override) paramsRef.current = { ...paramsRef.current, ...override } as Base;
    setRefreshing(true);
    const my = ++reqId.current;
    setError(null);
    try {
      const res = await fetcher({ ...(paramsRef.current as Base) } as P);
      if (reqId.current !== my) return;
      setItems(res.results);
      setNext(res.next);
    } catch (e: any) {
      if (reqId.current === my) setError(e?.message ?? 'Failed to refresh');
    } finally {
      if (reqId.current === my) setRefreshing(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (opts.auto) void loadInitial();
  }, []);

  const setParams = useCallback((updater: (prev: Base) => Base) => {
    paramsRef.current = updater(paramsRef.current);
  }, []);

  return { items, next, loading, refreshing, error, loadInitial, loadMore, refresh, setParams } as const;
}
