"use client";

import { SubmitButton } from "../SubmitButton/SubmitButton";
import { QuestionType, Tag as TagType, Token } from "@prisma/client";
import { TextInput } from "../TextInput/TextInput";
import { z } from "zod";
import { questionSchema } from "@/app/schemas/question";
import { Tag } from "../Tag/Tag";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type QuestionFormProps = {
  question?: z.infer<typeof questionSchema>;
  tags: TagType[];
  action: (data: z.infer<typeof questionSchema>) => void;
};

export const getDefaultOptions = (type: QuestionType) => {
  switch (type) {
    case QuestionType.YesNo:
      return [
        { option: "Yes", isTrue: false },
        { option: "No", isTrue: false },
      ];
    case QuestionType.TrueFalse:
      return [
        { option: "True", isTrue: false },
        { option: "False", isTrue: false },
      ];
    default:
      return [
        { option: "", isTrue: false },
        { option: "", isTrue: false },
        { option: "", isTrue: false },
        { option: "", isTrue: false },
      ];
  }
};

export default function QuestionForm({
  question,
  tags,
  action,
}: QuestionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: question || {
      type: QuestionType.MultiChoice,
      questionOptions: getDefaultOptions(QuestionType.MultiChoice),
    },
  });

  const [selectedTagIds, setSelectedTagIds] = useState(question?.tagIds ?? []);

  const questionType = watch("type");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        action({ ...data, tagIds: selectedTagIds, id: question?.id });
      })}
    >
      <h1 className="text-3xl mb-3">
        {question ? `Edit question #${question.id}` : "Create question"}
      </h1>

      <div className="mb-3">
        <label className="block mb-1">Question statement</label>
        <TextInput variant="secondary" {...register("question")} />
        <div>{errors.question?.message}</div>
      </div>

      <div className="mb-3">
        <label className="block mb-1">Type</label>
        <select
          className="text-black"
          {...register("type", {
            onChange: (e) => {
              setValue("questionOptions", getDefaultOptions(e.target.value));
            },
          })}
        >
          {Object.values(QuestionType).map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
        <div>{errors.type?.message}</div>
      </div>

      <div className="mb-3 flex flex-col gap-2">
        <label className="block">Options</label>
        {Array(questionType === QuestionType.MultiChoice ? 4 : 2)
          .fill(null)
          .map((_, index) => (
            <div key={`${questionType}-${index}`}>
              <div className="flex gap-4">
                <div className="w-1/4">
                  <TextInput
                    variant="secondary"
                    {...register(`questionOptions.${index}.option`)}
                    disabled={
                      questionType === QuestionType.YesNo ||
                      questionType === QuestionType.TrueFalse
                    }
                  />
                </div>
                <div className="w-24 flex justify-center items-center gap-2">
                  <div>is true?</div>
                  <input
                    type="checkbox"
                    {...register(`questionOptions.${index}.isTrue`)}
                  />
                </div>
              </div>
              <div>
                {errors.questionOptions &&
                  errors.questionOptions[index]?.option?.message}
              </div>
            </div>
          ))}
      </div>

      <div className="mb-3">
        <label className="block mb-1">Reveal token</label>
        <select className="text-black" {...register("revealToken")}>
          {Object.values(Token).map((token) => (
            <option value={token} key={token}>
              {token}
            </option>
          ))}
        </select>
        <div>{errors.revealToken?.message}</div>
      </div>

      <div className="mb-3">
        <label className="block mb-1">Reveal token amount</label>
        <TextInput
          variant="secondary"
          {...register("revealTokenAmount", {
            setValueAs: (v) => (!v ? null : parseInt(v)),
          })}
        />
        <div>{errors.revealTokenAmount?.message}</div>
      </div>

      <div className="mb-3">
        <label className="block mb-1">Reveal at date (optional)</label>
        <TextInput
          variant="secondary"
          type="datetime-local"
          {...register("revealAtDate", {
            setValueAs: (v) => (!v ? null : new Date(v)),
          })}
        />
        <div>{errors.revealAtDate?.message}</div>
      </div>

      <div className="mb-3">
        <label className="block mb-1">Reveal at answer count (optional)</label>
        <TextInput
          variant="secondary"
          {...register("revealAtAnswerCount", {
            setValueAs: (v) => (!v ? null : parseInt(v)),
          })}
        />
        <div>{errors.revealAtAnswerCount?.message}</div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Tags (optional)</label>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Tag
              tag={tag.tag}
              onSelected={() =>
                setSelectedTagIds((prev) =>
                  !prev.includes(tag.id)
                    ? [...prev, tag.id]
                    : prev.filter((tagId) => tagId !== tag.id)
                )
              }
              isSelected={selectedTagIds.includes(tag.id)}
              key={tag.id}
            />
          ))}
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}