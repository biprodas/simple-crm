import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import { authSession } from "~/auth";
import { appConfig } from "~/config";
import { geistMono, geistSans } from "~/font";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/providers/theme-provider";
import { ToasterProvider } from "~/providers/toast-provider";
import ReactQueryProvider from "~/utils/react-query";

import "./globals.css";

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
  robots: appConfig.robots,
  openGraph: {
    title: appConfig.title,
    description: appConfig.description,
    url: appConfig.appUrl,
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await authSession();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            geistSans.variable,
            geistMono.variable
          )}
        >
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ToasterProvider />
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
