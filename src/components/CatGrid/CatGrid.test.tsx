import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CatGrid } from './CatGrid';
import type { CatImage } from '../../types';

const mockCats: CatImage[] = [
  { id: '1', url: 'https://example.com/cat1.jpg', width: 400, height: 300 },
  { id: '2', url: 'https://example.com/cat2.jpg', width: 300, height: 400 },
  { id: '3', url: 'https://example.com/cat3.jpg', width: 500, height: 500 },
];

describe('CatGrid', () => {
  it('renders a grid of cat cards', () => {
    render(
      <CatGrid
        cats={mockCats}
        isFavorite={() => false}
        onToggleFavorite={() => {}}
      />
    );

    const grid = screen.getByTestId('cat-grid');
    expect(grid).toBeInTheDocument();

    const images = screen.getAllByAltText('Фото кота');
    expect(images).toHaveLength(3);
  });

  it('shows empty state when no cats', () => {
    render(
      <CatGrid
        cats={[]}
        isFavorite={() => false}
        onToggleFavorite={() => {}}
      />
    );

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText('Здесь пока нет котиков')).toBeInTheDocument();
  });

  it('passes isFavorite correctly to each card', () => {
    const isFavorite = vi.fn((id: string) => id === '2');
    render(
      <CatGrid
        cats={mockCats}
        isFavorite={isFavorite}
        onToggleFavorite={() => {}}
      />
    );

    expect(isFavorite).toHaveBeenCalledWith('1');
    expect(isFavorite).toHaveBeenCalledWith('2');
    expect(isFavorite).toHaveBeenCalledWith('3');
  });
});
