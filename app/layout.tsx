import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { AuthProvider } from "@/utils/authcontext";
import { siteConfig } from "@/config/site";
import { fontMundo, fontMilo, fontSans } from "@/config/fonts";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMilo.variable,
          fontMundo.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <AuthProvider>
            <Navbar />
            <main className=" mx-auto w-full pt-16 flex-grow">{children}</main>
            {/* <footer className="w-full italic text-default flex items-center justify-center py-3">
              Vinair © 2024
            </footer> */}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
