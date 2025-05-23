import {
  FiMoreVertical,
  FiMessageSquare,
  FiUsers,
  FiSearch,
} from "react-icons/fi";
import { ChatItem } from "./ChatItem";

import { Chat } from "@/types";
import SidebarHeader from "./SidebarHeader";

type SidebarProps = {
  chats: ChatCardProps[];
  onSelectChat: (chat: ChatCardProps) => void;
};

export type ChatCardProps = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
};

export default function Sidebar() {
  return (
    <div className="w-full h-full flex flex-col">
      <SidebarHeader />
    </div>
  );
}
