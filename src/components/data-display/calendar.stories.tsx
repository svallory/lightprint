import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '#data-display/calendar';
import React from 'react';

const meta = {
  title: 'Data Display/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
      />
    );
  },
};
