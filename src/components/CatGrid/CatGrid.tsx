import type { CatImage } from '../../types';
import { CatCard } from '../CatCard';
import styles from './CatGrid.module.css';

export interface CatGridProps {
  cats: CatImage[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (cat: CatImage) => void;
  loading?: boolean;
}

export function CatGrid({
  cats,
  isFavorite,
  onToggleFavorite,
  loading = false,
}: CatGridProps) {
  if (cats.length === 0 && loading) {
    return null;
  }

  if (cats.length === 0) {
    return (
      <div className={styles.empty} data-testid="empty-state">
        <p className={styles.emptyText}>Здесь пока нет котиков</p>
      </div>
    );
  }

  return (
    <div className={styles.grid} data-testid="cat-grid">
      {cats.map((cat) => (
        <CatCard
          key={cat.id}
          cat={cat}
          isFavorite={isFavorite(cat.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
