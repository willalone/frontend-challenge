import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Header } from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  args: { onTabChange: fn() },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllCatsActive: Story = { args: { activeTab: 'all' } };
export const FavoritesActive: Story = { args: { activeTab: 'favorites' } };
