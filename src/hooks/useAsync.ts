import { useCallback, useEffect, useState } from "react";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook mínimo para llamadas a Supabase: corre `fetcher` al montar (y cuando
 * cambian las `deps`), guarda el resultado y expone loading/error/refetch.
 * No incluye cache ni revalidación — si el proyecto crece, considerar
 * TanStack Query en su lugar.
 */
export function useAsync<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): AsyncState<T> {
  const [state, setState] = useState<Omit<AsyncState<T>, "refetch">>({
    data: null,
    loading: true,
    error: null,
  });
  const [tick, setTick] = useState(0);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setState({ data: null, loading: false, error: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  return { ...state, refetch };
}
