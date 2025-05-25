"use client";
import Sidebar, {
  ChatCardProps,
} from "@/components/pages/chats/Sidebar/Sidebar";

import React, { useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import RightSideMenu from "@/components/layout/RightSideMenu";
import Chat from "@/components/pages/chats/Chat";
import Image from "next/image";
import { BsChat } from "react-icons/bs";
import Layout from "@/components/layout/Layout";
import { useAtom } from "jotai";
import { modalAtom } from "@/store/modal";
import { Divide } from "lucide-react";
import { selectedChatAtom } from "@/store/selectedChat";

function page() {
  const [selectedChat, setSelectedChat] = useAtom(selectedChatAtom);
  const [sidebarSize, setSidebarSize] = useState(25);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
const [modalSate, setModalState] = useAtom(modalAtom);
  const dummyChats: ChatCardProps[] = [
    {
      id: "1",
      name: "Alice",
      lastMessage: "Hey, how are you?",
      time: "9:30 PM",
    },
    {
      id: "2",
      name: "Bob",
      lastMessage: "Let's meet tomorrow",
      time: "8:15 PM",
    },
    {
      id: "3",
      name: "Group Chat",
      lastMessage: "New message in group",
      time: "Yesterday",
    },
  ];
  function createNewChat() {
    setModalState("createChat");
  }
  return (
    <Layout>
      <div className="flex w-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[calc(100dvh-60px)] w-full md:min-w-[450px]"
        >
          <ResizablePanel
            defaultSize={35}
            minSize={30}
            maxSize={35}
            className="relative"
          >
            <Sidebar />
            <button
              className="rounded-full bg-green-700 text-white p-3 absolute bottom-3 right-3 z-10 hover:bg-green-800 transition-colors duration-200 group"
              onClick={createNewChat}
            >
              <BsChat size={20} />
              <span className="bg-green-700 text-white rounded-full p-1 absolute bottom-2 right-2 w-fit h-fit leading-[55%] group-hover:bg-green-800 duration-200">+</span>
            </button>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={60} defaultSize={65}>
            <div className="flex h-full items-center justify-center relative">
              <Image
                src="/images/doodle.jpg"
                alt="Doodle"
                fill
                className="object-cover absolute inset-0 opacity-40 sepia-[10%]"
                style={{ zIndex: -1 }}
              />
              <div className="font-semibold text-green-700 text-lg w-full h-full flex justify-center items-center">
                {selectedChat?.id ? <Chat /> : "Select a chat to start messaging"}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <RightSideMenu />
      </div>
    </Layout>
  );
}

export default page;
