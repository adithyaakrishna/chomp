import { getMyFungibleAssetBalances } from "@chomp/app/actions/fungible-asset";
import GeneralRankCard from "@chomp/app/components/GeneralRankCard/GeneralRankCard";
import { HomeSwitchNavigation } from "@chomp/app/components/HomeSwitchNavigation/HomeSwitchNavigation";
import { LogoutButton } from "@chomp/app/components/LogoutButton/LogoutButton";
import PointBalanceCard from "@chomp/app/components/PointBalanceCard/PointBalanceCard";
import { Profile } from "@chomp/app/components/Profile/Profile";
import { ResetAccountDataButton } from "@chomp/app/components/ResetAccountDataButton/ResetAccountDataButton";
import TagRankCard from "@chomp/app/components/TagRankCard/TagRankCard";
import { getProfileImage } from "@chomp/app/queries/profile";

export default async function Page() {
  const isDemo = process.env.ENVIRONMENT === "demo";
  const balances = await getMyFungibleAssetBalances();
  const profile = await getProfileImage();

  return (
    <div className="flex flex-col px-4 gap-4">
      <HomeSwitchNavigation />
      <Profile
        avatarSrc={profile}
        fullName="User Name"
        handle="@user"
        joinDate={new Date()}
      />

      <PointBalanceCard amount={balances.Point} />

      <p>General Accuracy</p>
      <GeneralRankCard rank={150} percentage={72} />

      <p>Your top 3 categories</p>
      <TagRankCard tag="DeFi" percentage={92} />
      <TagRankCard tag="GameFi" percentage={78} />
      <TagRankCard tag="DePin" percentage={52} />

      {isDemo && <ResetAccountDataButton />}
      <LogoutButton />
    </div>
  );
}
