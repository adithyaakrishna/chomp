import { HomeFeedCardCarousel } from "@chomp/app/components/HomeFeedCardsCarousel/HomeFeedCardsCarousel";
import { HomeFeedQuestionCard } from "@chomp/app/components/HomeFeedQuestionCard/HomeFeedQuestionCard";
import { CloseIcon } from "@chomp/app/components/Icons/CloseIcon";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import dayjs from "dayjs";

const meta = {
  title: "Cards/Home Feed Card Carousel",
  component: HomeFeedCardCarousel,
  parameters: {
    layout: "centered",
  },
  args: {},
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HomeFeedCardCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

function createSlide(
  question: string,
  actionFn?: () => void,
  actionIcon?: JSX.Element,
): JSX.Element {
  return (
    <HomeFeedQuestionCard
      revealAtDate={dayjs().add(1, "day").toDate()}
      question={question}
      onTopCornerAction={actionFn}
      topCornerActionIcon={actionIcon}
      statusLabel={
        <button
          onClick={() => {}}
          className="text-xs leading-6 text-white font-bold cursor-pointer"
        >
          View
        </button>
      }
    />
  );
}

const slides: JSX.Element[] = [
  createSlide(
    "The best way to secure your assets is to use a hardware wallet",
    fn,
    <CloseIcon />,
  ),
  createSlide(
    "The best way to secure your assets is to use a hardware wallet",
    fn,
  ),
  createSlide(
    "The best way to secure your assets is to use a hardware wallet",
    fn,
    <CloseIcon />,
  ),
];

export const Default: Story = {
  args: {
    title: (
      <h2 className="text-black text-base">
        Check out others&apos; revealed questions
      </h2>
    ),
    slides: [
      // eslint-disable-next-line react/jsx-key
      <div>
        {slides.map((slide, index) => (
          <div key={index}>{slide}</div>
        ))}
      </div>,
    ],
  },
};
