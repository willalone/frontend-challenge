import { useState } from 'react';
import type { CatImage } from '../../types';
import { useCoarseOrNoHover } from '../../hooks/useCoarseOrNoHover';
import styles from './CatCard.module.css';

const HEART = '#ff3a1a';

export interface CatCardProps {
  cat: CatImage;
  isFavorite: boolean;
  onToggleFavorite: (cat: CatImage) => void;
}

export function CatCard({ cat, isFavorite, onToggleFavorite }: CatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const touchOrNoHover = useCoarseOrNoHover();

  const showHeart = isFavorite || isHovered || touchOrNoHover;
  const heartFilled = isFavorite || isHeartHovered;

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsHeartHovered(false);
      }}
      data-testid="cat-card"
    >
      <img
        src={cat.url}
        alt="Фото кота"
        className={styles.image}
        loading="lazy"
        decoding="async"
      />
      {showHeart && (
        <button
          type="button"
          className={`${styles.heartButton} ${isFavorite ? styles.favorited : ''} ${isHeartHovered ? styles.heartHovered : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(cat);
          }}
          onMouseEnter={() => setIsHeartHovered(true)}
          onMouseLeave={() => setIsHeartHovered(false)}
          aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          aria-pressed={isFavorite}
          data-testid="favorite-button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={heartFilled ? HEART : 'none'}
            stroke={HEART}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      )}
    </div>
  );
}
