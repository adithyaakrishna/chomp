"use client";
import { HistorySortOptions } from "@/app/api/history/route";
import { Button } from "@/app/components/Button/Button";
import { HomeSwitchNavigation } from "@/app/components/HomeSwitchNavigation/HomeSwitchNavigation";
import { CountdownIcon } from "@/app/components/Icons/CountdownIcon";
import { SearchFilters } from "@/app/components/SearchFilters/SearchFilters";
import { useIsomorphicLayoutEffect } from "@/app/hooks/useIsomorphicLayoutEffect";
import { getAppendedNewSearchParams } from "@/app/utils/searchParams";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
const HistoryFeed = dynamic(
  () => import("@/app/components/HistoryFeed/HistoryFeed"),
  { ssr: false },
);

type PageProps = {
  searchParams: { query: string; sort: string };
};

const sortStateMachine = {
  [HistorySortOptions.Date]: HistorySortOptions.Claimable,
  [HistorySortOptions.Claimable]: HistorySortOptions.Revealed,
  [HistorySortOptions.Revealed]: HistorySortOptions.Date,
};

let lastQuery: string | undefined = "";
export default function Page({ searchParams }: PageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sort, setSort] = useState(HistorySortOptions.Date);
  const [scrollToId, setScrollToId] = useState(0);
  const [response, setResponse] = useState<[]>();
  const [rewards, setRewards] = useState<{
    totalRevealedRewards: number;
    potentionalRewards: number;
  }>({ potentionalRewards: 0, totalRevealedRewards: 0 });

  const getData = async (
    query: string | undefined,
    sort: HistorySortOptions,
    srollId?: number,
  ) => {
    lastQuery = query;
    const searchParams = new URLSearchParams();
    if (query) {
      searchParams.set("query", query);
    }
    if (sort) {
      searchParams.set("sort", sort);
    }
    const params = searchParams.toString() ? `?${searchParams}` : "";
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/history${params}`,
    );
    const json = await data.json();
    setResponse(json.history);
    setRewards({
      totalRevealedRewards: json.totalRevealedRewards,
      potentionalRewards: json.potentionalRewards,
    });

    if (srollId) {
      setScrollToId(srollId);
    }
  };

  useIsomorphicLayoutEffect(() => {
    getData(
      searchParams.query,
      HistorySortOptions[searchParams.sort as keyof typeof HistorySortOptions],
    );
  }, []);

  const handleSort = () => {
    const nextSort = sortStateMachine[sort];
    setSort(nextSort);
    const newParams = getAppendedNewSearchParams({ sort: nextSort.toString() });
    router.push(`${pathname}${newParams}`);
    getData(lastQuery, nextSort);
  };

  const onRefreshCards = (revealedId: number) => {
    getData(lastQuery, sort, revealedId);
  };

  return (
    <>
      <div className="px-4">
        <HomeSwitchNavigation />
      </div>
      <div className="mt-5">
        <SearchFilters
          initialQuery={searchParams.query}
          onQueryChange={(query) => {
            getData(query, sort);
          }}
          backdropHeightReducedBy={261}
        />
      </div>
      <div className="flex justify-between px-4 my-4">
        <div className="flex flex-col justify-between">
          <div className="text-sm text-white font-sora">
            Total Revealed Rewards
          </div>
          <div className="text-base text-white font-sora">
            {new Intl.NumberFormat().format(rewards.totalRevealedRewards)} BONK
          </div>
        </div>
        <div className="basis-36">
          <Button variant="white" isPill>
            Claim all
          </Button>
        </div>
      </div>
      <div className="flex justify-between px-4 mb-4">
        <div className="flex flex-col justify-between">
          <div className="text-sm text-white font-sora">
            Potentional Rewards
          </div>
          <div className="text-base text-white font-sora">
            {new Intl.NumberFormat().format(rewards.potentionalRewards)} BONK
          </div>
        </div>
        <div className="basis-36">
          <Button variant="white" isPill>
            Reveal all
          </Button>
        </div>
      </div>
      <div
        className="px-4 pt-4 text-base font-sora cursor-pointer"
        onClick={handleSort}
      >
        <span>Sort by: </span>
        <span className="font-bold">{sort}</span>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center h-full items-center">
            <CountdownIcon />
          </div>
        }
      >
        {response && (
          <HistoryFeed
            list={response}
            onRefreshCards={onRefreshCards}
            elementToScrollToId={scrollToId}
          />
        )}
      </Suspense>
    </>
  );
}
