import { useState } from 'react';
import { Header } from './components/Header';
import type { Tab } from './components/Header';
import { CatGrid } from './components/CatGrid';
import { Loader } from './components/Loader';
import { useCats } from './hooks/useCats';
import { useFavorites } from './hooks/useFavorites';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import styles from './App.module.css';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const { cats, loading, error, hasMore, loadMore } = useCats();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const sentinelRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
  });

  return (
    <div className={styles.app}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className={styles.main} aria-label="Галерея">
        {activeTab === 'all' ? (
          <>
            <CatGrid
              cats={cats}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              loading={loading}
            />
            {loading && cats.length === 0 && <Loader />}
            {loading && cats.length > 0 && (
              <p className={styles.loadingMore}>... загружаем еще котиков ...</p>
            )}
            {error && (
              <div className={styles.error}>
                <p>{error}</p>
                <button
                  type="button"
                  className={styles.retryButton}
                  onClick={() => void loadMore()}
                >
                  Попробовать снова
                </button>
              </div>
            )}
            <div ref={sentinelRef} className={styles.sentinel} />
          </>
        ) : (
          <CatGrid
            cats={favorites}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>
    </div>
  );
}
