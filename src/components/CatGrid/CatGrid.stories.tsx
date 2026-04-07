import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { CatGrid } from './CatGrid';
import type { CatImage } from '../../types';

const sampleCats: CatImage[] = [
  { id: '1', url: 'https://cdn2.thecatapi.com/images/MTk4ODA2Mg.jpg', width: 500, height: 334 },
  { id: '2', url: 'https://cdn2.thecatapi.com/images/e3b.jpg', width: 640, height: 480 },
  { id: '3', url: 'https://cdn2.thecatapi.com/images/4jp.gif', width: 500, height: 281 },
  { id: '4', url: 'https://cdn2.thecatapi.com/images/9j5.jpg', width: 640, height: 480 },
  { id: '5', url: 'https://cdn2.thecatapi.com/images/b5f.jpg', width: 960, height: 720 },
  { id: '6', url: 'https://cdn2.thecatapi.com/images/MTk4ODA2Mg.jpg', width: 500, height: 334 },
];

const meta = {
  title: 'Components/CatGrid',
  component: CatGrid,
  parameters: { layout: 'fullscreen' },
  args: { onToggleFavorite: fn() },
} satisfies Meta<typeof CatGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCats: Story = {
  args: {
    cats: sampleCats,
    isFavorite: (id: string) => id === '2' || id === '5',
  },
};

export const Empty: Story = {
  args: {
    cats: [],
    isFavorite: () => false,
  },
};
