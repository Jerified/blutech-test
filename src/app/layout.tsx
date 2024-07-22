import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import  ReduxProvider  from "./redux-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth()
  return (
    <SessionProvider session={session}>
        <html lang="en">
        <body className={`max-w-6xl mx-auto px-4 ${inter.className}`}>
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </body>
        </html>
    </SessionProvider>
  );
}
