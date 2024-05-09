"use client";
import { Navbar } from "@/app/components/Navbar/Navbar";
import AvatarPlaceholder from "@/public/images/avatar_placeholder.png";
import dynamic from "next/dynamic";
import { useState } from "react";
import { HomeFeed, HomeFeedProps } from "../components/HomeFeed/HomeFeed";
const SearchFilters = dynamic(
  () => import("../components/SearchFilters/SearchFilters"),
  { ssr: false },
);

import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";

type PageProps = {
  searchParams: { query: string };
};

let lastQuery: string | undefined = "";

export default function Page({ searchParams }: PageProps) {
  const [response, setResponse] = useState<any>();
  const [scrollToId, setScrollToId] = useState(0);
  const getData = async (query: string | undefined, scrollId?: number) => {
    lastQuery = query;
    const searchParams = new URLSearchParams();
    if (query) {
      searchParams.set("query", query);
    }
    const params = searchParams.toString() ? `?${searchParams}` : "";
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/home-feed${params}`,
    );
    const json = await data.json();
    setResponse(json.homeFeed);

    if (scrollId) {
      setScrollToId(scrollId);
    }
  };
  useIsomorphicLayoutEffect(() => {
    getData(searchParams.query);
  }, []);

  const onRefreshCards = (revealedId: number) => {
    getData(lastQuery, revealedId);
  };

  return (
    <>
      <Navbar
        avatarSrc={AvatarPlaceholder.src}
        avatarLink="/application/profile"
        walletLink="/application/transactions"
      />
      <SearchFilters
        initialQuery={searchParams.query}
        onQueryChange={(query) => {
          getData(query);
        }}
      />
      {response && (
        <HomeFeed
          {...(response as HomeFeedProps)}
          onRefreshCards={onRefreshCards}
          elementToScrollToId={scrollToId}
        />
      )}
    </>
  );
}
