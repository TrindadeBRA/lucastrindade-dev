import "@/styles/globals.css";
import "font-awesome/css/font-awesome.min.css";

import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Syne, DM_Sans } from "next/font/google";
import CheatCodesPlugin from "@/plugins/CheatCodes";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${syne.variable} ${dmSans.variable} font-body`}>
      <Component {...pageProps} />
      <CheatCodesPlugin />
      <Analytics />
      <GoogleAnalytics gaId="G-XSV4CR9LYC" />
    </div>
  );
}
