import { AnswerResult } from "../AnswerResult/AnswerResult";

type MultipleChoiceAnsweredContentProps = {
  questionOptions: {
    id: number;
    isTrue: boolean;
    option: string;
    questionAnswers: {
      percentage: number | null;
      selected: boolean;
      percentageResult?: number | null;
    }[];
  }[];
  avatarSrc?: string;
};

export function MultipleChoiceAnsweredContent({
  questionOptions,
  avatarSrc,
}: MultipleChoiceAnsweredContentProps) {
  return (
    <div className="w-full">
      {questionOptions.map((qo) => (
        <div key={qo.id} className="mb-2">
          <AnswerResult
            percentage={qo.questionAnswers[0].percentageResult ?? 0}
            valueSelected={qo.questionAnswers[0].percentage}
            avatarSrc={avatarSrc}
            answerText={qo.option}
            progressBarClassName={
              qo.questionAnswers[0].selected ? "!bg-aqua" : undefined
            }
          />
        </div>
      ))}
    </div>
  );
}
