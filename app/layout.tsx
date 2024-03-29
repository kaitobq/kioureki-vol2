import { ClerkProvider } from "@clerk/nextjs";
import { UIProvider } from "@yamada-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
