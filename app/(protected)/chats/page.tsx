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

function page() {
  const [selectedChat, setSelectedChat] = useState<ChatCardProps | null>(null);
  const [sidebarSize, setSidebarSize] = useState(25);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  return (
    <div className="flex w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-60px)] w-full md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={35} minSize={30} maxSize={35} className="">
          <Sidebar/>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={60} defaultSize={65}>
          <div className="flex h-full items-center justify-center p-6 relative">
          <Image
            src="/images/doodle.jpg"
            alt="Doodle"
            fill
            className="object-cover absolute inset-0 opacity-40 sepia-[10%]"
            style={{ zIndex: -1 }}
          />
            <span className="font-semibold text-green-700 text-xl">
              {selectedChat
                ? <Chat/>
                : "Select a chat to start messaging"}
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <RightSideMenu />
    </div>
  );
}

export default page;
