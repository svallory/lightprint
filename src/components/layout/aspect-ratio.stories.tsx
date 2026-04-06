import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from '#layout/aspect-ratio';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './resizable';

const meta = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      themePreviews: false,
    },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

function RatioSample({
  label,
  ratio,
}: {
  label: string;
  ratio: number;
}) {
  return (
    <AspectRatio
      ratio={ratio}
      className="bg-muted text-muted-foreground border-border flex items-center justify-center rounded-md border"
    >
      <span className="text-sm font-medium">{label}</span>
    </AspectRatio>
  );
}

export const RatiosInResizablePanels: Story = {
  render: () => (
    <div className="w-full max-w-5xl space-y-3">
      <p className="text-muted-foreground text-sm">
        Drag the handles to resize each panel. The boxes keep their aspect
        ratios.
      </p>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[240px] rounded-lg border"
      >
        <ResizablePanel defaultSize={33}>
          <div className="flex h-full items-center justify-center p-4">
            <RatioSample label="1:1" ratio={1} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={34}>
          <div className="flex h-full items-center justify-center p-4">
            <RatioSample label="4:3" ratio={4 / 3} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={33}>
          <div className="flex h-full items-center justify-center p-4">
            <RatioSample label="16:9" ratio={16 / 9} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
