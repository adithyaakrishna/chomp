"use client";
import { useWindowSize } from "@chomp/app/hooks/useWindowSize";
import { ElementType } from "@chomp/app/queries/question";
import { DeckQuestionIncludes } from "@chomp/app/utils/question";
import { Deck } from "@prisma/client";
import { useEffect, useRef } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { FeedRowCard } from "../FeedRowCard.tsx/FeedRowCard";

export type HistoryFeedProps = {
  list: Array<(DeckQuestionIncludes | Deck) & { elementType: ElementType }>;
  onRefreshCards: (revealedId: number) => void;
  elementToScrollToId: number;
};

const SIZE_OF_OTHER_ELEMENTS_ON_HOME_SCREEN = 458;

function HistoryFeed({
  list,
  onRefreshCards,
  elementToScrollToId,
}: HistoryFeedProps) {
  const { height } = useWindowSize();
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  useEffect(() => {
    const elementToScroll = list.find((e) => e.id === elementToScrollToId);

    if (elementToScroll) {
      virtuosoRef.current?.scrollToIndex({
        index: list.indexOf(elementToScroll),
      });
    }
  }, [elementToScrollToId]);

  return (
    <Virtuoso
      style={{ height: height - SIZE_OF_OTHER_ELEMENTS_ON_HOME_SCREEN }}
      data={list}
      className="mx-4 mt-4"
      itemContent={(_, element) => (
        <div className="pb-4">
          <FeedRowCard
            element={element}
            type={element.elementType}
            deckReturnUrl={window.location.toString()}
            onRefreshCards={onRefreshCards}
          />
        </div>
      )}
    />
  );
}

export default HistoryFeed;
