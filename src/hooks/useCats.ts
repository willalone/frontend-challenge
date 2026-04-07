import { useState, useCallback, useEffect, useRef } from 'react';
import type { CatImage } from '../types';
import { fetchCats } from '../api/catApi';

export function useCats() {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchingRef = useRef(false);
  const pageRef = useRef(0);

  const loadMore = useCallback(async () => {
    if (fetchingRef.current || !hasMore) return;
    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    const currentPage = pageRef.current;

    try {
      const newCats = await fetchCats(currentPage);

      if (newCats.length === 0) {
        setHasMore(false);
      } else {
        setCats((prev) => {
          const existingIds = new Set(prev.map((c) => c.id));
          const unique = newCats.filter((c) => !existingIds.has(c.id));
          return [...prev, ...unique];
        });
        pageRef.current = currentPage + 1;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось загрузить котиков'
      );
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  }, [hasMore]);

  useEffect(() => {
    void loadMore();
  }, [loadMore]);

  return { cats, loading, error, hasMore, loadMore };
}
