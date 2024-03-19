import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "../app/components/ProgressBar/ProgressBar";

const meta = {
  title: "ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    percentage: { type: "number" },
  },
  decorators: (Story) => (
    <div className="w-52">
      <Story />
    </div>
  ),
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percentage: 50,
  },
};
