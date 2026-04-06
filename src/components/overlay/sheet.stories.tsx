import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';
import { Button } from '#inputs/button';
import { Label } from '#inputs/label';
import { Input } from '#inputs/input';
import { Switch } from '#inputs/switch';
import { Textarea } from '#inputs/textarea';

const meta = {
  title: 'Overlay/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

type SheetSide = 'top' | 'right' | 'bottom' | 'left';

function CampaignPlannerSheet({
  side = 'right',
  triggerLabel = 'Open planner',
}: {
  side?: SheetSide;
  triggerLabel?: string;
}) {
  const idBase = side;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </SheetTrigger>
      <SheetContent side={side} className="w-full sm:max-w-lg">
        <SheetHeader className="gap-2 border-b">
          <SheetTitle>Schedule release campaign</SheetTitle>
          <SheetDescription>
            Draft your announcement, pick a send window, and queue it for
            approval.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 p-4">
          <div className="space-y-2">
            <Label htmlFor={`campaign-name-${idBase}`}>Campaign name</Label>
            <Input
              id={`campaign-name-${idBase}`}
              defaultValue="Spring release announcement"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`send-date-${idBase}`}>Send date</Label>
              <Input
                id={`send-date-${idBase}`}
                type="date"
                defaultValue="2026-03-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`send-time-${idBase}`}>Local time</Label>
              <Input
                id={`send-time-${idBase}`}
                type="time"
                defaultValue="09:30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`message-preview-${idBase}`}>Message preview</Label>
            <Textarea
              id={`message-preview-${idBase}`}
              className="min-h-28"
              defaultValue="Hi team, we just shipped the onboarding update. Here is what changed and why it matters."
            />
          </div>

          <div className="flex items-start justify-between gap-4 rounded-md border p-3">
            <div className="space-y-1">
              <Label
                htmlFor={`requires-approval-${idBase}`}
                className="text-sm font-medium"
              >
                Require manager approval
              </Label>
              <p className="text-muted-foreground text-xs">
                Keep this campaign queued until one reviewer signs off.
              </p>
            </div>
            <Switch
              id={`requires-approval-${idBase}`}
              defaultChecked
              aria-label="Require manager approval"
            />
          </div>
        </div>

        <SheetFooter className="border-t sm:flex-row sm:justify-end">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Schedule campaign</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export const Default: Story = {
  render: () => <CampaignPlannerSheet />,
};

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;

export const Sides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {SHEET_SIDES.map((side) => (
        <CampaignPlannerSheet
          key={side}
          side={side}
          triggerLabel={side[0].toUpperCase() + side.slice(1)}
        />
      ))}
    </div>
  ),
};
