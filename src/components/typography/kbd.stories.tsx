import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from '#typography/kbd';

const meta = {
  title: 'Typography/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-2">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
    </div>
  ),
};
