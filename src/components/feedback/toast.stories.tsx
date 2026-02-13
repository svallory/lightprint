import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastAction } from '#feedback/toast';
import { useToast } from './use-toast';
import { Button } from '#inputs/button';
import { Toaster } from '#feedback/toaster';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className='flex gap-2'>
        <Button
        variant="outline"
        onClick={() => {
            toast({
            title: 'Scheduled: Catch up ',
            description: 'Friday, February 10, 2023 at 5:57 PM',
            action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
            });
        }}
        >
        Add to calendar
        </Button>
        <Toaster />
    </div>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};
