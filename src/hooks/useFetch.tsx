// src/hooks/useFetch.ts
import { useCallback, useEffect, useRef, useState } from 'react';

type UseFetchOptions<P> = {
  immediate?: boolean;
  params?: P;
};

export function useFetch<T, P = Record<string, never>>(
  fetcher: (params: P) => Promise<T>,
  options: UseFetchOptions<P> = {}
) {
  const { immediate = true, params: initialParams } = options;
  const paramsRef = useRef<P>((initialParams ?? ({} as P)));
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(!!immediate);
  const reqId = useRef(0);

  const refetch = useCallback(
    async (override?: Partial<P>) => {
      const merged = { ...paramsRef.current, ...(override ?? {}) } as P;
      paramsRef.current = merged;

      const myId = ++reqId.current;
      setLoading(true);
      setError(null);

      try {
        const result = await fetcher(merged);
        if (reqId.current === myId) setData(result);
      } catch (e) {
        if (reqId.current === myId) setError(e);
      } finally {
        if (reqId.current === myId) setLoading(false);
      }
    },
    [fetcher]
  );

  useEffect(() => {
    if (immediate) void refetch();
  }, [immediate, refetch]);

  return { data, error, loading, refetch, setData } as const;
}
