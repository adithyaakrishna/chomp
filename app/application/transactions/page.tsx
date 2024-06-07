import {
  getMyFungibleAssetBalances,
  getTransactionHistory,
} from "@chomp/app/actions/fungible-asset";
import { getJwtPayload } from "@chomp/app/actions/jwt";
import { TransactionProfile } from "@chomp/app/components/TransactionProfile/TransactionProfile";
import { TransactionsBackButton } from "@chomp/app/components/TransactionsBackButton/TransactionsBackButton";
import { TransactionsTable } from "@chomp/app/components/TransactionsTable/TransactionsTable";
import { WalletWidget } from "@chomp/app/components/WalletWidget/WalletWidget";
import { getProfileImage } from "@chomp/app/queries/profile";

type PageProps = {};

export default async function Page({}: PageProps) {
  const balances = await getMyFungibleAssetBalances();
  const history = await getTransactionHistory();
  const payload = await getJwtPayload();
  const profile = await getProfileImage();
  const verifiedCredentials = payload?.verified_credentials.find(
    (vc) => vc.format === "blockchain",
  ) ?? { address: "" };

  let address = "";

  if ("address" in verifiedCredentials) {
    address = verifiedCredentials.address;
  }

  return (
    <div className="w-full h-full bg-[#4D4D4D] p-4">
      <TransactionProfile avatarSrc={profile} pointAmount={balances.Point} />
      <div className="mt-4">
        <WalletWidget address={address} />
      </div>
      <TransactionsTable
        className="my-4 h-[calc(100%-270px)]"
        transactions={history.map((h) => ({
          amount: h.change.toNumber(),
          amountLabel: h.asset,
          transactionType: h.type,
          date: h.createdAt,
          dollarAmount: 0,
        }))}
      />
      <TransactionsBackButton />
    </div>
  );
}
