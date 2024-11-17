import localFont from "next/font/local";
import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontMilo = localFont({
  src: [
    {
      path: "fonts/milo.ttf",
      weight: "400",
    },
  ],
  variable: "--font-milo",
});

export const fontMundo = localFont({
  src: [
    {
      path: "fonts/mundo.ttf",
      weight: "400",
    },
  ],
  variable: "--font-mundo",
});
