import type { Meta, StoryObj } from '@storybook/react';
import { SonnerToaster } from '#feedback/sonner';
import { toast } from 'sonner';
import { Button } from '#inputs/button';

const meta = {
  title: 'Feedback/Sonner',
  component: SonnerToaster,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SonnerToaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <SonnerToaster />
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
    </div>
  ),
};
