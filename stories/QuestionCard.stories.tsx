import type { Meta, StoryObj } from "@storybook/react";
import { QuestionCard } from "../app/components/QuestionCard/QuestionCard";
import { RadioInput } from "../app/components/RadioInput/RadioInput";
import dayjs from "dayjs";

const meta = {
  title: "QuestionCard",
  component: QuestionCard,
  parameters: {
    layout: "centered",
  },
  args: {
    question: "The best way to secure your assets is to use a hardware wallet.",
    numberOfSteps: 2,
    step: 1,
    viewImageSrc: undefined,
    dueAt: dayjs().add(2, "minutes").toDate(),
  },
  tags: ["autodocs"],
  decorators: (Story) => (
    <div className="w-[326px]">
      <Story />
    </div>
  ),
} satisfies Meta<typeof QuestionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const ViewImage: Story = {
  args: {
    viewImageSrc: "/",
  },
};

export const Questions: Story = {
  args: {
    viewImageSrc: "/",
    children: (
      <RadioInput
        name="Radio"
        onOptionSelected={() => {}}
        value="1"
        options={[
          {
            label: "Answer",
            value: "1",
          },
          {
            label: "Answer",
            value: "2",
          },
          {
            label: "Answer",
            value: "3",
          },
          {
            label: "Answer",
            value: "4",
          },
        ]}
      />
    ),
  },
};
