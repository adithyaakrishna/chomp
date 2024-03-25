import type { Meta, StoryObj } from "@storybook/react";
import { Deck } from "../app/components/Deck/Deck";
import { ONE_MINUTE_IN_MILISECONDS } from "../app/utils/dateUtils";
import { QuestionType } from "@prisma/client";

const questionBase = {
  type: QuestionType.TrueFalse,
  durationMiliseconds: ONE_MINUTE_IN_MILISECONDS / 4,
  questionOptions: [
    {
      id: 1,
      option: "True",
    },
    { id: 2, option: "False" },
  ],
  questionTags: [
    { id: 1, tag: "Defi" },
    { id: 2, tag: "Not defi" },
  ],
};

const meta = {
  title: "Cards/Deck",
  component: Deck,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    questions: [
      {
        ...questionBase,
        id: 1,
        question:
          "The best way to secure your assets is to use a hardware wallet.",
      },
      {
        ...questionBase,
        id: 2,
        question:
          "The best way to secure your assets is to use a software wallet.",
      },
      {
        ...questionBase,
        id: 3,
        question:
          "The best way to secure your assets is to use a wooden wallet.",
      },
    ],
  },
} satisfies Meta<typeof Deck>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
