import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CatCard } from './CatCard';
import type { CatImage } from '../../types';

const mockCat: CatImage = {
  id: 'cat-1',
  url: 'https://example.com/cat.jpg',
  width: 400,
  height: 300,
};

describe('CatCard', () => {
  it('renders the cat image', () => {
    render(
      <CatCard cat={mockCat} isFavorite={false} onToggleFavorite={() => {}} />
    );

    const img = screen.getByAltText('Фото кота');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockCat.url);
  });

  it('shows heart button on hover', async () => {
    const user = userEvent.setup();
    render(
      <CatCard cat={mockCat} isFavorite={false} onToggleFavorite={() => {}} />
    );

    expect(screen.queryByTestId('favorite-button')).not.toBeInTheDocument();

    await user.hover(screen.getByTestId('cat-card'));
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
  });

  it('always shows heart button when favorited', () => {
    render(
      <CatCard cat={mockCat} isFavorite={true} onToggleFavorite={() => {}} />
    );

    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
  });

  it('calls onToggleFavorite when heart is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <CatCard cat={mockCat} isFavorite={true} onToggleFavorite={onToggle} />
    );

    await user.click(screen.getByTestId('favorite-button'));
    expect(onToggle).toHaveBeenCalledWith(mockCat);
  });

  it('has correct aria-label for non-favorite', async () => {
    const user = userEvent.setup();
    render(
      <CatCard cat={mockCat} isFavorite={false} onToggleFavorite={() => {}} />
    );

    await user.hover(screen.getByTestId('cat-card'));
    expect(screen.getByTestId('favorite-button')).toHaveAttribute(
      'aria-label',
      'Добавить в избранное'
    );
  });

  it('has correct aria-label for favorite', () => {
    render(
      <CatCard cat={mockCat} isFavorite={true} onToggleFavorite={() => {}} />
    );

    expect(screen.getByTestId('favorite-button')).toHaveAttribute(
      'aria-label',
      'Убрать из избранного'
    );
  });
});
