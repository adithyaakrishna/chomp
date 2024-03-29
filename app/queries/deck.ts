"use server";

import { Prisma } from ".prisma/client";
import prisma from "../services/prisma";
import dayjs from "dayjs";
import { getJwtPayload } from "../actions/jwt";
import { redirect } from "next/navigation";
import { Deck, DeckQuestion, Question, QuestionOption } from "@prisma/client";

const questionDeckToRunInclude = {
  deckQuestions: {
    include: {
      question: {
        include: {
          questionOptions: true,
        },
      },
    },
  },
} satisfies Prisma.DeckInclude;

export async function getDailyDeck() {
  const currentDayStart = dayjs(new Date()).startOf("day").toDate();
  const currentDayEnd = dayjs(new Date()).endOf("day").toDate();
  const payload = await getJwtPayload();
  if (!payload) {
    return redirect("/login");
  }

  const dailyDeck = await prisma.deck.findFirst({
    where: {
      date: { not: null, gte: currentDayStart, lte: currentDayEnd },
      userDeck: { none: { userId: payload?.sub ?? "" } },
    },
    include: questionDeckToRunInclude,
  });

  if (!dailyDeck) {
    return null;
  }

  const questions = mapQuestionFromDeck(dailyDeck);

  return {
    questions,
    id: dailyDeck.id,
    date: dailyDeck.date,
  };
}

export async function getDeckQuestionsById(deckId: number) {
  const deck = await prisma.deck.findFirst({
    where: { id: { equals: deckId } },
    include: questionDeckToRunInclude,
  });

  if (!deck) {
    return null;
  }

  const questions = mapQuestionFromDeck(deck);

  return questions;
}

const mapQuestionFromDeck = (
  deck: Deck & {
    deckQuestions: Array<
      DeckQuestion & {
        question: Question & { questionOptions: QuestionOption[] };
      }
    >;
  }
) => {
  const questions = deck?.deckQuestions.map((dq) => ({
    id: dq.questionId,
    durationMiliseconds: Number(dq.question.durationMiliseconds),
    question: dq.question.question,
    type: dq.question.type,
    questionOptions: dq.question.questionOptions.map((qo) => ({
      id: qo.id,
      option: qo.option,
    })),
  }));

  return questions;
};

export async function getDecks() {
  const decks = await prisma.deck.findMany({
    include: {
      deckQuestions: {
        take: 1,
        include: {
          question: {
            include: {
              questionTags: {
                include: {
                  tag: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return decks;
}

export async function getDeckSchema(id: number) {
  const deck = await prisma.deck.findUnique({
    where: {
      id,
    },
    include: {
      deckQuestions: {
        include: {
          question: {
            include: {
              questionOptions: true,
              questionTags: {
                include: {
                  tag: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!deck) {
    return null;
  }

  return {
    ...deck,
    revealToken: deck.deckQuestions[0].question.revealToken,
    revealTokenAmount: deck.deckQuestions[0].question.revealTokenAmount,
    tagIds: deck.deckQuestions[0].question.questionTags.map((qt) => qt.tag.id),
    deckQuestions: undefined,
    questions: deck.deckQuestions.map((dq) => ({
      ...dq.question,
      revealToken: undefined,
      revealTokenAmount: undefined,
      revealAtDate: undefined,
      revealAtAnswerCount: undefined,
      questionTags: undefined,
    })),
  };
}
