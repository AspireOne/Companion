import { BotMode } from "@prisma/client";

export default {
  index: "/",
  home: "/home",
  RR: "/roulette",
  RRChat: "/roulette/chat",
  discover: "/discover",
  profile: "/profile",
  botChatMainMenu: (botId: string) => `/character/${botId}`,
  userProfile: (username: string) => `/user/${username}`,
  botChat: (botId: string, botMode: BotMode) =>
    `/character/${botId}/${botMode}`, // todo
};

export function addQueryParams(
  path: string,
  ...params: [key: string, value: string][]
) {
  const url = new URL(path, window.location.origin);

  params.forEach((param) => {
    url.searchParams.append(param[0], param[1]);
  });

  return url.pathname + url.search;
}

export function normalizePath(path: string, keepSlash: boolean = true): string {
  if (keepSlash) return path.endsWith("/") ? path : path + "/";
  else return path.endsWith("/") ? path.slice(0, -1) : path;
}
