import { Prisma } from ".prisma/client";
import prisma from "../services/prisma";
import dayjs from "dayjs";
import { getJwtPayload } from "../actions/jwt";
import { redirect } from "next/navigation";

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
    return redirect("/");
  }

  const dailyDeck = await prisma.deck.findFirst({
    where: {
      date: { not: null, gte: currentDayStart, lte: currentDayEnd },
      userDeck: { none: { userId: payload?.sub ?? "" } },
    },
    include: questionDeckToRunInclude,
  });

  return dailyDeck;
}

export async function getDeckDetailsById(deckId: number) {
  const deck = await prisma.deck.findFirst({
    where: { id: { equals: deckId } },
    include: questionDeckToRunInclude,
  });

  return deck;
}

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
