import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";
import paths from "~/utils/paths";

const ChatMainMenu = () => {
  const router = useRouter();
  const { botId, mode } = router.query;

  const bot = api.bots.getBot.useQuery({ botId: botId as string });

  useEffect(() => {
    if (!bot.isLoading && !bot.data) {
      router.replace(paths.discover);
    }
  }, [bot.isLoading, bot.data]);

  // TODO: Bot main menu.
  return (
    <div>
      <p>bot main menu</p>
    </div>
  );
};

export default ChatMainMenu;
