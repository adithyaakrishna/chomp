import AvatarPlaceholder from "@/public/images/avatar_placeholder.png";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-toastify/dist/ReactToastify.min.css";
import { AuthRedirect } from "../components/AuthRedirect/AuthRedirect";
import { Navbar } from "../components/Navbar/Navbar";
import { TabNavigation } from "../components/TabNavigation/TabNavigation";

import ConfettiProvider from "../providers/ConfettiProvider";
import TutorialFlowScreens from "../screens/TutorialScreens/TutorialFlowScreens/TutorialFlowScreens";

const TutorialPage = () => {
  const currentDate = new Date();

  const formattedDate = format(currentDate, "MMMM do EEEE", { locale: enUS });

  return (
    <ConfettiProvider>
      <div className="flex flex-col h-full relative">
        <AuthRedirect />

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-85" />

        <main
          id="tutorial-container"
          className="flex-grow overflow-y-auto mb-2 w-full max-w-lg mx-auto flex flex-col"
        >
          <Navbar
            avatarSrc={AvatarPlaceholder.src}
            avatarLink="/application/profile"
            walletLink="/application/transactions"
          />
          <div className="px-6 py-5 mb-2">
            <p className="text-sm">{formattedDate}</p>
          </div>

          <TutorialFlowScreens />
        </main>

        <TabNavigation />
      </div>
    </ConfettiProvider>
  );
};

export default TutorialPage;
