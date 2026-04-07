import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { CatCard } from './CatCard';

const meta = {
  title: 'Components/CatCard',
  component: CatCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100vw - 32px, 260px)' }}>
        <Story />
      </div>
    ),
  ],
  args: { onToggleFavorite: fn() },
} satisfies Meta<typeof CatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cat: {
      id: 'demo-1',
      url: 'https://cdn2.thecatapi.com/images/MTk4ODA2Mg.jpg',
      width: 500,
      height: 334,
    },
    isFavorite: false,
  },
};

export const Favorited: Story = {
  args: {
    cat: {
      id: 'demo-2',
      url: 'https://cdn2.thecatapi.com/images/e3b.jpg',
      width: 640,
      height: 480,
    },
    isFavorite: true,
  },
};
