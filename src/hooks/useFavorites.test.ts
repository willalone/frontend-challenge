import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useFavorites } from './useFavorites';
import type { CatImage } from '../types';

const cat1: CatImage = { id: '1', url: 'https://example.com/1.jpg', width: 400, height: 300 };
const cat2: CatImage = { id: '2', url: 'https://example.com/2.jpg', width: 300, height: 400 };

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('adds a cat to favorites', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(cat1);
    });

    expect(result.current.favorites).toEqual([cat1]);
    expect(result.current.isFavorite('1')).toBe(true);
  });

  it('removes a cat from favorites', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(cat1);
    });
    act(() => {
      result.current.toggleFavorite(cat1);
    });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.isFavorite('1')).toBe(false);
  });

  it('handles multiple favorites', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(cat1);
    });
    act(() => {
      result.current.toggleFavorite(cat2);
    });

    expect(result.current.favorites).toHaveLength(2);
    expect(result.current.isFavorite('1')).toBe(true);
    expect(result.current.isFavorite('2')).toBe(true);
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(cat1);
    });

    const stored = JSON.parse(localStorage.getItem('cat_favorites') || '[]');
    expect(stored).toEqual([cat1]);
  });

  it('restores from localStorage', () => {
    localStorage.setItem('cat_favorites', JSON.stringify([cat1]));

    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([cat1]);
    expect(result.current.isFavorite('1')).toBe(true);
  });
});
