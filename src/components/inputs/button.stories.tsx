import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '#inputs/button';

const meta = {
  title: 'Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
        control: 'select',
        options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
    },
    size: {
        control: 'select',
        options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
        control: 'boolean',
    }
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

export const Secondary: Story = {
    args: {
        children: 'Secondary',
        variant: 'secondary',
    },
};

export const Destructive: Story = {
    args: {
        children: 'Destructive',
        variant: 'destructive',
    },
};

export const Outline: Story = {
    args: {
        children: 'Outline',
        variant: 'outline',
    },
};

export const Ghost: Story = {
    args: {
        children: 'Ghost',
        variant: 'ghost',
    },
};

export const Link: Story = {
    args: {
        children: 'Link',
        variant: 'link',
    },
};

export const Loading: Story = {
    args: {
        disabled: true,
        children: 'Please wait',
    },
};
