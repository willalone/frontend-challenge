import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  maxLoadsWithoutScroll?: number;
  threshold?: number;
}

export function useInfiniteScroll({
  loading,
  hasMore,
  onLoadMore,
  maxLoadsWithoutScroll = 2,
  threshold = 80,
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadsWithoutScrollRef = useRef(0);

  useEffect(() => {
    const resetStreak = () => {
      loadsWithoutScrollRef.current = 0;
    };
    window.addEventListener('scroll', resetStreak, { passive: true });
    window.addEventListener('wheel', resetStreak, { passive: true });
    window.addEventListener('touchmove', resetStreak, { passive: true });
    return () => {
      window.removeEventListener('scroll', resetStreak);
      window.removeEventListener('wheel', resetStreak);
      window.removeEventListener('touchmove', resetStreak);
    };
  }, []);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (!entry?.isIntersecting || loading || !hasMore) return;

      if (loadsWithoutScrollRef.current >= maxLoadsWithoutScroll) return;

      loadsWithoutScrollRef.current += 1;
      onLoadMore();
    },
    [loading, hasMore, onLoadMore, maxLoadsWithoutScroll]
  );

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: `${threshold}px`,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [handleObserver, threshold]);

  return sentinelRef;
}
