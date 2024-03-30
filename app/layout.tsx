import { ClerkProvider } from "@clerk/nextjs";
import { UIProvider } from "@yamada-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kioureki-vol2",
  description: "団体で既往歴を一括管理できるWebアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }} className={inter.className}>
        <ClerkProvider>
          <UIProvider>{children}</UIProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
