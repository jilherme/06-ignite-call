import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";

import { queryClient } from "@/lib/react-query";
import "../lib/dayjs";
import { globalStyles } from "@/styles/global";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <DefaultSeo
            openGraph={{
              type: "website",
              locale: "pt_BR",
              url: "https://www.ignite-call.aspargofrito.com.br",
              siteName: "Ignite Call",
            }}
          />
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
