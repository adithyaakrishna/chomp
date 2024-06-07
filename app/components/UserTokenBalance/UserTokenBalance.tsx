import { getUserTokenBalances } from "@chomp/app/queries/user";

export const UserTokenBalance = async () => {
  const { bonk } = await getUserTokenBalances();

  return <div>bonk balance: {bonk}</div>;
};
