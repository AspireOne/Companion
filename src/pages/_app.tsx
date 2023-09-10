import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SkeletonTheme
        baseColor={"rgba(255, 255, 255, 0.06)"}
        highlightColor={"rgba(255, 255, 255, 0.5)"}
        borderRadius={"0.7rem"} // matches the default NextUI borderRadius.
      >
        <NextUIProvider>
          <main className={"bg-background text-foreground dark"}>
            <ToastContainer />
            <Component {...pageProps} />
          </main>
        </NextUIProvider>
      </SkeletonTheme>
      <ToastContainer />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
