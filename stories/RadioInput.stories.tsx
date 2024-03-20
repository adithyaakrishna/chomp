import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { RadioInput } from "../app/components/RadioInput/RadioInput";

const meta = {
  title: "Inputs/Radio",
  component: RadioInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onOptionSelected: fn(),
    options: [
      { value: "1", label: "Answer" },
      { value: "2", label: "Answer" },
      { value: "3", label: "Answer" },
      { value: "4", label: "Answer" },
    ],
    name: "Radio",
  },
  decorators: (Story) => (
    <div className="bg-[#333] p-6">
      <Story />
    </div>
  ),
} satisfies Meta<typeof RadioInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const FirstOption: Story = {
  args: {
    value: "1",
  },
};
