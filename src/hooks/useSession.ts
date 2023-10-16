import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { api } from "~/utils/api";
import { User } from "@prisma/client";
import getOrInitFirebaseAuth from "~/lib/getFirebaseAuth";
import { getApp, initializeApp, getApps } from "firebase/app";

type SessionUser = User;
type SessionStatus = "loading" | "authenticated" | "unauthenticated";

export default function useSession(): {
  user: SessionUser | null | undefined;
  status: SessionStatus;
  refetch: () => void;
} {
  const userQuery = api.users.getSelf.useQuery(
    { includeBots: false },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,

      // Refetch every 5 minutes.
      refetchInterval: 1000 * 60 * 5,
    },
  );
  // Get firebase user and cache it.
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (getApps.length === 0) return;

      console.log("Registering auth in useSession.");
      const auth = await getOrInitFirebaseAuth();
      if (!auth) return;

      auth.onAuthStateChanged((user) => {
        console.log("Firebase auth state changed, refetching session.");
        userQuery.refetch();
      });
    })();
  }, [getApps.length]);

  useEffect(() => {
    if (userQuery.data) {
      setUser({
        ...userQuery.data,
        name: userQuery.data.name!,
        email: userQuery.data.email!,
        image: userQuery.data.image ?? "/assets/default_user.jpg",
        username: userQuery.data.username!,
      });
    }

    if (!userQuery.data && !userQuery.isLoading) {
      setUser(null);
    }
  }, [userQuery.isLoading, userQuery.data]);

  const status =
    user === undefined
      ? "loading"
      : user === null
      ? "unauthenticated"
      : "authenticated";

  return { user: user, status: status, refetch: userQuery.refetch };
}
