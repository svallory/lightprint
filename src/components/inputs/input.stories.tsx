import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '#inputs/input';

const meta = {
  title: 'Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
  },
};

export const File: Story = {
    args: {
      type: 'file',
      id: 'picture',
    },
    render: (args) => (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input {...args} />
        </div>
    )
};

export const Disabled: Story = {
    args: {
      disabled: true,
      type: 'email',
      placeholder: 'Email',
    },
};
