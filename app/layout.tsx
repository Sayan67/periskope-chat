import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/Proveiders/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Provider } from "jotai";
import LeftSideMenu from "@/components/layout/LeftSideMenu";
import Header from "@/components/layout/Header";
import Image from "next/image";
import { images } from "@/constants/images";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Periskope Chat",
  description: "Chat application for business solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          type="image/svg+xml"
          href="https://framerusercontent.com/images/K45tTyazZVle1nV6x3ceaJGqSt8.png"
          rel="icon"
          sizes="any"
          media="(prefers-color-scheme: light)"
        ></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <AuthProvider>
            <div className="hidden lg:flex">
              <LeftSideMenu />
              <div className="w-full min-h-screen flex flex-col">
                <Header />
                {children}
              </div>
            </div>
            <div className="lg:hidden w-full h-screen text-green-400 flex justify-center items-center text-2xl flex-col gap-4 font-bold bg-gray-700 px-5 text-center">
              <Image src={images.logo.src} width={200} height={80} alt="Logo" />
              <h1>Please switch to desktop device to access the application</h1>
            </div>
          </AuthProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
