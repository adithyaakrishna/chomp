import { getDailyDeck } from "@/app/queries/deck";
import { redirect } from "next/navigation";

export const DailyDeckRedirect = async () => {
  const dailyDeck = await getDailyDeck();

  if (dailyDeck) {
    redirect("/daily-deck");
  }

  return null;
};
