import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '#inputs/toggle';
import { Bold } from 'lucide-react';

const meta = {
  title: 'Inputs/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};
