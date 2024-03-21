import { ChallengeIcon } from "../Icons/ChallengeIcon";
import { HomeIcon } from "../Icons/HomeIcon";
import { ComposeIcon } from "../Icons/ComposeIcon";
import { Navigation } from "../Navigation/Navigation";
import { getIsUserAdmin } from "@/app/queries/user";
import { SettingsIcon } from "../Icons/SettingsIcon";

const navigationItems = [
  { label: "Answer", icon: <ChallengeIcon />, href: "/answer" },
  { label: "Home", icon: <HomeIcon />, href: "/", altHref: ["/profile"] },
  { label: "Ask", icon: <ComposeIcon />, href: "/ask" },
];

const adminNavigationItems = [
  { label: "Admin", icon: <SettingsIcon />, href: "/admin" },
];

export async function TabNavigation() {
  const isAdmin = await getIsUserAdmin();

  return (
    <Navigation
      items={[...navigationItems, ...(isAdmin ? adminNavigationItems : [])]}
    />
  );
}
