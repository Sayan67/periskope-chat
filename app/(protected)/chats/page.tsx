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
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-60px)] w-full rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel
          minSize={15}
          maxSize={25} 
        >
          <div>
            Message list
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={60}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">
              {selectedChat ? `Chat with ${selectedChat.name}` : "Select a chat to start messaging"}
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default page;
