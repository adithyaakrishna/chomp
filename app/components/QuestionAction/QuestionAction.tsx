"use client";
import { QuestionType } from "@prisma/client";
import { Button } from "../Button/Button";
import { DeckStep } from "../Deck/Deck";
import { TrueFalseScale } from "../TrueFalseScale/TrueFalseScale";
import { useState } from "react";

type QuestionOption = {
  id: number;
  option: string;
};

type QuestionActionProps = {
  type: QuestionType;
  questionOptions?: QuestionOption[];
  onButtonClick: (answer?: number) => void;
  randomQuestionMarker?: string;
  step: DeckStep;
};

export function QuestionAction({
  type,
  questionOptions,
  onButtonClick,
  step,
  randomQuestionMarker,
}: QuestionActionProps) {
  const [scale, setScale] = useState(50);

  if (type === "TrueFalse" && step === DeckStep.AnswerQuestion) {
    return (
      <div className="text-center text-white font-semibold">
        <div className="text-md mb-4">
          What do you think about this statement?
        </div>
        <div className="flex gap-2">
          {questionOptions?.map((qo) => (
            <Button
              onClick={() => onButtonClick(qo.id)}
              variant="pink"
              key={qo.id}
              size="big"
            >
              {qo.option}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (type === "TrueFalse" && step === DeckStep.PickPercentage) {
    return (
      <div className="text-white font-semibold">
        <div className="text-center  text-md mb-4">
          How do you think others will respond?
        </div>
        <div className="flex gap-2 items-center">
          <div className="!w-[85%]">
            <TrueFalseScale
              ratioTrue={scale}
              progressBarClassName="h-[36px] rounded-md"
              handleRatioChange={setScale}
            />
          </div>
          <Button
            onClick={() => onButtonClick(scale)}
            variant="pink"
            size="big"
            className="!w-[15%]"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }

  if (type === "MultiChoice" && step === DeckStep.AnswerQuestion) {
    return (
      <div className="text-center text-white font-semibold">
        <div className="text-md mb-4">Choose your answer</div>
        <div>
          <Button onClick={() => onButtonClick()} variant="pink" size="big">
            Submit
          </Button>
        </div>
      </div>
    );
  }

  if (type === "MultiChoice" && step === DeckStep.PickPercentage) {
    return (
      <div className="text-center text-white font-semibold">
        <div className="text-md mb-4">
          How many people do you think picked {randomQuestionMarker}?
        </div>
        <div>
          <Button onClick={() => onButtonClick()} variant="pink" size="big">
            Submit
          </Button>
        </div>
      </div>
    );
  }
  return <div></div>;
}
