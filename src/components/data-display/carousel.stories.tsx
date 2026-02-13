import type { Meta, StoryObj } from '@storybook/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';
import { Card, CardContent } from '#layout/card';

const meta = {
  title: 'Data Display/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex justify-center p-12">
        <Carousel className="w-full max-w-xs">
        <CarouselContent>
            {[1, 2, 3, 4, 5].map((item) => (
            <CarouselItem key={item}>
                <div className="p-1">
                <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{item}</span>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
    </div>
  ),
};
