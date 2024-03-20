import type { Metadata } from "next";
import classNames from "classnames";

import DynamicProvider from "./providers/DynamicProvider";
import { AuthRedirect } from "./components/AuthRedirect/AuthRedirect";

import "@/styles/globals.css";
import { sora } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Chomp",
  description: "Gator Chomp app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={classNames(sora.variable, "h-full")}>
      <body className="font-sora bg-black text-white h-full">
        <DynamicProvider>
          {children}
          <AuthRedirect />
        </DynamicProvider>
      </body>
    </html>
  );
}
