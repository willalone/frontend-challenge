import { useState, useCallback, useEffect } from 'react';
import type { CatImage } from '../types';

const STORAGE_KEY = 'cat_favorites';

function loadFavorites(): CatImage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites: CatImage[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<CatImage[]>(loadFavorites);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const isFavorite = useCallback(
    (id: string) => favorites.some((cat) => cat.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (cat: CatImage) => {
      setFavorites((prev) => {
        const exists = prev.some((c) => c.id === cat.id);
        return exists ? prev.filter((c) => c.id !== cat.id) : [...prev, cat];
      });
    },
    []
  );

  return { favorites, isFavorite, toggleFavorite };
}
