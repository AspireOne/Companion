/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { type AppRouter } from "~/server/api/root";

const getBaseServerUrl = () => {
  if (process.env.NATIVE) {
    const serverUrl = "https://companion-red.vercel.app";
    console.log(
      `Native project, using hard-cded external hosted server url (${serverUrl}).`,
    );
    return serverUrl; // TODO: Change this when we have a real domain.
  }

  if (typeof window !== "undefined") return ""; // Browser should use relative url.

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // prettier-ignore
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;

  if (process.env.DOMAIN) return `https://${process.env.PUBLIC_DOMAIN}`;

  return `http://localhost:${process.env.PORT ?? 3000}`; // Dev SSR should use localhost.
};

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      queryClientConfig: {
        defaultOptions: {
          // Disable most refetching because I deem it useless and wasteful.
          queries: {
            // These are in-line with the defaults.
            retry: 3,
            refetchInterval: false,
            refetchIntervalInBackground: false,
            refetchOnReconnect: true,
            refetchOnMount: true,

            //refetchOnWindowFocus: false,
          },
        },
      },
      /**
       * Transformer used for data de-serialization from the server.
       *
       * @see https://trpc.io/docs/data-transformers
       */
      transformer: superjson,

      /**
       * Links used to determine request flow from client to server.
       *
       * @see https://trpc.io/docs/links
       */
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseServerUrl()}/api/trpc`,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              // 'include' is required for cookies to be sent to the server.
              credentials: process.env.NATIVE ? "include" : undefined,
            });
          },
        }),
      ],
    };
  },
  /**
   * Whether tRPC should await queries when server rendering pages.
   *
   * @see https://trpc.io/docs/nextjs#ssr-boolean-default-false
   */
  ssr: false,
});

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
