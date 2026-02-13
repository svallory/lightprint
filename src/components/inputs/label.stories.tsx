import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '#inputs/label';
import { Checkbox } from '#inputs/checkbox';

const meta = {
  title: 'Inputs/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};
