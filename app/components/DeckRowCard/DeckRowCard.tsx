import { Deck, Reveal } from "@prisma/client";
import Link from "next/link";
import { QuestionDeck } from "../QuestionDeck/QuestionDeck";
import { getDeckState } from "@/app/utils/question";
import { DeckQuestionIncludes } from "../DeckDetails/DeckDetails";

type DeckRowCardProps = {
  deck: Deck & {
    deckQuestions: {
      question: DeckQuestionIncludes;
    }[];
    reveals: Reveal[];
  };
};

export function DeckRowCard({ deck }: DeckRowCardProps) {
  const { isAnswered } = getDeckState(deck);

  if (isAnswered) {
    return (
      <Link href={`/application/deck/${deck.id}`}>
        <QuestionDeck
          text={deck.deck}
          revealedAt={deck.revealAtDate}
          status="chomped"
        />
      </Link>
    );
  }

  return (
    <Link href={`/application/answer/deck/${deck.id}`}>
      <QuestionDeck
        text={deck.deck}
        revealedAt={deck.revealAtDate}
        status="new"
      />
    </Link>
  );
}
