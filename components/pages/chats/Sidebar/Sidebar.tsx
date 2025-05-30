import {
  FiMoreVertical,
  FiMessageSquare,
  FiUsers,
  FiSearch,
} from "react-icons/fi";
import { ChatItem } from "./ChatItem";

import { Chat } from "@/types";
import SidebarHeader from "./SidebarHeader";
import { ChatList } from "./ChatList";
import { SearchIcon } from "lucide-react";
import { filtersAtom } from "@/store/filters";
import { useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { chatListAtom, chatParticipantsAtom } from "@/store/chatList";
import { useEffect, useState } from "react";
import {
  fetchChatById,
  fetchChatList,
  fetchParticipantsForChats,
} from "@/services/chat-list";
import { listenForNewChats } from "@/services/listenToChatLIst";
import { useAuth } from "@/components/Proveiders/AuthProvider";

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
  const [filterState, setFilterState] = useAtom(filtersAtom);
  const [participantsMap, setParticipantsMap] = useAtom(chatParticipantsAtom);
  const [allChatList, setAllChatList] = useAtom(chatListAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchChatList();
      console.log(data);

      if (data.length > 0) {
        const chatIds = data.map((chat) => chat.id);
        const participants = await fetchParticipantsForChats(chatIds);
        setParticipantsMap(participants);
      }

      const subscription = listenForNewChats(user?.id ?? "", async (chatId) => {
        // Either fetch that single chat and push to UI, or refetch all
        const newChat: any = await fetchChatById(chatId);
        console.log("New chat received:", newChat);
      });

      setAllChatList(data);
      setLoading(false);
      return () => {
        subscription.unsubscribe();
      };
    }
    loadData();
  }, [user]);

  return (
    <div className="w-full h-full flex flex-col">
      <SidebarHeader />
      {filterState.state === "search" && (
        <div className="w-full relative h-12">
          <Input
            value={filterState.search}
            placeholder="Search..."
            onChange={(e) => {
              setFilterState({
                ...filterState,
                search: e.target.value,
              });
            }}
            className="rounded-none focus:outline-none px-8 h-full"
          />
          {filterState.search.length !== 0 && (
            <IoMdCloseCircleOutline
              onClick={() => {
                setFilterState({
                  ...filterState,
                  search: "",
                });
              }}
              className="text-green-700 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 "
            />
          )}

          <SearchIcon
            className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2"
            size={20}
          />
        </div>
      )}
      <ChatList loading={loading} />
    </div>
  );
}
