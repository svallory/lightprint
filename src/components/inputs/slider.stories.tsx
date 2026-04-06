import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '#inputs/slider';

const meta = {
  title: 'Inputs/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: (args) => (
    <div className="w-[720px] max-w-full px-6">
      <Slider
        {...args}
        className="w-full [&_[data-slot=slider-track]]:h-2"
      />
    </div>
  ),
};
