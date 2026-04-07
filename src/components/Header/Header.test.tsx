import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders both tabs', () => {
    render(<Header activeTab="all" onTabChange={() => {}} />);

    expect(screen.getByText('Все котики')).toBeInTheDocument();
    expect(screen.getByText('Любимые котики')).toBeInTheDocument();
  });

  it('marks "Все котики" as active when activeTab is "all"', () => {
    render(<Header activeTab="all" onTabChange={() => {}} />);

    expect(screen.getByText('Все котики')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Любимые котики')).not.toHaveAttribute('aria-current');
  });

  it('marks "Любимые котики" as active when activeTab is "favorites"', () => {
    render(<Header activeTab="favorites" onTabChange={() => {}} />);

    expect(screen.getByText('Любимые котики')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Все котики')).not.toHaveAttribute('aria-current');
  });

  it('calls onTabChange when clicking a tab', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    render(<Header activeTab="all" onTabChange={onTabChange} />);

    await user.click(screen.getByText('Любимые котики'));
    expect(onTabChange).toHaveBeenCalledWith('favorites');

    await user.click(screen.getByText('Все котики'));
    expect(onTabChange).toHaveBeenCalledWith('all');
  });
});
