import Header from "@/components/layout/Header";
import LeftSideMenu from "@/components/layout/LeftSideMenu";
import CreateChatModal from "@/components/ui/modals/CreateChatModal";
import { images } from "@/constants/images";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Periskope | Chat",
  description: "Chat application for business solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hidden lg:flex">
        <LeftSideMenu />
        <div className="w-full min-h-[100dvh] flex flex-col">
          <Header />
          {children}
          <CreateChatModal/>
        </div>
      </div>
      <div className="lg:hidden w-full h-[100dvh] text-green-400 flex justify-center items-center text-2xl flex-col gap-4 font-bold bg-gray-700 px-5 text-center">
        <Image src={images.logo.src} width={200} height={80} alt="Logo" />
        <h1>Please switch to desktop device to access the application</h1>
      </div>
    </>
  );
}
